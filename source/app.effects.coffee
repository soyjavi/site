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
    percent = (_el.document.scrollTop() * 100) / _el.landing.height()
    if percent > 10
      _el.more.addClass "hide"
    else
      _el.more.removeClass "hide"

    if percent > 25
      _el.header.addClass "active"
      _el.landing.addClass "hide"
      _el.landing.parent().removeClass "scroll"
    else
      _el.landing.removeClass "hide"
      _el.header.removeClass "active"
      _el.landing.parent().addClass "scroll"

  resize: resize
  scroll: scroll
