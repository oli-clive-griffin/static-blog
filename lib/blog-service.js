import { createClient } from "@supabase/supabase-js"
import matter from "gray-matter"


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const BlogService = {
  async getPostTitles() {
    const { data: blogPosts, error } = await supabase.storage.from('blog-posts').list()
    if (error) throw new Error(`error listing posts from supabse`)
  
    return blogPosts.map(({name}) => name.replace('.md', ''))
  },

  async getPostContent(title) {
    const {data: post, error} = await supabase.storage.from('blog-posts').download(`${title}.md`)
    if (error) throw new Error(`error fetching ${title} from supabse`)
  
    const { content } = matter(Buffer.from(await post.arrayBuffer()))

    return content
  }
}

export default BlogService
