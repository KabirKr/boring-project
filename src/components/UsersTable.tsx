import { useMemo } from "react"
import { useTable, Column } from "react-table"
import type { User } from "../types/user"

type Props = {
  users: User[]
}

// TODO Add sorting, filtering and pagination

const UsersTable = ({ users }: Props) => {
  const columns: Column<User>[] = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Website", accessor: "website" },
    ],
    [],
  )

  const data = useMemo(() => users, [])

  const tableInstance = useTable({ columns, data })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}> {column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UsersTable
