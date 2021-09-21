/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet, HelmetProps } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { SiteSeOdataQuery } from "../types/graphql-types"
import ogp_image from "../images/brian-cornelius-fqli_lsxtIo-unsplash.jpg"
type SeoProps = {
  description?: string
  lang?: string
  meta?: HelmetProps["meta"][]
  title: string
  image?: string
}

const Seo: React.VFC<SeoProps> = ({
  description,
  lang,
  meta,
  title,
  image,
}) => {
  const { site }: { site: SiteSeOdataQuery["site"] } = useStaticQuery(
    graphql`
      query SiteSEOdata {
        site {
          siteMetadata {
            siteUrl
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription: HelmetProps["titleTemplate"] =
    description || site!.siteMetadata!.description || ""
  const defaultTitle = site?.siteMetadata?.title

  const siteUrl = site!.siteMetadata!.siteUrl
  const defaultImage = `${siteUrl}${ogp_image}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          property: "og:image",
          content: image || defaultImage,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site!.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default Seo
