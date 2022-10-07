import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidator, loginValidator, postCreateValidator } from './validations.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import  UserModel  from './models/User.js';
import bcrypt from 'bcrypt';
import chekAuth from './utils/chekAuth.js'


mongoose.connect('mongodb+srv://admin:123@cluster0.imbbly3.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=> console.log('Connect DB'))
.catch(err => console.log('Error connecting DB', err));
const app = express();

app.use(express.json());

app.post('/auth/login', loginValidator, UserController.login );

app.post('/auth/register', registerValidator, UserController.register)

app.get('/auth/me', chekAuth, UserController.getMe)


app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', chekAuth, postCreateValidator, PostController.create);
app.delete('/posts/:id',chekAuth,  PostController.remove);
app.patch('/posts/:id', chekAuth, PostController.update);

app.listen(4444, (err)=>{
    if (err){
        return console.log(err);
    }
    console.log('Server running at http://localhost:4444');
})