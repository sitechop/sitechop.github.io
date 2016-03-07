---
layout: post
title:  "Easy Click Article Index"
date:   2015-02-15 12:00:00 -0800
permalink: /:categories/easy-click-article-index
categories: posts
image: /images/posts/generic-front-end/featured.jpg
thumb:  /images/posts/generic-front-end/featured-thumb.jpg
class: front-end
excerpt: Learn to create a trendy article index that comes to life on hover using HTML and CSS.
---

A new trend in the blogosphere is having the entire excerpt block linked to the article. Not only that but the excerpt block comes to life and looks awesome when hovered over. This creates a much better mobile experience compared to clicking post headings or tiny read full buttons (like on here).  We're going to call this “easy-click” style, and today I'll get you started on creating this style of responsive post index.

Before we get started, make sure to download the [Sitechop Front-End Starter Kit](https://github.com/sitechop/front-end-starter-kit), which includes a basic HTML template and CSS reset. Now let's take a look at what we'll be creating today:

[![responsive easy-click post index](/images/posts/easy-click-index/easy-click.png)](/images/posts/easy-click-index/easy-click-full.png)

As you can see we have a simplistic post excerpt block that can be clicked to go to the article. Notice that when the block is hovered over nearly everything changes. The heading color, the borders, even the paragraph text changes all at once. Let's get started creating this.

### Writing our responsive “easy-click” post index HTML:

Looking at the picture, we see that we need a `<section>` tag to wrap the post index, `<article>` tags for each post, `<div>` tags to hold our post images, `<h2>` tags, `<p>` tags, and `<a>` tags. Instead of placing an `<a>` inside each of the inner tags, we'll need to place it just inside our `<article>` tag. Take a look at the HTML below:

```html
<section id="postIndex" class="widthWrapper">

  <article>
    <a href="http://sitechop.com/general/speed-up-website-guide">
      <div class="postImg">
        ![](http://sitechop.com/images/posts/speed-website/speed-website.png)
      </div>
      <h2>Speeding Up Your Website 101</h2>
      <p>It seems like only a select few, besides big companies and corporations, care about web page speed and performance. Browsing the web, it's common to see load times of 5 seconds and pages that weigh 4, 5, sometimes 10 megabytes! Even if that's not you, is your website optimized to its full potential? This post is not about stripping your page, its about optimizing everything so that your website loads as fast as possible.</p>
    </a>
  </article>

  <!-- Article block repeats 5x -->

</section>
```

As you can see, we have exactly the markup described above. Pretty simple so far right? Good, but the CSS can get a little hairy to make this work, nothing we can't handle.

### Styling our easy-click post index (CSS):

Let's not worry about the hovered states yet, we'll start with the basic non-hovered styling. Before we do that though, let's define some quick global styles:

```css
/* Basic CSS Reset */
* {
  margin: 0;
  padding: 0;
}

img {
  border: none;
}


/* Global Styles */
body {
  font-family: helvetica, arial, sans-serif;
  font-size: 100%;
  font-weight: 400;
  line-height: 1.55;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto Slab', serif;
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: 1.55em;
  padding-bottom: .35em;
}

a {
  font-weight: bold;
  font-weight: 400;
  text-decoration: none;
}

.widthWrapper {
  max-width: 750px;
  margin: 0 auto;
}
```

Next we'll style our article bits. There's a few things in that might seem foreign/strange:

1. we apply a `-0.063em` margin to our `<article>` tags. This overlaps the two `0.063em` borders between each post (create equal border's everywhere).
2. We add `box-sizing: border-box;` to `.postImg`. This enables us to apply fixed spacing between the image and the text, while remaining fluid.
3. On `article a` the top padding is equal to `2.5em` minus the two `0.063em` borders. This becomes important when we start adding hover effects (as to not shift the elements on hover).

Here's the CSS styles:

```css
#postIndex {
  margin: 2.5em auto;
}

article {
  margin-top: -0.063em;
}

article a {
  display: block;
  overflow: hidden;
  padding: 2.374em 2.5em 2.5em 2.5em;
  border-top: 0.063em solid #ccc;
  border-bottom: 0.063em solid #ccc;
}

.postImg {
  float: left;
  box-sizing: border-box;
  width: 25%;
  padding-right: 2em;
}

.postImg img {
  width: 100%;
}

article a h2 {
  float: right;
  width: 75%;
  color: #222;
}

article a p {
  float: right;
  width: 75%;
  color: #444;
}
```

Now we need to add our hover effects. To change individual elements inside our `<a>` block on hover, we use this format: `article a:hover element {}`. Besides changing the colors and adding a background, we change our `border-top` to `0.25em` in size. In order to counter-act the height increase we also change our `padding-top`. Here's our hover styles:

```css
article a:hover {
  padding: 2.187em 2.5em 2.5em 2.5em;
  border-top: #666 solid 0.25em;
  background: #f7f7f7;
}

article a:hover h2 {
  color: #157ebf;
}

article a:hover p {
  color: #222;
}
```

Open your page and check it out, pretty snazzy right? Now let's make it responsive. We'll change the paddings and widths of elements. We'll also have our width wrapper expand to 100% and our post images disappear at some point.

```css
@media only screen and (max-width: 750px) {
  #postIndex {
    width: 100%;
  }

  article a {
    padding: 2.374em 1.5em 2.5em 1.5em;
  }

  article a:hover {
    padding: 2.187em 1.5em 2.5em 1.5em;
  }
}

@media only screen and (max-width: 481px) {
  .postImg {
    display: none;
  }

  article a p,article a h2 {
    width: 100%;
  }
}
```

That's about it. Be sure to checkout the demos and leave a comment below.