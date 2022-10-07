

const Client = require('../models/Client');
const {Op} = require('sequelize');
const asyncHandler = require('../middleware/async');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// @desc      Get all customers
// @route     POST /api/v1/customers
exports.getClients = asyncHandler(async (req, res, next) => {
  // pagination
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const data = await Client.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {name: {[Op.like]: '%' + req.body.search + '%'}},
            {email: {[Op.like]: '%' + req.body.search + '%'}},
            {document: {[Op.like]: '%' + req.body.search + '%'}},
          ]
        },
      ]
    },
    offset: startIndex,
    limit: limit
  })

  const total = await Client.count()

  res.status(200).json({
    success: true,
    data,
    total
  })

})

// @desc      Get workers by state
// @route     POST /api/v1/workers/getByState
exports.getClientsByState = asyncHandler(async (req, res, next) => {
  // pagination
  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const data = await Client.findAll({
    where: {
      rol: req.body.rol,
    },
    offset: startIndex,
    limit: limit
  })

  const total = await Client.count()

  res.status(200).json({
    success: true,
    data,
    total
  })

})

// @desc      Get customer by id
// @route     POST /api/v1/customers/:id
exports.getClientById = asyncHandler(async (req, res, next) => {
  const result = await Client.findOne({
    where: {
      [Op.and]: [
        { id: req.params.id },
      ]
    }
  })

  if (result === null) {
    throw new Error('No se encontro cliente con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    data: result
  })

})

// @desc      Create customer
// @route     POST /api/v1/customers
exports.createClient = asyncHandler(async (req, res, next) => {
  const result = await Client.create(req.body);

  const msg = {
    to: req.body.email, // Change to your recipient
    from: 'appalishop@gmail.com', // Change to your verified sender
    subject: 'Creacion de usuario exitosa! | Alishop',
    templateId: 'd-8b88f408ae1144cebcd4b0db6b719361',
    dynamicTemplateData: {name: req.body.name, rol: req.body.rol, email: req.body.email, password: req.body.password},
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log(msg);
      res.status(200).json({
        success: true,
        message: `Se creo el cliente ${req.body.name} con exito!`,
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
exports.updateClient = asyncHandler(async (req, res, next) => {
  const result = await Client.update(req.body, {where: {id: req.params.id}});

  if (result[0] === 0) {
    throw new Error('No se encontro un cliente con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se edito el cliente ${req.body.name} con exito!`,
    data: result,
  })
})

// @desc      Delete customer
// @route     POST /api/v1/customers/:id
exports.deleteClient = asyncHandler(async (req, res, next) => {
  const result = await Client.destroy({
    where: {
      id: req.params.id
    }
  });

  if (result === 0) {
    throw new Error('No se encontro un cliente con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se elimino el cliente con exito!`,
    data: result
  })
})


