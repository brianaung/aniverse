import { SearchIcon } from '@chakra-ui/icons'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Kbd,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAnimeSearch } from '../lib/anime'
import { AnimeResult } from '../types'

const PER_PAGE = 10

function KeybindIcon() {
  return (
    <span style={{ minWidth: '100px' }}>
      <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
    </span>
  )
}

export default function Searchbar() {
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
    // todo: learn more abt vanilla js
    document.addEventListener('keydown', handleKbdShortcut)
    return function cleanup() {
      document.removeEventListener('keydown', handleKbdShortcut)
    }
  }, [onOpen])

  return (
    <>
      <Button onClick={onOpen} leftIcon={<SearchIcon />} rightIcon={<KeybindIcon />} variant="searchbar">
        Search Anime, Manga
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {/* note: some default styles from modalcontent are removed for showing query results
            as you type in my own style (in a seperate box)
        */}
        <ModalContent gap="1rem" bg="none" boxShadow="0">
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input onChange={handleInput} id="searchbar" placeholder="Search Anime, Manga" />
            </InputGroup>
          </form>
          {/* show search results as you type */}
          {/* todo: style the results */}
          {searchData && searchData.length > 0 && (
            <Stack border="solid 1px black" bg="white" gap="1rem" p="1rem" borderRadius="5px">
              {searchData.map((anime) => (
                <Stack direction="row" key={anime.id}>
                  <Text as="b" fontSize="sm" noOfLines={1} textTransform="uppercase">
                    <Link onClick={onClose} href={`/anime/info/${anime.id}`}>
                      {anime.title.english}
                    </Link>
                  </Text>
                </Stack>
              ))}
            </Stack>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
