---
layout: post
title:  "Deploying Rails applications with Capistrano"
date:   2014-12-01 12:00:00 -0800
permalink: /:categories/deploying-rails-capistrano
categories: posts
image: /images/posts/deploying-capistrano/featured.jpg
thumb:  /images/posts/deploying-capistrano/featured-thumb.jpg
class: rails
excerpt: Learn to install, configure, and deploy a Rails application using Capistrano.
---

Once you have a Ruby on Rails production sever set up, its time to look at deployment options. The most well known has got to be Capistrano, which allows you to deploy changes by running simple commands. It can be confusing to set up, so here's a guide taking you through the deployment process.

### Briefing

You are going to need a Rails production sever and a git repository of your project, in order to deploy with Capistrano. Additionally you will want a special Deploy user with limited permissions for Capistrano to use. I wrote a few guides to take you through everything.

To set up a production sever you can follow my two guides [Installing Ruby on Rails and MySQL on Ubuntu](/posts/installing-rails-mysql-ubuntu), and [Installing Passenger and Nginx on Ubuntu](/posts/installing-nginx-passenger-ubuntu).

As for the Git repository, you can simply use GitHub, or if you want I wrote a tutorial [Installing git from source](/posts/installing-git-source-ubuntu).

Now let's take a look at what we'll be doing throughout this guide.

1. We'll install Capistrano locally in our app.
2. We'll configure Capistrano for our server and repository.
3. We'll deploy our application using Capistrano.
4. We'll create a database and fix any problems we run into.

### Installing Capistrano on our app

This parts super easy, it's just a couple gems! Start by navigating to the root on your Ruby on Rails application locally. Open the Gemfile, and add the Capistrano gems.


{% highlight ruby %}
gem 'capistrano', '~> 3.1.0'
gem 'capistrano-bundler', '~> 1.1.2'
gem 'capistrano-rails', '~> 1.1.1'
{% endhighlight %}

Save, exit, and run the following commands in Terminal.

```nohighlight
bundle install
cap install STAGES=production
```

This will install the Capistrano Gems and create all the Capistrano configurations files within our app. Easy enough, right?

### Capistrano Configuration

From the root of your application, open the Capfile. We need to add a couple lines, make yours look like the example below.

{% highlight ruby %}
require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/bundler'
require 'capistrano/rails'
Dir.glob('lib/capistrano/tasks/*.cap').each { |r| import r }
{% endhighlight %}

Now open config/deploy.rb, replace the contents with the code below, be sure to change the application name, repository url, and deploy root.

{% highlight ruby %}
lock '3.1.0'

set :application, 'yourapp'
set :repo_url, 'git@yourserver.com:/var/git/yourproject.git'

set :deploy_to, '/var/www/yoursite.com'

set :linked_files, %w{config/database.yml config/secrets.yml}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, 'deploy:restart'
  after :finishing, 'deploy:cleanup'
end
{% endhighlight %}

Last but not least open config/deploy/production.rb and edit it to look like the example below. Be sure to replace the sever IP with your own.

{% highlight ruby %}
set :stage, :production
server '543.543.345.543', user: 'deploy', roles: %w{web app}
{% endhighlight %}

That's about it, we're all configured and ready to give deployment with Capistrano a try.

### Deploying with Capistrano

Now that we're all configured and ready to go, cross your fingers and run the following command to test the configuration and connection.

```nohighlight
cap production deploy:check
```

```nohighlight
Error: Finished in 0.055 seconds with exit status 1 (failed). 
ERRORlinked file /var/www/yoursite.com/shared/config/database.yml does not exist on 543.543.345.543 cap aborted!
```

Oh no, what happened here? It looks like we forgot to create the database.yml and secrets.yml files that we linked while editing deploy.rb. Lets do that now.

```nohighlight
ssh deploy@yoursite.com
cd /var/www/yoursite.com/shared/config
nano database.yml
```

Paste your database.yml file here. You can edit out all the development bits. Be sure to set the user and password for your sever MySQL account

{% highlight yaml %}
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password:
  socket: /var/run/mysqld/mysqld.sock

production:
  <<: *default
  database: robbyk_production
  username: youruser
  password: yourpassword
{% endhighlight %}

Save and exit. Now let's create one for our secrets.yml file.

```nohighlight
nano secrets.yml
```

Paste the following code, replacing with your own secret key base

{% highlight yaml %}
production:
  secret_key_base: a1dfa1e1b36393d2342a3fa6eac8ed82b4443234f543c75bb8facd25a518e72d02293f6ad1f324e927e3337d7a048d6aaa2f7ac8b139c0c3064793b1832bf5
{% endhighlight %}

**Note:** If you don't have a secret key base already, you can generate one by navigating to the root of your application locally and running **rake secret**

Alright now that the files are in place, let's try this again.

```nohighlight
cap production deploy:check
```

**Success:** cap production deploy:check Finished in 0.048 seconds with exit status 0 (successful).

Awesome looks like everything is configured correctly and working. Now let's deploy our application for real. Run the following command.

```nohighlight
cap production deploy
```

**Success:** Finished in 0.057 seconds with exit status 0 (successful).

It looks like we've deployed successfully, but when we open our website in the browser, we see an error message. After checking our production log at `/var/www/yoursite.com/current/log/production.log` we discover that we haven't created/migrated a database yet. Do this by running the following commands.

```nohighlight
ssh user@yoursever.com
sudo -i # Gain root
cd /var/www/yoursite.com/current
bundle exec rake db:create RAILS_ENV=production
bundle exec rake db:migrate RAILS_ENV=production
service nginx restart
```

Refresh your website in your web browser and you should be in business! Any problems, questions, or feedback just leave a comment below.