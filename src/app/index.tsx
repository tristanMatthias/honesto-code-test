// tslint:disable-next-line:no-import-side-effect
import './typings/declarations.d.ts';

// @ts-ignore
// tslint:disable-next-line:no-import-side-effect
import './sass/base.scss';
// @ts-ignore
// tslint:disable-next-line:no-import-side-effect
import './sass/reset.scss';

import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from './router/Router';
import { store } from './store/store';


render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector('#app')
);
