---
layout: post
title:  "Migrating to Ubuntu as a Designer and Developer"
date:   2014-12-14 12:00:00 -0800
permalink: /:categories/migrating-ubuntu-designer-developer
categories: posts
image: /images/posts/migrating-ubuntu/featured.jpg
thumb:  /images/posts/migrating-ubuntu/featured-thumb.jpg
class: ubuntu
excerpt: Helpful softwares and thoughts for designers and developers migrating Ubuntu.
---

Migrating to Ubuntu as a Web Designer and Developer

Originally a Windows and OSX user, I made the jump to Ubuntu Linux early this year. After a brief adjustment period, I must say I've grown to love it. The stability and UNIXiness (yeah, made that word up) of OSX and the flexibility of Windows make for the perfect combination of awesomeness. Today I want to do two things. Tell you why I made the migration to Ubuntu Linux as a web designer/developer, and give you a overview of all the different softwares I use on a daily basis.

### Why I Like Ubuntu Better

It took me a little while to start loving Ubuntu, but now I can never switch back, there are many benefits over my old windows environment. Here's some of them:

#### The interface

The interface is great. It's like a mix between mac and windows. The “start/launch menu” on left was a little weird at first but you get used to it.

[![Ubuntu desktop interface](/images/posts/migrating-ubuntu/interface.png)](/images/posts/migrating-ubuntu/interface-large.png)

#### Font rendering

I know this shouldn't matter to much, but fonts render great on Ubuntu. No more of that choppy ugly windows cleartype rendering. I'd go as far to say it renders them nicer than Mac OSX.

#### Web Development Tools

Everything I use to develop websites is built to run well Linux severs,  so in turn they run great on Ubuntu desktop. Everything is much more simpler to get going when compared with Windows.

#### Terminal

This one only applies to people coming from windows but shell scripting is so much nicer than batch scripting.

#### Open SSH

One of the most annoying things on windows is SSH. Open SSH sure as hell beats PuTTY or whatever I was using on windows.

#### Automatic Updates

It's nice having Ubuntu update all my third party software for me. No more updating everything individually, as I did on Windows.

[![Ubuntu updator](/images/posts/migrating-ubuntu/updater.png)](/images/posts/migrating-ubuntu/updater-large.png)

#### Directory Structure

Very similar to Mac OSX, the filing system and directory structure is a lot better than windows systems. They say you don't have to worry about defraging your hard drive as well.

### Should you make the jump to Ubuntu?

Before we go any further, I should probably tell you a couple of things. **Certain things aren't as simple on Ubuntu.**

Ubuntu is not as user friendly as Windows/OSX. Not everything has a graphical user interface. If you plan to switch, **you'll need to get comfortable using the command line.** Ubuntu is pretty good about supporting hardware, but chances are you'll have to search for solutions to random hardware issues as well. Thankfully there's a great support community out there, and it shouldn't be too hard to get set up.

If your primarily a designer I wouldn't recommend making the jump to Ubuntu. Adobe products do not have support for Linux operating systems, it would just make things more of a hassle. Ubuntu/Linux users are forced to either virtualize a windows system or run software through Wine (which offers minimal support).

#### Mac/OSX Users

Whether a designer and/or developer, If you're currently running Mac OSX, I'd opt out of switching to Ubuntu. This post is really geared toward Windows users who can't always afford pricey apple products. OSX is very similar to debian-based systems and offers a lot of the same tools, along with the user-friendliness side of Windows systems.

#### Windows Users

For windows users I would definitely say yes. Let's be honest if your a web developer, windows makes everything way harder to run smoothly. I can't even quantify the time I've spent trying to fix windows-specific problems.

### Software and Technologies I Use

Most of the general software I use on a daily basis is available on Ubuntu. This includes things like chat clients, email clients, browsers, FTP clients, etc. If it's not, better believe there's another great alternative available.

**Adobe products do not support Ubuntu.** Graphic design software is the only thing tying me to Windows/OSX. Since I'm only designing a fraction of the time, I've found virtualization to be a great solution.  I run a virtualized instance of windows XP (which is the minimum for Adobe CS6), and found my system can handle it perfectly.

Web development is awesome on Ubuntu. Since the majority of web servers out their run Linux, most technologies are built to work great on them. Installing things like programming languages, web servers, and databases is so much easier, and they all run together great. No more of that mamp/xampp stuff.

![web development ubuntu software](/images/posts/migrating-ubuntu/webdevelopment.png)

#### Apache Web Server

Django and Rails comes with a server to develop on, but for Wordpress I needed to set one up. To do this I simply installed apache web sever through apt-get. On production severs I run nginx, but apache is much easier to configure so why not use it for local development.

```nohighlight
sudo apt-get install apache2
```

#### MySQL Database

Most web applications need some sort of database. I always use MySQL, since I'm familar with it the most. This can also easily be installed though apt-get.

```nohighlight
sudo apt-get install mysql-server php5-mysql
sudo mysql_install_db
sudo mysql_secure_installation
```

