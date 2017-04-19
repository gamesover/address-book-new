Address Book 
========================
[![Build Status](https://travis-ci.org/gamesover/address-book.svg?branch=master)](https://travis-ci.org/gamesover/address-book)


For user to upload address book execl files

### Technical Stack  ###

* Ruby on Rails as API server
* Frontend is rendered by Angular 2
* CI is checked by Travis CI
* Deploy to heroku and one web dyno runs both nginx and puma

### Heroku Setup ###

This project relies on 4 [buildpacks](https://devcenter.heroku.com/articles/buildpacks)
* heroku/ruby (heroku official version)
* https://github.com/gunpowderlabs/buildpack-ruby-rake-deploy-tasks (for db migrate after deploy) 
* set a heroku server env variable `DEPLOY_TASKS = db:migrate tmp:clear`
* https://github.com/jasonswett/heroku-buildpack-nodejs, run `nodejs` at `client` folder, thanks to Jason's [blog](https://www.angularonrails.com/deploy-angular-2rails-5-app-heroku/)
* https://github.com/ryandotsmith/nginx-buildpack, run `nginx` and `puma` in one `dyno`, pay attention to their config under `config` folder
* create a heroku postgresql service and set env varible `DATABASE_URL`
Make sure you config everything correctly.

### Note ###
* `.rubocop.yml` for ruby style check
* `.travis.yml` for CI
* you need to link github git repository at heroku, so `CD` is also implemented
* When github merge the branch to the master, after CI pass, heroku will pull the latest master, deploy and db migrate automatically
* Heroku only supports to access to 80 and 443 port! There is an internal `PORT` mapping to web dyno.

### Dev Env Setup ###
* `rails s` to start `rails` server, `npm start` to start angular webpack server
* make sure pass and create all `rspec`
* make sure `rubocop` are passed as well

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact