import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usersGet } from '../../actions/Users';
import { State, User as UserState } from '../../store/state';
import { Box } from '../../ui/Box/Box';
import { Header } from '../../ui/Header/Header';
import { Page } from '../../ui/Page/Page';

interface UserProps {
  userID: string;
  users?: UserState[];
}

// tslint:disable-next-line:variable-name
export const User = connect(
  (state: State) => ({
    users: state.Users.users
  })
)(
  class UserBase extends Component<UserProps> {
    get user(): UserState {
      return this.props.users.find((u) => u.id === this.props.userID);
    }
    public render() {
      const user = this.user;

      if (!user) return null;

      return <div className='user'>
        <span>{user.fname} {user.lname}</span>
      </div>;
    }
  }
);
