const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use("/", /* home page. Otherwise it just uses thr wrong woute */)


router.use((req, res) => {
  res.send("<h1>Wrong Route! For E-Commerce Backend</h1>")
});

/* -- Exporting -- */
module.exports = router;