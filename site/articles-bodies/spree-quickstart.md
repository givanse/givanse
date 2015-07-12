
rails new spree-site -d mysql

vi config/initializers/devise.rb

## MySQL

```sql
CREATE USER spree_user@'localhost' IDENTIFIED BY 'secreto';
GRANT ALL PRIVILEGES ON spree_db.* TO spree_user@'localhost';

exit
```

In `config/database.yml` update the username, password and database name that we just created.

```rb
```

```bash
gem install spree
spree install -A

rake db:create
rake db:migrate
rake db:seed
rake spree_sample:load
```

All done, run the app:
```bash
rails server
# visit
```
