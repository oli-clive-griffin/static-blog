import Link from "next/link"
import BlogService from "../lib/blog-service"

export const getStaticProps = async () => ({
  props: { titles: await BlogService.getPostTitles() },
  revalidate: 60
})

export default function Writing({ titles }) {
  return (
    <div className='flex flex-col px-4'>
      <p className='text-lg'>{'Writing:'}</p>
      <p>{`A series of mild rants that I'm putting up here to incentivise myself to write more.`}</p>
      {titles.map(title => (
        <Link key={title} href={`/post/${title}`}>
          <a className='hover:underline w-fit'>
            - {title}
          </a>
        </Link>
      ))}
    </div>
  )
}
