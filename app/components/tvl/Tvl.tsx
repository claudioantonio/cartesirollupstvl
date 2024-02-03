import React from 'react'
import getTVL from './CartesiRollupsTVL.js';
import { Box, Card, CardBody, CardHeader, Divider, Flex, HStack, Heading, Spacer, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import TvlPrice from './TvlPrice';
import TvlTokens from './TvlTokens';

interface TvlProps {
  tvl: number;
  erc20TokensInfo:  { [key: string]: { symbol: string } };
  erc20Prices:      { [key: string]: number };
}

const Tvl = async () => {
  const {tvl, erc20TokensInfo, erc20Prices} = await getTVL() as TvlProps;
  //const tvl=10000000;
  //const erc20TokensInfo: { [key: string]: { symbol: string } } = { "a": {"symbol":"CTSI"}, "b":{"symbol":"weth"} };
  //const erc20Prices: { [key: string]: number } = { "a": 1, "b":2 };

  return (
    <Box>
      <VStack>
        <TvlPrice tvl={tvl}/>
        <TvlTokens erc20TokensInfo={erc20TokensInfo}/>
      </VStack>
    </Box>
  )
}

export default Tvl