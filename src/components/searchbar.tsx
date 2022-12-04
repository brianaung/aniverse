import { SearchIcon } from '@chakra-ui/icons'
import { ModalOverlay, ModalContent, Button, Input, InputLeftElement, InputGroup, Kbd, Text, InputRightElement, useDisclosure, Modal } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
// import styles from './searchbar.module.scss'
//
function KeybindIcon() {
  return (
    <span style={{minWidth:'100px'}}>
      <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
    </span>
  )
}

export default function Searchbar() {
  const router = useRouter()
  // const searchBoxRef = useRef<HTMLInputElement>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleInput = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/anime/search/${e.target.searchbar.value}`)
  }

  // focus to search input box on keydown
  useEffect(() => {
    const handleFocus = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        // searchBoxRef.current?.click()
        // searchBoxRef.current?.focus()
        onOpen()
      }
    }
    // todo: learn more abt vanilla js
    document.addEventListener('keydown', handleFocus)
    return function cleanup() {
      document.removeEventListener('keydown', handleFocus)
    }
  }, [])

  return (
    <>
      <Button onClick={onOpen} leftIcon={<SearchIcon />} rightIcon={<KeybindIcon />} variant='searchbar'>
        Search Anime, Manga
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleInput}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon />}
              />
              <Input
                id="searchbar"
                placeholder="Search Anime, Manga"
              />
            </InputGroup>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
