import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { navigate } from 'gatsby';

import headerStyles from './header.module.css'

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

class Header extends Component {

  constructor( props ) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleDrawerOpen = () => {
    this.setState((state) => { 
      this.props.sideMenuOpenCallback( true )
      return {open: state.open = true} }
    );
  };

  handleDrawerClose = () => {
    this.setState((state) => { 
      this.props.sideMenuOpenCallback( false )
      return {open: state.open = false} }
    );
  };

  render() {

    const { classes } = this.props;
    const { open } = this.state;

    return(
      <div 
        className={headerStyles.root}
        style={{
          marginBottom: '1.45rem',
        }}
      >
        <CssBaseline />

        {/* App Bar */}
        <AppBar 
          position="fixed"
          className={classNames(headerStyles.appBar, {
            [headerStyles.appBarShift]: open,
          })}
          color="primary">
          <Toolbar disableGutters={!open}>
            <IconButton 
              color="inherit" 
              aria-label="Menu" 
              onClick={this.handleDrawerOpen}
              className={classNames(headerStyles.menuButton, open && headerStyles.hide)}>
              <Icon 
                color="inherit"
                aria-label="Open drawer">
                  menu
              </Icon>
            </IconButton>
            <Typography variant="h6" color="inherit">
              {this.props.siteTitle}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          className={headerStyles.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: headerStyles.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <Icon > chevron_left </Icon>
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemIcon> <Icon > home </Icon> </ListItemIcon>
              <ListItemText> Home Page </ListItemText>
            </ListItem>
            <ListItem button onClick={() => navigate('/blog/')}>
              <ListItemIcon> <Icon> computer </Icon> </ListItemIcon>
              <ListItemText> Blog </ListItemText>
            </ListItem>
            <ListItem button onClick={() => navigate('/app-library/')}>
              <ListItemIcon> <Icon> smartphone </Icon> </ListItemIcon>
              <ListItemText> App Library </ListItemText>
            </ListItem>
            <ListItem button onClick={() => navigate('/tips/')}>
              <ListItemIcon> <Icon> sentiment_very_satisfied </Icon> </ListItemIcon>
              <ListItemText> Buy Me Coffee </ListItemText>
            </ListItem>
            <ListItem button >
              <ListItemIcon> <Icon> keyboard_arrow_right </Icon> </ListItemIcon>
              <ListItemText> Resume </ListItemText>
            </ListItem>
            <ListItem button component="a" href='https://github.com/ax-vasquez/mando-blog'>
              <ListItemIcon> <Icon> keyboard_arrow_right </Icon> </ListItemIcon>
              <ListItemText> Github </ListItemText>
            </ListItem>
            <ListItem button component="a" href="https://www.linkedin.com/in/axvasquez/" >
              <ListItemIcon> <Icon> keyboard_arrow_right </Icon> </ListItemIcon>
              <ListItemText> LinkedIn </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
    )
    
  }
  
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
