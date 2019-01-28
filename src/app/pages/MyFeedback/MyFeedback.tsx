import React, { Component } from 'react';
import { Box } from '../../ui/Box/Box';
import { Header } from '../../ui/Header/Header';
import { Page } from '../../ui/Page/Page';
// tslint:disable-next-line:no-import-side-effect
import './my-feedback.scss';


export class MyFeedback extends Component {
  public render() {
    return (
      <Page page={'share-feedback'}>
        <h1>My Feedback</h1>
        <Box>
          TODO
        </Box>
      </Page>
    );
  }
}
