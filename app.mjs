import './config.mjs';
import './db.mjs';
import './auth.mjs';
import { usernameValid, passwordValid } from './regiValidation.mjs';
import * as auth from "./auth.mjs";

import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import nconf from 'nconf';

import { fileURLToPath } from 'url';
import path from 'path'

/*  * TODOS (for milestone 4):
    Change the design for post/newsstand list & the posting pages
    Improve search
    Add eslint!!!!!
*/  

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, 'src');

app.set('view engine', 'hbs');
app.use(express.static(root));
app.use(express.urlencoded({ extended: false }));

const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
const Article = mongoose.model("Article");
const Request = mongoose.model("Request");

const authRequiredPaths = ['/posts/add', '/news/add', '/request-authorize'];

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
            res.redirect('/login');
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

app.get('/news', async (req, res) => {

    const filterObj = {};

    if (req.query.searchQuery) {
        filterObj["$text"] = { $search: req.query.searchQuery };
    }

    const articles = await Article.find(filterObj).sort("-createdAt").exec();
    res.render('news', {articles});
});

app.get('/news/add', async (req, res) => {
    // Here we can possible use nconf to check if the user is athentificated as an article-writer
    // Admins bypass this

    nconf.argv()
    .env()
    .file({ file: './nconf/authorized-members.json' });

    const username = res.locals.user.username
    const authorizedMembers = nconf.get("members");
    console.log(authorizedMembers, username);

    const user = await User.findOne({username: username});

    if (authorizedMembers.includes(username) || user.isAdmin) {
        res.render('create-news', {});
    } else {
        res.redirect('/request-authorize')
    }
})

app.post('/news/add', async (req, res) => {
    
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        views: 0,
        likes: 0,
        comments: []
    })

    //consider adding catching errors
    await newArticle.save();
    const slug = newArticle.slug;

    res.redirect('/news/' + slug);
})

app.get('/news/:slug', async (req, res) => {
    
    const requestedArticle = 
        await Article.findOne({ slug: req.params.slug })
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'writtenBy',
                            model: 'User'
                        }
                    })
                    .exec();


    // Parsing time information of the article
    const uploadedTime = requestedArticle.createdAt.toString().slice(0, 25);

    // Checks if the user is logged in (used for comment section)
    const userID = res.locals.user ? res.locals.user.username : null;

    // Parsing time information of each comment
    const comments = requestedArticle.comments.map(obj => {
        // TODO: This makes extra duplicate information... is there a way to avoid this?
        obj.uploadedTime = obj.createdAt.toString().slice(0,25); 
        return obj;
    })

    res.render('news-detail', { requestedArticle, uploadedTime, userID, comments });
});

app.post('/news/:slug/comments-add', async (req, res) => {

    // TODO: Assert that the session is logged in
    const requestedArticle = await Article.findOne({ slug: req.params.slug });
    // const uploadedTime = requestedArticle.createdAt.toString().slice(0, 25);
    // const userID = res.locals.user ? res.locals.user.username : null;
    
    if (req.body.comment) {
        const newComment = new Comment({
            content: req.body.comment,
            writtenBy: res.locals.user._id,
        });

        await newComment.save();
        await requestedArticle.comments.push(newComment._id);
        await requestedArticle.save();
    
    } else {
        // TODO: display an error msg when the comment is empty
    }

    res.redirect('/news/' + req.params.slug);
});

app.get('/request-authorize', async (req, res) => {
    // A user can request to promote oneself to an authorized, allowing one to write articles
    // If a user is already authorized, display a message

    nconf.argv()
    .env()
    .file({ file: './nconf/authorized-members.json' });

    const renderObj = {};
    const authorizedMembers = nconf.get("members");
    const authorized = authorizedMembers.find(member => member === res.locals.user.username);
    let requested = false;

    if (!authorized) {
        if (res.locals.user) {
            const userInfo = await User.findOne({username: res.locals.user.username});
            renderObj.created = userInfo.createdAt.toString().slice(0,15);
            renderObj.userInfo = userInfo;
    
            const posts = await Post.find({ writtenBy: userInfo._id });
            const comments = await Comment.find({ writtenBy: userInfo._id });
            renderObj["numPosts"] = posts.length;
            renderObj["numComments"] = comments.length;
            
            const requestInfo = await Request.find({username: res.locals.user.username});
            if (requestInfo.length > 0) {
                requested = true;
            }
        } else {
            res.redirect("/login");
        }
    }

    renderObj["authorized"] = authorized;
    renderObj["requested"] = requested;
    
    res.render('request-authorize', renderObj);
})

