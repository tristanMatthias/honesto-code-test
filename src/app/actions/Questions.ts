// tslint:disable-next-line:no-submodule-imports
import { APIActions } from '@origami/zen-lib/API';
import { Dispatch } from 'redux';
import { API } from '../lib/API';

// tslint:disable-next-line:export-name
export const {
  questionsGet
} = APIActions('questions', API);
