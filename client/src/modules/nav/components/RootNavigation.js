import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { createStructuredSelector } from 'reselect';
//import { getActive } from '../selectors';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import BottomNavigation from './BottomNavigation';
import TopBar from './TopBar';
import UnauthNav from './UnauthNav';
import Options from './Options';
//import * as actions from '../actions';

class RootNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = { displayOptions: false };
  }

  toggleOptions() {
    this.setState({ displayOptions: !this.state.displayOptions });
  }

  componentWillMount() {
    //console.log('this.props in RootNavigation.componentWillMount', this.props)
  }
  componentWillReceiveProps(newProps) {
    //console.log('newProps in RootNavigation.componentWillReceiveProps',newProps);
  }

  renderTopBar() {
    if(this.props.authenticated) {
      return <TopBar authUsername={this.props.authUsername} active={this.props.active} toggleOptions={this.toggleOptions.bind(this)} />
    } else {
      return <div></div>
    }
  }

  renderBottomNavigation() {
    if(this.props.authenticated) {
      return <BottomNavigation active={this.props.active} />
    } else if(this.props.location.pathname === '/') {
      return <div></div>
    } else {
      return <UnauthNav />
    }
  }

  render() {
    const transparentDiv = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 111;
      background-color: rgba(0,0,255,0);
      pointer-events: none;
      width: 100%;
      height 100%;
    `;
    // const transparentStyle = {
    //   'position': 'fixed',
    //   'top': '0',
    //   'left': '0',
    //   'zIndex': '111',
    //   'backgroundColor': 'rgba(0,0,255,0)',
    //   'pointerEvents': 'none',
    //   'width': '100%',
    //   'height': '100%'
    // }
    if (this.state.displayOptions) {
      return (
        <transparentDiv>
          <Options toggleOptions={this.toggleOptions.bind(this)}/>
        </transparentDiv>
      );
    }
    return <transparentDiv>
      {this.renderTopBar()}
      {this.renderBottomNavigation()}
    </transparentDiv>
  }
}

export default withRouter(connect((state, props) => {
  let authUsername = null;
  const allUsers = state.users.byId;
  const authUserId = state.auth.userId;
  const authUser = allUsers[authUserId];

  if (authUser) {
    authUsername = authUser.username;
  }

  return { active: state.nav.active, authUsername }
})(RootNavigation));
