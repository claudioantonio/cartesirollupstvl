import { Card, CardBody, HStack, Heading, Spacer, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'

interface TvlPriceProps {
    tvl: number;
}

const TvlPrice: React.FC<TvlPriceProps> = ({ tvl }) => {

    const USDollarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Card bg="gray.200" w={[180,300,600]}>
            <CardBody>
                <HStack spacing="24px" align="start" justify="center">
                <VStack>
                    <Heading fontSize={[12,24,48]}><FaEthereum/></Heading>
                    <Spacer/>
                    <Text fontSize={[6,12,18]}>MAINNET</Text>
                </VStack>
                <VStack align="center">
                    <Heading fontSize={[12,24,48]}>{USDollarFormatter.format(tvl)}</Heading>
                    <Text fontSize={[6,12,18]}>* CoinMarketCap v2 API for prices</Text>
                </VStack>
                </HStack>
            </CardBody>
            </Card>
    )
}

export default TvlPrice