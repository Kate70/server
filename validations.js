import {body} from 'express-validator';


export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
   
]

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('fullName').isLength({min: 3}),
    body('avatarUrl').optional().isURL(),
]

export const postCreateValidator = [
    body('title', "Enter yout title").isLength({min: 5}).isString(),
    body('text').isLength({min: 15}).isString(),
    body('tags').optional().isArray(),
    body('imageUrl').optional().isString(),
]