---
layout: post
title:  "SVG+CSS Icon Buttons with PNG Fallbacks"
date:   2014-12-21 12:00:00 -0800
permalink: /:categories/svg-css-icon-button-png-fallback
categories: posts
image: /images/posts/generic-front-end/featured.jpg
thumb:  /images/posts/generic-front-end/featured-thumb.jpg
class: front-end
excerpt: Learn to create icon buttons using base64 encoded svg's with png fallbacks. 
---

Icons make everything look cooler, there's some magical component to them that can really bring out a website. Visuals aside, using icons offer some great UX benefits as well, in many cases the user spots the icon before the word it represents. With the rising use/support of SVG we no longer have to worry about our icons looking choppy on a "retina screen". Today I want to take you though the process of creating SVG+CSS icon buttons, with PNG fallbacks.

Let's take a look at what we'll be creating today. You can view these demos in action at the bottom of this page, but for future-proofing purposes, here's a screenshot:

![SVG+CSS Icon Buttons](/images/posts/svg-css-buttons/icon-buttons-preview.png)

For this tutorial we'll be using HTML CSS and Javascript. Be sure to download the [Sitechop front-end starter kit](https://github.com/sitechop/front-end-starter-kit) which has all the files and directories set up for you.

### SVG Problems

SVG has two major cons that we'll have to find a solution for:

1. Support isn't all there yet, theres no support below ie9 or on android 2.3.
2. Inline SVG's are not cacheable.

To fix the first problem we'll include a Javascript to test for SVG support. If svg is not supported, or Javascript is disabled, we'll display the PNG. There will be no double loading of the icon.

For the second problem we'll base64 encode our SVG icon. There's around a 30% increase in size, but this will allow our SVG data to be cached in our CSS file. It's worth the 30% since these buttons are displayed many places accross a website. In our case it's a size difference of bytes.

### Getting Started

Let's start by creating our buttons without the icon. Here's the HTML:

{% highlight html %}
<ul class="demolinks">
  <li class="button"><a href="#">View Demo</a></li>
  <li class="button"><a href="#">View on GitHub</a></li>
  <li class="button"><a href="#">View on Codepen</a></li>
</ul>
{% endhighlight %}

I've added a class to our UL so we can plug it in anywhere and not interfere with other style declarations. Let's add some basic CSS styling.

{% highlight css %}
.demolinks a {
  text-decoration: none;
  font-weight: 700;
  font-family: 'Open Sans Condensed', sans-serif;
  color: #157EBF;
  display: block;
  padding: 0.5em 0.75em 0.5em 0.75em;
}

.demolinks a:hover {
  color: #333;
}

.demolinks li {
  display: inline-block;
  background: white;
  border: 1px solid #ccc;
  margin: 0 0.5em 0.5em 0;
}
{% endhighlight %}

Pretty simple, we set `display: inline-block` so our buttons won't stretch across the page. We added a small margin to the right and bottom of our li. We also added padding to our `<a>` tags, and set a background/border color. Now that we have our basic styling, let's add some CSS3 flash.

