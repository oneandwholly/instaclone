import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

//import BottomNavigationItem from './BottomNavigationItem';
import * as actions from '../actions';
import users from '../../users';
import auth from '../../auth';

class BottomNavigation extends Component {
  componentWillMount() {
    //this.props.selectNavigationItem('home');
  }

  render() {
    let currentUsername = '';
    if (this.props.currentUser) {
      currentUsername = this.props.currentUser.username;
    }
    const navStyle = {
      'pointerEvents': 'auto',
      'overflow': 'hidden',
      'backgroundColor': '#eee',
      'position': 'fixed',
      'bottom': '0',
      'width': '100%',
      'zIndex': '222',
      'opacity': '1'
    }
    const navItemStyle = {
      'float': 'left',
      'display': 'block',
      'color': '#111',
      'textAlign': 'center',
      'paddingTop': '1em',
      'paddingBottom': '1em',
      'paddingLeft': '0',
      'paddingRight': '0',
      'textDecoration': 'none',
      'width': '20%'
    };

      return (
        // <nav style={navStyle}>
        //   <BottomNavigationItem name='home' />
        //   <BottomNavigationItem name='explore' />
        //   <BottomNavigationItem name='create' />
        //   <BottomNavigationItem name='activity' />
        //   <BottomNavigationItem name='profile' />
        // </nav>
        <nav style={navStyle}>
            <Link to='/' style={navItemStyle}>Home</Link>
            <Link to='/explore' style={navItemStyle}>Explore</Link>
            <Link to='/create' style={navItemStyle}>Create</Link>
            <Link to='/activity' style={navItemStyle}>Activity</Link>
            <Link to={`/${currentUsername}`} style={navItemStyle}>Profile</Link>
        </nav>
      );
  }
}

export default connect(createSelector(
  auth.selectors.getCurrentUserId,
  users.selectors.getAllUsersById,
  (currentUserId, allUsersById) => ({
    currentUser: allUsersById[currentUserId]
  })
), actions)(BottomNavigation);