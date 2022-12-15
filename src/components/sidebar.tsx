import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Stack,
  Text
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

function SidebarTab({ url, displayText }: { url: string; displayText: string }) {
  const router = useRouter()
  const handleRoute = (url: string) => {
    router.push(url)
  }

  return (
    <Button
      variant={router.pathname === url ? 'solid' : 'link'} // style active tab
      colorScheme="primary"
      color="fg.500"
      justifyContent="flex-start"
      fontWeight="400"
      onClick={() => handleRoute(url)}>
      {displayText}
    </Button>
  )
}

export default function Sidebar() {
  const router = useRouter()
  const GenreList = dynamic(() => import('./genreList'), { ssr: false })

  return (
    <Stack gap="1rem" p="1rem">
      <SidebarTab url="/" displayText="Home" />
      <Stack>
        <Text as="b">ANIME</Text>
        <SidebarTab url="/anime/popular" displayText="Most Popular" />
        <SidebarTab url="/anime/trending" displayText="Trending Now" />
        <Accordion allowToggle defaultIndex={router.pathname === '/anime/genre/[type]' ? [0] : []}>
          <AccordionItem>
            <AccordionButton p={0}>
              Genres
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel mt=".5rem">
              <GenreList />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>

      <Stack>
        <Text as="b">MANGA</Text>
        <Text>[WIP]</Text>
      </Stack>
    </Stack>
  )
}
