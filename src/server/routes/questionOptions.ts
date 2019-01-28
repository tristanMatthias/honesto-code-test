import { Route } from '@origami/core';
import { Model, Store } from 'origami-store-base';

/**
 * Get a list of options for a question
 */
export const questionOptions = new Route('/api/v1/questions/:id/options')
  .position('store')
  .get(async(req, res, next) => {
    const store = res.app.get('store') as Store;
    const mQuestions = store.model('questionOption')! as Model;

    res.locals.content.set(
      await mQuestions.find({question: req.params.id})
    );
    next();

  });
