"use strict"

module.exports = (zen) ->

  zen.get "/", (request, response) ->
    response.page "base", page: "landing", ["landing"]
    # site = new Yoi.Site(request, response)
    # site.template "landing", page: "landing"
