import React from 'react'
import getTVL from './CartesiRollupsTVL.js';

interface TvlProps {
  tvl: number;
  erc20TokensInfo:  { [key:string] : any; };
  erc20Prices:      { [key: string]: number; };
}

const Tvl = async () => {
  //const {tvl, erc20TokensInfo, erc20Prices} = await getTVL() as TvlProps;
  const tvl=10;
  const erc20TokensInfo = { "a": {"symbol":"CTSI"} };
  const erc20Prices = { "a": 1 };

  return (
    <div>
      <h2>Sum of values locked in each Cartesi Rollups DApp on Ethereum Mainnet</h2>
      <p>${tvl}</p>
      <p className="value-subtitle">* Using CoinMarketCap API to retrieve tokens price in US$</p>
      <hr/>
      {Object.keys(erc20TokensInfo).map((token: string) => (
        <p className="value-subtitle" key={token}>{erc20TokensInfo[token].symbol}: ${erc20Prices[token]}</p>
      ))}
    </div>
  )
}

export default Tvl