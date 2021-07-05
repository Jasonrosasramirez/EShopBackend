/* -- imports -- */

const router = require('express').Router();
const tagRoutes = require('./tag-routes');
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');

/* -- Route Definitions  -- */

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
