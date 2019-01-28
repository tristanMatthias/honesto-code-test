// tslint:disable-next-line:no-submodule-imports
import { APIActions } from '@origami/zen-lib/API';
import { Dispatch } from 'redux';
import { API } from '../lib/API';

// tslint:disable-next-line:export-name
export const {
  questionsGet
} = APIActions('questions', API);

export const questionOptionsGet = (questionId: string) =>
  async (dispatch: Dispatch) => {
    const options = await API.get(`/questions/${questionId}/options`);
  };
