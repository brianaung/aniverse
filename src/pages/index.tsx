import { Image, Stack } from '@chakra-ui/react'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Stack gap="1rem" p="2rem" align="center">
        <Image
          src="https://i.redd.it/qqlgi5vomnu91.jpg"
          alt='anime meme: tries first episode, binges entire season, "yep its trash"'
          border="solid 2px black"
        />
      </Stack>
    </Layout>
  )
}
