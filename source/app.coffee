window.soyjavi = soyjavi = version: "1.04.22"

$ ->
  soyjavi.dom =
    document  : $ document
    width     : window.innerWidth or document.documentElement.offsetWidth
    height    : window.innerHeight or document.documentElement.offsetHeight
    header    : $ "header"
    intro     : $ "#intro"
    content   : (el: $(el), px: el.offsetTop for el in $ "section:not(#intro)")

  $(document).on "scroll", (event) ->
    px = soyjavi.dom.document.scrollTop()
    percent = (px * 100) / soyjavi.dom.intro.height()
    # -- Header
    if percent > 95
      soyjavi.dom.header.addClass "active"
    else
      soyjavi.dom.header.removeClass "active"

    # -- Intro
    soyjavi.dom.intro.children(":not(div)").css "opacity", ((100 - percent) / 140)

    # -- Content
    if soyjavi.dom.width > 400
      px += (soyjavi.dom.height / 2)
      item.el.addClass "active" for item in soyjavi.dom.content when px >= item.px
