import { SearchIcon } from '@chakra-ui/icons'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  // Kbd,
  Modal,
  ModalContent,
  ModalOverlay,
  Show,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAnimeSearch } from '../lib/anime'
import { AnimeResult } from '../types'
// import MyLink from './myLink'

const PER_PAGE = 10

// function KeybindIcon() {
//   return (
//     <span style={{ minWidth: '100px' }}>
//       <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
//     </span>
//   )
// }

export default function Searchbar() {
  const MyLink = dynamic(() => import('./myLink'), { ssr: false })
  const router = useRouter()
  const [searchData, setSearchData] = useState<AnimeResult[] | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // search on submit
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/anime/search/${e.target.searchbar.value}`)
  }

  // search while typing
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fetchData = async (query: string) => {
      // console.log('query: ' + e.target.value)
      const { data, error } = await getAnimeSearch(query, 1, PER_PAGE)
      if (!data) {
        console.log('[Fetch Data] ' + error.message)
      } else {
        setSearchData(data.results)
      }
    }
    if (e.target.value.length < 2) {
      setSearchData(null)
    }
    if (e.target.value.length > 2) {
      fetchData(e.target.value)
    }
  }

  // clear search data on modal close
  useEffect(() => {
    if (!isOpen) {
      setSearchData(null)
    }
  }, [isOpen])

  // focus to search input box on keydown
  useEffect(() => {
    const handleKbdShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        // searchBoxRef.current?.click()
        // searchBoxRef.current?.focus()
        onOpen()
      }
    }
    document.addEventListener('keydown', handleKbdShortcut)
    return function cleanup() {
      document.removeEventListener('keydown', handleKbdShortcut)
    }
  }, [onOpen])

  return (
    <>
      <Show above="md">
        <Button mr="auto" onClick={onOpen} leftIcon={<SearchIcon />} variant="searchbar">
          Search Anime, Manga
        </Button>
      </Show>
      <Show below="md">
        <Button mr="auto" variant="ghost" onClick={onOpen}>
          <SearchIcon />
        </Button>
      </Show>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {/* note: some default styles from modalcontent are removed for showing query results
            as you type in my own style (in a seperate box)
        */}
        <ModalContent mx="1rem" gap="1rem" bg="none" boxShadow="0">
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input onChange={handleInput} id="searchbar" placeholder="Search Anime, Manga" />
            </InputGroup>
            <InputGroup>
              {/* 
              # todo:
              add search filteroptions:
              * type
              * season
              * format
              * genres
              * year
              * status
              */}
            </InputGroup>
          </form>
          {/* show search results as you type */}
          {searchData && searchData.length > 0 && (
            <Stack
              border="solid 2px black"
              bg="white"
              gap="1rem"
              p="1rem"
              borderRadius="5px"
              maxH="50vh"
              overflow="scroll">
              {searchData.map((anime) => (
                <MyLink key={anime.id} onClick={onClose} href={`/anime/info/${anime.id}`}>
                  <Stack direction="row">
                    <Image
                      style={{
                        border: 'solid 2px black'
                      }}
                      src={anime.image}
                      alt={anime.title.english}
                      width={50}
                      height={50}
                    />
                    <Text w="100%" as="b" fontSize="sm">
                      {anime.title.english || anime.title.romaji || anime.title.native || anime.title.userPreferred}
                      {anime.releaseDate && <p>({anime.releaseDate})</p>}
                    </Text>
                  </Stack>
                </MyLink>
              ))}
            </Stack>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
