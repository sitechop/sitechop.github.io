---
layout: post
title:  "Beginners Guide to Grunt JS"
date:   2015-01-15 12:00:00 -0800
permalink: /:categories/social-media-icons-svg-sprite
categories: posts
image: /images/posts/gruntjs-basics/featured.jpg
thumb:  /images/posts/gruntjs-basics/featured-thumb.jpg
class: front-end
excerpt: Learn about Grunt JS and create your very first grunt file.
---

Grunt is one of those tools I've heard of forever, but never got around to using. Everyone raves about how great it is and the amount of time they've saved, but could it really be that great? This week I took some time to learn the basics and try it on a project. They were right... Grunt is pretty awesome. Today I'm going to take you through the installation process, teach you the basics, and take you through the creation of your first Gruntfile.

### What is Grunt JS?

[![Grunt JS logo](/images/posts/gruntjs-basics/grunt-logo.png)](http://gruntjs.com)

If you're completely our of the loop, you're probably wondering what Grunt is. Well, to put it simply, Grunt is a “Javascript task runner.” It allows you to automate a whole slew front-end developer tasks you'd normally do manually, thus saving you loads of time. Here's a list of several common tasks you can automate using Grunt:

- CSS/HTML/JavaScript/SVG Minifying
- CSS/JavaScript Concatenation
- SASS/LESS Compiling
- Image Optimization
- CSS Organization/Clean-up
- JavaScript Validation
- Run a local web server
- Auto browser refreshing
- Auto Git Committing

This is just the beginning too. There's pretty much a Grunt plugin for everything you can think of. Head over to the [Grunt plugins page](http://gruntjs.com/plugins) and see what Grunt can do for you. If you know what you're doing you can even write your own plugins.

### Installing Grunt JS

I work on Ubuntu Linux, so my installation process is a little different than those on Windows or Mac OSX. Anyway, Grunt has two dependencies: [Node JS](http://nodejs.org/) and [Node Package Manager (NPM)](https://www.npmjs.org/). Both of these can be installed easily using `apt-get`. To install them, run the following commands in terminal:

```no-highlight
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

Now that Grunt's dependencies are met, we can install Grunt itself by running the command below:

```no-highlight
npm install -g grunt-cli
```

**/usr/bin/env: node: No such file or directory**

If you run into this error you can fix it by creating a symbolic link between NodeJS and Node. Run the command below to do so:

```no-highlight
ln -s /usr/bin/nodejs /usr/bin/node
```

### Grunt Project Inital Setup:

Before we add Grunt JS, let's take a look at the project we'll be using Grunt on. My project directory looks like this:

```no-highlight
test_project (folder)
- css (folder)
-- style.scss
-- responsive.scss

- js (folder)
-- modenizr.js
-- menu.js
-- totop.js

- images (folder)
-- bottom.png
-- footer.png
-- halftone.png

- index.html
```

As you can see, I have a couple SCSS files, a few JavaScript files, some PNG images, and an index.html.

To use Grunt we'll have to add two required files:

- **Package.json**: This is just a configuration file that lists information about a project and all its dependencies.
- **Gruntfile.js**: This loads all our plugins. It also holds our plugin and task configurations.

#### Creating our Package.json

Thankfully NPM has a helper to get us started on our package.json. Navigate to the root of your project and run the helper with the following command:

```no-highlight
npm init
```

From there it will ask you a few questions about your project, I left everything blank except the name, description, and author. **Make sure your project name doesn't have any spaces in it.**

```nohighlight
About to write to /home/robby/Desktop/test/package.json:

{
  "name": "Testing",
  "version": "0.0.0",
  "description": "Test project",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "Robby Klein",
  "license": "BSD-2-Clause"
}

Is this ok? (yes)
```

Press enter and a package.json file will be added in your project directory. Now we need to add Grunt to our package dependencies. You can do so with the following command:

```
npm install grunt --save-dev
```

Open up your package.json and inspect it, you should see Grunt added under dependencies:

```json
{
  "name": "Testing",
  "version": "1.0.0",
  "description": "Test project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Robby Klein",
  "license": "ISC",
  "devDependencies": {
    "grunt": "~0.4.5"
  }
}
```

#### Basic Gruntfile.js template

Now it's time to add our Gruntfile. Start by creating a new file in your project root called `Gruntfile.js`. Paste the following, near-empty, configuration inside:


```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  })

  // Load Plugins Here:

  // Default task(s).
  grunt.registerTask('default', ['task-here'])

}
```

As you can see, everything is inside `module.exports = function(grunt) {}`. **Nothing should go outside of this function.**

Next comes `grunt.initConfig({})`, all of our project and plugin configuration goes within here. As you can see ours defines the location of our package.json file, this is required.

Below that is where we'll load all our plug-ins (we'll learn about this later on).

At the very bottom is where we can define our different Grunt tasks (or task lists). Default is the task list that will be run every time we run `grunt` through terminal.

All the different tasks we want `default` to run are placed inside the array. Ours is empty right now.

Additional task lists can also be added. The format is exactly the same as default except you'll name it something different. Non-default tasks can be ran with the command `grunt whatever-its-named`.

### Installing and Configuring Our First Grunt Task

At this point we can start installing plugins, configuring them, and configuring tasks. The process is pretty consistent among different plugins:

1. Find a plugin/task you want.
2. Navigate to the repository.
3. Follow the instructions.

Let's start with an easy one, Uglify (which minifies and concatenates JavaScript files). Head over to the [repository](https://github.com/gruntjs/grunt-contrib-uglify), you'll see an installation command. In our case we run the following command (from the root of our project) to install the Uglify plugin:

```
npm install grunt-contrib-uglify --save-dev
```

This will install the plugin and add it to your `package.json` dependencies list. Now that it's installed, we have to load it in our Gruntfile. Generally the command is listed right below the install command. Load it in your Gruntfile and add it to the default task as shown below:

```javascript
module.exports = function(grunt) {

  // ...

  // Load Plugins Here:
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Tasks:
  grunt.registerTask('default', ['uglify'])

}
```

Next we have to add an Uglify configuration block within our `grunt.initConfig({})`. This block will specify the files we want to input, and where we want the task to place the output file. The read-me (from the repository) usually lists all the configurable options, and includes a sample configuration at the end. Below is a super simple config. We will place it right after the `pkg` line.

```javascript
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: ['js/modenizr.js', 'js/menu.js', 'js/totop.js'],
        dest: 'build/js/scripts.js'
      }
    },

  })

  // Load Plugins Here:
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Tasks:
  grunt.registerTask('default', ['uglify'])
}
```

As you can see, `src:` is where we list all the JavaScript files we want to concatenate and minify. `Dest`, is short for destination, and is where we want the outputted file to go. We'll be placing everything in a build folder, hence the `build/js/scripts.js`.

**Notice the comma at the end of the uglify block. Every plugin configuration block needs to be comma separated or our gruntfile will fail.** I added one since we'll be adding more config blocks later on.

Lets run the `grunt` command and see if this works:

```
Running "uglify:build" (uglify) task
>> 1 file created.
Done, without errors.
```

It worked! Check out your project directory. It created the build/js directories and placed our minified JS file inside.

### Adding More Grunt Tasks

Now that we have Uglify working, and a basic understanding of how Grunt JS works, lets make a list of all the other tasks we want Grunt to automate for us:

- Compile SASS.
- Minify HTML.
- Optimize PNG's.
- Watch our files and run tasks on changes.
- Create a local web server.
- Refresh our browser on changes.

Sounds like a pretty solid list for our project. Since plugin installation is pretty much the same process globally, I won't go into as much detail this time. Lets get started adding more Grunt tasks.

#### Grunt SASS Task

Start by installing the SASS plugin with the following command:

```
npm install grunt-contrib-sass --save-dev
```

Now add it the code to load the plugin right below Uglify:

```javascript
module.exports = function(grunt) {

  // ...

  // Load Plugins Here:
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-sass')

  // Tasks:
  grunt.registerTask('default', ['uglify'])

}
```

Every time we run `grunt` we want our SASS to compile, so add it to your default task:


```javascript
module.exports = function(grunt) {

  // ...

  // Tasks:
  grunt.registerTask('default', ['uglify', 'sass'])

}
```

Now add your SASS configuration block right below Uglify.

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['js/modenizr.js', 'js/menu.js', 'js/totop.js'],
        dest: 'build/js/scripts.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/style.css': 'css/style.scss'
        }
      }
    },
  })

  // ...
}
```

