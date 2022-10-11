const User = require('../models/User');
const Client = require('../models/Client');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const {masterCryptoKey, encryptValue, decryptValue} = require('../utils/crypt')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// @desc      Get all categories
// @route     POST /api/v1/categories
exports.login = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({where: {email: req.body.email}});
  console.log(user);

  if (!user) {
    user = await Client.findOne({where: {email: req.body.email}})
    if (!user) throw new Error('Usuario no encontrado!')
    if (user.password !== req.body.password) throw new Error('Constrasenas no coinciden!')
  }


  if (user.password !== req.body.password) throw new Error('Constrasenas no coinciden!')

  const token = jwt.sign({
    rol: user.rol,
    name: user.name,
    email: user.email,
    id: user.id,
    photo: user.photo
  }, process.env.TOKEN_SECRET)

  res.header('auth-token', token).status(200).json({
    success: true,
    data: token,
    rol: user.rol
  })

})

// @desc      Create category
// @route     POST /api/v1/categories
exports.passwordRecovery = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({where: {email: req.body.email}});
  if (!user) {
    user = await Client.findOne({where: {email: req.body.email}});
    if (!user) {
      throw new Error('No se encontro un usuario con el email ingresado.')
    }
  };

  const encryptedUser = await encryptValue(masterCryptoKey, JSON.stringify(user));
  console.log(encryptedUser);

  console.log(req.body)
  const msg = {
    to: req.body.email, // Change to your recipient
    from: 'appalishop@gmail.com', // Change to your verified sender
    subject: 'Recuperación de contraseñas | Alishop',
    templateId: 'd-f840da9b5d5f4a9bbbace0ba2a05d7f2',
    dynamicTemplateData: {name: user.name, urlParam: encryptedUser},
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log(msg);
      res.status(200).json({
        success: true,
        message: `Se envio un email a ${req.body.email}!, por favor valida en tu bandeja de entrada.`
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

// @desc      Update category
// @route     POST /api/v1/categories/:id
exports.changePassword = asyncHandler(async (req, res, next) => {
  let decryptedUser;
  try {
    decryptedUser = JSON.parse(decryptValue(masterCryptoKey, req.body.code));
  } catch (err) {
    throw new Error('El codigo de la url es incorrecto... por favor intentalo de nuevo mas tarde.')
  }

  if (req.body.password === decryptedUser.password) throw new Error('No puedes usar la misma contrasena.')

  decryptedUser.password = req.body.password;

  const result = await User.update(decryptedUser, {where: { id: decryptedUser.id } })

  if (result[0] === 0) {
    throw new Error('No se encontro un usuario con el id ' + req.params.id)
  }

  res.status(200).json({
    success: true,
    message: `Se actualizo la contrasena del usuario ${decryptedUser.name}`
  })

})
