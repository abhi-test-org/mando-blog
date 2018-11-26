import React, { Component } from "react"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { navigate } from '@reach/router';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Component for a single blog post item in the blog feed
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
                <Table>
                  <TableRow>
                    <TableCell>{post.frontmatter.date}</TableCell>
                    <TableCell>{post.timeToRead}-minute read</TableCell>
                  </TableRow>
                </Table>
                  
                  
                  <Typography component="p">
                      
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