import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { navigate } from '@reach/router';
import { withStyles } from '@material-ui/core';

const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: 'cover',
    },
}

class HomePageCard extends Component {

    render() {

        const { title, description, path, imageObj } = this.props

        return(
            <Card onClick={() => navigate( path )}>
                { imageObj }
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )

    }

}

export default withStyles(styles)(HomePageCard)