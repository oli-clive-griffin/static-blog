import md from 'markdown-it'
import BlogService from '../../lib/supabase';

export const getStaticPaths = async () => ({
  paths: (await BlogService.getPostTitles()).map(title => ({
    params: { title }
  })),
  fallback: false,
})

export const getStaticProps = async ({ params: { title } }) => ({
  props: { title, content: await BlogService.getPostContent(title) },
  revalidate: 60,
})

export default function PostPage({ title, content }) {
  return (
    <div className='max-w-2xl mb-24 post px-4'>
      <h1 >{title}</h1>
      <div className='line' />
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
}
