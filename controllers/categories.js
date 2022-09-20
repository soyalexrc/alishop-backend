const Category = require('../models/Category');
const {Op} = require('sequelize');
const asyncHandler = require('../middleware/async');


// @desc      Get all categories
// @route     POST /api/v1/categories
exports.getCategories = asyncHandler(async (req, res, next) => {
  const result = await Category.findAll({
    where: {
      [Op.or]: [
        {title: {[Op.like]: '%' + req.body.search + '%'}},
        {description: {[Op.like]: '%' + req.body.search + '%'}},
      ]
    }
  })

  res.status(200).json({
    success: true,
    data: result
  })

})

// @desc      Create category
// @route     POST /api/v1/categories
exports.createCategory = asyncHandler(async (req, res, next) => {
  const result = await Category.create(req.body);

  res.status(200).json({
    success: true,
    data: result
  })
})

// @desc      Update category
// @route     POST /api/v1/categories/:id
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const result = await Category.update(req.body, {where: {id: req.params.id}});

  if (result[0] === 0) {
    throw new Error('No se encontro una categoria con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    data: result
  })
})

// @desc      Delete category
// @route     POST /api/v1/categories/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const result = await Category.destroy({
    where: {
      id: req.params.id
    }
  });

  if (result === 0) {
    throw new Error('No se encontro una categoria con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    data: result
  })


})
