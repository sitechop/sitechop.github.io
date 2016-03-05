---
layout: post
title:  Installing Ruby on Rails and MySQL on Ubuntu
date:   2014-09-30 12:00:00 -0800
updated:   2016-02-21 12:00:00 -0800
permalink: /:categories/installing-rails-mysql-ubuntu
categories: posts
image: /images/posts/installing-rails/featured.jpg
thumb: /images/posts/installing-rails/featured-thumb.jpg
class: ubuntu
excerpt: Learn how to get Ruby on Rails and MySql installed and running on an Ubuntu machine.
---

One reason I like Ubuntu, coming from windows, is that it is so much easier setting up a local environment to develop on. It was a breath of fresh air avoiding the extra windows-specific steps to make simple things work. Ruby on Rails is a popular choice to develop web applications and this guide will take you through the installation process on an Ubuntu server or desktop.

### Briefing

This tutorial assumes you have a super user account/access to root. If you're installing rails on an Ubuntu server, it's assumed you have a basic configuration your sever done. If haven't done so already there is an awesome tutorial on [Linode](https://www.linode.com/docs/getting-started).

Let's go over what we'll be installing on our Ubuntu 14.04 system.

- Ruby 2.3.0
- Rails 4.2
- MySQL Database
- Node JS

**Note:** This tutorial DOES NOT use a Ruby version manager. I don't have a need for it yet, and chances are if you're looking up this tutorial you don't either. We can always add it later if needed.

### Installing Ruby

Let's start by gaining root access and updating out package lists.

```nohighlight
sudo -i
apt-get update
```

Once they're updated run the following commands to install Ruby 2.1.2 from source:

```nohighlight
apt-get install curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev
cd /tmp
wget https://cache.ruby-lang.org/pub/ruby/2.3/ruby-2.3.0.tar.gz
tar -xzvf ruby-2.3.0.tar.gz
cd ruby-2.3.0/
./configure
make
make install
ruby -v
```

If successful the last command will return the version of Ruby currently installed.

###  Installing Mysql

Most applications need a database, so let's install MySQL. There's other options out there like Postgres SQL, or SQLite, but MySQL is what I'm familiar with and probably the most widely used. We'll install MySQL with apt-get.

Note: The installation will ask you for a root password. For local installations I leave it blank, if this is on a web server it's recommended you use a secure password.

```nohighlight
apt-get install MySQL-server mysql-client libmysqlclient-dev
```

Now log in to the MySQL command prompt and create a new user. Be sure to edit `username` and `password` with your own username and password.

```nohighlight
mysql -u root -p
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'username'@'localhost';
FLUSH PRIVILEGES;
quit
```

### Installing Rails

Last but not least, Lets install Rails 4.2 on our Ubuntu 14.04 system. Let's install it using ruby gems by running the following command:

```nohighlight
gem install rails
```

### Javascript runtime

In order for a rails app to work we're are going to need a Javascript runtime. The popular choices are NodeJS and The Ruby Racer Gem. I've had nothing but trouble from TheRubyRacer, so I personally recommend that you install NodeJS instead.

```nohighlight
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Restart your system

To finish everything off restart your computer so all the temporary files will be deleted. Thanks, and happy developing. Any questions, problems, or suggestions, leave a comment below.

### Updates

- **12-18-14** - Tutorial has been updated for Ruby version 2.1.5.
- **03-15-15** - Tutorial has been updated for Ruby version 2.2.1.
- **02-21-16** - Tutorial has been updated for Ruby version 2.3.0.