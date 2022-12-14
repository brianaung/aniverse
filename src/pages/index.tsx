import { Button, Image, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

export default function Home() {
  const router = useRouter()
  return (
    <Layout>
      <Head>
        <title>Hai</title>
      </Head>
      <Stack gap="1rem" p="2rem" align="center">
        <Image
          src="https://i.redd.it/qqlgi5vomnu91.jpg"
          alt='anime meme: tries first episode, binges entire season, "yep its trash"'
          border="solid 2px black"
        />
        <Button onClick={() => router.push('/anime/popular')}>EXPLORE</Button>
      </Stack>
    </Layout>
  )
}
