import { APIReducer } from '@origami/zen-lib/API';
import {Auth} from './Auth';
import {Me} from './Me';

export const reducers = {
  Auth,
  Me,
  Users: APIReducer('users'),
  Feedback: APIReducer('feedbacks')
};
