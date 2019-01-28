import React, { Component } from 'react';
import { Range } from '../Range/Range';

export type QuestionType = 'radio' | 'range' | 'text';

export interface QuestionProps {
  type: QuestionType;
  description?: string;
  onChange(value: number | string): void;
}

export class Question extends Component<QuestionProps> {
  public render() {
    let content;

    switch (this.props.type) {
      case 'radio':
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
