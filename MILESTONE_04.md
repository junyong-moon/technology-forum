Milestone 04 - Final Project Documentation
===

NetID
---
jm8899

Name
---
Junyong Moon

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-junyong-moon.git

URL for deployed site 
---
http://linserv1.cims.nyu.edu:29249

URL for form 1 (from previous milestone) 
---
* [Form for searching (login not needed)](http://linserv1.cims.nyu.edu:29249/news)
* [Form for posting (login needed)](http://linserv1.cims.nyu.edu:29249/posts/add)

Special Instructions for Form 1
---
For login, please use the following account:
- id: superuser
- password: PASSword1!

If you want to register, please make sure that:
- The username has at least 6 letters which may be alphanumerical or underscores
- The username does not have the leading underscore (for example, `_username`)
- The username has up to two underscores
- The password has at least 8 letters
- The password has at least one of each: uppercase, lowercase, number, and special letters like `!` or `$`

URL for form 2 (for current milestone)
---
* [Form for adding a comment (login needed)](http://linserv1.cims.nyu.edu:29249/posts/please-test-post-requests-here)

Special Instructions for Form 2
---
For login, please use the following account:
- id: superuser
- password: PASSword1!

After login, please navigate to Posts section (in the top navigation bar),
then find a post named 'Please test POST requests here.' Thanks! 

URL for form 3 (from previous milestone) 
---
* [Request Authorization Form](http://linserv1.cims.nyu.edu:29249/request-authorize)
* [Admin Page](http://linserv1.cims.nyu.edu:29249/posts/administrate)

Special Instructions for Form 3
---
For this link, please use a regular user account:
- id: testacct1
- password: PASSword1!

After login, please navigate to News section (in the top navigation bar),
and then click on "Write a news article" button.

After you complete the form, you will be able to see the request through [this link](http://linserv1.cims.nyu.edu:29249/posts/administrate) if you login to the admin account (`superuser`).

You may try to click on 'Approve,' log back in `testacct1` then you will find that the account can post a news article.

First link to github line number(s) for constructor, HOF, etc.
---
(TODO: add link to line number(s) here) 

Second link to github line number(s) for constructor, HOF, etc.
---
(TODO: add link to line number(s) here) 

Short description for links above
---
(TODO: describe what each link above is, one line each... for example: myFunction is a hof that retrieves json from a url, map is used to transform the Array of Person objects into an Array of strings that represents names)

Link to github line number(s) for schemas (db.js or models folder)
---
- [db.mjs](/db.mjs)

Description of research topics above with points
---
* (3 points) Unit testing with JavaScript with `Jest`
* (2 points) Integrate `eslint` into the workflow
* (2 points) CSS framework or UI toolkit, use a reasonable of customization of the framework by `tailwindCSS`
* (3 points) Configuration management through `nconf`
* (1-2 points) Usage of `passport`

Links to github line number(s) for research topics described above (one link per line)
---
- [Jest Testing](/test/test.js)
- [Jest Sample Result](/documentation/Jest_Result.png)
- [ESlint config](/eslint.config.js)
- [ESlint Sample Result](/documentation/eslint_result.png)
- [tailwindCSS config](tailwind.config.js)
- [tailwindCSS usage (layout.hbs)](/views/layout.hbs)
- [nconf usage (app.mjs, lines 113-118)](/app.mjs?plain=1#L113)
- [Login using passport (app.mjs, line 413)](/app.mjs?plain=1#L413)
- [Registration using passport (app.mjs, line 462)](/app.mjs?plain=1#L462)

Attributions
---
- [app.mjs: The main router](/app.mjs)
- [auth.mjs: Enables registration and login, equipped with passport](/auth.mjs)
- [config.mjs: Enables .env](/config.mjs)
- [db.mjs: Database Model Definitions and simple configuration (e.g. adding slug)](/db.mjs)
- [regiValidation.mjs: Helper functions to check if the username and the password are valid](/regiValidation.mjs)
- [/views: List of handlebars including the layout](/views)
