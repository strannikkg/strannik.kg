// jQuery.youtubeVideo
// Version: 1.1.4
// Repo: https://github.com/WahaWaher/youtubevideo-js
// Author: Sergey Kravchenko

! function($) {
  function onVideoInfoReady(t) {
    var e = 0,
      o = setInterval(function() {
        e > 500 && clearInterval(o), window.youtubeIDsInfo && (t(), clearInterval(o)), e++
      }, 50)
  }

  function randInt(t, e) {
    var o = t - .5 + Math.random() * (e - t + 1);
    return o = Math.round(o)
  }

  function getVideoID(t) {
    return t.match(/http/gim) ? t.split("?v=")[1].split("?t=")[0].split("&t=")[0] : t
  }
  var methods = {
    init: function(options) {
      var defaults = $.extend(!0, {
        layout: {
          wrap: $("<div />", {
            class: "ytb-video-wrap"
          }),
          container: $("<div />", {
            class: "ytb-video-container"
          }),
          iframe: $("<iframe />", {
            class: "ytb-video-iframe"
          }),
          button: $("<div />", {
            class: "ytb-video-play-button"
          }).append('<svg viewBox="0 0 68 48"><path class="ytb-video-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>')
        },
        aspectRatio: 56.25,
        cover: "mqdefault",
        parametrs: "autoplay=1&autohide=1",
        playEvent: "click",
        playMode: "block",
        type: "video",
        api: "AIzaSyCfv3PpumEX60bKZ7flLM3uPTfW9I2u-Zc",
        duration: !1,
        title: !1,
        description: !1,
        beforeInit: function() {},
        afterInit: function() {},
        beforeLoadIframe: function() {},
        afterLoadIframe: function() {},
        afterLoadCover: function() {}
      }, $.fn.youtubeVideo.defaults);
      return this.each(function() {
        function createFirstMarkup() {
          $ths.addClass("ytb-video"), layout.container && (layout.container = layout.container.clone().appendTo($ths)), layout.button && (layout.button = layout.button.clone().appendTo(sets.layout.container)), layout.wrap && (layout.container.wrap(layout.wrap.clone()), layout.wrap = layout.container.parent()), sets.aspectRatio && sets.aspectRatio > 0 && sets.aspectRatio <= 100 && layout.wrap.css({
            "padding-bottom": sets.aspectRatio + "%",
            position: "relative"
          }), layout.iframe && (layout.iframe = layout.iframe.clone()), sets.api && getApiInfo();
          var t = new Image;
          if (sets.cover && "string" == typeof sets.cover && sets.cover.indexOf("http") + 1) t.src = sets.cover, t.onload = function() {
            layout.container.css("background-image", "url(" + sets.cover + ")"), sets.afterLoadCover.call($ths, sets)
          };
          else if (sets.cover && "string" == typeof sets.cover && sets.cover.indexOf("default") + 1) {
            var e = "https://i.ytimg.com/vi/" + sets._videoID + "/" + sets.cover + ".jpg";
            t.src = e, t.onload = function() {
              sets.layout.container.css("background-image", "url(" + e + ")"), sets.afterLoadCover.call($ths, sets)
            }
          } else Array.isArray(sets.cover) && sets.api ? onVideoInfoReady(function() {
            var e, o, a;
            $(window.youtubeIDsInfo.items).each(function(t, o) {
              o.id != sets._videoID || (e = o.snippet.thumbnails)
            }), $.each(sets.cover, function(t, s) {
              if (!a) {
                if (s.indexOf("http") + 1) return o = s, void(a = !0);
                var i = s;
                $.each(e, function(t, e) {
                  if (e.url.indexOf("/" + i + ".jpg") + 1) return o = e.url, void(a = !0)
                })
              }
            }), o && (t.src = o, t.onload = function() {
              sets.layout.container.css("background-image", "url(" + o + ")"), sets.afterLoadCover.call($ths, sets)
            })
          }) : !1 === window.youtubeIDsInfo && (t.src = "https://i.ytimg.com/vi/" + sets._videoID + "/mqdefault.jpg", t.onload = function() {
            sets.layout.container.css("background-image", "url(" + t.src + ")"), sets.afterLoadCover.call($ths, sets)
          });
          sets.duration && sets.api && "video" == sets.type && onVideoInfoReady(function() {
            var t, e = !1;
            if ($(window.youtubeIDsInfo.items).each(function(t, o) {
                return o.id != sets._videoID ? void 0 : (e = t, !1)
              }), e || 0 == e) {
              t = formatDate(window.youtubeIDsInfo.items[e].contentDetails.duration);
              var o = $("<span/>", {
                class: "ytb-video-duration"
              }).append($("<span/>", {
                class: "ytb-video-duration-text",
                text: t
              }));
              sets.layout.container.append(o)
            }
          }), sets.title && sets.api && "video" == sets.type && onVideoInfoReady(function() {
            window.youtubeIDsInfo.firstTitleCheck || ($(window.youtubeIDsInfo.items).each(function(t, e) {
              var o = e.id,
                a = e.snippet.title;
              $("[data-ytb-title-id]").each(function(t, e) {
                o == $(e).attr("data-ytb-title-id") && $(this).text(a)
              })
            }), window.youtubeIDsInfo.firstTitleCheck = !0)
          }), sets.description && sets.api && "video" == sets.type && onVideoInfoReady(function() {
            window.youtubeIDsInfo.firstDescrCheck || ($(window.youtubeIDsInfo.items).each(function(t, e) {
              var o = e.id,
                a = e.snippet.description;
              $("[data-ytb-descr-id]").each(function(t, e) {
                o == $(e).attr("data-ytb-descr-id") && $(this).text(a)
              })
            }), window.youtubeIDsInfo.firstDescrCheck = !0)
          })
        }

        function getApiInfo() {
          if (!sets.api || 1 == window.youtubeIDsCheck) return !1;
          if (window.youtubeIDsInfo) return window.youtubeIDsInfo;
          var t, e = "";
          return $("[data-ytb-video]").each(function(t, o) {
            -1 == e.indexOf($(o).attr("data-ytb-video")) && (e += getVideoID($(o).attr("data-ytb-video")) + ",")
          }), e = e.substring(0, e.length - 1), t = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=" + e + "&key=" + sets.api + "&fields=items(id,snippet(title,description,thumbnails),contentDetails(duration))", $.ajax({
            url: t,
            type: "GET",
            async: !0,
            success: function(t) {
              window.youtubeIDsInfo = t
            },
            error: function(t) {
              window.youtubeIDsInfo = !1
            }
          }), window.youtubeIDsCheck = !0, window.youtubeIDsInfo
        }

        function formatDate(t) {
          var e, o = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/,
            a = 0,
            s = 0,
            i = 0;
          if (o.test(t)) {
            var n = o.exec(t);
            n[1] && (a = Number(n[1])), n[2] && (s = Number(n[2])), n[3] && (i = Number(n[3])), e = 3600 * a + 60 * s + i
          }
          var r = new Date(null);
          r.setSeconds(e - 1);
          for (var d = r.toISOString().substr(11, 8), u = 0; u < 3; u++) "0" != d.charAt(0) && ":" != d.charAt(0) || (d = d.substr(1));
          return d
        }
        var $ths = $(this);
        if (1 == $ths.data("_init")) return !1;
        $ths.data("defaults", defaults), $ths.data("options", options);
        var data = $ths.attr("data-ytb-options");
        "object" != typeof(data = eval("(" + data + ")")) && (data = {}), $ths.data("settings", $.extend(!0, {}, defaults, options, data));
        var sets = $ths.data("settings"),
          layout = sets.layout;
        sets._videoID = getVideoID($ths.attr("data-ytb-video")), sets.beforeInit.call($ths, sets), createFirstMarkup(), sets._nsid = randInt(1e7, 99999999), "button" === sets.playMode ? sets.playElement = sets.layout.button : "block" === sets.playMode ? sets.playElement = $ths : sets.playElement = sets.playMode, sets.playEvent && sets.playElement.one(sets.playEvent + ".yv-" + sets._nsid, function() {
          methods.play.call($ths)
        }), $ths.data("_init", !0), sets.afterInit.call($ths, sets)
      }), $(this)
    },
    destroy: function() {
      if (!$(this).data("_init")) return !1;
      var t = $(this),
        e = t.data("settings");
      return e.layout.playEvent && e.playElement.off(e.playEvent + ".yv-" + e._nsid), e.layout.wrap.remove(), t.removeData(), $(this)
    },
    reinit: function(t) {
      var e = $(this),
        o = (e.data("settings"), e.data("options"));
      return methods.destroy.call(e), t && "object" == typeof t ? methods.init.call(e, t) : methods.init.call(e, o), $(this)
    },
    play: function() {
      function t(t) {
        a.container.remove(), a.iframe.appendTo(t).on("load", function() {
          o.afterLoadIframe.call(e, o)
        })
      }
      var e = $(this),
        o = e.data("settings"),
        a = o.layout;
      o.beforeLoadIframe.call(e, o);
      var s = "";
      return "video" == o.type ? (s = "https://www.youtube.com/embed/" + o._videoID, o.parametrs && (s += "?" + o.parametrs)) : "playlist" == o.type && (s = "https://www.youtube.com/embed/videoseries?list=" + o._videoID), a.iframe.attr({
        src: s,
        frameborder: 0,
        allowfullscreen: ""
      }), t(a.wrap && o.aspectRatio > 0 && o.aspectRatio < 100 ? e.find("." + o.layout.wrap.get(0).className) : e), $(this)
    }
  };
  $.fn.youtubeVideo = function(t) {
    return methods[t] ? methods[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void $.error("Method " + t + " does not exist on jQuery.youtubeVideo") : (methods.init.apply(this, arguments), this)
  }
}(jQuery);
