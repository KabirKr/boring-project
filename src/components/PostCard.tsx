import Link from "next/link"

type Props = {
  title: string
  href: string
}

const PostCard = ({ title, href }: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link href={href}>
          <a className="card-link">Read More</a>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
