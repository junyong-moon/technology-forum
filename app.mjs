import './config.mjs';
import './db.mjs';
import './auth.mjs';
import * as auth from "./auth.mjs";

import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';

import { fileURLToPath } from 'url';
import path from 'path'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, 'src');

app.set('view engine', 'hbs');
app.use(express.static(root));
app.use(express.urlencoded({ extended: false }));

const User = mongoose.model("User");
const Post = mongoose.model("Post");

const authRequiredPaths = ['/posts/add'];

const sessionOptions = {
	secret: process.env.secret,
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

app.use((req, res, next) => {
    if (authRequiredPaths.includes(req.path)) {
        if (!res.locals.user) {
            res.redirect('/login')
        } else {
            next();
        }
    } else {
        next();
    }
})

app.use((req, res, next) => {

    console.log(req.path.toUpperCase(), req.body);
    if (res.locals.user) {
        console.log("Logged in as:", res.locals.user);
    }

    next();
})

// Probably I can add a section where a user can see a list of liked/disliked posts?

app.get('/', (req, res) => {
    res.render('home', {user: res.locals.user});
});

app.get('/news', (req, res) => {
    res.render('news', {});
});

app.get('/posts', async (req, res) => {

    const posts = await Post.find({}).sort("-createdAt").exec();

    res.render('posts', {posts});
});

app.get('/posts/add', (req, res) => {
    res.render('createPost', {});
})


// DOTO: Add slug to avoid collisions for duplicates
app.post('/posts/add', async (req, res) => {
    console.log(req.body); //DEBUG

    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        writtenBy: res.locals.user._id,
        views: 0,
        likes: 0,
        comments: []
    })

    //consider adding catching errors
    await newPost.save();

    res.redirect('/posts'); // TODO: Should redirect to the new post written
})

app.get('/posts/:slug', async (req, res) => {
    
    const requestedPost = await Post.findOne({ slug: req.params.slug }).populate('writtenBy').exec();
    const uploadedTime = requestedPost.createdAt.toString().slice(0, 25);

    res.render('post-detail', { requestedPost, uploadedTime });
})

app.get('/login', (req, res) => {
    res.render('login', {})
});


// TODO: Add a logic to check login info; e.g. check if the ID exist, check if the password is correct, etc.
app.post('/login', (req, res, next) => { 
    passport.authenticate('local', (err, user) => {

        if (user) {
            req.logIn(user, function(err) {
                res.redirect('/');
            });
        } else {
            res.render('login', {message: 'Please try again: Your username does not exist or the password is incorrect'});
        }
    })(req, res, next);
  });

app.get('/logout', (req, res) => {
    req.logout({}, () => {
        res.redirect('/');
    });
})


app.get('/register', (req, res) => {
    res.render('register', {});
});

// TODO: Add a logic to check if the username and password is valid (Also check email)
app.post('/register', (req, res) => {
    console.log(req.body.username);
    User.register(new User({username:req.body.username, email: req.body.email}), 
        req.body.password, function (err, user) {
      if (err) {
          console.log(err);
        res.render('register', {message: 'Your registration information is not valid'});
      }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });   
  });

app.listen(process.env.PORT ?? 3000);
