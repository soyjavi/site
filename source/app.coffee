window.soyjavi = soyjavi = version: "1.02.06"

$ ->
  soyjavi.dom =
    document: $ document
    landing : $ ".landing"
    text    : $ ".landing > *:not(.more)"
    more    : $ ".landing > .more"

  $(document).on "scroll", (event) ->
    percent = (soyjavi.dom.document.scrollTop() * 100) / soyjavi.dom.landing.height()
    if percent > 10
      soyjavi.dom.more.addClass "hide"
    else
      soyjavi.dom.more.removeClass "hide"
    if percent > 25
      soyjavi.dom.text.addClass "hide"
    else
      soyjavi.dom.text.removeClass "hide"
