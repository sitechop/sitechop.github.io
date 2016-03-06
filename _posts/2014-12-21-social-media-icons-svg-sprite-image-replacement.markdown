---
layout: post
title:  "Social Media Icons using an SVG Sprite"
date:   2014-12-21 12:00:00 -0800
permalink: /:categories/social-media-icons-svg-sprite
categories: posts
image: /images/posts/generic-front-end/featured.jpg
thumb:  /images/posts/generic-front-end/featured-thumb.jpg
class: front-end
excerpt: Learn to add semantic social media icons to your website using an svg sprite and image replacement
---

Nearly every modern website has social media icons on their page. It's a great and stylish why to cross link and hold everything together. There are ton's of bad methods to add these icons to your page though. Today I offer you a clean and semantic way to add social media icons to your website using a SVG sprite sheet and image replacement. A PNG fall back and IE6+ support is included as well.

### Prerequisites

Before we get started, you'll need two things. You'll need the sitechop [front-end start kit](https://github.com/sitechop/front-end-starter-kit), which includes all the files and directories we'll need, and second you'll need a vector social media icon pack. There are tons of differently styled vector social media icons available online, a quick Google search should aid you. If you want to use the same icons as me, you can download the sitechop [vector social media icon pack](/resources/social_media_svg_sprite_sheet.svg).

### Creating The Sprite

To keep it simple, a sprite is basically a bunch of images on one canvas. With sprites, we can include all our icons/images in one request, it also makes for a smaller file size.

For this tutorial we'll need two versions of our sprite sheet: An SVG version for modern browsers, and a PNG version for the oldies. Start by opening up you vector icons in Illustrator.

![social media icons illustrator](/images/posts/svg-sprite-social-icons/icons-illustrator.png)

If necessary, resize the icons to fit your needs. In my case I'm using 32x32 pixel circle icons. Calculate the size canvas you'll need to fit all your icons snug. In my case I have 6 icons.

```nohighlight
32 * 6 = 192 pixels
```

So now we'll create a new document exactly 192x32 pixels in size.

![new document illustrator](/images/posts/svg-sprite-social-icons/new-document.png)

Copy and paste all your social media icons to this document, and arrange them to fit. They should all be equal in size and have no spacing in between. My preview mode is set to PX, so I can get a better idea of how the png will look, don't worry our SVG version will still be vector.

![social media icons sprite](/images/posts/svg-sprite-social-icons/sprite-sheet.png)

Once finished, save the image as an SVG and as a PNG.

![social media icons illustrator svg](/images/posts/svg-sprite-social-icons/svg.png)

![social media icons illustrator png](/images/posts/svg-sprite-social-icons/png.png)

### The HTML

Now that we have our images prepared, let's write our HTML markup. We'll be using an unordered list for the job. We add an ID to avoid interference with other `<ul>`'s on a page. We also add an ID to each one of our `<a>` tags, this will allow us to target them individually.

{% highlight html %}
<ul id="social">
  <li><a id="youtube" href="#">Youtube</a></li>
  <li><a id="behance" href="#">Behance</a></li>
  <li><a id="vine" href="#">Vine</a></li>
  <li><a id="dribbble" href="#">Dribbble</a></li>
  <li><a id="facebook" href="#">Facebook</a></li>
  <li><a id="rss" href="#">RSS</a></li>
</ul>
{% endhighlight %}

### Javasript SVG Test

We'll be using [Todd Motto's SVG test](http://toddmotto.com/mastering-svg-use-for-a-retina-web-fallbacks-with-png-script/) to see if our user supports SVG. Copy and paste the following code into your `scripts.js` file.

{% highlight javascript %}
function supportsSVG() {
  return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;  
}

if (supportsSVG()) {
  document.documentElement.className += ' svg';
} else {
  document.documentElement.className += ' no-svg';
  var imgs = document.getElementsByTagName('img');
  var dotSVG = /.*\\.svg$/;
  for (var i = 0; i != imgs.length; ++i) {
    if(imgs[i].src.match(dotSVG)) {
      imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
    }
  }
}
{% endhighlight %}

This code will run an SVG test and apply a class to `<html>` accordingly, either `svg` or `no-svg`.

### Base-64 Encode our SVG Sprite

We'll also be using a base64 encoded version of our SVG sprite. This will make our SVG cachable (it'll be part of our CSS), and will allow use to avoid an extra request. Head over to [B64.io](http://b64.io) and run your SVG through it. Save the code for later reference.

![social media icons svg base64 encode](/images/posts/svg-sprite-social-icons/base64.png)

### The CSS

Now all we gotta do is style this monster. Let's start by changing our `<li>`'s to display as inline-block. We also set our `<a>`'s display to block.

{% highlight css %}
#social li {
  display: inline-block;
}

#social a {
  display: block;
}
{% endhighlight %}

Set the width and height of your `<a>`'s to the precise size of your individual icons. In my case it's 32x32 pixels, but we don't want to use pixels. We want our icons to grow if a user has a higher DPI/PPI setting, so convert your PX's to EM's. We'll also set our sprites as the `background-image` for both SVG and No-SVG users.

{% highlight css %}
#social a {
  display: block;
  width: 2em;
  height: 2em;
}

.svg #social a {
  background-image: 
}

.no-svg #social a {
  background-image: url('images/social.png');
}
{% endhighlight %}

Open your nojs.css file and set the PNG sprite as the background-image. We use the PNG version, since we won't be able to tell if they support SVG (since the test requires JavaScript).

{% highlight css %}
#social a {
  background-image: url('images/social.png');
}
{% endhighlight %}

Add your image replacement technique of choice to your a tag. I'm just using a basic one found here.

{% highlight css %}
#social a {
  display: block;
  width: 2em;
  height: 2em;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}
{% endhighlight %}

At this point your code should render out something like this:

![social media icons css check](/images/posts/svg-sprite-social-icons/check-point.png)

Now let's work some Sprite magic. To display the correct icon for each a we need to shift our background image to the correct location. Remember, our icons are placed horizontally 2em's apart. Our first icon is already in place, so we'll start with the second. Our first shift will be 2em to the left, the second 4em, the third 6em, and so on an so forth. On the fifth and sixth icons I start shifting to the right, just keep measurements low.

{% highlight css %}
#behance {
  background-position: -2em 0;
}

#vine {
  background-position: -4em 0;
}

#dribbble {
  background-position: -6em 0;
}

#facebook {
  background-position: 4em 0;
}

#rss {
  background-position: 2em 0;
}
{% endhighlight %}

Should be looking pretty good at this point, now that all of our icons are in place. They're a little close together though, let's add some small margins.

{% highlight css %}
#social a {
  display: block;
  width: 2em;
  height: 2em;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin: 0.15em;
}
{% endhighlight %}

There ya have it, some semantic social icon links using a SVG Sprite and image replacement. We even included a PNG fallback for older browsers. The code above will work on IE 8+.

### Adding IE 6-7 support

If you want to add IE 6-7 support for your icons you can simply replace inline-block with block, and set it to float left.

{% highlight css %}
#social li {
  display: block;
  float: left;
}
{% endhighlight %}