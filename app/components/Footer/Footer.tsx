import { Box, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <Box as="footer">
        <VStack spacing="8">
            <Text pt="12">Made in Brazil</Text>
            <Box pb="12">
              <Link href="https://github.com/claudioantonio/cartesirollupstvl">
                <FaGithub size="30"/>
              </Link>
            </Box>
        </VStack>
    </Box>
  )
}

export default Footer