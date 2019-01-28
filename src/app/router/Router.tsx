import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { logout, verify } from '../actions/Auth';
import { getMe } from '../actions/Me';
import { Login } from '../pages/Login/Login';
import {Logout} from '../pages/Logout/Logout';
import { MyFeedback } from '../pages/MyFeedback/MyFeedback';
import { ShareFeedback } from '../pages/ShareFeedback/ShareFeedback';
import { State, User } from '../store/state';
import { Loading } from '../ui/Loading/Loading';

export interface RouterProps {
  token?: string;
  loggedIn?: boolean;
  verified?: boolean;
  actions?: {
    verify(): void;
    getMe(): void;
    logout(): void;
  };
  me?: User;
}

// @ts-ignore
@connect(
  (state: State) => ({
    loggedIn: state.Auth.loggedIn,
    verified: state.Auth.verified,
    token: state.Auth.token,
    me: state.Me
  }),
  ((dispatch) => ({
    actions: {
      logout: () => logout()(dispatch),
      verify: () => verify()(dispatch),
      getMe: () => getMe()(dispatch)
    }
  }))
)
export class Router extends React.Component<RouterProps> {
  public async componentDidMount() {

    if (this.props.token && !this.props.verified) {
      await this.props.actions.verify();

      if (this.props.loggedIn) {
        this.props.actions.getMe();
      }
    } else {
      this.props.actions.logout();
    }
  }

  public render() {
    if (!this.props.verified) return <Loading />;
    return <BrowserRouter>
      <Switch>
        <Route path='/logout' component={Logout} />
        <Route path='/login' component={Login} />
        <Route path='/my-feedback' component={MyFeedback} />
        <Route path='/' component={ShareFeedback} />
      </Switch>
    </BrowserRouter>;
  }
}
