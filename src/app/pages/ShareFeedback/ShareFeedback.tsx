import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { usersGet } from '../../actions/Users';
import { State, User as UserState } from '../../store/state';
import { Box } from '../../ui/Box/Box';
import { Header } from '../../ui/Header/Header';
import { Page } from '../../ui/Page/Page';
import { User } from '../../ui/User/User';
// tslint:disable-next-line:no-import-side-effect
import './share-feedback.scss';

interface ShareFeedbackProps {
  users: UserState[];
  actions: {
    getUsers(): void;
  };
}

// tslint:disable-next-line:variable-name
export const ShareFeedback = connect(
  (state: State) => ({
    users: state.Users.users
  }),
  (dispatch) => ({
    actions: {
      getUsers: () => usersGet()(dispatch)
    }
  })
)(
class ShareFeedbackBase extends Component<ShareFeedbackProps> {
  public componentDidMount() {
    this.props.actions.getUsers();
  }
  public render() {
    return <Page page={'share-feedback'}>
      <h1>Share Feedback</h1>
      <Box>
        <ul className='list'>
          {this.props.users.map((u) =>
            <li key={u.id}>
              <User userID={u.id} />
              <Link to={`/give-feedback/${u.id}`} className='button'>Fill out</Link>
            </li>
          )}
        </ul>
      </Box>
    </Page>;
  }
}
);

