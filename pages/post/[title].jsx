import md from 'markdown-it'
import matter from 'gray-matter'
import { createClient } from '@supabase/supabase-js'

export default function PostPage({ title, content }) {
  return (
    <div className='max-w-2xl mb-24 post px-4'>
      <h1 >{title}</h1>
      <div className='line' />
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
}

export async function getStaticPaths() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const {data, error} = await supabase.storage.from('blog-posts').list()
  if (error) throw new Error('error listing posts from supabse')

  const paths = data.map(({ name }) => ({
      params: {
        title: name.replace('.md', '')
      },
  }));

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { title } }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const {data, error} = await supabase.storage.from('blog-posts').download(`${title}.md`)
  if (error) throw new Error(`error fetching ${title} from supabse`)

  const { content } = matter(Buffer.from(await data.arrayBuffer()))

  return {
    props: { title, content }
  };
}
