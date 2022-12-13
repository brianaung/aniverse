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
import { useRouter } from 'next/router'
import GenreList from './genreList'

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

  return (
    <Stack gap="1rem" p="1rem">
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
        <SidebarTab url="/" displayText="Lorem Ipsum" />
      </Stack>
    </Stack>
  )
}
