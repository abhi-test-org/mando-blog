import React, { Component } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

import layoutStyle from './layout.module.css'

class Layout extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      // This is shared between the Header and main content - when the side menu is opened/closed from the
      // Header, sideMenuOpen is updated - when sideMenuOpen is updated, the content in main is shifted to
      // accomodate the side menu drawer.
      sideMenuOpen: false
    }
  }

  // Callback used to set sideMenuOpen from the Header object when the side menu is opened
  sideMenuStateCallback = ( isOpen ) => {
    this.setState( { sideMenuOpen: isOpen } )
  }

  render () {

    return(
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <Helmet 
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header 
              siteTitle={data.site.siteMetadata.title}
              sideMenuOpenCallback={this.sideMenuStateCallback} />
            <main 
              style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 50 ,
              }}
              className={classNames(layoutStyle.content, {
                [layoutStyle.contentShift]: this.state.sideMenuOpen,
              })}
            >
              {this.props.children}
            </main>
          </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
