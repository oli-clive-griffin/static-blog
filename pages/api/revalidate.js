export default function handler(req, res) {
  res.unstable_revalidate()

}