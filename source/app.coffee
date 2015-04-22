window.soyjavi = soyjavi = version: "1.04.22"

$ ->
  soyjavi.dom =
    document  : $ document
    height    : window.innerHeight or document.documentElement.offsetHeight
    header    : $ "header"
    intro     : $ "#intro"
    content   : (el: $(el), px: el.offsetTop for el in $ "section:not(#intro)")

  $(document).on "scroll", (event) ->
    px = soyjavi.dom.document.scrollTop()
    percent = (px * 100) / soyjavi.dom.intro.height()
    console.log px, percent

    # -- Header
    if percent > 95
      soyjavi.dom.header.addClass "active"
    else
      soyjavi.dom.header.removeClass "active"

    # -- Intro
    soyjavi.dom.intro.children(":not(div)").css "opacity", ((100 - percent) / 140)

    # -- Content
    for item in soyjavi.dom.content
      console.log item.px

    px += (soyjavi.dom.height / 2)
    item.el.addClass "active" for item in soyjavi.dom.content when px >= item.px
