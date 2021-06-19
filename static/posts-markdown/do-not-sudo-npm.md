Even when the [documentation](https://github.com/joyent/node/wiki/Installation#installing-via-package-manager)
says that you can install Node and `npm` using `sudo`, its not the best idea.
If you do that, any future global installations with `npm install -g` will need root permissions.
At some point, doing that will cause you to run into issues during package installations,
you'll see errors like:

    npm ERR! code EACCES

NPM provides instructions on how to fix things when [global installations go wrong](https://docs.npmjs.com/getting-started/fixing-npm-permissions).
You can either reconfigure `npm` or change permissions in different paths.
It will usually be a not too complicated solution, but also each system/user might need to change
an extra path or a slightly different path...

Also, if you update your operating system or `npm`, there is a chance that the file paths and permissions configured with the guide above will be overriden and you'll have to re-do them.

You can completely avoid those incantations if you never issue a `sudo` command.

## Why not?

You should not run applications with root privileges if its not necessary.
Node and npm can do their work just perfectly fine without admin powers.

### Running a server

If you are running a server with root privileges and it gets hacked through a
vulnerability in your code, the attacker will have total control over your machine.

    sudo node server.js # bad

If you say:

> I need access to port 80 so that I can serve HTTP responses and only root can listen to it.

What needs to be done is redirect the traffic to a port that can be enabled without root privileges and
have your Node application listen to that port,
not run the whole thing with `sudo`.

You can redirect ports with `iptables` or a reverse proxy like Nginx,
using one of those tools allows you to send the traffic from port 80 to
whatever port you chose for your Node application.

### Installing packages

Don't install packages with root privileges.

> Packages can run arbitrary scripts, which makes sudoing a package manager command as safe as a chainsaw haircut.
>
> – [@izs](https://twitter.com/izs), npm core

This situation was addressed with [safe sudo behavior](https://github.com/npm/npm/issues/294),
but there is a chance that
[some packages will be "broken"](https://github.com/npm/npm/issues/3139#issuecomment-13358582)
and still execute code with root privileges.

> Install related lifecycle scripts are rare, as we heavily discourage their use, but there are some out there.
>
> &mdash; [@ReBeccaOrg](https://twitter.com/ReBeccaOrg), npm core

Although the situatuion has been handled, lets **err** on the side of caution and avoid using `sudo`.

### Avoid common pitfalls

Find trouble elsewhere, save yourself from some pain here.
Using `sudo` is likely to give you package installation headaches.
As I write this, there are **1,108** StackOverflow (SO) questions related to
[sudo npm](http://stackoverflow.com/search?q=is%3Aquestion+sudo+npm).
Many Node.js SO posts can be boiled down to:

> npm didn't work so I tried again using sudo and broke my install

I'm aware that many of them will not be exactly a "I can't install X package" type of question,
but if we cut that number to a third it still is a **crazy amount**!
Consider that very popular SO questions have 3 to 4 duplicates.  

## Keep it simple

The first two points might not be of utter importance if there is a single user in your system and its not a production environment.
However, the third point remains indisputably a hurdle that you want to avoid;
you don't want to spend time fixing a package manager that you accidentally broke.

## Install npm properly

Install Node and npm with one of this options:

 1. Manually download and install Node binaries from [nodejs.org](https://nodejs.org/download/).
 2. Use one of the techniques listed in [install node and npm without sudo](https://gist.github.com/isaacs/579814) by [@izs](https://twitter.com/izs).
 3. Use [Node Version Manager (NVM)](https://github.com/creationix/nvm).

What I always do is use `nvm` because with a single command I can get the ball rolling. I have never had a problem with it.
And for production I download and manually install the Node version that I need.
