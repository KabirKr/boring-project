import type { NextPage } from "next"
import { useQuery } from "react-query"
import axios from "axios"

import type { User } from "../../types/user"

import UsersTable from "../../components/UsersTable"
import Loading from "../../components/common/Loading"
import Error from "../../components/common/Error"

const Home: NextPage = () => {
  const getUsers = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users")
    return res.data
  }

  const { data, isLoading, isError, error } = useQuery("users", getUsers, {
    // Transform/filter data returned by the query function
    select: (data) => {
      const users: User[] = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        email: d.email,
        website: d.website,
      }))
      return users
    },
  })

  if (isLoading || !data) return <Loading />
  if (isError) return <Error error={error} />

  return (
    <section className="py-5">
      <h1 className="display-3">Users</h1>
      <div className="mt-3">
        <UsersTable users={data} />
      </div>
    </section>
  )
}

export default Home
