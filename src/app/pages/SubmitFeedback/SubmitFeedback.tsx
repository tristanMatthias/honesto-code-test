
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { feedbackCreate } from '../../actions/Feedback';
import { questionOptionsGet } from '../../actions/QuestionOptions';
import { questionsGet } from '../../actions/Questions';
import { usersGet } from '../../actions/Users';
import { Question as StateQuestion, QuestionRadioOption, State, User as StateUser } from '../../store/state';
import { Box } from '../../ui/Box/Box';
import { Button } from '../../ui/Button/Button';
import { Loading } from '../../ui/Loading/Loading';
import { Page } from '../../ui/Page/Page';
import { Question } from '../../ui/Question/Question';
import { User } from '../../ui/User/User';
// tslint:disable-next-line:no-import-side-effect
import './submit-feedback.scss';


export interface SubmitFeedbackState {
  page: number;
  values: {[questionId: string]: string | number};
}


export interface SubmitFeedbackProps extends RouteComponentProps<{id: string}> {
  me: StateUser;
  questions?: StateQuestion[];
  questionOptions?: QuestionRadioOption[];
  users: StateUser[];
  actions: {
    getUsers(): void;
    getQuestions(): void;
    getQuestionOptions(): void;
    submit(values: object): void;
  };
}


// tslint:disable-next-line:variable-name
const SubmitFeedbackConnect = connect(
  (state: State) => ({
    me: state.Me,
    users: state.Users.users,
    questions: state.Questions.questions,
    questionOptions: state.QuestionOptions.questionoptions
  }),
  (dispatch) => ({
    actions: {
      getUsers: () => usersGet()(dispatch),
      getQuestions: () => questionsGet()(dispatch),
      getQuestionOptions: () => questionOptionsGet()(dispatch),
      submit: (values: object) => feedbackCreate(values)(dispatch)
    }
  })
)(
  class SubmitFeedbackBase extends Component<SubmitFeedbackProps, SubmitFeedbackState> {
    constructor(props: SubmitFeedbackProps, state: SubmitFeedbackState) {
      super(props, state);

      this.state = {
        page: 0,
        values: {}
      };
    }

    public componentDidMount() {
      this.props.actions.getUsers();
      this.props.actions.getQuestions();
      this.props.actions.getQuestionOptions();
    }

    get userID() {
      return this.props.match.params.id;
    }

    get user() {
      return this.props.users.find((u) => u.id === this.userID);
    }

    public render() {
      const {page} = this.state;
      const pages = this.props.questions.length;
      const current = this.props.questions[page];

      if (!current) return <Loading />;

      return <Page page='submit-feedback'>
        <h1>{current.title}</h1>
        <strong>share your feedback for <User userID={this.userID}/></strong>


        <Box>
          <Question
            questionID={current.id}
            description={current.description}
            type={current.type}
            onChange={(v) => this.change(v, current)}
            options={this.props.questionOptions}
          />

          <div className='buttons'>
            <Button
              disabled={page === 0}
              outline={true} onClick={this.previous.bind(this)}
            >Previous</Button>
            <Button outline={true} onClick={this.next.bind(this)}>Skip</Button>
            {(page === pages - 1)
              ? <Button onClick={this.submit.bind(this)}>Submit</Button>
              : <Button onClick={this.next.bind(this)}>Next</Button>
            }
          </div>
          <div className='progress'>
            <span style={{
              width: `${(page / (pages - 1)) * 100}%`
            }}></span>
          </div>
          <div className='progress-text'>
            <strong>Questions completed</strong>
            <span>{page + 1} / {pages}</span>`
          </div>
        </Box>
      </Page>;
    }

    public async submit() {
      const feedback = {
        values: this.state.values,
        to: this.userID,
        from: this.props.me.id
      };

      const fb = await this.props.actions.submit(feedback);
      console.log(fb);
    }

    public next() {
      this.setState({page: this.state.page + 1});
    }

    public previous() {
      this.setState({page: this.state.page - 1});
    }

    public change(value: string | number, question: StateQuestion) {
      const newValues = {
        ...this.state.values,
        [question.id]: value
      };

      this.setState({
        values: newValues
      });
    }
  }

);

// tslint:disable-next-line:variable-name
export const SubmitFeedback = withRouter((props) => <SubmitFeedbackConnect {...props} />);

