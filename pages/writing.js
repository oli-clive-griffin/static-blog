import Link from "next/link"
import Supabase from "../lib/supabase"

export const getStaticProps = async () => ({
  props: { titles: await Supabase.getPostTitles() },
  revalidate: 60
})

const Writing = ({ titles }) => (
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

export default Writing
