const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => { // Home Page 
  // find all categories
  try {
    // try is the best case scenario 

    const categoryDataMessage = await Category.findAll({
      include: [{ model: Product }], // includes the model as an object.
    });
    res.status(200).json(categoryDataMessage); // issue code 200 should all go well. 
  }

  catch(err) {
    // if there is an error that happens. 
    res.status(500).json(err); // displays the error. 
  }

  // be sure to include its associated Products
});


router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try {
    const categoryDataMessage = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryDataMessage) { // if the page is empty 
      res.status(404).json({ message: "Page was not found :( "}) // display this if the page is missing
      return; 
    }
    res.status(200).json(categoryDataMessage); // display message if all goes well. 
  }

  catch(err) {
    // if there is an error that happens. 
    res.status(500).json(err); // displays the error. 
  }
  
  // be sure to include its associated Products
});


router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryDataMessage = await Category.create(req.body);
    res.status(200).json(categoryDataMessage); 
  }

  catch (err) {
    res.status(400).json(err);
  }

});


router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const categoryDataMessage = await Category.update(req.body, {
      where: {
        id: req.params.id, 
      }
    });

    if (!categoryDataMessage[0]) {
      res.status(404).json( {Message: "The page has not been found :("} );
      return;
    };

    res.status(200).json(categoryDataMessage); // message if all goes well. 
  }

  catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  
  
  try {
    const categoryDataMessage = await Category.destroy({
      where: { 
        id: req.params.id
      }
    }); 

    if (!categoryDataMessage) {
      res.status(404).json( {message: "Page not found :( "} );
      return;
    }

    req.status(200).json(categoryDataMessage); 
  }

  catch (err) {
    req.status(500).json(err);
  }

});

module.exports = router;
