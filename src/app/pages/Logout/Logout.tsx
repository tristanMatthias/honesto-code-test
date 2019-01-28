import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/Auth';
import { State } from '../../store/state';
import { Redirect } from 'react-router';

export interface LogoutProps {
  token?: string;
  actions: {
    logout: () => void;
  }
}

export const Logout = connect(({Auth}: State) => ({
  token: Auth.token
}), (dispatch) => ({
  actions: {
    logout: () => logout()(dispatch)
  }
}))(

class LogoutBase extends Component<LogoutProps> {

  componentDidMount() {
    this.props.actions.logout();
  }

  render() {
    return this.props.token ? null : <Redirect to="/login" />
  }
}

);
