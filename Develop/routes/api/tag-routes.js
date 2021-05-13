const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags

  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tagged_product' }]
    });
  
    res.status(200).json(tagData); // if all goes well. 
  }

  catch (err) {
    res.status(500).json(err);
  }

  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagDataMessage = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: ProductTag, as: 'tagged_product' }]
    });

    if (!tagData) {
        res.status(404).json({ message: "Page missing. No Product found" });
        return;
    }

    res.status(200).json(tagDataMessage);
  } 

catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagDataMessage = await Tag.create(req.body); 
    res.status(200).json(tagDataMessage);
  }

  catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  try {
    const tagDataMessage = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagDataMessage) {
      res.status(404).json({ message: "Page not found. ID Not correct :( " });
      return;
    }

    res.status(200).json(tagDataMessage);
  } 

  catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
