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

// Probably I can add a section where a user can see a list of liked/disliked posts?


app.listen(process.env.PORT || 3000);
