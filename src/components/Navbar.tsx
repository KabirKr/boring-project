import Link from "next/link"
import { useRouter } from "next/router"

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <ul className="navbar-nav d-flex">
          <li className="nav-item">
            <Link href="/">
              <a className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/posts">
              <a
                className={`nav-link ${
                  pathname.startsWith("/posts") ? "active" : ""
                }`}
              >
                Posts
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/users">
              <a
                className={`nav-link ${
                  pathname.startsWith("/users") ? "active" : ""
                }`}
              >
                Users
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/todos">
              <a
                className={`nav-link ${
                  pathname.startsWith("/todos") ? "active" : ""
                }`}
              >
                Todos
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
