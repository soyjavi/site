"use strict"

Yoi     = require "yoi"

module.exports = (server) ->

  server.get "/", (request, response) ->
    site = new Yoi.Site(request, response)
    site.template "landing", page: "landing"
