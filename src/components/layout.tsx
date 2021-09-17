import * as React from "react"
import { Link } from "gatsby"
import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/layout"
import { FiTwitter, FiGithub } from "react-icons/fi"
import { Button, IconButton } from "@chakra-ui/button"
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
        <Container maxW="800px">
          <Flex as="header" py="2" gridGap="2">
            <Link className="header-link-home" to="/">
              <Heading fontWeight="800">{title}</Heading>
            </Link>
            <Spacer />
            <IconButton
              as="a"
              href="https://twitter.com/Mochi_749"
              // bg="black"
              // _hover={{ bg: "black" }}
              // _active={{ bg: "black" }}
              colorScheme="twitter"
              color="white"
              icon={<FiTwitter size="20px" />}
              aria-label="twitter"
            />
            <IconButton
              as="a"
              href="https://twitter.com/Mochi_749"
              bg="black"
              _hover={{ bg: "black" }}
              _active={{ bg: "black" }}
              // colorScheme="twitter"
              color="white"
              icon={<FiGithub size="20px" />}
              aria-label="GitHub"
            />
          </Flex>
        </Container>
      </Box>
      <Container data-is-root-path={isRootPath} maxW="800px">
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
