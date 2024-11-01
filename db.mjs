import { ObjectId } from 'bson';
import mongoose from 'mongoose';

mongoose.connect(process.env.DSN)

const User = new mongoose.Schema({
    username: {type: String, required: true},
    hash: {type: String, required: true},
    email: {type: String, required: true},
    registrationDate: {type: Date, required: true},
    postReacted: {type: Array, required: true}
});

const Article = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    //photo: {} Possibly add screenshots or graphics into an article?
    views: {type: Number, required: true},
    likes: {type: Number, required: true},
    uploadedTime: {type: Date, required: true},
    comments: {type: Array, required: true} // Is there a way to put a array of a specific type?
});

const Post = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    writtenBy: {type: ObjectID, required: true},
    //photo: {} Possibly add screenshots or graphics into an article?
    views: {type: Number, required: true},
    likes: {type: Number, required: true},
    uploadedTime: {type: Date, required: true},
    comments: {type: Array, required: true} // Is there a way to put a array of a specific type?
})

const Comment = new mongoose.Schema({
    content: {type: String, required: true},
    writtenBy: {type: ObjectID, required: true},
    likes: {type: Number, required: true},
    uploadedTime: {type: Date, required: true},
    reaction: {type: String, required: false}, // An optional emoji
    replies: {type: Array, required: true}, // This may be challenging bc it needs recursion
});