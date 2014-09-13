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
      _el.landing.css "opacity", "0"
      _el.landing.parent().removeClass "scroll"

    else
      _el.landing.css "opacity", 1
      _el.header.removeClass "active"
      _el.landing.parent().addClass "scroll"

  resize: resize
  scroll: scroll
