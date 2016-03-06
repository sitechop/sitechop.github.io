---
layout: post
title:  Lightweight Responsive Navigation Tutorial
date:   2014-12-07 12:00:00 -0800
permalink: /:categories/lightweight-responsive-navigation
categories: posts
image: /images/posts/generic-front-end/featured.jpg
thumb: /images/posts/generic-front-end/featured-thumb.jpg
class: front-end
excerpt: Learn how to create a lightweight reponseive navigation using HTML, CSS, and vanilla JavaScript.
---

Today we're going to create a lightweight responsive header and navigation bar using HTML, CSS, and non-obtrusive JavaScript (not jQuery). Originally I designed this header bar for JS-disabled users first. If JavaScript was enabled, it would load additional styles, but why have majority load more code? I don't think it's fair to tax them because of the special case users. So here it is, version two of my light weight responsive navigation using non-obtrusive pure JavaScript.

### A look at what we're creating

Before we begin, let's take a look at what we're creating today. We'll be creating a responsive navigation similar, well... identical, to the one used here (on September 10, 2014). In case it happens to change, here's a rough mock-up I created in Photoshop of it.

![responsive-navigation-mockup](/images/posts/responsive-navigation/responsive-navigation-preview.png)

It's designed to be lightweight, have no dependencies, no extra HTML, and fit well with a wide variety of different web designs. In it's entirety it weighs about 3.5k.

### Preliminary and setup

Let's start by creating our directory and all the files we'll be using. It should resemble this:

```nohighlight
Responsive-Navigation (Folder)
- index.html
- style.css
- nojs.css
- scripts.js
```

Open index.html and paste the basic html5 template shown below. The only thing that might look foreign to you is the second stylesheet linked between `<noscript>` tags.

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Responsive Navigation Tutorial</title>
  <meta name="description" content="A tutorial on creating a responsive navigation.">
  <meta name="author" content="Robby Klein">
  <link rel="stylesheet" href="styles.css">
  <noscript><link rel="stylesheet" href="nojs.css"></noscript>
  </head>
  <body>
    <!-- Your Code Starts Here -->

    <script src="scripts.js"></script>
  </body>
</html>
{% endhighlight %}

If you're not familiar with the html `<noscript>` tag, what is does is tell JavaScript-enabled clients to skip past the code inside.

We'll also start with a basic CSS reset, so paste the code below in your style.css file. I tend not to use massive resets that cover absolutely everything. Instead, I add tags to the reset as they are needed/used in my HTML. The second part just sets the font family, font-weight, font size, and line height.

{% highlight css %}
html, body, header, h1, ul, li, div, a, p, button {
  margin: 0;
  padding: 0;
}

body {
  font: normal 100%/155% arial, helvetica, sans-serif;
}
{% endhighlight %}

Now that we have all the preliminary work done, let's get started creating our responsive navigation.

### Writing the HTML

There's really no need to break the HTML into separate sections. Let's jump right in and take a look at the markup we'll be using.

{% highlight html %}
<header>
  <div class="topWidth">

    <h1>
      <a href="#">Robby Klein</a>
    </h1>

    <nav id="nav" class="hide">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Portfolio</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

  </div>
</header>
{% endhighlight %}

All pretty standard stuff. I added the ID on `<nav>` for simplicity when grabbing it through JavaScript. Please note that there is no menu button. Since the menu button is only needed by JS-enabled users, well append it through JavaScript.

### Appending a menu button through JavaScript

Since we'll be styling our JS-enabled version first, let's start by appending our menu button. Here's the HTML we want to inject.

{% highlight html %}
<button id="menu">Menu</button>
{% endhighlight %}

Simple enough, right? Let's create a variable for this code in our scripts.js file.

{% highlight javascript %}
//Create menu button
var menu = document.createElement("button");
menu.id = "menu";
menu.innerHTML = "Menu";
{% endhighlight %}

Now we're going to inject the button between our header and navigation list. To do this, we'll need to use the function shown below. Add it to your scripts document.

{% highlight javascript %}
// Insert After Function
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
{% endhighlight %}

As you can see the function takes two parameters. The reference node (our h1 heading), and the New Node (what we want to inject). Before we run the function, we'll need to create a variable of our H1 tag. We can do this in one line.

{% highlight javascript %}
// Header Variable
var header = document.getElementsByTagName("h1")[0];
{% endhighlight %}

Now that we have all the necessary parameters stored in variables, let's run our menu through the function to inject it.

{% highlight javascript %}
// Inject Menu Button
insertAfter(header, menu);
{% endhighlight %}

Now open up your index.html page in the browser. You should see our menu button in place. Awesome, now let's style this thing.

### Mobile CSS Styling

Remember, part of responsive web design is consistency on different DPI monitors, so we'll be using EM measurements for all our sizing. We're also styling from small to large. By doing this, mobile devices will have a lighter page load and faster experience.

