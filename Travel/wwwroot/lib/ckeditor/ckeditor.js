﻿/*
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function () {
    var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, e = {
        timestamp: "J856", version: "4.13.0 (Standard)", revision: "2212248a2a", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [], basePathSrcPattern: a }, status: "unloaded", basePath: function () {
            var b = window.CKEDITOR_BASEPATH || ""; if (!b) for (var c = document.getElementsByTagName("script"), e = 0; e < c.length; e++) { var l = c[e].src.match(a); if (l) { b = l[1]; break } } -1 == b.indexOf(":/") &&
                "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + b : location.href.match(/^[^\?]*\/(?:)/)[0] + b); if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return b
        }(), getUrl: function (a) {
        -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
            return a
        }, domReady: function () {
            function a() { try { document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b()) } catch (c) { } } function b() { for (var a; a = c.shift();)a() } var c = []; return function (b) {
                function d() { try { document.documentElement.doScroll("left") } catch (g) { setTimeout(d, 1); return } a() } c.push(b); "complete" === document.readyState && setTimeout(a, 1); if (1 == c.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                    a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) { document.attachEvent("onreadystatechange", a); window.attachEvent("onload", a); b = !1; try { b = !window.frameElement } catch (k) { } document.documentElement.doScroll && b && d() }
            }
        }()
    }, c = window.CKEDITOR_GETURL; if (c) { var b = e.getUrl; e.getUrl = function (a) { return c.call(e, a) || b.call(e, a) } } return e
}()), CKEDITOR.event || (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (a) { var e = CKEDITOR.event.prototype, c; for (c in e) null == a[c] && (a[c] = e[c]) },
    CKEDITOR.event.prototype = function () {
        function a(a) { var f = e(this); return f[a] || (f[a] = new c(a)) } var e = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, c = function (a) { this.name = a; this.listeners = [] }; c.prototype = { getListenerIndex: function (a) { for (var f = 0, c = this.listeners; f < c.length; f++)if (c[f].fn == a) return f; return -1 } }; return {
            define: function (b, f) { var c = a.call(this, b); CKEDITOR.tools.extend(c, f, !0) }, on: function (b, c, e, h, l) {
                function d(a, n, g, d) {
                    a = {
                        name: b, sender: this, editor: a,
                        data: n, listenerData: h, stop: g, cancel: d, removeListener: k
                    }; return !1 === c.call(e, a) ? !1 : a.data
                } function k() { n.removeListener(b, c) } var g = a.call(this, b); if (0 > g.getListenerIndex(c)) { g = g.listeners; e || (e = this); isNaN(l) && (l = 10); var n = this; d.fn = c; d.priority = l; for (var p = g.length - 1; 0 <= p; p--)if (g[p].priority <= l) return g.splice(p + 1, 0, d), { removeListener: k }; g.unshift(d) } return { removeListener: k }
            }, once: function () {
                var a = Array.prototype.slice.call(arguments), c = a[1]; a[1] = function (a) {
                    a.removeListener(); return c.apply(this,
                        arguments)
                }; return this.on.apply(this, a)
            }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                var a = 0, c = function () { a = 1 }, m = 0, h = function () { m = 1 }; return function (l, d, k) {
                    var g = e(this)[l]; l = a; var n = m; a = m = 0; if (g) { var p = g.listeners; if (p.length) for (var p = p.slice(0), w, v = 0; v < p.length; v++) { if (g.errorProof) try { w = p[v].call(this, k, d, c, h) } catch (q) { } else w = p[v].call(this, k, d, c, h); !1 === w ? m = 1 : "undefined" != typeof w && (d = w); if (a || m) break } } d =
                        m ? !1 : "undefined" == typeof d ? !0 : d; a = l; m = n; return d
                }
            }(), fireOnce: function (a, c, m) { c = this.fire(a, c, m); delete e(this)[a]; return c }, removeListener: function (a, c) { var m = e(this)[a]; if (m) { var h = m.getListenerIndex(c); 0 <= h && m.listeners.splice(h, 1) } }, removeAllListeners: function () { var a = e(this), c; for (c in a) delete a[c] }, hasListeners: function (a) { return (a = e(this)[a]) && 0 < a.listeners.length }
        }
    }()), CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire =
        function (a, e) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, e, this) }, CKEDITOR.editor.prototype.fireOnce = function (a, e) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, e, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function () {
            var a = navigator.userAgent.toLowerCase(), e = a.match(/edge[ \/](\d+.?\d*)/), c = -1 < a.indexOf("trident/"), c = !(!e && !c), c = {
                ie: c, edge: !!e, webkit: !c &&
                    -1 < a.indexOf(" applewebkit/"), air: -1 < a.indexOf(" adobeair/"), mac: -1 < a.indexOf("macintosh"), quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode), mobile: -1 < a.indexOf("mobile"), iOS: /(ipad|iphone|ipod)/.test(a), isCustomDomain: function () { if (!this.ie) return !1; var a = document.domain, b = window.location.hostname; return a != b && a != "[" + b + "]" }, secure: "https:" == location.protocol
            }; c.gecko = "Gecko" == navigator.product && !c.webkit && !c.ie; c.webkit && (-1 < a.indexOf("chrome") ? c.chrome =
                !0 : c.safari = !0); var b = 0; c.ie && (b = e ? parseFloat(e[1]) : c.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, c.ie9Compat = 9 == b, c.ie8Compat = 8 == b, c.ie7Compat = 7 == b, c.ie6Compat = 7 > b || c.quirks); c.gecko && (e = a.match(/rv:([\d\.]+)/)) && (e = e[1].split("."), b = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0)); c.air && (b = parseFloat(a.match(/ adobeair\/(\d+)/)[1])); c.webkit && (b = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])); c.version = b; c.isCompatible = !(c.ie && 7 > b) && !(c.gecko && 4E4 > b) && !(c.webkit &&
                    534 > b); c.hidpi = 2 <= window.devicePixelRatio; c.needsBrFiller = c.gecko || c.webkit || c.ie && 10 < b; c.needsNbspFiller = c.ie && 11 > b; c.cssClass = "cke_browser_" + (c.ie ? "ie" : c.gecko ? "gecko" : c.webkit ? "webkit" : "unknown"); c.quirks && (c.cssClass += " cke_browser_quirks"); c.ie && (c.cssClass += " cke_browser_ie" + (c.quirks ? "6 cke_browser_iequirks" : c.version)); c.air && (c.cssClass += " cke_browser_air"); c.iOS && (c.cssClass += " cke_browser_ios"); c.hidpi && (c.cssClass += " cke_hidpi"); return c
        }()), "unloaded" == CKEDITOR.status && function () {
            CKEDITOR.event.implementOn(CKEDITOR);
            CKEDITOR.loadFullCore = function () { if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; var a = document.createElement("script"); a.type = "text/javascript"; a.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(a) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add = function (a) { (this._.pending || (this._.pending = [])).push(a) }; (function () {
                CKEDITOR.domReady(function () {
                    var a = CKEDITOR.loadFullCore, e = CKEDITOR.loadFullCoreTimeout; a && (CKEDITOR.status =
                        "basic_ready", a && a._load ? a() : e && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * e))
                })
            })(); CKEDITOR.status = "basic_loaded"
        }(), "use strict", CKEDITOR.VERBOSITY_WARN = 1, CKEDITOR.VERBOSITY_ERROR = 2, CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn = function (a, e) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: e }) }, CKEDITOR.error = function (a, e) {
        CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log",
            { type: "error", errorCode: a, additionalData: e })
        }, CKEDITOR.on("log", function (a) { if (window.console && window.console.log) { var e = console[a.data.type] ? a.data.type : "log", c = a.data.errorCode; if (a = a.data.additionalData) console[e]("[CKEDITOR] Error code: " + c + ".", a); else console[e]("[CKEDITOR] Error code: " + c + "."); console[e]("[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#" + c) } }, null, null, 999), CKEDITOR.dom = {}, function () {
            function a(a, g, d) {
            this._minInterval =
                a; this._context = d; this._lastOutput = this._scheduledTimer = 0; this._output = CKEDITOR.tools.bind(g, d || {}); var b = this; this.input = function () { function a() { b._lastOutput = (new Date).getTime(); b._scheduledTimer = 0; b._call() } if (!b._scheduledTimer || !1 !== b._reschedule()) { var n = (new Date).getTime() - b._lastOutput; n < b._minInterval ? b._scheduledTimer = setTimeout(a, b._minInterval - n) : a() } }
            } function e(n, g, d) {
                a.call(this, n, g, d); this._args = []; var b = this; this.input = CKEDITOR.tools.override(this.input, function (a) {
                    return function () {
                    b._args =
                        Array.prototype.slice.call(arguments); a.call(this)
                    }
                })
            } var c = [], b = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", f = /&/g, m = />/g, h = /</g, l = /"/g, d = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, k = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" }, g = function (a, g) { return "#" == g[0] ? String.fromCharCode(parseInt(g.slice(1), 10)) : k[g] }; CKEDITOR.on("reset", function () { c = [] }); CKEDITOR.tools = {
                arrayCompare: function (a, g) {
                    if (!a && !g) return !0; if (!a || !g || a.length != g.length) return !1;
                    for (var d = 0; d < a.length; d++)if (a[d] != g[d]) return !1; return !0
                }, getIndex: function (a, g) { for (var d = 0; d < a.length; ++d)if (g(a[d])) return d; return -1 }, clone: function (a) { var g; if (a && a instanceof Array) { g = []; for (var d = 0; d < a.length; d++)g[d] = CKEDITOR.tools.clone(a[d]); return g } if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a; g = new a.constructor; for (d in a) g[d] = CKEDITOR.tools.clone(a[d]); return g },
                capitalize: function (a, g) { return a.charAt(0).toUpperCase() + (g ? a.slice(1) : a.slice(1).toLowerCase()) }, extend: function (a) { var g = arguments.length, d, b; "boolean" == typeof (d = arguments[g - 1]) ? g-- : "boolean" == typeof (d = arguments[g - 2]) && (b = arguments[g - 1], g -= 2); for (var c = 1; c < g; c++) { var k = arguments[c] || {}; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(k), function (g) { if (!0 === d || null == a[g]) if (!b || g in b) a[g] = k[g] }) } return a }, prototypedCopy: function (a) { var g = function () { }; g.prototype = a; return new g }, copy: function (a) {
                    var g =
                        {}, d; for (d in a) g[d] = a[d]; return g
                }, isArray: function (a) { return "[object Array]" == Object.prototype.toString.call(a) }, isEmpty: function (a) { for (var g in a) if (a.hasOwnProperty(g)) return !1; return !0 }, cssVendorPrefix: function (a, g, d) { if (d) return b + a + ":" + g + ";" + a + ":" + g; d = {}; d[a] = g; d[b + a] = g; return d }, cssStyleToDomStyle: function () {
                    var a = document.createElement("div").style, g = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float"; return function (a) {
                        return "float" == a ? g : a.replace(/-./g,
                            function (a) { return a.substr(1).toUpperCase() })
                    }
                }(), buildStyleHtml: function (a) { a = [].concat(a); for (var g, d = [], b = 0; b < a.length; b++)if (g = a[b]) /@import|[{}]/.test(g) ? d.push("\x3cstyle\x3e" + g + "\x3c/style\x3e") : d.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + g + '"\x3e'); return d.join("") }, htmlEncode: function (a) { return void 0 === a || null === a ? "" : String(a).replace(f, "\x26amp;").replace(m, "\x26gt;").replace(h, "\x26lt;") }, htmlDecode: function (a) { return a.replace(d, g) }, htmlEncodeAttr: function (a) {
                    return CKEDITOR.tools.htmlEncode(a).replace(l,
                        "\x26quot;")
                }, htmlDecodeAttr: function (a) { return CKEDITOR.tools.htmlDecode(a) }, transformPlainTextToHtml: function (a, g) {
                    var d = g == CKEDITOR.ENTER_BR, b = this.htmlEncode(a.replace(/\r\n/g, "\n")), b = b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), c = g == CKEDITOR.ENTER_P ? "p" : "div"; if (!d) { var k = /\n{2}/g; if (k.test(b)) var f = "\x3c" + c + "\x3e", l = "\x3c/" + c + "\x3e", b = f + b.replace(k, function () { return l + f }) + l } b = b.replace(/\n/g, "\x3cbr\x3e"); d || (b = b.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + c + "\x3e)"), function (a) {
                        return CKEDITOR.tools.repeat(a,
                            2)
                    })); b = b.replace(/^ | $/g, "\x26nbsp;"); return b = b.replace(/(>|\s) /g, function (a, g) { return g + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
                }, getNextNumber: function () { var a = 0; return function () { return ++a } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, getUniqueId: function () { for (var a = "e", g = 0; 8 > g; g++)a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return a }, override: function (a, g) { var d = g(a); d.prototype = a.prototype; return d }, setTimeout: function (a, g, d, b, c) {
                    c || (c = window); d || (d =
                        c); return c.setTimeout(function () { b ? a.apply(d, [].concat(b)) : a.apply(d) }, g || 0)
                }, throttle: function (a, g, d) { return new this.buffers.throttle(a, g, d) }, trim: function () { var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function (g) { return g.replace(a, "") } }(), ltrim: function () { var a = /^[ \t\n\r]+/g; return function (g) { return g.replace(a, "") } }(), rtrim: function () { var a = /[ \t\n\r]+$/g; return function (g) { return g.replace(a, "") } }(), indexOf: function (a, g) {
                    if ("function" == typeof g) for (var d = 0, b = a.length; d < b; d++) { if (g(a[d])) return d } else {
                        if (a.indexOf) return a.indexOf(g);
                        d = 0; for (b = a.length; d < b; d++)if (a[d] === g) return d
                    } return -1
                }, search: function (a, g) { var d = CKEDITOR.tools.indexOf(a, g); return 0 <= d ? a[d] : null }, bind: function (a, g) { var d = Array.prototype.slice.call(arguments, 2); return function () { return a.apply(g, d.concat(Array.prototype.slice.call(arguments))) } }, createClass: function (a) {
                    var g = a.$, d = a.base, b = a.privates || a._, c = a.proto; a = a.statics; !g && (g = function () { d && this.base.apply(this, arguments) }); if (b) var k = g, g = function () {
                        var a = this._ || (this._ = {}), g; for (g in b) {
                            var d = b[g];
                            a[g] = "function" == typeof d ? CKEDITOR.tools.bind(d, this) : d
                        } k.apply(this, arguments)
                    }; d && (g.prototype = this.prototypedCopy(d.prototype), g.prototype.constructor = g, g.base = d, g.baseProto = d.prototype, g.prototype.base = function r() { this.base = d.prototype.base; d.apply(this, arguments); this.base = r }); c && this.extend(g.prototype, c, !0); a && this.extend(g, a, !0); return g
                }, addFunction: function (a, g) { return c.push(function () { return a.apply(g || this, arguments) }) - 1 }, removeFunction: function (a) { c[a] = null }, callFunction: function (a) {
                    var g =
                        c[a]; return g && g.apply(window, Array.prototype.slice.call(arguments, 1))
                }, cssLength: function () { var a = /^-?\d+\.?\d*px$/, g; return function (d) { g = CKEDITOR.tools.trim(d + "") + "px"; return a.test(g) ? g : d || "" } }(), convertToPx: function () {
                    var a; return function (g) {
                        a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a)); if (!/%$/.test(g)) {
                            var d = 0 > parseFloat(g);
                            d && (g = g.replace("-", "")); a.setStyle("width", g); g = a.$.clientWidth; return d ? -g : g
                        } return g
                    }
                }(), repeat: function (a, g) { return Array(g + 1).join(a) }, tryThese: function () { for (var a, g = 0, d = arguments.length; g < d; g++) { var b = arguments[g]; try { a = b(); break } catch (c) { } } return a }, genKey: function () { return Array.prototype.slice.call(arguments).join("-") }, defer: function (a) { return function () { var g = arguments, d = this; window.setTimeout(function () { a.apply(d, g) }, 0) } }, normalizeCssText: function (a, g) {
                    var d = [], b, c = CKEDITOR.tools.parseCssText(a,
                        !0, g); for (b in c) d.push(b + ":" + c[b]); d.sort(); return d.length ? d.join(";") + ";" : ""
                }, convertRgbToHex: function (a) { return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, g, d, n) { a = [g, d, n]; for (g = 0; 3 > g; g++)a[g] = ("0" + parseInt(a[g], 10).toString(16)).slice(-2); return "#" + a.join("") }) }, normalizeHex: function (a) { return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (a, g, d, n) { a = g.toLowerCase(); 3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join("")); return "#" + a + n }) }, parseCssText: function (a,
                    g, d) { var b = {}; d && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || ""); a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a))); if (!a || ";" == a) return b; a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, d, n) { g && (d = d.toLowerCase(), "font-family" == d && (n = n.replace(/\s*,\s*/g, ",")), n = CKEDITOR.tools.trim(n)); b[d] = n }); return b }, writeCssText: function (a, g) { var d, b = []; for (d in a) b.push(d + ":" + a[d]); g && b.sort(); return b.join("; ") },
                objectCompare: function (a, g, d) { var b; if (!a && !g) return !0; if (!a || !g) return !1; for (b in a) if (a[b] != g[b]) return !1; if (!d) for (b in g) if (a[b] != g[b]) return !1; return !0 }, objectKeys: function (a) { return CKEDITOR.tools.object.keys(a) }, convertArrayToObject: function (a, g) { var d = {}; 1 == arguments.length && (g = !0); for (var b = 0, c = a.length; b < c; ++b)d[a[b]] = g; return d }, fixDomain: function () {
                    for (var a; ;)try { a = window.parent.document.domain; break } catch (g) {
                        a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain; if (!a) break; document.domain =
                            a
                    } return !!a
                }, eventsBuffer: function (a, g, d) { return new this.buffers.event(a, g, d) }, enableHtml5Elements: function (a, g) { for (var d = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), b = d.length, c; b--;)c = a.createElement(d[b]), g && a.appendChild(c) }, checkIfAnyArrayItemMatches: function (a, g) { for (var d = 0, b = a.length; d < b; ++d)if (a[d].match(g)) return !0; return !1 }, checkIfAnyObjectPropertyMatches: function (a,
                    g) { for (var d in a) if (d.match(g)) return !0; return !1 }, keystrokeToString: function (a, g) { var d = this.keystrokeToArray(a, g); d.display = d.display.join("+"); d.aria = d.aria.join("+"); return d }, keystrokeToArray: function (a, g) {
                        var d = g & 16711680, b = g & 65535, c = CKEDITOR.env.mac, k = [], f = []; d & CKEDITOR.CTRL && (k.push(c ? "⌘" : a[17]), f.push(c ? a[224] : a[17])); d & CKEDITOR.ALT && (k.push(c ? "⌥" : a[18]), f.push(a[18])); d & CKEDITOR.SHIFT && (k.push(c ? "⇧" : a[16]), f.push(a[16])); b && (a[b] ? (k.push(a[b]), f.push(a[b])) : (k.push(String.fromCharCode(b)),
                            f.push(String.fromCharCode(b)))); return { display: k, aria: f }
                    }, transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d", getCookie: function (a) { a = a.toLowerCase(); for (var g = document.cookie.split(";"), d, b, c = 0; c < g.length; c++)if (d = g[c].split("\x3d"), b = decodeURIComponent(CKEDITOR.tools.trim(d[0]).toLowerCase()), b === a) return decodeURIComponent(1 < d.length ? d[1] : ""); return null }, setCookie: function (a, g) {
                    document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(g) +
                        ";path\x3d/"
                    }, getCsrfToken: function () { var a = CKEDITOR.tools.getCookie("ckCsrfToken"); if (!a || 40 != a.length) { var a = [], g = ""; if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a); else for (var d = 0; 40 > d; d++)a.push(Math.floor(256 * Math.random())); for (d = 0; d < a.length; d++)var b = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[d] % 36), g = g + (.5 < Math.random() ? b.toUpperCase() : b); a = g; CKEDITOR.tools.setCookie("ckCsrfToken", a) } return a }, escapeCss: function (a) {
                        return a ? window.CSS &&
                            CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : ""
                    }, getMouseButton: function (a) { return (a = a && a.data ? a.data.$ : a) ? CKEDITOR.tools.normalizeMouseButton(a.button) : !1 }, normalizeMouseButton: function (a, g) {
                        if (!CKEDITOR.env.ie || 9 <= CKEDITOR.env.version && !CKEDITOR.env.ie6Compat) return a; for (var d = [[CKEDITOR.MOUSE_BUTTON_LEFT, 1], [CKEDITOR.MOUSE_BUTTON_MIDDLE, 4], [CKEDITOR.MOUSE_BUTTON_RIGHT, 2]], b = 0; b < d.length; b++) {
                            var c = d[b]; if (c[0] === a && g) return c[1]; if (!g &&
                                c[1] === a) return c[0]
                        }
                    }, convertHexStringToBytes: function (a) { var g = [], d = a.length / 2, b; for (b = 0; b < d; b++)g.push(parseInt(a.substr(2 * b, 2), 16)); return g }, convertBytesToBase64: function (a) { var g = "", d = a.length, b; for (b = 0; b < d; b += 3) { var c = a.slice(b, b + 3), k = c.length, f = [], l; if (3 > k) for (l = k; 3 > l; l++)c[l] = 0; f[0] = (c[0] & 252) >> 2; f[1] = (c[0] & 3) << 4 | c[1] >> 4; f[2] = (c[1] & 15) << 2 | (c[2] & 192) >> 6; f[3] = c[2] & 63; for (l = 0; 4 > l; l++)g = l <= k ? g + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f[l]) : g + "\x3d" } return g },
                style: {
                    parse: {
                        _colors: {
                            aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#00FFFF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000000", blanchedalmond: "#FFEBCD", blue: "#0000FF", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#00FFFF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgreen: "#006400",
                            darkgrey: "#A9A9A9", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#FF00FF", gainsboro: "#DCDCDC",
                            ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", green: "#008000", greenyellow: "#ADFF2F", grey: "#808080", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgreen: "#90EE90", lightgrey: "#D3D3D3", lightpink: "#FFB6C1", lightsalmon: "#FFA07A",
                            lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#00FF00", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#FF00FF", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1",
                            moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#663399", red: "#FF0000", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460",
                            seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", windowtext: "windowtext", wheat: "#F5DEB3", white: "#FFFFFF", whitesmoke: "#F5F5F5", yellow: "#FFFF00", yellowgreen: "#9ACD32"
                        }, _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "),
                        _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/, _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background: function (a) { var g = {}, d = this._findColor(a); d.length && (g.color = d[0], CKEDITOR.tools.array.forEach(d, function (g) { a = a.replace(g, "") })); if (a = CKEDITOR.tools.trim(a)) g.unprocessed = a; return g }, margin: function (a) {
                            return CKEDITOR.tools.style.parse.sideShorthand(a,
                                function (a) { return a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset|revert)/g) || ["0px"] })
                        }, sideShorthand: function (a, g) { function d(a) { b.top = c[a[0]]; b.right = c[a[1]]; b.bottom = c[a[2]]; b.left = c[a[3]] } var b = {}, c = g ? g(a) : a.split(/\s+/); switch (c.length) { case 1: d([0, 0, 0, 0]); break; case 2: d([0, 1, 0, 1]); break; case 3: d([0, 1, 2, 1]); break; case 4: d([0, 1, 2, 3]) }return b }, border: function (a) { return CKEDITOR.tools.style.border.fromCssRule(a) }, _findColor: function (a) {
                            var g = [], d = CKEDITOR.tools.array, g = g.concat(a.match(this._rgbaRegExp) ||
                                []), g = g.concat(a.match(this._hslaRegExp) || []); return g = g.concat(d.filter(a.split(/\s+/), function (a) { return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors }))
                        }
                    }
                }, array: {
                    filter: function (a, g, d) { var b = []; this.forEach(a, function (c, k) { g.call(d, c, k, a) && b.push(c) }); return b }, find: function (a, g, d) { for (var b = a.length, c = 0; c < b;) { if (g.call(d, a[c], c, a)) return a[c]; c++ } }, forEach: function (a, g, d) { var b = a.length, c; for (c = 0; c < b; c++)g.call(d, a[c], c, a) }, map: function (a,
                        g, d) { for (var b = [], c = 0; c < a.length; c++)b.push(g.call(d, a[c], c, a)); return b }, reduce: function (a, g, d, b) { for (var c = 0; c < a.length; c++)d = g.call(b, d, a[c], c, a); return d }, every: function (a, g, d) { if (!a.length) return !0; g = this.filter(a, g, d); return a.length === g.length }, some: function (a, g, d) { for (var b = 0; b < a.length; b++)if (g.call(d, a[b], b, a)) return !0; return !1 }
                }, object: {
                    DONT_ENUMS: "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), entries: function (a) {
                        return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a),
                            function (g) { return [g, a[g]] })
                    }, values: function (a) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a), function (g) { return a[g] }) }, keys: function (a) { var g = Object.prototype.hasOwnProperty, d = [], b = CKEDITOR.tools.object.DONT_ENUMS, c; for (c in a) d.push(c); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) for (c = 0; c < b.length; c++)g.call(a, b[c]) && d.push(b[c]); return d }, findKey: function (a, g) { if ("object" !== typeof a) return null; for (var d in a) if (a[d] === g) return d; return null }, merge: function (a, g) {
                        var d = CKEDITOR.tools,
                        b = d.clone(a), c = d.clone(g); d.array.forEach(d.object.keys(c), function (a) { b[a] = "object" === typeof c[a] && "object" === typeof b[a] ? d.object.merge(b[a], c[a]) : c[a] }); return b
                    }
                }, getAbsoluteRectPosition: function (a, g) {
                    function d(a) { if (a) { var g = a.getClientRect(); b.top += g.top; b.left += g.left; "x" in b && "y" in b && (b.x += g.x, b.y += g.y); d(a.getWindow().getFrame()) } } var b = CKEDITOR.tools.copy(g); d(a.getFrame()); var c = CKEDITOR.document.getWindow().getScrollPosition(); b.top += c.y; b.left += c.x; "x" in b && "y" in b && (b.y += c.y, b.x +=
                        c.x); b.right = b.left + b.width; b.bottom = b.top + b.height; return b
                }
            }; a.prototype = { reset: function () { this._lastOutput = 0; this._clearTimer() }, _reschedule: function () { return !1 }, _call: function () { this._output() }, _clearTimer: function () { this._scheduledTimer && clearTimeout(this._scheduledTimer); this._scheduledTimer = 0 } }; e.prototype = CKEDITOR.tools.prototypedCopy(a.prototype); e.prototype._reschedule = function () { this._scheduledTimer && this._clearTimer() }; e.prototype._call = function () { this._output.apply(this._context, this._args) };
            CKEDITOR.tools.buffers = {}; CKEDITOR.tools.buffers.event = a; CKEDITOR.tools.buffers.throttle = e; CKEDITOR.tools.style.border = CKEDITOR.tools.createClass({
                $: function (a) { a = a || {}; this.width = a.width; this.style = a.style; this.color = a.color; this._.normalize() }, _: { normalizeMap: { color: [[/windowtext/g, "black"]] }, normalize: function () { for (var a in this._.normalizeMap) { var g = this[a]; g && (this[a] = CKEDITOR.tools.array.reduce(this._.normalizeMap[a], function (a, g) { return a.replace(g[0], g[1]) }, g)) } } }, proto: {
                    toString: function () {
                        return CKEDITOR.tools.array.filter([this.width,
                        this.style, this.color], function (a) { return !!a }).join(" ")
                    }
                }, statics: {
                    fromCssRule: function (a) { var g = {}, d = a.split(/\s+/g); a = CKEDITOR.tools.style.parse._findColor(a); a.length && (g.color = a[0]); CKEDITOR.tools.array.forEach(d, function (a) { g.style || -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, a) ? !g.width && CKEDITOR.tools.style.parse._widthRegExp.test(a) && (g.width = a) : g.style = a }); return new CKEDITOR.tools.style.border(g) }, splitCssValues: function (a, g) {
                        g = g || {}; var d = CKEDITOR.tools.array.reduce(["width",
                            "style", "color"], function (d, b) { var c = a["border-" + b] || g[b]; d[b] = c ? CKEDITOR.tools.style.parse.sideShorthand(c) : null; return d }, {}); return CKEDITOR.tools.array.reduce(["top", "right", "bottom", "left"], function (g, b) { var c = {}, k; for (k in d) { var f = a["border-" + b + "-" + k]; c[k] = f ? f : d[k] && d[k][b] } g["border-" + b] = new CKEDITOR.tools.style.border(c); return g }, {})
                    }
                }
            }); CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray; CKEDITOR.MOUSE_BUTTON_LEFT = 0; CKEDITOR.MOUSE_BUTTON_MIDDLE =
                1; CKEDITOR.MOUSE_BUTTON_RIGHT = 2
        }(), CKEDITOR.dtd = function () {
            var a = CKEDITOR.tools.extend, e = function (a, g) { for (var d = CKEDITOR.tools.clone(a), b = 1; b < arguments.length; b++) { g = arguments[b]; for (var c in g) delete d[c] } return d }, c = {}, b = {}, f = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }, m = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, h = {},
            l = { "#": 1 }, d = { center: 1, dir: 1, noframes: 1 }; a(c, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, l, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); a(b, f, c, d); e =
            {
                a: e(c, { a: 1, button: 1 }), abbr: c, address: b, area: h, article: b, aside: b, audio: a({ source: 1, track: 1 }, b), b: c, base: h, bdi: c, bdo: c, blockquote: b, body: b, br: h, button: e(c, { a: 1, button: 1 }), canvas: c, caption: b, cite: c, code: c, col: h, colgroup: { col: 1 }, command: h, datalist: a({ option: 1 }, c), dd: b, del: c, details: a({ summary: 1 }, b), dfn: c, div: b, dl: { dt: 1, dd: 1 }, dt: b, em: c, embed: h, fieldset: a({ legend: 1 }, b), figcaption: b, figure: a({ figcaption: 1 }, b), footer: b, form: b, h1: c, h2: c, h3: c, h4: c, h5: c, h6: c, head: a({ title: 1, base: 1 }, m), header: b, hgroup: {
                    h1: 1,
                    h2: 1, h3: 1, h4: 1, h5: 1, h6: 1
                }, hr: h, html: a({ head: 1, body: 1 }, b, m), i: c, iframe: l, img: h, input: h, ins: c, kbd: c, keygen: h, label: c, legend: c, li: b, link: h, main: b, map: b, mark: c, menu: a({ li: 1 }, b), meta: h, meter: e(c, { meter: 1 }), nav: b, noscript: a({ link: 1, meta: 1, style: 1 }, c), object: a({ param: 1 }, c), ol: { li: 1 }, optgroup: { option: 1 }, option: l, output: c, p: c, param: h, pre: c, progress: e(c, { progress: 1 }), q: c, rp: c, rt: c, ruby: a({ rp: 1, rt: 1 }, c), s: c, samp: c, script: l, section: b, select: { optgroup: 1, option: 1 }, small: c, source: h, span: c, strong: c, style: l, sub: c,
                summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, c), sup: c, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: b, textarea: l, tfoot: { tr: 1 }, th: b, thead: { tr: 1 }, time: e(c, { time: 1 }), title: l, tr: { th: 1, td: 1 }, track: h, u: c, ul: { li: 1 }, "var": c, video: a({ source: 1, track: 1 }, b), wbr: h, acronym: c, applet: a({ param: 1 }, b), basefont: h, big: c, center: b, dialog: h, dir: { li: 1 }, font: c, isindex: h, noframes: b, strike: c, tt: c
            }; a(e, {
                $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, f, d), $blockLimit: {
                    article: 1, aside: 1, audio: 1,
                    body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, main: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1
                }, $cdata: { script: 1, style: 1 }, $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 }, $empty: {
                    area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1,
                    keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1
                }, $inline: c, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: a({ body: 1, head: 1, html: 1 }, e.head), $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: {
                    abbr: 1, acronym: 1, b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1,
                    mark: 1, meter: 1, output: 1, q: 1, ruby: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1
                }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
            });
            return e
        }(), CKEDITOR.dom.event = function (a) { this.$ = a }, CKEDITOR.dom.event.prototype = {
            getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () { var a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL; this.$.shiftKey && (a += CKEDITOR.SHIFT); this.$.altKey && (a += CKEDITOR.ALT); return a }, preventDefault: function (a) { var e = this.$; e.preventDefault ? e.preventDefault() : e.returnValue = !1; a && this.stopPropagation() }, stopPropagation: function () {
                var a = this.$; a.stopPropagation ? a.stopPropagation() :
                    a.cancelBubble = !0
            }, getTarget: function () { var a = this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () { var a = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
        }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1,
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function (a) { a && (this.$ = a) }, CKEDITOR.dom.domObject.prototype = function () {
        var a = function (a, c) { return function (b) { "undefined" != typeof CKEDITOR && a.fire(c, new CKEDITOR.dom.event(b)) } }; return {
            getPrivate: function () { var a; (a = this.getCustomData("_")) || this.setCustomData("_", a = {}); return a }, on: function (e) {
                var c = this.getCustomData("_cke_nativeListeners"); c || (c = {}, this.setCustomData("_cke_nativeListeners", c)); c[e] || (c = c[e] =
                    a(this, e), this.$.addEventListener ? this.$.addEventListener(e, c, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, c)); return CKEDITOR.event.prototype.on.apply(this, arguments)
            }, removeListener: function (a) { CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(a)) { var c = this.getCustomData("_cke_nativeListeners"), b = c && c[a]; b && (this.$.removeEventListener ? this.$.removeEventListener(a, b, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, b), delete c[a]) } },
            removeAllListeners: function () { var a = this.getCustomData("_cke_nativeListeners"), c; for (c in a) { var b = a[c]; this.$.detachEvent ? this.$.detachEvent("on" + c, b) : this.$.removeEventListener && this.$.removeEventListener(c, b, !1); delete a[c] } CKEDITOR.event.prototype.removeAllListeners.call(this) }
        }
    }(), function (a) {
        var e = {}; CKEDITOR.on("reset", function () { e = {} }); a.equals = function (a) { try { return a && a.$ === this.$ } catch (b) { return !1 } }; a.setCustomData = function (a, b) { var f = this.getUniqueId(); (e[f] || (e[f] = {}))[a] = b; return this };
        a.getCustomData = function (a) { var b = this.$["data-cke-expando"]; return (b = b && e[b]) && a in b ? b[a] : null }; a.removeCustomData = function (a) { var b = this.$["data-cke-expando"], b = b && e[b], f, m; b && (f = b[a], m = a in b, delete b[a]); return m ? f : null }; a.clearCustomData = function () { this.removeAllListeners(); var a = this.$["data-cke-expando"]; a && delete e[a] }; a.getUniqueId = function () { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(a)
    }(CKEDITOR.dom.domObject.prototype),
    CKEDITOR.dom.node = function (a) { return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL =
    0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (a, e) { a.append(this, e); return a }, clone: function (a, e) {
            function c(b) {
            b["data-cke-expando"] && (b["data-cke-expando"] = !1); if (b.nodeType == CKEDITOR.NODE_ELEMENT || b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (e || b.nodeType != CKEDITOR.NODE_ELEMENT || b.removeAttribute("id", !1), a) {
                b = b.childNodes;
                for (var f = 0; f < b.length; f++)c(b[f])
            }
            } function b(c) { if (c.type == CKEDITOR.NODE_ELEMENT || c.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) { if (c.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) { var f = c.getName(); ":" == f[0] && c.renameNode(f.substring(1)) } if (a) for (f = 0; f < c.getChildCount(); f++)b(c.getChild(f)) } } var f = this.$.cloneNode(a); c(f); f = new CKEDITOR.dom.node(f); CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && b(f); return f
        }, hasPrevious: function () { return !!this.$.previousSibling },
        hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a }, insertBefore: function (a) { a.$.parentNode.insertBefore(this.$, a.$); return a }, insertBeforeMe: function (a) { this.$.parentNode.insertBefore(a.$, this.$); return a }, getAddress: function (a) { for (var e = [], c = this.getDocument().$.documentElement, b = this; b && b != c;) { var f = b.getParent(); f && e.unshift(this.getIndex.call(b, a)); b = f } return e }, getDocument: function () {
            return new CKEDITOR.dom.document(this.$.ownerDocument ||
                this.$.parentNode.ownerDocument)
        }, getIndex: function (a) { function e(a, b) { var c = b ? a.getNext() : a.getPrevious(); return c && c.type == CKEDITOR.NODE_TEXT ? c.isEmpty() ? e(c, b) : c : null } var c = this, b = -1, f; if (!this.getParent() || a && c.type == CKEDITOR.NODE_TEXT && c.isEmpty() && !e(c) && !e(c, !0)) return -1; do if (!a || c.equals(this) || c.type != CKEDITOR.NODE_TEXT || !f && !c.isEmpty()) b++, f = c.type == CKEDITOR.NODE_TEXT; while (c = c.getPrevious()); return b }, getNextSourceNode: function (a, e, c) {
            if (c && !c.call) { var b = c; c = function (a) { return !a.equals(b) } } a =
                !a && this.getFirst && this.getFirst(); var f; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && c && !1 === c(this, !0)) return null; a = this.getNext() } for (; !a && (f = (f || this).getParent());) { if (c && !1 === c(f, !0)) return null; a = f.getNext() } return !a || c && !1 === c(a) ? null : e && e != a.type ? a.getNextSourceNode(!1, e, c) : a
        }, getPreviousSourceNode: function (a, e, c) {
            if (c && !c.call) { var b = c; c = function (a) { return !a.equals(b) } } a = !a && this.getLast && this.getLast(); var f; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && c && !1 === c(this, !0)) return null; a = this.getPrevious() } for (; !a &&
                (f = (f || this).getParent());) { if (c && !1 === c(f, !0)) return null; a = f.getPrevious() } return !a || c && !1 === c(a) ? null : e && a.type != e ? a.getPreviousSourceNode(!1, e, c) : a
        }, getPrevious: function (a) { var e = this.$, c; do c = (e = e.previousSibling) && 10 != e.nodeType && new CKEDITOR.dom.node(e); while (c && a && !a(c)); return c }, getNext: function (a) { var e = this.$, c; do c = (e = e.nextSibling) && new CKEDITOR.dom.node(e); while (c && a && !a(c)); return c }, getParent: function (a) {
            var e = this.$.parentNode; return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || a && e.nodeType ==
                CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(e) : null
        }, getParents: function (a) { var e = this, c = []; do c[a ? "push" : "unshift"](e); while (e = e.getParent()); return c }, getCommonAncestor: function (a) { if (a.equals(this)) return this; if (a.contains && a.contains(this)) return a; var e = this.contains ? this : this.getParent(); do if (e.contains(a)) return e; while (e = e.getParent()); return null }, getPosition: function (a) {
            var e = this.$, c = a.$; if (e.compareDocumentPosition) return e.compareDocumentPosition(c); if (e == c) return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) { if (e.contains) { if (e.contains(c)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING; if (c.contains(e)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING } if ("sourceIndex" in e) return 0 > e.sourceIndex || 0 > c.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : e.sourceIndex < c.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING } e = this.getAddress(); a = a.getAddress(); for (var c = Math.min(e.length, a.length), b = 0; b <
                c; b++)if (e[b] != a[b]) return e[b] < a[b] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; return e.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        }, getAscendant: function (a, e) {
            var c = this.$, b, f; e || (c = c.parentNode); "function" == typeof a ? (f = !0, b = a) : (f = !1, b = function (b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : ""; return "string" == typeof a ? b == a : b in a }); for (; c;) {
                if (b(f ? new CKEDITOR.dom.node(c) : c)) return new CKEDITOR.dom.node(c);
                try { c = c.parentNode } catch (m) { c = null }
            } return null
        }, hasAscendant: function (a, e) { var c = this.$; e || (c = c.parentNode); for (; c;) { if (c.nodeName && c.nodeName.toLowerCase() == a) return !0; c = c.parentNode } return !1 }, move: function (a, e) { a.append(this.remove(), e) }, remove: function (a) { var e = this.$, c = e.parentNode; if (c) { if (a) for (; a = e.firstChild;)c.insertBefore(e.removeChild(a), e); c.removeChild(e) } return this }, replace: function (a) { this.insertBefore(a); a.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () {
            for (var a; this.getFirst &&
                (a = this.getFirst());) { if (a.type == CKEDITOR.NODE_TEXT) { var e = CKEDITOR.tools.ltrim(a.getText()), c = a.getLength(); if (e) e.length < c && (a.split(c - e.length), this.$.removeChild(this.$.firstChild)); else { a.remove(); continue } } break }
        }, rtrim: function () {
            for (var a; this.getLast && (a = this.getLast());) { if (a.type == CKEDITOR.NODE_TEXT) { var e = CKEDITOR.tools.rtrim(a.getText()), c = a.getLength(); if (e) e.length < c && (a.split(e.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { a.remove(); continue } } break } CKEDITOR.env.needsBrFiller &&
                (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
        }, isReadOnly: function (a) { var e = this; this.type != CKEDITOR.NODE_ELEMENT && (e = this.getParent()); CKEDITOR.env.edge && e && e.is("textarea", "input") && (a = !0); if (!a && e && "undefined" != typeof e.$.isContentEditable) return !(e.$.isContentEditable || e.data("cke-editable")); for (; e;) { if (e.data("cke-editable")) return !1; if (e.hasAttribute("contenteditable")) return "false" == e.getAttribute("contenteditable"); e = e.getParent() } return !0 }
    }),
    CKEDITOR.dom.window = function (a) { CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function () { this.$.focus() }, getViewPaneSize: function () { var a = this.$.document, e = "CSS1Compat" == a.compatMode; return { width: (e ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (e ? a.documentElement.clientHeight : a.body.clientHeight) || 0 } }, getScrollPosition: function () {
            var a = this.$; if ("pageXOffset" in a) return {
                x: a.pageXOffset ||
                    0, y: a.pageYOffset || 0
            }; a = a.document; return { x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop || a.body.scrollTop || 0 }
        }, getFrame: function () { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
    }), CKEDITOR.dom.document = function (a) { CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (a) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(a);
            else { var e = new CKEDITOR.dom.element("link"); e.setAttributes({ rel: "stylesheet", type: "text/css", href: a }); this.getHead().append(e) }
        }, appendStyleText: function (a) { if (this.$.createStyleSheet) { var e = this.$.createStyleSheet(""); e.cssText = a } else { var c = new CKEDITOR.dom.element("style", this); c.append(new CKEDITOR.dom.text(a, this)); this.getHead().append(c) } return e || c.$.sheet }, createElement: function (a, e) {
            var c = new CKEDITOR.dom.element(a, this); e && (e.attributes && c.setAttributes(e.attributes), e.styles && c.setStyles(e.styles));
            return c
        }, createText: function (a) { return new CKEDITOR.dom.text(a, this) }, focus: function () { this.getWindow().focus() }, getActive: function () { var a; try { a = this.$.activeElement } catch (e) { return null } return new CKEDITOR.dom.element(a) }, getById: function (a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null }, getByAddress: function (a, e) {
            for (var c = this.$.documentElement, b = 0; c && b < a.length; b++) {
                var f = a[b]; if (e) for (var m = -1, h = 0; h < c.childNodes.length; h++) {
                    var l = c.childNodes[h]; if (!0 !== e || 3 != l.nodeType ||
                        !l.previousSibling || 3 != l.previousSibling.nodeType) if (m++, m == f) { c = l; break }
                } else c = c.childNodes[f]
            } return c ? new CKEDITOR.dom.node(c) : null
        }, getElementsByTag: function (a, e) { CKEDITOR.env.ie && 8 >= document.documentMode || !e || (a = e + ":" + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) }, getHead: function () { var a = this.$.getElementsByTagName("head")[0]; return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0) }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) },
        getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) }, getWindow: function () { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) }, write: function (a) { this.$.open("text/html", "replace"); CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e")); this.$.write(a); this.$.close() }, find: function (a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) }, findOne: function (a) {
            return (a =
                this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null
        }, _getHtml5ShivFrag: function () { var a = this.getCustomData("html5ShivFrag"); a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a)); return a }
    }), CKEDITOR.dom.nodeList = function (a) { this.$ = a }, CKEDITOR.dom.nodeList.prototype = {
        count: function () { return this.$.length }, getItem: function (a) { return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null }, toArray: function () {
            return CKEDITOR.tools.array.map(this.$,
                function (a) { return new CKEDITOR.dom.node(a) })
        }
    }, CKEDITOR.dom.element = function (a, e) { "string" == typeof a && (a = (e ? e.$ : document).createElement(a)); CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.element.get = function (a) { return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function (a, e) {
        var c = new CKEDITOR.dom.element("div", e); c.setHtml(a);
        return c.getFirst().remove()
    }, CKEDITOR.dom.element.setMarker = function (a, e, c, b) { var f = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), m = e.getCustomData("list_marker_names") || e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names"); a[f] = e; m[c] = 1; return e.setCustomData(c, b) }, CKEDITOR.dom.element.clearAllMarkers = function (a) { for (var e in a) CKEDITOR.dom.element.clearMarkers(a, a[e], 1) }, CKEDITOR.dom.element.clearMarkers =
    function (a, e, c) { var b = e.getCustomData("list_marker_names"), f = e.getCustomData("list_marker_id"), m; for (m in b) e.removeCustomData(m); e.removeCustomData("list_marker_names"); c && (e.removeCustomData("list_marker_id"), delete a[f]) }, function () {
        function a(a, d) { return -1 < (" " + a + " ").replace(m, " ").indexOf(" " + d + " ") } function e(a) { var d = !0; a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), d = !1); return function () { d || a.removeAttribute("id") } } function c(a, d) {
            var b = CKEDITOR.tools.escapeCss(a.$.id); return "#" +
                b + " " + d.split(/,\s*/).join(", #" + b + " ")
        } function b(a) { for (var d = 0, b = 0, g = h[a].length; b < g; b++)d += parseFloat(this.getComputedStyle(h[a][b]) || 0, 10) || 0; return d } var f = document.createElement("_").classList, f = "undefined" !== typeof f && null !== String(f.add).match(/\[Native code\]/gi), m = /[\n\t\r]/g; CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT, addClass: f ? function (a) { this.$.classList.add(a); return this } : function (b) {
                var d = this.$.className; d && (a(d, b) || (d += " " + b)); this.$.className =
                    d || b; return this
            }, removeClass: f ? function (a) { var d = this.$; d.classList.remove(a); d.className || d.removeAttribute("class"); return this } : function (b) { var d = this.getAttribute("class"); d && a(d, b) && ((d = d.replace(new RegExp("(?:^|\\s+)" + b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", d) : this.removeAttribute("class")); return this }, hasClass: function (b) { return a(this.$.className, b) }, append: function (a, d) {
            "string" == typeof a && (a = this.getDocument().createElement(a)); d ? this.$.insertBefore(a.$, this.$.firstChild) :
                this.$.appendChild(a.$); return a
            }, appendHtml: function (a) { if (this.$.childNodes.length) { var d = new CKEDITOR.dom.element("div", this.getDocument()); d.setHtml(a); d.moveChildren(this) } else this.setHtml(a) }, appendText: function (a) { null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a)) }, appendBogus: function (a) {
                if (a || CKEDITOR.env.needsBrFiller) {
                    for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a &&
                        a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a))
                }
            }, breakParent: function (a, d) {
                var b = new CKEDITOR.dom.range(this.getDocument()); b.setStartAfter(this); b.setEndAfter(a); var g = b.extractContents(!1, d || !1), c; b.insertNode(this.remove()); if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
                    for (b = new CKEDITOR.dom.element("div"); c = g.getFirst();)c.$.style.backgroundColor && (c.$.style.backgroundColor = c.$.style.backgroundColor), b.append(c); b.insertAfter(this);
                    b.remove(!0)
                } else g.insertAfterNode(this)
            }, contains: document.compareDocumentPosition ? function (a) { return !!(this.$.compareDocumentPosition(a.$) & 16) } : function (a) { var d = this.$; return a.type != CKEDITOR.NODE_ELEMENT ? d.contains(a.getParent().$) : d != a.$ && d.contains(a.$) }, focus: function () { function a() { try { this.$.focus() } catch (d) { } } return function (d) { d ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(), getHtml: function () { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a }, getOuterHtml: function () {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/,
                    ""); var a = this.$.ownerDocument.createElement("div"); a.appendChild(this.$.cloneNode(!0)); return a.innerHTML
            }, getClientRect: function (a) { var d = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect()); !d.width && (d.width = d.right - d.left); !d.height && (d.height = d.bottom - d.top); return a ? CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(), d) : d }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) {
                try {
                    var d = this.$; if (this.getParent()) return d.innerHTML = a; var b = this.getDocument()._getHtml5ShivFrag();
                    b.appendChild(d); d.innerHTML = a; b.removeChild(d); return a
                } catch (g) { this.$.innerHTML = ""; d = new CKEDITOR.dom.element("body", this.getDocument()); d.$.innerHTML = a; for (d = d.getChildren(); d.count();)this.append(d.getItem(0)); return a }
            } : function (a) { return this.$.innerHTML = a }, setText: function () { var a = document.createElement("p"); a.innerHTML = "x"; a = a.textContent; return function (d) { this.$[a ? "textContent" : "innerText"] = d } }(), getAttribute: function () {
                var a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie &&
                    (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                        switch (a) {
                            case "class": a = "className"; break; case "http-equiv": a = "httpEquiv"; break; case "name": return this.$.name; case "tabindex": return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), a; case "checked": return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[a]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ?
                                this.$.getAttribute("contentEditable") : null
                        }return this.$.getAttribute(a, 2)
                    } : a
            }(), getAttributes: function (a) { var d = {}, b = this.$.attributes, g; a = CKEDITOR.tools.isArray(a) ? a : []; for (g = 0; g < b.length; g++)-1 === CKEDITOR.tools.indexOf(a, b[g].name) && (d[b[g].name] = b[g].value); return d }, getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) {
                var d = this.getWindow().$.getComputedStyle(this.$, null); return d ?
                    d.getPropertyValue(a) : ""
            } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] }, getDtd: function () { var a = CKEDITOR.dtd[this.getName()]; this.getDtd = function () { return a }; return a }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 }, getText: function () { return this.$.textContent || this.$.innerText || "" }, getWindow: function () { return this.getDocument().getWindow() },
            getId: function () { return this.$.id || null }, getNameAtt: function () { return this.$.name || null }, getName: function () { var a = this.$.nodeName.toLowerCase(); if (CKEDITOR.env.ie && 8 >= document.documentMode) { var d = this.$.scopeName; "HTML" != d && (a = d.toLowerCase() + ":" + a) } this.getName = function () { return a }; return this.getName() }, getValue: function () { return this.$.value }, getFirst: function (a) { var d = this.$.firstChild; (d = d && new CKEDITOR.dom.node(d)) && a && !a(d) && (d = d.getNext(a)); return d }, getLast: function (a) {
                var d = this.$.lastChild;
                (d = d && new CKEDITOR.dom.node(d)) && a && !a(d) && (d = d.getPrevious(a)); return d
            }, getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] }, is: function () { var a = this.getName(); if ("object" == typeof arguments[0]) return !!arguments[0][a]; for (var d = 0; d < arguments.length; d++)if (arguments[d] == a) return !0; return !1 }, isEditable: function (a) {
                var d = this.getName(); return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[d] ||
                    CKEDITOR.dtd.$empty[d] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[d] || CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
            }, isIdentical: function (a) {
                var d = this.clone(0, 1); a = a.clone(0, 1); d.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (d.$.isEqualNode) return d.$.style.cssText = CKEDITOR.tools.normalizeCssText(d.$.style.cssText),
                    a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), d.$.isEqualNode(a.$); d = d.getOuterHtml(); a = a.getOuterHtml(); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) { var b = this.getParent(); b.type == CKEDITOR.NODE_ELEMENT && (b = b.clone(), b.setHtml(d), d = b.getHtml(), b.setHtml(a), a = b.getHtml()) } return d == a
            }, isVisible: function () {
                var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), d, b; a && CKEDITOR.env.webkit && (d = this.getWindow(), !d.equals(CKEDITOR.document.getWindow()) &&
                    (b = d.$.frameElement) && (a = (new CKEDITOR.dom.element(b)).isVisible())); return !!a
            }, isEmptyInlineRemoveable: function () { if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1; for (var a = this.getChildren(), d = 0, b = a.count(); d < b; d++) { var g = a.getItem(d); if (g.type != CKEDITOR.NODE_ELEMENT || !g.data("cke-bookmark")) if (g.type == CKEDITOR.NODE_ELEMENT && !g.isEmptyInlineRemoveable() || g.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(g.getText())) return !1 } return !0 }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat ||
                CKEDITOR.env.quirks) ? function () { for (var a = this.$.attributes, d = 0; d < a.length; d++) { var b = a[d]; switch (b.nodeName) { case "class": if (this.getAttribute("class")) return !0; case "data-cke-expando": continue; default: if (b.specified) return !0 } } return !1 } : function () { var a = this.$.attributes, d = a.length, b = { "data-cke-expando": 1, _moz_dirty: 1 }; return 0 < d && (2 < d || !b[a[0].nodeName] || 2 == d && !b[a[1].nodeName]) }, hasAttribute: function () {
                    function a(d) {
                        var b = this.$.attributes.getNamedItem(d); if ("input" == this.getName()) switch (d) {
                            case "class": return 0 <
                                this.$.className.length; case "checked": return !!this.$.checked; case "value": return d = this.getAttribute("type"), "checkbox" == d || "radio" == d ? "on" != this.$.value : !!this.$.value
                        }return b ? b.specified : !1
                    } return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (d) { return "name" == d ? !!this.$.name : a.call(this, d) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
                }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (a, d) {
                    var b = this.$; a = a.$; if (b != a) {
                        var g; if (d) for (; g = b.lastChild;)a.insertBefore(b.removeChild(g),
                            a.firstChild); else for (; g = b.firstChild;)a.appendChild(b.removeChild(g))
                    }
                }, mergeSiblings: function () {
                    function a(d, b, g) { if (b && b.type == CKEDITOR.NODE_ELEMENT) { for (var c = []; b.data("cke-bookmark") || b.isEmptyInlineRemoveable();)if (c.push(b), b = g ? b.getNext() : b.getPrevious(), !b || b.type != CKEDITOR.NODE_ELEMENT) return; if (d.isIdentical(b)) { for (var f = g ? d.getLast() : d.getFirst(); c.length;)c.shift().move(d, !g); b.moveChildren(d, !g); b.remove(); f && f.type == CKEDITOR.NODE_ELEMENT && f.mergeSiblings() } } } return function (d) {
                        if (!1 ===
                            d || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious())
                    }
                }(), show: function () { this.setStyles({ display: "", visibility: "" }) }, setAttribute: function () {
                    var a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (d, b) {
                        "class" == d ? this.$.className = b : "style" == d ? this.$.style.cssText = b : "tabindex" == d ? this.$.tabIndex = b : "checked" == d ? this.$.checked = b : "contenteditable" == d ? a.call(this,
                            "contentEditable", b) : a.apply(this, arguments); return this
                    } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (d, b) { if ("src" == d && b.match(/^http:\/\//)) try { a.apply(this, arguments) } catch (g) { } else a.apply(this, arguments); return this } : a
                }(), setAttributes: function (a) { for (var d in a) this.setAttribute(d, a[d]); return this }, setValue: function (a) { this.$.value = a; return this }, removeAttribute: function () {
                    var a = function (a) { this.$.removeAttribute(a) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ?
                        function (a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"); this.$.removeAttribute(a) } : a
                }(), removeAttributes: function (a) { if (CKEDITOR.tools.isArray(a)) for (var d = 0; d < a.length; d++)this.removeAttribute(a[d]); else for (d in a = a || this.getAttributes(), a) a.hasOwnProperty(d) && this.removeAttribute(d) }, removeStyle: function (a) {
                    var d = this.$.style; if (d.removeProperty || "border" != a && "margin" != a && "padding" != a) d.removeProperty ? d.removeProperty(a) : d.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)),
                        this.$.style.cssText || this.removeAttribute("style"); else { var b = ["top", "left", "right", "bottom"], g; "border" == a && (g = ["color", "style", "width"]); for (var d = [], c = 0; c < b.length; c++)if (g) for (var f = 0; f < g.length; f++)d.push([a, b[c], g[f]].join("-")); else d.push([a, b[c]].join("-")); for (a = 0; a < d.length; a++)this.removeStyle(d[a]) }
                }, setStyle: function (a, d) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = d; return this }, setStyles: function (a) { for (var d in a) this.setStyle(d, a[d]); return this }, setOpacity: function (a) {
                    CKEDITOR.env.ie &&
                    9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a)
                }, unselectable: function () { this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, d = this.getElementsByTag("*"), b = 0, g = d.count(); b < g; b++)a = d.getItem(b), a.setAttribute("unselectable", "on") } }, getPositionedAncestor: function () {
                    for (var a = this; "html" != a.getName();) {
                        if ("static" !=
                            a.getComputedStyle("position")) return a; a = a.getParent()
                    } return null
                }, getDocumentPosition: function (a) {
                    var d = 0, b = 0, g = this.getDocument(), c = g.getBody(), f = "BackCompat" == g.$.compatMode; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ? 8 !== CKEDITOR.env.version : 1)) {
                        var e = this.$.getBoundingClientRect(), h = g.$.documentElement, m = h.clientTop || c.$.clientTop || 0, u = h.clientLeft || c.$.clientLeft || 0, x = !0; CKEDITOR.env.ie && (x = g.getDocumentElement().contains(this), g = g.getBody().contains(this), x = f && g ||
                            !f && x); x && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (d = c.$.scrollLeft || h.scrollLeft, b = c.$.scrollTop || h.scrollTop) : (b = f ? c.$ : h, d = b.scrollLeft, b = b.scrollTop), d = e.left + d - u, b = e.top + b - m)
                    } else for (m = this, u = null; m && "body" != m.getName() && "html" != m.getName();) {
                        d += m.$.offsetLeft - m.$.scrollLeft; b += m.$.offsetTop - m.$.scrollTop; m.equals(this) || (d += m.$.clientLeft || 0, b += m.$.clientTop || 0); for (; u && !u.equals(m);)d -= u.$.scrollLeft, b -= u.$.scrollTop, u = u.getParent(); u = m; m = (e = m.$.offsetParent) ? new CKEDITOR.dom.element(e) :
                            null
                    } a && (e = this.getWindow(), m = a.getWindow(), !e.equals(m) && e.$.frameElement && (a = (new CKEDITOR.dom.element(e.$.frameElement)).getDocumentPosition(a), d += a.x, b += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || f || (d += this.$.clientLeft ? 1 : 0, b += this.$.clientTop ? 1 : 0); return { x: d, y: b }
                }, scrollIntoView: function (a) {
                    var b = this.getParent(); if (b) {
                        do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b,
                            a, 1), b.is("html")) { var c = b.getWindow(); try { var g = c.$.frameElement; g && (b = new CKEDITOR.dom.element(g)) } catch (f) { } } while (b = b.getParent())
                    }
                }, scrollIntoParent: function (a, b, c) {
                    var g, f, e, h; function m(g, b) { /body|html/.test(a.getName()) ? a.getWindow().$.scrollBy(g, b) : (a.$.scrollLeft += g, a.$.scrollTop += b) } function q(a, g) {
                        var b = { x: 0, y: 0 }; if (!a.is(x ? "body" : "html")) { var d = a.$.getBoundingClientRect(); b.x = d.left; b.y = d.top } d = a.getWindow(); d.equals(g) || (d = q(CKEDITOR.dom.element.get(d.$.frameElement), g), b.x += d.x, b.y +=
                            d.y); return b
                    } function u(a, g) { return parseInt(a.getComputedStyle("margin-" + g) || 0, 10) || 0 } !a && (a = this.getWindow()); e = a.getDocument(); var x = "BackCompat" == e.$.compatMode; a instanceof CKEDITOR.dom.window && (a = x ? e.getBody() : e.getDocumentElement()); CKEDITOR.env.webkit && (e = this.getEditor(!1)) && (e._.previousScrollTop = null); e = a.getWindow(); f = q(this, e); var r = q(a, e), z = this.$.offsetHeight; g = this.$.offsetWidth; var t = a.$.clientHeight, y = a.$.clientWidth; e = f.x - u(this, "left") - r.x || 0; h = f.y - u(this, "top") - r.y || 0; g = f.x +
                        g + u(this, "right") - (r.x + y) || 0; f = f.y + z + u(this, "bottom") - (r.y + t) || 0; (0 > h || 0 < f) && m(0, !0 === b ? h : !1 === b ? f : 0 > h ? h : f); c && (0 > e || 0 < g) && m(0 > e ? e : g, 0)
                }, setState: function (a, b, c) {
                    b = b || "cke"; switch (a) {
                        case CKEDITOR.TRISTATE_ON: this.addClass(b + "_on"); this.removeClass(b + "_off"); this.removeClass(b + "_disabled"); c && this.setAttribute("aria-pressed", !0); c && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(b + "_disabled"); this.removeClass(b + "_off"); this.removeClass(b + "_on"); c && this.setAttribute("aria-disabled",
                            !0); c && this.removeAttribute("aria-pressed"); break; default: this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                    }
                }, getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a, b) {
                    var c = this.$.attributes; b = b || {}; for (var g = 0; g < c.length; g++) {
                        var f = c[g], e = f.nodeName.toLowerCase(),
                        h; if (!(e in b)) if ("checked" == e && (h = this.getAttribute(e))) a.setAttribute(e, h); else if (!CKEDITOR.env.ie || this.hasAttribute(e)) h = this.getAttribute(e), null === h && (h = f.nodeValue), a.setAttribute(e, h)
                    } "" !== this.$.style.cssText && (a.$.style.cssText = this.$.style.cssText)
                }, renameNode: function (a) {
                    if (this.getName() != a) {
                        var b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$); a.$["data-cke-expando"] = this.$["data-cke-expando"];
                        this.$ = a.$; delete this.getName
                    }
                }, getChild: function () { function a(b, c) { var g = b.childNodes; if (0 <= c && c < g.length) return g[c] } return function (b) { var c = this.$; if (b.slice) for (b = b.slice(); 0 < b.length && c;)c = a(c, b.shift()); else c = a(c, b); return c ? new CKEDITOR.dom.node(c) : null } }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () {
                    function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu", function (b) {
                        b.data.getTarget().getAscendant(a,
                            !0) || b.data.preventDefault()
                    })
                }, getDirection: function (a) { return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir") }, data: function (a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null }, getEditor: function (a) {
                    var b = CKEDITOR.instances, c, g, f; a = a || void 0 === a; for (c in b) if (g = b[c], g.element.equals(this) &&
                        g.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (f = g.editable()) && (f.equals(this) || f.contains(this))) return g; return null
                }, find: function (a) { var b = e(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(c(this, a))); b(); return a }, findOne: function (a) { var b = e(this); a = this.$.querySelector(c(this, a)); b(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, b, c) {
                    if (!(c || b && this.type != b)) var g = a(this); if (!1 !== g) {
                        c = this.getChildren(); for (var f = 0; f < c.count(); f++)g = c.getItem(f), g.type == CKEDITOR.NODE_ELEMENT ?
                            g.forEach(a, b) : b && g.type != b || a(g)
                    }
                }, fireEventHandler: function (a, b) { var c = "on" + a, g = this.$; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) { var f = g.ownerDocument.createEventObject(), e; for (e in b) f[e] = b[e]; g.fireEvent(c, f) } else g[g[a] ? a : c](b) }
        }); var h = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] }; CKEDITOR.dom.element.prototype.setSize = function (a, d, c) {
        "number" == typeof d && (!c || CKEDITOR.env.ie &&
            CKEDITOR.env.quirks || (d -= b.call(this, a)), this.setStyle(a, d + "px"))
        }; CKEDITOR.dom.element.prototype.getSize = function (a, d) { var c = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0; d && (c -= b.call(this, a)); return c }
    }(), CKEDITOR.dom.documentFragment = function (a) { a = a || CKEDITOR.document; this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function (a) { a = a.$; a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function () { var a = new CKEDITOR.dom.element("div"); this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "") }
    }, !0, { append: 1, appendBogus: 1, clone: 1, getFirst: 1, getHtml: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1 }), CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
        CKEDITOR.dom.document.prototype, !0, { find: 1, findOne: 1 }), function () {
            function a(a, g) {
                var b = this.range; if (this._.end) return null; if (!this._.start) { this._.start = 1; if (b.collapsed) return this.end(), null; b.optimize() } var d, c = b.startContainer; d = b.endContainer; var f = b.startOffset, n = b.endOffset, k, e = this.guard, h = this.type, m = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) {
                    var l = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(), B = d.type == CKEDITOR.NODE_ELEMENT ? d.getChild(n) : d.getNext(); this._.guardLTR =
                        function (a, g) { return (!g || !l.equals(a)) && (!B || !a.equals(B)) && (a.type != CKEDITOR.NODE_ELEMENT || !g || !a.equals(b.root)) }
                } if (a && !this._.guardRTL) { var H = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(), F = c.type == CKEDITOR.NODE_ELEMENT ? f ? c.getChild(f - 1) : null : c.getPrevious(); this._.guardRTL = function (a, g) { return (!g || !H.equals(a)) && (!F || !a.equals(F)) && (a.type != CKEDITOR.NODE_ELEMENT || !g || !a.equals(b.root)) } } var K = a ? this._.guardRTL : this._.guardLTR; k = e ? function (a, g) { return !1 === K(a, g) ? !1 : e(a, g) } : K; this.current ? d = this.current[m](!1,
                    h, k) : (a ? d.type == CKEDITOR.NODE_ELEMENT && (d = 0 < n ? d.getChild(n - 1) : !1 === k(d, !0) ? null : d.getPreviousSourceNode(!0, h, k)) : (d = c, d.type == CKEDITOR.NODE_ELEMENT && ((d = d.getChild(f)) || (d = !1 === k(c, !0) ? null : c.getNextSourceNode(!0, h, k)))), d && !1 === k(d) && (d = null)); for (; d && !this._.end;) { this.current = d; if (!this.evaluator || !1 !== this.evaluator(d)) { if (!g) return d } else if (g && this.evaluator) return !1; d = d[m](!1, h, k) } this.end(); return this.current = null
            } function e(g) { for (var b, d = null; b = a.call(this, g);)d = b; return d } CKEDITOR.dom.walker =
                CKEDITOR.tools.createClass({ $: function (a) { this.range = a; this._ = {} }, proto: { end: function () { this._.end = 1 }, next: function () { return a.call(this) }, previous: function () { return a.call(this, 1) }, checkForward: function () { return !1 !== a.call(this, 0, 1) }, checkBackward: function () { return !1 !== a.call(this, 1, 1) }, lastForward: function () { return e.call(this) }, lastBackward: function () { return e.call(this, 1) }, reset: function () { delete this.current; this._ = {} } } }); var c = {
                    block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1,
                    "table-footer-group": 1, "table-row": 1, "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1
                }, b = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in b || !c[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (g) { return !(g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary =
                    function () { return this.blockBoundary({ br: 1 }) }; CKEDITOR.dom.walker.bookmark = function (a, g) { function b(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") } return function (d) { var c, f; c = d && d.type != CKEDITOR.NODE_ELEMENT && (f = d.getParent()) && b(f); c = a ? c : c || b(d); return !!(g ^ c) } }; CKEDITOR.dom.walker.whitespaces = function (a) {
                        return function (g) {
                            var b; g && g.type == CKEDITOR.NODE_TEXT && (b = !CKEDITOR.tools.trim(g.getText()) || CKEDITOR.env.webkit && g.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
                            return !!(a ^ b)
                        }
                    }; CKEDITOR.dom.walker.invisible = function (a) { var g = CKEDITOR.dom.walker.whitespaces(), b = CKEDITOR.env.webkit ? 1 : 0; return function (d) { g(d) ? d = 1 : (d.type == CKEDITOR.NODE_TEXT && (d = d.getParent()), d = d.$.offsetWidth <= b); return !!(a ^ d) } }; CKEDITOR.dom.walker.nodeType = function (a, g) { return function (b) { return !!(g ^ b.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) {
                        function g(a) { return !m(a) && !h(a) } return function (b) {
                            var d = CKEDITOR.env.needsBrFiller ? b.is && b.is("br") : b.getText && f.test(b.getText()); d && (d = b.getParent(),
                                b = b.getNext(g), d = d.isBlockBoundary() && (!b || b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary())); return !!(a ^ d)
                        }
                    }; CKEDITOR.dom.walker.temp = function (a) { return function (g) { g.type != CKEDITOR.NODE_ELEMENT && (g = g.getParent()); g = g && g.hasAttribute("data-cke-temp"); return !!(a ^ g) } }; var f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, m = CKEDITOR.dom.walker.whitespaces(), h = CKEDITOR.dom.walker.bookmark(), l = CKEDITOR.dom.walker.temp(), d = function (a) { return h(a) || m(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) };
            CKEDITOR.dom.walker.ignored = function (a) { return function (g) { g = m(g) || h(g) || l(g); return !!(a ^ g) } }; var k = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty = function (a) { return function (g) { for (var b = 0, d = g.getChildCount(); b < d; ++b)if (!k(g.getChild(b))) return !!a; return !a } }; var g = CKEDITOR.dom.walker.empty(), n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) { var g = {}, b; for (b in a) CKEDITOR.dtd[b]["#"] && (g[b] = 1); return g }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable =
                function (a) { return function (b) { b = k(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && g(b)) ? !0 : !1; return !!(a ^ b) } }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (d(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && f.test(a.getText())) ? a : !1 }
        }(), CKEDITOR.dom.range = function (a) {
        this.endOffset = this.endContainer =
            this.startOffset = this.startContainer = null; this.collapsed = !0; var e = a instanceof CKEDITOR.dom.document; this.document = e ? a : a.getDocument(); this.root = e ? a.getBody() : a
        }, function () {
            function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function e(a, b, d, c, f) {
                function k(a, g, b, d) { var c = b ? a.getPrevious() : a.getNext(); if (d && m) return c; t || d ? g.append(a.clone(!0, f), b) : (a.remove(), l && g.append(a, b)); return c } function e() {
                    var a, g, b, d = Math.min(G.length,
                        D.length); for (a = 0; a < d; a++)if (g = G[a], b = D[a], !g.equals(b)) return a; return a - 1
                } function h() {
                    var b = N - 1, d = K && I && !y.equals(C); b < Q - 1 || b < O - 1 || d ? (d ? a.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START) : O == b + 1 && F ? a.moveToPosition(D[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(D[b + 1], CKEDITOR.POSITION_BEFORE_START), c && (b = G[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (d = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), d.insertAfter(b),
                        b.mergeSiblings(!1), a.moveToBookmark({ startNode: d }))) : a.collapse(!0)
                } a.optimizeBookmark(); var m = 0 === b, l = 1 == b, t = 2 == b; b = t || l; var y = a.startContainer, C = a.endContainer, A = a.startOffset, B = a.endOffset, H, F, K, I, E, M; if (t && C.type == CKEDITOR.NODE_TEXT && (y.equals(C) || y.type === CKEDITOR.NODE_ELEMENT && y.getFirst().equals(C))) d.append(a.document.createText(C.substring(A, B))); else {
                C.type == CKEDITOR.NODE_TEXT ? t ? M = !0 : C = C.split(B) : 0 < C.getChildCount() ? B >= C.getChildCount() ? (C = C.getChild(B - 1), F = !0) : C = C.getChild(B) : I = F = !0; y.type ==
                    CKEDITOR.NODE_TEXT ? t ? E = !0 : y.split(A) : 0 < y.getChildCount() ? 0 === A ? (y = y.getChild(A), H = !0) : y = y.getChild(A - 1) : K = H = !0; for (var G = y.getParents(), D = C.getParents(), N = e(), Q = G.length - 1, O = D.length - 1, J = d, W, R, Z, ga = -1, X = N; X <= Q; X++) { R = G[X]; Z = R.getNext(); for (X != Q || R.equals(D[X]) && Q < O ? b && (W = J.append(R.clone(0, f))) : H ? k(R, J, !1, K) : E && J.append(a.document.createText(R.substring(A))); Z;) { if (Z.equals(D[X])) { ga = X; break } Z = k(Z, J) } J = W } J = d; for (X = N; X <= O; X++)if (d = D[X], Z = d.getPrevious(), d.equals(G[X])) b && (J = J.getChild(0)); else {
                    X !=
                        O || d.equals(G[X]) && O < Q ? b && (W = J.append(d.clone(0, f))) : F ? k(d, J, !1, I) : M && J.append(a.document.createText(d.substring(0, B))); if (X > ga) for (; Z;)Z = k(Z, J, !0); J = W
                    } t || h()
                }
            } function c() { var a = !1, b = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark(!0), c = CKEDITOR.dom.walker.bogus(); return function (f) { return d(f) || b(f) ? !0 : c(f) && !a ? a = !0 : f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) || f.type == CKEDITOR.NODE_ELEMENT && !f.is(m) ? !1 : !0 } } function b(a) {
                var b = CKEDITOR.dom.walker.whitespaces(),
                d = CKEDITOR.dom.walker.bookmark(1); return function (c) { return d(c) || b(c) ? !0 : !a && h(c) || c.type == CKEDITOR.NODE_ELEMENT && c.is(CKEDITOR.dtd.$removeEmpty) }
            } function f(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && k(a) && (b = a); return d(a) && !(h(a) && a.equals(b)) }) } } var m = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, h = CKEDITOR.dom.walker.bogus(),
                l = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, d = CKEDITOR.dom.walker.editable(), k = CKEDITOR.dom.walker.ignored(!0); CKEDITOR.dom.range.prototype = {
                    clone: function () { var a = new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer); a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a }, collapse: function (a) {
                        a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer),
                            this.startOffset = this.endOffset); this.collapsed = !0
                    }, cloneContents: function (a) { var b = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || e(this, 2, b, !1, "undefined" == typeof a ? !0 : a); return b }, deleteContents: function (a) { this.collapsed || e(this, 0, null, a) }, extractContents: function (a, b) { var d = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || e(this, 1, d, a, "undefined" == typeof b ? !0 : b); return d }, createBookmark: function (a) {
                        var b, d, c, f, k = this.collapsed; b = this.document.createElement("span");
                        b.data("cke-bookmark", 1); b.setStyle("display", "none"); b.setHtml("\x26nbsp;"); a && (c = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", c + (k ? "C" : "S"))); k || (d = b.clone(), d.setHtml("\x26nbsp;"), a && d.setAttribute("id", c + "E"), f = this.clone(), f.collapse(), f.insertNode(d)); f = this.clone(); f.collapse(!0); f.insertNode(b); d ? (this.setStartAfter(b), this.setEndBefore(d)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? c + (k ? "C" : "S") : b, endNode: a ? c + "E" : d, serializable: a, collapsed: k }
                    }, createBookmark2: function () {
                        function a(b) {
                            var g =
                                b.container, c = b.offset, f; f = g; var k = c; f = f.type != CKEDITOR.NODE_ELEMENT || 0 === k || k == f.getChildCount() ? 0 : f.getChild(k - 1).type == CKEDITOR.NODE_TEXT && f.getChild(k).type == CKEDITOR.NODE_TEXT; f && (g = g.getChild(c - 1), c = g.getLength()); if (g.type == CKEDITOR.NODE_ELEMENT && 0 < c) { a: { for (f = g; c--;)if (k = f.getChild(c).getIndex(!0), 0 <= k) { c = k; break a } c = -1 } c += 1 } if (g.type == CKEDITOR.NODE_TEXT) {
                                    f = g; for (k = 0; (f = f.getPrevious()) && f.type == CKEDITOR.NODE_TEXT;)k += f.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
                                    f = k; g.isEmpty() ? (k = g.getPrevious(d), f ? (c = f, g = k ? k.getNext() : g.getParent().getFirst()) : (g = g.getParent(), c = k ? k.getIndex(!0) + 1 : 0)) : c += f
                                } b.container = g; b.offset = c
                        } function b(a, g) { var d = g.getCustomData("cke-fillingChar"); if (d) { var c = a.container; d.equals(c) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = c.getIndex(), a.container = c.getParent())) } } var d = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0); return function (d) {
                            var c = this.collapsed, f = {
                                container: this.startContainer,
                                offset: this.startOffset
                            }, k = { container: this.endContainer, offset: this.endOffset }; d && (a(f), b(f, this.root), c || (a(k), b(k, this.root))); return { start: f.container.getAddress(d), end: c ? null : k.container.getAddress(d), startOffset: f.offset, endOffset: k.offset, normalized: d, collapsed: c, is2: !0 }
                        }
                    }(), moveToBookmark: function (a) {
                        if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized), d = a.startOffset, c = a.end && this.document.getByAddress(a.end, a.normalized); a = a.endOffset; this.setStart(b, d); c ? this.setEnd(c, a) : this.collapse(!0) } else b =
                            (d = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = d ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
                    }, getBoundaryNodes: function () {
                        var a = this.startContainer, b = this.endContainer, d = this.startOffset, c = this.endOffset, f; if (a.type == CKEDITOR.NODE_ELEMENT) if (f = a.getChildCount(), f > d) a = a.getChild(d); else if (1 > f) a = a.getPreviousSourceNode(); else {
                            for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a =
                                a.getNextSourceNode() || a
                        } if (b.type == CKEDITOR.NODE_ELEMENT) if (f = b.getChildCount(), f > c) b = b.getChild(c).getPreviousSourceNode(!0); else if (1 > f) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;)b = b.lastChild; b = new CKEDITOR.dom.node(b) } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
                    }, getCommonAncestor: function (a, b) {
                        var d = this.startContainer, c = this.endContainer, d = d.equals(c) ? a && d.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? d.getChild(this.startOffset) :
                            d : d.getCommonAncestor(c); return b && !d.is ? d.getParent() : d
                    }, optimize: function () { var a = this.startContainer, b = this.startOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a)) }, optimizeBookmark: function () {
                        var a = this.startContainer, b = this.endContainer; a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                        b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
                    }, trim: function (a, b) {
                        var d = this.startContainer, c = this.startOffset, f = this.collapsed; if ((!a || f) && d && d.type == CKEDITOR.NODE_TEXT) {
                            if (c) if (c >= d.getLength()) c = d.getIndex() + 1, d = d.getParent(); else { var k = d.split(c), c = d.getIndex() + 1, d = d.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(k, this.endOffset - this.startOffset) : d.equals(this.endContainer) && (this.endOffset += 1) } else c = d.getIndex(), d = d.getParent();
                            this.setStart(d, c); if (f) { this.collapse(!0); return }
                        } d = this.endContainer; c = this.endOffset; b || f || !d || d.type != CKEDITOR.NODE_TEXT || (c ? (c >= d.getLength() || d.split(c), c = d.getIndex() + 1) : c = d.getIndex(), d = d.getParent(), this.setEnd(d, c))
                    }, enlarge: function (a, b) {
                        function d(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } var c = new RegExp(/[^\s\ufeff]/); switch (a) {
                            case CKEDITOR.ENLARGE_INLINE: var f = 1; case CKEDITOR.ENLARGE_ELEMENT: var k = function (a, b) {
                                var g = new CKEDITOR.dom.range(h);
                                g.setStart(a, b); g.setEndAt(h, CKEDITOR.POSITION_BEFORE_END); var g = new CKEDITOR.dom.walker(g), d; for (g.guard = function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; d = g.next();) { if (d.type != CKEDITOR.NODE_TEXT) return !1; H = d != a ? d.getText() : d.substring(b); if (c.test(H)) return !1 } return !0
                            }; if (this.collapsed) break; var e = this.getCommonAncestor(), h = this.root, m, l, t, y, C, A = !1, B, H; B = this.startContainer; var F = this.startOffset; B.type == CKEDITOR.NODE_TEXT ? (F && (B = !CKEDITOR.tools.trim(B.substring(0, F)).length &&
                                B, A = !!B), B && ((y = B.getPrevious()) || (t = B.getParent()))) : (F && (y = B.getChild(F - 1) || B.getLast()), y || (t = B)); for (t = d(t); t || y;) {
                                    if (t && !y) { !C && t.equals(e) && (C = !0); if (f ? t.isBlockBoundary() : !h.contains(t)) break; A && "inline" == t.getComputedStyle("display") || (A = !1, C ? m = t : this.setStartBefore(t)); y = t.getPrevious() } for (; y;)if (B = !1, y.type == CKEDITOR.NODE_COMMENT) y = y.getPrevious(); else {
                                        if (y.type == CKEDITOR.NODE_TEXT) H = y.getText(), c.test(H) && (y = null), B = /[\s\ufeff]$/.test(H); else if ((y.$.offsetWidth > (CKEDITOR.env.webkit ? 1 :
                                            0) || b && y.is("br")) && !y.data("cke-bookmark")) if (A && CKEDITOR.dtd.$removeEmpty[y.getName()]) { H = y.getText(); if (c.test(H)) y = null; else for (var F = y.$.getElementsByTagName("*"), K = 0, I; I = F[K++];)if (!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) { y = null; break } y && (B = !!H.length) } else y = null; B && (A ? C ? m = t : t && this.setStartBefore(t) : A = !0); if (y) { B = y.getPrevious(); if (!t && !B) { t = y; y = null; break } y = B } else t = null
                                    } t && (t = d(t.getParent()))
                                } B = this.endContainer; F = this.endOffset; t = y = null; C = A = !1; B.type == CKEDITOR.NODE_TEXT ?
                                    CKEDITOR.tools.trim(B.substring(F)).length ? A = !0 : (A = !B.getLength(), F == B.getLength() ? (y = B.getNext()) || (t = B.getParent()) : k(B, F) && (t = B.getParent())) : (y = B.getChild(F)) || (t = B); for (; t || y;) {
                                        if (t && !y) { !C && t.equals(e) && (C = !0); if (f ? t.isBlockBoundary() : !h.contains(t)) break; A && "inline" == t.getComputedStyle("display") || (A = !1, C ? l = t : t && this.setEndAfter(t)); y = t.getNext() } for (; y;) {
                                            B = !1; if (y.type == CKEDITOR.NODE_TEXT) H = y.getText(), k(y, 0) || (y = null), B = /^[\s\ufeff]/.test(H); else if (y.type == CKEDITOR.NODE_ELEMENT) {
                                                if ((0 < y.$.offsetWidth ||
                                                    b && y.is("br")) && !y.data("cke-bookmark")) if (A && CKEDITOR.dtd.$removeEmpty[y.getName()]) { H = y.getText(); if (c.test(H)) y = null; else for (F = y.$.getElementsByTagName("*"), K = 0; I = F[K++];)if (!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) { y = null; break } y && (B = !!H.length) } else y = null
                                            } else B = 1; B && A && (C ? l = t : this.setEndAfter(t)); if (y) { B = y.getNext(); if (!t && !B) { t = y; y = null; break } y = B } else t = null
                                        } t && (t = d(t.getParent()))
                                    } m && l && (e = m.contains(l) ? l : m, this.setStartBefore(e), this.setEndAfter(e)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: t =
                                        new CKEDITOR.dom.range(this.root); h = this.root; t.setStartAt(h, CKEDITOR.POSITION_AFTER_START); t.setEnd(this.startContainer, this.startOffset); t = new CKEDITOR.dom.walker(t); var E, M, G = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), D = null, N = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (D) { if (D.equals(a)) { D = null; return } } else D = a; else if (D) return; var b = G(a); b || (E = a); return b }, f = function (a) {
                                            var b = N(a); !b && a.is && a.is("br") &&
                                                (M = a); return b
                                        }; t.guard = N; t = t.lastBackward(); E = E || h; this.setStartAt(E, !E.is("br") && (!t && this.checkStartOfBlock() || t && E.contains(t)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { t = this.clone(); t = new CKEDITOR.dom.walker(t); var Q = CKEDITOR.dom.walker.whitespaces(), O = CKEDITOR.dom.walker.bookmark(); t.evaluator = function (a) { return !Q(a) && !O(a) }; if ((t = t.previous()) && t.type == CKEDITOR.NODE_ELEMENT && t.is("br")) break } t = this.clone(); t.collapse(); t.setEndAt(h,
                                            CKEDITOR.POSITION_BEFORE_END); t = new CKEDITOR.dom.walker(t); t.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : N; E = D = M = null; t = t.lastForward(); E = E || h; this.setEndAt(E, !t && this.checkEndOfBlock() || t && E.contains(t) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); M && this.setEndAfter(M)
                        }
                    }, shrink: function (a, b, d) {
                        var c = "boolean" === typeof d ? d : d && "boolean" === typeof d.shrinkOnBlockBoundary ? d.shrinkOnBlockBoundary : !0, f = d && d.skipBogus; if (!this.collapsed) {
                            a = a || CKEDITOR.SHRINK_TEXT; var k = this.clone(), e =
                                this.startContainer, h = this.endContainer, m = this.startOffset, l = this.endOffset, t = d = 1; e && e.type == CKEDITOR.NODE_TEXT && (m ? m >= e.getLength() ? k.setStartAfter(e) : (k.setStartBefore(e), d = 0) : k.setStartBefore(e)); h && h.type == CKEDITOR.NODE_TEXT && (l ? l >= h.getLength() ? k.setEndAfter(h) : (k.setEndAfter(h), t = 0) : k.setEndBefore(h)); var k = new CKEDITOR.dom.walker(k), y = CKEDITOR.dom.walker.bookmark(), C = CKEDITOR.dom.walker.bogus(); k.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) };
                            var A; k.guard = function (b, d) { if (f && C(b) || y(b)) return !0; if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(A) || !1 === c && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1; d || b.type != CKEDITOR.NODE_ELEMENT || (A = b); return !0 }; d && (e = k[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(e, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); t && (k.reset(), (k = k[a == CKEDITOR.SHRINK_ELEMENT ?
                                "lastBackward" : "previous"]()) && this.setEndAt(k, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)); return !(!d && !t)
                        }
                    }, insertNode: function (a) { this.optimizeBookmark(); this.trim(!1, !0); var b = this.startContainer, d = b.getChild(this.startOffset); d ? a.insertBefore(d) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(!0) }, moveToRange: function (a) {
                        this.setStart(a.startContainer, a.startOffset);
                        this.setEnd(a.endContainer, a.endOffset)
                    }, selectNodeContents: function (a) { this.setStart(a, 0); this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount()) }, setStart: function (b, d) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (d = b.getIndex(), b = b.getParent()); this._setStartContainer(b); this.startOffset = d; this.endContainer || (this._setEndContainer(b), this.endOffset = d); a(this) }, setEnd: function (b, d) {
                    b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (d = b.getIndex() +
                        1, b = b.getParent()); this._setEndContainer(b); this.endOffset = d; this.startContainer || (this._setStartContainer(b), this.startOffset = d); a(this)
                    }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (b, d) {
                        switch (d) {
                            case CKEDITOR.POSITION_AFTER_START: this.setStart(b, 0);
                                break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(b)
                        }a(this)
                    }, setEndAt: function (b, d) {
                        switch (d) {
                            case CKEDITOR.POSITION_AFTER_START: this.setEnd(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(b);
                                break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(b)
                        }a(this)
                    }, fixBlock: function (a, b) { var d = this.createBookmark(), c = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(c); c.trim(); this.insertNode(c); var f = c.getBogus(); f && f.remove(); c.appendBogus(); this.moveToBookmark(d); return c }, splitBlock: function (a, b) {
                        var d = new CKEDITOR.dom.elementPath(this.startContainer, this.root), c = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                        f = d.block, k = c.block, e = null; if (!d.blockLimit.equals(c.blockLimit)) return null; "br" != a && (f || (f = this.fixBlock(!0, a), k = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), k || (k = this.fixBlock(!1, a))); d = f && this.checkStartOfBlock(); c = k && this.checkEndOfBlock(); this.deleteContents(); f && f.equals(k) && (c ? (e = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(k, CKEDITOR.POSITION_AFTER_END), k = null) : d ? (e = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f,
                            CKEDITOR.POSITION_BEFORE_START), f = null) : (k = this.splitElement(f, b || !1), f.is("ul", "ol") || f.appendBogus())); return { previousBlock: f, nextBlock: k, wasStartOfBlock: d, wasEndOfBlock: c, elementPath: e }
                    }, splitElement: function (a, b) { if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var d = this.extractContents(!1, b || !1), c = a.clone(!1, b || !1); d.appendTo(c); c.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return c }, removeEmptyBlocksAtEnd: function () {
                        function a(g) {
                            return function (a) {
                                return b(a) ||
                                    d(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || g.is("table") && a.is("caption") ? !1 : !0
                            }
                        } var b = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark(!1); return function (b) { for (var d = this.createBookmark(), c = this[b ? "endPath" : "startPath"](), f = c.block || c.blockLimit, k; f && !f.equals(c.root) && !f.getFirst(a(f));)k = f.getParent(), this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END), f.remove(1), f = k; this.moveToBookmark(d) }
                    }(), startPath: function () {
                        return new CKEDITOR.dom.elementPath(this.startContainer,
                            this.root)
                    }, endPath: function () { return new CKEDITOR.dom.elementPath(this.endContainer, this.root) }, checkBoundaryOfElement: function (a, d) { var c = d == CKEDITOR.START, f = this.clone(); f.collapse(c); f[c ? "setStartAt" : "setEndAt"](a, c ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); f = new CKEDITOR.dom.walker(f); f.evaluator = b(c); return f[c ? "checkBackward" : "checkForward"]() }, checkStartOfBlock: function () {
                        var a = this.startContainer, b = this.startOffset; CKEDITOR.env.ie && b && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0,
                            b)), l.test(a) && this.trim(0, 1)); this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer, this.root); b = this.clone(); b.collapse(!0); b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(b); a.evaluator = c(); return a.checkBackward()
                    }, checkEndOfBlock: function () {
                        var a = this.endContainer, b = this.endOffset; CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(b)), l.test(a) && this.trim(1, 0)); this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer,
                            this.root); b = this.clone(); b.collapse(!1); b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END); a = new CKEDITOR.dom.walker(b); a.evaluator = c(); return a.checkForward()
                    }, getPreviousNode: function (a, b, d) { var c = this.clone(); c.collapse(1); c.setStartAt(d || this.root, CKEDITOR.POSITION_AFTER_START); d = new CKEDITOR.dom.walker(c); d.evaluator = a; d.guard = b; return d.previous() }, getNextNode: function (a, b, d) {
                        var c = this.clone(); c.collapse(); c.setEndAt(d || this.root, CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(c);
                        d.evaluator = a; d.guard = b; return d.next()
                    }, checkReadOnly: function () { function a(b, d) { for (; b;) { if (b.type == CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(d) || b.equals(d))) break } b = b.getParent() } return 1 } return function () { var b = this.startContainer, d = this.endContainer; return !(a(b, d) && a(d, b)) } }(), moveToElementEditablePosition: function (a, b) {
                        if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a,
                            b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0; for (var d = 0; a;) {
                                if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && l.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); d = 1; break } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), d = 1; else if (b && a.is("br") && this.endContainer &&
                                    this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0; var c = a, f = d, e = void 0; c.type == CKEDITOR.NODE_ELEMENT && c.isEditable(!1) && (e = c[b ? "getLast" : "getFirst"](k)); f || e || (e = c[b ? "getPrevious" : "getNext"](k)); a = e
                            } return !!d
                    }, moveToClosestEditablePosition: function (a, b) {
                        var d, c = 0, f, k, e = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (d = new CKEDITOR.dom.range(this.root),
                            d.moveToPosition(a, e[b ? 0 : 1])) : d = this.clone(); if (a && !a.is(CKEDITOR.dtd.$block)) c = 1; else if (f = d[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) c = 1, (k = f.type == CKEDITOR.NODE_ELEMENT) && f.is(CKEDITOR.dtd.$block) && "false" == f.getAttribute("contenteditable") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), d.setEndAt(f, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && k && f.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (d.setEnd(f, 0), d.collapse()) : d.moveToPosition(f, e[b ? 1 : 0]); c && this.moveToRange(d);
                        return !!c
                    }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) }, moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) }, getEnclosedNode: function () {
                        var a = this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), d = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return d(a) && b(a) }; var c = a.next();
                        a.reset(); return c && c.equals(a.previous()) ? c : null
                    }, getTouchedStartNode: function () { var a = this.startContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a }, getTouchedEndNode: function () { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a }, getNextEditableNode: f(), getPreviousEditableNode: f(1), _getTableElement: function (a) {
                        a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 }; var b = this.getTouchedStartNode(),
                            d = this.getTouchedEndNode(), c = b.getAscendant("table", !0), d = d.getAscendant("table", !0); return c && !this.root.contains(c) ? null : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : c && d && (c.equals(d) || c.contains(d) || d.contains(c)) ? b.getAscendant(a, !0) : null
                    }, scrollIntoView: function () {
                        var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, d, c, f = this.clone(); f.optimize(); (c = f.startContainer.type == CKEDITOR.NODE_TEXT) ? (d = f.startContainer.getText(), b =
                            f.startContainer.split(f.startOffset), a.insertAfter(f.startContainer)) : f.insertNode(a); a.scrollIntoView(); c && (f.startContainer.setText(d), b.remove()); a.remove()
                    }, getClientRects: function () {
                        function a(b, d) {
                            var c = CKEDITOR.tools.array.map(b, function (a) { return a }), g = new CKEDITOR.dom.range(d.root), f, k, e; d.startContainer instanceof CKEDITOR.dom.element && (k = 0 === d.startOffset && d.startContainer.hasAttribute("data-widget")); d.endContainer instanceof CKEDITOR.dom.element && (e = (e = d.endOffset === (d.endContainer.getChildCount ?
                                d.endContainer.getChildCount() : d.endContainer.length)) && d.endContainer.hasAttribute("data-widget")); k && g.setStart(d.startContainer.getParent(), d.startContainer.getIndex()); e && g.setEnd(d.endContainer.getParent(), d.endContainer.getIndex() + 1); if (k || e) d = g; g = d.cloneContents().find("[data-cke-widget-id]").toArray(); if (g = CKEDITOR.tools.array.map(g, function (a) { var b = d.root.editor; a = a.getAttribute("data-cke-widget-id"); return b.widgets.instances[a].element })) return g = CKEDITOR.tools.array.map(g, function (a) {
                                    var b;
                                    b = a.getParent().hasClass("cke_widget_wrapper") ? a.getParent() : a; f = this.root.getDocument().$.createRange(); f.setStart(b.getParent().$, b.getIndex()); f.setEnd(b.getParent().$, b.getIndex() + 1); b = f.getClientRects(); b.widgetRect = a.getClientRect(); return b
                                }, d), CKEDITOR.tools.array.forEach(g, function (a) {
                                    function b(g) {
                                        CKEDITOR.tools.array.forEach(c, function (b, f) {
                                            var k = CKEDITOR.tools.objectCompare(a[g], b); k || (k = CKEDITOR.tools.objectCompare(a.widgetRect, b)); k && (Array.prototype.splice.call(c, f, a.length - g, a.widgetRect),
                                                d = !0)
                                        }); d || (g < c.length - 1 ? b(g + 1) : c.push(a.widgetRect))
                                    } var d; b(0)
                                }), c
                        } function b(a, d, g) {
                            var f; d.collapsed ? g.startContainer instanceof CKEDITOR.dom.element ? (a = g.checkStartOfBlock(), f = new CKEDITOR.dom.text("​"), a ? g.startContainer.append(f, !0) : 0 === g.startOffset ? f.insertBefore(g.startContainer.getFirst()) : (g = g.startContainer.getChildren().getItem(g.startOffset - 1), f.insertAfter(g)), d.setStart(f.$, 0), d.setEnd(f.$, 0), a = d.getClientRects(), f.remove()) : g.startContainer instanceof CKEDITOR.dom.text && ("" === g.startContainer.getText() ?
                                (g.startContainer.setText("​"), a = d.getClientRects(), g.startContainer.setText("")) : a = [c(g.createBookmark())]) : a = [c(g.createBookmark())]; return a
                        } function d(a, b, c) { a = CKEDITOR.tools.extend({}, a); b && (a = CKEDITOR.tools.getAbsoluteRectPosition(c.document.getWindow(), a)); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top); return a } function c(a) {
                            var b = a.startNode; a = a.endNode; var d; b.setText("​"); b.removeStyle("display"); a ? (a.setText("​"), a.removeStyle("display"), d = [b.getClientRect(), a.getClientRect()],
                                a.remove()) : d = [b.getClientRect(), b.getClientRect()]; b.remove(); return { right: Math.max(d[0].right, d[1].right), bottom: Math.max(d[0].bottom, d[1].bottom), left: Math.min(d[0].left, d[1].left), top: Math.min(d[0].top, d[1].top), width: Math.abs(d[0].left - d[1].left), height: Math.max(d[0].bottom, d[1].bottom) - Math.min(d[0].top, d[1].top) }
                        } return void 0 !== this.document.getSelection ? function (c) {
                            var f = this.root.getDocument().$.createRange(), k; f.setStart(this.startContainer.$, this.startOffset); f.setEnd(this.endContainer.$,
                                this.endOffset); k = f.getClientRects(); k = a(k, this); k.length || (k = b(k, f, this)); return CKEDITOR.tools.array.map(k, function (a) { return d(a, c, this) }, this)
                        } : function (a) { return [d(c(this.createBookmark()), a, this)] }
                    }(), _setStartContainer: function (a) { this.startContainer = a }, _setEndContainer: function (a) { this.endContainer = a }, _find: function (a, b) {
                        var d = this.getCommonAncestor(), c = this.getBoundaryNodes(), f = [], k, e, h, m; if (d && d.find) for (e = d.find(a), k = 0; k < e.count(); k++)if (d = e.getItem(k), b || !d.isReadOnly()) h = d.getPosition(c.startNode) &
                            CKEDITOR.POSITION_FOLLOWING || c.startNode.equals(d), m = d.getPosition(c.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED || c.endNode.equals(d), h && m && f.push(d); return f
                    }
                }; CKEDITOR.dom.range.mergeRanges = function (a) {
                    return CKEDITOR.tools.array.reduce(a, function (a, b) {
                        var d = a[a.length - 1], c = !1; b = b.clone(); b.enlarge(CKEDITOR.ENLARGE_ELEMENT); if (d) {
                            var g = new CKEDITOR.dom.range(b.root), c = new CKEDITOR.dom.walker(g), f = CKEDITOR.dom.walker.whitespaces(); g.setStart(d.endContainer, d.endOffset); g.setEnd(b.startContainer,
                                b.startOffset); for (g = c.next(); f(g) || b.endContainer.equals(g);)g = c.next(); c = !g
                        } c ? d.setEnd(b.endContainer, b.endOffset) : a.push(b); return a
                    }, [])
                }
        }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict", function () {
            function a(a) {
            1 >
                arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
            } function e(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function c(a, b, d, f) {
                a: { null == f && (f = e(d)); for (var h; h = f.shift();)if (h.getDtd().p) { f = { element: h, remaining: f }; break a } f = null } if (!f) return 0; if ((h = CKEDITOR.filter.instances[f.element.data("cke-filter")]) && !h.check(b)) return c(a, b, d, f.remaining);
                b = new CKEDITOR.dom.range(f.element); b.selectNodeContents(f.element); b = b.createIterator(); b.enlargeBr = a.enlargeBr; b.enforceRealBlocks = a.enforceRealBlocks; b.activeFilter = b.filter = h; a._.nestedEditable = { element: f.element, container: d, remaining: f.remaining, iterator: b }; return 1
            } function b(a, b, d) { if (!b) return !1; a = a.clone(); a.collapse(!d); return a.checkBoundaryOfElement(b, d ? CKEDITOR.START : CKEDITOR.END) } var f = /^[\r\n\t ]+$/, m = CKEDITOR.dom.walker.bookmark(!1, !0), h = CKEDITOR.dom.walker.whitespaces(!0), l = function (a) {
                return m(a) &&
                    h(a)
            }, d = { dd: 1, dt: 1, li: 1 }; a.prototype = {
                getNextParagraph: function (a) {
                    var g, e, h, w, v; a = a || "p"; if (this._.nestedEditable) { if (g = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, g; this.activeFilter = this.filter; if (c(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a); this._.nestedEditable = null } if (!this.range.root.getDtd()[a]) return null;
                    if (!this._.started) {
                        var q = this.range.clone(); e = q.startPath(); var u = q.endPath(), x = !q.collapsed && b(q, e.block), r = !q.collapsed && b(q, u.block, 1); q.shrink(CKEDITOR.SHRINK_ELEMENT, !0); x && q.setStartAt(e.block, CKEDITOR.POSITION_BEFORE_END); r && q.setEndAt(u.block, CKEDITOR.POSITION_AFTER_START); e = q.endContainer.hasAscendant("pre", !0) || q.startContainer.hasAscendant("pre", !0); q.enlarge(this.forceBrBreak && !e || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); q.collapsed || (e = new CKEDITOR.dom.walker(q.clone()),
                            u = CKEDITOR.dom.walker.bookmark(!0, !0), e.evaluator = u, this._.nextNode = e.next(), e = new CKEDITOR.dom.walker(q.clone()), e.evaluator = u, e = e.previous(), this._.lastNode = e.getNextSourceNode(!0, null, q.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (u = this.range.clone(), u.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), u.checkEndOfBlock() && (u = new CKEDITOR.dom.elementPath(u.endContainer,
                                u.root), this._.lastNode = (u.block || u.blockLimit).getNextSourceNode(!0))), this._.lastNode && q.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = q.document.createText(""), this._.lastNode.insertAfter(e)), q = null); this._.started = 1; e = q
                    } u = this._.nextNode; q = this._.lastNode; for (this._.nextNode = null; u;) {
                        var x = 0, r = u.hasAscendant("pre"), z = u.type != CKEDITOR.NODE_ELEMENT, t = 0; if (z) u.type == CKEDITOR.NODE_TEXT && f.test(u.getText()) && (z = 0); else {
                            var y = u.getName(); if (CKEDITOR.dtd.$block[y] && "false" == u.getAttribute("contenteditable")) {
                                g =
                                u; c(this, a, g); break
                            } else if (u.isBlockBoundary(this.forceBrBreak && !r && { br: 1 })) { if ("br" == y) z = 1; else if (!e && !u.getChildCount() && "hr" != y) { g = u; h = u.equals(q); break } e && (e.setEndAt(u, CKEDITOR.POSITION_BEFORE_START), "br" != y && (this._.nextNode = u)); x = 1 } else { if (u.getFirst()) { e || (e = this.range.clone(), e.setStartAt(u, CKEDITOR.POSITION_BEFORE_START)); u = u.getFirst(); continue } z = 1 }
                        } z && !e && (e = this.range.clone(), e.setStartAt(u, CKEDITOR.POSITION_BEFORE_START)); h = (!x || z) && u.equals(q); if (e && !x) for (; !u.getNext(l) && !h;) {
                            y =
                            u.getParent(); if (y.isBlockBoundary(this.forceBrBreak && !r && { br: 1 })) { x = 1; z = 0; h || y.equals(q); e.setEndAt(y, CKEDITOR.POSITION_BEFORE_END); break } u = y; z = 1; h = u.equals(q); t = 1
                        } z && e.setEndAt(u, CKEDITOR.POSITION_AFTER_END); u = this._getNextSourceNode(u, t, q); if ((h = !u) || x && e) break
                    } if (!g) {
                        if (!e) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; g = new CKEDITOR.dom.elementPath(e.startContainer, e.root); u = g.blockLimit; x = { div: 1, th: 1, td: 1 }; g = g.block; !g && u && !this.enforceRealBlocks && x[u.getName()] &&
                            e.checkStartOfBlock() && e.checkEndOfBlock() && !u.equals(e.root) ? g = u : !g || this.enforceRealBlocks && g.is(d) ? (g = this.range.document.createElement(a), e.extractContents().appendTo(g), g.trim(), e.insertNode(g), w = v = !0) : "li" != g.getName() ? e.checkStartOfBlock() && e.checkEndOfBlock() || (g = g.clone(!1), e.extractContents().appendTo(g), g.trim(), v = e.splitBlock(), w = !v.wasStartOfBlock, v = !v.wasEndOfBlock, e.insertNode(g)) : h || (this._.nextNode = g.equals(q) ? null : this._getNextSourceNode(e.getBoundaryNodes().endNode, 1, q))
                    } w && (w =
                        g.getPrevious()) && w.type == CKEDITOR.NODE_ELEMENT && ("br" == w.getName() ? w.remove() : w.getLast() && "br" == w.getLast().$.nodeName.toLowerCase() && w.getLast().remove()); v && (w = g.getLast()) && w.type == CKEDITOR.NODE_ELEMENT && "br" == w.getName() && (!CKEDITOR.env.needsBrFiller || w.getPrevious(m) || w.getNext(m)) && w.remove(); this._.nextNode || (this._.nextNode = h || g.equals(q) || !q ? null : this._getNextSourceNode(g, 1, q)); return g
                }, _getNextSourceNode: function (a, b, d) {
                    function c(a) { return !(a.equals(d) || a.equals(f)) } var f = this.range.root;
                    for (a = a.getNextSourceNode(b, null, c); !m(a);)a = a.getNextSourceNode(b, null, c); return a
                }
            }; CKEDITOR.dom.range.prototype.createIterator = function () { return new a(this) }
        }(), CKEDITOR.command = function (a, e) {
        this.uiItems = []; this.exec = function (b) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && a.focus(); return !1 === this.fire("exec") ? !0 : !1 !== e.exec.call(this, a, b) }; this.refresh = function (a, c) {
            if (!this.readOnly && a.readOnly) return !0; if (this.context && !c.isContextFor(this.context) ||
                !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire("refresh", { editor: a, path: c }) ? !0 : e.refresh && !1 !== e.refresh.apply(this, arguments)
        }; var c; this.checkAllowed = function (b) { return b || "boolean" != typeof c ? c = a.activeFilter.checkFeature(this) : c }; CKEDITOR.tools.extend(this, e, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!e.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
        }, CKEDITOR.command.prototype =
    {
        enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) }, setState: function (a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = a; this.fire("state"); return !0 }, toggleState: function () {
        this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
            this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
        customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"),
        extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    }, function () {
        function a(a, b, d, c, g) {
            var f, e; a = []; for (f in b) {
                e = b[f]; e = "boolean" == typeof e ? {} : "function" == typeof e ? { match: e } : K(e); "$" != f.charAt(0) && (e.elements = f); d && (e.featureName = d.toLowerCase()); var k = e; k.elements = h(k.elements, /\s+/) || null; k.propertiesOnly = k.propertiesOnly || !0 === k.elements; var m = /\s*,\s*/, n = void 0; for (n in M) {
                k[n] = h(k[n],
                    m) || null; var l = k, u = G[n], D = h(k[G[n]], m), y = k[n], C = [], A = !0, r = void 0; D ? A = !1 : D = {}; for (r in y) "!" == r.charAt(0) && (r = r.slice(1), C.push(r), D[r] = !0, A = !1); for (; r = C.pop();)y[r] = y["!" + r], delete y["!" + r]; l[u] = (A ? !1 : D) || null
                } k.match = k.match || null; c.push(e); a.push(e)
            } b = g.elements; g = g.generic; var p; d = 0; for (c = a.length; d < c; ++d) {
                f = K(a[d]); e = !0 === f.classes || !0 === f.styles || !0 === f.attributes; k = f; n = u = m = void 0; for (m in M) k[m] = x(k[m]); l = !0; for (n in G) {
                    m = G[n]; u = k[m]; D = []; y = void 0; for (y in u) -1 < y.indexOf("*") ? D.push(new RegExp("^" +
                        y.replace(/\*/g, ".*") + "$")) : D.push(y); u = D; u.length && (k[m] = u, l = !1)
                } k.nothingRequired = l; k.noProperties = !(k.attributes || k.classes || k.styles); if (!0 === f.elements || null === f.elements) g[e ? "unshift" : "push"](f); else for (p in k = f.elements, delete f.elements, k) if (b[p]) b[p][e ? "unshift" : "push"](f); else b[p] = [f]
            }
        } function e(a, b, d, g) {
            if (!a.match || a.match(b)) if (g || l(a, b)) if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = c(a.attributes, b.attributes, d.validAttributes)), d.allStyles || (d.allStyles = c(a.styles,
                b.styles, d.validStyles)), !d.allClasses) { a = a.classes; b = b.classes; g = d.validClasses; if (a) if (!0 === a) a = !0; else { for (var f = 0, e = b.length, k; f < e; ++f)k = b[f], g[k] || (g[k] = a(k)); a = !1 } else a = !1; d.allClasses = a }
        } function c(a, b, d) { if (!a) return !1; if (!0 === a) return !0; for (var c in b) d[c] || (d[c] = a(c)); return !1 } function b(a, b, d) {
            if (!a.match || a.match(b)) {
                if (a.noProperties) return !1; d.hadInvalidAttribute = f(a.attributes, b.attributes) || d.hadInvalidAttribute; d.hadInvalidStyle = f(a.styles, b.styles) || d.hadInvalidStyle; a = a.classes;
                b = b.classes; if (a) { for (var c = !1, g = !0 === a, e = b.length; e--;)if (g || a(b[e])) b.splice(e, 1), c = !0; a = c } else a = !1; d.hadInvalidClass = a || d.hadInvalidClass
            }
        } function f(a, b) { if (!a) return !1; var d = !1, c = !0 === a, g; for (g in b) if (c || a(g)) delete b[g], d = !0; return d } function m(a, b, d) { if (a.disabled || a.customConfig && !d || !b) return !1; a._.cachedChecks = {}; return !0 } function h(a, b) {
            if (!a) return !1; if (!0 === a) return a; if ("string" == typeof a) return a = I(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ?
                CKEDITOR.tools.convertArrayToObject(a) : !1; var d = {}, c = 0, g; for (g in a) d[g] = a[g], c++; return c ? d : !1
        } function l(a, b) { if (a.nothingRequired) return !0; var c, g, f, e; if (f = a.requiredClasses) for (e = b.classes, c = 0; c < f.length; ++c)if (g = f[c], "string" == typeof g) { if (-1 == CKEDITOR.tools.indexOf(e, g)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(e, g)) return !1; return d(b.styles, a.requiredStyles) && d(b.attributes, a.requiredAttributes) } function d(a, b) {
            if (!b) return !0; for (var d = 0, c; d < b.length; ++d)if (c = b[d], "string" ==
                typeof c) { if (!(c in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, c)) return !1; return !0
        } function k(a) { if (!a) return {}; a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = "cke-test"; return b } function g(a) { var b, d, c, g, f = {}, e = 1; for (a = I(a); b = a.match(D);)(d = b[2]) ? (c = n(d, "styles"), g = n(d, "attrs"), d = n(d, "classes")) : c = g = d = null, f["$" + e++] = { elements: b[1], classes: d, styles: c, attributes: g }, a = a.slice(b[0].length); return f } function n(a, b) { var d = a.match(N[b]); return d ? I(d[1]) : null }
        function p(a) { var b = a.styleBackup = a.attributes.style, d = a.classBackup = a.attributes["class"]; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1)); a.classes || (a.classes = d ? d.split(/\s+/) : []) } function w(a, d, c, g) {
            var f = 0, k; g.toHtml && (d.name = d.name.replace(Q, "$1")); if (g.doCallbacks && a.elementCallbacks) { a: { k = a.elementCallbacks; for (var h = 0, m = k.length, n; h < m; ++h)if (n = k[h](d)) { k = n; break a } k = void 0 } if (k) return k } if (g.doTransform && (k = a._.transformations[d.name])) { p(d); for (h = 0; h < k.length; ++h)y(a, d, k[h]); q(d) } if (g.doFilter) {
                a: {
                    h =
                    d.name; m = a._; a = m.allowedRules.elements[h]; k = m.allowedRules.generic; h = m.disallowedRules.elements[h]; m = m.disallowedRules.generic; n = g.skipRequired; var l = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 }, D, C; if (a || k) {
                        p(d); if (h) for (D = 0, C = h.length; D < C; ++D)if (!1 === b(h[D], d, l)) { a = null; break a } if (m) for (D = 0, C = m.length; D < C; ++D)b(m[D], d, l); if (a) for (D = 0, C = a.length; D < C; ++D)e(a[D], d, l, n); if (k) for (D =
                            0, C = k.length; D < C; ++D)e(k[D], d, l, n); a = l
                    } else a = null
                } if (!a || !a.valid) return c.push(d), 1; C = a.validAttributes; var r = a.validStyles; k = a.validClasses; var h = d.attributes, A = d.styles, m = d.classes; n = d.classBackup; var F = d.styleBackup, x, G, I = [], l = [], B = /^data-cke-/; D = !1; delete h.style; delete h["class"]; delete d.classBackup; delete d.styleBackup; if (!a.allAttributes) for (x in h) C[x] || (B.test(x) ? x == (G = x.replace(/^data-cke-saved-/, "")) || C[G] || (delete h[x], D = !0) : (delete h[x], D = !0)); if (!a.allStyles || a.hadInvalidStyle) {
                    for (x in A) a.allStyles ||
                        r[x] ? I.push(x + ":" + A[x]) : D = !0; I.length && (h.style = I.sort().join("; "))
                } else F && (h.style = F); if (!a.allClasses || a.hadInvalidClass) { for (x = 0; x < m.length; ++x)(a.allClasses || k[m[x]]) && l.push(m[x]); l.length && (h["class"] = l.sort().join(" ")); n && l.length < n.split(/\s+/).length && (D = !0) } else n && (h["class"] = n); D && (f = 1); if (!g.skipFinalValidation && !u(d)) return c.push(d), 1
            } g.toHtml && (d.name = d.name.replace(O, "cke:$1")); return f
        } function v(a) {
            var b = [], d; for (d in a) -1 < d.indexOf("*") && b.push(d.replace(/\*/g, ".*")); return b.length ?
                new RegExp("^(?:" + b.join("|") + ")$") : null
        } function q(a) { var b = a.attributes, d; delete b.style; delete b["class"]; if (d = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = d; a.classes.length && (b["class"] = a.classes.sort().join(" ")) } function u(a) { switch (a.name) { case "a": if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case "img": if (!a.attributes.src) return !1 }return !0 } function x(a) { if (!a) return !1; if (!0 === a) return !0; var b = v(a); return function (d) { return d in a || b && d.match(b) } } function r() { return new CKEDITOR.htmlParser.element("br") }
        function z(a) { return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || F.$block[a.name]) } function t(a, b, d) {
            var c = a.name; if (F.$empty[c] || !a.children.length) "hr" == c && "br" == b ? a.replaceWith(r()) : (a.parent && d.push({ check: "it", el: a.parent }), a.remove()); else if (F.$block[c] || "tr" == c) if ("br" == b) a.previous && !z(a.previous) && (b = r(), b.insertBefore(a)), a.next && !z(a.next) && (b = r(), b.insertAfter(a)), a.replaceWithChildren(); else {
                var c = a.children, g; b: {
                    g = F[b]; for (var f = 0, k = c.length, e; f < k; ++f)if (e = c[f], e.type == CKEDITOR.NODE_ELEMENT &&
                        !g[e.name]) { g = !1; break b } g = !0
                } if (g) a.name = b, a.attributes = {}, d.push({ check: "parent-down", el: a }); else {
                    g = a.parent; for (var f = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == g.name, h, m, k = c.length; 0 < k;)e = c[--k], f && (e.type == CKEDITOR.NODE_TEXT || e.type == CKEDITOR.NODE_ELEMENT && F.$inline[e.name]) ? (h || (h = new CKEDITOR.htmlParser.element(b), h.insertAfter(a), d.push({ check: "parent-down", el: h })), h.add(e, 0)) : (h = null, m = F[g.name] || F.span, e.insertAfter(a), g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || e.type != CKEDITOR.NODE_ELEMENT ||
                        m[e.name] || d.push({ check: "el-up", el: e })); a.remove()
                }
            } else c in { style: 1, script: 1 } ? a.remove() : (a.parent && d.push({ check: "it", el: a.parent }), a.replaceWithChildren())
        } function y(a, b, d) { var c, g; for (c = 0; c < d.length; ++c)if (g = d[c], !(g.check && !a.check(g.check, !1) || g.left && !g.left(b))) { g.right(b, J); break } } function C(a, b) {
            var d = b.getDefinition(), c = d.attributes, g = d.styles, f, e, k, h; if (a.name != d.element) return !1; for (f in c) if ("class" == f) for (d = c[f].split(/\s+/), k = a.classes.join("|"); h = d.pop();) { if (-1 == k.indexOf(h)) return !1 } else if (a.attributes[f] !=
                c[f]) return !1; for (e in g) if (a.styles[e] != g[e]) return !1; return !0
        } function A(a, b) { var d, c; "string" == typeof a ? d = a : a instanceof CKEDITOR.style ? c = a : (d = a[0], c = a[1]); return [{ element: d, left: c, right: function (a, d) { d.transform(a, b) } }] } function B(a) { return function (b) { return C(b, a) } } function H(a) { return function (b, d) { d[a](b) } } var F = CKEDITOR.dtd, K = CKEDITOR.tools.copy, I = CKEDITOR.tools.trim, E = ["", "p", "br", "div"]; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a, b) {
        this.allowedContent = []; this.disallowedContent =
            []; this.elementCallbacks = null; this.disabled = !1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {}, cachedChecks: {} }; CKEDITOR.filter.instances[this.id] = this; var d = this.editor = a instanceof CKEDITOR.editor ? a : null; if (d && !b) {
            this.customConfig = !0; var c = d.config.allowedContent; !0 === c ? this.disabled = !0 : (c || (this.customConfig = !1), this.allow(c, "config", 1), this.allow(d.config.extraAllowedContent,
                "extra", 1), this.allow(E[d.enterMode] + " " + E[d.shiftEnterMode], "default", 1), this.disallow(d.config.disallowedContent))
            } else this.customConfig = !1, this.allow(b || a, "default", 1)
        }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
            allow: function (b, d, c) {
                if (!m(this, b, c)) return !1; var f, e; if ("string" == typeof b) b = g(b); else if (b instanceof CKEDITOR.style) {
                    if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), d, c); f = b.getDefinition(); b = {}; c = f.attributes; b[f.element] = f = {
                        styles: f.styles,
                        requiredStyles: f.styles && CKEDITOR.tools.object.keys(f.styles)
                    }; c && (c = K(c), f.classes = c["class"] ? c["class"].split(/\s+/) : null, f.requiredClasses = f.classes, delete c["class"], f.attributes = c, f.requiredAttributes = c && CKEDITOR.tools.object.keys(c))
                } else if (CKEDITOR.tools.isArray(b)) { for (f = 0; f < b.length; ++f)e = this.allow(b[f], d, c); return e } a(this, b, d, this.allowedContent, this._.allowedRules); return !0
            }, applyTo: function (a, b, d, c) {
                if (this.disabled) return !1; var g = this, f = [], e = this.editor && this.editor.config.protectedSource,
                    k, h = !1, m = { doFilter: !d, doTransform: !0, doCallbacks: !0, toHtml: b }; a.forEach(function (a) {
                        if (a.type == CKEDITOR.NODE_ELEMENT) { if ("off" == a.attributes["data-cke-filter"]) return !1; if (!b || "span" != a.name || !~CKEDITOR.tools.object.keys(a.attributes).join("|").indexOf("data-cke-")) if (k = w(g, a, f, m), k & 1) h = !0; else if (k & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                            var d; a: {
                                var c = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); d = []; var n, l, u; if (e) for (l = 0; l <
                                    e.length; ++l)if ((u = c.match(e[l])) && u[0].length == c.length) { d = !0; break a } c = CKEDITOR.htmlParser.fragment.fromHtml(c); 1 == c.children.length && (n = c.children[0]).type == CKEDITOR.NODE_ELEMENT && w(g, n, d, m); d = !d.length
                            } d || f.push(a)
                        }
                    }, null, !0); f.length && (h = !0); var n; a = []; c = E[c || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var l; d = f.pop();)d.type == CKEDITOR.NODE_ELEMENT ? t(d, c, a) : d.remove(); for (; n = a.pop();)if (d = n.el, d.parent) switch (l = F[d.parent.name] || F.span, n.check) {
                        case "it": F.$removeEmpty[d.name] &&
                            !d.children.length ? t(d, c, a) : u(d) || t(d, c, a); break; case "el-up": d.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || l[d.name] || t(d, c, a); break; case "parent-down": d.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || l[d.name] || t(d.parent, c, a)
                    }return h
            }, checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) }, disable: function () { this.disabled = !0 }, disallow: function (b) {
                if (!m(this, b, !0)) return !1; "string" == typeof b && (b =
                    g(b)); a(this, b, null, this.disallowedContent, this._.disallowedRules); return !0
            }, addContentForms: function (a) { if (!this.disabled && a) { var b, d, c = [], g; for (b = 0; b < a.length && !g; ++b)d = a[b], ("string" == typeof d || d instanceof CKEDITOR.style) && this.check(d) && (g = d); if (g) { for (b = 0; b < a.length; ++b)c.push(A(a[b], g)); this.addTransformations(c) } } }, addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) }, addFeature: function (a) {
                if (this.disabled || !a) return !0; a.toFeature &&
                    (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name); this.addTransformations(a.contentTransformations); this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
            }, addTransformations: function (a) {
                var b, d; if (!this.disabled && a) {
                    var c = this._.transformations, g; for (g = 0; g < a.length; ++g) {
                        b = a[g]; var f = void 0, e = void 0, k = void 0, h = void 0, m = void 0, n = void 0; d = []; for (e = 0; e < b.length; ++e)k = b[e], "string" == typeof k ? (k =
                            k.split(/\s*:\s*/), h = k[0], m = null, n = k[1]) : (h = k.check, m = k.left, n = k.right), f || (f = k, f = f.element ? f.element : h ? h.match(/^([a-z0-9]+)/i)[0] : f.left.getDefinition().element), m instanceof CKEDITOR.style && (m = B(m)), d.push({ check: h == f ? null : h, left: m, right: "string" == typeof n ? H(n) : n }); b = f; c[b] || (c[b] = []); c[b].push(d)
                    }
                }
            }, check: function (a, b, d) {
                if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var c = a.length; c--;)if (this.check(a[c], b, d)) return !0; return !1 } var f, e; if ("string" == typeof a) {
                    e = a + "\x3c" + (!1 === b ? "0" :
                        "1") + (d ? "1" : "0") + "\x3e"; if (e in this._.cachedChecks) return this._.cachedChecks[e]; f = g(a).$1; var h = f.styles, c = f.classes; f.name = f.elements; f.classes = c = c ? c.split(/\s*,\s*/) : []; f.styles = k(h); f.attributes = k(f.attributes); f.children = []; c.length && (f.attributes["class"] = c.join(" ")); h && (f.attributes.style = CKEDITOR.tools.writeCssText(f.styles))
                } else f = a.getDefinition(), h = f.styles, c = f.attributes || {}, h && !CKEDITOR.tools.isEmpty(h) ? (h = K(h), c.style = CKEDITOR.tools.writeCssText(h, !0)) : h = {}, f = {
                    name: f.element, attributes: c,
                    classes: c["class"] ? c["class"].split(/\s+/) : [], styles: h, children: []
                }; var h = CKEDITOR.tools.clone(f), m = [], n; if (!1 !== b && (n = this._.transformations[f.name])) { for (c = 0; c < n.length; ++c)y(this, f, n[c]); q(f) } w(this, h, m, { doFilter: !0, doTransform: !1 !== b, skipRequired: !d, skipFinalValidation: !d }); 0 < m.length ? d = !1 : ((b = f.attributes["class"]) && (f.attributes["class"] = f.attributes["class"].split(" ").sort().join(" ")), d = CKEDITOR.tools.objectCompare(f.attributes, h.attributes, !0), b && (f.attributes["class"] = b)); "string" == typeof a &&
                    (this._.cachedChecks[e] = d); return d
            }, getAllowedEnterMode: function () { var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (d, c) { var g = a.slice(), f; if (this.check(E[d])) return d; for (c || (g = g.reverse()); f = g.pop();)if (this.check(f)) return b[f]; return CKEDITOR.ENTER_BR } }(), clone: function () {
                var a = new CKEDITOR.filter, b = CKEDITOR.tools.clone; a.allowedContent = b(this.allowedContent); a._.allowedRules = b(this._.allowedRules); a.disallowedContent = b(this.disallowedContent);
                a._.disallowedRules = b(this._.disallowedRules); a._.transformations = b(this._.transformations); a.disabled = this.disabled; a.editor = this.editor; return a
            }, destroy: function () { delete CKEDITOR.filter.instances[this.id]; delete this._; delete this.allowedContent; delete this.disallowedContent }
        }; var M = { styles: 1, attributes: 1, classes: 1 }, G = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, D = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
            N = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, Q = /^cke:(object|embed|param)$/, O = /^(object|embed|param)$/, J; J = CKEDITOR.filter.transformationsTools = {
                sizeToStyle: function (a) { this.lengthToStyle(a, "width"); this.lengthToStyle(a, "height") }, sizeToAttribute: function (a) { this.lengthToAttribute(a, "width"); this.lengthToAttribute(a, "height") }, lengthToStyle: function (a, b, d) { d = d || b; if (!(d in a.styles)) { var c = a.attributes[b]; c && (/^\d+$/.test(c) && (c += "px"), a.styles[d] = c) } delete a.attributes[b] },
                lengthToAttribute: function (a, b, d) { d = d || b; if (!(d in a.attributes)) { var c = a.styles[b], g = c && c.match(/^(\d+)(?:\.\d*)?px$/); g ? a.attributes[d] = g[1] : "cke-test" == c && (a.attributes[d] = "cke-test") } delete a.styles[b] }, alignmentToStyle: function (a) { if (!("float" in a.styles)) { var b = a.attributes.align; if ("left" == b || "right" == b) a.styles["float"] = b } delete a.attributes.align }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] },
                splitBorderShorthand: function (a) { if (a.styles.border) { var b = CKEDITOR.tools.style.parse.border(a.styles.border); b.color && (a.styles["border-color"] = b.color); b.style && (a.styles["border-style"] = b.style); b.width && (a.styles["border-width"] = b.width); delete a.styles.border } }, listTypeToStyle: function (a) {
                    if (a.attributes.type) switch (a.attributes.type) {
                        case "a": a.styles["list-style-type"] = "lower-alpha"; break; case "A": a.styles["list-style-type"] = "upper-alpha"; break; case "i": a.styles["list-style-type"] = "lower-roman";
                            break; case "I": a.styles["list-style-type"] = "upper-roman"; break; case "1": a.styles["list-style-type"] = "decimal"; break; default: a.styles["list-style-type"] = a.attributes.type
                    }
                }, splitMarginShorthand: function (a) {
                    function b(c) { a.styles["margin-top"] = d[c[0]]; a.styles["margin-right"] = d[c[1]]; a.styles["margin-bottom"] = d[c[2]]; a.styles["margin-left"] = d[c[3]] } if (a.styles.margin) {
                        var d = a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"]; switch (d.length) {
                            case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0, 1]); break; case 3: b([0,
                                1, 2, 1]); break; case 4: b([0, 1, 2, 3])
                        }delete a.styles.margin
                    }
                }, matchesStyle: C, transform: function (a, b) { if ("string" == typeof b) a.name = b; else { var d = b.getDefinition(), c = d.styles, g = d.attributes, f, e, k, h; a.name = d.element; for (f in g) if ("class" == f) for (d = a.classes.join("|"), k = g[f].split(/\s+/); h = k.pop();)-1 == d.indexOf(h) && a.classes.push(h); else a.attributes[f] = g[f]; for (e in c) a.styles[e] = c[e] } }
            }
    }(), function () {
    CKEDITOR.focusManager = function (a) {
        if (a.focusManager) return a.focusManager; this.hasFocus = !1; this.currentActive =
            null; this._ = { editor: a }; return this
    }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
        focus: function (a) { this._.timer && clearTimeout(this._.timer); a && (this.currentActive = a); this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus")) }, lock: function () { this._.locked = 1 }, unlock: function () { delete this._.locked }, blur: function (a) {
            function e() {
                if (this.hasFocus) {
                this.hasFocus =
                    !1; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur")
                }
            } if (!this._.locked) { this._.timer && clearTimeout(this._.timer); var c = CKEDITOR.focusManager._.blurDelay; a || !c ? e.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () { delete this._.timer; e.call(this) }, c, this) }
        }, add: function (a, e) {
            var c = a.getCustomData("focusmanager"); if (!c || c != this) {
                c && c.remove(a); var c = "focus", b = "blur"; e && (CKEDITOR.env.ie ? (c = "focusin", b = "focusout") : CKEDITOR.event.useCapture = 1); var f = {
                    blur: function () {
                        a.equals(this.currentActive) &&
                        this.blur()
                    }, focus: function () { this.focus(a) }
                }; a.on(c, f.focus, this); a.on(b, f.blur, this); e && (CKEDITOR.event.useCapture = 0); a.setCustomData("focusmanager", this); a.setCustomData("focusmanager_handlers", f)
            }
        }, remove: function (a) { a.removeCustomData("focusmanager"); var e = a.removeCustomData("focusmanager_handlers"); a.removeListener("blur", e.blur); a.removeListener("focus", e.focus) }
    }
    }(), CKEDITOR.keystrokeHandler = function (a) {
        if (a.keystrokeHandler) return a.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes =
            {}; this._ = { editor: a }; return this
    }, function () { var a, e = function (b) { b = b.data; var c = b.getKeystroke(), e = this.keystrokes[c], h = this._.editor; a = !1 === h.fire("key", { keyCode: c, domEvent: b }); a || (e && (a = !1 !== h.execCommand(e, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[c])); a && b.preventDefault(!0); return !a }, c = function (b) { a && (a = !1, b.data.preventDefault(!0)) }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", e, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", c, this) } } }(),
    function () {
    CKEDITOR.lang = {
        languages: { af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (a, e, c) {
        a && CKEDITOR.lang.languages[a] ||
            (a = this.detect(e, a)); var b = this; e = function () { b[a].dir = b.rtl[a] ? "rtl" : "ltr"; c(a, b[a]) }; this[a] ? e() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), e, this)
        }, detect: function (a, e) { var c = this.languages; e = e || navigator.userLanguage || navigator.language || a; var b = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), f = b[1], b = b[2]; c[f + "-" + b] ? f = f + "-" + b : c[f] || (f = null); CKEDITOR.lang.detect = f ? function () { return f } : function (a) { return a }; return f || a }
    }
    }(), CKEDITOR.scriptLoader = function () {
        var a = {}, e = {}; return {
            load: function (c,
                b, f, m) {
                    var h = "string" == typeof c; h && (c = [c]); f || (f = CKEDITOR); var l = c.length, d = [], k = [], g = function (a) { b && (h ? b.call(f, a) : b.call(f, d, k)) }; if (0 === l) g(!0); else {
                        var n = function (a, b) { (b ? d : k).push(a); 0 >= --l && (m && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), g(b)) }, p = function (b, d) { a[b] = 1; var c = e[b]; delete e[b]; for (var g = 0; g < c.length; g++)c[g](b, d) }, w = function (d) {
                            if (a[d]) n(d, !0); else {
                                var c = e[d] || (e[d] = []); c.push(n); if (!(1 < c.length)) {
                                    var g = new CKEDITOR.dom.element("script"); g.setAttributes({
                                        type: "text/javascript",
                                        src: d
                                    }); b && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? g.$.onreadystatechange = function () { if ("loaded" == g.$.readyState || "complete" == g.$.readyState) g.$.onreadystatechange = null, p(d, !0) } : (g.$.onload = function () { setTimeout(function () { g.$.onload = null; g.$.onerror = null; p(d, !0) }, 0) }, g.$.onerror = function () { g.$.onload = null; g.$.onerror = null; p(d, !1) })); g.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        }; m && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait"); for (var v = 0; v < l; v++)w(c[v])
                    }
            },
            queue: function () { function a() { var c; (c = b[0]) && this.load(c.scriptUrl, c.callback, CKEDITOR, 0) } var b = []; return function (f, e) { var h = this; b.push({ scriptUrl: f, callback: function () { e && e.apply(this, arguments); b.shift(); a.call(h) } }); 1 == b.length && a.call(this) } }()
        }
    }(), CKEDITOR.resourceManager = function (a, e) { this.basePath = a; this.fileName = e; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} } }, CKEDITOR.resourceManager.prototype = {
        add: function (a, e) {
            if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' +
                a + '" is already registered.'); var c = this.registered[a] = e || {}; c.name = a; c.path = this.getPath(a); CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", c); return this.get(a)
        }, get: function (a) { return this.registered[a] || null }, getPath: function (a) { var e = this.externals[a]; return CKEDITOR.getUrl(e && e.dir || this.basePath + a + "/") }, getFilePath: function (a) { var e = this.externals[a]; return CKEDITOR.getUrl(this.getPath(a) + (e ? e.file : this.fileName + ".js")) }, addExternal: function (a, e, c) {
            a = a.split(","); for (var b =
                0; b < a.length; b++) { var f = a[b]; c || (e = e.replace(/[^\/]+$/, function (a) { c = a; return "" })); this.externals[f] = { dir: e, file: c || this.fileName + ".js" } }
        }, load: function (a, e, c) {
            CKEDITOR.tools.isArray(a) || (a = a ? [a] : []); for (var b = this.loaded, f = this.registered, m = [], h = {}, l = {}, d = 0; d < a.length; d++) { var k = a[d]; if (k) if (b[k] || f[k]) l[k] = this.get(k); else { var g = this.getFilePath(k); m.push(g); g in h || (h[g] = []); h[g].push(k) } } CKEDITOR.scriptLoader.load(m, function (a, d) {
                if (d.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' +
                    h[d[0]].join(",") + '" was not found at "' + d[0] + '".'); for (var g = 0; g < a.length; g++)for (var f = h[a[g]], k = 0; k < f.length; k++) { var m = f[k]; l[m] = this.get(m); b[m] = 1 } e.call(c, l)
            }, this)
        }
    }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
        var e = {}; return function (c, b, f) {
            var m = {}, h = function (c) {
                a.call(this, c, function (a) {
                    CKEDITOR.tools.extend(m, a); var c = [], g; for (g in a) {
                        var n = a[g], l = n && n.requires; if (!e[g]) {
                            if (n.icons) for (var w =
                                n.icons.split(","), v = w.length; v--;)CKEDITOR.skin.addIcon(w[v], n.path + "icons/" + (CKEDITOR.env.hidpi && n.hidpi ? "hidpi/" : "") + w[v] + ".png"); n.isSupportedEnvironment = n.isSupportedEnvironment || function () { return !0 }; e[g] = 1
                        } if (l) for (l.split && (l = l.split(",")), n = 0; n < l.length; n++)m[l[n]] || c.push(l[n])
                    } if (c.length) h.call(this, c); else { for (g in m) n = m[g], n.onLoad && !n.onLoad._called && (!1 === n.onLoad() && delete m[g], n.onLoad._called = 1); b && b.call(f || window, m) }
                }, this)
            }; h.call(this, c)
        }
    }), CKEDITOR.plugins.setLang = function (a,
        e, c) { var b = this.get(a); a = b.langEntries || (b.langEntries = {}); b = b.lang || (b.lang = []); b.split && (b = b.split(",")); -1 == CKEDITOR.tools.indexOf(b, e) && b.push(e); a[e] = c }, CKEDITOR.ui = function (a) { if (a.ui) return a.ui; this.items = {}; this.instances = {}; this.editor = a; this._ = { handlers: {} }; return this }, CKEDITOR.ui.prototype = {
            add: function (a, e, c) { c.name = a.toLowerCase(); var b = this.items[a] = { type: e, command: c.command || null, args: Array.prototype.slice.call(arguments, 2) }; CKEDITOR.tools.extend(b, c) }, get: function (a) { return this.instances[a] },
            create: function (a) { var e = this.items[a], c = e && this._.handlers[e.type], b = e && e.command && this.editor.getCommand(e.command), c = c && c.create.apply(this, e.args); this.instances[a] = c; b && b.uiItems.push(c); c && !c.type && (c.type = e.type); return c }, addHandler: function (a, e) { this._.handlers[a] = e }, space: function (a) { return CKEDITOR.document.getById(this.spaceId(a)) }, spaceId: function (a) { return this.editor.id + "_" + a }
        }, CKEDITOR.event.implementOn(CKEDITOR.ui), function () {
            function a(a, d, g) {
                CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a);
                if (void 0 !== d) {
                    if (!(d instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element."); if (!g) throw Error("One of the element modes must be specified."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && g == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!c(d, g)) throw Error('The specified element mode is not supported on element: "' + d.getName() + '".'); this.element = d; this.elementMode = g; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO &&
                        (d.getId() || d.getNameAtt())
                } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || e(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on("readOnly", b); this.on("selectionChange", function (a) { m(this, a.data.path) }); this.on("activeFilterChange",
                    function () { m(this, this.elementPath(), !0) }); this.on("mode", b); this.on("instanceReady", function () { if (this.config.startupFocus) { if ("end" === this.config.startupFocus) { var a = this.createRange(); a.selectNodeContents(this.editable()); a.shrink(CKEDITOR.SHRINK_ELEMENT, !0); a.collapse(); this.getSelection().selectRanges([a]) } this.focus() } }); CKEDITOR.fire("instanceCreated", null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () { "destroyed" !== this.status ? l(this, a) : CKEDITOR.warn("editor-incorrect-destroy") },
                        0, this)
            } function e() { do var a = "editor" + ++v; while (CKEDITOR.instances[a]); return a } function c(a, b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function b() { var a = this.commands, b; for (b in a) f(this, a[b]) } function f(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() } function m(a, b, d) {
                if (b) {
                    var c, g, f = a.commands; for (g in f) c = f[g], (d || c.contextSensitive) &&
                        c.refresh(a, b)
                }
            } function h(a) { var b = a.config.customConfig; if (!b) return !1; var b = CKEDITOR.getUrl(b), d = q[b] || (q[b] = {}); d.fn ? (d.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && h(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () { d.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () { }; h(a) }); return !0 } function l(a, b) {
                a.on("customConfigLoaded", function () {
                    if (b) { if (b.on) for (var c in b.on) a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config, b, !0); delete a.config.on } c =
                        a.config; a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1; a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") ||
                            0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode; a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce("configLoaded"); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); d(a)
                }); b && null != b.customConfig && (a.config.customConfig = b.customConfig); h(a) || a.fireOnce("customConfigLoaded")
            } function d(a) { CKEDITOR.skin.loadPart("editor", function () { k(a) }) } function k(a) {
                CKEDITOR.lang.load(a.config.language,
                    a.config.defaultLanguage, function (b, d) { var c = a.config.title; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(d); a.title = "string" == typeof c || !1 === c ? c : [a.lang.editor, a.name].join(", "); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir); a.fire("langLoaded"); g(a) })
            } function g(a) { a.getStylesSet(function (b) { a.once("loaded", function () { a.fire("stylesSet", { styles: b }) }, null, null, 1); n(a) }) } function n(a) {
                function b(a) {
                    if (!a) return "";
                    CKEDITOR.tools.isArray(a) && (a = a.join(",")); return a.replace(/\s/g, "")
                } var d = a.config, c = b(d.plugins), g = b(d.extraPlugins), f = b(d.removePlugins); if (g) var e = new RegExp("(?:^|,)(?:" + g.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(e, ""), c = c + ("," + g); if (f) var k = new RegExp("(?:^|,)(?:" + f.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(k, ""); CKEDITOR.env.air && (c += ",adobeair"); CKEDITOR.plugins.load(c.split(","), function (b) {
                    var c = [], g = [], f = []; a.plugins = CKEDITOR.tools.extend({}, a.plugins, b); for (var e in b) {
                        var h =
                            b[e], m = h.lang, n = null, l = h.requires, y; CKEDITOR.tools.isArray(l) && (l = l.join(",")); if (l && (y = l.match(k))) for (; l = y.pop();)CKEDITOR.error("editor-plugin-required", { plugin: l.replace(",", ""), requiredBy: e }); m && !a.lang[e] && (m.split && (m = m.split(",")), 0 <= CKEDITOR.tools.indexOf(m, a.langCode) ? n = a.langCode : (n = a.langCode.replace(/-.*/, ""), n = n != a.langCode && 0 <= CKEDITOR.tools.indexOf(m, n) ? n : 0 <= CKEDITOR.tools.indexOf(m, "en") ? "en" : m[0]), h.langEntries && h.langEntries[n] ? (a.lang[e] = h.langEntries[n], n = null) : f.push(CKEDITOR.getUrl(h.path +
                                "lang/" + n + ".js"))); g.push(n); c.push(h)
                    } CKEDITOR.scriptLoader.load(f, function () {
                        for (var b = ["beforeInit", "init", "afterInit"], f = 0; f < b.length; f++)for (var e = 0; e < c.length; e++) { var k = c[e]; 0 === f && g[e] && k.lang && k.langEntries && (a.lang[k.name] = k.langEntries[g[e]]); if (k[b[f]]) k[b[f]](a) } a.fireOnce("pluginsLoaded"); d.keystrokes && a.setKeystroke(a.config.keystrokes); for (e = 0; e < a.config.blockedKeystrokes.length; e++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[e]] = 1; a.status = "loaded"; a.fireOnce("loaded");
                        CKEDITOR.fire("instanceLoaded", null, a)
                    })
                })
            } function p() { var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) { var b = this.getData(); this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) : a.setHtml(b); return !0 } return !1 } function w(a, b) {
                function d(a) { var b = a.startContainer, c = a.endContainer; return b.is && (b.is("tr") || b.is("td") && b.equals(c) && a.endOffset === b.getChildCount()) ? !0 : !1 } function c(a) {
                    var b = a.startContainer; return b.is("tr") ? a.cloneContents() :
                        b.clone(!0)
                } for (var g = new CKEDITOR.dom.documentFragment, f, e, k, h = 0; h < a.length; h++) { var m = a[h], n = m.startContainer.getAscendant("tr", !0); d(m) ? (f || (f = n.getAscendant("table").clone(), f.append(n.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), g.append(f), f = f.findOne("thead, tbody, tfoot")), e && e.equals(n) || (e = n, k = n.clone(), f.append(k)), k.append(c(m))) : g.append(m.cloneContents()) } return f ? g : b.getHtmlFromRange(a[0])
            } a.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = a; var v = 0, q = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
                {
                    plugins: { detectConflict: function (a, b) { for (var d = 0; d < b.length; d++) { var c = b[d]; if (this[c]) return CKEDITOR.warn("editor-plugin-conflict", { plugin: a, replacedWith: c }), !0 } return !1 } }, addCommand: function (a, b) { b.name = a.toLowerCase(); var d = b instanceof CKEDITOR.command ? b : new CKEDITOR.command(this, b); this.mode && f(this, d); return this.commands[a] = d }, _attachToForm: function () {
                        function a(b) { d.updateElement(); d._.required && !c.getValue() && !1 === d.fire("required") && b.data.preventDefault() } function b(a) {
                            return !!(a && a.call &&
                                a.apply)
                        } var d = this, c = d.element, g = new CKEDITOR.dom.element(c.$.form); c.is("textarea") && g && (g.on("submit", a), b(g.$.submit) && (g.$.submit = CKEDITOR.tools.override(g.$.submit, function (b) { return function () { a(); b.apply ? b.apply(this) : b() } })), d.on("destroy", function () { g.removeListener("submit", a) }))
                    }, destroy: function (a) {
                        var b = CKEDITOR.filter.instances, d = this; this.fire("beforeDestroy"); !a && p.call(this); this.editable(null); this.filter && delete this.filter; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(b),
                            function (a) { a = b[a]; d === a.editor && a.destroy() }); delete this.activeFilter; this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed", null, this)
                    }, elementPath: function (a) { if (!a) { a = this.getSelection(); if (!a) return null; a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null }, createRange: function () { var a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null }, execCommand: function (a, b) {
                        var d = this.getCommand(a),
                        c = { name: a, commandData: b || {}, command: d }; return d && d.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", c) && (c.returnValue = d.exec(c.commandData), !d.async && !1 !== this.fire("afterCommandExec", c)) ? c.returnValue : !1
                    }, getCommand: function (a) { return this.commands[a] }, getData: function (a) {
                    !a && this.fire("beforeGetData"); var b = this._.data; "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : ""); b = { dataValue: b }; !a && this.fire("getData",
                        b); return b.dataValue
                    }, getSnapshot: function () { var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a }, loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a, b, d) {
                        var c = !0, g = b; b && "object" == typeof b && (d = b.internal, g = b.callback, c = !b.noSnapshot); !d && c && this.fire("saveSnapshot"); if (g || !d) this.once("dataReady", function (a) { !d && c && this.fire("saveSnapshot"); g && g.call(a.editor) });
                        a = { dataValue: a }; !d && this.fire("setData", a); this._.data = a.dataValue; !d && this.fire("afterSetData", a)
                    }, setReadOnly: function (a) { a = null == a || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly")) }, insertHtml: function (a, b, d) { this.fire("insertHtml", { dataValue: a, mode: b, range: d }) }, insertText: function (a) { this.fire("insertText", a) }, insertElement: function (a) { this.fire("insertElement", a) }, getSelectedHtml: function (a) {
                        var b = this.editable(),
                        d = this.getSelection(), d = d && d.getRanges(); if (!b || !d || 0 === d.length) return null; b = w(d, b); return a ? b.getHtml() : b
                    }, extractSelectedHtml: function (a, b) { var d = this.editable(), c = this.getSelection().getRanges(), g = new CKEDITOR.dom.documentFragment, f; if (!d || 0 === c.length) return null; for (f = 0; f < c.length; f++)g.append(d.extractHtmlFromRange(c[f], b)); b || this.getSelection().selectRanges([c[0]]); return a ? g.getHtml() : g }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () {
                        return "ready" == this.status && this._.previousValue !==
                            this.getSnapshot()
                    }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return p.call(this) }, setKeystroke: function () { for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], d, c, g = b.length; g--;)d = b[g], c = 0, CKEDITOR.tools.isArray(d) && (c = d[1], d = d[0]), c ? a[d] = c : delete a[d] }, getCommandKeystroke: function (a, b) {
                        var d = "string" === typeof a ? this.getCommand(a) : a, c = []; if (d) {
                            var g = CKEDITOR.tools.object.findKey(this.commands,
                                d), f = this.keystrokeHandler.keystrokes; if (d.fakeKeystroke) c.push(d.fakeKeystroke); else for (var e in f) f[e] === g && c.push(e)
                        } return b ? c : c[0] || null
                    }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) { a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0))) }, setActiveEnterMode: function (a,
                        b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange") }, showNotification: function (a) { alert(a) }
                }); CKEDITOR.editor._getEditorElement = function (a) {
                    if (!CKEDITOR.env.isCompatible) return null; var b = CKEDITOR.dom.element.get(a); return b ? b.getEditor() ? (CKEDITOR.error("editor-element-conflict", { editorName: b.getEditor().name }),
                        null) : b : (CKEDITOR.error("editor-incorrect-element", { element: a }), null)
                }
        }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } }, function () {
            var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            e = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype = {
                onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (c) {
                    for (var b, f, m = 0, h; b = this._.htmlPartsRegex.exec(c);) {
                        f = b.index; if (f > m) if (m = c.substring(m, f), h) h.push(m); else this.onText(m); m = this._.htmlPartsRegex.lastIndex; if (f = b[1]) if (f = f.toLowerCase(), h && CKEDITOR.dtd.$cdata[f] &&
                            (this.onCDATA(h.join("")), h = null), !h) { this.onTagClose(f); continue } if (h) h.push(b[0]); else if (f = b[3]) { if (f = f.toLowerCase(), !/="/.test(f)) { var l = {}, d, k = b[4]; b = !!b[5]; if (k) for (; d = a.exec(k);) { var g = d[1].toLowerCase(); d = d[2] || d[3] || d[4] || ""; l[g] = !d && e[g] ? g : CKEDITOR.tools.htmlDecodeAttr(d) } this.onTagOpen(f, l, b); !h && CKEDITOR.dtd.$cdata[f] && (h = []) } } else if (f = b[2]) this.onComment(f)
                    } if (c.length > m) this.onText(c.substring(m, c.length))
                }
            }
        }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
            $: function () {
            this._ =
                { output: [] }
            }, proto: {
                openTag: function (a) { this._.output.push("\x3c", a) }, openTagClose: function (a, e) { e ? this._.output.push(" /\x3e") : this._.output.push("\x3e") }, attribute: function (a, e) { "string" == typeof e && (e = CKEDITOR.tools.htmlEncodeAttr(e)); this._.output.push(" ", a, '\x3d"', e, '"') }, closeTag: function (a) { this._.output.push("\x3c/", a, "\x3e") }, text: function (a) { this._.output.push(a) }, comment: function (a) { this._.output.push("\x3c!--", a, "--\x3e") }, write: function (a) { this._.output.push(a) }, reset: function () {
                    this._.output =
                    []; this._.indent = !1
                }, getHtml: function (a) { var e = this._.output.join(""); a && this.reset(); return e }
            }
        }), "use strict", function () {
            CKEDITOR.htmlParser.node = function () { }; CKEDITOR.htmlParser.node.prototype = {
                remove: function () { var a = this.parent.children, e = CKEDITOR.tools.indexOf(a, this), c = this.previous, b = this.next; c && (c.next = b); b && (b.previous = c); a.splice(e, 1); this.parent = null }, replaceWith: function (a) {
                    var e = this.parent.children, c = CKEDITOR.tools.indexOf(e, this), b = a.previous = this.previous, f = a.next = this.next; b && (b.next =
                        a); f && (f.previous = a); e[c] = a; a.parent = this.parent; this.parent = null
                }, insertAfter: function (a) { var e = a.parent.children, c = CKEDITOR.tools.indexOf(e, a), b = a.next; e.splice(c + 1, 0, this); this.next = a.next; this.previous = a; a.next = this; b && (b.previous = this); this.parent = a.parent }, insertBefore: function (a) { var e = a.parent.children, c = CKEDITOR.tools.indexOf(e, a); e.splice(c, 0, this); this.next = a; (this.previous = a.previous) && (a.previous.next = this); a.previous = this; this.parent = a.parent }, getAscendant: function (a) {
                    var e = "function" ==
                        typeof a ? a : "string" == typeof a ? function (b) { return b.name == a } : function (b) { return b.name in a }, c = this.parent; for (; c && c.type == CKEDITOR.NODE_ELEMENT;) { if (e(c)) return c; c = c.parent } return null
                }, wrapWith: function (a) { this.replaceWith(a); a.add(this); return a }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (a) { return a || {} }
            }
        }(), "use strict", CKEDITOR.htmlParser.comment = function (a) { this.value = a; this._ = { isBlockLike: !1 } }, CKEDITOR.htmlParser.comment.prototype =
    CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function (a, e) { var c = this.value; if (!(c = a.onComment(e, c, this))) return this.remove(), !1; if ("string" != typeof c) return this.replaceWith(c), !1; this.value = c; return !0 }, writeHtml: function (a, e) { e && this.filter(e); a.comment(this.value) } }), "use strict", function () {
        CKEDITOR.htmlParser.text = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function (a, e) { if (!(this.value = a.onText(e, this.value, this))) return this.remove(), !1 }, writeHtml: function (a, e) { e && this.filter(e); a.text(this.value) }
        })
    }(), "use strict", function () { CKEDITOR.htmlParser.cdata = function (a) { this.value = a }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function () { }, writeHtml: function (a) { a.write(this.value) } }) }(), "use strict", CKEDITOR.htmlParser.fragment = function () {
    this.children = []; this.parent = null;
        this._ = { isBlockLike: !0, hasInlineStarted: !1 }
    }, function () {
        function a(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var e = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), c = { ol: 1, ul: 1 }, b = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }), f = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" };
        CKEDITOR.htmlParser.fragment.fromHtml = function (m, h, l) {
            function d(a) { var b; if (0 < u.length) for (var d = 0; d < u.length; d++) { var c = u[d], g = c.name, f = CKEDITOR.dtd[g], e = r.name && CKEDITOR.dtd[r.name]; e && !e[g] || a && f && !f[a] && CKEDITOR.dtd[a] ? g == r.name && (n(r, r.parent, 1), d--) : (b || (k(), b = 1), c = c.clone(), c.parent = r, r = c, u.splice(d, 1), d--) } } function k() { for (; x.length;)n(x.shift(), r) } function g(a) {
                if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                    var b = a.children.length, d = a.children[b - 1], c; d && d.type == CKEDITOR.NODE_TEXT &&
                        ((c = CKEDITOR.tools.rtrim(d.value)) ? d.value = c : a.children.length = b - 1)
                }
            } function n(b, d, c) { d = d || r || q; var f = r; void 0 === b.previous && (p(d, b) && (r = d, v.onTagOpen(l, {}), b.returnPoint = d = r), g(b), a(b) && !b.children.length || d.add(b), "pre" == b.name && (t = !1), "textarea" == b.name && (z = !1)); b.returnPoint ? (r = b.returnPoint, delete b.returnPoint) : r = c ? d : f } function p(a, b) {
                if ((a == q || "body" == a.name) && l && (!a.name || CKEDITOR.dtd[a.name][l])) {
                    var d, c; return (d = b.attributes && (c = b.attributes["data-cke-real-element-type"]) ? c : b.name) && d in
                        CKEDITOR.dtd.$inline && !(d in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                }
            } function w(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 } var v = new CKEDITOR.htmlParser, q = h instanceof CKEDITOR.htmlParser.element ? h : "string" == typeof h ? new CKEDITOR.htmlParser.element(h) : new CKEDITOR.htmlParser.fragment, u = [], x = [], r = q, z = "textarea" == q.name, t = "pre" == q.name; v.onTagOpen = function (g, f, h, m) {
                f = new CKEDITOR.htmlParser.element(g, f); f.isUnknown &&
                    h && (f.isEmpty = !0); f.isOptionalClose = m; if (a(f)) u.push(f); else {
                        if ("pre" == g) t = !0; else { if ("br" == g && t) { r.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == g && (z = !0) } if ("br" == g) x.push(f); else {
                            for (; !(m = (h = r.name) ? CKEDITOR.dtd[h] || (r._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : b, f.isUnknown || r.isUnknown || m[g]);)if (r.isOptionalClose) v.onTagClose(h); else if (g in c && h in c) h = r.children, (h = h[h.length - 1]) && "li" == h.name || n(h = new CKEDITOR.htmlParser.element("li"), r), !f.returnPoint && (f.returnPoint =
                                r), r = h; else if (g in CKEDITOR.dtd.$listItem && !w(g, h)) v.onTagOpen("li" == g ? "ul" : "dl", {}, 0, 1); else if (h in e && !w(g, h)) !f.returnPoint && (f.returnPoint = r), r = r.parent; else if (h in CKEDITOR.dtd.$inline && u.unshift(r), r.parent) n(r, r.parent, 1); else { f.isOrphan = 1; break } d(g); k(); f.parent = r; f.isEmpty ? n(f) : r = f
                        }
                    }
            }; v.onTagClose = function (a) {
                for (var b = u.length - 1; 0 <= b; b--)if (a == u[b].name) { u.splice(b, 1); return } for (var d = [], c = [], g = r; g != q && g.name != a;)g._.isBlockLike || c.unshift(g), d.push(g), g = g.returnPoint || g.parent; if (g !=
                    q) { for (b = 0; b < d.length; b++) { var f = d[b]; n(f, f.parent) } r = g; g._.isBlockLike && k(); n(g, g.parent); g == r && (r = r.parent); u = u.concat(c) } "body" == a && (l = !1)
            }; v.onText = function (a) {
                if (!(r._.hasInlineStarted && !x.length || t || z) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return; var c = r.name, g = c ? CKEDITOR.dtd[c] || (r._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : b; if (!z && !g["#"] && c in e) v.onTagOpen(f[c] || ""), v.onText(a); else {
                    k(); d(); t || z || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); a = new CKEDITOR.htmlParser.text(a);
                    if (p(r, a)) this.onTagOpen(l, {}, 0, 1); r.add(a)
                }
            }; v.onCDATA = function (a) { r.add(new CKEDITOR.htmlParser.cdata(a)) }; v.onComment = function (a) { k(); d(); r.add(new CKEDITOR.htmlParser.comment(a)) }; v.parse(m); for (k(); r != q;)n(r, r.parent, 1); g(q); return q
        }; CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
            isNaN(b) && (b = this.children.length); var c = 0 < b ? this.children[b - 1] : null; if (c) {
                if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 ===
                    c.value.length)) { this.children.pop(); this.add(a); return } c.next = a
            } a.previous = c; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
            }, filter: function (a, b) { b = this.getFilterContext(b); a.onRoot(b, this); this.filterChildren(a, !1, b) }, filterChildren: function (a, b, c) {
                if (this.childrenFilteredBy != a.id) {
                    c = this.getFilterContext(c); if (b && !this.parent) a.onRoot(c, this); this.childrenFilteredBy = a.id; for (b =
                        0; b < this.children.length; b++)!1 === this.children[b].filter(a, c) && b--
                }
            }, writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, b, c) { var d = this.getFilterContext(); if (c && !this.parent && b) b.onRoot(d, this); b && this.filterChildren(b, !1, d); b = 0; c = this.children; for (d = c.length; b < d; b++)c[b].writeHtml(a) }, forEach: function (a, b, c) {
                if (!(c || b && this.type != b)) var d = a(this); if (!1 !== d) {
                    c = this.children; for (var f = 0; f < c.length; f++)d = c[f], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a,
                        b) : b && d.type != b || a(d)
                }
            }, getFilterContext: function (a) { return a || {} }
        }
    }(), "use strict", function () {
        function a() { this.rules = [] } function e(c, b, f, e) { var h, l; for (h in b) (l = c[h]) || (l = c[h] = new a), l.add(b[h], f, e) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (c) { this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new a; this.attributeNameRules = new a; this.elementsRules = {}; this.attributesRules = {}; this.textRules = new a; this.commentRules = new a; this.rootRules = new a; c && this.addRules(c, 10) },
            proto: {
                addRules: function (a, b) {
                    var f; "number" == typeof b ? f = b : b && "priority" in b && (f = b.priority); "number" != typeof f && (f = 10); "object" != typeof b && (b = {}); a.elementNames && this.elementNameRules.addMany(a.elementNames, f, b); a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, f, b); a.elements && e(this.elementsRules, a.elements, f, b); a.attributes && e(this.attributesRules, a.attributes, f, b); a.text && this.textRules.add(a.text, f, b); a.comment && this.commentRules.add(a.comment, f, b); a.root && this.rootRules.add(a.root,
                        f, b)
                }, applyTo: function (a) { a.filter(this) }, onElementName: function (a, b) { return this.elementNameRules.execOnName(a, b) }, onAttributeName: function (a, b) { return this.attributeNameRules.execOnName(a, b) }, onText: function (a, b, f) { return this.textRules.exec(a, b, f) }, onComment: function (a, b, f) { return this.commentRules.exec(a, b, f) }, onRoot: function (a, b) { return this.rootRules.exec(a, b) }, onElement: function (a, b) {
                    for (var f = [this.elementsRules["^"], this.elementsRules[b.name], this.elementsRules.$], e, h = 0; 3 > h; h++)if (e = f[h]) {
                        e =
                        e.exec(a, b, this); if (!1 === e) return null; if (e && e != b) return this.onNode(a, e); if (b.parent && !b.name) break
                    } return b
                }, onNode: function (a, b) { var f = b.type; return f == CKEDITOR.NODE_ELEMENT ? this.onElement(a, b) : f == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, b.value)) : f == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, b.value)) : null }, onAttribute: function (a, b, f, e) { return (f = this.attributesRules[f]) ? f.exec(a, e, b, this) : e }
            }
        }); CKEDITOR.htmlParser.filterRulesGroup = a; a.prototype =
        {
            add: function (a, b, f) { this.rules.splice(this.findIndex(b), 0, { value: a, priority: b, options: f }) }, addMany: function (a, b, f) { for (var e = [this.findIndex(b), 0], h = 0, l = a.length; h < l; h++)e.push({ value: a[h], priority: b, options: f }); this.rules.splice.apply(this.rules, e) }, findIndex: function (a) { for (var b = this.rules, f = b.length - 1; 0 <= f && a < b[f].priority;)f--; return f + 1 }, exec: function (a, b) {
                var f = b instanceof CKEDITOR.htmlParser.node || b instanceof CKEDITOR.htmlParser.fragment, e = Array.prototype.slice.call(arguments, 1), h = this.rules,
                l = h.length, d, k, g, n; for (n = 0; n < l; n++)if (f && (d = b.type, k = b.name), g = h[n], !(a.nonEditable && !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable)) { g = g.value.apply(null, e); if (!1 === g || f && g && (g.name != k || g.type != d)) return g; null != g && (e[0] = b = g) } return b
            }, execOnName: function (a, b) { for (var f = 0, e = this.rules, h = e.length, l; b && f < h; f++)l = e[f], a.nonEditable && !l.options.applyToAll || a.nestedEditable && l.options.excludeNestedEditable || (b = b.replace(l.value[0], l.value[1])); return b }
        }
    }(), function () {
        function a(a,
            d) {
                function g(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function e(a, d) {
                    return function (f) {
                        if (f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var e = [], h = c(f), n, D; if (h) for (k(h, 1) && e.push(h); h;)m(h) && (n = b(h)) && k(n) && ((D = b(n)) && !m(D) ? e.push(n) : (g(l).insertAfter(n), n.remove())), h = h.previous; for (h = 0; h < e.length; h++)e[h].remove(); if (e = !a || !1 !== ("function" == typeof d ? d(f) : d)) l || CKEDITOR.env.needsBrFiller || f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ?
                                l || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem) ? (e = c(f), e = !e || "form" == f.name && "input" == e.name) : e = !1 : e = !1; e && f.add(g(a))
                        }
                    }
                } function k(a, b) {
                    if ((!l || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0; var d; return a.type == CKEDITOR.NODE_TEXT && (d = a.value.match(r)) && (d.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, d.index))).insertBefore(a), a.value = d[0]), !CKEDITOR.env.needsBrFiller &&
                        l && (!b || a.parent.name in D) || !l && ((d = a.previous) && "br" == d.name || !d || m(d))) ? !0 : !1
                } var n = { elements: {} }, l = "html" == d, D = CKEDITOR.tools.extend({}, C), y; for (y in D) "#" in t[y] || delete D[y]; for (y in D) n.elements[y] = e(l, a.config.fillEmptyBlocks); n.root = e(l, !1); n.elements.br = function (a) {
                    return function (d) {
                        if (d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var c = d.attributes; if ("data-cke-bogus" in c || "data-cke-eol" in c) delete c["data-cke-bogus"]; else {
                                for (c = d.next; c && f(c);)c = c.next; var e = b(d); !c && m(d.parent) ? h(d.parent,
                                    g(a)) : m(c) && e && !m(e) && g(a).insertBefore(c)
                            }
                        }
                    }
                }(l); return n
        } function e(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function c(a) { for (a = a.children[a.children.length - 1]; a && f(a);)a = a.previous; return a } function b(a) { for (a = a.previous; a && f(a);)a = a.previous; return a } function f(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] } function m(a) {
            return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in
                C || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        } function h(a, b) { var d = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; d && (d.next = b, b.previous = d) } function l(a) { a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1); a.contenteditable = "false" } function d(a) { a = a.attributes; switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable } } function k(a) {
            return a.replace(K, function (a, b, d) {
                return "\x3c" + b + d.replace(I,
                    function (a, b) { return E.test(b) && -1 == d.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e"
            })
        } function g(a, b) { return a.replace(b, function (a, b, d) { 0 === a.indexOf("\x3ctextarea") && (a = b + q(d).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) } function n(a) { return a.replace(D, function (a, b) { return decodeURIComponent(b) }) } function p(a) {
            return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                function (a) { return "\x3c!--" + z + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
        } function w(a) { return CKEDITOR.tools.array.reduce(a.split(""), function (a, b) { var d = b.toLowerCase(), c = b.toUpperCase(), g = v(d); d !== c && (g += "|" + v(c)); return a + ("(" + g + ")") }, "") } function v(a) { var b; b = a.charCodeAt(0); var d = b.toString(16); b = { htmlCode: "\x26#" + b + ";?", hex: "\x26#x0*" + d + ";?", entity: { "\x3c": "\x26lt;", "\x3e": "\x26gt;", ":": "\x26colon;" }[a] }; for (var c in b) b[c] && (a += "|" + b[c]); return a } function q(a) {
            return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g,
                function (a, b) { return decodeURIComponent(b) })
        } function u(a, b) { var d = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return d && d[b] || "" }) } function x(a, b) {
            var d = [], c = b.config.protectedSource, g = b._.dataStore || (b._.dataStore = { id: 1 }), f = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, c = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(c); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g,
                function (a) { return "\x3c!--{cke_tempcomment}" + (d.push(a) - 1) + "--\x3e" }); for (var e = 0; e < c.length; e++)a = a.replace(c[e], function (a) { a = a.replace(f, function (a, b, c) { return d[c] }); return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (d.push(a) - 1) + "--\x3e" }); a = a.replace(f, function (a, b, c) { return "\x3c!--" + z + (b ? "{C}" : "") + encodeURIComponent(d[c]).replace(/--/g, "%2D%2D") + "--\x3e" }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) {
                    return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g,
                        function (a, b) { g[g.id] = decodeURIComponent(b); return "{cke_protected_" + g.id++ + "}" })
                }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, d, c, g) { return "\x3c" + d + c + "\x3e" + u(q(g), b) + "\x3c/" + d + "\x3e" })
        } CKEDITOR.htmlDataProcessor = function (b) {
            var d, c, f = this; this.editor = b; this.dataFilter = d = new CKEDITOR.htmlParser.filter; this.htmlFilter = c = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; d.addRules(A); d.addRules(B, { applyToAll: !0 }); d.addRules(a(b, "data"),
                { applyToAll: !0 }); c.addRules(H); c.addRules(F, { applyToAll: !0 }); c.addRules(a(b, "html"), { applyToAll: !0 }); b.on("toHtml", function (a) {
                    a = a.data; var d = a.dataValue, c, d = d.replace(N, ""), d = x(d, b), d = g(d, G), d = k(d), d = g(d, M), d = d.replace(Q, "$1cke:$2"), d = d.replace(J, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"), d = d.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), d = d.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2"); c = a.context || b.editable().getName(); var f; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" ==
                        c && (c = "div", d = "\x3cpre\x3e" + d + "\x3c/pre\x3e", f = 1); c = b.document.createElement(c); c.setHtml("a" + d); d = c.getHtml().substr(1); d = d.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""); f && (d = d.replace(/^<pre>|<\/pre>$/gi, "")); d = d.replace(O, "$1$2"); d = n(d); d = q(d); c = !1 === a.fixForBody ? !1 : e(a.enterMode, b.config.autoParagraph); d = CKEDITOR.htmlParser.fragment.fromHtml(d, a.context, c); c && (f = d, !f.children.length && CKEDITOR.dtd[f.name][c] && (c = new CKEDITOR.htmlParser.element(c), f.add(c))); a.dataValue = d
                }, null, null,
                    5); b.on("toHtml", function (a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6); b.on("toHtml", function (a) { a.data.dataValue.filterChildren(f.dataFilter, !0) }, null, null, 10); b.on("toHtml", function (a) { a = a.data; var b = a.dataValue, d = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(d); b = d.getHtml(!0); a.dataValue = p(b) }, null, null, 15); b.on("toDataFormat", function (a) {
                        var d = a.data.dataValue; a.data.enterMode != CKEDITOR.ENTER_BR && (d = d.replace(/^<br *\/?>/i,
                            "")); a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(d, a.data.context, e(a.data.enterMode, b.config.autoParagraph))
                    }, null, null, 5); b.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(f.htmlFilter, !0) }, null, null, 10); b.on("toDataFormat", function (a) { a.data.filter.applyTo(a.data.dataValue, !1, !0) }, null, null, 11); b.on("toDataFormat", function (a) { var d = a.data.dataValue, c = f.writer; c.reset(); d.writeChildrenHtml(c); d = c.getHtml(!0); d = q(d); d = u(d, b); a.data.dataValue = d }, null, null, 15)
        }; CKEDITOR.htmlDataProcessor.prototype =
        {
            toHtml: function (a, b, d, c) { var g = this.editor, f, e, k, h; b && "object" == typeof b ? (f = b.context, d = b.fixForBody, c = b.dontFilter, e = b.filter, k = b.enterMode, h = b.protectedWhitespaces) : f = b; f || null === f || (f = g.editable().getName()); return g.fire("toHtml", { dataValue: a, context: f, fixForBody: d, dontFilter: c, filter: e || g.filter, enterMode: k || g.enterMode, protectedWhitespaces: h }).dataValue }, toDataFormat: function (a, b) {
                var d, c, g; b && (d = b.context, c = b.filter, g = b.enterMode); d || null === d || (d = this.editor.editable().getName()); return this.editor.fire("toDataFormat",
                    { dataValue: a, filter: c || this.editor.filter, context: d, enterMode: g || this.editor.enterMode }).dataValue
            }
        }; var r = /(?:&nbsp;|\xa0)$/, z = "{cke_protected}", t = CKEDITOR.dtd, y = "caption colgroup col thead tfoot tbody".split(" "), C = CKEDITOR.tools.extend({}, t.$blockLimit, t.$block), A = { elements: { input: l, textarea: l } }, B = {
            attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]], elements: {
                iframe: function (a) {
                    if (a.attributes && a.attributes.src) {
                        var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi,
                            ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src
                    }
                }
            }
        }, H = { elements: { embed: function (a) { var b = a.parent; if (b && "object" == b.name) { var d = b.attributes.width, b = b.attributes.height; d && (a.attributes.width = d); b && (a.attributes.height = b) } }, a: function (a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 } } }, F = {
            elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/,
                ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                    $: function (a) { var b = a.attributes; if (b) { if (b["data-cke-temp"]) return !1; for (var d = ["name", "href", "src"], c, g = 0; g < d.length; g++)c = "data-cke-saved-" + d[g], c in b && delete b[d[g]] } return a }, table: function (a) {
                        a.children.slice(0).sort(function (a, b) {
                            var d, c; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (d = CKEDITOR.tools.indexOf(y, a.name), c = CKEDITOR.tools.indexOf(y, b.name)); -1 < d && -1 < c && d != c || (d = a.parent ? a.getIndex() : -1, c = b.parent ? b.getIndex() : -1); return d > c ?
                                1 : -1
                        })
                    }, param: function (a) { a.children = []; a.isEmpty = !0; return a }, span: function (a) { "Apple-style-span" == a.attributes["class"] && delete a.name }, html: function (a) { delete a.attributes.contenteditable; delete a.attributes["class"] }, body: function (a) { delete a.attributes.spellcheck; delete a.attributes.contenteditable }, style: function (a) { var b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = "text/css") }, title: function (a) {
                        var b = a.children[0]; !b && h(a, b = new CKEDITOR.htmlParser.text);
                        b.value = a.attributes["data-cke-title"] || ""
                    }, input: d, textarea: d
                }, attributes: { "class": function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
        }; CKEDITOR.env.ie && (F.attributes.style = function (a) { return a.replace(/(^|;)([^\:]+)/g, function (a) { return a.toLowerCase() }) }); var K = /<(a|area|img|input|source)\b([^>]*)>/gi, I = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, E = /^(href|src|name)$/i, M = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            G = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, D = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, N = new RegExp("(" + w("\x3ccke:encoded\x3e") + "(.*?)" + w("\x3c/cke:encoded\x3e") + ")|(" + w("\x3c") + w("/") + "?" + w("cke:encoded\x3e") + ")", "gi"), Q = /(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi, O = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, J = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    }(), "use strict", CKEDITOR.htmlParser.element = function (a, e) {
    this.name = a; this.attributes = e || {}; this.children =
        []; var c = a || "", b = c.match(/^cke:(.*)/); b && (c = b[1]); c = !!(CKEDITOR.dtd.$nonBodyContent[c] || CKEDITOR.dtd.$block[c] || CKEDITOR.dtd.$listItem[c] || CKEDITOR.dtd.$tableContent[c] || CKEDITOR.dtd.$nonEditable[c] || "br" == c); this.isEmpty = !!CKEDITOR.dtd.$empty[a]; this.isUnknown = !CKEDITOR.dtd[a]; this._ = { isBlockLike: c, hasInlineStarted: this.isEmpty || !c }
    }, CKEDITOR.htmlParser.cssStyle = function (a) {
        var e = {}; ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
            function (a, b, f) { "font-family" == b && (f = f.replace(/["']/g, "")); e[b.toLowerCase()] = f }); return { rules: e, populate: function (a) { var b = this.toString(); b && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b) }, toString: function () { var a = [], b; for (b in e) e[b] && a.push(b, ":", e[b], ";"); return a.join("") } }
    }, function () {
        function a(a) { return function (c) { return c.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? c.name == a : c.name in a) } } var e =
            function (a, c) { a = a[0]; c = c[0]; return a < c ? -1 : a > c ? 1 : 0 }, c = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_ELEMENT, add: c.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, c) {
                    var e = this, h, l; c = e.getFilterContext(c); if (!e.parent) a.onRoot(c, e); for (; ;) {
                        h = e.name; if (!(l = a.onElementName(c, h))) return this.remove(), !1; e.name = l; if (!(e = a.onElement(c, e))) return this.remove(),
                            !1; if (e !== this) return this.replaceWith(e), !1; if (e.name == h) break; if (e.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(e), !1; if (!e.name) return this.replaceWithChildren(), !1
                    } h = e.attributes; var d, k; for (d in h) { for (l = h[d]; ;)if (k = a.onAttributeName(c, d)) if (k != d) delete h[d], d = k; else break; else { delete h[d]; break } k && (!1 === (l = a.onAttribute(c, e, k, l)) ? delete h[k] : h[k] = l) } e.isEmpty || this.filterChildren(a, !1, c); return !0
                }, filterChildren: c.filterChildren, writeHtml: function (a, c) {
                    c && this.filter(c); var m = this.name,
                        h = [], l = this.attributes, d, k; a.openTag(m, l); for (d in l) h.push([d, l[d]]); a.sortAttributes && h.sort(e); d = 0; for (k = h.length; d < k; d++)l = h[d], a.attribute(l[0], l[1]); a.openTagClose(m, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(m)
                }, writeChildrenHtml: c.writeChildrenHtml, replaceWithChildren: function () { for (var a = this.children, c = a.length; c;)a[--c].insertAfter(this); this.remove() }, forEach: c.forEach, getFirst: function (b) {
                    if (!b) return this.children.length ? this.children[0] : null; "function" != typeof b &&
                        (b = a(b)); for (var c = 0, e = this.children.length; c < e; ++c)if (b(this.children[c])) return this.children[c]; return null
                }, getHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml() }, setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var c = 0, e = a.length; c < e; ++c)a[c].parent = this }, getOuterHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeHtml(a); return a.getHtml() }, split: function (a) {
                    for (var c = this.children.splice(a,
                        this.children.length - a), e = this.clone(), h = 0; h < c.length; ++h)c[h].parent = e; e.children = c; c[0] && (c[0].previous = null); 0 < a && (this.children[a - 1].next = null); this.parent.add(e, this.getIndex() + 1); return e
                }, find: function (a, c) { void 0 === c && (c = !1); var e = [], h; for (h = 0; h < this.children.length; h++) { var l = this.children[h]; "function" == typeof a && a(l) ? e.push(l) : "string" == typeof a && l.name === a && e.push(l); c && l.find && (e = e.concat(l.find(a, c))) } return e }, findOne: function (a, c) {
                    var e = null, h = CKEDITOR.tools.array.find(this.children,
                        function (h) { var d = "function" === typeof a ? a(h) : h.name === a; if (d || !c) return d; h.children && h.findOne && (e = h.findOne(a, !0)); return !!e }); return e || h || null
                }, addClass: function (a) { if (!this.hasClass(a)) { var c = this.attributes["class"] || ""; this.attributes["class"] = c + (c ? " " : "") + a } }, removeClass: function (a) { var c = this.attributes["class"]; c && ((c = CKEDITOR.tools.trim(c.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = c : delete this.attributes["class"]) }, hasClass: function (a) {
                    var c = this.attributes["class"];
                    return c ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(c) : !1
                }, getFilterContext: function (a) { var c = []; a || (a = { nonEditable: !1, nestedEditable: !1 }); a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && c.push("nestedEditable", !0) : c.push("nonEditable", !0); if (c.length) { a = CKEDITOR.tools.copy(a); for (var e = 0; e < c.length; e += 2)a[c[e]] = c[e + 1] } return a }
            }, !0)
    }(), function () {
        var a = /{([^}]+)}/g; CKEDITOR.template = function (a) {
        this.source = "function" ===
            typeof a ? a : String(a)
        }; CKEDITOR.template.prototype.output = function (e, c) { var b = ("function" === typeof this.source ? this.source(e) : this.source).replace(a, function (a, b) { return void 0 !== e[b] ? e[b] : a }); return c ? c.push(b) : b }
    }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), CKEDITOR.add = function (a) {
        function e() { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) } CKEDITOR.instances[a.name] = a; a.on("focus", function () {
        CKEDITOR.currentInstance !=
            a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance"))
        }); a.on("blur", e); a.on("destroy", e); CKEDITOR.fire("instance", null, a)
    }, CKEDITOR.remove = function (a) { delete CKEDITOR.instances[a.name] }, function () { var a = {}; CKEDITOR.addTemplate = function (e, c) { var b = a[e]; if (b) return b; b = { name: e, source: c }; CKEDITOR.fire("template", b); return a[e] = new CKEDITOR.template(b.source) }; CKEDITOR.getTemplate = function (e) { return a[e] } }(), function () { var a = []; CKEDITOR.addCss = function (e) { a.push(e) }; CKEDITOR.getCss = function () { return a.join("\n") } }(),
    CKEDITOR.on("instanceDestroyed", function () { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, function () {
    CKEDITOR.inline = function (a, e) {
        a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; var c = new CKEDITOR.editor(e, a, CKEDITOR.ELEMENT_MODE_INLINE), b = a.is("textarea") ? a : null; b ? (c.setData(b.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!c.readOnly + '" class\x3d"cke_textarea_inline"\x3e' +
            b.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(b), b.hide(), b.$.form && c._attachToForm()) : c.setData(a.getHtml(), null, !0); c.on("loaded", function () { c.fire("uiReady"); c.editable(a); c.container = a; c.ui.contentsElement = a; c.setData(c.getData(1)); c.resetDirty(); c.fire("contentDom"); c.mode = "wysiwyg"; c.fire("mode"); c.status = "ready"; c.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, c) }, null, null, 1E4); c.on("destroy", function () {
                b && (c.container.clearCustomData(), c.container.remove(), b.show());
                c.element.clearCustomData(); delete c.element
            }); return c
    }; CKEDITOR.inlineAll = function () { var a, e, c; for (c in CKEDITOR.dtd.$editable) for (var b = CKEDITOR.document.getElementsByTag(c), f = 0, m = b.count(); f < m; f++)a = b.getItem(f), "true" == a.getAttribute("contenteditable") && (e = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", e) && CKEDITOR.inline(a, e.config)) }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
    }(), CKEDITOR.replaceClass = "ckeditor", function () {
        function a(a, f, m, h) {
            a = CKEDITOR.editor._getEditorElement(a);
            if (!a) return null; var l = new CKEDITOR.editor(f, a, h); h == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), l._.required = a.hasAttribute("required"), a.removeAttribute("required")); m && l.setData(m, null, !0); l.on("loaded", function () { c(l); h == CKEDITOR.ELEMENT_MODE_REPLACE && l.config.autoUpdateElement && a.$.form && l._attachToForm(); l.setMode(l.config.startupMode, function () { l.resetDirty(); l.status = "ready"; l.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, l) }) }); l.on("destroy", e); return l
        }
        function e() { var a = this.container, c = this.element; a && (a.clearCustomData(), a.remove()); c && (c.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (c.show(), this._.required && c.setAttribute("required", "required")), delete this.element) } function c(a) {
            var c = a.name, e = a.element, h = a.elementMode, l = a.fire("uiSpace", { space: "top", html: "" }).html, d = a.fire("uiSpace", { space: "bottom", html: "" }).html, k = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' +
                CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
            c = CKEDITOR.dom.element.createFromHtml(k.output({ id: a.id, name: c, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: l ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + l + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: d ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + d + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" })); h == CKEDITOR.ELEMENT_MODE_REPLACE ?
                (e.hide(), c.insertAfter(e)) : e.append(c); a.container = c; a.ui.contentsElement = a.ui.space("contents"); l && a.ui.space("top").unselectable(); d && a.ui.space("bottom").unselectable(); e = a.config.width; h = a.config.height; e && c.setStyle("width", CKEDITOR.tools.cssLength(e)); h && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(h)); c.disableContextMenu(); CKEDITOR.env.webkit && c.on("focus", function () { a.focus() }); a.fireOnce("uiReady")
        } CKEDITOR.replace = function (b, c) { return a(b, c, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
        CKEDITOR.appendTo = function (b, c, e) { return a(b, c, e, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (var a = document.getElementsByTagName("textarea"), c = 0; c < a.length; c++) { var e = null, h = a[c]; if (h.name || h.id) { if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(h.className)) continue } else if ("function" == typeof arguments[0] && (e = {}, !1 === arguments[0](h, e))) continue; this.replace(h, e) } } }; CKEDITOR.editor.prototype.addMode = function (a, c) {
        (this._.modes || (this._.modes =
            {}))[a] = c
        }; CKEDITOR.editor.prototype.setMode = function (a, c) {
            var e = this, h = this._.modes; if (a != e.mode && h && h[a]) {
                e.fire("beforeSetMode", a); if (e.mode) { var l = e.checkDirty(), h = e._.previousModeData, d, k = 0; e.fire("beforeModeUnload"); e.editable(0); e._.previousMode = e.mode; e._.previousModeData = d = e.getData(1); "source" == e.mode && h == d && (e.fire("lockSnapshot", { forceUpdate: !0 }), k = 1); e.ui.space("contents").setHtml(""); e.mode = "" } else e._.previousModeData = e.getData(1); this._.modes[a](function () {
                e.mode = a; void 0 !== l && !l &&
                    e.resetDirty(); k ? e.fire("unlockSnapshot") : "wysiwyg" == a && e.fire("saveSnapshot"); setTimeout(function () { e.fire("mode"); c && c.call(e) }, 0)
                })
            }
        }; CKEDITOR.editor.prototype.resize = function (a, c, e, h) {
            var l = this.container, d = this.ui.space("contents"), k = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; h = h ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : l; h.setSize("width", a, !0); k && (k.style.width = "1%"); var g = (h.$.offsetHeight || 0) - (d.$.clientHeight ||
                0), l = Math.max(c - (e ? 0 : g), 0); c = e ? c + g : c; d.setStyle("height", l + "px"); k && (k.style.width = "100%"); this.fire("resize", { outerHeight: c, contentsHeight: l, outerWidth: a || h.getSize("width") })
        }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; CKEDITOR.domReady(function () { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
    }(), CKEDITOR.config.startupMode = "wysiwyg", function () {
        function a(a) {
            var d = a.editor, c = a.data.path, g = c.blockLimit, f = a.data.selection,
            k = f.getRanges()[0], n; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (f = e(f, c)) f.appendBogus(), n = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.edge && d._.previousActive; h(d, c.block, g) && k.collapsed && !k.getCommonAncestor().isReadOnly() && (c = k.clone(), c.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), g = new CKEDITOR.dom.walker(c), g.guard = function (a) { return !b(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !g.checkForward() || c.checkStartOfBlock() && c.checkEndOfBlock()) && (d = k.fixBlock(!0,
                d.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (d = d.getFirst(b)) && d.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(d.getText()).match(/^(?:&nbsp;|\xa0)$/) && d.remove(), n = 1, a.cancel()); n && k.select()
        } function e(a, d) { if (a.isFake) return 0; var c = d.block || d.blockLimit, g = c && c.getLast(b); if (!(!c || !c.isBlockBoundary() || g && g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary() || c.is("pre") || c.getBogus())) return c } function c(a) {
            var b = a.data.getTarget(); b.is("input") && (b = b.getAttribute("type"),
                "submit" != b && "reset" != b || a.data.preventDefault())
        } function b(a) { return n(a) && p(a) } function f(a, b) { return function (d) { var c = d.data.$.toElement || d.data.$.fromElement || d.data.$.relatedTarget; (c = c && c.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(c) : null) && (b.equals(c) || b.contains(c)) || a.call(this, d) } } function m(a) {
            function d(a) { return function (d, g) { g && d.type == CKEDITOR.NODE_ELEMENT && d.is(f) && (c = d); if (!(g || !b(d) || a && v(d))) return !1 } } var c, g = a.getRanges()[0]; a = a.root; var f = { table: 1, ul: 1, ol: 1, dl: 1 };
            if (g.startPath().contains(f)) { var e = g.clone(); e.collapse(1); e.setStartAt(a, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(e); a.guard = d(); a.checkBackward(); if (c) return e = g.clone(), e.collapse(), e.setEndAt(c, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(e), a.guard = d(!0), c = !1, a.checkForward(), c } return null
        } function h(a, b, d) { return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(d) && !b || b && "true" == b.getAttribute("contenteditable")) } function l(a) {
            return a.activeEnterMode !=
                CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
        } function d(a) { a && a.isEmptyInlineRemoveable() && a.remove() } function k(a) { var b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire("saveSnapshot") }, 0) } function g(a, b, d) { var c = a.getCommonAncestor(b); for (b = a = d ? b : a; (a = a.getParent()) && !c.equals(a) && 1 == a.getChildCount();)b = a; b.remove() } var n, p, w, v, q, u, x, r, z, t; CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element, $: function (a,
                b) { this.base(b.$ || b); this.editor = a; this.status = "unloaded"; this.hasFocus = !1; this.setup() }, proto: {
                    focus: function () {
                        var a; if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus(); return } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop); try {
                            if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document)) if (CKEDITOR.env.chrome) {
                                var b =
                                    this.$.scrollTop; this.$.focus(); this.$.scrollTop = b
                            } else this.$.focus(); else this.$.setActive()
                        } catch (d) { if (!CKEDITOR.env.ie) throw d; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                    }, on: function (a, b) { var d = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = f(b, this), d[0] = a, d[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, d) }, attachListener: function (a) {
                    !this._.listeners &&
                        (this._.listeners = []); var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b); this._.listeners.push(b); return b
                    }, clearListeners: function () { var a = this._.listeners; try { for (; a.length;)a.pop().removeListener() } catch (b) { } }, restoreAttrs: function () { var a = this._.attrChanges, b, d; for (d in a) a.hasOwnProperty(d) && (b = a[d], null !== b ? this.setAttribute(d, b) : this.removeAttribute(d)) }, attachClass: function (a) {
                        var b = this.getCustomData("classes"); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes",
                            b), this.addClass(a))
                    }, changeAttr: function (a, b) { var d = this.getAttribute(a); b !== d && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = d), this.setAttribute(a, b)) }, insertText: function (a) { this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a), "text") }, transformPlainTextToHtml: function (a) {
                        var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a,
                            b)
                    }, insertHtml: function (a, b, d) { var c = this.editor; c.focus(); c.fire("saveSnapshot"); d || (d = c.getSelection().getRanges()[0]); u(this, b || "html", a, d); d.select(); k(this); this.editor.fire("afterInsertHtml", {}) }, insertHtmlIntoRange: function (a, b, d) { u(this, d || "html", a, b); this.editor.fire("afterInsertHtml", { intoRange: b }) }, insertElement: function (a, d) {
                        var c = this.editor; c.focus(); c.fire("saveSnapshot"); var g = c.activeEnterMode, c = c.getSelection(), f = a.getName(), f = CKEDITOR.dtd.$block[f]; d || (d = c.getRanges()[0]); this.insertElementIntoRange(a,
                            d) && (d.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), f && ((f = a.getNext(function (a) { return b(a) && !v(a) })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? d.moveToElementEditStart(f) : d.moveToElementEditEnd(a) : f || g == CKEDITOR.ENTER_BR || (f = d.fixBlock(!0, g == CKEDITOR.ENTER_DIV ? "div" : "p"), d.moveToElementEditStart(f)))); c.selectRanges([d]); k(this)
                    }, insertElementIntoSelection: function (a) { this.insertElement(a) }, insertElementIntoRange: function (a, b) {
                        var c = this.editor, g = c.config.enterMode,
                        f = a.getName(), e = CKEDITOR.dtd.$block[f]; if (b.checkReadOnly()) return !1; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? x(b) : b.startContainer.is(CKEDITOR.dtd.$list) && r(b)); var k, h; if (e) for (; (k = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[k.getName()]) && (!h || !h[f]);)if (k.getName() in CKEDITOR.dtd.span) { var e = b.splitElement(k), n = b.createBookmark(); d(k); d(e); b.moveToBookmark(n) } else b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(k),
                            b.collapse(!0), k.remove()) : b.splitBlock(g == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable()); b.insertNode(a); return !0
                    }, setData: function (a, b) { b || (a = this.editor.dataProcessor.toHtml(a)); this.setHtml(a); this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready"); this.editor.fire("dataReady") }, getData: function (a) { var b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b }, setReadOnly: function (a) { this.setAttribute("contenteditable", !a) }, detach: function () {
                        this.removeClass("cke_editable");
                        this.status = "detached"; var a = this.editor; this._.detach(); delete a.document; delete a.window
                    }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) }, fixInitialSelection: function () {
                        function a() {
                            var b = d.getDocument().$, c = b.getSelection(), g; a: if (c.anchorNode && c.anchorNode == d.$) g = !0; else { if (CKEDITOR.env.webkit && (g = d.getDocument().getActive()) && g.equals(d) && !c.anchorNode) { g = !0; break a } g = void 0 } g && (g = new CKEDITOR.dom.range(d), g.moveToElementEditStart(d), b = b.createRange(), b.setStart(g.startContainer.$,
                                g.startOffset), b.collapse(!0), c.removeAllRanges(), c.addRange(b))
                        } function b() { var a = d.getDocument().$, c = a.selection, g = d.getDocument().getActive(); "None" == c.type && g.equals(d) && (c = new CKEDITOR.dom.range(d), a = a.body.createTextRange(), c.moveToElementEditStart(d), c = c.startContainer, c.type != CKEDITOR.NODE_ELEMENT && (c = c.getParent()), a.moveToElementText(c.$), a.collapse(!0), a.select()) } var d = this; if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b()); else if (this.hasFocus) this.focus(),
                            a(); else this.once("focus", function () { a() }, null, null, -999)
                    }, getHtmlFromRange: function (a) { if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document); a = { doc: this.getDocument(), range: a.clone() }; z.eol.detect(a, this); z.bogus.exclude(a); z.cell.shrink(a); a.fragment = a.range.cloneContents(); z.tree.rebuild(a, this); z.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$) }, extractHtmlFromRange: function (a, b) {
                        var d = t, c = { range: a, doc: a.document }, g = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(),
                            g; a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); d.table.detectPurge(c); c.bookmark = a.createBookmark(); delete c.range; var f = this.editor.createRange(); f.moveToPosition(c.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); c.targetBookmark = f.createBookmark(); d.list.detectMerge(c, this); d.table.detectRanges(c, this); d.block.detectMerge(c, this); c.tableContentsRanges ? (d.table.deleteRanges(c), a.moveToBookmark(c.bookmark), c.range = a) : (a.moveToBookmark(c.bookmark), c.range = a, a.extractContents(d.detectExtractMerge(c))); a.moveToBookmark(c.targetBookmark);
                        a.optimize(); d.fixUneditableRangePosition(a); d.list.merge(c, this); d.table.purge(c, this); d.block.merge(c, this); if (b) { d = a.startPath(); if (c = a.checkStartOfBlock() && a.checkEndOfBlock() && d.block && !a.root.equals(d.block)) { a: { var c = d.block.getElementsByTag("span"), f = 0, e; if (c) for (; e = c.getItem(f++);)if (!p(e)) { c = !0; break a } c = !1 } c = !c } c && (a.moveToPosition(d.block, CKEDITOR.POSITION_BEFORE_START), d.block.remove()) } else d.autoParagraph(this.editor, a), w(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings();
                        return g
                    }, setup: function () {
                        var a = this.editor; this.attachListener(a, "beforeGetData", function () { var b = this.getData(); this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(q, function (a, b) { return b })); a.setData(b, null, 1) }, this); this.attachListener(a, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(a, "afterSetData", function () { this.setData(a.getData(1)) }, this); this.attachListener(a, "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(a,
                            "beforeFocus", function () { var b = a.getSelection(); (b = b && b.getNative()) && "Control" == b.type || this.focus() }, this); this.attachListener(a, "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(a, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(a, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(a.readOnly); this.attachClass("cke_editable"); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") :
                                a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed"); this.attachClass("cke_contents_" + a.config.contentsLangDirection); a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly; a.keystrokeHandler.attach(this); this.on("blur", function () { this.hasFocus = !1 }, null, null, -1); this.on("focus", function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) this.on("scroll", function () { a._.previousScrollTop = a.editable().$.scrollTop }, null,
                                    null, -1); if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) { var d = function () { var b = a.editable(); null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d)) }; this.on("scroll", d) } a.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function () { a.focusManager.focus(this) }, this)); this.isInline() && this.changeAttr("tabindex", a.tabIndex); if (!this.is("textarea")) {
                                    a.document =
                                        this.getDocument(); a.window = this.getWindow(); var f = a.document; this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker); var e = a.config.contentsLangDirection; this.getDirection(1) != e && this.changeAttr("dir", e); var k = CKEDITOR.getCss(); if (k) {
                                            var e = f.getHead(), h = e.getCustomData("stylesheet"); h ? k != h.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? h.$.styleSheet.cssText = k : h.setText(k)) : (k = f.appendStyleText(k), k = new CKEDITOR.dom.element(k.ownerNode || k.owningElement), e.setCustomData("stylesheet",
                                                k), k.data("cke-temp", 1))
                                        } e = f.getCustomData("stylesheet_ref") || 0; f.setCustomData("stylesheet_ref", e + 1); this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { a = a.data; var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() }); var l = { 8: 1, 46: 1 }; this.attachListener(a, "key", function (b) {
                                            if (a.readOnly) return !0; var d = b.data.domEvent.getKey(), c; b = a.getSelection(); if (0 !== b.getRanges().length) {
                                                if (d in
                                                    l) {
                                                        var g, f = b.getRanges()[0], e = f.startPath(), k, h, p, d = 8 == d; CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (g = b.getSelectedElement()) || (g = m(b)) ? (a.fire("saveSnapshot"), f.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START), g.remove(), f.select(), a.fire("saveSnapshot"), c = 1) : f.collapsed && ((k = e.block) && (p = k[d ? "getPrevious" : "getNext"](n)) && p.type == CKEDITOR.NODE_ELEMENT && p.is("table") && f[d ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), f[d ? "checkEndOfBlock" : "checkStartOfBlock"]() && k.remove(), f["moveToElementEdit" +
                                                            (d ? "End" : "Start")](p), f.select(), a.fire("saveSnapshot"), c = 1) : e.blockLimit && e.blockLimit.is("td") && (h = e.blockLimit.getAscendant("table")) && f.checkBoundaryOfElement(h, d ? CKEDITOR.START : CKEDITOR.END) && (p = h[d ? "getPrevious" : "getNext"](n)) ? (a.fire("saveSnapshot"), f["moveToElementEdit" + (d ? "End" : "Start")](p), f.checkStartOfBlock() && f.checkEndOfBlock() ? p.remove() : f.select(), a.fire("saveSnapshot"), c = 1) : (h = e.contains(["td", "th", "caption"])) && f.checkBoundaryOfElement(h, d ? CKEDITOR.START : CKEDITOR.END) && (c = 1))
                                                } return !c
                                            }
                                        });
                                        a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function (d) { d.data.getKeystroke() in l && !this.getFirst(b) && (this.appendBogus(), d = a.createRange(), d.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), d.select()) }); this.attachListener(this, "dblclick", function (b) { if (a.readOnly) return !1; b = { element: b.data.getTarget() }; a.fire("doubleclick", b) }); CKEDITOR.env.ie && this.attachListener(this, "click", c); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown",
                                            function (b) { var d = b.data.getTarget(); d.is("img", "hr", "input", "textarea", "select") && !d.isReadOnly() && (a.getSelection().selectElement(d), d.is("input", "textarea", "select") && b.data.preventDefault()) }); CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) { (b = b.data.getTarget()) && b.is("img") && !b.isReadOnly() && a.getSelection().selectElement(b) }); CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) {
                                                if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getAscendant("table") && !b.getOuterHtml().replace(q,
                                                    ""))) { var d = a.createRange(); d.moveToElementEditStart(b); d.select(!0) }
                                            }); CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
                                                if (a.readOnly) return !0; var d = b.data.domEvent.getKey(); if (d in l && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                                                    var d =
                                                        8 == d, c = b.getRanges()[0]; b = c.startPath(); if (c.collapsed) a: {
                                                            var f = b.block; if (f && c[d ? "checkStartOfBlock" : "checkEndOfBlock"]() && c.moveToClosestEditablePosition(f, !d) && c.collapsed) {
                                                                if (c.startContainer.type == CKEDITOR.NODE_ELEMENT) { var e = c.startContainer.getChild(c.startOffset - (d ? 1 : 0)); if (e && e.type == CKEDITOR.NODE_ELEMENT && e.is("hr")) { a.fire("saveSnapshot"); e.remove(); b = !0; break a } } c = c.startPath().block; if (!c || c && c.contains(f)) b = void 0; else {
                                                                    a.fire("saveSnapshot"); var k; (k = (d ? c : f).getBogus()) && k.remove();
                                                                    k = a.getSelection(); e = k.createBookmarks(); (d ? f : c).moveChildren(d ? c : f, !1); b.lastElement.mergeSiblings(); g(f, c, !d); k.selectBookmarks(e); b = !0
                                                                }
                                                            } else b = !1
                                                        } else d = c, k = b.block, c = d.endPath().block, k && c && !k.equals(c) ? (a.fire("saveSnapshot"), (f = k.getBogus()) && f.remove(), d.enlarge(CKEDITOR.ENLARGE_INLINE), d.deleteContents(), c.getParent() && (c.moveChildren(k, !1), b.lastElement.mergeSiblings(), g(k, c, !0)), d = a.getSelection().getRanges()[0], d.collapse(1), d.optimize(), "" === d.startContainer.getHtml() && d.startContainer.appendBogus(),
                                                            d.select(), b = !0) : b = !1; if (!b) return; a.getSelection().scrollIntoView(); a.fire("saveSnapshot"); return !1
                                                }
                                            }, this, null, 100)
                                    }
                    }
                }, _: {
                    detach: function () {
                        this.editor.setData(this.editor.getData(), 0, 1); this.clearListeners(); this.restoreAttrs(); var a; if (a = this.removeCustomData("classes")) for (; a.length;)this.removeClass(a.pop()); if (!this.is("textarea")) {
                            a = this.getDocument(); var b = a.getHead(); if (b.getCustomData("stylesheet")) {
                                var d = a.getCustomData("stylesheet_ref"); --d ? a.setCustomData("stylesheet_ref", d) : (a.removeCustomData("stylesheet_ref"),
                                    b.removeCustomData("stylesheet").remove())
                            }
                        } this.editor.fire("contentDomUnload"); delete this.editor
                    }
                }
        }); CKEDITOR.editor.prototype.editable = function (a) { var b = this._.editable; if (b && a) return 0; arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null)); return b }; CKEDITOR.on("instanceLoaded", function (b) {
            var d = b.editor; d.on("insertElement", function (a) {
                a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") &&
                    a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1))
            }); d.on("selectionChange", function (b) { if (!d.readOnly) { var c = d.getSelection(); c && !c.isLocked && (c = d.checkDirty(), d.fire("lockSnapshot"), a(b), d.fire("unlockSnapshot"), !c && d.resetDirty()) } })
        }); CKEDITOR.on("instanceCreated", function (a) {
            var b = a.editor; b.on("mode", function () {
                var a = b.editable(); if (a && a.isInline()) {
                    var d = b.title; a.changeAttr("role", "textbox"); a.changeAttr("aria-multiline", "true"); a.changeAttr("aria-label",
                        d); d && a.changeAttr("title", d); var c = b.fire("ariaEditorHelpLabel", {}).label; if (c && (d = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) { var g = CKEDITOR.tools.getNextId(), c = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + c + "\x3c/span\x3e"); d.append(c); a.changeAttr("aria-describedby", g) }
                }
            })
        }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}"); n = CKEDITOR.dom.walker.whitespaces(!0);
        p = CKEDITOR.dom.walker.bookmark(!1, !0); w = CKEDITOR.dom.walker.empty(); v = CKEDITOR.dom.walker.bogus(); q = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; u = function () {
            function a(b) { return b.type == CKEDITOR.NODE_ELEMENT } function c(b, d) {
                var g, f, e, k, h = [], n = d.range.startContainer; g = d.range.startPath(); for (var n = m[n.getName()], l = 0, p = b.getChildren(), G = p.count(), u = -1, r = -1, F = 0, t = g.contains(m.$list); l < G; ++l)g = p.getItem(l), a(g) ? (e =
                    g.getName(), t && e in CKEDITOR.dtd.$list ? h = h.concat(c(g, d)) : (k = !!n[e], "br" != e || !g.data("cke-eol") || l && l != G - 1 || (F = (f = l ? h[l - 1].node : p.getItem(l + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && m.$block[f.getName()]), -1 != u || k || (u = l), k || (r = l), h.push({ isElement: 1, isLineBreak: F, isBlock: g.isBlockBoundary(), hasBlockSibling: f, node: g, name: e, allowed: k }), f = F = 0)) : h.push({ isElement: 0, node: g, allowed: 1 }); -1 < u && (h[u].firstNotAllowed = 1); -1 < r && (h[r].lastNotAllowed = 1); return h
            } function g(b, d) {
                var c = [], f = b.getChildren(), e = f.count(),
                k, h = 0, n = m[d], l = !b.is(m.$inline) || b.is("br"); for (l && c.push(" "); h < e; h++)k = f.getItem(h), a(k) && !k.is(n) ? c = c.concat(g(k, d)) : c.push(k); l && c.push(" "); return c
            } function f(b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) } function e(b) { return b && a(b) && (b.is(m.$removeEmpty) || b.is("a") && !b.isBlockBoundary()) } function k(b, d, c, g) {
                var f = b.clone(), e, h; f.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); (e = (new CKEDITOR.dom.walker(f)).next()) && a(e) && p[e.getName()] && (h = e.getPrevious()) && a(h) && !h.getParent().equals(b.startContainer) &&
                    c.contains(h) && g.contains(e) && e.isIdentical(h) && (e.moveChildren(h), e.remove(), k(b, d, c, g))
            } function n(b, d) { function c(b, d) { if (d.isBlock && d.isElement && !d.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 } var g = d.endContainer.getChild(d.endOffset), f = d.endContainer.getChild(d.endOffset - 1); g && c(g, b[b.length - 1]); f && c(f, b[0]) && (d.setEnd(d.endContainer, d.endOffset - 1), d.collapse()) } var m = CKEDITOR.dtd, p = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }, u = {
                p: 1, div: 1, h1: 1, h2: 1,
                h3: 1, h4: 1, h5: 1, h6: 1
            }, G = CKEDITOR.tools.extend({}, m.$inline); delete G.br; return function (D, p, r, t) {
                var x = D.editor, z = !1; "unfiltered_html" == p && (p = "html", z = !0); if (!t.checkReadOnly()) {
                    var v = (new CKEDITOR.dom.elementPath(t.startContainer, t.root)).blockLimit || t.root; p = { type: p, dontFilter: z, editable: D, editor: x, range: t, blockLimit: v, mergeCandidates: [], zombies: [] }; var z = p.range, v = p.mergeCandidates, w = "html" === p.type, q, E, U, aa, ba, V; "text" == p.type && z.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (E = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",
                        z.document), z.insertNode(E), z.setStartAfter(E)); U = new CKEDITOR.dom.elementPath(z.startContainer); p.endPath = aa = new CKEDITOR.dom.elementPath(z.endContainer); if (!z.collapsed) { q = aa.block || aa.blockLimit; var da = z.getCommonAncestor(); q && !q.equals(da) && !q.contains(da) && z.checkEndOfBlock() && p.zombies.push(q); z.deleteContents() } for (; (ba = f(z)) && a(ba) && ba.isBlockBoundary() && U.contains(ba);)z.moveToPosition(ba, CKEDITOR.POSITION_BEFORE_END); k(z, p.blockLimit, U, aa); E && (z.setEndBefore(E), z.collapse(), E.remove());
                    E = z.startPath(); if (q = E.contains(e, !1, 1)) V = z.splitElement(q), p.inlineStylesRoot = q, p.inlineStylesPeak = E.lastElement; E = z.createBookmark(); w && (d(q), d(V)); (q = E.startNode.getPrevious(b)) && a(q) && e(q) && v.push(q); (q = E.startNode.getNext(b)) && a(q) && e(q) && v.push(q); for (q = E.startNode; (q = q.getParent()) && e(q);)v.push(q); z.moveToBookmark(E); x.enterMode === CKEDITOR.ENTER_DIV && "" === x.getData(!0) && ((x = D.getFirst()) && x.remove(), t.setStartAt(D, CKEDITOR.POSITION_AFTER_START), t.collapse(!0)); if (D = r) {
                        D = p.range; if ("text" ==
                            p.type && p.inlineStylesRoot) { t = p.inlineStylesPeak; x = t.getDocument().createText("{cke-peak}"); for (V = p.inlineStylesRoot.getParent(); !t.equals(V);)x = x.appendTo(t.clone()), t = t.getParent(); r = x.getOuterHtml().split("{cke-peak}").join(r) } t = p.blockLimit.getName(); if (/^\s+|\s+$/.test(r) && "span" in CKEDITOR.dtd[t]) { var L = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; r = L + r + L } r = p.editor.dataProcessor.toHtml(r, {
                                context: null, fixForBody: !1, protectedWhitespaces: !!L, dontFilter: p.dontFilter, filter: p.editor.activeFilter,
                                enterMode: p.editor.activeEnterMode
                            }); t = D.document.createElement("body"); t.setHtml(r); L && (t.getFirst().remove(), t.getLast().remove()); if ((L = D.startPath().block) && (1 != L.getChildCount() || !L.getBogus())) a: { var P; if (1 == t.getChildCount() && a(P = t.getFirst()) && P.is(u) && !P.hasAttribute("contenteditable")) { L = P.getElementsByTag("*"); D = 0; for (V = L.count(); D < V; D++)if (x = L.getItem(D), !x.is(G)) break a; P.moveChildren(P.getParent(1)); P.remove() } } p.dataWrapper = t; D = r
                    } if (D) {
                        P = p.range; D = P.document; t = p.blockLimit; V = 0; var S,
                            L = [], T, Y; r = E = 0; var ca, x = P.startContainer; ba = p.endPath.elements[0]; var fa, z = ba.getPosition(x), v = !!ba.getCommonAncestor(x) && z != CKEDITOR.POSITION_IDENTICAL && !(z & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED), x = c(p.dataWrapper, p); for (n(x, P); V < x.length; V++) {
                                z = x[V]; if (w = z.isLineBreak) w = P, q = t, aa = U = void 0, z.hasBlockSibling ? w = 1 : (U = w.startContainer.getAscendant(m.$block, 1)) && U.is({ div: 1, p: 1 }) ? (aa = U.getPosition(q), aa == CKEDITOR.POSITION_IDENTICAL || aa == CKEDITOR.POSITION_CONTAINS ? w = 0 : (q = w.splitElement(U),
                                    w.moveToPosition(q, CKEDITOR.POSITION_AFTER_START), w = 1)) : w = 0; if (w) r = 0 < V; else {
                                        w = P.startPath(); !z.isBlock && h(p.editor, w.block, w.blockLimit) && (Y = l(p.editor)) && (Y = D.createElement(Y), Y.appendBogus(), P.insertNode(Y), CKEDITOR.env.needsBrFiller && (S = Y.getBogus()) && S.remove(), P.moveToPosition(Y, CKEDITOR.POSITION_BEFORE_END)); if ((w = P.startPath().block) && !w.equals(T)) { if (S = w.getBogus()) S.remove(), L.push(w); T = w } z.firstNotAllowed && (E = 1); if (E && z.isElement) {
                                            w = P.startContainer; for (q = null; w && !m[w.getName()][z.name];) {
                                                if (w.equals(t)) {
                                                    w =
                                                    null; break
                                                } q = w; w = w.getParent()
                                            } if (w) q && (ca = P.splitElement(q), p.zombies.push(ca), p.zombies.push(q)); else { q = t.getName(); fa = !V; w = V == x.length - 1; q = g(z.node, q); U = []; aa = q.length; for (var da = 0, ha = void 0, ia = 0, ja = -1; da < aa; da++)ha = q[da], " " == ha ? (ia || fa && !da || (U.push(new CKEDITOR.dom.text(" ")), ja = U.length), ia = 1) : (U.push(ha), ia = 0); w && ja == U.length && U.pop(); fa = U }
                                        } if (fa) { for (; w = fa.pop();)P.insertNode(w); fa = 0 } else P.insertNode(z.node); z.lastNotAllowed && V < x.length - 1 && ((ca = v ? ba : ca) && P.setEndAt(ca, CKEDITOR.POSITION_AFTER_START),
                                            E = 0); P.collapse()
                                    }
                            } 1 != x.length ? S = !1 : (S = x[0], S = S.isElement && "false" == S.node.getAttribute("contenteditable")); S && (r = !0, w = x[0].node, P.setStartAt(w, CKEDITOR.POSITION_BEFORE_START), P.setEndAt(w, CKEDITOR.POSITION_AFTER_END)); p.dontMoveCaret = r; p.bogusNeededBlocks = L
                    } S = p.range; var ea; ca = p.bogusNeededBlocks; for (fa = S.createBookmark(); T = p.zombies.pop();)T.getParent() && (Y = S.clone(), Y.moveToElementEditStart(T), Y.removeEmptyBlocksAtEnd()); if (ca) for (; T = ca.pop();)CKEDITOR.env.needsBrFiller ? T.appendBogus() : T.append(S.document.createText(" "));
                    for (; T = p.mergeCandidates.pop();)T.mergeSiblings(); S.moveToBookmark(fa); if (!p.dontMoveCaret) { for (T = f(S); T && a(T) && !T.is(m.$empty);) { if (T.isBlockBoundary()) S.moveToPosition(T, CKEDITOR.POSITION_BEFORE_END); else { if (e(T) && T.getHtml().match(/(\s|&nbsp;)$/g)) { ea = null; break } ea = S.clone(); ea.moveToPosition(T, CKEDITOR.POSITION_BEFORE_END) } T = T.getLast(b) } ea && S.moveToRange(ea) }
                }
            }
        }(); x = function () {
            function a(b) {
                b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) };
                b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b
            } function b(a, d, c) { d = a.getDocument().createElement(d); a.append(d, c); return d } function d(a) { var b = a.count(), c; for (b; 0 < b--;)c = a.getItem(b), CKEDITOR.tools.trim(c.getHtml()) || (c.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && c.getChildCount() && c.getFirst().remove()) } return function (c) {
                var g = c.startContainer, f = g.getAscendant("table", 1), e = !1; d(f.getElementsByTag("td")); d(f.getElementsByTag("th")); f = c.clone(); f.setStart(g, 0); f =
                    a(f).lastBackward(); f || (f = c.clone(), f.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), e = !0); f || (f = g); f.is("table") ? (c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), c.collapse(!0), f.remove()) : (f.is({ tbody: 1, thead: 1, tfoot: 1 }) && (f = b(f, "tr", e)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", e)), (g = f.getBogus()) && g.remove(), c.moveToPosition(f, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
            }
        }(); r = function () {
            function a(b) {
                b = new CKEDITOR.dom.walker(b); b.guard = function (a,
                    b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem) }; return b
            } return function (b) {
                var d = b.startContainer, c = !1, g; g = b.clone(); g.setStart(d, 0); g = a(g).lastBackward(); g || (g = b.clone(), g.setEndAt(d, CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), c = !0); g || (g = d); g.is(CKEDITOR.dtd.$list) ? (b.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), g.remove()) :
                    ((d = g.getBogus()) && d.remove(), b.moveToPosition(g, c ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
            }
        }(); z = {
            eol: {
                detect: function (a, b) {
                    var d = a.range, c = d.clone(), g = d.clone(), f = new CKEDITOR.dom.elementPath(d.startContainer, b), e = new CKEDITOR.dom.elementPath(d.endContainer, b); c.collapse(1); g.collapse(); f.block && c.checkBoundaryOfElement(f.block, CKEDITOR.END) && (d.setStartAfter(f.block), a.prependEolBr = 1); e.block && g.checkBoundaryOfElement(e.block, CKEDITOR.START) && (d.setEndBefore(e.block),
                        a.appendEolBr = 1)
                }, fix: function (a, b) { var d = b.getDocument(), c; a.appendEolBr && (c = this.createEolBr(d), a.fragment.append(c)); !a.prependEolBr || c && !c.getPrevious() || a.fragment.append(this.createEolBr(d), 1) }, createEolBr: function (a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
            }, bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(), d = b.startNode, b = b.endNode; !b || !v(b) || d && d.equals(b) || a.range.setEndBefore(b) } }, tree: {
                rebuild: function (a, b) {
                    var d = a.range, c = d.getCommonAncestor(), g = new CKEDITOR.dom.elementPath(c,
                        b), f = new CKEDITOR.dom.elementPath(d.startContainer, b), d = new CKEDITOR.dom.elementPath(d.endContainer, b), e; c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()); if (g.blockLimit.is({ tr: 1, table: 1 })) { var k = g.contains("table").getParent(); e = function (a) { return !a.equals(k) } } else if (g.block && g.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), d = d.contains(CKEDITOR.dtd.$list), !f.equals(d))) { var h = g.contains(CKEDITOR.dtd.$list).getParent(); e = function (a) { return !a.equals(h) } } e || (e = function (a) {
                            return !a.equals(g.block) &&
                                !a.equals(g.blockLimit)
                        }); this.rebuildFragment(a, b, c, e)
                }, rebuildFragment: function (a, b, d, c) { for (var g; d && !d.equals(b) && c(d);)g = d.clone(0, 1), a.fragment.appendTo(g), a.fragment = g, d = d.getParent() }
            }, cell: { shrink: function (a) { a = a.range; var b = a.startContainer, d = a.endContainer, c = a.startOffset, g = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(d) && b.is("tr") && ++c == g && a.shrink(CKEDITOR.SHRINK_TEXT) } }
        }; t = function () {
            function a(b, d) { var c = b.getParent(); if (c.is(CKEDITOR.dtd.$inline)) b[d ? "insertBefore" : "insertAfter"](c) }
            function b(d, c, g) { a(c); a(g, 1); for (var f; f = g.getNext();)f.insertAfter(c), c = f; w(d) && d.remove() } function d(a, b) { var c = new CKEDITOR.dom.range(a); c.setStartAfter(b.startNode); c.setEndBefore(b.endNode); return c } return {
                list: {
                    detectMerge: function (a, b) {
                        var c = d(b, a.bookmark), g = c.startPath(), f = c.endPath(), e = g.contains(CKEDITOR.dtd.$list), k = f.contains(CKEDITOR.dtd.$list); a.mergeList = e && k && e.getParent().equals(k.getParent()) && !e.equals(k); a.mergeListItems = g.block && f.block && g.block.is(CKEDITOR.dtd.$listItem) &&
                            f.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) c = c.clone(), c.setStartBefore(a.bookmark.startNode), c.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = c.createBookmark()
                    }, merge: function (a, d) {
                        if (a.mergeListBookmark) {
                            var c = a.mergeListBookmark.startNode, g = a.mergeListBookmark.endNode, f = new CKEDITOR.dom.elementPath(c, d), e = new CKEDITOR.dom.elementPath(g, d); if (a.mergeList) { var k = f.contains(CKEDITOR.dtd.$list), h = e.contains(CKEDITOR.dtd.$list); k.equals(h) || (h.moveChildren(k), h.remove()) } a.mergeListItems &&
                                (f = f.contains(CKEDITOR.dtd.$listItem), e = e.contains(CKEDITOR.dtd.$listItem), f.equals(e) || b(e, c, g)); c.remove(); g.remove()
                        }
                    }
                }, block: {
                    detectMerge: function (a, b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { var d = new CKEDITOR.dom.range(b); d.setStartBefore(a.bookmark.startNode); d.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = d.createBookmark() } }, merge: function (a, d) {
                        if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                            var c = a.mergeBlockBookmark.startNode, g = a.mergeBlockBookmark.endNode, f = new CKEDITOR.dom.elementPath(c,
                                d), e = new CKEDITOR.dom.elementPath(g, d), f = f.block, e = e.block; f && e && !f.equals(e) && b(e, c, g); c.remove(); g.remove()
                        }
                    }
                }, table: function () {
                    function a(d) {
                        var g = [], f, e = new CKEDITOR.dom.walker(d), k = d.startPath().contains(c), h = d.endPath().contains(c), n = {}; e.guard = function (a, e) {
                            if (a.type == CKEDITOR.NODE_ELEMENT) { var l = "visited_" + (e ? "out" : "in"); if (a.getCustomData(l)) return; CKEDITOR.dom.element.setMarker(n, a, l, 1) } if (e && k && a.equals(k)) f = d.clone(), f.setEndAt(k, CKEDITOR.POSITION_BEFORE_END), g.push(f); else if (!e && h &&
                                a.equals(h)) f = d.clone(), f.setStartAt(h, CKEDITOR.POSITION_AFTER_START), g.push(f); else { if (l = !e) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(c) && (!k || b(a, k)) && (!h || b(a, h)); if (!l && (l = e)) if (a.is(c)) var l = k && k.getAscendant("table", !0), m = h && h.getAscendant("table", !0), p = a.getAscendant("table", !0), l = l && l.contains(p) || m && m.contains(p); else l = void 0; l && (f = d.clone(), f.selectNodeContents(a), g.push(f)) }
                        }; e.lastForward(); CKEDITOR.dom.element.clearAllMarkers(n); return g
                    } function b(a, d) {
                        var c = CKEDITOR.POSITION_CONTAINS +
                            CKEDITOR.POSITION_IS_CONTAINED, g = a.getPosition(d); return g === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (g & c)
                    } var c = { td: 1, th: 1, caption: 1 }; return {
                        detectPurge: function (a) {
                            var b = a.range, d = b.clone(); d.enlarge(CKEDITOR.ENLARGE_ELEMENT); var d = new CKEDITOR.dom.walker(d), g = 0; d.evaluator = function (a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(c) && ++g }; d.checkForward(); if (1 < g) {
                                var d = b.startPath().contains("table"), f = b.endPath().contains("table"); d && f && b.checkBoundaryOfElement(d, CKEDITOR.START) && b.checkBoundaryOfElement(f,
                                    CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(d), b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark())
                            }
                        }, detectRanges: function (g, f) {
                            var e = d(f, g.bookmark), k = e.clone(), h, n, l = e.getCommonAncestor(); l.is(CKEDITOR.dtd.$tableContent) && !l.is(c) && (l = l.getAscendant("table", !0)); n = l; l = new CKEDITOR.dom.elementPath(e.startContainer, n); n = new CKEDITOR.dom.elementPath(e.endContainer, n); l = l.contains("table"); n = n.contains("table"); if (l || n) l && n && b(l, n) ? (g.tableSurroundingRange = k, k.setStartAt(l, CKEDITOR.POSITION_AFTER_END),
                                k.setEndAt(n, CKEDITOR.POSITION_BEFORE_START), k = e.clone(), k.setEndAt(l, CKEDITOR.POSITION_AFTER_END), h = e.clone(), h.setStartAt(n, CKEDITOR.POSITION_BEFORE_START), h = a(k).concat(a(h))) : l ? n || (g.tableSurroundingRange = k, k.setStartAt(l, CKEDITOR.POSITION_AFTER_END), e.setEndAt(l, CKEDITOR.POSITION_AFTER_END)) : (g.tableSurroundingRange = k, k.setEndAt(n, CKEDITOR.POSITION_BEFORE_START), e.setStartAt(n, CKEDITOR.POSITION_AFTER_START)), g.tableContentsRanges = h ? h : a(e)
                        }, deleteRanges: function (a) {
                            for (var b; b = a.tableContentsRanges.pop();)b.extractContents(),
                                w(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
                        }, purge: function (a) { if (a.purgeTableBookmark) { var b = a.doc, d = a.range.clone(), b = b.createElement("p"); b.insertBefore(a.purgeTableBookmark.startNode); d.moveToBookmark(a.purgeTableBookmark); d.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START) } }
                    }
                }(), detectExtractMerge: function (a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) },
                fixUneditableRangePosition: function (a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) }, autoParagraph: function (a, b) { var d = b.startPath(), c; h(a, d.block, d.blockLimit) && (c = l(a)) && (c = b.document.createElement(c), c.appendBogus(), b.insertNode(c), b.moveToPosition(c, CKEDITOR.POSITION_AFTER_START)) }
            }
        }()
    }(), function () {
        function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function e(b, d) {
            if (0 === b.length || a(b[0].getEnclosedNode())) return !1; var c, g; if ((c = !d &&
                1 === b.length) && !(c = b[0].collapsed)) { var f = b[0]; c = f.startContainer.getAscendant({ td: 1, th: 1 }, !0); var e = f.endContainer.getAscendant({ td: 1, th: 1 }, !0); g = CKEDITOR.tools.trim; c && c.equals(e) && !c.findOne("td, th, tr, tbody, table") ? (f = f.cloneContents(), c = f.getFirst() ? g(f.getFirst().getText()) !== g(c.getText()) : !0) : c = !1 } if (c) return !1; for (g = 0; g < b.length; g++)if (c = b[g]._getTableElement(), !c) return !1; return !0
        } function c(a) {
            function b(a) { a = a.find("td, th"); var d = [], c; for (c = 0; c < a.count(); c++)d.push(a.getItem(c)); return d }
            var d = [], c, g; for (g = 0; g < a.length; g++)c = a[g]._getTableElement(), c.is && c.is({ td: 1, th: 1 }) ? d.push(c) : d = d.concat(b(c)); return d
        } function b(a) { a = c(a); var b = "", d = [], g, f; for (f = 0; f < a.length; f++)g && !g.equals(a[f].getAscendant("tr")) ? (b += d.join("\t") + "\n", g = a[f].getAscendant("tr"), d = []) : 0 === f && (g = a[f].getAscendant("tr")), d.push(a[f].getText()); return b += d.join("\t") } function f(a) {
            var d = this.root.editor, c = d.getSelection(1); this.reset(); t = !0; c.root.once("selectionchange", function (a) { a.cancel() }, null, null, 0); c.selectRanges([a[0]]);
            c = this._.cache; c.ranges = new CKEDITOR.dom.rangeList(a); c.type = CKEDITOR.SELECTION_TEXT; c.selectedElement = a[0]._getTableElement(); c.selectedText = b(a); c.nativeSel = null; this.isFake = 1; this.rev = x++; d._.fakeSelection = this; t = !1; this.root.fire("selectionchange")
        } function m() {
            var b = this._.fakeSelection, d; if (b) {
                d = this.getSelection(1); var c; if (!(c = !d) && (c = !d.isHidden())) {
                    c = b; var g = d.getRanges(), f = c.getRanges(), k = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table", !0), h = f.length && f[0]._getTableElement() &&
                        f[0]._getTableElement().getAscendant("table", !0), n = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"), l = 1 === f.length && f[0]._getTableElement() && f[0]._getTableElement().is("table"); if (a(c.getSelectedElement())) c = !1; else { var m = 1 === g.length && g[0].collapsed, f = e(g, !!CKEDITOR.env.webkit) && e(f); k = k && h ? k.equals(h) || h.contains(k) : !1; k && (m || f) ? (n && !l && c.selectRanges(g), c = !0) : c = !1 } c = !c
                } c && (b.reset(), b = 0)
            } if (!b && (b = d || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return;
            this.fire("selectionCheck", b); d = this.elementPath(); d.compare(this._.selectionPreviousPath) || (c = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(d.blockLimit), !CKEDITOR.env.webkit && !CKEDITOR.env.gecko || c || (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = d, this.fire("selectionChange", { selection: b, path: d }))
        } function h() { C = !0; y || (l.call(this), y = CKEDITOR.tools.setTimeout(l, 200, this)) } function l() {
            y = null; C && (CKEDITOR.tools.setTimeout(m, 0, this), C =
                !1)
        } function d(a) { return A(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 } function k(a) { function b(d, c) { return d && d.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (c ? "End" : "Start")](d) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1; var c = a.startContainer, g = a.getPreviousNode(d, null, c), f = a.getNextNode(d, null, c); return b(g) || b(f, 1) || !(g || f || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1 } function g(a) {
            n(a, !1); var b = a.getDocument().createText(r);
            a.setCustomData("cke-fillingChar", b); return b
        } function n(a, b) {
            var d = a && a.removeCustomData("cke-fillingChar"); if (d) {
                if (!1 !== b) { var c = a.getDocument().getSelection().getNative(), g = c && "None" != c.type && c.getRangeAt(0), f = r.length; if (d.getLength() > f && g && g.intersectsNode(d.$)) { var e = [{ node: c.anchorNode, offset: c.anchorOffset }, { node: c.focusNode, offset: c.focusOffset }]; c.anchorNode == d.$ && c.anchorOffset > f && (e[0].offset -= f); c.focusNode == d.$ && c.focusOffset > f && (e[1].offset -= f) } } d.setText(p(d.getText(), 1)); e && (d = a.getDocument().$,
                    c = d.getSelection(), d = d.createRange(), d.setStart(e[0].node, e[0].offset), d.collapse(!0), c.removeAllRanges(), c.addRange(d), c.extend(e[1].node, e[1].offset))
            }
        } function p(a, b) { return b ? a.replace(z, function (a, b) { return b ? " " : "" }) : a.replace(r, "") } function w(a, b) {
            var d = b && CKEDITOR.tools.htmlEncode(b) || "\x26nbsp;", d = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;") +
                '"\x3e' + d + "\x3c/div\x3e", a.document); a.fire("lockSnapshot"); a.editable().append(d); var c = a.getSelection(1), g = a.createRange(), f = c.root.on("selectionchange", function (a) { a.cancel() }, null, null, 0); g.setStartAt(d, CKEDITOR.POSITION_AFTER_START); g.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); c.selectRanges([g]); f.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = d
        } function v(a) {
            var b = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (d) {
                var c = d.data.getKeystroke(); if (b[c]) {
                    var g = a.getSelection().getRanges(),
                    f = g[0]; 1 == g.length && f.collapsed && (c = f[38 > c ? "getPreviousEditableNode" : "getNextEditableNode"]()) && c.type == CKEDITOR.NODE_ELEMENT && "false" == c.getAttribute("contenteditable") && (a.getSelection().fake(c), d.data.preventDefault(), d.cancel())
                }
            }
        } function q(a) {
            for (var b = 0; b < a.length; b++) {
                var d = a[b]; d.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!d.collapsed) {
                    if (d.startContainer.isReadOnly()) for (var c = d.startContainer, g; c && !((g = c.type == CKEDITOR.NODE_ELEMENT) && c.is("body") || !c.isReadOnly());)g && "false" ==
                        c.getAttribute("contentEditable") && d.setStartAfter(c), c = c.getParent(); c = d.startContainer; g = d.endContainer; var f = d.startOffset, e = d.endOffset, k = d.clone(); c && c.type == CKEDITOR.NODE_TEXT && (f >= c.getLength() ? k.setStartAfter(c) : k.setStartBefore(c)); g && g.type == CKEDITOR.NODE_TEXT && (e ? k.setEndAfter(g) : k.setEndBefore(g)); c = new CKEDITOR.dom.walker(k); c.evaluator = function (c) {
                            if (c.type == CKEDITOR.NODE_ELEMENT && c.isReadOnly()) {
                                var g = d.clone(); d.setEndBefore(c); d.collapsed && a.splice(b--, 1); c.getPosition(k.endContainer) &
                                    CKEDITOR.POSITION_CONTAINS || (g.setStartAfter(c), g.collapsed || a.splice(b + 1, 0, g)); return !0
                            } return !1
                        }; c.next()
                }
            } return a
        } var u = "function" != typeof window.getSelection, x = 1, r = CKEDITOR.tools.repeat("​", 7), z = new RegExp(r + "( )?", "g"), t, y, C, A = CKEDITOR.dom.walker.invisible(1), B = function () {
            function a(b) { return function (a) { var d = a.editor.createRange(); d.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([d]); return !1 } } function b(a) {
                return function (b) {
                    var d = b.editor, c = d.createRange(),
                    g; if (!d.readOnly) return (g = c.moveToClosestEditablePosition(b.selected, a)) || (g = c.moveToClosestEditablePosition(b.selected, !a)), g && d.getSelection().selectRanges([c]), d.fire("saveSnapshot"), b.selected.remove(), g || (c.moveToElementEditablePosition(d.editable()), d.getSelection().selectRanges([c])), d.fire("saveSnapshot"), !1
                }
            } var d = a(), c = a(1); return { 37: d, 38: d, 39: c, 40: c, 8: b(), 46: b(1) }
        }(); CKEDITOR.on("instanceCreated", function (a) {
            function b() { var a = d.getSelection(); a && a.removeAllRanges() } var d = a.editor; d.on("contentDom",
                function () {
                    function a() { t = new CKEDITOR.dom.selection(d.getSelection()); t.lock() } function b() { f.removeListener("mouseup", b); l.removeListener("mouseup", b); var a = CKEDITOR.document.$.selection, d = a.createRange(); "None" != a.type && d.parentElement() && d.parentElement().ownerDocument == g.$ && d.select() } function c(a) {
                        a = a.getRanges()[0]; return a ? (a = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") }, !0)) && "false" === a.getAttribute("contenteditable") ?
                            a : null : null
                    } var g = d.document, f = CKEDITOR.document, e = d.editable(), k = g.getBody(), l = g.getDocumentElement(), p = e.isInline(), r, t; CKEDITOR.env.gecko && e.attachListener(e, "focus", function (a) { a.removeListener(); 0 !== r && (a = d.getSelection().getNative()) && a.isCollapsed && a.anchorNode == e.$ && (a = d.createRange(), a.moveToElementEditStart(e), a.select()) }, null, null, -2); e.attachListener(e, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () {
                        if (r && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                            r = d._.previousActive &&
                            d._.previousActive.equals(g.getActive()); var a = null != d._.previousScrollTop && d._.previousScrollTop != e.$.scrollTop; CKEDITOR.env.webkit && r && a && (e.$.scrollTop = d._.previousScrollTop)
                        } d.unlockSelection(r); r = 0
                    }, null, null, -1); e.attachListener(e, "mousedown", function () { r = 0 }); if (CKEDITOR.env.ie || CKEDITOR.env.gecko || p) u ? e.attachListener(e, "beforedeactivate", a, null, null, -1) : e.attachListener(d, "selectionCheck", a, null, null, -1), e.attachListener(e, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusout" : "blur", function () {
                        CKEDITOR.env.gecko &&
                        !p && (t.isFake || 2 > t.getRanges()) || (d.lockSelection(t), r = 1)
                    }, null, null, -1), e.attachListener(e, "mousedown", function () { r = 0 }); if (CKEDITOR.env.ie && !p) {
                        var x; e.attachListener(e, "mousedown", function (a) { 2 == a.data.$.button && ((a = d.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (x = d.window.getScrollPosition())) }); e.attachListener(e, "mouseup", function (a) { 2 == a.data.$.button && x && (d.document.$.documentElement.scrollLeft = x.x, d.document.$.documentElement.scrollTop = x.y); x = null }); if ("BackCompat" != g.$.compatMode) {
                            if (CKEDITOR.env.ie7Compat ||
                                CKEDITOR.env.ie6Compat) {
                                    var z, w; l.on("mousedown", function (a) {
                                        function b(a) { a = a.data.$; if (z) { var d = k.$.createTextRange(); try { d.moveToPoint(a.clientX, a.clientY) } catch (c) { } z.setEndPoint(0 > w.compareEndPoints("StartToStart", d) ? "EndToEnd" : "StartToStart", d); z.select() } } function d() { l.removeListener("mousemove", b); f.removeListener("mouseup", d); l.removeListener("mouseup", d); z.select() } a = a.data; if (a.getTarget().is("html") && a.$.y < l.$.clientHeight && a.$.x < l.$.clientWidth) {
                                            z = k.$.createTextRange(); try {
                                                z.moveToPoint(a.$.clientX,
                                                    a.$.clientY)
                                            } catch (c) { } w = z.duplicate(); l.on("mousemove", b); f.on("mouseup", d); l.on("mouseup", d)
                                        }
                                    })
                            } if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) l.on("mousedown", function (a) { a.data.getTarget().is("html") && (f.on("mouseup", b), l.on("mouseup", b)) })
                        }
                    } e.attachListener(e, "selectionchange", m, d); e.attachListener(e, "keyup", h, d); e.attachListener(e, "touchstart", h, d); e.attachListener(e, "touchend", h, d); CKEDITOR.env.ie && e.attachListener(e, "keydown", function (a) {
                        var b = this.getSelection(1), d = c(b); d && !d.equals(e) &&
                            (b.selectElement(d), a.data.preventDefault())
                    }, d); e.attachListener(e, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { d.forceNextSelectionCheck(); d.selectionChange(1) }); if (p && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { var q; e.attachListener(e, "mousedown", function () { q = 1 }); e.attachListener(g.getDocumentElement(), "mouseup", function () { q && h.call(d); q = 0 }) } else e.attachListener(CKEDITOR.env.ie ? e : g.getDocumentElement(), "mouseup", h, d); CKEDITOR.env.webkit && e.attachListener(g, "keydown", function (a) {
                        switch (a.data.getKey()) {
                            case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: e.hasFocus &&
                                n(e)
                        }
                    }, null, null, -1); e.attachListener(e, "keydown", v(d), null, null, -1)
                }); d.on("setData", function () { d.unlockSelection(); CKEDITOR.env.webkit && b() }); d.on("contentDomUnload", function () { d.unlockSelection() }); if (CKEDITOR.env.ie9Compat) d.on("beforeDestroy", b, null, null, 9); d.on("dataReady", function () { delete d._.fakeSelection; delete d._.hiddenSelectionContainer; d.selectionChange(1) }); d.on("loadSnapshot", function () {
                    var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = d.editable().getLast(a); b && b.hasAttribute("data-cke-hidden-sel") &&
                        (b.remove(), CKEDITOR.env.gecko && (a = d.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
                }, null, null, 100); d.on("key", function (a) { if ("wysiwyg" == d.mode) { var b = d.getSelection(); if (b.isFake) { var c = B[a.data.keyCode]; if (c) return c({ editor: d, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
        }); if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
            var b = a.editor; b.on("selectionChange", function () {
                var a = b.editable(), d = a.getCustomData("cke-fillingChar");
                d && (d.getCustomData("ready") ? (n(a), a.editor.fire("selectionCheck")) : d.setCustomData("ready", 1))
            }, null, null, -1); b.on("beforeSetMode", function () { n(b.editable()) }, null, null, -1); b.on("getSnapshot", function (a) { a.data && (a.data = p(a.data)) }, b, null, 20); b.on("toDataFormat", function (a) { a.data.dataValue = p(a.data.dataValue) }, null, null, 0)
        }); CKEDITOR.editor.prototype.selectionChange = function (a) { (a ? m : h).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) {
            return !this._.savedSelection && !this._.fakeSelection ||
                a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
        }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection = function (a) { var b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath };
        CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) }; CKEDITOR.dom.range.prototype.select = function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE = 1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; CKEDITOR.dom.selection = function (a) {
            if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } var d = a instanceof CKEDITOR.dom.element;
            this.rev = b ? b.rev : x++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root = d ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); var c, g; if (a) if (a.getRangeAt) c = (g = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer); else { try { g = a.createRange() } catch (f) { } c = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement()) } if (!c ||
                c.type != CKEDITOR.NODE_ELEMENT && c.type != CKEDITOR.NODE_TEXT || !this.root.equals(c) && !this.root.contains(c)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList; return this
        }; var H = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
            _removeFillingCharSequenceString: p,
            _createFillingCharSequenceNode: g, FILLING_CHAR_SEQUENCE: r
        }); CKEDITOR.dom.selection.prototype = {
            getNative: function () { return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = u ? this.document.$.selection : this.document.getWindow().$.getSelection() }, getType: u ? function () {
                var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE; try {
                    var d = this.getNative(), c = d.type; "Text" == c && (b = CKEDITOR.SELECTION_TEXT); "Control" == c && (b = CKEDITOR.SELECTION_ELEMENT); d.createRange().parentElement() &&
                        (b = CKEDITOR.SELECTION_TEXT)
                } catch (g) { } return a.type = b
            } : function () { var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_TEXT, d = this.getNative(); if (!d || !d.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (1 == d.rangeCount) { var d = d.getRangeAt(0), c = d.startContainer; c == d.endContainer && 1 == c.nodeType && 1 == d.endOffset - d.startOffset && H[c.childNodes[d.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT) } return a.type = b }, getRanges: function () {
                var a = u ? function () {
                    function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() }
                    var b = function (b, d) {
                        b = b.duplicate(); b.collapse(d); var c = b.parentElement(); if (!c.hasChildNodes()) return { container: c, offset: 0 }; for (var g = c.children, f, e, k = b.duplicate(), h = 0, n = g.length - 1, l = -1, m, p; h <= n;)if (l = Math.floor((h + n) / 2), f = g[l], k.moveToElementText(f), m = k.compareEndPoints("StartToStart", b), 0 < m) n = l - 1; else if (0 > m) h = l + 1; else return { container: c, offset: a(f) }; if (-1 == l || l == g.length - 1 && 0 > m) {
                            k.moveToElementText(c); k.setEndPoint("StartToStart", b); k = k.text.replace(/(\r\n|\r)/g, "\n").length; g = c.childNodes; if (!k) return f =
                                g[g.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? { container: c, offset: g.length } : { container: f, offset: f.nodeValue.length }; for (c = g.length; 0 < k && 0 < c;)e = g[--c], e.nodeType == CKEDITOR.NODE_TEXT && (p = e, k -= e.nodeValue.length); return { container: p, offset: -k }
                        } k.collapse(0 < m ? !0 : !1); k.setEndPoint(0 < m ? "StartToStart" : "EndToStart", b); k = k.text.replace(/(\r\n|\r)/g, "\n").length; if (!k) return { container: c, offset: a(f) + (0 < m ? 0 : 1) }; for (; 0 < k;)try {
                        e = f[0 < m ? "previousSibling" : "nextSibling"], e.nodeType == CKEDITOR.NODE_TEXT && (k -= e.nodeValue.length,
                            p = e), f = e
                        } catch (r) { return { container: c, offset: a(f) } } return { container: p, offset: 0 < m ? -k : p.nodeValue.length + k }
                    }; return function () {
                        var a = this.getNative(), d = a && a.createRange(), c = this.getType(); if (!a) return []; if (c == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), c = b(d, !0), a.setStart(new CKEDITOR.dom.node(c.container), c.offset), c = b(d), a.setEnd(new CKEDITOR.dom.node(c.container), c.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() &&
                            a.collapse(), [a]; if (c == CKEDITOR.SELECTION_ELEMENT) { for (var c = [], g = 0; g < d.length; g++) { for (var f = d.item(g), e = f.parentNode, k = 0, a = new CKEDITOR.dom.range(this.root); k < e.childNodes.length && e.childNodes[k] != f; k++); a.setStart(new CKEDITOR.dom.node(e), k); a.setEnd(new CKEDITOR.dom.node(e), k + 1); c.push(a) } return c } return []
                    }
                }() : function () {
                    var a = [], b, d = this.getNative(); if (!d) return a; for (var c = 0; c < d.rangeCount; c++) {
                        var g = d.getRangeAt(c); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(g.startContainer),
                            g.startOffset); b.setEnd(new CKEDITOR.dom.node(g.endContainer), g.endOffset); a.push(b)
                    } return a
                }; return function (b) { var d = this._.cache, c = d.ranges; c || (d.ranges = c = new CKEDITOR.dom.rangeList(a.call(this))); return b ? q(new CKEDITOR.dom.rangeList(c.slice())) : c }
            }(), getStartElement: function () {
                var a = this._.cache; if (void 0 !== a.startElement) return a.startElement; var b; switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var d = this.getRanges()[0];
                        if (d) { if (d.collapsed) b = d.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else { for (d.optimize(); b = d.startContainer, d.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)d.setStartAfter(b); b = d.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); if ((b = b.getChild(d.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT) for (d = b.getFirst(); d && d.type == CKEDITOR.NODE_ELEMENT;)b = d, d = d.getFirst(); else b = d.startContainer } b = b.$ }
                }return a.startElement = b ?
                    new CKEDITOR.dom.element(b) : null
            }, getSelectedElement: function () { var a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement; var b = this, d = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () { for (var a = b.getRanges()[0].clone(), d, c, g = 2; g && !((d = a.getEnclosedNode()) && d.type == CKEDITOR.NODE_ELEMENT && H[d.getName()] && (c = d)); g--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return c && c.$ }); return a.selectedElement = d ? new CKEDITOR.dom.element(d) : null }, getSelectedText: function () {
                var a =
                    this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(), b = u ? "Control" == b.type ? "" : b.createRange().text : b.toString(); return a.selectedText = b
            }, lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 }, unlock: function (a) {
                if (this.isLocked) {
                    if (a) var b = this.getSelectedElement(), d = this.getRanges(), c = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || d[0] && d[0].getCommonAncestor()) && a.getAscendant("body",
                        1) && (this.root.editor.plugins.tableselection && e(d) ? f.call(this, d) : c ? this.fake(b) : b && 2 > d.length ? this.selectElement(b) : this.selectRanges(d))
                }
            }, reset: function () {
                this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection; var b = a._.hiddenSelectionContainer; if (b) { var d = a.checkDirty(); a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot"); !d && a.resetDirty() } delete a._.hiddenSelectionContainer } else CKEDITOR.warn("selection-fake-reset");
                this.rev = x++
            }, selectElement: function (a) { var b = new CKEDITOR.dom.range(this.root); b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b]) }, selectRanges: function (a) {
                var b = this.root.editor, d = b && b._.hiddenSelectionContainer; this.reset(); if (d) for (var d = this.root, c, h = 0; h < a.length; ++h)c = a[h], c.endContainer.equals(d) && (c.endOffset = Math.min(c.endOffset, d.getChildCount())); if (a.length) if (this.isLocked) {
                    var l = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); l && !l.equals(this.root) &&
                        l.focus()
                } else {
                    var m; a: { var p, r; if (1 == a.length && !(r = a[0]).collapsed && (m = r.getEnclosedNode()) && m.type == CKEDITOR.NODE_ELEMENT && (r = r.clone(), r.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (p = r.getEnclosedNode()) && p.type == CKEDITOR.NODE_ELEMENT && (m = p), "false" == m.getAttribute("contenteditable"))) break a; m = void 0 } if (m) this.fake(m); else if (b && b.plugins.tableselection && b.plugins.tableselection.isSupportedEnvironment() && e(a) && !t && !a[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) f.call(this,
                        a); else {
                            if (u) {
                                p = CKEDITOR.dom.walker.whitespaces(!0); m = /\ufeff|\u00a0/; r = { table: 1, tbody: 1, tr: 1 }; 1 < a.length && (b = a[a.length - 1], a[0].setEnd(b.endContainer, b.endOffset)); b = a[0]; a = b.collapsed; var x, z, w; if ((d = b.getEnclosedNode()) && d.type == CKEDITOR.NODE_ELEMENT && d.getName() in H && (!d.is("a") || !d.getText())) try { w = d.$.createControlRange(); w.addElement(d.$); w.select(); return } catch (v) { } if (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in r || b.endContainer.type == CKEDITOR.NODE_ELEMENT &&
                                    b.endContainer.getName() in r) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed; w = b.createBookmark(); r = w.startNode; a || (l = w.endNode); w = b.document.$.body.createTextRange(); w.moveToElementText(r.$); w.moveStart("character", 1); l ? (m = b.document.$.body.createTextRange(), m.moveToElementText(l.$), w.setEndPoint("EndToEnd", m), w.moveEnd("character", -1)) : (x = r.getNext(p), z = r.hasAscendant("pre"), x = !(x && x.getText && x.getText().match(m)) && (z || !r.hasPrevious() || r.getPrevious().is && r.getPrevious().is("br")), z = b.document.createElement("span"),
                                        z.setHtml("\x26#65279;"), z.insertBefore(r), x && b.document.createText("﻿").insertBefore(r)); b.setStartBefore(r); r.remove(); a ? (x ? (w.moveStart("character", -1), w.select(), b.document.$.selection.clear()) : w.select(), b.moveToPosition(z, CKEDITOR.POSITION_BEFORE_START), z.remove()) : (b.setEndBefore(l), l.remove(), w.select())
                            } else {
                                l = this.getNative(); if (!l) return; this.removeAllRanges(); for (w = 0; w < a.length; w++) {
                                    if (w < a.length - 1 && (x = a[w], z = a[w + 1], m = x.clone(), m.setStart(x.endContainer, x.endOffset), m.setEnd(z.startContainer,
                                        z.startOffset), !m.collapsed && (m.shrink(CKEDITOR.NODE_ELEMENT, !0), b = m.getCommonAncestor(), m = m.getEnclosedNode(), b.isReadOnly() || m && m.isReadOnly()))) { z.setStart(x.startContainer, x.startOffset); a.splice(w--, 1); continue } b = a[w]; z = this.document.$.createRange(); b.collapsed && CKEDITOR.env.webkit && k(b) && (m = g(this.root), b.insertNode(m), (x = m.getNext()) && !m.getPrevious() && x.type == CKEDITOR.NODE_ELEMENT && "br" == x.getName() ? (n(this.root), b.moveToPosition(x, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(m, CKEDITOR.POSITION_AFTER_END));
                                    z.setStart(b.startContainer.$, b.startOffset); try { z.setEnd(b.endContainer.$, b.endOffset) } catch (q) { if (0 <= q.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), z.setEnd(b.endContainer.$, b.endOffset); else throw q; } l.addRange(z)
                                }
                            } this.reset(); this.root.fire("selectionchange")
                    }
                }
            }, fake: function (a, b) {
                var d = this.root.editor; void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label")); this.reset(); w(d, b); var c = this._.cache, g = new CKEDITOR.dom.range(this.root); g.setStartBefore(a); g.setEndAfter(a);
                c.ranges = new CKEDITOR.dom.rangeList(g); c.selectedElement = c.startElement = a; c.type = CKEDITOR.SELECTION_ELEMENT; c.selectedText = c.nativeSel = null; this.isFake = 1; this.rev = x++; d._.fakeSelection = this; this.root.fire("selectionchange")
            }, isHidden: function () { var a = this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel")) }, isInTable: function (a) { return e(this.getRanges(), a) }, isCollapsed: function () { var a = this.getRanges(); return 1 === a.length && a[0].collapsed }, createBookmarks: function (a) {
                a =
                this.getRanges().createBookmarks(a); this.isFake && (a.isFake = 1); return a
            }, createBookmarks2: function (a) { a = this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a }, selectBookmarks: function (a) {
                for (var b = [], d, c = 0; c < a.length; c++) { var g = new CKEDITOR.dom.range(this.root); g.moveToBookmark(a[c]); b.push(g) } a.isFake && (d = e(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), d && d.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0)); a.isFake && !e(b) ? this.fake(d) : this.selectRanges(b);
                return this
            }, getCommonAncestor: function () { var a = this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null }, scrollIntoView: function () { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() }, removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[u ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() } }
        }
    }(), "use strict", CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, function () {
        function a(a,
            b) { for (var d, c; (a = a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle")) d = a; else if (!c) { var g = a.getAttribute("contentEditable"); "false" == g ? d = a : "true" == g && (c = 1) } return d } function e(a, b, d, c) { return (a.getPosition(b) | c) == c && (!d.childRule || d.childRule(a)) } function c(b) {
                var d = b.document; if (b.collapsed) d = x(this, d), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_BEFORE_END); else {
                    var g = this.element, k = this._.definition, h, n = k.ignoreReadonly, l = n || k.includeReadonly; null == l && (l = b.root.getCustomData("cke_includeReadonly"));
                    var m = CKEDITOR.dtd[g]; m || (h = !0, m = CKEDITOR.dtd.span); b.enlarge(CKEDITOR.ENLARGE_INLINE, 1); b.trim(); var p = b.createBookmark(), r = p.startNode, u = p.endNode, t = r, z; if (!n) { var w = b.getCommonAncestor(), n = a(r, w), w = a(u, w); n && (t = n.getNextSourceNode(!0)); w && (u = w) } for (t.getPosition(u) == CKEDITOR.POSITION_FOLLOWING && (t = 0); t;) {
                        n = !1; if (t.equals(u)) t = null, n = !0; else {
                            var q = t.type == CKEDITOR.NODE_ELEMENT ? t.getName() : null, w = q && "false" == t.getAttribute("contentEditable"), L = q && t.getAttribute("data-nostyle"); if (q && t.data("cke-bookmark") ||
                                t.type === CKEDITOR.NODE_COMMENT) { t = t.getNextSourceNode(!0); continue } if (w && l && CKEDITOR.dtd.$block[q]) for (var C = t, A = f(C), y = void 0, B = A.length, ca = 0, C = B && new CKEDITOR.dom.range(C.getDocument()); ca < B; ++ca) { var y = A[ca], H = CKEDITOR.filter.instances[y.data("cke-filter")]; if (H ? H.check(this) : 1) C.selectNodeContents(y), c.call(this, C) } A = q ? !m[q] || L ? 0 : w && !l ? 0 : e(t, u, k, M) : 1; if (A) if (y = t.getParent(), A = k, B = g, ca = h, !y || !(y.getDtd() || CKEDITOR.dtd.span)[B] && !ca || A.parentRule && !A.parentRule(y)) n = !0; else {
                                    if (z || q && CKEDITOR.dtd.$removeEmpty[q] &&
                                        (t.getPosition(u) | M) != M || (z = b.clone(), z.setStartBefore(t)), q = t.type, q == CKEDITOR.NODE_TEXT || w || q == CKEDITOR.NODE_ELEMENT && !t.getChildCount()) { for (var q = t, K; (n = !q.getNext(I)) && (K = q.getParent(), m[K.getName()]) && e(K, r, k, G);)q = K; z.setEndAfter(q) }
                                } else n = !0; t = t.getNextSourceNode(L || w)
                        } if (n && z && !z.collapsed) {
                            for (var n = x(this, d), w = n.hasAttributes(), L = z.getCommonAncestor(), q = {}, A = {}, y = {}, B = {}, F, E, ea; n && L;) {
                                if (L.getName() == g) {
                                    for (F in k.attributes) !B[F] && (ea = L.getAttribute(E)) && (n.getAttribute(F) == ea ? A[F] = 1 :
                                        B[F] = 1); for (E in k.styles) !y[E] && (ea = L.getStyle(E)) && (n.getStyle(E) == ea ? q[E] = 1 : y[E] = 1)
                                } L = L.getParent()
                            } for (F in A) n.removeAttribute(F); for (E in q) n.removeStyle(E); w && !n.hasAttributes() && (n = null); n ? (z.extractContents().appendTo(n), z.insertNode(n), v.call(this, n), n.mergeSiblings(), CKEDITOR.env.ie || n.$.normalize()) : (n = new CKEDITOR.dom.element("span"), z.extractContents().appendTo(n), z.insertNode(n), v.call(this, n), n.remove(!0)); z = null
                        }
                    } b.moveToBookmark(p); b.shrink(CKEDITOR.SHRINK_TEXT); b.shrink(CKEDITOR.NODE_ELEMENT,
                        !0)
                }
            } function b(a) {
                function b() { for (var a = new CKEDITOR.dom.elementPath(c.getParent()), d = new CKEDITOR.dom.elementPath(l.getParent()), g = null, f = null, e = 0; e < a.elements.length; e++) { var k = a.elements[e]; if (k == a.block || k == a.blockLimit) break; m.checkElementRemovable(k, !0) && (g = k) } for (e = 0; e < d.elements.length; e++) { k = d.elements[e]; if (k == d.block || k == d.blockLimit) break; m.checkElementRemovable(k, !0) && (f = k) } f && l.breakParent(f); g && c.breakParent(g) } a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); var d = a.createBookmark(), c = d.startNode,
                    g = this._.definition.alwaysRemoveElement; if (a.collapsed) {
                        for (var f = new CKEDITOR.dom.elementPath(c.getParent(), a.root), e, k = 0, h; k < f.elements.length && (h = f.elements[k]) && h != f.block && h != f.blockLimit; k++)if (this.checkElementRemovable(h)) { var n; !g && a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (n = a.checkBoundaryOfElement(h, CKEDITOR.START))) ? (e = h, e.match = n ? "start" : "end") : (h.mergeSiblings(), h.is(this.element) ? w.call(this, h) : q(h, t(this)[h.getName()])) } if (e) {
                            g = c; for (k = 0; ; k++) {
                                h = f.elements[k]; if (h.equals(e)) break;
                                else if (h.match) continue; else h = h.clone(); h.append(g); g = h
                            } g["start" == e.match ? "insertBefore" : "insertAfter"](e)
                        }
                    } else { var l = d.endNode, m = this; b(); for (f = c; !f.equals(l);)e = f.getNextSourceNode(), f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f) && (f.getName() == this.element ? w.call(this, f) : q(f, t(this)[f.getName()]), e.type == CKEDITOR.NODE_ELEMENT && e.contains(c) && (b(), e = c.getNext())), f = e } a.moveToBookmark(d); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
            } function f(a) {
                var b = []; a.forEach(function (a) {
                    if ("true" ==
                        a.getAttribute("contenteditable")) return b.push(a), !1
                }, CKEDITOR.NODE_ELEMENT, !0); return b
            } function m(a) { var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && r(a, this) } function h(a) {
                var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                    var b = this._.definition, d = b.attributes; if (d) for (var c in d) a.removeAttribute(c, d[c]); if (b.styles) for (var g in b.styles) b.styles.hasOwnProperty(g) &&
                        a.removeStyle(g)
                }
            } function l(a) { var b = a.createBookmark(!0), d = a.createIterator(); d.enforceRealBlocks = !0; this._.enterMode && (d.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var c, g = a.document, f; c = d.getNextParagraph();)!c.isReadOnly() && (d.activeFilter ? d.activeFilter.check(this) : 1) && (f = x(this, g, c), k(c, f)); a.moveToBookmark(b) } function d(a) {
                var b = a.createBookmark(1), d = a.createIterator(); d.enforceRealBlocks = !0; d.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var c, g; c = d.getNextParagraph();)this.checkElementRemovable(c) &&
                    (c.is("pre") ? ((g = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && c.copyAttributes(g), k(c, g)) : w.call(this, c)); a.moveToBookmark(b)
            } function k(a, b) {
                var d = !b; d && (b = a.getDocument().createElement("div"), a.copyAttributes(b)); var c = b && b.is("pre"), f = a.is("pre"), e = !c && f; if (c && !f) {
                    f = b; (e = a.getBogus()) && e.remove(); e = a.getHtml(); e = n(e, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); e = e.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); e = e.replace(/([ \t\n\r]+|&nbsp;)/g,
                        " "); e = e.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) { var k = a.getDocument().createElement("div"); k.append(f); f.$.outerHTML = "\x3cpre\x3e" + e + "\x3c/pre\x3e"; f.copyAttributes(k.getFirst()); f = k.getFirst().remove() } else f.setHtml(e); b = f
                } else e ? b = p(d ? [a.getHtml()] : g(a), b) : a.moveChildren(b); b.replace(a); if (c) {
                    var d = b, h; (h = d.getPrevious(E)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("pre") && (c = n(h.getHtml(), /\n$/, "") + "\n\n" + n(d.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? d.$.outerHTML = "\x3cpre\x3e" + c + "\x3c/pre\x3e" :
                        d.setHtml(c), h.remove())
                } else d && u(b)
            } function g(a) { var b = []; n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, d) { return b + "\x3c/pre\x3e" + d + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, d) { b.push(d) }); return b } function n(a, b, d) { var c = "", g = ""; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, d) { b && (c = b); d && (g = d); return "" }); return c + a.replace(b, d) + g } function p(a, b) {
                var d;
                1 < a.length && (d = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var c = 0; c < a.length; c++) {
                    var g = a[c], g = g.replace(/(\r\n|\r)/g, "\n"), g = n(g, /^[ \t]*\n/, ""), g = n(g, /\n$/, ""), g = n(g, /^[ \t]+|[ \t]+$/g, function (a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }), g = g.replace(/\n/g, "\x3cbr\x3e"), g = g.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }); if (d) {
                        var f = b.clone(); f.setHtml(g);
                        d.append(f)
                    } else b.setHtml(g)
                } return d || b
            } function w(a, b) {
                var d = this._.definition, c = d.attributes, d = d.styles, g = t(this)[a.getName()], f = CKEDITOR.tools.isEmpty(c) && CKEDITOR.tools.isEmpty(d), e; for (e in c) if ("class" != e && !this._.definition.fullMatch || a.getAttribute(e) == y(e, c[e])) b && "data-" == e.slice(0, 5) || (f = a.hasAttribute(e), a.removeAttribute(e)); for (var k in d) this._.definition.fullMatch && a.getStyle(k) != y(k, d[k], !0) || (f = f || !!a.getStyle(k), a.removeStyle(k)); q(a, g, B[a.getName()]); f && (this._.definition.alwaysRemoveElement ?
                    u(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? u(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
            } function v(a) { for (var b = t(this), d = a.getElementsByTag(this.element), c, g = d.count(); 0 <= --g;)c = d.getItem(g), c.isReadOnly() || w.call(this, c, !0); for (var f in b) if (f != this.element) for (d = a.getElementsByTag(f), g = d.count() - 1; 0 <= g; g--)c = d.getItem(g), c.isReadOnly() || q(c, b[f]) } function q(a, b, d) {
                if (b = b && b.attributes) for (var c = 0; c < b.length; c++) {
                    var g = b[c][0],
                    f; if (f = a.getAttribute(g)) { var e = b[c][1]; (null === e || e.test && e.test(f) || "string" == typeof e && f == e) && a.removeAttribute(g) }
                } d || u(a)
            } function u(a, b) {
                if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) { var d = a.getPrevious(E), c = a.getNext(E); !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({ br: 1 }) || a.append("br", 1); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br"); a.remove(!0) } else d = a.getFirst(), c = a.getLast(), a.remove(!0), d && (d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings(),
                    c && !d.equals(c) && c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings())
            } function x(a, b, d) { var c; c = a.element; "*" == c && (c = "span"); c = new CKEDITOR.dom.element(c, b); d && d.copyAttributes(c); c = r(c, a); b.getCustomData("doc_processing_style") && c.hasAttribute("id") ? c.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return c } function r(a, b) {
                var d = b._.definition, c = d.attributes, d = CKEDITOR.style.getStyleText(d); if (c) for (var g in c) a.setAttribute(g, c[g]); d && a.setAttribute("style", d); a.getDocument().removeCustomData("doc_processing_style");
                return a
            } function z(a, b) { for (var d in a) a[d] = a[d].replace(K, function (a, d) { return b[d] }) } function t(a) { if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, d = a._.definition.overrides; if (d) { CKEDITOR.tools.isArray(d) || (d = [d]); for (var c = 0; c < d.length; c++) { var g = d[c], f, e; "string" == typeof g ? f = g.toLowerCase() : (f = g.element ? g.element.toLowerCase() : a.element, e = g.attributes); g = b[f] || (b[f] = {}); if (e) { var g = g.attributes = g.attributes || [], k; for (k in e) g.push([k.toLowerCase(), e[k]]) } } } return b } function y(a,
                b, d) { var c = new CKEDITOR.dom.element("span"); c[d ? "setStyle" : "setAttribute"](a, b); return c[d ? "getStyle" : "getAttribute"](a) } function C(a, b) { function d(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0)); for (var c in a) if (!(c in b) || d(b[c], c) != d(a[c], c) && "inherit" != a[c] && "inherit" != b[c]) return !1; return !0 } function A(a, b, d) {
                    var c = a.getRanges(); b = b ? this.removeFromRange : this.applyToRange;
                    for (var g, f = c.createIterator(); g = f.getNextRange();)b.call(this, g, d); a.selectRanges(c)
                } var B = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, H = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 }, F = /\s*(?:;\s*|$)/, K = /#\((.+?)\)/g, I = CKEDITOR.dom.walker.bookmark(0,
                    1), E = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
                        if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a); var d = a.attributes; d && d.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(d.style)), delete d.style); b && (a = CKEDITOR.tools.clone(a), z(a.attributes, b), z(a.styles, b)); d = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*"; this.type = a.type || (B[d] ? CKEDITOR.STYLE_BLOCK : H[d] ? CKEDITOR.STYLE_OBJECT :
                            CKEDITOR.STYLE_INLINE); "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
                    }; CKEDITOR.style.prototype = {
                        apply: function (a) { if (a instanceof CKEDITOR.dom.document) return A.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); A.call(this, a.getSelection(), 0, a); this._.enterMode = b } }, remove: function (a) {
                            if (a instanceof CKEDITOR.dom.document) return A.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(),
                                a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); A.call(this, a.getSelection(), 1, a); this._.enterMode = b }
                        }, applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? l : this.type == CKEDITOR.STYLE_OBJECT ? m : null; return this.applyToRange(a) }, removeFromRange: function (a) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? d : this.type == CKEDITOR.STYLE_OBJECT ? h : null; return this.removeFromRange(a) }, applyToObject: function (a) {
                            r(a,
                                this)
                        }, checkActive: function (a, b) { switch (this.type) { case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var d = a.elements, c = 0, g; c < d.length; c++)if (g = d[c], this.type != CKEDITOR.STYLE_INLINE || g != a.block && g != a.blockLimit) { if (this.type == CKEDITOR.STYLE_OBJECT) { var f = g.getName(); if (!("string" == typeof this.element ? f == this.element : f in this.element)) continue } if (this.checkElementRemovable(g, !0, b)) return !0 } }return !1 }, checkApplicable: function (a,
                            b, d) { b && b instanceof CKEDITOR.filter && (d = b); if (d && !d.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] }return !0 }, checkElementMatch: function (a, b) {
                                var d = this._.definition; if (!a || !d.ignoreReadonly && a.isReadOnly()) return !1; var c = a.getName(); if ("string" == typeof this.element ? c == this.element : c in this.element) {
                                    if (!b && !a.hasAttributes()) return !0; if (c = d._AC) d = c; else {
                                        var c = {}, g = 0, f = d.attributes;
                                        if (f) for (var e in f) g++, c[e] = f[e]; if (e = CKEDITOR.style.getStyleText(d)) c.style || g++, c.style = e; c._length = g; d = d._AC = c
                                    } if (d._length) { for (var k in d) if ("_length" != k) if (c = a.getAttribute(k) || "", "style" == k ? C(d[k], c) : d[k] == c) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0
                                } return !1
                            }, checkElementRemovable: function (a, b, d) {
                                if (this.checkElementMatch(a, b, d)) return !0; if (b = t(this)[a.getName()]) {
                                    var c; if (!(b = b.attributes)) return !0; for (d = 0; d < b.length; d++)if (c = b[d][0], c = a.getAttribute(c)) {
                                        var g = b[d][1];
                                        if (null === g) return !0; if ("string" == typeof g) { if (c == g) return !0 } else if (g.test(c)) return !0
                                    }
                                } return !1
                            }, buildPreview: function (a) { var b = this._.definition, d = [], c = b.element; "bdo" == c && (c = "span"); var d = ["\x3c", c], g = b.attributes; if (g) for (var f in g) d.push(" ", f, '\x3d"', g[f], '"'); (g = CKEDITOR.style.getStyleText(b)) && d.push(' style\x3d"', g, '"'); d.push("\x3e", a || b.name, "\x3c/", c, "\x3e"); return d.join("") }, getDefinition: function () { return this._.definition }
                    }; CKEDITOR.style.getStyleText = function (a) {
                        var b = a._ST; if (b) return b;
                        var b = a.styles, d = a.attributes && a.attributes.style || "", c = ""; d.length && (d = d.replace(F, ";")); for (var g in b) { var f = b[g], e = (g + ":" + f).replace(F, ";"); "inherit" == f ? c += e : d += e } d.length && (d = CKEDITOR.tools.normalizeCssText(d, !0)); return a._ST = d + c
                    }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.addCustomHandler = function (a) {
                        var b = function (a) { this._ = { definition: a }; this.setup && this.setup(a) }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), { assignedTo: CKEDITOR.STYLE_OBJECT },
                            a, !0); return this.customHandlers[a.type] = b
                    }; var M = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, G = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    }(), CKEDITOR.styleCommand = function (a, e) { this.requiredContent = this.allowedContent = this.style = a; CKEDITOR.tools.extend(this, e, !0) }, CKEDITOR.styleCommand.prototype.exec = function (a) {
        a.focus(); this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON &&
            a.removeStyle(this.style)
    }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function (a, e, c) { CKEDITOR.stylesSet.addExternal(a, e, ""); CKEDITOR.stylesSet.load(a, c) }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function (a, e) {
            var c = this._.styleStateChangeCallbacks; c || (c = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function (a) {
                for (var f = 0; f <
                    c.length; f++) { var e = c[f], h = e.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; e.fn.call(this, h) }
            })); c.push({ style: a, fn: e })
        }, applyStyle: function (a) { a.apply(this) }, removeStyle: function (a) { a.remove(this) }, getStylesSet: function (a) {
            if (this._.stylesDefinitions) a(this._.stylesDefinitions); else {
                var e = this, c = e.config.stylesCombo_stylesSet || e.config.stylesSet; if (!1 === c) a(null); else if (c instanceof Array) e._.stylesDefinitions = c, a(c); else {
                    c || (c = "default"); var c = c.split(":"), b = c[0];
                    CKEDITOR.stylesSet.addExternal(b, c[1] ? c.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(b, function (c) { e._.stylesDefinitions = c[b]; a(e._.stylesDefinitions) })
                }
            }
        }
    }), function () {
        if (window.Promise) CKEDITOR.tools.promise = Promise; else {
            var a = CKEDITOR.getUrl("vendor/promise.js"); if ("function" === typeof window.define && window.define.amd && "function" === typeof window.require) return window.require([a], function (a) { CKEDITOR.tools.promise = a }); CKEDITOR.scriptLoader.load(a, function (e) {
                if (!e) return CKEDITOR.error("no-vendor-lib",
                    { path: a }); if ("undefined" !== typeof window.ES6Promise) return CKEDITOR.tools.promise = ES6Promise
            })
        }
    }(), CKEDITOR.dom.comment = function (a, e) { "string" == typeof a && (a = (e ? e.$ : document).createComment(a)); CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "\x3c!--" + this.$.nodeValue + "--\x3e" } }), "use strict", function () {
        var a = {}, e = {}, c; for (c in CKEDITOR.dtd.$blockLimit) c in
            CKEDITOR.dtd.$list || (a[c] = 1); for (c in CKEDITOR.dtd.$block) c in CKEDITOR.dtd.$blockLimit || c in CKEDITOR.dtd.$empty || (e[c] = 1); CKEDITOR.dom.elementPath = function (b, c) {
                var m = null, h = null, l = [], d = b, k; c = c || b.getDocument().getBody(); d || (d = c); do if (d.type == CKEDITOR.NODE_ELEMENT) {
                    l.push(d); if (!this.lastElement && (this.lastElement = d, d.is(CKEDITOR.dtd.$object) || "false" == d.getAttribute("contenteditable"))) continue; if (d.equals(c)) break; if (!h && (k = d.getName(), "true" == d.getAttribute("contenteditable") ? h = d : !m && e[k] &&
                        (m = d), a[k])) { if (k = !m && "div" == k) { a: { k = d.getChildren(); for (var g = 0, n = k.count(); g < n; g++) { var p = k.getItem(g); if (p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) { k = !0; break a } } k = !1 } k = !k } k ? m = d : h = d }
                } while (d = d.getParent()); h || (h = c); this.block = m; this.blockLimit = h; this.root = c; this.elements = l
            }
    }(), CKEDITOR.dom.elementPath.prototype = {
        compare: function (a) { var e = this.elements; a = a && a.elements; if (!a || e.length != a.length) return !1; for (var c = 0; c < e.length; c++)if (!e[c].equals(a[c])) return !1; return !0 }, contains: function (a,
            e, c) { var b = 0, f; "string" == typeof a && (f = function (b) { return b.getName() == a }); a instanceof CKEDITOR.dom.element ? f = function (b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? f = function (b) { return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? f = a : "object" == typeof a && (f = function (b) { return b.getName() in a }); var m = this.elements, h = m.length; e && (c ? b += 1 : --h); c && (m = Array.prototype.slice.call(m, 0), m.reverse()); for (; b < h; b++)if (f(m[b])) return m[b]; return null }, isContextFor: function (a) {
                var e; return a in
                    CKEDITOR.dtd.$block ? (e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!e.getDtd()[a]) : !0
            }, direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
    }, CKEDITOR.dom.text = function (a, e) { "string" == typeof a && (a = (e ? e.$ : document).createTextNode(a)); this.$ = a }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length },
        getText: function () { return this.$.nodeValue }, setText: function (a) { this.$.nodeValue = a }, isEmpty: function (a) { var e = this.getText(); a && (e = CKEDITOR.tools.trim(e)); return !e || e === CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE }, split: function (a) { var e = this.$.parentNode, c = e.childNodes.length, b = this.getLength(), f = this.getDocument(), m = new CKEDITOR.dom.text(this.$.splitText(a), f); e.childNodes.length == c && (a >= b ? (m = f.createText(""), m.insertAfter(this)) : (a = f.createText(""), a.insertAfter(m), a.remove())); return m }, substring: function (a,
            e) { return "number" != typeof e ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, e) }
    }), function () {
        function a(a, b, f) {
            var e = a.serializable, h = b[f ? "endContainer" : "startContainer"], l = f ? "endOffset" : "startOffset", d = e ? b.document.getById(a.startNode) : a.startNode; a = e ? b.document.getById(a.endNode) : a.endNode; h.equals(d.getPrevious()) ? (b.startOffset = b.startOffset - h.getLength() - a.getPrevious().getLength(), h = a.getNext()) : h.equals(a.getPrevious()) && (b.startOffset -= h.getLength(), h = a.getNext()); h.equals(d.getParent()) &&
                b[l]++; h.equals(a.getParent()) && b[l]++; b[f ? "endContainer" : "startContainer"] = h; return b
        } CKEDITOR.dom.rangeList = function (a) { if (a instanceof CKEDITOR.dom.rangeList) return a; a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, e) }; var e = {
            createIterator: function () {
                var a = this, b = CKEDITOR.dom.walker.bookmark(), f = [], e; return {
                    getNextRange: function (h) {
                        e = void 0 === e ? 0 : e + 1; var l = a[e]; if (l && 1 < a.length) {
                            if (!e) for (var d = a.length - 1; 0 <= d; d--)f.unshift(a[d].createBookmark(!0)); if (h) for (var k =
                                0; a[e + k + 1];) { var g = l.document; h = 0; d = g.getById(f[k].endNode); for (g = g.getById(f[k + 1].startNode); ;) { d = d.getNextSourceNode(!1); if (g.equals(d)) h = 1; else if (b(d) || d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) continue; break } if (!h) break; k++ } for (l.moveToBookmark(f.shift()); k--;)d = a[++e], d.moveToBookmark(f.shift()), l.setEnd(d.endContainer, d.endOffset)
                        } return l
                    }
                }
            }, createBookmarks: function (c) {
                for (var b = [], f, e = 0; e < this.length; e++) {
                    b.push(f = this[e].createBookmark(c, !0)); for (var h = e + 1; h < this.length; h++)this[h] =
                        a(f, this[h]), this[h] = a(f, this[h], !0)
                } return b
            }, createBookmarks2: function (a) { for (var b = [], f = 0; f < this.length; f++)b.push(this[f].createBookmark2(a)); return b }, moveToBookmarks: function (a) { for (var b = 0; b < this.length; b++)this[b].moveToBookmark(a[b]) }
        }
    }(), function () {
        function a() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") } function e(b) {
            var d = CKEDITOR.skin["ua_" + b], c = CKEDITOR.env; if (d) for (var d = d.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), f = 0,
                e; f < d.length; f++)if (e = d[f], c.ie && (e.replace(/^ie/, "") == c.version || c.quirks && "iequirks" == e) && (e = "ie"), c[e]) { b += "_" + d[f]; break } return CKEDITOR.getUrl(a() + b + ".css")
        } function c(a, b) { m[a] || (CKEDITOR.document.appendStyleSheet(e(a)), m[a] = 1); b && b() } function b(a) { var b = a.getById(h); b || (b = a.getHead().append("style"), b.setAttribute("id", h), b.setAttribute("type", "text/css")); return b } function f(a, b, d) {
            var c, f, e; if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), f = 0; f < b.length; f++)b[f] = b[f].split("{"); for (var h =
                0; h < a.length; h++)if (CKEDITOR.env.webkit) for (f = 0; f < b.length; f++) { e = b[f][1]; for (c = 0; c < d.length; c++)e = e.replace(d[c][0], d[c][1]); a[h].$.sheet.addRule(b[f][0], e) } else { e = b; for (c = 0; c < d.length; c++)e = e.replace(d[c][0], d[c][1]); CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[h].$.styleSheet.cssText += e : a[h].$.innerHTML += e }
        } var m = {}; CKEDITOR.skin = {
            path: a, loadPart: function (b, d) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () { c(b, d) }) : c(b, d) },
            getPath: function (a) { return CKEDITOR.getUrl(e(a)) }, icons: {}, addIcon: function (a, b, d, c) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: d || 0, bgsize: c || "16px" }) }, getIconStyle: function (a, b, d, c, f) { var e; a && (a = a.toLowerCase(), b && (e = this.icons[a + "-rtl"]), e || (e = this.icons[a])); a = d || e && e.path || ""; c = c || e && e.offset; f = f || e && e.bgsize || "16px"; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + c + "px;background-size:" + f + ";" }
        }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
            { getUiColor: function () { return this.uiColor }, setUiColor: function (a) { var c = b(CKEDITOR.document); return (this.setUiColor = function (a) { this.uiColor = a; var b = CKEDITOR.skin.chameleon, e = "", k = ""; "function" == typeof b && (e = b(this, "editor"), k = b(this, "panel")); a = [[d, a]]; f([c], e, a); f(l, k, a) }).call(this, a) } }); var h = "cke_ui_color", l = [], d = /\$color/g; CKEDITOR.on("instanceLoaded", function (a) {
                if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                    var c = a.editor; a = function (a) {
                        a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                        if (!a.getById("cke_ui_color")) { var e = b(a); l.push(e); c.on("destroy", function () { l = CKEDITOR.tools.array.filter(l, function (a) { return e !== a }) }); (a = c.getUiColor()) && f([e], CKEDITOR.skin.chameleon(c, "panel"), [[d, a]]) }
                    }; c.on("panelShow", a); c.on("menuShow", a); c.config.uiColor && c.setUiColor(c.config.uiColor)
                }
            })
    }(), function () {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else {
            var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e',
                CKEDITOR.document); a.appendTo(CKEDITOR.document.getHead()); try { var e = a.getComputedStyle("border-top-color"), c = a.getComputedStyle("border-right-color"); CKEDITOR.env.hc = !(!e || e != c) } catch (b) { CKEDITOR.env.hc = !1 } a.remove()
        } CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"); CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"); CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (a = CKEDITOR._.pending) for (delete CKEDITOR._.pending, e = 0; e < a.length; e++)CKEDITOR.editor.prototype.constructor.apply(a[e][0],
            a[e][1]), CKEDITOR.add(a[e][0])
    }(), CKEDITOR.skin.name = "moono-lisa", CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8", CKEDITOR.skin.chameleon = function () {
        var a = function () { return function (a, b) { for (var f = a.match(/[^#]./g), e = 0; 3 > e; e++) { var h = e, l; l = parseInt(f[e], 16); l = ("0" + (0 > b ? 0 | l * (1 + b) : 0 | l + (255 - l) * b).toString(16)).slice(-2); f[h] = l } return "#" + f.join("") } }(), e = {
            editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
            panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
        return function (c, b) { var f = a(c.uiColor, .4), f = { id: "." + c.id, defaultBorder: a(f, -.2), toolbarElementsBorder: a(f, -.25), defaultBackground: f, lightBackground: a(f, .8), darkBackground: a(f, -.15), ckeButtonOn: a(f, .4), ckeResizer: a(f, -.4), ckeColorauto: a(f, .8), dialogBody: a(f, .7), dialogTab: a(f, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: a(f, -.6), menubuttonHover: a(f, .1), menubuttonIcon: a(f, .5), menubuttonIconHover: a(f, .3) }; return e[b].output(f).replace(/\[/g, "{").replace(/\]/g, "}") }
    }(),
    CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var a = function (a) { this._ || (this._ = {}); this._["default"] = this._.initValue = a["default"] || ""; this._.required = a.required || !1; for (var b = [this._], c = 1; c < arguments.length; c++)b.push(arguments[c]); b.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, b); return this._ }, e = { build: function (a, b, c) { return new CKEDITOR.ui.dialog.textInput(a, b, c) } }, c = { build: function (a, b, c) { return new CKEDITOR.ui.dialog[b.type](a, b, c) } }, b = {
                isChanged: function () {
                    return this.getValue() !=
                        this.getInitValue()
                }, reset: function (a) { this.setValue(this.getInitValue(), a) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
            }, f = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (a, b) {
                    this._.domOnChangeRegistered || (a.on("load", function () {
                        this.getInputElement().on("change", function () { a.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                            this)
                    }, this), this._.domOnChangeRegistered = !0); this.on("change", b)
                }
            }, !0), m = /^on([A-Z]\w+)/, h = function (a) { for (var b in a) (m.test(b) || "title" == b || "type" == b) && delete a[b]; return a }, l = function (a) { a = a.data.getKeystroke(); a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (b, c, g, f) {
                    if (!(4 > arguments.length)) {
                        var e = a.call(this, c); e.labelId = CKEDITOR.tools.getNextId() +
                            "_label"; this._.children = []; var h = { role: c.role || "presentation" }; c.includeLabel && (h["aria-labelledby"] = e.labelId); CKEDITOR.ui.dialog.uiElement.call(this, b, c, g, "div", null, h, function () {
                                var a = [], g = c.required ? " cke_required" : ""; "horizontal" != c.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + e.labelId + '"', e.inputId ? ' for\x3d"' + e.inputId + '"' : "", (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", c.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                    c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, c), "\x3c/div\x3e") : (g = {
                                        type: "hbox", widths: c.widths, padding: 0, children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + e.labelId + '" for\x3d"' + e.inputId + '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/label\x3e" }, {
                                            type: "html", html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style\x3d"' + c.controlStyle +
                                                '"' : "") + "\x3e" + f.call(this, b, c) + "\x3c/span\x3e"
                                        }]
                                    }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, a)); return a.join("")
                            })
                    }
                }, textInput: function (b, c, g) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c); var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", e = { "class": "cke_dialog_ui_input_" + c.type, id: f, type: c.type }; c.validate && (this.validate = c.validate); c.maxLength && (e.maxlength = c.maxLength); c.size && (e.size = c.size); c.inputStyle && (e.style = c.inputStyle); var h = this, m = !1; b.on("load", function () {
                            h.getInputElement().on("keydown",
                                function (a) { 13 == a.data.getKeystroke() && (m = !0) }); h.getInputElement().on("keyup", function (a) { 13 == a.data.getKeystroke() && m && (b.getButton("ok") && setTimeout(function () { b.getButton("ok").click() }, 0), m = !1); h.bidi && l.call(h, a) }, null, null, 1E3)
                        }); CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () {
                            var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"']; c.width && a.push('style\x3d"width:' + c.width + '" '); a.push("\x3e\x3cinput "); e["aria-labelledby"] = this._.labelId; this._.required &&
                                (e["aria-required"] = this._.required); for (var b in e) a.push(b + '\x3d"' + e[b] + '" '); a.push(" /\x3e\x3c/div\x3e"); return a.join("")
                        })
                    }
                }, textarea: function (b, c, g) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c); var f = this, e = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", h = {}; c.validate && (this.validate = c.validate); h.rows = c.rows || 5; h.cols = c.cols || 20; h["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || ""); "undefined" != typeof c.inputStyle && (h.style = c.inputStyle); c.dir && (h.dir = c.dir); if (f.bidi) b.on("load",
                            function () { f.getInputElement().on("keyup", l) }, f); CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () { h["aria-labelledby"] = this._.labelId; this._.required && (h["aria-required"] = this._.required); var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', e, '" '], b; for (b in h) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(h[b]) + '" '); a.push("\x3e", CKEDITOR.tools.htmlEncode(f._["default"]), "\x3c/textarea\x3e\x3c/div\x3e"); return a.join("") })
                    }
                }, checkbox: function (b,
                    c, g) {
                        if (!(3 > arguments.length)) {
                            var f = a.call(this, c, { "default": !!c["default"] }); c.validate && (this.validate = c.validate); CKEDITOR.ui.dialog.uiElement.call(this, b, c, g, "span", null, null, function () {
                                var a = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0), g = [], e = CKEDITOR.tools.getNextId() + "_label", l = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": e }; h(a); c["default"] && (l.checked = "checked"); "undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
                                f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, g, "input", null, l); g.push(' \x3clabel id\x3d"', e, '" for\x3d"', l.id, '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(c.label), "\x3c/label\x3e"); return g.join("")
                            })
                        }
                }, radio: function (b, c, g) {
                    if (!(3 > arguments.length)) {
                        a.call(this, c); this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]); c.validate && (this.validate = c.validate); var f = [], e = this; c.role = "radiogroup"; c.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this,
                            b, c, g, function () {
                                for (var a = [], g = [], l = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", m = 0; m < c.items.length; m++) {
                                    var x = c.items[m], r = void 0 !== x[2] ? x[2] : x[0], z = void 0 !== x[1] ? x[1] : x[0], t = CKEDITOR.tools.getNextId() + "_radio_input", y = t + "_label", t = CKEDITOR.tools.extend({}, c, { id: t, title: null, type: null }, !0), r = CKEDITOR.tools.extend({}, t, { title: r }, !0), C = { type: "radio", "class": "cke_dialog_ui_radio_input", name: l, value: z, "aria-labelledby": y }, A = []; e._["default"] == z && (C.checked = "checked"); h(t); h(r); "undefined" != typeof t.inputStyle &&
                                        (t.style = t.inputStyle); t.keyboardFocusable = !0; f.push(new CKEDITOR.ui.dialog.uiElement(b, t, A, "input", null, C)); A.push(" "); new CKEDITOR.ui.dialog.uiElement(b, r, A, "label", null, { id: y, "for": C.id }, x[0]); a.push(A.join(""))
                                } new CKEDITOR.ui.dialog.hbox(b, f, a, g); return g.join("")
                            }); this._.children = f
                    }
                }, button: function (b, c, g) {
                    if (arguments.length) {
                    "function" == typeof c && (c = c(b.getParentEditor())); a.call(this, c, { disabled: c.disabled || !1 }); CKEDITOR.event.implementOn(this); var f = this; b.on("load", function () {
                        var a = this.getElement();
                        (function () { a.on("click", function (a) { f.click(); a.data.preventDefault() }); a.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1 } && (f.click(), a.data.preventDefault()) }) })(); a.unselectable()
                    }, this); var e = CKEDITOR.tools.extend({}, c); delete e.style; var h = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, b, e, g, "a", null, { style: c.style, href: "javascript:void(0)", title: c.label, hidefocus: "true", "class": c["class"], role: "button", "aria-labelledby": h }, '\x3cspan id\x3d"' + h + '" class\x3d"cke_dialog_ui_button"\x3e' +
                        CKEDITOR.tools.htmlEncode(c.label) + "\x3c/span\x3e")
                    }
                }, select: function (b, c, g) {
                    if (!(3 > arguments.length)) {
                        var f = a.call(this, c); c.validate && (this.validate = c.validate); f.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () {
                            var a = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0), g = [], e = [], l = { id: f.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId }; g.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                c.type, '" role\x3d"presentation"'); c.width && g.push('style\x3d"width:' + c.width + '" '); g.push("\x3e"); void 0 !== c.size && (l.size = c.size); void 0 !== c.multiple && (l.multiple = c.multiple); h(a); for (var m = 0, x; m < c.items.length && (x = c.items[m]); m++)e.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== x[1] ? x[1] : x[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(x[0])); "undefined" != typeof a.inputStyle && (a.style = a.inputStyle); f.select = new CKEDITOR.ui.dialog.uiElement(b, a, g, "select", null,
                                    l, e.join("")); g.push("\x3c/div\x3e"); return g.join("")
                        })
                    }
                }, file: function (b, c, g) {
                    if (!(3 > arguments.length)) {
                    void 0 === c["default"] && (c["default"] = ""); var f = CKEDITOR.tools.extend(a.call(this, c), { definition: c, buttons: [] }); c.validate && (this.validate = c.validate); b.on("load", function () { CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () {
                    f.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                        f.frameId, '" title\x3d"', c.label, '" src\x3d"javascript:void(']; a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); a.push(')"\x3e\x3c/iframe\x3e'); return a.join("")
                    })
                    }
                }, fileButton: function (b, c, g) {
                    var f = this; if (!(3 > arguments.length)) {
                        a.call(this, c); c.validate && (this.validate = c.validate); var e = CKEDITOR.tools.extend({}, c), h = e.onClick; e.className = (e.className ? e.className + " " : "") + "cke_dialog_ui_button"; e.onClick = function (a) {
                            var g =
                                c["for"]; a = h ? h.call(this, a) : !1; !1 !== a && ("xhr" !== a && b.getContentElement(g[0], g[1]).submit(), this.disable())
                        }; b.on("load", function () { b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(f) }); CKEDITOR.ui.dialog.button.call(this, b, e, g)
                    }
                }, html: function () {
                    var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/; return function (f, e, h) {
                        if (!(3 > arguments.length)) {
                            var l = [], m = e.html; "\x3c" != m.charAt(0) && (m = "\x3cspan\x3e" + m + "\x3c/span\x3e"); var u = e.focus; if (u) {
                                var x = this.focus;
                                this.focus = function () { ("function" == typeof u ? u : x).call(this); this.fire("focus") }; e.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0
                            } CKEDITOR.ui.dialog.uiElement.call(this, f, e, l, "span", null, null, ""); l = l.join("").match(a); m = m.match(b) || ["", "", ""]; c.test(m[1]) && (m[1] = m[1].slice(0, -1), m[2] = "/" + m[2]); h.push([m[1], " ", l[1] || "", m[2]].join(""))
                        }
                    }
                }(), fieldset: function (a, b, c, f, e) {
                    var h = e.label; this._ = { children: b }; CKEDITOR.ui.dialog.uiElement.call(this, a, e, f, "fieldset", null, null, function () {
                        var a =
                            []; h && a.push("\x3clegend" + (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e" + h + "\x3c/legend\x3e"); for (var b = 0; b < c.length; b++)a.push(c[b]); return a.join("")
                    })
                }
            }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (a) {
                    var b = CKEDITOR.document.getById(this._.labelId); 1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue =
                        a; return this
                }, getLabel: function () { var a = CKEDITOR.document.getById(this._.labelId); return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText() }, eventProcessors: f
            }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) }, enable: function () { this._.disabled = !1; var a = this.getElement(); a && a.removeClass("cke_disabled") }, disable: function () { this._.disabled = !0; this.getElement().addClass("cke_disabled") },
                isVisible: function () { return this.getElement().getFirst().isVisible() }, isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (a, b) { this.on("click", function () { b.apply(this, arguments) }) } }, !0), accessKeyUp: function () { this.click() }, accessKeyDown: function () { this.focus() }, keyboardFocusable: !0
            }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) },
                focus: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && b.$.focus() }, 0) }, select: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && (b.$.focus(), b.$.select()) }, 0) }, accessKeyUp: function () { this.select() }, setValue: function (a) { if (this.bidi) { var b = a && a.charAt(0); (b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1)); this.setDirectionMarker(b) } a || (a = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
                getValue: function () { var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && a) { var b = this.getDirectionMarker(); b && (a = ("ltr" == b ? "‪" : "‫") + a) } return a }, setDirectionMarker: function (a) { var b = this.getInputElement(); a ? b.setAttributes({ dir: a, "data-cke-dir-marker": a }) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"]) }, getDirectionMarker: function () { return this.getInputElement().data("cke-dir-marker") }, keyboardFocusable: !0
            }, b, !0); CKEDITOR.ui.dialog.textarea.prototype =
                new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function () { return this._.select.getElement() }, add: function (a, b, c) { var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), e = this.getInputElement().$; f.$.text = a; f.$.value = void 0 === b || null === b ? a : b; void 0 === c || null === c ? CKEDITOR.env.ie ? e.add(f.$) : e.add(f.$, null) : e.add(f.$, c); return this }, remove: function (a) {
                        this.getInputElement().$.remove(a);
                        return this
                    }, clear: function () { for (var a = this.getInputElement().$; 0 < a.length;)a.remove(0); return this }, keyboardFocusable: !0
                }, b, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getInputElement: function () { return this._.checkbox.getElement() }, setValue: function (a, b) { this.getInputElement().$.checked = a; !b && this.fire("change", { value: a }) }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                        onChange: function (a,
                            b) { if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return f.onChange.apply(this, arguments); a.on("load", function () { var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) }, this) }, this); this.on("change", b); return null }
                    }, keyboardFocusable: !0
                }, b, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setValue: function (a, b) {
                        for (var c = this._.children, f, e = 0; e < c.length && (f = c[e]); e++)f.getElement().$.checked =
                            f.getValue() == a; !b && this.fire("change", { value: a })
                    }, getValue: function () { for (var a = this._.children, b = 0; b < a.length; b++)if (a[b].getElement().$.checked) return a[b].getValue(); return null }, accessKeyUp: function () { var a = this._.children, b; for (b = 0; b < a.length; b++)if (a[b].getElement().$.checked) { a[b].getElement().focus(); return } a[0].getElement().focus() }, eventProcessors: {
                        onChange: function (a, b) {
                            if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return f.onChange.apply(this, arguments); a.on("load", function () {
                                for (var a =
                                    this._.children, b = this, d = 0; d < a.length; d++)a[d].getElement().on("propertychange", function (a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                            }, this); this.on("change", b); return null
                        }
                    }
                }, b, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, b, {
                    getInputElement: function () {
                        var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) :
                            this.getElement()
                    }, submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, f = function (a, b, d, c) { a.on("formLoaded", function () { a.getInputElement().on(d, c, a) }) }, e; for (e in a) if (c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : f(this, this._.dialog, c[1].toLowerCase(), a[e]); return this }, reset: function () {
                        function a() {
                            c.$.open();
                            var d = ""; f.size && (d = f.size - (CKEDITOR.env.ie ? 7 : 0)); var r = b.frameId + "_input"; c.$.write(['\x3chtml dir\x3d"' + m + '" lang\x3d"' + u + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + m + '" lang\x3d"' + u + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', r, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
                                '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', r, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < d ? d : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + h + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + l + ")}", "\x3c/script\x3e"].join(""));
                            c.$.close(); for (d = 0; d < e.length; d++)e[d].enable()
                        } var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), f = b.definition, e = b.buttons, h = this.formLoadedNumber, l = this.formUnloadNumber, m = b.dialog._.editor.lang.dir, u = b.dialog._.editor.langCode; h || (h = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this), l = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function () {
                            CKEDITOR.tools.removeFunction(h);
                            CKEDITOR.tools.removeFunction(l)
                        })); CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                    }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () { this._.initValue = "" }, eventProcessors: { onChange: function (a, b) { this._.domOnChangeRegistered || (this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on("change", b) } }, keyboardFocusable: !0
                }, !0); CKEDITOR.ui.dialog.fileButton.prototype =
                    new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", e); CKEDITOR.dialog.addUIElement("password", e); CKEDITOR.dialog.addUIElement("tel", e); CKEDITOR.dialog.addUIElement("textarea", c); CKEDITOR.dialog.addUIElement("checkbox", c); CKEDITOR.dialog.addUIElement("radio", c); CKEDITOR.dialog.addUIElement("button", c); CKEDITOR.dialog.addUIElement("select", c); CKEDITOR.dialog.addUIElement("file", c); CKEDITOR.dialog.addUIElement("fileButton",
                        c); CKEDITOR.dialog.addUIElement("html", c); CKEDITOR.dialog.addUIElement("fieldset", { build: function (a, b, c) { for (var f = b.children, e, h = [], l = [], m = 0; m < f.length && (e = f[m]); m++) { var u = []; h.push(u); l.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, u)) } return new CKEDITOR.ui.dialog[b.type](a, l, h, c, b) } })
        }
    }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, CKEDITOR.DIALOG_STATE_IDLE = 1, CKEDITOR.DIALOG_STATE_BUSY = 2, function () {
        function a() {
            for (var a =
                this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, d = b - 1; d > b - a; d--)if (this._.tabs[this._.tabIdList[d % a]][0].$.offsetHeight) return this._.tabIdList[d % a]; return null
        } function e() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), d = b + 1; d < b + a; d++)if (this._.tabs[this._.tabIdList[d % a]][0].$.offsetHeight) return this._.tabIdList[d % a]; return null } function c(a, b) {
            for (var d = a.$.getElementsByTagName("input"), c = 0, g = d.length; c <
                g; c++) { var f = new CKEDITOR.dom.element(d[c]); "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", ""))) }
        } function b(a, b) { var d = this.getInputElement(); d && (a ? d.removeAttribute("aria-invalid") : d.setAttribute("aria-invalid", !0)); a || (this.select ? this.select() : this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b }) } function f() {
            var a =
                this.getInputElement(); a && a.removeAttribute("aria-invalid")
        } function m(a) {
            var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", q).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })), d = b.getChild([0, 0, 0, 0, 0]), c = d.getChild(0), g = d.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(d);
            !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(d.getParent())); c.unselectable(); g.unselectable(); return {
                element: b, parts: {
                    dialog: b.getChild(0), title: c, close: g, tabs: d.getChild(2), contents: d.getChild([3, 0, 0, 0]),
                    footer: d.getChild([3, 0, 1, 0])
                }
            }
        } function h(a, b, d) { this.element = b; this.focusIndex = d; this.tabIndex = 0; this.isFocusable = function () { return !b.getAttribute("disabled") && b.isVisible() }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") }); b.on("blur", function () { this.fire("mouseout") }) } function l(a) {
            function b() { a.layout() } var d = CKEDITOR.document.getWindow();
            d.on("resize", b); a.on("hide", function () { d.removeListener("resize", b) })
        } function d(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function k(a) {
            function b(d) { var k = a.getSize(), l = CKEDITOR.document.getWindow().getViewPaneSize(), n = d.data.$.screenX, m = d.data.$.screenY, r = n - c.x, t = m - c.y; c = { x: n, y: m }; g.x += r; g.y += t; a.move(g.x + h[3] < e ? -h[3] : g.x - h[1] > l.width - k.width - e ? l.width - k.width + ("rtl" == f.lang.dir ? 0 : h[1]) : g.x, g.y + h[0] < e ? -h[0] : g.y - h[2] > l.height - k.height - e ? l.height - k.height + h[2] : g.y, 1); d.data.preventDefault() }
            function d() { CKEDITOR.document.removeListener("mousemove", b); CKEDITOR.document.removeListener("mouseup", d); if (CKEDITOR.env.ie6Compat) { var a = A.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", d) } } var c = null, g = null, f = a.getParentEditor(), e = f.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [0, 0, 0, 0]; "undefined" == typeof e && (e = 20); a.parts.title.on("mousedown", function (f) {
                c = { x: f.data.$.screenX, y: f.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup",
                    d); g = a.getPosition(); if (CKEDITOR.env.ie6Compat) { var e = A.getChild(0).getFrameDocument(); e.on("mousemove", b); e.on("mouseup", d) } f.data.preventDefault()
            }, a)
        } function g(a) {
            function b(d) {
                var m = "rtl" == f.lang.dir, r = n.width, t = n.height, p = r + (d.data.$.screenX - l.x) * (m ? -1 : 1) * (a._.moved ? 1 : 2), u = t + (d.data.$.screenY - l.y) * (a._.moved ? 1 : 2), x = a._.element.getFirst(), x = m && x.getComputedStyle("right"), z = a.getPosition(); z.y + u > k.height && (u = k.height - z.y); (m ? x : z.x) + p > k.width && (p = k.width - (m ? x : z.x)); if (g == CKEDITOR.DIALOG_RESIZE_WIDTH ||
                    g == CKEDITOR.DIALOG_RESIZE_BOTH) r = Math.max(c.minWidth || 0, p - e); if (g == CKEDITOR.DIALOG_RESIZE_HEIGHT || g == CKEDITOR.DIALOG_RESIZE_BOTH) t = Math.max(c.minHeight || 0, u - h); a.resize(r, t); a._.moved || a.layout(); d.data.preventDefault()
            } function d() { CKEDITOR.document.removeListener("mouseup", d); CKEDITOR.document.removeListener("mousemove", b); m && (m.remove(), m = null); if (CKEDITOR.env.ie6Compat) { var a = A.getChild(0).getFrameDocument(); a.removeListener("mouseup", d); a.removeListener("mousemove", b) } } var c = a.definition, g = c.resizable;
            if (g != CKEDITOR.DIALOG_RESIZE_NONE) {
                var f = a.getParentEditor(), e, h, k, l, n, m, r = CKEDITOR.tools.addFunction(function (c) {
                    n = a.getSize(); var g = a.parts.contents; g.$.getElementsByTagName("iframe").length && (m = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), g.append(m)); h = n.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks)); e = n.width - a.parts.contents.getSize("width",
                        1); l = { x: c.screenX, y: c.screenY }; k = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", d); CKEDITOR.env.ie6Compat && (g = A.getChild(0).getFrameDocument(), g.on("mousemove", b), g.on("mouseup", d)); c.preventDefault && c.preventDefault()
                }); a.on("load", function () {
                    var b = ""; g == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : g == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
                        b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + r + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e"); a.parts.footer.append(b, 1)
                }); f.on("destroy", function () { CKEDITOR.tools.removeFunction(r) })
            }
        } function n(a) { a.data.preventDefault(1) } function p(a) {
            var b = CKEDITOR.document.getWindow(), d = a.config, c = CKEDITOR.skinName || a.config.skin, g = d.dialog_backgroundCoverColor || ("moono-lisa" == c ? "black" : "white"), c = d.dialog_backgroundCoverOpacity,
            f = d.baseFloatZIndex, d = CKEDITOR.tools.genKey(g, c, f), e = C[d]; e ? e.show() : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + g, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (g = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + g + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),
                f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + g + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), e = CKEDITOR.dom.element.createFromHtml(f.join("")), e.setOpacity(void 0 !== c ? c : .5), e.on("keydown", n), e.on("keypress", n), e.on("keyup", n), e.appendTo(CKEDITOR.document.getBody()),
                C[d] = e); a.focusManager.add(e); A = e; a = function () { var a = b.getViewPaneSize(); e.setStyles({ width: a.width + "px", height: a.height + "px" }) }; var h = function () { var a = b.getScrollPosition(), d = CKEDITOR.dialog._.currentTop; e.setStyles({ left: a.x + "px", top: a.y + "px" }); if (d) { do a = d.getPosition(), d.move(a.x, a.y); while (d = d._.parentDialog) } }; y = a; b.on("resize", a); a(); CKEDITOR.env.mac && CKEDITOR.env.webkit || e.focus(); if (CKEDITOR.env.ie6Compat) {
                    var k = function () { h(); k.prevScrollHandler.apply(this, arguments) }; b.$.setTimeout(function () {
                    k.prevScrollHandler =
                        window.onscroll || function () { }; window.onscroll = k
                    }, 0); h()
                }
        } function w(a) { A && (a.focusManager.remove(A), a = CKEDITOR.document.getWindow(), A.hide(), A = null, a.removeListener("resize", y), CKEDITOR.env.ie6Compat && a.$.setTimeout(function () { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0), y = null) } var v = CKEDITOR.tools.cssLength, q = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
            CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
        CKEDITOR.dialog = function (d, c) {
            function h() { var a = y._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, d = 0; d < b; d++)a[d].focusIndex = d } function l(a) {
                var b = y._.focusList; a = a || 0; if (!(1 > b.length)) {
                    var d = y._.currentFocusIndex; y._.tabBarMode && 0 > a && (d = 0); try { b[d].getInputElement().$.blur() } catch (c) { } var g = d, f = 1 < y._.pageCount; do {
                        g += a; if (f && !y._.tabBarMode && (g == b.length || -1 == g)) {
                            y._.tabBarMode = !0; y._.tabs[y._.currentTabId][0].focus();
                            y._.currentFocusIndex = -1; return
                        } g = (g + b.length) % b.length; if (g == d) break
                    } while (a && !b[g].isFocusable()); b[g].focus(); "text" == b[g].type && b[g].select()
                }
            } function n(b) {
                if (y == CKEDITOR.dialog._.currentTop) {
                    var c = b.data.getKeystroke(), g = "rtl" == d.lang.dir, f = [37, 38, 39, 40]; w = q = 0; if (9 == c || c == CKEDITOR.SHIFT + 9) l(c == CKEDITOR.SHIFT + 9 ? -1 : 1), w = 1; else if (c == CKEDITOR.ALT + 121 && !y._.tabBarMode && 1 < y.getPageCount()) y._.tabBarMode = !0, y._.tabs[y._.currentTabId][0].focus(), y._.currentFocusIndex = -1, w = 1; else if (-1 != CKEDITOR.tools.indexOf(f,
                        c) && y._.tabBarMode) c = -1 != CKEDITOR.tools.indexOf([g ? 39 : 37, 38], c) ? a.call(y) : e.call(y), y.selectPage(c), y._.tabs[c][0].focus(), w = 1; else if (13 != c && 32 != c || !y._.tabBarMode) if (13 == c) c = b.data.getTarget(), c.is("a", "button", "select", "textarea") || c.is("input") && "button" == c.$.type || ((c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), w = 1), q = 1; else if (27 == c) (c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), q = 1; else return; else this.selectPage(this._.currentTabId),
                            this._.tabBarMode = !1, this._.currentFocusIndex = -1, l(1), w = 1; r(b)
                }
            } function r(a) { w ? a.data.preventDefault(1) : q && a.data.stopPropagation() } var p = CKEDITOR.dialog._.dialogDefinitions[c], x = CKEDITOR.tools.clone(u), z = d.config.dialog_buttonsOrder || "OS", C = d.lang.dir, A = {}, w, q; ("OS" == z && CKEDITOR.env.mac || "rtl" == z && "ltr" == C || "ltr" == z && "rtl" == C) && x.buttons.reverse(); p = CKEDITOR.tools.extend(p(d), x); p = CKEDITOR.tools.clone(p); p = new t(this, p); x = m(d); this._ = {
                editor: d, element: x.element, name: c, contentSize: { width: 0, height: 0 },
                size: { width: 0, height: 0 }, contents: {}, buttons: {}, accessKeyMap: {}, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: !1, focusList: [], currentFocusIndex: 0, hasFocus: !1
            }; this.parts = x.parts; CKEDITOR.tools.setTimeout(function () { d.fire("ariaWidget", this.parts.contents) }, 0, this); x = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" }; x["rtl" == C ? "right" : "left"] = 0; this.parts.dialog.setStyles(x); CKEDITOR.event.call(this); this.definition = p = CKEDITOR.fire("dialogDefinition",
                { name: c, definition: p }, d).definition; if (!("removeDialogTabs" in d._) && d.config.removeDialogTabs) { x = d.config.removeDialogTabs.split(";"); for (C = 0; C < x.length; C++)if (z = x[C].split(":"), 2 == z.length) { var v = z[0]; A[v] || (A[v] = []); A[v].push(z[1]) } d._.removeDialogTabs = A } if (d._.removeDialogTabs && (A = d._.removeDialogTabs[c])) for (C = 0; C < A.length; C++)p.removeContents(A[C]); if (p.onLoad) this.on("load", p.onLoad); if (p.onShow) this.on("show", p.onShow); if (p.onHide) this.on("hide", p.onHide); if (p.onOk) this.on("ok", function (a) {
                    d.fire("saveSnapshot");
                    setTimeout(function () { d.fire("saveSnapshot") }, 0); !1 === p.onOk.call(this, a) && (a.data.hide = !1)
                }); this.state = CKEDITOR.DIALOG_STATE_IDLE; if (p.onCancel) this.on("cancel", function (a) { !1 === p.onCancel.call(this, a) && (a.data.hide = !1) }); var y = this, B = function (a) { var b = y._.contents, d = !1, c; for (c in b) for (var g in b[c]) if (d = a.call(this, b[c][g])) return }; this.on("ok", function (a) {
                    B(function (d) {
                        if (d.validate) {
                            var c = d.validate(this), g = "string" == typeof c || !1 === c; g && (a.data.hide = !1, a.stop()); b.call(d, !g, "string" == typeof c ?
                                c : void 0); return g
                        }
                    })
                }, this, null, 0); this.on("cancel", function (a) { B(function (b) { if (b.isChanged()) return d.config.dialog_noConfirmCancel || confirm(d.lang.common.confirmCancel) || (a.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on("click", function (a) { !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = l; var L = this._.element; d.focusManager.add(L, 1); this.on("show", function () { L.on("keydown", n, this); if (CKEDITOR.env.gecko) L.on("keypress", r, this) }); this.on("hide",
                    function () { L.removeListener("keydown", n); CKEDITOR.env.gecko && L.removeListener("keypress", r); B(function (a) { f.apply(a) }) }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", n, this, null, 0) }); this.on("show", function () {
                        h(); var a = 1 < y._.pageCount; d.config.dialog_startupFocusTab && a ? (y._.tabBarMode = !0, y._.tabs[y._.currentTabId][0].focus(), y._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length - 1, p.onFocus ?
                            (a = p.onFocus.call(this)) && a.focus() : l(1))
                    }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () { var a = this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a) }, this); k(this); g(this); (new CKEDITOR.dom.text(p.title, CKEDITOR.document)).appendTo(this.parts.title); for (C = 0; C < p.contents.length; C++)(A = p.contents[C]) && this.addPage(A); this.parts.tabs.on("click", function (a) {
                        var b = a.data.getTarget(); b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
                            this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, l(1)), a.data.preventDefault())
                    }, this); C = []; A = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: p.buttons }, C).getChild(); this.parts.footer.setHtml(C.join("")); for (C = 0; C < A.length; C++)this._.buttons[A[C].id] = A[C]
        }; CKEDITOR.dialog.prototype = {
            destroy: function () { this.hide(); this._.element.remove() }, resize: function () {
                return function (a, b) {
                    this._.contentSize && this._.contentSize.width ==
                        a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b }, this._.editor), this.fire("resize", { width: a, height: b }, this._.editor), this.parts.contents.setStyles({ width: a + "px", height: b + "px" }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = { width: a, height: b })
                }
            }(), getSize: function () {
                var a = this._.element.getFirst();
                return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 }
            }, move: function (a, b, d) {
                var c = this._.element.getFirst(), g = "rtl" == this._.editor.lang.dir, f = "fixed" == c.getComputedStyle("position"); CKEDITOR.env.ie && c.setStyle("zoom", "100%"); f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = { x: a, y: b }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), g && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = { top: (0 < b ? b : 0) + "px" },
                    b[g ? "right" : "left"] = (0 < a ? a : 0) + "px", c.setStyles(b), d && (this._.moved = 1))
            }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                var a = this._.element, b = this.definition; a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody()); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); null ===
                    this._.currentTabId && this.selectPage(this.definition.contents[0].id); null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex); this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10); null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex /
                        2), CKEDITOR.dialog._.currentTop = this); a.on("keydown", H); a.on("keyup", F); this._.hasFocus = !1; for (var d in b.contents) if (b.contents[d]) {
                            var a = b.contents[d], c = this._.tabs[a.id], g = a.requiredContent, f = 0; if (c) {
                                for (var e in this._.contents[a.id]) { var h = this._.contents[a.id][e]; "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(), f++)) } !f || g && !this._.editor.activeFilter.check(g) ? c[0].addClass("cke_dialog_tab_disabled") :
                                    c[0].removeClass("cke_dialog_tab_disabled")
                            }
                        } CKEDITOR.tools.setTimeout(function () { this.layout(); l(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() }) }, 100, this)
            }, layout: function () {
                var a = this.parts.dialog, b = this.getSize(), d = CKEDITOR.document.getWindow().getViewPaneSize(), c =
                    (d.width - b.width) / 2, g = (d.height - b.height) / 2; CKEDITOR.env.ie6Compat || (b.height + (0 < g ? g : 0) > d.height || b.width + (0 < c ? c : 0) > d.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed")); this.move(this._.moved ? this._.position.x : c, this._.moved ? this._.position.y : g)
            }, foreach: function (a) { for (var b in this._.contents) for (var d in this._.contents[b]) a.call(this, this._.contents[b][d]); return this }, reset: function () { var a = function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this } }(),
            setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {}); this._.editor.fire("dialogHide", this); this.selectPage(this._.tabIdList[0]); var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility",
                        "hidden"); for (I(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else w(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10; else {
                            CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", H); a.removeListener("keyup", F); var d = this._.editor;
                            d.focus(); setTimeout(function () { d.focusManager.unlock(); CKEDITOR.env.iOS && d.window.focus() }, 0)
                        } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                }
            }, addPage: function (a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], d = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", c = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                        type: "vbox", className: "cke_dialog_page_contents",
                        children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;"
                    }, b), g = this._.contents[a.id] = {}, f = c.getChild(), e = 0; c = f.shift();)c.notAllowed || "hbox" == c.type || "vbox" == c.type || e++, g[c.id] = c, "function" == typeof c.getChild && f.push.apply(f, c.getChild()); e || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); c = CKEDITOR.env; g = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); d = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
                        0 < this._.pageCount ? " cke_last" : "cke_first", d, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', g, '"', c.gecko && !c.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join("")); b.setAttribute("aria-labelledby", g); this._.tabs[a.id] = [d, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++; this._.lastTab = d; this.updateStyle(); b.setAttribute("name", a.id); b.appendTo(this.parts.contents); d.unselectable(); this.parts.tabs.append(d); a.accessKey &&
                            (K(this, this, "CTRL+" + a.accessKey, M, E), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            }, selectPage: function (a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                    for (var b in this._.tabs) { var d = this._.tabs[b][0], g = this._.tabs[b][1]; b != a && (d.removeClass("cke_dialog_tab_selected"), g.hide()); g.setAttribute("aria-hidden", b != a) } var f = this._.tabs[a]; f[0].addClass("cke_dialog_tab_selected"); CKEDITOR.env.ie6Compat ||
                        CKEDITOR.env.ie7Compat ? (c(f[1]), f[1].show(), setTimeout(function () { c(f[1], 1) }, 0)) : f[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            }, updateStyle: function () { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (b) { var d = this._.tabs[b] && this._.tabs[b][0]; d && 1 != this._.pageCount && d.isVisible() && (b == this._.currentTabId && this.selectPage(a.call(this)), d.hide(), this._.pageCount--, this.updateStyle()) }, showPage: function (a) {
                if (a =
                    this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
            }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var d = this._.contents[a]; return d && d[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() }, setValueOf: function (a, b, d) { return this.getContentElement(a, b).setValue(d) }, getButton: function (a) { return this._.buttons[a] }, click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() },
            enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a, b) { if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new h(this, a, b)); else { this._.focusList.splice(b, 0, new h(this, a, b)); for (var d = b + 1; d < this._.focusList.length; d++)this._.focusList[d].focusIndex++ } },
            setState: function (a) {
                if (this.state != a) {
                this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) { if (!this.parts.spinner) { var b = this.getParentEditor().lang.dir, d = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": "rtl" == b ? "right" : "left" } }; d.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px"; this.parts.spinner = CKEDITOR.document.createElement("div", d); this.parts.spinner.setHtml("\x26#8987;"); this.parts.spinner.appendTo(this.parts.title, 1) } this.parts.spinner.show(); this.getButton("ok").disable() } else a ==
                    CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable()); this.fire("state", a)
                }
            }
        }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function (a, b) { this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b) }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop }, isTabEnabled: function (a, b, d) {
                a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + d + "(?:$|;)",
                    "i")))
            }, okButton: function () { var a = function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("ok", { hide: !0 }).hide && a.hide() } }, b, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (d) { return a(d, b) }, { type: "button" }, !0) }; return a }(), cancelButton: function () {
                var a = function (a, b) {
                    b = b || {}; return CKEDITOR.tools.extend({
                        id: "cancel", type: "button", label: a.lang.common.cancel,
                        "class": "cke_dialog_ui_button_cancel", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() }
                    }, b, !0)
                }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (d) { return a(d, b) }, { type: "button" }, !0) }; return a
            }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
        }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null }; CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var u = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }, x = function (a, b, d) { for (var c = 0, g; g = a[c]; c++)if (g.id == b || d && g[d] && (g = x(g[d], b, d))) return g; return null }, r = function (a, b, d, c, g) { if (d) { for (var f = 0, e; e = a[f]; f++) { if (e.id == d) return a.splice(f, 0, b), b; if (c && e[c] && (e = r(e[c], b, d, c, !0))) return e } if (g) return null } a.push(b); return b }, z = function (a, b, d) {
            for (var c = 0, g; g = a[c]; c++) {
                if (g.id == b) return a.splice(c, 1); if (d && g[d] && (g = z(g[d],
                    b, d))) return g
            } return null
        }, t = function (a, b) { this.dialog = a; for (var c = b.contents, g = 0, f; f = c[g]; g++)c[g] = f && new d(a, f); CKEDITOR.tools.extend(this, b) }; t.prototype = { getContents: function (a) { return x(this.contents, a) }, getButton: function (a) { return x(this.buttons, a) }, addContents: function (a, b) { return r(this.contents, a, b) }, addButton: function (a, b) { return r(this.buttons, a, b) }, removeContents: function (a) { z(this.contents, a) }, removeButton: function (a) { z(this.buttons, a) } }; d.prototype = {
            get: function (a) {
                return x(this.elements,
                    a, "children")
            }, add: function (a, b) { return r(this.elements, a, b, "children") }, remove: function (a) { z(this.elements, a, "children") }
        }; var y, C = {}, A, B = {}, H = function (a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, d = a.data.$.altKey, c = a.data.$.shiftKey, g = String.fromCharCode(a.data.$.keyCode); (b = B[(b ? "CTRL+" : "") + (d ? "ALT+" : "") + (c ? "SHIFT+" : "") + g]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()) }, F = function (a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, d = a.data.$.altKey,
            c = a.data.$.shiftKey, g = String.fromCharCode(a.data.$.keyCode); (b = B[(b ? "CTRL+" : "") + (d ? "ALT+" : "") + (c ? "SHIFT+" : "") + g]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()))
        }, K = function (a, b, d, c, g) { (B[d] || (B[d] = [])).push({ uiElement: a, dialog: b, key: d, keyup: g || a.accessKeyUp, keydown: c || a.accessKeyDown }) }, I = function (a) { for (var b in B) { for (var d = B[b], c = d.length - 1; 0 <= c; c--)d[c].dialog != a && d[c].uiElement != a || d.splice(c, 1); 0 === d.length && delete B[b] } }, E = function (a,
            b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) }, M = function () { }; (function () {
                CKEDITOR.ui.dialog = {
                    uiElement: function (a, b, d, c, g, f, e) {
                        if (!(4 > arguments.length)) {
                            var h = (c.call ? c(b) : c) || "div", k = ["\x3c", h, " "], l = (g && g.call ? g(b) : g) || {}, n = (f && f.call ? f(b) : f) || {}, m = (e && e.call ? e.call(this, a, b) : e) || "", r = this.domId = n.id || CKEDITOR.tools.getNextId() + "_uiElement"; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (l.display = "none", this.notAllowed = !0); n.id = r; var p = {}; b.type && (p["cke_dialog_ui_" +
                                b.type] = 1); b.className && (p[b.className] = 1); b.disabled && (p.cke_disabled = 1); for (var t = n["class"] && n["class"].split ? n["class"].split(" ") : [], r = 0; r < t.length; r++)t[r] && (p[t[r]] = 1); t = []; for (r in p) t.push(r); n["class"] = t.join(" "); b.title && (n.title = b.title); p = (b.style || "").split(";"); b.align && (t = b.align, l["margin-left"] = "left" == t ? 0 : "auto", l["margin-right"] = "right" == t ? 0 : "auto"); for (r in l) p.push(r + ":" + l[r]); b.hidden && p.push("display:none"); for (r = p.length - 1; 0 <= r; r--)"" === p[r] && p.splice(r, 1); 0 < p.length && (n.style =
                                    (n.style ? n.style + "; " : "") + p.join("; ")); for (r in n) k.push(r + '\x3d"' + CKEDITOR.tools.htmlEncode(n[r]) + '" '); k.push("\x3e", m, "\x3c/", h, "\x3e"); d.push(k.join("")); (this._ || (this._ = {})).dialog = a; "boolean" == typeof b.isChanged && (this.isChanged = function () { return b.isChanged }); "function" == typeof b.isChanged && (this.isChanged = b.isChanged); "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) { return function (d) { a.call(this, b.setValue.call(this, d)) } })); "function" == typeof b.getValue &&
                                        (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && K(this, a, "CTRL+" + b.accessKey); var u = this; a.on("load", function () {
                                            var b = u.getInputElement(); if (b) {
                                                var d = u.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : ""; b.on("focus", function () {
                                                    a._.tabBarMode = !1; a._.hasFocus = !0; u.fire("focus");
                                                    d && this.addClass(d)
                                                }); b.on("blur", function () { u.fire("blur"); d && this.removeClass(d) })
                                            }
                                        }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () { a._.currentFocusIndex = u.focusIndex }))
                        }
                    }, hbox: function (a, b, d, c, g) {
                        if (!(4 > arguments.length)) {
                        this._ || (this._ = {}); var f = this._.children = b, e = g && g.widths || null, h = g && g.height || null, k, l = { role: "presentation" }; g && g.align && (l.align = g.align); CKEDITOR.ui.dialog.uiElement.call(this,
                            a, g || { type: "hbox" }, c, "table", {}, l, function () {
                                var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (k = 0; k < d.length; k++) {
                                    var b = "cke_dialog_ui_hbox_child", c = []; 0 === k && (b = "cke_dialog_ui_hbox_first"); k == d.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); e ? e[k] && c.push("width:" + v(e[k])) : c.push("width:" + Math.floor(100 / d.length) + "%"); h && c.push("height:" + v(h)); g && void 0 !== g.padding && c.push("padding:" + v(g.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks &&
                                        f[k].align && c.push("text-align:" + f[k].align); 0 < c.length && a.push('style\x3d"' + c.join("; ") + '" '); a.push("\x3e", d[k], "\x3c/td\x3e")
                                } a.push("\x3c/tr\x3e\x3c/tbody\x3e"); return a.join("")
                            })
                        }
                    }, vbox: function (a, b, d, c, g) {
                        if (!(3 > arguments.length)) {
                        this._ || (this._ = {}); var f = this._.children = b, e = g && g.width || null, h = g && g.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, g || { type: "vbox" }, c, "div", null, { role: "presentation" }, function () {
                            var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                            b.push('style\x3d"'); g && g.expand && b.push("height:100%;"); b.push("width:" + v(e || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align\x3d"', CKEDITOR.tools.htmlEncode(g && g.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '); b.push("\x3e\x3ctbody\x3e"); for (var c = 0; c < d.length; c++) {
                                var k = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); e && k.push("width:" + v(e || "100%")); h ? k.push("height:" + v(h[c])) : g && g.expand && k.push("height:" + Math.floor(100 / d.length) + "%");
                                g && void 0 !== g.padding && k.push("padding:" + v(g.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && f[c].align && k.push("text-align:" + f[c].align); 0 < k.length && b.push('style\x3d"', k.join("; "), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', d[c], "\x3c/td\x3e\x3c/tr\x3e")
                            } b.push("\x3c/tbody\x3e\x3c/table\x3e"); return b.join("")
                        })
                        }
                    }
                }
            })(); CKEDITOR.ui.dialog.uiElement.prototype = {
                getElement: function () { return CKEDITOR.document.getById(this.domId) }, getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog },
                setValue: function (a, b) { this.getInputElement().setValue(a); !b && this.fire("change", { value: a }); return this }, getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return !1 }, selectParentTab: function () { for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents");); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this }, focus: function () {
                    this.selectParentTab().getInputElement().focus();
                    return this
                }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, d, c = function (a, b, d, c) { b.on("load", function () { a.getInputElement().on(d, c, a) }) }, g; for (g in a) if (d = g.match(b)) this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : c(this, this._.dialog, d[1].toLowerCase(), a[g]); return this }, eventProcessors: { onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) { a.on("show", b, this) }, onHide: function (a, b) { a.on("hide", b, this) } }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { },
                disable: function () { var a = this.getElement(); this.getInputElement().setAttribute("disabled", "true"); a.addClass("cke_disabled") }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() }, isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
            }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
                { getChild: function (a) { if (1 > arguments.length) return this._.children.concat(); a.splice || (a = [a]); return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
                    var a = {
                        build: function (a, b, d) {
                            for (var c = b.children, g, f = [], e = [], h = 0; h < c.length && (g = c[h]); h++) { var k = []; f.push(k); e.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, k)) } return new CKEDITOR.ui.dialog[b.type](a,
                                e, f, d, b)
                        }
                    }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
                })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = { exec: function (a) { var b = this.tabId; a.openDialog(this.dialogName, function (a) { b && a.selectPage(b) }) }, canUndo: !1, editorFocus: 1 }; (function () {
                    var a = /^([a]|[^a])+$/, b = /^\d*$/, d = /^\d*(?:\.\d+)?$/, c = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, g = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                    f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                        functions: function () {
                            var a = arguments; return function () {
                                var b = this && this.getValue ? this.getValue() : a[0], d, c = CKEDITOR.VALIDATE_AND, g = [], f; for (f = 0; f < a.length; f++)if ("function" == typeof a[f]) g.push(a[f]); else break; f < a.length && "string" == typeof a[f] && (d = a[f], f++); f < a.length && "number" == typeof a[f] && (c = a[f]); var e = c == CKEDITOR.VALIDATE_AND ? !0 : !1; for (f = 0; f < g.length; f++)e = c == CKEDITOR.VALIDATE_AND ? e &&
                                    g[f](b) : e || g[f](b); return e ? !0 : d
                            }
                        }, regex: function (a, b) { return function (d) { d = this && this.getValue ? this.getValue() : d; return a.test(d) ? !0 : b } }, notEmpty: function (b) { return this.regex(a, b) }, integer: function (a) { return this.regex(b, a) }, number: function (a) { return this.regex(d, a) }, cssLength: function (a) { return this.functions(function (a) { return g.test(CKEDITOR.tools.trim(a)) }, a) }, htmlLength: function (a) { return this.functions(function (a) { return c.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) {
                            return this.functions(function (a) { return f.test(CKEDITOR.tools.trim(a)) },
                                a)
                        }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
                    }; CKEDITOR.on("instanceDestroyed", function (a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide(); for (var d in C) C[d].remove(); C = {} } a = a.editor._.storedDialogs; for (var c in a) a[c].destroy() })
                })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    openDialog: function (a, b) {
                        var d = null, c = CKEDITOR.dialog._.dialogDefinitions[a];
                        null === CKEDITOR.dialog._.currentTop && p(this); if ("function" == typeof c) d = this._.storedDialogs || (this._.storedDialogs = {}), d = d[a] || (d[a] = new CKEDITOR.dialog(this, a)), b && b.call(d, d), d.show(); else {
                            if ("failed" == c) throw w(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); "string" == typeof c && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c), function () {
                            "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"); this.openDialog(a,
                                b)
                            }, this, 0, 1)
                        } CKEDITOR.skin.loadPart("dialog"); return d
                    }
                })
    }(), CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function (a) { a.on("doubleclick", function (e) { e.data.dialog && a.openDialog(e.data.dialog) }, null, null, 999) } }), function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog", availableLangs: {
                af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1,
                ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
            }, init: function (a) {
                var e = this; a.addCommand("a11yHelp", {
                    exec: function () { var c = a.langCode, c = e.availableLangs[c] ? c : e.availableLangs[c.replace(/-.*/, "")] ? c.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + c + ".js"), function () { a.lang.a11yhelp = e.langEntries[c]; a.openDialog("a11yHelp") }) }, modes: { wysiwyg: 1, source: 1 },
                    readOnly: 1, canUndo: !1
                }); a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"); CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"); a.on("ariaEditorHelpLabel", function (c) { c.data.label = a.lang.common.editorHelp })
            }
        })
    }(), CKEDITOR.plugins.add("about", {
        requires: "dialog", init: function (a) {
            var e = a.addCommand("about", new CKEDITOR.dialogCommand("about")); e.modes = { wysiwyg: 1, source: 1 }; e.canUndo = !1; e.readOnly = 1; a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.dlgTitle, command: "about", toolbar: "about" });
            CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
        }
    }), CKEDITOR.plugins.add("basicstyles", {
        init: function (a) {
            var e = 0, c = function (c, f, d, k) { if (k) { k = new CKEDITOR.style(k); var g = b[d]; g.unshift(k); a.attachStyleStateChange(k, function (b) { !a.readOnly && a.getCommand(d).setState(b) }); a.addCommand(d, new CKEDITOR.styleCommand(k, { contentForms: g })); a.ui.addButton && a.ui.addButton(c, { label: f, command: d, toolbar: "basicstyles," + (e += 10) }) } }, b = {
                bold: ["strong", "b", ["span", function (a) {
                    a = a.styles["font-weight"]; return "bold" ==
                        a || 700 <= +a
                }]], italic: ["em", "i", ["span", function (a) { return "italic" == a.styles["font-style"] }]], underline: ["u", ["span", function (a) { return "underline" == a.styles["text-decoration"] }]], strike: ["s", "strike", ["span", function (a) { return "line-through" == a.styles["text-decoration"] }]], subscript: ["sub"], superscript: ["sup"]
            }, f = a.config, m = a.lang.basicstyles; c("Bold", m.bold, "bold", f.coreStyles_bold); c("Italic", m.italic, "italic", f.coreStyles_italic); c("Underline", m.underline, "underline", f.coreStyles_underline); c("Strike",
                m.strike, "strike", f.coreStyles_strike); c("Subscript", m.subscript, "subscript", f.coreStyles_subscript); c("Superscript", m.superscript, "superscript", f.coreStyles_superscript); a.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
        }
    }), CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }, CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }, CKEDITOR.config.coreStyles_underline = { element: "u" }, CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    }, CKEDITOR.config.coreStyles_subscript = { element: "sub" }, CKEDITOR.config.coreStyles_superscript = { element: "sup" }, function () {
        var a = {
            exec: function (a) {
                var c = a.getCommand("blockquote").state, b = a.getSelection(), f = b && b.getRanges()[0]; if (f) {
                    var m = b.createBookmarks(); if (CKEDITOR.env.ie) {
                        var h = m[0].startNode, l = m[0].endNode, d; if (h && "blockquote" == h.getParent().getName()) for (d = h; d = d.getNext();)if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { h.move(d, !0); break } if (l && "blockquote" == l.getParent().getName()) for (d =
                            l; d = d.getPrevious();)if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { l.move(d); break }
                    } var k = f.createIterator(); k.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR; if (c == CKEDITOR.TRISTATE_OFF) {
                        for (h = []; c = k.getNextParagraph();)h.push(c); 1 > h.length && (c = a.document.createElement(a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), l = m.shift(), f.insertNode(c), c.append(new CKEDITOR.dom.text("﻿", a.document)), f.moveToBookmark(l), f.selectNodeContents(c), f.collapse(!0), l = f.createBookmark(), h.push(c), m.unshift(l));
                        d = h[0].getParent(); f = []; for (l = 0; l < h.length; l++)c = h[l], d = d.getCommonAncestor(c.getParent()); for (c = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; c[d.getName()];)d = d.getParent(); for (l = null; 0 < h.length;) { for (c = h.shift(); !c.getParent().equals(d);)c = c.getParent(); c.equals(l) || f.push(c); l = c } for (; 0 < f.length;)if (c = f.shift(), "blockquote" == c.getName()) { for (l = new CKEDITOR.dom.documentFragment(a.document); c.getFirst();)l.append(c.getFirst().remove()), h.push(l.getLast()); l.replace(c) } else h.push(c); f = a.document.createElement("blockquote");
                        for (f.insertBefore(h[0]); 0 < h.length;)c = h.shift(), f.append(c)
                    } else if (c == CKEDITOR.TRISTATE_ON) {
                        l = []; for (d = {}; c = k.getNextParagraph();) { for (h = f = null; c.getParent();) { if ("blockquote" == c.getParent().getName()) { f = c.getParent(); h = c; break } c = c.getParent() } f && h && !h.getCustomData("blockquote_moveout") && (l.push(h), CKEDITOR.dom.element.setMarker(d, h, "blockquote_moveout", !0)) } CKEDITOR.dom.element.clearAllMarkers(d); c = []; h = []; for (d = {}; 0 < l.length;)k = l.shift(), f = k.getParent(), k.getPrevious() ? k.getNext() ? (k.breakParent(k.getParent()),
                            h.push(k.getNext())) : k.remove().insertAfter(f) : k.remove().insertBefore(f), f.getCustomData("blockquote_processed") || (h.push(f), CKEDITOR.dom.element.setMarker(d, f, "blockquote_processed", !0)), c.push(k); CKEDITOR.dom.element.clearAllMarkers(d); for (l = h.length - 1; 0 <= l; l--) { f = h[l]; a: { d = f; for (var k = 0, g = d.getChildCount(), n = void 0; k < g && (n = d.getChild(k)); k++)if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) { d = !1; break a } d = !0 } d && f.remove() } if (a.config.enterMode == CKEDITOR.ENTER_BR) for (f = !0; c.length;)if (k = c.shift(),
                                "div" == k.getName()) { l = new CKEDITOR.dom.documentFragment(a.document); !f || !k.getPrevious() || k.getPrevious().type == CKEDITOR.NODE_ELEMENT && k.getPrevious().isBlockBoundary() || l.append(a.document.createElement("br")); for (f = k.getNext() && !(k.getNext().type == CKEDITOR.NODE_ELEMENT && k.getNext().isBlockBoundary()); k.getFirst();)k.getFirst().remove().appendTo(l); f && l.append(a.document.createElement("br")); l.replace(k); f = !1 }
                    } b.selectBookmarks(m); a.focus()
                }
            }, refresh: function (a, c) {
                this.setState(a.elementPath(c.block ||
                    c.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
        }; CKEDITOR.plugins.add("blockquote", { init: function (e) { e.blockless || (e.addCommand("blockquote", a), e.ui.addButton && e.ui.addButton("Blockquote", { label: e.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })) } })
    }(), "use strict", function () {
        function a(a, b) {
            CKEDITOR.tools.extend(this, b, {
                editor: a, id: "cke-" + CKEDITOR.tools.getUniqueId(),
                area: a._.notificationArea
            }); b.type || (this.type = "info"); this.element = this._createElement(); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
        } function e(a) { var b = this; this.editor = a; this.notifications = []; this.element = this._createElement(); this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this); this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this); a.on("destroy", function () { b._removeListeners(); b.element.remove() }) } CKEDITOR.plugins.add("notification",
            {
                init: function (a) {
                    function b(a) { var b = new CKEDITOR.dom.element("div"); b.setStyles({ position: "fixed", "margin-left": "-9999px" }); b.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" }); b.setText(a); CKEDITOR.document.getBody().append(b); setTimeout(function () { b.remove() }, 100) } a._.notificationArea = new e(a); a.showNotification = function (b, e, h) { var l, d; "progress" == e ? l = h : d = h; b = new CKEDITOR.plugins.notification(a, { message: b, type: e, progress: l, duration: d }); b.show(); return b }; a.on("key", function (f) {
                        if (27 ==
                            f.data.keyCode) { var e = a._.notificationArea.notifications; e.length && (b(a.lang.notification.closed), e[e.length - 1].hide(), f.cancel()) }
                    })
                }
            }); a.prototype = {
                show: function () { !1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) }, update: function (a) {
                    var b = !0; !1 === this.editor.fire("notificationUpdate", { notification: this, options: a }) && (b = !1); var f = this.element, e = f.findOne(".cke_notification_message"), h = f.findOne(".cke_notification_progress"), l = a.type; f.removeAttribute("role");
                    a.progress && "progress" != this.type && (l = "progress"); l && (f.removeClass(this._getClass()), f.removeAttribute("aria-label"), this.type = l, f.addClass(this._getClass()), f.setAttribute("aria-label", this.type), "progress" != this.type || h ? "progress" != this.type && h && h.remove() : (h = this._createProgressElement(), h.insertBefore(e))); void 0 !== a.message && (this.message = a.message, e.setHtml(this.message)); void 0 !== a.progress && (this.progress = a.progress, h && h.setStyle("width", this._getPercentageProgress())); b && a.important && (f.setAttribute("role",
                        "alert"), this.isVisible() || this.area.add(this)); this.duration = a.duration; this._hideAfterTimeout()
                }, hide: function () { !1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) }, isVisible: function () { return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this) }, _createElement: function () {
                    var a = this, b, f, e = this.editor.lang.common.close; b = new CKEDITOR.dom.element("div"); b.addClass("cke_notification"); b.addClass(this._getClass()); b.setAttributes({ id: this.id, role: "alert", "aria-label": this.type });
                    "progress" == this.type && b.append(this._createProgressElement()); f = new CKEDITOR.dom.element("p"); f.addClass("cke_notification_message"); f.setHtml(this.message); b.append(f); f = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + e + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e'); b.append(f); f.on("click", function () { a.editor.focus(); a.hide() }); return b
                }, _getClass: function () {
                    return "progress" ==
                        this.type ? "cke_notification_info" : "cke_notification_" + this.type
                }, _createProgressElement: function () { var a = new CKEDITOR.dom.element("span"); a.addClass("cke_notification_progress"); a.setStyle("width", this._getPercentageProgress()); return a }, _getPercentageProgress: function () { return Math.round(100 * (this.progress || 0)) + "%" }, _hideAfterTimeout: function () {
                    var a = this, b; this._hideTimeoutId && clearTimeout(this._hideTimeoutId); if ("number" == typeof this.duration) b = this.duration; else if ("info" == this.type || "success" ==
                        this.type) b = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3; b && (a._hideTimeoutId = setTimeout(function () { a.hide() }, b))
                }
            }; e.prototype = {
                add: function (a) { this.notifications.push(a); this.element.append(a.element); 1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners()); this._layout() }, remove: function (a) {
                    var b = CKEDITOR.tools.indexOf(this.notifications, a); 0 > b || (this.notifications.splice(b, 1), a.element.remove(),
                        this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
                }, _createElement: function () { var a = this.editor, b = a.config, f = new CKEDITOR.dom.element("div"); f.addClass("cke_notifications_area"); f.setAttribute("id", "cke_notifications_area_" + a.name); f.setStyle("z-index", b.baseFloatZIndex - 2); return f }, _attachListeners: function () {
                    var a = CKEDITOR.document.getWindow(), b = this.editor; a.on("scroll", this._uiBuffer.input); a.on("resize", this._uiBuffer.input); b.on("change", this._changeBuffer.input);
                    b.on("floatingSpaceLayout", this._layout, this, null, 20); b.on("blur", this._layout, this, null, 20)
                }, _removeListeners: function () { var a = CKEDITOR.document.getWindow(), b = this.editor; a.removeListener("scroll", this._uiBuffer.input); a.removeListener("resize", this._uiBuffer.input); b.removeListener("change", this._changeBuffer.input); b.removeListener("floatingSpaceLayout", this._layout); b.removeListener("blur", this._layout) }, _layout: function () {
                    function a() { b.setStyle("left", x(r + e.width - n - p)) } var b = this.element, f =
                        this.editor, e = f.ui.contentsElement.getClientRect(), h = f.ui.contentsElement.getDocumentPosition(), l, d, k = b.getClientRect(), g, n = this._notificationWidth, p = this._notificationMargin; g = CKEDITOR.document.getWindow(); var w = g.getScrollPosition(), v = g.getViewPaneSize(), q = CKEDITOR.document.getBody(), u = q.getDocumentPosition(), x = CKEDITOR.tools.cssLength; n && p || (g = this.element.getChild(0), n = this._notificationWidth = g.getClientRect().width, p = this._notificationMargin = parseInt(g.getComputedStyle("margin-left"), 10) + parseInt(g.getComputedStyle("margin-right"),
                            10)); f.toolbar && (l = f.ui.space("top"), d = l.getClientRect()); l && l.isVisible() && d.bottom > e.top && d.bottom < e.bottom - k.height ? b.setStyles({ position: "fixed", top: x(d.bottom) }) : 0 < e.top ? b.setStyles({ position: "absolute", top: x(h.y) }) : h.y + e.height - k.height > w.y ? b.setStyles({ position: "fixed", top: 0 }) : b.setStyles({ position: "absolute", top: x(h.y + e.height - k.height) }); var r = "fixed" == b.getStyle("position") ? e.left : "static" != q.getComputedStyle("position") ? h.x - u.x : h.x; e.width < n + p ? h.x + n + p > w.x + v.width ? a() : b.setStyle("left",
                                x(r)) : h.x + n + p > w.x + v.width ? b.setStyle("left", x(r)) : h.x + e.width / 2 + n / 2 + p > w.x + v.width ? b.setStyle("left", x(r - h.x + w.x + v.width - n - p)) : 0 > e.left + e.width - n - p ? a() : 0 > e.left + e.width / 2 - n / 2 ? b.setStyle("left", x(r - h.x + w.x)) : b.setStyle("left", x(r + e.width / 2 - n / 2 - p / 2))
                }
            }; CKEDITOR.plugins.notification = a
    }(), function () {
        var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var e = ""; CKEDITOR.env.ie && (e = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + e + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"') +
            '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e', c = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), b = CKEDITOR.addTemplate("button", a); CKEDITOR.plugins.add("button", {
                beforeInit: function (a) {
                    a.ui.addHandler(CKEDITOR.UI_BUTTON,
                        CKEDITOR.ui.button.handler)
                }
            }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } }; CKEDITOR.ui.button.prototype = {
                render: function (a, e) {
                    function h() {
                        var b = a.mode; b && (b = this.modes[b] ? void 0 !== l[b] ? l[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED :
                            b, this.setState(b), this.refresh && this.refresh())
                    } var l = null, d = CKEDITOR.env, k = this._.id = CKEDITOR.tools.getNextId(), g = "", n = this.command, p, w, v; this._.editor = a; var q = { id: k, button: this, editor: a, focus: function () { CKEDITOR.document.getById(k).focus() }, execute: function () { this.button.click(a) }, attach: function (a) { this.button.attach(a) } }, u = CKEDITOR.tools.addFunction(function (a) { if (q.onkey) return a = new CKEDITOR.dom.event(a), !1 !== q.onkey(q, a.getKeystroke()) }), x = CKEDITOR.tools.addFunction(function (a) {
                        var b; q.onfocus &&
                            (b = !1 !== q.onfocus(q, new CKEDITOR.dom.event(a))); return b
                    }), r = 0; q.clickFn = p = CKEDITOR.tools.addFunction(function () { r && (a.unlockSelection(1), r = 0); q.execute(); d.iOS && a.focus() }); this.modes ? (l = {}, a.on("beforeModeUnload", function () { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (l[a.mode] = this._.state) }, this), a.on("activeFilterChange", h, this), a.on("mode", h, this), !this.readOnly && a.on("readOnly", h, this)) : n && (n = a.getCommand(n)) && (n.on("state", function () { this.setState(n.state) }, this), g += n.state == CKEDITOR.TRISTATE_ON ?
                        "on" : n.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"); var z; if (this.directional) a.on("contentDirChanged", function (b) { var d = CKEDITOR.document.getById(this._.id), c = d.getFirst(); b = b.data; b != a.lang.dir ? d.addClass("cke_" + b) : d.removeClass("cke_ltr").removeClass("cke_rtl"); c.setAttribute("style", CKEDITOR.skin.getIconStyle(z, "rtl" == b, this.icon, this.iconOffset)) }, this); n ? (w = a.getCommandKeystroke(n)) && (v = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, w)) : g += "off"; w = this.name || this.command; var t =
                            null, y = this.icon; z = w; this.icon && !/\./.test(this.icon) ? (z = this.icon, y = null) : (this.icon && (t = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (t = this.iconHiDpi)); t ? (CKEDITOR.skin.addIcon(t, t), y = null) : t = z; g = {
                                id: k, name: w, iconName: z, label: this.label, cls: (this.hasArrow ? "cke_button_expandable " : "") + (this.className || ""), state: g, ariaDisabled: "disabled" == g ? "true" : "false", title: this.title + (v ? " (" + v.display + ")" : ""), ariaShortcut: v ? a.lang.common.keyboardShortcut + " " + v.aria : "", titleJs: d.gecko && !d.hc ? "" : (this.title ||
                                    "").replace("'", ""), hasArrow: "string" === typeof this.hasArrow && this.hasArrow || (this.hasArrow ? "true" : "false"), keydownFn: u, focusFn: x, clickFn: p, style: CKEDITOR.skin.getIconStyle(t, "rtl" == a.lang.dir, y, this.iconOffset), arrowHtml: this.hasArrow ? c.output() : ""
                            }; b.output(g, e); if (this.onRender) this.onRender(); return q
                }, setState: function (a) {
                    if (this._.state == a) return !1; this._.state = a; var b = CKEDITOR.document.getById(this._.id); return b ? (b.setState(a, "cke_button"), b.setAttribute("aria-disabled", a == CKEDITOR.TRISTATE_DISABLED),
                        this.hasArrow ? b.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON) : a === CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
                }, getState: function () { return this._.state }, toFeature: function (a) { if (this._.feature) return this._.feature; var b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature = b }
            }; CKEDITOR.ui.prototype.addButton = function (a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
    }(), function () {
        function a(a) {
            function b() {
                for (var d =
                    c(), g = CKEDITOR.tools.clone(a.config.toolbarGroups) || e(a), k = 0; k < g.length; k++) { var m = g[k]; if ("/" != m) { "string" == typeof m && (m = g[k] = { name: m }); var q, u = m.groups; if (u) for (var x = 0; x < u.length; x++)q = u[x], (q = d[q]) && l(m, q); (q = d[m.name]) && l(m, q) } } return g
            } function c() {
                var b = {}, d, g, e; for (d in a.ui.items) g = a.ui.items[d], e = g.toolbar || "others", e = e.split(","), g = e[0], e = parseInt(e[1] || -1, 10), b[g] || (b[g] = []), b[g].push({ name: d, order: e }); for (g in b) b[g] = b[g].sort(function (a, b) {
                    return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ?
                        1 : a.order < b.order ? -1 : 1
                }); return b
            } function l(b, d) { if (d.length) { b.items ? b.items.push(a.ui.create("-")) : b.items = []; for (var c; c = d.shift();)c = "string" == typeof c ? c : c.name, k && -1 != CKEDITOR.tools.indexOf(k, c) || (c = a.ui.create(c)) && a.addFeature(c) && b.items.push(c) } } function d(a) { var b = [], d, c, g; for (d = 0; d < a.length; ++d)c = a[d], g = {}, "/" == c ? b.push(c) : CKEDITOR.tools.isArray(c) ? (l(g, CKEDITOR.tools.clone(c)), b.push(g)) : c.items && (l(g, CKEDITOR.tools.clone(c.items)), g.name = c.name, b.push(g)); return b } var k = a.config.removeButtons,
                k = k && k.split(","), g = a.config.toolbar; "string" == typeof g && (g = a.config["toolbar_" + g]); return a.toolbar = g ? d(g) : b()
        } function e(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] }, { name: "links" }, { name: "insert" },
                "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
        } var c = function () { this.toolbars = []; this.focusCommandExecuted = !1 }; c.prototype.focus = function () { for (var a = 0, b; b = this.toolbars[a++];)for (var c = 0, e; e = b.items[c++];)if (e.focus) { e.focus(); return } }; var b = { modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) { a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () { a.toolbox.focus() }, 100) : a.toolbox.focus()) } }; CKEDITOR.plugins.add("toolbar",
            {
                requires: "button", init: function (f) {
                    var e, h = function (a, b) {
                        var c, g = "rtl" == f.lang.dir, n = f.config.toolbarGroupCycling, p = g ? 37 : 39, g = g ? 39 : 37, n = void 0 === n || n; switch (b) {
                            case 9: case CKEDITOR.SHIFT + 9: for (; !c || !c.items.length;)if (c = 9 == b ? (c ? c.next : a.toolbar.next) || f.toolbox.toolbars[0] : (c ? c.previous : a.toolbar.previous) || f.toolbox.toolbars[f.toolbox.toolbars.length - 1], c.items.length) for (a = c.items[e ? c.items.length - 1 : 0]; a && !a.focus;)(a = e ? a.previous : a.next) || (c = 0); a && a.focus(); return !1; case p: c = a; do c = c.next, !c &&
                                n && (c = a.toolbar.items[0]); while (c && !c.focus); c ? c.focus() : h(a, 9); return !1; case 40: return a.button && a.button.hasArrow ? a.execute() : h(a, 40 == b ? p : g), !1; case g: case 38: c = a; do c = c.previous, !c && n && (c = a.toolbar.items[a.toolbar.items.length - 1]); while (c && !c.focus); c ? c.focus() : (e = 1, h(a, CKEDITOR.SHIFT + 9), e = 0); return !1; case 27: return f.focus(), !1; case 13: case 32: return a.execute(), !1
                        }return !0
                    }; f.on("uiSpace", function (b) {
                        if (b.data.space == f.config.toolbarLocation) {
                            b.removeListener(); f.toolbox = new c; var d = CKEDITOR.tools.getNextId(),
                                e = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', f.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + f.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e'], d = !1 !== f.config.toolbarStartupExpanded, g, n; f.config.toolbarCanCollapse && f.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && e.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? "\x3e" : ' style\x3d"display:none"\x3e')); for (var m = f.toolbox.toolbars, w = a(f), v = w.length,
                                    q = 0; q < v; q++) {
                                        var u, x = 0, r, z = w[q], t = "/" !== z && ("/" === w[q + 1] || q == v - 1), y; if (z) if (g && (e.push("\x3c/span\x3e"), n = g = 0), "/" === z) e.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                            y = z.items || z; for (var C = 0; C < y.length; C++) {
                                                var A = y[C], B; if (A) {
                                                    var H = function (a) { a = a.render(f, e); F = x.items.push(a) - 1; 0 < F && (a.previous = x.items[F - 1], a.previous.next = a); a.toolbar = x; a.onkey = h; a.onfocus = function () { f.toolbox.focusCommandExecuted || f.focus() } }; if (A.type == CKEDITOR.UI_SEPARATOR) n = g && A; else {
                                                        B = !1 !== A.canGroup;
                                                        if (!x) { u = CKEDITOR.tools.getNextId(); x = { id: u, items: [] }; r = z.name && (f.lang.toolbar.toolbarGroups[z.name] || z.name); e.push('\x3cspan id\x3d"', u, '" class\x3d"cke_toolbar' + (t ? ' cke_toolbar_last"' : '"'), r ? ' aria-labelledby\x3d"' + u + '_label"' : "", ' role\x3d"toolbar"\x3e'); r && e.push('\x3cspan id\x3d"', u, '_label" class\x3d"cke_voice_label"\x3e', r, "\x3c/span\x3e"); e.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e'); var F = m.push(x) - 1; 0 < F && (x.previous = m[F - 1], x.previous.next = x) } B ? g || (e.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'),
                                                            g = 1) : g && (e.push("\x3c/span\x3e"), g = 0); n && (H(n), n = 0); H(A)
                                                    }
                                                }
                                            } g && (e.push("\x3c/span\x3e"), n = g = 0); x && e.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                                        }
                            } f.config.toolbarCanCollapse && e.push("\x3c/span\x3e"); if (f.config.toolbarCanCollapse && f.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                var K = CKEDITOR.tools.addFunction(function () { f.execCommand("toolbarCollapse") }); f.on("destroy", function () { CKEDITOR.tools.removeFunction(K) }); f.addCommand("toolbarCollapse", {
                                    readOnly: 1, exec: function (a) {
                                        var b =
                                            a.ui.space("toolbar_collapser"), d = b.getPrevious(), c = a.ui.space("contents"), g = d.getParent(), f = parseInt(c.$.style.height, 10), e = g.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min"); h ? (d.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (d.hide(), b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand)); b.getFirst().setText(h ? "▲" : "◀"); c.setStyle("height", f - (g.$.offsetHeight - e) + "px"); a.fire("resize", {
                                                outerHeight: a.container.$.offsetHeight,
                                                contentsHeight: c.$.offsetHeight, outerWidth: a.container.$.offsetWidth
                                            })
                                    }, modes: { wysiwyg: 1, source: 1 }
                                }); f.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"); e.push('\x3ca title\x3d"' + (d ? f.lang.toolbar.toolbarCollapse : f.lang.toolbar.toolbarExpand) + '" id\x3d"' + f.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser'); d || e.push(" cke_toolbox_collapser_min"); e.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + K + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e',
                                    "\x3c/a\x3e")
                            } e.push("\x3c/span\x3e"); b.data.html += e.join("")
                        }
                    }); f.on("destroy", function () { if (this.toolbox) { var a, b = 0, c, g, f; for (a = this.toolbox.toolbars; b < a.length; b++)for (g = a[b].items, c = 0; c < g.length; c++)f = g[c], f.clickFn && CKEDITOR.tools.removeFunction(f.clickFn), f.keyDownFn && CKEDITOR.tools.removeFunction(f.keyDownFn) } }); f.on("uiReady", function () { var a = f.ui.space("toolbox"); a && f.focusManager.add(a, 1) }); f.addCommand("toolbarFocus", b); f.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); f.ui.add("-", CKEDITOR.UI_SEPARATOR,
                        {}); f.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, b) { b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
                }
            }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, b, c) {
                var l = e(this.editor), d = 0 === b, k = { name: a }; if (c) {
                    if (c = CKEDITOR.tools.search(l, function (a) { return a.name == c })) {
                    !c.groups && (c.groups = []); if (b && (b = CKEDITOR.tools.indexOf(c.groups, b), 0 <= b)) { c.groups.splice(b + 1, 0, a); return } d ? c.groups.splice(0, 0, a) : c.groups.push(a);
                        return
                    } b = null
                } b && (b = CKEDITOR.tools.indexOf(l, function (a) { return a.name == b })); d ? l.splice(0, 0, a) : "number" == typeof b ? l.splice(b + 1, 0, k) : l.push(a)
            }
    }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", "use strict", function () {
        function a(a, b, d) {
        b.type || (b.type = "auto"); if (d && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1; b.dataValue || (b.dataValue = ""); if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () { a.toolbox.focus() }); return a.fire("paste",
            b)
        } function e(b) {
            function d() {
                var a = b.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) { var c = function (a) { b.getSelection().isCollapsed() || (b.readOnly && "cut" == a.name || B.initPasteDataTransfer(a, b), a.data.preventDefault()) }; a.on("copy", c); a.on("cut", c); a.on("cut", function () { b.readOnly || b.extractSelectedHtml() }, null, null, 999) } a.on(B.mainPasteEvent, function (a) { "beforepaste" == B.mainPasteEvent && H || y(a) }); "beforepaste" == B.mainPasteEvent && (a.on("paste", function (a) {
                    F || (e(), a.data.preventDefault(),
                        y(a), k("paste"))
                }), a.on("contextmenu", h, null, null, 0), a.on("beforepaste", function (a) { !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || h() }, null, null, 0)); a.on("beforecut", function () { !H && l(b) }); var f; a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function () { f = setTimeout(C, 0) }); b.on("destroy", function () { clearTimeout(f) }); a.on("keyup", C)
            } function c(a) {
                return {
                    type: a, canUndo: "cut" == a, startDisabled: !0, fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () {
                    "cut" ==
                        this.type && l(); var a; var d = this.type; if (CKEDITOR.env.ie) a = k(d); else try { a = b.document.$.execCommand(d, !1, null) } catch (c) { a = !1 } a || b.showNotification(b.lang.clipboard[this.type + "Error"]); return a
                    }
                }
            } function f() {
                return {
                    canUndo: !1, async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (b, d) {
                        function c(d, e) {
                            e = "undefined" !== typeof e ? e : !0; d ? (d.method = "paste", d.dataTransfer || (d.dataTransfer = B.initPasteDataTransfer()), a(b, d, e)) : f && !b._.forcePasteDialog && b.showNotification(k, "info", b.config.clipboard_notificationDuration);
                            b._.forcePasteDialog = !1; b.fire("afterCommandExec", { name: "paste", command: g, returnValue: !!d })
                        } d = "undefined" !== typeof d && null !== d ? d : {}; var g = this, f = "undefined" !== typeof d.notification ? d.notification : !0, e = d.type, h = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, b.getCommandKeystroke(this)), k = "string" === typeof f ? f : b.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + h.aria + '"\x3e' + h.display + "\x3c/kbd\x3e"), h = "string" === typeof d ? d : d.dataValue; e && !0 !== b.config.forcePasteAsPlainText &&
                            "allow-word" !== b.config.forcePasteAsPlainText ? b._.nextPasteType = e : delete b._.nextPasteType; "string" === typeof h ? c({ dataValue: h }) : b.getClipboardData(c)
                    }
                }
            } function e() { F = 1; setTimeout(function () { F = 0 }, 100) } function h() { H = 1; setTimeout(function () { H = 0 }, 10) } function k(a) { var d = b.document, c = d.getBody(), f = !1, e = function () { f = !0 }; c.on(a, e); 7 < CKEDITOR.env.version ? d.$.execCommand(a) : d.$.selection.createRange().execCommand(a); c.removeListener(a, e); return f } function l() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var a =
                        b.getSelection(), d, c, f; a.getType() == CKEDITOR.SELECTION_ELEMENT && (d = a.getSelectedElement()) && (c = a.getRanges()[0], f = b.document.createText(""), f.insertBefore(d), c.setStartBefore(f), c.setEndAfter(d), a.selectRanges([c]), setTimeout(function () { d.getParent() && (f.remove(), a.selectElement(d)) }, 0))
                }
            } function m(a, d) {
                var c = b.document, f = b.editable(), e = function (a) { a.cancel() }, h; if (!c.getById("cke_pastebin")) {
                    var k = b.getSelection(), l = k.createBookmarks(); CKEDITOR.env.ie && k.root.fire("selectionchange"); var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit &&
                        !f.is("body") || CKEDITOR.env.ie ? "div" : "body", c); n.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" }); var r = 0, c = c.getWindow(); CKEDITOR.env.webkit ? (f.append(n), n.addClass("cke_editable"), f.is("body") || (r = "static" != f.getComputedStyle("position") ? f : CKEDITOR.dom.element.get(f.$.offsetParent), r = r.getDocumentPosition().y)) : f.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(n); n.setStyles({
                            position: "absolute", top: c.getScrollPosition().y - r + 10 + "px", width: "1px", height: Math.max(1, c.getViewPaneSize().height -
                                20) + "px", overflow: "hidden", margin: 0, padding: 0
                        }); CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")); (r = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px"); b.on("selectionChange", e, null, null, 0); if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) h = f.once("blur", e, null, null, -100); r && n.focus(); r = new CKEDITOR.dom.range(n); r.selectNodeContents(n); var t = r.select(); CKEDITOR.env.ie &&
                            (h = f.once("blur", function () { b.lockSelection(t) })); var p = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () { CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = p); h && h.removeListener(); CKEDITOR.env.ie && f.focus(); k.selectBookmarks(l); n.remove(); var a; CKEDITOR.env.webkit && (a = n.getFirst()) && a.is && a.hasClass("Apple-style-span") && (n = a); b.removeListener("selectionChange", e); d(n.getHtml()) }, 0)
                }
            } function z() {
                if ("paste" == B.mainPasteEvent) return b.fire("beforePaste", {
                    type: "auto",
                    method: "paste"
                }), !1; b.focus(); e(); var a = b.focusManager; a.lock(); if (b.editable().fire(B.mainPasteEvent) && !k("paste")) return a.unlock(), !1; a.unlock(); return !0
            } function t(a) { if ("wysiwyg" == b.mode) switch (a.data.keyCode) { case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: a = b.editable(); e(); "paste" == B.mainPasteEvent && a.fire("beforepaste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT + 46: b.fire("saveSnapshot"), setTimeout(function () { b.fire("saveSnapshot") }, 50) } } function y(d) {
                var c = {
                    type: "auto", method: "paste",
                    dataTransfer: B.initPasteDataTransfer(d)
                }; c.dataTransfer.cacheData(); var f = !1 !== b.fire("beforePaste", c); f && B.canClipboardApiBeTrusted(c.dataTransfer, b) ? (d.data.preventDefault(), setTimeout(function () { a(b, c) }, 0)) : m(d, function (d) { c.dataValue = d.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ""); f && a(b, c) })
            } function C() { if ("wysiwyg" == b.mode) { var a = A("paste"); b.getCommand("cut").setState(A("cut")); b.getCommand("copy").setState(A("copy")); b.getCommand("paste").setState(a); b.fire("pasteState", a) } } function A(a) {
                var d =
                    b.getSelection(), d = d && d.getRanges()[0]; if ((b.readOnly || d && d.checkReadOnly()) && a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if ("paste" == a) return CKEDITOR.TRISTATE_OFF; a = b.getSelection(); d = a.getRanges(); return a.getType() == CKEDITOR.SELECTION_NONE || 1 == d.length && d[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
            } var B = CKEDITOR.plugins.clipboard, H = 0, F = 0; (function () {
                b.on("key", t); b.on("contentDom", d); b.on("selectionChange", C); if (b.contextMenu) {
                    b.contextMenu.addListener(function () {
                        return {
                            cut: A("cut"),
                            copy: A("copy"), paste: A("paste")
                        }
                    }); var a = null; b.on("menuShow", function () { a && (a.removeListener(), a = null); var d = b.contextMenu.findItemByCommandName("paste"); d && d.element && (a = d.element.on("touchend", function () { b._.forcePasteDialog = !0 })) })
                } if (b.ui.addButton) b.once("instanceReady", function () { b._.pasteButtons && CKEDITOR.tools.array.forEach(b._.pasteButtons, function (a) { if (a = b.ui.get(a)) if (a = CKEDITOR.document.getById(a._.id)) a.on("touchend", function () { b._.forcePasteDialog = !0 }) }) })
            })(); (function () {
                function a(d,
                    c, f, e, h) { var k = b.lang.clipboard[c]; b.addCommand(c, f); b.ui.addButton && b.ui.addButton(d, { label: k, command: c, toolbar: "clipboard," + e }); b.addMenuItems && b.addMenuItem(c, { label: k, command: c, group: "clipboard", order: h }) } a("Cut", "cut", c("cut"), 10, 1); a("Copy", "copy", c("copy"), 20, 4); a("Paste", "paste", f(), 30, 8); b._.pasteButtons || (b._.pasteButtons = []); b._.pasteButtons.push("Paste")
            })(); b.getClipboardData = function (a, d) {
                function c(a) { a.removeListener(); a.cancel(); d(a.data) } function f(a) {
                    a.removeListener(); a.cancel();
                    d({ type: h, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste" })
                } var e = !1, h = "auto"; d || (d = a, a = null); b.on("beforePaste", function (a) { a.removeListener(); e = !0; h = a.data.type }, null, null, 1E3); b.on("paste", c, null, null, 0); !1 === z() && (b.removeListener("paste", c), b._.forcePasteDialog && e && b.fire("pasteDialog") ? (b.on("pasteDialogCommit", f), b.on("dialogHide", function (a) { a.removeListener(); a.data.removeListener("pasteDialogCommit", f); a.data._.committed || d(null) })) : d(null))
            }
        } function c(a) {
            if (CKEDITOR.env.webkit) {
                if (!a.match(/^[^<]*$/g) &&
                    !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
            } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html"; return "htmlifiedtext"
        } function b(a, b) {
            function d(a) { return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "") } b = b.replace(/(?!\u3000)\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi,
                "\x3cbr\x3e"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) { return d(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"),
                    b = b.replace(/<\/?div>/g, "")); CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) { return d(a.length / 4) }) + "\x3c/p\x3e")); return h(a, b)
        } function f(a) {
            function b() { var a = {}, d; for (d in CKEDITOR.dtd) "$" != d.charAt(0) && "div" != d && "span" != d && (a[d] = 1); return a } var d = {}; return {
                get: function (c) {
                    return "plain-text" == c ? d.plainText || (d.plainText = new CKEDITOR.filter(a,
                        "br")) : "semantic-content" == c ? ((c = d.semanticContent) || (c = new CKEDITOR.filter(a, {}), c.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), c = d.semanticContent = c), c) : c ? new CKEDITOR.filter(a, c) : null
                }
            }
        } function m(a, b, d) { b = CKEDITOR.htmlParser.fragment.fromHtml(b); var c = new CKEDITOR.htmlParser.basicWriter; d.applyTo(b, !0, !1, a.activeEnterMode); b.writeHtml(c); return c.getHtml() } function h(a, b) {
        a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) {
            return CKEDITOR.tools.repeat("\x3cbr\x3e",
                a.length / 7 * 2)
        }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return b
        } function l(a) { a.data.preventDefault(); a.data.$.dataTransfer.dropEffect = "none" } function d(b) {
            var d = CKEDITOR.plugins.clipboard; b.on("contentDom", function () {
                function c(d, f, e) { f.select(); a(b, { dataTransfer: e, method: "drop" }, 1); e.sourceEditor.fire("saveSnapshot"); e.sourceEditor.editable().extractHtmlFromRange(d); e.sourceEditor.getSelection().selectRanges([d]); e.sourceEditor.fire("saveSnapshot") }
                function f(c, e) { c.select(); a(b, { dataTransfer: e, method: "drop" }, 1); d.resetDragDataTransfer() } function e(a, d, c) { var f = { $: a.data.$, target: a.data.getTarget() }; d && (f.dragRange = d); c && (f.dropRange = c); !1 === b.fire(a.name, f) && a.data.preventDefault() } function h(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() } var k = b.editable(), l = CKEDITOR.plugins.clipboard.getDropTarget(b), m = b.ui.space("top"), z = b.ui.space("bottom"); d.preventDefaultDropOnElement(m); d.preventDefaultDropOnElement(z);
                k.attachListener(l, "dragstart", e); k.attachListener(b, "dragstart", d.resetDragDataTransfer, d, null, 1); k.attachListener(b, "dragstart", function (a) { d.initDragDataTransfer(a, b) }, null, null, 2); k.attachListener(b, "dragstart", function () { var a = d.dragRange = b.getSelection().getRanges()[0]; CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (d.dragStartContainerChildCount = a ? h(a.startContainer) : null, d.dragEndContainerChildCount = a ? h(a.endContainer) : null) }, null, null, 100); k.attachListener(l, "dragend", e); k.attachListener(b, "dragend",
                    d.initDragDataTransfer, d, null, 1); k.attachListener(b, "dragend", d.resetDragDataTransfer, d, null, 100); k.attachListener(l, "dragover", function (a) { if (CKEDITOR.env.edge) a.data.preventDefault(); else { var b = a.data.getTarget(); b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault() } }); k.attachListener(l, "drop", function (a) {
                        if (!a.data.$.defaultPrevented && (a.data.preventDefault(), !b.readOnly)) {
                            var c =
                                a.data.getTarget(); if (!c.isReadOnly() || c.type == CKEDITOR.NODE_ELEMENT && c.is("html")) { var c = d.getRangeAtDropPosition(a, b), f = d.dragRange; c && e(a, f, c) }
                        }
                    }, null, null, 9999); k.attachListener(b, "drop", d.initDragDataTransfer, d, null, 1); k.attachListener(b, "drop", function (a) { if (a = a.data) { var e = a.dropRange, h = a.dragRange, k = a.dataTransfer; k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function () { d.internalDrop(h, e, k, b) }, 0) : k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c(h, e, k) : f(e, k) } },
                        null, null, 9999)
            })
        } var k; CKEDITOR.plugins.add("clipboard", {
            requires: "dialog,notification,toolbar", init: function (a) {
                var h, k = f(a); a.config.forcePasteAsPlainText ? h = "plain-text" : a.config.pasteFilter ? h = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (h = "semantic-content"); a.pasteFilter = k.get(h); e(a); d(a); CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")); if (CKEDITOR.env.gecko) {
                    var l = ["image/png", "image/jpeg", "image/gif"], v; a.on("paste", function (b) {
                        var d = b.data,
                        c = d.dataTransfer; if (!d.dataValue && "paste" == d.method && c && 1 == c.getFilesCount() && v != c.id && (c = c.getFile(0), -1 != CKEDITOR.tools.indexOf(l, c.type))) { var f = new FileReader; f.addEventListener("load", function () { b.data.dataValue = '\x3cimg src\x3d"' + f.result + '" /\x3e'; a.fire("paste", b.data) }, !1); f.addEventListener("abort", function () { a.fire("paste", b.data) }, !1); f.addEventListener("error", function () { a.fire("paste", b.data) }, !1); f.readAsDataURL(c); v = d.dataTransfer.id; b.stop() }
                    }, null, null, 1)
                } a.on("paste", function (b) {
                    b.data.dataTransfer ||
                    (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer); if (!b.data.dataValue) { var d = b.data.dataTransfer, c = d.getData("text/html"); if (c) b.data.dataValue = c, b.data.type = "html"; else if (c = d.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(c), b.data.type = "text" }
                }, null, null, 1); a.on("paste", function (a) {
                    var b = a.data.dataValue, d = CKEDITOR.dtd.$block; -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,
                        function (a, b) { return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")); if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                            var c, g, f = new CKEDITOR.dom.element("div"); for (f.setHtml(b); 1 == f.getChildCount() && (c = f.getFirst()) && c.type == CKEDITOR.NODE_ELEMENT && (c.hasClass("cke_editable") ||
                                c.hasClass("cke_contents"));)f = g = c; g && (b = g.getHtml().replace(/<br>$/i, ""))
                        } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, c) { return c.toLowerCase() in d ? (a.data.preSniffing = "html", "\x3c" + c) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, c) { return c in d ? (a.data.endsWithEOL = 1, "\x3c/" + c + "\x3e") : b }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                }, null, null, 3); a.on("paste", function (d) {
                    d = d.data; var f = a._.nextPasteType || d.type, e = d.dataValue,
                        h, l = a.config.clipboard_defaultContentType || "html", n = d.dataTransfer.getTransferType(a) == CKEDITOR.DATA_TRANSFER_EXTERNAL, y = !0 === a.config.forcePasteAsPlainText; h = "html" == f || "html" == d.preSniffing ? "html" : c(e); delete a._.nextPasteType; "htmlifiedtext" == h && (e = b(a.config, e)); if ("text" == f && "html" == h) e = m(a, e, k.get("plain-text")); else if (n && a.pasteFilter && !d.dontFilter || y) e = m(a, e, a.pasteFilter); d.startsWithEOL && (e = '\x3cbr data-cke-eol\x3d"1"\x3e' + e); d.endsWithEOL && (e += '\x3cbr data-cke-eol\x3d"1"\x3e'); "auto" ==
                            f && (f = "html" == h || "html" == l ? "html" : "text"); d.type = f; d.dataValue = e; delete d.preSniffing; delete d.startsWithEOL; delete d.endsWithEOL
                }, null, null, 6); a.on("paste", function (b) { b = b.data; b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () { a.fire("afterPaste") }, 0)) }, null, null, 1E3); a.on("pasteDialog", function (b) { setTimeout(function () { a.openDialog("paste", b.data) }, 0) })
            }
        }); CKEDITOR.plugins.clipboard = {
            isCustomCopyCutSupported: (!CKEDITOR.env.ie || 16 <= CKEDITOR.env.version) && !CKEDITOR.env.iOS,
            isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version, isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version, mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste", addPasteButton: function (a, b, d) { a.ui.addButton && (a.ui.addButton(b, d), a._.pasteButtons || (a._.pasteButtons = []), a._.pasteButtons.push(b)) }, canClipboardApiBeTrusted: function (a, b) {
                return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") ||
                    a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ? !0 : !1
            }, getDropTarget: function (a) { var b = a.editable(); return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document }, fixSplitNodesAfterDrop: function (a, b, d, c) {
                function f(a, d, c) {
                    var g = a; g.type == CKEDITOR.NODE_TEXT && (g = a.getParent()); if (g.equals(d) && c != d.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), d = b.startContainer.getChild(b.startOffset),
                        a && a.type == CKEDITOR.NODE_TEXT && d && d.type == CKEDITOR.NODE_TEXT && (c = a.getLength(), a.setText(a.getText() + d.getText()), d.remove(), b.setStart(a, c), b.collapse(!0)), !0
                } var e = b.startContainer; "number" == typeof c && "number" == typeof d && e.type == CKEDITOR.NODE_ELEMENT && (f(a.startContainer, e, d) || f(a.endContainer, e, c))
            }, isDropRangeAffectedByDragRange: function (a, b) {
                var d = b.startContainer, c = b.endOffset; return a.endContainer.equals(d) && a.endOffset <= c || a.startContainer.getParent().equals(d) && a.startContainer.getIndex() <
                    c || a.endContainer.getParent().equals(d) && a.endContainer.getIndex() < c ? !0 : !1
            }, internalDrop: function (b, d, c, f) {
                var e = CKEDITOR.plugins.clipboard, h = f.editable(), k, l; f.fire("saveSnapshot"); f.fire("lockSnapshot", { dontUpdate: 1 }); CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, d, e.dragStartContainerChildCount, e.dragEndContainerChildCount); (l = this.isDropRangeAffectedByDragRange(b, d)) || (k = b.createBookmark(!1)); e = d.clone().createBookmark(!1); l && (k = b.createBookmark(!1)); b = k.startNode; d =
                    k.endNode; l = e.startNode; d && b.getPosition(l) & CKEDITOR.POSITION_PRECEDING && d.getPosition(l) & CKEDITOR.POSITION_FOLLOWING && l.insertBefore(b); b = f.createRange(); b.moveToBookmark(k); h.extractHtmlFromRange(b, 1); d = f.createRange(); e.startNode.getCommonAncestor(h) || (e = f.getSelection().createBookmarks()[0]); d.moveToBookmark(e); a(f, { dataTransfer: c, method: "drop", range: d }, 1); f.fire("unlockSnapshot")
            }, getRangeAtDropPosition: function (a, b) {
                var d = a.data.$, c = d.clientX, f = d.clientY, e = b.getSelection(!0).getRanges()[0],
                h = b.createRange(); if (a.data.testRange) return a.data.testRange; if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(c, f)) d = b.document.$.caretRangeFromPoint(c, f), h.setStart(CKEDITOR.dom.node(d.startContainer), d.startOffset), h.collapse(!0); else if (d.rangeParent) h.setStart(CKEDITOR.dom.node(d.rangeParent), d.rangeOffset), h.collapse(!0); else {
                    if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && e && b.editable().hasFocus) return e; if (document.body.createTextRange) {
                        b.focus(); d = b.document.getBody().$.createTextRange();
                        try {
                            for (var k = !1, l = 0; 20 > l && !k; l++) { if (!k) try { d.moveToPoint(c, f - l), k = !0 } catch (m) { } if (!k) try { d.moveToPoint(c, f + l), k = !0 } catch (t) { } } if (k) { var y = "cke-temp-" + (new Date).getTime(); d.pasteHTML('\x3cspan id\x3d"' + y + '"\x3e​\x3c/span\x3e'); var C = b.document.getById(y); h.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START); C.remove() } else {
                                var A = b.document.$.elementFromPoint(c, f), B = new CKEDITOR.dom.element(A), H; if (B.equals(b.editable()) || "html" == B.getName()) return e && e.startContainer && !e.startContainer.equals(b.editable()) ?
                                    e : null; H = B.getClientRect(); c < H.left ? h.setStartAt(B, CKEDITOR.POSITION_AFTER_START) : h.setStartAt(B, CKEDITOR.POSITION_BEFORE_END); h.collapse(!0)
                            }
                        } catch (F) { return null }
                    } else return null
                } return h
            }, initDragDataTransfer: function (a, b) { var d = a.data.$ ? a.data.$.dataTransfer : null, c = new this.dataTransfer(d, b); "dragstart" === a.name && c.storeId(); d ? this.dragData && c.id == this.dragData.id ? c = this.dragData : this.dragData = c : this.dragData ? c = this.dragData : this.dragData = c; a.data.dataTransfer = c }, resetDragDataTransfer: function () {
            this.dragData =
                null
            }, initPasteDataTransfer: function (a, b) { if (this.isCustomCopyCutSupported) { if (a && a.data && a.data.$) { var d = a.data.$.clipboardData, c = new this.dataTransfer(d, b); "copy" !== a.name && "cut" !== a.name || c.storeId(); this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = d) : this.copyCutData = c; return c } return new this.dataTransfer(null, b) } return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b) }, preventDefaultDropOnElement: function (a) { a && a.on("dragover", l) }
        }; k = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ?
            "cke/id" : "Text"; CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
                a && (this.$ = a); this._ = { metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g, data: {}, files: [], nativeHtmlCache: "", normalizeType: function (a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a } }; this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this); this.id = this.getData(k); this.id || (this.id = "Text" == k ? "" : "cke-" +
                    CKEDITOR.tools.getUniqueId()); b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == k || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
            }; CKEDITOR.DATA_TRANSFER_INTERNAL = 1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                getData: function (a, b) {
                    a = this._.normalizeType(a); var d = "text/html" == a && b ? this._.nativeHtmlCache : this._.data[a]; if (void 0 === d || null === d || "" ===
                        d) { if (this._.fallbackDataTransfer.isRequired()) d = this._.fallbackDataTransfer.getData(a, b); else try { d = this.$.getData(a) || "" } catch (c) { d = "" } "text/html" != a || b || (d = this._stripHtml(d)) } "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == d.substring(0, 7) && (d = ""); if ("string" === typeof d) var f = d.indexOf("\x3c/html\x3e"), d = -1 !== f ? d.substring(0, f + 7) : d; return d
                }, setData: function (a, b) {
                    a = this._.normalizeType(a); "text/html" == a ? (this._.data[a] = this._stripHtml(b), this._.nativeHtmlCache = b) : this._.data[a] =
                        b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) if ("Text" == k && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b); else try { this.$.setData(a, b) } catch (d) { }
                }, storeId: function () { "Text" !== k && this.setData(k, this.id) }, getTransferType: function (a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL }, cacheData: function () {
                    function a(d) {
                        d =
                        b._.normalizeType(d); var c = b.getData(d); "text/html" == d && (b._.nativeHtmlCache = b.getData(d, !0), c = b._stripHtml(c)); c && (b._.data[d] = c)
                    } if (this.$) {
                        var b = this, d, c; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (d = 0; d < this.$.types.length; d++)a(this.$.types[d]) } else a("Text"), a("URL"); c = this._getImageFromClipboard(); if (this.$ && this.$.files || c) {
                            this._.files = []; if (this.$.files && this.$.files.length) for (d = 0; d < this.$.files.length; d++)this._.files.push(this.$.files[d]); 0 === this._.files.length &&
                                c && this._.files.push(c)
                        }
                    }
                }, getFilesCount: function () { return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 }, getFile: function (a) { return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ? this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0 }, isEmpty: function () {
                    var a = {}, b; if (this.getFilesCount()) return !1; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(this._.data), function (b) {
                    a[b] =
                        1
                    }); if (this.$) if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (var d = 0; d < this.$.types.length; d++)a[this.$.types[d]] = 1 } else a.Text = 1, a.URL = 1; "Text" != k && (a[k] = 0); for (b in a) if (a[b] && "" !== this.getData(b)) return !1; return !0
                }, _getImageFromClipboard: function () { var a; try { if (this.$ && this.$.items && this.$.items[0] && (a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) { } }, _stripHtml: function (a) {
                    if (a && a.length) {
                        a = a.replace(this._.metaRegExp, ""); var b = this._.bodyRegExp.exec(a);
                        b && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, ""))
                    } return a
                }
            }; CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) { this._dataTransfer = a; this._customDataFallbackType = "text/html" }; CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported = null; CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = []; CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
                isRequired: function () {
                    var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer, b = this._dataTransfer.$; if (null ===
                        a._isCustomMimeTypeSupported) if (b) { a._isCustomMimeTypeSupported = !1; if (CKEDITOR.env.edge && 17 <= CKEDITOR.env.version) return !0; try { b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest") } catch (d) { } } else return !1; return !a._isCustomMimeTypeSupported
                }, getData: function (a, b) {
                    var d = this._getData(this._customDataFallbackType, !0); if (b) return d; var d = this._extractDataComment(d), c = null, c = a === this._customDataFallbackType ?
                        d.content : d.data && d.data[a] ? d.data[a] : this._getData(a, !0); return null !== c ? c : ""
                }, setData: function (a, b) {
                    var d = a === this._customDataFallbackType; d && (b = this._applyDataComment(b, this._getFallbackTypeData())); var c = b, f = this._dataTransfer.$; try { f.setData(a, c), d && (this._dataTransfer._.nativeHtmlCache = c) } catch (e) {
                        if (this._isUnsupportedMimeTypeError(e)) {
                            d = CKEDITOR.plugins.clipboard.fallbackDataTransfer; -1 === CKEDITOR.tools.indexOf(d._customTypes, a) && d._customTypes.push(a); var d = this._getFallbackTypeContent(),
                                h = this._getFallbackTypeData(); h[a] = c; try { c = this._applyDataComment(d, h), f.setData(this._customDataFallbackType, c), this._dataTransfer._.nativeHtmlCache = c } catch (k) { c = "" }
                        }
                    } return c
                }, _getData: function (a, b) { var d = this._dataTransfer._.data; if (!b && d[a]) return d[a]; try { return this._dataTransfer.$.getData(a) } catch (c) { return null } }, _getFallbackTypeContent: function () {
                    var a = this._dataTransfer._.data[this._customDataFallbackType]; a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content);
                    return a
                }, _getFallbackTypeData: function () { var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes, b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {}, d = this._dataTransfer._.data; CKEDITOR.tools.array.forEach(a, function (a) { void 0 !== d[a] ? b[a] = d[a] : void 0 !== b[a] && (b[a] = b[a]) }, this); return b }, _isUnsupportedMimeTypeError: function (a) { return a.message && -1 !== a.message.search(/element not found/gi) }, _extractDataComment: function (a) {
                    var b = { data: null, content: a || "" }; if (a &&
                        16 < a.length) { var d; (d = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && d[1] && (b.data = JSON.parse(decodeURIComponent(d[1])), b.content = a.replace(d[0], "")) } return b
                }, _applyDataComment: function (a, b) { var d = ""; b && CKEDITOR.tools.object.keys(b).length && (d = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e"); return d + (a && a.length ? a : "") }
            }
    }(), CKEDITOR.config.clipboard_notificationDuration = 1E4, function () {
        CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } });
        CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a, c) { c && CKEDITOR.tools.extend(this, c); CKEDITOR.tools.extend(this, { className: "", css: [] }); this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} } }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
            e = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'), c = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e'); CKEDITOR.ui.panel.prototype = {
                render: function (b,
                    f) {
                        var m = { editorId: b.id, id: this.id, langCode: b.langCode, dir: b.lang.dir, cls: this.className, frame: "", env: CKEDITOR.env.cssClass, "z-index": b.config.baseFloatZIndex + 1 }; this.getHolderElement = function () {
                            var a = this._.holder; if (!a) {
                                if (this.isFramed) {
                                    var a = this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = !0; if (this.onLoad) this.onLoad() },
                                        this)); a.write(c.output(CKEDITOR.tools.extend({ css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" + b + ");" }, m))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on("keydown", function (a) {
                                            var b = a.data.getKeystroke(), d = this.document.getById(this.id).getAttribute("dir"); if ("input" !== a.data.getTarget().getName() || 37 !== b && 39 !== b) this._.onKeyDown && !1 === this._.onKeyDown(b) ? "input" === a.data.getTarget().getName() && 32 === b || a.data.preventDefault() : (27 == b || b == ("rtl" == d ? 39 : 37)) &&
                                                this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
                                        }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                                } else a = this.document.getById(this.id); this._.holder = a
                            } return a
                        }; if (this.isFramed) { var h = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; m.frame = e.output({ id: this.id + "_frame", src: h }) } h = a.output(m); f &&
                            f.push(h); return h
                }, addBlock: function (a, c) { c = this._.blocks[a] = c instanceof CKEDITOR.ui.panel.block ? c : new CKEDITOR.ui.panel.block(this.getHolderElement(), c); this._.currentBlock || this.showBlock(a); return c }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) {
                    a = this._.blocks[a]; var c = this._.currentBlock, e = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); c && c.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", e); a._.focusIndex = -1; this._.onKeyDown =
                        a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a
                }, destroy: function () { this.element && this.element.remove() }
            }; CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                $: function (a, c) {
                this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); c && CKEDITOR.tools.extend(this, c); this.element.setAttributes({
                    role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title ||
                        this.attributes["aria-label"]
                }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu()
                }, _: {
                    markItem: function (a) { -1 != a && (a = this._.getItems().getItem(this._.focusIndex = a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a)) }, markFirstDisplayed: function (a) {
                        for (var c = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display") }, e = this._.getItems(), h, l, d = e.count() - 1; 0 <= d; d--)if (h = e.getItem(d), h.getAscendant(c) || (l = h, this._.focusIndex =
                            d), "true" == h.getAttribute("aria-selected")) { l = h; this._.focusIndex = d; break } l && (a && a(), CKEDITOR.env.webkit && l.getDocument().getWindow().focus(), l.focus(), this.onMark && this.onMark(l))
                    }, getItems: function () { return this.element.find("a,input") }
                }, proto: {
                    show: function () { this.element.setStyle("display", "") }, hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") }, onKeyDown: function (a, c) {
                        var e = this.keys[a]; switch (e) {
                            case "next": for (var h = this._.focusIndex, e = this._.getItems(),
                                l; l = e.getItem(++h);)if (l.getAttribute("_cke_focus") && l.$.offsetWidth) { this._.focusIndex = h; l.focus(!0); break } return l || c ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1)); case "prev": h = this._.focusIndex; for (e = this._.getItems(); 0 < h && (l = e.getItem(--h));) { if (l.getAttribute("_cke_focus") && l.$.offsetWidth) { this._.focusIndex = h; l.focus(!0); break } l = null } return l || c ? !1 : (this._.focusIndex = e.count(), this.onKeyDown(a, 1)); case "click": case "mouseup": return h = this._.focusIndex, (l = 0 <= h && this._.getItems().getItem(h)) &&
                                    l.fireEventHandler(e, { button: CKEDITOR.tools.normalizeMouseButton(CKEDITOR.MOUSE_BUTTON_LEFT, !0) }), !1
                        }return !0
                    }
                }
            })
    }(), CKEDITOR.plugins.add("floatpanel", { requires: "panel" }), function () {
        function a(a, b, f, m, h) { h = CKEDITOR.tools.genKey(b.getUniqueId(), f.getUniqueId(), a.lang.dir, a.uiColor || "", m.css || "", h || ""); var l = e[h]; l || (l = e[h] = new CKEDITOR.ui.panel(b, m), l.element = f.append(CKEDITOR.dom.element.createFromHtml(l.render(a), b)), l.element.setStyles({ display: "none", position: "absolute" })); return l } var e = {}; CKEDITOR.ui.floatPanel =
            CKEDITOR.tools.createClass({
                $: function (c, b, f, e) {
                    function h() { g.hide() } f.forceIFrame = 1; f.toolbarRelated && c.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (b = CKEDITOR.document.getById("cke_" + c.name)); var l = b.getDocument(); e = a(c, l, b, f, e || 0); var d = e.element, k = d.getFirst(), g = this; d.disableContextMenu(); this.element = d; this._ = { editor: c, panel: e, parentElement: b, definition: f, document: l, iframe: k, children: [], dir: c.lang.dir, showBlockParams: null, markFirst: void 0 !== f.markFirst ? f.markFirst : !0 }; c.on("mode", h); c.on("resize",
                        h); l.getWindow().on("resize", function () { this.reposition() }, this)
                }, proto: {
                    addBlock: function (a, b) { return this._.panel.addBlock(a, b) }, addListBlock: function (a, b) { return this._.panel.addListBlock(a, b) }, getBlock: function (a) { return this._.panel.getBlock(a) }, showBlock: function (a, b, f, e, h, l) {
                        var d = this._.panel, k = d.showBlock(a); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var g = this._.editor.editable(); this._.returnFocus = g.hasFocus ? g : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                        this._.hideTimeout = 0; var n = this.element, g = this._.iframe, g = CKEDITOR.env.ie && !CKEDITOR.env.edge ? g : new CKEDITOR.dom.window(g.$.contentWindow), p = n.getDocument(), w = this._.parentElement.getPositionedAncestor(), v = b.getDocumentPosition(p), p = w ? w.getDocumentPosition(p) : { x: 0, y: 0 }, q = "rtl" == this._.dir, u = v.x + (e || 0) - p.x, x = v.y + (h || 0) - p.y; !q || 1 != f && 4 != f ? q || 2 != f && 3 != f || (u += b.$.offsetWidth - 1) : u += b.$.offsetWidth; if (3 == f || 4 == f) x += b.$.offsetHeight - 1; this._.panel._.offsetParentId = b.getId(); n.setStyles({
                            top: x + "px", left: 0,
                            display: ""
                        }); n.setOpacity(0); n.getFirst().removeStyle("width"); this._.editor.focusManager.add(g); this._.blurSet || (CKEDITOR.event.useCapture = !0, g.on("blur", function (a) { function b() { delete this._.returnFocus; this.hide() } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this)) }, this), g.on("focus", function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) },
                            this), CKEDITOR.env.iOS && (g.on("touchstart", function () { clearTimeout(this._.hideTimeout) }, this), g.on("touchend", function () { this._.hideTimeout = 0; this.focus() }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1); d.onEscape = CKEDITOR.tools.bind(function (a) { if (this.onEscape && !1 === this.onEscape(a)) return !1 }, this); CKEDITOR.tools.setTimeout(function () {
                                var a = CKEDITOR.tools.bind(function () {
                                    var a = n; a.removeStyle("width"); if (k.autoSize) {
                                        var b = k.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ?
                                            k.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle("width", b + 10 + "px"); b = k.element.$.scrollHeight; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3); a.setStyle("height", b + "px"); d._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                    } else a.removeStyle("height"); q && (u -= n.$.offsetWidth); n.setStyle("left", u + "px"); var b = d.element.getWindow(), a = n.$.getBoundingClientRect(),
                                        b = b.getViewPaneSize(), c = a.width || a.right - a.left, f = a.height || a.bottom - a.top, e = q ? a.right : b.width - a.left, g = q ? b.width - a.right : a.left; q ? e < c && (u = g > c ? u + c : b.width > c ? u - a.left : u - a.right + b.width) : e < c && (u = g > c ? u - c : b.width > c ? u - a.right + b.width : u - a.left); c = a.top; b.height - a.top < f && (x = c > f ? x - f : b.height > f ? x - a.bottom + b.height : x - a.top); CKEDITOR.env.ie && !CKEDITOR.env.edge && (b = a = new CKEDITOR.dom.element(n.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (u = CKEDITOR.env.ie8Compat ?
                                            u - 2 * n.getDocument().getDocumentElement().$.scrollLeft : u - (a.$.scrollWidth - a.$.clientWidth))); var a = n.getFirst(), h; (h = a.getCustomData("activePanel")) && h.onHide && h.onHide.call(this, 1); a.setCustomData("activePanel", this); n.setStyles({ top: x + "px", left: u + "px" }); n.setOpacity(1); l && l()
                                }, this); d.isLoaded ? a() : d.onLoad = a; CKEDITOR.tools.setTimeout(function () {
                                    var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); k.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop =
                                        a); this.allowBlur(!0); this._.markFirst && (CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () { k.markFirstDisplayed ? k.markFirstDisplayed() : k._.markFirstDisplayed() }, 0) : k.markFirstDisplayed ? k.markFirstDisplayed() : k._.markFirstDisplayed()); this._.editor.fire("panelShow", this)
                                }, 0, this)
                            }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                    }, reposition: function () { var a = this._.showBlockParams; this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a)) }, focus: function () {
                        if (CKEDITOR.env.webkit) {
                            var a =
                                CKEDITOR.document.getActive(); a && !a.equals(this._.iframe) && a.$.blur()
                        } (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                    }, blur: function () { var a = this._.iframe.getFrameDocument().getActive(); a && a.is("a") && (this._.lastFocused = a) }, hide: function (a) {
                        if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                            this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel");
                            if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus(); delete this._.lastFocused; this._.showBlockParams = null; this._.editor.fire("panelHide", this)
                        }
                    }, allowBlur: function (a) { var b = this._.panel; void 0 !== a && (b.allowBlur = a); return b.allowBlur }, showAsChild: function (a, b, f, e, h, l) {
                        if (this._.activeChild != a || a._.panel._.offsetParentId != f.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) },
                            this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, f, e, h, l), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () { a.element.getChild(0).$.style.cssText += "" }, 100)
                    }, hideChild: function (a) { var b = this._.activeChild; b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus()) }
                }
            }); CKEDITOR.on("instanceDestroyed", function () { var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances), b; for (b in e) { var f = e[b]; a ? f.destroy() : f.element.hide() } a && (e = {}) })
    }(), CKEDITOR.plugins.add("menu",
        { requires: "floatpanel", beforeInit: function (a) { for (var e = a.config.menu_groups.split(","), c = a._.menuGroups = {}, b = a._.menuItems = {}, f = 0; f < e.length; f++)c[e[f]] = f + 1; a.addMenuGroup = function (a, b) { c[a] = b || 100 }; a.addMenuItem = function (a, f) { c[f.group] && (b[a] = new CKEDITOR.menuItem(this, a, f)) }; a.addMenuItems = function (a) { for (var b in a) this.addMenuItem(b, a[b]) }; a.getMenuItem = function (a) { return b[a] }; a.removeMenuItem = function (a) { delete b[a] } } }), function () {
            function a(a) {
                a.sort(function (a, b) {
                    return a.group < b.group ?
                        -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0
                })
            } var e = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"', c = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac &&
                (e += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (e += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"'); CKEDITOR.env.ie && (c = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var e = e + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" onclick\x3d"' + c + 'CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e') +
                    '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e', b = CKEDITOR.addTemplate("menuItem", e), f = CKEDITOR.addTemplate("menuArrow",
                        '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'), m = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
                            $: function (a, b) {
                                b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; var d = CKEDITOR.tools.extend({}, b.panel, {
                                    css: [CKEDITOR.skin.getPath("editor")], level: this._.level -
                                        1, block: {}
                                }), c = d.block.attributes = d.attributes || {}; !c.role && (c.role = "menu"); this._.panelDefinition = d
                            }, _: {
                                onShow: function () { var a = this.editor.getSelection(), b = a && a.getStartElement(), d = this.editor.elementPath(), c = this._.listeners; this.removeAll(); for (var f = 0; f < c.length; f++) { var e = c[f](b, a, d); if (e) for (var m in e) { var w = this.editor.getMenuItem(m); !w || w.command && !this.editor.getCommand(w.command).state || (w.state = e[m], this.add(w)) } } }, onClick: function (a) {
                                    this.hide(); if (a.onClick) a.onClick(); else a.command &&
                                        this.editor.execCommand(a.command)
                                }, onEscape: function (a) { var b = this.parent; b ? b._.panel.hideChild(1) : 27 == a && this.hide(1); return !1 }, onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                                    var b = this._.subMenu, d = this.items[a]; if (d = d.getItems && d.getItems()) {
                                        b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (var c in d) {
                                            var f = this.editor.getMenuItem(c);
                                            f && (f.state = d[c], b.add(f))
                                        } var e = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a)); setTimeout(function () { b.show(e, 2) }, 0)
                                    } else this._.panel.hideChild(1)
                                }
                            }, proto: {
                                add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (b, c, d, f) {
                                    if (!this.parent && (this._.onShow(), !this.items.length)) return; c = c || ("rtl" == this.editor.lang.dir ? 2 : 1); var e = this.items, m = this.editor, p = this._.panel, w = this._.element; if (!p) {
                                        p = this._.panel =
                                        new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level); p.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); p.onShow = function () { p._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") }; p.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); w = p.addBlock(this.id, this._.panelDefinition.block); w.autoSize = !0; var v = w.keys; v[40] = "next"; v[9] = "next"; v[38] = "prev"; v[CKEDITOR.SHIFT +
                                            9] = "prev"; v["rtl" == m.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; v[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (v[13] = "mouseup"); w = this._.element = w.element; v = w.getDocument(); v.getBody().setStyle("overflow", "hidden"); v.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) { clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, m.config.menu_subMenuDelay || 400, this, [a]) },
                                                this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this); this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                                    } a(e); for (var v = m.elementPath(), v = ['\x3cdiv class\x3d"cke_menu' + (v && v.direction() != m.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], q = e.length, u = q && e[0].group, x = 0; x < q; x++) {
                                        var r =
                                            e[x]; u != r.group && (v.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), u = r.group); r.render(this, x, v)
                                    } v.push("\x3c/div\x3e"); w.setHtml(v.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(p, this.id, b, c, d, f) : p.showBlock(this.id, b, c, d, f); m.fire("menuShow", [p])
                                }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }, findItemByCommandName: function (a) {
                                    var b = CKEDITOR.tools.array.filter(this.items,
                                        function (b) { return a === b.command }); return b.length ? (b = b[0], { item: b, element: this._.element.findOne("." + b.className) }) : null
                                }
                            }
                        }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                            $: function (a, b, d) { CKEDITOR.tools.extend(this, d, { order: 0, className: "cke_menubutton__" + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b }, proto: {
                                render: function (a, c, d) {
                                    var e = a.id + String(c), g = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, n = "", p = this.editor, w, v, q = g == CKEDITOR.TRISTATE_ON ? "on" : g == CKEDITOR.TRISTATE_DISABLED ?
                                        "disabled" : "off"; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (n = ' aria-checked\x3d"' + (g == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var u = this.getItems, x = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", r = this.name; this.icon && !/\./.test(this.icon) && (r = this.icon); this.command && (w = p.getCommand(this.command), (w = p.getCommandKeystroke(w)) && (v = CKEDITOR.tools.keystrokeToString(p.lang.common.keyboard, w))); a = {
                                            id: e, name: this.name, iconName: r, label: this.label, cls: this.className || "", state: q, hasPopup: u ?
                                                "true" : "false", disabled: g == CKEDITOR.TRISTATE_DISABLED, title: this.label + (v ? " (" + v.display + ")" : ""), ariaShortcut: v ? p.lang.common.keyboardShortcut + " " + v.aria : "", href: "javascript:void('" + (this.label || "").replace("'") + "')", hoverFn: a._.itemOverFn, moveOutFn: a._.itemOutFn, clickFn: a._.itemClickFn, index: c, iconStyle: CKEDITOR.skin.getIconStyle(r, "rtl" == this.editor.lang.dir, r == this.icon ? null : this.icon, this.iconOffset), shortcutHtml: v ? m.output({ shortcut: v.display }) : "", arrowHtml: u ? f.output({ label: x }) : "", role: this.role ?
                                                    this.role : "menuitem", ariaChecked: n
                                        }; b.output(a, d)
                                }
                            }
                        })
        }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div", CKEDITOR.plugins.add("contextmenu", {
            requires: "menu", onLoad: function () {
                CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                    base: CKEDITOR.menu, $: function (a) {
                        this.base.call(this, a, {
                            panel: {
                                css: a.config.contextmenu_contentsCss, className: "cke_menu_panel",
                                attributes: { "aria-label": a.lang.contextmenu.options }
                            }
                        })
                    }, proto: {
                        addTarget: function (a, e) {
                            function c() { f = !1 } var b, f; a.on("contextmenu", function (a) {
                                a = a.data; var c = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!e || !c) if (a.preventDefault(), !f) {
                                    if (CKEDITOR.env.mac && CKEDITOR.env.webkit) { var c = this.editor, d = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function (a) { return a.hasAttribute("contenteditable") }, !0); d && "false" == d.getAttribute("contenteditable") && c.getSelection().fake(d) } var d =
                                        a.getTarget().getDocument(), k = a.getTarget().getDocument().getDocumentElement(), c = !d.equals(CKEDITOR.document), d = d.getWindow().getScrollPosition(), g = c ? a.$.clientX : a.$.pageX || d.x + a.$.clientX, m = c ? a.$.clientY : a.$.pageY || d.y + a.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(k, null, g, m) }, CKEDITOR.env.ie ? 200 : 0, this)
                                }
                            }, this); if (CKEDITOR.env.webkit) { var m = function () { b = 0 }; a.on("keydown", function (a) { b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); a.on("keyup", m); a.on("contextmenu", m) } CKEDITOR.env.gecko &&
                                !CKEDITOR.env.mac && (a.on("keydown", function (a) { a.data.$.shiftKey && 121 === a.data.$.keyCode && (f = !0) }, null, null, 0), a.on("keyup", c), a.on("contextmenu", c))
                        }, open: function (a, e, c, b) { !1 !== this.editor.config.enableContextMenu && this.editor.getSelection().getType() !== CKEDITOR.SELECTION_NONE && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, e, c, b)) }
                    }
                })
            }, beforeInit: function (a) {
                var e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a); a.on("contentDom", function () {
                    e.addTarget(a.editable(),
                        !1 !== a.config.browserContextMenuOnCtrl)
                }); a.addCommand("contextMenu", { exec: function (a) { var b = 0, f = 0, e = a.getSelection().getRanges(), e = e[e.length - 1].getClientRects(a.editable().isInline()); if (e = e[e.length - 1]) b = e["rtl" === a.lang.dir ? "left" : "right"], f = e.bottom; a.contextMenu.open(a.document.getBody().getParent(), null, b, f) } }); a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
            }
        }), function () {
            function a(a, c) {
                function h(b) {
                    b = g.list[b]; var d; b.equals(a.editable()) ||
                        "true" == b.getAttribute("contenteditable") ? (d = a.createRange(), d.selectNodeContents(b), d = d.select()) : (d = a.getSelection(), d.selectElement(b)); CKEDITOR.env.ie && a.fire("selectionChange", { selection: d, path: new CKEDITOR.dom.elementPath(b) }); a.focus()
                } function l() { k && k.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete g.list } var d = a.ui.spaceId("path"), k, g = a._.elementsPath, n = g.idBase; c.html += '\x3cspan id\x3d"' + d + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel +
                    '\x3c/span\x3e\x3cspan id\x3d"' + d + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + d + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e'; a.on("uiReady", function () { var b = a.ui.space("path"); b && a.focusManager.add(b, 1) }); g.onClick = h; var p = CKEDITOR.tools.addFunction(h), w = CKEDITOR.tools.addFunction(function (b, d) {
                        var c = g.idBase, e; d = new CKEDITOR.dom.event(d); e = "rtl" == a.lang.dir; switch (d.getKeystroke()) {
                            case e ? 39 : 37: case 9: return (e = CKEDITOR.document.getById(c +
                                (b + 1))) || (e = CKEDITOR.document.getById(c + "0")), e.focus(), !1; case e ? 37 : 39: case CKEDITOR.SHIFT + 9: return (e = CKEDITOR.document.getById(c + (b - 1))) || (e = CKEDITOR.document.getById(c + (g.list.length - 1))), e.focus(), !1; case 27: return a.focus(), !1; case 13: case 32: return h(b), !1
                        }return !0
                    }); a.on("selectionChange", function (c) {
                        for (var e = [], h = g.list = [], l = [], m = g.filters, z = !0, t = c.data.path.elements, y = t.length; y--;) {
                            var C = t[y], A = 0; c = C.data("cke-display-name") ? C.data("cke-display-name") : C.data("cke-real-element-type") ? C.data("cke-real-element-type") :
                                C.getName(); (z = C.hasAttribute("contenteditable") ? "true" == C.getAttribute("contenteditable") : z) || C.hasAttribute("contenteditable") || (A = 1); for (var B = 0; B < m.length; B++) { var H = m[B](C, c); if (!1 === H) { A = 1; break } c = H || c } A || (h.unshift(C), l.unshift(c))
                        } h = h.length; for (m = 0; m < h; m++)c = l[m], z = a.lang.elementspath.eleTitle.replace(/%1/, c), c = b.output({ id: n + m, label: z, text: c, jsTitle: "javascript:void('" + c + "')", index: m, keyDownFn: w, clickFn: p }), e.unshift(c); k || (k = CKEDITOR.document.getById(d)); l = k; l.setHtml(e.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
                        a.fire("elementsPathUpdate", { space: l })
                    }); a.on("readOnly", l); a.on("contentDomUnload", l); a.addCommand("elementsPathFocus", e.toolbarFocus); a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
            } var e = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } }, c = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (c += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
            var b = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + c + ' hidefocus\x3d"true"  draggable\x3d"false"  ondragstart\x3d"return false;" onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e'); CKEDITOR.plugins.add("elementspath", {
                init: function (b) {
                    b._.elementsPath =
                    { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; b.on("uiSpace", function (c) { "bottom" == c.data.space && a(b, c.data) })
                }
            })
        }(), function () {
            function a(a, f) {
                var m, h; f.on("refresh", function (a) { var b = [e], f; for (f in a.data.states) b.push(a.data.states[f]); this.setState(CKEDITOR.tools.search(b, c) ? c : e) }, f, null, 100); f.on("exec", function (c) { m = a.getSelection(); h = m.createBookmarks(1); c.data || (c.data = {}); c.data.done = !1 }, f, null, 0); f.on("exec", function () { a.forceNextSelectionCheck(); m.selectBookmarks(h) },
                    f, null, 100)
            } var e = CKEDITOR.TRISTATE_DISABLED, c = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
                init: function (b) {
                    var c = CKEDITOR.plugins.indent.genericDefinition; a(b, b.addCommand("indent", new c(!0))); a(b, b.addCommand("outdent", new c)); b.ui.addButton && (b.ui.addButton("Indent", { label: b.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }), b.ui.addButton("Outdent", { label: b.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" })); b.on("dirChanged", function (a) {
                        var c =
                            b.createRange(), e = a.data.node; c.setStartBefore(e); c.setEndAfter(e); for (var d = new CKEDITOR.dom.walker(c), f; f = d.next();)if (f.type == CKEDITOR.NODE_ELEMENT) if (!f.equals(e) && f.getDirection()) c.setStartAfter(f), d = new CKEDITOR.dom.walker(c); else {
                                var g = b.config.indentClasses; if (g) for (var n = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"], p = 0; p < g.length; p++)f.hasClass(g[p] + n[0]) && (f.removeClass(g[p] + n[0]), f.addClass(g[p] + n[1])); g = f.getStyle("margin-right"); n = f.getStyle("margin-left"); g ? f.setStyle("margin-left", g) :
                                    f.removeStyle("margin-left"); n ? f.setStyle("margin-right", n) : f.removeStyle("margin-right")
                            }
                    })
                }
            }); CKEDITOR.plugins.indent = {
                genericDefinition: function (a) { this.isIndent = !!a; this.startDisabled = !this.isIndent }, specificDefinition: function (a, c, e) { this.name = c; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!e; this.relatedGlobal = e ? "indent" : "outdent"; this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9; this.database = {} }, registerCommands: function (a, c) {
                    a.on("pluginsLoaded", function () {
                        for (var a in c) (function (a,
                            b) { var d = a.getCommand(b.relatedGlobal), c; for (c in b.jobs) d.on("exec", function (d) { d.data.done || (a.fire("lockSnapshot"), b.execJob(a, c) && (d.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database)) }, this, null, c), d.on("refresh", function (d) { d.data.states || (d.data.states = {}); d.data.states[b.name + "@" + c] = b.refreshJob(a, c, d.data.path) }, this, null, c); a.addFeature(b) })(this, c[a])
                    })
                }
            }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype =
                { execJob: function (a, c) { var m = this.jobs[c]; if (m.state != e) return m.exec.call(this, a) }, refreshJob: function (a, c, m) { c = this.jobs[c]; a.activeFilter.checkFeature(this) ? c.state = c.refresh.call(this, a, m) : c.state = e; return c.state }, getContext: function (a) { return a.contains(this.context) } }
        }(), function () {
            function a(a) {
                function b(d) {
                    for (var e = m.startContainer, r = m.endContainer; e && !e.getParent().equals(d);)e = e.getParent(); for (; r && !r.getParent().equals(d);)r = r.getParent(); if (!e || !r) return !1; for (var z = [], t = !1; !t;)e.equals(r) &&
                        (t = !0), z.push(e), e = e.getNext(); if (1 > z.length) return !1; e = d.getParents(!0); for (r = 0; r < e.length; r++)if (e[r].getName && h[e[r].getName()]) { d = e[r]; break } for (var e = f.isIndent ? 1 : -1, r = z[0], z = z[z.length - 1], t = CKEDITOR.plugins.list.listToArray(d, g), y = t[z.getCustomData("listarray_index")].indent, r = r.getCustomData("listarray_index"); r <= z.getCustomData("listarray_index"); r++)if (t[r].indent += e, 0 < e) {
                            for (var C = t[r].parent, A = r - 1; 0 <= A; A--)if (t[A].indent === e) { C = t[A].parent; break } t[r].parent = new CKEDITOR.dom.element(C.getName(),
                                C.getDocument())
                        } for (r = z.getCustomData("listarray_index") + 1; r < t.length && t[r].indent > y; r++)t[r].indent += e; e = CKEDITOR.plugins.list.arrayToList(t, g, null, a.config.enterMode, d.getDirection()); if (!f.isIndent) { var B; if ((B = d.getParent()) && B.is("li")) for (var z = e.listNode.getChildren(), q = [], w, r = z.count() - 1; 0 <= r; r--)(w = z.getItem(r)) && w.is && w.is("li") && q.push(w) } e && e.listNode.replace(d); if (q && q.length) for (r = 0; r < q.length; r++) {
                            for (w = d = q[r]; (w = w.getNext()) && w.is && w.getName() in h;)CKEDITOR.env.needsNbspFiller && !d.getFirst(c) &&
                                d.append(m.document.createText(" ")), d.append(w); d.insertAfter(B)
                        } e && a.fire("contentDomInvalidated"); return !0
                } for (var f = this, g = this.database, h = this.context, m, w = a.getSelection(), w = (w && w.getRanges()).createIterator(); m = w.getNextRange();) {
                    for (var v = m.getCommonAncestor(); v && (v.type != CKEDITOR.NODE_ELEMENT || !h[v.getName()]);) { if (a.editable().equals(v)) { v = !1; break } v = v.getParent() } v || (v = m.startPath().contains(h)) && m.setEndAt(v, CKEDITOR.POSITION_BEFORE_END); if (!v) {
                        var q = m.getEnclosedNode(); q && q.type == CKEDITOR.NODE_ELEMENT &&
                            q.getName() in h && (m.setStartAt(q, CKEDITOR.POSITION_AFTER_START), m.setEndAt(q, CKEDITOR.POSITION_BEFORE_END), v = q)
                    } v && m.startContainer.type == CKEDITOR.NODE_ELEMENT && m.startContainer.getName() in h && (q = new CKEDITOR.dom.walker(m), q.evaluator = e, m.startContainer = q.next()); v && m.endContainer.type == CKEDITOR.NODE_ELEMENT && m.endContainer.getName() in h && (q = new CKEDITOR.dom.walker(m), q.evaluator = e, m.endContainer = q.previous()); if (v) return b(v)
                } return 0
            } function e(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("li") }
            function c(a) { return b(a) && f(a) } var b = CKEDITOR.dom.walker.whitespaces(!0), f = CKEDITOR.dom.walker.bookmark(!1, !0), m = CKEDITOR.TRISTATE_DISABLED, h = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
                requires: "indent", init: function (b) {
                    function d(b) {
                        c.specificDefinition.apply(this, arguments); this.requiredContent = ["ul", "ol"]; b.on("key", function (a) {
                            var d = b.elementPath(); if ("wysiwyg" == b.mode && a.data.keyCode == this.indentKey && d) {
                                var c = this.getContext(d); !c || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context,
                                    d, c) || (b.execCommand(this.relatedGlobal), a.cancel())
                            }
                        }, this); this.jobs[this.isIndent ? 10 : 30] = { refresh: this.isIndent ? function (a, b) { var d = this.getContext(b), c = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, d); return d && this.isIndent && !c ? h : m } : function (a, b) { return !this.getContext(b) || this.isIndent ? m : h }, exec: CKEDITOR.tools.bind(a, this) }
                    } var c = CKEDITOR.plugins.indent; c.registerCommands(b, { indentlist: new d(b, "indentlist", !0), outdentlist: new d(b, "outdentlist") }); CKEDITOR.tools.extend(d.prototype,
                        c.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
                }
            }); CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (a, b, c) { var f = b.contains(e); c || (c = b.contains(a)); return c && f && f.equals(c.getFirst(e)) }
        }(), function () {
            function a(a, b, d, c) {
                for (var e = CKEDITOR.plugins.list.listToArray(b.root, d), f = [], g = 0; g < b.contents.length; g++) {
                    var h = b.contents[g]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), CKEDITOR.dom.element.setMarker(d, h, "list_item_processed",
                        !0))
                } for (var h = b.root.getDocument(), k, l, g = 0; g < f.length; g++) { var m = f[g].getCustomData("listarray_index"); k = e[m].parent; k.is(this.type) || (l = h.createElement(this.type), k.copyAttributes(l, { start: 1, type: 1 }), l.removeStyle("list-style-type"), e[m].parent = l) } d = CKEDITOR.plugins.list.arrayToList(e, d, null, a.config.enterMode); for (var n, e = d.listNode.getChildCount(), g = 0; g < e && (n = d.listNode.getChild(g)); g++)n.getName() == this.type && c.push(n); d.listNode.replace(b.root); a.fire("contentDomInvalidated")
            } function e(a, b,
                d) {
                    var c = b.contents, e = b.root.getDocument(), f = []; if (1 == c.length && c[0].equals(b.root)) { var g = e.createElement("div"); c[0].moveChildren && c[0].moveChildren(g); c[0].append(g); c[0] = g } b = b.contents[0].getParent(); for (g = 0; g < c.length; g++)b = b.getCommonAncestor(c[g].getParent()); a = a.config.useComputedState; var h, k; a = void 0 === a || a; for (g = 0; g < c.length; g++)for (var l = c[g], m; m = l.getParent();) { if (m.equals(b)) { f.push(l); !k && l.getDirection() && (k = 1); l = l.getDirection(a); null !== h && (h = h && h != l ? null : l); break } l = m } if (!(1 > f.length)) {
                        c =
                        f[f.length - 1].getNext(); g = e.createElement(this.type); for (d.push(g); f.length;)d = f.shift(), a = e.createElement("li"), l = d, l.is("pre") || v.test(l.getName()) || "false" == l.getAttribute("contenteditable") ? d.appendTo(a) : (d.copyAttributes(a), h && d.getDirection() && (a.removeStyle("direction"), a.removeAttribute("dir")), d.moveChildren(a), d.remove()), a.appendTo(g); h && k && g.setAttribute("dir", h); c ? g.insertBefore(c) : g.appendTo(b)
                    }
            } function c(a, b, d) {
                function c(d) {
                    if (!(!(l = k[d ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() ||
                        !(m = b.root[d ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || m.is && m.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[d ? "insertBefore" : "insertAfter"](l)
                } for (var e = CKEDITOR.plugins.list.listToArray(b.root, d), f = [], g = 0; g < b.contents.length; g++) { var h = b.contents[g]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), CKEDITOR.dom.element.setMarker(d, h, "list_item_processed", !0)) } h = null; for (g = 0; g < f.length; g++)h = f[g].getCustomData("listarray_index"), e[h].indent =
                    -1; for (g = h + 1; g < e.length; g++)if (e[g].indent > e[g - 1].indent + 1) { f = e[g - 1].indent + 1 - e[g].indent; for (h = e[g].indent; e[g] && e[g].indent >= h;)e[g].indent += f, g++; g-- } var k = CKEDITOR.plugins.list.arrayToList(e, d, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, l, m; c(!0); c(); k.replace(b.root); a.fire("contentDomInvalidated")
            } function b(a, b) { this.name = a; this.context = this.type = b; this.allowedContent = b + " li"; this.requiredContent = b } function f(a, b, d, c) {
                for (var e, f; e = a[c ? "getLast" : "getFirst"](q);)(f = e.getDirection(1)) !==
                    b.getDirection(1) && e.setAttribute("dir", f), e.remove(), d ? e[c ? "insertBefore" : "insertAfter"](d) : b.append(e, c), d = e
            } function m(a) { function b(d) { var c = a[d ? "getPrevious" : "getNext"](p); c && c.type == CKEDITOR.NODE_ELEMENT && c.is(a.getName()) && (f(a, c, null, !d), a.remove(), a = c) } b(); b(1) } function h(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] } function l(a, b, c) {
                a.fire("saveSnapshot"); c.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
                var e = c.extractContents(); b.trim(!1, !0); var g = b.createBookmark(), h = new CKEDITOR.dom.elementPath(b.startContainer), k = h.block, h = h.lastElement.getAscendant("li", 1) || k, l = new CKEDITOR.dom.elementPath(c.startContainer), n = l.contains(CKEDITOR.dtd.$listItem), l = l.contains(CKEDITOR.dtd.$list); k ? (k = k.getBogus()) && k.remove() : l && (k = l.getPrevious(p)) && w(k) && k.remove(); (k = e.getLast()) && k.type == CKEDITOR.NODE_ELEMENT && k.is("br") && k.remove(); (k = b.startContainer.getChild(b.startOffset)) ? e.insertBefore(k) : b.startContainer.append(e);
                n && (e = d(n)) && (h.contains(n) ? (f(e, n.getParent(), n), e.remove()) : h.append(e)); for (; c.checkStartOfBlock() && c.checkEndOfBlock();) { l = c.startPath(); e = l.block; if (!e) break; e.is("li") && (h = e.getParent(), e.equals(h.getLast(p)) && e.equals(h.getFirst(p)) && (e = h)); c.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START); e.remove() } c = c.clone(); e = a.editable(); c.setEndAt(e, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(c); c.evaluator = function (a) { return p(a) && !w(a) }; (c = c.next()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in
                    CKEDITOR.dtd.$list && m(c); b.moveToBookmark(g); b.select(); a.fire("saveSnapshot")
            } function d(a) { return (a = a.getLast(p)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in k ? a : null } var k = { ol: 1, ul: 1 }, g = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.dom.walker.bookmark(), p = function (a) { return !(g(a) || n(a)) }, w = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
                listToArray: function (a, b, d, c, e) {
                    if (!k[a.getName()]) return []; c || (c = 0); d || (d = []); for (var f = 0, g = a.getChildCount(); f < g; f++) {
                        var h = a.getChild(f); h.type == CKEDITOR.NODE_ELEMENT &&
                            h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, b, d, c + 1); if ("li" == h.$.nodeName.toLowerCase()) {
                                var l = { parent: a, indent: c, element: h, contents: [] }; e ? l.grandparent = e : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() && (l.grandparent = l.grandparent.getParent())); b && CKEDITOR.dom.element.setMarker(b, h, "listarray_index", d.length); d.push(l); for (var m = 0, n = h.getChildCount(), p; m < n; m++)p = h.getChild(m), p.type == CKEDITOR.NODE_ELEMENT && k[p.getName()] ? CKEDITOR.plugins.list.listToArray(p,
                                    b, d, c + 1, l.grandparent) : l.contents.push(p)
                            }
                    } return d
                }, arrayToList: function (a, b, d, c, e) {
                    d || (d = 0); if (!a || a.length < d + 1) return null; for (var f, g = a[d].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(g), l = null, m = d, q = Math.max(a[d].indent, 0), w = null, v, E, M = c == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                        var G = a[m]; f = G.grandparent; v = G.element.getDirection(1); if (G.indent == q) {
                        l && a[m].parent.getName() == l.getName() || (l = a[m].parent.clone(!1, 1), e && l.setAttribute("dir", e), h.append(l)); w = l.append(G.element.clone(0, 1)); v != l.getDirection(1) &&
                            w.setAttribute("dir", v); for (f = 0; f < G.contents.length; f++)w.append(G.contents[f].clone(1, 1)); m++
                        } else if (G.indent == Math.max(q, 0) + 1) G = a[m - 1].element.getDirection(1), m = CKEDITOR.plugins.list.arrayToList(a, null, m, c, G != v ? v : null), !w.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= g.$.documentMode && w.append(g.createText(" ")), w.append(m.listNode), m = m.nextIndex; else if (-1 == G.indent && !d && f) {
                            k[f.getName()] ? (w = G.element.clone(!1, !0), v != f.getDirection(1) && w.setAttribute("dir", v)) : w = new CKEDITOR.dom.documentFragment(g);
                            var l = f.getDirection(1) != v, D = G.element, N = D.getAttribute("class"), Q = D.getAttribute("style"), O = w.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (c != CKEDITOR.ENTER_BR || l || Q || N), J, W = G.contents.length, R; for (f = 0; f < W; f++)if (J = G.contents[f], n(J) && 1 < W) O ? R = J.clone(1, 1) : w.append(J.clone(1, 1)); else if (J.type == CKEDITOR.NODE_ELEMENT && J.isBlockBoundary()) {
                            l && !J.getDirection() && J.setAttribute("dir", v); E = J; var Z = D.getAttribute("style"); Z && E.setAttribute("style", Z.replace(/([^;])$/, "$1;") + (E.getAttribute("style") || "")); N &&
                                J.addClass(N); E = null; R && (w.append(R), R = null); w.append(J.clone(1, 1))
                            } else O ? (E || (E = g.createElement(M), w.append(E), l && E.setAttribute("dir", v)), Q && E.setAttribute("style", Q), N && E.setAttribute("class", N), R && (E.append(R), R = null), E.append(J.clone(1, 1))) : w.append(J.clone(1, 1)); R && ((E || w).append(R), R = null); w.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && m != a.length - 1 && (CKEDITOR.env.needsBrFiller && (v = w.getLast()) && v.type == CKEDITOR.NODE_ELEMENT && v.is("br") && v.remove(), (v = w.getLast(p)) && v.type == CKEDITOR.NODE_ELEMENT &&
                                v.is(CKEDITOR.dtd.$block) || w.append(g.createElement("br"))); v = w.$.nodeName.toLowerCase(); "div" != v && "p" != v || w.appendBogus(); h.append(w); l = null; m++
                        } else return null; E = null; if (a.length <= m || Math.max(a[m].indent, 0) < q) break
                    } if (b) for (a = h.getFirst(); a;) { if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (d = a, g = e = c = void 0, c = d.getDirection()))) { for (e = d.getParent(); e && !(g = e.getDirection());)e = e.getParent(); c == g && d.removeAttribute("dir") } a = a.getNextSourceNode() } return {
                        listNode: h,
                        nextIndex: m
                    }
                }
            }; var v = /^h[1-6]$/, q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); b.prototype = {
                exec: function (b) {
                    function d(a) { return k[a.root.getName()] && !f(a.root, [CKEDITOR.NODE_COMMENT]) } function f(a, b) { return CKEDITOR.tools.array.filter(a.getChildren().toArray(), function (a) { return -1 === CKEDITOR.tools.array.indexOf(b, a.type) }).length } function g(a) { var b = !0; if (0 === a.getChildCount()) return !1; a.forEach(function (a) { if (a.type !== CKEDITOR.NODE_COMMENT) return b = !1 }, null, !0); return b } this.refresh(b, b.elementPath());
                    var h = b.config, l = b.getSelection(), n = l && l.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) { var A = b.editable(); if (A.getFirst(p)) { var B = 1 == n.length && n[0]; (h = B && B.getEnclosedNode()) && h.is && this.type == h.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else h.enterMode == CKEDITOR.ENTER_BR ? A.appendBogus() : n[0].fixBlock(1, h.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), l.selectRanges(n) } for (var h = l.createBookmarks(!0), A = [], w = {}, n = n.createIterator(), q = 0; (B = n.getNextRange()) && ++q;) {
                        var v = B.getBoundaryNodes(), I = v.startNode,
                        E = v.endNode; I.type == CKEDITOR.NODE_ELEMENT && "td" == I.getName() && B.setStartAt(v.startNode, CKEDITOR.POSITION_AFTER_START); E.type == CKEDITOR.NODE_ELEMENT && "td" == E.getName() && B.setEndAt(v.endNode, CKEDITOR.POSITION_BEFORE_END); B = B.createIterator(); for (B.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; v = B.getNextParagraph();)if (!v.getCustomData("list_block") && !g(v)) {
                            CKEDITOR.dom.element.setMarker(w, v, "list_block", 1); for (var M = b.elementPath(v), I = M.elements, E = 0, M = M.blockLimit, G, D = I.length - 1; 0 <= D && (G = I[D]); D--)if (k[G.getName()] &&
                                M.contains(G)) { M.removeCustomData("list_group_object_" + q); (I = G.getCustomData("list_group_object")) ? I.contents.push(v) : (I = { root: G, contents: [v] }, A.push(I), CKEDITOR.dom.element.setMarker(w, G, "list_group_object", I)); E = 1; break } E || (E = M, E.getCustomData("list_group_object_" + q) ? E.getCustomData("list_group_object_" + q).contents.push(v) : (I = { root: E, contents: [v] }, CKEDITOR.dom.element.setMarker(w, E, "list_group_object_" + q, I), A.push(I)))
                        }
                    } for (G = []; 0 < A.length;)I = A.shift(), this.state == CKEDITOR.TRISTATE_OFF ? d(I) || (k[I.root.getName()] ?
                        a.call(this, b, I, w, G) : e.call(this, b, I, G)) : this.state == CKEDITOR.TRISTATE_ON && k[I.root.getName()] && !d(I) && c.call(this, b, I, w); for (D = 0; D < G.length; D++)m(G[D]); CKEDITOR.dom.element.clearAllMarkers(w); l.selectBookmarks(h); b.focus()
                }, refresh: function (a, b) { var d = b.contains(k, 1), c = b.blockLimit || b.root; d && c.contains(d) ? this.setState(d.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
            }; CKEDITOR.plugins.add("list", {
                requires: "indentlist", init: function (a) {
                a.blockless ||
                    (a.addCommand("numberedlist", new b("numberedlist", "ol")), a.addCommand("bulletedlist", new b("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", { label: a.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), a.ui.addButton("BulletedList", { label: a.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), a.on("key", function (b) {
                        var c = b.data.domEvent.getKey(), e; if ("wysiwyg" == a.mode && c in { 8: 1, 46: 1 }) {
                            var f = a.getSelection().getRanges()[0],
                            g = f && f.startPath(); if (f && f.collapsed) {
                                var m = 8 == c, n = a.editable(), B = new CKEDITOR.dom.walker(f.clone()); B.evaluator = function (a) { return p(a) && !w(a) }; B.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; c = f.clone(); if (m) {
                                    var v; (v = g.contains(k)) && f.checkBoundaryOfElement(v, CKEDITOR.START) && (v = v.getParent()) && v.is("li") && (v = d(v)) ? (e = v, v = v.getPrevious(p), c.moveToPosition(v && w(v) ? v : e, CKEDITOR.POSITION_BEFORE_START)) : (B.range.setStartAt(n, CKEDITOR.POSITION_AFTER_START), B.range.setEnd(f.startContainer,
                                        f.startOffset), (v = B.previous()) && v.type == CKEDITOR.NODE_ELEMENT && (v.getName() in k || v.is("li")) && (v.is("li") || (B.range.selectNodeContents(v), B.reset(), B.evaluator = h, v = B.previous()), e = v, c.moveToElementEditEnd(e), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END))); if (e) l(a, c, f), b.cancel(); else {
                                            var q = g.contains(k); q && f.checkBoundaryOfElement(q, CKEDITOR.START) && (e = q.getFirst(p), f.checkBoundaryOfElement(e, CKEDITOR.START) && (v = q.getPrevious(p), d(e) ? v && (f.moveToElementEditEnd(v), f.select()) :
                                                a.execCommand("outdent"), b.cancel()))
                                        }
                                } else if (e = g.contains("li")) {
                                    if (B.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), m = (n = e.getLast(p)) && h(n) ? n : e, g = 0, (v = B.next()) && v.type == CKEDITOR.NODE_ELEMENT && v.getName() in k && v.equals(n) ? (g = 1, v = B.next()) : f.checkBoundaryOfElement(m, CKEDITOR.END) && (g = 2), g && v) {
                                        f = f.clone(); f.moveToElementEditStart(v); if (1 == g && (c.optimize(), !c.startContainer.equals(e))) { for (e = c.startContainer; e.is(CKEDITOR.dtd.$inline);)q = e, e = e.getParent(); q && c.moveToPosition(q, CKEDITOR.POSITION_AFTER_END) } 2 ==
                                            g && (c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block && f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START)); l(a, c, f); b.cancel()
                                    }
                                } else B.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (v = B.next()) && v.type == CKEDITOR.NODE_ELEMENT && v.is(k) && (v = v.getFirst(p), g.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (g.block.remove(), f.moveToElementEditStart(v), f.select()) : d(v) ? (f.moveToElementEditStart(v), f.select()) : (f = f.clone(), f.moveToElementEditStart(v), l(a,
                                    c, f)), b.cancel()); setTimeout(function () { a.selectionChange(1) })
                            }
                        }
                    }))
                }
            })
        }(), function () {
            function a(a, b, d) { d = a.config.forceEnterMode || d; if ("wysiwyg" == a.mode) { b || (b = a.activeEnterMode); var c = a.elementPath(); c && !c.isContextFor("p") && (b = CKEDITOR.ENTER_BR, d = 1); a.fire("saveSnapshot"); b == CKEDITOR.ENTER_BR ? h(a, b, null, d) : l(a, b, null, d); a.fire("saveSnapshot") } } function e(a) { a = a.getSelection().getRanges(!0); for (var b = a.length - 1; 0 < b; b--)a[b].deleteContents(); return a[0] } function c(a) {
                var b = a.startContainer.getAscendant(function (a) {
                    return a.type ==
                        CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable")
                }, !0); if (a.root.equals(b)) return a; b = new CKEDITOR.dom.range(b); b.moveToRange(a); return b
            } CKEDITOR.plugins.add("enterkey", { init: function (b) { b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { a(b) } }); b.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { a(b, b.activeShiftEnterMode, 1) } }); b.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]]) } }); var b = CKEDITOR.dom.walker.whitespaces(), f =
                CKEDITOR.dom.walker.bookmark(), m, h, l, d; CKEDITOR.plugins.enterkey = {
                    enterBlock: function (a, g, l, m) {
                        function w(a) { var b; if (a === CKEDITOR.ENTER_BR || -1 === CKEDITOR.tools.indexOf(["td", "th"], x.lastElement.getName()) || 1 !== x.lastElement.getChildCount()) return !1; a = x.lastElement.getChild(0).clone(!0); (b = a.getBogus()) && b.remove(); return a.getText().length ? !1 : !0 } if (l = l || e(a)) {
                            l = c(l); var v = l.document, q = l.checkStartOfBlock(), u = l.checkEndOfBlock(), x = a.elementPath(l.startContainer), r = x.block, z = g == CKEDITOR.ENTER_DIV ?
                                "div" : "p", t; if (r && q && u) {
                                    q = r.getParent(); if (q.is("li") && 1 < q.getChildCount()) { v = new CKEDITOR.dom.element("li"); t = a.createRange(); v.insertAfter(q); r.remove(); t.setStart(v, 0); a.getSelection().selectRanges([t]); return } if (r.is("li") || r.getParent().is("li")) {
                                        r.is("li") || (r = r.getParent(), q = r.getParent()); t = q.getParent(); l = !r.hasPrevious(); var y = !r.hasNext(); m = a.getSelection(); var z = m.createBookmarks(), C = r.getDirection(1), u = r.getAttribute("class"), A = r.getAttribute("style"), B = t.getDirection(1) != C; a = a.enterMode !=
                                            CKEDITOR.ENTER_BR || B || A || u; if (t.is("li")) l || y ? (l && y && q.remove(), r[y ? "insertAfter" : "insertBefore"](t)) : r.breakParent(t); else {
                                                if (a) if (x.block.is("li") ? (t = v.createElement(g == CKEDITOR.ENTER_P ? "p" : "div"), B && t.setAttribute("dir", C), A && t.setAttribute("style", A), u && t.setAttribute("class", u), r.moveChildren(t)) : t = x.block, l || y) t[l ? "insertBefore" : "insertAfter"](q); else r.breakParent(q), t.insertAfter(q); else if (r.appendBogus(!0), l || y) for (; v = r[l ? "getFirst" : "getLast"]();)v[l ? "insertBefore" : "insertAfter"](q); else for (r.breakParent(q); v =
                                                    r.getLast();)v.insertAfter(q); r.remove()
                                            } m.selectBookmarks(z); return
                                    } if (r && r.getParent().is("blockquote")) { r.breakParent(r.getParent()); r.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || r.getPrevious().remove(); r.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || r.getNext().remove(); l.moveToElementEditStart(r); l.select(); return }
                                } else if (r && r.is("pre") && !u) { h(a, g, l, m); return } if (A = l.splitBlock(z)) {
                                    a = A.previousBlock; r = A.nextBlock; q = A.wasStartOfBlock; u = A.wasEndOfBlock; r ? (y = r.getParent(),
                                        y.is("li") && (r.breakParent(y), r.move(r.getNext(), 1))) : a && (y = a.getParent()) && y.is("li") && (a.breakParent(y), y = a.getNext(), l.moveToElementEditStart(y), a.move(a.getPrevious())); if (q || u) if (w(g)) l.moveToElementEditStart(l.getTouchedStartNode()); else {
                                            if (a) { if (a.is("li") || !d.test(a.getName()) && !a.is("pre")) t = a.clone() } else r && (t = r.clone()); t ? m && !t.is("li") && t.renameNode(z) : y && y.is("li") ? t = y : (t = v.createElement(z), a && (C = a.getDirection()) && t.setAttribute("dir", C)); if (v = A.elementPath) for (g = 0, m = v.elements.length; g <
                                                m; g++) { z = v.elements[g]; if (z.equals(v.block) || z.equals(v.blockLimit)) break; CKEDITOR.dtd.$removeEmpty[z.getName()] && (z = z.clone(), t.moveChildren(z), t.append(z)) } t.appendBogus(); t.getParent() || l.insertNode(t); t.is("li") && t.removeAttribute("value"); !CKEDITOR.env.ie || !q || u && a.getChildCount() || (l.moveToElementEditStart(u ? a : t), l.select()); l.moveToElementEditStart(q && !u ? r : t)
                                        } else r.is("li") && (t = l.clone(), t.selectNodeContents(r), t = new CKEDITOR.dom.walker(t), t.evaluator = function (a) {
                                            return !(f(a) || b(a) || a.type ==
                                                CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
                                        }, (y = t.next()) && y.type == CKEDITOR.NODE_ELEMENT && y.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? v.createElement("br") : v.createText(" ")).insertBefore(y)), r && l.moveToElementEditStart(r); l.select(); l.scrollIntoView()
                                }
                        }
                    }, enterBr: function (a, b, c, f) {
                        if (c = c || e(a)) {
                            var h = c.document, m = c.checkEndOfBlock(), q = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), u = q.block, x = u && q.block.getName(); f || "li" != x ? (!f &&
                                m && d.test(x) ? (m = u.getDirection()) ? (h = h.createElement("div"), h.setAttribute("dir", m), h.insertAfter(u), c.setStart(h, 0)) : (h.createElement("br").insertAfter(u), CKEDITOR.env.gecko && h.createText("").insertAfter(u), c.setStartAt(u.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == x && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? h.createText("\r") : h.createElement("br"), c.deleteContents(), c.insertNode(a), CKEDITOR.env.needsBrFiller ? (h.createText("﻿").insertAfter(a),
                                    m && (u || q.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", c.setStartAt(a.getNext(), CKEDITOR.POSITION_AFTER_START)) : c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), c.collapse(!0), c.select(), c.scrollIntoView()) : l(a, b, c, f)
                        }
                    }
                }; m = CKEDITOR.plugins.enterkey; h = m.enterBr; l = m.enterBlock; d = /^h[1-6]$/
        }(), function () {
            function a(a, c) {
                var b = {}, f = [], m = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' }; a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a, d) {
                    var e = c ? "\x26" + d + ";" : m[d];
                    b[e] = c ? m[d] : "\x26" + d + ";"; f.push(e); return ""
                }); a = a.replace(/,$/, ""); if (!c && a) { a = a.split(","); var h = document.createElement("div"), l; h.innerHTML = "\x26" + a.join(";\x26") + ";"; l = h.innerHTML; h = null; for (h = 0; h < l.length; h++) { var d = l.charAt(h); b[d] = "\x26" + a[h] + ";"; f.push(d) } } b.regex = f.join(c ? "|" : ""); return b
            } CKEDITOR.plugins.add("entities", {
                afterInit: function (e) {
                    function c(a) { return d[a] } function b(a) { return "force" != f.entities_processNumerical && h[a] ? h[a] : "\x26#" + a.charCodeAt(0) + ";" } var f = e.config; if (e = (e = e.dataProcessor) &&
                        e.htmlFilter) {
                            var m = []; !1 !== f.basicEntities && m.push("nbsp,gt,lt,amp"); f.entities && (m.length && m.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                                f.entities_latin && m.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), f.entities_greek && m.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                                f.entities_additional && m.push(f.entities_additional)); var h = a(m.join(",")), l = h.regex ? "[" + h.regex + "]" : "a^"; delete h.regex; f.entities && f.entities_processNumerical && (l = "[^ -~]|" + l); var l = new RegExp(l, "g"), d = a("nbsp,gt,lt,amp,shy", !0), k = new RegExp(d.regex, "g"); e.addRules({ text: function (a) { return a.replace(k, c).replace(l, b) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                    }
                }
            })
        }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0,
    CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function (a, e, c, b) {
            e = e || "80%"; c = c || "70%"; "string" == typeof e && 1 < e.length && "%" == e.substr(e.length - 1, 1) && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10)); "string" == typeof c && 1 < c.length && "%" == c.substr(c.length - 1, 1) && (c = parseInt(window.screen.height * parseInt(c, 10) / 100, 10)); 640 > e && (e = 640); 420 > c && (c = 420); var f = parseInt((window.screen.height - c) / 2, 10), m = parseInt((window.screen.width -
                e) / 2, 10); b = (b || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + e + ",height\x3d" + c + ",top\x3d" + f + ",left\x3d" + m; var h = window.open("", null, b, !0); if (!h) return !1; try { -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (h.moveTo(m, f), h.resizeTo(e, c)), h.focus(), h.location.href = a } catch (l) { window.open(a, null, b, !0) } return !0
        }
    }), "use strict", function () {
        function a(a) {
        this.editor = a; this.loaders =
            []
        } function e(a, b, e) { var l = a.config.fileTools_defaultFileName; this.editor = a; this.lang = a.lang; "string" === typeof b ? (this.data = b, this.file = c(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = b, this.total = this.file.size, this.loaded = 0); e ? this.fileName = e : this.file.name ? this.fileName = this.file.name : (a = this.file.type.split("/"), l && (a[0] = l), this.fileName = a.join(".")); this.uploaded = 0; this.responseData = this.uploadTotal = null; this.status = "created"; this.abort = function () { this.changeStatus("abort") } }
        function c(a) { var c = a.match(b)[1]; a = a.replace(b, ""); a = atob(a); var e = [], l, d, k, g; for (l = 0; l < a.length; l += 512) { d = a.slice(l, l + 512); k = Array(d.length); for (g = 0; g < d.length; g++)k[g] = d.charCodeAt(g); d = new Uint8Array(k); e.push(d) } return new Blob(e, { type: c }) } CKEDITOR.plugins.add("filetools", {
            beforeInit: function (b) {
            b.uploadRepository = new a(b); b.on("fileUploadRequest", function (a) { var b = a.data.fileLoader; b.xhr.open("POST", b.uploadUrl, !0); a.data.requestData.upload = { file: b.file, name: b.fileName } }, null, null, 5); b.on("fileUploadRequest",
                function (a) { var c = a.data.fileLoader, e = new FormData; a = a.data.requestData; var d = b.config.fileTools_requestHeaders, k, g; for (g in a) { var n = a[g]; "object" === typeof n && n.file ? e.append(g, n.file, n.name) : e.append(g, n) } e.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken()); if (d) for (k in d) c.xhr.setRequestHeader(k, d[k]); c.xhr.send(e) }, null, null, 999); b.on("fileUploadResponse", function (a) {
                    var b = a.data.fileLoader, c = b.xhr, d = a.data; try {
                        var e = JSON.parse(c.responseText); e.error && e.error.message && (d.message = e.error.message);
                        if (e.uploaded) for (var f in e) d[f] = e[f]; else a.cancel()
                    } catch (n) { d.message = b.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", { responseText: c.responseText }), a.cancel() }
                }, null, null, 999)
            }
        }); a.prototype = { create: function (a, b, c) { c = c || e; var l = this.loaders.length; a = new c(this.editor, a, b); a.id = l; this.loaders[l] = a; this.fire("instanceCreated", a); return a }, isFinished: function () { for (var a = 0; a < this.loaders.length; ++a)if (!this.loaders[a].isFinished()) return !1; return !0 } }; e.prototype = {
            loadAndUpload: function (a,
                b) { var c = this; this.once("loaded", function (e) { e.cancel(); c.once("update", function (a) { a.cancel() }, null, null, 0); c.upload(a, b) }, null, null, 0); this.load() }, load: function () {
                    var a = this, b = this.reader = new FileReader; a.changeStatus("loading"); this.abort = function () { a.reader.abort() }; b.onabort = function () { a.changeStatus("abort") }; b.onerror = function () { a.message = a.lang.filetools.loadError; a.changeStatus("error") }; b.onprogress = function (b) { a.loaded = b.loaded; a.update() }; b.onload = function () {
                    a.loaded = a.total; a.data = b.result;
                        a.changeStatus("loaded")
                    }; b.readAsDataURL(this.file)
                }, upload: function (a, b) { var c = b || {}; a ? (this.uploadUrl = a, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", { fileLoader: this, requestData: c }) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error")) }, attachRequestListeners: function () {
                    function a() { "error" != c.status && (c.message = c.lang.filetools.networkError, c.changeStatus("error")) } function b() {
                    "abort" != c.status &&
                        c.changeStatus("abort")
                    } var c = this, e = this.xhr; c.abort = function () { e.abort(); b() }; e.onerror = a; e.onabort = b; e.upload ? (e.upload.onprogress = function (a) { a.lengthComputable && (c.uploadTotal || (c.uploadTotal = a.total), c.uploaded = a.loaded, c.update()) }, e.upload.onerror = a, e.upload.onabort = b) : (c.uploadTotal = c.total, c.update()); e.onload = function () {
                        c.update(); if ("abort" != c.status) if (c.uploaded = c.uploadTotal, 200 > e.status || 299 < e.status) c.message = c.lang.filetools["httpError" + e.status], c.message || (c.message = c.lang.filetools.httpError.replace("%1",
                            e.status)), c.changeStatus("error"); else { for (var a = { fileLoader: c }, b = ["message", "fileName", "url"], f = c.editor.fire("fileUploadResponse", a), m = 0; m < b.length; m++) { var p = b[m]; "string" === typeof a[p] && (c[p] = a[p]) } c.responseData = a; delete c.responseData.fileLoader; !1 === f ? c.changeStatus("error") : c.changeStatus("uploaded") }
                    }
                }, changeStatus: function (a) { this.status = a; if ("error" == a || "abort" == a || "loaded" == a || "uploaded" == a) this.abort = function () { }; this.fire(a); this.update() }, update: function () { this.fire("update") }, isFinished: function () { return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/) }
        };
        CKEDITOR.event.implementOn(a.prototype); CKEDITOR.event.implementOn(e.prototype); var b = /^data:(\S*?);base64,/; CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
            uploadRepository: a, fileLoader: e, getUploadUrl: function (a, b) {
                var c = CKEDITOR.tools.capitalize; return b && a[b + "UploadUrl"] ? a[b + "UploadUrl"] : a.uploadUrl ? a.uploadUrl : b && a["filebrowser" + c(b, 1) + "UploadUrl"] ? a["filebrowser" + c(b, 1) + "UploadUrl"] + "\x26responseType\x3djson" : a.filebrowserUploadUrl ? a.filebrowserUploadUrl +
                    "\x26responseType\x3djson" : null
            }, isTypeSupported: function (a, b) { return !!a.type.match(b) }, isFileUploadSupported: "function" === typeof FileReader && "function" === typeof (new FileReader).readAsDataURL && "function" === typeof FormData && "function" === typeof (new FormData).append && "function" === typeof XMLHttpRequest && "function" === typeof Blob
        })
    }(), function () {
        function a(a, b) { var d = []; if (b) for (var c in b) d.push(c + "\x3d" + encodeURIComponent(b[c])); else return a; return a + (-1 != a.indexOf("?") ? "\x26" : "?") + d.join("\x26") } function e(b) {
            return !b.match(/command=QuickUpload/) ||
                b.match(/(\?|&)responseType=json/) ? b : a(b, { responseType: "json" })
        } function c(a) { a += ""; return a.charAt(0).toUpperCase() + a.substr(1) } function b() {
            var b = this.getDialog(), d = b.getParentEditor(); d._.filebrowserSe = this; var e = d.config["filebrowser" + c(b.getName()) + "WindowWidth"] || d.config.filebrowserWindowWidth || "80%", b = d.config["filebrowser" + c(b.getName()) + "WindowHeight"] || d.config.filebrowserWindowHeight || "70%", f = this.filebrowser.params || {}; f.CKEditor = d.name; f.CKEditorFuncNum = d._.filebrowserFn; f.langCode ||
                (f.langCode = d.langCode); f = a(this.filebrowser.url, f); d.popup(f, e, b, d.config.filebrowserWindowFeatures || d.config.fileBrowserWindowFeatures)
        } function f(a) { var b = new CKEDITOR.dom.element(a.$.form); b && ((a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({ name: "ckCsrfToken", type: "hidden" }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken())) } function m() {
            var a = this.getDialog(); a.getParentEditor()._.filebrowserSe = this; return a.getContentElement(this["for"][0],
                this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
        } function h(b, d, c) { var e = c.params || {}; e.CKEditor = b.name; e.CKEditorFuncNum = b._.filebrowserFn; e.langCode || (e.langCode = b.langCode); d.action = a(c.url, e); d.filebrowser = c } function l(a, k, w, v) {
            if (v && v.length) for (var q, u = v.length; u--;)if (q = v[u], "hbox" != q.type && "vbox" != q.type && "fieldset" != q.type || l(a, k, w, q.children), q.filebrowser) if ("string" == typeof q.filebrowser && (q.filebrowser = {
                action: "fileButton" ==
                    q.type ? "QuickUpload" : "Browse", target: q.filebrowser
            }), "Browse" == q.filebrowser.action) { var x = q.filebrowser.url; void 0 === x && (x = a.config["filebrowser" + c(k) + "BrowseUrl"], void 0 === x && (x = a.config.filebrowserBrowseUrl)); x && (q.onClick = b, q.filebrowser.url = x, q.hidden = !1) } else if ("QuickUpload" == q.filebrowser.action && q["for"] && (x = q.filebrowser.url, void 0 === x && (x = a.config["filebrowser" + c(k) + "UploadUrl"], void 0 === x && (x = a.config.filebrowserUploadUrl)), x)) {
                var r = q.onClick; q.onClick = function (b) {
                    var c = b.sender, h = c.getDialog().getContentElement(this["for"][0],
                        this["for"][1]).getInputElement(), k = CKEDITOR.fileTools && CKEDITOR.fileTools.isFileUploadSupported; if (r && !1 === r.call(c, b)) return !1; if (m.call(c, b)) { if ("form" !== a.config.filebrowserUploadMethod && k) return b = a.uploadRepository.create(h.$.files[0]), b.on("uploaded", function (a) { var b = a.sender.responseData; g.call(a.sender.editor, b.url, b.message) }), b.on("error", d.bind(this)), b.on("abort", d.bind(this)), b.loadAndUpload(e(x)), "xhr"; f(h); return !0 } return !1
                }; q.filebrowser.url = x; q.hidden = !1; h(a, w.getContents(q["for"][0]).get(q["for"][1]),
                    q.filebrowser)
            }
        } function d(a) { var b = {}; try { b = JSON.parse(a.sender.xhr.response) || {} } catch (d) { } this.enable(); alert(b.error ? b.error.message : a.sender.message) } function k(a, b, d) { if (-1 !== d.indexOf(";")) { d = d.split(";"); for (var c = 0; c < d.length; c++)if (k(a, b, d[c])) return !0; return !1 } return (a = a.getContents(b).get(d).filebrowser) && a.url } function g(a, b) {
            var d = this._.filebrowserSe.getDialog(), c = this._.filebrowserSe["for"], e = this._.filebrowserSe.filebrowser.onSelect; c && d.getContentElement(c[0], c[1]).reset(); if ("function" !=
                typeof b || !1 !== b.call(this._.filebrowserSe)) if (!e || !1 !== e.call(this._.filebrowserSe, a, b)) if ("string" == typeof b && b && alert(b), a && (c = this._.filebrowserSe, d = c.getDialog(), c = c.filebrowser.target || null)) if (c = c.split(":"), e = d.getContentElement(c[0], c[1])) e.setValue(a), d.selectPage(c[0])
        } CKEDITOR.plugins.add("filebrowser", { requires: "popup,filetools", init: function (a) { a._.filebrowserFn = CKEDITOR.tools.addFunction(g, a); a.on("destroy", function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) }) } }); CKEDITOR.on("dialogDefinition",
            function (a) { if (a.editor.plugins.filebrowser) for (var b = a.data.definition, d, c = 0; c < b.contents.length; ++c)if (d = b.contents[c]) l(a.editor, a.data.name, b, d.elements), d.hidden && d.filebrowser && (d.hidden = !k(b, d.id, d.filebrowser)) })
    }(), function () {
        function a(a) {
            var f = a.config, m = a.fire("uiSpace", { space: "top", html: "" }).html, h = function () {
                function g(a, b, e) { d.setStyle(b, c(e)); d.setStyle("position", a) } function k(a) {
                    var b = m.getDocumentPosition(); switch (a) {
                        case "top": g("absolute", "top", b.y - r - y); break; case "pin": g("fixed",
                            "top", A); break; case "bottom": g("absolute", "top", b.y + (u.height || u.bottom - u.top) + y)
                    }l = a
                } var l, m, q, u, x, r, z, t = f.floatSpaceDockedOffsetX || 0, y = f.floatSpaceDockedOffsetY || 0, C = f.floatSpacePinnedOffsetX || 0, A = f.floatSpacePinnedOffsetY || 0; return function (g) {
                    if (m = a.editable()) {
                        var n = g && "focus" == g.name; n && d.show(); a.fire("floatingSpaceLayout", { show: n }); d.removeStyle("left"); d.removeStyle("right"); q = d.getClientRect(); u = m.getClientRect(); x = e.getViewPaneSize(); r = q.height; z = "pageXOffset" in e.$ ? e.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                        l ? (r + y <= u.top ? k("top") : r + y > x.height - u.bottom ? k("pin") : k("bottom"), g = x.width / 2, g = f.floatSpacePreferRight ? "right" : 0 < u.left && u.right < x.width && u.width > q.width ? "rtl" == f.contentsLangDirection ? "right" : "left" : g - u.left > u.right - g ? "left" : "right", q.width > x.width ? (g = "left", n = 0) : (n = "left" == g ? 0 < u.left ? u.left : 0 : u.right < x.width ? x.width - u.right : 0, n + q.width > x.width && (g = "left" == g ? "right" : "left", n = 0)), d.setStyle(g, c(("pin" == l ? C : t) + n + ("pin" == l ? 0 : "left" == g ? z : -z)))) : (l = "pin", k("pin"), h(g))
                    }
                }
            }(); if (m) {
                var l = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' +
                    CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), d = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(l.output({
                        content: m,
                        id: a.id, langDir: a.lang.dir, langCode: a.langCode, name: a.name, style: "display:none;z-index:" + (f.baseFloatZIndex - 1), topId: a.ui.spaceId("top"), voiceLabel: a.title
                    }))), k = CKEDITOR.tools.eventsBuffer(500, h), g = CKEDITOR.tools.eventsBuffer(100, h); d.unselectable(); d.on("mousedown", function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); a.on("focus", function (d) { h(d); a.on("change", k.input); e.on("scroll", g.input); e.on("resize", g.input) }); a.on("blur", function () {
                        d.hide(); a.removeListener("change",
                            k.input); e.removeListener("scroll", g.input); e.removeListener("resize", g.input)
                    }); a.on("destroy", function () { e.removeListener("scroll", g.input); e.removeListener("resize", g.input); d.clearCustomData(); d.remove() }); a.focusManager.hasFocus && d.show(); a.focusManager.add(d, 1)
            }
        } var e = CKEDITOR.document.getWindow(), c = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add("floatingspace", { init: function (b) { b.on("loaded", function () { a(this) }, null, null, 20) } })
    }(), CKEDITOR.plugins.add("listblock", {
        requires: "panel", onLoad: function () {
            var a =
                CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), e = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" draggable\x3d"false" ondragstart\x3d"return false;" href\x3d"javascript:void(\'{val}\')"  onclick\x3d"{onclick}CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
            c = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" draggable\x3d"false" ondragstart\x3d"return false;" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'), b = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block, $: function (a, b) {
                    b = b || {}; var c = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) &&
                        (c["aria-multiselectable"] = !0); !c.role && (c.role = "listbox"); this.base.apply(this, arguments); this.element.setAttribute("role", c.role); c = this.keys; c[40] = "next"; c[9] = "next"; c[38] = "prev"; c[CKEDITOR.SHIFT + 9] = "prev"; c[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (c[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                }, _: {
                    close: function () {
                        if (this._.started) {
                            var b = a.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(b);
                            delete this._.started
                        }
                    }, getClick: function () { this._.click || (this._.click = CKEDITOR.tools.addFunction(function (a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click }
                }, proto: {
                    add: function (a, c, h) {
                        var l = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[a] = l; var d; d = CKEDITOR.tools.htmlEncodeAttr(a).replace(b, "\\'"); a = {
                            id: l, val: d, onclick: CKEDITOR.env.ie ? 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26' :
                                "", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(h || a), text: c || a
                        }; this._.pendingList.push(e.output(a))
                    }, startGroup: function (a) { this._.close(); var b = CKEDITOR.tools.getNextId(); this._.groups[a] = b; this._.pendingHtml.push(c.output({ id: b, label: a })) }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b }, hideGroup: function (a) {
                        var b = (a =
                            this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                    }, hideItem: function (a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") }, showAll: function () {
                        var a = this._.items, b = this._.groups, c = this.element.getDocument(), e; for (e in a) c.getById(a[e]).setStyle("display", ""); for (var d in b) a = c.getById(b[d]), e = a.getNext(), a.setStyle("display", ""), e && "ul" == e.getName() && e.setStyle("display",
                            "")
                    }, mark: function (a) { this.multiSelect || this.unmarkAll(); a = this._.items[a]; var b = this.element.getDocument().getById(a); b.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0); this.onMark && this.onMark(b) }, markFirstDisplayed: function () { var a = this; this._.markFirstDisplayed(function () { a.multiSelect || a.unmarkAll() }) }, unmark: function (a) {
                        var b = this.element.getDocument(); a = this._.items[a]; var c = b.getById(a); c.removeClass("cke_selected"); b.getById(a + "_option").removeAttribute("aria-selected");
                        this.onUnmark && this.onUnmark(c)
                    }, unmarkAll: function () { var a = this._.items, b = this.element.getDocument(), c; for (c in a) { var e = a[c]; b.getById(e).removeClass("cke_selected"); b.getById(e + "_option").removeAttribute("aria-selected") } this.onUnmark && this.onUnmark() }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) {
                        this._.focusIndex = -1; var b = this.element.getElementsByTag("a"), c, e = -1; if (a) for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a =
                            b.getItem(++e);) { if (a.equals(c)) { this._.focusIndex = e; break } } else this.element.focus(); c && setTimeout(function () { c.focus() }, 0)
                    }
                }
            })
        }
    }), CKEDITOR.plugins.add("richcombo", { requires: "floatpanel,listblock,button", beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } }), function () {
        var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' +
            (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"', e = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); CKEDITOR.env.ie && (e = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' +
                e + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), c = CKEDITOR.addTemplate("combo", a); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                    $: function (a) {
                        CKEDITOR.tools.extend(this,
                            a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = "cke_combopanel"; a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {}, listeners: [] }
                    }, proto: {
                        renderHtml: function (a) { var c = []; this.render(a, c); return c.join("") }, render: function (a, e) {
                            function m() {
                                if (this.getState() != CKEDITOR.TRISTATE_ON) {
                                    var d =
                                        this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (d = CKEDITOR.TRISTATE_DISABLED); this.setState(d); this.setValue(""); d != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
                                }
                            } var h = CKEDITOR.env, l = "cke_" + this.id, d = CKEDITOR.tools.addFunction(function (d) { w && (a.unlockSelection(1), w = 0); g.execute(d) }, this), k = this, g = {
                                id: l, combo: this, focus: function () { CKEDITOR.document.getById(l).getChild(1).focus() }, execute: function (d) {
                                    var c = k._; if (c.state != CKEDITOR.TRISTATE_DISABLED) if (k.createPanel(a),
                                        c.on) c.panel.hide(); else { k.commit(); var e = k.getValue(); e ? c.list.mark(e) : c.list.unmarkAll(); c.panel.showBlock(k.id, new CKEDITOR.dom.element(d), 4) }
                                }, clickFn: d
                            }; this._.listeners.push(a.on("activeFilterChange", m, this)); this._.listeners.push(a.on("mode", m, this)); this._.listeners.push(a.on("selectionChange", m, this)); !this.readOnly && this._.listeners.push(a.on("readOnly", m, this)); var n = CKEDITOR.tools.addFunction(function (a, b) {
                                a = new CKEDITOR.dom.event(a); var c = a.getKeystroke(); switch (c) {
                                    case 13: case 32: case 40: CKEDITOR.tools.callFunction(d,
                                        b); break; default: g.onkey(g, c)
                                }a.preventDefault()
                            }), p = CKEDITOR.tools.addFunction(function () { g.onfocus && g.onfocus() }), w = 0; g.keyDownFn = n; h = { id: l, name: this.name || this.command, label: this.label, title: this.title, cls: this.className || "", titleJs: h.gecko && !h.hc ? "" : (this.title || "").replace("'", ""), keydownFn: n, focusFn: p, clickFn: d }; c.output(h, e); if (this.onRender) this.onRender(); return g
                        }, createPanel: function (a) {
                            if (!this._.panel) {
                                var c = this._.panelDefinition, e = this._.panelDefinition.block, h = c.parent || CKEDITOR.document.getBody(),
                                l = "cke_combopanel__" + this.name, d = new CKEDITOR.ui.floatPanel(a, h, c), c = d.addListBlock(this.id, e), k = this; d.onShow = function () { this.element.addClass(l); k.setState(CKEDITOR.TRISTATE_ON); k._.on = 1; k.editorFocus && !a.focusManager.hasFocus && a.focus(); if (k.onOpen) k.onOpen() }; d.onHide = function (d) { this.element.removeClass(l); k.setState(k.modes && k.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); k._.on = 0; if (!d && k.onClose) k.onClose() }; d.onEscape = function () { d.hide(1) }; c.onClick = function (a, b) {
                                k.onClick &&
                                    k.onClick.call(k, a, b); d.hide()
                                }; this._.panel = d; this._.list = c; d.getBlock(this.id).onHide = function () { k._.on = 0; k.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                            }
                        }, setValue: function (a, c) { this._.value = a; var e = this.document.getById("cke_" + this.id + "_text"); e && (a || c ? e.removeClass("cke_combo_inlinelabel") : (c = this.label, e.addClass("cke_combo_inlinelabel")), e.setText("undefined" != typeof c ? c : a)) }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (a) { this._.list.mark(a) },
                        hideItem: function (a) { this._.list.hideItem(a) }, hideGroup: function (a) { this._.list.hideGroup(a) }, showAll: function () { this._.list.showAll() }, add: function (a, c, e) { this._.items[a] = e || a; this._.list.add(a, c, e) }, startGroup: function (a) { this._.list.startGroup(a) }, commit: function () { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)); this._.committed = 1 }, setState: function (a) {
                            if (this._.state != a) {
                                var c = this.document.getById("cke_" + this.id); c.setState(a, "cke_combo"); a == CKEDITOR.TRISTATE_DISABLED ?
                                    c.setAttribute("aria-disabled", !0) : c.removeAttribute("aria-disabled"); this._.state = a
                            }
                        }, getState: function () { return this._.state }, enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) }, disable: function () { this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)) }, destroy: function () { CKEDITOR.tools.array.forEach(this._.listeners, function (a) { a.removeListener() }); this._.listeners = [] }
                    }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
                });
        CKEDITOR.ui.prototype.addRichCombo = function (a, c) { this.add(a, CKEDITOR.UI_RICHCOMBO, c) }
    }(), CKEDITOR.plugins.add("format", {
        requires: "richcombo", init: function (a) {
            if (!a.blockless) {
                for (var e = a.config, c = a.lang.format, b = e.format_tags.split(";"), f = {}, m = 0, h = [], l = 0; l < b.length; l++) { var d = b[l], k = new CKEDITOR.style(e["format_" + d]); if (!a.filter.customConfig || a.filter.check(k)) m++, f[d] = k, f[d]._.enterMode = a.config.enterMode, h.push(k) } 0 !== m && a.ui.addRichCombo("Format", {
                    label: c.label, title: c.panelTitle, toolbar: "styles,20",
                    allowedContent: h, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss), multiSelect: !1, attributes: { "aria-label": c.panelTitle } }, init: function () { this.startGroup(c.panelTitle); for (var a in f) { var b = c["tag_" + a]; this.add(a, f[a].buildPreview(b), b) } }, onClick: function (b) { a.focus(); a.fire("saveSnapshot"); b = f[b]; var d = a.elementPath(); b.checkActive(d, a) || a.applyStyle(b); setTimeout(function () { a.fire("saveSnapshot") }, 0) }, onRender: function () {
                        a.on("selectionChange", function (b) {
                            var d = this.getValue();
                            b = b.data.path; this.refresh(); for (var c in f) if (f[c].checkActive(b, a)) { c != d && this.setValue(c, a.lang.format["tag_" + c]); return } this.setValue("")
                        }, this)
                    }, onOpen: function () { this.showAll(); for (var b in f) a.activeFilter.check(f[b]) || this.hideItem(b) }, refresh: function () { var b = a.elementPath(); if (b) { if (b.isContextFor("p")) for (var d in f) if (a.activeFilter.check(f[d])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                })
            }
        }
    }), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p =
    { element: "p" }, CKEDITOR.config.format_div = { element: "div" }, CKEDITOR.config.format_pre = { element: "pre" }, CKEDITOR.config.format_address = { element: "address" }, CKEDITOR.config.format_h1 = { element: "h1" }, CKEDITOR.config.format_h2 = { element: "h2" }, CKEDITOR.config.format_h3 = { element: "h3" }, CKEDITOR.config.format_h4 = { element: "h4" }, CKEDITOR.config.format_h5 = { element: "h5" }, CKEDITOR.config.format_h6 = { element: "h6" }, function () {
        var a = {
            canUndo: !1, exec: function (a) { var c = a.document.createElement("hr"); a.insertElement(c) }, allowedContent: "hr",
            requiredContent: "hr"
        }; CKEDITOR.plugins.add("horizontalrule", { init: function (e) { e.blockless || (e.addCommand("horizontalrule", a), e.ui.addButton && e.ui.addButton("HorizontalRule", { label: e.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })) } })
    }(), CKEDITOR.plugins.add("htmlwriter", { init: function (a) { var e = new CKEDITOR.htmlWriter; e.forceSimpleAmpersand = a.config.forceSimpleAmpersand; e.indentationChars = a.config.dataIndentationChars || "\t"; a.dataProcessor.writer = e } }), CKEDITOR.htmlWriter =
    CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter, $: function () {
            this.base(); this.indentationChars = "\t"; this.selfClosingEnd = " /\x3e"; this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var a = CKEDITOR.dtd, e; for (e in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem, a.$tableContent)) this.setRules(e, {
                indent: !a[e]["#"], breakBeforeOpen: 1, breakBeforeClose: !a[e]["#"], breakAfterClose: 1, needsSpace: e in a.$block && !(e in
                    { li: 1, dt: 1, dd: 1 })
            }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", { indent: 0, breakBeforeClose: 1 }); this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
        }, proto: {
            openTag: function (a) { var e = this._.rules[a]; this._.afterCloser && e && e.needsSpace && this._.needsSpace && this._.output.push("\n"); this._.indent ? this.indentation() : e && e.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push("\x3c", a); this._.afterCloser = 0 }, openTagClose: function (a,
                e) { var c = this._.rules[a]; e ? (this._.output.push(this.selfClosingEnd), c && c.breakAfterClose && (this._.needsSpace = c.needsSpace)) : (this._.output.push("\x3e"), c && c.indent && (this._.indentation += this.indentationChars)); c && c.breakAfterOpen && this.lineBreak(); "pre" == a && (this._.inPre = 1) }, attribute: function (a, e) { "string" == typeof e && (e = CKEDITOR.tools.htmlEncodeAttr(e), this.forceSimpleAmpersand && (e = e.replace(/&amp;/g, "\x26"))); this._.output.push(" ", a, '\x3d"', e, '"') }, closeTag: function (a) {
                    var e = this._.rules[a]; e &&
                        e.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : e && e.breakBeforeClose && (this.lineBreak(), this.indentation()); this._.output.push("\x3c/", a, "\x3e"); "pre" == a && (this._.inPre = 0); e && e.breakAfterClose && (this.lineBreak(), this._.needsSpace = e.needsSpace); this._.afterCloser = 1
                }, text: function (a) { this._.indent && (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a))); this._.output.push(a) }, comment: function (a) {
                    this._.indent && this.indentation();
                    this._.output.push("\x3c!--", a, "--\x3e")
                }, lineBreak: function () { !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars); this._.indent = 1 }, indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () { this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser = 0; this._.inPre = 0; this._.needsSpace = 0 }, setRules: function (a, e) { var c = this._.rules[a]; c ? CKEDITOR.tools.extend(c, e, !0) : this._.rules[a] = e }
        }
    }),
    function () {
        function a(a, b) { b || (b = a.getSelection().getSelectedElement()); if (b && b.is("img") && !b.data("cke-realelement") && !b.isReadOnly()) return b } function e(a) { var b = a.getStyle("float"); if ("inherit" == b || "none" == b) b = 0; b || (b = a.getAttribute("align")); return b } CKEDITOR.plugins.add("image", {
            requires: "dialog", init: function (c) {
                if (!c.plugins.detectConflict("image", ["easyimage", "image2"])) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var b = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                    CKEDITOR.dialog.isTabEnabled(c, "image", "advanced") && (b = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"); c.addCommand("image", new CKEDITOR.dialogCommand("image", { allowedContent: b, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]] })); c.ui.addButton && c.ui.addButton("Image", { label: c.lang.common.image, command: "image", toolbar: "insert,10" }); c.on("doubleclick", function (a) {
                        var b =
                            a.data.element; !b.is("img") || b.data("cke-realelement") || b.isReadOnly() || (a.data.dialog = "image")
                    }); c.addMenuItems && c.addMenuItems({ image: { label: c.lang.image.menu, command: "image", group: "image" } }); c.contextMenu && c.contextMenu.addListener(function (b) { if (a(c, b)) return { image: CKEDITOR.TRISTATE_OFF } })
                }
            }, afterInit: function (c) {
                function b(b) {
                    var m = c.getCommand("justify" + b); if (m) {
                        if ("left" == b || "right" == b) m.on("exec", function (h) {
                            var l = a(c), d; l && (d = e(l), d == b ? (l.removeStyle("float"), b == e(l) && l.removeAttribute("align")) :
                                l.setStyle("float", b), h.cancel())
                        }); m.on("refresh", function (h) { var l = a(c); l && (l = e(l), this.setState(l == b ? CKEDITOR.TRISTATE_ON : "right" == b || "left" == b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), h.cancel()) })
                    }
                } c.plugins.image2 || (b("left"), b("right"), b("center"), b("block"))
            }
        })
    }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function () {
        function a(a, c) { var e = b.exec(a), d = b.exec(c); if (e) { if (!e[2] && "px" == d[2]) return d[1]; if ("px" == e[2] && !d[2]) return d[1] + "px" } return c } var e = CKEDITOR.htmlParser.cssStyle,
            c = CKEDITOR.tools.cssLength, b = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, f = { elements: { $: function (b) { var c = b.attributes; if ((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && b.attributes["data-cke-resizable"]) { var f = (new e(b)).rules; b = c.attributes; var d = f.width, f = f.height; d && (b.width = a(b.width, d)); f && (b.height = a(b.height, f)) } return c } } }; CKEDITOR.plugins.add("fakeobjects", {
                init: function (a) {
                    a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}",
                        "fakeobjects")
                }, afterInit: function (a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(f, { applyToAll: !0 }) }
            }); CKEDITOR.editor.prototype.createFakeElement = function (a, b, f, d) {
                var k = this.lang.fakeobjects, k = k[f] || k.unknown; b = { "class": b, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type, alt: k, title: k, align: a.getAttribute("align") || "" }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); f && (b["data-cke-real-element-type"] = f); d && (b["data-cke-resizable"] =
                    d, f = new e, d = a.getAttribute("width"), a = a.getAttribute("height"), d && (f.rules.width = c(d)), a && (f.rules.height = c(a)), f.populate(b)); return this.document.createElement("img", { attributes: b })
            }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, b, f, d) {
                var k = this.lang.fakeobjects, k = k[f] || k.unknown, g; g = new CKEDITOR.htmlParser.basicWriter; a.writeHtml(g); g = g.getHtml(); b = { "class": b, "data-cke-realelement": encodeURIComponent(g), "data-cke-real-node-type": a.type, alt: k, title: k, align: a.attributes.align || "" };
                CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); f && (b["data-cke-real-element-type"] = f); d && (b["data-cke-resizable"] = d, d = a.attributes, a = new e, f = d.width, d = d.height, void 0 !== f && (a.rules.width = c(f)), void 0 !== d && (a.rules.height = c(d)), a.populate(b)); return new CKEDITOR.htmlParser.element("img", b)
            }; CKEDITOR.editor.prototype.restoreRealElement = function (b) {
                if (b.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null; var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")),
                    this.document); if (b.data("cke-resizable")) { var e = b.getStyle("width"); b = b.getStyle("height"); e && c.setAttribute("width", a(c.getAttribute("width"), e)); b && c.setAttribute("height", a(c.getAttribute("height"), b)) } return c
            }
    }(), "use strict", function () {
        function a(a) { return a.replace(/'/g, "\\$\x26") } function e(a) { for (var b, d = a.length, c = [], e = 0; e < d; e++)b = a.charCodeAt(e), c.push(b); return "String.fromCharCode(" + c.join(",") + ")" } function c(b, d) {
            var c = b.plugins.link, e = c.compiledProtectionFunction.params, f, g; g = [c.compiledProtectionFunction.name,
                "("]; for (var h = 0; h < e.length; h++)c = e[h].toLowerCase(), f = d[c], 0 < h && g.push(","), g.push("'", f ? a(encodeURIComponent(d[c])) : "", "'"); g.push(")"); return g.join("")
        } function b(a) { a = a.config.emailProtection || ""; var b; a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/, function (a, d, c) { b.name = d; b.params = []; c.replace(/[^,\s]+/g, function (a) { b.params.push(a) }) })); return b } CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects", onLoad: function () {
                function a(b) {
                    return d.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g,
                        "cke_contents_" + b)
                } var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", d = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}"; CKEDITOR.addCss(a("ltr") + a("rtl"))
            }, init: function (a) {
                var d = "a[!href]";
                CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") && (d = d.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)")); CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (d = d.replace("]", ",target,onclick]")); a.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: d, requiredContent: "a[href]" })); a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" })); a.addCommand("unlink", new CKEDITOR.unlinkCommand);
                a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand); a.setKeystroke(CKEDITOR.CTRL + 76, "link"); a.setKeystroke(CKEDITOR.CTRL + 75, "link"); a.ui.addButton && (a.ui.addButton("Link", { label: a.lang.link.toolbar, command: "link", toolbar: "links,10" }), a.ui.addButton("Unlink", { label: a.lang.link.unlink, command: "unlink", toolbar: "links,20" }), a.ui.addButton("Anchor", { label: a.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" })); CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"); CKEDITOR.dialog.add("anchor",
                    this.path + "dialogs/anchor.js"); a.on("doubleclick", function (b) { var d = b.data.element.getAscendant({ a: 1, img: 1 }, !0); d && !d.isReadOnly() && (d.is("a") ? (b.data.dialog = !d.getAttribute("name") || d.getAttribute("href") && d.getChildCount() ? "link" : "anchor", b.data.link = d) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, d) && (b.data.dialog = "anchor")) }, null, null, 0); a.on("doubleclick", function (b) { b.data.dialog in { link: 1, anchor: 1 } && b.data.link && a.getSelection().selectElement(b.data.link) }, null, null, 20); a.addMenuItems && a.addMenuItems({
                        anchor: {
                            label: a.lang.link.anchor.menu,
                            command: "anchor", group: "anchor", order: 1
                        }, removeAnchor: { label: a.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 }, link: { label: a.lang.link.menu, command: "link", group: "link", order: 1 }, unlink: { label: a.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                    }); a.contextMenu && a.contextMenu.addListener(function (b) {
                        if (!b || b.isReadOnly()) return null; b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b); if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null; var d = {}; b.getAttribute("href") &&
                            b.getChildCount() && (d = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); b && b.hasAttribute("name") && (d.anchor = d.removeAnchor = CKEDITOR.TRISTATE_OFF); return d
                    }); this.compiledProtectionFunction = b(a)
            }, afterInit: function (a) {
                a.dataProcessor.dataFilter.addRules({ elements: { a: function (b) { return b.attributes.name ? b.children.length ? null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null } } }); var b = a._.elementsPath && a._.elementsPath.filters; b && b.push(function (b, d) {
                    if ("a" == d && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,
                        b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor"
                })
            }
        }); var f = /^javascript:/, m = /^mailto:([^?]+)(?:\?(.+))?$/, h = /subject=([^;?:@&=$,\/]*)/i, l = /body=([^;?:@&=$,\/]*)/i, d = /^#(.*)$/, k = /^((?:http|https|ftp|news):\/\/)?(.*)$/, g = /^(_(?:self|top|parent|blank))$/, n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/, p = /^javascript:([^(]+)\(([^)]+)\)$/, w = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
            v = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, q = /^tel:(.*)$/, u = { id: "advId", dir: "advLangDir", accessKey: "advAccessKey", name: "advName", lang: "advLangCode", tabindex: "advTabIndex", title: "advTitle", type: "advContentType", "class": "advCSSClasses", charset: "advCharset", style: "advStyles", rel: "advRel" }; CKEDITOR.plugins.link = {
                getSelectedLink: function (a, b) {
                    var d = a.getSelection(), c = d.getSelectedElement(), e = d.getRanges(), f = [], g; if (!b && c && c.is("a")) return c; for (c = 0; c < e.length; c++)if (g = d.getRanges()[c], g.shrink(CKEDITOR.SHRINK_ELEMENT,
                        !0, { skipBogus: !0 }), (g = a.elementPath(g.getCommonAncestor()).contains("a", 1)) && b) f.push(g); else if (g) return g; return b ? f : null
                }, getEditorAnchors: function (a) {
                    for (var b = a.editable(), d = b.isInline() && !a.plugins.divarea ? a.document : b, b = d.getElementsByTag("a"), d = d.getElementsByTag("img"), c = [], e = 0, f; f = b.getItem(e++);)(f.data("cke-saved-name") || f.hasAttribute("name")) && c.push({ name: f.data("cke-saved-name") || f.getAttribute("name"), id: f.getAttribute("id") }); for (e = 0; f = d.getItem(e++);)(f = this.tryRestoreFakeAnchor(a,
                        f)) && c.push({ name: f.getAttribute("name"), id: f.getAttribute("id") }); return c
                }, fakeAnchor: !0, tryRestoreFakeAnchor: function (a, b) { if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) { var d = a.restoreRealElement(b); if (d.data("cke-saved-name")) return d } }, parseLinkAttributes: function (a, b) {
                    var c = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "", e = a.plugins.link.compiledProtectionFunction, y = a.config.emailProtection, C, A = {}; c.match(f) && ("encode" == y ? c = c.replace(n, function (a,
                        b, d) { d = d || ""; return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + d.replace(/\\'/g, "'") }) : y && c.replace(p, function (a, b, d) { if (b == e.name) { A.type = "email"; a = A.email = {}; b = /(^')|('$)/g; d = d.match(/[^,\s]+/g); for (var c = d.length, f, g, h = 0; h < c; h++)f = decodeURIComponent, g = d[h].replace(b, "").replace(/\\'/g, "'"), g = f(g), f = e.params[h].toLowerCase(), a[f] = g; a.address = [a.name, a.domain].join("@") } })); if (!A.type) if (y = c.match(d)) A.type = "anchor", A.anchor = {}, A.anchor.name = A.anchor.id = y[1]; else if (y = c.match(q)) A.type =
                            "tel", A.tel = y[1]; else if (y = c.match(m)) { C = c.match(h); c = c.match(l); A.type = "email"; var B = A.email = {}; B.address = y[1]; C && (B.subject = decodeURIComponent(C[1])); c && (B.body = decodeURIComponent(c[1])) } else c && (C = c.match(k)) && (A.type = "url", A.url = {}, A.url.protocol = C[1], A.url.url = C[2]); if (b) {
                                if (c = b.getAttribute("target")) A.target = { type: c.match(g) ? c : "frame", name: c }; else if (c = (c = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && c.match(w)) for (A.target = { type: "popup", name: c[1] }; y = v.exec(c[2]);)"yes" != y[2] && "1" !=
                                    y[2] || y[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(y[2]) && (A.target[y[1]] = y[2]) : A.target[y[1]] = !0; null !== b.getAttribute("download") && (A.download = !0); var c = {}, H; for (H in u) (y = b.getAttribute(H)) && (c[u[H]] = y); if (H = b.data("cke-saved-name") || c.advName) c.advName = H; CKEDITOR.tools.isEmpty(c) || (A.advanced = c)
                            } return A
                }, getLinkAttributes: function (b, d) {
                    var f = b.config.emailProtection || "", g = {}; switch (d.type) {
                        case "url": var f = d.url && void 0 !== d.url.protocol ? d.url.protocol : "http://", h = d.url && CKEDITOR.tools.trim(d.url.url) ||
                            ""; g["data-cke-saved-href"] = 0 === h.indexOf("/") ? h : f + h; break; case "anchor": f = d.anchor && d.anchor.id; g["data-cke-saved-href"] = "#" + (d.anchor && d.anchor.name || f || ""); break; case "email": var k = d.email, h = k.address; switch (f) {
                                case "": case "encode": var l = encodeURIComponent(k.subject || ""), m = encodeURIComponent(k.body || ""), k = []; l && k.push("subject\x3d" + l); m && k.push("body\x3d" + m); k = k.length ? "?" + k.join("\x26") : ""; "encode" == f ? (f = ["javascript:void(location.href\x3d'mailto:'+", e(h)], k && f.push("+'", a(k), "'"), f.push(")")) :
                                    f = ["mailto:", h, k]; break; default: f = h.split("@", 2), k.name = f[0], k.domain = f[1], f = ["javascript:", c(b, k)]
                            }g["data-cke-saved-href"] = f.join(""); break; case "tel": g["data-cke-saved-href"] = "tel:" + d.tel
                    }if (d.target) if ("popup" == d.target.type) {
                        for (var f = ["window.open(this.href, '", d.target.name || "", "', '"], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), h = n.length, l = function (a) { d.target[a] && n.push(a + "\x3d" + d.target[a]) }, k = 0; k < h; k++)n[k] += d.target[n[k]] ? "\x3dyes" : "\x3dno";
                        l("width"); l("left"); l("height"); l("top"); f.push(n.join(","), "'); return false;"); g["data-cke-pa-onclick"] = f.join("")
                    } else "notSet" != d.target.type && d.target.name && (g.target = d.target.name); d.download && (g.download = ""); if (d.advanced) { for (var p in u) (f = d.advanced[u[p]]) && (g[p] = f); g.name && (g["data-cke-saved-name"] = g.name) } g["data-cke-saved-href"] && (g.href = g["data-cke-saved-href"]); p = { target: 1, onclick: 1, "data-cke-pa-onclick": 1, "data-cke-saved-name": 1, download: 1 }; d.advanced && CKEDITOR.tools.extend(p, u); for (var q in g) delete p[q];
                    return { set: g, removed: CKEDITOR.tools.object.keys(p) }
                }, showDisplayTextForElement: function (a, b) { var d = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 }, c = b.getSelection(); return b.widgets && b.widgets.focused || c && 1 < c.getRanges().length ? !1 : !a || !a.getName || !a.is(d) }
            }; CKEDITOR.unlinkCommand = function () { }; CKEDITOR.unlinkCommand.prototype = {
                exec: function (a) {
                    if (CKEDITOR.env.ie) {
                        var b = a.getSelection().getRanges()[0], d = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) ||
                            b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0), c; b.collapsed && d && (c = b.createBookmark(), b.selectNodeContents(d), b.select())
                    } d = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 }); a.removeStyle(d); c && (b.moveToBookmark(c), b.select())
                }, refresh: function (a, b) { var d = b.lastElement && b.lastElement.getAscendant("a", !0); d && "a" == d.getName() && d.getAttribute("href") && d.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) },
                contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]", editorFocus: 1
            }; CKEDITOR.removeAnchorCommand = function () { }; CKEDITOR.removeAnchorCommand.prototype = {
                exec: function (a) {
                    var b = a.getSelection(), d = b.createBookmarks(), c; if (b && (c = b.getSelectedElement()) && (c.getChildCount() ? c.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c))) c.remove(1); else if (c = CKEDITOR.plugins.link.getSelectedLink(a)) c.hasAttribute("href") ? (c.removeAttributes({ name: 1, "data-cke-saved-name": 1 }), c.removeClass("cke_anchor")) :
                        c.remove(1); b.selectBookmarks(d)
                }, requiredContent: "a[name]"
            }; CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0 })
    }(), "use strict", function () {
        function a(a, b, d) { return n(b) && n(d) && d.equals(b.getNext(function (a) { return !(P(a) || S(a) || p(a)) })) } function e(a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) } function c(a) {
            var b = a.element; if (b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) {
                var d = h(b); if ("true" == d.getAttribute("contenteditable")) return b;
                if (d.is(a.triggers)) return d
            } return null
        } function b(a, b, d) { t(a, b); t(a, d); a = b.size.bottom; d = d.size.top; return a && d ? 0 | (a + d) / 2 : a || d } function f(a, b, d) { return b = b[d ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !P(b) || n(b) && !p(b) && !g(a, b) }) } function m(a, b, d) { return a > b && a < d } function h(a, b) { if (a.data("cke-editable")) return null; for (b || (a = a.getParent()); a && !a.data("cke-editable");) { if (a.hasAttribute("contenteditable")) return a; a = a.getParent() } return null } function l(a) {
            var b =
                a.doc, c = F('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"' + ba + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b), e = CKEDITOR.getUrl(this.path + "images/" + (K.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png"); B(c, {
                    attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this }, lineChildren: [B(F('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', b), {
                        base: ba + "height:17px;width:17px;" +
                            (a.rtl ? "left" : "right") + ":17px;background:url(" + e + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (K.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (K.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
                    }), B(F(da, b), {
                        base: V + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px",
                            "border-width:0 0 8px 8px;top:0px"]
                    }), B(F(da, b), { base: V + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this }, mouseNear: function () { t(a, this); var b = a.holdDistance, d = this.size; return d && m(a.mouse.y, d.top - b, d.bottom + b) && m(a.mouse.x, d.left - b, d.right + b) ? !0 : !1 }, place: function () {
                        var b = a.view, d = a.editable, c = a.trigger, e = c.upper,
                        f = c.lower, g = e || f, h = g.getParent(), k = {}; this.trigger = c; e && t(a, e, !0); f && t(a, f, !0); t(a, h, !0); a.inInlineMode && y(a, !0); h.equals(d) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x, k.right = ""); e && f ? k.top = e.size.margin.bottom === f.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 : e.size.margin.bottom < f.size.margin.top ?
                            e.size.bottom + e.size.margin.bottom : e.size.bottom + e.size.margin.bottom - f.size.margin.top : e ? f || (k.top = e.size.bottom + e.size.margin.bottom) : k.top = f.size.top - f.size.margin.top; c.is(O) || m(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(O)) : c.is(J) || m(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(J)) : (a.inInlineMode && (k.top -= b.editable.top + b.editable.border.top), this.look(W));
                        a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left); for (var l in k) k[l] = CKEDITOR.tools.cssLength(k[l]); this.setStyles(k)
                    }, look: function (a) { if (this.oldLook != a) { for (var b = this.lineChildren.length, d; b--;)(d = this.lineChildren[b]).setAttribute("style", d.base + d.looks[0 | a / 2]); this.oldLook = a } }, wrap: new H("span", a.doc)
                }); for (b = c.lineChildren.length; b--;)c.lineChildren[b].appendTo(c); c.look(W); c.appendTo(c.wrap); c.unselectable(); c.lineChildren[0].on("mouseup", function (b) {
                    c.detach();
                    d(a, function (b) { var d = a.line.trigger; b[d.is(G) ? "insertBefore" : "insertAfter"](d.is(G) ? d.lower : d.upper) }, !0); a.editor.focus(); K.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); b.data.preventDefault(!0)
                }); c.on("mousedown", function (a) { a.data.preventDefault(!0) }); a.line = c
        } function d(a, b, d) {
            var c = new CKEDITOR.dom.range(a.doc), e = a.editor, f; K.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(R) : (f = (f = h(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new H(M[f], a.doc), f.is("br") ||
                a.doc.createText(R).appendTo(f)); d && e.fire("saveSnapshot"); b(f); c.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); e.getSelection().selectRanges([c]); a.hotNode = f; d && e.fire("saveSnapshot")
        } function k(a, b) {
            return {
                canUndo: !0, modes: { wysiwyg: 1 }, exec: function () {
                    function e(c) {
                        var f = K.ie && 9 > K.version ? " " : R, g = a.hotNode && a.hotNode.getText() == f && a.element.equals(a.hotNode) && a.lastCmdDirection === !!b; d(a, function (d) {
                        g && a.hotNode && a.hotNode.remove(); d[b ? "insertAfter" : "insertBefore"](c); d.setAttributes({
                            "data-cke-magicline-hot": 1,
                            "data-cke-magicline-dir": !!b
                        }); a.lastCmdDirection = !!b
                        }); K.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach()
                    } return function (d) {
                        d = d.getSelection().getStartElement(); var g; d = d.getAscendant(U, 1); if (!q(a, d) && d && !d.equals(a.editable) && !d.contains(a.editable)) {
                        (g = h(d)) && "false" == g.getAttribute("contenteditable") && (d = g); a.element = d; g = f(a, d, !b); var k; n(g) && g.is(a.triggers) && g.is(X) && (!f(a, g, !b) || (k = f(a, g, !b)) && n(k) && k.is(a.triggers)) ? e(g) : (k = c(a, d), n(k) && (f(a, k, !b) ? (d = f(a, k, !b)) &&
                            n(d) && d.is(a.triggers) && e(k) : e(k)))
                        }
                    }
                }()
            }
        } function g(a, b) { if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1; var d = a.line; return d.wrap.equals(b) || d.wrap.contains(b) } function n(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.$ } function p(a) { if (!n(a)) return !1; var b; (b = w(a)) || (n(a) ? (b = { left: 1, right: 1, center: 1 }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1); return b } function w(a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] } function v(a, b) {
            return n(b) ? b.is(a.triggers) :
                null
        } function q(a, b) { if (!b) return !1; for (var d = b.getParents(1), c = d.length; c--;)for (var e = a.tabuList.length; e--;)if (d[c].hasAttribute(a.tabuList[e])) return !0; return !1 } function u(a, b, d) { b = b[d ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(ga) }); if (!b) return !1; t(a, b); return d ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y } function x(a) {
            var b = a.editable, d = a.mouse, c = a.view, f = a.triggerOffset; y(a); var h = d.y > (a.inInlineMode ? c.editable.top + c.editable.height / 2 : Math.min(c.editable.height, c.pane.height) /
                2), b = b[h ? "getLast" : "getFirst"](function (a) { return !(P(a) || S(a)) }); if (!b) return null; g(a, b) && (b = a.line.wrap[h ? "getPrevious" : "getNext"](function (a) { return !(P(a) || S(a)) })); if (!n(b) || p(b) || !v(a, b)) return null; t(a, b); return !h && 0 <= b.size.top && m(d.y, 0, b.size.top + f) ? (a = a.inInlineMode || 0 === c.scroll.y ? O : W, new e([null, b, G, Q, a])) : h && b.size.bottom <= c.pane.height && m(d.y, b.size.bottom - f, c.pane.height) ? (a = a.inInlineMode || m(b.size.bottom, c.pane.height - f, c.pane.height) ? J : W, new e([b, null, D, Q, a])) : null
        } function r(a) {
            var b =
                a.mouse, d = a.view, g = a.triggerOffset, h = c(a); if (!h) return null; t(a, h); var g = Math.min(g, 0 | h.size.outerHeight / 2), k = [], l, L; if (m(b.y, h.size.top - 1, h.size.top + g)) L = !1; else if (m(b.y, h.size.bottom - g, h.size.bottom + 1)) L = !0; else return null; if (p(h) || u(a, h, L) || h.getParent().is(Z)) return null; var r = f(a, h, !L); if (r) { if (r && r.type == CKEDITOR.NODE_TEXT) return null; if (n(r)) { if (p(r) || !v(a, r) || r.getParent().is(Z)) return null; k = [r, h][L ? "reverse" : "concat"]().concat([N, Q]) } } else h.equals(a.editable[L ? "getLast" : "getFirst"](a.isRelevant)) ?
                    (y(a), L && m(b.y, h.size.bottom - g, d.pane.height) && m(h.size.bottom, d.pane.height - g, d.pane.height) ? l = J : m(b.y, 0, h.size.top + g) && (l = O)) : l = W, k = [null, h][L ? "reverse" : "concat"]().concat([L ? D : G, Q, l, h.equals(a.editable[L ? "getLast" : "getFirst"](a.isRelevant)) ? L ? J : O : W]); return 0 in k ? new e(k) : null
        } function z(a, b, d, c) {
            for (var e = b.getDocumentPosition(), f = {}, g = {}, h = {}, k = {}, l = Y.length; l--;)f[Y[l]] = parseInt(b.getComputedStyle.call(b, "border-" + Y[l] + "-width"), 10) || 0, h[Y[l]] = parseInt(b.getComputedStyle.call(b, "padding-" +
                Y[l]), 10) || 0, g[Y[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + Y[l]), 10) || 0; d && !c || C(a, c); k.top = e.y - (d ? 0 : a.view.scroll.y); k.left = e.x - (d ? 0 : a.view.scroll.x); k.outerWidth = b.$.offsetWidth; k.outerHeight = b.$.offsetHeight; k.height = k.outerHeight - (h.top + h.bottom + f.top + f.bottom); k.width = k.outerWidth - (h.left + h.right + f.left + f.right); k.bottom = k.top + k.outerHeight; k.right = k.left + k.outerWidth; a.inInlineMode && (k.scroll = { top: b.$.scrollTop, left: b.$.scrollLeft }); return B({ border: f, padding: h, margin: g, ignoreScroll: d },
                    k, !0)
        } function t(a, b, d) { if (!n(b)) return b.size = null; if (!b.size) b.size = {}; else if (b.size.ignoreScroll == d && b.size.date > new Date - aa) return null; return B(b.size, z(a, b, d), { date: +new Date }, !0) } function y(a, b) { a.view.editable = z(a, a.editable, b, !0) } function C(a, b) {
        a.view || (a.view = {}); var d = a.view; if (!(!b && d && d.date > new Date - aa)) {
            var c = a.win, d = c.getScrollPosition(), c = c.getViewPaneSize(); B(a.view, {
                scroll: {
                    x: d.x, y: d.y, width: a.doc.$.documentElement.scrollWidth - c.width, height: a.doc.$.documentElement.scrollHeight -
                        c.height
                }, pane: { width: c.width, height: c.height, bottom: c.height + d.y }, date: +new Date
            }, !0)
        }
        } function A(a, b, d, c) { for (var f = c, g = c, h = 0, k = !1, l = !1, m = a.view.pane.height, n = a.mouse; n.y + h < m && 0 < n.y - h;) { k || (k = b(f, c)); l || (l = b(g, c)); !k && 0 < n.y - h && (f = d(a, { x: n.x, y: n.y - h })); !l && n.y + h < m && (g = d(a, { x: n.x, y: n.y + h })); if (k && l) break; h += 2 } return new e([f, g, null, null]) } CKEDITOR.plugins.add("magicline", {
            init: function (a) {
                var b = a.config, h = b.magicline_triggerOffset || 30, m = {
                    editor: a, enterMode: b.enterMode, triggerOffset: h, holdDistance: 0 |
                        h * (b.magicline_holdDistance || .5), boxColor: b.magicline_color || "#ff0000", rtl: "rtl" == b.contentsLangDirection, tabuList: ["data-cke-hidden-sel"].concat(b.magicline_tabuList || []), triggers: b.magicline_everywhere ? U : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                }, u, t, A; m.isRelevant = function (a) { return n(a) && !g(m, a) && !p(a) }; a.on("contentDom", function () {
                    var h = a.editable(), n = a.document, p = a.window; B(m, { editable: h, inInlineMode: h.isInline(), doc: n, win: p, hotNode: null }, !0); m.boundary = m.inInlineMode ? m.editable :
                        m.doc.getDocumentElement(); h.is(E.$inline) || (m.inInlineMode && !w(h) && h.setStyles({ position: "relative", top: null, left: null }), l.call(this, m), C(m), h.attachListener(a, "beforeUndoImage", function () { m.line.detach() }), h.attachListener(a, "beforeGetData", function () { m.line.wrap.getParent() && (m.line.detach(), a.once("getData", function () { m.line.attach() }, null, null, 1E3)) }, null, null, 0), h.attachListener(m.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function (b) {
                            if ("wysiwyg" == a.mode) if (m.inInlineMode) {
                                var d = b.data.$.clientX;
                                b = b.data.$.clientY; C(m); y(m, !0); var c = m.view.editable, e = m.view.scroll; d > c.left - e.x && d < c.right - e.x && b > c.top - e.y && b < c.bottom - e.y || (clearTimeout(A), A = null, m.line.detach())
                            } else clearTimeout(A), A = null, m.line.detach()
                        }), h.attachListener(h, "keyup", function () { m.hiddenMode = 0 }), h.attachListener(h, "keydown", function (b) { if ("wysiwyg" == a.mode) switch (b.data.getKeystroke()) { case 2228240: case 16: m.hiddenMode = 1, m.line.detach() } }), h.attachListener(m.inInlineMode ? h : n, "mousemove", function (b) {
                            t = !0; if ("wysiwyg" == a.mode &&
                                !a.readOnly && !A) { var d = { x: b.data.$.clientX, y: b.data.$.clientY }; A = setTimeout(function () { m.mouse = d; A = m.trigger = null; C(m); t && !m.hiddenMode && a.focusManager.hasFocus && !m.line.mouseNear() && (m.element = L(m, !0)) && ((m.trigger = x(m) || r(m) || T(m)) && !q(m, m.trigger.upper || m.trigger.lower) ? m.line.attach().place() : (m.trigger = null, m.line.detach()), t = !1) }, 30) }
                        }), h.attachListener(p, "scroll", function () {
                        "wysiwyg" == a.mode && (m.line.detach(), K.webkit && (m.hiddenMode = 1, clearTimeout(u), u = setTimeout(function () {
                        m.mouseDown || (m.hiddenMode =
                            0)
                        }, 50)))
                        }), h.attachListener(I ? n : p, "mousedown", function () { "wysiwyg" == a.mode && (m.line.detach(), m.hiddenMode = 1, m.mouseDown = 1) }), h.attachListener(I ? n : p, "mouseup", function () { m.hiddenMode = 0; m.mouseDown = 0 }), a.addCommand("accessPreviousSpace", k(m)), a.addCommand("accessNextSpace", k(m, !0)), a.setKeystroke([[b.magicline_keystrokePrevious, "accessPreviousSpace"], [b.magicline_keystrokeNext, "accessNextSpace"]]), a.on("loadSnapshot", function () {
                            var b, d, c, e; for (e in { p: 1, br: 1, div: 1 }) for (b = a.document.getElementsByTag(e),
                                c = b.count(); c--;)if ((d = b.getItem(c)).data("cke-magicline-hot")) { m.hotNode = d; m.lastCmdDirection = "true" === d.data("cke-magicline-dir") ? !0 : !1; return }
                        }), a._.magiclineBackdoor = { accessFocusSpace: d, boxTrigger: e, isLine: g, getAscendantTrigger: c, getNonEmptyNeighbour: f, getSize: z, that: m, triggerEdge: r, triggerEditable: x, triggerExpand: T })
                }, this)
            }
        }); var B = CKEDITOR.tools.extend, H = CKEDITOR.dom.element, F = H.createFromHtml, K = CKEDITOR.env, I = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, E = CKEDITOR.dtd, M = {}, G = 128, D = 64, N = 32, Q = 16,
            O = 4, J = 2, W = 1, R = " ", Z = E.$listItem, ga = E.$tableContent, X = B({}, E.$nonEditable, E.$empty), U = E.$block, aa = 100, ba = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", V = ba + "border-color:transparent;display:block;border-style:solid;", da = "\x3cspan\x3e" + R + "\x3c/span\x3e"; M[CKEDITOR.ENTER_BR] = "br"; M[CKEDITOR.ENTER_P] = "p"; M[CKEDITOR.ENTER_DIV] = "div"; e.prototype = {
                set: function (a, b, d) { this.properties = a + b + (d || W); return this }, is: function (a) {
                    return (this.properties &
                        a) == a
                }
            }; var L = function () { function a(b, d) { var c = b.$.elementFromPoint(d.x, d.y); return c && c.nodeType ? new CKEDITOR.dom.element(c) : null } return function (b, d, c) { if (!b.mouse) return null; var e = b.doc, f = b.line.wrap; c = c || b.mouse; var h = a(e, c); d && g(b, h) && (f.hide(), h = a(e, c), f.show()); return !h || h.type != CKEDITOR.NODE_ELEMENT || !h.$ || K.ie && 9 > K.version && !b.boundary.equals(h) && !b.boundary.contains(h) ? null : h } }(), P = CKEDITOR.dom.walker.whitespaces(), S = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), T = function () {
                function d(e) {
                    var f =
                        e.element, g, h, k; if (!n(f) || f.contains(e.editable) || f.isReadOnly()) return null; k = A(e, function (a, b) { return !b.equals(a) }, function (a, b) { return L(a, !0, b) }, f); g = k.upper; h = k.lower; if (a(e, g, h)) return k.set(N, 8); if (g && f.contains(g)) for (; !g.getParent().equals(f);)g = g.getParent(); else g = f.getFirst(function (a) { return c(e, a) }); if (h && f.contains(h)) for (; !h.getParent().equals(f);)h = h.getParent(); else h = f.getLast(function (a) { return c(e, a) }); if (!g || !h) return null; t(e, g); t(e, h); if (!m(e.mouse.y, g.size.top, h.size.bottom)) return null;
                    for (var f = Number.MAX_VALUE, l, r, p, u; h && !h.equals(g) && (r = g.getNext(e.isRelevant));)l = Math.abs(b(e, g, r) - e.mouse.y), l < f && (f = l, p = g, u = r), g = r, t(e, g); if (!p || !u || !m(e.mouse.y, p.size.top, u.size.bottom)) return null; k.upper = p; k.lower = u; return k.set(N, 8)
                } function c(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || S(b) || p(b) || g(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (b) {
                    var c = d(b), e; if (e = c) {
                        e = c.upper; var f = c.lower; e = !e || !f || p(f) || p(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ?
                            !1 : v(b, e) && v(b, f) && a(b, e, f) ? !0 : !1
                    } return e ? c : null
                }
            }(), Y = ["top", "left", "right", "bottom"]
    }(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52, function () {
        function a(a) { if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return []; for (var b = [], c = ["style", "className"], d = 0; d < c.length; d++) { var e = a.$.elements.namedItem(c[d]); e && (e = new CKEDITOR.dom.element(e), b.push([e, e.nextSibling]), e.remove()) } return b }
        function e(a, b) { if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length) for (var c = b.length - 1; 0 <= c; c--) { var d = b[c][0], e = b[c][1]; e ? d.insertBefore(e) : d.appendTo(a) } } function c(b, c) { var f = a(b), d = {}, k = b.$; c || (d["class"] = k.className || "", k.className = ""); d.inline = k.style.cssText || ""; c || (k.style.cssText = "position: static; overflow: visible"); e(f); return d } function b(b, c) { var f = a(b), d = b.$; "class" in c && (d.className = c["class"]); "inline" in c && (d.style.cssText = c.inline); e(f) } function f(a) {
            if (!a.editable().isInline()) {
                var b =
                    CKEDITOR.instances, c; for (c in b) { var d = b[c]; "wysiwyg" != d.mode || d.readOnly || (d = d.document.getBody(), d.setAttribute("contentEditable", !1), d.setAttribute("contentEditable", !0)) } a.editable().hasFocus && (a.toolbox.focus(), a.focus())
            }
        } CKEDITOR.plugins.add("maximize", {
            init: function (a) {
                function e() { var b = k.getViewPaneSize(); a.resize(b.width, b.height, null, !0) } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var l = a.lang, d = CKEDITOR.document, k = d.getWindow(), g, n, p, w = CKEDITOR.TRISTATE_OFF; a.addCommand("maximize",
                        {
                            modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS }, readOnly: 1, editorFocus: !1, exec: function () {
                                var v = a.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }), q = a.ui.space("contents"); if ("wysiwyg" == a.mode) { var u = a.getSelection(); g = u && u.getRanges(); n = k.getScrollPosition() } else { var x = a.editable().$; g = !CKEDITOR.env.ie && [x.selectionStart, x.selectionEnd]; n = [x.scrollLeft, x.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                                    k.on("resize", e); p = k.getScrollPosition();
                                    for (u = a.container; u = u.getParent();)u.setCustomData("maximize_saved_styles", c(u)), u.setStyle("z-index", a.config.baseFloatZIndex - 5); q.setCustomData("maximize_saved_styles", c(q, !0)); v.setCustomData("maximize_saved_styles", c(v, !0)); q = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 }; d.getDocumentElement().setStyles(q); !CKEDITOR.env.gecko && d.getDocumentElement().setStyle("position", "fixed"); CKEDITOR.env.gecko && CKEDITOR.env.quirks || d.getBody().setStyles(q); CKEDITOR.env.ie ? setTimeout(function () {
                                        k.$.scrollTo(0,
                                            0)
                                    }, 0) : k.$.scrollTo(0, 0); v.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"); v.$.offsetLeft; v.setStyles({ "z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px" }); v.addClass("cke_maximized"); e(); q = v.getDocumentPosition(); v.setStyles({ left: -1 * q.x + "px", top: -1 * q.y + "px" }); CKEDITOR.env.gecko && f(a)
                                } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                    k.removeListener("resize", e); for (var u = [q, v], r = 0; r < u.length; r++)b(u[r], u[r].getCustomData("maximize_saved_styles")), u[r].removeCustomData("maximize_saved_styles");
                                    for (u = a.container; u = u.getParent();)b(u, u.getCustomData("maximize_saved_styles")), u.removeCustomData("maximize_saved_styles"); CKEDITOR.env.ie ? setTimeout(function () { k.$.scrollTo(p.x, p.y) }, 0) : k.$.scrollTo(p.x, p.y); v.removeClass("cke_maximized"); CKEDITOR.env.webkit && (v.setStyle("display", "inline"), setTimeout(function () { v.setStyle("display", "block") }, 0)); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: q.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                } this.toggleState(); if (u =
                                    this.uiItems[0]) q = this.state == CKEDITOR.TRISTATE_OFF ? l.maximize.maximize : l.maximize.minimize, u = CKEDITOR.document.getById(u._.id), u.getChild(1).setHtml(q), u.setAttribute("title", q), u.setAttribute("href", 'javascript:void("' + q + '");'); "wysiwyg" == a.mode ? g ? (CKEDITOR.env.gecko && f(a), a.getSelection().selectRanges(g), (x = a.getSelection().getStartElement()) && x.scrollIntoView(!0)) : k.$.scrollTo(n.x, n.y) : (g && (x.selectionStart = g[0], x.selectionEnd = g[1]), x.scrollLeft = n[0], x.scrollTop = n[1]); g = n = null; w = this.state; a.fire("maximize",
                                        this.state)
                            }, canUndo: !1
                        }); a.ui.addButton && a.ui.addButton("Maximize", { label: l.maximize.maximize, command: "maximize", toolbar: "tools,10" }); a.on("mode", function () { var b = a.getCommand("maximize"); b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : w) }, null, null, 100)
                }
            }
        })
    }(), function () {
        function a(a, c, b) { var f = CKEDITOR.cleanWord; f ? b() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || c + "filter/default.js"), CKEDITOR.scriptLoader.load(a, b, null, !0)); return !f } CKEDITOR.plugins.add("pastefromword",
            {
                requires: "clipboard", init: function (e) {
                    function c(a) {
                        var b = CKEDITOR.plugins.pastefromword && CKEDITOR.plugins.pastefromword.images, d, c = []; if (b && a.editor.filter.check("img[src]") && (d = b.extractTagsFromHtml(a.data.dataValue), 0 !== d.length && (b = b.extractFromRtf(a.data.dataTransfer["text/rtf"]), 0 !== b.length && (CKEDITOR.tools.array.forEach(b, function (a) { c.push(a.type ? "data:" + a.type + ";base64," + CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(a.hex)) : null) }, this), d.length === c.length)))) for (b =
                            0; b < d.length; b++)0 === d[b].indexOf("file://") && c[b] && (a.data.dataValue = a.data.dataValue.replace(d[b], c[b]))
                    } var b = 0, f = this.path, m = void 0 === e.config.pasteFromWord_inlineImages ? !0 : e.config.pasteFromWord_inlineImages; e.addCommand("pastefromword", { canUndo: !1, async: !0, exec: function (a, c) { b = 1; a.execCommand("paste", { type: "html", notification: c && "undefined" !== typeof c.notification ? c.notification : !0 }) } }); CKEDITOR.plugins.clipboard.addPasteButton(e, "PasteFromWord", {
                        label: e.lang.pastefromword.toolbar, command: "pastefromword",
                        toolbar: "clipboard,50"
                    }); e.on("paste", function (c) {
                        var l = c.data, d = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? l.dataTransfer.getData("text/html", !0) : null, k = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? l.dataTransfer.getData("text/rtf") : null, d = d || l.dataValue, g = { dataValue: d, dataTransfer: { "text/rtf": k } }, k = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, k = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(d) || k.test(d); if (d &&
                            (b || k) && (!1 !== e.fire("pasteFromWord", g) || b)) { l.dontFilter = !0; var m = a(e, f, function () { if (m) e.fire("paste", l); else if (!e.config.pasteFromWordPromptCleanup || b || confirm(e.lang.pastefromword.confirmCleanup)) g.dataValue = CKEDITOR.cleanWord(g.dataValue, e), e.fire("afterPasteFromWord", g), l.dataValue = g.dataValue, !0 === e.config.forcePasteAsPlainText ? l.type = "text" : CKEDITOR.plugins.clipboard.isCustomCopyCutSupported || "allow-word" !== e.config.forcePasteAsPlainText || (l.type = "html"); b = 0 }); m && c.cancel() }
                    }, null, null, 3);
                    if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && m) e.on("afterPasteFromWord", c)
                }
            })
    }(), function () {
        var a = {
            canUndo: !1, async: !0, exec: function (a, c) {
                var b = a.lang, f = CKEDITOR.tools.keystrokeToString(b.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)), m = c && "undefined" !== typeof c.notification ? c.notification : !c || !c.from || "keystrokeHandler" === c.from && CKEDITOR.env.ie, b = m && "string" === typeof m ? m : b.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + f.aria + '"\x3e' +
                    f.display + "\x3c/kbd\x3e"); a.execCommand("paste", { type: "text", notification: m ? b : !1 })
            }
        }; CKEDITOR.plugins.add("pastetext", {
            requires: "clipboard", init: function (e) {
                var c = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86; e.addCommand("pastetext", a); e.setKeystroke(c, "pastetext"); CKEDITOR.plugins.clipboard.addPasteButton(e, "PasteText", { label: e.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (e.config.forcePasteAsPlainText) e.on("beforePaste",
                    function (a) { "html" != a.data.type && (a.data.type = "text") }); e.on("pasteState", function (a) { e.getCommand("pastetext").setState(a.data) })
            }
        })
    }(), CKEDITOR.plugins.add("removeformat", { init: function (a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } }), CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (a) {
                    for (var e = a._.removeFormatRegex ||
                        (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), c = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), b = CKEDITOR.plugins.removeformat.filter, f = a.getSelection().getRanges().createIterator(), m = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, h = [], l; l = f.getNextRange();) {
                            var d = l.createBookmark(); l = a.createRange(); l.setStartBefore(d.startNode); d.endNode && l.setEndAfter(d.endNode); l.collapsed || l.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var k = l.createBookmark(), g = k.startNode, n = k.endNode, p = function (d) { for (var c = a.elementPath(d), f = c.elements, g = 1, h; (h = f[g]) && !h.equals(c.block) && !h.equals(c.blockLimit); g++)e.test(h.getName()) && b(a, h) && d.breakParent(h) }; p(g); if (n) for (p(n), g = g.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); g && !g.equals(n);)if (g.isReadOnly()) { if (g.getPosition(n) & CKEDITOR.POSITION_CONTAINS) break; g = g.getNext(m) } else p = g.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == g.getName() && g.data("cke-realelement") || g.hasAttribute("data-cke-bookmark") ||
                            !b(a, g) || (e.test(g.getName()) ? g.remove(1) : (g.removeAttributes(c), a.fire("removeFormatCleanup", g))), g = p; k.startNode.remove(); k.endNode && k.endNode.remove(); l.moveToBookmark(d); h.push(l)
                    } a.forceNextSelectionCheck(); a.getSelection().selectRanges(h)
                }
            }
        }, filter: function (a, e) { for (var c = a._.removeFormatFilters || [], b = 0; b < c.length; b++)if (!1 === c[b](e)) return !1; return !0 }
    }, CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(a) },
    CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", CKEDITOR.plugins.add("resize", {
        init: function (a) {
            function e(c) {
                var e = d.width, f = d.height, h = e + (c.data.$.screenX - l.x) * ("rtl" == m ? -1 : 1); c = f + (c.data.$.screenY - l.y); k && (e = Math.max(b.resize_minWidth, Math.min(h, b.resize_maxWidth))); g && (f = Math.max(b.resize_minHeight, Math.min(c, b.resize_maxHeight)));
                a.resize(k ? e : null, f)
            } function c() { CKEDITOR.document.removeListener("mousemove", e); CKEDITOR.document.removeListener("mouseup", c); a.document && (a.document.removeListener("mousemove", e), a.document.removeListener("mouseup", c)) } var b = a.config, f = a.ui.spaceId("resizer"), m = a.element ? a.element.getDirection(1) : "ltr"; !b.resize_dir && (b.resize_dir = "vertical"); void 0 === b.resize_maxWidth && (b.resize_maxWidth = 3E3); void 0 === b.resize_maxHeight && (b.resize_maxHeight = 3E3); void 0 === b.resize_minWidth && (b.resize_minWidth =
                750); void 0 === b.resize_minHeight && (b.resize_minHeight = 250); if (!1 !== b.resize_enabled) {
                    var h = null, l, d, k = ("both" == b.resize_dir || "horizontal" == b.resize_dir) && b.resize_minWidth != b.resize_maxWidth, g = ("both" == b.resize_dir || "vertical" == b.resize_dir) && b.resize_minHeight != b.resize_maxHeight, n = CKEDITOR.tools.addFunction(function (f) {
                        h || (h = a.getResizable()); d = { width: h.$.offsetWidth || 0, height: h.$.offsetHeight || 0 }; l = { x: f.screenX, y: f.screenY }; b.resize_minWidth > d.width && (b.resize_minWidth = d.width); b.resize_minHeight >
                            d.height && (b.resize_minHeight = d.height); CKEDITOR.document.on("mousemove", e); CKEDITOR.document.on("mouseup", c); a.document && (a.document.on("mousemove", e), a.document.on("mouseup", c)); f.preventDefault && f.preventDefault()
                    }); a.on("destroy", function () { CKEDITOR.tools.removeFunction(n) }); a.on("uiSpace", function (b) {
                        if ("bottom" == b.data.space) {
                            var d = ""; k && !g && (d = " cke_resizer_horizontal"); !k && g && (d = " cke_resizer_vertical"); var c = '\x3cspan id\x3d"' + f + '" class\x3d"cke_resizer' + d + " cke_resizer_" + m + '" title\x3d"' +
                                CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == m ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == m && "ltr" == d ? b.data.html += c : b.data.html = c + b.data.html
                        }
                    }, a, null, 100); a.on("maximize", function (b) { a.ui.space("resizer")[b.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
                }
        }
    }), CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu", onLoad: function () {
            var a = function (a) {
                var c = this._, b = c.menu; c.state !== CKEDITOR.TRISTATE_DISABLED && (c.on && b ? b.hide() : (c.previousState =
                    c.state, b || (b = c.menu = new CKEDITOR.menu(a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.common.options } } }), b.onHide = CKEDITOR.tools.bind(function () { var b = this.command ? a.getCommand(this.command).modes : this.modes; this.setState(!b || b[a.mode] ? c.previousState : CKEDITOR.TRISTATE_DISABLED); c.on = 0 }, this), this.onMenu && b.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), c.on = 1, setTimeout(function () { b.show(CKEDITOR.document.getById(c.id), 4) }, 0)))
            }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button,
                $: function (e) { delete e.panel; this.base(e); this.hasArrow = "menu"; this.click = a }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.menuButton(a) } } }
            })
        }, beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
    }), CKEDITOR.UI_MENUBUTTON = "menubutton", "use strict", CKEDITOR.plugins.add("scayt", {
        requires: "menubutton,dialog", tabToOpen: null, dialogName: "scaytDialog", onLoad: function (a) {
        "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path +
            "skins/" + CKEDITOR.skin.name + "/scayt.css")); CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "dialogs/dialog.css"))
        }, init: function (a) {
            var e = this, c = CKEDITOR.plugins.scayt; this.bindEvents(a); this.parseConfig(a); this.addRule(a); CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js")); this.addMenuItems(a); var b = a.lang.scayt, f = CKEDITOR.env; a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                label: b.text_title, title: a.plugins.wsc ? a.lang.wsc.title : b.text_title, modes: {
                    wysiwyg: !(f.ie &&
                        (8 > f.version || f.quirks))
                }, toolbar: "spellchecker,20", refresh: function () { var b = a.ui.instances.Scayt.getState(); a.scayt && (b = c.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF); a.fire("scaytButtonState", b) }, onRender: function () { var b = this; a.on("scaytButtonState", function (a) { void 0 !== typeof a.data && b.setState(a.data) }) }, onMenu: function () {
                    var b = a.scayt; a.getMenuItem("scaytToggle").label = a.lang.scayt[b && c.state.scayt[a.name] ? "btn_disable" : "btn_enable"]; var e = {
                        scaytToggle: CKEDITOR.TRISTATE_OFF,
                        scaytOptions: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                    }; a.config.scayt_uiTabs[0] || delete e.scaytOptions; a.config.scayt_uiTabs[1] || delete e.scaytLangs; a.config.scayt_uiTabs[2] || delete e.scaytDict; b && !CKEDITOR.plugins.scayt.isNewUdSupported(b) &&
                        (delete e.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage()); return e
                }
            }); a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b, c) { var f = a.scayt, d, k; f && (k = f.getSelectionNode()) && (d = e.menuGenerator(a, k), f.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" ."))); return d }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function (b) { return function () { var c = a.scayt; c && c.hideBanner(); return b.apply(this) } }))
        },
        addMenuItems: function (a) {
            var e = this, c = CKEDITOR.plugins.scayt; a.addMenuGroup("scaytButton"); for (var b = a.config.scayt_contextMenuItemsOrder.split("|"), f = 0; f < b.length; f++)b[f] = "scayt_" + b[f]; if ((b = ["grayt_description", "grayt_suggest", "grayt_control"].concat(b)) && b.length) for (f = 0; f < b.length; f++)a.addMenuGroup(b[f], f - 10); a.addCommand("scaytToggle", { exec: function (a) { var b = a.scayt; c.state.scayt[a.name] = !c.state.scayt[a.name]; !0 === c.state.scayt[a.name] ? b || c.createScayt(a) : b && c.destroy(a) } }); a.addCommand("scaytAbout",
                { exec: function (a) { a.scayt.tabToOpen = "about"; c.openDialog(e.dialogName, a) } }); a.addCommand("scaytOptions", { exec: function (a) { a.scayt.tabToOpen = "options"; c.openDialog(e.dialogName, a) } }); a.addCommand("scaytLangs", { exec: function (a) { a.scayt.tabToOpen = "langs"; c.openDialog(e.dialogName, a) } }); a.addCommand("scaytDict", { exec: function (a) { a.scayt.tabToOpen = "dictionaries"; c.openDialog(e.dialogName, a) } }); b = {
                    scaytToggle: { label: a.lang.scayt.btn_enable, group: "scaytButton", command: "scaytToggle" }, scaytAbout: {
                        label: a.lang.scayt.btn_about,
                        group: "scaytButton", command: "scaytAbout"
                    }, scaytOptions: { label: a.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" }, scaytLangs: { label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" }, scaytDict: { label: a.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict" }
                }; a.plugins.wsc && (b.WSC = {
                    label: a.lang.wsc.toolbar, group: "scaytButton", onClick: function () {
                        var b = CKEDITOR.plugins.scayt, c = a.scayt, e = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
                        (e = e.replace(/\s/g, "")) ? (c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!")
                    }
                }); a.addMenuItems(b)
        }, bindEvents: function (a) {
            var e = CKEDITOR.plugins.scayt, c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, b = function () { e.destroy(a) }, f = function () { !e.state.scayt[a.name] || a.readOnly || a.scayt || e.createScayt(a) }, m = function () {
                var b = a.editable(); b.attachListener(b, "focus", function (b) {
                    CKEDITOR.plugins.scayt && !a.scayt && setTimeout(f,
                        0); b = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt; var e, g; if ((c || b) && a._.savedSelection) { b = a._.savedSelection.getSelectedElement(); b = !b && a._.savedSelection.getRanges(); for (var h = 0; h < b.length; h++)g = b[h], "string" === typeof g.startContainer.$.nodeValue && (e = g.startContainer.getText().length, (e < g.startOffset || e < g.endOffset) && a.unlockSelection(!1)) }
                }, this, null, -10)
            }, h = function () {
                c ? a.config.scayt_inlineModeImmediateMarkup ? f() : (a.on("blur", function () { setTimeout(b, 0) }), a.on("focus",
                    f), a.focusManager.hasFocus && f()) : f(); m(); var e = a.editable(); e.attachListener(e, "mousedown", function (b) { b = b.data.getTarget(); var c = a.widgets && a.widgets.getByElement(b); c && (c.wrapper = b.getAscendant(function (a) { return a.hasAttribute("data-cke-widget-wrapper") }, !0)) }, this, null, -10)
            }; a.on("contentDom", h); a.on("beforeCommandExec", function (b) {
                var d = a.scayt, c = !1, f = !1, h = !0; b.data.name in e.options.disablingCommandExec && "wysiwyg" == a.mode ? d && (e.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) :
                    "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !d || ("cut" === b.data.name && (h = !1, f = !0), "language" === b.data.name && (f = c = !0), a.fire("reloadMarkupScayt", { removeOptions: { removeInside: h, forceBookmark: f, language: c }, timeout: 0 }))
            }); a.on("beforeSetMode", function (b) {
                if ("source" == b.data) {
                    if (b = a.scayt) e.destroy(a), a.fire("scaytButtonState",
                        CKEDITOR.TRISTATE_DISABLED); a.document && a.document.getBody().removeAttribute("_jquid")
                }
            }); a.on("afterCommandExec", function (b) { "wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function () { e.reloadMarkup(a.scayt) }, 250) }); a.on("readOnly", function (b) { var d; b && (d = a.scayt, !0 === b.editor.readOnly ? d && d.fire("removeMarkupInDocument", {}) : d ? e.reloadMarkup(d) : "wysiwyg" == b.editor.mode && !0 === e.state.scayt[b.editor.name] && (e.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON))) });
            a.on("beforeDestroy", b); a.on("setData", function () { b(); (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && h() }, this, null, 50); a.on("reloadMarkupScayt", function (b) { var d = b.data && b.data.removeOptions, c = b.data && b.data.timeout, f = b.data && b.data.language, h = a.scayt; h && setTimeout(function () { f && (d.selectionNode = a.plugins.language.getCurrentLangElement(a), d.selectionNode = d.selectionNode && d.selectionNode.$ || null); h.removeMarkupInSelectionNode(d); e.reloadMarkup(h) }, c || 0) }); a.on("insertElement", function () {
                a.fire("reloadMarkupScayt",
                    { removeOptions: { forceBookmark: !0 } })
            }, this, null, 50); a.on("insertHtml", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("insertText", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("scaytDialogShown", function (b) { b.data.selectPage(a.scayt.tabToOpen) })
        }, parseConfig: function (a) {
            var e = CKEDITOR.plugins.scayt; e.replaceOldOptionsNames(a.config); "boolean" !== typeof a.config.scayt_autoStartup &&
                (a.config.scayt_autoStartup = !1); e.state.scayt[a.name] = a.config.scayt_autoStartup; "boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1); "boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1); e.state.grayt[a.name] = a.config.grayt_autoStartup; a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignoreall|add"); a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control");
            a.config.scayt_sLang || (a.config.scayt_sLang = "en_US"); if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 3; if (void 0 === a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 3; if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = ""; if (void 0 ===
                a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null; if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) { var c = [], b = []; a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(","); CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) { 1 === Number(a) || 0 === Number(a) ? (b.push(!0), c.push(Number(a))) : b.push(!1) }); null === CKEDITOR.tools.search(b, !1) ? a.config.scayt_uiTabs = c : a.config.scayt_uiTabs = [1, 1, 1] } else a.config.scayt_uiTabs =
                    [1, 1, 1]; "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null); "string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null); "string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort = null); "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null); a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on"); "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");
            "string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-"); "string" !== typeof a.config.scayt_srcUrl && (e = document.location.protocol, e = -1 != e.search(/https?:/) ? e : "http:", a.config.scayt_srcUrl = e + "//svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js"); "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0); "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0); CKEDITOR.config.scayt_handleUndoRedo =
                CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1; "boolean" !== typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1); "object" !== typeof a.config.scayt_multiLanguageStyles && (a.config.scayt_multiLanguageStyles = {}); a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1); a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1); a.config.scayt_ignoreWordsWithMixedCases &&
                    "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1); a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1); if (a.config.scayt_disableOptionsStorage) {
                        var e = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0, f = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
                        m = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"], h = CKEDITOR.tools.search, l = CKEDITOR.tools.indexOf; a.config.scayt_disableOptionsStorage = function (a) { for (var b = [], c = 0; c < a.length; c++) { var e = a[c], p = !!h(a, "options"); if (!h(f, e) || p && h(m, function (a) { if ("lang" === a) return !1 })) return; h(m, e) && m.splice(l(m, e), 1); if ("all" === e || p && h(a, "lang")) return []; "options" === e && (m = ["lang"]) } return b = b.concat(m) }(e)
                    } a.config.scayt_disableCache && "boolean" !== typeof a.config.scayt_disableCache &&
                        (a.config.scayt_disableCache = !1); if (void 0 === a.config.scayt_cacheSize || "number" != typeof a.config.scayt_cacheSize || 1 > a.config.scayt_cacheSize) a.config.scayt_cacheSize = 4E3
        }, addRule: function (a) {
            var e = CKEDITOR.plugins.scayt, c = a.dataProcessor, b = c && c.htmlFilter, f = a._.elementsPath && a._.elementsPath.filters, c = c && c.dataFilter, m = a.addRemoveFormatFilter, h = function (b) { if (a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute))) return !1 }, l = function (b) {
                var c =
                    !0; a.scayt && (b.hasAttribute(e.options.data_attribute_name) || b.hasAttribute(e.options.problem_grammar_data_attribute)) && (c = !1); return c
            }; f && f.push(h); c && c.addRules({ elements: { span: function (a) { var b = a.hasClass(e.options.misspelled_word_class) && a.attributes[e.options.data_attribute_name], c = a.hasClass(e.options.problem_grammar_class) && a.attributes[e.options.problem_grammar_data_attribute]; e && (b || c) && delete a.name; return a } } }); b && b.addRules({
                elements: {
                    span: function (a) {
                        var b = a.hasClass(e.options.misspelled_word_class) &&
                            a.attributes[e.options.data_attribute_name], c = a.hasClass(e.options.problem_grammar_class) && a.attributes[e.options.problem_grammar_data_attribute]; e && (b || c) && delete a.name; return a
                    }
                }
            }); m && m.call(a, l)
        }, scaytMenuDefinition: function (a) {
            var e = this, c = CKEDITOR.plugins.scayt; a = a.scayt; return {
                scayt: {
                    scayt_ignore: { label: a.getLocal("btn_ignore"), group: "scayt_control", order: 1, exec: function (a) { a.scayt.ignoreWord() } }, scayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function (a) { a.scayt.ignoreAllWords() } },
                    scayt_add: { label: a.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function (a) { var c = a.scayt; setTimeout(function () { c.addWordToUserDictionary() }, 10) } }, scayt_option: { label: a.getLocal("btn_options"), group: "scayt_control", order: 4, exec: function (a) { a.scayt.tabToOpen = "options"; c.openDialog(e.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[0] ? !0 : !1 } }, scayt_language: {
                        label: a.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function (a) {
                            a.scayt.tabToOpen = "langs"; c.openDialog(e.dialogName,
                                a)
                        }, verification: function (a) { return 1 == a.config.scayt_uiTabs[1] ? !0 : !1 }
                    }, scayt_dictionary: { label: a.getLocal("btn_dictionaries"), group: "scayt_control", order: 6, exec: function (a) { a.scayt.tabToOpen = "dictionaries"; c.openDialog(e.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[2] ? !0 : !1 } }, scayt_about: { label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (a) { a.scayt.tabToOpen = "about"; c.openDialog(e.dialogName, a) } }
                }, grayt: {
                    grayt_problemdescription: {
                        label: "Grammar problem description",
                        group: "grayt_description", order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function (a) { }
                    }, grayt_ignore: { label: a.getLocal("btn_ignore"), group: "grayt_control", order: 2, exec: function (a) { a.scayt.ignorePhrase() } }, grayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "grayt_control", order: 3, exec: function (a) { a.scayt.ignoreAllPhrases() } }
                }
            }
        }, buildSuggestionMenuItems: function (a, e, c) {
            var b = {}, f = {}, m = c ? "word" : "phrase", h = c ? "startGrammarCheck" : "startSpellCheck", l = a.scayt; if (0 < e.length && "no_any_suggestions" !== e[0]) if (c) for (c =
                0; c < e.length; c++) {
                    var d = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[c].replace(" ", "_"); a.addCommand(d, this.createCommand(CKEDITOR.plugins.scayt.suggestions[c], m, h)); c < a.config.scayt_maxSuggestions ? (a.addMenuItem(d, { label: e[c], command: d, group: "scayt_suggest", order: c + 1 }), b[d] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(d, { label: e[c], command: d, group: "scayt_moresuggest", order: c + 1 }), f[d] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", {
                        label: l.getLocal("btn_moreSuggestions"),
                        group: "scayt_moresuggest", order: 10, getItems: function () { return f }
                    }), b.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
            } else for (c = 0; c < e.length; c++)d = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[c].replace(" ", "_"), a.addCommand(d, this.createCommand(CKEDITOR.plugins.scayt.suggestions[c], m, h)), a.addMenuItem(d, { label: e[c], command: d, group: "grayt_suggest", order: c + 1 }), b[d] = CKEDITOR.TRISTATE_OFF; else b.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", { exec: function () { } }), a.addMenuItem("no_scayt_suggest",
                { label: l.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 }); return b
        }, menuGenerator: function (a, e) {
            var c = a.scayt, b = this.scaytMenuDefinition(a), f = {}, m = a.config.scayt_contextCommands.split("|"), h = e.getAttribute(c.getLangAttribute()) || c.getLang(), l, d, k, g; d = c.isScaytNode(e); k = c.isGraytNode(e); d ? (b = b.scayt, l = e.getAttribute(c.getScaytNodeAttributeName()), c.fire("getSuggestionsList", { lang: h, word: l }), f = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions,
                d)) : k && (b = b.grayt, f = e.getAttribute(c.getGraytNodeAttributeName()), c.getGraytNodeRuleAttributeName ? (l = e.getAttribute(c.getGraytNodeRuleAttributeName()), c.getProblemDescriptionText(f, l, h)) : c.getProblemDescriptionText(f, h), g = c.getProblemDescriptionText(f, l, h), b.grayt_problemdescription && g && (g = g.replace(/([.!?])\s/g, "$1\x3cbr\x3e"), b.grayt_problemdescription.label = g), c.fire("getGrammarSuggestionsList", { lang: h, phrase: f, rule: l }), f = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, d)); if (d &&
                    "off" == a.config.scayt_contextCommands) return f; for (var n in b) d && -1 == CKEDITOR.tools.indexOf(m, n.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || k && "grayt_problemdescription" !== n && -1 == CKEDITOR.tools.indexOf(m, n.replace("grayt_", "")) && "all" != a.config.scayt_contextCommands || (f[n] = "undefined" != typeof b[n].state ? b[n].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof b[n].verification || b[n].verification(a) || delete f[n], a.addCommand(n, { exec: b[n].exec }), a.addMenuItem(n, {
                        label: a.lang.scayt[b[n].label] ||
                            b[n].label, command: n, group: b[n].group, order: b[n].order
                    })); return f
        }, createCommand: function (a, e, c) { return { exec: function (b) { b = b.scayt; var f = {}; f[e] = a; b.replaceSelectionNode(f); "startGrammarCheck" === c && b.removeMarkupInSelectionNode({ grammarOnly: !0 }); b.fire(c) } } }
    }), CKEDITOR.plugins.scayt = {
        charsToObserve: [{
            charName: "cke-fillingChar", charCode: function () {
                var a = CKEDITOR.version.match(/^\d(\.\d*)*/), a = a && a[0], e; if (a) {
                    e = "4.5.7"; var c, a = a.replace(/\./g, ""); e = e.replace(/\./g, ""); c = a.length - e.length; c = 0 <= c ? c :
                        0; e = parseInt(a) >= parseInt(e) * Math.pow(10, c)
                } return e ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203)
            }()
        }], state: { scayt: {}, grayt: {} }, warningCounter: 0, suggestions: [], options: { disablingCommandExec: { source: !0, newpage: !0, templates: !0 }, data_attribute_name: "data-scayt-word", misspelled_word_class: "scayt-misspell-word", problem_grammar_data_attribute: "data-grayt-phrase", problem_grammar_class: "gramm-problem" }, backCompatibilityMap: {
            scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost",
            scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath", scayt_customerid: "scayt_customerId"
        }, openDialog: function (a, e) { var c = e.scayt; c.isAllModulesReady && !1 === c.isAllModulesReady() || (e.lockSelection(), e.openDialog(a)) }, alarmCompatibilityMessage: function () {
        5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
            this.warningCounter += 1)
        }, isNewUdSupported: function (a) { return a.getUserDictionary ? !0 : !1 }, reloadMarkup: function (a) { var e; a && (e = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), e && e.ltr && e.rtl && a.fire("startSpellCheck, startGrammarCheck"))) }, replaceOldOptionsNames: function (a) { for (var e in a) e in this.backCompatibilityMap && (a[this.backCompatibilityMap[e]] = a[e], delete a[e]) }, createScayt: function (a) {
            var e = this, c = CKEDITOR.plugins.scayt; this.loadScaytLibrary(a, function (a) {
                function f(a) {
                    return new SCAYT.CKSCAYT(a,
                        function () { }, function () { })
                } var m; a.window && (m = "BODY" == a.editable().$.nodeName ? a.window.getFrame() : a.editable()); if (m) {
                    m = {
                        lang: a.config.scayt_sLang, container: m.$, customDictionary: a.config.scayt_customDictionaryIds, userDictionaryName: a.config.scayt_userDictionaryName, localization: a.langCode, customer_id: a.config.scayt_customerId, customPunctuation: a.config.scayt_customPunctuation, debug: a.config.scayt_debug, data_attribute_name: e.options.data_attribute_name, misspelled_word_class: e.options.misspelled_word_class,
                        problem_grammar_data_attribute: e.options.problem_grammar_data_attribute, problem_grammar_class: e.options.problem_grammar_class, "options-to-restore": a.config.scayt_disableOptionsStorage, focused: a.editable().hasFocus, ignoreElementsRegex: a.config.scayt_elementsToIgnore, ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore, minWordLength: a.config.scayt_minWordLength, multiLanguageMode: a.config.scayt_multiLanguageMode, multiLanguageStyles: a.config.scayt_multiLanguageStyles, graytAutoStartup: a.config.grayt_autoStartup,
                        disableCache: a.config.scayt_disableCache, cacheSize: a.config.scayt_cacheSize, charsToObserve: c.charsToObserve
                    }; a.config.scayt_serviceProtocol && (m.service_protocol = a.config.scayt_serviceProtocol); a.config.scayt_serviceHost && (m.service_host = a.config.scayt_serviceHost); a.config.scayt_servicePort && (m.service_port = a.config.scayt_servicePort); a.config.scayt_servicePath && (m.service_path = a.config.scayt_servicePath); "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (m["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords);
                    "boolean" === typeof a.config.scayt_ignoreDomainNames && (m["ignore-domain-names"] = a.config.scayt_ignoreDomainNames); "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases && (m["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases); "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (m["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers); var h; try { h = f(m) } catch (l) { e.alarmCompatibilityMessage(), delete m.charsToObserve, h = f(m) } h.subscribe("suggestionListSend",
                        function (a) { for (var b = {}, c = [], e = 0; e < a.suggestionList.length; e++)b["word_" + a.suggestionList[e]] || (b["word_" + a.suggestionList[e]] = a.suggestionList[e], c.push(a.suggestionList[e])); CKEDITOR.plugins.scayt.suggestions = c }); h.subscribe("selectionIsChanged", function (d) { a.getSelection().isLocked && "restoreSelection" !== d.action && a.lockSelection(); "restoreSelection" === d.action && a.selectionChange(!0) }); h.subscribe("graytStateChanged", function (d) { c.state.grayt[a.name] = d.state }); h.addMarkupHandler && h.addMarkupHandler(function (d) {
                            var c =
                                a.editable(), e = c.getCustomData(d.charName); e && (e.$ = d.node, c.setCustomData(d.charName, e))
                        }); a.scayt = h; a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
                } else c.state.scayt[a.name] = !1
            })
        }, destroy: function (a) { a.scayt && a.scayt.destroy(); delete a.scayt; a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) }, loadScaytLibrary: function (a, e) {
            var c, b = function () { CKEDITOR.fireOnce("scaytReady"); a.scayt || "function" === typeof e && e(a) }; "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ?
                (c = a.config.scayt_srcUrl, CKEDITOR.scriptLoader.load(c, function (a) { a && b() })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && b()
        }
    }, CKEDITOR.on("dialogDefinition", function (a) {
        var e = a.data.name; a = a.data.definition.dialog; "scaytDialog" !== e && "checkspell" !== e && (a.on("show", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, e = a.scayt; e && b.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!0) }), a.on("hide", function (a) {
            a = a.sender && a.sender.getParentEditor(); var b =
                CKEDITOR.plugins.scayt, e = a.scayt; e && b.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!1)
        })); if ("scaytDialog" === e) a.on("cancel", function (a) { return !1 }, this, null, -1); if ("checkspell" === e) a.on("cancel", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, e = a.scayt; e && b.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!1); a.unlockSelection() }, this, null, -2); if ("link" === e) a.on("ok", function (a) {
            var b = a.sender && a.sender.getParentEditor(); b && setTimeout(function () {
                b.fire("reloadMarkupScayt",
                    { removeOptions: { removeInside: !0, forceBookmark: !0 }, timeout: 0 })
            }, 0)
        }); if ("replace" === e) a.on("hide", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, e = a.scayt; a && setTimeout(function () { e && (e.fire("removeMarkupInDocument", {}), b.reloadMarkup(e)) }, 0) })
    }), CKEDITOR.on("scaytReady", function () {
        if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
            var a = CKEDITOR.editor.prototype; a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) {
                return function () {
                    var b = null, e = this.scayt; if (CKEDITOR.plugins.scayt &&
                        CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) { if (b = "ready" == this.status) var m = e.removeMarkupFromString(this.getSnapshot()), e = e.removeMarkupFromString(this._.previousValue), b = b && e !== m } else b = a.call(this); return b
                }
            }); a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function (a) { return function () { var b = this.scayt; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = b.removeMarkupFromString(this.getSnapshot()) : a.call(this) } })
        } if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
            var a =
                CKEDITOR.plugins.undo.Image.prototype, e = "function" == typeof a.equalsContent ? "equalsContent" : "equals"; a[e] = CKEDITOR.tools.override(a[e], function (a) { return function (b) { var e = b.editor.scayt, m = this.contents, h = b.contents, l = null; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[b.editor.name] && b.editor.scayt && (this.contents = e.removeMarkupFromString(m) || "", b.contents = e.removeMarkupFromString(h) || ""); l = a.apply(this, arguments); this.contents = m; b.contents = h; return l } })
        }
    }), function () {
        var a = {
            preserveState: !0,
            editorFocus: !1, readOnly: 1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var c = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass"; a.editable()[c]("cke_show_borders") } }
        }; CKEDITOR.plugins.add("showborders", {
            modes: { wysiwyg: 1 }, onLoad: function () {
                var a; a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                    "cke_show_border").replace(/%1/g, "cke_show_borders "); CKEDITOR.addCss(a)
            }, init: function (e) {
                var c = e.addCommand("showborders", a); c.canUndo = !1; !1 !== e.config.startupShowBorders && c.setState(CKEDITOR.TRISTATE_ON); e.on("mode", function () { c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e) }, null, null, 100); e.on("contentDom", function () { c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e) }); e.on("removeFormatCleanup", function (a) {
                    a = a.data; e.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
                        0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
                })
            }, afterInit: function (a) {
                var c = a.dataProcessor; a = c && c.dataFilter; c = c && c.htmlFilter; a && a.addRules({ elements: { table: function (a) { a = a.attributes; var c = a["class"], e = parseInt(a.border, 10); e && !(0 >= e) || c && -1 != c.indexOf("cke_show_border") || (a["class"] = (c || "") + " cke_show_border") } } }); c && c.addRules({
                    elements: {
                        table: function (a) {
                            a = a.attributes; var c = a["class"]; c && (a["class"] = c.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                ""))
                        }
                    }
                })
            }
        }); CKEDITOR.on("dialogDefinition", function (a) {
            var c = a.data.name; if ("table" == c || "tableProperties" == c) if (a = a.data.definition, c = a.getContents("info").get("txtBorder"), c.commit = CKEDITOR.tools.override(c.commit, function (a) { return function (c, e) { a.apply(this, arguments); var h = parseInt(this.getValue(), 10); e[!h || 0 >= h ? "addClass" : "removeClass"]("cke_show_border") } }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                return function () {
                    a.apply(this,
                        arguments); this.setValue(this.getValue().replace(/cke_show_border/, ""))
                }
            }), a.commit = CKEDITOR.tools.override(a.commit, function (a) { return function (c, e) { a.apply(this, arguments); parseInt(e.getAttribute("border"), 10) || e.addClass("cke_show_border") } })
        })
    }(), function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (e) {
                function c() {
                    var a = f && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth +
                        "px"); this.show(); a && this.focus()
                } if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var b = CKEDITOR.plugins.sourcearea; e.addMode("source", function (b) {
                        var f = e.ui.space("contents").getDocument().createElement("textarea"); f.setStyles(CKEDITOR.tools.extend({ width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left" }, CKEDITOR.tools.cssVendorPrefix("tab-size", e.config.sourceAreaTabSize || 4))); f.setAttribute("dir", "ltr"); f.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
                        e.ui.space("contents").append(f); f = e.editable(new a(e, f)); f.setData(e.getData(1)); CKEDITOR.env.ie && (f.attachListener(e, "resize", c, f), f.attachListener(CKEDITOR.document.getWindow(), "resize", c, f), CKEDITOR.tools.setTimeout(c, 0, f)); e.fire("ariaWidget", this); b()
                    }); e.addCommand("source", b.commands.source); e.ui.addButton && e.ui.addButton("Source", { label: e.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); e.on("mode", function () {
                        e.getCommand("source").setState("source" == e.mode ? CKEDITOR.TRISTATE_ON :
                            CKEDITOR.TRISTATE_OFF)
                    }); var f = CKEDITOR.env.ie && 9 == CKEDITOR.env.version
                }
            }
        }); var a = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable, proto: {
                setData: function (a) { this.setValue(a); this.status = "ready"; this.editor.fire("dataReady") }, getData: function () { return this.getValue() }, insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") }, detach: function () {
                    a.baseProto.detach.call(this); this.clearCustomData();
                    this.remove()
                }
            }
        })
    }(), CKEDITOR.plugins.sourcearea = { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (a) { "wysiwyg" == a.mode && a.fire("saveSnapshot"); a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); a.setMode("source" == a.mode ? "wysiwyg" : "source") }, canUndo: !1 } } }, CKEDITOR.plugins.add("specialchar", {
        availableLangs: {
            af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1,
            gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
        }, requires: "dialog", init: function (a) {
            var e = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"); a.addCommand("specialchar", {
                exec: function () {
                    var c = a.langCode, c = e.availableLangs[c] ? c : e.availableLangs[c.replace(/-.*/, "")] ? c.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path +
                        "dialogs/lang/" + c + ".js"), function () { CKEDITOR.tools.extend(a.lang.specialchar, e.langEntries[c]); a.openDialog("specialchar") })
                }, modes: { wysiwyg: 1 }, canUndo: !1
            }); a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
        }
    }), CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
    function () {
        CKEDITOR.plugins.add("stylescombo", {
            requires: "richcombo", init: function (a) {
                var e = a.config, c = a.lang.stylescombo, b = {}, f = [], m = []; a.on("stylesSet", function (c) {
                    if (c = c.data.styles) {
                        for (var l, d, k, g = 0, n = c.length; g < n; g++)(l = c[g], a.blockless && l.element in CKEDITOR.dtd.$block || "string" == typeof l.type && !CKEDITOR.style.customHandlers[l.type] || (d = l.name, l = new CKEDITOR.style(l), a.filter.customConfig && !a.filter.check(l))) || (l._name = d, l._.enterMode = e.enterMode, l._.type = k = l.assignedTo || l.type, l._.weight =
                            g + 1E3 * (k == CKEDITOR.STYLE_OBJECT ? 1 : k == CKEDITOR.STYLE_BLOCK ? 2 : 3), b[d] = l, f.push(l), m.push(l)); f.sort(function (a, b) { return a._.weight - b._.weight })
                    }
                }); a.ui.addRichCombo("Styles", {
                    label: c.label, title: c.panelTitle, toolbar: "styles,10", allowedContent: m, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss), multiSelect: !0, attributes: { "aria-label": c.panelTitle } }, init: function () {
                        var a, b, d, e, g, m; g = 0; for (m = f.length; g < m; g++)a = f[g], b = a._name, e = a._.type, e != d && (this.startGroup(c["panelTitle" + String(e)]),
                            d = e), this.add(b, a.type == CKEDITOR.STYLE_OBJECT ? b : a.buildPreview(), b); this.commit()
                    }, onClick: function (c) { a.focus(); a.fire("saveSnapshot"); c = b[c]; var e = a.elementPath(); if (c.group && c.removeStylesFromSameGroup(a)) a.applyStyle(c); else a[c.checkActive(e, a) ? "removeStyle" : "applyStyle"](c); a.fire("saveSnapshot") }, onRender: function () {
                        a.on("selectionChange", function (c) {
                            var e = this.getValue(); c = c.data.path.elements; for (var d = 0, f = c.length, g; d < f; d++) {
                                g = c[d]; for (var m in b) if (b[m].checkElementRemovable(g, !0, a)) {
                                m !=
                                    e && this.setValue(m); return
                                }
                            } this.setValue("")
                        }, this)
                    }, onOpen: function () {
                        var e = a.getSelection(), e = e.getSelectedElement() || e.getStartElement() || a.editable(), e = a.elementPath(e), f = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (var d in b) { var k = b[d], g = k._.type; k.checkApplicable(e, a, a.activeFilter) ? f[g]++ : this.hideItem(d); k.checkActive(e, a) && this.mark(d) } f[CKEDITOR.STYLE_BLOCK] || this.hideGroup(c["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]); f[CKEDITOR.STYLE_INLINE] || this.hideGroup(c["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
                        f[CKEDITOR.STYLE_OBJECT] || this.hideGroup(c["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                    }, refresh: function () { var c = a.elementPath(); if (c) { for (var e in b) if (b[e].checkApplicable(c, a, a.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }, reset: function () { b = {}; f = [] }
                })
            }
        })
    }(), function () {
        function a(a) {
            return {
                editorFocus: !1, canUndo: !1, modes: { wysiwyg: 1 }, exec: function (b) {
                    if (b.editable().hasFocus) {
                        var c = b.getSelection(), e; if (e = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
                            td: 1,
                            th: 1
                        }, 1)) {
                            var c = b.createRange(), d = CKEDITOR.tools.tryThese(function () { var b = e.getParent().$.cells[e.$.cellIndex + (a ? -1 : 1)]; b.parentNode.parentNode; return b }, function () { var b = e.getParent(), b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)]; return b.cells[a ? b.cells.length - 1 : 0] }); if (d || a) if (d) d = new CKEDITOR.dom.element(d), c.moveToElementEditStart(d), c.checkStartOfBlock() && c.checkEndOfBlock() || c.selectNodeContents(d); else return !0; else {
                                for (var k = e.getAscendant("table").$, d = e.getParent().$.cells, k =
                                    new CKEDITOR.dom.element(k.insertRow(-1), b.document), g = 0, n = d.length; g < n; g++)k.append((new CKEDITOR.dom.element(d[g], b.document)).clone(!1, !1)).appendBogus(); c.moveToElementEditStart(k)
                            } c.select(!0); return !0
                        }
                    } return !1
                }
            }
        } var e = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }, c = { exec: function (a) { a.container.focusNext(!0, a.tabIndex) } }, b = { exec: function (a) { a.container.focusPrevious(!0, a.tabIndex) } }; CKEDITOR.plugins.add("tab", {
            init: function (f) {
                for (var m = !1 !== f.config.enableTabKeyTools, h = f.config.tabSpaces || 0,
                    l = ""; h--;)l += " "; if (l) f.on("key", function (a) { 9 == a.data.keyCode && (f.insertText(l), a.cancel()) }); if (m) f.on("key", function (a) { (9 == a.data.keyCode && f.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && f.execCommand("selectPreviousCell")) && a.cancel() }); f.addCommand("blur", CKEDITOR.tools.extend(c, e)); f.addCommand("blurBack", CKEDITOR.tools.extend(b, e)); f.addCommand("selectNextCell", a()); f.addCommand("selectPreviousCell", a(!0))
            }
        })
    }(), CKEDITOR.dom.element.prototype.focusNext = function (a, e) {
        var c =
            void 0 === e ? this.getTabIndex() : e, b, f, m, h, l, d; if (0 >= c) for (l = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); l;) { if (l.isVisible() && 0 === l.getTabIndex()) { m = l; break } l = l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else for (l = this.getDocument().getBody().getFirst(); l = l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                if (!b) if (!f && l.equals(this)) { if (f = !0, a) { if (!(l = l.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; b = 1 } } else f && !this.contains(l) && (b = 1); if (l.isVisible() && !(0 > (d = l.getTabIndex()))) {
                    if (b && d == c) {
                        m =
                        l; break
                    } d > c && (!m || !h || d < h) ? (m = l, h = d) : m || 0 !== d || (m = l, h = d)
                }
            } m && m.focus()
    }, CKEDITOR.dom.element.prototype.focusPrevious = function (a, e) {
        for (var c = void 0 === e ? this.getTabIndex() : e, b, f, m, h = 0, l, d = this.getDocument().getBody().getLast(); d = d.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!b) if (!f && d.equals(this)) { if (f = !0, a) { if (!(d = d.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; b = 1 } } else f && !this.contains(d) && (b = 1); if (d.isVisible() && !(0 > (l = d.getTabIndex()))) if (0 >= c) {
                if (b && 0 === l) { m = d; break } l > h &&
                    (m = d, h = l)
            } else { if (b && l == c) { m = d; break } l < c && (!m || l > h) && (m = d, h = l) }
        } m && m.focus()
    }, CKEDITOR.plugins.add("table", {
        requires: "dialog", init: function (a) {
            function e(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!a.blockless) {
                var c = a.lang.table; a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table", allowedContent: "table{width,height,border-collapse}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];td{border*,background-color,vertical-align,width,height}[colspan,rowspan];" +
                        (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                            element: "table", right: function (a) {
                                if (a.styles) {
                                    var c; if (a.styles.border) c = CKEDITOR.tools.style.parse.border(a.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                        var e = a.styles; e["border-left"] && e["border-left"] === e["border-right"] && e["border-right"] === e["border-top"] &&
                                            e["border-top"] === e["border-bottom"] && (c = CKEDITOR.tools.style.parse.border(e["border-top"]))
                                    } c && c.style && "solid" === c.style && c.width && 0 !== parseFloat(c.width) && (a.attributes.border = 1); "collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0)
                                }
                            }
                        }]]
                })); a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", e())); a.addCommand("tableDelete", e({
                    exec: function (a) {
                        var c = a.elementPath().contains("table", 1); if (c) {
                            var e = c.getParent(), h = a.editable(); 1 != e.getChildCount() || e.is("td",
                                "th") || e.equals(h) || (c = e); a = a.createRange(); a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START); c.remove(); a.select()
                        }
                    }
                })); a.ui.addButton && a.ui.addButton("Table", { label: c.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"); a.addMenuItems && a.addMenuItems({
                    table: { label: c.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: {
                        label: c.deleteTable, command: "tableDelete", group: "table",
                        order: 1
                    }
                }); a.on("doubleclick", function (a) { a.data.element.is("table") && (a.data.dialog = "tableProperties") }); a.contextMenu && a.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
            }
        }
    }), function () {
        function a(a, b) {
            function c(a) { return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0 } function d(a) {
            0 < e.length || a.type != CKEDITOR.NODE_ELEMENT || !v.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(f, a, "selected_cell",
                !0), e.push(a))
            } var e = [], f = {}; if (!a) return e; for (var g = a.getRanges(), h = 0; h < g.length; h++) { var k = g[h]; if (k.collapsed) (k = k.getCommonAncestor().getAscendant({ td: 1, th: 1 }, !0)) && c(k) && e.push(k); else { var k = new CKEDITOR.dom.walker(k), l; for (k.guard = d; l = k.next();)l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({ td: 1, th: 1 }, !0)) && !l.getCustomData("selected_cell") && c(l) && (CKEDITOR.dom.element.setMarker(f, l, "selected_cell", !0), e.push(l)) } } CKEDITOR.dom.element.clearAllMarkers(f); return e
        }
        function e(b, c) {
            for (var d = q(b) ? b : a(b), e = d[0], f = e.getAscendant("table"), e = e.getDocument(), g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], k = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[k]), h = c ? h : k, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[h], h = c ? d[h - 1] : d[h + 1], d = d[0].length, e = e.createElement("tr"), k = 0; f[k] && k < d; k++) {
                var l; 1 < f[k].rowSpan && h && f[k] == h[k] ? (l = f[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(f[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(), e.append(l),
                    l = l.$); k += l.colSpan - 1
            } c ? e.insertBefore(g) : e.insertAfter(g); return e
        } function c(b) {
            if (b instanceof CKEDITOR.dom.selection) {
                var d = b.getRanges(), e = a(b), f = e[0].getAscendant("table"), g = CKEDITOR.tools.buildTableMap(f), h = e[0].getParent().$.rowIndex, e = e[e.length - 1], k = e.getParent().$.rowIndex + e.$.rowSpan - 1, e = []; b.reset(); for (b = h; b <= k; b++) {
                    for (var l = g[b], m = new CKEDITOR.dom.element(f.$.rows[b]), n = 0; n < l.length; n++) {
                        var p = new CKEDITOR.dom.element(l[n]), q = p.getParent().$.rowIndex; 1 == p.$.rowSpan ? p.remove() : (--p.$.rowSpan,
                            q == b && (q = g[b + 1], q[n - 1] ? p.insertAfter(new CKEDITOR.dom.element(q[n - 1])) : (new CKEDITOR.dom.element(f.$.rows[b + 1])).append(p, 1))); n += p.$.colSpan - 1
                    } e.push(m)
                } g = f.$.rows; d[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); h = new CKEDITOR.dom.element(g[k + 1] || (0 < h ? g[h - 1] : null) || f.$.parentNode); for (b = e.length; 0 <= b; b--)c(e[b]); return f.$.parentNode ? h : (d[0].select(), null)
            } b instanceof CKEDITOR.dom.element && (f = b.getAscendant("table"), 1 == f.$.rows.length ? f.remove() : b.remove()); return null
        } function b(a) {
            for (var b =
                a.getParent().$.cells, d = 0, c = 0; c < b.length; c++) { var e = b[c], d = d + e.colSpan; if (e == a.$) break } return d - 1
        } function f(a, d) { for (var c = d ? Infinity : 0, e = 0; e < a.length; e++) { var f = b(a[e]); if (d ? f < c : f > c) c = f } return c } function m(b, d) {
            for (var c = q(b) ? b : a(b), e = c[0].getAscendant("table"), g = f(c, 1), c = f(c), h = d ? g : c, k = CKEDITOR.tools.buildTableMap(e), e = [], g = [], c = [], l = k.length, m = 0; m < l; m++)e.push(k[m][h]), g.push(d ? k[m][h - 1] : k[m][h + 1]); for (m = 0; m < l; m++)e[m] && (1 < e[m].colSpan && g[m] == e[m] ? (k = e[m], k.colSpan += 1) : (h = new CKEDITOR.dom.element(e[m]),
                k = h.clone(), k.removeAttribute("colSpan"), k.appendBogus(), k[d ? "insertBefore" : "insertAfter"].call(k, h), c.push(k), k = k.$), m += k.rowSpan - 1); return c
        } function h(b) {
            function d(a) {
                var b, c, e; b = a.getRanges(); if (1 !== b.length) return a; b = b[0]; if (b.collapsed || 0 !== b.endOffset) return a; c = b.endContainer; e = c.getName().toLowerCase(); if ("td" !== e && "th" !== e) return a; for ((e = c.getPrevious()) || (e = c.getParent().getPrevious().getLast()); e.type !== CKEDITOR.NODE_TEXT && "br" !== e.getName().toLowerCase();)if (e = e.getLast(), !e) return a;
                b.setEndAt(e, CKEDITOR.POSITION_BEFORE_END); return b.select()
            } CKEDITOR.env.webkit && !b.isFake && (b = d(b)); var c = b.getRanges(), e = a(b), f = e[0], g = e[e.length - 1], e = f.getAscendant("table"), k = CKEDITOR.tools.buildTableMap(e), h, l, m = []; b.reset(); var n = 0; for (b = k.length; n < b; n++)for (var p = 0, q = k[n].length; p < q; p++)void 0 === h && k[n][p] == f.$ && (h = p), k[n][p] == g.$ && (l = p); for (n = h; n <= l; n++)for (p = 0; p < k.length; p++)g = k[p], f = new CKEDITOR.dom.element(e.$.rows[p]), g = new CKEDITOR.dom.element(g[n]), g.$ && (1 == g.$.colSpan ? g.remove() : --g.$.colSpan,
                p += g.$.rowSpan - 1, f.$.cells.length || m.push(f)); h = k[0].length - 1 > l ? new CKEDITOR.dom.element(k[0][l + 1]) : h && -1 !== k[0][h - 1].cellIndex ? new CKEDITOR.dom.element(k[0][h - 1]) : new CKEDITOR.dom.element(e.$.parentNode); m.length == b && (c[0].moveToPosition(e, CKEDITOR.POSITION_AFTER_END), c[0].select(), e.remove()); return h
        } function l(a, b) { var c = a.getStartElement().getAscendant({ td: 1, th: 1 }, !0); if (c) { var d = c.clone(); d.appendBogus(); b ? d.insertBefore(c) : d.insertAfter(c) } } function d(b) {
            if (b instanceof CKEDITOR.dom.selection) {
                var c =
                    b.getRanges(), e = a(b), f = e[0] && e[0].getAscendant("table"), g; a: { var h = 0; g = e.length - 1; for (var l = {}, m, n; m = e[h++];)CKEDITOR.dom.element.setMarker(l, m, "delete_cell", !0); for (h = 0; m = e[h++];)if ((n = m.getPrevious()) && !n.getCustomData("delete_cell") || (n = m.getNext()) && !n.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(l); g = n; break a } CKEDITOR.dom.element.clearAllMarkers(l); h = e[0].getParent(); (h = h.getPrevious()) ? g = h.getLast() : (h = e[g].getParent(), g = (h = h.getNext()) ? h.getChild(0) : null) } b.reset(); for (b =
                        e.length - 1; 0 <= b; b--)d(e[b]); g ? k(g, !0) : f && (c[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), c[0].select(), f.remove())
            } else b instanceof CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
        } function k(a, b) { var c = a.getDocument(), d = CKEDITOR.document; CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (d.focus(), c.focus()); c = new CKEDITOR.dom.range(c); c["moveToElementEdit" + (b ? "End" : "Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 : !0)); c.select(!0) } function g(a, b, c) {
            a = a[b];
            if ("undefined" == typeof c) return a; for (b = 0; a && b < a.length; b++) { if (c.is && a[b] == c.$) return b; if (b == c) return new CKEDITOR.dom.element(a[b]) } return c.is ? -1 : null
        } function n(b, c, d) {
            var e = a(b), f; if ((c ? 1 != e.length : 2 > e.length) || (f = b.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return !1; var h; b = e[0]; f = b.getAscendant("table"); var k = CKEDITOR.tools.buildTableMap(f), l = k.length, m = k[0].length, n = b.getParent().$.rowIndex, p = g(k, n, b); if (c) {
                var q; try {
                    var v = parseInt(b.getAttribute("rowspan"), 10) || 1;
                    h = parseInt(b.getAttribute("colspan"), 10) || 1; q = k["up" == c ? n - v : "down" == c ? n + v : n]["left" == c ? p - h : "right" == c ? p + h : p]
                } catch (w) { return !1 } if (!q || b.$ == q) return !1; e["up" == c || "left" == c ? "unshift" : "push"](new CKEDITOR.dom.element(q))
            } c = b.getDocument(); var M = n, v = q = 0, G = !d && new CKEDITOR.dom.documentFragment(c), D = 0; for (c = 0; c < e.length; c++) {
                h = e[c]; var N = h.getParent(), Q = h.getFirst(), O = h.$.colSpan, J = h.$.rowSpan, N = N.$.rowIndex, W = g(k, N, h), D = D + O * J, v = Math.max(v, W - p + O); q = Math.max(q, N - n + J); d || (O = h, (J = O.getBogus()) && J.remove(),
                    O.trim(), h.getChildren().count() && (N == M || !Q || Q.isBlockBoundary && Q.isBlockBoundary({ br: 1 }) || (M = G.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !M || M.is && M.is("br") || G.append("br")), h.moveChildren(G)), c ? h.remove() : h.setHtml("")); M = N
            } if (d) return q * v == D; G.moveChildren(b); b.appendBogus(); v >= m ? b.removeAttribute("rowSpan") : b.$.rowSpan = q; q >= l ? b.removeAttribute("colSpan") : b.$.colSpan = v; d = new CKEDITOR.dom.nodeList(f.$.rows); e = d.count(); for (c = e - 1; 0 <= c; c--)f = d.getItem(c), f.$.cells.length || (f.remove(), e++); return b
        }
        function p(b, c) {
            var d = a(b); if (1 < d.length) return !1; if (c) return !0; var d = d[0], e = d.getParent(), f = e.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(f), k = e.$.rowIndex, l = g(h, k, d), m = d.$.rowSpan, n; if (1 < m) { n = Math.ceil(m / 2); for (var m = Math.floor(m / 2), e = k + n, f = new CKEDITOR.dom.element(f.$.rows[e]), h = g(h, e), p, e = d.clone(), k = 0; k < h.length; k++)if (p = h[k], p.parentNode == f.$ && k > l) { e.insertBefore(new CKEDITOR.dom.element(p)); break } else p = null; p || f.append(e) } else for (m = n = 1, f = e.clone(), f.insertAfter(e), f.append(e = d.clone()),
                p = g(h, k), l = 0; l < p.length; l++)p[l].rowSpan++; e.appendBogus(); d.$.rowSpan = n; e.$.rowSpan = m; 1 == n && d.removeAttribute("rowSpan"); 1 == m && e.removeAttribute("rowSpan"); return e
        } function w(b, c) {
            var d = a(b); if (1 < d.length) return !1; if (c) return !0; var d = d[0], e = d.getParent(), f = e.getAscendant("table"), f = CKEDITOR.tools.buildTableMap(f), h = g(f, e.$.rowIndex, d), k = d.$.colSpan; if (1 < k) e = Math.ceil(k / 2), k = Math.floor(k / 2); else {
                for (var k = e = 1, l = [], m = 0; m < f.length; m++) { var n = f[m]; l.push(n[h]); 1 < n[h].rowSpan && (m += n[h].rowSpan - 1) } for (f =
                    0; f < l.length; f++)l[f].colSpan++
            } f = d.clone(); f.insertAfter(d); f.appendBogus(); d.$.colSpan = e; f.$.colSpan = k; 1 == e && d.removeAttribute("colSpan"); 1 == k && f.removeAttribute("colSpan"); return f
        } var v = /^(?:td|th)$/, q = CKEDITOR.tools.isArray; CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu", init: function (b) {
                function f(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function g(a,
                    c) { var d = b.addCommand(a, c); b.addFeature(d) } var q = b.lang.table, v = CKEDITOR.tools.style.parse, y = "td{width} td{height} td{border-color} td{background-color} td{white-space} td{vertical-align} td{text-align} td[colspan] td[rowspan] th".split(" "); g("cellProperties", new CKEDITOR.dialogCommand("cellProperties", f({
                        allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: y, contentTransformations: [[{
                            element: "td", left: function (a) {
                                return a.styles.background &&
                                    v.background(a.styles.background).color
                            }, right: function (a) { a.styles["background-color"] = v.background(a.styles.background).color }
                        }, { element: "td", check: "td{vertical-align}", left: function (a) { return a.attributes && a.attributes.valign }, right: function (a) { a.styles["vertical-align"] = a.attributes.valign; delete a.attributes.valign } }], [{
                            element: "tr", check: "td{height}", left: function (a) { return a.styles && a.styles.height }, right: function (a) {
                                CKEDITOR.tools.array.forEach(a.children, function (b) {
                                b.name in { td: 1, th: 1 } &&
                                    (b.attributes["cke-row-height"] = a.styles.height)
                                }); delete a.styles.height
                            }
                        }], [{ element: "td", check: "td{height}", left: function (a) { return (a = a.attributes) && a["cke-row-height"] }, right: function (a) { a.styles.height = a.attributes["cke-row-height"]; delete a.attributes["cke-row-height"] } }]]
                    }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); g("rowDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = c(a)) && k(a) } })); g("rowInsertBefore", f({
                        requiredContent: "table", exec: function (b) {
                            b =
                            b.getSelection(); b = a(b); e(b, !0)
                        }
                    })); g("rowInsertAfter", f({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); e(b) } })); g("columnDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = h(a)) && k(a, !0) } })); g("columnInsertBefore", f({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); m(b, !0) } })); g("columnInsertAfter", f({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); m(b) } })); g("cellDelete", f({
                        requiredContent: "table", exec: function (a) {
                            a =
                            a.getSelection(); d(a)
                        }
                    })); g("cellMerge", f({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a, b) { b.cell = n(a.getSelection()); k(b.cell, !0) } })); g("cellMergeRight", f({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "right"); k(b.cell, !0) } })); g("cellMergeDown", f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "down"); k(b.cell, !0) } })); g("cellVerticalSplit",
                        f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) { k(w(a.getSelection())) } })); g("cellHorizontalSplit", f({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { k(p(a.getSelection())) } })); g("cellInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); l(a, !0) } })); g("cellInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); l(a) } })); b.addMenuItems && b.addMenuItems({
                            tablecell: {
                                label: q.cell.menu, group: "tablecell",
                                order: 1, getItems: function () {
                                    var c = b.getSelection(), d = a(c), c = {
                                        tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF, tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: n(c, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: n(c, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: n(c, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: w(c, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                        tablecell_split_horizontal: p(c, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                                    }; b.filter.check(y) && (c.tablecell_properties = 0 < d.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); return c
                                }
                            }, tablecell_insertBefore: { label: q.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 }, tablecell_insertAfter: { label: q.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: q.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: {
                                label: q.cell.merge,
                                group: "tablecell", command: "cellMerge", order: 16
                            }, tablecell_merge_right: { label: q.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 }, tablecell_merge_down: { label: q.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 }, tablecell_split_horizontal: { label: q.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 }, tablecell_split_vertical: { label: q.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: {
                                label: q.cell.title,
                                group: "tablecellproperties", command: "cellProperties", order: 21
                            }, tablerow: { label: q.row.menu, group: "tablerow", order: 1, getItems: function () { return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } } }, tablerow_insertBefore: { label: q.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 }, tablerow_insertAfter: { label: q.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: {
                                label: q.row.deleteRow,
                                group: "tablerow", command: "rowDelete", order: 15
                            }, tablecolumn: { label: q.column.menu, group: "tablecolumn", order: 1, getItems: function () { return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } } }, tablecolumn_insertBefore: { label: q.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 }, tablecolumn_insertAfter: { label: q.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: {
                                label: q.column.deleteColumn,
                                group: "tablecolumn", command: "columnDelete", order: 15
                            }
                        }); b.contextMenu && b.contextMenu.addListener(function (a, b, c) { return (a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
            }, getCellColIndex: b, insertRow: e, insertColumn: m, getSelectedCells: a
        }; CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    }(), CKEDITOR.tools.buildTableMap = function (a, e, c, b, f) {
        a = a.$.rows; c = c || 0; b = "number" === typeof b ? b : a.length -
            1; f = "number" === typeof f ? f : -1; var m = -1, h = []; for (e = e || 0; e <= b; e++) { m++; !h[m] && (h[m] = []); for (var l = -1, d = c; d <= (-1 === f ? a[e].cells.length - 1 : f); d++) { var k = a[e].cells[d]; if (!k) break; for (l++; h[m][l];)l++; for (var g = isNaN(k.colSpan) ? 1 : k.colSpan, k = isNaN(k.rowSpan) ? 1 : k.rowSpan, n = 0; n < k && !(e + n > b); n++) { h[m + n] || (h[m + n] = []); for (var p = 0; p < g; p++)h[m + n][l + p] = a[e].cells[d] } l += g - 1; if (-1 !== f && l >= f) break } } return h
    }, function () {
        function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function e(a,
            b) {
                var c = a.getAscendant("table"), d = b.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(c), f = k(a), g = k(b), h = [], l = {}, m, n; c.contains(d) && (b = b.getAscendant({ td: 1, th: 1 }), g = k(b)); f > g && (c = f, f = g, g = c, c = a, a = b, b = c); for (c = 0; c < e[f].length; c++)if (a.$ === e[f][c]) { m = c; break } for (c = 0; c < e[g].length; c++)if (b.$ === e[g][c]) { n = c; break } m > n && (c = m, m = n, n = c); for (c = f; c <= g; c++)for (f = m; f <= n; f++)d = new CKEDITOR.dom.element(e[c][f]), d.$ && !d.getCustomData("selected_cell") && (h.push(d), CKEDITOR.dom.element.setMarker(l, d, "selected_cell",
                    !0)); CKEDITOR.dom.element.clearAllMarkers(l); return h
        } function c(a) { if (a) return a = a.clone(), a.enlarge(CKEDITOR.ENLARGE_ELEMENT), (a = a.getEnclosedNode()) && a.is && a.is(CKEDITOR.dtd.$tableContent) } function b(a) { return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table") } function f(a, b) {
            var c = a.editable().find(".cke_table-faked-selection"), d = a.editable().findOne("[data-cke-table-faked-selection-table]"), e; a.fire("lockSnapshot"); a.editable().removeClass("cke_table-faked-selection-editor");
            for (e = 0; e < c.count(); e++)c.getItem(e).removeClass("cke_table-faked-selection"); d && d.data("cke-table-faked-selection-table", !1); a.fire("unlockSnapshot"); b && (u = { active: !1 }, a.getSelection().isInTable() && a.getSelection().reset())
        } function m(a, b) { var c = [], d, e; for (e = 0; e < b.length; e++)d = a.createRange(), d.setStartBefore(b[e]), d.setEndAfter(b[e]), c.push(d); a.getSelection().selectRanges(c) } function h(a) {
            var b = a.editable().find(".cke_table-faked-selection"); 1 > b.count() || (b = e(b.getItem(0), b.getItem(b.count() - 1)),
                m(a, b))
        } function l(b, c, d) { var g = r(b.getSelection(!0)); c = c.is("table") ? null : c; var h; (h = u.active && !u.first) && !(h = c) && (h = b.getSelection().getRanges(), h = 1 < g.length || h[0] && !h[0].collapsed ? !0 : !1); if (h) u.first = c || g[0], u.dirty = c ? !1 : 1 !== g.length; else if (u.active && c && u.first.getAscendant("table").equals(c.getAscendant("table"))) { g = e(u.first, c); if (!u.dirty && 1 === g.length && !a(d.data.getTarget())) return f(b, "mouseup" === d.name); u.dirty = !0; u.last = c; m(b, g) } } function d(a) {
            var b = (a = a.editor || a.sender.editor) && a.getSelection(),
            c = b && b.getRanges() || [], d = c && c[0].getEnclosedNode(), d = d && d.type == CKEDITOR.NODE_ELEMENT && d.is("img"), e; if (b && (f(a), b.isInTable() && b.isFake)) if (d) a.getSelection().reset(); else if (!c[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) {
            1 === c.length && c[0]._getTableElement() && c[0]._getTableElement().is("table") && (e = c[0]._getTableElement()); e = r(b, e); a.fire("lockSnapshot"); for (b = 0; b < e.length; b++)e[b].addClass("cke_table-faked-selection"); 0 < e.length && (a.editable().addClass("cke_table-faked-selection-editor"),
                e[0].getAscendant("table").data("cke-table-faked-selection-table", "")); a.fire("unlockSnapshot")
            }
        } function k(a) { return a.getAscendant("tr", !0).$.rowIndex } function g(c) {
            function d(a, b) { return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(v) : !1 } function e(a) { return !a.getAscendant("table", !0) && a.getDocument().equals(m.document) } function k(a, b, c, d) {
                if ("mousedown" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT || !d)) return !0; if (b = a.name === (CKEDITOR.env.gecko ?
                    "mousedown" : "mouseup") && !e(a.data.getTarget())) a = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0), b = !(a && a.hasClass("cke_table-faked-selection")); return b
            } if (c.data.getTarget().getName && ("mouseup" === c.name || !a(c.data.getTarget()))) {
                var m = c.editor || c.listenerData.editor, n = m.getSelection(1), p = b(m), q = c.data.getTarget(), r = q && q.getAscendant({ td: 1, th: 1 }, !0), q = q && q.getAscendant("table", !0), v = { table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1 }; q && q.hasAttribute("data-cke-tableselection-ignored") || (k(c, n, p, q) &&
                    f(m, !0), !u.active && "mousedown" === c.name && CKEDITOR.tools.getMouseButton(c) === CKEDITOR.MOUSE_BUTTON_LEFT && q && (u = { active: !0 }, CKEDITOR.document.on("mouseup", g, null, { editor: m })), (r || q) && l(m, r || q, c), "mouseup" === c.name && (CKEDITOR.tools.getMouseButton(c) === CKEDITOR.MOUSE_BUTTON_LEFT && (e(c.data.getTarget()) || d(p, q)) && h(m), u = { active: !1 }, CKEDITOR.document.removeListener("mouseup", g)))
            }
        } function n(a) {
            var b = a.data.getTarget().getAscendant("table", !0); b && b.hasAttribute("data-cke-tableselection-ignored") || (b = a.data.getTarget().getAscendant({
                td: 1,
                th: 1
            }, !0)) && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault())
        } function p(a, b) {
            function c(a) { a.cancel() } var d = a.getSelection(), e = d.createBookmarks(), f = a.document, g = a.createRange(), h = f.getDocumentElement().$, k = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, l = a.blockless || CKEDITOR.env.ie ? "span" : "div", m, n, p, q; f.getById("cke_table_copybin") || (m = f.createElement(l), n = f.createElement(l), n.setAttributes({ id: "cke_table_copybin", "data-cke-temp": "1" }), m.setStyles({
                position: "absolute", width: "1px",
                height: "1px", overflow: "hidden"
            }), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), n.append(m), a.editable().append(n), q = a.on("selectionChange", c, null, null, 0), k && (p = h.scrollTop), g.selectNodeContents(m), g.select(), k && (h.scrollTop = p), setTimeout(function () { n.remove(); d.selectBookmarks(e); q.removeListener(); a.fire("unlockSnapshot"); b && (a.extractSelectedHtml(), a.fire("saveSnapshot")) }, 100))
        } function w(a) {
            var b = a.editor || a.sender.editor,
            c = b.getSelection(); c.isInTable() && (c.getRanges()[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored") || p(b, "cut" === a.name))
        } function v(a) { this._reset(); a && this.setSelectedCells(a) } function q(a, b, c) { a.on("beforeCommandExec", function (c) { -1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && (c.data.selectedCells = r(a.getSelection())) }); a.on("afterCommandExec", function (d) { -1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && c(a, d.data) }) } var u = { active: !1 }, x, r, z, t, y; v.prototype = {}; v.prototype._reset =
            function () { this.cells = { first: null, last: null, all: [] }; this.rows = { first: null, last: null } }; v.prototype.setSelectedCells = function (a) { this._reset(); a = a.slice(0); this._arraySortByDOMOrder(a); this.cells.all = a; this.cells.first = a[0]; this.cells.last = a[a.length - 1]; this.rows.first = a[0].getAscendant("tr"); this.rows.last = this.cells.last.getAscendant("tr") }; v.prototype.getTableMap = function () {
                var a = z(this.cells.first), b; a: {
                    b = this.cells.last; var c = b.getAscendant("table"), d = k(b), c = CKEDITOR.tools.buildTableMap(c), e; for (e =
                        0; e < c[d].length; e++)if ((new CKEDITOR.dom.element(c[d][e])).equals(b)) { b = e; break a } b = void 0
                } return CKEDITOR.tools.buildTableMap(this._getTable(), k(this.rows.first), a, k(this.rows.last), b)
            }; v.prototype._getTable = function () { return this.rows.first.getAscendant("table") }; v.prototype.insertRow = function (a, b, c) {
                if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var d = this.cells.first.$.cellIndex, e = this.cells.last.$.cellIndex, f = c ? [] : this.cells.all, g, h = 0; h < a; h++)g = t(c ? this.cells.all : f, b), g = CKEDITOR.tools.array.filter(g.find("td, th").toArray(),
                    function (a) { return c ? !0 : a.$.cellIndex >= d && a.$.cellIndex <= e }), f = b ? g.concat(f) : f.concat(g); this.setSelectedCells(f)
            }; v.prototype.insertColumn = function (a) { function b(a) { a = k(a); return a >= e && a <= f } if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var c = this.cells, d = c.all, e = k(c.first), f = k(c.last), c = 0; c < a; c++)d = d.concat(CKEDITOR.tools.array.filter(y(d), b)); this.setSelectedCells(d) }; v.prototype.emptyCells = function (a) { a = a || this.cells.all; for (var b = 0; b < a.length; b++)a[b].setHtml("") }; v.prototype._arraySortByDOMOrder =
                function (a) { a.sort(function (a, b) { return a.getPosition(b) & CKEDITOR.POSITION_PRECEDING ? -1 : 1 }) }; var C = {
                    onPaste: function (a) {
                        function b(a) { return Math.max.apply(null, CKEDITOR.tools.array.map(a, function (a) { return a.length }, 0)) } function d(a) { var b = f.createRange(); b.selectNodeContents(a); b.select() } var f = a.editor, g = f.getSelection(), h = g.getRanges(), h = h.length && h[0]._getTableElement({ table: 1 }); if (!h || !h.hasAttribute("data-cke-tableselection-ignored")) {
                            var k = r(g), h = this.findTableInPastedContent(f, a.data.dataValue),
                            l = g.isInTable(!0) && this.isBoundarySelection(g), n, p; !k.length || 1 === k.length && !c(g.getRanges()[0]) && !l || l && !h || (k = k[0].getAscendant("table"), n = new v(r(g, k)), f.once("afterPaste", function () { var a; if (p) { a = new CKEDITOR.dom.element(p[0][0]); var b = p[p.length - 1]; a = e(a, new CKEDITOR.dom.element(b[b.length - 1])) } else a = n.cells.all; m(f, a) }), h ? (a.stop(), l ? (n.insertRow(1, 1 === l, !0), g.selectElement(n.rows.first)) : (n.emptyCells(), m(f, n.cells.all)), a = n.getTableMap(), p = CKEDITOR.tools.buildTableMap(h), n.insertRow(p.length -
                                a.length), n.insertColumn(b(p) - b(a)), a = n.getTableMap(), this.pasteTable(n, a, p), f.fire("saveSnapshot"), setTimeout(function () { f.fire("afterPaste") }, 0)) : (d(n.cells.first), f.once("afterPaste", function () { f.fire("lockSnapshot"); n.emptyCells(n.cells.all.slice(1)); m(f, n.cells.all); f.fire("unlockSnapshot") })))
                        }
                    }, isBoundarySelection: function (a) {
                        a = a.getRanges()[0]; var b = a.endContainer.getAscendant("tr", !0); if (b && a.collapsed) {
                            if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1; if (a.checkBoundaryOfElement(b,
                                CKEDITOR.END)) return 2
                        } return 0
                    }, findTableInPastedContent: function (a, b) { var c = a.dataProcessor, d = new CKEDITOR.dom.element("body"); c || (c = new CKEDITOR.htmlDataProcessor(a)); d.setHtml(c.toHtml(b), { fixForBody: !1 }); return 1 < d.getChildCount() ? null : d.findOne("table") }, pasteTable: function (a, b, c) {
                        var d, e = z(a.cells.first), f = a._getTable(), g = {}, h, k, l, m; for (l = 0; l < c.length; l++)for (h = new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex + l]), m = 0; m < c[l].length; m++)if (k = new CKEDITOR.dom.element(c[l][m]), d = b[l] &&
                            b[l][m] ? new CKEDITOR.dom.element(b[l][m]) : null, k && !k.getCustomData("processed")) { if (d && d.getParent()) k.replace(d); else if (0 === m || c[l][m - 1]) (d = 0 !== m ? new CKEDITOR.dom.element(c[l][m - 1]) : null) && h.equals(d.getParent()) ? k.insertAfter(d) : 0 < e ? h.$.cells[e] ? k.insertAfter(new CKEDITOR.dom.element(h.$.cells[e])) : h.append(k) : h.append(k, !0); CKEDITOR.dom.element.setMarker(g, k, "processed", !0) } else k.getCustomData("processed") && d && d.remove(); CKEDITOR.dom.element.clearAllMarkers(g)
                    }
                }; CKEDITOR.plugins.tableselection =
                {
                    getCellsBetween: e, keyboardIntegration: function (a) {
                        function b(a) { var c = a.getEnclosedNode(); c && "function" === typeof c.is && c.is({ td: 1, th: 1 }) ? c.setText("") : a.deleteContents(); CKEDITOR.tools.array.forEach(a._find("td"), function (a) { a.appendBogus() }) } var c = a.editable(); c.attachListener(c, "keydown", function (a) {
                            function c(b, d) {
                                if (!d.length) return null; var f = a.createRange(), g = CKEDITOR.dom.range.mergeRanges(d); CKEDITOR.tools.array.forEach(g, function (a) { a.enlarge(CKEDITOR.ENLARGE_ELEMENT) }); var h = g[0].getBoundaryNodes(),
                                    k = h.startNode, h = h.endNode; if (k && k.is && k.is(e)) { for (var l = k.getAscendant("table", !0), m = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, p = function (a) { return !k.contains(a) && a.is && a.is("td", "th") }; m && !p(m);)m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l); !m && h && h.is && !h.is("table") && h.getNext() && (m = h.getNext().findOne("td, th"), n = !0); if (m) f["moveToElementEdit" + (n ? "Start" : "End")](m); else f.setStartBefore(k.getAscendant("table", !0)), f.collapse(!0); g[0].deleteContents(); return [f] } if (k) return f.moveToElementEditablePosition(k),
                                        [f]
                            } var d = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1, 13: 1 }, e = CKEDITOR.tools.extend({ table: 1 }, CKEDITOR.dtd.$tableContent); delete e.td; delete e.th; return function (e) {
                                var f = e.data.getKey(), g = e.data.getKeystroke(), h, k = 37 === f || 38 == f, l, m, n; if (d[f] && !a.readOnly && (h = a.getSelection()) && h.isInTable() && h.isFake) {
                                    l = h.getRanges(); m = l[0]._getTableElement(); n = l[l.length - 1]._getTableElement(); if (13 !== f || a.plugins.enterkey) e.data.preventDefault(), e.cancel(); if (36 < f && 41 > f) l[0].moveToElementEditablePosition(k ? m : n, !k), h.selectRanges([l[0]]);
                                    else if (13 !== f || 13 === g || g === CKEDITOR.SHIFT + 13) { for (e = 0; e < l.length; e++)b(l[e]); (e = c(m, l)) ? l = e : l[0].moveToElementEditablePosition(m); h.selectRanges(l); 13 === f && a.plugins.enterkey ? (a.fire("lockSnapshot"), 13 === g ? a.execCommand("enter") : a.execCommand("shiftEnter"), a.fire("unlockSnapshot"), a.fire("saveSnapshot")) : 13 !== f && a.fire("saveSnapshot") }
                                }
                            }
                        }(a), null, null, -1); c.attachListener(c, "keypress", function (c) {
                            var d = a.getSelection(), e = c.data.$.charCode || 13 === c.data.getKey(), f; if (!a.readOnly && d && d.isInTable() &&
                                d.isFake && e && !(c.data.getKeystroke() & CKEDITOR.CTRL)) { c = d.getRanges(); e = c[0].getEnclosedNode().getAscendant({ td: 1, th: 1 }, !0); for (f = 0; f < c.length; f++)b(c[f]); e && (c[0].moveToElementEditablePosition(e), d.selectRanges([c[0]])) }
                        }, null, null, -1)
                    }
                }; CKEDITOR.plugins.add("tableselection", {
                    requires: "clipboard,tabletools", isSupportedEnvironment: function () { return !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version) }, onLoad: function () {
                        x = CKEDITOR.plugins.tabletools; r = x.getSelectedCells; z = x.getCellColIndex; t = x.insertRow; y = x.insertColumn;
                        CKEDITOR.document.appendStyleSheet(this.path + "styles/tableselection.css")
                    }, init: function (a) {
                        this.isSupportedEnvironment() && (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"), a.on("contentDom", function () {
                            var b = a.editable(), c = b.isInline() ? b : a.document, e = { editor: a }; b.attachListener(c, "mousedown", g, null, e); b.attachListener(c, "mousemove", g, null, e); b.attachListener(c, "mouseup", g, null, e); b.attachListener(b, "dragstart", n); b.attachListener(a, "selectionCheck", d); CKEDITOR.plugins.tableselection.keyboardIntegration(a);
                            CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", w), b.attachListener(b, "copy", w))
                        }), a.on("paste", C.onPaste, C), q(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, b) { m(a, b.selectedCells) }), q(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, b) { m(a, [b.commandData.cell]) }), q(a, ["cellDelete"], function (a) { f(a, !0) }))
                    }
                })
    }(), "use strict", function () {
        function a(a,
            b) { return CKEDITOR.tools.array.reduce(b, function (a, b) { return b(a) }, a) } var e = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], c = { 8: 1, 46: 1 }; CKEDITOR.plugins.add("undo", {
                init: function (a) {
                    function c(a) { l.enabled && !1 !== a.data.command.canUndo && l.save() } function f() { l.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode; l.onChange() } var l = a.undoManager = new b(a), m = l.editingHandler = new h(l), w = a.addCommand("undo", {
                        exec: function () { l.undo() && (a.selectionChange(), this.fire("afterUndo")) }, startDisabled: !0,
                        canUndo: !1
                    }), v = a.addCommand("redo", { exec: function () { l.redo() && (a.selectionChange(), this.fire("afterRedo")) }, startDisabled: !0, canUndo: !1 }); a.setKeystroke([[e[0], "undo"], [e[1], "redo"], [e[2], "redo"]]); l.onChange = function () { w.setState(l.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); v.setState(l.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) }; a.on("beforeCommandExec", c); a.on("afterCommandExec", c); a.on("saveSnapshot", function (a) { l.save(a.data && a.data.contentOnly) }); a.on("contentDom",
                        m.attachListeners, m); a.on("instanceReady", function () { a.fire("saveSnapshot") }); a.on("beforeModeUnload", function () { "wysiwyg" == a.mode && l.save(!0) }); a.on("mode", f); a.on("readOnly", f); a.ui.addButton && (a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" }), a.ui.addButton("Redo", { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" })); a.resetUndo = function () { l.reset(); a.fire("saveSnapshot") }; a.on("updateSnapshot", function () { l.currentImage && l.update() }); a.on("lockSnapshot", function (a) {
                            a =
                            a.data; l.lock(a && a.dontUpdate, a && a.forceUpdate)
                        }); a.on("unlockSnapshot", l.unlock, l)
                }
            }); CKEDITOR.plugins.undo = {}; var b = CKEDITOR.plugins.undo.UndoManager = function (a) { this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize || 20; this.strokesLimit = 25; this._filterRules = []; this.editor = a; this.reset(); CKEDITOR.env.ie && this.addFilterRule(function (a) { return a.replace(/\s+data-cke-expando=".*?"/g, "") }) }; b.prototype = {
                type: function (a, c) {
                    var e = b.getKeyGroup(a), f = this.strokesRecorded[e] +
                        1; c = c || f >= this.strokesLimit; this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()); c ? (f = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"); this.strokesRecorded[e] = f; this.previousKeyGroup = e
                }, keyGroupChanged: function (a) { return b.getKeyGroup(a) != this.previousKeyGroup }, reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() }, resetType: function () {
                this.strokesRecorded = [0, 0]; this.typing = !1; this.previousKeyGroup =
                    -1
                }, refreshState: function () { this.hasUndo = !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange() }, save: function (a, b, c) {
                    var e = this.editor; if (this.locked || "ready" != e.status || "wysiwyg" != e.mode) return !1; var h = e.editable(); if (!h || "ready" != h.status) return !1; h = this.snapshots; b || (b = new f(e)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== c && e.fire("change"); h.splice(this.index +
                        1, h.length - this.index - 1); h.length == this.limit && h.shift(); this.index = h.push(b) - 1; this.currentImage = b; !1 !== c && this.refreshState(); return !0
                }, restoreImage: function (a) {
                    var b = this.editor, c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents); a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index; this.currentImage = this.snapshots[this.index];
                    this.update(); this.refreshState(); b.fire("change")
                }, getNextImage: function (a) { var b = this.snapshots, c = this.currentImage, e; if (c) if (a) for (e = this.index - 1; 0 <= e; e--) { if (a = b[e], !c.equalsContent(a)) return a.index = e, a } else for (e = this.index + 1; e < b.length; e++)if (a = b[e], !c.equalsContent(a)) return a.index = e, a; return null }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () { return this.enabled && this.hasUndo }, undo: function () {
                    if (this.undoable()) {
                        this.save(!0); var a = this.getNextImage(!0); if (a) return this.restoreImage(a),
                            !0
                    } return !1
                }, redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 }, update: function (a) { if (!this.locked) { a || (a = new f(this.editor)); for (var b = this.index, c = this.snapshots; 0 < b && this.currentImage.equalsContent(c[b - 1]);)--b; c.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a } }, updateSelection: function (a) {
                    if (!this.snapshots.length) return !1; var b = this.snapshots, c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ?
                        (this.currentImage = b[b.length - 1] = a, !0) : !1
                }, lock: function (a, b) { if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else { var c = null; if (b) c = !0; else { var e = new f(this.editor, !0); this.currentImage && this.currentImage.equalsContent(e) && (c = e) } this.locked = { update: c, level: 1 } } }, unlock: function () { if (this.locked && !--this.locked.level) { var a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) { var b = new f(this.editor, !0); a.equalsContent(b) || this.update() } } }, addFilterRule: function (a) { this._filterRules.push(a) }
            };
        b.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; b.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; b.isNavigationKey = function (a) { return !!b.navigationKeyCodes[a] }; b.getKeyGroup = function (a) { var e = b.keyGroups; return c[a] ? e.FUNCTIONAL : e.PRINTABLE }; b.getOppositeKeyGroup = function (a) { var c = b.keyGroups; return a == c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL }; b.ieFunctionalKeysBug = function (a) { return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL }; var f = CKEDITOR.plugins.undo.Image = function (b, c) {
        this.editor =
            b; b.fire("beforeUndoImage"); var e = b.getSnapshot(); e && (this.contents = a(e, b.undoManager._filterRules)); c || (this.bookmarks = (e = e && b.getSelection()) && e.createBookmarks2(!0)); b.fire("afterUndoImage")
        }, m = /\b(?:href|src|name)="[^"]*?"/gi; f.prototype = {
            equalsContent: function (a) { var b = this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(m, ""), a = a.replace(m, "")); return b != a ? !1 : !0 }, equalsSelection: function (a) {
                var b = this.bookmarks; a = a.bookmarks; if (b || a) {
                    if (!b ||
                        !a || b.length != a.length) return !1; for (var c = 0; c < b.length; c++) { var e = b[c], f = a[c]; if (e.startOffset != f.startOffset || e.endOffset != f.endOffset || !CKEDITOR.tools.arrayCompare(e.start, f.start) || !CKEDITOR.tools.arrayCompare(e.end, f.end)) return !1 }
                } return !0
            }
        }; var h = CKEDITOR.plugins.undo.NativeEditingHandler = function (a) { this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new l; this.lastKeydownImage = null }; h.prototype = {
            onKeydown: function (a) {
                var c = a.data.getKey(); if (229 !== c) if (-1 < CKEDITOR.tools.indexOf(e,
                    a.data.getKeystroke())) a.data.preventDefault(); else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(c) || this.keyEventsStack.push(c), this.lastKeydownImage = new f(a.editor), b.isNavigationKey(c) || this.undoManager.keyGroupChanged(c)) if (a.strokesRecorded[0] || a.strokesRecorded[1]) a.save(!1, this.lastKeydownImage, !1), a.resetType()
            }, onInput: function () {
                if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else {
                    var a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0));
                    this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs())
                }
            }, onKeyup: function (a) { var c = this.undoManager; a = a.data.getKey(); var e = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(a); if (!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new f(c.editor, !0)))) if (0 < e) c.type(a); else if (b.isNavigationKey(a)) this.onNavigationKey(!0) },
            onNavigationKey: function (a) { var b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new f(b.editor)); b.resetType() }, ignoreInputEventListener: function () { this.ignoreInputEvent = !0 }, activateInputEventListener: function () { this.ignoreInputEvent = !1 }, attachListeners: function () {
                var a = this.undoManager.editor, c = a.editable(), e = this; c.attachListener(c, "keydown", function (a) { e.onKeydown(a); if (b.ieFunctionalKeysBug(a.data.getKey())) e.onInput() }, null, null, 999); c.attachListener(c, CKEDITOR.env.ie ? "keypress" :
                    "input", e.onInput, e, null, 999); c.attachListener(c, "keyup", e.onKeyup, e, null, 999); c.attachListener(c, "paste", e.ignoreInputEventListener, e, null, 999); c.attachListener(c, "drop", e.ignoreInputEventListener, e, null, 999); a.on("afterPaste", e.activateInputEventListener, e, null, 999); c.attachListener(c.isInline() ? c : a.document.getDocumentElement(), "click", function () { e.onNavigationKey() }, null, null, 999); c.attachListener(this.undoManager.editor, "blur", function () { e.keyEventsStack.remove(9) }, null, null, 999)
            }
        }; var l = CKEDITOR.plugins.undo.KeyEventsStack =
            function () { this.stack = [] }; l.prototype = {
                push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] }, getLastIndex: function (a) { if ("number" != typeof a) return this.stack.length - 1; for (var b = this.stack.length; b--;)if (this.stack[b].keyCode == a) return b; return -1 }, getLast: function (a) { a = this.getLastIndex(a); return -1 != a ? this.stack[a] : null }, increment: function (a) { this.getLast(a).inputs++ }, remove: function (a) { a = this.getLastIndex(a); -1 != a && this.stack.splice(a, 1) }, resetInputs: function (a) {
                    if ("number" ==
                        typeof a) this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0
                }, getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b }, cleanUp: function (a) { a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17); a.shiftKey || this.remove(16); a.altKey || this.remove(18) }
            }
    }(), "use strict", function () {
        function a(a, b) {
            CKEDITOR.tools.extend(this, { editor: a, editable: a.editable(), doc: a.document, win: a.window }, b, !0); this.inline = this.editable.isInline(); this.inline ||
                (this.frame = this.win.getFrame()); this.target = this[this.inline ? "editable" : "doc"]
        } function e(a, b) { CKEDITOR.tools.extend(this, b, { editor: a }, !0) } function c(a, b) {
            var c = a.editable(); CKEDITOR.tools.extend(this, { editor: a, editable: c, inline: c.isInline(), doc: a.document, win: a.window, container: CKEDITOR.document.getBody(), winTop: CKEDITOR.document.getWindow() }, b, !0); this.hidden = {}; this.visible = {}; this.inline || (this.frame = this.win.getFrame()); this.queryViewport(); var e = CKEDITOR.tools.bind(this.queryViewport, this),
                h = CKEDITOR.tools.bind(this.hideVisible, this), l = CKEDITOR.tools.bind(this.removeAll, this); c.attachListener(this.winTop, "resize", e); c.attachListener(this.winTop, "scroll", e); c.attachListener(this.winTop, "resize", h); c.attachListener(this.win, "scroll", h); c.attachListener(this.inline ? c : this.frame, "mouseout", function (a) {
                    var b = a.data.$.clientX; a = a.data.$.clientY; this.queryViewport(); (b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible(); (0 >= b || b >= this.winTopPane.width ||
                        0 >= a || a >= this.winTopPane.height) && this.hideVisible()
                }, this); c.attachListener(a, "resize", e); c.attachListener(a, "mode", l); a.on("destroy", l); this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
                    lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, m, this.lineStyle, !0)), tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
                        f, { left: "0px", "border-left-color": "red", "border-width": "6px 0 6px 6px" }, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, f, { right: "0px", "border-right-color": "red", "border-width": "6px 6px 6px 0" }, this.tipCss, this.tipRightStyle, !0))
                })
        } function b(a) { var b; if (b = a && a.type == CKEDITOR.NODE_ELEMENT) b = !(h[a.getComputedStyle("float")] || h[a.getAttribute("align")]); return b && !l[a.getComputedStyle("position")] } CKEDITOR.plugins.add("lineutils"); CKEDITOR.LINEUTILS_BEFORE =
            1; CKEDITOR.LINEUTILS_AFTER = 2; CKEDITOR.LINEUTILS_INSIDE = 4; a.prototype = {
                start: function (a) {
                    var b = this, c = this.editor, e = this.doc, f, h, l, m, u = CKEDITOR.tools.eventsBuffer(50, function () { c.readOnly || "wysiwyg" != c.mode || (b.relations = {}, (h = e.$.elementFromPoint(l, m)) && h.nodeType && (f = new CKEDITOR.dom.element(h), b.traverseSearch(f), isNaN(l + m) || b.pixelSearch(f, l, m), a && a(b.relations, l, m))) }); this.listener = this.editable.attachListener(this.target, "mousemove", function (a) { l = a.data.$.clientX; m = a.data.$.clientY; u.input() });
                    this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () { u.reset() })
                }, stop: function () { this.listener && this.listener.removeListener() }, getRange: function () { var a = {}; a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START; a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END; a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START; return function (b) { var c = this.editor.createRange(); c.moveToPosition(this.relations[b.uid].element, a[b.type]); return c } }(), store: function () {
                    function a(b,
                        c, d) { var e = b.getUniqueId(); e in d ? d[e].type |= c : d[e] = { element: b, type: c } } return function (c, e) { var f; e & CKEDITOR.LINEUTILS_AFTER && b(f = c.getNext()) && f.isVisible() && (a(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), e ^= CKEDITOR.LINEUTILS_AFTER); e & CKEDITOR.LINEUTILS_INSIDE && b(f = c.getFirst()) && f.isVisible() && (a(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), e ^= CKEDITOR.LINEUTILS_INSIDE); a(c, e, this.relations) }
                }(), traverseSearch: function (a) {
                    var c, e, f; do if (f = a.$["data-cke-expando"], !(f && f in this.relations)) {
                        if (a.equals(this.editable)) break;
                        if (b(a)) for (c in this.lookups) (e = this.lookups[c](a)) && this.store(a, e)
                    } while ((!a || a.type != CKEDITOR.NODE_ELEMENT || "true" != a.getAttribute("contenteditable")) && (a = a.getParent()))
                }, pixelSearch: function () {
                    function a(d, e, f, h, l) { for (var m = 0, u; l(f);) { f += h; if (25 == ++m) break; if (u = this.doc.$.elementFromPoint(e, f)) if (u == d) m = 0; else if (c(d, u) && (m = 0, b(u = new CKEDITOR.dom.element(u)))) return u } } var c = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, b) { return a.contains(b) } : function (a, b) {
                        return !!(a.compareDocumentPosition(b) &
                            16)
                    }; return function (c, e, f) { var h = this.win.getViewPaneSize().height, k = a.call(this, c.$, e, f, -1, function (a) { return 0 < a }); e = a.call(this, c.$, e, f, 1, function (a) { return a < h }); if (k) for (this.traverseSearch(k); !k.getParent().equals(c);)k = k.getParent(); if (e) for (this.traverseSearch(e); !e.getParent().equals(c);)e = e.getParent(); for (; k || e;) { k && (k = k.getNext(b)); if (!k || k.equals(e)) break; this.traverseSearch(k); e && (e = e.getPrevious(b)); if (!e || e.equals(k)) break; this.traverseSearch(e) } }
                }(), greedySearch: function () {
                this.relations =
                    {}; for (var a = this.editable.getElementsByTag("*"), c = 0, e, f, h; e = a.getItem(c++);)if (!e.equals(this.editable) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasAttribute("contenteditable") || !e.isReadOnly()) && b(e) && e.isVisible()) for (h in this.lookups) (f = this.lookups[h](e)) && this.store(e, f); return this.relations
                }
            }; e.prototype = {
                locate: function () {
                    function a(c, d) {
                        var e = c.element[d === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"](); return e && b(e) ? (c.siblingRect = e.getClientRect(), d == CKEDITOR.LINEUTILS_BEFORE ? (c.siblingRect.bottom +
                            c.elementRect.top) / 2 : (c.elementRect.bottom + c.siblingRect.top) / 2) : d == CKEDITOR.LINEUTILS_BEFORE ? c.elementRect.top : c.elementRect.bottom
                    } return function (b) {
                        var c; this.locations = {}; for (var e in b) c = b[e], c.elementRect = c.element.getClientRect(), c.type & CKEDITOR.LINEUTILS_BEFORE && this.store(e, CKEDITOR.LINEUTILS_BEFORE, a(c, CKEDITOR.LINEUTILS_BEFORE)), c.type & CKEDITOR.LINEUTILS_AFTER && this.store(e, CKEDITOR.LINEUTILS_AFTER, a(c, CKEDITOR.LINEUTILS_AFTER)), c.type & CKEDITOR.LINEUTILS_INSIDE && this.store(e, CKEDITOR.LINEUTILS_INSIDE,
                            (c.elementRect.top + c.elementRect.bottom) / 2); return this.locations
                    }
                }(), sort: function () { var a, b, c, e; return function (f, h) { a = this.locations; b = []; for (var l in a) for (var m in a[l]) if (c = Math.abs(f - a[l][m]), b.length) { for (e = 0; e < b.length; e++)if (c < b[e].dist) { b.splice(e, 0, { uid: +l, type: m, dist: c }); break } e == b.length && b.push({ uid: +l, type: m, dist: c }) } else b.push({ uid: +l, type: m, dist: c }); return "undefined" != typeof h ? b.slice(0, h) : b } }(), store: function (a, b, c) {
                this.locations[a] || (this.locations[a] = {}); this.locations[a][b] =
                    c
                }
            }; var f = { display: "block", width: "0px", height: "0px", "border-color": "transparent", "border-style": "solid", position: "absolute", top: "-6px" }, m = { height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999 }; c.prototype = {
                removeAll: function () { for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a]; for (a in this.visible) this.visible[a].remove(), delete this.visible[a] }, hideLine: function (a) { var b = a.getUniqueId(); a.hide(); this.hidden[b] = a; delete this.visible[b] }, showLine: function (a) {
                    var b =
                        a.getUniqueId(); a.show(); this.visible[b] = a; delete this.hidden[b]
                }, hideVisible: function () { for (var a in this.visible) this.hideLine(this.visible[a]) }, placeLine: function (a, b) {
                    var c, e, f; if (c = this.getStyle(a.uid, a.type)) {
                        for (f in this.visible) if (this.visible[f].getCustomData("hash") !== this.hash) { e = this.visible[f]; break } if (!e) for (f in this.hidden) if (this.hidden[f].getCustomData("hash") !== this.hash) { this.showLine(e = this.hidden[f]); break } e || this.showLine(e = this.addLine()); e.setCustomData("hash", this.hash);
                        this.visible[e.getUniqueId()] = e; e.setStyles(c); b && b(e)
                    }
                }, getStyle: function (a, b) {
                    var c = this.relations[a], e = this.locations[a][b], f = {}; f.width = c.siblingRect ? Math.max(c.siblingRect.width, c.elementRect.width) : c.elementRect.width; f.top = this.inline ? e + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + e; if (f.top - this.winTopScroll.y < this.rect.top || f.top - this.winTopScroll.y > this.rect.bottom) return !1; this.inline ? f.left = c.elementRect.left - this.rect.relativeX : (0 < c.elementRect.left ? f.left =
                        this.rect.left + c.elementRect.left : (f.width += c.elementRect.left, f.left = this.rect.left), 0 < (c = f.left + f.width - (this.rect.left + this.winPane.width)) && (f.width -= c)); f.left += this.winTopScroll.x; for (var h in f) f[h] = CKEDITOR.tools.cssLength(f[h]); return f
                }, addLine: function () { var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl); a.appendTo(this.container); return a }, prepare: function (a, b) { this.relations = a; this.locations = b; this.hash = Math.random() }, cleanup: function () {
                    var a, b; for (b in this.visible) a = this.visible[b],
                        a.getCustomData("hash") !== this.hash && this.hideLine(a)
                }, queryViewport: function () { this.winPane = this.win.getViewPaneSize(); this.winTopScroll = this.winTop.getScrollPosition(); this.winTopPane = this.winTop.getViewPaneSize(); this.rect = this.getClientRect(this.inline ? this.editable : this.frame) }, getClientRect: function (a) {
                    a = a.getClientRect(); var b = this.container.getDocumentPosition(), c = this.container.getComputedStyle("position"); a.relativeX = a.relativeY = 0; "static" != c && (a.relativeY = b.y, a.relativeX = b.x, a.top -= a.relativeY,
                        a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX); return a
                }
            }; var h = { left: 1, right: 1, center: 1 }, l = { absolute: 1, fixed: 1 }; CKEDITOR.plugins.lineutils = { finder: a, locator: e, liner: c }
    }(), function () {
        function a(a) { return a.getName && !a.hasAttribute("data-cke-temp") } CKEDITOR.plugins.add("widgetselection", {
            init: function (a) {
                if (CKEDITOR.env.webkit) {
                    var c = CKEDITOR.plugins.widgetselection; a.on("contentDom", function (a) {
                        a = a.editor; var e = a.editable(); e.attachListener(e, "keydown", function (a) {
                            a.data.getKeystroke() ==
                            CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () { c.addFillers(e) || c.removeFillers(e) }, 0)
                        }, null, null, -1); a.on("selectionCheck", function (a) { c.removeFillers(a.editor.editable()) }); a.on("paste", function (a) { a.data.dataValue = c.cleanPasteData(a.data.dataValue) }); "selectall" in a.plugins && c.addSelectAllIntegration(a)
                    })
                }
            }
        }); CKEDITOR.plugins.widgetselection = {
            startFiller: null, endFiller: null, fillerAttribute: "data-cke-filler-webkit", fillerContent: "\x26nbsp;", fillerTagName: "div", addFillers: function (e) {
                var c =
                    e.editor; if (!this.isWholeContentSelected(e) && 0 < e.getChildCount()) { var b = e.getFirst(a), f = e.getLast(a); b && b.type == CKEDITOR.NODE_ELEMENT && !b.isEditable() && (this.startFiller = this.createFiller(), e.append(this.startFiller, 1)); f && f.type == CKEDITOR.NODE_ELEMENT && !f.isEditable() && (this.endFiller = this.createFiller(!0), e.append(this.endFiller, 0)); if (this.hasFiller(e)) return c = c.createRange(), c.selectNodeContents(e), c.select(), !0 } return !1
            }, removeFillers: function (a) {
                if (this.hasFiller(a) && !this.isWholeContentSelected(a)) {
                    var c =
                        a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"), b = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]"); this.startFiller && c && this.startFiller.equals(c) ? this.removeFiller(this.startFiller, a) : this.startFiller = c; this.endFiller && b && this.endFiller.equals(b) ? this.removeFiller(this.endFiller, a) : this.endFiller = b
                }
            }, cleanPasteData: function (a) { a && a.length && (a = a.replace(this.createFillerRegex(), "").replace(this.createFillerRegex(!0), "")); return a }, isWholeContentSelected: function (a) {
                var c =
                    a.editor.getSelection().getRanges()[0]; return !c || c && c.collapsed ? !1 : (c = c.clone(), c.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(c && a && c.startContainer && c.endContainer && 0 === c.startOffset && c.endOffset === a.getChildCount() && c.startContainer.equals(a) && c.endContainer.equals(a)))
            }, hasFiller: function (a) { return 0 < a.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count() }, createFiller: function (a) {
                var c = new CKEDITOR.dom.element(this.fillerTagName); c.setHtml(this.fillerContent); c.setAttribute(this.fillerAttribute,
                    a ? "end" : "start"); c.setAttribute("data-cke-temp", 1); c.setStyles({ display: "block", width: 0, height: 0, padding: 0, border: 0, margin: 0, position: "absolute", top: 0, left: "-9999px", opacity: 0, overflow: "hidden" }); return c
            }, removeFiller: function (a, c) {
                if (a) {
                    var b = c.editor, f = c.editor.getSelection().getRanges()[0].startPath(), m = b.createRange(), h, l; f.contains(a) && (h = a.getHtml(), l = !0); f = "start" == a.getAttribute(this.fillerAttribute); a.remove(); h && 0 < h.length && h != this.fillerContent ? (c.insertHtmlIntoRange(h, b.getSelection().getRanges()[0]),
                        m.setStartAt(c.getChild(c.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), b.getSelection().selectRanges([m])) : l && (f ? m.setStartAt(c.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) : m.setEndAt(c.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), c.editor.getSelection().selectRanges([m]))
                }
            }, createFillerRegex: function (a) { var c = this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi, "\x3e[^\x3c]*\x3c"); return new RegExp((a ? "" : "^") + c + (a ? "$" : "")) }, addSelectAllIntegration: function (a) {
                var c =
                    this; a.editable().attachListener(a, "beforeCommandExec", function (b) { var f = a.editable(); "selectAll" == b.data.name && f && c.addFillers(f) }, null, null, 9999)
            }
        }
    }(), "use strict", function () {
        function a(a) {
        this.editor = a; this.registered = {}; this.instances = {}; this.selected = []; this.widgetHoldingFocusedEditable = this.focused = null; this._ = { nextId: 0, upcasts: [], upcastCallbacks: [], filters: {} }; H(this); B(this); this.on("checkWidgets", h); this.editor.on("contentDomInvalidated", this.checkWidgets, this); A(this); t(this); y(this); z(this);
            C(this)
        } function e(a, b, c, d, f) {
            var g = a.editor; CKEDITOR.tools.extend(this, d, { editor: g, id: b, inline: "span" == c.getParent().getName(), element: c, data: CKEDITOR.tools.extend({}, "function" == typeof d.defaults ? d.defaults() : d.defaults), dataReady: !1, inited: !1, ready: !1, edit: e.prototype.edit, focusedEditable: null, definition: d, repository: a, draggable: !1 !== d.draggable, _: { downcastFn: d.downcast && "string" == typeof d.downcast ? d.downcasts[d.downcast] : d.downcast } }, !0); a.fire("instanceCreated", this); X(this, d); this.init && this.init();
            this.inited = !0; (a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a))); f && this.setData(f); this.data.classes || this.setData("classes", this.getClasses()); this.dataReady = !0; aa(this); this.fire("data", this.data); this.isInited() && g.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
        } function c(a, b, c) {
            CKEDITOR.dom.element.call(this, b.$); this.editor = a; this._ = {}; b = this.filter = c.filter; CKEDITOR.dtd[this.getName()].p ? (this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) :
                a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR
        } function b(a, b) {
            a.addCommand(b.name, {
                exec: function (a, c) {
                    function d() { a.widgets.finalizeCreation(h) } var e = a.widgets.focused; if (e && e.name == b.name) e.edit(); else if (b.insert) b.insert({ editor: a, commandData: c }); else if (b.template) {
                        var e = "function" == typeof b.defaults ? b.defaults() : b.defaults, e = CKEDITOR.dom.element.createFromHtml(b.template.output(e), a.document),
                        f, g = a.widgets.wrapElement(e, b.name), h = new CKEDITOR.dom.documentFragment(g.getDocument()); h.append(g); (f = a.widgets.initOn(e, b, c && c.startupData)) ? (e = f.once("edit", function (b) { if (b.data.dialog) f.once("dialog", function (b) { b = b.data; var c, e; c = b.once("ok", d, null, null, 20); e = b.once("cancel", function (b) { b.data && !1 === b.data.hide || a.widgets.destroy(f, !0) }); b.once("hide", function () { c.removeListener(); e.removeListener() }) }); else d() }, null, null, 999), f.edit(), e.removeListener()) : d()
                    }
                }, allowedContent: b.allowedContent,
                requiredContent: b.requiredContent, contentForms: b.contentForms, contentTransformations: b.contentTransformations
            })
        } function f(a, b) {
            function c(a, d) { var e = b.upcast.split(","), f, g; for (g = 0; g < e.length; g++)if (f = e[g], f === a.name) return b.upcasts[f].call(this, a, d); return !1 } function d(b, c, e) { var f = CKEDITOR.tools.getIndex(a._.upcasts, function (a) { return a[2] > e }); 0 > f && (f = a._.upcasts.length); a._.upcasts.splice(f, 0, [CKEDITOR.tools.bind(b, c), c.name, e]) } var e = b.upcast, f = b.upcastPriority || 10; e && ("string" == typeof e ? d(c,
                b, f) : d(e, b, f))
        } function m(a, b) { a.focused = null; if (b.isInited()) { var c = b.editor.checkDirty(); a.fire("widgetBlurred", { widget: b }); b.setFocused(!1); !c && b.editor.resetDirty() } } function h(a) {
            a = a.data; if ("wysiwyg" == this.editor.mode) {
                var b = this.editor.editable(), c = this.instances, d, f, g, h; if (b) {
                    for (d in c) c[d].isReady() && !b.contains(c[d].wrapper) && this.destroy(c[d], !0); if (a && a.initOnlyNew) c = this.initOnAll(); else {
                        var k = b.find(".cke_widget_wrapper"), c = []; d = 0; for (f = k.count(); d < f; d++) {
                            g = k.getItem(d); if (h = !this.getByElement(g,
                                !0)) { a: { h = q; for (var l = g; l = l.getParent();)if (h(l)) { h = !0; break a } h = !1 } h = !h } h && b.contains(g) && (g.addClass("cke_widget_new"), c.push(this.initOn(g.getFirst(e.isDomWidgetElement))))
                        }
                    } a && a.focusInited && 1 == c.length && c[0].focus()
                }
            }
        } function l(a) {
            if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) {
                var b = d(a), c = k(a), e = !1; b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] = 1, b.value = b.value.replace(/^\s/g, "\x26nbsp;"), e = !0); c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] =
                    1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), e = !0); e && (a.attributes["data-cke-widget-white-space"] = 1)
            }
        } function d(a) { return a.find(function (a) { return 3 === a.type }, !0).shift() } function k(a) { return a.find(function (a) { return 3 === a.type }, !0).pop() } function g(a, b, c) {
            if (!c.allowedContent && !c.disallowedContent) return null; var d = this._.filters[a]; d || (this._.filters[a] = d = {}); a = d[b]; a || (a = c.allowedContent ? new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent));
            return a
        } function n(a) {
            var b = [], c = a._.upcasts, d = a._.upcastCallbacks; return {
                toBeWrapped: b, iterator: function (a) {
                    var f, g, h, k, l; if ("data-cke-widget-wrapper" in a.attributes) return (a = a.getFirst(e.isParserWidgetElement)) && b.push([a]), !1; if ("data-widget" in a.attributes) return b.push([a]), !1; if (l = c.length) {
                        if (a.attributes["data-cke-widget-upcasted"]) return !1; k = 0; for (f = d.length; k < f; ++k)if (!1 === d[k](a)) return; for (k = 0; k < l; ++k)if (f = c[k], h = {}, g = f[0](a, h)) return g instanceof CKEDITOR.htmlParser.element && (a = g), a.attributes["data-cke-widget-data"] =
                            encodeURIComponent(JSON.stringify(h)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, f[1]]), !1
                    }
                }
            }
        } function p(a, b) { return { tabindex: -1, contenteditable: "false", "data-cke-widget-wrapper": 1, "data-cke-filter": "off", "class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "") } } function w(a, b, c) {
            if (a.type == CKEDITOR.NODE_ELEMENT) {
                var d = CKEDITOR.dtd[a.name]; if (d && !d[c.name]) {
                    var d = a.split(b), e = a.parent; b = d.getIndex(); a.children.length || (--b, a.remove()); d.children.length ||
                        d.remove(); return w(e, b, c)
                }
            } a.add(c, b)
        } function v(a, b) { return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b] } function q(a) { return a.hasAttribute("data-cke-temp") } function u(a, b, c, d) {
            var e = a.editor; e.fire("lockSnapshot"); c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable = b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"), d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"),
                b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null)); e.fire("unlockSnapshot")
        } function x(a) { a.contextMenu && a.contextMenu.addListener(function (b) { if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {}) }) } function r(a, b) { return CKEDITOR.tools.trim(b) } function z(a) {
            var b = a.editor, c = CKEDITOR.plugins.lineutils; b.on("dragstart", function (c) {
                var d = c.data.target; e.isDomDragHandler(d) && (d = a.getByElement(d), c.data.dataTransfer.setData("cke/widget-id",
                    d.id), b.focus(), d.focus())
            }); b.on("drop", function (c) {
                var d = c.data.dataTransfer, e = d.getData("cke/widget-id"), f = d.getTransferType(b), d = b.createRange(); "" !== e && f === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c.cancel() : "" !== e && f == CKEDITOR.DATA_TRANSFER_INTERNAL && (e = a.instances[e]) && (d.setStartBefore(e.wrapper), d.setEndAfter(e.wrapper), c.data.dragRange = d, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount, c.data.dataTransfer.setData("text/html",
                    b.editable().getHtmlFromRange(d).getHtml()), b.widgets.destroy(e, !0))
            }); b.on("contentDom", function () {
                var d = b.editable(); CKEDITOR.tools.extend(a, {
                    finder: new c.finder(b, {
                        lookups: {
                            "default": function (b) {
                                if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !e.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) {
                                    var c = e.getNestedEditable(d, b); if (c) { b = a._.draggedWidget; if (a.getByElement(c) == b) return; c = CKEDITOR.filter.instances[c.data("cke-filter")]; b = b.requiredContent; if (c && b && !c.check(b)) return } return CKEDITOR.LINEUTILS_BEFORE |
                                        CKEDITOR.LINEUTILS_AFTER
                                }
                            }
                        }
                    }), locator: new c.locator(b), liner: new c.liner(b, { lineStyle: { cursor: "move !important", "border-top-color": "#666" }, tipLeftStyle: { "border-left-color": "#666" }, tipRightStyle: { "border-right-color": "#666" } })
                }, !0)
            })
        } function t(a) {
            var b = a.editor; b.on("contentDom", function () {
                var c = b.editable(), d = c.isInline() ? c : b.document, f, g; c.attachListener(d, "mousedown", function (c) {
                    var d = c.data.getTarget(); f = d instanceof CKEDITOR.dom.element ? a.getByElement(d) : null; g = 0; f && (f.inline && d.type == CKEDITOR.NODE_ELEMENT &&
                        d.hasAttribute("data-cke-widget-drag-handler") ? (g = 1, a.focused != f && b.getSelection().removeAllRanges()) : e.getNestedEditable(f.wrapper, d) ? f = null : (c.data.preventDefault(), CKEDITOR.env.ie || f.focus()))
                }); c.attachListener(d, "mouseup", function () { g && f && f.wrapper && (g = 0, f.focus()) }); CKEDITOR.env.ie && c.attachListener(d, "mouseup", function () { setTimeout(function () { f && f.wrapper && c.contains(f.wrapper) && (f.focus(), f = null) }) })
            }); b.on("doubleclick", function (b) {
                var c = a.getByElement(b.data.element); if (c && !e.getNestedEditable(c.wrapper,
                    b.data.element)) return c.fire("doubleclick", { element: b.data.element })
            }, null, null, 1)
        } function y(a) {
            a.editor.on("key", function (b) {
                var c = a.focused, d = a.widgetHoldingFocusedEditable, e; c ? e = c.fire("key", { keyCode: b.data.keyCode }) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(), d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 == c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed &&
                    d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0); return e
            }, null, null, 1)
        } function C(a) { function b(c) { a.focused && M(a.focused, "cut" == c.name) } var c = a.editor; c.on("contentDom", function () { var a = c.editable(); a.attachListener(a, "copy", b); a.attachListener(a, "cut", b) }) } function A(a) {
            var b = a.editor; b.on("selectionCheck", function () { a.fire("checkSelection") }); a.on("checkSelection", a.checkSelection, a); b.on("selectionChange", function (c) {
                var d = (c = e.getNestedEditable(b.editable(), c.data.selection.getStartElement())) &&
                    a.getByElement(c), f = a.widgetHoldingFocusedEditable; f ? f === d && f.focusedEditable.equals(c) || (u(a, f, null), d && c && u(a, d, c)) : d && c && u(a, d, c)
            }); b.on("dataReady", function () { F(a).commit() }); b.on("blur", function () { var b; (b = a.focused) && m(a, b); (b = a.widgetHoldingFocusedEditable) && u(a, b, null) })
        } function B(a) {
            var b = a.editor, c = {}; b.on("toDataFormat", function (b) {
                var f = CKEDITOR.tools.getNextNumber(), g = []; b.data.downcastingSessionId = f; c[f] = g; b.data.dataValue.forEach(function (b) {
                    var c = b.attributes, f; if ("data-cke-widget-white-space" in
                        c) { f = d(b); var h = k(b); f.parent.attributes["data-cke-white-space-first"] && (f.value = f.value.replace(/^&nbsp;/g, " ")); h.parent.attributes["data-cke-white-space-last"] && (h.value = h.value.replace(/&nbsp;$/g, " ")) } if ("data-cke-widget-id" in c) { if (c = a.instances[c["data-cke-widget-id"]]) f = b.getFirst(e.isParserWidgetElement), g.push({ wrapper: b, element: f, widget: c, editables: {} }), "1" != f.attributes["data-cke-widget-keep-attr"] && delete f.attributes["data-widget"] } else if ("data-cke-widget-editable" in c) return 0 < g.length &&
                            (g[g.length - 1].editables[c["data-cke-widget-editable"]] = b), !1
                }, CKEDITOR.NODE_ELEMENT, !0)
            }, null, null, 8); b.on("toDataFormat", function (a) { if (a.data.downcastingSessionId) { a = c[a.data.downcastingSessionId]; for (var b, d, e, f, g, h; b = a.shift();) { d = b.widget; e = b.element; f = d._.downcastFn && d._.downcastFn.call(d, e); for (h in b.editables) g = b.editables[h], delete g.attributes.contenteditable, g.setHtml(d.editables[h].getData()); f || (f = e); b.wrapper.replaceWith(f) } } }, null, null, 13); b.on("contentDomUnload", function () { a.destroyAll(!0) })
        }
        function H(a) {
            var b = a.editor, c, d; b.on("toHtml", function (b) { var d = n(a), f; for (b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0); f = d.toBeWrapped.pop();) { var g = f[0], h = g.parent; h.type == CKEDITOR.NODE_ELEMENT && h.attributes["data-cke-widget-wrapper"] && h.replaceWith(g); a.wrapElement(f[0], f[1]) } c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length && e.isParserWidgetWrapper(b.data.dataValue.children[1]) : 1 == b.data.dataValue.children.length && e.isParserWidgetWrapper(b.data.dataValue.children[0]) },
                null, null, 8); b.on("dataReady", function () { if (d) for (var c = b.editable().find(".cke_widget_wrapper"), f, g, h = 0, k = c.count(); h < k; ++h)f = c.getItem(h), g = f.getFirst(e.isDomWidgetElement), g.type == CKEDITOR.NODE_ELEMENT && g.data("widget") ? (g.replace(f), a.wrapElement(g)) : f.remove(); d = 0; a.destroyAll(!0); a.initOnAll() }); b.on("loadSnapshot", function (b) { /data-cke-widget/.test(b.data) && (d = 1); a.destroyAll(!0) }, null, null, 9); b.on("paste", function (a) {
                    a = a.data; a.dataValue = a.dataValue.replace(V, r); a.range && (a = e.getNestedEditable(b.editable(),
                        a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) && b.setActiveFilter(a)
                }); b.on("afterInsertHtml", function (d) { d.data.intoRange ? a.checkWidgets({ initOnlyNew: !0 }) : (b.fire("lockSnapshot"), a.checkWidgets({ initOnlyNew: !0, focusInited: c }), b.fire("unlockSnapshot")) })
        } function F(a) {
            var b = a.selected, c = [], d = b.slice(0), e = null; return {
                select: function (a) { 0 > CKEDITOR.tools.indexOf(b, a) && c.push(a); a = CKEDITOR.tools.indexOf(d, a); 0 <= a && d.splice(a, 1); return this }, focus: function (a) { e = a; return this },
                commit: function () { var f = a.focused !== e, g, h; a.editor.fire("lockSnapshot"); for (f && (g = a.focused) && m(a, g); g = d.pop();)b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited() && (h = g.editor.checkDirty(), g.setSelected(!1), !h && g.editor.resetDirty()); f && e && (h = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused", { widget: e }), e.setFocused(!0), !h && a.editor.resetDirty()); for (; g = c.pop();)b.push(g), g.setSelected(!0); a.editor.fire("unlockSnapshot") }
            }
        } function K(a) {
            a && a.addFilterRule(function (a) {
                return a.replace(/\s*cke_widget_selected/g,
                    "").replace(/\s*cke_widget_focused/g, "").replace(/<span[^>]*cke_widget_drag_handler_container[^>]*.*?<\/span>/gmi, "")
            })
        } function I(a, b, c) { var d = 0; b = G(b); var e = a.data.classes || {}, f; if (b) { for (e = CKEDITOR.tools.clone(e); f = b.pop();)c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f], d = 1); d && a.setData("classes", e) } } function E(a) { a.cancel() } function M(a, b) {
            var c = a.editor, d = c.document, e = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version; if (!d.getById("cke_copybin")) {
                var f = !c.blockless && !CKEDITOR.env.ie || e ? "div" : "span", e = d.createElement(f),
                g = d.createElement(f), f = CKEDITOR.env.ie && 9 > CKEDITOR.env.version; g.setAttributes({ id: "cke_copybin", "data-cke-temp": "1" }); e.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }); e.setStyle("ltr" == c.config.contentsLangDirection ? "left" : "right", "-5000px"); var h = c.createRange(); h.setStartBefore(a.wrapper); h.setEndAfter(a.wrapper); e.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' + c.editable().getHtmlFromRange(h).getHtml() + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e');
                c.fire("saveSnapshot"); c.fire("lockSnapshot"); g.append(e); c.editable().append(g); var k = c.on("selectionChange", E, null, null, 0), l = a.repository.on("checkSelection", E, null, null, 0); if (f) var m = d.getDocumentElement().$, n = m.scrollTop; h = c.createRange(); h.selectNodeContents(e); h.select(); f && (m.scrollTop = n); setTimeout(function () { b || a.focus(); g.remove(); k.removeListener(); l.removeListener(); c.fire("unlockSnapshot"); b && !c.readOnly && (a.repository.del(a), c.fire("saveSnapshot")) }, 100)
            }
        } function G(a) {
            return (a = (a = a.getDefinition().attributes) &&
                a["class"]) ? a.split(/\s+/) : null
        } function D() { var a = CKEDITOR.document.getActive(), b = this.editor, c = b.editable(); (c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) && b.focusManager.focus(c) } function N() { CKEDITOR.env.gecko && this.editor.unlockSelection(); CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1)) } function Q(a) {
            var b = null; a.on("data", function () {
                var a = this.data.classes, c; if (b != a) {
                    for (c in b) a && a[c] || this.removeClass(c); for (c in a) this.addClass(c);
                    b = a
                }
            })
        } function O(a) { a.on("data", function () { if (a.wrapper) { var b = this.getLabel ? this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName()); a.wrapper.setAttribute("role", "region"); a.wrapper.setAttribute("aria-label", b) } }, null, null, 9999) } function J(a) {
            if (a.draggable) {
                var b = a.editor, c = a.wrapper.getLast(e.isDomDragHandlerContainer), d; c ? d = c.findOne("img") : (c = new CKEDITOR.dom.element("span", b.document), c.setAttributes({
                    "class": "cke_reset cke_widget_drag_handler_container",
                    style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png);display:none;"
                }), d = new CKEDITOR.dom.element("img", b.document), d.setAttributes({ "class": "cke_reset cke_widget_drag_handler", "data-cke-widget-drag-handler": "1", src: CKEDITOR.tools.transparentImageData, width: 15, title: b.lang.widget.move, height: 15, role: "presentation" }), a.inline && d.setAttribute("draggable", "true"), c.append(d), a.wrapper.append(c)); a.wrapper.on("dragover", function (a) { a.data.preventDefault() });
                a.wrapper.on("mouseenter", a.updateDragHandlerPosition, a); setTimeout(function () { a.on("data", a.updateDragHandlerPosition, a) }, 50); if (!a.inline && (d.on("mousedown", W, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) d.on("dragstart", function (a) { a.data.preventDefault(!0) }); a.dragHandlerContainer = c
            }
        } function W(a) {
            function b() {
                var c; for (p.reset(); c = h.pop();)c.removeListener(); var d = k; c = a.sender; var e = this.repository.finder, f = this.repository.liner, g = this.editor, l = this.editor.editable(); CKEDITOR.tools.isEmpty(f.visible) ||
                    (d = e.getRange(d[0]), this.focus(), g.fire("drop", { dropRange: d, target: d.startContainer })); l.removeClass("cke_widget_dragging"); f.hideVisible(); g.fire("dragend", { target: c })
            } if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                var c = this.repository.finder, d = this.repository.locator, e = this.repository.liner, f = this.editor, g = f.editable(), h = [], k = [], l, m; this.repository._.draggedWidget = this; var n = c.greedySearch(), p = CKEDITOR.tools.eventsBuffer(50, function () {
                    l = d.locate(n); k = d.sort(m, 1); k.length && (e.prepare(n,
                        l), e.placeLine(k[0]), e.cleanup())
                }); g.addClass("cke_widget_dragging"); h.push(g.on("mousemove", function (a) { m = a.data.$.clientY; p.input() })); f.fire("dragstart", { target: a.sender }); h.push(f.document.once("mouseup", b, this)); g.isInline() || h.push(CKEDITOR.document.once("mouseup", b, this))
            }
        } function R(a) { var b, c, d = a.editables; a.editables = {}; if (a.editables) for (b in d) c = d[b], a.initEditable(b, "string" == typeof c ? { selector: c } : c) } function Z(a) {
            if (a.mask) {
                var b = a.wrapper.findOne(".cke_widget_mask"); b || (b = new CKEDITOR.dom.element("img",
                    a.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_mask" }), a.wrapper.append(b)); a.mask = b
            }
        } function ga(a) { if (a.parts) { var b = {}, c, d; for (d in a.parts) c = a.wrapper.findOne(a.parts[d]), b[d] = c; a.parts = b } } function X(a, b) {
            U(a); ga(a); R(a); Z(a); J(a); Q(a); O(a); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart", function (b) { var c = b.data.getTarget(); e.getNestedEditable(a, c) || a.inline && e.isDomDragHandler(c) || b.data.preventDefault() }); a.wrapper.removeClass("cke_widget_new");
            a.element.addClass("cke_widget_element"); a.on("key", function (b) { b = b.data.keyCode; if (13 == b) a.edit(); else { if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) { M(a, b == CKEDITOR.CTRL + 88); return } if (b in da || CKEDITOR.CTRL & b || CKEDITOR.ALT & b) return } return !1 }, null, null, 999); a.on("doubleclick", function (b) { a.edit() && b.cancel() }); if (b.data) a.on("data", b.data); if (b.edit) a.on("edit", b.edit)
        } function U(a) { (a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id) } function aa(a) {
            a.element.data("cke-widget-data",
                encodeURIComponent(JSON.stringify(a.data)))
        } function ba() {
            function a() { } function b(a, c, d) { return d && this.checkElement(a) ? (a = d.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1 } function c(a) {
                function b(a, c, d) { for (var e = a.length, f = 0; f < e;) { if (c.call(d, a[f], f, a)) return a[f]; f++ } } function e(a) {
                    function b(a, c) {
                        var d = CKEDITOR.tools.object.keys(a), e = CKEDITOR.tools.object.keys(c); if (d.length !== e.length) return !1; for (var f in a) if (("object" !== typeof a[f] || "object" !== typeof c[f] || !b(a[f], c[f])) && a[f] !==
                            c[f]) return !1; return !0
                    } return function (c) { return b(a.getDefinition(), c.getDefinition()) }
                } var f = a.widget, g; d[f] || (d[f] = {}); for (var h = 0, k = a.group.length; h < k; h++)g = a.group[h], d[f][g] || (d[f][g] = []), g = d[f][g], b(g, e(a)) || g.push(a)
            } var d = {}; CKEDITOR.style.addCustomHandler({
                type: "widget", setup: function (a) { this.widget = a.widget; (this.group = "string" == typeof a.group ? [a.group] : a.group) && c(this) }, apply: function (a) {
                    var b; a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused,
                        this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this))
                }, remove: function (a) { a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && a.widgets.focused.removeStyle(this) }, removeStylesFromSameGroup: function (a) {
                    var b, c, e = !1; if (!(a instanceof CKEDITOR.editor)) return !1; c = a.elementPath(); if (this.checkApplicable(c, a)) for (var f = 0, g = this.group.length; f < g; f++) {
                        b = d[this.widget][this.group[f]]; for (var h = 0; h < b.length; h++)b[h] !== this && b[h].checkActive(c, a) && (a.widgets.focused.removeStyle(b[h]),
                            e = !0)
                    } return e
                }, checkActive: function (a, b) { return this.checkElementMatch(a.lastElement, 0, b) }, checkApplicable: function (a, b) { return b instanceof CKEDITOR.editor ? this.checkElement(a.lastElement) : !1 }, checkElementMatch: b, checkElementRemovable: b, checkElement: function (a) { return e.isDomWidgetWrapper(a) ? (a = a.getFirst(e.isDomWidgetElement)) && a.data("widget") == this.widget : !1 }, buildPreview: function (a) { return a || this._.definition.name }, toAllowedContentRules: function (a) {
                    if (!a) return null; a = a.widgets.registered[this.widget];
                    var b, c = {}; if (!a) return null; if (a.styleableElements) { b = this.getClassesArray(); if (!b) return null; c[a.styleableElements] = { classes: b, propertiesOnly: !0 }; return c } return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) : null
                }, getClassesArray: function () { var a = this._.definition.attributes && this._.definition.attributes["class"]; return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null }, applyToRange: a, removeFromRange: a, applyToObject: a
            })
        } CKEDITOR.plugins.add("widget", {
            requires: "lineutils,clipboard,widgetselection",
            onLoad: function () {
            void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss('.cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:block;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}.cke_editable[contenteditable\x3d"false"] .cke_widget_drag_handler_container{display:none;}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}'),
                ba())
            }, beforeInit: function (b) { void 0 !== CKEDITOR.document.$.querySelectorAll && (b.widgets = new a(b)) }, afterInit: function (a) { if (void 0 !== CKEDITOR.document.$.querySelectorAll) { var b = a.widgets.registered, c, d, e; for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), { label: e, command: c.name, toolbar: "insert,10" }); x(a); K(a.undoManager) } }
        }); a.prototype = {
            MIN_SELECTION_CHECK_INTERVAL: 500, add: function (a, c) {
                c = CKEDITOR.tools.prototypedCopy(c); c.name = a; c._ = c._ || {}; this.editor.fire("widgetDefinition",
                    c); c.template && (c.template = new CKEDITOR.template(c.template)); b(this.editor, c); f(this, c); return this.registered[a] = c
            }, addUpcastCallback: function (a) { this._.upcastCallbacks.push(a) }, checkSelection: function () {
                var a = this.editor.getSelection(), b = a.getSelectedElement(), c = F(this), d; if (b && (d = this.getByElement(b, !0))) return c.focus(d).select(d).commit(); a = a.getRanges()[0]; if (!a || a.collapsed) return c.commit(); a = new CKEDITOR.dom.walker(a); for (a.evaluator = e.isDomWidgetWrapper; b = a.next();)c.select(this.getByElement(b));
                c.commit()
            }, checkWidgets: function (a) { this.fire("checkWidgets", CKEDITOR.tools.copy(a || {})) }, del: function (a) { if (this.focused === a) { var b = a.editor, c = b.createRange(), d; (d = c.moveToClosestEditablePosition(a.wrapper, !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1)); d && b.getSelection().selectRanges([c]) } a.wrapper.remove(); this.destroy(a, !0) }, destroy: function (a, b) { this.widgetHoldingFocusedEditable === a && u(this, a, null, b); a.destroy(b); delete this.instances[a.id]; this.fire("instanceDestroyed", a) }, destroyAll: function (a,
                b) { var c, d, e = this.instances; if (b && !a) { d = b.find(".cke_widget_wrapper"); for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f), !0)) && this.destroy(c) } else for (d in e) c = e[d], this.destroy(c, a) }, finalizeCreation: function (a) { (a = a.getFirst()) && e.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus()) }, getByElement: function () {
                    function a(c) { return c.is(b) && c.data("cke-widget-id") } var b = { div: 1, span: 1 }; return function (b, c) {
                        if (!b) return null;
                        var d = a(b); if (!c && !d) { var e = this.editor.editable(); do b = b.getParent(); while (b && !b.equals(e) && !(d = a(b))) } return this.instances[d] || null
                    }
                }(), initOn: function (a, b, c) { b ? "string" == typeof b && (b = this.registered[b]) : b = this.registered[a.data("widget")]; if (!b) return null; var d = this.wrapElement(a, b.name); return d ? d.hasClass("cke_widget_new") ? (a = new e(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null }, initOnAll: function (a) {
                    a = (a || this.editor.editable()).find(".cke_widget_new");
                    for (var b = [], c, d = a.count(); d--;)(c = this.initOn(a.getItem(d).getFirst(e.isDomWidgetElement))) && b.push(c); return b
                }, onWidget: function (a) { var b = Array.prototype.slice.call(arguments); b.shift(); for (var c in this.instances) { var d = this.instances[c]; d.name == a && d.on.apply(d, b) } this.on("instanceCreated", function (c) { c = c.data; c.name == a && c.on.apply(c, b) }) }, parseElementClasses: function (a) {
                    if (!a) return null; a = CKEDITOR.tools.trim(a).split(/\s+/); for (var b, c = {}, d = 0; b = a.pop();)-1 == b.indexOf("cke_") && (c[b] = d = 1); return d ?
                        c : null
                }, wrapElement: function (a, b) {
                    var c = null, d, e; if (a instanceof CKEDITOR.dom.element) {
                        b = b || a.data("widget"); d = this.registered[b]; if (!d) return null; if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c; a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0); a.data("widget", b); (e = v(d, a.getName())) && l(a); c = new CKEDITOR.dom.element(e ? "span" : "div", a.getDocument()); c.setAttributes(p(e, b)); c.data("cke-display-name", d.pathName ?
                            d.pathName : a.getName()); a.getParent(!0) && c.replace(a); a.appendTo(c)
                    } else if (a instanceof CKEDITOR.htmlParser.element) {
                        b = b || a.attributes["data-widget"]; d = this.registered[b]; if (!d) return null; if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT && c.attributes["data-cke-widget-wrapper"]) return c; "data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0); b && (a.attributes["data-widget"] = b); (e = v(d, a.name)) && l(a); c = new CKEDITOR.htmlParser.element(e ? "span" :
                            "div", p(e, b)); c.attributes["data-cke-display-name"] = d.pathName ? d.pathName : a.name; d = a.parent; var f; d && (f = a.getIndex(), a.remove()); c.add(a); d && w(d, f, c)
                    } return c
                }, _tests_createEditableFilter: g
        }; CKEDITOR.event.implementOn(a.prototype); e.prototype = {
            addClass: function (a) { this.element.addClass(a); this.wrapper.addClass(e.WRAPPER_CLASS_PREFIX + a) }, applyStyle: function (a) { I(this, a, 1) }, checkStyleActive: function (a) { a = G(a); var b; if (!a) return !1; for (; b = a.pop();)if (!this.hasClass(b)) return !1; return !0 }, destroy: function (a) {
                this.fire("destroy");
                if (this.editables) for (var b in this.editables) this.destroyEditable(b, a); a || ("0" == this.element.data("cke-widget-keep-attr") && this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)); this.wrapper = null
            }, destroyEditable: function (a, b) {
                var c = this.editables[a], d = !0; c.removeListener("focus", N); c.removeListener("blur", D); this.editor.focusManager.remove(c);
                if (c.filter) { for (var e in this.repository.instances) { var f = this.repository.instances[e]; f.editables && (f = f.editables[a]) && f !== c && c.filter === f.filter && (d = !1) } d && (c.filter.destroy(), (d = this.repository._.filters[this.name]) && delete d[a]) } b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])); delete this.editables[a]
            }, edit: function () {
                var a = { dialog: this.dialog },
                b = this; if (!1 === this.fire("edit", a) || !a.dialog) return !1; this.editor.openDialog(a.dialog, function (a) { var c, d; !1 !== b.fire("dialog", a) && (c = a.on("show", function () { a.setupContent(b) }), d = a.on("ok", function () { var c, d = b.on("data", function (a) { c = 1; a.cancel() }, null, null, 0); b.editor.fire("saveSnapshot"); a.commitContent(b); d.removeListener(); c && (b.fire("data", b.data), b.editor.fire("saveSnapshot")) }), a.once("hide", function () { c.removeListener(); d.removeListener() })) }); return !0
            }, getClasses: function () { return this.repository.parseElementClasses(this.element.getAttribute("class")) },
            hasClass: function (a) { return this.element.hasClass(a) }, initEditable: function (a, b) {
                var d = this._findOneNotNested(b.selector); return d && d.is(CKEDITOR.dtd.$editable) ? (d = new c(this.editor, d, { filter: g.call(this.repository, this.name, a, b) }), this.editables[a] = d, d.setAttributes({ contenteditable: "true", "data-cke-widget-editable": a, "data-cke-enter-mode": d.enterMode }), d.filter && d.data("cke-filter", d.filter.id), d.addClass("cke_widget_editable"), d.removeClass("cke_widget_editable_focused"), b.pathName && d.data("cke-display-name",
                    b.pathName), this.editor.focusManager.add(d), d.on("focus", N, this), CKEDITOR.env.ie && d.on("blur", D, this), d._.initialSetData = !0, d.setData(d.getHtml()), !0) : !1
            }, _findOneNotNested: function (a) { a = this.wrapper.find(a); for (var b, c, d = 0; d < a.count(); d++)if (b = a.getItem(d), c = b.getAscendant(e.isDomWidgetWrapper), this.wrapper.equals(c)) return b; return null }, isInited: function () { return !(!this.wrapper || !this.inited) }, isReady: function () { return this.isInited() && this.ready }, focus: function () {
                var a = this.editor.getSelection();
                if (a) { var b = this.editor.checkDirty(); a.fake(this.wrapper); !b && this.editor.resetDirty() } this.editor.focus()
            }, removeClass: function (a) { this.element.removeClass(a); this.wrapper.removeClass(e.WRAPPER_CLASS_PREFIX + a) }, removeStyle: function (a) { I(this, a, 0) }, setData: function (a, b) { var c = this.data, d = 0; if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1); else { var e = a; for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a]) } d && this.dataReady && (aa(this), this.fire("data", c)); return this }, setFocused: function (a) {
            this.wrapper[a ? "addClass" :
                "removeClass"]("cke_widget_focused"); this.fire(a ? "focus" : "blur"); return this
            }, setSelected: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected"); this.fire(a ? "select" : "deselect"); return this }, updateDragHandlerPosition: function () {
                var a = this.editor, b = this.element.$, c = this._.dragHandlerOffset, b = { x: b.offsetLeft, y: b.offsetTop - 15 }; c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({ top: b.y + "px", left: b.x + "px" }), this.dragHandlerContainer.removeStyle("display"),
                    a.fire("unlockSnapshot"), !c && a.resetDirty(), this._.dragHandlerOffset = b)
            }
        }; CKEDITOR.event.implementOn(e.prototype); e.getNestedEditable = function (a, b) { return !b || b.equals(a) ? null : e.isDomNestedEditable(b) ? b : e.getNestedEditable(a, b.getParent()) }; e.isDomDragHandler = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler") }; e.isDomDragHandlerContainer = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container") }; e.isDomNestedEditable =
            function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable") }; e.isDomWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget") }; e.isDomWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper") }; e.isDomWidget = function (a) { return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1 }; e.isParserWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"] };
        e.isParserWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"] }; e.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_"; c.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
            setData: function (a) { this._.initialSetData || this.editor.widgets.destroyAll(!1, this); this._.initialSetData = !1; a = this.editor.dataProcessor.toHtml(a, { context: this.getName(), filter: this.filter, enterMode: this.enterMode }); this.setHtml(a); this.editor.widgets.initOnAll(this) },
            getData: function () { return this.editor.dataProcessor.toDataFormat(this.getHtml(), { context: this.getName(), filter: this.filter, enterMode: this.enterMode }) }
        }); var V = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i, da = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }; da[CKEDITOR.SHIFT + 121] =
            1; CKEDITOR.plugins.widget = e; e.repository = a; e.nestedEditable = c
    }(), function () {
        function a(a, b, e) { this.editor = a; this.notification = null; this._message = new CKEDITOR.template(b); this._singularMessage = e ? new CKEDITOR.template(e) : null; this._tasks = []; this._doneTasks = this._doneWeights = this._totalWeights = 0 } function e(a) { this._weight = a || 1; this._doneWeight = 0; this._isCanceled = !1 } CKEDITOR.plugins.add("notificationaggregator", { requires: "notification" }); a.prototype = {
            createTask: function (a) {
                a = a || {}; var b = !this.notification,
                    e; b && (this.notification = this._createNotification()); e = this._addTask(a); e.on("updated", this._onTaskUpdate, this); e.on("done", this._onTaskDone, this); e.on("canceled", function () { this._removeTask(e) }, this); this.update(); b && this.notification.show(); return e
            }, update: function () { this._updateNotification(); this.isFinished() && this.fire("finished") }, getPercentage: function () { return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights }, isFinished: function () { return this.getDoneTaskCount() === this.getTaskCount() },
            getTaskCount: function () { return this._tasks.length }, getDoneTaskCount: function () { return this._doneTasks }, _updateNotification: function () { this.notification.update({ message: this._getNotificationMessage(), progress: this.getPercentage() }) }, _getNotificationMessage: function () { var a = this.getTaskCount(), b = { current: this.getDoneTaskCount(), max: a, percentage: Math.round(100 * this.getPercentage()) }; return (1 == a && this._singularMessage ? this._singularMessage : this._message).output(b) }, _createNotification: function () {
                return new CKEDITOR.plugins.notification(this.editor,
                    { type: "progress" })
            }, _addTask: function (a) { a = new e(a.weight); this._tasks.push(a); this._totalWeights += a._weight; return a }, _removeTask: function (a) { var b = CKEDITOR.tools.indexOf(this._tasks, a); -1 !== b && (a._doneWeight && (this._doneWeights -= a._doneWeight), this._totalWeights -= a._weight, this._tasks.splice(b, 1), this.update()) }, _onTaskUpdate: function (a) { this._doneWeights += a.data; this.update() }, _onTaskDone: function () { this._doneTasks += 1; this.update() }
        }; CKEDITOR.event.implementOn(a.prototype); e.prototype = {
            done: function () { this.update(this._weight) },
            update: function (a) { if (!this.isDone() && !this.isCanceled()) { a = Math.min(this._weight, a); var b = a - this._doneWeight; this._doneWeight = a; this.fire("updated", b); this.isDone() && this.fire("done") } }, cancel: function () { this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled")) }, isDone: function () { return this._weight === this._doneWeight }, isCanceled: function () { return this._isCanceled }
        }; CKEDITOR.event.implementOn(e.prototype); CKEDITOR.plugins.notificationAggregator = a; CKEDITOR.plugins.notificationAggregator.task =
            e
    }(), "use strict", function () {
        CKEDITOR.plugins.add("uploadwidget", { requires: "widget,clipboard,filetools,notificationaggregator", init: function (a) { a.filter.allow("*[!data-widget,!data-cke-upload-id]") }, isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported } }); CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
            addUploadWidget: function (a, e, c) {
                var b = CKEDITOR.fileTools, f = a.uploadRepository, m = c.supportedTypes ? 10 : 20; if (c.fileToElement) a.on("paste",
                    function (c) { c = c.data; var l = a.widgets.registered[e], d = c.dataTransfer, k = d.getFilesCount(), g = l.loadMethod || "loadAndUpload", m, p; if (!c.dataValue && k) for (p = 0; p < k; p++)if (m = d.getFile(p), !l.supportedTypes || b.isTypeSupported(m, l.supportedTypes)) { var w = l.fileToElement(m); m = f.create(m, void 0, l.loaderType); w && (m[g](l.uploadUrl, l.additionalRequestParameters), CKEDITOR.fileTools.markElement(w, e, m.id), "loadAndUpload" != g && "upload" != g || l.skipNotifications || CKEDITOR.fileTools.bindNotifications(a, m), c.dataValue += w.getOuterHtml()) } },
                    null, null, m); CKEDITOR.tools.extend(c, {
                        downcast: function () { return new CKEDITOR.htmlParser.text("") }, init: function () {
                            var b = this, c = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"), d = f.loaders[c], e = CKEDITOR.tools.capitalize, g, m; d.on("update", function (f) {
                                if ("abort" === d.status && "function" === typeof b.onAbort) b.onAbort(d); if (b.wrapper && b.wrapper.getParent()) {
                                    a.fire("lockSnapshot"); f = "on" + e(d.status); if ("abort" === d.status || "function" !== typeof b[f] || !1 !== b[f](d)) m = "cke_upload_" + d.status, b.wrapper &&
                                        m != g && (g && b.wrapper.removeClass(g), b.wrapper.addClass(m), g = m), "error" != d.status && "abort" != d.status || a.widgets.del(b); a.fire("unlockSnapshot")
                                } else CKEDITOR.instances[a.name] && a.editable().find('[data-cke-upload-id\x3d"' + c + '"]').count() || d.abort(), f.removeListener()
                            }); d.update()
                        }, replaceWith: function (b, c) {
                            if ("" === b.trim()) a.widgets.del(this); else {
                                var d = this == a.widgets.focused, e = a.editable(), f = a.createRange(), m, p; d || (p = a.getSelection().createBookmarks()); f.setStartBefore(this.wrapper); f.setEndAfter(this.wrapper);
                                d && (m = f.createBookmark()); e.insertHtmlIntoRange(b, f, c); a.widgets.checkWidgets({ initOnlyNew: !0 }); a.widgets.destroy(this, !0); d ? (f.moveToBookmark(m), f.select()) : a.getSelection().selectBookmarks(p)
                            }
                        }, _getLoader: function () { var a = this.wrapper.findOne("[data-cke-upload-id]"); return a ? this.editor.uploadRepository.loaders[a.data("cke-upload-id")] : null }
                    }); a.widgets.add(e, c)
            }, markElement: function (a, e, c) { a.setAttributes({ "data-cke-upload-id": c, "data-widget": e }) }, bindNotifications: function (a, e) {
                function c() {
                    b =
                    a._.uploadWidgetNotificaionAggregator; if (!b || b.isFinished()) b = a._.uploadWidgetNotificaionAggregator = new CKEDITOR.plugins.notificationAggregator(a, a.lang.uploadwidget.uploadMany, a.lang.uploadwidget.uploadOne), b.once("finished", function () { var c = b.getTaskCount(); 0 === c ? b.notification.hide() : b.notification.update({ message: 1 == c ? a.lang.uploadwidget.doneOne : a.lang.uploadwidget.doneMany.replace("%1", c), type: "success", important: 1 }) })
                } var b, f = null; e.on("update", function () {
                !f && e.uploadTotal && (c(), f = b.createTask({ weight: e.uploadTotal }));
                    f && "uploading" == e.status && f.update(e.uploaded)
                }); e.on("uploaded", function () { f && f.done() }); e.on("error", function () { f && f.cancel(); a.showNotification(e.message, "warning") }); e.on("abort", function () { f && f.cancel(); CKEDITOR.instances[a.name] && a.showNotification(a.lang.uploadwidget.abort, "info") })
            }
        })
    }(), "use strict", function () {
        function a(a) { 9 >= a && (a = "0" + a); return String(a) } function e(b) {
            var e = new Date, e = [e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds()]; c += 1; return "image-" +
                CKEDITOR.tools.array.map(e, a).join("") + "-" + c + "." + b
        } var c = 0; CKEDITOR.plugins.add("uploadimage", {
            requires: "uploadwidget", onLoad: function () { CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}") }, isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported }, init: function (a) {
                if (this.isSupportedEnvironment()) {
                    var c = CKEDITOR.fileTools, m = c.getUploadUrl(a.config, "image"); m && (c.addUploadWidget(a, "uploadimage", {
                        supportedTypes: /image\/(jpeg|png|gif|bmp)/, uploadUrl: m, fileToElement: function () {
                            var a =
                                new CKEDITOR.dom.element("img"); a.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d"); return a
                        }, parts: { img: "img" }, onUploading: function (a) { this.parts.img.setAttribute("src", a.data) }, onUploaded: function (a) { var b = this.parts.img.$; this.replaceWith('\x3cimg src\x3d"' + a.url + '" width\x3d"' + (a.responseData.width || b.naturalWidth) + '" height\x3d"' + (a.responseData.height || b.naturalHeight) + '"\x3e') }
                    }), a.on("paste", function (h) {
                        if (h.data.dataValue.match(/<img[\s\S]+data:/i)) {
                            h =
                            h.data; var l = document.implementation.createHTMLDocument(""), l = new CKEDITOR.dom.element(l.body), d, k, g; l.data("cke-editable", 1); l.appendHtml(h.dataValue); d = l.find("img"); for (g = 0; g < d.count(); g++) {
                                k = d.getItem(g); var n = k.getAttribute("src"), p = n && "data:" == n.substring(0, 5), w = null === k.data("cke-realelement"); p && w && !k.data("cke-upload-id") && !k.isReadOnly(1) && (p = (p = n.match(/image\/([a-z]+?);/i)) && p[1] || "jpg", n = a.uploadRepository.create(n, e(p)), n.upload(m), c.markElement(k, "uploadimage", n.id), c.bindNotifications(a,
                                    n))
                            } h.dataValue = l.getHtml()
                        }
                    }))
                }
            }
        })
    }(), CKEDITOR.plugins.add("wsc", {
        requires: "dialog", parseApi: function (a) { a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function () { }; a.config.wsc_onClose = "function" === typeof a.config.wsc_onClose ? a.config.wsc_onClose : function () { } }, parseConfig: function (a) {
            a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk"; a.config.wsc_customDictionaryIds =
                a.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || ""; a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || ""; a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript; a.config.wsc_interfaceLang = a.config.wsc_interfaceLang; CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell"; CKEDITOR.config.wsc_version = "v4.3.0-master-d769233"; CKEDITOR.config.wsc_removeGlobalVariable =
                    !0
        }, onLoad: function (a) { "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css")) }, init: function (a) {
            var e = CKEDITOR.env; this.parseConfig(a); this.parseApi(a); a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(e.ie && (8 > e.version || e.quirks)) }; "undefined" == typeof a.plugins.scayt && a.ui.addButton &&
                a.ui.addButton("SpellChecker", { label: a.lang.wsc.toolbar, click: function (a) { var b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (b = b.replace(/\s/g, "")) ? a.execCommand("checkspell") : alert("Nothing to check!") }, toolbar: "spellchecker,10" }); CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
        }
    }), function () {
        function a(a) {
            function b(a) {
                var c = !1; g.attachListener(g,
                    "keydown", function () { var b = l.getBody().getElementsByTag(a); if (!c) { for (var d = 0; d < b.count(); d++)b.getItem(d).setCustomData("retain", !0); c = !0 } }, null, null, 1); g.attachListener(g, "keyup", function () { var b = l.getElementsByTag(a); c && (1 == b.count() && !b.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes()) && b.getItem(0).remove(1), c = !1) })
            } var c = this.editor, l = a.document, d = l.body, k = l.getElementById("cke_actscrpt"); k && k.parentNode.removeChild(k); (k = l.getElementById("cke_shimscrpt")) &&
                k.parentNode.removeChild(k); (k = l.getElementById("cke_basetagscrpt")) && k.parentNode.removeChild(k); d.contentEditable = !0; CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, d.removeAttribute("disabled")); delete this._.isLoadingData; this.$ = d; l = new CKEDITOR.dom.document(l); this.setup(); this.fixInitialSelection(); var g = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && l.getDocumentElement().addClass(l.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version &&
                    c.enterMode != CKEDITOR.ENTER_DIV && b("div"); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) l.getDocumentElement().on("mousedown", function (a) { a.data.getTarget().is("html") && setTimeout(function () { c.editable().focus() }) }); e(c); try { c.document.$.execCommand("2D-position", !1, !0) } catch (n) { } (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == c.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                        var b = a.data.getKeystroke(); if (33 == b || 34 == b) if (CKEDITOR.env.ie) setTimeout(function () { c.getSelection().scrollIntoView() },
                            0); else if (c.window.$.innerHeight > this.$.offsetHeight) { var d = c.createRange(); d[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this); d.select(); a.data.preventDefault() }
                    }); CKEDITOR.env.ie && this.attachListener(l, "blur", function () { try { l.$.selection.empty() } catch (a) { } }); CKEDITOR.env.iOS && this.attachListener(l, "touchend", function () { a.focus() }); d = c.document.getElementsByTag("title").getItem(0); d.data("cke-title", d.getText()); CKEDITOR.env.ie && (c.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () {
                    "unloaded" ==
                        this.status && (this.status = "ready"); c.fire("contentDom"); this._.isPendingFocus && (c.focus(), this._.isPendingFocus = !1); setTimeout(function () { c.fire("dataReady") }, 0)
                    }, 0, this)
        } function e(a) {
            function b() { var d; a.editable().attachListener(a, "selectionChange", function () { var b = a.getSelection().getSelectedElement(); b && (d && (d.detachEvent("onresizestart", c), d = null), b.$.attachEvent("onresizestart", c), d = b.$) }) } function c(a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) try {
                var e = a.document.$; e.execCommand("enableObjectResizing",
                    !1, !a.config.disableObjectResizing); e.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
            } catch (d) { } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b(a)
        } function c() {
            var a = []; if (8 <= CKEDITOR.document.$.documentMode) { a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}"); var b = [], c; for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable\x3dfalse]"); a.push(b.join(",") + "{display:inline-block}") } else CKEDITOR.env.gecko &&
                (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")); a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
        } var b; CKEDITOR.plugins.add("wysiwygarea", {
            init: function (a) {
                a.config.fullPage && a.addFeature({ allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body" }); a.addMode("wysiwyg", function (c) {
                    function e(g) {
                        g && g.removeListener();
                        a.editable(new b(a, d.$.contentWindow.document.body)); a.setData(a.getData(1), c)
                    } var l = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", l = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(l) + "}())" : "", d = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + l + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e'); d.setStyles({ width: "100%", height: "100%" }); d.addClass("cke_wysiwyg_frame").addClass("cke_reset");
                    l = a.ui.space("contents"); l.append(d); var k = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko; if (k) d.on("load", e); var g = a.title, n = a.fire("ariaEditorHelpLabel", {}).label; g && (CKEDITOR.env.ie && n && (g += ", " + n), d.setAttribute("title", g)); if (n) { var g = CKEDITOR.tools.getNextId(), p = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + n + "\x3c/span\x3e"); l.append(p, 1); d.setAttribute("aria-describedby", g) } a.on("beforeModeUnload", function (a) { a.removeListener(); p && p.remove() });
                    d.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" }); !k && e(); a.fire("ariaWidget", d)
                })
            }
        }); CKEDITOR.editor.prototype.addContentsCss = function (a) { var b = this.config, c = b.contentsCss; CKEDITOR.tools.isArray(c) || (b.contentsCss = c ? [c] : []); b.contentsCss.push(a) }; b = CKEDITOR.tools.createClass({
            $: function () { this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (b) { CKEDITOR.tools.setTimeout(a, 0, this, b) }, this); this._.docTitle = this.getWindow().getFrame().getAttribute("title") },
            base: CKEDITOR.editable, proto: {
                setData: function (a, b) {
                    var e = this.editor; if (b) this.setHtml(a), this.fixInitialSelection(), e.fire("dataReady"); else {
                        this._.isLoadingData = !0; e._.dataStore = { id: 1 }; var l = e.config, d = l.fullPage, k = l.docType, g = CKEDITOR.tools.buildStyleHtml(c()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); d || (g += CKEDITOR.tools.buildStyleHtml(e.config.contentsCss)); var n = l.baseHref ? '\x3cbase href\x3d"' + l.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ""; d && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) {
                        e.docType =
                            k = a; return ""
                        }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { e.xmlDeclaration = a; return "" })); a = e.dataProcessor.toHtml(a); d ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a =
                            k + a) : a = l.docType + '\x3chtml dir\x3d"' + l.contentsLangDirection + '" lang\x3d"' + (l.contentsLanguage || e.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + n + g + "\x3c/head\x3e\x3cbody" + (l.bodyId ? ' id\x3d"' + l.bodyId + '"' : "") + (l.bodyClass ? ' class\x3d"' + l.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e"; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e")));
                        l = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e"; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (l += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
                        n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (l += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e'); a = a.replace(/(?=\s*<\/(:?head)>)/, l); this.clearCustomData(); this.clearListeners(); e.fire("contentDomUnload"); var p = this.getDocument(); try { p.write(a) } catch (w) { setTimeout(function () { p.write(a) }, 0) }
                    }
                }, getData: function (a) {
                    if (a) return this.getHtml(); a = this.editor; var b = a.config, c = b.fullPage, e = c && a.docType, d = c && a.xmlDeclaration,
                        k = this.getDocument(), c = c ? k.getDocumentElement().getOuterHtml() : k.getBody().getHtml(); CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, "")); c = a.dataProcessor.toDataFormat(c); d && (c = d + "\n" + c); e && (c = e + "\n" + c); return c
                }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : b.baseProto.focus.call(this) }, detach: function () {
                    var a = this.editor, c = a.document, e; try { e = a.window.getFrame() } catch (l) { } b.baseProto.detach.call(this); this.clearCustomData(); c.getDocumentElement().clearCustomData();
                    CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); e && e.getParent() ? (e.clearCustomData(), (a = e.removeCustomData("onResize")) && a.removeListener(), e.remove()) : CKEDITOR.warn("editor-destroy-iframe")
                }
            }
        })
    }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,blockquote,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,elementspath,indent,indentlist,list,enterkey,entities,popup,filetools,filebrowser,floatingspace,listblock,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,showborders,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc,wysiwygarea",
    CKEDITOR.config.skin = "moono-lisa", function () {
        var a = function (a, c) { var b = CKEDITOR.getUrl("plugins/" + c); a = a.split(","); for (var f = 0; f < a.length; f++)CKEDITOR.skin.icons[a[f]] = { path: b, offset: -a[++f], bgsize: a[++f] } }; CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,blockquote,168,,copy-rtl,192,,copy,216,,cut-rtl,240,,cut,264,,paste-rtl,288,,paste,312,,horizontalrule,336,,image,360,,indent-rtl,384,,indent,408,,outdent-rtl,432,,outdent,456,,anchor-rtl,480,,anchor,504,,link,528,,unlink,552,,bulletedlist-rtl,576,,bulletedlist,600,,numberedlist-rtl,624,,numberedlist,648,,maximize,672,,pastefromword-rtl,696,,pastefromword,720,,pastetext-rtl,744,,pastetext,768,,removeformat,792,,scayt,816,,source-rtl,840,,source,864,,specialchar,888,,table,912,,redo-rtl,936,,redo,960,,undo-rtl,984,,undo,1008,,simplebox,2064,auto,spellchecker,1056,",
            "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,blockquote,168,auto,copy-rtl,192,auto,copy,216,auto,cut-rtl,240,auto,cut,264,auto,paste-rtl,288,auto,paste,312,auto,horizontalrule,336,auto,image,360,auto,indent-rtl,384,auto,indent,408,auto,outdent-rtl,432,auto,outdent,456,auto,anchor-rtl,480,auto,anchor,504,auto,link,528,auto,unlink,552,auto,bulletedlist-rtl,576,auto,bulletedlist,600,auto,numberedlist-rtl,624,auto,numberedlist,648,auto,maximize,672,auto,pastefromword-rtl,696,auto,pastefromword,720,auto,pastetext-rtl,744,auto,pastetext,768,auto,removeformat,792,auto,scayt,816,auto,source-rtl,840,auto,source,864,auto,specialchar,888,auto,table,912,auto,redo-rtl,936,auto,redo,960,auto,undo-rtl,984,auto,undo,1008,auto,simplebox,1032,auto,spellchecker,1056,auto",
                "icons.png")
    }())
})();