import React from 'react';
import { Question } from '../../../store/state';
import { Range } from '../../../ui/Range/Range';

export interface FeedbackQuestionProps {
  question: Question;
  value: string | number;
}

// tslint:disable-next-line:variable-name
export const FeedbackQuestion: React.SFC<FeedbackQuestionProps> = ({
  question,
  value
}) => {
  if (!question) return null;

  const {title, type, description} = question;
  let content;

  switch (type) {
    case 'text':
      content = <p>{value}</p>;
      break;
    case 'radio':
    case 'range':
      content = <Range initialValue={parseInt(value as string)} disabled={true} />;
  }
  return <li>
    <p>{title}</p>
    {content}
  </li>;
};

