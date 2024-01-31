import React from 'react'
import Tvl from './components/tvl/Tvl'
import { Badge, Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa";
import { Text } from "@chakra-ui/react"

const Home = () => {
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' direction="column">

      <header>
        <Box display="flex" justifyContent="space-between">
          <Heading p="2">Cartesi Rollups TVL</Heading>
          <Badge colorScheme='yellow'>alfa</Badge>
          <FaGithub size={30}/>
        </Box>
      </header>

      <Divider/>

      <Box>
        <Tvl/>
      </Box>

      <footer>
        <Text align="center" mt="5">&copy; 2023 All rights reserved.</Text>
      </footer>
    </Flex>
  )
}

export default Home
