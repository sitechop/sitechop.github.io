---
layout: post
title:  "The Jekyll Beginners Guide "
date:   2015-03-07 12:00:00 -0800
permalink: /:categories/jekyll-beginners-guide
categories: posts
image: /images/posts/generic-front-end/featured.jpg
thumb:  /images/posts/generic-front-end/featured-thumb.jpg
class: front-end
excerpt: Learn the basics to the Jekyll static site generator and create your first blog.
---

If anyone has been with me since the beginning, they'd know that Sitechop evolved from my now-defunct Jekyll blog that was hosted on robbyk.com. Jekyll has came a long way since then and has been growing in popularity as well. Jekyll is a great solution for those looking to build lightweight small semi-dynamic web pages. Today I want to take you through the basics and get you started building your own Jekyll powered websites.

[![Jekyll templating diagram](/images/posts/jekyll-guide/jekyll.png)](jekyllrb.com)

### What is Jekyll?

Jekyll is a compromise between a full-fledged CMS (or blogging system)  and a static website. Jekyll allows web masters to build blogs and dynamic websites, without server-side scripting and databases. Jekyll works by using your local computer to spit up all possible pages locally, rather than letting your server render the pages on request. You're entire website will be built locally and placed in a _site folder for easy uploading. Jekyll has been around for quite a few years now, and is ideal for simple dynamic websites and/or blogs. Jekyll runs on top of the [Ruby programming language](https://www.ruby-lang.org/en/) and was created by GitHub founder [Tom Preston-Werner](http://tom.preston-werner.com/).

### Jekyll Features:

