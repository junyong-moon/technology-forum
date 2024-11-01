The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# Technology Forum (Tentative Name - subject to change)

## Overview

Technology Forum is a community to share tech information and knowledge, for developers and technology enthusiasts. It is a simple website consisting of a newsstand--where administrators share news--and a forum--where users and post information/questions to the related topics. After registration, users are free to share their opinion and knowledge, as well as to rant about recent Apple product! Not only can they do this in a post, but they may do so in a comment, given that the language is appropriate. Also, should users agree (or disagree) to a post or a comment, they can like/dislike them.


## Data Model

The application will store Users, Articles, (user-written) Posts, and Comments

* Each user contains login/authentification credentials
* Each article and post will have views, likes, and comments
* Each comment will have likes and replies (i.e. a comment can reference to another comments)

An Example User:
```javascript
{
  username: "sample_username",
  hash: // a password hash
  email: // an email address to the user
  registationDate: // the date when the user registrated
}
```

An Example of Article:
```javascript
{
    title: // title of the article
    content: // the content of the article
    //photo: Possibly add screenshots or graphics into an article?
    views: // the number of total views
    likes: // the number of likes
    uploadedTime: // timestamp
    comments: // comments of the article
}
```

An Example of user-written Post:
```javascript
{
    title: // title of the post
    content: // the content of the post
    writtenBy: // the ObjectID that points to the user
    //photo: Possibly add screenshots or graphics into an article?
    views: 5,
    likes: 1,
    uploadedTime: // timestamp
    comments: // comments of the article
}
```

An Example of Comment:
```javascript
{
    content: // content of the comment
    writtenBy: // the ObjectID that points to the user
    likes: 0,
    replies: // an array of ObjectID that points to each comment
    reaction: // An optional emoji or "sticker"
    uploadedTime: // timestamp
}
```

## [Link to Commented First Draft Schema](db.mjs) 

(__TODO__: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