#### HTML Minification Grunt Task

Start by installing the htmlmin Grunt plugin:

```
npm install grunt-contrib-htmlmin --save-dev
```

We also need to load the htmlmin plugin and add it to our default task in our Gruntfile.

```javascript
module.exports = function(grunt) {

  // ...

  // Load Plugins Here:
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')

  // Tasks:
  grunt.registerTask('default', ['uglify', 'sass', 'htmlmin'])

}
```

Lastly, add the configuration block below the SASS configuration:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    
    // ...
    
    htmlmin: {                                  
      dist: {                                    
        options: {                        
          removeComments: true,
          collapseWhitespace: true
        },
        files: {       
          'build/index.html': 'index.html', // 'output': 'input'
        }
      }
    },
  })
}
```

#### PNG Compression (Tiny PNG) Grunt Task

There's an official Grunt image optimization plugin, but I love [TinyPNG](http://tinypng.com). As it turns out, they have a developer API, and there's a Grunt TinyPNG plugin available. To use it through grunt you'll need a developer API key. You can get one for free [here](https://tinypng.com/developers).

Once you have an API key install the task with:

```
npm install grunt-tinypng --save-dev
```

Afterwards load the tinypng grunt task with the code below:

```javascript
module.exports = function(grunt) {

  // ...

  // Load Plugins Here:
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-tinypng')

  // ...

}
```

Now add your task configuration below htmlmin:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
    
    // ...
    
    tinypng: {
      options: {
        apiKey: 'api-key-here',
        summarize: true,
        showProgress: true,
        stopOnImageError: true
      },
      compress: {
        expand: true, 
        src: 'images/*.png',
        dest: 'build/',
        ext: '.png'
      }
    },
  })

  // ...
}
```

