---
layout: post
title:  "CSS Fluid Columns Fixed Spacing"
date:   2015-03-30 12:00:00 -0800
permalink: /:categories/css-fluid-columns-fixed-spacing
categories: posts
image: /images/posts/generic-front-end/featured.jpg
thumb:  /images/posts/generic-front-end/featured-thumb.jpg
class: front-end
excerpt: Learn a clever CSS technique to create fluid columns with fixed spacing inbetween.
---

Fluid columns can be a real pain in the ass when it comes to creating a responsive website, specifically the spacing in-between. Sure we could use percentage based margins for the spacing, but that always looks odd at certain resolutions. There’s also some JavaScript positioning methods, but you definitely don’t want the layout JS-dependent! Today I’ll show you some CSS tricks to create some fluid three column grids that are all equally spaced by 1.5em.

Before we begin, make sure to download the [Sitechop Front-End Starter Kit](https://github.com/sitechop/front-end-starter-kit) which contains all the files and directories you’ll need to get started.

### Fluid 3-Column Constant-Spaced Responsive Photo Gallery

Say you want to display images three-by-three. You want everything to be fluid and everything to be constant spaced and equal, how would you do it? The answer is to make use of `box-sizing: border-box` and `nth-child`. Let me demonstrate:

[![](/images/posts/columns/photos_thumb.png)](/images/posts/columns/photos.png)

#### The HTML Markup

Before we get to the CSS stuff we need to write some basic HTML markup. There’s nothing out of the ordinary, it looks like this:

```html
<div class="widthWrapper">

  <ul>
    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>

    <li>
      <a href="#"><img src="images/wolf.png" /></a>
    </li>
  </ul>

</div>
```

#### The CSS

Now that our HTML in place let’s get to styling this. Let’s start with a basic CSS reset, a few global styles, and our width wrapper.

```css
* {
  margin: 0;
  padding: 0;
}

body {
  line-height: 1;
  font-size: 100%;
  font-family: sans-serif;
  padding: 2.5em 0;
}

li {
  list-style: none;
}

img {
  /* Fluid Images */
  max-width: 100%;
  display: block;
  border: none;
}

.widthWrapper {
  width: 90%;
  max-width: 60em;
  margin: 0 auto;
}
```

Now let’s style the unordered list of images to display a three-by-three constant spaced grid.

```css
li {
  display: block;
  float: left;
  width: 33.3333333333%;
  margin-bottom: 1.5em;
  box-sizing: border-box;
}

li:nth-child(3n+1) {
  padding-right: 1em;
}

li:nth-child(3n+2) {
  padding: 0 0.5em;
}

li:nth-child(3n+3) {
  padding-left: 1em;
}
```

We set the list-items to box-sizing: border-box. This makes it so the padding is on the inside of the block rather than the outside. We also set margin-bottom: 1.5em so the images aren’t stacked. Here’s the tricky part, we target every third element three times, starting from the first second and third element. This is easily done using `nth-child`. Next we apply padding to each of these selectors. We don’t want padding on the left of the first element in a row so we assign 1em padding to the right only, we do the opposite to the last in a row. For the middle elements we assign a 0.5em padding to both the left and right. In the end, every element has 1em of padding total, we also have 1.5em in-between each (since 1em + 0.5em = 1.5em).

Now that we have our three-by-three image grid working let’s add a breakpoint where it changed to two-by-two. 43em wide seems about right, here’s the CSS:

```css
@media only screen and (max-width: 43em) {
  /* Remove by 3 padding */
  li:nth-child(3n+1) {
    padding: 0;
  }

  li:nth-child(3n+2) {
    padding: 0;
  }

  li:nth-child(3n+3) {
    padding: 0;
  }

  /* Change to two column */
  li {
    width: 50%;
    margin-bottom: 1.5em;
  }

  li:nth-child(odd) {
    padding-right: 0.75em;
  }

  li:nth-child(even) {
    padding-left: 0.75em;
  }
}
```

Now that there’s only two elements in each row we have to reset the three-by-three specific styles. We do that by setting `padding: 0` on each of the `nth-child` selectors for earlier. Afterwards we add two new ones, odd and even. They both have paddings of 0.75em, add them together and you get 1.5em.

We made it this far, might as well add the styles to switch to one column. Same as the last, I also change my width wrapper since my images are only 400px wide.

```css
@media only screen and (max-width: 30em) {
  .widthWrapper {
    max-width: 25em;
  }

  /* Change to 1 column*/
  li {
    width: 100%;
    margin-bottom: 1.5em;
  }

  /* Remove by 2 padding */
  li:nth-child(odd) {
    padding-right: 0em;
  }

  li:nth-child(even) {
    padding-left: 0em;
  }
}
```

### Fluid 3-Column Constant-Spaced Layout (Two Sidebars)

Using the same technique we can easily create two and three column layouts for normal pages. Let’s say we wanted a main content column with two right-hand sidebars.

[![](/images/posts/columns/sidebars_thumb.png)](/images/posts/columns/sidebars.png)

#### The HTML Markup

```html
<div class="widthWrapper">

  <div id="left">
    <article>
      <p>Capistrano is probably the coolest and best way you can deploy your rails applications today, but it can frustrating to set up and understand. A few months ago I showed you how to deploy from an Ubuntu machine, and today I’m going to show you how it’s done on a Windows 8.1 machine. This was a major pain to figure out, so hopefully this will make the process painless for the next.</p>

      <p>Before you begin, there’s a security issue I have to bring up. Capistrano on windows will not work using SSH to connect to your server. I searched far and wide and found no solution. To work around this problem we’re going to allow a deploy user with limited permissions to connect using password protection.</p>

      <p>This tutorial is to take you through the Capistrano deployment portion of pushing a Rails application to production. By this point you should have your production server ready to go. My set up is running Ruby, Ngnix, MySQL, and Phusion Passenger. You will also need Git installed. If you’re not there yet, I’ve written guides on setting up every portion, they’re listed below:</p>
    </article>
  </div>

  <div id="middle">
    <h3>Sidebar</h3>
    <ul>
      <li>
        <a href="#">Easy Click Article Index</a>
      </li>
      <li>
        <a href="#">Multi-colored Backgrounds</a>
      </li>
      <li>
        <a href="#">Slide-Toggle Menu with CSS3 transitions</a>
      </li>
      <li>
        <a href="#">SVG Icon Buttons</a>
      </li>
    </ul>
  </div>

  <div id="right">
    <h3>Sidebar</h3>
    <ul>
      <li>
        <a href="#">Easy Click Article Index</a>
      </li>
      <li>
        <a href="#">Multi-colored Backgrounds</a>
      </li>
      <li>
        <a href="#">Slide-Toggle Menu with CSS3 transitions</a>
      </li>
      <li>
        <a href="#">SVG Icon Buttons</a>
      </li>
    </ul>
  </div>

</div>
```

#### The CSS

```css
li a {
  margin: 1em 0;
  display: block;
}

#left {
  width: 50%;
  float: left;
}

#middle, #right {
  box-sizing: border-box;
  padding-left: 2.5em;
  width: 25%;
  float: right;
}

@media only screen and (max-width: 800px) {
  #left, #right {
    float: none;
    width: 100%;
    padding: 0;
  }
}
```

### Fluid Two-Column Constant-Spaced Layout (50/50 Split)

Say you wanted two evenly split columns with constant spacing. We’d do just as we did in the first section. Very simple:

[![](/images/posts/columns/fifty_thumb.png)](/images/posts/columns/fifty.png)

#### The HTML Markup

```html
<div class="widthWrapper">

  <article id="left">
    <p>Capistrano is probably the coolest and best way you can deploy your rails applications today, but it can frustrating to set up and understand. A few months ago I showed you how to deploy from an Ubuntu machine, and today I’m going to show you how it’s done on a Windows 8.1 machine. This was a major pain to figure out, so hopefully this will make the process painless for the next.</p>

    <p>Before you begin, there’s a security issue I have to bring up. Capistrano on windows will not work using SSH to connect to your server. I searched far and wide and found no solution. To work around this problem we’re going to allow a deploy user with limited permissions to connect using password protection.</p>

    <p>This tutorial is to take you through the Capistrano deployment portion of pushing a Rails application to production. By this point you should have your production server ready to go. My set up is running Ruby, Ngnix, MySQL, and Phusion Passenger. You will also need Git installed. If you’re not there yet, I’ve written guides on setting up every portion, they’re listed below:</p>
  </article>

  <article id="right">
    <p>Capistrano is probably the coolest and best way you can deploy your rails applications today, but it can frustrating to set up and understand. A few months ago I showed you how to deploy from an Ubuntu machine, and today I’m going to show you how it’s done on a Windows 8.1 machine. This was a major pain to figure out, so hopefully this will make the process painless for the next.</p>

    <p>Before you begin, there’s a security issue I have to bring up. Capistrano on windows will not work using SSH to connect to your server. I searched far and wide and found no solution. To work around this problem we’re going to allow a deploy user with limited permissions to connect using password protection.</p>

    <p>This tutorial is to take you through the Capistrano deployment portion of pushing a Rails application to production. By this point you should have your production server ready to go. My set up is running Ruby, Ngnix, MySQL, and Phusion Passenger. You will also need Git installed. If you’re not there yet, I’ve written guides on setting up every portion, they’re listed below:</p>
  </article>

  </div>
```

#### The CSS Styling

```css
#left {
  float: left;
  box-sizing: border-box;
  padding-right: 0.75em;
  width: 50%;
  }

#right {
  float: right;
  box-sizing: border-box;
  padding-left: 0.75em;
  width: 50%;
 }

@media only screen and (max-width: 800px) {
  #left, #right {
    float: none;
    width: 100%;
    padding: 0;
  }
}

@media only screen and (max-width: 480px) {
  .widthWrapper {
    max-width: 400px;
  }
}
```

### Four Columns Even Constant Spaced Columns

I don’t believe you can create four-column layouts using this technique (unless you don’t mind padding to the left/right of the first/last element in a row). Either that or I couldn’t figure out the math. If you have a pure CSS solution for this please respond with your method. I have one technique but it requires you to alter your entire layout… we’ll save that for another post.