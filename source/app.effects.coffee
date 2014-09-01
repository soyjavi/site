Soyjavi.effect = do(s = Soyjavi) ->

  _cache = {}

  _el =
    page    : $ window
    document: $ document
    header  : $ "header"
    landing : $ ".landing > .wrapper"
    more    : $ ".landing .more"


  resize =->
    _el.landing.height $(window).height()

  scroll = (event) ->
    if _el.document.scrollTop() > (_el.page.height() / 10)
      _el.more.addClass "hide"
    else
      _el.more.removeClass "hide"

    if $(event.target).scrollTop() > (_el.page.height() / 3)
      _el.header.addClass "active"
    else
      _el.header.removeClass "active"

  resize: resize
  scroll: scroll
