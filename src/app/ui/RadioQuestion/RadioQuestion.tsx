import React, { Component } from 'react';
import { QuestionRadioOption } from '../../store/state';
// tslint:disable-next-line:no-import-side-effect
import './radio-question.scss';

export interface RadioQuestionProps {
  options?: QuestionRadioOption[];
  onChange(value: number): void;
}

export interface RadioQuestionState {
  value: number;
}

export class RadioQuestion extends Component<RadioQuestionProps, RadioQuestionState> {
  constructor(props: RadioQuestionProps, state: RadioQuestionState) {
    super(props, state);

    this.state = {
      value: null
    };
  }

  public render() {
    return <ul className='radio-question'>
      {this.props.options.map((o) =>
        <li
          className={this.state.value === o.value ? 'active' : ''}
          onClick={() => this.select(o.value)}
          role='button'
        >
          <strong>{o.label}</strong>
          <p>{o.description}</p>
        </li>
      )}
    </ul>;
  }

  public select(value: number) {
    this.props.onChange(value);
    this.setState({value});
  }
}