Since we'll only be running this task when new images are uploaded, I like to create a separate task for it. We'll create a new Grunt task called images, place it below your default task. It will look like this:

```javascript
module.exports = function(grunt) {

  // ...

  // Tasks:
  grunt.registerTask('default', ['uglify', 'sass', 'htmlmin'])
  grunt.registerTask('images', ['tinypng'])

}
```

Now If we want to optimize our images we'll run `grunt images` instead of `grunt`.

#### Grunt Watch

This plug-in allows us to keep watch of our files and run Grunt tasks whenever a change is saved. Install it with the following command:

```
npm install grunt-contrib-watch --save-dev
```

Load the task and add the configuration:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
   
    // ...
    
    watch: {
      files: ['*.html', 'js/*.js', 'css/*.scss'],
      tasks: ['uglify', 'sass', 'htmlmin'],
    },

  })

  // Load Plugins Here:
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Tasks:
  grunt.registerTask('default', ['uglify', 'sass', 'htmlmin'])
  grunt.registerTask('images', ['tinypng'])
}
```

Now we don't have to keep running `grunt` all the time, we can simply run `grunt watch` and let grunt handle everything in the background.

Incase your not familiar with the command line, you can stop a process from running by pressing `CTRL+C`

#### Grunt Connect:

Grunt connect is a plugin that creates a local web sever for you to develop on. Meaning, you'll test your website on `localhost` rather than `file://`. Install the task:

```
npm install grunt-contrib-connect --save-dev
```

Load the plugin and add the configuration block:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({
   
    // ...
    
    connect: {
      server: {
        options: {
          base: 'build/',
          port: 3000
        }
      }
    }

  })

  // Load Plugins Here:
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')

  // ...
}
```

The connect server only stays active until the last grunt task is finished. There's an option to change it, but here's what I like to do: I create a new task list that runs connect first, and watch second. Watch continually runs, thus connect will continuous run. This new task list will create our local web server and run grunt watch (which will run our watch tasks on file changes). Add the task list with the code below:

```javascript
module.exports = function(grunt) {

  // ...

  // Tasks:
  grunt.registerTask('default', ['uglify', 'sass', 'htmlmin'])
  grunt.registerTask('images', ['tinypng'])
  grunt.registerTask('live', ['connect', 'watch'])
}
```

As you may have guessed, you'll run this command with `grunt live`. The local web sever grunt just created for you is located at [localhost:3000](http://localhost:3000)

#### Live Reload:

Pretty sweet so far, the only thing left to add is live reload, so we won't have to click the browser refresh button over and over. We don't have to install a plugin for this, we can just enable it in our watch and connect configuration blocks:

```
module.exports = function(grunt) {

  grunt.initConfig({
    
    // ...

    watch: {
      files: ['*.html', 'js/*.js', 'css/*.scss'],
      tasks: ['uglify', 'sass', 'htmlmin'],
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: 'build/',
          port: 9009
        }
      }
    }
  )}

  // ...
}
```

We also have to add the live reload script link in our HTML files. Add the following script link just before your `</body>`:


```html
<script src="//localhost:35729/livereload.js"></script>
```

### The Completed Gruntfile

You should have quite a bit of code at this point. Let's take a look at how our completed Gruntfile looks:

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'js/*.js',
        dest: 'build/js/scripts.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/style.css': 'css/style.scss'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'index.html',
        }
      },
    },

    tinypng: {
      options: {
          apiKey: "z1Vvr0oo1vsrP0_BvdTUJy3lTzp-esC5",
          checkSigs: false,
          sigFile: '',
          summarize: true,
          showProgress: true,
          stopOnImageError: true
      },
      compress: {
          expand: true, 
          src: 'images/*.png', 
          dest: 'build/',
          ext: '.png'
      },
    },

    watch: {
      files: ['*.html', 'js/*.js', 'css/*.scss'],
      tasks: ['uglify', 'sass', 'htmlmin'],
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: 'build/',
          port: 9009
        }
      }
    }

  })

  // Load Plugins Here.
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-tinypng')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'htmlmin'])
  grunt.registerTask('images', ['tinypng'])
  grunt.registerTask('live', ['connect', 'watch'])

}
```

At this point you should try out the three different task lists we created. Everything should work perfectly. After that you should be ready to create your own Gruntfile, custom tailored to your projects needs. Thanks for reading!