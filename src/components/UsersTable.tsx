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

  const data = useMemo(() => users, [users])

  const tableInstance = useTable({ columns, data })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps()

          return (
            <tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps()
                return (
                  <th key={key} {...restColumn}>
                    {column.render("Header")}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          const { key, ...restRowProps } = row.getRowProps()

          return (
            <tr key={key} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps()
                return (
                  <td key={key} {...restCellProps}>
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UsersTable
