Address Book 
========================
[![Build Status](https://travis-ci.org/gamesover/address-book-pwc.svg?branch=master)](https://travis-ci.org/gamesover/address-book-pwc)


This is back end part of Address Book demo. Please access to online app at [heroku](https://address-book-frontend.herokuapp.com/)

### Technical Stack  ###

* Ruby on Rails as API server
* AJAX talks with [frontend](https://github.com/gamesover/address-book-frontend)
* Due to heroku limitation(one project can have a web [dyno](https://devcenter.heroku.com/articles/dynos#dyno-configurations) only), the project was split into 2 parts. 

### Heroku Setup ###

This project relies on 2 [buildpacks](https://devcenter.heroku.com/articles/buildpacks)
* heroku/ruby (heroku official version)
* https://github.com/gunpowderlabs/buildpack-ruby-rake-deploy-tasks (for db migrate after deploy) 
* set a heroku server env variable `DEPLOY_TASKS = db:migrate tmp:clear`
* create a heroku postgresql service and set env varible `DATABASE_URL`
Make sure you config at heroku correctly.

### Note ###
* `.rubocop.yml` for ruby style check
* `.travis.yml` for CI
* you need to link github git repository at heroku, so CD is also implemented
* When github merge the branch to the master, after CI pass, heroku will pull the latest master, deploy and db migrate automatically
* Heroku only supports to access to 80 and 443 port! No 3000 port in production env, never change puma conf port 
`port        ENV['PORT'] || 3000` 

### Dev Env Setup ###
* `rails s` is all you need to run
* make sure pass and create all `rspec`
* make sure `rubocop` are passed as well

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact