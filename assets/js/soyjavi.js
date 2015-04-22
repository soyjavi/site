/**
 * soyjavi - ...creating stuff for others
 * @version v1.02.05
 * @link    http://soyjavi.com
 * @author   ()
 * @license 
 */
(function(){var soyjavi;window.soyjavi=soyjavi={version:"1.04.22"},$(function(){var el;return soyjavi.dom={document:$(document),height:window.innerHeight||document.documentElement.offsetHeight,header:$("header"),intro:$("#intro"),content:function(){var _i,_len,_ref,_results;for(_ref=$("section:not(#intro)"),_results=[],_i=0,_len=_ref.length;_len>_i;_i++)el=_ref[_i],_results.push({el:$(el),px:el.offsetTop});return _results}()},$(document).on("scroll",function(){var item,percent,px,_i,_j,_len,_len1,_ref,_ref1,_results;for(px=soyjavi.dom.document.scrollTop(),percent=100*px/soyjavi.dom.intro.height(),console.log(px,percent),percent>95?soyjavi.dom.header.addClass("active"):soyjavi.dom.header.removeClass("active"),soyjavi.dom.intro.children(":not(div)").css("opacity",(100-percent)/140),_ref=soyjavi.dom.content,_i=0,_len=_ref.length;_len>_i;_i++)item=_ref[_i],console.log(item.px);for(px+=soyjavi.dom.height/2,_ref1=soyjavi.dom.content,_results=[],_j=0,_len1=_ref1.length;_len1>_j;_j++)item=_ref1[_j],px>=item.px&&_results.push(item.el.addClass("active"));return _results})})}).call(this);