app.post('/request-authorize', async (req, res) => {

    // Retrieve the number of user posts and comments
    const userInfo = await User.findOne({ username: res.locals.user.username });

    const posts = await Post.find({ writtenBy: userInfo._id });
    const comments = await Comment.find({ writtenBy: userInfo._id });
    const numPosts = posts.length;
    const numComments = comments.length;

    const newRequest = new Request({
        username: userInfo.username,
        message: req.body.message,
        posts: numPosts,
        comments: numComments,
    })

    //consider adding catching errors
    await newRequest.save();

    res.redirect('/request-authorize');
})

// An admin page to set users to article-writers
app.get('/administrate', async (req, res) => {

    // if the users not admin, just redirect to the main page
    if (!res.locals.user || !res.locals.user.isAdmin) { // Props it's better to check the actual db
        res.redirect("/"); // This has an error
    }

    const requests = await Request.find();
    const requestsRender = requests.map(request => {
        request.registerDate = request.createdAt.toString().slice(4, 15);
        return request;
    })

    res.render("administrate", { requests: requestsRender });
});

app.post('/administrate', async (req, res) => {

    // if the users not admin, just redirect to the main page
    if (!res.locals.user || !res.locals.user.isAdmin) { // Props it's better to check the actual db
        res.redirect("/"); // This has an error
    }

    nconf.argv()
    .env()
    .file({ file: './nconf/authorized-members.json' });

    // Add the user to the authorized list
    const authorizedMembers = (nconf.get("members"));
    authorizedMembers.push(req.body.username);
    nconf.set("members", authorizedMembers);
    nconf.save();

    await Request.deleteOne({username: req.body.username});

    res.redirect("/administrate");
});


app.get('/posts', async (req, res) => {
    const filterObj = {};

    if (req.query.searchQuery) {
        filterObj["$text"] = { $search: req.query.searchQuery };
    }

    const posts = await Post.find(filterObj).sort("-createdAt").exec();

    res.render('posts', {posts});
});

app.get('/posts/add', (req, res) => {
    res.render('createPost', {});
})

app.post('/posts/add', async (req, res) => {

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
    const slug = newPost.slug;

    res.redirect('/posts/' + slug);
})

app.get('/posts/:slug', async (req, res) => {
    
    const requestedPost = 
        await Post.findOne({ slug: req.params.slug })
                    .populate('writtenBy')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'writtenBy',
                            model: 'User'
                        }
                    })
                    .exec();


    // Parsing time information of the post
    const uploadedTime = requestedPost.createdAt.toString().slice(0, 25);

    // Checks if the user is logged in (used for comment section)
    const userID = res.locals.user ? res.locals.user.username : null;

    // Parsing time information of each comment
    const postComments = requestedPost.comments.map(obj => {
        // TODO: This makes extra duplicate information... is there a way to avoid this?
        obj.uploadedTime = obj.createdAt.toString().slice(0,25); 
        return obj;
    })

    res.render('post-detail', { requestedPost, uploadedTime, userID, postComments });
});

app.post('/posts/:slug/comments-add', async (req, res) => {

    // TODO: Assert that the session is logged in
    const requestedPost = await Post.findOne({ slug: req.params.slug });
    // const uploadedTime = requestedPost.createdAt.toString().slice(0, 25);
    // const userID = res.locals.user ? res.locals.user.username : null;
    
    if (req.body.comment) {
        const newComment = new Comment({
            content: req.body.comment,
            writtenBy: res.locals.user._id,
        });

        await newComment.save();
        await requestedPost.comments.push(newComment._id);
        await requestedPost.save();
    
    } else {
        // TODO: display an error msg when the comment is empty
    }

    res.redirect('/posts/' + req.params.slug)
});

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

// TODO: Modify the register page that the user have to type password twice
app.post('/register', (req, res) => {

    if (!usernameValid(req.body.username)) {
        res.render('register', {message: "Please review if your username follows the naming rules"});
        return;
    } else if (!passwordValid(req.body.password)) {
        res.render('register', {message: "Please review if your password has at least 8 letters with valid combinations"});
        return;
    } else if (req.body.password !== req.body.confirmPassword) {
        res.render('register', {message: "The given passwords do not match"});
        return;
    }

    const newUsername = req.body.username.toLowerCase();

    User.register(new User({ username: newUsername, email: req.body.email, isAdmin: 0 }), 
        req.body.password, function (err, user) {
      if (err) {
        res.render('register', {message: err.message});
      }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });   
});

app.listen(process.env.PORT ?? 3000);
