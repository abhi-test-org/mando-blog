import React from "react"
import { graphql } from "gatsby"
import Grid from '@material-ui/core/Grid';
import Layout from '../components/layout'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import blogTemplateStyles from '../templates/blog-template.module.css'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
        <Grid item xs={12}>
          <Typography variant="h3">{frontmatter.title}</Typography>
          <br/>
          <Typography variant="subtitle1"> {frontmatter.date} </Typography>
          <br/>
          <Paper >
            {/* Since the HTML for blog posts is set using the dangerouslySetInnerHTML method, this div WILL NOT use material
            UI elements - to combat this, I've manually provided the same font-family used by default for Material UI's Typography component */}
            <div 
              className={blogTemplateStyles.blogPostContent}
              dangerouslySetInnerHTML={{ __html: html }} />
          </Paper>
        </Grid>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`