import React, { Component } from 'react'
import { Link } from 'gatsby'

class Header extends Component {

  constructor( props ) {
    super(props)
    this.state = {
      hovered: false,
    }
  }

  // It's important to read "state" instead of "this.state" (TODO: Find out why this is - https://reactjs.org/docs/faq-state.html)
  setTitleHoveredText() {
    this.setState((state) => {
      return {  hovered: state.hovered = true }
    })
  }

  setTitleNonHoveredText() {
    this.setState((state) => {
      return {  hovered: state.hovered = false }
    })
  }

  // Describes the header rendered when state.hovered is true
  renderHoveredHeader() {
    return(
      <div
        style={{
          background: this.props.backgroundColor,
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <h1 
          style={{ margin: 0 }}>
            <Link
              onMouseEnter={() => this.setTitleHoveredText() }
              onMouseLeave={() => this.setTitleNonHoveredText() }
              to="/"
              style={{
                color: '#AAAAAA',
                textDecoration: 'none',
              }}
            >
              {this.props.siteTitle}
            </Link>
          </h1>
        </div>
      </div>
    )
    
  }

  // Describes the header rendered when state.hovered is false
  renderNonHoveredHeader() {
    return(
      <div
          style={{
            background: this.props.backgroundColor,
            marginBottom: '1.45rem',
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '1.45rem 1.0875rem',
            }}
          >
            <h1 
            style={{ margin: 0 }}>
              <Link
                onMouseEnter={() => this.setTitleHoveredText() }
                onMouseLeave={() => this.setTitleNonHoveredText() }
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {this.props.siteTitle}
              </Link>
            </h1>
          </div>
        </div>
    )
  }

  render() {

    const isHovered = this.state.hovered;
    
    if ( isHovered ) {
      return(
        this.renderHoveredHeader()
      )
    } else {
      return(
        this.renderNonHoveredHeader()
      )
    }
    
  }
  
}

export default Header
