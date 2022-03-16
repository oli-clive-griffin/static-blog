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
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
      params: {
        slug: fileName.replace('.md', ''),
      },
  }));

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const { data: blogPosts, error } = await supabase.storage.from('blog-posts').list()
  for (const bp of blogPosts) {
    const {data: file, error} = await supabase.storage.from('blog-posts').download(bp.name)
    if (error) {
      console.log(error)
      continue
    }
    const buf = Buffer.from(await file.arrayBuffer())
    await fs.promises.writeFile(`files/${bp.name}`, buf);
  }


  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}
