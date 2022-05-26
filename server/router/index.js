const express = require("express");

const router = express.Router();

router.get('/product', (req,res) => {
  res.send({
    message: 'Product requested',
    statusCode: 200,
    data: {
      product_name: "Áo thun",
      price: 20000,
      description: "Áo thun trẻ"
    }
  })
})

module.exports = router;
