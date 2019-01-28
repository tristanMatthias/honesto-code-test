import { APIReducer } from '@origami/zen-lib/API';
import {Auth} from './Auth';
import {Me} from './Me';

export const reducers = {
  Auth,
  Me,
  resources: {
    users: APIReducer('users')
  }
};
