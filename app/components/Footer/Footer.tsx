import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <Box as="footer">
        <VStack spacing="8">
            <Text fontSize={[6,12,18]} pt="12">Made in Brazil</Text>
            <Box pb="12">
              <Link href="https://github.com/claudioantonio/cartesirollupstvl">
                <Heading fontSize={[10,20,30]}><FaGithub/></Heading>
              </Link>
            </Box>
        </VStack>
    </Box>
  )
}

export default Footer