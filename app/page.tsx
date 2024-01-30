import React from 'react'
import Tvl from './components/tvl/Tvl'
import { Box, Card, CardBody, CardHeader, Flex, Heading, flexbox } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa";

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" mr="50" ml="50" mt="10">
      <header>
        <Box display="flex" justifyContent="space-between">
          <div>Cartesi Rollups TVL <div className="badge">alfa</div></div>
          <FaGithub />
        </Box>
      </header>

      <Box display="flex" w="100" justifyContent="space-around">
        <Card>
          <CardHeader>
            <Heading size='md'>Client Report</Heading>
          </CardHeader>

          <CardBody>
            <div className="container">
              <Tvl/>
            </div>
          </CardBody>
        </Card>
      </Box>

      <footer>
        &copy; 2023 All rights reserved. | <a href="https://github.com/claudioantonio/cartesirollupstvl">GitHub Repository</a>
      </footer>
    </Box>
  )
}

export default Home
