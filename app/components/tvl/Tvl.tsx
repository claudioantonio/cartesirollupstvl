import React from 'react'
import getTVL from './CartesiRollupsTVL.js';
import { Box, Card, CardBody, Flex, Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';

interface TvlProps {
  tvl: number;
  erc20TokensInfo:  { [key: string]: { symbol: string } };
  erc20Prices:      { [key: string]: number };
}

const Tvl = async () => {
  const {tvl, erc20TokensInfo, erc20Prices} = await getTVL() as TvlProps;
  //const tvl=10;
  //const erc20TokensInfo: { [key: string]: { symbol: string } } = { "a": {"symbol":"CTSI"}, "b":{"symbol":"weth"} };
  //const erc20Prices: { [key: string]: number } = { "a": 1, "b":2 };

  return (
    <Box>
      <Stat>
        <StatLabel>Ethereum Mainnet</StatLabel>
        <StatNumber>US${tvl}</StatNumber>
        <StatHelpText>* Using CoinMarketCap API to retrieve tokens price</StatHelpText>
      </Stat>
      
      <Flex direction="row" flexWrap="wrap">
        {Object.keys(erc20TokensInfo).map((token: string) => (
          <Card key={token} bg="blue.400" m="2">
            <CardBody>
              <Text color="white">{erc20TokensInfo[token].symbol}</Text>
            </CardBody>
          </Card>          
        ))}
      </Flex>
    </Box>
  )
}

export default Tvl