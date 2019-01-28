// tslint:disable-next-line:variable-name
export const QuestionOption = {
  properties: {
    id: 'uuid',
    question: {isA: 'question'},
    value: {type: 'number', required: true},
    label: {type: 'string', required: true},
    description: {type: 'string', required: true}
  }
};
