/**
 * soyjavi - 
 * @version v0.09.16
 * @link    http://soyjavi.com
 * @author   ()
 * @license 
 */
(function(){var Soyjavi;window.Soyjavi=Soyjavi={version:"1.09.01"},$(function(){return Soyjavi.effect.resize(),$(window).on("resize",Soyjavi.effect.resize),$(document).on("scroll",Soyjavi.effect.scroll),$(window).stellar()}),Soyjavi.effect=function(){var resize,scroll,_cache,_el;return _cache={},_el={page:$(window),document:$(document),header:$("header"),landing:$(".landing > .wrapper"),more:$(".landing .more")},resize=function(){return _el.landing.height($(window).height())},scroll=function(){var percent;return percent=100*_el.document.scrollTop()/_el.landing.height(),percent>10?_el.more.addClass("hide"):_el.more.removeClass("hide"),percent>25?(_el.header.addClass("active"),_el.landing.css("opacity","0"),_el.landing.parent().removeClass("scroll")):(_el.landing.css("opacity",1),_el.header.removeClass("active"),_el.landing.parent().addClass("scroll"))},{resize:resize,scroll:scroll}}(Soyjavi)}).call(this);