import * as React from "react"
import { Link } from "gatsby"
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/layout"
import { FiTwitter, FiGithub } from "react-icons/fi"
import { Button, IconButton } from "@chakra-ui/button"
import { useColorMode } from "@chakra-ui/color-mode"
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
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Box boxShadow="base">
        <Container maxW="800px">
          <HStack as="header" py="2">
            <Link className="header-link-home" to="/">
              <Heading fontWeight="800">{title}</Heading>
            </Link>
            <Spacer />
            <IconButton
              color="white"
              onClick={toggleColorMode}
              icon={<FiTwitter size="20px" />}
              aria-label="Toggle dark mode"
            />
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
          </HStack>
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
