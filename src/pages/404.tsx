import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import MyLink from '../components/myLink'
import utilStyles from '../styles/utils.module.scss'

export default function Custom404() {
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
          404
        </Heading>
        <Heading>Hello?? Is somebody there?!?</Heading>
        <Text as="b">
          You've found a page that doesn't exist. It is scary in here so go back
          <MyLink onClick={null} href="/">
            {' '}
            <Text display="inline" textDecorationLine="underline" textDecorationThickness="2px">
              home
            </Text>{' '}
          </MyLink>
          as soon as possible.
        </Text>
      </Stack>
    </Center>
  )
}
