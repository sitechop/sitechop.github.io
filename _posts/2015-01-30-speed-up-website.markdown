---
layout: post
title:  "Speeding Up Your Website 101"
date:   2015-01-30 12:00:00 -0800
permalink: /:categories/speed-up-your-website-101
categories: posts
image: /images/posts/speed-website/featured.jpg
thumb:  /images/posts/speed-website/featured-thumb.jpg
class: general
excerpt: Tips and tricks to get your webpages load speed on track.
---

It seems like only a select few, besides big companies and corporations, care about web page speed and performance. Browsing the web, it's common to see load times of 5 seconds and pages that weigh 4, 5, sometimes 10 megabytes! Even if that's not you, is your website optimized to its full potential? This post is not about stripping your page, its about optimizing everything so that your website loads as fast as possible.

**View the optimizations below as a checklist, and try to hit as many as possible.** You'll find some of the optimizations are already met, and some you have no control over, but I'm sure you'll find a few areas you can improve on.

### Testing Your Website's Speed

Before you begin making optimizations, its important to gauge your website as it sits now. This allows us to track our progress and see the impact our optimizations are making.

There are plenty of free resources to test your website's speed. I find the best one to be [Webpagetest.org](http://webpagetest.org/). They go the most in-depth, have testing servers all over the world, and allow you to test under all kinds of different circumstances. Some other popular services include: [Pingdom](http://tools.pingdom.com), [GT Metrix](http://gtmetrix.com/), and [Google Page Speed](https://developers.google.com/speed/pagespeed/insights/). Even the developer tools in Chrome allows you to test speed. Head over to one of these and test your website.

