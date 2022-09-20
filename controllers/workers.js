
const User = require('../models/User');
const {Op} = require('sequelize');
const asyncHandler = require('../middleware/async');


// @desc      Get all customers
// @route     POST /api/v1/customers
exports.getWorkers = asyncHandler(async (req, res, next) => {
  // pagination
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const data = await User.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {name: {[Op.like]: '%' + req.body.search + '%'}},
            {email: {[Op.like]: '%' + req.body.search + '%'}},
            {document: {[Op.like]: '%' + req.body.search + '%'}},
          ],
        },
        {rol: {[Op.ne]: 'Cliente'}}
      ]

    },
    offset: startIndex,
    limit: limit
  })

  const total = await User.count()

  res.status(200).json({
    success: true,
    data,
    total
  })

})

// @desc      Get workers by state
// @route     POST /api/v1/workers/getByState
exports.getWorkersByState = asyncHandler(async (req, res, next) => {
  // pagination
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const data = await User.findAll({
    where: {
      rol: req.body.rol,
    },
    offset: startIndex,
    limit: limit
  })

  const total = await User.count()

  res.status(200).json({
    success: true,
    data,
    total
  })

})

// @desc      Get customer by id
// @route     POST /api/v1/customers/:id
exports.getWorkerById = asyncHandler(async (req, res, next) => {
  const result = await User.findOne({
    where: {
      [Op.and]: [
        { id: req.params.id },
      ]
    }
  })

  if (result === null) {
    throw new Error('No se encontro trabajador con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    data: result
  })

})

// @desc      Create customer
// @route     POST /api/v1/customers
exports.createWorker = asyncHandler(async (req, res, next) => {
  const result = await User.create(req.body);

  res.status(200).json({
    success: true,
    message: `Se creo el trabajador ${req.body.name} con exito!`,
    data: result
  })
})

// @desc      Update customer
// @route     POST /api/v1/customers/:id
exports.updateWorker = asyncHandler(async (req, res, next) => {
  const result = await User.update(req.body, {where: {id: req.params.id}});

  if (result[0] === 0) {
    throw new Error('No se encontro un trabajador con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se edito el trabajador ${req.body.name} con exito!`,
    data: result,
  })
})

// @desc      Delete customer
// @route     POST /api/v1/customers/:id
exports.deleteWorker = asyncHandler(async (req, res, next) => {
  const result = await User.destroy({
    where: {
      id: req.params.id
    }
  });

  if (result === 0) {
    throw new Error('No se encontro un trabajador con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se elimino el trabajador ${req.body.name} con exito!`,
    data: result
  })
})


