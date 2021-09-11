import * as React from "react"
import { Link } from "gatsby"
import { Box } from "@chakra-ui/layout"

type Props = {
  children: React.ReactNode
  title: string
  location: {
    pathname: string
  }
}

const Layout: React.VFC<Props> = ({ location, title, children }) => {
  const rootPath = `/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Box as="header">
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </Box>

      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
