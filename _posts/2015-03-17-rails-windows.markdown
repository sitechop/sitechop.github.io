---
layout: post
title:  "Rails Development Environment on Windows 8.1"
date:   2015-03-17 12:00:00 -0800
permalink: /:categories/installing-rails-mysql-windows-8
categories: posts
image: /images/posts/installing-rails/featured.jpg
thumb:  /images/posts/installing-rails/featured-thumb.jpg
class: windows
excerpt: Learn how to get Rails 4 with MySQL running on a windows 8.1 machine.
---

I was recently setting up a Ruby on Rails development environment on Windows 8.1 and it was definitely a pain in the ass to get going. As per everything involving web development on windows, there’s a slew of windows-specific errors/problems to get past before you have a healthy environment. A few months ago I wrote the Rails on Ubuntu tutorial, and today I'll take you through the process on windows.

### What we're installing today

There's a few softwares we'll be installing today in order to get our rails development environment going on windows 8.1. We'll need:

- Ruby 2.1.5
- Ruby Devkit
- Rails 4.1.8
- MySQL Server
- A MySQL Connector
- The MySQL2 Gem

### Installing Ruby 2.1.5 on Windows 8.1

The first software you'll want to install is latest version of the Ruby Programming Language (2.1.5). This is the easiest part, luckily there's a simple installer we can download to do all the work for us. Head over to the  RubyInstaller.org  [downloads page](http://rubyinstaller.org/downloads/) and download the Ruby 2.1.5 installer. **Don't download the 64 bit version, I ran into all kinds of problems trying to connect it with Rails and MySQL.**

[![ruby installer screenshot](/images/posts/rails-windows/ruby_installer_thumb.png)](/images/posts/rails-windows/ruby_installer.png)

Once downloaded simply run through the installer as you would with anything else. Make sure you tick the box to add Ruby to your PATH. This will allow us to run Ruby commands from the regular CMD prompt. If you don't you'll have to use the CMD with Ruby prompt that comes with the package.

[![add ruby to path](/images/posts/rails-windows/ruby_path_thumb.png)](/images/posts/rails-windows/ruby_path.png)

Once the installer completes Ruby should be running on your system! To test the installation open up CMD and type `ruby -v`. It should return the version of Ruby you just installed.

### Installing Ruby Devkit on Windows 8.1

Now that we've got Ruby 2.1.5 running on our windows machine we'll want to install the Devkit package that's also available on RubyInstaller.org. Download the package that corresponds to your Ruby installation.

![Ruby Devkit](/images/posts/rails-windows/devkit.png)

Once the download completes, open the installer. It will ask you where you want to extract the contents, and the answer is in your ruby directory. You'll find the directory at `C:\uby*`.

![Ruby Devkit Extract](/images/posts/rails-windows/devkit_extract.png)

Now that the Ruby Devkit contents are extracted to the proper location we need to initialize and install them. We do this in the command prompt, so open a CMD window.

In CMD navigate to the Ruby Devkit, we'll run a couple of commands here. All the commands are shown below.

```
cd /
cd Ruby
cd devkit
ruby dk.rb init
ruby dk.rb install
```

If all goes we'll you should receive some success output after both the initialize and install commands. Cool, looks like we have Devkit going.

### Installing Rails 4.1.8 on Windows 8.1

At this point we've got Ruby 2.1.5 with the Devkit package installed on our system. Let's verify that everything's working by installing Ruby on Rails. In the command prompt run the following command to install Ruby on Rails gem.

```
gem install rails --no-ri --no-rdoc
```

**If the command returns an error regarding SSL certificates please see the fix at the bottom of this section.**

This will install the latest stable version of Ruby on Rails, with all its dependencies and no documentation files. This will take a couple minutes. Afterwards you can verify that it's installed by typing `rails -v`.

![Gem install rails](/images/posts/rails-windows/rails_install.png)

I already went through the process on my PC, on your screen you should see a bunch of fetching/success messages after the gem install rails command.

#### Rubygems SSL Certificate Error

When you try to install rails the command prompt might return an error regarding SSL certificates, It looks like this:

[![rubygems ssl certificates error](/images/posts/rails-windows/ssl_verify_thumb.png)](/images/posts/rails-windows/ssl_verify.png)

In order to fix this problem we need to manually download the trust certificate and place it in the appropriate directory. You can download the certificate from [here](https://raw.githubusercontent.com/rubygems/rubygems/master/lib/rubygems/ssl_certs/AddTrustExternalCARoot-2048.pem). The name is not important, but make sure it is saved as a `.pem` file.

Next we need to locate our SSL certificates folder. Open up windows explorer and head to your ruby directory. For me the folder is located at:

```
C:\ruby\\lib\uby\\2.1.0\ubygems\\ssl_certs 
```

Paste the downloaded certificate in the folder. Rerun the rails install command and all should work now!

### Creating a Ruby on Rails test application

Before we complicate things more by adding MySQL to the mix let's create a quick test app to verify that our system can run rails with the default SQLite database.

In the command prompt navigate to your desktop (or an easily accessible folder) and run the following command to create a rails application.

```
rails new testing
```

[![rails new testapp](/images/posts/rails-windows/rails_test_app_thumb.png)](/images/posts/rails-windows/rails_test_app.png)

Next navigate within the testing folder and run the rails server.

```
cd testing
rails s
```

It will take 20-30 seconds for it to start up. Once it does point your browser to [localhost:3000](http://localhost:3000) and you should see the Rails Welcome Aboard message. We'll take this as confirmation that everything is working.

[![Welcome aboard rails!](/images/posts/rails-windows/welcome_aboard_thumb.png)](/images/posts/rails-windows/welcome_aboard.png)

### Installing MySQL Server on Windows 8.1

At this point we have Ruby on Rails working on Windows 8.1. I suppose these next steps are optional. Follow the stuff below if you want to use Rails with MySQL on your Windows PC.

To start we need to head over to the [MySQL Windows Downloads](http://dev.mysql.com/downloads/windows/installer/) page and grab the latest installer

[![MySQL Server download page](/images/posts/rails-windows/mysql_server_download_thumb.png)](/images/posts/rails-windows/mysql_server_download.png)

Once it's downloaded run the installer. When it asks you what package you want to install click custom (unless you want all the extras). It will take you to a page where you can specify what exactly you want it to install. The only package I select is the MySQL Server 32 bit version. You add packages with the right arrow icon.

[![mysql installer](/images/posts/rails-windows/mysql_installer_thumb.png)](/images/posts/rails-windows/mysql_installer.png)

Once the installer completes, we need to add the MySQL executables to our PATH. This will allow us to access the MySQL commands and prompt right from the normal CMD window. Start by locating the MySQL\\bin folder in windows explorer, copy the directory path. It should be similar to mine which is:

```
C:\\Program Files (x86)\\MySQL\\MySQL Server 5.6\\bin
```

Now right-click the Windows start icon and click on system.

[![windows system settings](/images/posts/rails-windows/system_thumb.png)](/images/posts/rails-windows/system.png)

Inside the system's window, click Advanced System settings. It will open another window.

[![windows advanced system settings](/images/posts/rails-windows/advanced_system_settings_thumb.png)](/images/posts/rails-windows/advanced_system_settings.png)

From this window click Environment Variable..., which is located in the bottom right corner. In this new window, highlight the PATH variable and click the edit button. This will pull up a window where you can edit your users PATH.

[![windows edit path](/images/posts/rails-windows/edit_path_thumb.png)](/images/posts/rails-windows/edit_path.png)

Scroll to the very end of "Variable Value:", type a semi-colon, and paste the path we copied earlier. It should look similar to the screenshot above. Afterwards click OK on all the windows, saving all changes.

To verify that everything is working, open up a new CMD window (so it reconizes the new path we added), and log into the MySQL prompt.

```
mysql -u root -p
```

![mysql prompt](/images/posts/rails-windows/mysql_prompt.png)

If you're able to login to the prompt it's working! You can exit the prompt by typing `quit`. Now the only steps left are to install the connector and the mysql2 gem. So let's get right to it.

### Installing the MySQL C Connector (libmysqlclient) on Windows 8.1

This is the last step, and the most tricky, to get Ruby on Rails working with MySQL on Windows. The Ruby language is written in the C programming language and order for Ruby and MySQL to work nicely together we need to installed the MySQL C connector (libmysqlclient).

Start by heading over to the [MySQL Connectors](http://dev.mysql.com/downloads/connector/c/) download page and download the zip archieve of the C connector. **Make sure you get the 32 bit version zip file, and not the installer.**

Once it's downloaded, extract its contents into `c:\\`.

![mysql c connector extract](/images/posts/rails-windows/connector_extract.png)

Now that the contents are extracted, we need to add the executables to our PATH. This time we'll be adding the lib folder. Go inside the connector directory and find Lib folder, copy it's path. It should be similar to mine:

```
C:\\mysql-connector-c-6.1.5-win32\\lib
```

Now add this directory path to your PATH just as we did for the MySQL bin folder. Remember to add a semicolon between it directory path. Once your finished save all changes and the MySQL C Connector should now be installed and working.

### Installing the MySQL2 gem

We're almost done installing, I promise. The last step is to install the MySQL2 gem using the MySQL connector we just installed. To do this run the CMD below. **Make sure the MySQL connector path matches the location on your local computer.**

```
gem install mysql2 --no-ri --no-rdoc -- --with-mysql-dir=C:\\mysql-connector-c-6.1.5-win32
```

The command should return a success message. It looks like we're all finished, but let's create one more rails test app to verify everything’s working correctly.

### Creating a Ruby on Rails with MySQL Test App on Windows 8.1

So last but no least we're going to create a Ruby on Rails test application that will use a MySQL Database. To do this navigate to an easily accessible location and create a rails application with the following command:

```
rails new mysqltest -d mysql
```

This will create the rails application skeleton. Find the application folder and open config/database.yml . Within this file, add your MySQL root password after "password: " (line 17). Save your changes and exit.

```yaml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password: [root password here]
  host: localhost
```

Jump back to your CMD window and navigate inside the application folder. From here use the rake command to create a database.

```
cd mysqltest
rake db:create
```

If successful this won't return any messages. To verify that its working start the rails server like we did earlier using `rails s`. Point your browser to [localhost:3000](http://localhost:3000), and if you see the Welcome aboard page everything is working!

### Updates

**December 20, 2014** - Added instructions to fix the windows rubygems ssl certificate error. Also included instructions on adding MySQL to your PATH.

**January 5, 2015** - Fixed mistake on the MySQL gem install command (Thanks Haydar).