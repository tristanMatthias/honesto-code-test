import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { oauth } from '../../actions/Auth';
import { getMe } from '../../actions/Me';
// @ts-ignore
import logo from '../../images/logo-mark.svg';
import { State } from '../../store/state';
import { Page } from '../../ui/Page/Page';
// tslint:disable-next-line:no-import-side-effect
import './login.scss';


export interface LoginProps {
  token?: string;
  loading?: boolean;
  loggedIn?: boolean;
  actions?: {
    login(): void;
    getMe(): void;
  };
}

// @ts-ignore
@connect(
  (state: State) => {
    return {
      token: state.Auth.token,
      loggedIn: state.Auth.loggedIn
    };
  },
  ((dispatch) => ({
    actions: {
      login: () => oauth()(dispatch),
      getMe: () => getMe()(dispatch)
    }
  }))
)
export class Login extends Component<LoginProps> {
  public render() {
    if (this.props.loggedIn) return <Redirect to='/' />;

    return (
      <Page page={'login'} header={false} auth={false}>
        <div className='card'>
          <img src={logo} alt='Honesto' className='logo'/>
          <h1>Honesto</h1>
          <hr />
          <button
            onClick={this.login.bind(this)}
            disabled={this.props.loading}
          >Login with Google</button>
        </div>
      </Page>
    );
  }

  public async login() {
    await this.props.actions.login();
    await this.props.actions.getMe();
  }
}
