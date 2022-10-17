const Product = require('../models/Product');
const {Op} = require('sequelize');
const asyncHandler = require('../middleware/async');
const {Storage} = require('@google-cloud/storage')



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


// @desc      Delete customer
// @route     POST /api/v1/customers/:id
exports.uploadFile = asyncHandler(async (req, res, next) => {

  const storage = new Storage({
    projectId: 'alishop-cl',
    credentials: {
      client_email: '769656222823-compute@developer.gserviceaccount.com',
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5xP9yrAh/5y+M\n0+J3nQEOgXsJTid7cJ8Fb0dzGOgbqrjr0PAaOXCKdIq0lOi+7+LWcoHoGktB2ULZ\nNoY6IS8uCjraPYZmXcYDz2zk9AyIznnXhqrS5d82qMyEWYw961op7i76jVq21+mo\n98fHaBpZvol4UfMJ1ltMu2n7vFjEOD+P5RV76rcEiHwBDdiVe9VVeAmBgmey2Cr0\nOxr7gwGpU8M18ZrMI4JxzafiW/djGEzFTMPD9oXjp8l72lgd7AArAJ5OiKptpfBg\n0HG22HsCgdjX185e2qmuPaCBAjODCZBgdyXLPulztyQaGgEstMzvW1VtJEvE2wmO\nvCywG1EDAgMBAAECggEAC96qAc47NszzTVjGiiUGicI9NdGAFVOTXZoIIzMOtaHZ\ncfvmM47DAZ3DtRkkq/qQ8GndohJ4B4uVyWJB/lnbdWIi84nl2gmY2up4h0KOwHkM\n8PgCVzpn4kqz0qsUGmq81pwI9WptxuwR2oGGite8g0p45y65TEIdkFATTAnzVAo1\n6nIKThUey1GOtiPa43nbOModSyGwHXIjRY2lpG4CbfItDhSAJ6S14Cgx9yME/SJ0\nJ2SKSQMB3R/tUoF4pXpUygTihxCgl67ONGbm76lmiPwOyzKxLSbtz7P9KJv2cqyB\nPWC3axjASLANIxAyt+tgGGCFa267ogMlrYtGN7b2MQKBgQD5gEDE9mU/ac8uhYlU\nKBRs9BRnK75TGobm0r4y6bSKXtRlXgFlgGCA/3CAYr2X0s8i3iIMXaIOCLgYpDve\nO3DYhKKwQKc7qYUH0dIeEX/NYXPkYdsP3RZyC5Ziyd8FoTFz1XXeOoNiW4W1SkZf\nEgFD8680tRUrGelNryYpIAAxkwKBgQC+m8OxE2Ncngi+sPHqWT7FmfLOPrgsvCBv\n5CzW0zIXzUm4nMHDJjvGfaOLAUFCDo/wia48bMMBtH7e4WnE3npnqqqPFcm7xsN4\ns1yi5xNmqMBzPOOA3Mn/K3QcVH1hIo7JQTAe8/lH2tMFiBCom6C8QmXOIRvuZny9\n4Q5fFOjI0QKBgBZ4FF0oi2mwj7Xy1LE9gsllGclIyTUWuHtlEzfmkBm9/Ia8doe7\njfVQC8OkIMrhc0ICmzJd5FA7PMkLUVDsLXdySmxxBh57X72aib+nd8j5M8Sng2Dk\nWjcfEAYJhAovwBJccOb4ggiDkYEIFVpOdsq10Vt/y048YSRb16XwedP9AoGAfPc0\ngqjacQNvak4qHOHsBLNc/BkkuLeScKlhOGr4oaBG4BFt+5raf9UpXt4wwbU4a5Ro\ntlb8Nub2cvvIU3klOUgsUGkRfNngmAbICkmDb7/dhO/7nCWlDXWYx2YhWYjFom7p\ntLFx0slFpo/BlDmMVUEW6+DLJi7tQ7QErxPPVrECgYEA6w/ZRTWzSfm1QCkou/c1\nA/dBa0PeHCeljjn/iSQ+H1dd4c/8W+a4j9DycsUpdbEF5RBNoICMuvH0EDBTChh/\nMvqlt+b2BluSeqQLxSUHEc6GvapCDNqLyJMiiZSthoMTgSeBtHwn2Qd1oMGptqRK\n1fWYuew8RcDKX1Fz3Zso2Dw=\n-----END PRIVATE KEY-----\n"
    }
  })

 const buckets = await storage.getBuckets().then(x => console.log(x));

  res.status(200).json({
    success: true,
    message: '',
    data: 'buckets'
  })


})
