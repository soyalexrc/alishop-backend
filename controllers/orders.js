const Order = require('../models/Order');
const Client = require('../models/Client');
const {Op} = require('sequelize');
const asyncHandler = require('../middleware/async');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// @desc      Get all customers
// @route     POST /api/v1/customers
exports.getOrders = asyncHandler(async (req, res, next) => {
  // pagination
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const data = await Order.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {state: {[Op.like]: '%' + req.body.state + '%'}},
            {orderId: {[Op.like]: '%' + req.body.code + '%'}},
          ]
        },
        {
          createdAt: {
            [Op.between]: [req.body.dateFrom, req.body.dateTo]
          }
        },
      ]
    },
    include: ['client'],
    offset: startIndex,
    limit: limit
  })

  const total = await Order.count();

  res.status(200).json({
    success: true,
    data,
    total,
  })
})

// @desc      Get customer by id
// @route     POST /api/v1/customers/:id
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const result = await Order.findOne({
    where: {
      [Op.and]: [
        {id: req.params.id},
      ]
    },
    include: ['client']
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
exports.getOrderByState = asyncHandler(async (req, res, next) => {

  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  let result;
  if (req.body.categoryId === 0) {
    result = await Order.findAll({
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
    result = await Order.findAll({
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
exports.createOrder = asyncHandler(async (req, res, next) => {
  const result = await Order.create(req.body);
  const client = await Client.findOne({where: {id: req.body.clientId}})
  console.log(client);

  const msg = {
    to: 'alex.neomantis@gmail.com', // Change to your recipient
    from: 'appalishop@gmail.com', // Change to your verified sender
    subject: 'Creacion de cliente exitosa! | Alishop',
    templateId: 'd-b940005bde594dd49702cb1fef443b75',
    dynamicTemplateData: {name: 'prueba', code: 'prueba-1234'},
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log(msg);
      res.status(200).json({
        success: true,
        message: `Se creo la orden con exito!`,
        data: result
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        success: false,
        message: `Ocurrio un error enviando el correo!`
      })
    })



})

// @desc      Update customer
// @route     POST /api/v1/customers/:id
exports.updateOrder = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const result = await Order.update(req.body, {where: {id: req.params.id}});

  if (result[0] === 0) {
    throw new Error('No se encontro una orden con el id ' + req.params.id)
  }

  const data = await Order.findOne({
    where: {
      [Op.and]: [
        {id: req.params.id},
      ]
    },
    include: ['client']
  })

  res.status(200).json({
    success: true,
    message: `Se edito la orden ${req.body.orderId.substring(req.body.orderId.length - 10, req.body.orderId.length)} con exito!`,
    data,
  })
})

// @desc      Delete customer
// @route     POST /api/v1/customers/:id
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const result = await Order.destroy({
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

