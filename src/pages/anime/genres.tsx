import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'

export default function GenresPage() {
  const router = useRouter()

  const handleClick = (genre: string) => {
    router.push(`/anime/genre/${genre}`)
  }

  return (
    <Layout>
      <Button variant="ghost" onClick={() => handleClick('Action')}>
        Action
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Adeventure')}>
        Adventure
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Cars')}>
        Cars
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Comedy')}>
        Comedy
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Drama')}>
        Drama
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Fantasy')}>
        Fantasy
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Horror')}>
        Horror
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Mahou Shoujo')}>
        Mahou Shoujo
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Mecha')}>
        Mecha
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Music')}>
        Music
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Mystery')}>
        Mystery
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Psychological')}>
        Psychological
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Romance')}>
        Romance
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Sci-Fi')}>
        Sci-Fi
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Slice of Life')}>
        Slice of Life
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Sports')}>
        Sports
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Supernatural')}>
        Supernatural
      </Button>
      <Button variant="ghost" onClick={() => handleClick('Thriller')}>
        Thriller
      </Button>
    </Layout>
  )
}