[![webpagetest.org screenshot](/images/posts/speed-website/test-website.png)](http://webpagetest.org)

### Web Page Speed Optimizations

Now that we have an idea of where our page sits, we can start making improvements and optimizations. The services listed above should also give you insight on what your website is already doing correctly. Let's get started.

#### Optimize Images

Generally over half a website's page weight is images. Many times these images are not optimized/compressed at all, or they're done poorly. **One of the fastest and most dramatic ways you can cut your page weight, is optimizing your images correctly.** The difference can be astounding.

By using lossy compression, which is practically invisible to the human eye, you can see size decreases averaging around 60-70%. Using lossless compression offers you a 10-20% decrease in file size.

There are two services for compressing images I'd recommend, [TinyPNG](http://tinypng.com), and [Kraken](http://kraken.io). Both offer free web versions which should suit all your needs. TinyPNG even offers you a free version of their developer API which you can hook up to tools like [Grunt JS](/front-end-dev/basic-grunt-js-guide).

![tiny png image compression](/images/posts/speed-website/compress-images.png)

#### Minify CSS/JavaScript/SVG Files

A second way to decrease page weight is to minimize/compress your CSS, JavaScript, and SVG files. All the formatting we do to these files is for readability and future editing. That's great for your local version, but **in production everything should be minified/compressed to save space.**

The difference it makes can be anywhere from minor to drastic (depending on the formatting and amount of comments). Compressing the CSS file on Sitechop saved a mere 17%, but if you look at the difference between the uncompressed and compressed version of jQuery, the difference is around 60%.

You can also minify your HTML files, but the difference is generally very small. On top of that, most of the preprocessors and tools available don't offer this service.

#### Limit Requests

Limiting the number of requests on your web page can also make a substantial difference. Having separate files for everything in production is a bad practice and can really slow your website down.

One way to limit requests is concatenating your CSS and JavaScript files. On Sitechop I have a file to hold all my CSS and a file to hold all of my JavaScripts. In many cases you can do the same as me. If your website has a lot of page-specific CSS and JavaScript I recommend adding a second file for each type to house the page-specific code. **Remember to retain the correct order of everything.**

A second way to limit the number of requests is to use image sprites. Basically this encompasses including a bunch of images in one big image. In CSS you use specific widths, heights, and background-positions to display the correct portion of the super image. This takes a little more time but it definitely has its benefits. There's certain cases where an image won't work well in a sprite. I recommend using sprites for all the iconography on your website.

![concatinate files](/images/posts/speed-website/concatinate.png)

#### Clean HTML/CSS/JavaScript

This should go without saying, but keep your code clean and lean. You should do your best not to have any unused or extra markup, styles, or scripts on your pages. **Try and find that perfect balance between reusable styles/functions and specifics.**

#### Limit Plugins and Frameworks

I see websites infected with excessive plugin use all the time. You really should try to limit the number of plugins/frameworks/fit-all-solutions on your page. Sure its much easier and faster, but there's so much unused code in most of these. Try and find that happy medium between plugins and custom functionality. Many websites have frameworks on top of frameworks on top of frameworks. If you want to use jQuery great, but do you really need that 100k fancybox slider on top of it? Find lean plugins that are closer to your sites exact needs or write your own.

That being said, I'm not perfect, but I do my best to pick and choose which frameworks/libraries/plugins I really need on my site. Sitechop uses two big ones, disqus commenting and a syntax highlighting library.

![too many plugins and scripts](/images/posts/speed-website/too-many-scripts.png)

#### Caching

This wont effect the first time user's load speed, but it creates a massive difference for return visitors. You'll want to enable caching for all of your Images, CSS, and JavaScripts. Most servers are set up like this by default. If it's not, and you're on Nginx (like me), you can enable caching in your server block with the following code:

```nginx
location ~* \\.(ico|jpg|gif|png|css|js|swf|html)$ {
  if (-f $request_filename) {
    expires max;
    break;
  }
}
```

Anytime you make changes to cache-able files you'll want to rename them, so a user will load the changes on their next visit. Most people add a version number or random string to the end of the file name.

#### Enable Gzipping and Persistant Connections (Keep-Alive)

Gzipping will make a huge difference on page speed. Basically it tells the server to compress all your text/css/javascripts/html/xml in the transfer. **Gzipping will cut the overall transfer size (of those files) by nearly 60%.** If you don't have gzipping enabled and your on Nginx, open nginx.conf and enable it with the follow lines:

```nginx
gzip  on;
gzip_disable "MSIE [1-6]\\.(?!.*SV1)";
gzip_http_version 1.0;
gzip_comp_level 2;
gzip_proxied any;
gzip_types text/plain text/html text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript;
gzip_vary on;
```

Enabling  persistent connections (keep-alive) will also offer a speed boost. The idea behind this is that it used one connect for all the resources rather than a separate connection for each one. I think it's disabled by default in Nginx, you can enable it by setting a value in nginx.conf:

```nginx
keepalive_timeout  45;
```

#### Limit Custom Fonts

Another big space hog is custom fonts. I get it, they look cool, I'm with you. Just make sure you only load the fonts and weights your using on your website. I recommend using a service like Google Fonts or TypeKit for this. Different browsers require different formats, and these services handle this far better than we can on our own. Google Fonts is getting so crazy that you can specify the exact characters you want included in the font.

#### Further web server configuration

There's not a fit-all solution for this, but proper configuration of your server can make a significant difference. Research configuration of everything you're using on your web server and adjust stuff according to your website, server specs, and traffic.

#### Content Distribution Networks (CDN's)

If your website is getting a high volume of traffic, or visitors from different parts of the world, a CDN can make a huge difference. The idea behind a CDN is that it stores all the static portions of your website in servers all over the world and connects the user to the one closed to them to load those resources.

The two most popular choices for CDN's are [MaxCDN](http://maxcdn.com) and [Cloudflare](cloudflare.com). Cloudflare offers a free version of the service, so maybe try that if your new.

### Conclusion

Looks like you've made it through the list, test your webpage speed one final time. Did it make a significant difference? **Keep in mind that the optimizations above are just surface level.** There's more specific and less-meaningful techniques the big web powers are using, but its really not worth the time investment for a small-scale website.

Hope you found some of this useful, until next time!