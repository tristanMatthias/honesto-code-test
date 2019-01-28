if (process.env.SECRET) {
  process.env['ORIGAMI_PLUGINS_SOCIAL-LOGIN_GOOGLE_clientSecret'] = process.env.SECRET;
}
import {Origami} from '@origami/origami';
import { Feedback } from './resources/Feedback';
import {Question} from './resources/Question';
import {QuestionOption} from './resources/QuestionOption';
import { feedbackGet, feedbackList } from './routes/feedback';
import { questionOptions } from './routes/questionOptions';

// @ts-ignore
const app = new Origami();

app.ready(async () => {
  await app.server.resource('question', {
    model: Question
  });
  await app.server.resource('questionOption', {
    model: QuestionOption
  });
  await app.server.resource('feedback', {
    model: Feedback,
    controllers: {
      list: feedbackList,
      get: feedbackGet
    }
  });

  app.server.useRouter(questionOptions);
});
