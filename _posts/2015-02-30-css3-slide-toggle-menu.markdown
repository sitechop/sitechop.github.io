---
layout: post
title:  "CSS3 Slide Toggle Menu"
date:   2015-02-30 12:00:00 -0800
permalink: /:categories/css3-slide-toggle-menu
categories: posts
image: /images/posts/generic-front-end/featured.jpg
thumb:  /images/posts/generic-front-end/featured-thumb.jpg
class: front-end
excerpt: Learn to create a slide toggle menu using CSS3 and vanilla JavaScript.
---

CSS3 transitions are definitely going to replace jQuery and JavaScript animations for simple web uses. By using CSS3 transitions we can create much smoother animations (specifically on mobile), and even cut the jQuery dependency completely on certain websites. Today we're going to breakdown the creation of a smooth CSS3 and pure JavaScript slide toggle navigation.

[![css3 slide toggle navigation](/images/posts/css3-js-slide-toggle/preview.png)](/demos/css3-js-slide-toggle-menu/index.html)

Before we begin, let's breakdown how this menu will work. As illustrated by the screen shot above, we have a header bar with a H1 and a menu button, and a navigation list that slides in from above. Note that the page also slides down with the navigation list (when active). To create this effect we'll need to use a combination of CSS3 transitions, negative margins, and a JavaScript class toggle. Nothing we can't handle. Before we begin, remember to download the [Sitechop Front-End Starter kit](https://github.com/sitechop/front-end-starter-kit), which includes all the files and directories we will need.

### Writing our slide toggle menu HTML

In order to pull this off, we'll need our navigation and menu button placed above our H1. This feels a little weird, but I guess there's nothing wrong with it. Other than that, it's all pretty standard stuff, examine my code displayed below:

```html
<header id="masterHeader">
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
    <a id="menu" href="#">Nav</a>
  </nav>
  <h1><a href="http://sitechop.com">Sitechop.com</a></h1>
</header>
```

### Writing our slide toggle menu CSS

Now that we have our basic HTML markup written, let's get to the styling. There's one thing you might find strange in the code below, we manually enter our H1 and menu button margins, rather than use a width wrapper. We do this because we want the dividers on the navigation list to extend across the entire screen. The way our markup is written it would not be possible to use a wrapper. Alternatively, we could move the menu button outside of the `<nav>` tag, but that's not very semantic.

```css
/* Global Styles*/
html, body, div,
h1, h2, h3, h4, h5, h6,
ul, li, ol, ul, p, img {
  margin:0;
  padding:0;
}

body {
  line-height: 1;
  font-size: 100%;
  font-family: 'Lora', serif;
  line-height: 1.65;
}

a {
  text-decoration: none;
  font-weight: bold;
  text-decoration: none;
}

li {
  list-style: none;
}

/* Header + Navigation */
#masterHeader {
  font-family: 'Roboto', sans-serif;
  background: #157EBF;
  overflow: hidden; /* Float Clear */
}

header a {
  color: white;
}

h1 {
  float: left;
  font-size: 1.25em;
  line-height: 3em;
  margin-left: 5%;
  text-transform: uppercase;
}

#menu {
  float: right;
  width: 1.625em;
  height: 1.25em;
  margin: 1.25em 5% 1.25em 0;
  /* Image Replacement */
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNnB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyNiAyMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjYgMjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxyZWN0IGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIyNiIgaGVpZ2h0PSI0Ii8+PHJlY3QgeT0iOCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjQiLz48cmVjdCB5PSIxNiIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjQiLz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=);
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}

nav {
  text-align: center;
  background: #1E1E1E;
}

nav ul li {
  border-bottom: 1px dashed #333; /* PX for Opera */
}

nav ul li:last-child {
  border: none;
}

nav ul a {
  display: block;
  padding: 0.75em 0;
}

nav ul a:hover {
  background: black;
}
```

Open up the page in the browser and everything should be styled nicely, but everything is also visible. Our navigation list is only supposed to be visible after we click the menu button, so how can we hide it? We could simply tack on `display: none;`, but then our menu wouldn't slide out like we want. To create the slide effect we'll need to use a negative margin.

After examining our page in Chrome Developer Tools, we learn that our navigation list is exactly 254px in height, give or take 1-3px in the other browsers (since we used em's). Since Chrome is the most widely used browser, we'll set `margin-top: -15.875em;` (254px converted to em's) on #masterHeader . Don't worry we'll fix it for the other browsers later on.

```css
#masterHeader {
  font-family: 'Roboto', sans-serif;
  background: #157EBF;
  overflow: hidden; /* Float Clear */
  margin-top: -15.875em; /* Height in Chrome */
}
```

Now let's create a class, that we can toggle to `#masterHeader` in JavaScript, to change the margin back to 0.

```css
.show {
  margin-top: 0!important; /* to overide inline style */
}
```

### Writing our Slide Toggle Menu JavaScript

At this point our markup and most of our styles in place. We just need to add the toggle functionality and the CSS3 transitions. Let's begin our JavaScript writing by declaring all the variables of elements we're going to need. It looks something like this:

```javascript
// Menu button element
var menu = document.getElementById('menu')

// Header element
var header = document.getElementById('masterHeader')

// Nav element
var nav = document.getElementsByTagName('nav')[0]
```

Now that we have all our elements stored in variables, paste this class toggle function below them:

```javascript
// Toggle class function
function toggleClass(element, className){
  if (!element || !className) {
      return;
  }

  var classString = element.className, nameIndex = classString.indexOf(className);
  
  if (nameIndex == -1) {
      classString += ' ' + className;
  } else {
      classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
  }

  element.className = classString;
}
```

Next we'll create an menu.onclick function that toggles the .show class we created in our stylesheet:

```javascript
// Toggles show class which overrides the negative margin
menu.onclick = function() {
  toggleClass(header, 'show')
}
```

At this point our toggle functionality works, but we still have that few PX bug in browsers other than Chrome. There's two ways (I can think of) to fix this problem. We could used fixed PX sizes on everything, but that ruins the elasticity of our layout. The second option, which we'll be using, is to calculate that navigation list's height in JavaScript, and set the margin to the negative calculated value. Sounds complex, but its only two lines:

```javascript
// Calculates nav height, adds - and px
var height = "-" + nav.clientHeight + "px"

// Add negitive margin of nav's height to header
header.style.marginTop = height
```

You can remove the negative margin we set earlier, but I choose to leave it. I do this so non-chrome users only get a 1-3px flash (of our navigation list) rather than a flash of the entire thing. It's up to you, by leaving it you'll also have to change the margin every time you add a new link.

### Adding the CSS3 transitions

Every thing's working, now all we need to do is add a few CSS3 transitions. Jump back to your stylesheet and alter your #masterHeader class to look like this:

```css
#masterHeader {
  font-family: 'Roboto', sans-serif;
  background: #157EBF;
  overflow: hidden; /* Float Clear */
  transition: .4s; /* CSS3 Transition */
  margin-top: -15.875em; /* Height in Chrome */
}
```

You can also add hover transitions for the navigation lists like I did:

```css
nav ul a {
  display: block;
  padding: .75em 0;
  transition: .1s;  /* Hover-off Transition */
}

nav ul a:hover {
  background: black;
  transition: .1s;  /* Hover-on Transition */
}
```

That's it you're done! Open your page in the browser and all should be working, smooth as ever! Hope this helped. Checkout the demo's and leave a comment below.