import "./db.mjs";
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import passport from "passport";
import LocalStrategy from 'passport-local';

const User = mongoose.model("User");

// TODO: bring authentification functions here (not in app.mjs)

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());