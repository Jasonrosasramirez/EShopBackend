const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => { // Home Page 
  // find all categories
  try {
    // try is the best case scenario 

    const categoryDataMessage = await Category.findAll({
      include: [{ model: Product }], // indluces the model as an object.
    });
    res.status(200).json(categoryDataMessage); // issue code 200 should all go well. 
  }

  catch(err) {
    // if there is an error that happens. 
    res.status(500).json(err); // displays the error. 
  }

  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
