---
layout:     post
title:      "Nested exceptions cause in Ruby"
date:       2014-12-07
categories: sinatra ruby
permalink:  /blog/nested-exception-cause-in-ruby
---
I like to write a blog post when I figure out something that is **difficult** to find online. Writing for the sake of writing is meaningless for me, that's why there are not too much blog posts here. Anyway, a couple of days ago I learned about a Ruby exception function used in [Honeybadger](http://honeybadger.io/) that was screwing up our error tracking at [Traity](www.traity.com).

Say you have a general exception `GeneralError` in your code that has been rescued. Inside the code that handles the rescue it's possible to raise **another** exception `SpecificError` that will not be handled so you want it to reach the exception middleware. Something like this:

```ruby
def error_raise_function
  raise GeneralError
  rescue GeneralError
    # Some handling code
    raise SpecificError
end
```

You might think this is not a good practice. If both are custom exceptions you can think we are using exceptions for flow control (probably not a good use of exceptions). But what if the `GeneralError` is raised by a **third party** library such as [AWS SDK](https://github.com/aws/aws-sdk-ruby)? Well, we wanted HoneyBadger to track the `SpecificError`, and to nest all similar errors in the same issue. The problem was that every exception that occured inside the rescue `GeneralError` block was being grouped in a `GeneralError` issue (the rescued exception). What the hell? Well, if you take a look into [HoneyBadger module](https://github.com/honeybadger-io/honeybadger-ruby/blob/4068e809b227504e9fc77861174dd4072c0f0725/lib/honeybadger.rb) line 192 you will see this code:

```ruby
def unwrap_exception(exception)
  return exception unless configuration.unwrap_exceptions
  exception.respond_to?(:original_exception) && exception.original_exception ||
  exception.respond_to?(:continued_exception) && exception.continued_exception ||
  exception.respond_to?(:cause) && exception.cause ||
  exception
end
```

In our case, the unwrap of the exception was returning the value of `exception.cause` and, the cause of the `SpecificError` was the `OriginalError`. That means that, at least with Honeybadger, all nested exceptions will result in a nesting named as the **original exception**:

```ruby
def foo
  error_raise_function()
  rescue SpecificError => e
    puts e.cause
end

foo() # OriginalError will be printed
```

Be aware of that feature. Probably it's the wanted behavior for HoneyBadger but that was definitively not what we wanted. I think it should be **configurable** anyway but the workaround I did for our case before opening a pull request at [Github](www.github.com) was as follows:

```ruby
# honeybadger.rb
require 'honeybadger'

module Honeybadger
  class << self
    private
    def unwrap_exception(exception)
      exception
    end
  end
end

Honeybadger.configure do |config|
  config.api_key = ENV['HONEYBADGER_API_KEY']
end
```

Just by **redefining** the method and returning the exception that reached the middleware should be enough. I hope you to find this post useful!