{% highlight css %}
.demolinks li {
  display: inline-block;
  background: white;
  border: 1px solid #ccc;
  margin: 0 0.5em 0.5em 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-image: -webkit-linear-gradient(top, #ffffff, #eeeeee); 
  background-image:    -moz-linear-gradient(top, #ffffff, #eeeeee); 
  background-image:     -ms-linear-gradient(top, #ffffff, #eeeeee); 
  background-image:      -o-linear-gradient(top, #ffffff, #eeeeee); 
  background-image:         linear-gradient(top, #ffffff, #eeeeee);
}

.demolinks li:hover {
  background-image: -webkit-linear-gradient(top, #eeeeee, #ffffff); 
  background-image:    -moz-linear-gradient(top, #eeeeee, #ffffff); 
  background-image:     -ms-linear-gradient(top, #eeeeee, #ffffff); 
  background-image:      -o-linear-gradient(top, #eeeeee, #ffffff); 
  background-image:         linear-gradient(top, #eeeeee, #ffffff);
}
{% endhighlight %}

Here we added CSS3 gradients and a 3px border radius. We can also include support for older versions of Internet Explorer using MS-filter.

{% highlight css %}
.demolinks li {
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#eeeeee',GradientType=0 );
}

.demolinks li:hover {
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#ffffff',GradientType=0 );
}
{% endhighlight %}

Here we added CSS3 gradients and a 3px border radius. We also included the MS-filter for IE 8-9 support.

### Icon Creation In Illustrator

To create the icons needed, I just used [Font Awesome](http://fontawesome.io/), and Illustrator to create SVG/PNG's. Why not use the font awesome web-font you ask? Two reasons:

1.  Performance, font awesome is massive in size (a difference of over 50k's in my case).
2.  Icon fonts render horrible on windows. I like everything crisp on all platforms.

So anyway, let's create these icons. Open up a fresh document in illustrator, size doesn't matter, but set preview mode to PX so we have a better idea how the PNG's will look.

**Note:** If you don't have Illustrator I've included the all the images in the starter kit.

![new illustrator document](/images/posts/svg-css-buttons/new-document.png)

Set your color to `#333333` and grab the text tool with font awesome. Type the icon you need. Font-size 20pt, seems about right.

![font awesome icon typing](/images/posts/svg-css-buttons/icon-type.png)

Right-click create outlines.

![Illustrator create outlines](/images/posts/svg-css-buttons/create-outlines.png)

Now go to object > artboards > fit artwork to bounds.

![Illustrator fit artwork to bounds](/images/posts/svg-css-buttons/fit-artwork-to-bounds.png)

There we go, our first icon. Save it as an PNG, and as an SVG with decimal places set to 1.

![Illustrator svg save](/images/posts/svg-css-buttons/save-svg.png) 

**Note:** Inspect your images, PNG's can only be in increments of a whole PXs, sometimes you'll have to round your art board up to the nearest PX to avoid edge chopping. In our case it works out fine.

Repeat this process for all the icons you need. Now let's incorporate them into our button.

### The Javascript SVG Test

Now that we have our SVG and PNG icons, we'll need to incorporate a fallback method. To do this we're going to need a Javascript SVG test. The insanely popular choice is Modenizr, but that's kind of large for a simple SVG test. Here's a light weight alternative SVG test I found [here](http://toddmotto.com/mastering-svg-use-for-a-retina-web-fallbacks-with-png-script/). Add it to your scripts file:

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

This will test if SVG is supported, and append a class to `<html>`, either svg or no-svg. Cool. Now let's add our icons to the buttons.

### Icon HTML/CSS

To have a unique icon on each button, we'll need to add a unique class on each of our `<a>` tags.

{% highlight html %}
<ul class="demolinks">
  <li class="button"><a class="demo" href="#">View Demo</a></li>
  <li class="button"><a class="github" href="#">View on GitHub</a></li>
  <li class="button"><a class="codepen" href="#">View on Codepen</a></li>
</ul>
{% endhighlight %}

Now let's create some room for our icon. We'll overwrite our default `<a>` styles with more specific selectors, so if we want a plain text button it doesn't create problems. We also add `background-repeat: no-repeat` and some background positioning.

{% highlight css %}
a.demo, a.github, a.codepen {
  padding: 0.5em 0.75em 0.5em 2.25em;
  background-repeat: no-repeat;
  background-position: 0.45em center;
}
{% endhighlight %}

Now we have some room for our icons to fit, let's create base64 encoded SVG background images. There's a great tool to do this at [b64.io](http://b64.io). Just drag and drop the SVG files we created, and it will output the code. Be sure to add .svg before your class name. Here's how mine looks.

{% highlight css %}
.svg .demo {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyMC40cHgiIGhlaWdodD0iMTUuM3B4IiB2aWV3Qm94PSIwIDAgMjAuNCAxNS4zIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMC40IDE1LjMiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik01LjgsMTMuMWMtMC4xLDAuMS0wLjQsMC4xLTAuNSwwTDAuMSw3LjlDMCw3LjgsMCw3LjUsMC4xLDcuNGw1LjItNS4yYzAuMS0wLjEsMC40LTAuMSwwLjUsMGwwLjYsMC42YzAuMSwwLjEsMC4xLDAuNCwwLDAuNUwyLDcuN0w2LjQsMTJjMC4xLDAuMSwwLjEsMC40LDAsMC41TDUuOCwxMy4xeiBNOC44LDE1Yy0wLjEsMC4yLTAuMywwLjMtMC40LDAuMmwtMC43LTAuMmMtMC4yLTAuMS0wLjMtMC4zLTAuMi0wLjRsNC4yLTE0LjRDMTEuNywwLjEsMTEuOSwwLDEyLDBsMC43LDAuMkMxMi45LDAuMywxMywwLjUsMTMsMC42TDguOCwxNXogTTE1LjEsMTMuMWMtMC4xLDAuMS0wLjQsMC4xLTAuNSwwTDE0LDEyLjZjLTAuMS0wLjEtMC4xLTAuNCwwLTAuNWw0LjQtNC40TDE0LDMuM2MtMC4xLTAuMS0wLjEtMC40LDAtMC41bDAuNi0wLjZjMC4xLTAuMSwwLjQtMC4xLDAuNSwwbDUuMiw1LjJjMC4xLDAuMSwwLjEsMC40LDAsMC41TDE1LjEsMTMuMXoiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);
}

.svg .codepen {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0yMCwxM2MwLDAuMy0wLjEsMC42LTAuNCwwLjdsLTkuMSw2LjFDMTAuMywxOS45LDEwLjIsMjAsMTAsMjBzLTAuMy0wLjEtMC41LTAuMWwtOS4xLTYuMUMwLjEsMTMuNiwwLDEzLjMsMCwxM1Y2LjljMC0wLjMsMC4xLTAuNiwwLjQtMC43bDkuMS02LjFDOS43LDAuMSw5LjgsMCwxMCwwczAuMywwLjEsMC41LDAuMWw5LjEsNi4xQzE5LjgsNi40LDIwLDYuNywyMCw2LjlWMTN6IE0zLjksMTBMMS43LDguNnYyLjlMMy45LDEweiBNOS4xLDYuNXYtNEwyLjQsNi45bDMsMkw5LjEsNi41eiBNOS4xLDE3LjV2LTRMNS40LDExbC0zLDJMOS4xLDE3LjV6IE0xMywxMGwtMy0ybC0zLDJsMywyTDEzLDEweiBNMTcuNiw2LjlsLTYuNy00LjV2NEwxNC42LDlMMTcuNiw2Ljl6IE0xNy42LDEzbC0zLTJsLTMuNywyLjV2NEwxNy42LDEzeiBNMTguMywxMS40VjguNkwxNi4xLDEwTDE4LjMsMTEuNHoiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);
}

.svg .github {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxOC42cHgiIGhlaWdodD0iMTUuN3B4IiB2aWV3Qm94PSIwIDAgMTguNiAxNS43IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxOC42IDE1LjciIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0xNy45LDEyLjRjLTEuNSwzLTUuNSwzLjMtOC40LDMuM2MtMi45LDAtNy4yLTAuMy04LjgtMy4zQzAuMSwxMS4zLDAsMTAsMCw4LjdjMC0xLjYsMC40LTMuMiwxLjUtNC40QzEuMywzLjcsMS4yLDMuMSwxLjIsMi40YzAtMC44LDAuMi0xLjcsMC42LTIuNEMzLjUsMCw0LjcsMC44LDYsMS44YzEuMS0wLjMsMi4zLTAuNCwzLjQtMC40YzEsMCwyLjEsMC4xLDMuMSwwLjRDMTMuOSwwLjcsMTUsMCwxNi44LDBjMC40LDAuOCwwLjYsMS42LDAuNiwyLjRjMCwwLjYtMC4xLDEuMy0wLjMsMS45YzEuMSwxLjMsMS41LDIuOCwxLjUsNC40QzE4LjYsMTAsMTguNCwxMS4zLDE3LjksMTIuNHogTTEzLjIsNy41Yy0wLjcsMC0xLjQsMC4xLTIuMiwwLjJjLTAuNiwwLjEtMS4yLDAuMS0xLjgsMC4xcy0xLjIsMC0xLjgtMC4xQzYuOCw3LjYsNi4xLDcuNSw1LjQsNy41Yy0xLjgsMC0yLjksMS41LTIuOSwzLjJjMCwzLjQsMy4xLDMuOSw1LjgsMy45aDEuOWMyLjcsMCw1LjgtMC41LDUuOC0zLjlDMTYuMSw5LDE1LDcuNSwxMy4yLDcuNXogTTUuNywxMi44Yy0xLDAtMS40LTEuMy0xLjQtMi4xczAuNC0yLjEsMS40LTIuMXMxLjQsMS4zLDEuNCwyLjFTNi43LDEyLjgsNS43LDEyLjh6IE0xMi44LDEyLjhjLTEsMC0xLjQtMS4zLTEuNC0yLjFzMC40LTIuMSwxLjQtMi4xczEuNCwxLjMsMS40LDIuMVMxMy45LDEyLjgsMTIuOCwxMi44eiIvPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=);
}
{% endhighlight %}

Lets add our PNG fallbacks. Create the same selectors with the .no-svg class name this time:

{% highlight css %}
.no-svg .demo {
  background-image: url('images/demo.png');
}

.no-svg .github {
  background-image: url('images/github.png');
}

.no-svg .codepen {
  background-image: url('images/codepen.png');
}
{% endhighlight %}

Now open your nojs.css file and paste the same code without the .no-svg prefix. Why do we do this in a second CSS file wrapped in `<noscript>` tags you ask? Performance, if we set it in our main CSS file everyone would be loading two images. By doing it separate, Users will only load the image specific to their case. For example, JS-disabled user will ignore the rest since our JS test wont add .svg or .no-svg for them.

{% highlight css %}
a.demo {
  background-image: url('images/demo.png');
}

a.github {
  background-image: url('images/github.png');
}

a.codepen {
  background-image: url('images/codepen.png');
}
{% endhighlight %}

That about sums it up, I'm sure you're aware you can set the buttons/icons to be any colors you want. Hope you enjoyed this tutorial, checkout the demos below.