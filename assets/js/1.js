/* jquery.poptrox.js v2.5.2-dev | (c) @ajlkn | github.com/ajlkn/jquery.poptrox | MIT licensed */
!(function (e) {
    (e.fn.poptrox_disableSelection = function () {
        return e(this).css("user-select", "none").css("-khtml-user-select", "none").css("-moz-user-select", "none").css("-o-user-select", "none").css("-webkit-user-select", "none");
    }),
        (e.fn.poptrox = function (o) {
            function t() {
                (i = e(window).width()), (s = e(window).height() + r.windowHeightPad);
                var o = Math.abs(x.width() - x.outerWidth()),
                    t = Math.abs(x.height() - x.outerHeight()),
                    p = (w.width(), w.height(), i - 2 * r.windowMargin - o),
                    n = s - 2 * r.windowMargin - t;
                x.css("min-width", r.popupWidth).css("min-height", r.popupHeight), v.children().css("max-width", p).css("max-height", n);
            }
            if (0 == this.length) return e(this);
            if (this.length > 1) {
                for (var p = 0; p < this.length; p++) e(this[p]).poptrox(o);
                return e(this);
            }
            var i,
                s,
                r = e.extend(
                    {
                        preload: !1,
                        baseZIndex: 1e3,
                        fadeSpeed: 300,
                        overlayColor: "#000000",
                        overlayOpacity: 0.6,
                        overlayClass: "poptrox-overlay",
                        windowMargin: 50,
                        windowHeightPad: 0,
                        selector: "a",
                        caption: null,
                        parent: "body",
                        popupSpeed: 300,
                        popupWidth: 200,
                        popupHeight: 100,
                        popupIsFixed: !1,
                        useBodyOverflow: !1,
                        usePopupEasyClose: !0,
                        usePopupForceClose: !1,
                        usePopupLoader: !0,
                        usePopupCloser: !0,
                        usePopupCaption: !1,
                        usePopupNav: !1,
                        usePopupDefaultStyling: !0,
                        popupBackgroundColor: "#FFFFFF",
                        popupTextColor: "#000000",
                        popupLoaderTextSize: "2em",
                        popupCloserBackgroundColor: "#000000",
                        popupCloserTextColor: "#FFFFFF",
                        popupCloserTextSize: "20px",
                        popupPadding: 10,
                        popupCaptionHeight: 60,
                        popupCaptionTextSize: null,
                        popupBlankCaptionText: "(untitled)",
                        popupCloserText: "&#215;",
                        popupLoaderText: "&bull;&bull;&bull;&bull;",
                        popupClass: "poptrox-popup",
                        popupSelector: null,
                        popupLoaderSelector: ".loader",
                        popupCloserSelector: ".closer",
                        popupCaptionSelector: ".caption",
                        popupNavPreviousSelector: ".nav-previous",
                        popupNavNextSelector: ".nav-next",
                        onPopupClose: null,
                        onPopupOpen: null,
                    },
                    o
                ),
                n = e(this),
                a = e("body"),
                l = e('<div class="' + r.overlayClass + '"></div>'),
                u = e(window),
                d = [],
                h = 0,
                g = !1,
                f = new Array();
            r.usePopupLoader || (r.popupLoaderSelector = null),
                r.usePopupCloser || (r.popupCloserSelector = null),
                r.usePopupCaption || (r.popupCaptionSelector = null),
                r.usePopupNav || ((r.popupNavPreviousSelector = null), (r.popupNavNextSelector = null));
            var x;
            x = e(
                r.popupSelector
                    ? r.popupSelector
                    : '<div class="' +
                          r.popupClass +
                          '">' +
                          (r.popupLoaderSelector ? '<div class="loader">' + r.popupLoaderText + "</div>" : "") +
                          '<div class="pic"></div>' +
                          (r.popupCaptionSelector ? '<div class="caption"></div>' : "") +
                          (r.popupCloserSelector ? '<span class="closer">' + r.popupCloserText + "</span>" : "") +
                          (r.popupNavPreviousSelector ? '<div class="nav-previous"></div>' : "") +
                          (r.popupNavNextSelector ? '<div class="nav-next"></div>' : "") +
                          "</div>"
            );
            var v = x.find(".pic"),
                w = e(),
                b = x.find(r.popupLoaderSelector),
                m = x.find(r.popupCaptionSelector),
                C = x.find(r.popupCloserSelector),
                y = x.find(r.popupNavNextSelector),
                S = x.find(r.popupNavPreviousSelector),
                P = y.add(S);
            if (
                r.usePopupDefaultStyling &&
                (x
                    .css("background", r.popupBackgroundColor)
                    .css("color", r.popupTextColor)
                    .css("padding", r.popupPadding + "px"),
                m.length > 0 &&
                    (x.css("padding-bottom", r.popupCaptionHeight + "px"),
                    m
                        .css("position", "absolute")
                        .css("left", "0")
                        .css("bottom", "0")
                        .css("width", "100%")
                        .css("text-align", "center")
                        .css("height", r.popupCaptionHeight + "px")
                        .css("line-height", r.popupCaptionHeight + "px"),
                    r.popupCaptionTextSize && m.css("font-size", popupCaptionTextSize)),
                C.length > 0 &&
                    C.html(r.popupCloserText)
                        .css("font-size", r.popupCloserTextSize)
                        .css("background", r.popupCloserBackgroundColor)
                        .css("color", r.popupCloserTextColor)
                        .css("display", "block")
                        .css("width", "40px")
                        .css("height", "40px")
                        .css("line-height", "40px")
                        .css("text-align", "center")
                        .css("position", "absolute")
                        .css("text-decoration", "none")
                        .css("outline", "0")
                        .css("top", "0")
                        .css("right", "-40px"),
                b.length > 0 &&
                    b
                        .html("")
                        .css("position", "relative")
                        .css("font-size", r.popupLoaderTextSize)
                        .on("startSpinning", function (o) {
                            var t = e("<div>" + r.popupLoaderText + "</div>");
                            t
                                .css("height", Math.floor(r.popupHeight / 2) + "px")
                                .css("overflow", "hidden")
                                .css("line-height", Math.floor(r.popupHeight / 2) + "px")
                                .css("text-align", "center")
                                .css("margin-top", Math.floor((x.height() - t.height() + (m.length > 0 ? m.height() : 0)) / 2))
                                .css("color", r.popupTextColor ? r.popupTextColor : "")
                                .on("xfin", function () {
                                    t.fadeTo(300, 0.5, function () {
                                        t.trigger("xfout");
                                    });
                                })
                                .on("xfout", function () {
                                    t.fadeTo(300, 0.05, function () {
                                        t.trigger("xfin");
                                    });
                                })
                                .trigger("xfin"),
                                b.append(t);
                        })
                        .on("stopSpinning", function (e) {
                            var o = b.find("div");
                            o.remove();
                        }),
                2 == P.length)
            ) {
                P.css("font-size", "75px")
                    .css("text-align", "center")
                    .css("color", "#fff")
                    .css("text-shadow", "none")
                    .css("height", "100%")
                    .css("position", "absolute")
                    .css("top", "0")
                    .css("opacity", "0.35")
                    .css("cursor", "pointer")
                    .css("box-shadow", "inset 0px 0px 10px 0px rgba(0,0,0,0)")
                    .poptrox_disableSelection();
                var k, T;
                r.usePopupEasyClose ? ((k = "100px"), (T = "100px")) : ((k = "75%"), (T = "25%")),
                    y.css("right", "0").css("width", k).html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; right: 0; margin-top: -50px;">&gt;</div>'),
                    S.css("left", "0").css("width", T).html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; left: 0; margin-top: -50px;">&lt;</div>');
            }
            return (
                u.on("resize orientationchange", function () {
                    t();
                }),
                m.on("update", function (e, o) {
                    (o && 0 != o.length) || (o = r.popupBlankCaptionText), m.html(o);
                }),
                C.css("cursor", "pointer").on("click", function (e) {
                    return e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_close"), !0;
                }),
                y.on("click", function (e) {
                    e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_next");
                }),
                S.on("click", function (e) {
                    e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_previous");
                }),
                l
                    .css("position", "fixed")
                    .css("left", 0)
                    .css("top", 0)
                    .css("z-index", r.baseZIndex)
                    .css("width", "100%")
                    .css("height", "100%")
                    .css("text-align", "center")
                    .css("cursor", "pointer")
                    .appendTo(r.parent)
                    .prepend('<div style="display:inline-block;height:100%;vertical-align:middle;"></div>')
                    .append('<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:' + r.overlayColor + ";opacity:"0.7";filter:alpha(opacity=" + 100 * r.overlayOpacity + ');"></div>')
                    .hide()
                    .on("touchmove", function (e) {
                        return !1;
                    })
                    .on("click", function (e) {
                        e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_close");
                    }),
                x
                    .css("display", "inline-block")
                    .css("vertical-align", "middle")
                    .css("position", "relative")
                    .css("z-index", 1)
                    .css("cursor", "auto")
                    .appendTo(l)
                    .hide()
                    .on("poptrox_next", function () {
                        var e = h + 1;
                        e >= d.length && (e = 0), x.trigger("poptrox_switch", [e]);
                    })
                    .on("poptrox_previous", function () {
                        var e = h - 1;
                        0 > e && (e = d.length - 1), x.trigger("poptrox_switch", [e]);
                    })
                    .on("poptrox_reset", function () {
                        t(), x.data("width", r.popupWidth).data("height", r.popupHeight), b.hide().trigger("stopSpinning"), m.hide(), C.hide(), P.hide(), v.hide(), w.attr("src", "").detach();
                    })
                    .on("poptrox_open", function (e, o) {
                        return g
                            ? !0
                            : ((g = !0),
                              r.useBodyOverflow && a.css("overflow", "hidden"),
                              r.onPopupOpen && r.onPopupOpen(),
                              x.addClass("loading"),
                              void l.fadeTo(r.fadeSpeed, 1, function () {
                                  x.trigger("poptrox_switch", [o, !0]);
                              }));
                    })
                    .on("poptrox_switch", function (o, p, i) {
                        var s;
                        if (!i && g) return !0;
                        if (
                            ((g = !0),
                            x.addClass("loading").css("width", x.data("width")).css("height", x.data("height")),
                            m.hide(),
                            w.attr("src") && w.attr("src", ""),
                            w.detach(),
                            (s = d[p]),
                            (w = s.object),
                            w.off("load"),
                            v.css("text-indent", "-9999px").show().append(w),
                            "ajax" == s.type
                                ? e.get(s.src, function (e) {
                                      w.html(e), w.trigger("load");
                                  })
                                : w.attr("src", s.src),
                            "image" != s.type)
                        ) {
                            var n, a;
                            (n = s.width),
                                (a = s.height),
                                "%" == n.slice(-1) && (n = (parseInt(n.substring(0, n.length - 1)) / 100) * u.width()),
                                "%" == a.slice(-1) && (a = (parseInt(a.substring(0, a.length - 1)) / 100) * u.height()),
                                w
                                    .css("position", "relative")
                                    .css("outline", "0")
                                    .css("z-index", r.baseZIndex + 100)
                                    .width(n)
                                    .height(a);
                        }
                        b.trigger("startSpinning").fadeIn(300),
                            x.show(),
                            r.popupIsFixed
                                ? (x.removeClass("loading").width(r.popupWidth).height(r.popupHeight),
                                  w.load(function () {
                                      w.off("load"),
                                          b.hide().trigger("stopSpinning"),
                                          m.trigger("update", [s.captionText]).fadeIn(r.fadeSpeed),
                                          C.fadeIn(r.fadeSpeed),
                                          v
                                              .css("text-indent", 0)
                                              .hide()
                                              .fadeIn(r.fadeSpeed, function () {
                                                  g = !1;
                                              }),
                                          (h = p),
                                          P.fadeIn(r.fadeSpeed);
                                  }))
                                : w.load(function () {
                                      t(), w.off("load"), b.hide().trigger("stopSpinning");
                                      var e = w.width(),
                                          o = w.height(),
                                          i = function () {
                                              m.trigger("update", [s.captionText]).fadeIn(r.fadeSpeed),
                                                  C.fadeIn(r.fadeSpeed),
                                                  v
                                                      .css("text-indent", 0)
                                                      .hide()
                                                      .fadeIn(r.fadeSpeed, function () {
                                                          g = !1;
                                                      }),
                                                  (h = p),
                                                  P.fadeIn(r.fadeSpeed),
                                                  x.removeClass("loading").data("width", e).data("height", o).css("width", "auto").css("height", "auto");
                                          };
                                      e == x.data("width") && o == x.data("height") ? i() : x.animate({ width: e, height: o }, r.popupSpeed, "swing", i);
                                  }),
                            "image" != s.type && w.trigger("load");
                    })
                    .on("poptrox_close", function () {
                        return g && !r.usePopupForceClose
                            ? !0
                            : ((g = !0),
                              x.hide().trigger("poptrox_reset"),
                              r.onPopupClose && r.onPopupClose(),
                              void l.fadeOut(r.fadeSpeed, function () {
                                  r.useBodyOverflow && a.css("overflow", "auto"), (g = !1);
                              }));
                    })
                    .trigger("poptrox_reset"),
                r.usePopupEasyClose
                    ? (m.on("click", "a", function (e) {
                          e.stopPropagation();
                      }),
                      x.css("cursor", "pointer").on("click", function (e) {
                          e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_close");
                      }))
                    : x.on("click", function (e) {
                          e.stopPropagation();
                      }),
                u.keydown(function (e) {
                    if (x.is(":visible"))
                        switch (e.keyCode) {
                            case 37:
                            case 32:
                                if (r.usePopupNav) return x.trigger("poptrox_previous"), !1;
                                break;
                            case 39:
                                if (r.usePopupNav) return x.trigger("poptrox_next"), !1;
                                break;
                            case 27:
                                return x.trigger("poptrox_close"), !1;
                        }
                }),
                n.find(r.selector).each(function (o) {
                    var t,
                        p,
                        i = e(this),
                        s = i.find("img"),
                        n = i.data("poptrox");
                    if ("ignore" != n && i.attr("href")) {
                        if (((t = { src: i.attr("href"), captionText: s.attr("title"), width: null, height: null, type: null, object: null, options: null }), r.caption)) {
                            if ("function" == typeof r.caption) c = r.caption(i);
                            else if ("selector" in r.caption) {
                                var a;
                                (a = i.find(r.caption.selector)), "attribute" in r.caption ? (c = a.attr(r.caption.attribute)) : ((c = a.html()), r.caption.remove === !0 && a.remove());
                            }
                        } else c = s.attr("title");
                        if (((t.captionText = c), n)) {
                            var l = n.split(",");
                            0 in l && (t.type = l[0]), 1 in l && ((p = l[1].match(/([0-9%]+)x([0-9%]+)/)), p && 3 == p.length && ((t.width = p[1]), (t.height = p[2]))), 2 in l && (t.options = l[2]);
                        }
                        if (!t.type)
                            switch (((p = t.src.match(/\/\/([a-z0-9\.]+)\/.*/)), (!p || p.length < 2) && (p = [!1]), p[1])) {
                                case "api.soundcloud.com":
                                    t.type = "soundcloud";
                                    break;
                                case "youtu.be":
                                    t.type = "youtube";
                                    break;
                                case "vimeo.com":
                                    t.type = "vimeo";
                                    break;
                                case "wistia.net":
                                    t.type = "wistia";
                                    break;
                                case "bcove.me":
                                    t.type = "bcove";
                                    break;
                                default:
                                    t.type = "image";
                            }
                        switch (((p = t.src.match(/\/\/[a-z0-9\.]+\/(.*)/)), t.type)) {
                            case "iframe":
                                (t.object = e('<iframe src="" frameborder="0"></iframe>')),
                                    t.object
                                        .on("click", function (e) {
                                            e.stopPropagation();
                                        })
                                        .css("cursor", "auto"),
                                    (t.width && t.height) || ((t.width = "600"), (t.height = "400"));
                                break;
                            case "ajax":
                                (t.object = e('<div class="poptrox-ajax"></div>')),
                                    t.object
                                        .on("click", function (e) {
                                            e.stopPropagation();
                                        })
                                        .css("cursor", "auto")
                                        .css("overflow", "auto"),
                                    (t.width && t.height) || ((t.width = "600"), (t.height = "400"));
                                break;
                            case "soundcloud":
                                (t.object = e('<iframe scrolling="no" frameborder="no" src=""></iframe>')),
                                    (t.src = "//w.soundcloud.com/player/?url=" + escape(t.src) + (t.options ? "&" + t.options : "")),
                                    (t.width = "600"),
                                    (t.height = "166");
                                break;
                            case "youtube":
                                (t.object = e('<iframe src="" frameborder="0" allowfullscreen="1"></iframe>')),
                                    (t.src = "//www.youtube.com/embed/" + p[1] + (t.options ? "?" + t.options : "")),
                                    (t.width && t.height) || ((t.width = "800"), (t.height = "480"));
                                break;
                            case "vimeo":
                                (t.object = e('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>')),
                                    (t.src = "//player.vimeo.com/video/" + p[1] + (t.options ? "?" + t.options : "")),
                                    (t.width && t.height) || ((t.width = "800"), (t.height = "480"));
                                break;
                            case "wistia":
                                (t.object = e('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>')),
                                    (t.src = "//fast.wistia.net/" + p[1] + (t.options ? "?" + t.options : "")),
                                    (t.width && t.height) || ((t.width = "800"), (t.height = "480"));
                                break;
                            case "bcove":
                                (t.object = e('<iframe src="" frameborder="0" allowFullScreen="1" width="100%"></iframe>')),
                                    (t.src = "//bcove.me/" + p[1] + (t.options ? "?" + t.options : "")),
                                    (t.width && t.height) || ((t.width = "640"), (t.height = "360"));
                                break;
                            default:
                                if (((t.object = e('<img src="" alt="" style="vertical-align:bottom" />')), r.preload)) {
                                    var p = document.createElement("img");
                                    (p.src = t.src), f.push(p);
                                }
                                (t.width = i.attr("width")), (t.height = i.attr("height"));
                        }
                        "file:" == window.location.protocol && t.src.match(/^\/\//) && (t.src = "http:" + t.src),
                            d.push(t),
                            s.removeAttr("title"),
                            i
                                .removeAttr("href")
                                .css("cursor", "pointer")
                                .css("outline", 0)
                                .on("click", function (e) {
                                    e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_open", [o]);
                                });
                    }
                }),
                n.prop("_poptrox", r),
                n
            );
        });
})(jQuery);
