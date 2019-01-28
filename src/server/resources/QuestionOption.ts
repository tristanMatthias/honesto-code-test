// tslint:disable-next-line:variable-name
export const QuestionOption = {
  properties: {
    id: 'uuid',
    question: {isA: 'question'},
    value: {type: 'string', required: true},
    description: {type: 'string', required: true}
  }
};
