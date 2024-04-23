const express = require('express');
const v1Loader = require('./V1');

const controlVersion = () => {
  const router = express.Router();
  router.use('/V1', v1Loader());
  return router;
};
module.exports = controlVersion;