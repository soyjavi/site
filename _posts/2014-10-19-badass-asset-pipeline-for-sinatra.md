---
layout:     post
title:      "Badass asset pipeline for Sinatra"
date:       2014-10-19
categories: sinatra ruby pipeline
cover:      pipes.jpg
permalink:  /blog/badass-asset-pipeline
---
High level frameworks are great to create **prototypes**. If you adjust yourself to the rules, you can get things done really fast. It turns out that when you develop a big application, working with the limitations of a framework can become **annoying**. For those situations, the best option is to implement an architecture which adjusts to your needs, not otherwise. That can be done by using a minimalistic framework such as Express, Flask, or [**Sinatra**](http://www.sinatrarb.com/).

> Sinatra is a DSL for quickly creating web applications in Ruby with minimal effort.

It is so minimalist that it's defined as a **DSL** in the docs, instead of as a framework. For example, you don't have anything to make easier to work with asset files. Today I'm going to show you how I've configured a **Badass Asset Pipeline** for Sinatra which works exactly the same as the implemented in Ruby on Rails.

## Based in Sprockets

If you came here looking for a solution to manage your asset pipeline and make it look similar to Rails' I'm quite sure you already know about [**Sprockets**](https://github.com/sstephenson/sprockets). Just in case, I'm gonna briefly mention what is it here, but if you already know about it, feel free to skip this section.

Sprockets is a Ruby library for compiling and serving web assets, and it's the core of Rails asset managing. It features declarative **dependency** management for JavaScript and CSS assets, as well as a powerful preprocessor pipeline that allows you to write assets in languages like CoffeeScript, Sass and SCSS.

You'll just have to define the paths where your assets are (later we'll see how), and to set some asset **bundle files**. Each asset bundle is a Javascript or Stylesheet file that specifies, by using a simple special syntax, a bunch of dependencies. An example of a bundled file for Javascript could be:

```ruby
\\# File application.js
\\=require 'jquery'
\\=require 'base'
```

This will tell Sprockets that `application.js` is composed by `jquery` and `base` files, and those files could have been written using raw Javascript, or with a preprocessor language such as Coffeescript.

Sprockets automatically manages defined dependencies. Depending on the configuration, they can be served by HTTP as separated files, concatenated in a single file, or minimized and compressed. Furthermore, If the dependencies source files are written with a preprocessor language as mentioned above, Sprockets will compile them when they are requested.

This way, instead of including in the HTML each separated dependency, we just need to include the bundle files. Sprockets will figure out the content or composition depending on the **environment** and the given **configuration**. So powerful.

## Dependencies

As I said, this post is about configuration. We are going to put together a bunch of libraries so let's start defining the dependencies.

First and most important: we need to add Sprockets. Although it manages the dependencies and give us access to them, it's really handy to have some **helper** functions to make access more declarative. Rails defines some helpers, and we should do the same. Fortunately, [Pete Browne](https://twitter.com/petebrowne) has developed a [gem](https://github.com/petebrowne/sprockets-helpers) which defines all helpers we need, let's add it too.

In order to compress and minimize assets for production, We'll add [YUI compressor](https://github.com/sstephenson/ruby-yui-compressor) for CSS, and [Closure](https://github.com/google/closure-compiler) for Javascript. I'm also going to include [Compass](http://compass-style.org/), a must-have for my projects. You can check the [Gemfile](https://github.com/javivelasco/sinatra-badass-asset-pipeline/blob/master/Gemfile) of the [example project](https://github.com/javivelasco/sinatra-badass-asset-pipeline) I've uploaded to Github to review the full dependencies.

## Asset Pipeline module

Get yourself a Sinatra boilerplate, or start with a [modular](http://www.sinatrarb.com/intro.html#Sinatra::Base%20-%20Middleware,%20Libraries,%20and%20Modular%20Apps) basic application. Remember you can check my own [example](https://github.com/javivelasco/sinatra-badass-asset-pipeline/) if you want to start from there.

We are going to set the configuration in a module that will be **imported** by the base application. As a Sinatra modular app, our module should define a `register` method, so the app is obtained inside the lambda block where the configuration will be set.

### General configuration

First thing we need to do is to create an **instance** of `Sprockets::Environment` and initialize it with the root path of the app to access and serve assets.

Then let's set the **load path** which is an ordered list of directories that Sprockets uses to search for assets. We'll do this through `append_path` method of the Sprockets instance.

Now we need to specify an array with the assets bundles and the rest of files that would be precompiled. Each asset bundle is a javascript or stylesheet file that specifies, by using a simple special syntax, a bunch of dependencies (more Javascript and CSS files).

So far so good. This is our configuration at this point:


```ruby
module AssetPipeline extend self
  def registered(app)
    app.set :assets, assets = Sprockets::Environment.new(app.settings.root)
    app.set :assets_path, -> { File.join(public_folder, "assets") }
    app.set :assets_precompile, %w(application.js application.css application-modernizr.js application-api.js *.png *.jpg *.svg *.eot *.ttf *.woff)

    assets.append_path('assets/fonts')
    assets.append_path('assets/javascripts')
    assets.append_path('assets/stylesheets')
    assets.append_path('assets/images')
    assets.append_path('vendor/assets/javascripts')

    # ...
  end
end
```

### Configuring for environments

Obviously, we need to have a different configuration to serve the assets in different environments. For example, in development we would like to serve each asset dependency file **separated** in order to make easier debugging. In production we'll probably want to serve assets through a CDN, and we would probably want them to be **compressed**, **unified** and **minimized**.

#### Configuration for development

Sprockets is capable of serving assets through HTTP but it's not configured yet. Let's make it work. Remember that we are in a Sinatra app and we can define a route at `/assets/*` as usual. The trick is to catch the request and map it to our Sprockets instance, stripping the base path. The instance will return the asset. For instance, calling to `GET /assets/base.css` will search for and return `base.css`. If base is defined as a SASS file, it will be compiled to CSS for you.

That drives us to another question. In each request Sprockets is going to compile assets that were developed using a preprocessor; it can turn into a performance issue as the application grows. We can solve this problem by setting a **cache** in order to compile just what changed from the last request. Let's see the full configuration for development:

```ruby
module AssetPipeline extend self
  def registered(app)
    # ...
    app.configure :development do
      assets.cache = Sprockets::Cache::FileStore.new('./tmp')
      app.get '/assets/*' do
        env['PATH_INFO'].sub!(%r{^/assets}, '')
        settings.assets.call(env)
      end
    end
    # ...
  end
end
```

#### Configuration for production

When we are in a production environment, assets will be compiled and automatically moved to a `public` directory of our application. Because of that, we no longer need to configure a route to serve assets, neither a cache. It's worthy to mention that a cache can be set anyway in order to have faster **deployments** but it's not needed.

What it's actually a must is to set the compressors for CSS and Javascript. It can be easily done with:

```ruby
module AssetPipeline extend self
  def registered(app)
    # ...
    app.configure :production do
      assets.js_compressor  = Closure::Compiler.new
      assets.css_compressor = YUI::CssCompressor.new
    end
    # ...
  end
end
```

The application is now ready yo precompile assets for production.


### Setting up Helpers

We have mentioned previously that Rails defines helpers to manage the assets. Thanks to those helpers it's really easy to **reference** images, stylesheets and javascript files all across our application. We already included a gem to define this helpers but we still need to add configuration.

In this case is kind of intuitive. We just need set our Sprockets instance, the asset path prefix, a flag to tell if we want to have debugging information for compiled files available, where is located the compiling manifesto , and if we added a digest at the end of the asset file names in order to make them unique.

These two last options are included when we are in production, while the debug information should be available only during development. After the configuration is set, we need to add the Helper module to the application. Said so, the configuration can be as follows:

```ruby
module AssetPipeline extend self
  def registered(app)
    # ...
    Sprockets::Helpers.configure do |config|
      config.environment = assets
      config.prefix      = '/assets'
      config.debug       = true if app.development?
      if app.production?
        config.digest      = true
        config.manifest    = Sprockets::Manifest.new(assets, File.join(app.assets_path, "manifesto.json"))
      end
    end

    app.helpers Sprockets::Helpers
    # ...
  end
end
```

Then you'll be able to, for example, include all the Javascript files in your application by setting in `index.haml` template `= javascript_tag 'application'`. In production environment this function will return a script tag including `application.js`. For develoment it will return multiple script tags, one for each dependency. The same happens for stylesheets and other assets.

### Extra ball: Compass

Compass is an open-source CSS Authoring Framework which gives reusable CSS patterns, mixins for CSS3 vendor prefixes, typographic rhythms, etc. It's really useful and is easy to configure and integrate with Sprockets. All we need is to tell Compass where are located our images and, in order to use the sprite generation feature, where do we want to generate sprites. The configuration is as easy as this:

```ruby
module AssetPipeline extend self
  def registered(app)
    Compass.configuration do |config|
      config.images_dir = 'assets'
      config.images_path = File.join(app.root, 'assets/images')
      config.generated_images_path = File.join(app.root, 'assets/images')
    end
  end
end
```

### Assets precompile for production

We need to define a Rake task that will be executed on deploying to production. This task is responsible for compiling, unifying and compressing our asset dependencies. Let's see how can we set up the task, it's easy.

We are going to have two tasks. One for precompiling the assets, and a second one to cleanup generated assets. For the first task we need to have an instance of Sprockets, and we also need to create a manifesto file which will indicate the mapping between dependencies and compiled files. Finally, we just need to run the compile method over the manifest file, giving the array of files that should be compiled as argument.

Does it sound familiar to you? Everything is already defined at our pipeline module which is included in the base application file! Let's grab that module and therefrom set the task, keeping this way the same configuration. The result can be something like this:

```ruby
require 'rake/tasklib'
require 'rake/sprocketstask'
require './app'

namespace :assets do
  desc 'Precompile assets'
  task :precompile do
    environment = BadassExample.assets
    manifest = Sprockets::Manifest.new(environment.index, File.join(BadassExample.assets_path, "manifesto.json"))
    manifest.compile(BadassExample.assets_precompile)
  end

  desc "Clean assets"
  task :clean do
    FileUtils.rm_rf(BadassExample.assets_path)
  end
end
```

As you see, we defined also a second task to delete all generated files. It's important to notice that in order to compile and compress the assets, the task has to be called within a production environment. Test it like:

```bash
$ RACK_ENV=production rake assets:precompile
```

And you will have all compiled assets into the public directory. Best thing is that when you run your application within production environment with `RACK_ENV=production rackup`, Sprocket manages the dependencies and will serve you the production assets. If with the same configuration you lift up the app with just `rackup`, you'll be in a development environment, and the assets served by Sprockets will be separated and non compressed with development information added.

## Summary

It's not easy to write a post about configuration, a lot of concepts should be kept in mind. In this article we saw what is Sprockets, and how can we configure it with Sprockets Helpers to have a working asset pipeline similar to Rails'. We saw how can it be configured for both development and production environments, and to turn your almost non-existent Sinatra Pipeline into a Real Badass Pipeline.

Good luck! and remember you can reach me through @javivelasco at Twitter with any inquiries or comments.
