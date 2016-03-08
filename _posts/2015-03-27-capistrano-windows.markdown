---
layout: post
title:  "Deploying Rails Applications with Capistrano from Windows"
date:   2015-03-27 12:00:00 -0800
permalink: /:categories/deploying-rails-capistrano-windows
categories: posts
image: /images/posts/deploying-capistrano/featured.jpg
thumb:  /images/posts/deploying-capistrano/featured-thumb.jpg
class: windows
excerpt: Learn how to deploy a Rails application on Windows using Capistrano.
---

Capistrano is probably the coolest and best way you can deploy your rails applications today, but it can frustrating to set up and understand. A few months ago I showed you how to deploy from an Ubuntu machine, and today I’m going to show you how it’s done on a Windows 8.1 machine. This was a major pain to figure out, so hopefully this will make the process painless for the next.

### Disclaimer

Before you begin, there’s a security issue I have to bring up. Capistrano on windows will not work using SSH to connect to your server. I searched far and wide and found no solution. To work around this problem we’re going to allow a deploy user with limited permissions to connect using password protection.

### Prerequisites

This tutorial is to take you through the Capistrano deployment portion of pushing a Rails application to production. By this point you should have your production server ready to go. My set up is running Ruby, Ngnix, MySQL, and Phusion Passenger. You will also need Git installed. If you’re not there yet, I’ve written guides on setting up every portion, they’re listed below:

1. [Installing Ruby, Rails, and MySQL on Ubuntu](/posts/installing-rails-mysql-ubuntu)
2. [Installing Git from source on Ubuntu](/posts/installing-git-source-ubuntu)
3. [Installing Nginx and Phusion Passenger on Ubuntu](/posts/installing-nginx-passenger-ubuntu)

### Creating a special deploy user

Let’s kick this tutorial off by creating a user for Capistrano to deploy with. Login to your VPS and grant yourself root permissions. Create a new deploy user with an extra secure password (since Capistrano will be using password authentication).

    sudo –i
    adduser deploy

Assuming you only allow SSH authentication to your server (if not get on that) we need to allow our deploy user to connect using password authentication. To do this we need to add a couple lines to our sshd_config file. Start by opening it.

    nano /etc/ssh/sshd_config

Now scroll to the very bottom and add these two lines.

    Match User deploy
    PasswordAuthentication yes

Exit the file saving your changes. What this does is override `PasswordAuthentication no` for the deploy user only.

### Creating a MySQL database

We’re also going to need a database for our application, we’ll do this manually rather than let Capistrano or Rake handle things. Log in to the MySQL and create a production database for your Rails application by running the following commands.

    mysql –u root –p
    CREATE DATABASE testapp_production;
    quit

### Pushing your application to GitHub

We’re also going to need an external Git repository of our application. Login to GitHub and create a new repository.

![GitHub new repository](/images/posts/cap-windows/new_repo.png)

This will take you to a page where you can configure your repository settings. Initialize your repository with the Rails .gitignore file.

[![GitHub Repository settings](/images/posts/cap-windows/repo_settings_thumb.png)](/images/posts/cap-windows/repo_settings.png)

We’ll be using an https connection, but if you want to use SSH it will work through Git Bash. Copy the clone URL from the GitHub repository page. Open a new CMD window and Navigate to your rails application’s root folder.  Initialize a git repository inside and set our newly created repo as the origin. The commands look like this (my apps located on my desktop).

![GitHub repository clone url](/images/posts/cap-windows/clone_url.png)

    cd Desktop
    cd testapp
    git init
    git remote add origin https://github.com/robbyklein/testapp.git

Delete the .gitignore file that Rails creates for you and pull the one from your GitHub repository.

![gitignore](/images/posts/cap-windows/gitignore.png)

    git pull origin master

Now add all your files your files to your local git repository and push them to GitHub.

    git add –A
    git commit –m “Initial Commit”
    git push origin master

[![git push](/images/posts/cap-windows/git_push_thumb.png)](/images/posts/cap-windows/git_push.png)

Your GitHub repository should now be populated with all your Rails application files, you’re now ready to set up Capistrano.

### Capistrano setup on Windows

Let’s get started setting up Capistrano. Open up your Gemfile and add the following three Gems.

```ruby
gem 'capistrano', '~> 3.1.0'
gem 'capistrano-bundler', '~> 1.1.2'
gem 'capistrano-rails', '~> 1.1.1'
```

Once done, run bundle install from your CMD window to install them all. Run the cap install command listed below to create all the configuration files we’ll need as well.

    bundle install
    cap install STAGES=production

This will create several files that we need to configure. The first is **Capfile** in the root of your rails application. Open it in your text editor. Delete all its contents and replace with the code below.

```ruby
require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/bundler'
require 'capistrano/rails'
Dir.glob('lib/capistrano/tasks/*.cap').each { |r| import r }
```

Save and close the file. Next we need to edit **config/deploy.rb**. Edit the contents to look like the code below. Remember to replace my details with yours.

```ruby
lock '3.1.0'

# Set your applications name
set :application, 'testapp'

# Set the repository url
set :repo_url, 'https://github.com/robbyklein/testapp.git'

# Set the deploy location
set :deploy_to, '/var/www/testapp.com'

# Tell capistrano to symbolically link these files and directories
set :linked_files, %w{config/database.yml config/secrets.yml}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Couple cleanup and restart tasks capistrano will run after deploy
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
```

Save an exit. The last file we need to configure is **config/deploy/production.rb**. Edit it to look like mine below. Remember to add your own server information.

```ruby
set :password, ask('Server password:', nil)
server '123.123.123.123', user: 'deploy', port: 22, password: fetch(:password), roles: %w{web app}
```

### Capistrano Deployment

Now that Capistrano’s configured, let’s get to deploying our Rails application. Run the following command to make sure Capistrano connects ok. It will also create some folders for us that we’ll need.

    cap production deploy:check

It will prompt you for your deploy users password, enter it. Then it will return an error saying that you’re missing some linked files. If you recall from config/deploy.rb we told Capistrano to link database.yml and secrets.yml. We need to put those files and the sever ourselves.

Connect to your VPS from the deploy user and navigate to the shared/config folder in your websites root. Create and open a new file called **database.yml**.

    cd /var/www/testapp.com/shared/config
    nano database.yml

Paste your database.yml contents inside, save and exit. They should look similar to mine below:

```yaml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password:
  host: localhost

  production:
  <<: *default
  database: [database-name-here]
  username: [mysql-user-here]
  password: [super-secure-password-here]
```

Now create an open **secrets.yml**

    nano secrets.yml

Paste your secrets.yml contents inside. They should look similar to mine.

```yaml
production:
  secret_key_base: 685b44034379bf35a2310e5890cbe0dc46677bd042f1994ec977d30c124417bdac711f5c14f4de900a844ac91768fe1ddfd94c928310c164a477c5096aa4c974
```

**To get your own production key run `rake secret` from the root of your rails app.**

Save and exit. You can also log out of your server. Now jump back to CMD and run the deploy:check command again:

    Cap production deploy:check

It should go through successfully this time. Now to actually deploy run:

    cap production deploy

It will take a little while to deploy your first time. In the end you should see a success message. Congrats you’ve just deployed your rails app from windows!

[![capistrano deploy success](/images/posts/cap-windows/deploy_success_thumb.png)](/images/posts/cap-windows/deploy_success.png)