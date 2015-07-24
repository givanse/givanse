
This guide was written using CentOS 6.5

## MySQL

First will install MySQL and prepare it to be manipulated by rails with rake tasks.

```bash
sudo yum install mysql mysql-server mysql-devel
sudo /usr/bin/mysql_secure_installation
# answer yes to all
```

Start the MySQL console:

```bash
mysql -u root -p
```

Setup a database user for the rails app:

```sql
CREATE USER 'a_user_name'@'localhost' IDENTIFIED BY 'a_secure_password';
GRANT ALL PRIVILEGES ON a_database_name.* TO 'a_user_name'@'localhost';
```

Note that we didn't create a database, rails will take care of that when we use the rake tasks.

## Ruby

We need to install a few dependencies for the ruby installation process.

```bash
sudo yum install git gcc make openssl-devel readline-devel
```

Once we have `git`, we'll install [rbenv](https://github.com/sstephenson/rbenv).
If you don't want to install git in the server,
you'll be fine if you just manually download a tar and extract it to the path shown below.

```bash
# rbenv
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv                      
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc                      
echo 'eval "$(rbenv init -)"' >> ~/.bashrc                         

# rbenv plugin
# allows us build ruby from source with one command
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Actually install ruby:

```bash
CONFIGURE_OPTS="--disable-install-rdoc" rbenv install 2.2.2
# set the ruby version for the user account
rbenv global 2.2.2
```

## Rails

We'll define a config for the ruby gems that will disable the installation of gem's documentation.
The assumption is that we are working with an actual server, so we don't need any of those files.
We also gain a bump on speed and reduced memory usage during installation, helpful for small servers.

```bash
echo 'gem: --no-document' >> ~/.gemrc
```

Now we'll install our first gems.

```
gem install rails -v 4.2.1
gem install bundler
```

### Rails app

I trust you know what to do here, install and start the rails app.
Brief reminder:

```
bundle install
rake db:create
rake db:migrate
# rake db:seed 
# or
# load DB backup
```

And start the app. There are many ways of doing this (webrick, unicorn, etc).
Just remember the port number where the app is running, we'll use it later.

## Nginx

From the Nginx site download the repo configuration package for [CentOS 6](http://nginx.org/en/linux_packages.html#stable),
we'll use it to configure a new repository and then install Nginx from there.

```bash
sudo yum install nginx-release-centos-6-0.el6.ngx.noarch.rpm
sudo yum install nginx
# verify
nginx -v
nginx version: nginx/1.8.0
```

Configure the routes for the rails and ember app,
you'll need `sudo` privileges to edit the configuration files.

In `/etc/nginx/nginx.conf` add:

```bash
# Its important to use the same user as the one that will be executing the app
# Doing so saves you the trouble of dealing with folders permissions
user current_user; 

# ...nginx settings...

http {

  # ...http settings...

  upstream my_rails_app {
    # use the correct port here
    server 127.0.0.1:3000_maybe_8080;
  }
}
```

For the following configuration it is assummed that the rails app and the ember files share the same root folder.
Like this:

```bash
tree web-app/
web-app/
├── ember
└── rails
```

In `/etc/nginx/conf.d/default.conf` add: 

```
server {

  location / {
    root /home/current_user/web-app/ember;
    try_files $uri /index.html?/$request_uri;
  }

  location /api {
    try_files /fake_file_default_to_rails @rails;
  }

  location ~* ^.+\.(jpg|jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|pdf|ppt|txt|tar|mid|midi|wav|bmp|rtf|mp3|flv|mpeg|avi|woff)$ {
    root /home/current_user/web-app;
    # headers and other settings
    try_files $uri /ember/$uri /rails/public/$uri @rails;
  }

  location ~* \.(?:css|js)$ {
    root /home/current_user/web-app;
    # headers and other settings
    try_files $uri /ember/$uri /rails/public/$uri @rails;
  }

  location @rails {
    proxy_set_header  X-Real-IP       $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  Host            $http_host;
    proxy_redirect    off;
    proxy_pass http://my_rails_app;
  }
}
```

I left out many of the settings for both files because those will vary a lot
between servers and applications. I show what is essential for the routing of
rails and ember requests.

Time to reload Nginx with the new configuration.

```bash
sudo service nginx reload
```

Now you can visit your site in the browser.
If its not working properly, review the log files located in `/var/log/nginx/`.

```bash
# example
tail -f /var/log/nginx/error.log
```

We are done.

## Possible errors

If you stumble in the logs with something like:

```
failed (13: Permission denied)
```

You might want to check if `SELinux` is not getting in the way.
It is known that there are certain scenarios where SELinux will block Nginx
if an explicit policy is not configured.
