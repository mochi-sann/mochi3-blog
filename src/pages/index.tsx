import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GetSitelistQuery } from "../types/graphql-types"
import { Box, Heading, Text, VStack, StackDivider } from "@chakra-ui/react"

type Props = GetSitelistQuery

const BlogIndex: React.VFC<PageProps<Props>> = ({ data, location }) => {
  const siteTitle = data.site!.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      {/* <Seo title="All posts" /> */}
      {/* <Bio /> */}
      <VStack
        divider={<StackDivider borderColor="gray.300" />}
        as="ol"
        style={{ listStyle: `none` }}
      >
        {posts.map(post => {
          const title = post.frontmatter!.title || post.fields!.slug

          return (
            <Box as="li" key={post.fields!.slug} w="full">
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <Heading as="h2">
                    <Link to={post.fields!.slug || ""} itemProp="url">
                      <Text as="span" itemProp="headline">
                        {title}
                      </Text>
                    </Link>
                  </Heading>

                  <small>{post.frontmatter!.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        post.frontmatter!.description || post.excerpt || "",
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </Box>
          )
        })}
      </VStack>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query GetSitelist {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
