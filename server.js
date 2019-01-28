if (process.env.SECRET) {
  process.env['ORIGAMI_PLUGINS_SOCIAL-LOGIN_GOOGLE_clientSecret'] = process.env.SECRET;
}
new (require('@origami/origami').Origami)();
