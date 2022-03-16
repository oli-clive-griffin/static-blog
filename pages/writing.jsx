import Link from "next/link"
import fs from 'fs'
import matter from "gray-matter"
import { join } from "path"

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

export const getStaticProps = () => {
  const postsDirectory = join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
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

export default Writing
