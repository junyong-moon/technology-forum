import './config.mjs'
import './db.mjs'

import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, 'src');

app.set('view engine', 'hbs');
app.use(express.static(root));
app.use(express.urlencoded({ extended: false }));

// Probably I can add a section where a user can see a list of liked/disliked posts?

// Add a few routings here (also make views folder)
app.get('/', (req, res) => {
    res.render('home', {});
})

app.get('/news', (req, res) => {
    res.render('news', {});
})

app.get('/posts', (req, res) => {
    res.render('posts', {});
})

app.listen(process.env.PORT || 3000);
