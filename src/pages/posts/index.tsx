import { useState } from "react"
import type { NextPage } from "next"
import { useQuery } from "react-query"
import axios from "axios"

import DataCard from "../../components/common/DataCard"
import Loading from "../../components/common/Loading"
import Error from "../../components/common/Error"

const getPosts = async (page: number) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`,
  )

  return res.data
}
const Posts: NextPage = () => {
  const [pageNumber, setPageNumber] = useState(1)

  const onSuccess = (data: any) => {
    console.log(data)
    console.log("Perform side effect after data fetching")
  }

  const onError = (error: any) => {
    console.log(error)
    console.log("Perform side effect after encountering error")
  }

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    ["posts", pageNumber],
    () => getPosts(pageNumber),
    {
      // enabled: false,
      onSuccess,
      onError,
      keepPreviousData: true,
    },
  )

  if (isLoading) return <Loading />
  if (isError) return <Error error={error} />

  return (
    <section className="py-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="display-3">Posts</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => refetch()}
        >
          Refetch Posts
        </button>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-3">
        {data &&
          data.map((post: any) => (
            <div className="col" key={post.id}>
              <DataCard title={post.title} href={`/posts/${post.id}`} />
            </div>
          ))}
      </div>

      <nav aria-label="Page navigation" className="mt-3">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
          </li>

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {isFetching && (
        <div className="text-center mt-3">
          <p>Fetching next page... </p>
        </div>
      )}
    </section>
  )
}

export default Posts
