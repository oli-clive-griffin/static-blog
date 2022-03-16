import Link from "next/link"
import fs from 'fs'
import matter from "gray-matter"
import { join } from "path"
import { createClient } from '@supabase/supabase-js'

const Writing = ({ posts }) => (
  <div className='flex flex-col px-4'>
    <p className='text-lg'>{'Writing:'}</p>
    <p>{`A series of mild rants that I'm putting up here to incentivise myself to write more.`}</p>
    {posts.map(({ slug, title }) => (
      <Link key={slug} href={`/post/${slug}`}>
        <a className='hover:underline w-fit'>
          - {title}
        </a>
      </Link>
      ))}
  </div>
)

export const getStaticProps = async () => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const { data: blogPosts, error } = await supabase.storage.from('blog-posts').list()
  if (error) throw new Error(`error listing posts from supabse`)

  const posts = blogPosts.map(async bp => ({
    slug: bp.name,
    title: matter(Buffer.from(await file.arrayBuffer())).title
  }))
    .filter(({ title }) => title != null)

  return {
    props: {
      posts,
    }
  }
}

export default Writing
