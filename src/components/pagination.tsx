import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import styles from './pagination.module.scss'

// todo: only show next/prev button if the next/prev page exists
export default function Pagination({
  page,
  setPage
}: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const handlePrev = () => {
    setPage(Math.max(1, page - 1))
  }

  const handleNext = () => {
    setPage(page + 1)
  }

  return (
    <div className={styles.navBtnContainer}>
      <Button onClick={handlePrev}>
        <ArrowBackIcon />
      </Button>
      <Button onClick={handleNext}>
        <ArrowForwardIcon />
      </Button>
    </div>
  )
}
