import React from 'react'
import Tvl from './components/tvl/Tvl'
import { Badge, Box, Divider, Flex, Heading } from "@chakra-ui/react"

import { Text } from "@chakra-ui/react"
import Header from './components/header/Header'
import Footer from './components/Footer/Footer'

const Home = () => {
  return (
    <Flex alignItems="center" direction="column">

      <Header/>

      <Box as="main">
        <Tvl/>
      </Box>

      <Footer/>

    </Flex>
  )
}

export default Home
