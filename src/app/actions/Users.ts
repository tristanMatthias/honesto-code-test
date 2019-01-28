// tslint:disable-next-line:no-submodule-imports
import { APIActions } from '@origami/zen-lib/API';
import { API } from '../lib/API';

// tslint:disable-next-line:export-name
export const {
  usersGet
} = APIActions('users', API);