#### Python

Python comes pre-installed on Ubuntu, so if you like to use Django to create web apps you don't have to worry about this.

#### PIP Package Manager

Similar to rubygems, PIP is used to install python “addons”. To install PIP simply download the python file from https://bootstrap.pypa.io/get-pip.py and run the command below:

```nohighlight
python get-pip.py
```

#### Virtualenv

This softwares good if you want to keep your django/python applications isolated from globally installed packages. You can install it through PIP.

```nohighlight
sudo pip install virtualenv
```

#### Ruby

I use rails (which runs on ruby) quite frequently, so I installed Ruby from source as the apt-get version is way out of date. I wrote a tutorial on this, you can view it [here](/posts/installing-rails-mysql-ubuntu).

#### Rails

Rails runs on top the Ruby language which you'll have to install yourself. You can install an outdated version using apt-get or install it from source, like I've done. If you work on multiple versions of ruby, ruby version manager run great on Ubuntu.

```nohighlight
gem install rails
```

#### NodeJS

I only install this for the Javascript Runtime, if you plan on developing web applications using it, I recommend installing it from source. For my needs I simply ran:

```nohighlight
sudo apt-get install nodejs
```

#### PHP

I use Wordpress every now and then which requires the PHP language. PHP can easily be installed using apt-get.

```nohighlight
sudo apt-get install php5 libapache2-mod-php5 php5-mcrypt
```

#### PHPmyadmin

This is a great tool for managing MySQL databases. You can install it by running the code below.

```nohighlight
sudo apt-get install phpmyadmin
sudo php5enmod mcrypt
```

If you don't have PHP installed on your system there are other alternatives, just do some research.

#### Git Version Control

I'm growing to love git more and more. I'm even starting to use it for deployment more and more as time goes by. The apt-get version is super old on this one too, I recommend installing it from source. You can read my guide [here](/posts/installing-git-source-ubuntu).

![general ubuntu software](/images/posts/migrating-ubuntu/general.png)

#### Sublime Text (text editor)

My text editor of choice, thankfully it's available on all sorts of platforms. You can install sublime text 3 by running the following commands:

```nohighlight
sudo add-apt-repository ppa:webupd8team/sublime-text-3
sudo apt-get update
sudo apt-get install sublime-text-installer
```

#### Firezilla (FTP client)

I'm rarely found using an FTP client these days, but its nice to have one for those times I am. I installed this one using the Ubuntu Software Center which comes preinstalled on your system.

#### Virtual Box (system virtualization)

This ones very important. I run a virtual installation of Windows XP. Though XP I run Adobe Photoshop/Illustrator CS6 for design, along with numerous old browsers for website testing.

```nohighlight
sudo apt-get install virtualbox
```

#### Firefox (web browser)

Not my browser of choice, but comes in handy for testing websites. This comes preinstalled on Ubuntu.

#### Chrome (web browser)

Chrome is the browser I use all the time. To install this I just downloaded the installer from the chrome website and ran it.

#### Opera (web browser)

Another web browser installed souly for website testing purposes. I just downloaded the installer from the website on this one too.

#### Skype (chat client)

I use skype all the time to communicate with people. The Linux version is no-where near as good as the windows/osx one, but its getting better and better. I wouldn't use the Ubuntu Software Center for this, I ran into numerous problems that way.

```nohighlight
sudo add-apt-repository "deb http://archive.canonical.com/ $(lsb_release -sc) partner"
sudo apt-get update 
sudo apt-get install skype
```

#### Pidgen Instant Messenger

I sometimes use instant messengers other than skype. Many are unavailable for Ubuntu (and Linux in general). I found Pidgen to be a great client.

```nohighlight
sudo add-apt-repository -y ppa:pidgin-developers/ppa
sudo apt-get update
sudo apt-get install pidgin
```

#### VideoLAN (VLC) (media player)

A great media player I've always used on windows/osx. This will play just about anything:

```nohighlight
sudo add-apt-repository ppa:videolan/stable-daily
sudo apt-get update
sudo apt-get install vlc
```

#### Keepass2 (password managment)

Here's a great password manager. It's windows software but has been ported to every OS imaginable. Install it on Ubuntu by running the command below.

```nohighlight
sudo apt-add-repository ppa:jtaylor/keepass
sudo apt-get update
sudo apt-get install keepass2
```

#### Transmission (BitTorrent client)

Transmissions is a great bittorrent client that is available on Mac OSX and linux systems. It comes pre-installed on Ubuntu and I use it all the time.

#### Thunderbird

To be honest I usually just go to gmail.com, but thunderbird comes preinstalled on Ubuntu. It's a nice email client if you need one.

#### Libre Office

Libre office is created by Mozilla, its a great alternative to Microsoft Office, which isn't available on Ubuntu/linux. It comes preinstalled on Ubuntu.

### Updates

**November 13, 2014:** Added Pidgen Instant Messenger to software and technologies