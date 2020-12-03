import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export type MetaTagType = React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[] | undefined;
export type LinkTagType = React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>[] | undefined;

export interface Props {
  propMetaDescription?: string,
  lang?: string,
  meta?: MetaTagType
  link?: LinkTagType
  title?: string,
}

/////////////////////////////  Component ////////////////////////////////////////
const SEO: FC<Props> = ({ propMetaDescription, lang = 'en', meta = [], link = [], title, }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = propMetaDescription || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || site.siteMetadata.title}

      link={[
        { rel: 'icon', href: "data:image/png;base64,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" },
        ...link
      ]}

      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title || site.siteMetadata.title,
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
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title || site.siteMetadata.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...meta
      ]}
    />
  )
}

export default SEO
