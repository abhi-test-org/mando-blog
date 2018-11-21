import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import HomePageCard from '../components/home-page-card';
import { Typography } from '@material-ui/core';

const IndexPage = (props) => (
  <Layout>
    <div>
      <div>
        <Typography variant="h3" component="h1">
          Armando Vasquez
        </Typography>
        <br />
        <Typography component="p">
          I'm a software developer 
        </Typography>
      </div>
      <br />
      <HomePageCard 
        imageObj={ <Img fluid={props.data.blogHeaderImage.childImageSharp.fluid} /> }
        title="Blog" 
        path="/blog/" 
        description="Blog posts on coding, cybersecurity, gaming, and anything else that pops into my head!" />
      <br />
      <HomePageCard 
        imageObj={ <Img fluid={props.data.appLibraryHeaderImage.childImageSharp.fluid} /> }
        title="App Library" 
        path="/app-library/" 
        description="Roster of all the apps I've created or am working on creating" />
      <br />
      <HomePageCard 
        imageObj={ <Img fluid={props.data.tipsHeaderImage.childImageSharp.fluid} /> }
        title="Buy Me Coffee" 
        path="/tips/" 
        description="Tips are much appreciated! :)" />
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    blogHeaderImage: file(relativePath: { eq: "blog-header.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300, maxHeight: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    appLibraryHeaderImage: file(relativePath: {eq: "app-library-header.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 300, maxHeight: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    tipsHeaderImage: file(relativePath: {eq: "tips-header.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 300, maxHeight: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
