const {body} = require('express-validator')

const authValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('username', 'Укажите имя').isLength({min:2}),
    body('password', 'Пароль должен состоять минимум из 5-символов').isLength({min:5}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
]
const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен состоять минимум из 5-символов').isLength({min:5}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
]

module.exports = {authValidation, loginValidation}
