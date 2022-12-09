import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import styles from './pagination.module.scss'

export default function Pagination({
  page,
  setPage,
  hasNextPage
}: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  hasNextPage: boolean
}) {
  const handlePrev = () => {
    setPage(Math.max(1, page - 1))
  }

  const handleNext = () => {
    setPage(page + 1)
  }

  return (
    <div className={styles.navBtnContainer}>
      {page !== 1 && (
        <Button onClick={handlePrev}>
          <ArrowBackIcon />
        </Button>
      )}
      {hasNextPage && (
        <Button onClick={handleNext}>
          <ArrowForwardIcon />
        </Button>
      )}
    </div>
  )
}
