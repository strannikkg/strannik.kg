// jQuery FlexTabs - Version: 2.0.0
! function(t, e) {
  function n(t, e) {
    var n = this;
    n.it = t, n.init(e)
  }
  var a = n.prototype,
    i = "tabs",
    s = "accordion",
    o = "control",
    c = "controls",
    r = "content",
    d = "active",
    l = "flexTabs",
    f = "data-index",
    h = "data-id",
    u = "addClass",
    p = "<div/>";
  n.defaults = {
    type: i,
    breakpoint: 768,
    event: "click",
    fade: 200,
    responsive: !0,
    icon: '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1.000000, 1.000000)"><path d="M0,11 L22,11"></path><path d="M11,0 L11,22"></path></g></svg>',
    collapsible: !0,
    theme: "ft_theme_default",
    classes: {
      container: "ft_container",
      mtb: "ft_" + i,
      mac: "ft_" + s,
      contents: "ft_" + r + "s",
      nav: "ft_nav",
      tab: "ft_tab",
      tabIcon: "ft_tab_icon",
      content: "ft_" + r,
      icon: "ft_icon",
      active: d
    }
  }, n.instances = {}, a.init = function(a) {
    var i, s, o, c = this,
      r = c.it,
      l = t(r);
    if (!0 !== c.inited) {
      if (c[d] = {}, c.animation = "auto", c.nsid = __.getRndNum(1e4, 9e4), c.ns = "ft_" + c.nsid, c.id = l.attr("id") || c.ns, l.attr("id", c.id), n.instances[c.id] = c, c.origin = {
          attrs: {
            class: ""
          },
          html: l.html()
        }, t.each(r.attributes, function() {
          c.origin.attrs[this.name] = this.value
        }), s = c.defineSets(a), o = s.classes, c.origin.type = s.type, c.createMarkup(), c.defineMode(), t(e).on("resize." + c.ns, function() {
          c.defineMode()
        }), (i = s.event) && t(r).on(i + "." + c.ns, "." + o.tab, function(e) {
          var n, a = t(e.target);
          a.hasClass(o.tab) || (a = a.parents("." + o.tab)), n = Number(a.attr(f)) || 0, c.switch(n), e.preventDefault(), e.stopPropagation()
        }), !c.inited) {
        var h = location.hash,
          u = new RegExp(c.id + "=([a-zA-Z0-9.,-_]+)", "igm"),
          p = [];
        if (u.test(h)) {
          n.hasHash = !0, p = h.match(u)[0].replace(c.id + "=", "").split(","), c.closeAll(!0, 0);
          for (var v = p.length - 1; v >= 0; v--) Number(p[v]) && (p[v] = Number(p[v])), c.open(p[v], !1, 0)
        }
      }
      c.inited = !0, t(r).trigger("afterInit.ft", [c]), "none" == r.style.display && t(r).fadeIn(s.fade)
    }
  }, a.createMarkup = function() {
    function e(e) {
      t.each(v.navElems[e], function(m, g) {
        var b, y, w, M, x, g = t(g),
          E = v.cntElems.eq(m),
          k = g.hasClass(l[d]) ? 1 : 0,
          T = {};
        g[u](l.tab).attr(f, m), (w = g.attr("href")) ? (b = w.replace("#", ""), y = "href", g.attr("href", "#" + n.id + "=" + b)) : (M = g.attr(h)) ? (b = M, y = h) : (b = "ft_" + __.getRndNum(1e4, 9e4), y = h, g.attr(h, b)), E.length || (E = t(p).appendTo(v.cnt)), E.attr("id", b)[u](l[r]).attr(f, m).hide(), x = g.clone(!0, !0), e == i ? E.before(x) : e == s && v.nav.append(x), T = {
          id: b,
          attrID: y,
          index: m,
          control: {
            tabs: t(),
            accordion: t()
          },
          content: E,
          status: 0
        }, e == i ? (T[o][i] = g, T[o][s] = x, v.navElems[s] = v.navElems[s].add(x)) : e == s && (T[o][i] = x, T[o][s] = g, v.navElems[i] = v.navElems[i].add(x)), a.icon && T[o][s][u](l.tabIcon).append(t('<div class="' + l.icon + '">' + a.icon + "</div>")), v[c][m] = T, k && (n[d][m] = T)
      })
    }
    var n = this,
      a = n.sets,
      l = a.classes,
      v = n.layout = {
        controls: {},
        navElems: {}
      };
    switch (v.it = t(n.it)[u](l.container + " " + a.theme), a.type) {
      case i:
        v.cnt = v.it.find("." + l.contents), v.cnt.length || (v.cnt = v.it.find(">*").eq(1)), v.cnt.length || (v.cnt = t(p).appendTo(v.it)), v.cnt[u](l.contents), v.cntElems = v.cnt.children(), v.nav = v.it.find("." + l.nav), v.nav.length || (v.nav = v.it.find(">*").eq(0)), v.nav[u](l.nav), v.navElems = {
          tabs: v.nav.children(),
          accordion: t()
        }, e(a.type);
        break;
      case s:
        v.cnt = v.it.wrapInner(t(p, {
          class: l.contents
        })).children().eq(0), v.cntElems = v.cnt.children().filter(":odd"), v.nav = t("<div/>", {
          class: l.nav
        }).prependTo(v.it), v.navElems = {
          tabs: t(),
          accordion: v.cnt.find(">*").filter(":even")
        }, e(a.type)
    }
  }, a.open = function(e, n, a) {
    var c = this,
      l = c.mode,
      f = c.sets.classes,
      a = a >= 0 ? a : c.sets.fade,
      h = c.getTab(e);
    h && !h.status && (n || l != i || c.closeAll(!0), h[r].add(h[o][i]).add(h[o][s])[u](f[d]), h.status = 1, c[d][h.index] = h, n || t(c.it).trigger("afterOpen.ft", [c, h]), "auto" == c.animation && (c.mode == s ? h[r].slideDown({
      duration: a,
      easing: "swing"
    }) : h[r].fadeIn(a)), c.animation = "auto")
  }, a.close = function(e, n, a) {
    var c = this,
      l = c.mode,
      f = c.sets.classes,
      a = a >= 0 ? a : c.sets.fade,
      h = c.getTab(e);
    h && h.status && (!n && l == i && h.status || (h[r].add(h[o][i]).add(h[o][s]).removeClass(f[d]), h.status = 0, delete c[d][h.index], n || t(c.it).trigger("afterClose.ft", [c, h]), "auto" == c.animation && (c.mode == s ? h[r].slideUp({
      duration: a,
      easing: "linear"
    }) : h[r].hide()), c.animation = "auto"))
  }, a.closeAll = function(e, n) {
    var a = this,
      n = n >= 0 ? n : a.sets.fade;
    t.each(a.layout[c], function(t, i) {
      a.close(i, e, n)
    })
  }, a.switch = function(t, e) {
    var n = this,
      a = n.sets,
      o = n.mode,
      e = e >= 0 ? e : n.sets.fade,
      c = n.getTab(t);
    if (c)
      if (o == i) {
        if (c.status) return;
        n.closeAll(!0), n.open(c, !1, e)
      } else if (o == s)
      if (a.collapsible) c.status ? n.close(c, !1, e) : n.open(c, !1, e);
      else if (!a.collapsible) {
      if (c.status) return;
      n.closeAll(!1), n.open(c, !1, e)
    }
  }, a.getTab = function(t) {
    var e, n = this,
      a = n.layout[c];
    switch (typeof t) {
      case "number":
        e = a[t];
        break;
      case "string":
        t = t.replace("#", ""), e = a[n.getTabIndex(t)];
        break;
      case "object":
        e = t
    }
    return e
  }, a.getTabIndex = function(e) {
    var n, a = this;
    return e.replace("#", ""), t.each(a.layout[c], function(t, a) {
      if (a.id === e) return n = a.index, !1
    }), n
  }, a.defineMode = function() {
    var n, a = this,
      o = a.sets,
      c = o.type;
    if (c == i) {
      if (!o.responsive) return void a.changeMode(i, !0);
      n = t(e).outerWidth(), (!a.mode || a.mode == s) && n >= o.breakpoint ? a.changeMode(i, !0) : (!a.mode || a.mode == i) && n < o.breakpoint && a.changeMode(s, !0)
    } else c == s && a.mode != s && a.changeMode(s, !0);
    return a.mode
  }, a.changeMode = function(e, n, a) {
    var o = this,
      c = o.sets.classes,
      r = o[d],
      a = "function" == typeof a ? a : t.noop;
    if (e)
      if (a.call(o), n || (o.sets.type = e, e != i)) {
        switch (t(o.it).trigger("beforeChangeMode.ft", [o]), o.mode = e, e) {
          case i:
            t(o.it).removeClass(c.mac)[u](c.mtb), t.each(r, function() {
              return o.closeAll(!0, 0), o.open(this, !0, 0), !1
            }), t.isEmptyObject(r) && o.switch(0, 0);
            break;
          case s:
            t(o.it)[u](c.mac).removeClass(c.mtb), t.each(r, function() {
              o.open(this, !0, 0)
            })
        }
        t(o.it).trigger("afterChangeMode.ft", [o])
      } else o.defineMode()
  }, a.defineSets = function(e) {
    var a = this,
      i = a.options = e || {};
    return data = a.dataOptions = t(a.it).data("ft") || {}, "string" == typeof data && (data = {
      type: data
    }), a.sets = t.extend(!0, {}, n.defaults, i, data)
  }, a.destroy = function() {
    var a = this,
      i = a.it,
      s = t(i),
      o = "." + a.ns;
    a.inited && (s.empty().html(a.origin.html).off(a.sets.event + o), t(e).off("resize" + o), t.each(a.origin.attrs, function(t, e) {
      s.attr(t, e)
    }), delete n.instances[s.attr("id")], delete i[l])
  }, a.reinit = function(e) {
    var n = this,
      a = n.it,
      i = "object" == typeof e && 0 != Object.keys(e).length ? e : t.extend(!0, {}, n.sets, {
        type: n.origin.type
      });
    n.destroy(), t(a)[l](i)
  }, __ = {
    getRndNum: function(t, e) {
      return Math.round(t - .5 + Math.random() * (e - t + 1))
    }
  }, t.fn[l] = function() {
    function e(t, e, a) {
      if (t[l] instanceof n && e in t[l]) return t[l][e].apply(t[l], Array.prototype.slice.call(a, 1))
    }

    function a(t, e) {
      if (!(t[l] instanceof n)) return new n(t, e)
    }
    var i = arguments,
      s = i[0],
      o = this.length;
    return t.each(this, function(t, c) {
      "object" == typeof s || void 0 === s ? c[l] = a(c, s) : "init" == s || "reinit" == s ? c[l] ? e(c, s, i) : c[l] = a(c, i[1]) : e(c, s, i), n.hasHash && t == o - 1 && history.pushState({
        a: "a"
      }, "", location.href.replace(location.hash, "")), t++
    }), this
  }, e.FlexTabs = n
}(jQuery, window);
