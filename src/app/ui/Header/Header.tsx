
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../images/logo.svg';
import { State, User } from '../../store/state';
import { UserProfile } from '../UserProfile/UserProfile';
// tslint:disable-next-line:no-import-side-effect
import './header.scss';


export interface HeaderProps extends RouteComponentProps {
  me: User;
}

// tslint:disable-next-line:variable-name
const HeaderConnect = connect((state: State) => ({
  me: state.Me
}))(
  class HeaderBase extends Component<HeaderProps> {
    public static urls = [
      {
        path: '/',
        text: 'Share Feedback'
      },
      {
        path: '/my-feedback',
        text: 'My Feedback'
      }
    ];
    public render() {
      const current = this.props.location.pathname;

      return <header>
        <div className='wrapper'>
          <Link to='/'>
            <img src={logo} alt='Honesto' className='logo' />
          </Link>
          <ul>
            {HeaderBase.urls.map(({ path, text }) =>
              <li className={path === current ? 'active' : ''} key={path}>
                <Link to={path}>{text}</Link>
              </li>
            )}
          </ul>
          <div className='user'>
            <UserProfile userID={this.props.me.id} />
            <div className='text'>
              <span>{this.props.me.fname} {this.props.me.lname}</span>
              <Link to='/logout'>Logout</Link>
            </div>
          </div>
        </div>
      </header>;
    }
  }
);

// tslint:disable-next-line:variable-name
export const Header = withRouter((props) => <HeaderConnect {...props} />);
