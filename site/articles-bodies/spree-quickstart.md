## MySQL

Prepare MySQL for the Rails app.

```sql
CREATE USER spree_db_user@'localhost' IDENTIFIED BY 'secreto';
GRANT ALL PRIVILEGES ON spree_example_development.* TO spree_db_user@'localhost';
GRANT ALL PRIVILEGES ON spree_example_test.* TO spree_db_user@'localhost';

exit
```

You can verify that the user was correctly created:

```bash
mysql -u spree_db_user -p
```

## Rails

Create the Rails app and enter that folder.

```bash
rails new spree-example -d mysql
cd spree-example
```

### Setup the MySQL database

In `config/database.yml` update the username, password and database name that we just created.

```rb
default: &default                                                                
  adapter: mysql2                                                                
  encoding: utf8                                                                 
  pool: 5                                                                        
  username: spree_db_user                                                        
  password: 'secreto' 

development:                                                                     
  <<: *default                                                                   
  database: spree_example_development

test:                                                                            
  <<: *default                                                                   
  database: spree_example_test
```

Create the database.

```bash
rake db:create
```

At this point we should have an empty Rails app that is able to boot.

```bash
rails s
# visit 
# http://localhost:3000/
```

You'll see the usual:

> Welcome aboard
> You’re riding Ruby on Rails!

### Spree

Remember API only.

In `Gemfile` add

```rb
gem 'spree_backend', '3.0.0'
gem 'spree_sample', '3.0.0'
```

```bash
bundle install
rails g spree:install
```

Edit `config/routes` so that it looks like this:

```rb
  #get "/" => redirect("/admin")
  #get "/login" => redirect("/admin/login")
  root to: "spree/admin/orders#index"
 
  mount Spree::Core::Engine, :at => '/'
```

In `config/initializers/devise.rb` add

```
```

Setup app.

```bash
rake db:migrate
rake db:seed
rake spree_sample:load
```

All done, run the app:
```bash
rails server
# visit
```

### Remove frontend leftovers 

```bash
rm -r vendor/assets/javascripts/spree/frontend/
rm -r vendor/assets/stylesheets/spree/frontend/
```
