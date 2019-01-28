
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { usersGet } from '../../actions/Users';
import { State, User } from '../../store/state';
import { Box } from '../../ui/Box/Box';
import { Button } from '../../ui/Button/Button';
import { Page } from '../../ui/Page/Page';
import { Question } from '../../ui/Question/Question';
// tslint:disable-next-line:no-import-side-effect
import './submit-feedback.scss';

const questions: QuestionData[] = [
  {
    id: '123',
    title: 'How well did I display courage?',
    type: 'text'
  },
  {
    id: '124',
    title: 'Another question',
    type: 'range',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi doloremque, blanditiis illum dolorum perspiciatis, et tempora ex quis tenetur laborum fugit ea excepturi asperiores a quo ab obcaecati. Impedit, veritatis.'
  },

  {
    id: '125',
    title: 'Radio question',
    type: 'radio',
    options: [
      {
        id: '333',
        value: 'good',
        description: 'Lorem'
      },
      {
        id: '444',
        value: 'bad',
        description: 'Ipsum'
      }
    ]
  }
];

export type QuestionData = QuestionText | QuestionRadio | QuestionRange;

export interface QuestionBase {
  id: string;
  title: string;
  description?: string;
}

export interface QuestionText extends QuestionBase {
  type: 'text';
}
export interface QuestionRange extends QuestionBase {
  type: 'range';
}

export interface QuestionRadio extends QuestionBase {
  type: 'radio';
  options: QuestionRadioOption[];
}
export interface QuestionRadioOption {
  id: string;
  value: string;
  description: string;
}


export interface SubmitFeedbackState {
  page: number;
  values: {[questionId: string]: string | number};
}


export interface SubmitFeedbackProps extends RouteComponentProps<{id: string}> {
  me: User;
  questions: QuestionData[];
  users: User[];
  actions: {
    getUsers(): void;
  };
}


// tslint:disable-next-line:variable-name
const SubmitFeedbackConnect = connect(
  (state: State) => ({
    me: state.Me,
    users: state.Users.users
  }),
  (dispatch) => ({
    actions: {
      getUsers: () => usersGet()(dispatch)
    }
  })
)(
  class SubmitFeedbackBase extends Component<SubmitFeedbackProps, SubmitFeedbackState> {
    public static defaultProps = {
      questions
    };

    constructor(props: SubmitFeedbackProps, state: SubmitFeedbackState) {
      super(props, state);

      this.state = {
        page: 0,
        values: {}
      };
    }

    public componentDidMount() {
      this.props.actions.getUsers();
    }

    get user() {
      return this.props.users.find((u) => u.id === this.props.match.params.id);
    }

    public render() {
      const current = this.props.questions[this.state.page];
      return <Page page='submit-feedback'>
        <h1>{current.title}</h1>


        <Box>
        <Question
          description={current.description}
          type={current.type}
          onChange={(v) => this.change(v, current)}
        />

          <div className='buttons'>
            <Button
              disabled={this.state.page === 0}
              outline={true} onClick={this.previous.bind(this)}
            >Previous</Button>
            <Button outline={true} onClick={this.next.bind(this)}>Skip</Button>
            <Button onClick={this.next.bind(this)}>Next</Button>
          </div>
          <div className='progress-text'>
            <strong>Questions completed</strong>
            <span>{this.state.page + 1} / {this.props.questions.length}</span>
          </div>
        </Box>
      </Page>;
    }

    public next() {
      this.setState({page: this.state.page + 1});
    }

    public previous() {
      this.setState({page: this.state.page - 1});
    }

    public change(value: string | number, question: QuestionData) {
      const newValues = {
        ...this.state.values,
        [question.id]: value
      };

      console.log(newValues);


      this.setState({
        values: newValues
      });
    }
  }

);

// tslint:disable-next-line:variable-name
export const SubmitFeedback = withRouter((props) => <SubmitFeedbackConnect {...props} />);
