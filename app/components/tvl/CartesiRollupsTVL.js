import { ethers, isAddress, formatUnits,toNumber } from "ethers";
import dotenv from 'dotenv';

class Dapp {
  address;
  tokens = [];

  constructor(address) {
    this.address = address;
  }

  getAddress() {
    return this.address;
  }

  addToken(token) {
    if (!this.tokens.includes(token)) {
      this.tokens.push(token);
      return true;
    }
    return false;
  }

  getTokens() {
    return this.tokens;
  }
}

class ERC20Info {
  contract;
  decimals;
  symbol;

  constructor(contract,decimals,symbol) {
    this.contract = contract;
    this.decimals = decimals;
    this.symbol = symbol;
  }

  getContract() {
    return this.contract;
  }

  getDecimals() {
    return this.decimals;
  }

  getSymbol() { 
    return this.symbol;
  } 
}

function createInputBoxContract(provider) {
  const inputBoxABI = [
    "event InputAdded(address indexed dapp,uint256 indexed inputIndex,address sender,bytes input)"
  ];
  const contract = new ethers.Contract(
    process.env.INPUT_BOX_ADDRESS, 
    inputBoxABI, 
    provider
  );
  return contract;
}

function createERC20Contract(provider,tokenAddress) {
  const abi = [
    "function decimals() public view returns (uint8)",
    "function symbol() view returns (string)",
    "function balanceOf(address owner) view returns (uint256)",
  ];
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  return contract;
}

async function getDappsWithERC20Tokens(provider) {
  let dapps={};

  const contract = createInputBoxContract(provider);

  let eventFilter = contract.filters.InputAdded;
  const events = await contract.queryFilter(eventFilter);
  const DAPP_ADDRESS = 0;
  const SENDER_ADDRESS = 2;
  const INPUT =3;
  
  events.forEach(event => {
    const sender = event.args[SENDER_ADDRESS].toLowerCase();
    if (sender!=process.env.ERC20_PORTAL_ADDRESS.toLowerCase()) {
      return;
    }

    const dappAddress = event.args[DAPP_ADDRESS].toLowerCase();
    if ((dappAddress in dapps)==false) {
      const dapp = new Dapp(dappAddress);
      dapps[dappAddress]=dapp;
    }

    const token = extractTokenFromInput(event.args[INPUT]);
    if (token!=null) {
      dapps[dappAddress].addToken(token);
    }
  });

  //DEBUG
  let i=0;
  for (const key in dapps) {
    i++;
  }
  console.log("#DAPPS=" + i);
  //END DEBUG

  return dapps;
}

function extractTokenFromInput(input) { 
  const success = input.slice(2,4);                         // 2 bytes
  if (success=="00") return null;

  const rawTokenAddress = input.slice(4,44).toLowerCase();  // 20 bytes
  const finalTokenAddress = "0x" + rawTokenAddress;
  return finalTokenAddress;
} 

function getUniqueERC20Tokens(dapps) {
  let tokens = [];
  for (let key in dapps) {
    const dapp = dapps[key];
    const dappTokens = dapp.getTokens();
    for (let i = 0; i < dappTokens.length; i++) {
      const token = dappTokens[i];
      if (!tokens.includes(token)) {
        tokens.push(token);
      }
    }
  }
  return tokens;
}

async function getERC20Info(provider, tokens) {
  let erc20TokensInfo = {};
  for(let i=0; i<tokens.length; i++) {
    const contract = createERC20Contract(provider,tokens[i]);
    const decimals = toNumber(await contract.decimals());
    const symbol = await contract.symbol();
    const erc20Info = new ERC20Info(contract,decimals,symbol);
    erc20TokensInfo[tokens[i]] = erc20Info;
  };
  return erc20TokensInfo;
}

// create computeTVL function
async function computeTVL(dapps, erc20TokensInfo, erc20Prices) {
  let tvl = 0;
  for (let dappAddress in dapps) {
    const dappTokens = dapps[dappAddress].getTokens();
    for(let i=0; i<dappTokens.length; i++) {
      const token = dappTokens[i];
      const tokenPrice = erc20Prices[token];
      const rawBalance = await erc20TokensInfo[token].contract.balanceOf(dappAddress);
      const balance = formatUnits(rawBalance, erc20TokensInfo[token].decimals);
      console.log("token=" + token + " price=" + tokenPrice + " balance=" + balance);
      tvl+=tokenPrice*Number(balance);
    };
  }
  return (tvl>0) ? tvl.toFixed(2) : tvl;
}

function getUniqueSymbolsAsString(erc20TokensInfo) {
  const COMMA_SEPARATOR = ',';
  let symbols
  let i=0;
  for (let key in erc20TokensInfo) {
    const erc20Info = erc20TokensInfo[key];
    const currentSymbol = erc20Info.symbol;
    if (i==0) {
      symbols=currentSymbol;
    } else {
      symbols+=COMMA_SEPARATOR + currentSymbol;
    }
    i++;
  }
  return symbols;
}

async function getERC20Prices(erc20TokensInfo) {
  let prices = {};

  const symbols = getUniqueSymbolsAsString(erc20TokensInfo);

  let json;
  try {
    const headers = new Headers();
    headers.append('X-CMC_PRO_API_KEY', process.env.COINMARKETCAP_API_KEY);
    let url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
    url += '?symbol=' + symbols + '&convert=USD';
    const response = await fetch(url,{
      method: 'GET',
      headers: headers
    });
    json = await response.json();
  } catch (err) {
    throw new Error("Error reading prices:" + err);
  }

  for (let erc20Address in erc20TokensInfo) {
    const symbol = erc20TokensInfo[erc20Address].symbol;
    let usdPrice = 0;
    if (json.data[symbol].length==1) {
      usdPrice = json.data[symbol][0].quote.USD.price;
    }
    prices[erc20Address] = usdPrice;
  }

  return prices;
}

async function getTVL() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  const dapps = await getDappsWithERC20Tokens(provider);
  const uniqueERC20Tokens = getUniqueERC20Tokens(dapps);
  console.log("#ERC2=" + uniqueERC20Tokens.length);
  const erc20TokensInfo = await getERC20Info(provider, uniqueERC20Tokens);
  let erc20Prices={};
  try {
    erc20Prices = await getERC20Prices(erc20TokensInfo);
  } catch (err) {
    console.log(err);
    return;
  }
  
  const tvl = await computeTVL(dapps, erc20TokensInfo, erc20Prices);
  return {tvl, erc20TokensInfo , erc20Prices};
}



export default getTVL;