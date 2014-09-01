window.Soyjavi = Soyjavi = version: "1.09.01"

$ ->
  do Soyjavi.effect.resize
  $(window).on "resize", Soyjavi.effect.resize
  $(document).on "scroll", Soyjavi.effect.scroll
  # Thirds
  $(window).stellar()
