import { Origami } from '@origami/core';

// Prevent user from seeing others feedback data
export const feedbackList: Origami.Server.RequestHandler = async(req, res, next) => {
  const m = res.app.get('store').model('feedback') as Origami.Store.Model;

  res.locals.content.set(
    await m.find({
      from: req.jwt.data.userId
    })
  );

  next();
};

export const feedbackGet: Origami.Server.RequestHandler = async(req, res, next) => {
  const m = res.app.get('store').model('feedback') as Origami.Store.Model;

  res.locals.content.set(
    // @ts-ignore
    await m.findOne({
      id: req.params.feedbackId,
      from: req.jwt.data.userId
    })
  );

  next();
};