Lets be honest, without access to a database and scripting language, Jekyll can't offer all the features of a full-fledged CMS, but that's not to say it doesn't offer an array of cool features. Features are constantly being added and improved upon as well. A lot has been added since my first Jekyll site early last year. There's quite a few [3rd party plugins](http://jekyllrb.com/docs/plugins/) to checkout as well.  Let's take a look at some features Jekyll can offer you out of the box:

#### Local development environment

Jekyll comes with a built in local server for you to test and develop your website on. The command `jekyll serve` will start up the server, watch all your files, and rebuild your website on any changes. This makes local development a breeze.

#### Sass

Jekyll now supports Sass out of the box. Sass makes writing CSS quite a bit faster and makes organization a lot easier. There are plugins available for other pre-processors such as Less as well.

#### Syntax highlighting

If you're going to be posting code bits, this is definitely a cool feature to have. Jekyll uses Pygments to highlight code. Pygments is a syntax highlighting library written in python. It looks like they've also included an option to use Coderay, which is a syntax highlighter written in Ruby.

#### Post Excerpts

Jekyll allows you to use post excepts just like Wordpress. You can set it to use the first paragraph of a post, or manually define your post excerpts in the post front matter. I never see Jekyll sites using this feature for some reasons, most people stick with only the post title and date.

#### Pagination

Jekyll also allows pagination, which is an important feature to have on any blog. You'll want to use pagination to keep your index pages from getting too long.

#### Templating language (Liquid)

Jekyll supports Liquid templating language. Templating languages are very important for any dynamic website. This is what saves you from rewriting the same code on every page. Apparently Liquid templating was created by Shopify.

#### Markdown

Jekyll also supports markdown, this makes writing post content a lot easier. To be honest, I'm not the biggest fan, but people love it, and support is built in.

#### Pretty permalinks

Another necessity is pretty permalinks. Thankfully Jekyll allows us to customize our permalinks, and saves us from urls like /post25376374.html.

#### RSS feeds

Another Jekyll feature is RSS feed generation. Every website needs a feed, thankfully this is built into the Jekyll core functionality.

### What Jekyll can't do

Being that Jekyll just generates static pages, there's a few key features that you'll either have to live without or find other solutions. There are two big ones that come to mind:

#### Commenting

Jekyll does not have a commenting system, there's just no way. The solution is to use third party services such as [Disqus](http://disqus.com). As with anything Disqus has its pros and cons.

#### Search

Jekyll does not come with search functionality, probably theres not database to search through. There is a [plugin](https://github.com/PascalW/jekyll_indextank) that searches using client-side scripting, it'd probably be worth it to check out.

### Installing Jekyll

Jekyll runs on top of Ruby, so before you can install Jekyll you'll have to install Ruby. If you're on a Debian-based Linux OS you can follow my guide: [Installing Ruby on Ubuntu](/ubuntu/installing-rails-mysql-ubuntu), otherwise there are multiple methods and instructions on [The Ruby Installation Page](https://www.ruby-lang.org/en/installation/). It should be a relatively quick and painless process.

Once you've got Ruby on your system, you can install Jekyll just like any other Ruby gem:

```
sudo gem install jekyll
```

It will take a minute or so to install Jekyll and all it's dependencies, once it finishes you're ready to build your very first Jekyll website!

### Setting up your Jekyll project

So at this point we have an understanding of what Jekyll is, and we installed Ruby and the Jekyll gem onto our local system, now its time to create our first Jekyll website. To do this open up the terminal (or CMD) and navigate to the directory you want to place your Jekyll website. Run the command below and Jekyll will create everything you need started:

```
jekyll new mySiteName
```

If all went correctly, terminal (or CMD) should return the following statement:

```
New jekyll site installed in /home/robby/Desktop/mySiteName
```

We'll take a look at all the files Jekyll created for us in a moment, for now navigate (in terminal/cmd) to the folder Jekyll just created for us. Run the following command to boot up the local development environment.

```
Jekyll serve
```

Point your browser to [localhost:4000](http://localhost:4000) and take a look at the default Jekyll website they start us with. When your finished press control(command)+c to stop the process.

[![Jekyll templating diagram](/images/posts/jekyll-guide/welcome-thumb.png)](/images/posts/jekyll-guide/welcome.png)

### Jekyll directory breakdown

Now we'll take a look at whats going on behind the scenes, all the different folders and file formats inside the `mySiteName` directory can be a little intimidating at first, but its really pretty simple. Let's break it down.

To start you'll notice some folders and files start with a _ character. This tells Jekyll not to include these files in the build of your site.

#### CSS Folder

This folder contains all the CSS/Sass that will be used on your website, the sass files will be compiled to CSS on build. They start you with one SCSS file, but you can have as many as you'd like.

#### The Includes Folder

This folder contains partial, mostly static portions of your Jekyll site. If you take a peak inside you will see they start you off with Head, Header, and Footer HTML files.

#### Layouts Folder

As you probably guessed, this folder holds all the layout files. These files glue everything together.

#### Posts Folder

This folder holds all your posts. Pay particular attention to the file naming format, it's very important. These files hold your post content in Markdown format.

#### Sass Folder

This folders just for partial Sass files, for importing to your main Sass files within the CSS folder.

#### Site Folder

This folder contains your built website. You'll upload its contents to the root of your website when your sites ready or updated.

#### About.md

This is file contains the contents of the about page that they start you our with. You'll create files just like these for all the different static pages on your website. It will automatically be located at /about.

#### Config.yml

This file contains configuration, and site information, of your Jekyll website. In here you can set your websites title, description, etc.

#### Feed.xml

This file contains the XML template for your websites RSS feed. They start you off nicely, and you probably won't have to edit this at all.

#### Index.html

This file holds the contents of your index page. They start you off with a simple loop that will list all of your posts and dates.

### Configuring your Jekyll website

There are lots configurations available to customize your Jekyll website. The main configuration is within _config.yml of coarse, open it up and set everything to your preference.

```
# Site settings
title: Sitechop! Web design and development blog.
email: notforyou@gmail.com
description: > # Sitechop is a web design and development blog. Common topics include: tutorials, best practices, and theory.
baseurl: " # the subpath of your site, e.g. /blog/
url: "http://sitechop.com" # the base hostname & protocol for your site
twitter_username: itsrobbyk
github_username:  robbyklein

# Build settings
markdown: kramdown
```

There's also configuration available at the top of individual pages and posts. They call this front matter, and it looks like this:

```
---
layout: page
title: About
permalink: /about/
---
```

In this section you can define things like what layouts to use, page titles, post excerpts, categories, and a lot more.

### How Jekyll Templating Works

The layout files in Jekyll are what harbor everything together. If you take a peak within default.html you can see that it pulls in our head, header, and footer include files. It also pulls in the post layout, which pulls in the actual post content. Basically every portion of your site is isolated and pulled together by layout files. Theoretically, if you wanted, you good have 50 includes, as well as layouts within layouts within layouts. Take a look at this diagram which depicts how the default posts pages are formed:

![Jekyll templating diagram](/images/posts/jekyll-guide/templating.png)

Aside from the layout and include files, we also have to familiarize ourselves with the Liquid templating tags that Jekyll uses. There are simple tags that pull post/site data, they look like this:

<pre><code>&#123;&#123; post.title &#125;&#125;</code></pre>

There's also tags to create loops. The code below will cycle through your posts and create an H2 for the post title for each one.

<pre><code>{&#37; for post in site.posts &#37;}
  &lt;h2&gt;&#123;&#123; post.title &#125;&#125;&lt;/h2&gt;
{&#37; endfor &#37;}</code></pre>

For the sake of example, let's customize our index page to look more like a traditional blog. Open up your index.html file, let's make it display our post title, post date, and then an excerpt of our post.

<pre><code>---
layout: default
---

&lt;div class=&quot;home&quot;&gt;

  &lt;h1 class=&quot;page-heading&quot;&gt;Posts&lt;/h1&gt;

  &lt;div class=&quot;post-list&quot;&gt;
    &#123;% for post in site.posts %&#125;
    &lt;div class=&quot;post&quot;&gt;
      &lt;h2&gt;
        &lt;a class=&quot;post-link&quot; href=&quot;&#123;&#123; post.url | prepend: site.baseurl &#125;&#125;&quot;&gt;&#123;&#123; post.title &#125;&#125;&lt;/a&gt;
      &lt;/h2&gt;
      &lt;p class=&quot;post-meta&quot;&gt;&#123;&#123; post.date | date: &quot;%b %-d, %Y&quot; &#125;&#125;&lt;/p&gt;
      &lt;p class=&quot;post-excerpt&quot;&gt;&#123;&#123; post.excerpt &#125;&#125;&lt;/p&gt;
    &lt;/div&gt;
    &#123;% endfor %&#125;
  &lt;/div&gt;

  &lt;p class=&quot;rss-subscribe&quot;&gt;subscribe &lt;a href=&quot;&#123;&#123; &quot;/feed.xml&quot; | prepend: site.baseurl &#125;&#125;&quot;&gt;via RSS&lt;/a&gt;&lt;/p&gt;

&lt;/div&gt;</code></pre>

Above you can see that we changed the unordered list to divs, we also rearranged the post H2 and Meta. We also changed a few tags and added <code>&#123;&#123; post.excerpt &#125;&#125;</code>. This tag pulls the first paragraph from a post.

### Writing Posts

Jekyll starts you off with an example post to demonstrate the format of everything. Pay particular attention to the posts file name 2014-11-14-welcome-to-jekyll.markdown (date-title), **you need to name your posts the same way or they will not work.**

Open up the example post, at the top you can set information about the post, things like title, date, categories etc.

```
---
layout: post
title:  "Welcome to Jekyll!"
date:   2014-12-14 11:43:46
categories: jekyll update
---
```

The rest is just your post written in markdown format. Markdown is supposed to make writing HTML content a lot faster, I recommend you checkout the [Markdown Cheetsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) if you're unfamiliar with it. If you down want to use markdown you can fill the files with normal HTML, don't change the file extension though.

They also show you can example of how to use the syntax highlighting feature. Here's the format:


<pre><code>&#123;% highlight languageNameHere %&#125;
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
&#123;% endhighlight %&#125;</code></pre>

### Conclusion and further reading

By this point you should now have a solid understanding of how Jekyll works and how to build your own Jekyll website. Keep in mind these are just the basics and core features, there are a lot more advanced workings. It's recommended to read the [Jekyll documentation pages](http://jekyllrb.com/docs/home/). Any additional functionality or customizations you'd like to make, are probably in there as well. If not a quick Google search will usually turn up the proper solution.

As with anything I also recommend you remove all the pre-written styles and markup (except the highlighting CSS). You can hold onto the template tags used, but everything else should be built from the ground up.

I hope this post helped and happy Jekylling. If your nice you can leave a comment below.