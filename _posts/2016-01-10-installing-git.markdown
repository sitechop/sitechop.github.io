---
layout: post
title:  Installing Git From Source
date:   2016-01-13 12:00:00 -0800
permalink: /:categories/installing-git-source-ubuntu
categories: posts
image: /images/posts/installing-git/featured.jpg
thumb: /images/posts/installing-git/featured-thumb.jpg
class: ubuntu
excerpt: Learn how to install the latest version of git from source on Ubuntu 14.04.
---

Installing Git and Creating a Repo on Ubuntu

I'm very sad I was so late to hop aboard the Git train, because it's really awesome and a great piece to my work flow. GitHub is pretty cool too, but those private repositories can get expensive real quick. Today I'll show you how to set up a private git server on your Ubuntu server.

### Briefing

This tutorial assumes you have a super user account / access to root, as well as a basic configuration of your sever done. If haven't done so already there is an awesome tutorial on [Linode](https://www.linode.com/docs/getting-started).

Here's an overview of what we'll be doing today.

1. We'll install Git version control
2. We'll create a Git user on our Ubuntu system
3. We'll create a folder specifically for git repositories
4. We'll create an empty repository
5. We'll push our local code to this new repository

### Installing Git

Let's jump right into it, we can install git from source by running the following commands.

```nohighlight
sudo -i
apt-get update
apt-get install build-essential libssl-dev libcurl4-gnutls-dev libexpat1-dev gettext unzip
cd /tmp
wget https://github.com/git/git/archive/v2.7.2.zip
unzip v2.7.2.zip
cd git-2.7.2
make prefix=/usr/local all
make prefix=/usr/local install
git
```

If everything is installed properly the git command we ran will return a list of common git commands.

### Creating a Git user

It's best practice to create a separate user with limited permissions to commit with, so let's do that now. We'll also set up a directory to host all our repositories.

```nohighlight
adduser git
```

Ubuntu will ask you for a password, enter a secure one. It will also ask you for a bunch of contact information, you can just leave that part blank. Now let's upload our public ssh key so we can connect.

If you don't have a set of SSH keys on your system, you can follow my guide on generating them [here](/general/ssh-keys-windows-osx-ubuntu).

```nohighlight
cd /home/git
mkdir .ssh
nano .ssh/authorized_keys
```

Paste your public key in this file, save and exit. Now run the following commands to change ownership of the directory and set permissions.

```nohighlight
chown -R git:git .ssh
chmod 700 .ssh
chmod 600 .ssh/authorized_keys
```

Now we'll create a directory to host our repositories.

```nohighlight
cd /var
mkdir git
chown -R git:git git
logout # Of Root
logout # From Server
```

### Creating a repository and pushing our code

Now that we have Git installed on our Ubuntu server, let's create a repository for us to push our code to. We'll want to do this from the git account we created, so make sure you log into it.

```nohighlight
ssh git@yoursever.com
cd /var/git
git init --bare yourproject.git # Creates an empty repository
logout
```

That was painless right? Now let's connect our local repository to it. Navigate to the root of your local code and run the following command:

```nohighlight
git remote set-url origin git@yoursever.com:/var/git/yourproject.git
```

**Note:** If your project does not already have a git repository, Install git locally and run the commands below instead.

```nohighlight
git init
git add .
git commit -m "Initial commit"
git remote add origin git@yourserver.com:/var/git/yourproject.git
```

Finally let's push our code to our newly created remote git repository.

```nohighlight
git push origin master
```

If all was successful your code should be uploaded and you'll see something like this.

```nohighlight
Counting objects: 63, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (52/52), done.
Writing objects: 100% (63/63), 15.99 KiB | 0 bytes/s, done.
Total 63 (delta 2), reused 0 (delta 0)
To git@robbyk.com:/var/git/yourproject.git
 * [new branch]      master -> master
```

### Updates

- **12-18-14** - Tutorial has been updated for Git version 2.2.0.
- **03-15-15** - Tutorial has been updated for Git version 2.3.3.
- **02-13-16** - Tutorial has been updated for Git version 2.7.2.