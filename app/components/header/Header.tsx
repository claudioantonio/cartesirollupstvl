import { Badge, Box, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Box as="header" mt="40px" mb="40px">
        <VStack>
            <Heading fontWeight="800" fontSize={[12,24,48]} pt="8px">Cartesi Rollups TVL <Badge colorScheme='yellow' >alfa</Badge></Heading>
            <Text fontWeight="500" fontSize={[6,12,24]} pt="2px" pb="8px">Sum of tokens deposited in all Cartesi Rollups DApps</Text>
        </VStack>
    </Box>
  )
}

export default Header