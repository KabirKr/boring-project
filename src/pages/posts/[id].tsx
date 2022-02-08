import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import axios from "axios"

import Loading from "../../components/common/Loading"
import Error from "../../components/common/Error"

const getPost = async (postId: number) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  )

  return res.data
}

const Post: NextPage = () => {
  const { query, isReady } = useRouter()
  const { id } = query

  useEffect(() => {
    if (!isReady) return
  }, [isReady])

  // TODO Use param id instead of static id 1
  const { data, isLoading, isError, error } = useQuery("post", () => getPost(1))

  if (isLoading) return <Loading />
  if (isError) return <Error error={error} />

  return (
    <section className="py-5">
      <h1 className="display-3">{data.title}</h1>
      <p className="fs-5">{data.body}</p>
    </section>
  )
}

export default Post
