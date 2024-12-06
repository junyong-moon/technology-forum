import { ObjectId } from 'bson';
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

mongoose.connect(process.env.DSN)

const UserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String,
    email: String,
    isAdmin: Number // 0 for user, 1 for admin
}, {timestamps: true});

const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    views: {type: Number, required: true},
    likes: {type: Number, required: true},
    comments: [{ type: ObjectId, ref: 'Comment' }]
}, {timestamps: true});

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    writtenBy: {type: ObjectId, required: true, ref: 'User'},
    views: {type: Number, required: true},
    likes: {type: Number, required: true},
    comments: [{ type: ObjectId, ref: 'Comment' }]
}, {timestamps: true})

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    writtenBy: {type: ObjectId, required: true, ref: 'User'},
}, {timestamps: true});

const requestSchema = new mongoose.Schema({
    username: String,
    registrationDate: Date,
    posts: Number,
    comments: Number,
    message: String
}, {timestamps: true})

UserSchema.plugin(passportLocalMongoose);
PostSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});
PostSchema.index({ title: "text" });
ArticleSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});
ArticleSchema.index({ title: "text" });

mongoose.model('User', UserSchema);
mongoose.model('Article', ArticleSchema);
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
mongoose.model('Request', requestSchema);