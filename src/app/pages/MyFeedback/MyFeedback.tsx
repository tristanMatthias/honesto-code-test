import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feedbackGet } from '../../actions/Feedback';
import { usersGet } from '../../actions/Users';
import { FeedbackItem, State, User as StateUser } from '../../store/state';
import { Box } from '../../ui/Box/Box';
import { Page } from '../../ui/Page/Page';
import { User } from '../../ui/User/User';
// tslint:disable-next-line:no-import-side-effect
import './my-feedback.scss';


interface MyFeedbackProps {
  users: StateUser[];
  feedback: FeedbackItem[];
  actions: {
    getUsers(): void;
    getMyFeedback(): void;
  };
}

interface MyFeedbackState {
  selected?: string;
}


// tslint:disable-next-line:variable-name
export const MyFeedback = connect(
  (state: State) => ({
    users: state.Users.users,
    feedback: state.Feedback.feedbacks
  }),
  (dispatch) => ({
    actions: {
      getUsers: () => usersGet()(dispatch),
      getMyFeedback: () => feedbackGet()(dispatch)
    }
  })
)(
  class MyFeedbackBase extends Component<MyFeedbackProps, MyFeedbackState> {

    constructor(props: MyFeedbackProps, state: MyFeedbackState) {
      super(props, state);

      this.state = {
        selected: null
      };
    }

    public async componentDidMount() {
      this.props.actions.getUsers();
      await this.props.actions.getMyFeedback();
      if (this.props.feedback.length) {
        this.setState({
          selected: this.props.feedback[0].id
        });
      }
    }

    public render() {
      const { selected: selectedID } = this.state;
      const selected = this.props.feedback.find((f) => f.id === selectedID);
      return (
        <Page page={'my-feedback'}>
          <h1>My Feedback</h1>
          <Box>
            <div className='my-feedback'>
              <strong>Feedback Received</strong>
              <ul className='list' role='menu'>
                {this.props.feedback.map((f) =>
                  <li
                    key={f.id}
                    className={selectedID === f.id ? 'active' : ''}
                    onClick={() => this.setState({ selected: f.id })}
                    role='menuitem'
                  >
                    <User userID={f.from} />
                  </li>
                )}
              </ul>
            </div>

            {selected
              ? <div className='feedback'>
                <h2>Feedback from <User userID={selected.from} /></h2>
              </div>
              : null
            }

          </Box>
        </Page>
      );
    }
  });

