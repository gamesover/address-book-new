# README #

This is front end part of Address Book demo. Please access to online app at [heroku](https://address-book-frontend.herokuapp.com/)

### Technical Stack  ###

* Angular 2 as front end single page application
* AJAX talks with [backend](https://github.com/gamesover/address-book-pwc)
* This is also a submodule of the above project.
* Due to heroku limitation(one project can have a web [dyno](https://devcenter.heroku.com/articles/dynos#dyno-configurations) only), the project was split into 2 parts. 

### Heroku Setup ###

This project relies on 2 [buildpacks](https://devcenter.heroku.com/articles/buildpacks)
* heroku/nodejs (heroku official version)
* https://github.com/heroku/heroku-buildpack-static 
Make sure you config at heroku correctly.

### Note ###
* `static.json` is Nginx sever configuration. Reverse proxy is used to bypass CORS. 
* `tslint` for typescript style check
* `.travis.yml` for CI
* you need to link github git repository at heroku, so CD is also implemented
* When CD, heroku will call `npm heroku-postbuild` and `heroku-build` automatically
* When Heroku deploys web or worker dyno, it starts with a clean system, so no delete old production files is needed. That's why `heroku-build` is created
* Heroku only supports to access to 80 and 443 port!

### Dev Env Setup ###
* Webpack is used for building everything.
* At root directory, just run `npm install`
* Then you can run `npm start` to start webpack dev server and access to `http://localhost:8080`(given backend API server is started already)
* `npm test` is to run karma test cases
* `npm build` is assuming you deploy at normal production env(virtual machine or cloud). Thus, deleting old folder is usually needed before deploying new code.

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact