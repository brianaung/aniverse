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
      <button className={styles.navBtn} onClick={handlePrev}>
        {'<'}
      </button>
      <button className={styles.navBtn} onClick={handleNext}>
        {'>'}
      </button>
    </div>
  )
}
