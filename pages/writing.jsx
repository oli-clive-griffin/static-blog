import Link from "next/link"
import { createClient } from '@supabase/supabase-js'

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

export const getStaticProps = async () => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const { data: blogPosts, error } = await supabase.storage.from('blog-posts').list()
  if (error) throw new Error(`error listing posts from supabse`)

  const titles = blogPosts.map(bp => bp.name.replace('.md', ''))
  console.log(blogPosts)

  return {
    props: { titles },
  }
}

export default Writing
