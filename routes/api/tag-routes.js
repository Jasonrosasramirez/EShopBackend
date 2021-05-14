const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags

  
    Tag.findAll({
      include: [
        Product,
        { model: Product, 
        through: ProductTag}
    ]
    })
      .then(
        products => res.json(products)
      )
      .catch(err => res.json(err));
  
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  
    Tag.findByPk({
      where: {
        id: req.params.id
      },

      include: [
        Product,
        { model: Product, 
          through: ProductTag 
        }]
    })
    .then(
      products => res.json(products)
    )
    .catch(err => res.json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  
    Tag.create(req.body) 
    .then(product => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map(tag_id => {
          return {
            product_id: product.id,
            tag_id,
          }
        })
        return ProductTag.bulkCreate(productTagIdArr)
      }
    }).catch((err) => {
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.create(req.body, {
    where: {
      id: req.params.id,
    },
    })
    .then((tag_created) => {
      return ProductTag.findAll({
        where: { product_id: req.params.id } }
      );
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(
    products => res.json(products)
  )
  .catch(err => res.json(err));

});

module.exports = router;
