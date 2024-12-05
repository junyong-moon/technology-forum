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
    // postReacted: [{type: ObjectId, ref: 'Posts'}],
    // permission: {type: Number, required: true}
}, {timestamps: true});

const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    //photo: {} Possibly add screenshots or graphics into an article?
    views: {type: Number, required: true},
    likes: {type: Number, required: true},
    comments: [{ type: ObjectId, ref: 'Comment' }]
}, {timestamps: true});

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    writtenBy: {type: ObjectId, required: true, ref: 'User'},
    //photo: {} Possibly add screenshots or graphics into an article?
    views: {type: Number, required: true},
    likes: {type: Number, required: true},
    comments: [{ type: ObjectId, ref: 'Comment' }]
}, {timestamps: true})

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    writtenBy: {type: ObjectId, required: true, ref: 'User'},
    // likes: {type: Number, required: true},
    // uploadedTime: {type: Date, required: true},
    // reaction: String, // An optional emoji
    // replies: {type: Array, required: true}, // This may be challenging bc it needs recursion
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