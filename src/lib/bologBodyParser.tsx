import parse, {
  domToReact,
  htmlToDOM,
  Element,
  DOMNode,
  HTMLReactParserOptions,
} from "html-react-parser"
import { Heading, Text, Box, Divider } from "@chakra-ui/react"
import React from "react"

const BologBodyParser = (value: string) => {
  return parse(value, {
    replace: (domNode: any) => {
      if (!domNode.attribs) {
        return
      }

      if (
        domNode.name === "h1" ||
        domNode.name === "h2" ||
        domNode.name === "h3" ||
        domNode.name === "h4" ||
        domNode.name === "h5" ||
        domNode.name === "h6"
      ) {
        // console.dir(domNode)
        return (
          <Heading as={domNode.name}>{domToReact(domNode.children)}</Heading>
        )
      }
      if (domNode.name === "p") {
        return <Text>{domToReact(domNode.children)}</Text>
      }
      if (domNode.name === "span") {
        return <Text as="span">{domToReact(domNode.children)}</Text>
      }
      if (domNode.name === "blockquote") {
        return (
          <Box as="blockquote" p="4">
            {domToReact(domNode.children)}
          </Box>
        )
      }
      if (domNode.name === "hr") {
        return <Divider colorScheme="gray" />
      }
    },
  })
}
export default BologBodyParser
