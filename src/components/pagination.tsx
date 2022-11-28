import styles from './pagination.module.scss'

// todo: only show next/prev button if the next/prev page exists
export default function Pagination({
  page,
  setPage
}: {
  page: string
  setPage: React.Dispatch<React.SetStateAction<string>>
}) {
  const handlePrev = () => {
    setPage(Math.max(1, parseInt(page) - 1).toString())
  }

  const handleNext = () => {
    setPage((parseInt(page) + 1).toString())
  }

  return (
    <div className={styles.navBtnContainer}>
      <button className={styles.navBtn} onClick={handlePrev}>
        prev
      </button>
      <button className={styles.navBtn} onClick={handleNext}>
        next
      </button>
    </div>
  )
}
