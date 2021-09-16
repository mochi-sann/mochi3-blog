import * as React from "react"
import { Link } from "gatsby"
import { Box, Container, Heading } from "@chakra-ui/layout"

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
    <Container data-is-root-path={isRootPath}>
      <Box as="header" p="2">
        <Link className="header-link-home" to="/">
          <Heading>{title}</Heading>
        </Link>
      </Box>

      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </Container>
  )
}

export default Layout
