import BlogService from "../../lib/supabase"

export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATION_KEY) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.unstable_revalidate('/writing')

    await Promise.all((await BlogService.getPostTitles()).map(
      title => res.unstable_revalidate(`/post/${title}`)
    ))

    return res.json({ revalidated: true })

  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
