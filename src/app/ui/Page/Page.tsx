import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Auth, State } from '../../store/state';
import { Header } from '../Header/Header';


export interface PageProps {
  authall: Auth;
  page: string;
  header: boolean;
  auth: boolean;
  authLoggedIn: boolean;
  authVerified: boolean;
  authToken?: string;
}


export const Page = connect((state: State) => ({
  authall: state.Auth,
  authLoggedIn: state.Auth.loggedIn,
  authVerified: state.Auth.verified,
  authToken: state.Auth.token
}))(

class PageBase extends React.Component<PageProps> {
  public static defaultProps = {
    header: true,
    auth: true
  };


  public render() {
    // If verified and not logged in, and page is protected, redirect to login
    if (this.props.auth && this.props.authLoggedIn === false && this.props.authVerified) {
      return <Redirect to='/login' />;
    }

    return <main className={this.props.page}>
      {this.props.header ? <Header /> : null}
      <div className='wrapper'>{this.props.children}</div>
    </main>;
  }

});
