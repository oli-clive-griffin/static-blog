import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import { createClient } from '@supabase/supabase-js'


export default function PostPage({ frontmatter, content }) {
  return (
    <div className='max-w-2xl mb-24 post px-4'>
      <h1 >{frontmatter.title}</h1>
      <div className='line' />
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
}

export async function getStaticPaths() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const {data, error} = await supabase.storage.from('blog-posts').list()
  if (error) throw new Error('error listing posts from supabse')
  const fileNames = data.map(bp => bp.name)

  const paths = fileNames.map((fileName) => ({
      params: {
        slug: fileName
      },
  }));

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const {data, error} = await supabase.storage.from('blog-posts').download(bp.name)
  if (error) throw new Error(`error fetching ${bp.name} from supabse`)

  const { data: { title }, content } = matter(Buffer.from(await data.arrayBuffer()))

  return {
    props: {
      title,
      content,
    },
  };
}
