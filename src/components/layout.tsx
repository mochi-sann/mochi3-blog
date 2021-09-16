import * as React from "react"
import { Link } from "gatsby"
import { Box, Container, Flex, Heading } from "@chakra-ui/layout"

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
    <Box>
      <Box boxShadow="base">
        <Container>
          <Flex as="header" p="2">
            <Link className="header-link-home" to="/">
              <Heading fontWeight="800">{title}</Heading>
            </Link>
          </Flex>
        </Container>
      </Box>
      <Container data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </Container>
    </Box>
  )
}

export default Layout
