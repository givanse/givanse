
In the past I've used succesfully [Ember Simple Auth](http://ember-simple-auth.com/) (ESA),
so I'll default to it. The question is now reduced to: What will I use in Sails to be able to talk to ESA?

## Passport

A Express compatible authentication middleware.
The library is designed to be very flexible, also framework and database agnostic.
It is a mature tool that can do much more than other packages.

Since Sails is built on top of Express, this will work, an example can be found at:
[sails-authorization](https://github.com/ryanwebber/sails-authorization)
Also, in [how-to-sane](https://github.com/mgenev/how-to-sane)
you'll find a Passport + ESA + OAuth2 solution. 

Other Passport based packages: 
[sails-auth](https://github.com/tjwebb/sails-auth), 
[sails-generate-auth](https://github.com/kasperisager/sails-generate-auth)

## Waterlock 

Provides user authentication for Sails with JSON web tokens [(JWT)](http://jwt.io/).
This tool was built exclusively for Sails and relies on `jwt-simple`.

# Sane Stack

Chances are that you are using Sane. The latest version, 0.1.0-beta.1, introduces a feature that allows you to install addons.

## sane-auth

A Sane addon that provides basic authentication for the full stack. 
Under the hood its using `express-jwt` + ESA + OAuth2.

This package is a **machinepack**, that is the name given to NPM modules that comply to a standarized interface described in
[node-machine.org](http://node-machine.org/)

You'll find a usage example and a more detailed explanation of how it works in
[Sane-Auth example](http://givan.se/sane-auth-example).

# TL;DR

If you are working with Sails and Ember, the assumption is that your backend works as a RESTful API, all you need is one of these:

* [Waterlock](http://waterlock.ninja/) + ESA (jwt-simple + ESA)
* [sane-auth](https://github.com/sane/sane-auth) (express-jwt + ESA)

If for some reason you have extra requirements (e.x. need a session) look into this:

* [Passport](http://passportjs.org/) + ESA

