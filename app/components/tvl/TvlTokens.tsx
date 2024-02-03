import { Box, Card, CardBody, Divider, Flex, HStack, Heading, VStack } from '@chakra-ui/react'
import React from 'react'

interface TvlTokensProps {
    erc20TokensInfo:  { [key: string]: { symbol: string } };
}

const TvlTokens: React.FC<TvlTokensProps> = ({ erc20TokensInfo }) => {
  return (
    <Box w={[180,300,600]} mt="40px">
        <HStack justify="center"><Heading fontSize={[12,24,48]}>Tokens deposited</Heading></HStack>
        <Divider/>
        <Flex direction="row" flexWrap="wrap" justify="space-around">
            {Object.keys(erc20TokensInfo).map((token: string) => (
              <Card key={token} bg="blue.400" m="2">
                <CardBody>
                  <Heading fontSize={[10,22,30]} color="white">{erc20TokensInfo[token].symbol}</Heading>
                </CardBody>
              </Card>          
            ))}
       </Flex>
    </Box>
  )
}

export default TvlTokens