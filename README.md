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
  postReacted: // the list of posts that the user liked/disliked
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

Please follow the link to view the codebase for the first draft schema.

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

1. As non-registered user, I can register a new account with the site
  * Even as unregistered, I can read articles, but not user-written posts.
  * Also I cannot like or dislike to a post before registration!
2. As a user, I can log in to the site
3. As a user, I can react to articles, user-written posts, and comments
4. As a user, I can write a post or a comment
5. As a user, I can view the list of articles and posts that I liked or disliked

## Research Topics

Here is a tentative list of research that I would like to explore:

* (3 points) Unit testing with JavaScript
* (3 points) Built tools / task runners such as vite, Webpack, along with:
    * (2 points) Integrate ESLint into the workflow
* (2 points) CSS framework or UI toolkit, use a reasonable of customization of the framework

I am planning to fulfill 10 points total out of 10 required points.


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a `views` folder and routing in app.mjs and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)


