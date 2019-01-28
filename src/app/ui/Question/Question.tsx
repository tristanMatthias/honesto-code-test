import React, { Component } from 'react';
import { QuestionRadioOption } from '../../store/state';
import { RadioQuestion } from '../RadioQuestion/RadioQuestion';
import { Range } from '../Range/Range';

export type QuestionType = 'radio' | 'range' | 'text';

export interface QuestionProps {
  questionID: string;
  type: QuestionType;
  description?: string;
  options?: QuestionRadioOption[];
  onChange(value: number | string): void;
}

export class Question extends Component<QuestionProps> {
  get options() {
    return this.props.options.filter((o) => o.question === this.props.questionID);
  }
  public render() {
    let content;

    switch (this.props.type) {
      case 'radio':
        content = <RadioQuestion options={this.options} onChange={this.props.onChange} />;
        break;

      case 'text':
        content = <textarea
          placeholder='Say Something'
          onChange={(e) => this.props.onChange(e.target.value)}
        ></textarea>;
        break;

      case 'range':
        content = <Range onChange={this.props.onChange}/>;
        break;

      default:
        throw new Error(`Invalid type '${this.props.type}'`);
    }

    return <div className='question'>
      {this.props.description ? <p>{this.props.description}</p> : null }
      {content}
    </div>;
  }
}
