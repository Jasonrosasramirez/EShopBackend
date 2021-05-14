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
    }).catch((err) {
      res.status(500).json(err);
    })
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagDataMessage = await Tag.create(req.body, {
      where: {
        id: req.params.id,
      }
    }); 

    if (!tagDataMessage) {
      res.status(404).json({message : "Hey look! The page is missing 404"});
      return;
    }; 

    res.status(200).json(tagDataMessage)
  }

  catch (err) {
    res.status(500).json(err);

  }

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
