// tslint:disable-next-line:variable-name
export const Feedback = {
  properties: {
    id: 'uuid',
    from: {isA: 'user'},
    to: {isA: 'user'},
    values: {type: 'object', required: true}
  }
};
