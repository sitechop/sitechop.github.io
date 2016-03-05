---
layout: post
title:  "Installing Nginx and Passenger on Ubuntu"
date:   2016-01-14 12:00:00 -0800
permalink: /:categories/installing-nginx-passenger-ubuntu
categories: posts
image: /images/posts/nginx-passenger/featured.jpg
thumb:  /images/posts/nginx-passenger/featured-thumb.jpg
class: ubuntu
excerpt: Learn how to install and set up Nginx and Passenger ruby.
---

In a previous post we wen't through installing Ruby on Rails on Ubuntu. In this post we'll go over adding Phusion Passenger and Nginx to the mix. Nginx is a light weight, and fast, web server rivialing the notorious Apache. Passenger is an application sever that we'll be running along side Nginx in order to put a Rails application into production.

### Briefing

This tutorial requires that you have an Ubuntu server set up with Ruby on Rails and a database. If you don't, I wrote a guide [Installing Ruby on Rails and MySQL on Ubuntu](/posts/installing-rails-mysql-ubuntu).

Now let's take a look at what we'll be doing throughout this guide.

1. We'll create a new deploy user on our Ubuntu system.
2. We'll create a new directory for our deployed applications.
3. We'll install Phusion Passenger along with the Nginx-passener module.
4. We'll configure Nginx.

### Creating a deploy user and directory

Let's start by creating a new deploy user with limited permissions. We'll also create a new directory to host our code.

```nohighlight
sudo -i # Gain root
adduser deploy
cd /home/deploy
mkdir .ssh
nano .ssh/authorized_keys
```

Paste your public ssh key into this file, save and exit. If you don't have SSH keys follow my tutorial here. Now let's change the ownership and permissions. Then we'll create a directory to deploy to.

```nohighlight
chown -R deploy:deploy .ssh
chmod 700 .ssh
chmod 600 .ssh/authorized_keys
cd /var
mkdir www
chown -R deploy:deploy www
```

### Installing Passenger/Nginx

Now that we have a special deploy user and folder, let's install Phusion Passenger and Nginx web server. We'll also install bundler which will come in handy for deployment later on.

```nohighlight
gem install passenger
gem install bundler
apt-get install libc6 libpcre3 libssl0.9.8 zlib1g libcurl4-openssl-dev
/usr/local/bin/passenger-install-nginx-module
```

At this point Passenger will ask you a few questions and do all the work for you. During the installation select the following options.

```nohighlight
Enter
Ruby
1. Yes: download, compile and install Nginx for me. (recommended)
Please specify a prefix directory [/opt/nginx]:
```

### Configuring Nginx

Now that we have Passenger and Nginx installed, it's time to configure it to our liking. By default our Nginx installation won't let us run commands like `service restart nginx`, so let's install a little script to make that possible.

```nohighlight
cd /tmp
wget -O init-deb.sh https://www.linode.com/docs/assets/660-init-deb.sh
mv init-deb.sh /etc/init.d/nginx
chmod +x /etc/init.d/nginx
/usr/sbin/update-rc.d -f nginx defaults
service nginx restart
```

If all went well, the last command should restart Nginx, confirming the script is working.

Now let's edit the main Nginx configuration file.

```nohighlight
nano /opt/nginx/conf/nginx.conf
```

Make note of your passenger version at the end of `passenger_root`, delete all the default data, post following code, save and exit. **Make sure you edit the passenger version to match the version you installed.**

```nohighlight
user www-data;
worker_processes  1;

error_log  /opt/nginx/logs/error.log;
pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
  use epoll;
}

http {
  passenger_root /usr/local/lib/ruby/gems/2.1.0/gems/passenger-4.0.55;
  passenger_ruby /usr/local/bin/ruby;

  include       /opt/nginx/conf/mime.types;

  default_type application/octet-stream;

  log_format main '$remote_addr - $remote_user [$time_local] '
                  '"$request" $status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"' ;

  access_log  /opt/nginx/logs/access.log;

  sendfile        on;
  tcp_nopush     on;

  keepalive_timeout  45;
  tcp_nodelay        on;

  gzip  on;
  gzip_disable "MSIE [1-6]\\.(?!.*SV1)";
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_proxied any;
  gzip_types    text/plain application/javascript application/x-javascript text/javascript text/xml text/css;

  include /opt/nginx/conf/sites-enabled/*;
}
```

**Note:** This is a very basic configuration. Later on it's recommended you do some research and fine tune the configuration specifically for your server and specs.

Now lets set up a virtual host for the application we'll be deploying today.

```nohighlight
cd /opt/nginx/conf
mkdir sites-available
mkdir sites-enabled
nano sites-available/yoursite.com
```

Paste the following code into this file, save, and exit. Be sure to change the settings for your domain, and root directory.

```nohighlight
server {
  listen   80;
  server_name  yoursever.com;

  passenger_enabled on;
  rails_env    production;
  root         /var/www/yoursever.com/current/public;

  # serve static content directly
  location ~* \\.(ico|jpg|gif|png|css|js|swf|html)$ {
    if (-f $request_filename) {
      expires max;
      break;
    }
  }

  location ~ /\\.ht {
    deny  all;
  }
}
```

Lastly, create a symbolic link between site-available and sites-enabled for the virtual host we just created. We'll also restart Nginx.

```nohighlight
ln -s /opt/nginx/conf/sites-available/robbyk.com /opt/nginx/conf/sites-enabled/robbyk.com
service nginx restart
```

Great! At this point we pretty much have a Rails production sever set up! The only thing left is to deploy an application! You can read my guide Capistrano Deployment.

### Updates

**12-18-14** - Tutorial has been updated for the latest version of Phusion Passenger (4.0.55)
**2-24-16** - Tutorial has been updated to use a startup script from Linode