{% highlight css %}
header {
  min-height: 3.75em;
  background: #34495e;
  background-repeat: repeat-x;
  background-size:100% 3.75em;
  background-image: -webkit-linear-gradient(top, #425f7c, #34495e); 
  background-image:    -moz-linear-gradient(top, #425f7c, #34495e); 
  background-image:     -ms-linear-gradient(top, #425f7c, #34495e); 
  background-image:      -o-linear-gradient(top, #425f7c, #34495e); 
  background-image:         linear-gradient(top, #425f7c, #34495e);
}

.topWidth {
  max-width: 60em;
  margin: 0 auto;
}

h1 {
  position: absolute;
  margin-left: 5%;
  font-size: 1.5em;
  line-height: 2.5;
}

h1 a {
  color: white;
}

button {
  float: right;
  background: none;
  border: none;
  font-size: 1em;
  color: white;
  font-weight: bold;
  line-height: 3.75;
  margin-right: 5%;
}

nav {
  padding-top: 3.75em;
  text-align: center;
  display: none;
}

nav ul {
  border-top: 1px solid #293949;
}

nav li {
  list-style: none;
}

nav a {
  display: block;
  color: #d5dfe8;
  padding: 0.75em 0;
  border-bottom: 1px solid #293949;
}

nav a:hover {
  background-color: #293949;
  color: white;
}
{% endhighlight %}

There we go, the mobile part of our responsive navigation should be looking pretty good at this point. Notice that the header tag contains the blue background. To make our background gradient work we apply `background-size` and `no-repeat`. Also, we want the navigation list to be hidden by default, this is why we applied display:none to the `<nav>` tag.

### Adding the toggle functionality

Now that we have our mobile navigation all styled up, let's get the toggle functionality going. We will do this by adding/removing a class every time a user clicks our menu button. To start let's add the class we'll be toggling to our CSS.

{% highlight css %}
.show {
  display: block;
}
{% endhighlight %}

Now switch back to your JS file. We already have a variable for our menu button, but we'll need one for our navigation list too. Let's add that now.

{% highlight javascript %}
// Navigation list variable
var nav = document.getElementById('nav');
{% endhighlight %}

Now paste the following toggle class function in your code. I didn't write it, It was found [here](http://jsfiddle.net/4MBQa/).

{% highlight javascript %}
// Toggle class function
function toggleClass(element, className){
  if (!element || !className){
      return;
  }

  var classString = element.className, nameIndex = classString.indexOf(className);

  if (nameIndex == -1) {
    classString += ' ' + className;
  }
  else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
  }
  element.className = classString;
}
{% endhighlight %}

We'll now add a click event listener to our menu button. When a user clicks the button we'll have it run our toggle class function.

{% highlight javascript %}
menu.addEventListener('click', function() {
  toggleClass(nav, 'show');
});
{% endhighlight %}

Refresh your browser and try it out, all should be working!

### Larger CSS Styling

Now that we have the mobile version of our responsive navigation working, it's time to manipulate the navigation list to work well on larger screens. To start, create a CSS3 media query. `min-width: 47em` seems about right. Inside paste the CSS to hide the menu button and display our navigation.

{% highlight css %}
@media only screen and (min-width: 47em) {
  #menu {
    display: none;
  }

  nav {
    display: block;
  }
}
{% endhighlight %}

Once a users resolution hits 47em+ the menu button will be hidden and the navigation list will be displayed. Now let's add the styles to make our navigation list work on larger screens. We do this by overwriting a lot of properties and adding new ones. Here's the code.

{% highlight css %}
@media only screen and (min-width: 740px) {
  .topWidth {
    width: 90%;
  }

  h1 {
    margin: 0;
  }

  #menu {
    display: none;
  }

  nav {
    display: block;
    padding: 0;
    text-align: inherit;
    float: right;
    line-height: 3.75;
  }

  nav ul, nav a {
    border: none;
  }

  nav a {
    padding: 0;
    margin-left: 2em;
  }

  nav a:hover {
    background: none;
  }

  nav li {
    display: inline-block;
  }
}
{% endhighlight %}

There we go, now we have a full responsive navigation with a hide/show toggle menu button for smaller resolution devices. Refresh your browser and try everything out.

### JavaScript Disabled Styling

Now we have to make the mobile navigation work for JavaScript disabled users. Right now, the navigation list is hidden and the menu button is non-existent. We could simply un-hide the navigation list, but then half their phone screen will be taken up by the navigation. Instead, we'll overwrite some styles, in our nojs.css file. All our changes will be in a max-width media query, so we don't overwrite our 47em+ styles.

{% highlight css %}
@media only screen and (max-width: 46.938em) {
  h1 {
    width: 100%;
    text-align: center;
    margin: 0;
  }

  nav {
    display: block;
    padding: 0 0 1em 0;
    float: none;
    line-height: 2;
    padding-top: 3.75em;
  }

  nav ul, nav a {
    border: none;
  }

  nav a {
    padding: 0;
    margin: 0 0.75em;
  }

  nav a:hover {
    background: none;
  }

  nav li {
    display: inline-block;
  }
}
{% endhighlight %}

We're all set! We now have a lightweight, fully responsive navigation that works with or without JavaScript. We used no extra html markup, and no external libraries. Hope you enjoyed. You can view a demonstration by clicking the demo button below.