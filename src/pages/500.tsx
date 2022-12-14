import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import utilStyles from '../styles/utils.module.scss'

export default function Custom500() {
  return (
    <Center h="100vh">
      <Stack position="relative" bg="white" border="solid 2px black" boxShadow="2px 2px 0 black" p="3rem" w="60%">
        <Heading
          color="primary.500"
          className={utilStyles.textWithStroke}
          fontSize="5rem"
          position="absolute"
          top="-30%"
          left="-2%">
          500
        </Heading>
        <Heading>Oops!</Heading>
        <Text as="b">Something went wrong with the server. Please refresh or try again later.</Text>
      </Stack>
    </Center>
  )
}
