import React, { Component } from "react"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { navigate } from '@reach/router';

class PostLink extends Component {

  render() {

    const { post } = this.props

    return(
      <div>
        <Card onClick={() => navigate( post.frontmatter.path )}>
          <CardActionArea>
              <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                      {post.frontmatter.title}
                  </Typography>
                  <Typography component="p">
                      {post.frontmatter.date}
                  </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
        <br/>
      </div>
    )
  }
}

export default PostLink