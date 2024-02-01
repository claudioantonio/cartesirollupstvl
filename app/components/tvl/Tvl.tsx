import React from 'react'
import getTVL from './CartesiRollupsTVL.js';
import { Box, Card, CardBody, CardHeader, Divider, Flex, HStack, Heading, Spacer, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import { FaEthereum } from 'react-icons/fa';

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
      <Card bg="gray.200">
        <CardBody>
          <HStack spacing="24px" align="start">
            <VStack>
              <Heading><FaEthereum/></Heading>
              <Spacer/>
              <Text>MAINNET</Text>
            </VStack>
            <VStack>
              <Heading>US${tvl}</Heading>
              <Text>* CoinMarketCap v2 API for prices</Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>

      <Box mt="40px">
        <HStack justify="center"><Heading>Tokens deposited</Heading></HStack>
        <Divider/>
        <Flex direction="row" flexWrap="wrap">
          {Object.keys(erc20TokensInfo).map((token: string) => (
            <Card key={token} bg="blue.400" m="2">
              <CardBody>
                <Heading color="white">{erc20TokensInfo[token].symbol}</Heading>
              </CardBody>
            </Card>          
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default Tvl