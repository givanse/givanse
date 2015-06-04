
This combination is what has worked best for me, but there are many other options,
you can read about those here: [Ember and Sails authentication options](http://givan.se/ember-and-sails-authentication-options).

## Tools

First of all, you need to install Node.
If you haven't done it yet, I strongly recommend that you do it through [NVM](https://github.com/creationix/nvm).

The version that we'll be using is:

    node -v
    v0.12.4 

Install the necessary tools:

    npm install -g ember-cli@0.2.7
    npm install -g sails@0.11.0
    npm install -g sane-cli@0.1.0-beta.1

## Sane

Create a new sane project.

    sane new sane-auth-example
    # it will take a couple of minutes,
    # stand up and stretch a bit 
    cd sane-auth-example/
    sane install sane-auth
    # we are done, really
    sane up
    # visit 

Visit `http://localhost:4200/register` and register a new user, you can login after that.
I wasn't joking, we are done.

You can see the code here: [givanse/sane-auth-example](https://github.com/givanse/sane-auth-example).

## How??? 

This was extremely easy because we are leveraging multiple open source projects.
What follows is an overview of what is happening under the hood.

### Sane

Sane gives us a medium for full stack development using Ember and Sails.
Version `0.1.0-beta.1` introduces the addons feature,
`sane-auth` is an addon and that is why we were able to set everything up with a single command.
Both of them are a really nice glue between Sails, Ember and a bunch of other packages.

#### Client 

Sane-auth installs the [Ember Simple Auth (ESA)](http://ember-simple-auth.com/) addon with the OAuth2 authenticator.
It also creates the routes `user`, `login` and `register` with their respective templates.
It saves us from all that boilerplate.

#### Server 

On this side its relying on `jsonwebtoken` and `express-jwt`, both built by auth0.
Sane-auth creates the `User` and `Auth` controller, the `User` model and the `hasToken` policy that protects all our routes.

## Data flow

Every request will be filtered by the policy `hasToken`,
internally it uses `express-jwt` (with `jsonwebtoken`) to verify that the request comes with a proper and valid JWT.
That is the flow once you are logged in.

When a user submits a log-in this happens:

 * Client
   * ESA sends a request to `/api/v1/auths/login`
 * Server 
   * The `Auth` controller handles the request and does one of two things:
     * Use `bcrypt` to validate the user password and generate a new JWT for the user using `jsonwebtoken`. 
     * If the request comes already with a JWT, it uses `jsonwebtoken` to verify it and generate new tokens.

### Caveat

The `logout` action only deletes the token in the client, it will remain as a valid token in the server until it expires.
That is 2 hours, the default set by `sane-auth`.
If you want extra security you'll have to implement your own process for token invalidation in the backend.

## Yo Dawg

There is no magic, since both frameworks have strong conventions its relatively easy to automatically generate stuff for them. Composability is giving us all this goodness. We have an addon that installs and configures other addons.
