$ ->
  $(window).stellar()
  header = $("header")
  $(document).on "scroll", (event) ->
    if $(event.target).scrollTop() > 512
      header.addClass "active"
    else
      header.removeClass "active"
