import { Fragment, useState, useEffect } from "react"
import type { NextPage } from "next"
import { useInfiniteQuery } from "react-query"
import { useInView } from "react-intersection-observer"

import axios from "axios"

import DataCard from "../../components/common/DataCard"
import Loading from "../../components/common/Loading"
import Error from "../../components/common/Error"

const Todos: NextPage = () => {
  const getPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${pageParam}`,
    )

    return res.data
  }

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["todos"], getPosts, {
    getNextPageParam: (lastPage, pages) => {
      // Idealy total number of pages is provided by backend api
      if (pages.length < 20) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) return <Loading />
  if (isError) return <Error error={error} />

  return (
    <section className="py-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="display-3">Todos (Infinite Scroll)</h1>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-3">
        {data?.pages?.map((group, index) => {
          return (
            <Fragment key={index}>
              {group?.map((todo: any) => (
                <div className="col" key={todo.id}>
                  <DataCard title={todo.title} href="#" />
                </div>
              ))}
            </Fragment>
          )
        })}
      </div>

      <button
        ref={ref}
        className="btn btn-primary mt-3"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load Newer"
          : "Nothing more to load"}
      </button>

      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </section>
  )
}

export default Todos
