import { Box, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { CharacterInfo } from '../types'
import styles from './charactersList.module.scss'

export default function CharactersList({ characters }: { characters: CharacterInfo[] }) {
  return (
    <>
      <Box className={styles.container}>
        {characters.map((c) => (
          <Stack key={c.id} align="center">
            <Image className={styles.image} src={c.image} width={100} height={100} alt={c.name.full} />
            <Text as="b" fontSize="xs" noOfLines={1} textAlign="center" textTransform="uppercase">
              {c.name.full}
            </Text>
          </Stack>
        ))}
      </Box>
    </>
  )
}
