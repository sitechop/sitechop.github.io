---
layout: post
title:  "Installing Image Magick 6.9.0 on Ubuntu 14.04"
date:   2015-07-30 12:00:00 -0800
permalink: /:categories/installing-image-magick-ubuntu
categories: posts
image: /images/posts/installing-image-magick/featured.jpg
thumb:  /images/posts/installing-image-magick/featured-thumb.jpg
class: ubuntu
excerpt: Learn how to install Image Magick 6.9.0 on Ubuntu 14.04.
---

Image Magick is an image editing suite that allows you to edit and manipulate all kinds of images from the command line. This can be extremely handy for applications that allow image uploads. I had a hard time finding current install instructions online and ran into several problems along the way. Today I’m going to take you through the Image Magick 6.9.0 installation process on an Ubuntu 14.04 box.

### Step 1: Update Package Lists

To start you’ll want to update your package lists so you’re downloading the newest versions of dependencies. To do this run the standard apt-get command below.

```nohighlight
sudo apt-get update
```

### Step 2: Install Dependencies

Next there’s a handful of Image Magick dependencies that we’ll need. You can meet them all by running the following two commands:

```nohighlight
sudo apt-get install build-essential checkinstall libx11-dev libxext-dev zlib1g-dev libpng12-dev libjpeg-dev libfreetype6-dev libxml2-dev
sudo apt-get build-dep imagemagick
```

### Step 3: Download Image Magick

Next you’ll want to download the latest version of Image Magick through terminal. Before we can do this we need to retrieve the download url. Head over to the [Image Magick downloads page](http://www.imagemagick.org/download/) and copy the link to the latest tar.gz version. It will look like the photo below.

[![](/images/posts/installing-image-magick/download_thumb.png)](/images/posts/installing-image-magick/download.png)

Now that you have the url, navigate to your temporary folder and download it using wget.

```nohighlight
cd /tmp
wget http://www.imagemagick.org/download/ImageMagick-6.9.0-4.tar.gz
```

### Step 4: Extract the contents

Extract the archive’s contents and navigate within the newly created folder. To do this run the following commands:

```nohighlight
tar -xzvf ImageMagick-6.9.0-4.tar.gz
cd ImageMagick-6.9.0-4
```

### Step 5: Run the configure script

Now we need to run the configure script to prepare everything for installation. Do so with the following command:

```nohighlight
sudo ./configure
```

### Step 6: Install Image Magick

At this point we’re ready to install Image Magick. During the installation it will ask you a few configuration questions, I just pressed enter through them to leave everything default. This one will take several minutes so be patient.

```nohighlight
sudo checkinstall
```

### Step 7: Run ldconfig

Lastly we need to run the ldconfig command so that our newly installed package will be found and work. Do so by running the following command:

```nohighlight
sudo ldconfig /usr/local/lib
```

### Step 8: Verify Installation

Everything should be working at this point, but to make sure lets try it out. You can resize an image by running the command below.

```nohighlight
convert input.jpg -resize '70x70^' -gravity center -crop '70x70+0+0' output.jpg
```

If the command goes through (and works), than Image Magick is installed and working. Have fun!