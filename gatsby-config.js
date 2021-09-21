module.exports = {
  siteMetadata: {
    title: `mochi blog`,
    author: {
      name: `mochi`,
    },
    description: `mochi のブログです`,
    siteUrl: `https://blog.mochi3.dev`,
    social: {
      twitter: `mochi_749`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    "@chakra-ui/gatsby-plugin",
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-sns-images`,
            options: {
              output: {
                directory: "",
                fileName: "thumbnail.png",
              },
              image: {
                width: 1200,
                height: 630,
                backgroundColor: "#dbe2ef",
              },
              style: {
                title: {
                  fontFamily: "Noto Sans CJK JP",
                  fontColor: "#000000",
                  fontWeight: "bold",
                  fontSize: 64,
                  paddingTop: 100,
                  paddingBottom: 200,
                  paddingLeft: 150,
                  paddingRight: 150,
                },
                author: {
                  fontFamily: "Noto Sans CJK JP",
                  fontColor: "#020205",
                  fontWeight: "400",
                  fontSize: 42,
                },
              },
              meta: {
                title: "mochi blog |",
                author: "mochi3.dev",
              },
              fontFile: [
                {
                  path: require.resolve("./src/fonts/NotoSansCJKjp-Bold.otf"),
                  family: "Noto Sans CJK JP",
                  weight: "bold",
                },
                {
                  path: require.resolve(
                    "./src/fonts/NotoSansCJKjp-Regular.otf"
                  ),
                  family: "Noto Sans CJK JP",
                  weight: "400",
                },
              ],
              iconFile: require.resolve("./src/images/siteicon.png"),
              timeout: 10000,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        codegen: false,
        fileName: `src/types/graphql-types.d.ts`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `JetBrains Mono\:300,300i`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mochi blog`,
        short_name: `mochi blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/siteicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
