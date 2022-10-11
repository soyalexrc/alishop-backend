
const Provider = require('../models/Provider');
const {Op} = require('sequelize');
const asyncHandler = require('../middleware/async');


// @desc      Get all customers
// @route     POST /api/v1/customers
exports.getProviders = asyncHandler(async (req, res, next) => {
  // pagination
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const data = await Provider.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {name: {[Op.like]: '%' + req.body.search + '%'}},
            {email: {[Op.like]: '%' + req.body.search + '%'}},
            {rut: {[Op.like]: '%' + req.body.search + '%'}},
          ]
        },]
    },
    offset: startIndex,
    limit: limit
  })

  const total = await Provider.count();

  res.status(200).json({
    success: true,
    data,
    total,
  })
})

// @desc      Get customer by id
// @route     POST /api/v1/customers/:id
exports.getProviderById = asyncHandler(async (req, res, next) => {
  const result = await Provider.findOne({
    where: {
      [Op.and]: [
        { id: req.params.id },
      ]
    },
    include: 'products'
  })

  if (result === null) {
    throw new Error('No se encontro proveedor con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    data: result
  })

})

// @desc      Create customer
// @route     POST /api/v1/customers
exports.createProvider = asyncHandler(async (req, res, next) => {
  const result = await Provider.create(req.body);

  res.status(200).json({
    success: true,
    message: `Se creo el proveedor ${req.body.name} con exito!`,
    data: result
  })
})

// @desc      Update customer
// @route     POST /api/v1/customers/:id
exports.updateProvider = asyncHandler(async (req, res, next) => {
  const result = await Provider.update(req.body, {where: {id: req.params.id}});

  if (result[0] === 0) {
    throw new Error('No se encontro un proveedor con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se edito el proveedor ${req.body.name} con exito!`,
    data: result,
  })
})

// @desc      Delete customer
// @route     POST /api/v1/customers/:id
exports.deleteProvider = asyncHandler(async (req, res, next) => {
  const result = await Provider.destroy({
    where: {
      id: req.params.id
    }
  });

  if (result === 0) {
    throw new Error('No se encontro un proveedor con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se elimino el proveedor ${req.body.name} con exito!`,
    data: result
  })


})
