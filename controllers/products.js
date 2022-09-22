const Product = require('../models/Product');
const {Op} = require('sequelize');
const asyncHandler = require('../middleware/async');


// @desc      Get all customers
// @route     POST /api/v1/customers
exports.getProducts = asyncHandler(async (req, res, next) => {
  // pagination
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const data = await Product.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {name: {[Op.like]: '%' + req.body.search + '%'}},
          ]
        },
      ]
    },
    offset: startIndex,
    limit: limit
  })

  const total = await Product.count();

  res.status(200).json({
    success: true,
    data,
    total,
  })
})

// @desc      Get customer by id
// @route     POST /api/v1/customers/:id
exports.getProductById = asyncHandler(async (req, res, next) => {
  const result = await Product.findOne({
    where: {
      [Op.and]: [
        {id: req.params.id},
      ]
    },
    include: ['category', 'provider']
  })

  if (result === null) {
    throw new Error('No se encontro producto con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    data: result
  })

})

// @desc      Get customer by slug
// @route     POST /api/v1/customers/:slug
exports.getProductsByCategory = asyncHandler(async (req, res, next) => {

  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  let result;
  if (req.body.categoryId === 0) {
    result = await Product.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {name: {[Op.like]: '%' + req.body.search + '%'}},
            ]
          },
        ]
      },
      offset: startIndex,
      limit: limit
    })
  } else {
    result = await Product.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {name: {[Op.like]: '%' + req.body.search + '%'}},
            ]
          },
          {
            categoryId: req.body.categoryId
          }
        ]
      },
      offset: startIndex,
      limit: limit
    })
  }


  if (result === null) {
    throw new Error('No se encontro producto con la categoria seleccionada ')
  }

  res.status(200).json({
    success: true,
    data: result,
  })

})

// @desc      Create customer
// @route     POST /api/v1/customers
exports.createProduct = asyncHandler(async (req, res, next) => {
  const result = await Product.create(req.body);

  res.status(200).json({
    success: true,
    message: `Se creo el producto ${req.body.name} con exito!`,
    data: result
  })
})

// @desc      Update customer
// @route     POST /api/v1/customers/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const result = await Product.update(req.body, {where: {id: req.params.id}});

  if (result[0] === 0) {
    throw new Error('No se encontro un producto con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se edito el producto ${req.body.name} con exito!`,
    data: result,
  })
})

// @desc      Delete customer
// @route     POST /api/v1/customers/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const result = await Product.destroy({
    where: {
      id: req.params.id
    }
  });

  if (result === 0) {
    throw new Error('No se encontro un producto con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se elimino el producto ${req.body.name} con exito!`,
    data: result
  })


})
