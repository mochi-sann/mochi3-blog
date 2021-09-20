import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { BlogPostBySlugQuery } from "../types/graphql-types"
import { Box, Heading, Text, Button, Divider } from "@chakra-ui/react"
import DateFormater from "../lib/dateFormater"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

const BlogPostTemplate: React.VFC<PageProps<BlogPostBySlugQuery>> = ({
  data,
  location,
}) => {
  const post = data.markdownRemark
  const siteTitle = data.site!.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post!.frontmatter!.title || ""}
        description={post!.frontmatter!.description || post!.excerpt || ""}
      />
      <Box
        as="article"
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Box>
          <Heading itemProp="headline" bg="gray.200" mt="2" p="2">
            {post!.frontmatter!.title}
          </Heading>
          <Text>{DateFormater(post!.frontmatter!.date)}</Text>
        </Box>

        <Box
          className="markdownBody"
          as="section"
          dangerouslySetInnerHTML={{ __html: post!.html || "" }}
          itemProp="articleBody"
        />
      </Box>
      <Divider />
      <Box as="nav" py="2" className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous!.fields!.slug || ""} rel="prev">
                <Button leftIcon={<ArrowBackIcon />}>
                  {previous.frontmatter!.title}
                </Button>
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields!.slug || ""} rel="next">
                <Button rightIcon={<ArrowForwardIcon />}>
                  {next.frontmatter!.title}
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </Box>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY MM DD")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
