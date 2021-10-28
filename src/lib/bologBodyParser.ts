import parse, { domToReact, htmlToDOM, Element } from "html-react-parser"

const BologBodyParser = (value: string) => {
  return parse(value)
}
export default BologBodyParser
