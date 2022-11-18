import utilStyles from '../styles/utils.module.scss'

export default function Pagination({ page, setPage }: { page: string; setPage: React.Dispatch<React.SetStateAction<string>> }) {

  const handlePrev = () => {
    setPage(Math.max(1, parseInt(page) - 1).toString())
  }

  const handleNext = () => {
    setPage((parseInt(page) + 1).toString())
  }

  return(
    <div className={utilStyles.navBtnContainer}>
      <button className={utilStyles.navBtn} onClick={handlePrev}>
        prev
      </button>
      <button className={utilStyles.navBtn} onClick={handleNext}>
        next
      </button>
    </div>
  )
}
