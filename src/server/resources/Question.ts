// tslint:disable-next-line:variable-name
export const Question = {
  properties: {
    id: 'uuid',
    title: {type: 'string', required: true},

    // radio, range, textarea
    type: {type: 'string', required: true},
    description: {type: 'string', required: false}
  }
};
