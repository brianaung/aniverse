import Link from 'next/link'

export default function Custom404() {
  return (
    <h1>
      404 Error. Page not found. Go back <Link href="/">home</Link>.
    </h1>
  )
}
