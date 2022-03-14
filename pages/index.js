import Link from 'next/link';
import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export default function Home({ posts }) {
  return (
    <div className='flex flex-col'>
      <p>interested in education, psychology, programming, economics, mental models, sci-fi.</p>
      <p>Writing:</p>
      {posts.map(({ slug, title }) => (
        <Link key={slug} href={`/post/${slug}`}>
          <a className='hover:underline'>
            - {title}
          </a>
        </Link>
       ))}
    </div>
  )
}

export async function getStaticProps() {
  const postsDirectory = join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    console.log(slug)
    const fileContents = fs.readFileSync(join(postsDirectory, fileName), 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      ...matterResult.data
    }
  }).filter(({ title }) => title != null)

  return {
    props: {
      posts,
    }
  }
}
