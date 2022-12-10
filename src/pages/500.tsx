import Link from 'next/link'

export default function Custom500() {
  return (
    <h1>
      500 Error. Go back <Link href="/">home</Link>.
    </h1>
  )
}
