// ==UserScript==
// @name        Ponyhoof
// @namespace   http://www.facebook.com/ponyhoof
// @run-at      document-start
// @version     1.781
// @installURL  https://hoof.little.my/files/ponyhoof.user.js
// @updateURL   https://hoof.little.my/files/ponyhoof.meta.js
// @icon        https://hoof.little.my/files/app32.png
// @icon64      https://hoof.little.my/files/icon64.png
// @description	Ponify Facebook and make it 20% cooler!
// @author      The Ponyhoof Team <pony@little.my> http://ponyhoof.little.my
// @developer   Ng Yik Phang
// @contributor http://ponyhoof.little.my/credits
// @homepage    http://ponyhoof.little.my
// @supportURL  https://www.facebook.com/Ponyhoof
// @contributionURL http://ponyhoof.little.my/donate
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @include http://*.little.my/*
// @include https://*.little.my/*
// @match http://*.facebook.com/*
// @match https://*.facebook.com/*
// @match http://*.little.my/*
// @match https://*.little.my/*
// @exclude http://*.facebook.com/ai.php*
// @exclude http://*.facebook.com/xti.php*
// @exclude http://*.facebook.com/l.php*
// @exclude http://*.facebook.com/sound_iframe.php*
// @exclude http://*.facebook.com/ajax/*
// @exclude http://*.channel.facebook.com/*
// @exclude http://static.*.facebook.com/*
// @exclude http://graph.facebook.com/*
// @exclude http://0.facebook.com/*
// @exclude https://*.facebook.com/ai.php*
// @exclude https://*.facebook.com/xti.php*
// @exclude https://*.facebook.com/l.php*
// @exclude https://*.facebook.com/sound_iframe.php*
// @exclude https://*.facebook.com/ajax/*
// @exclude https://*.channel.facebook.com/*
// @exclude https://s-static.*.facebook.com/*
// @exclude https://graph.facebook.com/*
// @exclude https://0.facebook.com/*
// @exclude https://paste.little.my/*
// ==/UserScript==

/*******************************************************************************
 * Please visit http://jointheherd.lttle.my for the official install!
 *******************************************************************************/


(function() {
	if (typeof WScript !== 'undefined' && typeof window === 'undefined') {
		WScript.echo("Ponyhoof is not run by double-clicking a file in Windows.\n\nPlease visit http://jointheherd.little.my for proper installation.");
		WScript.quit(1);
	}

	if (window.location.hostname.indexOf('facebook.com') === -1 && window.location.hostname.indexOf('little.my') === -1) {
		return;
	}
	
	var d = document, w = window;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;

var SIG = '[Hoof Framework]';
var FRIENDLYNAME = 'Hoof Framework';
var CANLOG = true;
var $noop = function() {};

var userSettings = {};

var USERAGENT = w.navigator.userAgent.toLowerCase();
var ISOPERABLINK = /OPR\//.test(w.navigator.userAgent);
var ISOPERA = !ISOPERABLINK && (typeof opera !== 'undefined' || /opera/.test(USERAGENT));
var ISMAXTHON = /maxthon/i.test(USERAGENT);
var ISMSIE = !ISMAXTHON && !ISOPERA && typeof opera === 'undefined' && (/msie/.test(USERAGENT) || /trident/.test(USERAGENT));
var ISMOBILE = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(USERAGENT);
var ISCHROME = !ISMAXTHON && !ISOPERABLINK && /chrome/i.test(USERAGENT) && typeof chrome !== 'undefined';
var ISFIREFOX = /firefox/i.test(USERAGENT);
var ISSAFARI = !ISOPERABLINK && !ISCHROME && !/chrome/i.test(USERAGENT) && /safari/i.test(USERAGENT);
var ISAVANT = /avant/i.test(USERAGENT);

// R.I.P. unsafeWindow in Chrome 27+ http://crbug.com/222652
if (typeof unsafeWindow == 'undefined') {
	var USW = w;
} else {
	var USW = unsafeWindow;
}

function log(msg) {
	if (CANLOG) {
		if (typeof console !== 'undefined' && console.log) {
			console.log(SIG + ' ' + msg);
		}
	}
}

function dir(msg) {
	if (CANLOG) {
		if (typeof console !== 'undefined' && console.log && console.dir) {
			console.log(SIG);
			console.dir(msg);
		}
	}
}

function debug(msg) {
	if (CANLOG) {
		if (typeof console !== 'undefined') {
			if (console.debug) {
				console.debug(SIG + ' ' + msg);
			} else if (console.log) {
				console.log(SIG + ' ' + msg);
			}
		}
	}
}

function info(msg) {
	if (CANLOG) {
		if (typeof console !== 'undefined') {
			if (console.info) {
				console.info(SIG + ' ' + msg);
			} else if (console.log) {
				console.log(SIG + ' ' + msg);
			}
		}
	}
}

function warn(msg) {
	if (CANLOG) {
		if (typeof console !== 'undefined') {
			if (console.warn) {
				console.warn(SIG + ' ' + msg);
			} else if (console.log) {
				console.log(SIG + ' ' + msg);
			}
		}
	}
}

function error(msg) {
	if (CANLOG) {
		if (typeof console !== 'undefined') {
			if (console.error) {
				console.error(SIG + ' ' + msg);
			} else if (console.log) {
				console.log(SIG + ' ' + msg);
			}
		}
	}
}

function trace() {
	if (CANLOG) {
		if (typeof console !== 'undefined' && console.error) {
			console.error('Tracing');
		}
	}
}

function $(id) {
	return d.getElementById(id);
}

function randNum(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

function hasClass(ele, c) {
	if (!ele) {
		return false;
	}
	if (ele.classList) {
		return ele.classList.contains(c);
	}

	var regex = new RegExp("(^|\\s)"+c+"(\\s|$)");
	if (ele.className) { // element node
		return (ele.className && regex.test(ele.className));
	} else { // string
		return (ele && regex.test(ele));
	}
}

function addClass(ele, c) {
	if (!ele) {
		return;
	}
	if (ele.classList) {
		ele.classList.add(c);
	} else if (!hasClass(ele, c)) {
		ele.className += ' '+c;
	}
}

function removeClass(ele, c) {
	if (!ele) {
		return;
	}
	if (ele.classList) {
		ele.classList.remove(c);
	} else {
		ele.className = ele.className.replace(new RegExp('(^|\\s)'+c+'(?:\\s|$)','g'),'$1').replace(/\s+/g,' ').replace(/^\s*|\s*$/g,'');
	}
}

function toggleClass(ele, c) {
	if (!ele) {
		return;
	}
	if (hasClass(ele, c)) {
		removeClass(ele, c);
	} else {
		ele.className += ' ' + c;
	}
}

function clickLink(el) {
	if (!el) {
		return false;
	}
	
	var evt = d.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, USW, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	el.dispatchEvent(evt);
	return true;
}

function cookie(n) {
	try {
		return unescape(d.cookie.match('(^|;)?'+n+'=([^;]*)(;|$)')[2]);
	} catch (e) {
		return null;
	}
}

function injectManualStyle(css, id) {
	if ($('ponyhoof_style_'+id)) {
		return $('ponyhoof_style_'+id);
	}
	
	var n = d.createElement('style');
	n.type = 'text/css';
	if (id) {
		n.id = 'ponyhoof_style_'+id;
	}
	n.textContent = '/* '+SIG+' */'+css;

	if (d.head) {
		d.head.appendChild(n);
	} else if (d.body) {
		d.body.appendChild(n);
	} else {
		d.documentElement.appendChild(n);
	}
	
	return n;
}

function fadeOut(ele, callback) {
	addClass(ele, 'ponyhoof_fadeout');
	
	w.setTimeout(function() {
		ele.style.display = 'none';
		
		if (callback) {
			callback(ele);
		}
	}, 250);
}

function getFbDomain() {
	if (w.location.hostname === 'beta.facebook.com') {
		return w.location.hostname;
	}
	return 'www.facebook.com';
}

function onPageReady(callback) {
	var _loop = function() {
		if (/loaded|complete/.test(d.readyState)) {
			callback();
		} else {
			w.setTimeout(_loop, 100);
		}
	};
	_loop();
}

var loopClassName = function(name, func) {
	var l = d.getElementsByClassName(name);
	if (l) {
		for (var i = 0, len = l.length; i < len; i += 1) {
			func(l[i]);
		}
	}
};

function $$(parent, query, func) {
	if (!parent) {
		return;
	}
	var l = parent.querySelectorAll(query);
	if (l.length) {
		for (var i = 0, len = l.length; i < len; i += 1) {
			func(l[i]);
		}
	}
}

// Hacky code adapted from http://www.javascripter.net/faq/browsern.htm
function getBrowserVersion() {
	var ua = w.navigator.userAgent;
	var fullVersion  = ''+parseFloat(w.navigator.appVersion);
	var majorVersion = parseInt(w.navigator.appVersion, 10);
	var nameOffset, offset, ix;

	if (ua.indexOf('Opera') != -1) {
		// In Opera, the true version is after 'Opera' or after 'Version'
		offset = ua.indexOf('Opera');
		fullVersion = ua.substring(offset + 6);

		if (ua.indexOf('Version') != -1) {
			offset = ua.indexOf('Version');
			fullVersion = ua.substring(offset + 8);
		}
	} else if (ua.indexOf('OPR/') != -1) {
		offset = ua.indexOf('OPR/');
		fullVersion = ua.substring(offset + 4);
	} else if (ua.indexOf('Maxthon') != -1) {
		offset = ua.indexOf('Maxthon');
		fullVersion = ua.substring(offset + 8);
	} else if (ua.indexOf('MSIE') != -1) {
		// In MSIE, the true version is after 'MSIE' in userAgent
		offset = ua.indexOf('MSIE');
		fullVersion = ua.substring(offset + 5);
	} else if (ua.indexOf('Trident') != -1) {
		// Starting from IE11+
		// Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
		offset = ua.indexOf('Trident');
		fullVersion = ua.substring(offset + 8);

		if (ua.indexOf('rv:') != -1) {
			offset = ua.indexOf('rv:');
			fullVersion = ua.substring(offset + 4);
		}
	} else if (ua.indexOf('Chrome') != -1) {
		// In Chrome, the true version is after 'Chrome'
		offset = ua.indexOf('Chrome');
		fullVersion = ua.substring(offset + 7);
	} else if (ua.indexOf('Safari') != -1) {
		// In Safari, the true version is after 'Safari' or after 'Version' 
		offset = ua.indexOf('Safari');
		fullVersion = ua.substring(offset + 7);

		if (ua.indexOf('Version') != -1) {
			offset = ua.indexOf('Version');
			fullVersion = ua.substring(offset + 8);
		}
	} else if (ua.indexOf('Firefox') != -1) {
		// In Firefox, the true version is after 'Firefox' 
		offset = ua.indexOf('Firefox');
		fullVersion = ua.substring(offset + 8);
	} else {
		throw "Unsupported browser";
	}

	if ((ix = fullVersion.indexOf(';')) != -1) {
		fullVersion = fullVersion.substring(0, ix);
	}
	if ((ix = fullVersion.indexOf(' ')) != -1) {
		fullVersion = fullVersion.substring(0, ix);
	}

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
		fullVersion = ''+parseFloat(w.navigator.appVersion);
		majorVersion = parseInt(w.navigator.appVersion,10);
	}

	return {
		major: majorVersion
		,full: fullVersion
	};
}

// http://wiki.greasespot.net/Content_Script_Injection
var contentEval = function(source, arg) {
	arg = arg || {};
	arg.CANLOG = CANLOG;
	
	if (typeof source === 'function') {
		source = '(' + source + ')(' + JSON.stringify(arg) + ');';
	}

	var script = d.createElement('script');
	script.textContent = source;
	d.documentElement.appendChild(script);
	d.documentElement.removeChild(script);
};

var supportsRange = function() {
	var i = d.createElement('input');
	i.setAttribute('type', 'range');
	return i.type !== 'text';
};

var supportsCssTransition = function() {
	var s = d.createElement('div').style;
	return ('transition' in s || 'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s);
};

// Menu
var MENUS = {};
var Menu = function(id, p) {
	var k = this;
	
	k.id = id;
	MENUS['ponyhoof_menu_'+k.id] = k;
	k.menu = null; // outer wrap
	k.selectorMenu = null; // .uiMenu.uiSelectorMenu
	k.menuInner = null; // .uiMenuInner
	k.content = null; // .uiScrollableAreaContent
	k.button = null;
	k.wrap = null; // ponyhoof_menu_wrap, used to separate button and menu
	k.loading = null;
	k._scrollTop = 0; // fix a bug on old safari where menu jumps back to top

	k.menuSearch = null; // .ponyhoof_menu_search
	k.menuSearchInput = null;
	k.menuSearchNoResults = null;
	k.focusStealer = null;

	k.hasScrollableArea = false;
	k.scrollableAreaDiv = null; // .uiScrollableArea
	k.scrollableArea = null; // FB ScrollableArea class

	k.p = p;
	k.onOpen = $noop;
	k.afterClose = $noop;

	k.canSearch = true;
	k.alwaysOverflow = false;
	k.rightFaced = false;
	k.buttonTextClipped = 0;
	k.searchNoResultsMessage = "No results";

	k.createButton = function(startText) {
		if (!startText) {
			startText = '';
		}
		
		var buttonText = d.createElement('span');
		buttonText.className = 'uiButtonText';
		buttonText.innerHTML = startText;

		k.button = d.createElement('a');
		k.button.href = '#';
		k.button.className = 'uiButton ponyhoof_button_menu';
		k.button.setAttribute('role', 'button');
		k.button.setAttribute('aria-haspopup', 'true');
		if (k.buttonTextClipped) {
			k.button.className += ' ponyhoof_button_clipped';
			buttonText.style.maxWidth = k.buttonTextClipped+'px';
		}
		k.button.appendChild(buttonText);

		k.wrap = d.createElement('div');
		k.wrap.className = 'ponyhoof_menu_wrap';
		if (k.rightFaced) {
			k.wrap.className += ' uiSelectorRight';
		}
		k.wrap.appendChild(k.button);
		k.p.appendChild(k.wrap);

		return k.button;
	};
	
	k.createMenu = function() {
		if ($('ponyhoof_menu_'+k.id)) {
			k.menu = $('ponyhoof_menu_'+k.id);
			k.menuInner = k.menu.getElementsByClassName('uiMenuInner')[0];
			return k.menu;
		}
		
		k.injectStyle();
		
		k.menu = d.createElement('div');
		k.menu.className = 'ponyhoof_menu uiSelectorMenuWrapper';
		k.menu.id = 'ponyhoof_menu_'+k.id;
		k.menu.setAttribute('role', 'menu');
		//k.menu.style.display = 'none';
		k.menu.addEventListener('click', function(e) {
			e.stopPropagation();
			return false;
		}, false);
		k.wrap.appendChild(k.menu);
		
		k.selectorMenu = d.createElement('div');
		k.selectorMenu.className = 'uiMenu uiSelectorMenu';
		k.menu.appendChild(k.selectorMenu);
		
		k.menuInner = d.createElement('div');
		k.menuInner.className = 'uiMenuInner';
		k.selectorMenu.appendChild(k.menuInner);

		k.content = d.createElement('div');
		k.content.className = 'uiScrollableAreaContent';
		k.menuInner.appendChild(k.content);
		
		if (k.canSearch) {
			k.menuSearch = d.createElement('div');
			k.menuSearch.className = 'ponyhoof_menu_search';
			k.content.appendChild(k.menuSearch);

			k.menuSearchInput = d.createElement('input');
			k.menuSearchInput.type = 'text';
			k.menuSearchInput.className = 'inputtext';
			k.menuSearchInput.placeholder = "Search";
			k.menuSearch.appendChild(k.menuSearchInput);

			k.menuSearchNoResults = d.createElement('div');
			k.menuSearchNoResults.className = 'ponyhoof_menu_search_noResults';
			k.menuSearchNoResults.textContent = k.searchNoResultsMessage;
			k.menuSearch.appendChild(k.menuSearchNoResults);

			k.menuSearchInput.addEventListener('keydown', k.searchEscapeKey, false);
			k.menuSearchInput.addEventListener('input', k.performSearch, false);

			k.focusStealer = d.createElement('input');
			k.focusStealer.type = 'text';
			k.focusStealer.setAttribute('aria-hidden', 'true');
			k.focusStealer.style.position = 'absolute';
			k.focusStealer.style.top = '-9999px';
			k.focusStealer.style.left = '-9999px';
			k.focusStealer.addEventListener('focus', k.focusStealerFocused, false);
			k.selectorMenu.appendChild(k.focusStealer);
		}

		return k.menu;
	};
	
	k.attachButton = function() {
		k.button.addEventListener('click', function(e) {
			k.toggle();
			e.stopPropagation();
			e.preventDefault();
		}, false);
	};

	k.changeButtonText = function(text) {
		k.button.getElementsByClassName('uiButtonText')[0].innerHTML = text;
		k.button.setAttribute('data-ponyhoof-button-orig', text);
		k.button.setAttribute('data-ponyhoof-button-text', text);

		if (k.buttonTextClipped) {
			k.button.title = text;
		}
	};
	
	k.createSeperator = function() {
		var sep = d.createElement('div');
		sep.className = 'uiMenuSeparator';
		k.content.appendChild(sep);
	};
	
	k.createMenuItem = function(param) {
		var menuItem = new MenuItem(k);
		menuItem._create(param);
		
		k.content.appendChild(menuItem.menuItem);
		
		return menuItem;
	};

	k.createLoading = function() {
		k.loading = d.createElement('span');
		k.loading.className = 'ponyhoof_loading hidden_elem';
		k.wrap.appendChild(k.loading);

		return k.loading;
	};
	
	k.injectStyle = function() {
		var css = '';
		css += 'html .ponyhoof_dialog .ponyhoof_button_menu, .ponyhoof_menuitem_checked {background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAADdCAMAAAB63HDyAAAAaVBMVEUAAABnfapKZJtjeahofqtsbGxwhK97jrXb29vc3Nze3d3f3t/g4N/h4ODi4uLk5OPk5eXm5ubn5+fo6Ojq6enr6+rs6+zs7Ozu7u3v7+/w8PDw8fDx8vHz8vPz8/T09PT19PX19vb////xKBXBAAAAAnRSTlMA70YmMtEAAAFWSURBVHja7d05UsNQFETRNjIS8zzPeP+LxK7CmA04UZ8T6aV968fKijr5pk6+qJNP6uSDOnmnTt6ok1fq5IXZO9j6vfPM/A3TxrA980SB5br58u/KIw3GadwdeaDC+O8799TJHXVyS53cUCfX1MkVdXJJnVxQJ+fUyRl1ckqdnFAnx9TJEXVEFx3RER3RER3RER3RER3RER3RER3RER3REV10REd05hMdAAAAANij3V/4qKtuiL7qZuirboS+6iYAAAAAAAAAAAAAAAAAAAAAAAAAAACA/TrYMkWRYdoYDFFlsW6+MEOZcRqN0FfdBAAAAAAAAAAAAAAAAAAAAAAAAABzcWiCvuaiFzYXvaq35o2PXPPC6JpXVjdCX3UTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBnZYK+5qIXNhe9qrfmjY9c88LomldWN0JfdRMAzMcPe9ehQpH/3pgAAAAASUVORK5CYII=") !important;background-repeat:no-repeat;-moz-background-size:500px 221px;background-size:500px 221px;}';
		
		css += 'html .ponyhoof_dialog .ponyhoof_button_menu {background-position:right 0;padding-right:23px;}';
		css += 'html .ponyhoof_button_menu:active {background-position:right -98px;}';
		css += 'html .openToggler .ponyhoof_button_menu {background-color:#6D84B4;background-position:right -49px;border-color:#3B5998;border-bottom-color:#6D84B4;box-shadow:none;}';
		css += 'html .openToggler .ponyhoof_button_menu .uiButtonText {color:#fff;}';
		
		css += '.ponyhoof_menu_label {padding:7px 4px 0 0;}';
		css += '.ponyhoof_menu_label, .ponyhoof_menu_withlabel .ponyhoof_menu_wrap {display:inline-block;}';
		css += '.ponyhoof_menu_withlabel {margin-bottom:8px;}';
		css += '.ponyhoof_menu_withlabel + .ponyhoof_menu_withlabel {margin-top:-8px;}';
		css += '.ponyhoof_menu_withlabel .ponyhoof_button_menu {margin-top:-3px;}';
		css += '.ponyhoof_menu_withlabel .ponyhoof_loading {margin-top:0;vertical-align:-3px;}';
		css += '.ponyhoof_menu_labelbreak .ponyhoof_menu_label {display:block;padding-bottom:7px;}';

		css += '.ponyhoof_menu_wrap {position:relative;}';
		css += 'html .ponyhoof_menu {z-index:1999;display:none;min-width:0;-webkit-user-select:none;-moz-user-select:-moz-none;user-select:none;}';
		css += '.ponyhoof_menu_wrap.openToggler .ponyhoof_menu {display:block;}';
		css += '.ponyhoof_menu_wrap + .uiButton {margin:4px 0 0 4px;}';
		css += '.ponyhoof_menu .uiMenu {background:#fff;border:1px solid #777;border-bottom:2px solid #293E6A;color:#000;position:absolute;overflow:auto;overflow-x:hidden;text-align:left;}';
		css += '.ponyhoof_menu .uiMenu.overflow {resize:vertical;height:200px;min-height:200px;}';
		css += '.ponyhoof_menu_wrap.uiSelectorRight .uiMenu {left:auto;right:0;}';
		css += '.ponyhoof_menu .ponyhoof_menu_search {padding:0 3px;margin-bottom:4px;}';
		css += '.ponyhoof_menu .ponyhoof_menu_search input {width:100%;resize:none;}';
		css += '.ponyhoof_menu .ponyhoof_menu_search_noResults {display:none;color:#999;text-align:center;margin-top:7px;width:100px;}';
		css += '.ponyhoof_menuitem {border:solid #fff;border-width:1px 0;color:#111;display:block;font-weight:normal;line-height:16px;padding:1px 22px;text-decoration:none;outline:none;-webkit-user-drag:none;resize:none;}';
		css += '.ponyhoof_menu .ponyhoof_menuitem {color:#111;}';
		css += '.ponyhoof_menuitem:hover, .ponyhoof_menuitem:active, .ponyhoof_menuitem:focus {background-color:#6d84b4;border-color:#3b5998;color:#fff;text-decoration:none;}';
		css += '.ponyhoof_menuitem_checked {background-position:0 -146px;font-weight:bold;}';
		css += '.ponyhoof_menuitem_checked:hover, .ponyhoof_menuitem_checked:active, .ponyhoof_menuitem_checked:focus {background-position:0 -206px;}';
		css += '.ponyhoof_menuitem_span {white-space:nowrap;text-overflow:ellipsis;display:inline-block;overflow:hidden;padding-right:16px;max-width:400px;vertical-align:top;}';

		css += '.ponyhoof_button_clipped > .uiButtonText {text-overflow:ellipsis;overflow:hidden;vertical-align:top;}';

		if (ISMOBILE) {
			css += '.ponyhoof_menu .uiMenu.overflow {resize:none !important;height:auto !important;}';
		}

		injectManualStyle(css, 'menu');
	};
	
	k.open = function() {
		k.closeAllMenus();

		addClass(k.wrap, 'openToggler');

		if (!hasClass(k.menuInner.parentNode, 'overflow') && (k.alwaysOverflow || k.menuInner.parentNode.offsetHeight >= 224)) {
			addClass(k.menuInner.parentNode, 'overflow');
		}

		if (k.canSearch && !ISMOBILE) {
			k.menuSearchInput.focus();
			k.menuSearchInput.select();
		}

		// Poke the menu to show the scroll visual cue on Mac OS
		if (k._scrollTop) {
			k.selectorMenu.scrollTop = 0;
		} else {
			k.selectorMenu.scrollTop = 1;
		}
		k.selectorMenu.scrollTop = k._scrollTop;

		d.body.addEventListener('keydown', k.documentEscapeKey, false);
		d.body.addEventListener('click', k.documentClick, false);

		k.onOpen();
	};
	
	k.close = function() {
		if (hasClass(k.wrap, 'openToggler')) {
			k._scrollTop = k.selectorMenu.scrollTop;

			removeClass(k.wrap, 'openToggler');
			d.body.removeEventListener('keydown', k.documentEscapeKey, false);
			d.body.removeEventListener('click', k.documentClick, false);

			k.afterClose();
		}
	};

	k.closeAllMenus = function() {
		for (var menu in MENUS) {
			if (MENUS.hasOwnProperty(menu)) {
				MENUS[menu].close();
			}
		}
	};
	
	k.toggle = function() {
		if (hasClass(k.wrap, 'openToggler')) {
			k.close();
		} else {
			k.open();
		}
	};
	
	k.changeChecked = function(menuItem) {
		var already = k.menu.getElementsByClassName('ponyhoof_menuitem_checked');
		if (already.length) {
			removeClass(already[0], 'ponyhoof_menuitem_checked');
		}
		addClass(menuItem.menuItem, 'ponyhoof_menuitem_checked');
	};

	k.performSearch = function() {
		var val = k.menuSearchInput.value;
		var regex = new RegExp(val, 'i');

		var count = 0;
		$$(k.menu, '.ponyhoof_menuitem', function(menuitem) {
			if (val == '') {
				menuitem.style.display = '';
				return;
			}

			if (!hasClass(menuitem, 'unsearchable')) {
				menuitem.style.display = 'none';

				var compare = menuitem.textContent;
				if (menuitem.getAttribute('data-ponyhoof-menu-searchAlternate')) {
					compare = menuitem.getAttribute('data-ponyhoof-menu-searchAlternate');
				}

				if (regex.test(compare)) {
					menuitem.style.display = 'block';
					count += 1;
				}
			} else {
				menuitem.style.display = 'none';
			}
		});

		$$(k.menu, '.ponyhoof_menu_search_noResults', function(ele) {
			if (val) {
				if (!count) {
					ele.style.display = 'block';
				} else {
					ele.style.display = 'none';
				}
			} else {
				ele.style.display = 'none';
			}
		});

		$$(k.menu, '.uiMenuSeparator', function(menuitem) {
			if (val == '') {
				menuitem.style.display = '';
				return;
			}

			menuitem.style.display = 'none';
		});

		if (k.hasScrollableArea) {
			k.scrollableArea.poke();
		}
	};

	k.searchEscapeKey = function(e) {
		if (e.which === 27) {
			if (k.menuSearchInput.value != '') {
				k.menuSearchInput.value = '';
				k.performSearch();
			} else {
				k.close();
				if (k.button) {
					k.button.focus();
				}
			}
			e.stopPropagation();
			e.cancelBubble = true;
		}
	};

	k.documentEscapeKey = function(e) {
		if (e.which === 27 && hasClass(k.wrap, 'openToggler')) { // esc
			k.close();
			e.stopPropagation();
			e.cancelBubble = true;

			if (k.button) {
				k.button.focus();
			}
		}
	};

	k.documentClick = function(e) {
		k.close();
		e.stopPropagation();
		e.preventDefault();
	};

	k.focusStealerFocused = function(e) {
		if (k.canSearch) {
			k.menuSearchInput.focus();
		}
	};
};

var MenuItem = function(menu) {
	var k = this;
	
	k.menuItem = null;
	k.menu = menu;
	k.onclick = null;

	k._create = function(param) {
		k.menuItem = d.createElement('a');
		k.menuItem.href = '#';
		k.menuItem.className = 'ponyhoof_menuitem';
		k.menuItem.setAttribute('role', 'menuitem');
		
		if (param.check) {
			k.menuItem.className += ' ponyhoof_menuitem_checked';
		}
		
		if (param.data) {
			k.menuItem.setAttribute('data-ponyhoof-menu-data', param.data);
		}
		
		if (param.title) {
			k.menuItem.setAttribute('aria-label', param.title);
			k.menuItem.setAttribute('data-hover', 'tooltip');
		}
		
		if (param.unsearchable) {
			k.menuItem.className += ' unsearchable';
		}
		
		if (param.searchAlternate) {
			k.menuItem.setAttribute('data-ponyhoof-menu-searchAlternate', param.searchAlternate);
		}
		
		if (param.extraClass) {
			k.menuItem.className += param.extraClass;
		}
		
		k.menuItem.innerHTML = '<span class="ponyhoof_menuitem_span">'+param.html+'</span>';
		
		if (param.onclick) {
			k.onclick = param.onclick;
		}
		k.menuItem.addEventListener('click', function(ev) {
			ev.preventDefault();
			ev.stopPropagation();
			if (k.onclick) {
				k.onclick(k, k.menu);
			}
			
			return false;
		}, false);
		k.menuItem.addEventListener('dragstart', function() {
			return false;
		}, false);
		
		return k.menuItem;
	};
	
	k.getText = function() {
		return k.menuItem.getElementsByClassName('ponyhoof_menuitem_span')[0].innerHTML;
	};
};

// Dialog
var DIALOGS = {};
var DIALOGCOUNT = 2000;
var Dialog = function(id) {
	var k = this;
	
	k.dialog = null;
	k.generic_dialogDiv = null;
	k.popup_dialogDiv = null;
	k.id = id;
	k.visible = false;
	
	k.alwaysModal = false;
	k.noTitle = false;
	k.noBottom = false;
	
	k.canCardspace = true;
	k.cardSpaceTimer = null;
	k.cardspaced = false;

	k.onclose = $noop;
	k.onclosefinish = $noop;
	k.canCloseByEscapeKey = true;
	
	k.skeleton = '';
	
	k.create = function() {
		//if (DIALOGS[k.id]) {
		//	log("Attempting to recreate dialog ID \""+k.id+"\"");
		//	return DIALOGS[k.id].dialog;
		//}
		
		//DIALOGS[k.id] = k;

		log("Creating "+k.id+" dialog...");
		
		k.injectStyle();
		
		DIALOGCOUNT += 1;
		k.skeleton  = '<!-- '+SIG+' Dialog -->';
		k.skeleton += '<div class="generic_dialog pop_dialog" role="dialog" style="z-index:'+(DIALOGCOUNT)+';">';
		k.skeleton += '  <div class="generic_dialog_popup">';
		k.skeleton += '	   <div class="popup">';
		k.skeleton += '	     <div class="wrap">';
		k.skeleton += '		   <h3 title="This dialog is sent from '+FRIENDLYNAME+'"></h3>';
		k.skeleton += '		   <div class="body">';
		k.skeleton += '		       <div class="content clearfix"></div>';
		k.skeleton += '		       <div class="bottom"></div>';
		k.skeleton += '		   </div>'; // body
		k.skeleton += '	     </div>'; // wrap
		k.skeleton += '	   </div>'; // popup
		k.skeleton += '  </div>'; // generic_dialog_popup
		k.skeleton += '</div>';
		
		INTERNALUPDATE = true;
		
		k.dialog = d.createElement('div');
		k.dialog.className = 'ponyhoof_dialog';
		k.dialog.id = 'ponyhoof_dialog_'+k.id;
		k.dialog.innerHTML = k.skeleton;
		d.body.appendChild(k.dialog);
		
		INTERNALUPDATE = false;
		
		k.generic_dialogDiv = k.dialog.getElementsByClassName('pop_dialog')[0];
		k.popup_dialogDiv = k.dialog.getElementsByClassName('popup')[0];
		
		if (k.alwaysModal) {
			addClass(k.generic_dialogDiv, 'generic_dialog_modal');
		}
		if (k.noTitle) {
			addClass(k.dialog.getElementsByTagName('h3')[0], 'hidden_elem');
		}
		if (k.noBottom) {
			addClass(k.dialog.getElementsByClassName('bottom')[0], 'hidden_elem');
		}
		
		k.show();
		
		return k.dialog;
	};
	
	k.injectStyle = function() {
		var cx = '._5p3y';
		if (hasClass(d.body, '_4g5r')) {
			cx = '._4g5r';
		}

		var css = '';
		css += '.ponyhoof_message .wrap {margin-top:3px;background:transparent !important;display:block;}';
		css += '.ponyhoof_message .uiButton.rfloat {margin-left:10px;}';

		css += '.ponyhoof_dialog, .ponyhoof_dialog .body {font-size:11px;}';
			css += cx+' .ponyhoof_dialog, '+cx+' .ponyhoof_dialog .body {font-size:12px;}';
		css += '.ponyhoof_dialog iframe {-webkit-user-select:none;-moz-user-select:-moz-none;user-select:none;}';
		css += '.ponyhoof_dialog textarea, .ponyhoof_dialog input[type="text"] {cursor:text;-moz-box-sizing:border-box;box-sizing:border-box;}';
		css += '.ponyhoof_dialog .generic_dialog_modal, .ponyhoof_dialog .generic_dialog_fixed_overflow {background-color:rgba(0,0,0,.4) !important;}';
		css += '.ponyhoof_dialog .generic_dialog {z-index:250;}';
		css += '.ponyhoof_dialog .generic_dialog_popup {margin-top:80px;}';
		css += '.ponyhoof_dialog .popup {width:465px;margin:0 auto;cursor:default;box-shadow:0 2px 26px rgba(0, 0, 0, .3), 0 0 0 1px rgba(0, 0, 0, .1);}';
			css += cx+' .ponyhoof_dialog .popup {font-family:"Helvetica Neue", Helvetica, Arial, "lucida grande",tahoma,verdana,arial,sans-serif;}';
			//css += '._5p3y .ponyhoof_dialog .popup {font-family:Helvetica, Arial, "lucida grande",tahoma,verdana,arial,sans-serif;}';
		css += '.ponyhoof_dialog .wrap {background:#fff;color:#000;}';
			css += cx+' .ponyhoof_dialog .wrap {border-radius:3px;}';
		css += '.ponyhoof_dialog h3 {background-color:#6D84B4;border:1px solid #3B5998;border-bottom:0;color:#fff;font-size:14px !important;font-weight:bold !important;padding:5px 5px 5px 10px;cursor:help;min-height:17px;font-family:\'lucida grande\',tahoma,verdana,arial,sans-serif !important;line-height:1.28 !important;}';
			css += cx+' .ponyhoof_dialog h3 {background-color:#f5f6f7;border:0;border-bottom:1px solid #e5e5e5;color:#4e5665;line-height:19px !important;padding:10px 12px;text-shadow:0 1px 0 #fff;font-family:\'Helvetica Neue\', Helvetica, Arial, \'lucida grande\',tahoma,verdana,arial,sans-serif !important;}'; //border-radius:3px 3px 0 0;
		css += '.ponyhoof_dialog h3:before {background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAA90lEQVQYGQXBP0oWAADA0ff9NURBRAVDMBcHl9SpIbCamsOhcOsMObiEICJ2gJYQWhqkscmWTlFeoJbASacIfr4ngaZtAZAGJBLoRV+hDdKjdpJIoJl2oGPopEsSCdAA+tksLfWEREIakcb963ljGpJIoNe9a7eX1beGLbdOIoF01m231U2/um6RRELzpI9V1V2bkEja7qi55npfVf3pbRMSSQddN2ml31XV//YgkTTpWZM+d9xh9aMPfWq3QSKhcQ8a01p/O+hxC522n0gAWqWrnjag750nEqCHXTTbeWs07U3biQRosS9Ne9UIWm6YSABap3kAkntUReU7PxfnpgAAAABJRU5ErkJggg==");background-repeat: no-repeat;display:inline-block;float:right;content:" ";width:16px;height:16px;opacity:.713;}';
			css += cx+' .ponyhoof_dialog h3:before {display:none;}';
		css += '.ponyhoof_dialog .body {border:1px solid #555;border-top-width:0;}';
		css += '.ponyhoof_dialog h3.hidden_elem + .body {border-top-width:1px;}';
			css += cx+' .ponyhoof_dialog .body {border:0;}';
		css += '.ponyhoof_dialog .content {padding:10px;}';
		css += '.ponyhoof_dialog .bottom {background:#F2F2F2;border-top:1px solid #ccc;padding:8px 10px 8px 10px;text-align:right;}';
			//css += cx+' .ponyhoof_dialog .bottom {border-radius:0 0 3px 3px;}';
		css += '.ponyhoof_dialog .bottom .lfloat {line-height:17px;margin-top:4px;}';
		
		css += '.ponyhoof_dialog_header {background:#F2F2F2;border:solid #E2E2E2;border-width:1px 0;padding:4px 10px 5px;color:#333;margin:0 -10px 8px;display:block;font-weight:bold;}';
		css += '.ponyhoof_tabs {padding:4px 10px 0;background:#F2F2F2;border-bottom:1px solid #ccc;margin:-10px -10px 10px;}';
		css += '.ponyhoof_tabs a {margin:3px 10px 0 0;padding:5px 8px;float:left;}';
		css += '.ponyhoof_tabs a.active {color:#333;padding:4px 7px 5px;background:#fff;border:1px solid #ccc;border-bottom:1px solid #fff;margin-bottom:-1px;text-decoration:none;}';
		css += '.ponyhoof_tabs_section {display:none;}';
		
		if (ISMOBILE) {
			css += '.ponyhoof_dialog .generic_dialog {position:absolute;}';
		}
		
		injectManualStyle(css, 'dialog');
	};
	
	k.show = function() {
		removeClass(k.dialog, 'ponyhoof_fadeout');
		removeClass(k.generic_dialogDiv, 'ponyhoof_fadeout');

		k.visible = true;
		k.dialog.style.display = 'block';
		k.generic_dialogDiv.style.display = 'block';
		
		if (ISMOBILE) {
			k.canCardspace = false;
		}
		
		k.cardspaced = false;
		removeClass(k.generic_dialogDiv, 'generic_dialog_fixed_overflow');
		if (k.canCardspace) {
			w.addEventListener('resize', k.onBodyResize, false);
			k.cardSpaceTick();
		}

		if (k.canCloseByEscapeKey) {
			d.body.addEventListener('keydown', k.documentEscapeKey, false);
		}
	};
	
	k.close = function(callback) {
		k.onclose();

		if (!userSettings.disable_animation) {
			fadeOut(k.dialog, function() {
				if (callback) {
					callback();
				}
				k.onclosefinish();
			});
			if (callback) {
				log("Legacy dialog close code found [Dialog.close()]");
			}

			if (ISOPERA) {
				fadeOut(k.generic_dialogDiv);
			}
		} else {
			k.dialog.style.display = 'none';
			if (callback) {
				callback();
			}
			k.onclosefinish();
		}
		
		k._close();
	};

	k.hide = function() {
		k.onclose();

		k.dialog.style.display = 'none';

		k._close();
	};

	k._close = function() {
		k.visible = false;

		w.removeEventListener('resize', k.onBodyResize, false);
		w.clearTimeout(k.cardSpaceTimer);
		
		if (k.cardspaced) {
			removeClass(d.documentElement, 'generic_dialog_overflow_mode');
			if (!k.alwaysModal) {
				removeClass(k.generic_dialogDiv, 'generic_dialog_modal');
			}
		}
		//removeClass(k.generic_dialogDiv, 'generic_dialog_fixed_overflow');
		k.cardspaced = false;

		d.body.removeEventListener('keydown', k.documentEscapeKey, false);
	};
	
	k.changeTitle = function(c) {
		INTERNALUPDATE = true;
		var title = k.dialog.getElementsByTagName('h3');
		if (title.length) {
			title = title[0];
			title.innerHTML = c;
		}
		INTERNALUPDATE = false;
	};
	
	k.changeContent = function(c) {
		INTERNALUPDATE = true;
		var content = k.dialog.getElementsByClassName('content');
		if (content.length) {
			content = content[0];
			content.innerHTML = c;
		}
		INTERNALUPDATE = false;
	};
	
	k.changeBottom = function(c) {
		INTERNALUPDATE = true;
		var bottom = k.dialog.getElementsByClassName('bottom');
		if (bottom.length) {
			bottom = bottom[0];
			bottom.innerHTML = c;
		}
		INTERNALUPDATE = false;
	};
	
	k.addCloseButton = function(callback) {
		var text = "Close";
		if (CURRENTLANG && CURRENTLANG.close) {
			text = CURRENTLANG.close;
		}

		var close = '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button"><span class="uiButtonText">'+text+'</span></a>';
		k.changeBottom(close);
		
		k.dialog.querySelector('.bottom .uiButton').addEventListener('click', function(e) {
			k.close(function() {
				if (callback) {
					log("Legacy dialog close code found [Dialog.addCloseButton()]");
					callback();
				}
			});
			e.preventDefault();
		}, false);
	};
	
	k.onBodyResize = function() {
		if (k.canCardspace) {
			var dialogHeight = k.popup_dialogDiv.clientHeight + 80 + 40;
			var windowHeight = w.innerHeight;
			
			if (dialogHeight > windowHeight) {
				if (!k.cardspaced) {
					addClass(d.documentElement, 'generic_dialog_overflow_mode');
					if (!k.alwaysModal) {
						addClass(k.generic_dialogDiv, 'generic_dialog_modal');
					}
					addClass(k.generic_dialogDiv, 'generic_dialog_fixed_overflow');
					
					k.cardspaced = true;
				}
			} else {
				if (k.cardspaced) {
					removeClass(d.documentElement, 'generic_dialog_overflow_mode');
					if (!k.alwaysModal) {
						removeClass(k.generic_dialogDiv, 'generic_dialog_modal');
					}
					removeClass(k.generic_dialogDiv, 'generic_dialog_fixed_overflow');
					
					k.cardspaced = false;
				}
			}
		}
	};
	
	k.cardSpaceTick = function() {
		if (k.canCardspace && k.visible) {
			k.onBodyResize();
			k.cardSpaceTimer = w.setTimeout(k.cardSpaceTick, 500);
		} else {
			w.clearTimeout(k.cardSpaceTimer);
		}
	};

	k.documentEscapeKey = function(e) {
		if (k.canCloseByEscapeKey) {
			if (e.which == 27 && k.visible) { // esc
				k.close();
				e.stopPropagation();
				e.cancelBubble = true;
			}
		}
	};

	if (DIALOGS[k.id]) {
		log("Attempting to recreate dialog ID \""+k.id+"\"");
		return DIALOGS[k.id];
	}
	DIALOGS[k.id] = k;
};

function createSimpleDialog(id, title, message) {
	if (DIALOGS[id]) {
		DIALOGS[id].changeTitle(title);
		DIALOGS[id].changeContent(message);
		DIALOGS[id].show();
		return DIALOGS[id];
	}

	var di = new Dialog(id);
	di.create();
	di.changeTitle(title);
	di.changeContent(message);
	di.addCloseButton();
	
	return di;
}

function injectSystemStyle() {
	var css = '';
	css += '.ponyhoof_show_if_injected {display:none;}';
	css += '.ponyhoof_hide_if_injected {display:block;}';
	css += '.ponyhoof_hide_if_injected.inline {display:inline;}';
	css += 'html.ponyhoof_injected .ponyhoof_show_if_injected {display:block;}';
	css += 'html.ponyhoof_injected .ponyhoof_hide_if_injected {display:none;}';
	css += '.ponyhoof_show_if_loaded {display:none;}';
	css += '.ponyhoof_updater_latest, .ponyhoof_updater_newVersion, .ponyhoof_updater_error {display:none;}';
	
	css += '.ponyhoof_fadeout {opacity:0;-webkit-transition:opacity .25s linear;-moz-transition:opacity .25s linear;-o-transition:opacity .25s linear;transition:opacity .25s linear;}';
	css += '.ponyhoof_message {padding:10px;color:#000;font-weight:bold;overflow:hidden;}';
	
	css += '.ponyhoof_loading {background:url("//fbstatic-a.akamaihd.net/rsrc.php/v2/y4/x/GsNJNwuI-UM.gif") no-repeat;display:inline-block;width:16px;height:11px;margin:6px 0 0 6px;}';
	css += '.ponyhoof_loading.ponyhoof_show_if_injected {display:none;}';
	css += 'html.ponyhoof_injected .ponyhoof_loading_pony {display:inline-block;}';

	css += '.uiHelpLink {background:url("data:image/gif;base64,R0lGODlhDAALAJEAANvb26enp////wAAACH5BAEAAAIALAAAAAAMAAsAAAIblI8WkbcswAtAwWVzwoIbSWliBzWjR5abagoFADs=") no-repeat 0 center;display:inline-block;height:9px;width:12px;}';

	css += '.uiInputLabel + .uiInputLabel {margin-top:3px;}';
	css += '.uiInputLabelCheckbox {float:left;margin:0;padding:0;}';
	css += '.uiInputLabel label {color:#333;display:block;font-weight:normal;margin-left:17px;vertical-align:baseline;}';
	css += '.webkit.mac .uiInputLabel label {margin-left:16px;}';
	css += '.webkit.mac .uiInputLabelCheckbox {margin-top:2px;}';
	
	css += '.ponyhoof_page_readme {width:100%;height:300px;border:solid #B4BBCD;border-width:1px 0;-moz-box-sizing:border-box;box-sizing:border-box;}';
	css += '.ponyhoof_image_shadow {box-shadow:0 3px 8px rgba(0,0,0,.3);margin:0 auto;display:block;margin-bottom:3px;cursor:not-allowed;-webkit-user-drag:none;-moz-user-drag:none;user-drag:none;-webkit-user-select:none;-moz-user-select:-moz-none;user-select:none;}';
	css += '.ponyhoof_image_shadow.noshadow {box-shadow:none;}';
	
	injectManualStyle(css, 'system');
}

// http://www.html5rocks.com/en/tutorials/pagevisibility/intro/
var _hiddenPropCached = '';
var getHiddenProp = function() {
	if (_hiddenPropCached) {
		return _hiddenPropCached;
	}

	var prefixes = ['webkit', 'moz', 'ms'];

	if ('hidden' in document) {
		_hiddenPropCached = 'hidden';
		return _hiddenPropCached;
	}

	for (var i = 0, len = prefixes.length; i < len; i += 1) {
		if ((prefixes[i] + 'Hidden') in document) {
			_hiddenPropCached = prefixes[i] + 'Hidden';
			return _hiddenPropCached;
		}
	}

	return null;
};
var isPageHidden = function() {
	var prop = getHiddenProp();
	if (!prop) {
		return false;
	}

	return document[prop];
};

// http://stackoverflow.com/a/2745459
var isCanvasSupported = function() {
	return !!w.CanvasRenderingContext2D;
};

// http://stackoverflow.com/a/10930441
var isWebPSupported = function(callback) {
	var webp = new w.Image();
	try {
		webp.onload = webp.onerror = function() {
			callback(webp.height === 2);
		};
		webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	} catch (e) {
		callback(false);
	}
};

	/*
 * JavaScript MD5 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 * 
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
/* jshint ignore:start */
!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}a.md5=t}(w);
/* jshint ignore:end */
	
	var VERSION = 1.781;
	var FRIENDLYNAME = 'P'+'onyh'+'oof';
	var SIG = '['+FRIENDLYNAME+' v'+VERSION+']';
	var DISTRIBUTION = 'cws';

	var runMe = true;
	var STORAGEMETHOD = 'none';
	var INTERNALUPDATE = false;
	var USINGMUTATION = false;
	
	var CURRENTPONY = null;
	var REALPONY = CURRENTPONY;
	var BRONYNAME = '';
	var USERID = 0;
	var UILANG = 'en_US';
	var CURRENTLANG = {};
	var ISUSINGPAGE = false;
	var ISUSINGBUSINESS = false;
	var ONPLUGINPAGE = false;

	var SETTINGSPREFIX = '';
	var globalSettings = {};
	var GLOBALDEFAULTSETTINGS = {
		'allowLoginScreen':true
		,'runForNewUsers':true
		,'globalSettingsMigrated':false
		,'lastUserId':0
		,'lastVersion':''
	};
	
	var PONIES = [{"code":"trixie","name":"Trixie","users":["trixie"],"menu_title":"The Great and Powerful Trixie demands your attention!","color":["6e98b4","3a7196"],"icon16":"trixie\/favicon.png","soundNotif":"trixie\/notif","loadingText":"Performing magic..."},{"code":"twilight","name":"Twilight Sparkle","users":["twilight","spark","tw\u0131l\u0131ght","twilite","twi light","\u0162wilight"],"search":"twilight sparkle|twilightsparkle|princess twilight","menu_title":"To switch to Princess Twilight, go to Misc > Appearance","color":["9f6eb4","7a3a96"],"icon16":"twilight\/icon32.png","mane6":true,"loadingText":"Studying friendship..."},{"code":"dash","name":"Rainbow Dash","users":["rainbow","dash"],"search":"rainbow dash|rainbowdash|dashie","color":["6e9db4","3a7796"],"icon16":"dash\/favicon.png","soundNotif":"dash\/notif","mane6":true,"loadingText":"Loading... in ten seconds flat!","successText":"Aww yeah!"},{"code":"pinkie","name":"Pinkie Pie","users":["pink"],"search":"pinkie pie|pinkiepie|pinkamena diane pie","color":["b46e8a","963a5f"],"icon16":"pinkie\/favicon2.png","soundNotif":"pinkie\/notif2","mane6":true,"loadingText":"Come on everypony!"},{"code":"applej","name":"Applejack","users":["apple j","applej"],"search":"applejack|apple jack|aj","color":["b4976e","96703a"],"soundNotif":"applej\/notif2","icon16":"applej\/favicon2.png","mane6":true,"loadingText":"Hold on there sugarcube!","successText":"Yeehaw!"},{"code":"flutter","name":"Fluttershy","users":["flutter","flut ter"],"search":"fluttershy|flutter shy","color":["b4ae6e","968e3a"],"icon16":"flutter\/favicon2.png","soundNotif":"flutter\/notif2","mane6":true,"loadingText":"Screaming...","successText":"Yay!"},{"code":"rarity","name":"Rarity","users":["rarity"],"color":["9b6eb4","763a96"],"soundNotif":"rarity\/notif","icon16":"rarity\/favicon2.png","mane6":true,"loadingText":"Whining...","seperator":true},{"code":"aloe","name":"Aloe","users":["aloe"],"search":"aloe|spa pony|spa ponies","color":["b46e91","963a68"],"icon16":"aloe\/favicon2.png","loadingText":"Massaging..."},{"code":"applebloom","name":"Apple Bloom","users":["appleb","apple b"],"search":"apple bloom|applebloom|cmc|cutie mark crusaders","color":["b46e8d","963a63"],"icon16":"_common\/cmc_favicon.png","soundNotif":"applebloom\/notif","loadingText":"Getting her cutie mark...","nocutie":true},{"code":"babsseed","name":"Babs Seed","users":["babs","seed"],"search":"babs seed|babsseed|cmc|cutie mark crusaders","color":["b4976e","96703a"],"icon16":"_common\/cmc_favicon.png","nocutie":true},{"code":"berry","name":"Berry Punch","users":["berry"],"search":"berry punch|berrypunch","color":["a56eb4","823a96"],"icon16":"berry\/favicon2.png"},{"code":"bigmac","name":"Big Macintosh","users":["bigmac","big mac"],"search":"bigmacintosh|big macintosh|big mcintosh|bigmcintosh","color":["b46e75","963a43"],"icon16":"bigmac\/favicon2.png","soundNotif":"bigmac\/notif","loadingText":"Saying eeyup..."},{"code":"bonbon","name":"Bon Bon","users":["bon bon","bonbon","bon-bon"],"search":"bon bon|bonbon|sweetiedrops|sweetie drops","menu_title":"Also known as Sweetie Drops","color":["6e89b4","3a5d96"]},{"code":"braeburn","name":"Braeburn","users":["braeburn","breaburn"],"search":"braeburn|breaburn","color":["b4a86e","96873a"],"icon16":"braeburn\/favicon2.png"},{"code":"roidrage","name":"Bulk Biceps","users":["snowflake","roid","rage","Bulk Biceps"],"search":"snowflake|roidrage|roid rage|Bulk Biceps","menu_title":"Also known as Roid Rage and Snowflake","color":["b4ae6e","968e3a"],"soundNotif":"_sound\/roidrage_yeah","successText":"YEAH!"},{"code":"cadance","name":"Cadance","users":["cadance","cadence"],"search":"cadance|cadence|princess cadance|princess cadence","color":["b46e96","963a6e"],"icon16":"cadance\/favicon.png"},{"code":"carrot","name":"Carrot Top","users":["golden","carrot"],"search":"carrot top|carrottop|golden harvest","menu_title":"Also known as Golden Harvest","color":["b2b46e","93963a"]},{"code":"celestia","name":"Celestia","users":["celestia","trollestia","molestia"],"search":"celestia|princess celestia","color":["b46e98","963a71"],"icon16":"celestia\/favicon2.png","loadingText":"Raising the sun...","princess":true},{"code":"cheerilee","name":"Cheerilee","users":["cheerilee"],"color":["b46e96","963a6e"],"loadingText":"Teaching..."},{"code":"coco","name":"Coco Pommel","users":["coco","pommel"],"search":"coco pommel","color":["6eb4a9","3a9688"]},{"code":"colgate","name":"Colgate","users":["colgate","minuette"],"search":"colgate|minuette|minette","menu_title":"Also known as Minuette","color":["6e99b4","3a7396"],"icon16":"colgate\/favicon2.png","soundNotif":"colgate\/notif","loadingText":"Brushing..."},{"code":"cloudchaser","name":"Cloudchaser","users":["cloudch","cloud ch"],"search":"cloudchaser|cloud chaser|stormwalker|storm walker","menu_title":"Also known as Stormwalker","color":["856eb4","593a96"],"icon16":"cloudchaser\/favicon2.png"},{"code":"daring","name":"Daring Do","users":["daring"],"search":"daring do|daringdo","color":["b4a76e","96853a"]},{"code":"derpy","name":"Derpy Hooves","users":["derpy"],"search":"derpy hooves|ditzy doo","menu_title":"Also known as Ditzy Doo","color":["b4b46e","96963a"],"fbIndex_swf":"derpy\/fbIndex.swf","soundNotif":"derpy\/notif","icon16":"derpy\/icon16_2.png","loadingText":"Wondering what went wrong..."},{"code":"diamondtiara","name":"Diamond Tiara","users":["tiara"],"search":"diamond tiara|diamondtiara","color":["b36eb4","953a96"],"stack":"villian"},{"code":"discord","name":"Discord","users":["discord"],"color":["b46f6e","963c3a"],"stack":"villian","loadingText":"CHOCOLATE RAIN","nocutie":true},{"code":"whooves","name":"Doctor Whooves","users":["whooves","time turn"],"search":"doctor whooves|doctor hooves|time turner","menu_title":"Also known as Time Turner","color":["b4a06e","967c3a"],"icon16":"whooves\/favicon2.png","loadingText":"Time travelling..."},{"code":"flashsentry","name":"Flash Sentry","users":["flash","sentry"],"search":"flash sentry|brad","color":["b49d6e","96773a"]},{"code":"fleur","name":"Fleur De Lis","users":["fleur","fluer"],"search":"fleur de lis|fluer de lis|fleur dis lee|fluer dis lee","color":["b46eb4","963a96"]},{"code":"flimflam","name":"Flim and Flam","users":["flim","flam"],"color":["b0b46e","91963a"],"loadingText":"Giving opportunities..."},{"code":"flitter","name":"Flitter","users":["Flitter"],"color":["846eb4","573a96"],"icon16":"flitter\/favicon2.png"},{"code":"flutterbat","name":"Flutterbat","users":["flutterbat"],"color":["b4ad6e","968d3a"],"stack":"villian"},{"code":"gilda","name":"Gilda","users":["gilda"],"color":["b49a6e","96743a"],"icon16":"gilda\/favicon2.png","stack":"villian","nocutie":true},{"code":"ironwill","name":"Iron Will","users":["iron will","ironwill"],"search":"ironwill|iron will","color":["6e84b4","3a5796"],"stack":"villian","nocutie":true},{"code":"sombra","name":"King Sombra","users":["sombra"],"color":["6eb46e","3a963a"],"stack":"villian","loadingText":"Making slaves...","nocutie":true},{"code":"lightningdust","name":"Lightning Dust","users":["lightning"],"color":["6eb4ad","3a968d"],"icon16":"lightningdust\/favicon2.png"},{"code":"lotus","name":"Lotus","users":["lotus"],"search":"lotus|spa pony|spa ponies","color":["6ea0b4","3a7c96"],"icon16":"lotus\/favicon2.png","loadingText":"Massaging..."},{"code":"luna","name":"Luna","users":["luna"],"search":"luna|princess luna|nightmare moon|nightmaremoon","color":["6e7eb4","3a5096"],"icon16":"luna\/favicon2.png","soundNotif":"luna\/notif","loadingText":"Doubling the fun...","successText":"Huzzah!","princess":true},{"code":"lyra","name":"Lyra","users":["lyra"],"search":"lyra heartstrings","color":["6eb49d","3a9677"],"icon16":"lyra\/favicon2.png"},{"code":"nightmaremoon","name":"Nightmare Moon","users":["nightmare"],"search":"nightmare moon|nightmaremoon|luna|princess luna","color":["6e7fb4","3a5196"],"icon16":"nightmaremoon\/favicon.png","stack":"villian"},{"code":"nurseredheart","name":"Nurse Redheart","users":["nurse","redheart"],"color":["b46e78","963a48"],"icon16":"nurseredheart\/favicon2.png"},{"code":"octavia","name":"Octavia","users":["octavia"],"color":["b4a76e","96853a"],"icon16":"octavia\/favicon.png","loadingText":"Tuning..."},{"code":"pinkamena","name":"Pinkamena","users":["pinkamena"],"search":"pinkamena diane pie","color":["b46e8f","963a65"],"stack":"villian"},{"code":"photofinish","name":"Photo Finish","users":["photo","finish"],"search":"photo finish","color":["b46e9d","963a77"],"loadingText":"Making da magics!"},{"code":"chrysalis","name":"Queen Chrysalis","users":["chrysalis"],"search":"queen chrysalis|changeling","color":["7eb46e","50963a"],"icon16":"chrysalis\/favicon.png","stack":"chrysalis","loadingText":"Feeding...","nocutie":true},{"code":"rose","name":"Rose","users":["rose"],"search":"roseluck","menu_title":"Also known as Roseluck","color":["b46e8c","963a62"],"icon16":"rose\/favicon2.png"},{"code":"scootaloo","name":"Scootaloo","users":["scootaloo"],"search":"scootaloo|cmc|cutie mark crusaders|chicken","color":["b4996e","96733a"],"icon16":"_common\/cmc_favicon.png","loadingText":"Getting her cutie mark...","nocutie":true},{"code":"screwloose","name":"Screwloose","users":["screwloose","screwy"],"search":"screwloose|screw loose|screwy","menu_title":"Also known as Screwy","color":["b4996e","96733a"],"stack":"villian"},{"code":"shiningarmor","name":"Shining Armor","users":["shining armor"],"search":"shining armor|shiningarmor","color":["6e7bb4","3a4b96"],"icon16":"shiningarmor\/favicon2.png"},{"code":"silverspoon","name":"Silver Spoon","users":["spoon"],"search":"silver spoon|silverspoon","color":["6e97b4","3a7096"],"stack":"villian"},{"code":"soarin","name":"Soarin'","users":["soarin"],"search":"soarin'|wonderbolts","color":["6e9db4","3a7796"],"icon16":"soarin\/favicon.png"},{"code":"spike","name":"Spike","users":["spike"],"color":["a26eb4","7f3a96"],"nocutie":true},{"code":"spitfire","name":"Spitfire","users":["spitfire"],"search":"spitfire|wonderbolts","color":["b4b46e","96963a"],"icon16":"spitfire\/favicon2.png"},{"code":"sunsetshimmer","name":"Sunset Shimmer","users":["sunset","shimmer"],"search":"sunset shimmer","color":["b4a46e","96813a"],"stack":"villian"},{"code":"sweetieb","name":"Sweetie Belle","users":["sweetieb","sweetie b"],"search":"sweetiebelle|sweetie belle|cmc|cutie mark crusaders","color":["a06eb4","7c3a96"],"icon16":"_common\/cmc_favicon.png","soundNotif":"sweetieb\/notif","loadingText":"Getting her cutie mark...","nocutie":true},{"code":"thunderlane","name":"Thunderlane","users":["thunder"],"search":"thunderlane|thunder lane","color":["6eb4b4","3a9696"]},{"code":"vinyl","name":"Vinyl Scratch","users":["vinyl","vinyx","dj p"],"search":"vinyl scratch|dj pon3|dj-pon3|dj pon 3|dj pon-3","menu_title":"Also known as DJ Pon-3","color":["6ea9b4","3a8896"],"icon16":"vinyl\/favicon2.png","soundNotif":"vinyl\/notif","loadingText":"Wubbing..."},{"code":"zecora","name":"Zecora","users":["zecora"],"color":["b4af6e","96903a"]},{"code":"bloomberg","name":"Bloomberg","color":["9fb46e","7a963a"],"icon16":"bloomberg\/favicon.png","hidden":true,"nocutie":true},{"code":"mono","name":"Mono","color":["b46e6e","963a3a"],"stack":"mono","hidden":true},{"code":"taugeh","name":"Taugeh","color":["b4b46e","96963a"],"icon16":"twilight\/icon32.png","hidden":true,"nocutie":true}];
	var LANG = {"af_ZA":{"sniff_comment_tooltip_like":"Hou van hierdie opmerking","sniff_comment_tooltip_unlike":"Hou nie meer van hierdie opmerking nie"},"ar_AR":{"sniff_comment_tooltip_like":"\u0627\u0644\u0625\u0639\u062c\u0627\u0628 \u0628\u0627\u0644\u062a\u0639\u0644\u064a\u0642","sniff_comment_tooltip_unlike":"\u0625\u0644\u063a\u0627\u0621 \u0625\u0639\u062c\u0627\u0628\u064a \u0628\u0647\u0630\u0627 \u0627\u0644\u062a\u0639\u0644\u064a\u0642"},"az_AZ":{"sniff_comment_tooltip_like":"Bu r\u0259yi b\u0259y\u0259n","sniff_comment_tooltip_unlike":"Bu \u015f\u0259rhi b\u0259y\u0259nm\u0259"},"be_BY":{"sniff_comment_tooltip_like":"\u041f\u0430\u0434\u0430\u0431\u0430\u0435\u0446\u0446\u0430","sniff_comment_tooltip_unlike":"\u041c\u043d\u0435 \u0431\u043e\u043b\u044c\u0448 \u043d\u0435 \u043f\u0430\u0434\u0430\u0431\u0430\u0435\u0446\u0446\u0430 \u0433\u044d\u0442\u044b \u043a\u0430\u043c\u044d\u043d\u0442\u0430\u0440"},"bg_BG":{"sniff_comment_tooltip_like":"\u0425\u0430\u0440\u0435\u0441\u0432\u0430\u043c \u0442\u043e\u0437\u0438 \u043a\u043e\u043c\u0435\u043d\u0442\u0430\u0440","sniff_comment_tooltip_unlike":"\u0412\u0435\u0447\u0435 \u043d\u0435 \u0445\u0430\u0440\u0435\u0441\u0432\u0430\u043c"},"bn_IN":{"sniff_comment_tooltip_like":"\u09ae\u09a8\u09cd\u09a4\u09ac\u09cd\u09af\u099f\u09bf \u09ad\u09be\u09b2\u09cb \u09b2\u09c7\u0997\u09c7\u099b\u09c7","sniff_comment_tooltip_unlike":"\u09ad\u09be\u09b2\u09cb \u09b2\u09be\u0997\u09c7\u09a8\u09bf"},"bs_BA":{"sniff_comment_tooltip_like":"Svi\u0111a mi se ovaj komentar","sniff_comment_tooltip_unlike":"Ne svi\u0111a mi se komentar"},"ca_ES":{"sniff_comment_tooltip_like":"M'agrada aquest comentari","sniff_comment_tooltip_unlike":"Ja no m'agrada aquest comentari."},"cs_CZ":{"sniff_comment_tooltip_like":"Tento koment\u00e1\u0159 se mi l\u00edb\u00ed.","sniff_comment_tooltip_unlike":"Koment\u00e1\u0159 se mi u\u017e nel\u00edb\u00ed","close":"Zav\u0159\u00edt"},"cy_GB":{"sniff_comment_tooltip_like":"Hoffi'r sylw hwn","sniff_comment_tooltip_unlike":"Peidio hoffi'r sylw hwn"},"da_DK":{"fb_composer_lessons":"Hvilke lektioner i venskab har du l\u00e6rt idag?","sniff_comment_tooltip_like":"Tilkendegiv, at du synes godt om denne kommentar","sniff_comment_tooltip_unlike":"Synes ikke godt om denne kommentar l\u00e6ngere","close":"Luk"},"de_DE":{"fb_composer_lessons":"Welche Lektionen \u00fcber Freundschaft hast Du heute gelernt?","sniff_comment_tooltip_like":"Dieser Kommentar gef\u00e4llt mir","sniff_comment_tooltip_unlike":"Dieser Kommentar gef\u00e4llt mir nicht mehr","close":"Schlie\u00dfen"},"el_GR":{"sniff_comment_tooltip_like":"\u039c\u03bf\u03c5 \u03b1\u03c1\u03ad\u03c3\u03b5\u03b9 \u03b1\u03c5\u03c4\u03cc \u03c4\u03bf \u03c3\u03c7\u03cc\u03bb\u03b9\u03bf","sniff_comment_tooltip_unlike":"\"\u0394\u03b5\u03bd \u03bc\u03bf\u03c5 \u03b1\u03c1\u03ad\u03c3\u03b5\u03b9!\" \u03b1\u03c5\u03c4\u03cc \u03c4\u03bf \u03c3\u03c7\u03cc\u03bb\u03b9\u03bf"},"en_PI":{"sniff_comment_tooltip_like":"This comment be pleasin","sniff_comment_tooltip_unlike":"Care not fer such trifles"},"en_US":{"fb_composer_lessons":"What lessons in friendship have you learned today?","fb_comment_box":"Write a friendship letter...","fb_search_box":"Search for ponies, places and things","fb_composer_coolstory":"Write a cool story...","fb_composer_ponies":"Ponies!","fb_composer_ponies_caps":"PONIES!!!","fb_share_tooltip":"Remember! You gotta share... You gotta care...","stacks_pony_findFriendship":"Find Friendship","sniff_comment_tooltip_like":"Like this comment","sniff_comment_tooltip_unlike":"Unlike this comment","sniff_notification_stopgap_group_admin":"administrator of the group","sniff_notification_stopgap_notify_me":"posted a note: ","sniff_notification_stopgap_close_friend_activity":"posted a note: ","close":"Close","reloadNow":"Reload now","notNow":"Not now","invertSelection":"Invert selection","finish":"Finish","done":"Eeyup","reload":"Reload","browseWithEllipsis":"Browse...","chooseAFile":"Choose a file...","preview":"Preview","options_title":"Ponyhoof Options","options_tabs_main":"General","options_tabs_background":"Background","options_tabs_sounds":"Sounds","options_tabs_extras":"Misc","options_tabs_advanced":"Debug","options_tabs_about":"About","settings_costumes_auto":"(Auto)","settings_main_visitPage":"Visit\/$1 the Ponyhoof page for the latest news","settings_main_reportProblem":"Report a Ponyhoof problem","settings_main_browserPonies":"Run Browser Ponies","settings_main_browserPonies_explain":"Run Desktop Ponies on this page for MOAR ponies!!","settings_main_disable":"Disable Ponyhoof","settings_background_intro":"Use as background:","settings_sounds":"Play sounds (e.g. notifications and dialogs)","settings_sounds_noNotification":"Play sounds (e.g. dialogs)","settings_sounds_unavailable":"Notification sounds are not available on your browser. Please update your browser if possible.","settings_sounds_unavailableUsingPage":"Notification sounds are not available when you are using Facebook as your page.","settings_sounds_chat":"Chat","settings_sounds_soundsMessengerForWindowsWarning":"Please turn off Facebook Messenger for Windows for chat sounds to work properly.","settings_sounds_chatSound":"Change chat sound","settings_extras_pinkieproof":"Strengthen the fourth wall","settings_extras_pinkieproof_explain":"Prevents Pinkie Pie from breaking the fourth wall for non-villains","settings_extras_disable_emoticons":"Disable emoticon ponification","settings_extras_allowLoginScreen":"Run Ponyhoof on the Facebook login screen","settings_extras_runForNewUsers":"Run Ponyhoof for new users","settings_extras_runForNewUsers_explain":"If you disable this, Ponyhoof will not automatically run for other Facebook accounts that did not activate Ponyhoof yet. They can still open Ponyhoof Options to re-enable Ponyhoof if they wish to.","settings_extras_performance":"Performance","settings_extras_disable_animation":"Disable all animations","settings_extras_disableDomNodeInserted":"Disable HTML detection","settings_extras_disableDomNodeInserted_explain":"Disables Ponyhoof from ponifying certain stuff that is not possible to do with styling alone such as notifications and dialogs (Some features require this to be enabled)","settings_extras_resetSettings":"Reset settings","settings_extras_resetSettings_explain":"Reset your Ponyhoof settings and show the welcome screen","settings_extras_faq":"View the Ponyhoof FAQ","settings_extras_faq_explain":"View frequently asked questions, such as how to uninstall or update","settings_disable_runForNewUsers_explain":"If you enable this, Ponyhoof will not automatically run for other Facebook accounts that did not activate Ponyhoof yet. They can still open Ponyhoof Options to re-enable Ponyhoof if they wish to.","updater_title":"Update Ponyhoof","costume_tooltip":"Limited to certain characters only"},"eo_EO":{"sniff_comment_tooltip_like":"\u015cati \u0109i tiun komenton","sniff_comment_tooltip_unlike":"Ne plu \u015dati \u0109i tiun komenton"},"es_ES":{"sniff_comment_tooltip_like":"Me gusta este comentario","sniff_comment_tooltip_unlike":"Ya no me gusta este comentario","close":"Cerrar"},"es_LA":{"fb_composer_lessons":"\u00bfQue has aprendido hoy sobre la amistad?","fb_comment_box":"Escribe un reporte de amistad...","sniff_comment_tooltip_like":"Me gusta este comentario","sniff_comment_tooltip_unlike":"Ya no me gusta este comentario","close":"Cerrar"},"et_EE":{"sniff_comment_tooltip_like":"Meeldib see kommentaar","sniff_comment_tooltip_unlike":"Ei meeldi enam"},"eu_ES":{"sniff_comment_tooltip_like":"Iruzkin hau atsegin dut","sniff_comment_tooltip_unlike":"Iruzkin hau desatsegin"},"fa_IR":{"sniff_comment_tooltip_like":"\u0627\u06cc\u0646 \u062f\u06cc\u062f\u06af\u0627\u0647 \u0631\u0627 \u0645\u06cc\u200c\u067e\u0633\u0646\u062f\u0645","sniff_comment_tooltip_unlike":"\u0627\u06cc\u0646 \u062f\u06cc\u062f\u06af\u0627\u0647 \u0631\u0627 \u0646\u067e\u0633\u0646\u062f\u06cc\u062f\u0645"},"fb_LT":{"fb_composer_lessons":"W|-|@7 \u00a33550|\\|5 !|\\| |=|2!3|\\||)5|-|!|* |-|@\\\/3 j00 \u00a33@|2|\\|3|) 70|)@'\/?","fb_comment_box":"W|2!73 @ |=|2!3|\\||)5|-|!|* \u00a33773|2...","fb_search_box":"S3@|2(|-| |=0|2 |*0|\\|!35, |*\u00a3@(35 @|\\||) 7|-|!|\\|95","fb_composer_coolstory":"W|2!73 @ (00\u00a3 570|2'\/...","fb_composer_ponies":"P0|\\|!35!","fb_composer_ponies_caps":"PONIES!!!","fb_share_tooltip":"R3|\\\/|3|\\\/|83|2! Y0|_| 9077@ 5|-|@|23... Y0|_| 9077@ (@|23...","stacks_pony_findFriendship":"F!|\\||) F|2!3|\\||)5|-|!|*","close":"Alt+F4","reloadNow":"R3\u00a30@|) |\\|0vv","notNow":"N07 |\\|0vv","invertSelection":"I|\\|\\\/3|27 53\u00a33(7!0|\\|","finish":"F!|\\|!5|-|","done":"E3'\/|_||*","reload":"R3\u00a30@|)","browseWithEllipsis":"B|20vv53...","chooseAFile":"C|-|0053 @ |=!\u00a33...","preview":"P|23\\\/!3vv","options_title":"P0|\\|'\/|-|00|= O|*7!0|\\|5","options_tabs_main":"G3|\\|3|2@\u00a3","options_tabs_background":"B@(k9|20|_||\\||)","options_tabs_sounds":"S0|_||\\||)5","options_tabs_extras":"M!5(","options_tabs_advanced":"D38|_|9","options_tabs_about":"A80|_|7","settings_costumes_auto":"(A|_|70)","settings_main_visitPage":"V!5!7 0|2 $1 teh P0|\\|'\/|-|00|= |*@93 |=0|2 teh \u00a3@7357 |\\|3vv5","settings_main_reportProblem":"R3|*0|27 @ P0|\\|'\/|-|00|= |*|208\u00a33|\\\/|","settings_main_browserPonies":"R|_||\\| B|20vv53|2 P0|\\|!35","settings_main_browserPonies_explain":"R|_||\\| D35k70|* P0|\\|!35 0|\\| 7|-|!5 |*@93 |=0|2 MOAR |*0|\\|!35!!","settings_main_disable":"D!5@8\u00a33 P0|\\|'\/|-|00|=","settings_background_intro":"U53 @5 8@(k9|20|_||\\||):","settings_sounds":"P\u00a3@'\/ 50|_||\\||)5 (3.9. |\\|07!|=!(@7!0|\\|5 @|\\||) |)!@\u00a3095)","settings_sounds_noNotification":"P\u00a3@'\/ 50|_||\\||)5 (3.9. |)!@\u00a3095)","settings_sounds_unavailable":"N07!|=!(@7!0|\\| 50|_||\\||)5 @|23 |\\|07 @\\\/@!\u00a3@8\u00a33 0|\\| j00|2 8|20vv53|2. P\u00a33@53 |_||*|)@73 j00|2 8|20vv53|2 !|= |*055!8\u00a33.","settings_sounds_unavailableUsingPage":"N07!|=!(@7!0|\\| 50|_||\\||)5 @|23 |\\|07 @\\\/@!\u00a3@8\u00a33 vv|-|3|\\| j00 @|23 |_|5!|\\|9 F@(3800k @5 j00|2 |*@93.","settings_sounds_chat":"C|-|@7","settings_sounds_soundsMessengerForWindowsWarning":"P\u00a33@53 7|_||2|\\| 0|=|= F@(3800k M3553|\\|93|2 |=0|2 W!|\\||)0vv5 |=0|2 (|-|@7 50|_||\\||)5 70 vv0|2k |*|20|*3|2\u00a3'\/.","settings_sounds_chatSound":"C|-|@|\\|93 (|-|@7 50|_||\\||)","settings_extras_pinkieproof":"S7|23|\\|9teh|\\| teh |=0|_||27|-| vv@\u00a3\u00a3","settings_extras_pinkieproof_explain":"P|23\\\/3|\\|75 P!|\\|k!3 P!3 |=|20|\\\/| 8|23@k!|\\|9 teh |=0|_||27|-| vv@\u00a3\u00a3 |=0|2 |\\|0|\\|-\\\/!\u00a3\u00a3@!|\\|5","settings_extras_disable_emoticons":"D!5@8\u00a33 3|\\\/|07!(0|\\| |*0|\\|!|=!(@7!0|\\|","settings_extras_allowLoginScreen":"R|_||\\| P0|\\|'\/|-|00|= 0|\\| teh F@(3800k \u00a309!|\\| 5(|233|\\|","settings_extras_runForNewUsers":"R|_||\\| P0|\\|'\/|-|00|= |=0|2 |\\|3vv |_|53|25","settings_extras_runForNewUsers_explain":"I|= j00 |)!5@8\u00a33 7|-|!5, P0|\\|'\/|-|00|= vv!\u00a3\u00a3 |\\|07 @|_|70|\\\/|@7!(@\u00a3\u00a3'\/ |2|_||\\| |=0|2 0teh|2 F@(3800k @((0|_||\\|75 7|-|@7 |)!|) |\\|07 @(7!\\\/@73 P0|\\|'\/|-|00|= '\/37. T|-|3'\/ (@|\\| 57!\u00a3\u00a3 0|*3|\\| P0|\\|'\/|-|00|= O|*7!0|\\|5 70 |23-3|\\|@8\u00a33 P0|\\|'\/|-|00|= !|= teh'\/ vv!5|-| 70.","settings_extras_performance":"P3|2|=0|2|\\\/|@|\\|(3","settings_extras_disable_animation":"D!5@8\u00a33 @\u00a3\u00a3 @|\\|!|\\\/|@7!0|\\|5","settings_extras_disableDomNodeInserted":"D!5@8\u00a33 HTML |)373(7!0|\\|","settings_extras_disableDomNodeInserted_explain":"D!5@8\u00a335 P0|\\|'\/|-|00|= |=|20|\\\/| |*0|\\|!|='\/!|\\|9 (3|27@!|\\| 57|_||=|= 7|-|@7 !5 |\\|07 |*055!8\u00a33 70 |)0 vv!7|-| 57'\/\u00a3!|\\|9 @\u00a30|\\|3 5|_|(|-| @5 |\\|07!|=!(@7!0|\\|5 @|\\||) |)!@\u00a3095 (S0|\\\/|3 |=3@7|_||235 |23q|_|!|23 7|-|!5 70 83 3|\\|@8\u00a33|))","settings_extras_resetSettings":"R3537 5377!|\\|95","settings_extras_resetSettings_explain":"R3537 j00|2 P0|\\|'\/|-|00|= 5377!|\\|95 @|\\||) 5|-|0vv teh vv3\u00a3(0|\\\/|3 5(|233|\\|","settings_extras_faq":"V!3vv teh P0|\\|'\/|-|00|= FAQ","settings_extras_faq_explain":"V!3vv |=|23q|_|3|\\|7\u00a3'\/ @5k3|) q|_|357!0|\\|5, 5|_|(|-| @5 |-|0vv 70 |_||\\|!|\\|57@\u00a3\u00a3 0|2 |_||*|)@73","settings_disable_runForNewUsers_explain":"I|= j00 3|\\|@8\u00a33 7|-|!5, P0|\\|'\/|-|00|= vv!\u00a3\u00a3 |\\|07 @|_|70|\\\/|@7!(@\u00a3\u00a3'\/ |2|_||\\| |=0|2 0teh|2 F@(3800k @((0|_||\\|75 7|-|@7 |)!|) |\\|07 @(7!\\\/@73 P0|\\|'\/|-|00|= '\/37. T|-|3'\/ (@|\\| 57!\u00a3\u00a3 0|*3|\\| P0|\\|'\/|-|00|= O|*7!0|\\|5 70 |23-3|\\|@8\u00a33 P0|\\|'\/|-|00|= !|= teh'\/ vv!5|-| 70.","updater_title":"U|*|)@73 P0|\\|'\/|-|00|=","costume_tooltip":"L!|\\\/|!73|) 70 (3|27@!|\\| (|-|@|2@(73|25 0|\\|\u00a3'\/","sniff_comment_tooltip_like":"<3"},"fi_FI":{"fb_composer_lessons":"Mit\u00e4 oppeja yst\u00e4vyydest\u00e4 olet oppinut t\u00e4n\u00e4\u00e4n?","sniff_comment_tooltip_like":"Tykk\u00e4\u00e4 t\u00e4st\u00e4 kommentista","sniff_comment_tooltip_unlike":"En tykk\u00e4\u00e4k\u00e4\u00e4n","close":"Sulje"},"fo_FO":{"sniff_comment_tooltip_like":"M\u00e6r d\u00e1mar vi\u00f0merkingina"},"fr_CA":{"fb_composer_lessons":"Quelles le\u00e7ons sur l'amiti\u00e9 avez-vous appris aujourd'hui ?","fb_search_box":"Chercher pour des poneys, des lieux ou d\u2019autres choses","sniff_comment_tooltip_like":"J\u2019aime ce commentaire","sniff_comment_tooltip_unlike":"Je n\u2019aime plus ce commentaire","close":"Fermer"},"fr_FR":{"fb_composer_lessons":"Quelles le\u00e7ons sur l'amiti\u00e9 avez-vous appris aujourd'hui ?","fb_search_box":"Chercher pour des poneys, des lieux ou d\u2019autres choses","sniff_comment_tooltip_like":"J\u2019aime ce commentaire","sniff_comment_tooltip_unlike":"Je n\u2019aime plus ce commentaire","close":"Fermer"},"fy_NL":{"sniff_comment_tooltip_like":"Leuke reaksje","sniff_comment_tooltip_unlike":"Ik mei net mear oer dit berjocht"},"ga_IE":{"fb_composer_lessons":"cad ceachtanna i cairdeas ad'fhoghlaim t\u00fa inniu?","sniff_comment_tooltip_like":"L\u00e9irigh gur maith leat an tr\u00e1cht seo","sniff_comment_tooltip_unlike":"N\u00ed maith liom an tr\u00e1cht seo","close":"D\u00fan"},"gl_ES":{"sniff_comment_tooltip_like":"G\u00fastame este comentario","sniff_comment_tooltip_unlike":"Xa non me gusta"},"he_IL":{"fb_composer_lessons":"\u05d0\u05d9\u05dc\u05d5 \u05dc\u05e7\u05d7\u05d9\u05dd \u05d1\u05d9\u05d3\u05d9\u05d3\u05d5\u05ea \u05dc\u05de\u05d3\u05ea \u05d4\u05d9\u05d5\u05dd?","sniff_comment_tooltip_like":"\u05d0\u05d5\u05d4\u05d1 \u05d0\u05ea \u05d4\u05ea\u05d2\u05d5\u05d1\u05d4","sniff_comment_tooltip_unlike":"\u05dc\u05d0 \u05d0\u05d4\u05d1\/\u05d4 \u05d0\u05ea \u05ea\u05d2\u05d5\u05d1\u05d4 \u05d6\u05d5","close":"\u05e1\u05d2\u05d5\u05e8"},"hi_IN":{"sniff_comment_tooltip_like":"\u091f\u093f\u092a\u094d\u092a\u0923\u0940 \u092a\u0938\u0902\u0926 \u0915\u0930\u0947\u0902","sniff_comment_tooltip_unlike":"\u0907\u0938 \u091f\u093f\u092a\u094d\u092a\u0923\u0940 \u0915\u094b \u0928\u093e\u092a\u0938\u0902\u0926 \u0915\u0930\u0947\u0902"},"hr_HR":{"sniff_comment_tooltip_like":"Svi\u0111a mi se ovaj komentar","sniff_comment_tooltip_unlike":"Ne svi\u0111a mi se"},"hu_HU":{"fb_composer_lessons":"Mit tanult\u00e1l ma a bar\u00e1ts\u00e1gr\u00f3l?","sniff_comment_tooltip_like":"Tetszik a bejegyz\u00e9s.","sniff_comment_tooltip_unlike":"M\u00e9gsem tetszik","close":"Bez\u00e1r\u00e1s"},"hy_AM":{"sniff_comment_tooltip_like":"\u0540\u0561\u057e\u0561\u0576\u0565\u056c \u0561\u0575\u057d \u0574\u0565\u056f\u0576\u0561\u0562\u0561\u0576\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0568","sniff_comment_tooltip_unlike":"\u0549\u0570\u0561\u057e\u0561\u0576\u0565\u056c \u0561\u0575\u057d \u0574\u0565\u056f\u0576\u0561\u0562\u0561\u0576\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0568"},"id_ID":{"fb_composer_lessons":"Apa pelajaran yang kalian dapat tentang persahabatan hari ini?","sniff_comment_tooltip_like":"Suka komentar ini","sniff_comment_tooltip_unlike":"Tidak suka komentar ini","close":"Tutup"},"is_IS":{"sniff_comment_tooltip_like":"L\u00edkar vi\u00f0 \u00feessi umm\u00e6li","sniff_comment_tooltip_unlike":"L\u00edka ekki vi\u00f0 \u00feessi umm\u00e6li"},"it_IT":{"fb_composer_lessons":"Che cosa hai imparato oggi sull'amicizia?","sniff_comment_tooltip_like":"Di' che ti piace questo commento","sniff_comment_tooltip_unlike":"Di' che non ti piace pi\u00f9 questo commento","close":"Chiudi"},"ja_JP":{"fb_composer_lessons":"\u4eca\u65e5\u306f\u53cb\u60c5\u306b\u3069\u306e\u3088\u3046\u306a\u6559\u8a13\u3092\u5b66\u3073\u307e\u3057\u305f\u304b\uff1f","sniff_comment_tooltip_like":"\u3053\u306e\u30b3\u30e1\u30f3\u30c8\u306f\u3044\u3044\u306d\uff01","sniff_comment_tooltip_unlike":"\u3044\u3044\u306d\uff01\u3092\u53d6\u308a\u6d88\u3059","close":"\u9589\u3058\u308b"},"ka_GE":{"sniff_comment_tooltip_like":"\u10db\u10dd\u10d8\u10ec\u10dd\u10dc\u10d4 \u10d4\u10e1 \u10d9\u10dd\u10db\u10d4\u10dc\u10e2\u10d0\u10e0\u10d8","sniff_comment_tooltip_unlike":"\u10d0\u10e6\u10d0\u10e0 \u10db\u10dd\u10db\u10ec\u10dd\u10dc\u10e1 \u10d4\u10e1 \u10d9\u10dd\u10db\u10d4\u10dc\u10e2\u10d0\u10e0\u10d8"},"km_KH":{"sniff_comment_tooltip_like":"\u1785\u17bc\u179b\u1785\u17b7\u178f\u17d2\u178f \u179c\u17b7\u1785\u17b6\u179a \u1793\u17c1\u17c7","sniff_comment_tooltip_unlike":"\u179b\u17c2\u1784\u1785\u17bc\u179b\u1785\u17b7\u178f\u17d2\u178f\u1798\u178f\u17b7\u1793\u17c1\u17c7"},"ko_KR":{"fb_composer_lessons":"\uc6b0\uc815\uc5d0 \uad00\ud574\uc11c \uc624\ub298 \ubb34\uc5c7\uc744 \ubc30\uc6e0\ub098\uc694?","sniff_comment_tooltip_like":"\uc88b\uc544\uc694","sniff_comment_tooltip_unlike":"\uc88b\uc544\uc694 \ucde8\uc18c","close":"\ub2eb\uae30"},"ku_TR":{"sniff_comment_tooltip_like":"V\u00ea \u015f\u00eerovey\u00ea biecib\u00eene","sniff_comment_tooltip_unlike":"V\u00ea \u015firovey\u00ea neecib\u00eene"},"la_VA":[],"lt_LT":{"fb_composer_lessons":"Kokias \u017einias apie draugyst\u0119 i\u0161mokote \u0161iandien?","sniff_comment_tooltip_like":"Patinka \u0161is komentaras","sniff_comment_tooltip_unlike":"Nepatinka \u0161is komentaras","close":"U\u017edaryti"},"lv_LV":{"sniff_comment_tooltip_unlike":"Koment\u0101rs vairs nepat\u012bk"},"mk_MK":{"fb_composer_lessons":"\u041a\u043e\u0438 \u043b\u0435\u043a\u0446\u0438\u0438 \u0437\u0430 \u043f\u0440\u0438\u0458\u0430\u0442\u0435\u043b\u0441\u0442\u0432\u043e\u0442\u043e \u0434\u043e\u0437\u043d\u0430\u0432\u0442\u0435 \u0434\u0435\u043d\u0435\u0441?","sniff_comment_tooltip_like":"\u041c\u0438 \u0441\u0435 \u0434\u043e\u043f\u0430\u0453\u0430 \u043a\u043e\u043c\u0435\u043d\u0442\u0430\u0440\u043e\u0432","sniff_comment_tooltip_unlike":"\u041d\u0435 \u043c\u0438 \u0441\u0435 \u0434\u043e\u043f\u0430\u0453\u0430","close":"\u0417\u0430\u0442\u0432\u043e\u0440\u0438"},"ml_IN":{"sniff_comment_tooltip_like":"\u0d08 \u0d05\u0d2d\u0d3f\u0d2a\u0d4d\u0d30\u0d3e\u0d2f\u0d02 \u0d07\u0d37\u0d4d\u0d1f\u0d2e\u0d3e\u0d2f\u0d3f"},"ms_MY":{"fb_composer_lessons":"Apakah pelajaran tentang persahabatan yang telah anda pelajari hari ini?","fb_comment_box":"Tuliskan surat persahabatan...","fb_composer_ponies":"Kuda!","fb_composer_ponies_caps":"KUDA!!!","sniff_comment_tooltip_like":"Suka komen ini","sniff_comment_tooltip_unlike":"Tidak suka komen ini","close":"Tutup","options_title":"Opsyen Ponyhoof"},"nb_NO":{"sniff_comment_tooltip_like":"Lik denne kommentaren"},"ne_NP":[],"nl_NL":{"fb_composer_lessons":"Wat heb je vandaag geleerd over vriendschap?","sniff_comment_tooltip_like":"Leuke reactie","sniff_comment_tooltip_unlike":"Reactie niet meer leuk","close":"Sluiten"},"pa_IN":{"sniff_comment_tooltip_like":"\u0a07\u0a39 \u0a1f\u0a3f\u0a71\u0a2a\u0a23\u0a40 \u0a2a\u0a38\u0a70\u0a26 \u0a15\u0a30\u0a4b","sniff_comment_tooltip_unlike":"\u0a07\u0a39 \u0a1f\u0a3f\u0a71\u0a2a\u0a23\u0a40 \u0a28\u0a3e\u0a2a\u0a38\u0a70\u0a26 \u0a15\u0a30\u0a4b|"},"pl_PL":{"fb_composer_lessons":"Czego si\u0119 dzisiaj nauczy\u0142e\u015b o przyja\u017ani?","sniff_comment_tooltip_like":"Polub komentarz","sniff_comment_tooltip_unlike":"Nie lubi\u0119 tego komentarza","close":"Zamknij"},"ps_AF":[],"pt_BR":{"fb_composer_lessons":"Quais li\u00e7\u00f5es sobre amizade voc\u00ea aprendeu hoje?","sniff_comment_tooltip_like":"Curtir este coment\u00e1rio","sniff_comment_tooltip_unlike":"Curtir (desfazer) este coment\u00e1rio","close":"Fechar"},"pt_PT":{"fb_composer_lessons":"Que li\u00e7\u00f5es de amizade voc\u00ea aprendeu hoje?","sniff_comment_tooltip_like":"Gosto deste coment\u00e1rio","sniff_comment_tooltip_unlike":"N\u00e3o gosto deste coment\u00e1rio","close":"Fechar"},"ro_RO":{"fb_composer_lessons":"Ce lec\u0163ii despre prietenie ai \u00eenv\u0103\u0163at ast\u0103zi?","sniff_comment_tooltip_like":"\u00cemi place acest comentariu","sniff_comment_tooltip_unlike":"Nu-mi mai place acest comentariu","close":"\u00cenchide"},"ru_RU":{"fb_composer_lessons":"\u041a\u0430\u043a\u0438\u0435 \u0443\u0440\u043e\u043a\u0438 \u0434\u0440\u0443\u0436\u0431\u044b \u0432\u044b \u0432\u044b\u0443\u0447\u0438\u043b\u0438 \u0441\u0435\u0433\u043e\u0434\u043d\u044f?","sniff_comment_tooltip_like":"\u041c\u043d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439","sniff_comment_tooltip_unlike":"\u041d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f","close":"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"},"sk_SK":{"fb_composer_lessons":"Ak\u00e9 lekcie priate\u013estva si sa nau\u010dil dnes?","sniff_comment_tooltip_like":"P\u00e1\u010di sa mi tento koment\u00e1r","sniff_comment_tooltip_unlike":"Tento koment\u00e1r sa mi u\u017e nep\u00e1\u010di","close":"Zavrie\u0165"},"sl_SI":{"fb_composer_lessons":"Kaj si se o prijateljstvu nau\u010dil\/-a danes?","sniff_comment_tooltip_like":"V\u0161e\u010d mi je","sniff_comment_tooltip_unlike":"Ta komentar mi ni v\u0161e\u010d","close":"Zapri"},"sq_AL":{"sniff_comment_tooltip_like":"P\u00eblqeje k\u00ebt\u00eb koment","sniff_comment_tooltip_unlike":"Mos p\u00eblqe k\u00ebt\u00eb koment"},"sr_RS":{"sniff_comment_tooltip_like":"\u0421\u0432\u0438\u0452\u0430 \u043c\u0438 \u0441\u0435 \u043a\u043e\u043c\u0435\u043d\u0442\u0430\u0440.","sniff_comment_tooltip_unlike":"\u041d\u0435 \u0441\u0432\u0438\u0452\u0430 \u043c\u0438 \u0441\u0435 \u043e\u0432\u0430\u0458 \u043a\u043e\u043c\u0435\u043d\u0442\u0430\u0440","close":"\u0417\u0430\u0442\u0432\u043e\u0440\u0438"},"sv_SE":{"fb_composer_lessons":"Vilka l\u00e4rdomar i v\u00e4nskap har du l\u00e4rt dig idag?","sniff_comment_tooltip_like":"Gilla den h\u00e4r kommentaren","sniff_comment_tooltip_unlike":"Sluta gilla den h\u00e4r kommentaren","close":"St\u00e4ng"},"sw_KE":[],"ta_IN":{"sniff_comment_tooltip_like":"\u0b87\u0b95\u0bcd\u0b95\u0bb0\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0ba9\u0bc8 \u0bb5\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bc1\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd","sniff_comment_tooltip_unlike":"\u0b87\u0b95\u0bcd\u0b95\u0bb0\u0bc1\u0ba4\u0bcd\u0ba4\u0bbf\u0ba9\u0bc8 \u0bb5\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8","close":"\u0e1b\u0e34\u0e14"},"te_IN":{"sniff_comment_tooltip_unlike":"\u0c35\u0c4d\u0c2f\u0c3e\u0c16\u0c4d\u0c2f \u0c28\u0c1a\u0c4d\u0c1a\u0c32\u0c47\u0c26\u0c41"},"th_TH":{"sniff_comment_tooltip_like":"\u0e16\u0e39\u0e01\u0e43\u0e08\u0e04\u0e27\u0e32\u0e21\u0e04\u0e34\u0e14\u0e40\u0e2b\u0e47\u0e19\u0e19\u0e35\u0e49","sniff_comment_tooltip_unlike":"\u0e40\u0e25\u0e34\u0e01\u0e16\u0e39\u0e01\u0e43\u0e08\u0e04\u0e27\u0e32\u0e21\u0e04\u0e34\u0e14\u0e40\u0e2b\u0e47\u0e19\u0e19\u0e35\u0e49"},"tl_PH":{"fb_composer_lessons":"Anong mga aralin sa pagkakaibigan ang natutunan mo ngayon?","sniff_comment_tooltip_like":"Gustuhin ang komentong ito","sniff_comment_tooltip_unlike":"Ayawan ang komentong ito","close":"Isara"},"tr_TR":{"fb_composer_lessons":"Bug\u00fcn arkada\u015fl\u0131kla ilgili neler \u00f6\u011frendin?","sniff_comment_tooltip_like":"Bu yorumu be\u011fen","sniff_comment_tooltip_unlike":"Bu yorumu be\u011fenmekten vazge\u00e7","close":"Kapat"},"uk_UA":{"fb_composer_lessons":"\u042f\u043a\u0456 \u0443\u0440\u043e\u043a\u0438 \u0432 \u0434\u0440\u0443\u0436\u0431\u0456 \u0432\u0438 \u0434\u0456\u0437\u043d\u0430\u043b\u0438\u0441\u044f \u0441\u044c\u043e\u0433\u043e\u0434\u043d\u0456?","sniff_comment_tooltip_like":"\u0412\u043f\u043e\u0434\u043e\u0431\u0430\u0442\u0438 \u043a\u043e\u043c\u0435\u043d\u0442\u0430\u0440","sniff_comment_tooltip_unlike":"\u041d\u0435 \u043f\u043e\u0434\u043e\u0431\u0430\u0454\u0442\u044c\u0441\u044f \u043a\u043e\u043c\u0435\u043d\u0442\u0430\u0440","close":"\u0417\u0430\u043a\u0440\u0438\u0442\u0438"},"vi_VN":{"sniff_comment_tooltip_like":"Th\u00edch b\u00ecnh lu\u1eadn n\u00e0y","sniff_comment_tooltip_unlike":"B\u1ecf th\u00edch b\u00ecnh lu\u1eadn n\u00e0y n\u1eefa"},"zh_CN":{"sniff_comment_tooltip_like":"\u559c\u6b22\u6b64\u8bc4\u8bba","sniff_comment_tooltip_unlike":"\u4e0d\u559c\u6b22\u6b64\u8bc4\u8bba","close":"\u5173\u95ed"},"zh_HK":{"sniff_comment_tooltip_like":"\u5c0d\u9019\u5247\u7559\u8a00\u8b9a\u597d","sniff_comment_tooltip_unlike":"\u53d6\u6d88\u8b9a\u597d"},"zh_TW":{"fb_composer_lessons":"\u4f60\u4eca\u5929\u5f9e\u53cb\u60c5\u88e1\u9762\u5b78\u5230\u4e86\u4ec0\u9ebc\uff1f","fb_search_box":"\u641c\u5c0b\u5c0f\u99ac\u3001\u5730\u9ede\u548c\u4e8b\u7269","fb_composer_ponies":"\u5c0f\u99ac\uff01","fb_composer_ponies_caps":"\u5c0f\u99ac\uff01","stacks_pony_findFriendship":"\u5c0b\u627e\u53cb\u60c5","sniff_comment_tooltip_like":"\u8aaa\u9019\u5247\u7559\u8a00\u8b9a","sniff_comment_tooltip_unlike":"\u6536\u56de\u8b9a","close":"\u95dc\u9589"}};
	var SOUNDS = {"AUTO":{"name":"(Auto-select)","seperator":true},"_sound\/defaultNotification":{"name":"Casting magic","title":"This will also be used for characters that do not have their own notification sound"},"trixie\/notif":{"name":"Trixie - Watch in awe!"},"dash\/notif":{"name":"Rainbow Dash - Aww yeah!"},"pinkie\/notif2":{"name":"Pinkie Pie - *rimshot*"},"applej\/notif":{"name":"Applejack - Yeehaw!"},"flutter\/notif2":{"name":"Fluttershy - Yay!"},"rarity\/notif":{"name":"Rarity - This is whining!"},"applebloom\/notif":{"name":"Apple Bloom - That'll be four bits"},"bigmac\/notif":{"name":"Big Macintosh - Eeyup"},"_sound\/roidrage_yeah":{"name":"Bulk Biceps - YEAH!"},"colgate\/notif":{"name":"Colgate - Why you don't brush your teeth"},"derpy\/notif":{"name":"Derpy Hooves - I brought you a letter!"},"luna\/notif":{"name":"Luna - Huzzah!"},"sweetieb\/notif":{"name":"Sweetie Belle - Oh come on!"},"vinyl\/notif":{"name":"Vinyl Scratch - Yeah!","seperator":true},"twilight\/notif":{"name":"Twilight Sparkle - It's not over yet!"},"_sound\/grin2":{"name":"Fluttershy - *squee*"},"_sound\/dash_dundundun":{"name":"Rainbow Dash - DUN DUN DUN"},"_sound\/dash_egghead":{"name":"Rainbow Dash - I'm an egghead"},"_sound\/pinkie_boring":{"name":"Pinkie Pie - Booooring!"},"_sound\/pinkie_gasp":{"name":"Pinkie Pie - *gasp*"},"_sound\/pinkie_partycannon":{"name":"Pinkie Pie - Party cannon"},"_sound\/pinkie_pinkiepiestyle":{"name":"Pinkie Pie - Pinkie Pie style!"},"_sound\/flutter_woohoo":{"name":"Fluttershy - Woo hoo"},"_sound\/rarity_dumbrock":{"name":"Rarity - Dumb rock!"},"_sound\/rarity_itison":{"name":"Rarity - Oh. It. Is. On!"},"_sound\/rarity_wahaha":{"name":"Rarity - Wahaha!"},"_sound\/discord_ohforgoodnesssake":{"name":"Discord - Oh for goodness sake!"},"_sound\/discord_ughgag":{"name":"Discord - Ugh... gag!"},"_sound\/nightmaremoon_kidding":{"name":"Nightmare Moon - You're kidding, right?"},"_sound\/octavia_nevermess":{"name":"Octavia - Never mess with Octavia"},"_sound\/vinyl_awyeah":{"name":"Vinyl Scratch - Aw yeah!"},"_sound\/vinyl_mybasscannon":{"name":"Vinyl Scratch - My bass cannon!"},"_sound\/vinyl_wubwubwub":{"name":"Vinyl Scratch - Wubwubwub"},"_sound\/vinyl_wubedubdub":{"name":"Vinyl Scratch - Wubedubdub"},"_sound\/vinyl_yougotwubs":{"name":"Vinyl Scratch - You got wubs"}};
	var SOUNDS_CHAT = {"_sound\/grin2":{"name":"Fluttershy - *squee*"},"_sound\/chat_boing":{"name":"Boing"}};
	var HTMLCLASS_SETTINGS = ['login_bg', 'disable_animation', 'pinkieproof', 'disable_emoticons'];
	var DEFAULTSETTINGS = {
		'theme':CURRENTPONY,
		'login_bg':false, 'customBg':null, //'allowLoginScreen':true,
		'sounds':false, 'soundsFile':'AUTO', 'soundsNotifTypeBlacklist':'', 'soundsVolume':1,
		'chatSound': true,
		'chatSoundFile': '_sound/grin2',
		'chatSoundVolume': 1,
		//'show_messages_other':true,
		'pinkieproof':false,  'forceEnglish':false, 'disable_emoticons':false, 'randomPonies':'', 'costume': '', //'commentBrohoofed':true,
		'disable_animation':false, 'disableDomNodeInserted':false, //'disableCommentBrohoofed':false,
		'customcss':'', 'debug_dominserted_console':false, 'debug_slow_load':false, 'debug_disablelog':false, 'debug_noMutationObserver':false, 'debug_mutationDebug':false, 'debug_exposed':false, 'debug_betaFacebookLinks':false, //,'debug_mutationObserver':false,
		//'lastVersion':''

		'customBgDpr': 1,
		'customBgWidth': null,
		'customBgHeight': null
		//'survivedTheNight', 'chatSound1401', 'randomSettingMigrated'
	};
	var STACKS_LANG = [{"stack":"pony","people":"ponies","person":"pony","friend":"pal","friends":"pals","friend_logic":"pal","friends_logic":"pals","like":"brohoof","likes":"brohoofs","unlike":"unbrohoof","like_past":"brohoof","likes_past":"brohoofs","liked":"brohoof'd","liked_button":"brohoof'd","liking":"brohoofing","findFriendship":"Find Friendship"},{"stack":"chrysalis","people":"changelings","person":"changeling","friend":"prey","friends":"prey","friend_logic":"changeling","friends_logic":"changelings","like":"feed","likes":"feeds","unlike":"unfeed","like_past":"fed on","likes_past":"fed on","liked":"fed on","liked_button":"fed","liking":"feeding","findFriendship":"Find Prey"},{"stack":"villian","people":"ponies","person":"pony","friend":"pal","friends":"pals","friend_logic":"pal","friends_logic":"pals","like":"brohoof","likes":"brohoofs","unlike":"unbrohoof","like_past":"brohoof","likes_past":"brohoofs","liked":"brohoof'd","liked_button":"brohoof'd","liking":"brohoofing","findFriendship":"Find Friendship"}];
	var CURRENTSTACK = STACKS_LANG[0];
	var COSTUMESX = {"winterwrapup":{"name":"Winter Wrap Up","characters":["twilight","dash","pinkie","applej","flutter","rarity","derpy"]},"gala":{"name":"Grand Galloping Gala","characters":["twilight","dash","pinkie","rarity"]},"nightmarenight":{"name":"Nightmare Night","characters":["twilight","dash","pinkie","applej","flutter","applebloom","bigmac","derpy","luna","scootaloo","spike","sweetieb","zecora"]},"hearthwarming":{"name":"Hearth's Warming","characters":["twilight","dash","pinkie","applej","flutter","rarity","cadance","luna","shiningarmor"]},"wedding":{"name":"Canterlot Wedding","characters":["twilight","dash","pinkie","applej","flutter","rarity","cadance","applebloom","colgate","lyra","scootaloo","spike","sweetieb"]},"season3premiere":{"name":"Season 3 Premiere","characters":["twilight","rarity"]},"crystal":{"name":"Crystal Pony","characters":["twilight","dash","pinkie","applej","flutter","rarity","cadance"]},"coronation":{"name":"Princess Coronation Dresses","characters":["dash","pinkie","applej","flutter","rarity","cadance","celestia","luna"]},"princess":{"name":"Princess Twilight Sparkle","characters":["twilight"]},"power":{"name":"Power Ponies","characters":["twilight","dash","pinkie","applej","flutter","rarity","spike"]},"rapper":{"name":"Rapper Pinkie","characters":["pinkie"]}};
	var SOUNDS_NOTIFTYPE = {
		poke: {name:"Nuzzles", type:"poke"}
		,like: {name:"Brohoofs", type:"like"}
		,group_activity: {name:"New posts in herds and mentions of you", type:"group_activity"}
		,group_comment_reply: {name:"New comments to posts in herds", type:"group_comment_reply|group_comment"}
		,group_r2j: {name:"Herd join requests", type:"group_r2j"}
		,group_added_to_group: {name:"Herd invites from friends", type:"group_added_to_group"}
		,plan_mall_activity: {name:"New posts in adventures and mentions of you", type:"plan_mall_activity"}
		,event_mall_comment: {name:"New comments to posts in adventures", type:"event_mall_comment|event_mall_reply"}
		,plan_user_join: {name:"Someone is also going to an adventure", type:"plan_user_join"}
		,plan_reminder: {name:"Adventure reminders", type:"plan_reminder"}
		,follow_profile: {name:"New followers", type:"follow_profile"}
		//,photo_made_profile_pic: {name:"Made your pony pic his/her profile picture", type:"photo_made_profile_pic"}
		,answers_answered: {name:"New answers on the Facebook Help Center", type:"answers_answered"}
		,open_graph_comment: {name:"Replies to your comments made on other websites", type:"open_graph_comment"}

		,app_invite: {name:"Game/app requests", type:"app_invite"}
		,close_friend_activity: {name:"Posts from Close Friends", type:"close_friend_activity"}
		,notify_me: {name:"Page posts that you subscribed to", type:"notify_me"}
		,pages_helped_thanks: {name:"Accepted page suggestions", type:"pages_helped_thanks"}

		//,fbpage_presence: {name:"Facebook nagging you to post to your page", type:"fbpage_presence"}
		,fbpage_fan_invite: {name:"Page invites from friends", type:"fbpage_fan_invite"}
		,page_new_likes: {name:"New page brohoofs", type:"page_new_likes"}
		//,fbpage_new_message: {name:"New private messages on your page", type:"fbpage_new_message"}
	};
	
	var THEMEURL = w.location.protocol + '//hoof.little.my/files/';
	var THEMECSS = THEMEURL+'';
	var THEMECSS_EXT = '.css?userscript_version='+VERSION;
	var UPDATEURL = w.location.protocol + '//hoof.little.my/files/update_check.js?' + (+new Date());

	
	var PONYHOOF_PAGE = '197956210325433';
	var PONYHOOF_URL = '//'+getFbDomain()+'/Ponyhoof';
	var PONYHOOF_README = '//hoof.little.my/files/_welcome/readme.htm?version='+VERSION+'&distribution='+DISTRIBUTION;
	
	var _ext_messageId = 0;
	var _ext_messageCallback = {};

	// Chrome
		var chrome_sendMessage = function(message, callback) {
			try {
				if (chrome.extension.sendMessage) {
					chrome.extension.sendMessage(message, callback);
				} else {
					chrome.extension.sendRequest(message, callback);
				}
			} catch (e) {
				if (e.toString().indexOf('Error: Error connecting to extension ') === 0) {
					extUpdatedError(e.toString());
				}
				throw e;
			}
		};

		var chrome_storageFallback = false;
		var chrome_getValue = function(name, callback) {
			if (chrome.storage && !chrome_storageFallback) {
				if (chrome_isExtUpdated()) {
					extUpdatedError("[chrome_getValue("+name+")]");
					callback(null);
					return;
				}

				chrome.storage.local.get(name, function(item) {
					if (chrome.runtime && chrome.runtime.lastError) {
						// Fallback to old storage method
						chrome_storageFallback = true;
						chrome_getValue(name, callback);
						return;
					}

					if (Object.keys(item).length === 0) {
						callback(null);
						return;
					}
					callback(item[name]);
				});
				return;
			}

			try {
				chrome_sendMessage({'command': 'getValue', 'name': name}, function(response) {
					if (response && typeof response.val !== 'undefined') {
						callback(response.val);
					} else {
						callback(null);
					}
				});
			} catch (e) {
				error(e.message);
				log(e.stack);
				getValueError(e);
				callback(null);
			}
		};
		
		var chrome_setValue = function(name, val) {
			if (chrome.storage && !chrome_storageFallback) {
				if (chrome_isExtUpdated()) {
					extUpdatedError("[chrome_setValue("+name+")]");
					return;
				}

				var toSet = {};
				toSet[name] = val;
				chrome.storage.local.set(toSet, function() {
					if (chrome.runtime && chrome.runtime.lastError) {
						saveValueError(chrome.runtime.lastError);
						return;
					}
				});
				return;
			}

			chrome_sendMessage({'command': 'setValue', 'name': name, 'val': val}, $noop);
		};
		
		var chrome_clearStorage = function() {
			if (chrome.storage) {
				chrome.storage.local.clear();
			}
			chrome_sendMessage({'command': 'clearStorage'}, $noop);
		};
		
		var chrome_ajax = function(details) {
			chrome_sendMessage({'command': 'ajax', 'details': details}, function(response) {
				if (response && response.val === 'success') {
					if (details.onload) {
						details.onload(response.request);
					}
				} else {
					if (details.onerror) {
						details.onerror(response.request);
					}
				}
			});
		};

		var chrome_isExtUpdated = function() {
			return (typeof chrome.i18n === 'undefined' || typeof chrome.i18n.getMessage('@@extension_id') === 'undefined');
		};
	
	if (typeof opera !== 'undefined' && typeof opera.extension !== 'undefined') {
		opera.extension.onmessage = function(message) {
			if (message.data) {
				var response = message.data;
				var callback = _ext_messageCallback[response.messageid];
				if (callback) {
					callback(response.val);
				}
			}
		};

		var opera_sendMessage = function(message, callback) {
			_ext_messageCallback[_ext_messageId] = callback;
			message.messageid = _ext_messageId;

			// Opera fails silently with no exceptions when message port is disconnected
			// Perhaps init `opera.extension.ondisconnect` ?
			opera.extension.postMessage(message);
			_ext_messageId += 1;
		};

		var opera_getValue = function(name, callback) {
			opera_sendMessage({'command': 'getValue', 'name': name}, callback);
		};
		
		var opera_setValue = function(name, val) {
			opera_sendMessage({'command': 'setValue', 'name': name, 'val': val});
		};
		
		var opera_clearStorage = function() {
			opera_sendMessage({'command': 'clearStorage'});
		};

		var opera_ajax = function(details) {
			var detailsX = {
				'method': details.method
				,'url': details.url
				,'headers': details.headers
				,'data': details.data
			};
			opera_sendMessage({'command': 'ajax', 'details': detailsX}, function(response) {
				if (response && response.val === 'success') {
					if (details.onload) {
						details.onload(response.request);
					}
				} else {
					if (details.onerror) {
						details.onerror(response.request);
					}
				}
			});
		};
	}

	if (typeof safari != 'undefined') {
		safari.self.addEventListener('message', function(response) {
			var callback = _ext_messageCallback[response.name];
			if (callback) {
				callback(response.message);
			}
		});

		var safari_sendMessage = function(message, callback) {
			message.messageid = (+new Date()).toString();
			_ext_messageCallback[message.messageid] = callback;

			try {
				safari.self.tab.dispatchMessage(message.command, message);
			} catch (e) {
				if (e.message === '\'undefined\' is not an object (evaluating \'safari.self.tab.dispatchMessage\')') {
					extUpdatedError(e.toString());
				}
				throw e;
			}
		};

		var safari_getValue = function(name, callback) {
			safari_sendMessage({'command': 'getValue', 'name': name}, callback);
		};
		
		var safari_setValue = function(name, val) {
			safari_sendMessage({'command': 'setValue', 'name': name, 'val': val});
		};
		
		var safari_clearStorage = function() {
			safari_sendMessage({'command': 'clearStorage'});
		};

		var safari_ajax = function(details) {
			var detailsX = {
				'method': details.method
				,'url': details.url
				,'headers': details.headers
				,'data': details.data
			};
			safari_sendMessage({'command': 'ajax', 'details': detailsX}, function(response) {
				if (response && response.val === 'success') {
					if (details.onload) {
						details.onload(response.request);
					}
				} else {
					if (details.onerror) {
						details.onerror(response.request);
					}
				}
			});
		};
	}
	
	if (typeof self != 'undefined' && typeof self.on != 'undefined') {
		self.on('message', function(response) {
			if (response) {
				var callback = _ext_messageCallback[response.messageid];
				if (callback) {
					callback(response.val);
				}
			}
		});

		var xpi_sendMessage = function(message, callback) {
			_ext_messageCallback[_ext_messageId] = callback;
			message.messageid = _ext_messageId;

			self.postMessage(message);
			_ext_messageId += 1;
		};

		var xpi_getValue = function(name, callback) {
			xpi_sendMessage({'command': 'getValue', 'name': name}, callback);
		};
		
		var xpi_setValue = function(name, val) {
			xpi_sendMessage({'command': 'setValue', 'name': name, 'val': val});
		};
		
		var xpi_clearStorage = function() {
			xpi_sendMessage({'command': 'clearStorage'});
		};

		var xpi_ajax = function(details) {
			var detailsX = {
				'method': details.method
				,'url': details.url
				,'headers': details.headers
				,'data': details.data
			};
			xpi_sendMessage({'command': 'ajax', 'details': detailsX}, function(response) {
				if (response && response.val === 'success') {
					if (details.onload) {
						details.onload(response.request);
					}
				} else {
					if (details.onerror) {
						details.onerror(response.request);
					}
				}
			});
		};
	}

	if (typeof w.external != 'undefined' && typeof w.external.mxGetRuntime != 'undefined') {
		var maxthonRuntime = w.external.mxGetRuntime();
		maxthonRuntime.listen('messageContentScript', function(response) {
			if (response) {
				var callback = _ext_messageCallback[response.messageid];
				if (callback) {
					callback(response.val);
				}
			}
		});

		var mxaddon_sendMessage = function(message, callback) {
			_ext_messageCallback[_ext_messageId] = callback;
			message.messageid = _ext_messageId;

			try {
				maxthonRuntime.post('messageBackground', message);
			} catch (e) {
				if (e.message && e.message === 'No Platform_Message Service Extension! (355)') {
					extUpdatedError(e.message);
				}
				throw e;
			}
			_ext_messageId += 1;
		};

		var mxaddon_getValue = function(name, callback) {
			try {
				callback(maxthonRuntime.storage.getConfig(name));
			} catch (e) {
				if (e.message && e.message === 'No LocalStorage Service Extension! (206)') {
					extUpdatedError(e.message);
				}
				throw e;
			}
		};

		var mxaddon_setValue = function(name, val) {
			try {
				maxthonRuntime.storage.setConfig(name, val);
			} catch (e) {
				if (e.message && e.message === 'No LocalStorage Service Extension! (206)') {
					extUpdatedError(e.message);
				}
				throw e;
			}
		};

		var mxaddon_clearStorage = function() {
			// Maxthon does not have a clear storage function
		};

		var mxaddon_ajax = function(details) {
			var detailsX = {
				'method': details.method
				,'url': details.url
				,'headers': details.headers
				,'data': details.data
			};
			mxaddon_sendMessage({'command': 'ajax', 'details': detailsX}, function(response) {
				if (response && response.val === 'success') {
					if (details.onload) {
						details.onload(response.request);
					}
				} else {
					if (details.onerror) {
						details.onerror(response.request);
					}
				}
			});
		};
	}

	function ajax(obj) {
		switch (STORAGEMETHOD) {
			case 'greasemonkey':
				return GM_xmlhttpRequest(obj); // jshint ignore:line

			case 'chrome':
				return chrome_ajax(obj);

			case 'opera':
				return opera_ajax(obj);

			case 'safari':
				return safari_ajax(obj);

			case 'xpi':
				return xpi_ajax(obj);

			case 'mxaddon':
				return mxaddon_ajax(obj);

			default:
				break;
		}
		
		throw {
			responseXML: ''
			,responseText: ''
			,readyState: 4
			,responseHeaders: ''
			,status: -100
			,statusText: 'No GM_xmlhttpRequest support'
		};
	}
	
	function isPonyhoofPage(id) {
		if (id === PONYHOOF_PAGE) {
			return true;
		}
				return false;
	}
	
	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	// Settings
	for (var i in HTMLCLASS_SETTINGS) {
		if (!DEFAULTSETTINGS[HTMLCLASS_SETTINGS[i]]) {
			DEFAULTSETTINGS[HTMLCLASS_SETTINGS[i]] = false;
		}
	}
	//DEFAULTSETTINGS.show_messages_other = true;
	if (ISMOBILE) {
		DEFAULTSETTINGS.disable_animation = true;
	}
	
	function getValueError(extra) {
		extra = extra || '';
		if (chrome_isExtUpdatedError(extra)) {
			extUpdatedError(extra);
		} else {
			createSimpleDialog('localStorageError_getValue', "Ponyhoof derp'd :(", "Whoops, Ponyhoof can't load your settings. Please try again later.<br><br>If you keep seeing this error, please update to the latest version of Ponyhoof if available and <a href=\""+w.location.protocol+PONYHOOF_URL+"\" data-hovercard=\"/ajax/hovercard/page.php?id="+PONYHOOF_PAGE+"\">visit and post to the Ponyhoof page for help</a>.<br><br><code>"+extra+"</code>");
		}
		trace();
		statTrack('getValueError');
	}
	
	function saveValueError(extra) {
		extra = extra || '';
		var desc = "Whoops, Ponyhoof can't save your settings. Please try again later.";
		if (ISFIREFOX && STORAGEMETHOD === 'greasemonkey' && userSettings.customBg) {
			desc += "<br><br>This may be caused by a large custom background that you have set. Please try removing it.";
		}
		desc += "<br><br>If you keep seeing this error, please update to the latest version of Ponyhoof if available and <a href=\""+w.location.protocol+PONYHOOF_URL+"\" data-hovercard=\"/ajax/hovercard/page.php?id="+PONYHOOF_PAGE+"\">visit and post to the Ponyhoof page for help</a>.<br><br><code>"+extra+"</code>";
		createSimpleDialog('localStorageError_saveValue', "Ponyhoof derp'd :(", desc);
		trace();
		statTrack('saveValueError');
	}
	
	function ponyhoofError(extra) {
		extra = extra || '';
		createSimpleDialog('ponyhoofError', "Ponyhoof derp'd", "Whoops, Ponyhoof encountered an internal error. Please try again later.<br><br>If you keep seeing this error, please update to the latest version of Ponyhoof if available and <a href=\""+w.location.protocol+PONYHOOF_URL+"\" data-hovercard=\"/ajax/hovercard/page.php?id="+PONYHOOF_PAGE+"\">visit and post to the Ponyhoof page for help</a>.<br><br><code>"+extra+"</code>");
		trace();
		statTrack('ponyhoofError');
	}

	var chrome_isExtUpdatedError = function(message) {
		var a = 'ModuleSystem has been deleted';
		var b = 'TypeError: Cannot read property \'sendMessage\' of undefined';
		return (message === a || message === b);
	};

	var extUpdatedError = function(extra) {
		extra = extra || '';

		if (!DIALOGS['localStorageError_extUpdatedError']) {
			var c = "Ponyhoof has been updated/disabled recently. Please reload the page in order for Ponyhoof to work properly.";
			if (extra) {
				c += "<br><br><code>"+extra+"</code>";
			}

			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button"><span class="uiButtonText">'+CURRENTLANG['reload']+'</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">'+CURRENTLANG['close']+'</span></a>';

			var errorDialog = new Dialog('localStorageError_extUpdatedError');
			errorDialog.create();
			errorDialog.changeTitle("Ponyhoof derp'd");
			errorDialog.changeContent(c);
			errorDialog.changeBottom(bottom);

			errorDialog.dialog.getElementsByClassName('uiButtonConfirm')[0].addEventListener('click', function(ev) {
				ev.preventDefault();

				if (!hasClass(this, 'uiButtonDisabled')) {
					errorDialog.canCloseByEscapeKey = false;
					$$(errorDialog.dialog, '.uiButton', function(button) {
						addClass(button, 'uiButtonDisabled');
					});
					w.location.reload();
				}
			}, false);

			errorDialog.dialog.getElementsByClassName('notNow')[0].addEventListener('click', function(ev) {
				ev.preventDefault();

				if (!hasClass(this, 'uiButtonDisabled')) {
					errorDialog.close();
				}
			}, false);
		} else {
			DIALOGS['localStorageError_extUpdatedError'].show();
		}

		trace();
		statTrack('extUpdatedError');

		turnOffQuickling();
	};

	// Force a reload on next page load
	var _turnOffQuickling_done = false;
	var turnOffQuickling = function() {
		if (_turnOffQuickling_done) {
			return;
		}

		contentEval(function(arg) {
			try {
				if (typeof window.requireLazy === 'function') {
					window.requireLazy(['PageTransitions'], function(PageTransitions) {
						PageTransitions._handleTransition = function() {
							return false;
						};
					});
				}
			} catch (e) {
				if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
					console.log("Unable to hook to PageTransitions");
					console.dir(e);
				}
			}
		}, {});
		_turnOffQuickling_done = true;
	};
	
	function getValue(name, callback) {
		switch (STORAGEMETHOD) {
			case 'greasemonkey':
				callback(GM_getValue(name)); // jshint ignore:line
				break;
			
			case 'chrome':
				chrome_getValue(name, callback);
				break;
			
			case 'opera':
				opera_getValue(name, callback);
				break;
			
			case 'safari':
				safari_getValue(name, callback);
				break;
			
			case 'xpi':
				xpi_getValue(name, callback);
				break;
			
			case 'mxaddon':
				mxaddon_getValue(name, callback);
				break;
			
			//case 'localstorage':
			default:
				name = 'ponyhoof_'+name;
				callback(w.localStorage.getItem(name));
				break;
		}
	}
	
	function saveValue(name, v) {
		switch (STORAGEMETHOD) {
			case 'greasemonkey':
				GM_setValue(name, v); // jshint ignore:line
				break;
			
			case 'chrome':
				chrome_setValue(name, v);
				break;
			
			case 'opera':
				opera_setValue(name, v);
				break;
			
			case 'safari':
				safari_setValue(name, v);
				break;
			
			case 'xpi':
				xpi_setValue(name, v);
				break;
			
			case 'mxaddon':
				mxaddon_setValue(name, v);
				break;
			
			//case 'localstorage':
			default:
				name = 'ponyhoof_'+name;
				w.localStorage.setItem(name, v);
				break;
		}
	}

	function loadSettings(callback, opts) {
		// opts => prefix, defaultsettings
		opts = opts || {prefix: null};
		var settingsKey = 'settings';
		if (opts.prefix != null) {
			settingsKey = opts.prefix+settingsKey;
		} else {
			settingsKey = SETTINGSPREFIX+settingsKey;
		}
		if (!opts.defaultSettings) {
			opts.defaultSettings = DEFAULTSETTINGS;
		}

		try {
			getValue(settingsKey, function(s) {
				if (s) {
					s = JSON.parse(s);
					if (!s) {
						s = {};
					}
				} else {
					s = {};
				}
				for (var i in opts.defaultSettings) {
					if (!s.hasOwnProperty(i)) {
						s[i] = opts.defaultSettings[i];
					}
				}
				callback(s);
			});
		} catch (e) {
			error(e.message);
			log(e.stack);

			var extra = '';
			if (e.message) {
				extra = e.message;
			} else {
				extra = e.toString();
			}
			try {
				getValueError(extra);
			} catch (e) {
				onPageReady(function() {
					if (d.body) {
						getValueError(extra);
					}
				});
			}
			callback();
			return false;
		}
	}
	
	function saveSettings(opts) {
		// opts => prefix, settings
		opts = opts || {prefix: null, settings: userSettings};
		var settingsKey = 'settings';
		if (opts.prefix != null) {
			settingsKey = opts.prefix+settingsKey;
		} else {
			settingsKey = SETTINGSPREFIX+settingsKey;
		}
		var settings = userSettings;
		if (opts.settings) {
			settings = opts.settings;
		}

		try {
			saveValue(settingsKey, JSON.stringify(settings));
			return true;
		} catch (e) {
			error(e.message);
			log(e.stack);

			var extra = '';
			if (e.message) {
				if (e.message === 'ModuleSystem has been deleted' || e.message === 'TypeError: Cannot read property \'sendMessage\' of undefined') {
					extUpdatedError(e.message);
					callback();
					return;
				}

				extra = e.message;
			} else {
				extra = e.toString();
			}
			saveValueError(extra);
			return false;
		}
	}

	var saveGlobalSettings = function(shouldChromeFallback) {
		saveSettings({prefix:'global_', settings:globalSettings});

		// If we're on Chrome and using the potentially fragile chrome.storage, save the global settings to the our localStorage
		// Losing a user's settings is an annoyance, but running Ponyhoof for other users when it was told not to is disastrous
		// See http://crbug.com/261623
		if (shouldChromeFallback) {
			if (STORAGEMETHOD === 'chrome') {
				if (chrome.storage && !chrome_storageFallback) {
					chrome_sendMessage({'command':'setValue', 'name':'global_settings', 'val':JSON.stringify(globalSettings)}, function() {});
				}
			}
		}
	};

	var _statTrack_tracked = [];
	function statTrack(stat) {
		if (_statTrack_tracked.indexOf(stat) !== -1) {
			return;
		}
		_statTrack_tracked.push(stat);

		var i = d.createElement('iframe');
		i.style.position = 'absolute';
		i.style.top = '-9999px';
		i.style.left = '-9999px';
		i.setAttribute('aria-hidden', 'true');
		i.src = '//hoof.little.my/files/_htm/stat_'+stat+'.htm?version='+VERSION;
		d.body.appendChild(i);
	}

	var canPlayFlash = function() {
		return !!w.navigator.mimeTypes['application/x-shockwave-flash'];
	};
	
	// Pony selector
	var PonySelector = function(p, param) {
		var k = this;
		
		if (param) {
			k.param = param;
		} else {
			k.param = {};
		}
		k.p = p;
		k.wrap = null;
		k.button = null;
		
		k.customClick = function() {};
		k.customCheckCondition = false;
		k.overrideClickAction = false;
		k.saveTheme = true;
		
		k.menu = null;
		k.createSelector = function() {
			if (k.menu) {
				return k.menu;
			}
			
			k.injectStyle();
			
			var currentPonyData = convertCodeToData(CURRENTPONY);
			var name = "(Nopony)";
			if (currentPonyData) {
				name = currentPonyData.name;
			} else if (CURRENTPONY === 'RANDOM') {
				name = "(Random)";
			}
			
			var iu = INTERNALUPDATE;
			INTERNALUPDATE = true;
			
			k.menu = new Menu('ponies_'+p.id, k.p/*, {checkable:true}*/);
			k.button = k.menu.createButton(name);
			k.menu.alwaysOverflow = true;
			k.menu.searchNoResultsMessage = "No ponies :(";
			k.menu.createMenu();
			k.menu.attachButton();

			if (k.allowRandom) {
				k.createRandom();
				k.menu.createSeperator();
			}
			
			if (k.param.feature && k.param.feature != -1) {
				k._createItem(PONIES[k.param.feature], true);
				k.menu.createSeperator();
			}
			
			for (var i = 0, len = PONIES.length; i < len; i += 1) {
				if (k.param.feature && k.param.feature != -1 && PONIES[k.param.feature].code === PONIES[i].code) {
					if (PONIES[i].seperator) {
						k.menu.createSeperator();
					}
					continue;
				}
				
				var check = false;
				if (k.customCheckCondition) {
					if (k.customCheckCondition(PONIES[i].code)) {
						check = true;
					}
				} else {
					if (PONIES[i].code === CURRENTPONY) {
						check = true;
					}
				}
				
				k._createItem(PONIES[i], check);
				
				if (PONIES[i].seperator) {
					k.menu.createSeperator();
				}
			}
			
			var img = d.createElement('span');
			img.className = 'ponyhoof_loading ponyhoof_show_if_injected ponyhoof_loading_pony';
			k.menu.wrap.appendChild(img);

			INTERNALUPDATE = iu;
		};

		k.createRandom = function() {
			var check = false;
			if (CURRENTPONY === 'RANDOM') {
				check = true;
			}
			
			k.menu.createMenuItem({
				html: "(Random)"
				,check: check
				,unsearchable: true
				,onclick: function(menuItem, menuClass) {
					CURRENTPONY = 'RANDOM';
					
					changeThemeSmart('RANDOM');
					if (k.saveTheme) {
						userSettings.theme = 'RANDOM';
						saveSettings();
					}
					
					menuClass.changeButtonText("(Random)");
					menuClass.changeChecked(menuItem);
					menuClass.close();
					
					if (k.customClick) {
						k.customClick(menuItem, menuClass);
					}
				}
			});
		};
		
		k._createItem = function(ponyData, check) {
			var unsearchable = false;
			if (ponyData.hidden) {
				unsearchable = true;
			}
			var menuItem = k.menu.createMenuItem({
				html: ponyData.name
				,title: ponyData.menu_title
				,data: ponyData.code
				,check: check
				,unsearchable: unsearchable
				,searchAlternate: ponyData.search
				,onclick: function(menuItem, menuClass) {
					if (!k.overrideClickAction) {
						var code = ponyData.code;
						CURRENTPONY = code;
						
						changeThemeSmart(code);
						if (k.saveTheme) {
							userSettings.theme = code;
							saveSettings();
						}

						menuClass.changeButtonText(ponyData.name);
						menuClass.changeChecked(menuItem);
						menuClass.close();
					}
					
					if (k.customClick) {
						k.customClick(menuItem, menuClass);
					}
				}
			});
			if (ponyData.hidden) {
				addClass(menuItem.menuItem, 'ponyhoof_pony_hidden');
			}
		};
		
		k.injectStyle = function() {
			var css = '';
			css += 'html .ponyhoof_pony_hidden {display:none;}';
			for (var i = 0, len = PONIES.length; i < len; i += 1) {
				if (PONIES[i].color) {
					css += 'html .ponyhoof_menuitem[data-ponyhoof-menu-data="'+PONIES[i].code+'"]:hover, html .ponyhoof_menuitem[data-ponyhoof-menu-data="'+PONIES[i].code+'"]:active, html .ponyhoof_menuitem[data-ponyhoof-menu-data="'+PONIES[i].code+'"]:focus {background-color:#'+PONIES[i].color[0]+' !important;border-top-color:#'+PONIES[i].color[1]+' !important;border-bottom-color:#'+PONIES[i].color[1]+' !important;}';
				}
			}
			
			injectManualStyle(css, 'ponySelector');
		};
	};
	
	// Sounds
	var _soundCache = {};
	var PonySound = function(id) {
		var k = this;
		k.id = id;
		
		k.sound = d.createElement('audio');
		
		// Don't loop sounds for 3 seconds
		k.wait = 3;
		k.respectSettings = true;
		k.respectVolumeSetting = true;
		k.canplay = $noop;
		
		k._time = 0;
		
		k.source = '';
		k.changeSource = function(source) {
			k.source = source;
		};
		
		k.changeSourceSmart = function(source) {
			if (k.canPlayMp3()) {
				source = source.replace(/\.EXT/, '.mp3');
			} else if (k.canPlayOgg()) {
				source = source.replace(/\.EXT/, '.ogg');
			} else {
				throw new Error("No supported audio formats");
			}

			k.changeSource(source);
		};
		
		k.play = function() {
			if (k.respectSettings) {
				if (!userSettings.sounds) {
					return;
				}
			}

			if (STORAGEMETHOD === 'chrome' && chrome_isExtUpdated()) {
				//extUpdatedError("[PonySound] Cannot play sound.");

				// Don't bombard the user with error dialogs especially he has tons of tabs, instead, just fail silently and force a page reload on next link click
				turnOffQuickling();
				return;
			}
			
			if (k.wait == 0) {
				k.continuePlaying();
				return;
			}

			// Make sure we aren't playing it on another page already
			k._time = Math.floor(Date.now() / 1000);
			
			//try {
				getValue(SETTINGSPREFIX+'soundCache', function(s) {
					if (typeof s != 'undefined') {
						try {
							_soundCache = JSON.parse(s);
						} catch (e) {
							_soundCache = {};
						}
						
						if (_soundCache == null) {
							_soundCache = {};
						}

						if (_soundCache[k.id]) {
							if (_soundCache[k.id]+k.wait <= k._time) {
							} else {
								return;
							}
						}
					}

					k.continuePlaying();
				});
			//} catch (e) {
			//	k.continuePlaying();
			//}
		};
		
		k.continuePlaying = function() {
			if (k.wait) {
				_soundCache[k.id] = k._time;
				saveValue(SETTINGSPREFIX+'soundCache', JSON.stringify(_soundCache));
			}

			if (k.respectVolumeSetting) {
				k.sound.volume = userSettings.soundsVolume;
			}
			k.sound.src = k.source;
			k.sound.load();
			k.sound.play();
		};
		
		// http://html5doctor.com/native-audio-in-the-browser/
		k.audioTagSupported = function() {
			return !!w.Audio && !!k.sound.canPlayType;
		};
		
		k.checkAudioSupport = function() {
			// Soft-block Safari 5 on Windows
			// Needs to be at the top because Safari 5 on Windows will annoyingly lock up
			if (STORAGEMETHOD === 'safari') {
				if (w.navigator.userAgent.indexOf('Windows') !== -1) {
					throw new Error("Safari 5 on Windows do not handle audio properly");
				}
			}

			if (!k.audioTagSupported()) {
				throw new Error("No <audio> tag support");
			}
			
			// Soft-block Opera 12
			if (STORAGEMETHOD === 'opera') {
				throw new Error("Old versions of Opera do not handle audio properly");
			}
		};
		
		k.canPlayMp3 = function() {
			return !!k.sound.canPlayType && '' != k.sound.canPlayType('audio/mpeg');
		};
		
		k.canPlayOgg = function() {
			return !!k.sound.canPlayType && '' != k.sound.canPlayType('audio/ogg; codecs="vorbis"');
		};
	};
	
	var ponySounds = {};
	function initPonySound(id, source) {
		source = source || '';

		if (ponySounds[id]) {
			if (source) {
				ponySounds[id].changeSourceSmart(source);
			}
			
			return ponySounds[id];
		}

		if (!canPlayAudio()) {
			throw new Error("Audio support is not available for this browser");
		}

		var sound = new PonySound(id);
		ponySounds[id] = sound;

		if (source) {
			sound.changeSourceSmart(source);
		}

		return sound;
	}

	var __canPlayAudio = null;
	var canPlayAudio = function() {
		if (__canPlayAudio === null) {
			try {
				var sound = new PonySound('soundsTest');
				sound.checkAudioSupport();

				__canPlayAudio = true;
			} catch (e) {
				__canPlayAudio = false;
			}
		}
		return __canPlayAudio;
	};
	
	// Updater
	var Updater = function() {
		var k = this;
		
		k.classChecking = 'ponyhoof_updater_checking';
		k.classLatest = 'ponyhoof_updater_latest';
		k.classError = 'ponyhoof_updater_error';
		k.classNewVersion = 'ponyhoof_updater_newVersion';
		k.classVersionNum = 'ponyhoof_updater_versionNum';
		k.classUpdateButton = 'ponyhoof_updater_updateNow';

		k.update_url = UPDATEURL;

		k.update_json = {};

		k.checkForUpdates = function() {
					loopClassName(k.classUpdateButton, function(ele) {
				if (ISSAFARI && STORAGEMETHOD != 'safari') {
					// NinjaKit is bugged and only listens to install script requests on page load, no DOMNodeInserted, so we plan to open a new window
					ele.target = '_blank';
				}
				
				ele.addEventListener('click', k._updateNowButton, false);
			});

			log("Checking for updates...");
			try {
				ajax({
					method: 'GET'
					,url: k.update_url
					,onload: function(response) {
						if (response.status != 200) {
							k._onError(response);
							return;
						}
						
						var json;
						try {
							json = JSON.parse(response.responseText);
						} catch (e) {
							k._onError(response);
							return;
						}
						
						if (json.version > VERSION) {
							k._newVersion(json);
						} else {
							k._noNewVersion();
						}
					}
					,onerror: function(response) {
						k._onError(response);
					}
				});
			} catch (e) {
				k._onError(e);
			}
		};
		
		k._noNewVersion = function() {
			// Hide checking for updates
			loopClassName(k.classChecking, function(ele) {
				ele.style.display = 'none';
			});

			// Show yay
			loopClassName(k.classLatest, function(ele) {
				ele.style.display = 'block';
			});
		};
		k._newVersion = function(json) {
			k.update_json = json;

			// Hide checking for updates
			loopClassName(k.classChecking, function(ele) {
				ele.style.display = 'none';
			});

			// Show version number
			loopClassName(k.classVersionNum, function(ele) {
				ele.textContent = json.version;
			});
			// Show that we have a new version
			loopClassName(k.classNewVersion, function(ele) {
				ele.style.display = 'block';
			});
			// Change the update now button to point to the new link
			loopClassName(k.classUpdateButton, function(ele) {
				if (ISSAFARI && STORAGEMETHOD != 'safari') {
					ele.href = json.safari;
					return;
				}
				
				switch (STORAGEMETHOD) {
					// v1.501
					case 'chrome':
						ele.href = json.chrome_url;
						break;

					case 'opera':
						ele.href = json.opera_url;
						break;

					// v1.521
					case 'safari':
						ele.href = json.safariextz;
						break;

					// v1.611
					case 'xpi':
						ele.href = json.xpi;
						break;

					case 'mxaddon':
						ele.href = json.mxaddon_instruction;
						break;

					default:
						ele.href = json.update_url;
						break;
				}
			});
		};
		k._onError = function(response) {
			// Hide checking for updates
			loopClassName(k.classChecking, function(ele) {
				ele.style.display = 'none';
			});

			// Show derp
			loopClassName(k.classError, function(ele) {
				ele.style.display = 'block';
			});

			error("Error checking for updates.");
			dir(response);
		};

		k.updateDialog = null;
		k._updateNowButton = function(ev) {
			statTrack('updateNowButton');

			switch (STORAGEMETHOD) {
				case 'chrome':
					k._cws();
					return false;

				case 'opera':
					k._opera();
					return false;

				case 'safari':
					k.safariInstruction();
					return false;

				case 'xpi':
					k._xpi();
					ev.preventDefault();
					return;

				// Maxthon 4.2.0.2200 starts blocking off-store extensions
				/*case 'mxaddon':
					k.mxaddon();
					return;*/

				default:
					break;
			}

			if (DIALOGS.updater_dialog) {
				k.updateDialog.show();
				return;
			}

			var c = "The update will load after you reload Facebook.";
			if (STORAGEMETHOD === 'mxaddon') {
				c = "Follow the instructions in the new window and reload Facebook when you are done.";
			} else if (ISCHROME) { // still localstorage
				c = "Click Continue on the bottom of this window and click Add to finish updating. The update will load after you reload Facebook.";
			} else if (ISSAFARI) { // still ninjakit
				c = "Follow the instructions in the new window and reload Facebook when you are done.";
			} else if (ISOPERA) { // still localstorage
				c = "Follow the instructions in the new window and reload Facebook when you are done.";
			} else if (STORAGEMETHOD === 'greasemonkey') {
				c = "Click <strong>Install</strong> when you see this dialog. The update will load after you reload Facebook.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/firefox/install.png' alt='' width='552' height='110' class='ponyhoof_image_shadow'>";
				injectManualStyle('#ponyhoof_dialog_updater_dialog .generic_dialog_popup, #ponyhoof_dialog_updater_dialog .popup {width:600px;}', 'updater_dialog');
			}
			
			var bottom = '';
			bottom += '<div class="lfloat"><a href="#" class="retry hidden_elem">Retry</a></div>';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">'+CURRENTLANG.reloadNow+'</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">'+CURRENTLANG.notNow+'</span></a>';
			
			k.updateDialog = new Dialog('updater_dialog');
			k.updateDialog.alwaysModal = true;
			k.updateDialog.create();
			k.updateDialog.changeTitle(CURRENTLANG['updater_title']);
			k.updateDialog.changeContent(c);
			k.updateDialog.changeBottom(bottom);
			
			if (!ISCHROME && STORAGEMETHOD === 'greasemonkey') {
				var retry = k.updateDialog.dialog.getElementsByClassName('retry');
				if (retry.length) {
					retry = retry[0];
					retry.href = k.update_json.update_url;
					removeClass(retry, 'hidden_elem');
				}
			}
			k._initReloadButtons(k.updateDialog);
			
			return false;
		};

		k.cwsDialog = null;
		k.cwsWaitDialog = null;
		k.cwsOneClickSuccess = false;
		k._cws = function() {
			if (k.cwsWaitDialog) {
				k._cws_showDialog();
				return;
			}

			var ok = true;
			loopClassName(k.classUpdateButton, function(ele) {
				if (hasClass(ele, 'uiButtonDisabled')) {
					ok = false;
				} else {
					addClass(ele, 'uiButtonDisabled');
				}
			});
			if (!ok) {
				return;
			}

			var c = "Updating... <span class='ponyhoof_loading'></span>";
			k.cwsWaitDialog = new Dialog('update_cwsWait');
			k.cwsWaitDialog.alwaysModal = true;
			k.cwsWaitDialog.noBottom = true;
			k.cwsWaitDialog.canCloseByEscapeKey = false;
			k.cwsWaitDialog.create();
			k.cwsWaitDialog.changeTitle(CURRENTLANG['updater_title']);
			k.cwsWaitDialog.changeContent(c);

			chrome_sendMessage({'command':'checkForUpdates'}, function(status, details) {
				if (status === 'update_available') {
					var c = "Downloading update... <span class='ponyhoof_loading'></span>";
					k.cwsWaitDialog.changeContent(c);
					chrome_sendMessage({'command':'onUpdateAvailable'}, function(status) {
						if (status === 'updated') {
							k.cwsOneClickSuccess = true;

							var successText = '';
							var ponyData = convertCodeToData(REALPONY);
							if (ponyData.successText) {
								successText = ponyData.successText;
							} else {
								successText = "Yay!";
							}
							var c = successText+" Update complete, reloading... <span class='ponyhoof_loading'></span>";
							k.cwsWaitDialog.changeContent(c);

							if (!k.cwsDialog) {
								chrome_sendMessage({'command':'reloadNow'}, function() {});
								w.setTimeout(function() {
									w.location.reload();
								}, 1000);
							}
						} else {
							k._cws_fallback();
						}
					});
				} else {
					k._cws_fallback();
				}
			});

			w.setTimeout(k._cws_fallback, 8000);
		};

		k._cws_fallback = function() {
			if (k.cwsOneClickSuccess) {
				return;
			}
			k.cwsOneClickSuccess = true;

			k.cwsWaitDialog.close();
			loopClassName(k.classUpdateButton, function(ele) {
				removeClass(ele, 'uiButtonDisabled');
			});
			k._cws_showDialog();
		};

		k._cws_showDialog = function() {
			if (k.cwsDialog) {
				k.cwsDialog.show();
				return;
			}

			var header = '';
			if (DISTRIBUTION === 'cws') {
				if (!ISOPERABLINK) {
					header = "Ponyhoof automatically updates from the Chrome Web Store.";
				} else {
					header = "Ponyhoof automatically updates on Opera.";
				}
			} else {
				header = "Ponyhoof automatically updates on Google Chrome.";
			}

			var newversion = k.update_json.version;
			var c = "<strong>"+header+"</strong><br><br>To update now, go to <a href='#' class='ponyhoof_updater_cws_openExtensions'><strong>about:extensions</strong></a> in the address bar, enable <strong>Developer mode</strong> at the top-right and click <strong>Update extensions now</strong>.";
			if (newversion) {
				c += "<br><br>Verify that the version changes from "+VERSION+" to "+parseFloat(newversion)+" and reload Facebook.";
			}
			c += "<br><br><"+"img src='"+THEMEURL+"_welcome/chrome_forceupdate.png' alt='' width='177' height='108' class='ponyhoof_image_shadow'>";
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm ponyhoof_updater_cws_openExtensions" role="button"><span class="uiButtonText">Open Extensions</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">'+CURRENTLANG.reloadNow+'</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">'+CURRENTLANG.notNow+'</span></a>';
			
			k.cwsDialog = new Dialog('update_cws');
			k.cwsDialog.alwaysModal = true;
			k.cwsDialog.create();
			k.cwsDialog.changeTitle(CURRENTLANG['updater_title']);
			k.cwsDialog.changeContent(c);
			k.cwsDialog.changeBottom(bottom);
			
			$$(k.cwsDialog.dialog, '.ponyhoof_updater_cws_openExtensions', function(button) {
				button.addEventListener('click', function(e) {
					e.preventDefault();
					if (!hasClass(this, 'uiButtonDisabled')) {
						chrome_sendMessage({'command':'openExtensions'}, function() {});
					}
				}, false);
			});

			k._initReloadButtons(k.cwsDialog);
		};

		k.operaDialog = null;
		k._opera = function() {
			if ($('ponyhoof_dialog_update_opera')) {
				k.operaDialog.show();
				return;
			}

			var version = getBrowserVersion();

			var c = '';
			if (parseFloat(version.full) >= 12.10) {
				c += "<div class='ponyhoof_message uiBoxYellow'>If Opera blocks the update, then <a href='http://jointheherd.little.my' target='_top'>please visit the installer at http://jointheherd.little.my</a> for instructions.</div><br>";
			} else {
				c += "New versions of Opera will block extensions that aren't from the official Opera Add-ons Gallery. Therefore, please set up Opera to trust our website for future updates.<br><br>";
				//c += "If you can't update anymore, then <a href='http://jointheherd.little.my' target='_top'>please visit the installer at http://jointheherd.little.my</a> for instructions.<br><br>";
				c += "If you get this security prompt, check <strong>Always allow installation from this location</strong> and click <strong>OK</strong>.<br><br><"+"img src='"+THEMEURL+"_welcome/installv2/install_opera_1.png' alt='' width='385' height='170' class='ponyhoof_image_shadow'><br><br>";
			}
			c += "Click <strong>Install</strong> when you see this dialog. The update will load after you reload Facebook.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/opera/install_opera_2.png' alt='' width='332' height='268' class='ponyhoof_image_shadow'>";
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">'+CURRENTLANG.reloadNow+'</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">'+CURRENTLANG.notNow+'</span></a>';
			
			k.operaDialog = new Dialog('update_opera');
			k.operaDialog.alwaysModal = true;
			k.operaDialog.create();
			k.operaDialog.changeTitle(CURRENTLANG.updater_title);
			k.operaDialog.changeContent(c);
			k.operaDialog.changeBottom(bottom);

			k._initReloadButtons(k.operaDialog);
		};

		k.safariDialog = null;
		k.safariInstruction = function() {
			if (k.safariDialog) {
				k.safariDialog.show();
				return;
			}

			injectManualStyle('#ponyhoof_dialog_update_safari .generic_dialog_popup, #ponyhoof_dialog_update_safari .popup {width:600px;}', 'update_safari');

			var c = '';
			if (w.navigator.userAgent.indexOf('Mac OS X') != -1) {
				c += "On the top-right of the Safari window, click on the Downloads button and then double-click <strong>ponyhoof.safariextz</strong><br><br><"+"img src='"+THEMEURL+"_welcome/guide/safari_mac/install_1.png' alt='' width='276' height='201' class='ponyhoof_image_shadow noshadow'><br><br>";
				c += "Click <strong>Install</strong>. The update will load after you reload Facebook.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/safari_mac/install_2.png' alt='' width='518' height='285' class='ponyhoof_image_shadow'>";
			} else {
				c += "When you see this download dialog, click <strong>Open</strong>.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/safari5/install_1.png' alt='' width='500' height='222' class='ponyhoof_image_shadow'><br><br>";
				c += "Click <strong>Install</strong>. The update will load after you reload Facebook.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/safari5/install_2.png' alt='' width='524' height='226' class='ponyhoof_image_shadow'>";
			}
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">'+CURRENTLANG.reloadNow+'</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">'+CURRENTLANG.notNow+'</span></a>';
			
			k.safariDialog = new Dialog('update_safari');
			k.safariDialog.alwaysModal = true;
			k.safariDialog.create();
			k.safariDialog.changeTitle(CURRENTLANG.updater_title);
			k.safariDialog.changeContent(c);
			k.safariDialog.changeBottom(bottom);

			k._initReloadButtons(k.safariDialog);
		};

		k.xpiDialog = null;
		k.xpiWaitDialog = null;
		k.xpiOneClickSuccess = false;
		k._xpi = function() {
			if (k.xpiWaitDialog) {
				k._xpi_showDialog();
				return;
			}

			var loadingIndicator = '<span class="ponyhoof_loading"></span>';

			var successText = '';
			var ponyData = convertCodeToData(REALPONY);
			if (ponyData.successText) {
				successText = ponyData.successText;
			} else {
				successText = "Yay!";
			}
			successText += " Update complete, reloading... " + loadingIndicator;

			var c = "Updating... " + loadingIndicator;
			k.xpiWaitDialog = new Dialog('update_xpiWait');
			k.xpiWaitDialog.alwaysModal = true;
			k.xpiWaitDialog.noBottom = true;
			k.xpiWaitDialog.canCloseByEscapeKey = false;
			k.xpiWaitDialog.create();
			k.xpiWaitDialog.changeTitle(CURRENTLANG['updater_title']);
			k.xpiWaitDialog.changeContent(c);

			xpi_sendMessage({'command':'checkForUpdates'}, function(val) {
				if (val !== 'update_available') {
					k._xpi_fallback();
					return;
				}

				xpi_sendMessage({'command':'onUpdateAvailable'}, function(val) {
					if (!val.status) {
						return;
					}
					var c = '';
					switch (val.status) {
						case 'onDownloadStarted':
							c = "Downloading update...";
							break;

						case 'onDownloadEnded':
							c = "Preparing to install...";
							break;

						case 'onInstallStarted':
							c = "Installing update...";

							w.setTimeout(function() {
								k.xpiOneClickSuccess = true;

								if (!k.xpiDialog) {
									k.xpiWaitDialog.changeContent(successText);
									w.location.reload();
								}
							}, 100);
							break;

						case 'onDownloadFailed':
						case 'onDownloadCancelled':
						case 'onInstallFailed':
						case 'onInstallCancelled':
							k._xpi_fallback();
							break;

						default:
							break;
					}
					if (c) {
						c += ' ';
						c += loadingIndicator;
						k.xpiWaitDialog.changeContent(c);
					}
				});
			});


			// Ugly hack...
			// Keep pinging the content script <-> injected script until we suddenly get no more messages
			var pingEventName = w.md5('ponyhoof_xpiWait_' + (+new Date()));
			contentEval(function(arg) {
				var timer;

				var reloadPage = function() {
					var content = document.getElementById('ponyhoof_dialog_update_xpiWait').getElementsByClassName('content');
					content = content[0];
					content.innerHTML = arg.successText;

					window.location.reload();
				};

				var startTimer = function() {
					window.clearTimeout(timer);
					timer = window.setTimeout(reloadPage, 2000);
				};

				document.documentElement.addEventListener(arg.pingEventName, function(ev) {
					if (ev.detail === 'ping') {
						startTimer();
					} else {
						reloadPage();
					}
				}, false);

				startTimer();
			}, {'pingEventName': pingEventName, 'successText': successText});

			w.setInterval(function() {
				var ev = d.createEvent('CustomEvent');
				ev.initCustomEvent(pingEventName, true, true, 'ping');
				d.documentElement.dispatchEvent(ev);
			}, 500);

			w.setTimeout(k._xpi_fallback, 15000);
		};

		k._xpi_fallback = function() {
			if (k.xpiOneClickSuccess) {
				return;
			}
			k.xpiOneClickSuccess = true;

			k.xpiWaitDialog.close();
			k._xpi_showDialog();
		};

		k._xpi_showDialog = function() {
			if (k.update_json.xpi) {
				var c = '';
				c += "Firefox may prompt a security warning at the top-left, click <strong>Allow</strong>.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/firefoxv26/firefox_xpi_1_facebook.png' alt='' width='410' height='145' class='ponyhoof_image_shadow'><br>";
				c += "When you see the Software Installation dialog, click <strong>Install Now</strong>. The update will load after you reload Facebook, you do not need to restart Firefox.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/firefoxv26/firefox_xpi_install.png' alt='' width='300' height='380' class='ponyhoof_image_shadow'>";
				
				var bottom = '';
				bottom += '<div class="lfloat hidden_elem"><a href="#" class="retry">Retry</a></div>';
				bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">'+CURRENTLANG['reloadNow']+'</span></a>';
				bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">'+CURRENTLANG['notNow']+'</span></a>';
				
				k.xpiDialog = new Dialog('update_xpi');
				k.xpiDialog.alwaysModal = true;
				k.xpiDialog.create();
				k.xpiDialog.changeTitle(CURRENTLANG['updater_title']);
				k.xpiDialog.changeContent(c);
				k.xpiDialog.changeBottom(bottom);

				var retry = k.xpiDialog.dialog.getElementsByClassName('retry');
				if (retry.length) {
					retry = retry[0];
					retry.href = k.update_json.xpi;
					removeClass(retry.parentNode, 'hidden_elem');
				}
				k._initReloadButtons(k.xpiDialog);

				try {
					USW.InstallTrigger.install({
						"Ponyhoof": {
							URL: k.update_json.xpi
							,IconURL: 'https://hoof.little.my/files/app32.png'
						}
					});
				} catch (e) {
					dir(e);
				}
			} else {
				top.location.href = 'http://jointheherd.little.my';
			}
		};

		k.mxaddonDialog = null;
		k.mxaddon = function() {
			if (k.mxaddonDialog) {
				k.mxaddonDialog.show();
				return;
			}

			injectManualStyle('#ponyhoof_dialog_update_mxaddon .generic_dialog_popup, #ponyhoof_dialog_update_mxaddon .popup {width:500px;}', 'update_mxaddon');

			var c = "Click <strong>Update</strong> when you see this dialog. The update will load after you reload Facebook.<br><br><"+"img src='"+THEMEURL+"_welcome/guide/maxthon/update.png' alt='' width='446' height='419' class='ponyhoof_image_shadow'>";
			
			var bottom = '';
			bottom += '<div class="lfloat"><a href="#" class="retry hidden_elem">Retry</a></div>';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">'+CURRENTLANG['reloadNow']+'</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">'+CURRENTLANG['notNow']+'</span></a>';
			
			k.mxaddonDialog = new Dialog('update_mxaddon');
			k.mxaddonDialog.alwaysModal = true;
			k.mxaddonDialog.create();
			k.mxaddonDialog.changeTitle(CURRENTLANG['updater_title']);
			k.mxaddonDialog.changeContent(c);
			k.mxaddonDialog.changeBottom(bottom);

			var retry = k.mxaddonDialog.dialog.getElementsByClassName('retry');
			if (retry.length) {
				retry = retry[0];
				retry.addEventListener('click', function(e) {
					e.preventDefault();
					k._mxaddonInstallNow();
				}, false);
				removeClass(retry, 'hidden_elem');
			}
			k._initReloadButtons(k.mxaddonDialog);

			k._mxaddonInstallNow();
		};

		k._mxaddonInstallNow = function() {
			try {
				w.external.mxCall('InstallApp', k.update_json.mxaddon);
			} catch (e) {
				dir(e);
			}
		};

		k._initReloadButtons = function(dialog) {
			$$(dialog.dialog, '.reloadNow', function(ele) {
				ele.addEventListener('click', function() {
					if (!hasClass(this, 'uiButtonDisabled')) {
						dialog.canCloseByEscapeKey = false;
						$$(dialog.dialog, '.uiButton', function(ele) {
							addClass(ele, 'uiButtonDisabled');
						});
						w.location.reload();
					}
					return false;
				}, false);
			});

			$$(dialog.dialog, '.notNow', function(ele) {
				ele.addEventListener('click', function() {
					if (!hasClass(this, 'uiButtonDisabled')) {
						dialog.close();
					}
					return false;
				});
			}, false);
		};
	};
	
	var BrowserPoniesHoof = function() {
		var k = this;
		
		k.dialog = null;
		k.url = 'https://hoof.little.my/_browserponies/';
		k.initLoaded = false;
		k.ponies = [];
		k.ponySelected = 'RANDOM';
		k.doneCallback = function() {};
		k.runWhenDone = false;

		k.selectPoniesMenu = null;
		k.selectPoniesButton = null;

		k.errorDialog = null;
		k.errorDialogShown = false;
		
		k.run = function() {
			if (!k.initLoaded) {
				k.runWhenDone = true;
				k._init();

				w.setTimeout(function() {
					if (!k.initLoaded) {
						if (k.errorCallback) {
							k.errorCallback('timeout');
						}
					}
				}, 15000);

				return;
			}

			k.spawnPony(k.ponySelected);

			if (k.doneCallback) {
				k.doneCallback();
			}
		};

		k._init = function() {
			k.errorDialogShown = false;

			k._loadFile('BrowserPoniesBaseConfig.json', k._loadedConfig);
		};

		// Loads the file safely from extension if it is available
		k._loadFile = function(file, callback) {
			var completed = function(response) {
				if (response.val === 'success') {
					callback(response.file);
				} else {
					if (k.errorCallback) {
						k.errorCallback(response.error);
					}
				}
			};

			var details = {'command': 'getExtFile', 'file': 'browserponies/' + file};
			switch (STORAGEMETHOD) {
				case 'chrome':
					chrome_sendMessage(details, completed);
					break;

				case 'opera':
					opera_sendMessage(details, completed);
					break;

				case 'safari':
					safari_sendMessage(details, completed);
					break;

				case 'xpi':
					xpi_sendMessage(details, completed);
					break;

				case 'mxaddon':
					mxaddon_sendMessage(details, completed);
					break;

				default:
					k._getAjax(k.url + file + '?userscript_version=' + VERSION, function(response) {
						callback(response.responseText);
					});
					break;
			}
		};

		k._loadedConfig = function(file) {
			var tempPonies;
			try {
				tempPonies = JSON.parse(file);
			} catch (e) {
				dir(e);
				if (k.errorCallback) {
					k.errorCallback(file);
				}
				return;
			}
			contentEval('var BrowserPoniesBaseConfig = ' + file);

			for (var i = 0, len = tempPonies.ponies.length; i < len; i += 1) {
				var pony = tempPonies.ponies[i].ini.split(/\r?\n/);
				for (var j = 0, jLen = pony.length; j < jLen; j += 1) {
					var temp = pony[j].split(',');
					if (temp && temp[0].toLowerCase() === 'name') {
						k.ponies.push(temp[1].replace(/\"/g, ''));
						break;
					}
				}
			}

			k._loadFile('browserponies.js', k._loadedScript);
		};

		k._loadedScript = function(file) {
			contentEval(file);
			k.initLoaded = true;

			contentEval(function(arg) {
				try {
					(function(cfg) {
						if (typeof(window.BrowserPoniesConfig) === 'undefined') {
							window.BrowserPoniesConfig = {};
						}
						window.BrowserPonies.setBaseUrl(cfg.baseurl);
						if (!window.BrowserPoniesBaseConfig.loaded) {
							window.BrowserPonies.loadConfig(window.BrowserPoniesBaseConfig);
							window.BrowserPoniesBaseConfig.loaded = true;
						}
						window.BrowserPonies.loadConfig(cfg);
					})({"baseurl":arg.baseurl,"fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1});
				} catch (e) {
					if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to BrowserPonies");
						console.dir(e);
					}
				}
			}, {'baseurl': k.url});

			if (k.runWhenDone) {
				k.run();
			}

			if (k.errorDialog) {
				k.errorDialog.close();
			}
		};

		k._getAjax = function(url, callback) {
			try {
				ajax({
					method: 'GET'
					,url: url
					,onload: function(response) {
						if (response.status != 200) {
							if (k.errorCallback) {
								k.errorCallback(response);
							}
							return;
						}
						
						callback(response);
					}
					,onerror: function(response) {
						if (k.errorCallback) {
							k.errorCallback(response);
						}
					}
				});
			} catch (e) {
				if (k.errorCallback) {
					k.errorCallback(e);
				}
			}
		};
		
		k.createDialog = function() {
			if ($('ponyhoof_dialog_browserponies')) {
				k.dialog.show();
				return;
			}
			
			k.injectStyle();
			
			var c = '';
			c += '<div id="ponyhoof_bp_select"></div><br>';
			c += '<a href="#" class="uiButton uiButtonConfirm" role="button" id="ponyhoof_bp_more"><span class="uiButtonText">MORE PONY!</span></a><br><br>';
			c += '<a href="#" class="uiButton" role="button" id="ponyhoof_bp_close"><span class="uiButtonText">Hide this</span></a><br><br>';
			c += '<a href="#" class="uiButton" role="button" id="ponyhoof_bp_remove"><span class="uiButtonText">Reset</span></a>';
			
			k.dialog = new Dialog('browserponies');
			k.dialog.canCloseByEscapeKey = false;
			k.dialog.canCardspace = false;
			k.dialog.noTitle = true;
			k.dialog.noBottom = true;
			k.dialog.create();
			k.dialog.changeContent(c);
			
			$('ponyhoof_bp_more').addEventListener('click', k.morePonies, false);
			$('ponyhoof_bp_close').addEventListener('click', k.closeDialog, false);
			$('ponyhoof_bp_remove').addEventListener('click', k.clearAll, false);

			k.selectPoniesMenu = new Menu('browserponies_select', $('ponyhoof_bp_select'));
			k.selectPoniesMenu.rightFaced = true;
			k.selectPoniesMenu.buttonTextClipped = 59;
			k.selectPoniesButton = k.selectPoniesMenu.createButton("(Random)");
			k.selectPoniesMenu.searchNoResultsMessage = "No ponies :(";
			k.selectPoniesMenu.createMenu();
			k.selectPoniesMenu.attachButton();

			k.selectPoniesMenu.createMenuItem({
				html: "(Random)"
				,check: true
				,unsearchable: true
				,onclick: function(menuItem, menuClass) {
					k._select_spawn(menuItem, menuClass, 'RANDOM');
				}
			});
			for (var code in k.ponies) {
				if (k.ponies.hasOwnProperty(code)) {
					k._select_item(code);
				}
			}

			k.dialog.show();
		};
		
		k._select_item = function(code) {
			var pony = k.ponies[code];
			k.selectPoniesMenu.createMenuItem({
				html: pony
				,onclick: function(menuItem, menuClass) {
					k._select_spawn(menuItem, menuClass, pony);
				}
			});
		};

		k._select_spawn = function(menuItem, menuClass, pony) {
			menuClass.changeChecked(menuItem);
			menuClass.close();

			if (pony === 'RANDOM') {
				menuClass.changeButtonText("(Random)");
			} else {
				menuClass.changeButtonText(pony);
			}

			k.ponySelected = pony;
			k.spawnPony(pony);
		};

		k.spawnPony = function(pony) {
			contentEval(function(arg) {
				try {
					if (arg.pony === 'RANDOM') {
						window.BrowserPonies.spawnRandom();
					} else {
						window.BrowserPonies.spawn(arg.pony);
					}
					if (!window.BrowserPonies.running()) {
						window.BrowserPonies.start();
					}
				} catch (e) {
					if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to BrowserPonies");
						console.dir(e);
					}
				}
			}, {'pony': pony});
		};

		k.createErrorDialog = function(response) {
			if (!k.errorDialogShown) {
				dir(response);
				k.errorDialog = createSimpleDialog('browserponies_error', "Browser Ponies derp'd", "Whoops, there was a problem loading Browser Ponies. Please try again later.<br><br>If you keep seeing this error, please update to the latest version of Ponyhoof if available and <a href=\""+w.location.protocol+PONYHOOF_URL+"\" data-hovercard=\"/ajax/hovercard/page.php?id="+PONYHOOF_PAGE+"\">visit and post to the Ponyhoof page for help</a>.");

				k.errorDialogShown = true;
			}
		};

		k.injectStyle = function() {
			var css = '';
			css += '#ponyhoof_dialog_browserponies .generic_dialog {z-index:100000000 !important;}';
			css += '#ponyhoof_dialog_browserponies .generic_dialog_popup {width:'+(88+8+8+8+10+10)+'px;margin:'+(38+8)+'px 8px 0 auto;}';
			css += 'body.hasSmurfbar #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-top:'+(42+8)+'px;}';
			css += 'body.hasVoiceBar #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-top:'+(56+8)+'px;}';
			css += 'body.hasSmurfbar.hasVoiceBar #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-top:'+(70+8)+'px;}';
			css += 'body.hasViewasChromeBar #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-top:'+(76+8)+'px;}';
			css += 'body.hasSmurfbar.hasViewasChromeBar #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-top:'+(80+8)+'px;}';
			css += '.sidebarMode #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-right:213px;}';
			css += '._4g5r #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-right:8px;}';
			css += '#ponyhoof_dialog_browserponies .popup {width:'+(88+8+8+8)+'px;margin:0;opacity:.6;-webkit-transition:opacity .3s linear;-moz-transition:opacity .3s linear;-o-transition:opacity .3s linear;transition:opacity .3s linear;}';
			css += '#ponyhoof_dialog_browserponies .popup:hover {opacity:1;}';
			css += '#ponyhoof_dialog_browserponies .content {background:#F2F2F2;text-align:center;}';
			css += '#ponyhoof_dialog_browserponies .uiButton {text-align:left;}';
			css += '#browser-ponies img {-webkit-user-select:none;-moz-user-select:-moz-none;user-select:none;}';
			injectManualStyle(css, 'browserponies');
		};
		
		k.copyrightDialog = function() {
			createSimpleDialog('browserponies_copyright', "Browser Ponies", "<a href='http://panzi.github.io/Browser-Ponies/' target='_blank'>Browser Ponies</a> is created by Mathias Panzenb&ouml;ck, licensed under the <a href='http://opensource.org/licenses/mit-license.html' target='_blank'>MIT License</a>. Based on Desktop Ponies written by <a href='mailto:random.anonymous.pony@gmail.com'>random.anonymous.pony@gmail.com</a>");
		};

		k.morePonies = function(e) {
			k.spawnPony(k.ponySelected);
			if (e) {
				e.preventDefault();
			}
		};

		k.closeDialog = function(e) {
			k.dialog.close();
			if (e) {
				e.preventDefault();
			}
		};

		k.clearAll = function(e) {
			//k.closeDialog();
			contentEval(function(arg) {
				try {
					window.BrowserPonies.unspawnAll();
					window.BrowserPonies.stop();
				} catch (e) {
					if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to BrowserPonies");
						console.dir(e);
					}
				}
			}, {});
			if (e) {
				e.preventDefault();
			}
		};
	};
	
	// Options
	var Options = function() {
		var k = this;
		
		k.dialog = null;
		k.saveButton = null;
		
		k.needToSaveLabel = false;
		k.needToRefresh = false;
		k.canSaveSettings = true;
		
		k._stack = CURRENTSTACK;
		
		k.created = false;
		k.create = function() {
			// Did we create our Options interface already?
			if ($('ponyhoof_dialog_options')) {
				k._refreshDialog();
				return false;
			}
			
			k.injectStyle();
			
			if (!runMe) {
				var extra = '';
				if (ISCHROME) {
					extra = '<br><br><a href="http://jointheherd.little.my" target="_top">Please update to the latest version of Ponyhoof here.</a>';
				}
				
				k.dialog = new Dialog('options_force_run');
				k.dialog.create();
				k.dialog.changeTitle("Ponyhoof does not run on "+w.location.hostname);
				k.dialog.changeContent("Unfortunately, your browser stores settings seperately for each domain ("+w.location.protocol+"//www.facebook.com is different from "+w.location.protocol+"//"+w.location.hostname+")"+extra);
				k.dialog.addCloseButton();
				return;
			}
			
			var c = '';
			c += '<div class="ponyhoof_tabs clearfix">';
				c += '<a href="#" class="active" data-ponyhoof-tab="main">'+CURRENTLANG.options_tabs_main+'</a>';
				c += '<a href="#" class="ponyhoof_show_if_injected" data-ponyhoof-tab="background">'+CURRENTLANG.options_tabs_background+'</a>';
				c += '<a href="#" class="ponyhoof_show_if_injected" data-ponyhoof-tab="sounds">'+CURRENTLANG.options_tabs_sounds+'</a>';
				c += '<a href="#" data-ponyhoof-tab="extras">'+CURRENTLANG.options_tabs_extras+'</a>';
				c += '<a href="#" data-ponyhoof-tab="advanced">'+CURRENTLANG.options_tabs_advanced+'</a>';
				c += '<a href="#" data-ponyhoof-tab="about">'+CURRENTLANG.options_tabs_about+'</a>';
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_main" style="display:block;">';
			//c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_main">';
				c += '<div class="clearfix">';
				c += renderBrowserConfigWarning();

				if (ISUSINGPAGE || ISUSINGBUSINESS) {
					c += '<a href="#" ajaxify="/ajax/sharer/?s=18&amp;p[]='+PONYHOOF_PAGE+'" rel="dialog" class="uiButton uiButtonSpecial rfloat ponyhoof_noShareIsCare" role="button" data-hover="tooltip" data-tooltip-alignh="right" aria-label="'+CURRENTLANG['fb_share_tooltip']+'"><span class="uiButtonText">Share with your pals!</span></a>';
				}
				
				c += '<div class="ponyhoof_show_if_injected">Select your favorite character:</div>';
				c += '<div class="ponyhoof_hide_if_injected">Select your favorite character to re-enable Ponyhoof:</div>';
				c += '<div id="ponyhoof_options_pony"></div>';
				c += '<div id="ponyhoof_options_randomPonies" class="ponyhoof_menu_withlabel hidden_elem"><span class="ponyhoof_menu_label">Characters to randomize: </span></div>';
				c += '<div id="ponyhoof_options_likebox_div" class="notPage notBusiness"><iframe src="about:blank" id="ponyhoof_options_likebox" scrolling="no" frameborder="0" allowtransparency="true" class="ponyhoof_options_framerefresh"></iframe></div>';
				c += '<a href="'+w.location.protocol+PONYHOOF_URL+'" class="ponyhoof_options_linkclick ponyhoof_options_fatlink" id="ponyhoof_options_visitPage"></a>';
				c += '<a href="'+w.location.protocol+'//'+w.location.hostname+'/messages/'+PONYHOOF_PAGE+'" class="ponyhoof_options_linkclick ponyhoof_options_fatlink" ajaxify="/ajax/messaging/composer.php?ids%5B0%5D='+PONYHOOF_PAGE+'" rel="dialog">' + CURRENTLANG['settings_main_reportProblem'] + '</a>';
				c += '<a href="#" class="ponyhoof_options_fatlink" id="ponyhoof_browserponies">' + CURRENTLANG['settings_main_browserPonies'] + '<span class="ponyhoof_loading"></span></a>';
				c += '<div class="ponyhoof_show_if_injected"><a href="#" class="ponyhoof_options_fatlink" id="ponyhoof_options_disable">' + CURRENTLANG['settings_main_disable'] + '</a></div>';

					c += '<div class="ponyhoof_message uiBoxYellow ponyhoof_updater_newVersion">';
						c += '<a href="#" class="uiButton uiButtonSpecial rfloat ponyhoof_updater_updateNow" role="button"><span class="uiButtonText">Update now</span></a>';
						c += '<span class="wrap">An update (v<span class="ponyhoof_updater_versionNum"></span>) for Ponyhoof is available.</span>';
					c += '</div>';
					c += '<div class="ponyhoof_message uiBoxRed ponyhoof_updater_error">Ponyhoof cannot check for updates at this moment. <a href="'+w.location.protocol+PONYHOOF_URL+'" class="ponyhoof_options_linkclick">Please visit the Ponyhoof page for the latest news.</a></div>';
				c += '</div>';
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_background">';
				c += '<div class="ponyhoof_show_if_injected">';
					c += CURRENTLANG['settings_background_intro'];
					c += '<ul class="ponyhoof_options_fatradio clearfix">';
						c += '<li id="ponyhoof_options_background_cutie" data-ponyhoof-background="cutie"><a href="#"><span>Cutie mark</span><div class="wrap"><i></i></div></a></li>';
						c += '<li id="ponyhoof_options_background_loginbg" data-ponyhoof-background="loginbg"><a href="#"><span>Background</span><div class="wrap"><i></i></div></a></li>';
						c += '<li id="ponyhoof_options_background_custom" data-ponyhoof-background="custom"><a href="#"><span>Custom</span><div class="wrap"><i></i></div></a></li>';
					c += '</ul>';

					c += '<div class="ponyhoof_message uiBoxRed hidden_elem" id="ponyhoof_options_background_error"></div>';
					c += '<div class="ponyhoof_message uiBoxYellow hidden_elem" id="ponyhoof_options_background_message"></div>';
					c += '<div id="ponyhoof_options_background_drop">';
						c += '<div id="ponyhoof_options_background_drop_notdrop">';
							c += 'Drag and drop a pony pic here to customize your background. <a href="#" class="uiHelpLink" data-hover="tooltip" data-tooltip-alignh="center" aria-label=""></a><br><br>';
							c += '<span class="ponyhoof_menu_label">Or browse for a pony pic: </span>';
							c += '<div id="ponyhoof_options_background_selectOuterWrap"><a href="#" class="uiButton" role="button" aria-hidden="true" tabindex="-1"><span class="uiButtonText">' + CURRENTLANG['browseWithEllipsis'] + '</span></a><div id="ponyhoof_options_background_selectFileWrap"><input type="file" id="ponyhoof_options_background_select" accept="image/*" title="' + CURRENTLANG['chooseAFile'] + '"></div></div>';
						c += '</div>';
						c += '<div id="ponyhoof_options_background_drop_dropping">Drop here</div>';
					c += '</div>';
				c += '</div>';
			c += '</div>';

			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_sounds">';
				c += '<div class="ponyhoof_show_if_injected">';
					c += '<div class="ponyhoof_message uiBoxRed hidden_elem unavailable">' + CURRENTLANG['settings_sounds_unavailable'] + '</div>';

					var soundsText = CURRENTLANG['settings_sounds'];
					if (ISUSINGPAGE || ISUSINGBUSINESS) {
						soundsText = CURRENTLANG['settings_sounds_noNotification'];
					}

					c += '<div class="available">';
						c += '<div class="ponyhoof_message uiBoxRed usingPage">' + CURRENTLANG['settings_sounds_unavailableUsingPage'] + '</div>';
						c += k.generateCheckbox('sounds', soundsText, {customFunc: k.soundsClicked});
						c += '<div class="notPage notBusiness">';
							c += '<div id="ponyhoof_options_soundsSettingsWrap"><br>';
								c += '<div id="ponyhoof_options_soundsSetting" class="ponyhoof_menu_withlabel"><span class="ponyhoof_menu_label">Notification sound: </span></div>';
								c += '<div id="ponyhoof_options_soundsNotifType" class="ponyhoof_menu_withlabel ponyhoof_menu_labelbreak"><span class="ponyhoof_menu_label">Don\'t play sounds for these types of notifications:</span></div>';
								c += k.generateVolumeRange('soundsVolume', "Volume: ", 1, 100);
							c += '</div>';
						c += '</div>';

						c += '<div class="notPage notBusiness"><br>';
						c += '<span class="ponyhoof_dialog_header">' + CURRENTLANG['settings_sounds_chat'] + '</span>';
							c += '<div class="ponyhoof_message uiBoxYellow notPage hidden_elem" id="ponyhoof_options_soundsChatSoundWarning">';
								c += '<a href="#" class="uiButton uiButtonConfirm rfloat" role="button"><span class="uiButtonText">Enable now</span></a>';
								c += '<span class="wrap">The chat sound option built into Facebook needs to be enabled to use Ponyhoof chat sounds.</span>';
							c += '</div>';
							c += k.generateCheckbox('chatSound', CURRENTLANG['settings_sounds_chatSound'], {customFunc:k.chatSound});
								c += '<div id="ponyhoof_options_soundsChatWrap">';
									c += '<div id="ponyhoof_options_soundsChatSetting" class="ponyhoof_menu_withlabel"><span class="ponyhoof_menu_label">Chat sound: </span></div>';
									c += k.generateVolumeRange('chatSoundVolume', "Chat sound volume: ", 1, 100);
								c += '</div>';
						c += '</div>';
					c += '</div>'; // .available
				c += '</div>';
				c += '<div class="ponyhoof_hide_if_injected ponyhoof_message uiBoxRed">';
					c += 'You must enable Ponyhoof to use Ponyhoof sounds.';
				c += '</div>';
			c += '</div>';

			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_extras">';
				c += '<div class="ponyhoof_show_if_injected">';
					c += k.generateCheckbox('pinkieproof', CURRENTLANG['settings_extras_pinkieproof'], {title: CURRENTLANG['settings_extras_pinkieproof_explain']});
				c += '</div>';
				c += k.generateCheckbox('forceEnglish', "Always use Ponyhoof in English", {title:"Ponyhoof tries to use your Facebook language, but you can force Ponyhoof to always use English", refresh:true});
				c += '<div class="ponyhoof_show_if_injected">';
					c += k.generateCheckbox('disable_emoticons', CURRENTLANG['settings_extras_disable_emoticons']);
					c += '<div id="ponyhoof_options_costume" class="ponyhoof_menu_withlabel"><span class="ponyhoof_menu_label">Appearance: </span></div>';
				c += '</div>';
				c += '<div class="ponyhoof_hide_if_injected"><br></div>';

				c += '<span class="ponyhoof_dialog_header">Multi-user</span>';
				c += k.generateCheckbox('allowLoginScreen', CURRENTLANG['settings_extras_allowLoginScreen'], {global: true, customFunc: k.allowLoginScreenClicked});
				c += k.generateCheckbox('runForNewUsers', CURRENTLANG['settings_extras_runForNewUsers'], {title: CURRENTLANG['settings_extras_runForNewUsers_explain'], global: true});
				c += '<br>';

				c += '<div class="ponyhoof_show_if_injected">';
					c += '<span class="ponyhoof_dialog_header">' + CURRENTLANG['settings_extras_performance'] + '</span>';
					c += k.generateCheckbox('disable_animation', CURRENTLANG['settings_extras_disable_animation']);
					c += k.generateCheckbox('disableDomNodeInserted', CURRENTLANG['settings_extras_disableDomNodeInserted'], {title: CURRENTLANG['settings_extras_disableDomNodeInserted_explain'], customFunc: k.disableDomNodeInsertedClicked});
				c += '</div>';
				
				c += '<a href="#" class="ponyhoof_options_fatlink" id="ponyhoof_options_resetSettings" data-hover="tooltip" aria-label="' + CURRENTLANG['settings_extras_resetSettings_explain'] + '">' + CURRENTLANG['settings_extras_resetSettings'] + '</a>';
				c += '<a href="http://ponyhoof.little.my/faq" class="ponyhoof_options_fatlink" target="_blank" data-hover="tooltip" aria-label="' + CURRENTLANG['settings_extras_faq_explain'] + '">' + CURRENTLANG['settings_extras_faq'] + '</a>';
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_advanced">';
				c += '<div class="ponyhoof_message uiBoxYellow">These features are unsupported and used for debugging. This should be used by advanced users only.</div><br>';
				c += '<span class="ponyhoof_show_if_loaded inline">Style version <span class="ponyhoof_VERSION_CSS"></span><br><br></span>';

				c += '<textarea id="ponyhoof_options_technical" READONLY spellcheck="false"></textarea><br><br>';
				
				if (STORAGEMETHOD === 'localstorage') {
					c += '<span class="ponyhoof_dialog_header">localStorage dump</span>';
					c += '<textarea id="ponyhoof_options_dump" READONLY spellcheck="false"></textarea><br><br>';
				}
				
				c += '<div class="hidden_elem">';
					c += '<span class="ponyhoof_dialog_header">Chat config</span>';
					c += '<textarea id="ponyhoof_options_chatconfig" READONLY spellcheck="false"></textarea><br><br>';
				c += '</div>';

				c += '<div class="hidden_elem">';
					c += '<span class="ponyhoof_dialog_header">MercuryConfig</span>';
					c += '<textarea id="ponyhoof_options_mercuryconfig" READONLY spellcheck="false"></textarea><br><br>';
				c += '</div>';

				c += '<div class="ponyhoof_show_if_injected">';
					c += '<span class="ponyhoof_dialog_header">Custom CSS</span>';
					c += '<textarea id="ponyhoof_options_customcss" placeholder="Enter any custom CSS to load after Ponyhoof is loaded." title="Enter any custom CSS to load after Ponyhoof is loaded." spellcheck="false"></textarea><br>';
					c += '<a href="#" class="uiButton" role="button" id="ponyhoof_options_customcss_preview"><span class="uiButtonText">Preview</span></a><br><br>';
				c += '</div>';
				
				c += '<span class="ponyhoof_dialog_header">Settings</span>';
				c += '<textarea id="ponyhoof_options_debug_settings" spellcheck="false"></textarea>';
				c += '<a href="#" class="uiButton" role="button" id="ponyhoof_options_debug_settings_export"><span class="uiButtonText">Export settings</span></a> <a href="#" class="uiButton" role="button" id="ponyhoof_options_debug_settings_saveall"><span class="uiButtonText">Import settings</span></a><br><br>';
				
				c += '<span class="ponyhoof_dialog_header">Other</span>';
				c += '<div class="ponyhoof_hide_if_injected ponyhoof_message uiBoxYellow">';
					c += 'You must enable Ponyhoof to use custom CSS or dump debug data.';
				c += '</div>';

				c += k.generateCheckbox('debug_exposed', "Always show Debug tab");
				c += k.generateCheckbox('debug_slow_load', "Disable fast load");
				c += '<div class="ponyhoof_show_if_injected">';
					c += k.generateCheckbox('debug_dominserted_console', "Dump DOMNodeInserted data to console");
					c += k.generateCheckbox('debug_disablelog', "Disable console logging", {customFunc:k.debug_disablelog});
					c += k.generateCheckbox('debug_noMutationObserver', "Use legacy HTML detection (slower)", {refresh:true});
					c += k.generateCheckbox('debug_mutationDebug', "Dump mutation debug info to console");
					c += k.generateCheckbox('debug_betaFacebookLinks', "Rewrite links on beta.facebook.com", {refresh:true});
					if (w.performance) {
						c += k.generateCheckbox('debug_performanceTiming', "Enable performance timing", {refresh:true});
					}
					c += '<a href="#" id="ponyhoof_options_tempRemove" class="ponyhoof_options_fatlink">Remove style</a>';
				c += '</div>';
				c += '<a href="#" id="ponyhoof_options_sendSource" class="ponyhoof_options_fatlink">Send page source</a>';
				if (STORAGEMETHOD != 'mxaddon') {
					c += '<a href="#" class="ponyhoof_options_fatlink" id="ponyhoof_options_clearLocalStorage" data-hover="tooltip">Reset all settings (including global)</a>';
				}
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_about">';
				c += '<div class="clearfix">';
				c += '<div class="top">';
				c += '<div class="rfloat"><a href="'+w.location.protocol+PONYHOOF_URL+'" class="ponyhoof_options_linkclick" data-hovercard="/ajax/hovercard/page.php?id='+PONYHOOF_PAGE+'" id="ponyhoof_options_devpic" data-hovercard-instant="1"><'+'img src="'+THEMEURL+'icon100.png" alt="" width="50" height="50"></a>';
				c += '</div>';
				c += '<strong>Ponyhoof v'+VERSION+'</strong><br>';
				c += 'By <a href="'+w.location.protocol+'//'+getFbDomain()+'/ngyikp" class="ponyhoof_options_linkclick" data-hovercard="/ajax/hovercard/user.php?id=100000971648506">Ng Yik Phang</a> and <a href="http://ponyhoof.little.my/credits" class="ponyhoof_options_linkclick" data-hover="tooltip" aria-label="View all the ponies, artists and contributors that made Ponyhoof come to life">many artists/contributors</a>';
				c += '</div>';
				c += '<a href="'+w.location.protocol+PONYHOOF_URL+'" class="ponyhoof_options_linkclick ponyhoof_options_fatlink notBusiness" data-hovercard="/ajax/hovercard/page.php?id='+PONYHOOF_PAGE+'">Send feedback and suggestions on our page</a>';
				if (ISCHROME || (STORAGEMETHOD === 'chrome' && !ISOPERABLINK)) {
					c += '<a href="http://ponyhoof.little.my/cwsreview" target="_blank" class="ponyhoof_options_fatlink">Rate us 5 stars and write a review on the Chrome Web Store</a>';
				}
				c += '<iframe src="about:blank" id="ponyhoof_options_twitter" allowtransparency="true" frameborder="0" scrolling="no"></iframe>';
				if (ISCHROME || STORAGEMETHOD === 'chrome') {
					c += '<div id="ponyhoof_options_plusone"><div class="g-plusone" data-size="medium" data-annotation="inline" data-width="443" data-href="https://chrome.google.com/webstore/detail/efjjgphedlaihnlgaibiaihhmhaejjdd"></div></div>';
				}

				c += '<div class="ponyhoof_options_aboutsection"><div class="inner">';
				c += '<strong>If you love Ponyhoof, then please help us a hoof and contribute to support development! Thanks!</strong><br><br>';
				c += '<div id="ponyhoof_donate" class="clearfix">';
				  c += '<div class="inner"><form name="_xclick" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" id="ponyhoof_options_donatepaypal"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="business" value="paypal@little.my"><input type="hidden" name="currency_code" value="USD"><input type="hidden" name="item_name" value="Support Ponyhoof"><a href="#" id="ponyhoof_options_donatepaypal_link">Contribute with PayPal</a></form></div>';
				  c += '<div class="inner"><iframe src="about:blank" id="ponyhoof_donate_flattr_iframe" allowtransparency="true" frameborder="0" scrolling="no"></iframe></div>'; //<a href="//flattr.com/thing/641591/Ponyhoof" target="_blank" id="ponyhoof_donate_flattr">Flattr this!</a>
				c += '</div>';
				c += '</div></div>';

				c += '<div class="ponyhoof_options_aboutsection"><div class="inner">The Ponyhoof extension for Facebook is not affiliated or endorsed by Facebook and/or Hasbro in any way. MY LITTLE PONY, FRIENDSHIP IS MAGIC and all related characters are trademarks of Hasbro. &copy; '+(new Date().getFullYear())+' Hasbro. All Rights Reserved.</div></div>';
				c += '</div>';
			c += '</div>';
			
			var bottom = '';
			bottom += '<div class="lfloat"><span class="ponyhoof_updater_checking">Checking for updates...</span><span class="ponyhoof_updater_latest"></span></div>';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_options_save"><span class="uiButtonText">'+CURRENTLANG['close']+'</span></a>';
			
			k.dialog = new Dialog('options');
			k.dialog.create();
			k.dialog.changeTitle(CURRENTLANG.options_title);
			k.dialog.changeContent(c);
			k.dialog.changeBottom(bottom);
			k.dialog.onclose = k.dialogOnClose;
			k.dialog.onclosefinish = k.dialogOnCloseFinish;
			k.created = true;
			
			// After
			k.dialog.dialog.className += ' ponyhoof_dialog_localstorageWarningEmbedded';

			k.saveButton = $('ponyhoof_options_save');
			k.saveButton.addEventListener('click', k.saveButtonClick, false);
			
			var shareButton = k.dialog.dialog.getElementsByClassName('ponyhoof_noShareIsCare');
			if (shareButton.length && shareButton[0]) {
				shareButton[0].addEventListener('click', function() {
					k.dialog.close();
				}, false);
			}
			
			var l = k.dialog.dialog.getElementsByClassName('ponyhoof_options_linkclick');
			for (var i = 0, len = l.length; i < len; i += 1) {
				l[i].addEventListener('click', function() {
					k.dialog.close();
				}, false);
			}
			
			// Updater
			w.setTimeout(function() {
				var update = new Updater();
				update.checkForUpdates();
			}, 500);

			k.checkboxInit();
			k.tabsInit();

			k.changeUpdaterLatestText();
			k.changeVisitPageText();

			// @todo make k.mainInit non-dependant
			k.mainInit();
			
			k._refreshDialog();

			if (userSettings.debug_exposed) {
				addClass(k.dialog.dialog, 'ponyhoof_options_debugExposed');
			}
		};
		
		k._refreshDialog = function() {
			k.ki();
			k.disableDomNodeInserted();
			
			if (k.debugLoaded) {
				$('ponyhoof_options_technical').textContent = k.techInfo();
				//$('ponyhoof_options_linkedcss').textContent = k.linkedCss();
			}
		};
		
		k.debugLoaded = false;
		k.techInfo = function() {
			var cxPrivate = false;
			if (d.getElementsByClassName('-cx-PRIVATE-fbLayout__root').length) {
				cxPrivate = true;
			}

			var tech = SIG + " " + new Date().toString() + "\n";
			tech += "USERID: " + USERID + "\n";
			tech += "CURRENTPONY: " + CURRENTPONY + "\n";
			tech += "REALPONY: " + REALPONY + "\n";
			tech += "CURRENTSTACK: " + CURRENTSTACK.stack + "\n";
			tech += "STORAGEMETHOD: " + STORAGEMETHOD + "\n";
			tech += "DISTRIBUTION: " + DISTRIBUTION + "\n";
			if (STORAGEMETHOD === 'localstorage') {
				tech += "localStorage.length: " + w.localStorage.length + "\n";
			}
			tech += "\n";
			tech += "navigator.userAgent: " + w.navigator.userAgent + "\n";
			tech += "document.documentElement.className: " + d.documentElement.className + "\n";
			tech += "document.body.className: " + d.body.className + "\n";
			tech += "Has cx-PRIVATE: " + cxPrivate + "\n";
			tech += "window.location.href: " + w.location.href + "\n";
			tech += "\n";
			tech += k.linkedCss();
			tech += "\n";
			tech += k.linkedScript();
			tech += "\n";
			tech += k.linkedIframe();
			tech += "\n";

			return tech;
		};
		
		k.linkedCss = function() {
			var css = d.getElementsByTagName('link');
			var t = '';
			for (var i = 0, len = css.length; i < len; i += 1) {
				if (css[i].rel === 'stylesheet') {
					t += css[i].href + "\n";
				}
			}
			
			return t;
		};
		
		k.linkedScript = function() {
			var script = d.getElementsByTagName('script');
			var t = '';
			for (var i = 0, len = script.length; i < len; i += 1) {
				if (script[i].src) {
					t += script[i].src + "\n";
				}
			}
			
			return t;
		};
		
		k.linkedIframe = function() {
			var iframe = d.getElementsByTagName('iframe');
			var t = '';
			for (var i = 0, len = iframe.length; i < len; i += 1) {
				if (iframe[i].src && iframe[i].src.indexOf('://'+getFbDomain()+'/ai.php') == -1) {
					t += iframe[i].src + "\n";
				}
			}
			
			return t;
		};
		
		k.debugInfo = function() {
			if (k.debugLoaded) {
				return;
			}
			k.debugLoaded = true;
			
			// Custom CSS
			var customcss = $('ponyhoof_options_customcss');
			if (userSettings.customcss) {
				customcss.value = userSettings.customcss;
			}
			customcss.addEventListener('input', function() {
				if (!k.needsToRefresh) {
					k.needsToRefresh = true;
					k.updateCloseButton();
				}
			}, false);
			$('ponyhoof_options_customcss_preview').addEventListener('click', function() {
				if (!$('ponyhoof_style_customcss')) {
					injectManualStyle('', 'customcss');
				}
				
				$('ponyhoof_style_customcss').textContent = '/* ' + SIG + ' */' + customcss.value;
			}, false);
			
			if (STORAGEMETHOD === 'localstorage') {
				var dump = '';
				for (var i in w.localStorage) {
					if (w.localStorage.hasOwnProperty(i)) {
						dump += i + ": " + w.localStorage[i] + "\n";
					}
				}
				$('ponyhoof_options_dump').value = dump;
			}

			contentEval(function(arg) {
				try {
					if (typeof window.requireLazy === 'function') {
						window.requireLazy(['ChatConfig', 'MercuryConfig'], function(ChatConfig, MercuryConfig) {
							var config;
							config = ChatConfig.getDebugInfo();
							if (config) {
								var target = document.getElementById('ponyhoof_options_chatconfig');
								target.value = JSON.stringify(config);
								target.parentNode.className = '';
							}

							config = MercuryConfig;
							if (config) {
								var target = document.getElementById('ponyhoof_options_mercuryconfig');
								target.value = JSON.stringify(config);
								target.parentNode.className = '';
							}
						});
					}
				} catch (e) {
					if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to ChatConfig and MercuryConfig");
						console.dir(e);
					}
				}
			}, {});

			// Settings
			var settingsTextarea = $('ponyhoof_options_debug_settings');

			$('ponyhoof_options_debug_settings_export').addEventListener('click', function() {
				settingsTextarea.value = JSON.stringify(userSettings);
			}, false);

			$('ponyhoof_options_debug_settings_saveall').addEventListener('click', function(ev) {
				ev.preventDefault();

				var s;
				try {
					s = JSON.parse(settingsTextarea.value);
				} catch (e) {
					createSimpleDialog('debug_settingsKey_error', "Derp'd", "Invalid JSON<br><br><code>\n\n" + e.toString() + "</code>");
					return false;
				}

				if (w.confirm(SIG+" Are you sure you want to overwrite your settings? Facebook will be reloaded immediately after saving.")) {
					userSettings = s;
					saveSettings();
					w.location.reload();
				}
			}, false);

			// Other
			$('ponyhoof_options_tempRemove').addEventListener('click', k._debugRemoveStyle, false);
			k._debugNoMutationObserver();
			
			$('ponyhoof_options_sendSource').addEventListener('click', function() {
				if (w.confirm(SIG+" Are you sure you want to send the page source for debugging? Only the Ponyhoof developers can view the page. Please send the page source only when necessary.\n\nNote that it will take some time to upload, don't close the browser window until it is finished.")) {
					k.dialog.hide();

					var sourceSend = null;

					var temp = $('ponyhoof_options_technical').value;
					$('ponyhoof_options_technical').value = '';
					if ($('ponyhoof_sourceSend_input')) {
						$('ponyhoof_sourceSend_input').value = '';
						sourceSend = $('ponyhoof_sourceSend_input').parentNode;
					}

					var settings = {};
					for (var x in userSettings) {
						if (userSettings.hasOwnProperty(x)) {
							settings[x] = userSettings[x];
						}
					}
					settings['customBg'] = null;

					var t = d.documentElement.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
					t = '<!DOCTYPE html><html class="'+d.documentElement.className+'" id="'+d.documentElement.id+'"><!-- '+k.techInfo()+"\n\n"+JSON.stringify(settings)+' -->'+t+'</html>';

					if ($('ponyhoof_sourceSend_input')) {
						$('ponyhoof_sourceSend_input').value = t;
					} else {
						var sourceSendTxt = d.createElement('input');
						sourceSendTxt.type = 'hidden';
						sourceSendTxt.id = 'ponyhoof_sourceSend_input';
						sourceSendTxt.name = 'post';
						sourceSendTxt.value = t;

						sourceSend = d.createElement('form');
						sourceSend.method = 'POST';
						sourceSend.action = 'https://paste.little.my/post/';
						sourceSend.target = '_blank';
						sourceSend.appendChild(sourceSendTxt);
						d.body.appendChild(sourceSend);
					}

					sourceSend.submit();

					$('ponyhoof_options_technical').value = temp;
				}
				return false;
			}, false);
			
			$('ponyhoof_options_technical').textContent = k.techInfo();
			//$('ponyhoof_options_linkedcss').textContent = k.linkedCss();
		};

		k._debugRemoveStyle = function(ev) {
			ev.preventDefault();

			changeThemeSmart('NONE');

			d.removeEventListener('DOMNodeInserted', DOMNodeInserted, true);
			if (mutationObserverMain) {
				mutationObserverMain.disconnect();
			}
			
			$$($('fbNotificationsJewel'), '.uiHeaderTop .uiHeaderActions > a', function(link) {
				if (link.textContent === "Ponyhoof Sounds") {
					link.parentNode.removeChild(link.previousSibling);
					link.parentNode.removeChild(link);
				}
			});

			k.dialog.close();
		};

		k._debugNoMutationObserver = function() {
			var mutationObserver = w.WebKitMutationObserver || w.MutationObserver || false;
			if (!mutationObserver) {
				var option = $('ponyhoof_options_debug_noMutationObserver');
				option.disabled = true;
				option.checked = true;

				var label = $('ponyhoof_options_label_debug_noMutationObserver');
				addClass(label, 'ponyhoof_options_unavailable');
				label.setAttribute('data-hover', 'tooltip');
				label.setAttribute('aria-label', "The new HTML detection method is not supported on your browser. Please update your browser if possible.");
			}
		};

		k.mainInitLoaded = false;
		k.mainInit = function() {
			if (k.mainInitLoaded) {
				return;
			}

			// Pony selector
			var oldPony = CURRENTPONY;
			var oldRealPony = REALPONY;

			var ponySelector = new PonySelector($('ponyhoof_options_pony'), {});
			ponySelector.allowRandom = true;
			ponySelector.customClick = function(menuItem, menuClass) {
				//if (ponySelector.oldPony === 'NONE' || CURRENTPONY === 'NONE') {
					if (oldPony === 'NONE' && CURRENTPONY !== 'NONE') {
						extraInjection();
						runDOMNodeInserted();
					}
				//}
				//if (ponySelector.oldPony != 'NONE' && CURRENTPONY === 'NONE') {
				//	k.needsToRefresh = true;
				//}
				if (k._stack != CURRENTSTACK) {
					k.needsToRefresh = true;
				}
				if (oldPony !== CURRENTPONY) {
					k.needToSaveLabel = true;
				}
				k.updateCloseButton();

				k._showRandomIfNeeded();
				
				if (oldRealPony !== REALPONY) {
					var iframe = $('ponyhoof_options_likebox');
					fadeOut(iframe, function() {
						w.setTimeout(function() {
							k.reloadLikebox();

							iframe.style.display = '';
							removeClass(iframe, 'ponyhoof_fadeout');
						}, 250);
					});
				}

				oldPony = CURRENTPONY;
				oldRealPony = REALPONY;
			};
			ponySelector.createSelector();

			// Hide and show the hovercard/tooltips
			ponySelector.menu.onOpen = function() {
				k.showMainFlyouts(false);
			};
			ponySelector.menu.afterClose = function() {
				k.showMainFlyouts(true);
			};

			if (CURRENTPONY === 'RANDOM') {
				k._showRandomIfNeeded();
			}

			k.likebox();

			// Disable Ponyhoof
			$('ponyhoof_options_disable').addEventListener('click', k.disablePonyhoof, false);

			// Browser Ponies
			$('ponyhoof_browserponies').addEventListener('click', k.runBrowserPonies, false);
			k.showMainFlyouts(true);

			k.mainInitLoaded = true;
		};

		k.likebox = function() {
			if (!ISUSINGPAGE && !ISUSINGBUSINESS) {
				w.setTimeout(k.reloadLikebox, 500);
			}
		};

		k.reloadLikebox = function() {
			var url = 'https://' + getFbDomain() + '/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D' + PONYHOOF_PAGE + '&share=true&layout=standard&show_faces=true&action=like&colorscheme=light&ponyhoof_runme';
			var id = 'ponyhoof_options_likebox';

			switch (STORAGEMETHOD) {
				case 'chrome':
					//$(id).src = 'https://s-static.ak.facebook.com/common/redirectiframe.html#ponyhoof_likebox';
					$(id).src = 'https://www.facebook.com/common/redirectiframe.html#ponyhoof_likebox';

					ajax({
						method: 'GET'
						,url: url
						,onload: function(response) {
							contentEval(function(arg) {
								try {
									var likebox = document.getElementById(arg.id);
									likebox = (likebox.contentWindow) ? likebox.contentWindow : (likebox.contentDocument.document) ? likebox.contentDocument.document : likebox.contentDocument;
									likebox.document.open();
									likebox.document.write('<!DOCTYPE html><script>if (history && history.replaceState) {history.replaceState({}, "", "' + JSON.parse(arg.url) + '");}</script>' + JSON.parse(arg.content));
									likebox.document.close();
								} catch (e) {
								}
							}, {'content': JSON.stringify(response.responseText), 'id': id, 'url': JSON.stringify(url)});
						}
						,onerror: function(response) {}
					});
					break;

				default:
					$(id).src = url;
					break;
			}
		};

		k.showMainFlyouts = function(show) {
			var visitPage = $('ponyhoof_options_visitPage');
			var link = $('ponyhoof_browserponies');
			if (show) {
				link.setAttribute('data-hover', 'tooltip');
				link.setAttribute('aria-label', CURRENTLANG['settings_main_browserPonies_explain']);

				visitPage.setAttribute('data-hovercard', '/ajax/hovercard/page.php?id=' + PONYHOOF_PAGE);
			} else {
				link.removeAttribute('data-hover');
				link.removeAttribute('aria-label');
				link.removeAttribute('aria-owns');
				link.removeAttribute('aria-controls');
				link.removeAttribute('aria-haspopup');

				visitPage.removeAttribute('data-hovercard');
				visitPage.removeAttribute('aria-haspopup');
			}
		};

		k.extrasInitLoaded = false;
		k.extrasInit = function() {
			if (k.extrasInitLoaded) {
				return;
			}

			k.costumesInit();

			// Disable animations
			if (!supportsCssTransition()) {
				var option = $('ponyhoof_options_disable_animation');
				option.disabled = true;
				option.checked = true;

				var label = $('ponyhoof_options_label_disable_animation');
				addClass(label, 'ponyhoof_options_unavailable');
				label.setAttribute('data-hover', 'tooltip');
				label.setAttribute('aria-label', "Animations are not supported on your browser. Please update your browser if possible.");
			}

			// Reset settings
			$('ponyhoof_options_resetSettings').addEventListener('click', k.resetSettings, false);

			var clearLocalStorage = $('ponyhoof_options_clearLocalStorage');
			if (clearLocalStorage) {
				clearLocalStorage.addEventListener('click', k.clearStorage, false);
			}

			k.extrasInitLoaded = true;
		};

		k.extrasCostumeMenu = null;
		k.extrasCostumeButton = null;
		k.extrasCostumeMenuItemNormal = null;
		k.extrasCostumeMenuItems = {};
		k.costumesInit = function() {
			var desc = CURRENTLANG['settings_costumes_auto'];
			var check = true;
			if (userSettings.costume && doesCharacterHaveCostume(REALPONY, userSettings.costume)) {
				desc = COSTUMESX[userSettings.costume].name;
				check = false;
			}

			k.extrasCostumeMenu = new Menu('costume', $('ponyhoof_options_costume'));
			k.extrasCostumeButton = k.extrasCostumeMenu.createButton(desc);
			k.extrasCostumeButton.setAttribute('data-hover', 'tooltip');
			k.extrasCostumeButton.setAttribute('aria-label', CURRENTLANG.costume_tooltip);
			k.extrasCostumeMenu.canSearch = false;
			k.extrasCostumeMenu.createMenu();
			k.extrasCostumeMenu.attachButton();
			k.extrasCostumeMenuItemNormal = k.extrasCostumeMenu.createMenuItem({
				html: CURRENTLANG['settings_costumes_auto']
				,data: ''
				,check: check
				,onclick: function(menuItem, menuClass) {
					k._costumesInit_save(menuItem, menuClass, '');
				}
			});

			for (var code in COSTUMESX) {
				if (COSTUMESX.hasOwnProperty(code)) {
					k._costumesInit_item(code);
				}
			}

			changeThemeFuncQueue.push(function() {
				if (doesCharacterHaveCostume(REALPONY, userSettings.costume)) {
					k.extrasCostumeMenu.changeButtonText(COSTUMESX[userSettings.costume].name);
					k.extrasCostumeMenu.changeChecked(k.extrasCostumeMenuItems[userSettings.costume]);
				} else {
					k.extrasCostumeMenu.changeButtonText(CURRENTLANG['settings_costumes_auto']);
					k.extrasCostumeMenu.changeChecked(k.extrasCostumeMenuItemNormal);
				}

				for (var code in COSTUMESX) {
					if (COSTUMESX.hasOwnProperty(code)) {
						if (doesCharacterHaveCostume(REALPONY, code)) {
							removeClass(k.extrasCostumeMenuItems[code].menuItem, 'hidden_elem');
						} else {
							addClass(k.extrasCostumeMenuItems[code].menuItem, 'hidden_elem');
						}
					}
				}
			});
		};

		k._costumesInit_item = function(code) {
			var check = false;
			var extraClass = '';
			if (doesCharacterHaveCostume(REALPONY, code)) {
				if (userSettings.costume === code) {
					check = true;
				}
			} else {
				extraClass += ' hidden_elem';
			}

			k.extrasCostumeMenuItems[code] = k.extrasCostumeMenu.createMenuItem({
				html: COSTUMESX[code].name
				,data: code
				,check: check
				,extraClass: extraClass
				,onclick: function(menuItem, menuClass) {
					k._costumesInit_save(menuItem, menuClass, code);
				}
			});
		};

		k._costumesInit_save = function(menuItem, menuClass, code) {
			if (!COSTUMESX[code] && code != '') {
				return;
			}

			changeCostume(code);
			userSettings.costume = code;
			saveSettings();

			if (COSTUMESX[code]) {
				menuClass.changeButtonText(COSTUMESX[code].name);
			} else {
				menuClass.changeButtonText(CURRENTLANG['settings_costumes_auto']);
			}
			menuClass.changeChecked(menuItem);
			menuClass.close();
			
			k.needToSaveLabel = true;
			k.updateCloseButton();
		};

		k.resetSettings = function(e) {
			e.preventDefault();

			if (!w.confirm(SIG+" Are you sure you want to reset your Ponyhoof settings?")) {
				return;
			}

			userSettings = {};
			saveSettings();

			saveValue(SETTINGSPREFIX+'soundCache', JSON.stringify(null));

			k.canSaveSettings = false;
			k.dialog.close();
			w.location.reload();
		};

		k.clearStorage = function(ev) {
			ev.preventDefault();

			if (!w.confirm(SIG+" Are you sure you want to clear all Ponyhoof settings?")) {
				return;
			}

			k.canSaveSettings = false;

			if (typeof GM_listValues != 'undefined') {
				try {
					var keys = GM_listValues(); // jshint ignore:line
					for (var i = 0, len = keys.length; i < len; i += 1) {
						GM_deleteValue(keys[i]); // jshint ignore:line
					}
				} catch (e) {
					alert(e.toString());
				}
			}
			
			switch (STORAGEMETHOD) {
				case 'localstorage':
					if (w.confirm(SIG + " localStorage must be cleared in order to reset settings. Doing this may cause other extensions to lose their settings.")) {
						try {
							w.localStorage.clear();
						} catch (e) {
							alert("Can't clear localStorage :(\n\n" + e.toString());
						}
					} else {
						return;
					}
					break;

				case 'chrome':
					chrome_clearStorage();
					break;

				case 'opera':
					opera_clearStorage();
					break;

				case 'safari':
					safari_clearStorage();
					break;

				case 'xpi':
					xpi_clearStorage();
					break;

				case 'mxaddon':
					// Maxthon does not have a clear storage function
					break;

				default:
					break;
			}
			
			k.dialog.close();
			w.location.reload();
		};

		k.donateLoaded = false;
		k.loadDonate = function() {
			if (k.donateLoaded) {
				return;
			}

			statTrack('aboutclicked');

			$('ponyhoof_options_twitter').src = 'https://platform.twitter.com/widgets/follow_button.html?screen_name=ponyhoof&show_screen_name=true&show_count=true';
			if (ISCHROME || STORAGEMETHOD === 'chrome') {
				(function() {
					var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
					po.src = 'https://apis.google.com/js/plusone.js';
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
				})();
			}

			$('ponyhoof_options_donatepaypal_link').addEventListener('click', function() {
				$('ponyhoof_options_donatepaypal').submit();
				statTrack('paypalClicked');
				return false;
			}, false);

			$('ponyhoof_donate_flattr_iframe').src = THEMEURL+'_welcome/flattrStandalone.htm';

			k.donateLoaded = true;
		};
		
		k.randomLoaded = false;
		k.randomInit = function() {
			if (k.randomLoaded) {
				return;
			}

			var current = [];
			if (userSettings.randomPonies) {
				current = userSettings.randomPonies.split('|');
			}

			var outerwrap = $('ponyhoof_options_randomPonies');
			var ponySelector = new PonySelector(outerwrap, {});
			ponySelector.overrideClickAction = true;
			ponySelector.customCheckCondition = function(code) {
				if (current.indexOf(code) != -1) {
					return true;
				}

				return false;
			};
			ponySelector.customClick = function(menuItem, menuClass) {
				var code = menuItem.menuItem.getAttribute('data-ponyhoof-menu-data');

				if (!hasClass(menuItem.menuItem, 'ponyhoof_menuitem_checked')) {
					menuItem.menuItem.className += ' ponyhoof_menuitem_checked';

					current.push(code);
				} else {
					removeClass(menuItem.menuItem, 'ponyhoof_menuitem_checked');

					current.splice(current.indexOf(code), 1);
				}
				userSettings.randomPonies = current.join('|');
				saveSettings();

				k._randomUpdateButtonText(current, menuClass);
				k.needToSaveLabel = true;
				k.updateCloseButton();
			};
			ponySelector.createSelector();
			k._randomUpdateButtonText(current, ponySelector.menu);

			var mass = d.createElement('a');
			mass.href = '#';
			mass.className = 'uiButton';
			mass.setAttribute('role', 'button');
			mass.id = 'ponyhoof_options_randomPonies_mass';
			mass.innerHTML = '<span class="uiButtonText">'+CURRENTLANG.invertSelection+'</span>';
			mass.addEventListener('click', function(e) {
				var newCurrent = [];
				for (var i = 0, len = PONIES.length; i < len; i += 1) {
					var menuitem = ponySelector.menu.menu.querySelector('.ponyhoof_menuitem[data-ponyhoof-menu-data="'+PONIES[i].code+'"]');
					if (PONIES[i].hidden) {
						if (menuitem) {
							removeClass(menuitem, 'ponyhoof_menuitem_checked');
						}
						continue;
					}
					if (current.indexOf(PONIES[i].code) == -1) {
						newCurrent.push(PONIES[i].code);

						if (menuitem) {
							addClass(menuitem, 'ponyhoof_menuitem_checked');
						}
					} else {
						if (menuitem) {
							removeClass(menuitem, 'ponyhoof_menuitem_checked');
						}
					}
				}
				current = newCurrent;
				userSettings.randomPonies = current.join('|');
				saveSettings();

				k._randomUpdateButtonText(current, ponySelector.menu);
				k.needToSaveLabel = true;
				k.updateCloseButton();
				w.setTimeout(function() {
					ponySelector.menu.open();
				}, 1);

				return false;
			}, false);
			outerwrap.appendChild(mass);

			k.randomLoaded = true;
		};

		k._randomAnimationTimer = null;
		k._showRandomIfNeeded = function() {
			var section = $('ponyhoof_options_randomPonies');
			w.clearTimeout(k._randomAnimationTimer);
			if (CURRENTPONY === 'RANDOM') {
				k.randomInit();
				removeClass(section, 'hidden_elem');
				if (k.mainInitLoaded) {
					$noop(section.offsetHeight); // force layout
				}
				addClass(section, 'show');
			} else {
				if (!hasClass(section, 'hidden_elem')) {
					removeClass(section, 'show');
					k._randomAnimationTimer = w.setTimeout(function() {
						addClass(section, 'hidden_elem');
					}, 200);
				}
			}
		};

		k._randomUpdateButtonText = function(current, menuClass) {
			var buttonText = "(" + current.length + " characters)";
			if (current.length === 0) {
				buttonText = "(All characters)";
			} else if (current.length === 1) {
				var data = convertCodeToData(current[0]);
				buttonText = data.name;
			}
			menuClass.changeButtonText(buttonText);
		};

		k.soundsMenu = null;
		k.soundsButton = null;
		k.soundsInitLoaded = false;
		k.soundsNotifTypeMenu = null;
		k.soundsNotifTypeButton = null;
		k.soundsSettingsWrap = null;

		k.soundsChatSoundWarning = null;
		k.soundsChatLoaded = false;
		k.soundsChatWrap = null;
		k.soundsChatMenu = null;
		k.soundsChatButton = null;
		k.soundsInit = function() {
			if (k.soundsInitLoaded) {
				return;
			}

			try {
				initPonySound('soundsTest');
			} catch (e) {
				$$(k.dialog.dialog, '.unavailable', function(ele) {
					removeClass(ele, 'hidden_elem');
				});
				$$(k.dialog.dialog, '.available', function(ele) {
					addClass(ele, 'hidden_elem');
				});
				k.soundsInitLoaded = true;
				return;
			}

			var desc = "(Auto)";
			if (SOUNDS[userSettings.soundsFile] && SOUNDS[userSettings.soundsFile].name) {
				desc = SOUNDS[userSettings.soundsFile].name;
			}

			k.soundsMenu = new Menu('sounds', $('ponyhoof_options_soundsSetting'));
			k.soundsButton = k.soundsMenu.createButton(desc);
			k.soundsMenu.searchNoResultsMessage = "No sounds found";
			k.soundsMenu.createMenu();
			k.soundsMenu.attachButton();
			k.soundsMenu.createLoading();

			for (var code in SOUNDS) {
				if (SOUNDS.hasOwnProperty(code)) {
					k._soundsMenu_item(code);

					if (SOUNDS[code].seperator) {
						k.soundsMenu.createSeperator();
					}
				}
			}

			k._soundsNotifTypeInit();

			k.volumeRangeInit('soundsVolume', function() {
				k._soundsPreview(userSettings.soundsFile, userSettings.soundsVolume, k.soundsMenu);
			});

			k.soundsChanged();

			// Init chat sounds
			k.soundsChatSoundWarning = $('ponyhoof_options_soundsChatSoundWarning');
			k.soundsChatWrap = $('ponyhoof_options_soundsChatWrap');

			k._soundsChatLoad();
			k._soundsChatInit();

			contentEval(function(arg) {
				try {
					if (typeof window.requireLazy === 'function') {
						window.requireLazy(['ChatOptions', 'Arbiter'], function(ChatOptions, Arbiter) {
							var warning = document.getElementById('ponyhoof_options_soundsChatSoundWarning');
							var wrap = document.getElementById('ponyhoof_options_soundsChatWrap');
							var checkbox = document.getElementById('ponyhoof_options_chatSound');
							var originalChatSound = checkbox.checked;

							var removeClass = function(ele, c) {
								ele.className = ele.className.replace(new RegExp(c, 'g'), '');
							};

							var updateWarning = function(isFbSoundEnabled) {
								if (isFbSoundEnabled) {
									warning.className += ' hidden_elem';
									removeClass(wrap, 'hidden_elem');
									removeClass(checkbox.parentNode, 'ponyhoof_options_unavailable');
									checkbox.disabled = false;
									if (originalChatSound) {
										checkbox.checked = originalChatSound;
									}
								} else {
									removeClass(warning, 'hidden_elem');
									wrap.className += ' hidden_elem';
									checkbox.parentNode.className += ' ponyhoof_options_unavailable';
									checkbox.disabled = true;
									originalChatSound = checkbox.checked;
									checkbox.checked = false;
								}
							};

							if (checkbox.checked) {
								updateWarning(ChatOptions.getSetting('sound'));
							}

							Arbiter.subscribe('chat/option-changed', function(e, option) {
								if (!originalChatSound) {
									return;
								}
								if (option.name === 'sound') {
									updateWarning(option.value);
								}
							});

							checkbox.addEventListener('click', function() {
								originalChatSound = this.checked;
							}, false);
						});
					}
				} catch (e) {
					if (arg.CANLOG && typeof console !== 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to ChatOptions and Arbiter");
						console.dir(e);
					}
				}
			}, {});

			var button = k.soundsChatSoundWarning.getElementsByClassName('uiButton');
			button[0].addEventListener('click', function() {
				k._soundsTurnOnFbSound();
			}, false);

			k.soundsInitLoaded = true;
		};

		// Create a menu item for notification sounds
		// Used only on k.soundsInit()
		k._soundsMenu_item = function(code) {
			var check = false;
			if (userSettings.soundsFile === code) {
				check = true;
			}

			k.soundsMenu.createMenuItem({
				html: SOUNDS[code].name
				,title: SOUNDS[code].title
				,data: code
				,check: check
				,onclick: function(menuItem, menuClass) {
					if (!SOUNDS[code] || !SOUNDS[code].name) {
						return;
					}
					
					//$('ponyhoof_options_sounds').checked = true;
					//userSettings.sounds = true;
					userSettings.soundsFile = code;
					saveSettings();

					k._soundsPreview(code, userSettings.soundsVolume, k.soundsMenu);

					menuClass.changeButtonText(menuItem.getText());
					menuClass.changeChecked(menuItem);
					
					k.needToSaveLabel = true;
					k.updateCloseButton();
				}
			});
		};

		// Warn people that Facebook's own chat sound needs to be enabled
		// Used 2 times on k.soundsInit()
		/*k._soundsChatSoundWarn = function(isFbSoundEnabled) {
			if (isFbSoundEnabled) {
				addClass(k.soundsChatSoundWarning, 'hidden_elem');
				$('ponyhoof_options_chatSound').disabled = false;
				if (userSettings.chatSound) {
					$('ponyhoof_options_chatSound').checked = true;
				}
			} else {
				removeClass(k.soundsChatSoundWarning, 'hidden_elem');
				$('ponyhoof_options_chatSound').disabled = true;
				$('ponyhoof_options_chatSound').checked = false;
			}
		};*/

		// Turn on Facebook chat sounds
		// Used on k.soundsInit() and k.chatSound()
		k._soundsTurnOnFbSound = function() {
			contentEval(function(arg) {
				try {
					if (typeof window.requireLazy === 'function') {
						window.requireLazy(['ChatOptions', 'ChatSidebarDropdown'], function(ChatOptions, ChatSidebarDropdown) {
							ChatOptions.setSetting('sound', true);
							ChatSidebarDropdown.prototype.changeSetting('sound', true);
						});
					}
				} catch (e) {
					if (arg.CANLOG && typeof console !== 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to ChatOptions and ChatSidebarDropdown");
						console.dir(e);
					}
				}
			}, {});
		};

		k._soundsNotifTypeCurrent = [];
		// Initialize the notification sound blacklist and its HTML template
		// Used only on k.soundsInit()
		k._soundsNotifTypeInit = function() {
			if (userSettings.soundsNotifTypeBlacklist) {
				var current = userSettings.soundsNotifTypeBlacklist.split('|');

				for (var code in SOUNDS_NOTIFTYPE) {
					if (current.indexOf(code) != -1) {
						k._soundsNotifTypeCurrent.push(code);
					}
				}
			}

			k.soundsNotifTypeMenu = new Menu('soundsNotifType', $('ponyhoof_options_soundsNotifType'));
			k.soundsNotifTypeButton = k.soundsNotifTypeMenu.createButton('');
			k.soundsNotifTypeMenu.canSearch = false;
			k.soundsNotifTypeMenu.createMenu();
			k.soundsNotifTypeMenu.attachButton();

			for (var code in SOUNDS_NOTIFTYPE) {
				if (SOUNDS_NOTIFTYPE.hasOwnProperty(code)) {
					k._soundsNotifTypeInit_item(code);
				}
			}
			k._soundsNotifTypeUpdateButtonText(k._soundsNotifTypeCurrent, k.soundsNotifTypeMenu);
		};

		// Create a menu item for notification sound blacklist
		// Used only on k._soundsNotifTypeInit()
		k._soundsNotifTypeInit_item = function(code) {
			var check = false;
			if (k._soundsNotifTypeCurrent.indexOf(code) != -1) {
				check = true;
			}

			k.soundsNotifTypeMenu.createMenuItem({
				html: SOUNDS_NOTIFTYPE[code].name
				,data: code
				,check: check
				,onclick: function(menuItem, menuClass) {
					if (!SOUNDS_NOTIFTYPE[code] || !SOUNDS_NOTIFTYPE[code].name) {
						return;
					}

					if (!hasClass(menuItem.menuItem, 'ponyhoof_menuitem_checked')) {
						menuItem.menuItem.className += ' ponyhoof_menuitem_checked';

						k._soundsNotifTypeCurrent.push(code);
					} else {
						removeClass(menuItem.menuItem, 'ponyhoof_menuitem_checked');

						k._soundsNotifTypeCurrent.splice(k._soundsNotifTypeCurrent.indexOf(code), 1);
					}
					userSettings.soundsNotifTypeBlacklist = k._soundsNotifTypeCurrent.join('|');
					saveSettings();

					k._soundsNotifTypeUpdateButtonText(k._soundsNotifTypeCurrent, menuClass);
					k.needToSaveLabel = true;
					k.updateCloseButton();
				}
			});
		};

		// Update the notification sound blacklist button text, perhaps after changes
		// Used on k._soundsNotifTypeInit() and k._soundsNotifType_item()
		k._soundsNotifTypeUpdateButtonText = function(current, menuClass) {
			var buttonText = "("+current.length+" types)";
			if (current.length == 0) {
				buttonText = "(None)";
			} else if (current.length == 1) {
				buttonText = SOUNDS_NOTIFTYPE[current[0]].name;
			}
			menuClass.changeButtonText(buttonText);
		};

		// Hide/show the extra sound options if the main sound option id disabled/enabled
		// Used on k.soundsInit(), the sound option is changed, or DOMNodeInserted is disabled
		k.soundsChanged = function() {
			k.soundsSettingsWrap = k.soundsSettingsWrap || $('ponyhoof_options_soundsSettingsWrap');
			if (userSettings.sounds && !userSettings.disableDomNodeInserted) {
				removeClass(k.soundsSettingsWrap, 'hidden_elem');
			} else {
				addClass(k.soundsSettingsWrap, 'hidden_elem');
			}
		};

		// Calls the main function k.soundsChanged(), and also performs extra cleanup duties, e.g. if the user disable sounds, we need to update the Close button to "Save and Reload"
		// Used when the sound option is changed
		k.soundsClicked = function() {
			k.soundsChanged();

			if (userSettings.sounds) {
				turnOffFbNotificationSound();
			} else {
				// We already nuked Facebook's sounds, so we need to reload
				k.needsToRefresh = true;
				k.updateCloseButton();
			}
		};

		// The wording of this function is a bit confusing
		// Hide/show the extra chat sound options if the chat sound option is disabled/enabled
		// Used on k.soundsInit() and k.chatSound()
		k._soundsChatInit = function() {
			if (userSettings.chatSound) {
				removeClass(k.soundsChatWrap, 'hidden_elem');
			} else {
				addClass(k.soundsChatSoundWarning, 'hidden_elem');
				addClass(k.soundsChatWrap, 'hidden_elem');
			}
		};

		// Initialize the chat sounds options and its HTML template
		// Used only on k.soundsInit()
		k._soundsChatLoad = function() {
			if (k.soundsChatLoaded) {
				return;
			}

			var desc = "(Select a chat sound)";
			if (SOUNDS_CHAT[userSettings.chatSoundFile] && SOUNDS_CHAT[userSettings.chatSoundFile].name) {
				desc = SOUNDS_CHAT[userSettings.chatSoundFile].name;
			}
			k.soundsChatMenu = new Menu('sounds_chat', $('ponyhoof_options_soundsChatSetting'));
			k.soundsChatButton = k.soundsChatMenu.createButton(desc);
			k.soundsChatMenu.canSearch = false;
			k.soundsChatMenu.createMenu();
			k.soundsChatMenu.attachButton();
			k.soundsChatMenu.createLoading();
			for (var code in SOUNDS_CHAT) {
				if (SOUNDS_CHAT.hasOwnProperty(code)) {
					k._soundsChatLoad_item(code);
				}
			}
			k.soundsChatLoaded = true;

			k.volumeRangeInit('chatSoundVolume', function() {
				k._soundsPreview(userSettings.chatSoundFile, userSettings.chatSoundVolume, k.soundsChatMenu);
			});
		};

		// Create a menu item for chat sound options
		// Used only on k._soundsChatLoad()
		k._soundsChatLoad_item = function(code) {
			var check = false;
			if (userSettings.chatSoundFile === code) {
				check = true;
			}

			k.soundsChatMenu.createMenuItem({
				html: SOUNDS_CHAT[code].name
				,title: SOUNDS_CHAT[code].title
				,data: code
				,check: check
				,onclick: function(menuItem, menuClass) {
					if (!SOUNDS_CHAT[code] || !SOUNDS_CHAT[code].name) {
						return;
					}
					
					userSettings.chatSoundFile = code;
					saveSettings();

					k._soundsPreview(code, userSettings.soundsVolume, k.soundsChatMenu);
					changeChatSound(code);

					menuClass.changeButtonText(menuItem.getText());
					menuClass.changeChecked(menuItem);
					
					k.needToSaveLabel = true;
					k.updateCloseButton();
				}
			});
		};

		// When the user enables chat sounds, we will turn it on immediately, while if the user chooses to turn it off, we would change the Close button to "Save and Reload"
		// Also calls k._soundsChatInit()
		// Used when the chat sound option is changed
		k.chatSound = function() {
			if (userSettings.chatSound) {
				// Enable Facebook's chat sound automatically
				k._soundsTurnOnFbSound();
				if (SOUNDS_CHAT[userSettings.chatSoundFile] && SOUNDS_CHAT[userSettings.chatSoundFile].name) {
					changeChatSound(userSettings.chatSoundFile);
				}
			} else {
				// Chat sounds are already ponified, we need to reload to clear it
				k.needsToRefresh = true;
				k.updateCloseButton();
			}
			k._soundsChatInit();
		};

		k.volumeRangeInit = function(option, callback) {
			var input = $('ponyhoof_options_' + option);
			var preview = $('ponyhoof_options_' + option + 'Preview');
			var value = $('ponyhoof_options_' + option + 'Value');
			var volumeTimeout = null;

			input.value = userSettings[option] * 100;
			if (supportsRange()) {
				preview.style.display = 'none';
				value.style.display = 'inline';
				value.textContent = input.value + "%";
				input.addEventListener('change', function() {
					value.textContent = input.value + "%";

					w.clearTimeout(volumeTimeout);
					volumeTimeout = w.setTimeout(function() {
						var volume = input.value / 100;
						userSettings[option] = Math.max(0, Math.min(volume, 1));
						saveSettings();

						callback();
					}, 300);
				}, false);
			} else {
				input.type = 'number';
				input.className = 'inputtext';
				input.setAttribute('data-hover', 'tooltip');
				input.setAttribute('aria-label', "Enter a number between 1-100");
				preview.addEventListener('click', function(ev) {
					ev.preventDefault();

					var volume = input.value / 100;
					userSettings[option] = Math.max(0, Math.min(volume, 1));
					saveSettings();

					callback();
				}, false);
			}
		};

		// Run a sound preview
		k._soundsPreviewMenu = {};
		k._soundsPreview = function(code, volume, menu) {
			var sound = code;
			if (code === 'AUTO') {
				sound = '_sound/defaultNotification';

				var data = convertCodeToData(REALPONY);
				if (data.soundNotif) {
					sound = data.soundNotif;
				}
			}

			var hideLoading = function() {
				addClass(menu.loading, 'hidden_elem');
			};
			var showLoading = function() {
				removeClass(menu.loading, 'hidden_elem');
			};

			try {
				if (!k._soundsPreviewMenu[menu.id]) {
					k._soundsPreviewMenu[menu.id] = initPonySound('soundsTest' + menu.id, '');
					k._soundsPreviewMenu[menu.id].respectSettings = false;
					k._soundsPreviewMenu[menu.id].respectVolumeSetting = false;
					k._soundsPreviewMenu[menu.id].wait = 0;
					k._soundsPreviewMenu[menu.id].sound.addEventListener('canplay', hideLoading, false);
					k._soundsPreviewMenu[menu.id].sound.addEventListener('ended', hideLoading, false);
					k._soundsPreviewMenu[menu.id].sound.addEventListener('loadstart', showLoading, false);
				}
				k._soundsPreviewMenu[menu.id].sound.volume = volume;
				k._soundsPreviewMenu[menu.id].changeSourceSmart(THEMEURL + sound + '.EXT');
				k._soundsPreviewMenu[menu.id].play();
			} catch (e) {}
		};

		k.bgError = null;
		k.bgMessage = null;
		k.bgTab = null;
		k.bgDrop = null;
		k.bgClearCustomBg = false;
		k.bgInitLoaded = false;
		k.bgSizeLimit = 1024 * 1024;
		k.bgSizeLimitDescription = '1 MB';
		k.bgImg = null;
		k.bgBestResultsScreenSize = '';
		k._isWebPSupported = false;
		k.bgInit = function() {
			if (k.bgInitLoaded) {
				return;
			}

			k.bgError = $('ponyhoof_options_background_error');
			k.bgMessage = $('ponyhoof_options_background_message');
			k.bgTab = $('ponyhoof_options_tabs_background');
			k.bgDrop = $('ponyhoof_options_background_drop');

			// Firefox 23 started enforcing a 1MB limit per preference
			// http://hg.mozilla.org/mozilla-central/rev/2e46cabb6a11
			if (ISFIREFOX && STORAGEMETHOD === 'greasemonkey') {
				k.bgSizeLimit = 1024 * 512;
				k.bgSizeLimitDescription = '512 KB';
			}

			if (userSettings.customBg) {
				addClass(k.bgTab, 'hasCustom');
				addClass($('ponyhoof_options_background_custom'), 'active');
			} else if (userSettings.login_bg) {
				addClass($('ponyhoof_options_background_loginbg'), 'active');
			} else {
				addClass($('ponyhoof_options_background_cutie'), 'active');
			}

			$$(k.bgTab, '.ponyhoof_options_fatradio a', function(ele) {
				ele.addEventListener('click', function() {
					$$(k.bgTab, '.ponyhoof_options_fatradio a', function(ele2) {
						removeClass(ele2.parentNode, 'active');
					});

					var parent = this.parentNode;
					var attr = parent.getAttribute('data-ponyhoof-background');
					if (attr === 'custom') {
						userSettings.login_bg = false;
						changeCustomBg(userSettings.customBg);
						k.bgClearCustomBg = false;
					} else if (attr === 'loginbg') {
						userSettings.login_bg = true;
						changeCustomBg(null);
						addClass(d.documentElement, 'ponyhoof_settings_login_bg');
						k.bgClearCustomBg = true;
					} else {
						userSettings.login_bg = false;
						changeCustomBg(null);
						k.bgClearCustomBg = true;
					}
					addClass(parent, 'active');
					saveSettings();

					k.needToSaveLabel = true;
					k.updateCloseButton();

					return false;
				}, false);
			});

			$('ponyhoof_options_background_select').addEventListener('change', function(e) {
				if (this.files && this.files[0]) {
					k.bgProcessFile(this.files[0]);
				}
			}, false);

			isWebPSupported(function(result) {
				k._isWebPSupported = result;

				k.bgBestResultsScreenSize = w.screen.width+'x'+w.screen.height;
				if (w.devicePixelRatio && w.devicePixelRatio !== 1) {
					k.bgBestResultsScreenSize += ' or '+(w.screen.width*w.devicePixelRatio)+'x'+(w.screen.height*w.devicePixelRatio);
				}

				var desc = 'Maximum file size is '+k.bgSizeLimitDescription+'.\n\nFor best results, the resolution of your pony pic should be '+k.bgBestResultsScreenSize+' to fill the entire screen.';
				if (isCanvasSupported()) {
					var filetype = 'JPEG';
					if (k._isWebPSupported) {
						filetype = 'JPEG/WebP';
					}

					desc = 'If the file size of your pony pic is too big, we will attempt to automatically convert to '+filetype+' and resize it.\n\nFor best results, the resolution of your pony pic should be '+k.bgBestResultsScreenSize+' to fill the entire screen.';
				}

				var uiHelpLink = k.bgDrop.getElementsByClassName('uiHelpLink');
				if (uiHelpLink.length) {
					uiHelpLink[0].setAttribute('aria-label', desc);
				}
			});

			k.bgDropInit();

			k.bgInitLoaded = true;
		};

		k.bgDropInit = function() {
			var ok = true;
			if (typeof w.FileReader === 'undefined') {
				ok = false;
			}
			// Soft-block Firefox 8 or below
			// The `onload` method in `window.Image()` does not work properly inside Greasemonkey and Scriptish
			// Using unsafeWindow will also not work
			//
			// [Exception... "Component is not available"  nsresult: "0x80040111 (NS_ERROR_NOT_AVAILABLE)"  location: "JS frame :: resource://greasemonkey/runScript.js :: <TOP_LEVEL> :: line 5034"  data: no]
			if (ISFIREFOX) {
				var version = getBrowserVersion();
				if (version.major <= 8) {
					ok = false;
				}
			}

			if (!ok) {
				k.bgError.textContent = "Custom background pony pics are not supported on your browser. Please update your browser if possible.";
				removeClass(k.bgError, 'hidden_elem');
				addClass(k.bgDrop, 'hidden_elem');
				return;
			}

			k.bgDrop.addEventListener('drop', function(e) {
				e.stopPropagation();
				e.preventDefault();

				removeClass(this, 'ponyhoof_dropping');

				if (e.dataTransfer.files && e.dataTransfer.files[0]) {
					k.bgProcessFile(e.dataTransfer.files[0]);
				}
			}, false);

			k.bgDrop.addEventListener('dragover', function(e) {
				e.stopPropagation();
				e.preventDefault();

				e.dataTransfer.dropEffect = 'copy';
			}, false);

			k.bgDrop.addEventListener('dragenter', function(e) {
				addClass(k.bgDrop, 'ponyhoof_dropping');
							}, false);

			
			k.bgDrop.addEventListener('dragend', function(e) {
				removeClass(k.bgDrop, 'ponyhoof_dropping');
			}, false);
		};

		k.bgReaderFile = null;
		k.bgReaderBg = null;
		k.bgProcessFile = function(file) {
			k.bgReaderFile = file;
			addClass(k.bgError, 'hidden_elem');
			addClass(k.bgMessage, 'hidden_elem');

			if (!file.type.match(/image.*/)) {
				if (file.type) {
					k.bgError.textContent = "The file ("+file.name+") doesn't seem to be a pony pic ("+file.type+").";
				} else {
					k.bgError.textContent = "The file ("+file.name+") doesn't seem to be a pony pic.";
				}
				removeClass(k.bgError, 'hidden_elem');
				return;
			}

			var reader = new w.FileReader();
			reader.onload = k.bgReaderLoad;
			reader.onerror = k.bgReaderError;
			reader.readAsDataURL(file);
		};

		k.bgReaderLoad = function(e) {
			k.bgReaderBg = e.target.result;
			if (e.target.result.length > k.bgSizeLimit) {
				// base64 result is too big to fit, convertion required
				if (isCanvasSupported()) {
					k.bgPerformConvertion();
				} else {
					k.bgErrorTooBig();
				}
			} else {
				//k.bgChangeSuccess();

				// Needed to load into an <img> and figure out if the image resolution is too big
				k.bgLoadImg(function() {
					k.bgChangeSuccess({shouldShowOversizedMessage: false});

					k.bgImg = null;
				});
			}
		};

		k.bgReaderError = function(e) {
			k.bgError.textContent = "There was a problem reading the file. Please try again.";

			// Fix for Jet Browser junk
			if (w.navigator.userAgent.indexOf('Chrome/24.0.1293.0') !== -1) {
				k.bgError.innerHTML += "<br><br>If you are using Jet Browser, then this is a problem with Jet Browser itself and not a bug that Ponyhoof can work-around.";
			}

			removeClass(k.bgError, 'hidden_elem');
			dir(e);
		};

		k.bgErrorTooBig = function() {
			if (k.bgReaderFile.type && k.bgReaderFile.type != 'image/jpeg' && !isCanvasSupported()) {
				k.bgError.textContent = "Sorry, the file size of your pony pic is too big (over "+k.bgSizeLimitDescription+") and may not save properly. Try saving your pony pic as a JPEG, resize your pony pic, or use a different pony pic.";
			} else {
				k.bgError.textContent = "Sorry, the file size of your pony pic is too big (over "+k.bgSizeLimitDescription+") and may not save properly. Try resizing your pony pic or use a different pony pic.";
			}
			removeClass(k.bgError, 'hidden_elem');
		};

		k.bgChangeSuccess = function(opt) {
			opt = opt || {};

			addClass(k.bgError, 'hidden_elem');
			addClass(k.bgTab, 'hasCustom');

			var dpr = 1;
			if (w.devicePixelRatio) {
				dpr = Math.max(1, w.devicePixelRatio);
				if (k.bgImageEqualsScreen(k.bgImg.width, k.bgImg.height)) {
					userSettings.customBgDpr = dpr;
				} else if (opt.shouldShowOversizedMessage) {
					userSettings.customBgDpr = 1;
					if (k.bgImg.width > w.screen.width*dpr*1.5 || k.bgImg.height > w.screen.height*dpr*1.5) {
						k.bgMessage.textContent = "Your pony pic might be too big to fit your screen (your image is "+k.bgImg.width+"x"+k.bgImg.height+"). For best results, we recommend using an image editor and resize/crop your pony pic to "+k.bgBestResultsScreenSize+".";
						removeClass(k.bgMessage, 'hidden_elem');
					}
				}
			}

			$$(k.bgTab, '.ponyhoof_options_fatradio a', function(ele) {
				removeClass(ele.parentNode, 'active');
			});
			addClass($('ponyhoof_options_background_custom'), 'active');
			k.bgClearCustomBg = false;

			userSettings.login_bg = false;
			userSettings.customBg = k.bgReaderBg;
			userSettings.customBgWidth = k.bgImg.width;
			userSettings.customBgHeight = k.bgImg.height;
			saveSettings();

			k.needToSaveLabel = true;
			k.updateCloseButton();

			changeCustomBg(k.bgReaderBg);
		};

		k.bgPerformConvertion = function() {
			k.bgLoadImg(function() {
				// First try converting to JPEG/WebP
				if (k.bgReaderFile.type !== 'image/jpeg' || (k._isWebPSupported && k.bgReaderFile.type !== 'image/webp')) {
					var transformed = k.bgCanvasTransform(k.bgImg, k.bgImg.width, k.bgImg.height);
					if (transformed.length <= k.bgSizeLimit) {
						k.bgReaderBg = transformed;
						k.bgChangeSuccess({shouldShowOversizedMessage: true});

						k.bgImg = null;
						transformed = null;
						return;
					}
					transformed = null;
				}

				// Now try resizing to screen resolution
				var transformed = k.bgCanvasTransform(k.bgImg, Math.min(w.screen.width, k.bgImg.width), Math.min(w.screen.height, k.bgImg.height));
				if (transformed.length <= k.bgSizeLimit) {
					k.bgMessage.textContent = "Automatically resized to screen resolution. For best results, we recommend using an image editor and resize/crop your pony pic to "+k.bgBestResultsScreenSize+".";
					removeClass(k.bgMessage, 'hidden_elem');

					k.bgReaderBg = transformed;
					k.bgChangeSuccess({shouldShowOversizedMessage: false});

					k.bgImg = null;
					transformed = null;
					return;
				}
				k.bgImg = null;
				transformed = null;

				// Fail :(
				k.bgErrorTooBig();
			});
		};

		k.bgLoadImg = function(onload) {
			k.bgImg = new w.Image();
			try {
				k.bgImg.onload = onload;
				k.bgImg.src = k.bgReaderBg;
			} catch (e) {
				error(e.message);
				log(e.stack);
				k.bgErrorTooBig();
			}
		};

		k.bgCanvasTransform = function(img, width, height) {
			var canvas = d.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, width, height);

			var type = 'image/jpeg';
			if (k._isWebPSupported) {
				type = 'image/webp';
			}

			return canvas.toDataURL(type);
		};

		k.bgImageEqualsScreen = function(width, height) {
			var dpr = 1;
			if (w.devicePixelRatio) {
				dpr = Math.max(1, w.devicePixelRatio);
			}
			return (width === w.screen.width * dpr && height === w.screen.height * dpr);
		};

		k.disableDomNodeInserted = function() {
			k.soundsChanged(); // to set k.soundsSettingsWrap

			var affectedOptions = ['sounds', 'debug_dominserted_console', 'debug_noMutationObserver', 'debug_mutationDebug', 'debug_betaFacebookLinks'];
			//'disableCommentBrohoofed','debug_mutationObserver'
			for (var i = 0, len = affectedOptions.length; i < len; i += 1) {
				var option = $('ponyhoof_options_' + affectedOptions[i]);
				var label = $('ponyhoof_options_label_' + affectedOptions[i]);
				if (userSettings.disableDomNodeInserted) {
					option.disabled = true;
					option.checked = false;

					addClass(label, 'ponyhoof_options_unavailable');
					label.setAttribute('data-hover', 'tooltip');
					label.setAttribute('aria-label', "This feature is not available because HTML detection is disabled, re-enable it at the Misc tab");
				} else {
					option.disabled = false;
					if (userSettings[affectedOptions[i]]) {
						option.checked = true;
					}

					removeClass(label, 'ponyhoof_options_unavailable');
					label.removeAttribute('data-hover');
					label.removeAttribute('aria-label');
					label.removeAttribute('aria-owns');
					label.removeAttribute('aria-controls');
					label.removeAttribute('aria-haspopup');
				}
			}
			k._debugNoMutationObserver();
		};

		k.disableDomNodeInsertedClicked = function() {
			if (!userSettings.disableDomNodeInserted) {
				runDOMNodeInserted();
			} else {
				if (ranDOMNodeInserted) {
					k.needsToRefresh = true;
					k.updateCloseButton();
				}
			}

			k.disableDomNodeInserted();
		};

		k.allowLoginScreenClicked = function() {
			if (globalSettings.allowLoginScreen) {
				globalSettings.lastUserId = USERID;
			} else {
				globalSettings.lastUserId = null;
			}
			saveGlobalSettings();
		};

		k.debug_disablelog = function() {
			if ($('ponyhoof_options_debug_disablelog').checked) {
				CANLOG = false;
			} else {
				CANLOG = true;
			}
		};

		k.disableDialog = null;
		k.disablePonyhoof = function() {
			if ($('ponyhoof_dialog_disable')) {
				$('ponyhoof_disable_allowLoginScreen').checked = !globalSettings.allowLoginScreen;
				$('ponyhoof_disable_runForNewUsers').checked = !globalSettings.runForNewUsers;

				k.dialog.hide();
				k.disableDialog.show();
				$('ponyhoof_disable_ok').focus();
				return false;
			}

			var c = '';
			c += "<strong>Are you sure you want to disable Ponyhoof for yourself?</strong><br><br>";
			c += "You can re-enable Ponyhoof for yourself at any time by going back to Ponyhoof Options and re-select a character.<br><br>";
			c += '<div class="uiInputLabel clearfix"><input type="checkbox" class="uiInputLabelCheckbox" id="ponyhoof_disable_allowLoginScreen"><label for="ponyhoof_disable_allowLoginScreen">Don\'t run Ponyhoof on the Facebook login screen</label></div>';
			c += '<div class="uiInputLabel clearfix" data-hover="tooltip" aria-label="'+CURRENTLANG['settings_disable_runForNewUsers_explain']+'"><input type="checkbox" class="uiInputLabelCheckbox" id="ponyhoof_disable_runForNewUsers"><label for="ponyhoof_disable_runForNewUsers">Don\'t run Ponyhoof for new users <a href="#" class="uiHelpLink"></a></label></div>';
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_disable_ok"><span class="uiButtonText">Disable</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge" role="button" id="ponyhoof_disable_no"><span class="uiButtonText">Cancel</span></a>';
			
			k.dialog.hide();
			k.disableDialog = new Dialog('disable');
			k.disableDialog.alwaysModal = true;
			k.disableDialog.create();
			k.disableDialog.changeTitle("Disable Ponyhoof");
			k.disableDialog.changeContent(c);
			k.disableDialog.changeBottom(bottom);

			$('ponyhoof_disable_allowLoginScreen').checked = !globalSettings.allowLoginScreen;
			$('ponyhoof_disable_runForNewUsers').checked = !globalSettings.runForNewUsers;

			k.disableDialog.show();
			k.disableDialog.onclose = function() {
				k.dialog.show();
			};

			$('ponyhoof_disable_ok').focus();
			$('ponyhoof_disable_ok').addEventListener('click', function() {
				userSettings.theme = 'NONE';
				saveSettings();

				globalSettings.allowLoginScreen = !$('ponyhoof_disable_allowLoginScreen').checked;
				globalSettings.runForNewUsers = !$('ponyhoof_disable_runForNewUsers').checked;
				saveGlobalSettings(true);

				k.disableDialog.canCloseByEscapeKey = false;
				d.body.style.cursor = 'progress';
				$('ponyhoof_disable_allowLoginScreen').disabled = true;
				$('ponyhoof_disable_runForNewUsers').disabled = true;
				$('ponyhoof_disable_ok').className += ' uiButtonDisabled';
				$('ponyhoof_disable_no').className += ' uiButtonDisabled';
				w.location.reload();

				return false;
			}, false);

			$('ponyhoof_disable_no').addEventListener('click', function() {
				k.disableDialog.close();
				return false;
			}, false);
			
			return false;
		};

		k.browserPonies = null;
		k.runBrowserPonies = function() {
			var link = this;
			if (hasClass(link, 'ponyhoof_browserponies_loading')) {
				return false;
			}

			var alreadyLoaded = (k.browserPonies && k.browserPonies.initLoaded);
			addClass(link, 'ponyhoof_browserponies_loading');
			
			if (!k.browserPonies) {
				k.browserPonies = new BrowserPoniesHoof();
			}
			k.browserPonies.doneCallback = function() {
				k.dialog.close();
				removeClass(link, 'ponyhoof_browserponies_loading');
				if (!alreadyLoaded) {
					k.browserPonies.copyrightDialog();
				}
				k.browserPonies.createDialog();
			};
			k.browserPonies.errorCallback = function(error) {
				removeClass(link, 'ponyhoof_browserponies_loading');
				k.browserPonies.createErrorDialog(error);
			};
			k.browserPonies.run();
			
			return false;
		};

		k.checkboxStore = {};
		k.generateCheckbox = function(id, label, data) {
			data = data || {};
			var ex = '';
			var checkmark = '';

			if ((!data.global && userSettings[id]) || (data.global && globalSettings[id])) {
				checkmark += ' CHECKED';
			}
			data.extraClass = data.extraClass || '';
			if (data.title) {
				label += ' <a href="#" class="uiHelpLink"></a>';
				ex += ' data-hover="tooltip" aria-label="'+data.title+'"';
			}

			k.checkboxStore[id] = data;

			return '<div class="uiInputLabel clearfix '+data.extraClass+'"'+ex+' id="ponyhoof_options_label_'+id+'"><input type="checkbox" class="uiInputLabelCheckbox" id="ponyhoof_options_'+id+'" data-ponyhoof-checkmark="'+id+'" '+checkmark+'><label for="ponyhoof_options_'+id+'">'+label+'</label></div>';
		};

		k.generateVolumeRange = function(id, label, min, max) {
			return '<span class="ponyhoof_options_volumeRange"><span class="ponyhoof_menu_label">'+ label +' </span><input type="range" id="ponyhoof_options_' + id + '" min="' + min + '" max="' + max + '"> <a href="#" class="uiButton" role="button" id="ponyhoof_options_' + id + 'Preview"><span class="uiButtonText">' + CURRENTLANG['preview'] + '</span></a><span class="ponyhoof_menu_label ponyhoof_options_volumeRange_value" id="ponyhoof_options_' + id + 'Value"></span></span>';
		};
		
		k.checkboxInit = function() {
			var extras = $('ponyhoof_dialog_options').querySelectorAll('input[type="checkbox"]');
			for (var i = 0, len = extras.length; i < len; i += 1) {
				var checkmark = extras[i].getAttribute('data-ponyhoof-checkmark');
				var data = {};
				if (k.checkboxStore[checkmark]) {
					data = k.checkboxStore[checkmark];
				}
				if (data.tooltipPosition) {
					extras[i].parentNode.setAttribute('data-tooltip-position', data.tooltipPosition);
				}

				extras[i].addEventListener('click', function() {
					var checkmark = this.getAttribute('data-ponyhoof-checkmark');
					var data = {};
					if (k.checkboxStore[checkmark]) {
						data = k.checkboxStore[checkmark];
					}

					if (!data.global) {
						userSettings[checkmark] = this.checked;
						saveSettings();
					} else {
						globalSettings[checkmark] = this.checked;
						saveGlobalSettings(true);
					}
					
					if (this.checked) {
						addClass(d.documentElement, 'ponyhoof_settings_'+checkmark);
					} else {
						removeClass(d.documentElement, 'ponyhoof_settings_'+checkmark);
					}
					if (data.refresh) {
						k.needsToRefresh = true;
					}
					if (data.customFunc) {
						data.customFunc();
					}
					
					k.needToSaveLabel = true;
					k.updateCloseButton();
				}, true);
			}
		};
		
		k.tabsExposeDebug = 0;
		k.tabsInit = function() {
			var tabs = k.dialog.dialog.querySelectorAll('.ponyhoof_tabs a');
			for (var i = 0, len = tabs.length; i < len; i += 1) {
				tabs[i].addEventListener('click', function(e) {
					var tabName = this.getAttribute('data-ponyhoof-tab');
					if (tabName === 'extras') {
						if (!userSettings.debug_exposed && k.tabsExposeDebug < 5) {
							k.tabsExposeDebug += 1;
							if (k.tabsExposeDebug >= 5) {
								addClass(k.dialog.dialog, 'ponyhoof_options_debugExposed');
								k.switchTab('advanced');
								return;
							}
						}
					} else {
						k.tabsExposeDebug = 0;
					}

					k.switchTab(tabName);
					e.preventDefault();
				}, false);
			}
		};

		k.switchTab = function(tabName) {
			var tabActions = {
				'main': k.mainInit
				,'background': k.bgInit
				,'sounds': k.soundsInit
				,'extras': k.extrasInit
				,'advanced': k.debugInfo
				,'about': k.loadDonate
			};
			removeClass(k.dialog.dialog.querySelector('.ponyhoof_tabs a.active'), 'active');
			addClass(k.dialog.dialog.querySelector('.ponyhoof_tabs a[data-ponyhoof-tab="'+tabName+'"]'), 'active');
			
			try {
				if (tabActions[tabName]) {
					tabActions[tabName]();
				}
			} catch (e) {
				error(e.message);
				log(e.stack);
				ponyhoofError(e.toString());
			}

			$$(k.dialog.dialog, '.ponyhoof_tabs_section', function(section) {
				section.style.display = 'none';
			});
			$('ponyhoof_options_tabs_'+tabName).style.display = 'block';
			
			k.dialog.cardSpaceTick();
		};

		k.changeUpdaterLatestTextHooked = false;
		k.changeUpdaterLatestText = function() {
			var successText = '';
			var ponyData = convertCodeToData(REALPONY);
			if (ponyData.successText) {
				successText = ponyData.successText+' ';
			}

			var latest = k.dialog.dialog.getElementsByClassName('ponyhoof_updater_latest');
			if (latest.length) {
				latest[0].textContent = successText+'Ponyhoof is up-to-date.';
			}

			if (!k.changeUpdaterLatestTextHooked) {
				changeThemeFuncQueue.push(k.changeUpdaterLatestText);
				k.changeUpdaterLatestTextHooked = true;
			}
		};

		k.changeVisitPageTextHooked = false;
		k.changeVisitPageText = function() {
			$('ponyhoof_options_visitPage').textContent = CURRENTLANG['settings_main_visitPage'].replace(/\$1/, CURRENTSTACK['like']);

			if (!k.changeVisitPageTextHooked) {
				changeThemeFuncQueue.push(k.changeVisitPageText);
				k.changeVisitPageTextHooked = true;
			}
		};

		k.saveButtonClick = function() {
			k.dialog.close();
			return false;
		};

		k.dialogOnClose = function() {
			d.removeEventListener('keydown', k.kf, true);

			if (k.debugLoaded) {
				if ($('ponyhoof_options_customcss').value === "Enter any custom CSS to load after Ponyhoof is loaded.") {
					userSettings.customcss = '';
				} else {
					userSettings.customcss = $('ponyhoof_options_customcss').value;
				}
			}
			if (k.canSaveSettings) {
				saveSettings();
			}

			if (k.needsToRefresh) {
				w.location.reload();
			}
		};
		
		k.dialogOnCloseFinish = function() {
			k.needToSaveLabel = false;
			k.needsToRefresh = false;
			k.updateCloseButton();

			if (k.canSaveSettings) {
				if (k.bgClearCustomBg) {
					removeClass(k.bgTab, 'hasCustom');
					userSettings.customBg = null;
					saveSettings();
				}
			}
		};

		k.updateCloseButton = function() {
			var button = k.saveButton.getElementsByClassName('uiButtonText')[0];
			var text = CURRENTLANG['close'];
			
			if (k.needToSaveLabel) {
				text = "Save & Close";
			}
			
			if (k.needsToRefresh) {
				text = "Save & Reload";
			}
			
			button.innerHTML = text;
		};
		
		k.injectStyle = function() {
			var css = '';
			//css += '#ponyhoof_options_tabs_main .clearfix {margin-bottom:10px;}';
			css += '#ponyhoof_dialog_options .generic_dialog_popup, #ponyhoof_dialog_options .popup {width:480px;}';
			css += '#ponyhoof_options_likebox_div {height:80px;margin-top:12px;}';
			//css += 'html.ponyhoof_isusingpage #ponyhoof_options_likebox_div {display:none;}';
			css += '#ponyhoof_options_likebox {border:none;overflow:hidden;width:100%;height:80px;}';
			css += '#ponyhoof_options_pony {margin:8px 0 4px;}';
			css += '.ponyhoof_options_fatlink {display:block;margin-top:10px;}';
			css += '.ponyhoof_options_unavailable label {cursor:default;}';
			css += '#ponyhoof_dialog_options .usingPage, html.ponyhoof_isusingpage #ponyhoof_dialog_options .notPage {display:none;}';
			css += 'html.ponyhoof_isusingpage #ponyhoof_dialog_options .usingPage {display:block;}';
			css += 'html.ponyhoof_isusingbusiness #ponyhoof_dialog_options .notBusiness {display:none;}';
			
			css += '#ponyhoof_dialog_options .uiHelpLink {margin-left:2px;}';
			css += '#ponyhoof_dialog_options textarea, #ponyhoof_options_tabs_advanced input[type="text"] {font-family:Consolas,"Andale Mono WT","Andale Mono","Lucida Console","Lucida Sans Typewriter","DejaVu Sans Mono","Bitstream Vera Sans Mono","Liberation Mono","Nimbus Mono L",Monaco,"Courier New",Courier,monospace;}';
			css += '#ponyhoof_dialog_options textarea {resize:vertical;width:100%;height:60px;min-height:60px;line-height:normal;}';
			css += '#ponyhoof_dialog_options .ponyhoof_tabs > a[data-ponyhoof-tab="advanced"] {display:none;}';
			css += '#ponyhoof_dialog_options.ponyhoof_options_debugExposed .ponyhoof_tabs > a[data-ponyhoof-tab="advanced"] {display:block;}';

			// 214px
			css += '.ponyhoof_options_fatradio {margin:10px 0;}';
			css += '.ponyhoof_options_fatradio li {width:222px;float:left;margin-left:12px;}';
				css += '#ponyhoof_options_tabs_background.hasCustom .ponyhoof_options_fatradio li {width:144px;}';
			css += '.ponyhoof_options_fatradio li:first-child {margin:0;}';
			css += '.ponyhoof_options_fatradio a {border:1px solid rgba(0,0,0,.3);display:block;text-align:center;width:100%;text-decoration:none;border-radius:3px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;}';
			css += '.ponyhoof_options_fatradio a:hover {box-shadow:0 0 8px rgba(0,0,0,.3);}';
			css += '.ponyhoof_options_fatradio a:active {background:#ECEFF5;box-shadow:0 0 8px rgba(0,0,0,.7);}';
			css += '.ponyhoof_options_fatradio li.active a {background-color:#6D84B4;border-color:#3b5998;color:#fff;}';
			css += '.ponyhoof_options_fatradio span {padding:4px;display:block;}';
			css += '.ponyhoof_options_fatradio .wrap i {height:200px;width:100%;display:block;=webkit-transition:all .2s ease-in;-moz-transition:.2s ease-in;-o-transition:.2s ease-in;transition:.2s ease-in;}';
				css += '#ponyhoof_options_tabs_background.hasCustom .ponyhoof_options_fatradio .wrap i {height:144px;}';
			css += '#ponyhoof_options_background_cutie .wrap {padding:8px;}';
			css += '#ponyhoof_options_background_cutie .wrap i {width:206px;height:184px;}';
				css += '#ponyhoof_options_tabs_background.hasCustom #ponyhoof_options_background_cutie .wrap i {width:128px;height:128px;}';
			css += '#ponyhoof_options_background_custom {display:none;}';
				css += '#ponyhoof_options_tabs_background.hasCustom #ponyhoof_options_background_custom {display:block;}';
			css += '#ponyhoof_options_background_custom .wrap i {background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABh0lEQVRIx82WP2oCURDGFwsrSWEVPIMH8AAWSwiL4H6/BSuxCDlCSBHIESRFziMWOYFFqlRiIRZWi6QwRQxslvfP7K5k4FVvZ35vZ+Z986LoDANGwC7LsmOWZUdgB4yipqwIK0IrBZX0AByAjaS4uFeG/aySP5IWwIukjg/2VDp9XoT6gJJmJf+lFSppagoG5MANMLIBgZGke8veUlLbVJ+5LWDVBQxNwAGQNwTs29Ia1w2VNPM1Tgx8XgR2AraBbQ1p3BqbxQCcOIKsJZEkSS9Jkp4kgLXjDydeuXLA3iV1DQfsAqsA/28ZDIGdTpu6NDYwzbsotCZxHF85ytAJjXN5YGhKXWPorJRKSoF9wMerik2zN/ZBwLVIJV2fVnr2tTAA7+qStfF4fOuDTWsW7bw8xIuF7zc0KXJgYAIOG5yHc6NoS3qzOHyESB9wsDTP1HqBgaVhxLQkpR7Za5nmKfDsa5wO8CppIYk/vNpiYAMcJD1WekKGAAvW+p8PYU+6f8mgVa4c9gXXnNjGKCXX6gAAAABJRU5ErkJggg==") no-repeat center center;}';

			css += '#ponyhoof_options_background_error, #ponyhoof_options_background_message {margin-bottom:10px;}';
			css += '#ponyhoof_options_background_drop {background:#fff;border:2px dashed #75a3f5;padding:8px;position:relative;}'; //margin-bottom:8px;
			css += '#ponyhoof_options_background_drop_dropping {background:#fff;background:rgba(255,255,255,.95);border:2px dashed #75a3f5;color:#75a3f5;position:absolute;top:-2px;left:-2px;width:100%;height:100%;font-size:16px;line-height:64px;text-align:center;font-weight:bold;display:none;}';
			css += '#ponyhoof_options_background_drop.ponyhoof_dropping #ponyhoof_options_background_drop_dropping {display:block;}';
			css += '#ponyhoof_options_background_selectOuterWrap {position:relative;display:inline-block;top:-3px;}';
			css += '#ponyhoof_options_background_selectFileWrap {position:absolute;width:100%;height:100%;top:0;left:0;overflow:hidden;}';
			css += '#ponyhoof_options_background_select {font-size:1000px !important;opacity:0;padding:0;margin:0;position:absolute;bottom:0;right:0;cursor:pointer;}';

			css += '#ponyhoof_options_tabs_main .ponyhoof_message {margin-top:10px;}';
			css += '#ponyhoof_browserponies .ponyhoof_loading {display:none;margin-top:0;vertical-align:text-bottom;}';
			css += '#ponyhoof_browserponies.ponyhoof_browserponies_loading .ponyhoof_loading {display:inline-block;}';
			css += '#ponyhoof_options_randomPonies {margin-bottom:3px;overflow:hidden;height:0;opacity:0;-webkit-transition:height .1s ease .1s, opacity .1s linear 0;-moz-transition:height .1s ease .1s, opacity .1s linear 0;-o-transition:height .1s ease .1s, opacity .1s linear 0;transition:height .1s ease .1s, opacity .1s linear 0;}';
			css += '#ponyhoof_options_randomPonies.show {height:29px;opacity:1;overflow:visible;-webkit-transition-delay:0, .1s;-moz-transition-delay:0, .1s;-o-transition-delay:0, .1s;transition-delay:0, .1s;}';
			css += '#ponyhoof_options_randomPonies .ponyhoof_loading {display:none !important;}';
			css += '#ponyhoof_options_randomPonies .ponyhoof_menuitem_checked {display:block;}';

			css += '#ponyhoof_options_tabs_sounds .usingPage {margin-bottom:10px;}';
			css += '#ponyhoof_options_soundsSettingsWrap {margin-top:-14px;}';
			css += '.ponyhoof_options_volumeRange > input {vertical-align:middle;width:50px;}';
			css += '.ponyhoof_options_volumeRange > input[type="range"] {cursor:pointer;width:200px;margin:2px;}';
			css += '.ponyhoof_options_volumeRange > .uiButton {vertical-align:middle;}';
			css += '.ponyhoof_options_volumeRange > .ponyhoof_options_volumeRange_value {display:none;padding-left:3px;}';
			css += '#ponyhoof_options_soundsChatSoundWarning {margin-bottom:10px;}';
			css += '#ponyhoof_options_soundsChatSetting {margin:0;}';

			css += '#ponyhoof_options_tabs_extras .ponyhoof_show_if_injected + .uiInputLabel, #ponyhoof_options_tabs_extras .uiInputLabel + .ponyhoof_show_if_injected, #ponyhoof_options_tabs_advanced .uiInputLabel + .ponyhoof_show_if_injected {margin-top:3px;}';
			css += '.Locale_en_US #ponyhoof_options_label_forceEnglish, .Locale_en_GB #ponyhoof_options_label_forceEnglish {display:none;}';

			css += '#ponyhoof_options_tabs_advanced .ponyhoof_hide_if_injected.ponyhoof_message {margin-bottom:10px;}';

			css += '.ponyhoof_options_aboutsection {border-top:1px solid #ccc;margin:10px -10px 0;}';
			css += '.ponyhoof_options_aboutsection > .inner {border-top:1px solid #E9E9E9;padding:10px 10px 0;}';
			css += '#ponyhoof_options_devpic {display:block;}';
			css += '#ponyhoof_options_devpic img {width:50px !important;height:50px !important;}';
			css += '#ponyhoof_options_twitter {margin-top:10px;width:100%;height:20px;}';
			css += '#ponyhoof_options_plusone {margin-top:10px;height:23px;}';

			css += '#ponyhoof_donate {background:#EDEFF4;border:1px solid #D2DBEA;color:#9CADCF;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;}';
			css += '#ponyhoof_donate .inner {background:#EDEFF4;display:block;font-size:16px;font-weight:bold;height:75px;line-height:75px;text-align:center;float:left;width:50%;}';
			css += '#ponyhoof_donate a {display:block;width:100%;color:#9CADCF;text-decoration:none;}';
			css += '#ponyhoof_options_donatepaypal {border-right:1px solid #D2DBEA;}';
			//css += '#ponyhoof_donate_flattr {background-image:url("//api.flattr.com/button/flattr-badge-large.png");background-position:center center;background-repeat:no-repeat;text-indent:-99999px;}';
			css += '#ponyhoof_donate_flattr_iframe {width:55px;height:62px;margin-top:6px;}';
			css += '#ponyhoof_donate a:hover {background-color:#DEDFE7;color:#3B5998;}';
			
			injectManualStyle(css, 'options');
		};
		
		k.show = function() {
			if (!k.created) {
				k.create();
			}
			k.dialog.show();
		};
		
		k.kr = false;
		k.ks = [];
		k.kc = '\x33\x38\x2C\x33\x38\x2C\x34\x30\x2C\x34\x30\x2C\x33\x37\x2C\x33\x39\x2C\x33\x37\x2C\x33\x39\x2C\x36\x36\x2C\x36\x35';
		k.kf = function(e) {
			if (k.kr) {
				return;
			}
			
			k.ks.push(e.which);
			if (k.ks.join(',').indexOf(k.kc) > -1) {
				k.kr = true;
				k.dialog.close();
				
				var width = 720;
				var height = 405;
				
				injectManualStyle('#ponyhoof_dialog_ky .generic_dialog_popup,#ponyhoof_dialog_ky .popup{width:740px;}#ponyhoof_dialog_ky .generic_dialog{z-index:250 !important;}#ponyhoof_kc_align{margin:8px auto 0;text-align:center;}', 'kx');
				var di = new Dialog('ky');
				di.alwaysModal = true;
				di.create();
				di.changeTitle("\x54\x48\x45\x20\x55\x4C\x54\x49\x4D\x41\x54\x45\x20\x42\x52\x4F\x4E\x59\x20\x43\x48\x41\x4C\x4C\x45\x4E\x47\x45");
				di.changeContent('<iframe src="//hoof.little.my/files/-CH4cn-L3yA.htm" width="100%" height="405" scrolling="auto" frameborder="0" allowtransparency="true"></iframe><div id="ponyhoof_kc_align"><a href="#" class="uiButton uiButtonSpecial ponyhoof_noShareIsCare" id="ponyhoof_kc_share" role="button" data-hover="tooltip" aria-label="\x53\x4F\x20\x4D\x55\x43\x48\x20\x50\x4F\x4E\x59" data-tooltip-alignh="center"><span class="uiButtonText">\x53\x48\x41\x52\x45\x20\x57\x49\x54\x48\x20\x59\x4F\x55\x52\x20\x50\x41\x4C\x53\x21</span></a></div>');
				di.addCloseButton();
				di.onclosefinish = function() {
					di.changeContent('');
				};
				
				$('ponyhoof_kc_share').addEventListener('click', function() {
					var width = 626;
					var height = 436;
					w.open('//' + getFbDomain() + '/sharer/sharer.php?u=http://www.youtube.com/watch?v=-CH4cn-L3yA', 'ponyhoof_kc_sharer', 'left='+((screen.width-width)/2)+',top='+(((screen.height-height)/2)-50)+',width='+width+',height='+height);
					return false;
				}, false);
			}
		};
		
		k.ki = function() {
			d.addEventListener('keydown', k.kf, true);
		};
	};
	
	var optionsGlobal = null;
	function optionsOpen() {
		log("Opening options...");
		
		if (!optionsGlobal) {
			optionsGlobal = new Options();
		}
		optionsGlobal.create();
		optionsGlobal.show();

		$$($('ponyhoof_dialog_options'), '#ponyhoof_options_pony .ponyhoof_button_menu', function(button) {
			try {
				button.focus();
			} catch (e) {}
		});
	}
	
	// Welcome
	var WelcomeUI = function(param) {
		var k = this;
		
		if (param) {
			k.param = param;
		} else {
			k.param = {};
		}
		k.dialogFirst = null;
		k.dialogPinkie = null;
		k.dialogFinish = null;
		
		k._stack = '';
		
		k.start = function() {
			// Prevent edge cases that the extension reloads !fixme
			if (ISCHROME && STORAGEMETHOD === 'localstorage') {
				if (chrome_isExtUpdated()) {
					extUpdatedError('\'chrome.extension\' namespace does not exist.');
					return;
				}
			}

			k.injectStyle();
			k.createScenery();
			addClass(d.documentElement, 'ponyhoof_welcome_html');
			statTrack('welcomeUI');
			
			k.showWelcome();
		};
		
		k.showWelcome = function() {
			if ($('ponyhoof_dialog_welcome')) {
				return;
			}
			
			addClass(d.documentElement, 'ponyhoof_welcome_html_scenery_loaded');
			
			var co = '';
			co += '<div class="ponyhoof_message uiBoxYellow ponyhoof_updater_newVersion">';
				co += '<a href="#" class="uiButton uiButtonSpecial rfloat ponyhoof_updater_updateNow" role="button"><span class="uiButtonText">Update now</span></a>';
				co += '<span class="wrap">An update (v<span class="ponyhoof_updater_versionNum"></span>) for Ponyhoof is available.</span>';
			co += '</div>';

			co += renderBrowserConfigWarning();

			if (STORAGEMETHOD === 'chrome' && chrome.extension.inIncognitoContext) {
				co += '<div class="ponyhoof_message uiBoxYellow">Please note that your Ponyhoof settings are saved and not cleared even if you are using Chrome incognito mode. Please disable Ponyhoof from running in incognito mode if you do not want others to know that you logged on to this browser.</div><br>';
			}

			co += '<strong>Select your favorite character to get started:</strong>';
			co += '<div id="ponyhoof_welcome_pony"></div>';
			co += '<div id="ponyhoof_welcome_afterClose">You can re-select your character in Ponyhoof Options at the Account menu.</div>';
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm uiButtonDisabled" role="button" id="ponyhoof_welcome_next"><span class="uiButtonText">Next</span></a>';
			
			DIALOGCOUNT += 5;

			k.dialogFirst = new Dialog('welcome');
			k.dialogFirst.canCardspace = false;
			k.dialogFirst.canCloseByEscapeKey = false;
			k.dialogFirst.create();
			k.dialogFirst.generic_dialogDiv.className += ' generic_dialog_fixed_overflow';
			if (BRONYNAME) {
				k.dialogFirst.changeTitle("Welcome to Ponyhoof, "+BRONYNAME+"!");
			} else {
				k.dialogFirst.changeTitle("Welcome to Ponyhoof!");
			}
			k.dialogFirst.changeContent(co);
			k.dialogFirst.changeBottom(bottom);

			k.dialogFirst.dialog.className += ' ponyhoof_dialog_localstorageWarningEmbedded';
			
			DIALOGCOUNT += 4;

			var menuClosed = false;
			var ponySelector = new PonySelector($('ponyhoof_welcome_pony'), k.param);
			ponySelector.saveTheme = false;
			ponySelector.createSelector();
			w.setTimeout(function() {
				ponySelector.menu.open();
			}, 1);
			ponySelector.menu.afterClose = function() {
				if (!menuClosed) {
					menuClosed = true;
					addClass($('ponyhoof_welcome_afterClose'), 'show');
					
					addClass(d.documentElement, 'ponyhoof_welcome_showmedemo');
					if ($('navAccount')) {
						addClass($('navAccount'), 'openToggler');
					}
					//addClass($('ponyhoof_account_options'), 'active');
					
					w.setTimeout(function() {
						removeClass($('ponyhoof_welcome_next'), 'uiButtonDisabled');
					}, 200);
				}
			};
			
			w.setTimeout(function() {
				changeThemeSmart(CURRENTPONY);
			}, 10);
			k._stack = CURRENTSTACK;
			
			w.setTimeout(function() {
				var update = new Updater();
				update.checkForUpdates();
			}, 500);
			
			// Detect if the Facebook's chat sound setting is turned off
			// We need to do this here as it is async
			try {
				if (typeof USW.requireLazy === 'function') {
					USW.requireLazy(['ChatOptions'], function(ChatOptions) {
						if (!ChatOptions.getSetting('sound')) {
							userSettings.chatSound = false;
						}
					});
				}
			} catch (e) {
				error("Unable to hook to ChatOptions");
				error(e.message);
				log(e.stack);
			}

			$('ponyhoof_welcome_next').addEventListener('click', function(e) {
				e.preventDefault();
				if (hasClass(this, 'uiButtonDisabled')) {
					return false;
				}
				
				k.dialogFirst.close();
				fadeOut($('ponyhoof_welcome_scenery'));
				
				w.setTimeout(function() {
					removeClass(d.documentElement, 'ponyhoof_welcome_showmedemo');
					removeClass($('navAccount'), 'openToggler');
					//removeClass($('ponyhoof_account_options'), 'active');
				}, 100);
				
				userSettings.theme = CURRENTPONY;
				userSettings.chatSound1401 = true;
				saveSettings();

				globalSettings.lastVersion = VERSION;
				if (globalSettings.allowLoginScreen) {
					globalSettings.lastUserId = USERID;
				}
				saveGlobalSettings();
				
				if (REALPONY === 'pinkie') {
					k.pinkieWelcome();
				} else {
					k.createFinalDialog();
				}
			}, false);
		};
		
		k.pinkieWelcome = function() {
			removeClass(d.documentElement, 'ponyhoof_welcome_html_scenery_loaded');

			var width = 720;
			var height = 405;
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_welcome_pinkie_next"><span class="uiButtonText">Stop being silly, Pinkie</span></a>';
			
			k.dialogPinkie = new Dialog('welcome_pinkie');
			k.dialogPinkie.alwaysModal = true;
			k.dialogPinkie.create();
			k.dialogPinkie.changeTitle("\x59\x4F\x55\x20\x43\x48\x4F\x4F\x53\x45\x20\x50\x49\x4E\x4B\x49\x45\x21\x3F\x21");
			k.dialogPinkie.changeContent('<iframe src="//hoof.little.my/files/aEPDsG6R4dY.htm" width="100%" height="405" scrolling="auto" frameborder="0" allowtransparency="true"></iframe>');
			k.dialogPinkie.changeBottom(bottom);
			k.dialogPinkie.onclose = function() {
				fadeOut($('ponyhoof_welcome_scenery'));
				k.createFinalDialog();
			};
			k.dialogPinkie.onclosefinish = function() {
				k.dialogPinkie.changeContent('');
			};
			
			$('ponyhoof_welcome_pinkie_next').addEventListener('click', function(e) {
				k.dialogPinkie.close();
				e.preventDefault();
			}, false);
		};
		
		k.createFinalDialog = function() {
			removeClass(d.documentElement, 'ponyhoof_welcome_html');
			removeClass(d.documentElement, 'ponyhoof_welcome_html_scenery_loaded');
			
			var c = '';

			if (UILANG !== 'en_US' && UILANG !== 'en_GB') {
				c += '<div class="ponyhoof_message uiBoxYellow"><'+'a href="//'+getFbDomain()+'/settings/language/language/?uri='+encodeURIComponent(w.location.href)+'&source=TOP_LOCALES_DIALOG" rel="dialog" id="ponyhoof_welcome_final_changelanguage">For the best Ponyhoof experience, we recommend switching your Facebook language to English (US). Why? Because ponies!</a></div><br>';
			}

			if (!ISUSINGBUSINESS) {
				c += '<span class="ponyhoof_brohoof_button">'+capitaliseFirstLetter(CURRENTSTACK['like'])+'</span> us to receive news and help for Ponyhoof!';
				c += '<div id="ponyhoof_welcome_likeWrap"><iframe src="about:blank" id="ponyhoof_welcome_like" scrolling="no" frameborder="0" allowtransparency="true"></iframe></div>';
				c += 'Got somepony else that you want to suggest? Want to leave some feedback? <a href="'+w.location.protocol+PONYHOOF_URL+'" target="_top" id="ponyhoof_welcome_posttowall">Let us know at our page!</a>';
			} else {
				c += '<a href="'+w.location.protocol+PONYHOOF_URL+'" target="_top" id="ponyhoof_welcome_posttowall">Visit our Ponyhoof page for the latest news!</a>';
			}
			
			var successText = '';
			var ponyData = convertCodeToData(REALPONY);
			if (ponyData.successText) {
				successText = ponyData.successText;
			} else {
				successText = "Yay!";
			}

			k.dialogFinish = new Dialog('welcome_final');
			if (k._stack != CURRENTSTACK) {
				k.dialogFinish.alwaysModal = true;
			}
			k.dialogFinish.create();
			k.dialogFinish.changeTitle(successText);
			k.dialogFinish.changeContent(c);
			var buttonText = CURRENTLANG.done;
			if (k._stack != CURRENTSTACK) {
				buttonText = CURRENTLANG.finish;
			}
			k.dialogFinish.changeBottom('<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_welcomefinal_ok"><span class="uiButtonText">'+buttonText+'</span></a>');
			k.dialogFinish.onclose = function() {
				if (k._stack != CURRENTSTACK) {
					w.location.reload();
				}
			};

			$('ponyhoof_welcomefinal_ok').addEventListener('click', k.dialogFinishOk, false);
			$('ponyhoof_welcomefinal_ok').focus();
			
			if (!ISUSINGBUSINESS) {
				w.setTimeout(function() {
					$('ponyhoof_welcome_like').src = '//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D' + PONYHOOF_PAGE + '&width=292&height=62&colorscheme=light&show_faces=false&stream=false&header=false&ponyhoof_runme';
				}, 1);
			}
			
			$('ponyhoof_welcome_posttowall').addEventListener('click', function(e) {
				k.dialogFinish.onclose = function() {};
				k.dialogFinish.close();
			}, false);

			if ($('ponyhoof_welcome_final_changelanguage')) {
				$('ponyhoof_welcome_final_changelanguage').addEventListener('click', function(ev) {
					k.dialogFinish.onclose = function() {};
					k.dialogFinish.close();
				}, false);
			}
		};

		k.dialogFinishOk = function(e) {
			if (k._stack != CURRENTSTACK) {
				if (hasClass(this, 'uiButtonDisabled')) {
					return false;
				}
				
				this.className += ' uiButtonDisabled';
				w.location.reload();
			} else {
				k.dialogFinish.close();
			}
			e.preventDefault();
		};
		
		k.createScenery = function() {
			if ($('ponyhoof_welcome_scenery')) {
				$('ponyhoof_welcome_scenery').style.display = 'block';
				return;
			}
			
			var n = d.createElement('div');
			n.id = 'ponyhoof_welcome_scenery';
			d.body.appendChild(n);
			
			return n;
		};
		
		k.injectStyle = function() {
			var css = '';
			css += 'html.ponyhoof_welcome_html > body {overflow:hidden;}';
			css += 'html.ponyhoof_welcome_html .fbPageBanner, html.ponyhoof_welcome_html .uiLayer[data-ownerid="userNavigationLabel"], html.ponyhoof_welcome_html ._50d1 {display:none !important;}';
			css += 'html #ponyhoof_dialog_welcome .generic_dialog_fixed_overflow {background:transparent !important;}';
			css += '#ponyhoof_welcome_scenery {width:100%;height:100%;position:fixed;top:0;left:0;background-color:#fff;background-color:rgba(252,252,252,.9);background-repeat:no-repeat;background-position:center center;z-index:'+(DIALOGCOUNT-6)+';}';
			
			//css += '#ponyhoof_dialog_welcome .generic_dialog {z-index:401 !important;}';
			css += '#ponyhoof_dialog_welcome .generic_dialog_popup, #ponyhoof_dialog_welcome .popup {width:475px !important;}';
			//css += '#ponyhoof_dialog_welcome .content {-webkit-transition:.3s linear;-webkit-transition-property:min-height, padding-top;-moz-transition:.3s linear;-moz-transition-property:min-height, padding-top;-o-transition:.3s linear;-o-transition-property:min-height, padding-top;transition:.3s linear;transition-property:min-height, padding-top;}';
			css += '#ponyhoof_dialog_welcome .ponyhoof_updater_newVersion {margin-bottom:10px;}';
			
			css += '#ponyhoof_welcome_newVersion {display:none;margin:0 0 10px;}';
			css += '#ponyhoof_welcome_pony {margin:8px 0;}';
			css += '#ponyhoof_welcome_afterClose {visibility:hidden;opacity:0;}';
			css += '#ponyhoof_welcome_afterClose.show {visibility:visible;opacity:1;-webkit-transition:opacity .3s linear;-moz-transition:opacity .3s linear;-o-transition:opacity .3s linear;transition:opacity .3s linear;}';
			
			css += 'html.ponyhoof_welcome_html_scenery_loaded #blueBar, html.ponyhoof_welcome_html_scenery_loaded #blueBar.fixed_elem {opacity:0;-webkit-transition:opacity .3s linear;-moz-transition:opacity .3s linear;-o-transition:opacity .3s linear;transition:opacity .3s linear;}';
			css += 'html.ponyhoof_welcome_showmedemo {cursor:not-allowed;}';
			css += 'html.ponyhoof_welcome_showmedemo .popup {cursor:default;}';
			css += 'html.ponyhoof_welcome_showmedemo #blueBar #pageHead {width:981px !important;padding-right:0 !important;}';
			css += 'html.sidebarMode.ponyhoof_welcome_showmedemo #pageHead, html.sidebarMode.ponyhoof_welcome_showmedemo .sidebarMode #globalContainer {left:0 !important;}';
			css += 'html.ponyhoof_welcome_showmedemo #blueBar, html.ponyhoof_welcome_showmedemo.tinyViewport #blueBar, html.ponyhoof_welcome_showmedemo #blueBar.fixed_elem, html.ponyhoof_welcome_showmedemo.tinyViewport #blueBar.fixed_elem {position:fixed !important;z-index:'+(DIALOGCOUNT-4)+';opacity:1;margin-left:0 !important;left:0 !important;right:0 !important;top:0 !important;}';
			
			css += '#ponyhoof_dialog_welcome_pinkie .generic_dialog_popup, #ponyhoof_dialog_welcome_pinkie .popup {width:720px;}';
			css += '#ponyhoof_dialog_welcome_pinkie .content {line-height:0;padding:0;}';
			
			css += '#ponyhoof_welcome_likeWrap {margin:8px 0;}';
			css += '#ponyhoof_welcome_like {border:none;overflow:hidden;width:292px;height:62px;margin:0;}';
			
			if (ISMOBILE) {
				css += '#ponyhoof_welcome_scenery {background-image:none !important;}';
			}

			injectManualStyle(css, 'welcome');
		};
	};

	var renderBrowserConfigWarning = function() {
		var c = '';
		if (STORAGEMETHOD === 'localstorage') {
			c += '<div class="ponyhoof_message uiBoxRed">Ponyhoof is not supported on this browser configuration. Your settings will get cleared out from time to time, and some features such as update-checking and Browser Ponies will not work.</div><br>';
		} else if (ISMOBILE) {
			c += '<div class="ponyhoof_message uiBoxYellow">Mobile support for Ponyhoof is provided as a courtesy and is not officially supported.</div><br>';
		}
		return c;
	};
	
	// Theme
	function getFaviconTag() {
		var l = d.getElementsByTagName('link');
		for (var i = 0, len = l.length; i < len; i += 1) {
			if (l[i].getAttribute('rel') === 'shortcut icon') {
				return l[i];
			}
		}
		
		return false;
	}
	
	function changeFavicon(character) {
		if (userSettings.noFavicon) {
			return;
		}

		var favicon = getFaviconTag();
		var newIcon;
		
		if (favicon) {
			// Don't change the favicon on apps.facebook.com
			if (w.location.hostname.indexOf('apps.') === 0) {
				if (favicon.href.indexOf('.ico') !== favicon.href.length-('.ico'.length)) {
					return;
				}
			}

			newIcon = favicon.cloneNode(true);
		} else {
			newIcon = d.createElement('link');
			newIcon.rel = 'shortcut icon';
		}
		
		if (character !== 'NONE') {
			newIcon.type = 'image/png';

			var data = convertCodeToData(character);
			if (data.icon16) {
				newIcon.href = THEMEURL + data.icon16;
			} else {
				newIcon.href = THEMEURL + character + '/icon16.png';
			}
		} else {
			newIcon.type = 'image/x-icon';
			newIcon.href = '//fbstatic-a.akamaihd.net/rsrc.php/yl/r/H3nktOa7ZMg.ico';
		}

		if (favicon) {
			favicon.parentNode.replaceChild(newIcon, favicon);
		} else {
			d.head.appendChild(newIcon);
		}
	}
	
	function changeStack(character) {
		var pony = convertCodeToData(character);
		CURRENTSTACK = STACKS_LANG[0];
		if (pony.stack) {
			for (var i = 0, len = STACKS_LANG.length; i < len; i += 1) {
				if (STACKS_LANG[i].stack == pony.stack) {
					CURRENTSTACK = STACKS_LANG[i];
					break;
				}
			}
		}

		if (UILANG === 'fb_LT') {
			if (CURRENTSTACK['people'] === 'ponies') {
				CURRENTSTACK['people'] = 'pwnies';
			}
			if (CURRENTSTACK['person'] === 'pony') {
				CURRENTSTACK['person'] = 'pwnie';
			}
			if (CURRENTSTACK['like'] === 'brohoof') {
				CURRENTSTACK['like'] = '/)';
			}
			if (CURRENTSTACK['likes'] === 'brohoofs') {
				CURRENTSTACK['likes'] = '/)';
			}
			//if (CURRENTSTACK['unlike'] === 'unbrohoof') {
			//	CURRENTSTACK['unlike'] = '/)(\\';
			//}
			if (CURRENTSTACK['like_past'] === 'brohoof') {
				CURRENTSTACK['like_past'] = '/)';
			}
			if (CURRENTSTACK['likes_past'] === 'brohoofs') {
				CURRENTSTACK['likes_past'] = '/)';
			}
			if (CURRENTSTACK['liked'] === 'brohoof\'d') {
				CURRENTSTACK['liked'] = '/)';
			}
			if (CURRENTSTACK['liked_button'] === 'brohoof\'d') {
				CURRENTSTACK['liked_button'] = '/)';
			}
			if (CURRENTSTACK['liking'] === 'brohoofing') {
				CURRENTSTACK['liking'] = '/)';
			}
		}
	}
	
	var changeThemeFuncQueue = [];
	function changeTheme(character) {
		addClass(d.documentElement, 'ponyhoof_injected');
		
		REALPONY = character;
		d.documentElement.setAttribute('data-ponyhoof-character', character);

		changeFavicon(character);
		changeStack(character);
		buildStackLang();
		
		if (changeThemeFuncQueue) {
			for (var x in changeThemeFuncQueue) {
				if (changeThemeFuncQueue.hasOwnProperty(x) && changeThemeFuncQueue[x]) {
					changeThemeFuncQueue[x]();
				}
			}
		}

		// Did we injected our theme already?
		if ($('ponyhoof_userscript_style')) {
			changeCostume(userSettings.costume);
			$('ponyhoof_userscript_style').href = THEMECSS+character+THEMECSS_EXT;
			return;
		}
		
		addClass(d.documentElement, 'ponyhoof_initial');
		w.setTimeout(function() {
			removeClass(d.documentElement, 'ponyhoof_initial');
		}, 1000);

		var n = d.createElement('link');
		n.href = THEMECSS+character+THEMECSS_EXT;
		n.type = 'text/css';
		n.rel = 'stylesheet';
		n.id = 'ponyhoof_userscript_style';
		d.head.appendChild(n);

		changeCostume(userSettings.costume);
	}
	
	function getRandomPony() {
		while (1) {
			var r = randNum(0, PONIES.length-1);
			if (!PONIES[r].hidden) {
				return PONIES[r].code;
			}
		}
	}
	
	function getRandomMane6() {
		while (1) {
			var r = randNum(0, PONIES.length-1);
			if (PONIES[r].mane6) {
				return PONIES[r].code;
			}
		}
	}
	
	function convertCodeToData(code) {
		for (var i = 0, len = PONIES.length; i < len; i += 1) {
			if (PONIES[i].code == code) {
				return PONIES[i];
			}
		}
		
		return false;
	}
	
	function changeThemeSmart(theme) {
		switch (theme) {
			case 'NONE':
				removeClass(d.documentElement, 'ponyhoof_injected');
				changeFavicon('NONE');
				changeCostume(null);
				
				var style = $('ponyhoof_userscript_style');
				if (style) {
					style.parentNode.removeChild(style);
				}
				break;

			case 'RANDOM':
				var current = [];
				if (userSettings.randomPonies) {
					current = userSettings.randomPonies.split('|');
					changeTheme(current[Math.floor(Math.random() * current.length)]);
				} else {
					changeTheme(getRandomPony());
				}

				break;

			default:
				if (theme === 'login' || convertCodeToData(theme)) {
					changeTheme(theme);
				} else {
					error("changeThemeSmart: " + theme + " is not a valid theme.");
					userSettings.theme = null;
					CURRENTPONY = REALPONY = 'NONE';
				}
				break;
		}
	}

	function changeCustomBg(base64) {
		if (!base64) {
			removeClass(d.documentElement, 'ponyhoof_settings_login_bg');
			removeClass(d.documentElement, 'ponyhoof_settings_customBg');

			var style = $('ponyhoof_style_custombg');
			if (style) {
				style.parentNode.removeChild(style);
			}
			return;
		}

		addClass(d.documentElement, 'ponyhoof_settings_login_bg');
		addClass(d.documentElement, 'ponyhoof_settings_customBg');

		var backgroundSize = 'auto';
		if (userSettings.customBgDpr && userSettings.customBgDpr !== 1 && w.devicePixelRatio && w.devicePixelRatio === userSettings.customBgDpr) {
			var width = userSettings.customBgWidth / userSettings.customBgDpr;
			var height = userSettings.customBgHeight / userSettings.customBgDpr;
			if (width === w.screen.width && height === w.screen.height) {
				backgroundSize = width+'px '+height+'px !important';
			}
		}

		if (!$('ponyhoof_style_custombg')) {
			injectManualStyle('', 'custombg');
		}
		$('ponyhoof_style_custombg').textContent = '/* '+SIG+' */ html,.fbIndex{background-position:center center !important;background-image:url("'+base64+'") !important;background-repeat:no-repeat;-moz-background-size:'+backgroundSize+';background-size:'+backgroundSize+';}';
	}

	var changeCostume = function(costume) {
		// Make sure the costume exists
		if (!COSTUMESX[costume]) {
			removeCostume();
			return false;
		}

		// Make sure the character has the costume
		if (!doesCharacterHaveCostume(REALPONY, costume)) {
			//removeCostume(); // leaving the costume alone wouldn't hurt...
			return false;
		}

		d.documentElement.setAttribute('data-ponyhoof-costume', costume);
	};

	var removeCostume = function() {
		d.documentElement.removeAttribute('data-ponyhoof-costume');
	};

	var doesCharacterHaveCostume = function(character, costume) {
		return (COSTUMESX[costume] && COSTUMESX[costume].characters && COSTUMESX[costume].characters.indexOf(character) != -1);
	};

	function getBronyName() {
		var name = d.querySelector('.headerTinymanName, #navTimeline > .navLink, .fbxWelcomeBoxName, ._521h ._4g5y');
		if (name) {
			BRONYNAME = name.textContent;
		}

		return BRONYNAME;
	}

	function getDefaultUiLang() {
		if (!d.body) {
			return false;
		}
		var classes = d.body.className.split(' ');
		for (var i = 0, len = classes.length; i < len; i += 1) {
			if (classes[i].indexOf('Locale_') == 0) {
				return classes[i].substring('Locale_'.length);
			}
		}

		return false;
	}

	var findFriendshipText = function() {
		if (CURRENTLANG['stacks_' + CURRENTSTACK.stack + '_findFriendship']) {
			return CURRENTLANG['stacks_' + CURRENTSTACK.stack + '_findFriendship'];
		}
		return CURRENTSTACK['findFriendship'];
	};
	
	// Screen saver
	var screenSaverTimer = null;
	var screenSaverActive = false;
	var screenSaverInactivity = function() {
		if (!screenSaverActive) {
			addClass(d.body, 'ponyhoof_screensaver');
		}
		screenSaverActive = true;
	};
	var screenSaverActivity = function() {
		if (screenSaverActive) {
			removeClass(d.body, 'ponyhoof_screensaver');
		}
		screenSaverActive = false;
		
		w.clearTimeout(screenSaverTimer);
		screenSaverTimer = w.setTimeout(screenSaverInactivity, 30000);
	};
	var screenSaverActivate = function() {
		var mousemoveX = 0;
		var mousemoveY = 0;
		
		d.addEventListener('click', screenSaverActivity, true);
		d.addEventListener('mousemove', function(e) {
			if (mousemoveX == e.clientX && mousemoveY == e.clientY) {
				return;
			}
			mousemoveX = e.clientX;
			mousemoveY = e.clientY;
			
			screenSaverActivity();
		}, true);
		d.addEventListener('keydown', screenSaverActivity, true);
		d.addEventListener('contextmenu', screenSaverActivity, true);
		d.addEventListener('mousewheel', screenSaverActivity, true);
		d.addEventListener('touchstart', screenSaverActivity, true);
		
		screenSaverActivity();
	};
	
	// DOMNodeInserted
	var domReplaceText = function(ele, cn, deeper, regex, text) {
		var t = '';
		var id = ele.getAttribute('id');
		if ((cn == '' && deeper == '') || (cn && hasClass(ele, cn)) || (cn && id && id == nc)) {
			t = ele.innerHTML;
			t = t.replace(regex, text);
			if (ele.innerHTML != t) {
				ele.innerHTML = t;
			}
			
			return;
		}
		
		if (deeper) {
			var query = ele.querySelectorAll(deeper);
			if (query.length) {
				for (var i = 0, len = query.length; i < len; i += 1) {
					t = query[i].innerHTML;
					t = t.replace(regex, text);
					if (query[i].innerHTML != t) {
						query[i].innerHTML = t;
					}
				}
			}
		}
	};
	
	var _fb_input_placeholderChanged = false;
	var domChangeTextbox = function(ele, cn, text, details) {
		details = details || {}; // selectOnly
		var query = ele.querySelectorAll(cn);
		if (!query.length) {
			return;
		}
		// this is also used by k.ponyhoofComposer() which may run when Ponyhoof is soft-disabled
		if (CURRENTPONY && CURRENTPONY !== 'NONE' && !_fb_input_placeholderChanged) {
			contentEval(function(arg) {
				try {
					if (typeof window.requireLazy === 'function') {
						window.requireLazy(['Input'], function(Input) {
							var _setPlaceholder = Input.setPlaceholder;
							Input.setPlaceholder = function(textbox, t) {
								if (!textbox.getAttribute('data-ponyhoof-ponified-overridefb')) {
									if (textbox != document.activeElement) {
										_setPlaceholder(textbox, t);
									}
									textbox.setAttribute('data-ponyhoof-ponified-overridefb', 1);
								} else {
									// we already overridden, now FB wants to change the placeholder
									if (textbox.getAttribute('placeholder') == '' && t) {
										if (textbox.title) {
											// for composer
											_setPlaceholder(textbox, textbox.title);
										} else {
											// for typeahead (share dialog > private message)
											_setPlaceholder(textbox, t);
										}
									} else if (t == '') {
										// allow blanking placeholder (for typeahead)
										_setPlaceholder(textbox, t);
									}
								}
							};
						});
					}
				} catch (e) {
					if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
						console.log("Unable to override Input.setPlaceholder()");
						console.dir(e);
					}
				}
			}, {});
			_fb_input_placeholderChanged = true;
		}

		for (var i = 0, len = query.length; i < len; i += 1) {
			var textbox = query[i];
			if (!details.selectOnly) {
				if (textbox.getAttribute('data-ponyhoof-ponified')) {
					continue;
				}
				textbox.setAttribute('data-ponyhoof-ponified', 1);

				var placeholder = '';
				var original = textbox.getAttribute('placeholder');

				if (typeof text === 'function') {
					placeholder = text(textbox);
				} else {
					placeholder = text;
				}

				if (placeholder != original) {
					textbox.title = placeholder;
					textbox.setAttribute('aria-label', placeholder);
					textbox.setAttribute('placeholder', placeholder);

					if (hasClass(textbox, 'DOMControl_placeholder')) {
						textbox.value = placeholder;
					}

					textbox.setAttribute('data-ponyhoof-ponified-overridefb', 1);
				}
			} else {
				text(textbox);
			}
		}
	};

	var domReplaceFunc = function(ele, cn, deeper, func) {
		if (!ele || (cn == '' && deeper == '')) {
			return;
		}
		
		var id = ele.getAttribute('id');
		if ((cn && hasClass(ele, cn)) || (cn && id && id == cn)) {
			func(ele);
			return;
		}
		
		if (deeper) {
			var query = ele.querySelectorAll(deeper);
			if (query.length) {
				for (var i = 0, len = query.length; i < len; i += 1) {
					func(query[i]);
				}
			}
		}
	};
	
	var replaceText = function(arr, t) {
		var lowercase = t.toLowerCase();
		for (var i = 0, len = arr.length; i < len; i += 1) {
			if (arr[i][0] instanceof RegExp) {
				t = t.replace(arr[i][0], arr[i][1]);
			} else {
				if (arr[i][0].toLowerCase() == lowercase) {
					t = arr[i][1];
				}
			}
		}
		
		return t;
	};

	var loopChildText = function(ele, func) {
		if (!ele || !ele.childNodes) {
			return;
		}
		for (var i = 0, len = ele.childNodes.length; i < len; i += 1) {
			func(ele.childNodes[i]);
		}
	};
	
	var buttonTitles = [];
	var dialogTitles = [];
	var tooltipTitles = [];
	var headerTitles = [];
	var menuTitles = [];
	var menuPrivacyOnlyTitles = [];
	var dialogDerpTitles = [];
	var headerInsightsTitles = [];
	var dialogDescriptionTitles = [];
	var dialogNukeTitles = [];
	function buildStackLang() {
		var ponyData = convertCodeToData(REALPONY);

		buttonTitles = [
			["Done", "Eeyup"]
			,["Okay", "Eeyup"]
			,["Done Editing", "Eeyup"]
			,["Save Changes", "Eeyup"]
			,["OK", "Eeyup"]
			
			,[/everyone/i, "Everypony"] // for Everyone (Most Recent)
			,["Everybody", "Everypony"]
			,["Public", "Everypony"]
			,["Anyone", "Anypony"]
			,["Friends of Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends of Guests", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of Guests"]
			,["Friends of Contributors", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of Contributors"]
			,["Only Me", "Alone"]
			,["Only me", "Alone"]
			,["Only Me (+)", "Alone (+)"]
			,["Only me (+)", "Alone (+)"]
			,["No One", "Alone"]
			,["Nobody", "Nopony"]
			
			,["Add Friend", "Add "+capitaliseFirstLetter(CURRENTSTACK['friend'])]
			,["Friend Request Sent", "Friendship Request Sent"]
			,["Respond to Friend Request", "Respond to Friendship Request"]
			,["Like", capitaliseFirstLetter(CURRENTSTACK['like'])]
			,["Liked", capitaliseFirstLetter(CURRENTSTACK['liked_button'])]
			,["Unlike", capitaliseFirstLetter(CURRENTSTACK['unlike'])]
			,["Like Page", capitaliseFirstLetter(CURRENTSTACK['like'])+" Page"]
			,["Like This Page", capitaliseFirstLetter(CURRENTSTACK['like'])+" This Page"]
			,["Suggest Friends", "Suggest "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Suggest Friend", "Suggest "+capitaliseFirstLetter(CURRENTSTACK['friend'])]
			,["All Friends", "All "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["All friends", "All "+CURRENTSTACK['friends']]
			,["Poke", "Nuzzle"]
			,["Request Deleted", "Request Nuked"]
			,["<3", capitaliseFirstLetter(CURRENTSTACK['like'])] // fb_LT
			
			,["Likes", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Friends' Posts", capitaliseFirstLetter(CURRENTSTACK['friends'])+"' Posts"]
			
			,["Photos", "Pony Pics"]
			,["People", capitaliseFirstLetter(CURRENTSTACK['people'])]
			,["Banned", "Banished to Moon"]
			,["Blocked", "Banished to Moon"]
			,["People who like this", capitaliseFirstLetter(CURRENTSTACK.people)+" that "+CURRENTSTACK.like_past+" this"]
			,["Pages that like this", "Pages that "+CURRENTSTACK.like_past+" this"]
			
			,["Delete and Ban User", "Nuke and Banish to Moon"]
			,["Remove from Friends", "Banish to Moon"]
			,["Delete", "Nuke"]
			,["Delete Photo", "Nuke Pony Pic"]
			,["Delete Page", "Nuke Page"]
			,["Delete All", "Nuke All"]
			,["Delete Selected", "Nuke Selected"]
			,["Delete Conversation", "Nuke Conversation"]
			,["Delete Message", "Nuke Friendship Report"]
			,["Delete Messages", "Nuke Friendship Reports"]
			,["Delete Post", "Nuke Post"]
			,["Remove", "Nuke"]
			,["Delete Report", "Nuke This Whining"]
			,["Report", "Whine"]
			,["Report as Spam", "Whine as Spam"]
			,["Clear Searches", "Nuke Searches"]
			,["Report/Remove Tags", "Whine/Nuke Tags"]
			,["Untag Photo", "Untag Pony Pic"]
			,["Untag Photos", "Untag Pony Pics"]
			,["Delete My Account", "Nuke My Account"]
			,["Allowed on Timeline", "Allowed on Journal"]
			,["Hidden from Timeline", "Hidden from Journal"]
			,["Unban", "Unbanish"]
			,["Delete Album", "Nuke Album"]
			,["Cancel Report", "Cancel Whining"]
			,["Unfriend", "Banish to Moon"]
			,["Delete List", "Nuke List"]
			,["Delete Group", "Nuke Herd"]
			,["Report Place", "Whine about Place"] // places editor
			,["Delete Image", "Nuke Pony Pic"]
			,["Delete App", "Nuke Magic"]
			,["Remove Post", "Nuke Post"]
			,["Remove Search", "Nuke Search"]
			
			,["Messages", "Trough"]
			,["New Message", "Write a Friendship Report"]
			,["Other Messages", "Other Friendship Reports"]
			,["Stay on Message", "Stay on Friendship Report"]
			
			,["Share Photo", "Share Pony Pic"]
			,["Share Application", "Share Magic"]
			,["Share Note", "Share Scroll"]
			,["Share Question", "Share Query"]
			,["Share Event", "Share Adventure"]
			,["Share Group", "Share Herd"]
			,["Send Message", "Send Friendship Letter"]
			,["Share Photos", "Share Pony Pics"]
			,["Share This Note", "Share This Scroll"] // entstream
			,["Share This Photo", "Share This Pony Pic"]
			,["Share Group Post", "Share Herd Post"]
			
			,["Add Friends", "Add "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Go to App", "Go to Magic"]
			,["Back to Timeline", "Back to Journal"]
			,["Add App", "Add Magic"]
			,["Get More Likes", "Get More "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Advertise Your App", "Advertise Your Magic"]
			,["Leave App", "Leave Magic"]
			,["Find another app", "Find another magic"]
			,["Post on your timeline", "Post on your journal"]
			,["App Center", "Magic Center"]
			,["View App Center", "View Magic Center"]

			,["Events", "Adventures"]
			,["Page Events", "Page Adventures"]
			,["Suggested Events", "Suggested Adventures"]
			,["Past Events", "Past Adventures"]
			,["Declined Events", "Declined Adventures"]
			,["Create Event", "Plan an Adventure"]
			,["Save Event", "Save Adventure"]
			,["Back to Event", "Back to Adventure"]
			,["Invite Friends", "Invite "+capitaliseFirstLetter(CURRENTSTACK['friends_logic'])]
			,["Page Event", "Page Adventures"]
			,["Upcoming Events", "Upcoming Adventures"]
			,["Group Events", "Herd Adventures"]
			,["Change Event Photo", "Change Pony Pic for Adventure"]
			,["Add Event Photo", "Add Pony Pic for Adventure"]
			,["+ Create an Event", "+ Plan an Adventure"]

			,["Friend Activity", capitaliseFirstLetter(CURRENTSTACK['friend'])+" Activity"]
			,["Activity Log", "Adventure Log"]

			,["Invite More Friends", "Invite More Pals"]
			,["Find Friends", findFriendshipText()]
			//,["Pages I Like", "Pages I "+capitaliseFirstLetter(CURRENTSTACK['like_past'])]
			,["Find My Friends", findFriendshipText()]
			
			,["Leave Group", "Leave Herd"]
			,["Set Up Group Address", "Set Up Herd Address"]
			,["Change Group Photo", "Change Herd Pony Pic"]
			//,["Notifications", "Sparks"]
			,["Start Chat", "Start Whinny Chat"]
			,["Create Group", "Create Herd"]
			,["Add People", "Add "+capitaliseFirstLetter(CURRENTSTACK['people'])]
			,["Groups", "Herds"]
			,["Join Group", "Join the Herd"]
			,["View group", "View herd"]
			,["Create New Group", "Create New Herd"]
			,["Set Up Group", "Set Up Herd"] // tour
			,["Add to Group", "Add to Herd"] // member_suggestion
			,["Friends and Admins Only", capitaliseFirstLetter(CURRENTSTACK['friends']) + " and Admins Only"]
			
			,["Move photo", "Move pony pic"]
			,["Delete Photos", "Nuke Pony Pics"]
			,["Keep Photos", "Keep Pony Pics"]
			,["Save Photo", "Save Pony Pic"]
			,["Tag Photos", "Tag Pony Pics"]
			,["Add Photos", "Add Pony Pics"]
			,["Upload Photos", "Upload Pony Pics"]
			,["Tag Photo", "Tag Pony Pic"]
			,["Add More Photos", "Add More Pony Pics"]
			,["Post Photos", "Post Pony Pics"]
			,["Add Photos to Map", "Add Pony Pics to Map"]
			,["Add Photo", "Add Pony Pic"]
			,["Make Profile Picture", "Make Journal Pony Pic"]
			
			,["On your own timeline", "On your own journal"]
			,["On a friend's timeline", "On a "+CURRENTSTACK['friend']+"'s journal"]
			,["In a group", "In a herd"]
			,["In a private message", "In a private friendship report"]
			,["Share on your timeline", "Share on your journal"]
			,["Share on a friend's timeline", "Share on a "+CURRENTSTACK['friend']+"'s journal"]
			,["Share in a group", "Share in a herd"]
			,["Send in a private message", "Send in a private friendship report"]

			,["Timeline", "Journal"]
			,["Notes", "Scrolls"]
			,["Comments", "Friendship Letters"]
			,["Posts and Apps", "Posts and Magic"]
			,["Timeline Review", "Journal Review"]
			,["Pokes", "Nuzzles"]
			,["Add to Timeline", "Add to Journal"]

			,["Photo", "Pony Pic"]
			,["Question", "Query"]

			//,["Create List", "Create Directory"]
			,["See All Friends", "See All "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			//,["Manage List", "Manage Directory"]
			,["Write a Note", "Write a Scroll"]
			,["Add Note", "Add Scroll"]
			,["Edit Featured Likes", "Edit Featured "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Add Featured Likes", "Add Featured "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Add profile picture", "Add journal pony pic"]
			,["Edit Profile Picture", "Edit Journal Pony Pic"]
			//,["Create an Ad", "Buy a Cupcake"]
			//,["On This List", "On This Directory"]
			,["Friend Requests", "Friendship Requests"]
			//,["Add Friends to List", "Add "+capitaliseFirstLetter(CURRENTSTACK['friends'])+" to Directory"]
			,["Add Friends to List", "Add "+capitaliseFirstLetter(CURRENTSTACK['friends'])+" to List"]

			,[/^Pages I Like$/, "Pages I "+capitaliseFirstLetter(CURRENTSTACK['like_past'])]
			,[/^Pages I like$/, "Pages I "+CURRENTSTACK['like_past']]
			,["Pages that I like", "Pages that I "+CURRENTSTACK['like_past']]
			,["Pages liked by my friends", "Pages " + CURRENTSTACK['like_past'] + " by my " + CURRENTSTACK['friends']]
			,["My Friends", "My "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["Tell Friends", "Tell "+capitaliseFirstLetter(CURRENTSTACK.friends)]

			,["Add to Profile", "Add to Journal"]
			,["Add Likes", "Add "+capitaliseFirstLetter(CURRENTSTACK.likes)]
			,["Set as Profile Picture", "Set as Journal Pony Pic"]
			,["View Activity Log", "View Adventure Log"]
			,["Invite Your Friends", "Invite Your "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Suggest Photo", "Suggest Pony Pic"]
			,["All Apps", "All Magic"]
			,["Link My Profile to Twitter", "Link My Journal to Twitter"]
			,["Link profile to Twitter", "Link journal to Twitter"]
			//,["The app sends you a notification", "The magic sends you a spark"]
			,["The app sends you a notification", "The magic sends you a notification"]
			,["Upload a Photo", "Upload a Pony Pic"]
			,["Take a Photo", "Take a Pony Pic"]
			,["Take a Picture", "Take a Pony Pic"] // edit page
			,["Search All Friends", "Search All "+capitaliseFirstLetter(CURRENTSTACK.friends)] // invite friends
			,["Top Comments", "Top Friendship Letters"] // comment resort
			,["Go to Activity Log", "Go to Adventure Log"] // checkpoint
			,["Upload Photo", "Upload Pony Pic"] // composer warning
			,["Poke Back", "Nuzzle Back"]
			,["Friends to Invite", capitaliseFirstLetter(CURRENTSTACK['friends'])+" to Invite"] // app invite
			,["Inbox", "Trough"] // page inbox
			,["Save Profile Info", "Save Journal Info"] // welcome
			,["Like Pages", capitaliseFirstLetter(CURRENTSTACK['like'])+" Pages"] // litestand Following
			,["Visit App Center", "Visit Magic Center"] // litestand Games
			,["Go to App Center", "Go to Magic Center"] // no https on app
			,["Set Profile Picture", "Set Journal Pony Pic"] // page nux
			,["Edit Offer Image", "Edit Offer Pony Pic"] // page composer
			,[/^Likes \(([0-9]+?)\)$/, capitaliseFirstLetter(CURRENTSTACK['likes'])+" ($1)"] // events
			,["Browse Apps and Games", "Browse Magic and Games"] // timeline medley
			,["Suggest a Photo", "Suggest a Pony Pic"] // community pages
			,["Upload Image", "Upload Pony Pic"] // ads
			,["Choose from My Photos", "Choose from Pony Pics"] // groups cover suggest

			// graph search
			,["Likers", "Brohoofers"] // @todo likers
			,["Liked by", capitaliseFirstLetter(CURRENTSTACK['liked'])+" by"] // @todo likers

			// developers
			,["Create New App", "Create New Magic"]
			,["Submit App Detail Page", "Submit Magic Detail Page"]
			,["Edit App", "Edit Magic"]
			,["Promote App", "Promote Magic"]
			,["Make Friends", "Make "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Add to Other Apps", "Add to Other Magic"]
			,["Get App Token", "Get Magic Token"]
			,["Create App", "Create Magic"]
			,["Configure App Center Permissions", "Configure Magic Center Permissions"]
			,["Promote Your App", "Promote Your Magic"]
		];
		
		dialogTitles = [
			[/People who like /, capitaliseFirstLetter(CURRENTSTACK['people'])+" who "+CURRENTSTACK['like_past']+" "]
			,[/People Who Like /, capitaliseFirstLetter(CURRENTSTACK['people'])+" Who "+capitaliseFirstLetter(CURRENTSTACK['like_past'])+" "]
			,[/Friends who like /i, capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" who "+CURRENTSTACK['like_past']+" "]
			,["People who voted for this option", capitaliseFirstLetter(CURRENTSTACK['people'])+" who voted for this option"]
			,["People who are following this question", capitaliseFirstLetter(CURRENTSTACK['people'])+" who are following this question"]
			,[/People Connected to /, capitaliseFirstLetter(CURRENTSTACK['people'])+" Connected to "]
			,["People who saw this", capitaliseFirstLetter(CURRENTSTACK['people'])+" who saw this"]
			,["Added Friends", "Added "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["People who can repro this", capitaliseFirstLetter(CURRENTSTACK['people'])+" who can repro this"]
			,["Friends that like this", capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" that "+CURRENTSTACK['like_past']+" this"]
			,["People", capitaliseFirstLetter(CURRENTSTACK['people'])] // gifts
			,["Choose friends to help translate", "Choose "+CURRENTSTACK['friends']+" to help translate"]
			
			,["Share this Profile", "Share this Journal"]
			,["Share This Photo", "Share This Pony Pic"]
			//,["Share this Album", ""]
			,["Share this Note", "Share this Scroll"]
			,["Share this Group", "Share this Herd"]
			,["Share this Event", "Share this Adventure"]
			//,["Share this Ad", ""]
			,["Share this Application", "Share this Magic"]
			//,["Share this Video", ""]
				//,["Share this Page", "Share this Landmark"]
				//,["Share this Page", "You gotta share!"]
			//,["Share this Job", ""]
				//,["Share this Status", "You gotta share!"]
			,["Share this Question", "Share this Query"]
				//,["Share this Link", "You gotta share!"]
				,["Share", "You gotta share!"]
			//,["Share this Help Content", ""]
			,["Send This Photo", "Send This Pony Pic"]
			,["Share Photo", "Share Pony Pic"]
			,["Share This Group Post", "Share This Herd Post"]
			
			,["Timeline and Tagging", "Journal and Tagging"]
			,["Timeline Review", "Journal Review"]
			//,["Friends Can Check You Into Places", capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" Can Check You Into Landmarks"]
			//,["Limit The Audience for Old Posts on Your Timeline", "Limit The Audience for Old Posts on Your Journal"]
			//,["How people bring your info to apps they use", "How "+CURRENTSTACK['people']+" bring your info to magic they use"]
			//,["Turn off Apps, Plugins and Websites", "Turn off Magic, Plugins and Websites"]
			
			,["Likes", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Edit Featured Likes", "Edit Featured "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Change Date", "Time Travel"]
			,["Date Saved", "Time Traveled"]
			
			,["Delete", "Nuke"]
			,["Delete Comment", "Nuke Friendship Letter"]
			,["Delete Photo", "Nuke Pony Pic"]
			,["Remove Picture?", "Nuke Pony Pic?"]
			,["Delete Video?", "Nuke Video?"]
			,["Delete Milestone", "Nuke Milestone"]
			,["Delete Page?", "Nuke Page?"]
			,["Delete This Message?", "Nuke This Friendship Report?"]
			,["Delete This Entire Conversation?", "Nuke This Entire Conversation?"]
			,["Delete These Messages?", "Nuke These Friendship Reports?"]
			,["Delete Post", "Nuke Post"]
			,["Delete Post?", "Nuke Post?"]
			,["Delete Page Permanently?", "Nuke Page Permanently?"]
			,["Unlike", capitaliseFirstLetter(CURRENTSTACK['unlike'])]
			,["Remove Search", "Nuke Search"]
			//,["Clear Searches", "Nuke Searches"]
			,["Untag Photo", "Untag Pony Pic"]
			,["Untag Photos", "Untag Pony Pics"]
			,["Permanently Delete Account", "Permanently Nuke Account"]
			,["Remove", "Nuke"]
			,["Delete and Ban Member", "Nuke and Banish to Moon"]
			,["Delete Album", "Nuke Album"]
			,["Are you sure you want to clear all your searches?", "Are you sure you want to nuke all your searches?"]
			,["Remove Photo?", "Nuke Pony Pic?"]
			,["Removed Group Photo", "Nuked Herd Pony Pic"]
			,["Post Deleted", "Post Nuked"]
			,["Remove Event", "Nuke Adventure"]
			,["Delete Entry?", "Nuke Entry?"]
			,["Delete Video", "Nuke Video"]
			,["Delete Event", "Nuke Adventure"] // for group admin
			,["Remove Profile Picture", "Nuke Journal Pony Pic"]
			,["Delete Photo?", "Nuke Pony Pic?"]
			,["Remove App", "Nuke Magic"]
			,[/^Leave and Delete /, "Leave and Nuke "]
			,["Delete File Revision", "Nuke File Revision"]
			,["Delete File", "Nuke File"]
			,["Delete Scheduled Post", "Nuke Scheduled Post"]

			,["Report and/or Block This Person", "Whine and/or Block This "+capitaliseFirstLetter(CURRENTSTACK['person'])] // 0
			,["Report This Photo", "Whine About This Pony Pic"]
			,["Report This Event", "Whine About This Adventure"]
			,["Report Conversation", "Whine About Conversation"]
			,["Report as Spam?", "Whine as Spam?"]
			,["Invalid Report", "Invalid Whining"]
			,["Report This Page", "Whine About This Page"]
			,["Report This Doc Revision", "Whine About This Doc Revision"]
			,["Confirm Report", "Confirm Whining"]
			,["Report This Place", "Whine About This Place"] // 64
			,["Thanks For This Report", "Thanks For Whining"]
			,["Send Message", "Send Friendship Report"] // social report
			,["Send Messages", "Send Friendship Reports"]
			,["Why don't you like these photos?", "Why don't you like these pony pics?"]
			,["Photos Untagged and Messages Sent", "Pony Pics Untagged and Friendship Reports Sent"]
			,["Report This Post", "Whine About This Post"] // report lists as a page
			,["Report This?", "Whine About This?"]
			,["Report Recommendation", "Whine About Recommendation"] // 108
			,["Why don't you like this photo?", "Why don't you like this pony pic?"]
			,["Report Spam or Abuse", "Whine as Spam or Abuse"] // messages
			,["Report Incorrect External Link", "Whine About Incorrect External Link"] // page vertex // 87
			,["Post Reported", "Whined About Post"]
			,[" Report a Problem ", "Whine About a Problem"]
			,["Report a Problem", "Whine About a Problem"]

			// report types: 5: links / 125: status / 70: group post / 86: og post
			,["Is this post about you or a friend?", "Is this post about you or a "+CURRENTSTACK.friend+"?"]
			,["Why are you reporting this Page?", "Why are you whining about this Page?"] // 23
			,["Is this group about you or a friend?", "Is this herd about you or a "+CURRENTSTACK['friend']+"?"] // 1
			,["Is this comment about you or a friend?", "Is this friendship letter about you or a "+CURRENTSTACK['friend']+"?"] // 71 / 74: page comment
			//,["Is this list about you or a friend?", "Is this directory about you a "+CURRENTSTACK.friend+"?"] // 92
			,["Is this list about you or a friend?", "Is this list about you a "+CURRENTSTACK.friend+"?"] // 92
			,["Is this photo about you or a friend?", "Is this pony pic about you or a "+CURRENTSTACK['friend']+"?"] // 2
			,["Is this note about you or a friend?", "Is this scroll about you or a "+CURRENTSTACK['friend']+"?"] // 4
			,["Is this video about you or a friend?", "Is this video about you or a "+CURRENTSTACK['friend']+"?"] // 13
			,["Is this event about you or a friend?", "Is this adventure about you or a "+CURRENTSTACK['friend']+"?"] // 81

			,["How to Report Posts", "How to Whine About Posts"]
			,["How to Report Posts on My Timeline", "How to Whine About Posts on My Journal"]
			,["How to Report the Profile Picture", "How to Whine About the Journal Pony Pic"]
			,["Why are you reporting this photo?", "Why are you whining about this pony pic?"]
			,["How to Report the Cover", "How to Whine About the Cover"]
			,["How to Report Messages", "How to Whine About Friendship Reports"]
			,["How to Report a Page", "How to Whine About a Page"]
			,["How to Report a Group", "How to Whine About a Herd"]
			,["How to Report an Event", "How to Whine About an Adventure"]
			,["How to Report Page Posts", "How to Whine About Page Posts"]

			,["New Message", "Write a Friendship Report"]
			,["Forward Message", "Forward this Friendship Report"]
			,["Delete This Message?", "Nuke This Friendship Report?"]
			,["Message Not Sent", "Friendship Report Not Sent"]
			,["Add People", "Add "+capitaliseFirstLetter(CURRENTSTACK['people'])]
			,["Add Photos", "Add Pony Pics"]
			,["People in this message", capitaliseFirstLetter(CURRENTSTACK['people'])+" in this friendship report"]
			,["Message Sent", "Friendship Report Sent"]
			,["Message Filtering Preferences", "Friendship Report Filtering Preferences"]
			,["Don't Send Message?", "Don't Send Friendship Report?"] // webmessenger
			
			,["Create New Group", "Create New Herd"]
			,[/Create New Event/, "Plan an Adventure"]
			//,["Notification Settings", "Spark Settings"]
			,["Create Group Email Address", "Create Herd Email Address"]
			,["Set Up Group Web and Email Address", "Set Up Herd Web and Email Address"]
			,["Mute Chat?", "Mute Whinny Chat?"]
			,["Add Friends to Group", "Add "+capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" to the Herd"]
			,["Add People to Group", "Add "+capitaliseFirstLetter(CURRENTSTACK['people'])+" to the Herd"]
			,["Not a member of the group", "Not a member of the herd"]
			,["Invite People to Group by Email", "Invite "+capitaliseFirstLetter(CURRENTSTACK.people)+" to Herd by Email"]
			,["Remove Group Admin", "Remove Herd Admin"]
			,["Add Group Admin", "Add Herd Admin"]
			,["Group Admins", "Herd Admins"]
			,["Change Group Privacy?", "Change Herd Privacy?"]

			,["Cancel Event?", "Cancel Adventure?"]
			,["Change Event Photo", "Change Pony Pic for Adventure"]
			,["Add Event Photo", "Add Adventure Pony Pic"]
			,["Export Event", "Export Adventure"]
			,["Edit Event Info", "Edit Adventure Info"]
			,["Create Repeat Event", "Plan a Repeat Adventure"]
			,["Event Invites", "Adventure Invites"]

			,["Hide all recent profile changes?", "Hide all recent journal changes?"]
			,["Edit your profile story settings", "Edit your journal story settings"]
			,["Edit your timeline recent activity settings", "Edit your journal recent activity settings"]
			,["Hide all recent likes activity?", "Hide all recent "+CURRENTSTACK.likes+" activity?"]
			,["Edit Privacy of Likes", "Edit Privacy of "+capitaliseFirstLetter(CURRENTSTACK.likes)]

			,["Edit News Feed Settings", "Edit Feed Bag Settings"]
			//,["Create New List", "Create New Directory"]
			,["Invite Friends", "Invite "+capitaliseFirstLetter(CURRENTSTACK['friends_logic'])]
			,["Advanced Chat Settings", "Advanced Whinny Chat Settings"]
			//,["Notifications Updated", "Sparks Updated"]
			,["Move photo to another album?", "Move pony pic to another album?"]
			,["Group Muted", "Herd Muted"]
			,["Block App?", "Block Magic?"]
			//,["List Notification Settings", "Directory Spark Settings"]
			//,["List Notification Settings", "List Spark Settings"]
			,["Like This Photo?", capitaliseFirstLetter(CURRENTSTACK['like'])+" This Pony Pic?"]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["All Friends", "All "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Suggest Friend", "Suggest "+capitaliseFirstLetter(CURRENTSTACK.friend)]
			,["Blocked People", "Blocked "+capitaliseFirstLetter(CURRENTSTACK.people)]
			,["Block People", "Block "+capitaliseFirstLetter(CURRENTSTACK.people)]
			,["Tag Friends", "Tag "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["Unable to edit Group", "Unable to edit Herd"]
			,["Thanks for Inviting Your Friends", "Thanks for Inviting Your "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["Timeline Gift Preview", "Journal Gift Preview"]
			,["Friend Request Setting", "Friendship Request Setting"]
			,["Invalid Question", "Invalid Query"]
			//,["List Subscribers", "Directory Subscribers"]
			,["People Who Shared This", capitaliseFirstLetter(CURRENTSTACK.people)+" Who Shared This"]
			//,["Edit List Settings", "Edit Directory Settings"]
			,["Turn Off Chat", "Turn Off Whinny Chat"]
			,["Access Log", "Adventure Log"]
			,["Post to Your Wall", "Post to Your Journal"]
			,["About Adding Comments by Email", "About Adding Friendship Letters by Email"]
			,["Find Your Friends", findFriendshipText()]
			,["Upload a profile picture", "Upload a journal pony pic"]
			,["Photo Upload Failed", "Pony Pic Upload Failed"] // chat photo upload
			,["Related Groups", "Related Herds"] // community page
			,["Poke", "Nuzzle"]

			,["Take a Profile Picture", "Take a Journal Pony Pic"]
			,["Choosing Your Cover Photo", "Choosing Your Cover Pony Pic"]
			,["Choose from Group Photos", "Choose from Herd Pony Pics"]
			,["Group Albums", "Herd Albums"]
			,["Choose From Your Photos", "Choose From Your Pony Pics"]
			,["Choose from Photos", "Choose from Pony Pics"]
			,["Choose Your Cover Photo", "Choose Your Cover Pony Pic"]
			,["Choose from your synced photos", "Choose from your synced pony pics"]
			,["Upload Your Profile Picture", "Upload Your Journal Pony Pic"] // welcome
			,["Choose From My Photos", "Choose From My Pony Pics"]
			,["Choose From Our Photos", "Choose From Our Pony Pics"]

			,["Create New App", "Create New Magic"]
			,["Add Test Users to other Apps", "Add Test Users to other Magic"]
			,["Upload Page Tab Image", "Upload Page Tab Pony Pic"]
			,["Upload Cover Image", "Upload Cover Pony Pic"]
			,["Remove Test Users", "Nuke Test Users"]
			,["App Center Permissions", "Magic Center Permissions"]

			,["Hidden in Groups", "Hidden in Herds"] // timeline
			,["Add Friends as Contributors", "Add "+capitaliseFirstLetter(CURRENTSTACK['friends'])+" as Contributors"] // shared albums
			,[/^Invite your friends to like /, "Invite your "+CURRENTSTACK['friends']+" to "+CURRENTSTACK['like']+" "] // page invite friends
			,["Get More Page Likes", "Get More Page "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Edit Privacy: Apps and Games", "Edit Privacy: Magic and Games"]
			,["Suggest a Photo", "Suggest a Pony Pic"] // pages vertex
			,[/^Suggest a Photo for /, "Suggest a Pony Pic for "] // pages vertex
			,["Make Profile Picture", "Make Journal Pony Pic"]
		];
		if (ponyData.successText) {
			dialogTitles.push(["Success", ponyData.successText]);
			dialogTitles.push(["Success!", ponyData.successText]);
		}
		
		tooltipTitles = [
			[/everyone/gi, "Everypony"]
			//,[/\bpublic\b/g, "everypony"]
			,[/\bPublic\b/g, "Everypony"]
				,["People you're not friends with can follow you and see only your public posts.", capitaliseFirstLetter(CURRENTSTACK.people)+" you're not pals with can follow you and see only your public posts."]
				//,["These people subscribe to the lists you're featured on", "These "+capitaliseFirstLetter(CURRENTSTACK['people'])+" subscribe to the directories you're featured on"]
				,["These people subscribe to the lists you're featured on", "These "+capitaliseFirstLetter(CURRENTSTACK['people'])+" subscribe to the lists you're featured on"]
				,["Friends of anyone going to this event", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of anypony going to this adventure"]
				,["Only people who are invited can see and join this event", "Only "+CURRENTSTACK['people']+" who are invited can see and join this adventure"]
				,["Friends of guests going to this event can see and join it", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of guests going to this adventure can see and join it"]
				,["Anyone can see and join this event", "Anypony can see and join this adventure"]
				,["Your friends will see your comment in News Feed.", "Your "+CURRENTSTACK['friends']+" will see your friendship letter in Feed Bag."]
				,[/\bfriends in group\b/, CURRENTSTACK['friends']+" in herd"]
				,["Your post will only be promoted to the people who like your Page and their friends", "Your post will only be promoted to the "+CURRENTSTACK['people']+" who "+CURRENTSTACK['like']+" your Page and their "+CURRENTSTACK['friends']]
				,["Your post will be promoted to people based on the targeting you choose below.", "Your post will be promoted to "+CURRENTSTACK['people']+" based on the targeting you choose below."]
				,["Friends and friends of anyone tagged", capitaliseFirstLetter(CURRENTSTACK['friends'])+" and "+CURRENTSTACK['friends']+" of anypony tagged"]
				,["Guests of this event will see the comment you write below.", "Guests of this adventure will see the friendship letter you write below."]
				,[/^([0-9,]+?) other friends like this$/, '$1 other '+CURRENTSTACK['friends']+' '+CURRENTSTACK['like']+' this']
				,[/^([0-9,]+?) people listened to this\.$/, '$1 '+CURRENTSTACK['people']+' listened to this.'] // Recently Released Albums
				,["Your boosted post will only show to people who like your Page and their friends", "Your boosted post will only show to " + CURRENTSTACK['people'] + " who like your Page and their " + CURRENTSTACK['friends']]
				,["Choose the people who will see your boosted post based on their location, age, gender and interests", "Choose the " + CURRENTSTACK['people'] + " who will see your boosted post based on their location, age, gender and interests"]
				,["Only people who manage this Page can see who wrote a post", "Only " + CURRENTSTACK['people'] + " who manage this Page can see who wrote a post"]
				,["Only people who manage this Page can see who posted", "Only " + CURRENTSTACK['people'] + " who manage this Page can see who posted"]
			,[/\bfriends of friends\b/g, CURRENTSTACK['friends']+" of "+CURRENTSTACK['friends']]
			,[/\bFriends of Friends\b/g, capitaliseFirstLetter(CURRENTSTACK['friends'])+" of "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,[/\bfriends\b/g, CURRENTSTACK['friends']]
			,[/\bFriends\b/g, capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Only Me", "Alone"]
			,["Shared with: Only Me", "Shared with: Alone"] // timeline movies Watched section
			,["Only me", "Alone"]
			,["No One", "Alone"]
			,["Only you", "Alone"]
			,["Anyone tagged", "Anypony tagged"]
				//,[/cover photos are everypony/i, "Everypony can see your cover pony pics"]
				,["Cover photos are public", "Everypony can see your cover pony pics"]
				,[/any other information you made Everypony/i, "any other information that everypony can see"]
				,["Anyone can see this Everypony comment", "Everypony can see this public friendship letter"]
				//,["Remember: all place ratings are Everypony.", "Remember: everypony can see all place ratings."]
				,["Everypony can see posts on this Everypony page.", "Everypony can see posts on this public page."]
				,["Name, profile picture, age range, gender, language, country and other public info", "Name, journal pony pic, age range, gender, language, country and other public info"]
				//,["Name, profile picture, age range, gender, language, country and other Everypony info", "Name, profile picture, age range, gender, language, country and other public info"]
				,["This will hide you from Everypony attribution", "This will hide you from public attribution"]
				,["Everypony Information", "Public Information"]
			,["Remember: all place ratings are public.", "Remember: everypony can see all place ratings."]
			,["Shared with: Anyone who can see this page", "Shared with: Anypony who can see this page"]
			,["Anyone can see the group, who's in it, and what members post.", "Anypony can see the herd, who's in it, and what members post."]
			,["Anyone can see the group, who's in it and what members post.", "Anypony can see the herd, who's in it and what members post."] // English (UK)
			,["Anyone can see the group and who's in it. Only members see posts.", "Anypony can see the herd and who's in it. Only members see posts."]
			,["Only members see the group, who's in it, and what members post.", "Only members see the herd, who's in it, and what members post."]
			,["Only members see the group, who's in it and what members post.", "Only members see the herd, who's in it and what members post."] // English (UK)
			,["The number of people who have checked in to places you've helped recently", "The number of "+CURRENTSTACK['people']+" who have checked in to places you've helped recently"]
			,["People you block can still see and comment on stuff you share in groups, apps and other shared places.", capitaliseFirstLetter(CURRENTSTACK['people'])+" you block can still see and comment on stuff you share in herds, magic and other shared places."]
			,["Guests include people who were invited to or replied to an event.", "Guests include "+CURRENTSTACK['people']+" who were invited to or replied to an adventure."]
			,[/^Organic Reach: ([0-9,]+?) people \(([0-9]+?)%\)$/, 'Organic Reach: $1 '+CURRENTSTACK['people']+' ($2%)']
			
			,["Show comments", "Show friendship letters"]
			,["Comment deleted", "Friendship letter nuked"]
			,[/Comments/, "Friendship Letters"]
			,[/Comment/, "Friendship Letter"]
			
			,["Remove", "Nuke"]
			,["Edit or Delete", "Edit or Nuke"]
			,["Edit or Remove", "Edit or Nuke"]
			,["Delete Post", "Nuke Post"]
			,["Remove or Report", "Nuke or Whine"]
			,["Report", "Whine"]
			,["Report/Mark as Spam", "Whine/Mark as Spam"]
			,["Report as not relevant", "Whine as not relevant"]
			,["Remove Invite", "Nuke Invite"]
			,["Report/Remove Tag", "Whine/Nuke Tag"]
			,["Delete", "Nuke"]
			,["Delete and Ban", "Nuke and Banish"]
			,["Report Place", "Whine About Place"]
			,["Delete Album", "Nuke Album"]
			,["Remove User", "Nuke User"]
			,["Keep Post in Group", "Keep Post in Herd"]
			,["Delete Post and Ban Member", "Nuke Post and Banish to Moon"]
			,["Edit/Delete", "Edit/Nuke"]
			,["Delete and Block", "Nuke and Block"]

			,["Shown on Timeline", "Shown on Journal"]
			,["Allow on Timeline", "Allow on Journal"]
			,["Highlighted on Timeline", "Highlighted on Journal"]
			,["Allowed on Timeline", "Allowed on Journal"]
			,["Hidden from Timeline", "Hidden from Journal"]
			
			//,[/likes? this/g, "brohoof'd this"]
			,["Sent from chat", "Sent from whinny chat"]
			,["New Message", "Write a Friendship Report"]
			
			//,[/\bpeople\b/gi, "ponies"]
			,[/See who likes this/gi, "See who "+CURRENTSTACK['likes']+" this"]
			,[/people like this\./gi, CURRENTSTACK['people']+" "+CURRENTSTACK['like_past']+" this."] // entstream
			,[/like this\./gi, CURRENTSTACK['like_past']+" this."]
			,[/likes this\./gi, CURRENTSTACK['likes_past']+" this."]

			// top right pages
			//,["Status", "Take a Note"]
			//,["Photo / Video", "Add a Pic"]
			//,["Event, Milestone +", "Adventure, Milestone +"]

			//,["Onsite Notifications", "Onsite Sparks"]
			,["Create Event", "Plan an Adventure"]
			,["Search messages in this conversation", "Search friendship reports in this conversation"]
			,["Open photo viewer", "Open pony pic viewer"]
			,["Choose a unique image for the cover of your timeline.", "Choose a unique pony pic for the cover of your journal."]
			,["Remove from Dashboard", "Remove from Dashieboard"]
			,["Choose a unique cover photo to express what your Page is about.", "Choose a unique cover pony pic to express what your Page is about."]

			,["Each photo has its own privacy setting", "Each pony pic has its own privacy setting"]
			,["You can change the audience for each photo in this album", "You can change the audience for each pony pic in this album"]

			,["View Photo", "View Pony Pic"]

			// litestand navigation when collapsed
			,["News Feed", "Feed Bag"]
			,["Messages", "Trough"]
			,["Pokes", "Nuzzles"]
			,["Manage Apps", "Manage Magic"]
			,["Events", "Adventures"]
			,["App Center", "Magic Center"]
			,["Add Friend", "Add "+capitaliseFirstLetter(CURRENTSTACK['friend'])] // people you may know

			// photo comments
			,["Attach a Photo", "Attach a Pony Pic"]
			,["Remove Photo", "Nuke Pony Pic"]

			,["Dismiss and go to most recent message", "Dismiss and go to most recent friendship letter"] // messages
			,["To create an offer, your Page needs at least 50 likes.", "To create an offer, your Page needs at least 50 "+CURRENTSTACK['likes']+"."] // page composer
			,["Verified profile", "Verified journal"] // verified
			,["Tags help people find groups about certain topics.", "Tags help "+CURRENTSTACK['people']+" find herds about certain topics."]
			,["This post is more engaging than many of your other posts. You can boost it to get more likes and comments.", "This post is more engaging than many of your other posts. You can boost it to get more "+CURRENTSTACK['likes']+" and friendship letters."] // page admin pabel
			,["Help Facebook gather feedback about News Feed. Your input is private and won't be shared.", "Help Facebook gather feedback about Feed Bag. Your input is private and won't be shared."]
			,["Like", capitaliseFirstLetter(CURRENTSTACK['like'])]
			,["Suggestions based on Pages you like and music you listen to.", 'Suggestions based on Pages you '+CURRENTSTACK['like']+' and music you listen to.'] // Recently Released Albums
			,[/^Like (.+) to follow posts$/, capitaliseFirstLetter(CURRENTSTACK['like'])+" $1 to follow posts"]
			,["Add a cover photo", "Add a cover pony pic"]
			,["Photo", "Pony Pic"] // insights
			,["Likes this week", capitaliseFirstLetter(CURRENTSTACK['likes']) + " this week"] // pages to watch
			,[/^You and your friend have poked back and forth ([0-9]+?) times$/, "You and your " + CURRENTSTACK['friend'] + " have nuzzled back and forth $1 times"]

			// developers
			,["Enable the newsfeed ticker", "Enable the feedbag ticker"]
			,["Add selected users to other apps you own.", "Add selected users to other magic you own."]
			,["Remove selected users from this app.", "Remove selected users from this magic."]
			,["Get app access token. Requires admin privileges for app.", "Get magic access token. Requires admin privileges for magic."]

			// insights
			,["The total number of clicks on your posts, not including likes, comments, or shares, which are broken out above.", "The total number of clicks on your posts, not including "+CURRENTSTACK['likes']+", friendship letters, or shares, which are broken out above."]
			,["The percentage of people who liked, commented, shared or clicked on your post after having seen it.", "The percentage of "+CURRENTSTACK['people']+" who "+CURRENTSTACK['liked']+", commented, shared or clicked on your post after having seen it."]
			,["The unique number of people who liked, commented, shared or clicked on your posts", "The unique number of "+CURRENTSTACK['people']+" who "+CURRENTSTACK['liked']+", commented, shared or clicked on your posts"]

			,["The week when the most people were talking about this Page.", "The week when the most "+CURRENTSTACK['people']+" were talking about this Page."]
			,["The city where most of the people talking about this Page are from.", "The city where most of the "+CURRENTSTACK['people']+" talking about this Page are from."]
			,["The largest age group of the people talking about this Page.", "The largest age group of the "+CURRENTSTACK['people']+" talking about this Page."]
			,["The number of photos that have this Page tagged.", "The number of pony pics that have this Page tagged."]
			,["The week when the most people checked in at this Page's location.", "The week when the most "+CURRENTSTACK['people']+" checked in at this Page's location."]
		];
		if (ponyData.loadingText) {
			tooltipTitles.push(["Loading...", ponyData.loadingText]);
		}

		headerTitles = [
			//["List Suggestions", "Directory Suggestions"]
			["People You May Know", capitaliseFirstLetter(CURRENTSTACK.people)+" You May Know"]
			,["Sponsored", "Cupcake Money"]
			,["Pokes", "Nuzzles"]
			,["People To Follow", capitaliseFirstLetter(CURRENTSTACK.people)+" To Follow"]
			,["Poke Suggestions", "Nuzzle Suggestions"]
			,["Suggested Groups", "Suggested Herds"]
			,["Find More Friends", findFriendshipText()]
			,["Rate Recently Used Apps", "Rate Recently Used Magic"]
			,["Friends' Photos", "Pals' Pony Pics"]
			,["Add a Location to Your Photos", "Add a Location to Your Pony Pics"]
			,["Suggest Friends", "Suggest "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["Other Pages You Like", "Other Pages You "+capitaliseFirstLetter(CURRENTSTACK.like)]
			,["Entertainment Pages You Might Like", "Entertainment Pages You Might "+capitaliseFirstLetter(CURRENTSTACK.like)]
			,["Music Pages You Might Like", "Music Pages You Might "+capitaliseFirstLetter(CURRENTSTACK.like)]
			,["Add Personal Contacts as Friends", "Add Personal Contacts as "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["Find Friends", findFriendshipText()]
			//,[/On This List/, "On This Directory"]
			//,["On this list", "On this directory"]
			//,["On This List", "On This Directory"]
			,["Related Groups", "Related Herds"]
			,["Entertainment Pages You May Like", "Entertainment Pages You May "+capitaliseFirstLetter(CURRENTSTACK['like'])]
			,["Music Pages You May Like", "Music Pages You May "+capitaliseFirstLetter(CURRENTSTACK['like'])]
			,["No New Friend Requests", "No New Friendship Requests"] // /friends/requests/
			,["Games Your Friends Are Playing", "Games Your "+capitaliseFirstLetter(CURRENTSTACK['friends'])+" Are Playing"]
			,["Promote This Event", "Promote This Adventure"]
			,["Respond to Your Friend Request", "Respond to Your Friendship Request"] // /friends/requests/
			,[/^Respond to Your ([0-9]+?) Friend Requests$/, "Respond to Your $1 Friendship Requests"] // /friends/requests/
			,["Add People You Know", "Add "+capitaliseFirstLetter(CURRENTSTACK['people'])+" You Know"]
			,["Complete your profile", "Complete your journal"]
			,["No Sent Friend Requests", "No Sent Friendship Requests"] // /friends/requests/
			,["Friend Requests Sent", "Friendship Requests Sent"] // /friends/requests/

			//,["Notifications", "Sparks"]
			,["New Likes", "New "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Invite Friends", "Invite "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Get More Likes", "Get More "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Added Apps", "Added Magic"]
			,["Apps You May Like", "Magic You May "+capitaliseFirstLetter(CURRENTSTACK.like)]
			,["Your Apps", "Your Magic"]
			,["People Talking About This", capitaliseFirstLetter(CURRENTSTACK.people)+" Blabbering About This"]
			,["Total Likes", "Total "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Games You May Like", "Games You May "+capitaliseFirstLetter(CURRENTSTACK.like)]
			,["Add To News Feed", "Add To Feed Bag"]

			,["Messages", "Trough"]
			//,["Other Messages", "Other Friendship Reports"]
			//,["Unread Messages", "Unread Friendship Reports"]
			//,["Sent Messages", "Sent Friendship Reports"]
			//,["Archived Messages", "Archived Friendship Reports"]
			,["Inbox", "Trough"]

			,["Groups", "Herds"]
			//,["Pages and Ads", "Landmarks and Ads"]
			,["Apps", "Magic"]
			,[/Friends who like /gi, capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" who "+CURRENTSTACK['like_past']+" "]
			,["Favorites", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Likes", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Events", "Adventures"]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Ads", "Cupcakes"]
			,["Mutual Likes", "Mutual "+capitaliseFirstLetter(CURRENTSTACK.likes)]
			,[/Mutual Friends/, "Mutual "+capitaliseFirstLetter(CURRENTSTACK.friends)]

			,["Notes", "Scrolls"]
			,["My Notes", "My Scrolls"]
			,["Notes About Me", "Scrolls About Me"]
			,["Write a Note", "Write a Scroll"]
			,["Edit Note", "Edit Scroll"]

			,["Timeline and Tagging", "Journal and Tagging"]
			,["Ads, Apps and Websites", "Ads, Magic and Websites"]
			,["Blocked People and Apps", "Banished "+capitaliseFirstLetter(CURRENTSTACK['people'])+" and Magic"]
			//,["Notifications Settings", "Sparks Settings"]
			,["App Settings", "Magic Settings"]
			,["Friend Requests", "Friendship Requests"]
			,["People Who Shared This", capitaliseFirstLetter(CURRENTSTACK.people)+" Who Shared This"]
			//,["Your Notifications", "Your Sparks"]
			,["Timeline and Tagging Settings", "Journal and Tagging Settings"]
			,["Delete My Account", "Nuke My Account"]

			,["Posts in Groups", "Posts in Herds"]
			,["People", capitaliseFirstLetter(CURRENTSTACK['people'])]

			,["Posts by Friends", "Posts by "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["Support Dashboard", "Support Dashieboard"]
			,["Event Invitations", "Adventure Invitations"]
			,["Who Is in These Photos?", "Who Is in These Pony Pics?"]
			,["People who like this", capitaliseFirstLetter(CURRENTSTACK.people)+" that "+CURRENTSTACK.like_past+" this"]
			//,["List Subscribers", "Directory Subscribers"]
			,["Upcoming Events", "Upcoming Adventures"]
			,["Photos and Videos", "Pony Pics and Videos"]
			,["People Who Are Going", capitaliseFirstLetter(CURRENTSTACK.people)+" Who Are Going"]
			//,["Would you like to opt out of this email notification?", "Would you like to opt out of this email spark?"]
			,["Confirm Like", "Confirm "+capitaliseFirstLetter(CURRENTSTACK['like'])]

			,["Invite Friends You Email", "Invite "+capitaliseFirstLetter(CURRENTSTACK['friends'])+" You Email "]
			,["Invite Your Friends", "Invite Your "+capitaliseFirstLetter(CURRENTSTACK['friends'])]

			,["Account Groups", "Account Herds"]
			//,["Ads Email Notifications", "Ads Email Sparks"]
			//,["Ads Notifications on Facebook", "Ads Sparks on Facebook"]

			,["App Restrictions", "Magic Restrictions"]
			,["App Info", "Magic Info"]

			,["Tagged Photos", "Tagged Pony Pics"]

			,["Add Groups", "Add Herds"] // /addgroup
			,["Photos", "Pony Pics"] // /media/video/
			,["Post to Your Wall", "Post to Your Stall"]
			,["Set Your Profile Picture", "Set Your Journal Pony Pic"] // page nux
			,["Suggested Pokes", "Suggested Nuzzles"]
			,["Join Your Friends", "Join Your "+capitaliseFirstLetter(CURRENTSTACK['friends'])] // /findgroups
			,[/^Groups related to /, "Herds related to "] // /findgroups?page_id=197956210325433
			,["Edit Featured Likes", "Edit Featured " + capitaliseFirstLetter(CURRENTSTACK['likes'])] // /browse/featured_pages_edit/?page_id=
			,["Related Events", "Related Adventures"]

			,["Timeline Review", "Journal Review"]
			,["Photos of You", "Pony Pics of You"]
			,["Your Photos", "Your Pony Pics"]
			,["Comments", "Friendship Letters"]
			,["Questions", "Queries"]
			,["All Apps", "All Magic"]
		];

		menuTitles = [
			["Everyone", "Everypony"]
			,["Everybody", "Everypony"]
			,["Public", "Everypony"]
			,["Anyone", "Anypony"]
			,["Friends of Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends except Acquaintances", capitaliseFirstLetter(CURRENTSTACK['friends'])+" except Acquaintances"]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends ", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends of Guests", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of Guests"]
			,["Friends of Contributors", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of Contributors"]
			,["Only Me", "Alone"]
			,["Only me", "Alone"]
			,["No One", "Alone"]
			,["Nobody", "Nopony"]
			//,["See all lists...", "See entire directory..."]

			,["Mutual Friends", "Mutual "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["People You May Know", "Ponies You May Know"]
			,["Poke...", "Nuzzle..."]
			,["Poke", "Nuzzle"]
			,["All Friends", "All "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["All friends", "All "+CURRENTSTACK['friends']]

			,["On your own timeline", "On your own journal"]
			,["On a friend's timeline", "On a "+CURRENTSTACK['friend']+"'s journal"]
			,["In a group", "In a herd"]
			,["In a private Message", "In a private Friendship Report"]
			,["Share on your timeline", "Share on your journal"]
			,["Share on a friend's timeline", "Share on a "+CURRENTSTACK['friend']+"'s journal"]
			,["Share in a group", "Share in a herd"]
			,["Send in a private message", "Send in a private friendship report"]

			,["Friends' Posts", capitaliseFirstLetter(CURRENTSTACK['friends'])+"' Posts"]
			,["Friend Activity", capitaliseFirstLetter(CURRENTSTACK['friend'])+" Activity"]

			,["Change Date...", "Time Travel..."]
			,["Reposition Photo...", "Reposition Pony Pic..."]
			//,["Manage Notifications", "Manage Sparks"]
			,["Use Activity Log", "Use Adventure Log"]
			,["See Banned Users...", "See Ponies who were Banished to the Moon..."]
			,["Invite Friends...", "Invite "+capitaliseFirstLetter(CURRENTSTACK['friends'])+"..."]
			,["Like As Your Page...", capitaliseFirstLetter(CURRENTSTACK.like)+" As Your Page..."]
			,["Add App to Page", "Add Magic to Page"]
			,["Change Primary Photo", "Change Primary Pony Pic"]
			,["Change Date", "Time Travel"]

			,["People", capitaliseFirstLetter(CURRENTSTACK['people'])]
			//,["Pages", "Landmarks"]
			,["Banned", "Banished to Moon"]
			,["Blocked", "Banished to Moon"]
			,["People who like this", capitaliseFirstLetter(CURRENTSTACK.people)+" who "+CURRENTSTACK.like_past+" this"]
			,["Pages that like this", "Pages that "+CURRENTSTACK.like_past+" this"]

			,["Unlike", capitaliseFirstLetter(CURRENTSTACK['unlike'])]
			,["Unlike...", capitaliseFirstLetter(CURRENTSTACK['unlike'])+"..."]
			,["Show in News Feed", "Show in Feed Bag"]
			,["Suggest Friends...", "Suggest "+capitaliseFirstLetter(CURRENTSTACK['friends'])+"..."]
			,["Unfriend...", "Banish to Moon..."]
			,["Unfriend", "Banish to Moon"]
			//,["New List...", "New Directory..."]
			//,["Get Notifications", "Get Sparks"]
			//,["Add to another list...", "Add to another directory..."]

			,["Create Event", "Plan an Adventure"]
			,["Edit Group", "Edit Herd"]
			,["Report Group", "Whine about Herd"]
			,["Leave Group", "Leave Herd"]
			,["Edit Group Settings", "Edit Herd Settings"]
			,["Choose from Group Photos", "Choose from Herd Pony Pics"]
			,["Upload a Photo", "Upload a Pony Pic"]
			,["Remove from Group", "Banish to Moon"]
			,["Share Group", "Share Herd"]
			,["Create Group", "Create Herd"]
			,["Change group settings", "Change herd settings"]
			,["Add People to Group", "Add "+capitaliseFirstLetter(CURRENTSTACK['people'])+" to the Herd"]
			,["Send Message", "Send Friendship Report"]
			,["View Group", "View Herd"]
			,["Add People", "Add "+capitaliseFirstLetter(CURRENTSTACK['people'])]
			,["Friends and Admins Only", capitaliseFirstLetter(CURRENTSTACK['friends']) + " and Admins Only"]

			,["Remove App", "Remove Magic"]
			,["Uninstall App", "Uninstall Magic"]
			,["Report App", "Whine about Magic"]
			,["Block App", "Block Magic"]
			,["Find More Apps", "Find More Magic"]
			,["No more apps to add.", "No more magic to add."]

			,["Delete Post And Remove User", "Nuke Post And Banish to Moon"]
			,["Delete Post And Ban User", "Nuke Post And Banish to Moon"]
			,["Hide from Timeline", "Hide from Journal"]
			,["Delete", "Nuke"]
			,["Delete...", "Nuke..."]
			,["Delete Photo", "Nuke Pony Pic..."]
			,["Delete This Photo", "Nuke This Pony Pic"]
			,["Delete Messages...", "Nuke Friendship Reports..."]
			,["Delete Post", "Nuke Post"]
			,["Delete Comment", "Nuke Friendship Letter..."]
			,["Show on Timeline", "Show on Journal"]
			,["Show on Profile", "Show on Journal"]
			,["Shown on Timeline", "Shown on Journal"]
			,["Allow on Timeline", "Allow on Journal"]
			,["Highlighted on Timeline", "Highlighted on Journal"]
			,["Allowed on Timeline", "Allowed on Journal"]
			,["Hidden from Timeline", "Hidden from Journal"]
			,["Remove", "Nuke"]
			,["Delete Photo...", "Nuke Pony Pic..."]
			,["Remove this photo", "Nuke this pony pic"]
			,["Remove photo", "Nuke pony pic"]
			,["Remove...", "Nuke..."]
			,["Delete Conversation...", "Nuke Conversation..."]
			,["Delete Album", "Nuke Album"]
			,["Delete Comment...", "Nuke Friendship Letter..."]
			,["Hide Comment...", "Hide Friendship Letter..."]
			,["Hide Event", "Hide Adventure"]
			,["Hide Comment", "Hide Friendship Letter"]
			,["Delete Post...", "Nuke Post..."]
			,["Delete Video", "Nuke Video"]
			,["Delete Event", "Nuke Adventure"] // group
			,["Delete File", "Nuke File"]
			,["Unban", "Unbanish"]
			,["Delete Individual Stories...", "Nuke Individual Stories..."]
			,["Delete Photos", "Nuke Pony Pics"]

			,["Report/Block...", "Whine/Block..."]
			,["Report/Mark as Spam", "Whine/Mark as Spam"]
			,["Report Page", "Whine about Page"]
			,["Report Story or Spam", "Whine about Story or Spam"]
			,["Report/Mark as Spam...", "Whine/Mark as Spam..."]
			,["Report story...", "Whine about story..."]
			,["Report as Spam or Abuse...", "Whine as Spam or Abuse..."]
			,["Report Spam or Abuse...", "Whine as Spam or Abuse..."]
			,["Report as Spam...", "Whine as Spam..."]
			,["Report Conversation...", "Whine about Conversation..."]
			,["Report This Photo", "Whine About This Pony Pic"]
			,["Report/Remove Tag", "Whine/Nuke Tag"]
			,["Mark as Spam", "Whine as Spam"]
			,["Report/Remove Tag...", "Whine/Nuke Tag..."]
			,["Report Content", "Whine about Content"]
			,["Report Profile", "Whine about Journal"]
			,["Report User", "Whine about This Pony"]
			,["Report", "Whine"]
			,["Report Place", "Whine about Place"]
			,["Report App", "Whine about Magic"]
			//,["Report list", "Whine about directory"]
			,["Report list", "Whine about list"]
			,["Event at a place", "Adventure at a place"]
			,["Report as Abuse", "Whine as Abuse"]
			,["Report to Admin", "Whine to Admin"]

			,["Hide this recent activity story from Timeline", "Hide this recent activity story from Journal"]
			,["Hide Similar Activity from Timeline...", "Hide Similar Activity from Journal..."]
			//,["Hide All Recent Lists from Timeline...", "Hide All Recent Directories from Journal..."]
			,["Hide All Recent Lists from Timeline...", "Hide All Recent Lists from Journal..."]
			,["Hide all Friend Highlights from Timeline", "Hide all "+capitaliseFirstLetter(CURRENTSTACK.friend)+" Highlights from Journal"]
			,["Hide This Action from Profile...", "Hide This Action from Journal..."]
			,["Hide All Recent profile changes from Profile...", "Hide All Recent journal changes from Journal..."]
			,["Hide All Recent Pages from Timeline...", "Hide All Recent Pages from Journal..."]
			,["See Photos Hidden From Timeline", "See Pony Pics Hidden From Journal"]
			,["Hide Similar Activity from Timeline", "Hide Similar Activity from Journal"]

			,["Upcoming Events", "Upcoming Adventures"]
			,["Suggested Events", "Suggested Adventures"]
			,["Past Events", "Past Adventures"]
			,["Past events", "Past adventures"]
			,["Declined Events", "Declined Adventures"]
			,["Export Events...", "Export Adventures..."]
			,["Add Event Photo", "Add Adventure Pony Pic"]
			,["Cancel Event", "Cancel Adventure"]
			,["Export Event", "Export Adventure"]
			,["Share Event", "Share Adventure"]
			//,["Turn Off Notifications", "Turn Off Sparks"]
			//,["Turn On Notifications", "Turn On Sparks"]
			,["Promote Event", "Promote Adventure"]
			//,["Create Repeat Event", "Create Repeat Adventure"]
			,["Copy Event", "Copy Adventure"]
			,["Message Guests", "Start Whinny Chat with Guests"]
			,["Edit Event", "Edit Adventure"]
			,["Publish Event on Timeline", "Publish Adventure on Journal"]
			,["Leave Event", "Leave Adventure"]
			,["Report Event", "Whine About Adventure"]
			,["Choose Friends", "Choose "+capitaliseFirstLetter(CURRENTSTACK['friends'])]

			,["Add Friends to Chat...", "Add "+capitaliseFirstLetter(CURRENTSTACK.friends)+" to Whinny Chat..."]
			,["Chat Sounds", "Whinny Chat Sounds"]
			,["Add People...", "Add "+capitaliseFirstLetter(CURRENTSTACK['people'])+"..."]
			,["Unread Messages", "Unread Friendship Reports"]
			,["Archived Messages", "Archived Friendship Reports"]
			,["Sent Messages", "Sent Friendship Reports"]
			,["Forward Messages...", "Forward Friendship Reports..."]
			,["Turn Off Chat", "Turn Off Whinny Chat"]
			,["Open in Chat", "Open in Whinny Chat"]
			,["Create Group...", "Create Herd..."]
			,["Turn On Chat", "Turn On Whinny Chat"]
			,["View Photos in Thread", "View Pony Pics in Thread"]

			,["Add/Remove Friends...", "Add/Remove "+capitaliseFirstLetter(CURRENTSTACK.friends)+"..."]
			,["Comments and Likes", "Friendship Letters and Brohoofs"]
			//,["Archive List", "Archive Directory"]
			//,["On This List", "On This Directory"]
			//,["Restore List", "Restore Directory"]

			//,["Rename List", "Rename Directory"]
			//,["Edit List", "Edit Directory"]
			//,["Notification Settings...", "Spark Settings..."]
			//,["Delete List", "Nuke Directory"]
			,["Delete List", "Nuke List"]

			,["Likes", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Photos", "Pony Pics"]
			,["Comments", "Friendship Letters"]
			,["Questions", "Queries"]
			,["Events", "Adventures"]
			,["Groups", "Herds"]
			,["Timeline", "Journal"]
			,["Notes", "Scrolls"]
			,["Posts and Apps", "Posts and Magic"]
			,["Recent Likes", "Recent "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Recent Comments", "Recent Friendship Letters"]
			,["Timeline Review", "Journal Review"]
			,["Pokes", "Nuzzles"]
			,["Activity Log...", "Adventure Log..."]
			,["Activity Log", "Adventure Log"]
			,["Timeline Settings", "Journal Settings"]
			,["Likers", "Brohoofers"] // @todo likers
			,["Open Groups", "Open Herds"]
			,["Cancel Friend Request", "Cancel Friendship Request"] // activity log

			,["Choose from Photos...", "Choose from Pony Pics..."]
			,["Upload Photo...", "Upload Pony Pic..."]
			,["Take Photo...", "Take Pony Pic..."]
			,["Choose from my Photos", "Choose from my Pony Pics"]
			,["Choose From Our Photos", "Choose From Our Pony Pics"]
			,["Reposition Photo", "Reposition Pony Pic"]
			,["Add Synced Photo...", "Add Synced Pony Pic..."]
			,["Add Synced Photo", "Add Synced Pony Pic"]
			,["Change Primary Photo...", "Change Primary Pony Pic..."]
			,["Choose from Photo Albums...", "Choose from Pony Pic Albums..."]
			,["Suggest this photo...", "Suggest this pony pic..."]

			,["Photo", "Pony Pic"]
			,["Question", "Query"]

			,["Pages I like", "Pages I "+capitaliseFirstLetter(CURRENTSTACK.like)]
			,["My Friends", "My "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			//,["All Notifications", "All Sparks"]
			,["Search All Friends", "Search All "+capitaliseFirstLetter(CURRENTSTACK.friends)]
			,["All Apps", "All Magic"]
			,["Pages my friends like", "Pages my "+CURRENTSTACK['friends']+" "+CURRENTSTACK['like']]
			,["Pages that I like", "Pages that I " + CURRENTSTACK['like_past']]
			,["Pages liked by my friends", "Pages " + CURRENTSTACK['like_past'] + " by my " + CURRENTSTACK['friends']]

			,["Page Likes", "Page "+capitaliseFirstLetter(CURRENTSTACK.likes)]
			,["Mentions and Photo Tags", "Mentions and Pony Pic Tags"]

			,["Suggest photos", "Suggest pony pics"]

			,["Make Profile Picture", "Make Journal Pony Pic"]
			,["Make Profile Picture for Page", "Make Journal Pony Pic for Page"]
			,["Make Cover Photo", "Make Cover Pony Pic"]

			//,["The app sends you a notification", "The magic sends you a spark"]
			,["The app sends you a notification", "The magic sends you a notification"]

			,["Top Comments", "Top Friendship Letters"] // comment resort
			,["See All Groups", "See All Herds"] // timeline
			,["Friends to Invite", capitaliseFirstLetter(CURRENTSTACK['friends'])+" to Invite"] // app invite
			,[/^Likes \(([0-9]+?)\)$/, capitaliseFirstLetter(CURRENTSTACK['likes'])+" ($1)"] // events
			,["Apps and Games", "Magic and Games"] // timeline
			,["Tag Friends", "Tag "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Make News Feed Better", "Make Feed Bag Better"] // news feed

			// insights
			,["Post Clicks / Likes, Comments & Shares", "Post Clicks / "+capitaliseFirstLetter(CURRENTSTACK['likes'])+", Comments & Shares"]
			,["Likes / Comments / Shares", capitaliseFirstLetter(CURRENTSTACK['likes'])+" / Comments / Shares"]
			,["Post Hides, Hides of All Posts, Reports of Spam, Unlikes of Page", "Post Hides, Hides of All Posts, Whining of Spam, Unbrohoofs of Page"] // @todo
			,["Likes, Comments & Shares", capitaliseFirstLetter(CURRENTSTACK['likes'])+", Comments & Shares"]
		];

		menuPrivacyOnlyTitles = [
			["Everyone", "Everypony"]
			,["Public", "Everypony"]
			,["Anyone", "Anypony"]
			,["Friends of Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends except Acquaintances", capitaliseFirstLetter(CURRENTSTACK['friends'])+" except Acquaintances"]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends ", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends of Guests", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of Guests"]
			,["Friends of Contributors", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of Contributors"]
			,["Only Me", "Alone"]
			,["Only me", "Alone"]
			//,["See all lists...", "See entire directory..."]
		];

		dialogDerpTitles = [
			"Insufficient send permissions"
			,"Update Failed"
			,"Failed to upload photo."
			,"Hide Photo Failed"
			,"Undo Mark Spam Failed"
			,"Your Request Couldn't be Processed"
			,"Sorry! The blocking system is overloaded"
			,"Invalid Request"
			,"Block! You are engaging in behavior that may be considered annoying or abusive by other users."
			,"Already connected."
			,"Cannot connect."
			,"Database Down"
			,"Failure to hide minifeed story."
			,"Object cannot be liked"
			,"Sorry, something went wrong"
			,"Authentication Failure"
			,"Unknown error"
			,"Not Logged In"
			,"No Permission to Add Comment or Trying to Comment on Deleted Post"
			,"Could not determine coordinates of place"
			,"Sorry, your account is temporarily unavailable."
			,"Don't Have Permission"
			,"Oops"
			,"No Languages Provided ForUpdate"
			,"Comment Does Not Exist"
			,"Sorry, we got confused"
			,"Database Write Failed"
			,"Editing Bookmarks Failed"
			,"Required Field Missing"
			,"Could Not Load Story"
			,"Invalid Name"
			,"Cannot connect to yourself."
			,"This content is no longer available"
			,"Error" // poking someone who hasn't poked back yet
			,"Please Try Again Later"
			,"Submitting Documentation Feedback Failed"
			,"Bad Request"
			,"Internal Error"
			,"Mark as Spam Failed"
			,"Could not post to Wall"
			,"No permissions"
			,"Messages Unavailable"
			,"Don't have Permission"
			,"No file specified."
			,"Storage Failure"
			,"Invalid Date"
			,"Vote submission failed."
			,"Web Address is Invalid"
			,"Oops!"
			,"Invalid Recipients"
			,"Add Fan Status Failed"
			,"Adding Member Failed"
			,"Post Has Been Removed"
			,"Unable to edit Group"
			,"Invalid Photo Selected"
			,"Cannot backdate photo"
			,"Invalid Search Query"
			,"Unable to Add Friend"
			,"Cannot Add Member"
			,"Bad Image"
			,"Missing Field"
			,"Invalid Custom Privacy Setting"
			,"Empty Friend List"
			,"Unable to Add Attachment"
			,"Unable to Change Date"
			,"Invalid Whining"
			,"Your Page Can't Be Promoted"
			,"Cannot Send Gift"
			,"An error occurred."
			,"Image Resource Invalid"
			//,"Confirmation Required"
			,"Error Uploading Video"
			,"Upload Failed"
			,"Photo Upload Failed"
			,"Sticker Failed"
			,"Could Not Post to Timeline"
			,"No Permission"
			,"Reporting Not Available"
			,"Problem with Video Calling"
			,"Status Is Empty"
			,"Could Not Share Content"
			,"Block Failed"
			,"Too many places flagged"
			,"Cannot Add Tag"
			,"No Permission to Post"
			,"Cannot Add Members"
			,"Not group member."
			,"Messaging Unavailable"
			,"Not a member of the group"
				,"Not a member of the herd"
			,"Group Post Failure"
			,"Invalid ID"
			,"Users don't have permission to invite"
			,"Unable to edit Event"
			,"Add Admin Failed"
			,"Profile Not Found"
			,"Can't Edit Album"
			,"Cannot Edit Doc"
			,"Unable to Report"
			,"Can't Add to Friends"
			,"No Friends Selected"
			,"Unsupported File Format"
			,"No Permission to Upload Video"
			,"No File"
			,"Edit permission error"
			,"Can't Read Files"
		];

		headerInsightsTitles = [
			["People Who Like Your Page (Demographics and Location)", capitaliseFirstLetter(CURRENTSTACK.people)+" Who "+capitaliseFirstLetter(CURRENTSTACK.like)+" Your Page (Demographics and Location)"]
			,["Where Your Likes Came From", "Where Your "+capitaliseFirstLetter(CURRENTSTACK.likes)+" Came From"]
			,["How You Reached People (Reach and Frequency)", "How You Reached "+capitaliseFirstLetter(CURRENTSTACK.people)+" (Reach and Frequency)"]
			,["How People Are Talking About Your Page", "How "+capitaliseFirstLetter(CURRENTSTACK.people)+" Are Talking About Your Page"]
		];

		dialogDescriptionTitles = [
			["Are you sure you want to delete this?", "Are you sure you want to nuke this?"]
			,["Are you sure you want to delete this video?", "Are you sure you want to nuke this video?"]
			,["Are you sure you want to delete this photo?", "Are you sure you want to nuke this pony pic?"]
			,["Are you sure you want to delete this comment?", "Are you sure you want to nuke this friendship letter?"]
			,["Are you sure you want to delete this event?", "Are you sure you want to nuke this adventure?"]
			,["Are you sure you want to delete this post?", "Are you sure you want to nuke this post?"]
			,["Are you sure you want to remove this picture?", "Are you sure you want to nuke this pony pic?"]
			,["The post or object that you were commenting has been removed by its owner and can no longer be commented on.", "The post or object that you were commenting has been nuked by its owner and can no longer be commented on."]
			,["Are you sure you want to remove this event?", "Are you sure you want to nuke this adventure?"]
			,["Are you sure you want to unlike this?", "Are you sure you want to "+CURRENTSTACK['unlike']+" this?"]
			,["Are you sure you want to remove this profile picture?", "Are you sure you want to nuke this journal pony pic?"]
			,["Are you sure you want to remove this application?", "Are you sure you want to nuke this magic?"]
			,["Are you sure you want to delete the file?", "Are you sure you want to nuke the file?"]
			,["Are you sure you want to delete this revision of the file?", "Are you sure you want to nuke this revision of the file?"]
			,["Are you sure you want to delete your scheduled post?", "Are you sure you want to nuke your scheduled post?"]

			,["Report this if it's not relevant to your search results.", "Whine about this if it's not relevant to your search results."]

			,["Uploading a photo will remove the link preview. Do you want to continue?", "Uploading a pony pic will remove the link preview. Do you want to continue?"]
			,["This post has been reported to the group admin.", "This post has been whined to the group admin."]

			,["You must select some messages to delete. Click on a message to select it.", "You must select some friendship reports to nuke. Click on a friendship report to select it."]
			,["You have not uploaded a picture.", "You have not uploaded a pony pic."]
			,["Please try again. Make sure you are uploading a valid photo.", "Please try again. Make sure you are uploading a valid pony pic."]
			,["There was a problem uploading the image file.", "There was a problem uploading the pony pic file."]
			,["If you leave this page, your message won't be sent.", "If you leave this page, your friendship report won't be sent."]
			,["You don't have permission to edit this Group.", "You don't have permission to edit this Herd."]
		];

		dialogNukeTitles = [
			"Remove"
			,"Remove Search"
			,"Delete and Ban Member"
			,"Delete Album"
			,"Are you sure you want to clear all your searches?"
			,"Delete Comment"
			,"Remove Photo?"
			,"Delete Page?"
			,"Delete Page Permanently?"
			,"Post Deleted"
			,"Remove Event"
			,"Delete Entry?"
			,"Delete Video"
			,"Delete Event"
			,"Remove Profile Picture"
			,"Delete Photo?"
			,"Delete This Message?"
			,"Delete These Messages?"
			,"Remove App"
			,"Post marked as spam"
			,"Delete File Revision"
			,"Delete File"
			,"Delete Scheduled Post"
			,"Delete Conversion Pixel"
			,"Delete Post"
			,"Delete"
		];
	}
	
	var DOMNodeInserted = function(dom) {
		domNodeHandlerMain.run(dom);
	};

	var domNodeHandler = function() {
		var k = this;
		k.snowliftPinkieInjected = false;
		
		k.run = function(dom) {
			if (INTERNALUPDATE) {
				return;
			}

			if (k.shouldIgnore(dom)) {
				return;
			}
			
			k.dumpConsole(dom);
			
			// Text nodes
			if (dom.target.nodeType === TEXT_NODE) {
				//k.textNodes(dom);
				// firefox in mutationObserver goes to here when it should be characterData
				k.mutateCharacterData(dom);
				return;
			}
			
			if (k.chatSoundAudioElement(dom.target)) {
				return;
			}

			// Start internal update
			var iu = INTERNALUPDATE;
			INTERNALUPDATE = true;
			
			injectOptionsLink();
			
			k.snowliftPinkie(dom);
			k.notificationsFlyoutSettings();

			if (k.fbPhotoSubscribeWrapper(dom.target)) {
				INTERNALUPDATE = iu;
				return;
			}

			k.findFriendsNav();
			k.navHome();
			
			// ._42fu, .-cx-PRIVATE-uiButton__root, ._4jy0, .-cx-PRIVATE-xuiButton__root
			domReplaceFunc(dom.target, '', '.uiButtonText, .uiButton input, ._42ft:not(._50zy)', function(ele) {
				// <a class="uiButton uiButtonConfirm uiButtonLarge" href="#" role="button"><span class="uiButtonText">Finish</span></a>
				// <label class="uiButton uiButtonConfirm"><input value="Okay" type="submit"></label>

				// <button class="_42ft _42fu _11b selected _42g-" type="submit">Post</button>
				// <a class="_42ft _42fu" role="button" href="#"><i class="mrs img sp_8jfoef sx_d2d7c4"></i>Promote App</a>

				// Skip close icons
				//if (hasClass(ele, '_50zy') || hasClass(ele, '-cx-PRIVATE-xuiCloseButton__root')) {
				//	return;
				//}

				var button = ele;
				var replacer = buttonTitles;
				var tagName = ele.tagName.toUpperCase();
				var potentialLabel;
				if (tagName != 'A' && tagName != 'LABEL' && tagName != 'BUTTON') {
					button = ele.parentNode;

					// new message
					potentialLabel = button.getElementsByClassName('_6q-');
					if (potentialLabel.length) {
						ele = potentialLabel[0];
					}
				} else {
					potentialLabel = button.getElementsByClassName('_55pe');
					if (potentialLabel.length) {
						ele = potentialLabel[0];
					} //else {
						// Get More Likes button on page admin panel
						// <button value="1" class="_42ft _42fu selected _42g- _42gy" id="fanAcquisitionPanelPreviewBodyConfirmButton" type="submit"><span id="u_x_a">Get More Likes</span></button>
					//}
					// Get More Likes (above)
					// comment resort on entstream
					// react
					if (ele.childNodes) {
						if (ele.childNodes.length === 1 && ele.childNodes[0].tagName && ele.childNodes[0].tagName.toUpperCase() === 'SPAN') {
							ele = ele.childNodes[0];
						} else if (ele.childNodes.length === 2 && ele.childNodes[1].tagName && ele.childNodes[1].tagName.toUpperCase() === 'SPAN') { // with icon
							ele = ele.childNodes[1];
						}
					}
				}
				if (button &&
					(button.getAttribute('data-ponyhoof-button-orig') == null || hasClass(button, '_for')) && // vault buttons are crapped
					(hasClass(button, 'uiButton') || hasClass(button, '_42ft') /*|| hasClass(button, '_42fu') || hasClass(button, '-cx-PRIVATE-uiButton__root') || hasClass(button, '_4jy0') || hasClass(button, '-cx-PRIVATE-xuiButton__root')*/)
					&& !hasClass(button, '_3qig') // -cx-PUBLIC-fbComposerStore__fakeprivacywidget
					&& !hasClass(button, 'nameButton') // fbStickyHeaderBreadcrumb
				) {
					if (button.parentNode && button.parentNode.parentNode && hasClass(button.parentNode.parentNode, 'audienceSelector')) {
						replacer = menuPrivacyOnlyTitles;
					}

					var orig = '';
					var replaced = '';
					if (tagName === 'INPUT') {
						orig = ele.value;
						button.setAttribute('data-ponyhoof-button-orig', orig);
						replaced = replaceText(replacer, orig);

						k.changeButtonText(ele, replaced);
					} else {
						loopChildText(ele, function(child) {
							if (child.nodeType == 3) {
								orig += child.textContent;
								replaced += replaceText(replacer, child.textContent);
								if (child.textContent != replaced) {
									child.textContent = replaced;
								}
							}
						});
						button.setAttribute('data-ponyhoof-button-orig', orig);
					}

					if (orig != replaced) {
						if (button.getAttribute('data-hover') != 'tooltip') {
							if (button.title == '') {
								button.title = orig;
							}
						}
					}
					button.setAttribute('data-ponyhoof-button-text', replaced);

					// Top-right "Join Group"/"Create Herd" link on groups requires some treatment to avoid long group names from being crapped
					var ajaxify = button.getAttribute('ajaxify');
					if (ajaxify && (ajaxify.indexOf('/ajax/groups/membership/r2j.php?ref=group_jump_header') === 0 || ajaxify.indexOf('/ajax/groups/create_get.php?ref=jump_header') === 0)) {
						var groupsJumpTitle = $('groupsJumpTitle');
						if (!groupsJumpTitle) {
							return;
						}

						var groupsJumpBarTop = dom.target.getElementsByClassName('groupsJumpBarTop');
						if (!groupsJumpBarTop.length) {
							return;
						}
						groupsJumpBarTop = groupsJumpBarTop[0];

						var rfloat = groupsJumpBarTop.getElementsByClassName('rfloat');
						if (!rfloat.length) {
							return;
						}
						rfloat = rfloat[0];

						var groupsCleanLinks = groupsJumpBarTop.getElementsByClassName('groupsCleanLinks');
						if (!groupsCleanLinks.length) {
							return;
						}
						groupsCleanLinks = groupsCleanLinks[0];

						groupsJumpTitle.style.maxWidth = (800 - ((groupsCleanLinks.offsetWidth || 0) + (rfloat.offsetWidth || 0) - (groupsJumpTitle.offsetWidth || 0)) - 10) + 'px';
					}
				}

							});
			
			k.ufiPagerLink(dom);

			if (k.reactRoot(dom)) {
				INTERNALUPDATE = iu;
				return;
			}

			k.postLike(dom);

			if (k.ticker(dom) || k.tooltip(dom.target) || k.pagesVoiceBarText(dom.target) || k.pubcontentFeedChaining(dom.target)) {
				INTERNALUPDATE = iu;
				return;
			}

			domReplaceFunc(dom.target, '', '.inCommonSectionList, #fbTimelineHeadline .name h2 > div, ._8yb, ._508a, .permalinkHeaderInfo > .subscribeOrLikeSentence > .fwn, ._5j2m, ._7ll .pageByline, ._5cnt > .fcg, ._5h4h > .fcg, ._5bxn, ._5l2i, ._5ehb, ._5sqk > ._5sqs > ._50f8, ._5ry0 > .fcg', k.textBrohoof);
			
			/*domReplaceFunc(dom.target, '', '.uiUfiViewAll, .uiUfiViewPrevious, .uiUfiViewMore', function(ele) {
				var button = ele.querySelector('input[type="submit"]');
				var t = button.value;
				t = t.replace(/comments/g, "friendship letters");
				t = t.replace(/comment/g, "friendship letter");
				if (button.value != t) {
					button.value = t;
				}
			});*/
			
			domReplaceFunc(dom.target, 'egoProfileTemplate', '.egoProfileTemplate', function(ele) {
				if (ele.getAttribute('data-ponyhoof-ponified')) {
					return;
				}
				var div = ele.getElementsByTagName('div');
				if (div.length) {
					for (var i = 0, len = div.length; i < len; i += 1) {
						var t = div[i].innerHTML;
						t = k.textStandard(t);
						if (div[i].innerHTML != t) {
							div[i].innerHTML = t;
						}
					}
				}
				
				var action = ele.getElementsByClassName('uiIconText');
				if (action.length) {
					action = action[0];
					ele.setAttribute('data-ponyhoof-iconText', action.textContent);

					var orig = action.innerHTML;
					var t = orig;
					t = t.replace(/Like/g, capitaliseFirstLetter(CURRENTSTACK['like']));
					t = t.replace(/&lt;3/, capitaliseFirstLetter(CURRENTSTACK['like'])); // fb_LT
					t = t.replace(/Join Group/, "Join the Herd");
					t = t.replace(/Add Friend/, "Add "+capitaliseFirstLetter(CURRENTSTACK['friend']));
					t = t.replace(/\bConfirm Friend\b/, "Confirm Friendship");
					if (t !== orig) {
						action.innerHTML = t;
					}
				}

				ele.setAttribute('data-ponyhoof-ponified', 1);
			});
			
			domReplaceFunc(dom.target, 'uiInterstitial', '.uiInterstitial', function(ele) {
				if (ele.getAttribute('data-ponyhoof-ponified')) {
					return;
				}
				ele.setAttribute('data-ponyhoof-ponified', 1);

				var title = ele.getElementsByClassName('uiHeaderTitle');
				if (title.length) {
					title = title[0];
				} else {
					title = ele.querySelector('.fsxl.fwb');
					if (!title) {
						return;
					}
				}
				ele.setAttribute('data-ponyhoof-inters-title', title.textContent);
			});

			domReplaceFunc(dom.target, 'uiLayer', '.uiLayer', function(ele) {
				if (ele.getAttribute('data-ponyhoof-dialog-title')) {
					return;
				}

				var titlebar = ele.querySelector('._t ._1yw, ._4-i0, .overlayTitle, .fbCalendarOverlayHeader');
				if (titlebar) {
					var titletext = ele.querySelector('._52c9');
					if (!titletext) {
						titletext = titlebar;
					}

					var orig = '';
					var replaced = '';
					loopChildText(titletext, function(child) {
						if (child.nodeType === ELEMENT_NODE) { // fix div soup
							if (child.childNodes && child.childNodes.length === 1) {
								child = child.childNodes[0];
							}
						}

						if (child.nodeType === TEXT_NODE) {
							orig += child.textContent;
							replaced += replaceText(dialogTitles, child.textContent);
							if (child.textContent != replaced) {
								child.textContent = replaced;
							}
						}
					});
					addClass(titletext, 'ponyhoof_fbdialog_titletext');
					addClass(titlebar, 'ponyhoof_fbdialog_title');
					if (orig != replaced) {
						titlebar.title = orig;
					}

					addClass(ele, 'ponyhoof_fbdialog');
					ele.setAttribute('data-ponyhoof-dialog-title', replaced);
					ele.setAttribute('data-ponyhoof-dialog-orig', orig);

					var body = ele.querySelector('._t ._13, ._4-i2, .uiLayerPageContent > .pvm');
					if (body) {
						addClass(body, 'ponyhoof_fbdialog_body');

						// fix nuke dialog on entstream
						var descriptionBody = body;
						if (descriptionBody.childNodes && descriptionBody.childNodes.length && descriptionBody.childNodes[0]) {
							if (descriptionBody.childNodes[0].nodeType === ELEMENT_NODE && hasClass(descriptionBody.childNodes[0], '_50f4')) {
								descriptionBody = descriptionBody.childNodes[0];
							}
						}

						var stop = false;
						loopChildText(descriptionBody, function(child) {
							if (stop) {
								return;
							}
							if (child.nodeType === TEXT_NODE) {
								var replaced = replaceText(dialogDescriptionTitles, child.textContent);
								if (child.textContent != replaced) {
									child.textContent = replaced;
									stop = true;
								}
							}
						});

						k._dialog_insertReadme(body);
					}

					if (hasClass(dom.target, 'uiLayer')) {
						// dom.target is intentional
						// Detect rare cases when HTML detection just got turned on, and there is a dialog at the back
						k._dialog_playSound(replaced, ele);
					}

					k._dialogNukeDetect(orig, ele);

					if (USINGMUTATION) {
						k.updateLayerPosition(ele);
					}
				}

				domChangeTextbox(ele, '._5nw-, .groupsMemberFlyoutWelcomeTextarea', function(textbox) {
					var orig = textbox.getAttribute('placeholder');
					var t = orig.replace(/\bgroup\b/, 'herd');
					if (t != orig) {
						return t;
					}
					return "Welcome him/her to the herd...";
				});
				/*domChangeTextbox(ele, '.fbEventMemberComment', function(textbox) {
					var orig = textbox.getAttribute('placeholder');
					var t = orig.replace(/\bevent\b/, 'adventure');
					if (t != orig) {
						return t;
					}
					return orig; // for pages "Write something to let her know you're going too."
				});*/

				// Hovercard
				$$(ele, '._7lo > .fcg', function(footer) {
					loopChildText(footer, k.textBrohoof);
				});

				// graph search
				$$(ele, '._21r', k._facebarTypeaheadList_list);

				$$(ele, '.ogHovercardFullFeedbackDialog', k._graphSearch_ufi);
			});

			domReplaceFunc(dom.target, '', 'a[href^="/ajax/sharer/"][rel="dialog"], a[ajaxify^="/ajax/sharer/"], a[href^="/ajax/sharer?"][rel="dialog"], a[href^="/ajax/photos/album/share_dialog.php"], a[ajaxify^="/ajax/video/actions/share/dialog/"]', function(ele) {
				if (CURRENTSTACK.stack === 'pony') {
					ele.setAttribute('data-hover', 'tooltip');
					ele.setAttribute('aria-label', CURRENTLANG['fb_share_tooltip']);
					ele.setAttribute('title', '');
				}
			});
			
			domReplaceFunc(dom.target, '', '.uiHeaderTitle, .legacyContextualDialogTitle, ._6dp, ._34e, ._50f5._50f7', function(ele) {
				var imgwrap = ele.querySelector('._8m, .adsCategoryTitleLink');
				if (imgwrap) {
					ele = imgwrap;
				}

				loopChildText(ele, function(child) {
					// fix <div> soup
					if (child.childNodes && child.childNodes.length && child.childNodes[0]) {
						child = child.childNodes[0];
					}

					if (child.nodeType === TEXT_NODE) {
						var orig = child.textContent;
						var t = replaceText(headerTitles, orig);
						if (orig != t) {
							child.textContent = t;
						}
					}
				});
			});
			
			/*domReplaceFunc(dom.target, '', '.insights-header .header-title > .ufb-text-content', function(ele) {
				var t = replaceText(headerInsightsTitles, ele.textContent);
				if (ele.textContent != t) {
					ele.textContent = t;
				}
			});*/

			if (k.fbDockChatBuddylistNub(dom.target) || k.pokesDashboard(dom.target)) {
				INTERNALUPDATE = iu;
				return;
			}

			k.commentBrohoofed(dom);

			k.changeCommentBox(dom);
			k.changeComposer(dom);

			k.notification(dom);
			k.menuItems(dom);
			k.fbRemindersStory(dom.target);
			if (k.flyoutLikeForm(dom.target)) {
				INTERNALUPDATE = iu;
				return;
			}
			k.pluginButton(dom.target);
			k.pluginCommentBox(dom.target);
			//k.insightsCountry(dom.target);
			k.timelineMutualLikes(dom.target);
			k.videoStageContainer(dom.target);
			k.uiStreamShareLikePageBox(dom.target);
			k.fbTimelineUnit(dom.target);
			k.pageBrowserItem(dom.target);
			k.entstreamCollapsedUFISentence(dom.target);
			k.typeahead_list(dom.target);
			k.insightsBar(dom.target);
			k.uiAttachmentDetails(dom.target);
			k.facebarTypeaheadList(dom.target);
			k.ponyhoofReadmeForMessage(dom.target);
			k.pageCompetitorLeaderboard(dom.target);
			k.changeSearchBox(dom.target);
			k.changeNotificationReactIfBody(dom.target);
			k.pageInviteTypeaheadView(dom.target);

			domChangeTextbox(dom.target, '.MessagingComposerForm textarea, ._1rt ._1rv, ._20y textarea, ._2oj', "Dear Princess Celestia...");
			domChangeTextbox(dom.target, '.groupAddMemberTypeaheadBox .inputtext', "Add " + capitaliseFirstLetter(CURRENTSTACK['people']) + " to the Herd");
			//domChangeTextbox(dom.target, '.friendListAddTypeahead .inputtext', "Add "+CURRENTSTACK.friends+" to this directory");
			domChangeTextbox(dom.target, '.friendListFeed .friendListAddTypeahead .inputtext', "Add " + CURRENTSTACK['friends'] + " to this list");
			domChangeTextbox(dom.target, '.groupsJumpHeaderSearch .inputtext', "Search this herd");
			domChangeTextbox(dom.target, '.MessagingSearchFilter .inputtext', "Search Friendship Reports");
			domChangeTextbox(dom.target, '#chatFriendsOnline .fbChatTypeahead .inputtext', "Pals on Whinny Chat");
			
			//domChangeTextbox(dom.target, '.uiComposer textarea', "What lessons in friendship have you learned today?");
			//domChangeTextbox(dom.target, '.uiComposerMessageBox textarea', "Share your friendship stories...");
			//domChangeTextbox(dom.target, '.uiMetaComposerMessageBox textarea', "What lessons in friendship have you learned today?");

			k.ponyhoofPageOptions(dom);
			if (userSettings.debug_betaFacebookLinks && w.location.hostname === 'beta.facebook.com') {
				k.debug_betaFacebookLinks(dom.target);
			}
			
			INTERNALUPDATE = iu;
		};

		k.photos_snowlift = null;
		k.snowliftPinkie = function(dom) {
			if (!k.snowliftPinkieInjected) {
				var id = dom.target.getAttribute('id');
				if ((id && id === 'photos_snowlift') || hasClass(dom.target, 'fbPhotoSnowlift')) {
					k.snowliftPinkieInjected = true;
					k.photos_snowlift = dom.target;

					addClass(k.photos_snowlift, 'ponyhoof_snowlift_haspinkiediv');
					var n = d.createElement('div');
					n.id = 'ponyhoof_snowlift_pinkie';
					k.photos_snowlift.appendChild(n);
				}
			}
		};

		k.notificationsFlyoutSettingsInjected = false;
		k.notificationsFlyoutSettings = function() {
			if (ISUSINGPAGE || !canPlayAudio()) {
				k.notificationsFlyoutSettingsInjected = true;
				return;
			}
			if (!k.notificationsFlyoutSettingsInjected) {
				var jewel = $('fbNotificationsJewel');
				if (jewel) {
					var header = jewel.getElementsByClassName('uiHeaderTop');
					if (!header.length || !header[0].childNodes || !header[0].childNodes.length) {
						return;
					}
					header = header[0];

					var settingsLink = d.createElement('a');
					settingsLink.href = '#';
					settingsLink.textContent = 'Ponyhoof Sounds';

					var actions = jewel.getElementsByClassName('uiHeaderActions');
					if (actions.length) {
						actions = actions[0];
						var span = d.createElement('span');
						span.innerHTML = ' &middot; ';
						
						actions.appendChild(span);
						actions.appendChild(settingsLink);
					} else {
						var rfloat = d.createElement('div');
						rfloat.className = 'rfloat';
						rfloat.appendChild(settingsLink);
						header.insertBefore(rfloat, header.childNodes[0]);
					}

					settingsLink.addEventListener('click', function(ev) {
						ev.preventDefault();

						if (!optionsGlobal) {
							optionsGlobal = new Options();
						}
						optionsGlobal.create();
						optionsGlobal.switchTab('sounds');
						optionsGlobal.show();

						try {
							clickLink(jewel.getElementsByClassName('jewelButton')[0]);
						} catch (e) {}
					}, false);

					k.notificationsFlyoutSettingsInjected = true;
				}
			}
		};

		// Change Find Friends link at the top-right to native text for reliability
		k.findFriendsNavInjected = false;
		k.findFriendsNav = function() {
			if (k.findFriendsNavInjected || ISUSINGPAGE || ISUSINGBUSINESS || ONPLUGINPAGE) {
				k.findFriendsNavInjected = true;
				return;
			}
			var findFriendsNav = $('findFriendsNav');
			if (!findFriendsNav || !findFriendsNav.childNodes || !findFriendsNav.childNodes.length) {
				return;
			}
			var text = findFriendsNav.childNodes[0]; // this should return the "Find Friends" node
			if (!text || text.nodeType !== TEXT_NODE) {
				text = findFriendsNav.childNodes[1]; // litestand
				if (!text || text.nodeType !== TEXT_NODE) {
					return;
				}
			}

			text.textContent = findFriendshipText();
			addClass(findFriendsNav, 'ponyhoof_findFriendsNav_native');
			k.findFriendsNavInjected = true;
		};

		k.navHomeDone = false;
		k.navHomeOldText = '';
		k.navHome = function() {
			if (k.navHomeDone || ONPLUGINPAGE) {
				k.navHomeDone = true;
				return;
			}

			var home = $('navHome'); // li
			if (!home || !home.childNodes || !home.childNodes.length) {
				return;
			}
			home = home.childNodes[0]; // a
			if (!home || !home.childNodes || !home.childNodes.length) {
				return;
			}

			var text = home.childNodes[0]; // this should return the "Home" text node
			if (!text || text.nodeType !== TEXT_NODE) {
				text = home.childNodes[1]; // litestand maybe
				if (!text || text.nodeType !== TEXT_NODE) {
					return;
				}
			}

			var data = convertCodeToData(REALPONY);
			if (data.princess) {
				// Store the old Home text in case we are switching themes
				if (!k.navHomeOldText) {
					k.navHomeOldText = text.textContent;
				}
				text.textContent = "Castle";
			} else {
				if (k.navHomeOldText && text.textContent != k.navHomeOldText) {
					text.textContent = k.navHomeOldText;
				}
			}

			k.navHomeDone = true;
		};

		k.navHomeReset = function() {
			k.navHomeDone = false;
			k.navHome();
		};

		k.fbPhotoSubscribeWrapper = function(target) {
			if (hasClass(target, 'fbPhotoSubscribeWrapper')) {
				var photoViewerFollowLink = target.getElementsByClassName('photoViewerFollowLink');
				if (photoViewerFollowLink.length) {
					photoViewerFollowLink = photoViewerFollowLink[0];

					var orig = photoViewerFollowLink.textContent;
					var t = orig;
					t = t.replace(/^Like/, capitaliseFirstLetter(CURRENTSTACK['like']));
					if (t != orig) {
						photoViewerFollowLink.textContent = t;
					}
				}

				var photoViewerFollowedMsg = target.getElementsByClassName('photoViewerFollowedMsg');
				if (photoViewerFollowedMsg.length) {
					photoViewerFollowedMsg = photoViewerFollowedMsg[0];

					if (photoViewerFollowedMsg.textContent === 'Liked') {
						photoViewerFollowedMsg.textContent = capitaliseFirstLetter(CURRENTSTACK['liked']);
					}
				}

				return true;
			}

			return false;
		};

		// @todo should this be merged with characterdata? what happens with no mutationobserver?
		k.textNodes = function(dom) {
			k.dialog_title(dom);
			k.buttonText(dom);
		};

		k.dialog_title = function(dom) {
			try {
				if (!dom.target.parentNode || !dom.target.parentNode.parentNode || !hasClass(dom.target.parentNode.parentNode, 'dialog_title')) {
					return false;
				}

				var title = dom.target.parentNode.parentNode;
				var orig = dom.target.textContent;
				var replaced = replaceText(dialogTitles, orig);

				if (dom.target.textContent != replaced) {
					dom.target.textContent = replaced;
				}
				addClass(title, 'ponyhoof_fbdialog_titletext');
				addClass(title, 'ponyhoof_fbdialog_title');
				if (orig != replaced) {
					title.title = orig;
				}

				k.getParent(title, function(ele) {
					return hasClass(ele, 'generic_dialog');
				}, function(ele) {
					addClass(ele, 'ponyhoof_fbdialog');
					ele.setAttribute('data-ponyhoof-dialog-title', replaced);
					ele.setAttribute('data-ponyhoof-dialog-orig', orig);

					var body = ele.getElementsByClassName('dialog_body');
					if (body.length) {
						body = body[0];
						addClass(body, 'ponyhoof_fbdialog_body');

						var confirmation_message = body.getElementsByClassName('confirmation_message');
						if (confirmation_message.length) {
							confirmation_message = confirmation_message[0];

							var stop = false;
							loopChildText(confirmation_message, function(child) {
								if (stop) {
									return;
								}
								if (child.nodeType == TEXT_NODE) {
									var replaced = replaceText(dialogDescriptionTitles, child.textContent);
									if (child.textContent != replaced) {
										child.textContent = replaced;
										stop = true;
									}
								}
							});
						} else {
							var video_dialog_text = body.getElementsByClassName('video_dialog_text');
							if (video_dialog_text.length) {
								video_dialog_text = video_dialog_text[0];
								if (video_dialog_text.childNodes.length == 3) {
									var i = 0;
									var texts = ["Nuking a video is permanent.", "Once you nuke a video, you will not be able to get it back.", "Are you sure you want to nuke this video?"];
									loopChildText(video_dialog_text, function(child) {
										if (!texts[i]) {
											return;
										}
										child.textContent = texts[i];
										i += 1;
									});
								}
							} else {
								var stop = false;
								loopChildText(body, function(child) {
									if (stop) {
										return;
									}
									if (child.nodeType === TEXT_NODE) {
										var orig = child.textContent;
										var replaced = replaceText(dialogDescriptionTitles, orig);
										if (orig != replaced) {
											child.textContent = replaced;
											stop = true;
										}
									}
								});
							}
						}
					}

					k._dialog_playSound(replaced, ele);
					k._dialogNukeDetect(orig, ele);
				});

				return true;
			} catch (e) {}
		};

		k.buttonText = function(dom) {
			// Buttons
			if (dom.target.parentNode && dom.target.parentNode.parentNode) {
				var buttonText;
				var button;

				var stop = true;
				var replacer = buttonTitles;
				if (hasClass(dom.target.parentNode, 'uiButtonText')) {
					buttonText = dom.target.parentNode;
					button = dom.target.parentNode.parentNode;
					stop = false;

					if (button.parentNode && button.parentNode.parentNode && hasClass(button.parentNode.parentNode, 'audienceSelector')) {
						replacer = menuPrivacyOnlyTitles;
					}
				} else if (hasClass(dom.target.parentNode, '_42ft')) {
					// dropdown on close friends list dialog
					// <a class="-cx-PRIVATE-abstractButton__root -cx-PRIVATE-uiButton__root -cx-PRIVATE-uiPopoverButton__root autofocus -cx-PRIVATE-uiPopover__trigger" role="button" href="#" style="max-width: 200px;" aria-haspopup="true" aria-expanded="true" rel="toggle" id="u_i_b" aria-owns="u_i_9">On This List<i class="mls img sp_8noqk7 sx_706bf4"></i></a>
					buttonText = dom.target;
					button = dom.target.parentNode;
					stop = false;

					if (hasClass(dom.target.parentNode, '_4-s1')) {
						if (dom.target.parentNode.childNodes && dom.target.parentNode.childNodes.length && dom.target.parentNode.childNodes[0].nodeType === TEXT_NODE) {
							buttonText = dom.target.parentNode.childNodes[0];
						}
					}
				} else if (hasClass(dom.target.parentNode.parentNode, '_42ft')) {
					// hasClass(buttonText, '_55pe') || hasClass(buttonText, '-cx-PUBLIC-abstractPopoverButton__label')
					// "share to" dropdown on sharer dialog
					// comment resort on entstream
					buttonText = dom.target;
					button = dom.target.parentNode.parentNode;
					stop = false;
				}

				if (!stop) {
					var orig = '';
					if (buttonText.nodeType === TEXT_NODE) {
						orig = buttonText.textContent;
					} else {
						orig = buttonText.innerHTML;
					}
					var replaced = replaceText(replacer, orig);
					if (hasClass(button, 'uiButton') || hasClass(button, '_42ft')) {
						// button text that didn't get ponified needs to be considered, e.g. share dialog's "On your Page"
						if (button.getAttribute('data-hover') != 'tooltip') {
							if (orig != replaced) {
								// ponified text
								if (button.title == '') {
									// tooltip is blank, so it would be OK to set our own
									button.title = orig;
								} else {
									// tooltip is NOT blank, this means (1) FB added their own tooltip or (2) we already added our own tooltip
									if (button.title == button.getAttribute('data-ponyhoof-button-orig')) {
										button.title = orig;
									}
								}
							} else {
								button.title = '';
							}
						}
						button.setAttribute('data-ponyhoof-button-orig', orig);
						button.setAttribute('data-ponyhoof-button-text', replaced);
					}
					if (orig != replaced) {
						if (buttonText.nodeType === TEXT_NODE) {
							buttonText.textContent = replaced;
						} else {
							buttonText.innerHTML = replaced;
						}
					}
				}
			}
		};

		k.ufiPagerLink = function(dom) {
			domReplaceFunc(dom.target, '', '.UFIPagerLink', function(ele) {
				var t = ele.innerHTML;
				t = t.replace(/ comments/, " friendship letters");
				t = t.replace(/ comment/, " friendship letter");
				if (ele.innerHTML != t) {
					ele.innerHTML = t;
				}
			});
		};

		k.postLike = function(dom) {
			if (hasClass(dom.target, 'uiUfiLike') || hasClass(dom.target, 'UFILikeSentence')) {
				k._likePostBox(dom.target);
			} else {
				/*if (dom.target.parentNode) {
					if (hasClass(dom.target.parentNode, 'UFILikeSentence')) {
						k._likePostBox(dom.target);
						return;
					}
				}*/
				domReplaceFunc(dom.target, '', '.uiUfiLike, .UFILikeSentence', k._likePostBox);
			}
		};
		
		k._likePostBox = function(ele) {
			//var inner = ele.querySelector('._42ef, .-cx-PRIVATE-uiFlexibleBlock__flexiblecontent, .lfloat > span, .-cx-PRIVATE-uiImageBlockDeprecated__content, .-cx-PRIVATE-uiImageBlock__content, ._8m, .-cx-PRIVATE-uiFlexibleBlock__flexibleContent');
			//if (inner) {

			var inner = ele.getElementsByClassName('UFILikeSentenceText');
			if (inner.length) {
				inner = inner[0];
				k._likePostBox_loop(inner);
			}

			var reorder = ele.getElementsByClassName('UFIOrderingModeSelectorDownCaret');
			if (reorder.length) {
				reorder = reorder[0];
				if (reorder.previousSibling) {
					k.UFIOrderingMode(reorder.previousSibling);
				}
			}

			var seen = ele.getElementsByClassName('UFISeenCount');
			if (seen.length) {
				seen = seen[0];
				k._likePostBox_seen(seen);
			}
		};

		k._likePostBox_loop = function(ele) {
			// Change "**profile people test** likes this." -> "**profile people test** brohoofs this."
			// Previous versions would change it to "**profile ponies test** brohoofs this."
			for (var i = 0, len = ele.childNodes.length; i < len; i += 1) {
				if (ele.childNodes[i].nodeType === TEXT_NODE) {
					k._likePostBox_loop_text(ele.childNodes[i]);
				} else {
					if (!hasClass(ele.childNodes[i], 'profileLink')) {
						k._likePostBox_loop(ele.childNodes[i]);
					}
				}
			}
		};

		k._likePostBox_loop_text = function(ele) {
			var orig = ele.textContent;
			var t = k.likeSentence(orig);
			if (orig != t) {
				ele.textContent = t;
			}
		};

		k.likeSentence = function(t) {
			//t = t.replace(/likes? this\./g, "brohoof'd this.");
			t = t.replace(/like this\./g, CURRENTSTACK['like_past']+" this.");
			t = t.replace(/likes this\./g, CURRENTSTACK['likes_past']+" this.");
			t = t.replace(/\bpeople\b/g, CURRENTSTACK['people']);
			t = t.replace(/\bperson\b/g, CURRENTSTACK['person']); // http://fb.com/647294431950845

			if (CURRENTSTACK['stack'] === 'pony') {
				t = t.replace(/\bn00bz\b/, CURRENTSTACK['people']);
				t = t.replace(/\bgusta th!5\b/, '/) th!5');
				t = t.replace(/ \u2665 7h15\b/, ' /) 7h15');
				t = t.replace(/ \u2665 7h!5\.$/, ' /) 7h!5.');
				t = t.replace(/ \u2665 \^$/, ' /) ^');
			}

			return t;
		};

		k.UFIOrderingMode = function(ele) {
			if (ele.textContent === 'Top Comments') {
				ele.textContent = 'Top Friendship Letters';
			}
		};

		k._likePostBox_seen = function(seen) {
			if (seen.childNodes && seen.childNodes.length && seen.childNodes[1]) {
				k._likePostBox_changeText(seen.childNodes[1]);
			}
		};

		k._likePostBox_changeText = function(seen) {
			if (seen.textContent === 'Seen by everyone') {
				seen.textContent = 'Seen by everypony';
			}
		};

		k._likeDesc = '';
		k._unlikeDesc = '';
		k._likeConditions = '';
		k._likeIsLikeConditions = '';
		k.FB_TN_LIKELINK = '>';
		k.FB_TN_UNLIKELINK = '?';
		k.commentBrohoofed = function(dom) {
			var targets = '.UFICommentActions a, .UFILikeLink';
			if (!USINGMUTATION) {
				targets += ', .UFILikeThumb';
			}
			domReplaceFunc(dom.target, '', targets, k._commentLikeLink);
		};

		k.commentLikeDescInit = function() {
			if (k._likeDesc == '') {
				if (LANG[UILANG] && LANG[UILANG].sniff_comment_tooltip_like) {
					k._likeDesc = LANG[UILANG].sniff_comment_tooltip_like;
				} else {
					k._likeDesc = LANG['en_US'].sniff_comment_tooltip_like;
				}
				if (LANG[UILANG] && LANG[UILANG].sniff_comment_tooltip_unlike) {
					k._unlikeDesc = LANG[UILANG].sniff_comment_tooltip_unlike;
				} else {
					k._unlikeDesc = LANG['en_US'].sniff_comment_tooltip_unlike;
				}

				k._likeConditions = [
					k._likeDesc, k._unlikeDesc,
					capitaliseFirstLetter(CURRENTSTACK.like)+" this friendship letter", capitaliseFirstLetter(CURRENTSTACK.unlike)+" this friendship letter"
				];
				k._likeIsLikeConditions = [
					k._likeDesc,
					capitaliseFirstLetter(CURRENTSTACK.like)+" this friendship letter"
				];
			}
		};

		k._commentLikeLink = function(ele) {
			k.commentLikeDescInit();

			var pass = false;
			var likeThumb = false;
			if (k._likeConditions.indexOf(ele.title) == -1) {
				// extreme sniffing
				var trackingNode = k.getTrackingNode(ele);
				if (trackingNode == k.FB_TN_LIKELINK || trackingNode == k.FB_TN_UNLIKELINK) {
					pass = true;
				} else if (!USINGMUTATION && hasClass(ele, 'UFILikeThumb')) {
					likeThumb = true;
					pass = true;
				}
			} else {
				pass = true;
			}
			if (!pass) {
				return;
			}

			if (!hasClass(ele, 'ponyhoof_brohoof_button')) {
				if (!USINGMUTATION) {
					ele.addEventListener('click', function() {
						var ele = this;
						k.delayIU(function() {
							if (likeThumb) {
								// UFILikeThumb disappears after a post is brohoof'd
								k._likeBrohoofMagic(ele, false);
							} else {
								k._commentLikeLink(ele);
							}
						});
					}, false);
				}
				addClass(ele, 'ponyhoof_brohoof_button');
			}

			var isLike = false;
			if (k.getTrackingNode(ele) == k.FB_TN_LIKELINK || likeThumb || k._likeIsLikeConditions.indexOf(ele.title) != -1) {
				isLike = true;
			}

			k._likeBrohoofMagic(ele, isLike);
		};

		k._likeBrohoofMagic = function(ele, isLike) {
			var comment = k.getReactComment(ele);
			var title = '';
			if (isLike) {
				removeClass(ele, 'ponyhoof_brohoof_button_unbrohoof');
				title = capitaliseFirstLetter(CURRENTSTACK.like)+" this";
			} else {
				addClass(ele, 'ponyhoof_brohoof_button_unbrohoof');
				title = capitaliseFirstLetter(CURRENTSTACK.unlike)+" this";
			}
			if (comment) {
				title += " friendship letter";
			}
			ele.setAttribute('data-ponyhoof-title', ele.title);
			ele.title = title;
			ele.setAttribute('data-ponyhoof-title-modified', title);

			if (comment) {
				k._markCommentLiked(comment, isLike);

				// Fix an edge case with jump to comment
				if (hasClass(comment, 'highlightComment')) {
					w.setTimeout(function() {
						k._markCommentLiked(comment, isLike);
					}, 1);
				}
			} else {
				k.delayIU(function() {
					if (!ele.parentNode) {
						var ufi = k.getReactUfi(ele);
						if (!ufi) {
							return;
						}
						ele = ufi;
					}

					k.getParent(ele, function(form) {
						return (form.tagName.toUpperCase() === 'FORM' && hasClass(form, 'commentable_item'));
					}, function(form) {
						if (!form) {
							return;
						}
						/*var ufi = form.getElementsByClassName('UFIList');
						if (!ufi.length) {
							return;
						}
						ufi = ufi[0];
						if (!ufi.parentNode) {
							return;
						}*/

						if (isLike) {
							//removeClass(ufi.parentNode, 'ponyhoof_brohoofed');
							removeClass(form, 'ponyhoof_brohoofed');
						} else {
							//addClass(ufi.parentNode, 'ponyhoof_brohoofed');
							addClass(form, 'ponyhoof_brohoofed');
						}
					});
				});
			}
		};

		k._markCommentLiked = function(ufiitem, isLike) {
			var child = null;
			if (ufiitem.childNodes && ufiitem.childNodes.length && ufiitem.childNodes[0]) {
				child = ufiitem.childNodes[0];
			}
			if (isLike) {
				removeClass(ufiitem, 'ponyhoof_comment_liked');
				if (child) {
					removeClass(child, 'ponyhoof_comment_liked');
				}
			} else {
				addClass(ufiitem, 'ponyhoof_comment_liked');
				if (child) {
					addClass(child, 'ponyhoof_comment_liked');
				}
			}
		};

		k.REACTSEPARATOR = '.'; // https://github.com/facebook/react/commit/559cd46181a80bb9519e3359f4d9c6745bd3a36c#diff-effe600d13801a10ce49fdbdd0e575fe
		k.REACTATTRNAME = 'data-reactid'; // https://github.com/facebook/react/commit/67cf44e7c18e068e3f39462b7ac7149eee58d3e5
		k.getReactId = function(ufiitem) {
			var id = ufiitem.getAttribute(k.REACTATTRNAME);
			if (!id) {
				return false;
			}

			if (id.charAt(0) === k.REACTSEPARATOR) {
				return id.substr(0, id.indexOf(k.REACTSEPARATOR, 1));
			}

			return false;
		};

		k.reactRoot = function(dom) {
			var id = dom.target.getAttribute(k.REACTATTRNAME);
			if (id || hasClass(dom.target, 'UFILikeIcon')) {
				// beeperNotificaton
				if (hasClass(dom.target, '_3sod')) {
					var info = dom.target.querySelector('._3sol > span');
					if (!info) {
						return false;
					}
					k._beepNotification_change(dom.target, info, k._beepNotification_condition_react);

					return true;
				}

				// Notifications
				if (k._notification_react(dom.target)) {
					return true;
				}
				var notificationReact = false;
				domReplaceFunc(dom.target, '', '.' + k.notification_itemClass[0], function(ele) {
					k._notification_react(ele);
					notificationReact = true;
				});
				if (notificationReact) {
					return true;
				}

				// Comments
				if (hasClass(dom.target, 'UFIList')) {
					k.postLike({target: dom.target});
					k.commentBrohoofed({target: dom.target});
					k.changeCommentBox({target: dom.target});
				} else if (hasClass(dom.target, 'UFIComment')) {
					k.commentBrohoofed({target: dom.target});
				} else if (hasClass(dom.target, 'UFIReplyList')) {
					k.changeCommentBox({target: dom.target});
					k.commentBrohoofed({target: dom.target}); // only 1 reply
				} else if (hasClass(dom.target, 'UFIAddComment')) {
					domChangeTextbox(dom.target, 'textarea', k._changeCommentBox_change);
				} else if (hasClass(dom.target, 'UFILikeSentence')) {
					k._likePostBox(dom.target);
				} else if (hasClass(dom.target, 'UFIImageBlockContent')) {
					//if (hasClass(dom.target, '_42ef') || hasClass(dom.target, '-cx-PRIVATE-uiFlexibleBlock__flexiblecontent')) {
						// on groups with seen, clicking a photo will open in the viewer, but the original post on the group messes up
						k._likePostBox(dom.target.parentNode);
					//} else {
						// marking a comment as spam in another section, and then unmark
						k.commentBrohoofed({target: dom.target});
					//}
				} else if (hasClass(dom.target, 'UFILikeLink') || (!USINGMUTATION && hasClass(dom.target, 'UFILikeThumb'))) {
					k._commentLikeLink(dom.target);
				} else if (dom.target.parentNode) {

					if (hasClass(dom.target.parentNode, 'UFIComment')) {
						// marking a comment as spam, and then immediately undo
						k.commentBrohoofed({target: dom.target.parentNode});
					} else if (hasClass(dom.target.parentNode, 'UFILikeSentence')) {
						// groups with seen, from no likes to liked
						k._likePostBox(dom.target.parentNode);
					} else if (dom.target.parentNode.parentNode) {

						//if (hasClass(dom.target.parentNode.parentNode, 'UFIImageBlockContent') || hasClass(dom.target.parentNode.parentNode, 'lfloat')) {
						if (hasClass(dom.target.parentNode.parentNode, 'UFILikeSentenceText')) {
							// John brohoof this.
							// You and John like this.
							var ufi = k.getReactUfi(dom.target);
							if (ufi) {
								k.postLike({target: ufi});
							}
						} else if (dom.target.parentNode.parentNode.parentNode) {

							//if (hasClass(dom.target.parentNode.parentNode.parentNode, 'UFIImageBlockContent')) {
							if (hasClass(dom.target.parentNode.parentNode.parentNode, 'UFILikeSentenceText')) {
								var ufi = k.getReactUfi(dom.target);
								if (ufi) {
									k.postLike({target: ufi});
								}
							}
						}
					}
				}

				// Insights
				k.insightsCountry(dom.target);

				// Page competitor
				// LeaderboardRow.react x2
				// RecommendationRow.react
				$$(dom.target, '._582v > ._58oa, ._582x > ._58oa, ._58of > ._58oa > div:first-child > span:nth-child(3)', k.textBrohoof);

				return true;
			}

			return false;
		};

		k.changeCommentBox = function(dom) {
			domChangeTextbox(dom.target, '.commentArea textarea, .UFIAddComment textarea', k._changeCommentBox_change);
		};
		k._changeCommentBox_change = function(textbox) {
			// Skip isQAndA with an ugly English-only hack
			if (textbox.getAttribute('placeholder') === "Ask a question...") {
				return textbox.getAttribute('placeholder');
			}

			try {
				var form = textbox;
				if (textbox.form) {
					form = textbox.form;
				}
				if (!k._changeCommentBox_isUfiForm(form)) {
					while (form) {
						form = form.parentNode;
						if (k._changeCommentBox_isUfiForm(form)) {
							break;
						}
					}
				}
				if (form) {
					var feedback_params = form.elements['feedback_params'];
					feedback_params = JSON.parse(feedback_params.value);

					switch (feedback_params.assoc_obj_id) {
						case '140792002656140':
						case '346855322017980':
							return LANG['ms_MY'].fb_comment_box;

						case '146225765511748':
							return CURRENTLANG['fb_composer_coolstory'];

						default:
							break;
					}
					switch (feedback_params.target_profile_id) {
						case '496282487062916':
							return CURRENTLANG['fb_composer_coolstory'];

						default:
							break;
					}
					switch (feedback_params.actor) { // apparently page milestones don't have target_profile_id >_>
						case '496282487062916':
							return CURRENTLANG['fb_composer_coolstory'];

						default:
							break;
					}
				}
			} catch (e) {}
			
			return CURRENTLANG['fb_comment_box'];
		};

		k._changeCommentBox_isUfiForm = function(form) {
			return (form.tagName.toUpperCase() === 'FORM' && form.getAttribute('action') === '/ajax/ufi/modify.php');
		};

		k.composerPonies = new RegExp(['pony', 'ponies', 'mlp', 'brony', 'bronies', 'pegasister', 'pega sister', 'pega-sister', 'twilight sparkle', 'rainbow dash', 'pinkie', 'applejack', 'fluttershy', 'rarity', 'celestia', 'derpy', 'equestria', 'canterlot', 'dashie', 'apple jack', 'flutter shy', 'princess luna', 'friendship is magic', 'kuda', 'pinkamena', 'bon bon', 'bonbon'].join('|'), 'i');
		k.composerExclude = new RegExp(['suc'+'k', 'sh'+'it', 'f'+'uck', 'as'+'sho', 'cr'+'ap', 'ponyf'+'ag', 'fa'+'ggo', 'ret'+'ard', 'di'+'ck'].join('|'), 'i');
		k.composerSpecialPages = null;
		k.composerComposerQuestion = '_d4';
		k.composerSelectors = '.uiComposer .mentionsTextarea, .composerTypeahead textarea, .'+k.composerComposerQuestion;
		k.composerButtonSelectors = '.uiComposerMessageBoxControls .submitBtn input, .uiComposerMessageBoxControls .submitBtn .uiButtonText, ._11b input, button._11b';
		k.composerOriginalButtonText = {};
		k.changeComposer = function(dom) {
			if (!k.composerSpecialPages) {
				k._changeComposer_initSpecialPages();
			}

			var pageid = '';

			// tagging people with "Who are you with?" and new feelings feature
			if (hasClass(dom.target, 'uiMentionsInput')) {
				// fix group composers, ugh
				if (dom.target.parentNode && dom.target.parentNode.parentNode && dom.target.parentNode.parentNode.parentNode) {
					// .uiMentionsInput -> #id -> .-cx-PUBLIC-fbComposerMessageBox__root -> form -> .-cx-PUBLIC-fbComposer__content
					k._changeComposer_fixGroup(dom.target.parentNode.parentNode.parentNode);
				}

				contentEval(function(arg) {
					try {
						if (typeof window.requireLazy === 'function') {
							window.requireLazy(['MentionsInput'], function(MentionsInput) {
								var mentions = MentionsInput.getInstance(document.getElementById(arg.uiMentionsInput));
								mentions.setPlaceholder(mentions._input.title);
							});
						}
					} catch (e) {
						if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
							console.log("Unable to hook to MentionsInput");
							console.dir(e);
						}
					}
				}, {'uiMentionsInput': dom.target.getAttribute('id')});
				return;
			}

			try {
				k.changeComposer_find(dom.target, function(details) {
					var placeholderText = CURRENTLANG['fb_composer_lessons'];

					var form = details.form;
					var composer = details.composer;
					var inputContainer = details.inputContainer;
					pageid = details.pageid;

					// Abort if form is not found
					if (!form) {
						return placeholderText;
					}

					// For CSS styling
					form.setAttribute('data-ponyhoof-xhpc_targetid', pageid);

					// Change "Update Status" to "Take a Note"
					k._changeComposerAttachment(dom, pageid);

					// Seronoknya! ;)
					if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].malay) {
						$$(form, k.composerButtonSelectors, function(submit) {
							k.changeButtonText(submit, "Kirim");
						});
					}

					// Change the Post button to Ponies!
					composer.addEventListener('input', function() {
						k._changeComposer_changeText(form, composer, pageid, 'value');
					}, true);

					// Skip hashtags
					if (composer.form.elements['xhpc_topicfeedid']) {
						// #mylittlepony
						var changeText_hashtag = function() {
							composer.removeEventListener('focus', changeText_hashtag, true);
							k._changeComposer_changeText(form, composer, pageid, 'placeholder');
						};
						composer.addEventListener('focus', changeText_hashtag, true);

						return composer.getAttribute('placeholder'); // Say something about #mylittlepony
					}

					// Insert readme when people try to post to the Ponyhoof page
					if (isPonyhoofPage(pageid)) {
						k._changeComposer_insertReadmeOnFocus(details);
						return "Send feedback for Ponyhoof...";
					}

					// Special pages/groups
					if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].composer) {
						return k.composerSpecialPages[pageid].composer;
					}

					return placeholderText;
				});
			} catch (e) {
				warn(e.message);
				log(e.stack);
			}

			// moved outside for timelineStickyHeader
			if (!pageid) {
				k._changeComposerAttachment(dom, null);
			}
		};

		k.changeComposer_find = function(target, func) {
			domChangeTextbox(target, k.composerSelectors, function(composer) {
				var pageid = null;
				if (composer.form && composer.form.elements) {
					// Get the page ID
					pageid = composer.form.elements['xhpc_targetid'];
					if (pageid) {
						pageid = pageid.value;
					} else {
						throw new Error('xhpc_targetid is not found for ' + composer.getAttribute('id'));
					}
				} else {
					throw new Error('No form found for ' + composer.getAttribute('id'));
				}

				var form = composer;
				var inputContainer = null;
				while (form) {
					if (hasClass(form, 'uiComposer') || hasClass(form, '_119' /*'_118'*/)) {
						break;
					}
					if (hasClass(form, 'inputContainer')) {
						inputContainer = form;
					}
					form = form.parentNode;
				}
				
				return func({
					form: form
					,composer: composer
					,inputContainer: inputContainer
					,pageid: pageid
				});
			}, {selectOnly: !(CURRENTPONY && CURRENTPONY !== 'NONE')});
		};

		k._changeComposerAttachment = function(dom, pageid) {
			$$(dom.target, '._4_ li a, ._9lb, .uiComposerAttachment', function(attachment) {
				if (attachment.getAttribute('data-ponyhoof-ponified')) {
					return;
				}

				var switchit = false;
				switch (attachment.getAttribute('data-endpoint')) {
					case '/ajax/composerx/attachment/status/':
					case '/ajax/composerx/attachment/group/post/':
					case '/ajax/composerx/attachment/wallpost/':
					case '/ajax/metacomposer/attachment/timeline/status.php':
					case '/ajax/metacomposer/attachment/timeline/backdated_status.php':
					case '/ajax/metacomposer/attachment/timeline/wallpost.php':
					case '/ajax/ads/create/composerx/attachment/status/':
					case '/ajax/composer/attachment/wallpost/wallpost.php':
						switchit = "Take a Note";
						if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].malay) {
							switchit = "Tulis Kiriman";
						}
						break;

					case '/ajax/composerx/attachment/media/chooser/':
					case '/ajax/composerx/attachment/media/chooser':
					case '/ajax/composerx/attachment/media/upload/':
					case '/ajax/metacomposer/attachment/timeline/photo/photo.php':
					case '/ajax/metacomposer/attachment/timeline/photo/backdated_upload.php':
					case '/ajax/metacomposer/attachment/timeline/backdated_vault.php?max_select=1':
					case '/ajax/ads/create/composerx/attachment/media/upload/':
					case '/ajax/composer/attachment/photo/photo.php':
						switchit = "Add a Pic";
						if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].malay) {
							switchit = "Tambah Gambar / Video";
						}
						break;

					case '/ajax/composerx/attachment/question/':
						switchit = "Query";
						if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].malay) {
							switchit = "Tanya Soalan";
						}
						break;

					case '/ajax/composerx/attachment/group/file/':
					case '/ajax/composerx/attachment/group/filedropbox/':
						if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].malay) {
							switchit = "Tambah Fail";
						}
						break;

					default:
						break;
				}
				if (!switchit) {
					if (attachment.getAttribute('data-endpoint').indexOf('/ajax/composerx/attachment/pages/other') != -1 || attachment.getAttribute('data-endpoint').indexOf('/ajax/metacomposer/attachment/timeline/pages_other.php') != -1) {
						switchit = "Adventure, Milestone +";
						//if (attachment.id === 'offerEventAndOthersButton') {
						if (attachment.textContent.toLowerCase().indexOf('offer') != -1) {
							switchit = "Offer, Adventure +";
						}
					}
				}

				if (switchit) {
					var done = false;
					var inner = attachment.querySelector('._2-s');
					if (!inner) {
						inner = attachment.querySelector('._51z7');
						if (!inner) {
							// page timelines use ".attachmentName" and are wacky, there are actually two copies of the <div> that show/hide
							$$(attachment, '.attachmentName', function(inner) {
								k._changeComposerAttachment_inner(inner, switchit);
								done = true;
							});

							if (!done) {
								inner = attachment;
							}
						}
					}

					if (!done) {
						k._changeComposerAttachment_inner(inner, switchit);
					}
				}

				attachment.setAttribute('data-ponyhoof-ponified', 1);
			});
		};

		k._changeComposerAttachment_inner = function(inner, switchit) {
			var stopit = false;
			loopChildText(inner, function(child) {
				if (stopit) {
					return;
				}
				if (child.nodeType == 3) {
					child.textContent = switchit;
					stopit = true;
				}
			});
		};

		k._changeComposer_changeText = function(form, composer, pageid, attribute) {
			attribute = attribute || 'value';
			var malay = false;
			var lang = CURRENTLANG;
			if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].malay) {
				malay = true;
				lang = LANG['ms_MY'];
			}

			// we can't guarantee the button anymore, so we have to do this expensive JS :(
			// group composers are funky and teleport the textbox to a new <div> onclick
			$$(form, k.composerButtonSelectors, function(submit) {
				// Tricky case here
				// On group composers, the text box for normal post/add file don't sync with questions
				if (submit.form) {
					var action = submit.form.getAttribute('action');
					if (hasClass(composer, k.composerComposerQuestion)) {
						// Triggered by questions composer
						if (action === '/ajax/questions/save.php') {
							// We are inside the questions composer itself, continue
						} else {
							return;
						}
					} else {
						// We are not the questions composer
						if (action === '/ajax/questions/save.php') {
							// Don't affect the question composer
							return;
						}
					}
				}

				// Skip page schedule
				if (composer.form.elements['scheduled']) {
					if (composer.form.elements['scheduled'].value == 1) {
						return;
					}
				}

				// Store the original button text
				var id = composer.getAttribute('id'); // ideally, should be composer.form.elements['xhpc_composerid']
				if (!k.composerOriginalButtonText[id]) {
					k.composerOriginalButtonText[id] = k.getButtonText(submit);
				}

				var value = composer[attribute];
				if (!k.composerExclude.test(value) && k.composerPonies.test(value)) {
					if (value.toUpperCase() === value) {
						k.changeButtonText(submit, lang.fb_composer_ponies_caps);
					} else {
						k.changeButtonText(submit, lang.fb_composer_ponies);
					}
				} else if (malay) {
					k.changeButtonText(submit, "Kirim");
				} else {
					var submitParent = submit;
					if (submit.tagName.toUpperCase() !== 'BUTTON') {
						submitParent = submit.parentNode;
					}
					var buttonText = k.composerOriginalButtonText[id];
					if (buttonText) {
						k.changeButtonText(submit, buttonText);
					}
				}
			});
		};

		k._changeComposer_insertReadmeOnFocus = function(details) {
			details.composer.addEventListener('focus', function() {
				k._changeComposer_insertReadmeNow(details);
			}, false);

			// Just re-enabled HTML detection
			if (hasClass(details.form, 'child_was_focused')) {
				k._changeComposer_insertReadmeNow(details);
			}
		};

		k._changeComposer_insertReadmeNow = function(details) {
			var form = details.form;
			var composer = details.composer;
			var inputContainer = details.inputContainer;

			if (inputContainer) {
				k._changeComposer_insertReadme(inputContainer.nextSibling);
				return;
			}

			// pages have ComposerX and teleports the textbox here and there
			$$(form, '._2yg', function(composer) {
				// exclude inactives
				if (!composer.parentNode || hasClass(composer.parentNode, 'hidden_elem')) {
					return;
				}

				// Don't insert the readme if it is already there
				var readme = composer.getElementsByClassName('ponyhoof_page_readme');
				if (readme.length) {
					return;
				}

				// status: before taggersPlaceholder
				// photos: after uploader
				// fallback: before bottom bar
				var insertBefore = composer.querySelector('._3-6');
				if (!insertBefore) {
					insertBefore = composer.querySelector('._93');
					if (insertBefore) {
						insertBefore = insertBefore.nextSibling;
					}
				}
				if (!insertBefore) {
					insertBefore = composer.querySelector('._1dsp');
				}
				// abort if no good insertion
				if (!insertBefore) {
					return;
				}

				k._changeComposer_insertReadme(insertBefore);
			});
		};

		k._changeComposer_insertReadme = function(insertBefore) {
			var n = d.createElement('iframe');
			n.className = 'showOnceInteracted ponyhoof_page_readme _4-';
			n.scrolling = 'auto';
			n.frameborder = '0';
			n.allowtransparency = 'true';
			n.src = PONYHOOF_README+'&ref=composer';
			insertBefore.parentNode.insertBefore(n, insertBefore);
		};

		k._changeComposer_fixGroup = function(target) {
			if (hasClass(target.parentNode, '_55d0')) {
				var pageid = target.querySelector('input[name="xhpc_targetid"]');
				if (!pageid) {
					return;
				}
				pageid = pageid.value;

				// domChangeTextbox will not work as these <textarea>s already has "data-ponyhoof-ponified"
				var composer = target.querySelector(k.composerSelectors);
				if (!composer) {
					return;
				}

				$$(target, k.composerButtonSelectors, function(submit) {
					var malay = false;
					var lang = CURRENTLANG;
					if (k.composerSpecialPages[pageid] && k.composerSpecialPages[pageid].malay) {
						malay = true;
						lang = LANG['ms_MY'];
					}

					if (!k.composerExclude.test(composer.value) && k.composerPonies.test(composer.value)) {
						if (composer.value.toUpperCase() == composer.value) {
							k.changeButtonText(submit, lang.fb_composer_ponies_caps);
						} else {
							k.changeButtonText(submit, lang.fb_composer_ponies);
						}
					} else if (malay) {
						k.changeButtonText(submit, "Kirim");
					}
				});
			}
		};

		k._changeComposer_initSpecialPages = function() {
			k.composerSpecialPages = {
				'140792002656140': {composer: LANG['ms_MY'].fb_composer_lessons, malay:true}
				,'346855322017980': {composer: LANG['ms_MY'].fb_composer_lessons, malay:true}
				,'366748370110998': {composer: LANG['ms_MY'].fb_composer_lessons, malay:true}
				,'146225765511748': {composer: CURRENTLANG['fb_composer_coolstory']}
				,'496282487062916': {composer: CURRENTLANG['fb_composer_coolstory']}
			};
		};

		k.tooltip = function(outer) {
			var ok = false;
			domReplaceFunc(outer, '', '.tooltipContent', function(ele) {
				// <div class="tooltipContent"><div class="tooltipText"><span>Hide</span></div></div>
				// <div class="tooltipContent"><div>Ponyhoof brohoofs this.</div></div>
				// <div class="tooltipContent">xy</div>
				// <div class="tooltipContent"><div><div class="-cx-PRIVATE-HubbleTargetingImage__tooltipcontent" data-reactid=""><div data-reactid=""><b data-reactid="">Shared with:</b><br data-reactid=""><span data-reactid="">Public</span></div></div></div></div>

				// <div class="uiContextualLayerPositioner uiLayer" style="width: 294px; left: 877px; top: 1299px;" data-ownerid="js_14"><div class="uiContextualLayer uiContextualLayerAboveLeft" style="bottom: 0px;"><div class="uiTooltipX"><div class="tooltipContent"><div class="tooltipText"><span>Excellent</span></div></div><i class="arrow"></i></div></div></div>
				var target = null;
				var io = ele.getElementsByClassName('tooltipText');
				if (io.length) {
					target = io[0];
				} else {
					target = ele;
				}
				var potentialLabel = target.querySelector('._5bqd, ._5j1i');
				if (potentialLabel) {
					target = potentialLabel;
				}
				if (target.childNodes && target.childNodes.length && target.childNodes[0] && target.childNodes[0].tagName && target.childNodes[0].tagName.toUpperCase() === 'DIV') {
					target = target.childNodes[0];
				}
				if (target.childNodes && target.childNodes.length && target.childNodes[0] && target.childNodes[0].tagName && target.childNodes[0].tagName.toUpperCase() === 'DIV') { // div soup on insights
					target = target.childNodes[0];
				}
				if (target.childNodes && target.childNodes.length && target.childNodes[0] && target.childNodes[0].tagName && target.childNodes[0].tagName.toUpperCase() === 'DIV') { // div soup on boost post
					target = target.childNodes[0];
				}
				if (target.childNodes && target.childNodes.length && target.childNodes[0] && target.childNodes[0].tagName && target.childNodes[0].tagName.toUpperCase() === 'SPAN') {
					target = target.childNodes[0];
				}
				
				// Get the tooltip outer layer
				var layer = k._tooltipGetLayer(ele);
				if (!layer) {
					return;
				}

				// Replace text
				var orig = target.innerHTML;
				var origText = target.textContent;
				var t = orig;
				t = replaceText(tooltipTitles, t);
				if (orig != t) {
					target.innerHTML = t;

					if (USINGMUTATION) {
						// Replace text at the parent that we are *really* certain
						if (orig === origText) {
							var owner = $(layer.getAttribute('data-ownerid'));
							if (owner) {
								owner.setAttribute('aria-label', t);
							}
						}

						// fix horizontal scrollbar
						if (hasClass(layer.parentNode, 'fbPhotoSnowliftContainer')) {
							addClass(layer, 'ponyhoof_tooltip_widthFix');
						} else {
							removeClass(layer, 'ponyhoof_tooltip_widthFix');
						}

						k.updateLayerPosition(layer);
					}
				}

				if (!ok && hasClass(outer, 'uiLayer')) {
					ok = true;
				}
			});
			return ok;
		};

		k._tooltipGetLayer = function(ele) {
			// <div class="uiContextualLayerPositioner uiLayer" id="js_4" style="width: 862px; left: 309px; top: 1914px;" data-ownerid=""><div class="uiContextualLayer uiContextualLayerAboveCenter" style="bottom: 0px;"><div class="uiTooltipX"><div class="tooltipContent"><div>Loading...</div></div><i class="arrow"></i></div></div></div>
			if (!ele.parentNode || !ele.parentNode.parentNode || !ele.parentNode.parentNode.parentNode) {
				return false;
			}
			var layer = ele.parentNode.parentNode.parentNode;
			if (!hasClass(layer, 'uiContextualLayerPositioner')) {
				return false;
			}
			return layer;
		};

		k._fbDockChatBuddylistNub_firstLoadingDone = false;
		k.fbDockChatBuddylistNub = function(target) {
			if (hasClass(target, 'label') && target.parentNode && target.parentNode.parentNode && target.parentNode.parentNode.getAttribute && target.parentNode.parentNode.getAttribute('id') === 'fbDockChatBuddylistNub') {
				k._fbDockChatBuddylistNub_change(target);
				return true;
			}

			if (!k._fbDockChatBuddylistNub_firstLoadingDone) {
				var nub = target.querySelector('#fbDockChatBuddylistNub .label');
				if (nub) {
					k._fbDockChatBuddylistNub_change(nub);
					k._fbDockChatBuddylistNub_firstLoadingDone = true;
				}
			}
			return false;
		};

		k._fbDockChatBuddylistNub_change = function(target) {
			if (target.childNodes && target.childNodes.length && target.childNodes[0] && target.childNodes[0].nodeType === TEXT_NODE) {
				var replaced = target.childNodes[0].textContent.replace(/Chat/, "Whinny");
				if (target.childNodes[0].textContent !== replaced) {
					addClass(target, 'ponyhoof_chatLabel_ponified');
					target.childNodes[0].textContent = replaced;
				}
			}
		};

		k.pokesDashboard = function(target) {
			if (target.getAttribute) {
				var id = target.getAttribute('id');
				if (id && id !== 'poke_reminders_dialog' && id.indexOf('poke_') === 0) {
					k._pokesDashboard_item(target);
					return true;
				}
			}

			//$$(target, '.pokesDashboard > .objectListItem', k._pokesDashboard_item);
			//$$(target, '.objectListItem[id^="poke_"], ._4-u2[id^="poke_"], .-cx-PRIVATE-xuiCard__root[id^="poke_"]', k._pokesDashboard_item);
			//$$(target, '._4-u2[id^="poke_"], .-cx-PRIVATE-xuiCard__root[id^="poke_"], .objectListItem[id^="poke_"], ._5lbv, .-cx-PRIVATE-pokesDashboard__pokercontent', k._pokesDashboard_item);
			$$(target, '._4-u2', function(root) {
				var id = root.getAttribute('id');
				if (id && id.indexOf('poke_') === 0) {
					k._pokesDashboard_item(root);
				} else if (root.querySelector('._5lbt')) {
					k._pokesDashboard_suggested(root);
				}
			});

			/*if (hasClass(target, 'highlight')) {
				var t = target.textContent;
				t = t.replace(/You poked /, 'You nuzzled ');
				if (target.textContent != t) {
					target.textContent = t;
				}
				return true;
			}*/

			k._pokesDashboard_pokeLink(target);

			return false;
		};

		k._pokesDashboard_item = function(item) {
			//var header = item.getElementsByClassName('pokeHeader');
			//if (!header || !header.length) {
			//	return;
			//}
			//header = header[0];

			var header = item.querySelector('._5lbt');
			if (header && header.childNodes && header.childNodes.length) {
				if (header.childNodes[1] && header.childNodes[1].nodeType === TEXT_NODE) {
					var poke = header.childNodes[1];
					var orig = poke.textContent;
					var t = orig.replace(/ poked you\./, ' nuzzled you.');
					t = t.replace(/ poked you\!/, ' nuzzled you!');
					t = t.replace(/ poked you back\!$/, ' nuzzled you back!');
					t = t.replace(/ poked you ([0-9]+?) times in a row\!$/, ' nuzzled you $1 times in a row!');
					if (orig !== t) {
						poke.textContent = t;
					}
				}
			} /*else {
				var header = item.querySelector('.uiProfileBlockContent > ._6a > ._6b > .fwb'); // .-cx-PRIVATE-uiInlineBlock__root > .-cx-PRIVATE-uiInlineBlock__middle
				if (header) {
					var t = header.innerHTML;
					t = t.replace(/ poked you\./, ' nuzzled you.');
					if (header.innerHTML != t) {
						header.innerHTML = t;
					}

					k._pokesDashboard_pokeLink(item);
				}
			}*/
		};

		k._pokesDashboard_suggested = function(item) {
			var header = item.querySelector('._5lbt');
			if (header && header.childNodes && header.childNodes.length) {
				if (header.parentNode && header.parentNode.previousSibling && header.parentNode.previousSibling.nodeType === ELEMENT_NODE) {
					var suggested = header.parentNode.previousSibling;
					if (hasClass(suggested, 'rfloat')) {
						if (suggested.textContent === "Suggested Poke") {
							suggested.textContent = "Suggested Nuzzle";
						}
					}
				}
				/*if (header.childNodes[4] && header.childNodes[4].nodeType === ELEMENT_NODE) {
					var poke = header.childNodes[4];
					if (poke.textContent === "Suggested Poke") {
						poke.textContent = "Suggested Nuzzle";
					}
				}*/
			}
		};

		k._pokesDashboard_pokeLink = function(target) {
			// (Sep 25) Skip buttons
			$$(target, 'a[ajaxify^="/pokes/inline/"]:not(._42ft)', function(poke) {
				var text = "Nuzzle";
				/*if (poke.getAttribute('ajaxify').indexOf('pokeback=1') != -1) { // http://fb.com/406911932763192
					text = "Nuzzle Back";
				}*/

				if (poke.childNodes && poke.childNodes.length && poke.childNodes[1]) {
					poke.childNodes[1].textContent = text;
					return;
				}

				var stop = false;
				loopChildText(poke, function(child) {
					if (stop) {
						return;
					}
					if (child.nodeType == TEXT_NODE) {
						child.textContent = text;
						stop = true;
					}
				});
			});
		};

		k.notificationTypeBlacklist = [
			'tagged_with_story'
			,'group_admin_nominate'
		];
		k.notificationTypeStopGap = {
			'group_admin': 'sniff_notification_stopgap_group_admin'
			,'notify_me': 'sniff_notification_stopgap_notify_me'
			,'close_friend_activity': 'sniff_notification_stopgap_close_friend_activity'
		};
		k.notificationTypeReplacedBreak = {
			'notify_me': /posted a scroll/
			,'close_friend_activity': /posted a scroll/
		};
		k.notificationTypeQuoteToColonFilter = [
			'notify_me'
			,'close_friend_activity' // fix es_LA with long statuses (http://fb.com/251010405086314)
		];

		k.notification = function(dom) {
			domReplaceFunc(dom.target, 'notification', '.notification', function(ele) {
				k._notification_change(ele, '.info', k._notification_general_metadata);
			});
		};

		k.notification_itemClass = ['_33c', '-cx-PRIVATE-fbNotificationJewelItem__item'];
		k.notification_textClass = ['_4l_v', '-cx-PRIVATE-fbNotificationJewelItem__text'];
		k.notification_metadataClass = ['_33f', '-cx-PRIVATE-fbNotificationJewelItem__metadata'];
		k._notification_react = function(ele) {
			//for (var i = 0; i <= 1; i += 1) {
			var i = 0;
				if (hasClass(ele, k.notification_itemClass[i])) {
					k._notification_change(ele, '.'+k.notification_textClass[i]+' > span', k._notification_react_metadata);
					return true;
				}
			//}
			return false;
		};

		k._notification_general_metadata = function(node) {
			if (hasClass(node, 'metadata') || hasClass(node, 'blueName')) {
				return false;
			}
			if (node.nodeType === ELEMENT_NODE) {
				if (node.getAttribute('data-hovercard')) {
					return false;
				}
				if (hasClass(node, 'uiLinkSubtle')) {
					return false;
				}
			}
			return true;
		};

		k._notification_react_metadata = function(node) {
			if (hasClass(node, 'fwb')) {
				return false;
			}
			if (hasClass(node, k.notification_metadataClass[0])) {
				return false;
			}
			return true;
		};

		k._notification_change = function(ele, info, metadataFunc) {
			info = ele.querySelector(info);
			if (!info) {
				return;
			}
			if (!info.childNodes || !info.childNodes.length) {
				return;
			}

			var stopgap = null;
			var gt = ele.getAttribute('data-gt');
			if (gt) {
				try {
					gt = JSON.parse(gt);
					if (gt && k.notificationTypeBlacklist.indexOf(gt.notif_type) !== -1) {
						return;
					}

					if (k.notificationTypeStopGap[gt.notif_type]) {
						stopgap = LANG[UILANG][k.notificationTypeStopGap[gt.notif_type]];
						if (!stopgap) {
							stopgap = LANG['en_US'][k.notificationTypeStopGap[gt.notif_type]];
							if (!stopgap) {
								stopgap = null;
							}
						}
					}
				} catch (e) {}
			}

			for (var i = 0, len = info.childNodes.length; i < len; i += 1) {
				var node = info.childNodes[i];
				if (!metadataFunc(node)) {
					continue;
				}

				var text = node.textContent;
				if (text === '. ' || text === '\'s ' || text === ' ' || text === ', ') {
					continue;
				}

				if (gt && gt.notif_type) {
					if (k.notificationTypeReplacedBreak[gt.notif_type]) {
						if (k.notificationTypeReplacedBreak[gt.notif_type].test(text)) {
							// Already ponified
							break;
						}
					}
				}

				var finalText;
				var indexOfQuote = text.indexOf('"');
				var indexOfStopgap = -1;
				if (k.notificationTypeQuoteToColonFilter.indexOf(gt.notif_type) !== -1) {
					indexOfQuote = text.indexOf(': ');
				}

				if (indexOfQuote !== -1) {
					finalText = k.textNotification(text.substring(0, indexOfQuote));
					finalText += text.substring(indexOfQuote, text.length);
				} else {
					indexOfStopgap = text.indexOf(stopgap);
					if (stopgap && indexOfStopgap !== -1) {
						finalText = k.textNotification(text.substring(0, indexOfStopgap + stopgap.length));
						finalText += text.substring(indexOfStopgap + stopgap.length, text.length);
					} else {
						finalText = k.textNotification(text);
					}
				}

				if (node.textContent != finalText) {
					node.textContent = finalText;
				}

				if (indexOfQuote !== -1 || indexOfStopgap !== -1) {
					break;
				}
			}
		};

		k.menuPrivacyOnlyAjaxify = [
			// when posting
			'%22value%22%3A%2280%22' // Public
			,'%22value%22%3A80'
			,'%22value%22%3A%2250%22' // Friends of Friends
			,'%22value%22%3A50'
			,'%22value%22%3A%2240%22' // Friends
			,'%22value%22%3A40'
			,'%22value%22%3A%22127%22' // Friends except Acquaintances
			,'%22value%22%3A127'
			,'%22value%22%3A%2210%22' // Only Me
			,'%22value%22%3A10'
		];
		k._processMenuXOldWidthDiff = 0;
		k.menuItems = function(dom) {
			var processMenuX = false;
			var hasScrollableArea = false;
			k._processMenuXOldWidthDiff = 0;
			domReplaceFunc(dom.target, 'uiMenuItem', '.uiMenuItem, ._54ni, .ufb-menu-item', function(ele) {
				if (hasClass(ele, 'ponyhoof_fbmenuitem')) {
					return;
				}
				addClass(ele, 'ponyhoof_fbmenuitem');

				// pages on share dialog
				if (hasClass(ele, '_90z')) {
					return;
				}

				// lists/groups on Invite Friends dialogs
				var listendpoint = ele.getAttribute('data-listendpoint');
				if (listendpoint && listendpoint != '/ajax/chooser/list/friends/all/' && listendpoint.indexOf('/ajax/chooser/list/friends/') == 0 && listendpoint.indexOf('/ajax/chooser/list/friends/suggest/?filter=all') == -1 && listendpoint.indexOf('/ajax/chooser/list/friends/app_all_friends/') == -1 && listendpoint.indexOf('/ajax/chooser/list/friends/app_non_user/') == -1) {
					return;
				}

				var replacer = menuTitles;
				if (hasClass(ele, 'fbPrivacyAudienceSelectorOption')) {
					replacer = menuPrivacyOnlyTitles;

					// ensure that only FB-provided options get changed
					var itemAnchor = ele.getElementsByClassName('itemAnchor');
					if (itemAnchor.length) {
						var ajaxify = itemAnchor[0].getAttribute('ajaxify');
						// Sometimes ajaxify is missing (legacy edit video)
						if (ajaxify) {
							var _menuPrivacyOnlyOk = false;
							for (var i = 0, len = k.menuPrivacyOnlyAjaxify.length; i < len; i += 1) {
								if (ajaxify.indexOf(k.menuPrivacyOnlyAjaxify[i]) != -1) {
									_menuPrivacyOnlyOk = true;
									break;
								}
							}
							if (!_menuPrivacyOnlyOk) {
								return;
							}
						}
					}
				}

				var label = ele.querySelector('.itemLabel, ._54nh, .ufb-menu-item-label');
				if (label) {
					//if (label.childNodes.length == 1) {
					// timeline post has 2
					var io = label.getElementsByTagName('span');
					if (io.length) {
						if (!hasClass(io[0], 'hidden_elem')) {
							label = io[0];
						}
					}

					var orig = '';
					var replaced = '';
					var oldLabelWidth = 0;
					ele.setAttribute('data-ponyhoof-menuitem-orig', ele.textContent);
					loopChildText(label, function(child) {
						if (child.nodeType == 3) {
							var t = child.textContent;
							orig += t + ' ';
							t = replaceText(replacer, t);
							if (child.textContent != t) {
								if (!hasScrollableArea && (ele.parentNode && ele.parentNode.parentNode && hasClass(ele.parentNode.parentNode, 'uiScrollableAreaContent'))) {
									hasScrollableArea = true;
								}
								if (hasScrollableArea) {
									label.style.display = 'inline-block';
									if (!oldLabelWidth) {
										oldLabelWidth = label.offsetWidth;
									}
								}
								child.textContent = t;
							}
							replaced += t+' ';
						}
					});

					orig = orig.substr(0, orig.length-1);
					replaced = replaced.substr(0, replaced.length-1);
					ele.setAttribute('data-ponyhoof-menuitem-text', replaced);
					if (hasClass(ele, 'uiMenuItem')) {
						ele.setAttribute('data-label', replaced);
					}

					if (orig != replaced) {
						if (hasClass(ele, '_54ni')) {
							if (hasScrollableArea && oldLabelWidth) {
								var newWidth = label.offsetWidth;
								if (newWidth > oldLabelWidth) {
									k._processMenuXOldWidthDiff = Math.max(newWidth - oldLabelWidth, 0);
									processMenuX = true;
								}
							} else {
								processMenuX = true;
							}
						}
					}
					if (hasScrollableArea) {
						label.style.display = '';
					}
				}
			});

			if (processMenuX) {
				if (hasClass(dom.target, 'uiContextualLayerPositioner')) {
					k._menuItems_processMenuX(dom.target);
					return;
				}

				k.getParent(dom.target, function(parent) {
					return hasClass(parent, 'uiContextualLayerPositioner');
				}, k._menuItems_processMenuX);
			}
		};
		k._menuItems_processMenuX = function(layer) {
			if (!layer) {
				return;
			}

			var ownerid = layer.getAttribute('data-ownerid');
			if (!ownerid) {
				return;
			}
			ownerid = $(ownerid);
			if (!ownerid) {
				return;
			}
			
			var menu = layer.querySelector('._54nq');
			if (!menu) {
				return;
			}

			if (k._processMenuXOldWidthDiff) {
				var uiScrollableArea = layer.getElementsByClassName('uiScrollableArea');
				var uiScrollableAreaBody = layer.getElementsByClassName('uiScrollableAreaBody');
				if (uiScrollableArea && uiScrollableAreaBody) {
					uiScrollableArea = uiScrollableArea[0];
					uiScrollableAreaBody = uiScrollableAreaBody[0];

					uiScrollableArea.style.width = (parseInt(uiScrollableArea.style.width)+k._processMenuXOldWidthDiff)+'px';
					uiScrollableAreaBody.style.width = (parseInt(uiScrollableAreaBody.style.width)+k._processMenuXOldWidthDiff)+'px';
				}
			}

			var border = layer.querySelector('._54hx');
			if (!border) {
				return;
			}
			border.style.width = (Math.max((menu.offsetWidth - ownerid.offsetWidth), 0))+'px';
		};

		k.fbRemindersStory = function(target) {
			$$(target, '.fbRemindersStory', function(item) {
				var reminderType = '';
				if (item.querySelector('#pages_reminders_link')) {
					reminderType = 'page';
				}

				var inner = item.querySelector('._42ef > ._50f8');
				if (!inner) {
					return;
				}

				loopChildText(inner, function(child) {
					if (child.nodeType === TEXT_NODE) {
						var t = child.textContent;
						if (reminderType === 'page') {
							t = t.replace(/\binvited you to like\b/, "invite you to "+CURRENTSTACK['like']);
						} else {
							t = t.replace(/\bpoked you\b/, "nuzzled you");
						}
						if (child.textContent !== t) {
							child.textContent = t;
						}
					} else {
						if (hasClass(child, 'fbRemindersTitle')) {
							var t = child.innerHTML;
							t = t.replace(/([0-9]+?) events/, "$1 adventures");
							if (child.innerHTML !== t) {
								child.innerHTML = t;
							}
						}
					}
				});
			});
		};

		k.flyoutLikeForm = function(target) {
			//var result = k._flyoutLikeForm(target, 'groupsMemberFlyoutLikeForm', 'unlike');
			var result = k._flyoutLikeForm(target, '_5nx0', 'unlike');
			if (!result) {
				result = k._flyoutLikeForm(target, 'fbEventMemberLike', 'liked');
			}
			return result;
		};

		k._flyoutLikeForm = function(target, className, forminput) {
			domReplaceFunc(target, className, '.'+className, function(ele) {
				if (!ele.elements[forminput]) {
					return;
				}

				var isLike = true;
				if (ele.elements[forminput].value == 1) {
					isLike = false;
				}

				var submit = ele.querySelector('input[type="submit"]');
				if (!submit) {
					return;
				}
				if (isLike) {
					submit.value = capitaliseFirstLetter(CURRENTSTACK['like']);
				} else {
					submit.value = capitaliseFirstLetter(CURRENTSTACK['unlike']);
				}
			});

			if (hasClass(target, className)) {
				return true;
			}
			return false;
		};

		k.pluginButton = function(target) {
			if (!ONPLUGINPAGE) {
				return;
			}

			var root = target.getElementsByClassName('pluginConnectButtonLayoutRoot');
			if (!root.length) {
				root = target.getElementsByClassName('pluginSkinLight');
				if (!root.length) {
					return;
				}
			}
			root = root[0];

			domReplaceFunc(root, '', '.pluginButton', function(ele) {
				// oct 19
				var div = ele.getElementsByClassName('pluginButtonLabel');
				if (div.length) {
					div = div[0];
					var text = div.innerHTML;
					if (text === "Like" || text === "&lt;3") {
						div.innerHTML = capitaliseFirstLetter(CURRENTSTACK['like']);
						return;
					}
				}

				// old style
				div = ele.getElementsByTagName('div');
				if (div.length) {
					ele = div[0];
				}

				// <div class="pluginButton pluginButtonInline pluginConnectButtonDisconnected hidden_elem" title="Like"><div><button type="submit"><i class="pluginButtonIcon img sp_like sx_like_thumb"></i><span class="accessible_elem">Like</span></button><span aria-hidden="true">Like</span></div></div>
				var stop = false;
				loopChildText(ele, function(child) {
					if (stop) {
						return;
					}
					if (child.tagName.toUpperCase() === 'SPAN') {
						var text = child.innerHTML;
						if (text === "Like" || text === "&lt;3") {
							child.innerHTML = capitaliseFirstLetter(CURRENTSTACK['like']);
							stop = true;
						}
					}
				});
			});

			domReplaceFunc(root, '', '.uiIconText', function(ele) {
				// <div style="padding-left: 19px;" class="uiIconText"><i class="img sp_like sx_like_fav" style="top: 0px;"></i><span id="u_0_1">You, <a href="https://www.facebook.com/XXX" target="_blank">XXX</a> and 102,502 others like this.</span><span class="hidden_elem" id="u_0_2"><a href="https://www.facebook.com/XXX" target="_blank">XXX</a> and 102,502 others like this.</span></div>
				loopChildText(ele, function(child) {
					loopChildText(child, function(inner) {
						if (inner.nodeType === TEXT_NODE) {
							var t = k.likeSentence(inner.textContent);
							t = t.replace(/\bfriends\b/g, CURRENTSTACK['friends_logic']); // Be the first of your friends.
							if (inner.textContent != t) {
								inner.textContent = t;
							}
						}
					});
				});
			});

			// likebox
			$$(root, '._51mx > .pls > div > span', function(ele) {
				var orig = ele.textContent;
				var t = k.likeSentence(orig);
				t = t.replace(/\bfriends\b/g, CURRENTSTACK['friends_logic']); // Be the first of your friends.
				if (orig != t) {
					ele.textContent = t;
				}
			});
		};

		k.pluginCommentBox = function(target) {
			if (!ONPLUGINPAGE) {
				return;
			}

			domChangeTextbox(target, '.fbFeedbackContent .fbFeedbackMentions .mentionsTextarea, .mainCommentForm > .textwrapper > .uiTextareaNoResize', CURRENTLANG['fb_comment_box']);

			$$(target, '.fbUpDownVoteAfterLoginOption > .uiLinkButtonInput', function(ele) {
				if (ele.getAttribute('onclick') === 'MultiLoginPopup.setProvider(\'facebook\');') {
					ele.value = capitaliseFirstLetter(CURRENTSTACK['like']);
				}
			});
		};

		k.ticker = function(dom) {
			domReplaceFunc(dom.target, 'fbFeedTickerStory', '.fbFeedTickerStory', function(story) {
				var message = story.getElementsByClassName('tickerFeedMessage');
				if (message.length) {
					k._ticker_tickerFeedMessage(story, message[0]);
				} else {
					message = story.getElementsByClassName('uiStreamMessage');
					if (message.length) {
						k._ticker_legacy(story, message[0]);
					}
				}
			});
			if (hasClass(dom.target, 'fbFeedTickerStory')) {
				return true;
			}
			return false;
		};

		k._ticker_tickerFeedMessage = function(story, message) {
			// <div class="tickerFeedMessage fwn"><span class="fwb">Friend</span> commented on your post in group people test: "pffft"</div>

			var ajaxify = story.getAttribute('data-ajaxify');
			if (!ajaxify) {
				return;
			}

			if (ajaxify.match(/EntStatusCreationStory|EntStreamPublishCreationStory|EntPhotoUploadBatchNodeBasedEdgeStory|EntComposerPhotoCreationStory|EntVideoCreationStory|EntGroupMallPostCreationStory/)) {
				return;
			}

			if (message.childNodes && message.childNodes.length && message.childNodes[1]) {
				var orig = message.childNodes[1].textContent;
				var text = orig;

				if (ajaxify.match(/EntLikeEdgeStory|EntFanPageEdgeStory/)) {
					text = text.replace(/^ likes /, ' '+CURRENTSTACK['likes']+' ');
				}
				if (ajaxify.indexOf('EntAddFriendEdgeStory') != -1) {
					text = text.replace(/ are now friends\.$/, ' are now '+CURRENTSTACK['friends']+'.');
				}
				if (ajaxify.indexOf('EntProfilePictureEdgeStory') != -1) {
					text = text.replace(/ profile picture\.$/, ' journal pony pic.');
				}
				if (ajaxify.indexOf('EntCoverPhotoEdgeStory') != -1) {
					text = text.replace(/ cover photo\.$/, ' cover pony pic.');
				}
				if (ajaxify.indexOf('EntQuestionOptionEdgeStory') != -1) {
					text = text.replace(/ question\.$/, ' query.');
				}

				text = text.replace(/'s photo\.$/, '\'s pony pic.');
				text = text.replace(/'s photo: "/, '\'s pony pic: "');

				if (text != orig) {
					message.childNodes[1].textContent = text;
				}
			}
		};

		k._ticker_legacy = function(story, message) {
			// Ticker messages are really inconsistent
			// <span class="passiveName">Friend</span>  brohoofs <span class="token">Page</span>'s <span class="token">photo</span>.
			// <span class="passiveName">Friend</span> added a new pony pic.
			// <span class="passiveName">Friend</span>  brohoofs <span class="token">Page</span>'s <span class="token">video</span> Title. // http://fb.com/10200537039965966
			var continueTextNodes = true;
			for (var i = 0, len = message.childNodes.length; i < len; i += 1) {
				var node = message.childNodes[i];
				if (node.nodeType === TEXT_NODE) {
					if (!continueTextNodes) {
						continue;
					}

					var t = node.textContent;

					var boundary = '';
					var haltOnBoundary = false;
					if (t.indexOf('"') != -1) {
						boundary = '"';
						haltOnBoundary = true;
					} else if (t.indexOf('\'s') != -1) {
						boundary = '\'s';
						continueTextNodes = false;
					}

					var finalText = '';
					if (boundary) {
						finalText = k.textNotification(t.substring(0, t.indexOf(boundary)));
						finalText += t.substring(t.indexOf(boundary), t.length);
					} else {
						finalText = k.textNotification(t);
					}
					//t = t.replace(/\blikes\b/, " "+CURRENTSTACK['likes_past']);
					//t = t.replace(/\blike\b/, " "+CURRENTSTACK['like_past']);
					if (node.textContent != finalText) {
						node.textContent = finalText;
					}

					if (boundary && haltOnBoundary) {
						break;
					}
				} else {
					// It's too risky changing legit page names, so we are doing this in isolated cases
					if (hasClass(node, 'token')) {
						var list = [
							['photo', 'pony pic']
							,['a photo', 'a pony pic']
							,['wall', 'journal']
						];
						var t = replaceText(list, node.textContent);
						if (node.textContent != t) {
							node.textContent = t;
						}
					}
				}
			}
		};

		k.pagesVoiceBarText = function(target) {
			var origTarget = target;
			if (target === d.body) {
				var temp = target.getElementsByClassName('pagesVoiceBarText');
				if (!temp.length) {
					return false;
				}
				target = temp[0];
			} else if (!hasClass(target, 'pagesVoiceBarText')) {
				return false;
			}

			if (target.childNodes && target.childNodes.length && target.childNodes[0]) {
				var textNode = target.childNodes[0];
				if (textNode.nodeType === TEXT_NODE) {
					var orig = textNode.textContent;
					var t = orig;
					t = t.replace(/\bliking\b/, CURRENTSTACK['liking']);
					if (orig !== t) {
						textNode.textContent = t;
					}
				}
				if (origTarget !== d.body) {
					return true;
				}
			}
			return false;
		};

		k.pubcontentFeedChaining = function(target) {
			if (hasClass(target, '_5j5u')) {
				$$(target, '._5j5w > .content > div > .fcg', function(fcg) {
					var orig = fcg.textContent;
					var t = orig;
					t = t.replace(/\blikes\b/, CURRENTSTACK['likes']);
					t = t.replace(/\blike\b/, CURRENTSTACK['like']);
					if (orig != t) {
						fcg.textContent = t;
					}
				});

				return true;
			}
			return false;
		};

		k._beepNotification_condition_react = function(node, gt) {
			// <span id=""><span class="fwb" id=""><span id="">XYZ</span></span><span id=""> also commented on a </span><span class="fwb" id=""><span id="">photo</span></span><span id=""> in </span><span class="fwb" id=""><span id="">GROUP NAME</span></span><span id="">: "What?"</span></span>
			// <span data-reactid=""><span class="fwb" data-reactid="">NAME</span><span data-reactid=""> commented on your pony pic in </span><span class="fwb" data-reactid="">GROUP NAME</span><span data-reactid="">: "COMMENT"</span></span>

			// **XYZ** posted on **Ponyhoof**'s **timeline**: "XYZ"
			// **profile people test** posted in **group people test**: "like test"
			if (hasClass(node, 'fwb')) {
				if (node.textContent === 'timeline') {
					return true;
				}
				return false;
			}
			return true;
		};

		k._beepNotification_change = function(ele, info, condition) {
			if (!info) {
				return;
			}

			var gt;
			try {
				gt = JSON.parse(ele.getAttribute('data-gt'));
			} catch (e) {}

			ele.setAttribute('data-ponyhoof-beeper-orig', info.textContent);
			if (gt && k.notificationTypeBlacklist.indexOf(gt.notif_type) === -1) {
				var stop = false;
				for (var i = 0, len = info.childNodes.length; i < len; i += 1) {
					var node = info.childNodes[i];
					if (condition(node, gt)) {
						var text = '';
						for (var j = 0, jLen = node.childNodes.length; j < jLen; j += 1) {
							var textNode = node.childNodes[j];
							text = textNode.textContent;

							var quote = '"';
							if (k.notificationTypeQuoteToColonFilter.indexOf(gt.notif_type) !== -1) {
								quote = ': ';
							}

							k._beepNotification_change_text(textNode, text, quote);
							if (text.indexOf(quote) !== -1) {
								stop = true;
								break;
							}
						}
						if (stop) {
							break;
						}
					}
				}
			}
			ele.setAttribute('data-ponyhoof-beeper-message', info.textContent);
			
			if (userSettings.sounds) {
				var file = '';
				if (SOUNDS[userSettings.soundsFile]) {
					file = userSettings.soundsFile;
				}

				if (!file || file === 'AUTO') {
					file = '_sound/defaultNotification';

					var data = convertCodeToData(REALPONY);
					if (data.soundNotif) {
						file = data.soundNotif;
					}
				}

				if (userSettings.soundsNotifTypeBlacklist) {
					// Deal with multiple types such as "group_comment_reply|group_comment"
					var current = userSettings.soundsNotifTypeBlacklist.split('|');
					var moreTypes = [];
					for (var i = 0, len = current.length; i < len; i += 1) {
						if (SOUNDS_NOTIFTYPE[current[i]]) {
							var split = SOUNDS_NOTIFTYPE[current[i]].type.split('|');
							for (var j = 0, jLen = split.length; j < jLen; j += 1) {
								moreTypes.push(split[j]);
							}
						}
					}

					if (moreTypes.indexOf(gt.notif_type) !== -1) {
						return;
					}
				}

				try {
					var finalfile = THEMEURL + file + '.EXT';
					if (gt.notif_type === 'poke' && CURRENTSTACK.stack === 'pony') {
						finalfile = THEMEURL + '_sound/pokeSound.EXT';
					}

					var ps = initPonySound('notif', finalfile);
					ps.wait = 15;
					ps.play();
				} catch (e) {}
			}
		};

		k._beepNotification_change_text = function(node, text, quote) {
			if (!text) {
				return;
			}

			var finalText = '';
			if (text.indexOf(quote) !== -1) {
				finalText = k.textNotification(text.substring(0, text.indexOf(quote)));
				finalText += text.substring(text.indexOf(quote), text.length);
			} else {
				finalText = k.textNotification(text);
			}

			if (text !== finalText) {
				if (node.nodeType === TEXT_NODE) {
					node.textContent = finalText;
				} else {
					node.innerHTML = finalText;
				}
			}
		};

		k.insightsCountryData = [
			["United States of America", "United States of Amareica"]
			,["Malaysia", "Marelaysia"]
			,["Mexico", "Mexicolt"]
			,["New Zealand", "Neigh Zealand"]
			,["Philippines", "Fillypines"]
			,["Singapore", "Singapony"]
			,["Singapore, Singapore", "Singapony"]
		];
		k.insightsCountry = function(target) {
			$$(target, '._5brx ._55jr', function(ele) {
				var orig = ele.textContent;
				var t = orig;
				t = replaceText(k.insightsCountryData, ele.textContent);
				if (orig != t) {
					ele.textContent = t;
				}
			});
		};

		k.timelineMutualLikes = function(target) {
			$$(target, '.fbStreamTimelineFavStory', function(root) {
				$$(root, '.fbStreamTimelineFavInfoContainer', function(ele) {
					var done = false;
					loopChildText(ele, function(child) {
						if (done) {
							return;
						}
						if (child.nodeType == TEXT_NODE) {
							var t = k.textStandard(child.textContent);
							if (child.textContent != t) {
								child.textContent = t;
								done = true;
							}
						}
					});
				});

				$$(root, '.fbStreamTimelineFavFriendContainer > .friendText > .fwn', function(ele) {
					loopChildText(ele, function(child) {
						if (child.nodeType == ELEMENT_NODE) {
							if (!child.href || child.href.indexOf('/browse/users/') == -1) {
								return;
							}
						}
						var t = k.textStandard(child.textContent);
						if (child.textContent != t) {
							child.textContent = t;
						}
					});
				});
			});
		};

		// http://fb.com/406714556116263
		// http://fb.com/411361928984859
		k.videoStageContainer = function(target) {
			if (hasClass(target, 'videoStageContainer')) {
				addClass(k.photos_snowlift, 'ponyhoof_snowlift_video');
			} else if (hasClass(target, 'spotlight')) {
				removeClass(k.photos_snowlift, 'ponyhoof_snowlift_video');
			}
		};

		k.uiStreamShareLikePageBox = function(target) {
			$$(target, '.uiStreamShareLikePageBox .uiPageLikeButton.rfloat + div > .fcg', function(ele) {
				var t = ele.textContent;
				t = t.replace(/likes/g, CURRENTSTACK['likes']);
				t = t.replace(/like/g, CURRENTSTACK['like']);
				if (ele.textContent != t) {
					ele.textContent = t;
				}
			});
		};

		k.fbTimelineUnit = function(target) {
			if (target === d.body) {
				var temp = target.getElementsByClassName('fbTimelineUnit');
				if (!temp.length) {
					return;
				}
				for (var i = 0, len = temp.length; i < len; i += 1) {
					k._fbTimelineUnit_change(temp[i]);
				}
			} else if (hasClass(target, 'fbTimelineUnit')) {
				k._fbTimelineUnit_change(target);
			}
		};

		k._fbTimelineUnit_change = function(target) {
			if (target.childNodes && target.childNodes.length) {
				if (target.childNodes[1] && hasClass(target.childNodes[1], 'pageFriendSummaryContainer')) {
					var headerText = target.childNodes[1].getElementsByClassName('headerText');
					if (!headerText.length) {
						return;
					}
					headerText = headerText[0];

					// Friend(s)
					$$(headerText, '.fwb > a', function(link) {
						var t = link.textContent;
						t = t.replace(/\bFriends\b/, capitaliseFirstLetter(CURRENTSTACK['friends']));
						t = t.replace(/\bFriend\b/, capitaliseFirstLetter(CURRENTSTACK['friend']));
						if (link.textContent != t) {
							link.textContent = t;
						}
					});

					// Like(s) PAGENAME
					$$(headerText, '.fcg', function(fcg) {
						var split = fcg.textContent.split(' ');
						var t = split[0];
						t = t.replace(/\bLikes\b/, capitaliseFirstLetter(CURRENTSTACK['likes']));
						t = t.replace(/\bLike\b/, capitaliseFirstLetter(CURRENTSTACK['like']));
						if (split[0] != t) {
							split[0] = t;
							fcg.textContent = split.join(' ');
						}
					});

					return;
				}

				// Brohoofs section at pages
				var liked_pages_timeline_unit_list = $('liked_pages_timeline_unit_list');
				if (liked_pages_timeline_unit_list) {
					$$(liked_pages_timeline_unit_list, '._42ef .fcg', function(fcg) {
						loopChildText(fcg, function(child) {
							// <a href="/browse/friended_fans_of/?page_id=X" ajaxify="/ajax/browser/dialog/friended_fans_of/?page_id=X" rel="dialog" role="button">4 friends</a>
							// also like this.
							var t = child.textContent;
							t = k.textStandard(t);
							if (child.textContent != t) {
								child.textContent = t;
							}
						});
					});
				}
			}
		};

		// https://www.facebook.com/pages
		k.pageBrowserItem = function(target) {
			// lazy-loaded: <div class="_8qg fsm fwn fcg"><a href="" data-hovercard="/ajax/hovercard/user.php?id="></a> likes this.<div class="_43qm mbs _43q9"><ul class="uiList _4cg3 _509- _4ki"><li class="_43q7">FACEPILE</li></ul></div></div>
			// <a href="" data-hovercard="/ajax/hovercard/user.php?id="></a> and <a href="/browse/friended_fans_of/?page_id=" ajaxify="/ajax/browser/dialog/friended_fans_of/?page_id=" rel="dialog" role="button">8 other friends</a> like this.
			if (hasClass(target, '_8qg') && hasClass(target, 'fcg')) {
				k._pageBrowserItem_item(target);
				return;
			}

			$$(target, '._8qg.fcg', function(item) {
				// <div class="_8qg fsm fwn fcg"><div class="_8qg fsm fwn fcg"><div class="fsm fwn fcg">235,674 likes · 40,634 people talking about this</div></div></div>
				k._pageBrowserItem_item(item);
			});
		};

		k._pageBrowserItem_item = function(item) {
			loopChildText(item, function(child) {
				var href = '';
				if (child.nodeType === ELEMENT_NODE) {
					href = child.getAttribute('href');
				}
				if (child.nodeType === TEXT_NODE || hasClass(child, 'fcg') || (href && href.indexOf('/browse/friended_fans_of/') != -1)) {
					k.textBrohoof(child);
				}
			});
		};

		k.entstreamCollapsedUFISentence = function(target) {
			$$(target, '._5civ > a', function(link) {
				var ajaxify = link.getAttribute('ajaxify');
				if (ajaxify) {
					if (ajaxify.indexOf('/ajax/browser/dialog/likes') === 0) {
						k._entstreamCollapsedUFISentence_change(link);
					} else if (ajaxify.indexOf('/ajax/browser/dialog/group_message_viewers') === 0) {
						if (link.childNodes && link.childNodes.length && link.childNodes[0]) {
							k._likePostBox_changeText(link.childNodes[0]);
						}
					}
				}
			});
		};

		k._entstreamCollapsedUFISentence_change = function(link) {
			var orig = link.textContent;
			var t = orig;
			t = t.replace(/ Likes$/, ' '+capitaliseFirstLetter(CURRENTSTACK['likes']));
			t = t.replace(/ Like$/, ' '+capitaliseFirstLetter(CURRENTSTACK['like']));
			if (t != orig) {
				link.textContent = t;
			}
		};

		k.typeahead_list = function(target) {
			if (
				(target.id && target.id.indexOf('typeahead_list_') === 0) || // status composer and feelings
				//hasClass(target, 'bucketed') // groups
				(target.parentNode && hasClass(target.parentNode, 'uiContextualTypeaheadView'))
			) {
				$$(target, '.page .subtext', function(subtext) {
					if (subtext.childNodes && subtext.childNodes.length && subtext.childNodes[0]) {
						var orig = subtext.childNodes[0].textContent;
						var t = orig;
						t = t.replace(/ likes this/, ' '+CURRENTSTACK['likes']+' this'); // general
						t = t.replace(/ like this/, ' '+CURRENTSTACK['like']+' this');
						t = t.replace(/ likes$/, ' '+CURRENTSTACK['likes']); // feelings
						t = t.replace(/ like$/, ' '+CURRENTSTACK['like']);
						if (t != orig) {
							subtext.childNodes[0].textContent = t;
						}
					}
				});
			}
		};

		k.insightsBar = function(target) {
			$$(target, '.insightsBar, .insightsBarPL, ._51xx, ._5yhg', function(bar) {
				$$(bar, '._mq > .fcb > .phs', function(text) {
					var orig = text.textContent;
					var t = orig;
					t = t.replace(/^([0-9,]+) people saw this post$/, '$1 ' + CURRENTSTACK['people'] + ' saw this post');
					t = t.replace(/^1 person saw this post$/, '1 ' + CURRENTSTACK['person'] + ' saw this post');

					t = t.replace(/^This post was served to ([0-9,]+) people$/, 'This post was served to $1 ' + CURRENTSTACK['people']);
					t = t.replace(/^This post was served to 1 person$/, 'This post was served to 1 ' + CURRENTSTACK['person']);
					if (t != orig) {
						text.textContent = t;
					}
				});
			});
		};

		k.uiAttachmentDetails = function(target) {
			$$(target, '.uiAttachmentDetails', function(node) {
				if (node.childNodes && node.childNodes.length && node.childNodes[0] && node.childNodes[0].nodeType === TEXT_NODE) {
					node = node.childNodes[0];

					var orig = node.textContent;
					var t = orig;
					t = t.replace(/^([0-9,]+) like this$/, '$1 '+CURRENTSTACK['like']+' this');
					t = t.replace(/^One likes this$/, 'One '+CURRENTSTACK['likes']+' this');
					if (t != orig) {
						node.textContent = t;
					}
				}
			});
		};

		k.facebarTypeaheadList = function(target) {
			if (target.childNodes && target.childNodes.length && target.childNodes[0]) {
				if (hasClass(target.childNodes[0], '_21c')) {
					k._facebarTypeaheadList_list(target);
				}
			}
		};

		k._facebarTypeaheadList_list = function(list) {
			$$(list, '._53ab', function(token) {
				var orig = token.textContent;
				var t = orig;
				t = t.replace(/\b([0-9,]+) like this\b/, '$1 '+CURRENTSTACK['like']+' this');
				t = t.replace(/\bOne likes this\b/, 'One '+CURRENTSTACK['likes']+' this');
				if (t != orig) {
					token.textContent = t;
				}
			});
		};

		k._graphSearch_ufi = function(ufi) {
			k.getParent(ufi, function(parent) {
				return hasClass(parent, 'uiContextualLayerPositioner');
			}, function(layer) {
				if (!layer) {
					return;
				}
				var ownerid = layer.getAttribute('data-ownerid');
				if (!ownerid) {
					return;
				}
				var owner = $(ownerid);
				if (!hasClass(owner, '_5ce8')) {
					return;
				}
				if (owner.parentNode && owner.parentNode.parentNode && hasClass(owner.parentNode.parentNode, '_ai5')) {
					addClass(ufi, 'ponyhoof_brohoofed');
				}
			});
		};

		k.ponyhoofReadmeForMessage = function(target) {
			// Only needed for non-MutationObserver
			// For the MutationObserver implementation, see k._dialog_insertReadme()
			if (USINGMUTATION) {
				return;
			}
			if (!hasClass(target, 'uiToken')) {
				return;
			}
			var input = target.querySelector('input[name="undefined[]"]');
			if (!input) {
				return;
			}
			if (!k._ponyhoofReadmeForMessage_inputCondition(input)) {
				return;
			}

			var messageTokenizer = null;
			k.getParent(target, function(parent) {
				if (!messageTokenizer && hasClass(parent, '_22i')) {
					messageTokenizer = parent;
				} else if (hasClass(parent, 'ponyhoof_fbdialog_body')) {
					return true;
				}
			}, function(body) {
				if (messageTokenizer && body) {
					k._ponyhoofReadmeForMessage_change(body);
				}
			});
		};

		k._ponyhoofReadmeForMessage_inputCondition = function(input) {
			// undefined[] is intentional from FB, NOT A TYPO
			return (input.getAttribute('name') === 'undefined[]' && isPonyhoofPage(input.value));
		};

		k._ponyhoofReadmeForMessage_change = function(body) {
			addClass(body, 'ponyhoof_composer_hasReadme');

			var n = d.createElement('iframe');
			n.className = 'ponyhoof_page_readme';
			n.scrolling = 'auto';
			n.frameborder = '0';
			n.allowtransparency = 'true';
			n.src = PONYHOOF_README + '&ref=message';
			body.appendChild(n);
		};

		k._dialog_insertReadme = function(body) {
			var done = false;
			$$(body, '._22i .uiToken > input[type="hidden"]', function(input) {
				if (done) {
					return;
				}
				if (k._ponyhoofReadmeForMessage_inputCondition(input)) {
					k._ponyhoofReadmeForMessage_change(body);
					done = true;
				}
			});
		};

		k._dialog_playSound = function(title, outer) {
			if (!title) {
				return;
			}
			var lowercase = title.toLowerCase();
			for (var i = 0, len = dialogDerpTitles.length; i < len; i += 1) {
				if (dialogDerpTitles[i].toLowerCase() === lowercase) {
					if (outer) {
						addClass(outer, 'ponyhoof_fbdialog_derp');
					}

					if (CURRENTSTACK.stack === 'pony' && userSettings.sounds && !isPageHidden()) {
						var ps = initPonySound('ijustdontknowwhatwentwrong', THEMEURL+'_sound/ijustdontknowwhatwentwrong.EXT');
						ps.wait = 5;
						ps.play();
						break;
					}
				}
			}
		};

		k._dialogNukeDetect = function(orig, dialog) {
			if (!orig) {
				return;
			}
			var lowercase = orig.toLowerCase();
			for (var i = 0, len = dialogNukeTitles.length; i < len; i += 1) {
				if (dialogNukeTitles[i].toLowerCase() === lowercase) {
					addClass(dialog, 'ponyhoof_fbdialog_nuke');
					break;
				}
			}
		};

		k.pageCompetitorLeaderboard = function(target) {
			$$(target, '._28yz .leaderboard ._42ef > ._6a > ._6a:nth-child(2)', function(ele) {
				if (ele.childNodes && ele.childNodes[2] && ele.childNodes[2].nodeType === TEXT_NODE) {
					k.textBrohoof(ele.childNodes[2]);
				}
			});
		};

		k.changeSearchBox = function(target) {
			domChangeTextbox(target, '#q, ._585- ._586f', CURRENTLANG['fb_search_box']);

			$$(target, '._585- ._586j', function(placeholder) {
				addClass(placeholder, 'ponyhoof_searchBox_native');
				placeholder.textContent = CURRENTLANG['fb_search_box'];
			});
		};

		k.changeNotificationReactIfBody = function(target) {
			if (target !== d.body) {
				return;
			}
			domReplaceFunc(target, '', '.' + k.notification_itemClass[0], k._notification_react);
		};

		k.pageInviteTypeaheadView = function(target) {
			var origTarget = target;
			if (target === d.body) {
				var temp = target.getElementsByClassName('_1ss');
				if (!temp.length) {
					return false;
				}
				target = temp[0];
			} else if (!hasClass(target, '_1ss')) {
				return false;
			}

			$$(target, '._1sn ._1sy + span', function(like) {
				if (like.textContent === 'Liked') {
					like.textContent = capitaliseFirstLetter(CURRENTSTACK['liked']);
				}
			});

			if (origTarget === d.body) {
				return false;
			}
			return true;
		};

		k._chatSoundAudioElement_done = false;
		k.chatSoundAudioElement = function(target) {
			if (k._chatSoundAudioElement_done) {
				return false;
			}

			var origTarget = target;
			if (target === d.body) {
				var target = d.querySelector('body > audio');
				if (!target) {
					return false;
				}
			} else {
				if (target.nodeName !== 'AUDIO') {
					return false;
				}
				if (target.parentNode !== d.body) {
					return false;
				}
			}
			
			target.addEventListener('loadstart', function() {
				if (target.src === THEMEURL + userSettings.chatSoundFile + '.ogg' || target.src === THEMEURL + userSettings.chatSoundFile + '.mp3') {
					target.volume = userSettings.chatSoundVolume;
				} else {
					target.volume = 1;
				}
			}, false);
			k._chatSoundAudioElement_done = true;

			if (origTarget === d.body) {
				return false;
			}
			return true;
		};

		k.ponyhoofPageOptions = function(dom) {
			if (!$('pagelet_timeline_page_actions')) {
				return;
			}
			if ($('ponyhoof_footer_options')) {
				return;
			}

			var selector = dom.target.querySelector('#pagelet_timeline_page_actions .fbTimelineActionSelector');
			if (!selector) {
				return;
			}
			var menu = selector.getElementsByClassName('uiMenuInner');
			if (!menu.length) {
				return;
			}
			menu = menu[0];
			var whatpage = menu.querySelector('#fbpage_share_action a');
			if (!whatpage) {
				return;
			}
			var href = whatpage.getAttribute('href');
			if (href && (href.indexOf('/pages/create/?ref_id=' + PONYHOOF_PAGE) !== -1 || href.indexOf('p[]=' + PONYHOOF_PAGE) !== -1)) {
				var button = selector.getElementsByClassName('fbTimelineActionSelectorButton');
				if (!button.length) {
					return;
				}
				button = button[0];

				var sep = d.createElement('li');
				sep.className = 'uiMenuSeparator';

				var a = d.createElement('a');
				a.className = 'itemAnchor';
				a.setAttribute('role', 'menuitem');
				a.setAttribute('tabindex', '0');
				a.href = '#';
				a.id = "ponyhoof_footer_options";
				a.innerHTML = '<span class="itemLabel fsm">'+CURRENTLANG.options_title+'</span>';
				a.addEventListener('click', function(e) {
					optionsOpen();

					try {
						clickLink(button);
					} catch (ex) {}

					e.preventDefault();
				}, false);
				
				var li = d.createElement('li');
				li.className = 'uiMenuItem ponyhoof_fbmenuitem';
				li.setAttribute('data-label', CURRENTLANG['options_title']);
				li.setAttribute('data-ponyhoof-menuitem-orig', CURRENTLANG['options_title']);
				li.setAttribute('data-ponyhoof-menuitem-text', CURRENTLANG['options_title']);
				li.appendChild(a);
				
				menu.insertBefore(sep, menu.firstChild);
				menu.insertBefore(li, sep);
			}
		};

		k.ponyhoofComposer = function(target) {
			// Insert readme when people try to post to the Ponyhoof page, even when Ponyhoof is disabled
			try {
				k.changeComposer_find(target, function(details) {
					if (isPonyhoofPage(details.pageid)) {
						k._changeComposer_insertReadmeOnFocus(details);
					}

					return details.composer.getAttribute('placeholder');
				});
			} catch (e) {}
		};

		k.debug_betaFacebookLinks = function(target) {
			var links = target.querySelectorAll('a[href^="http://www.facebook.com"], a[href^="https://www.facebook.com"]');
			for (var i = 0, len = links.length; i < len; i += 1) {
				var link = links[i];
				var href = link.href;
				href = href.replace(/^http\:\/\/www.facebook.com\//, 'http://beta.facebook.com/');
				href = href.replace(/^https\:\/\/www.facebook.com\//, 'https://beta.facebook.com/');

				link.href = href;
			}
		};

		// Mutation
		k.mutateCharacterData = function(mutation) {
			var iu = INTERNALUPDATE;
			INTERNALUPDATE = true;

			var parent = null;
			if (mutation.target && mutation.target.parentNode) {
				parent = mutation.target.parentNode;
				if (parent.tagName.toUpperCase() === 'ABBR') {
					INTERNALUPDATE = iu;
					return;
				}
			}

			if (userSettings.debug_mutationDebug) {
				try {
					console.log('characterData:');
					if (!ISFIREFOX) {
						console.dir(mutation.target);
					}
				} catch (e) {}
			}

			k.textNodes({target: mutation.target});

			if (!parent) {
				INTERNALUPDATE = iu;
				return;
			}
			var id = parent.getAttribute(k.REACTATTRNAME);
			if (id) {
				if (parent.rel === 'dialog') {
					var ajaxify = parent.getAttribute('ajaxify');
					if (ajaxify && ajaxify.indexOf('/ajax/browser/dialog/likes') === 0) {
						if (parent.parentNode && hasClass(parent.parentNode, '_5civ')) {
							// entstream
							k._entstreamCollapsedUFISentence_change(parent);
						} else {
							k.getParent(parent, function(likesentence) {
								return hasClass(likesentence, 'UFILikeSentence');
							}, function(likesentence) {
								if (likesentence) {
									k._likePostBox(likesentence);
								}
							});
						}
					}
				} else if (hasClass(parent.parentNode, 'UFIPagerLink')) {
					k.ufiPagerLink({target: parent.parentNode.parentNode});
				} else if (hasClass(parent, 'ponyhoof_brohoof_button')) {
					k._commentLikeLink(parent);
				} else if (parent.nextSibling && hasClass(parent.nextSibling, 'UFIOrderingModeSelectorDownCaret')) {
					k.UFIOrderingMode(parent);
				} else {
					if (parent.parentNode && parent.parentNode.parentNode) {
						//if (hasClass(parent.parentNode.parentNode, 'UFIImageBlockContent') || (parent.parentNode.parentNode.parentNode && hasClass(parent.parentNode.parentNode.parentNode, 'UFIImageBlockContent'))) {
						if (hasClass(parent.parentNode.parentNode, 'UFILikeSentenceText') || (parent.parentNode.parentNode.parentNode && hasClass(parent.parentNode.parentNode.parentNode, 'UFILikeSentenceText'))) {
							// live commenting
							// You and John brohoof this.
							// You like this.
							var ufi = k.getReactUfi(parent);
							if (ufi) {
								k.postLike({target: ufi});
							}
						} else {
							if (hasClass(parent.parentNode.parentNode, k.notification_textClass[0])) {
								// gosh, i dislike this...
								k.getParent(parent, function(notificationItem) {
									return hasClass(notificationItem, k.notification_itemClass[0]);
								}, function(notificationItem) {
									if (!notificationItem) {
										return;
									}

									k._notification_change(notificationItem, '.'+k.notification_textClass[0]+' > span', k._notification_react_metadata);
								});
							}
						}
					}
				}
			} else {
				/*if (hasClass(parent, '_5lbu') || hasClass(parent, '-cx-PRIVATE-pokesDashboard__pokerbuttons')) {
					// Nuzzles
					var t = mutation.target.textContent;
					t = t.replace(/\bPoke\b/, 'Nuzzle');
					if (mutation.target.textContent != t) {
						mutation.target.textContent = t;
					}
				} else*/
				if (hasClass(parent, 'mls')) {
					if (parent.previousSibling && parent.previousSibling.nodeType === ELEMENT_NODE) {
						if (hasClass(parent.previousSibling, '_5lbt')) {
							var orig = parent.innerHTML;
							var t = orig;
							t = t.replace(/^You poked /, 'You nuzzled ');
							if (orig != t) {
								parent.innerHTML = t;
							}
						}
					}
				}
			}

			INTERNALUPDATE = iu;
		};

		k.mutateAttributes = function(mutation) {
			//if (mutation.attributeName.indexOf('data-ponyhoof-') == 0) {
			//	return;
			//}
			var target = mutation.target;
			if (mutation.attributeName === 'title') {
				if (target.title == target.getAttribute('data-ponyhoof-title-modified')) {
					return;
				}
			}
			switch (mutation.attributeName) {
				case 'title':
					var id = target.getAttribute(k.REACTATTRNAME);
					if (id) {
						if (hasClass(target, 'UFILikeLink')) {
							if (target.title == '' && mutation.oldValue != '') { // thanks a lot Hover Zoom
								target.setAttribute('data-ponyhoof-title', mutation.oldValue);
								target.setAttribute('data-ponyhoof-title-modified', mutation.oldValue);
							} else {
								var orig = target.title;
								var t = orig;
								t = t.replace(/\bcomment\b/, "friendship letter");
								t = t.replace(/\bLike this \b/, capitaliseFirstLetter(CURRENTSTACK.like)+' this ');
								t = t.replace(/\bUnlike this \b/, capitaliseFirstLetter(CURRENTSTACK.unlike)+' this ');
								t = t.replace(/\bunlike this \b/, CURRENTSTACK.unlike+' this ');
								t = t.replace(/\bliking this \b/, CURRENTSTACK.liking+' this ');

								if (orig != t) {
									target.title = t;
								}
								target.setAttribute('data-ponyhoof-title', orig);
								target.setAttribute('data-ponyhoof-title-modified', t);
							}
						}
					}
					break;

				default:
					break;
			}
		};

		// Utilities
		k.getParent = function(ele, iffunc, func) {
			var outer = ele.parentNode;
			while (outer) {
				if (iffunc(outer)) {
					break;
				}
				outer = outer.parentNode;
			}
			
			func(outer);
		};

		k.changeButtonText = function(button, t) {
			if (button.tagName.toUpperCase() === 'INPUT') {
				button.value = t;
			} else {
				button.innerHTML = t;
			}
		};

		k.getButtonText = function(button, t) {
			if (button.tagName.toUpperCase() === 'INPUT') {
				return button.value;
			}
			return button.innerHTML;
		};

		// Delays and let Facebook finish changing the DOM
		// Note that this shouldn't be a problem when MutationObserver is used full-time
		k.delayIU = function(func, delay) {
			var delay = delay || 10;

			if (USINGMUTATION) {
				func();
				return;
			}

			w.setTimeout(function() {
				var iu = INTERNALUPDATE;
				INTERNALUPDATE = true;
				func();
				INTERNALUPDATE = iu;
			}, delay);
		};

		k.getReactUfi = function(ele) {
			var finalid = k.getReactId(ele);

			var ufi = d.querySelector('div['+k.REACTATTRNAME+'="'+finalid+'"]');
			if (ufi && hasClass(ufi, 'UFIList')) {
				return ufi;
			}

			// Rollback to old method
			k.getParent(ele, function(ufiitem) {
				return hasClass(ufiitem, 'UFIList');
			}, function(ufiitem) {
				ufi = ufiitem;
			});
			return ufi;
		};

		k.getReactCommentComponent = function(ele) {
			// .reactRoot[3].[1][0].0.[1].0.0.[2]
			// .reactRoot[3].[1][2][1]{comment105273202993369_7901}.0.[1].0.[1].0.[1].[2]
			// .reactRoot[1].:1:1:1:comment558202387555478_1973546.:0.:1.:0.:1.:0
			// .r[12].[1][3][1]{comment670417926333923_6479269}[0].[0].{right}.[0].{left}.[0].[0].[0][3].[0]
			// .d.1:3:1:$comment671617356213980_2379318:0.0.$right.0.$left.0.0.0:3.0.0.$end:0:$0:0
			var id = ele.getAttribute(k.REACTATTRNAME);
			if (!id) {
				return false;
			}

			var open = id.indexOf(':$comment');
			var close = ':0';
			var closeCount = 2; // any ending braces to count
			if (open === -1) {
				return false;
			}

			var subEnd = id.substring(open, id.length).indexOf(close);
			var component = id.substring(0, open+subEnd+closeCount);

			return component;
		};

		k.getReactComment = function(ele) {
			var component = k.getReactCommentComponent(ele);

			var comment = d.querySelector('li['+k.REACTATTRNAME+'="'+component+'"]');
			if (comment && hasClass(comment, 'UFIComment')) {
				return comment;
			}

			// Rollback to old method
			k.getParent(ele, function(ufiitem) {
				return hasClass(ufiitem, 'UFIComment');
			}, function(ufiitem) {
				comment = ufiitem;
			});
			return comment;
		};

		k.getTrackingNode = function(ele) {
			var trackingNode = ele.getAttribute('data-ft');
			if (trackingNode) {
				try {
					trackingNode = JSON.parse(trackingNode);
					return trackingNode.tn;
				} catch (e) {}
			}
			return false;
		};

		k._updateLayerPosition_eventName = '';
		k.updateLayerPosition = function(layer) {
			if (!k._updateLayerPosition_eventName) {
				k._updateLayerPosition_eventName = w.md5('ponyhoof_eval_updateLayerPosition_' + (+new Date()));
				contentEval(function(arg) {
					document.documentElement.addEventListener(arg.eventName, function(ev) {
						try {
							if (typeof window.requireLazy === 'function') {
								window.requireLazy(['DataStore'], function(DataStore) {
									var layer = document.getElementsByClassName(ev.detail);
									if (!layer || !layer.length) {
										return;
									}
									layer = layer[0];

									var layerClass = DataStore.get(layer, 'layer');
									layerClass.updatePosition();
									layerClass = null;

									if (layer.classList) {
										layer.classList.remove(ev.detail);
									}
								});
							}
						} catch (e) {
							if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
								console.log("Unable to hook to DataStore");
								console.dir(e);
							}
						}
					}, false);
				}, {'eventName': k._updateLayerPosition_eventName});
			}

			var tempClass = 'ponyhoof_temp_' + (+new Date());
			addClass(layer, tempClass);

			var ev = d.createEvent('CustomEvent');
			ev.initCustomEvent(k._updateLayerPosition_eventName, true, true, tempClass);
			d.documentElement.dispatchEvent(ev);

			/*contentEval(function(arg) {
				try {
					if (typeof window.requireLazy === 'function') {
						window.requireLazy(['DataStore'], function(DataStore) {
							var layer = document.getElementsByClassName(arg.tempClass);
							if (!layer || !layer.length) {
								return;
							}
							layer = layer[0];

							var layerClass = DataStore.get(layer, 'layer');
							layerClass.updatePosition();
							layerClass = null;

							if (layer.classList) {
								layer.classList.remove(arg.tempClass);
							}
						});
					}
				} catch (e) {
					if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to DataStore");
						console.dir(e);
					}
				}
			}, {'tempClass':tempClass});*/

			if (!layer.classList) {
				w.setTimeout(function() {
					removeClass(layer, tempClass);
				}, 500);
			}
		};

		// Ignore irrelevant tags and some classes
		k.shouldIgnore = function(dom) {
			if (dom.target.nodeType === 8) { // comments
				return true;
			}

			if (dom.target.nodeType != 3) {
				var tn = dom.target.tagName.toUpperCase();
				if (tn === 'SCRIPT' || tn === 'STYLE' || tn === 'LINK' || tn === 'INPUT' || tn === 'BR' || tn === 'META') {
					return true;
				}
			}

			if (dom.target.parentNode && /(DOMControl_shadow|highlighterContent|textMetrics)/.test(dom.target.parentNode.className)) {
				return true;
			}

			return false;
		};

		k.dumpConsole = function(dom) {
			if (!userSettings.debug_dominserted_console) {
				return;
			}

			if (dom.target.nodeType === 8) { // comments
				return;
			}

			if (dom.target.nodeType === 3) {
				if (dom.target.parentNode && dom.target.parentNode.tagName.toUpperCase() != 'ABBR') {
					if (typeof console !== 'undefined' && console.dir) {
						console.dir(dom.target);
					}
				}
				return;
			}

			var id = dom.target.getAttribute('id');
			if (id && (id.indexOf('bfb_') === 0 || id.indexOf('sfx_') === 0)) {
				return;
			}

			var className = dom.target.className;
			if (className.indexOf('bfb_') === 0 || className.indexOf('sfx_') === 0) {
				return;
			}

			var tagName = dom.target.tagName.toUpperCase();
			if (tagName != 'BODY') {
				if (typeof console !== 'undefined' && console.log) {
					console.log(dom.target.outerHTML);
				}
			}
		};

		k.textBrohoof = function(ele) {
			var orig = '';
			var t = '';
			if (ele.nodeType === TEXT_NODE) {
				orig = ele.textContent;
			} else if (ele.nodeType === ELEMENT_NODE) {
				orig = ele.innerHTML;
			} else {
				orig = ele;
			}
			t = orig;
			t = t.replace(/\bpeople\b/g, " "+CURRENTSTACK['people']);
			t = t.replace(/\bperson\b/g, " "+CURRENTSTACK['person']);
			t = t.replace(/likes this/g, CURRENTSTACK['likes']+" this");
			t = t.replace(/like this/g, CURRENTSTACK['like']+" this");
			t = t.replace(/Likes/g, capitaliseFirstLetter(CURRENTSTACK['likes'])); // new news feed page likes
			t = t.replace(/likes/g, CURRENTSTACK['likes']);
			t = t.replace(/like/g, CURRENTSTACK['like']);
			t = t.replace(/\btalking about this\b/g, "blabbering about this");
			t = t.replace(/\bfriends\b/g, CURRENTSTACK['friends_logic']);
			t = t.replace(/\bfriend\b/g, CURRENTSTACK['friend_logic']);
			if (orig != t) {
				if (ele.nodeType === TEXT_NODE) {
					ele.textContent = t;
				} else if (ele.nodeType === ELEMENT_NODE) {
					ele.innerHTML = t;
				}
			}
			return t;
		};
		
		k.textStandard = function(t) {
			t = t.replace(/\bpeople\b/g, " "+CURRENTSTACK['people']);
			t = t.replace(/\bfriends\b/g, " "+CURRENTSTACK['friends_logic']);
			t = t.replace(/\bfriend\b/g, " "+CURRENTSTACK['friend_logic']);
			t = t.replace(/\blikes\b/g, " "+CURRENTSTACK['likes_past']);
			t = t.replace(/\blike\b/g, " "+CURRENTSTACK['like_past']);
			return t;
		};
		
		k.textNotification = function(t) {
			t = t.replace(/\bpeople\b/g, " "+CURRENTSTACK['people']);
			t = t.replace(/\(friends\b/g, "("+CURRENTSTACK['friends_logic']);
			t = t.replace(/\bfriends\b/g, " "+CURRENTSTACK['friends_logic']);
			t = t.replace(/\binvited you to like\b/g, " invited you to "+CURRENTSTACK.like);
			t = t.replace(/\blikes\b/g, " "+CURRENTSTACK['likes_past']);
			t = t.replace(/\blike\b/g, " "+CURRENTSTACK['like_past']);

			t = t.replace(/\bcomment\b/g, "friendship letter");
			t = t.replace(/\bphoto\b/g, "pony pic");
			t = t.replace(/\bphotos\b/g, "pony pics");
			t = t.replace(/\bgroup\b/g, "herd");
			t = t.replace(/\bevent\b/g, "adventure");
			t = t.replace(/\btimeline\b/g, "journal");
			t = t.replace(/\bTimeline Review\b/g, "Journal Review");
			t = t.replace(/\bTimeline\b/g, "Journal"); // English UK
			t = t.replace(/\bnew messages\b/, "new friendship reports");
			t = t.replace(/\bnew message\b/, "new friendship report");
			t = t.replace(/\bprofile picture\b/g, "journal pony pic");
			t = t.replace(/\bfriend request\b/g, "friendship request");
			t = t.replace(/\bpoked you/g, " nuzzled you");

			t = t.replace(/\bposted a note\b/, "posted a scroll");
			return t;
		};
	};
	var _optionsLinkInjected = false;
	var injectOptionsLink = function() {
		if (_optionsLinkInjected) {
			return;
		}
		
		if ($('logout_form')) {
			_optionsLinkInjected = true;
			
			var optionsLink = d.createElement('a');
			optionsLink.href = '#';
			optionsLink.id = 'ponyhoof_account_options';
			optionsLink.className = 'navSubmenu submenuNav'; // submenuNav is for developers.facebook.com
			optionsLink.innerHTML = CURRENTLANG['options_title'] + " <span class='ponyhoof_hide_if_injected inline'>(Disabled)</span>";
			optionsLink.addEventListener('click', function(ev) {
				ev.preventDefault();

				optionsOpen();
				
				try {
					clickLink($('navAccountLink'));
				} catch (e) {}
				try {
					clickLink($('accountNavArrow'));
				} catch (e) {}
				try {
					var newDevelopersMenuButton = d.querySelector('._51_- > .uiPopover > ._p');
					if (newDevelopersMenuButton) {
						clickLink(newDevelopersMenuButton);
					}
				} catch (e) {}
			}, false);
			
			var optionsLinkLi = d.createElement('li');
			optionsLinkLi.setAttribute('role', 'menuitem');
			//optionsLinkLi.style.height = 'auto'; // fix buggy developers.facebook.com
			optionsLinkLi.appendChild(optionsLink);
			
			var logout = $('logout_form');

			if (hasClass(d.body, '_55w7')) {
				// new developers
				optionsLink.className = '_54nc';
				optionsLink.setAttribute('tabindex', '0');
				optionsLink.setAttribute('role', 'menuitem');
				optionsLinkLi.className = '_54ni __MenuItem';
				optionsLinkLi.removeAttribute('role');

				domNodeHandlerMain.getParent(logout, function(menuitem) {
					return hasClass(menuitem, '_54ni');
				}, function(menuitem) {
					if (menuitem) {
						menuitem.parentNode.insertBefore(optionsLinkLi, menuitem);
					}
				});
			} else {
				logout.parentNode.parentNode.insertBefore(optionsLinkLi, logout.parentNode);
			}
		} else {
			var pageNav = $('pageNav');
			if (!pageNav) {
				return;
			}

			var isBusiness = pageNav.querySelector('.navLink[href*="logout.php?h="]');
			if (!isBusiness) {
				return;
			}

			_optionsLinkInjected = true;

			var optionsLink = d.createElement('a');
			optionsLink.href = '#';
			optionsLink.id = 'ponyhoof_account_options';
			optionsLink.className = 'navLink';
			optionsLink.innerHTML = CURRENTLANG.options_title+" <span class='ponyhoof_hide_if_injected inline'>(Disabled)</span>";
			optionsLink.addEventListener('click', function(e) {
				optionsOpen();
				e.preventDefault();
			}, false);

			var optionsLinkLi = d.createElement('li');
			optionsLinkLi.className = 'navItem middleItem';
			optionsLinkLi.appendChild(optionsLink);
			
			pageNav.insertBefore(optionsLinkLi, pageNav.childNodes[0]);
		}
	};
	
	var domNodeHandlerMain = new domNodeHandler();
	var mutationObserverMain = null;
	
	var ranDOMNodeInserted = false;
	var runDOMNodeInserted = function() {
		if (ranDOMNodeInserted) {
			return false;
		}
		
		ranDOMNodeInserted = true;
		
		onPageReady(function() {
			if (d.body) {
				DOMNodeInserted({target: d.body});
			}
		});

		if (!userSettings.debug_noMutationObserver) {
			try {
				var mutationObserver = w.WebKitMutationObserver || w.MutationObserver || false;
				if (mutationObserver) {
					var observerOptions = {attributes:true, childList:true, characterData:true, subtree:true, attributeOldValue:true, attributeFilter:['title']};
					mutationObserverMain = new mutationObserver(function(mutations) {
						if (INTERNALUPDATE) {
							return;
						}
						mutationObserverMain.disconnect();

						for (var i = 0, len = mutations.length; i < len; i += 1) {
							switch (mutations[i].type) {
								case 'characterData':
									domNodeHandlerMain.mutateCharacterData(mutations[i]);
									break;

								case 'childList':
									for (var j = 0, jLen = mutations[i].addedNodes.length; j < jLen; j += 1) {
										if (userSettings.debug_mutationDebug) {
											if (mutations[i].addedNodes[j].parentNode && mutations[i].addedNodes[j].parentNode.tagName != 'ABBR') {
												try {
													console.log('childList:');
													if (!ISFIREFOX) {
														console.dir(mutations[i].addedNodes[j]);
													} else {
														if (typeof mutations[i].addedNodes[j].className == 'undefined') {
															console.dir(mutations[i].addedNodes[j]);
														} else {
															//console.log('    '+mutations[i].addedNodes[j].className);
															//console.log('        '+mutations[i].addedNodes[j].innerHTML);
														}
													}
												} catch (e) {}
											}
										}
										DOMNodeInserted({target: mutations[i].addedNodes[j]});
									}
									break;

								case 'attributes':
									var iu = INTERNALUPDATE;
									INTERNALUPDATE = true;

									domNodeHandlerMain.mutateAttributes(mutations[i]);

									INTERNALUPDATE = iu;
									break;

								default:
									break;
							}
						}
						if (userSettings.debug_mutationDebug) {
							console.log('=========================================');
						}
						mutationObserverMain.observe(d.documentElement, observerOptions);
					});
					mutationObserverMain.observe(d.documentElement, observerOptions);
					USINGMUTATION = true;
				}
			} catch (e) {
				warn("MutationObserver threw an exception, fallback to DOMNodeInserted");
				dir(e);
			}
		}
		if (!USINGMUTATION) {
			d.addEventListener('DOMNodeInserted', DOMNodeInserted, true);
		}

		if (d.body) {
			DOMNodeInserted({target: d.body});
		}
	};
	
	var turnOffFbNotificationSound = function() {
		contentEval(function(arg) {
			try {
				if (typeof window.requireLazy === 'function') {
					window.requireLazy(['NotificationSound'], function(NotificationSound) {
						NotificationSound.prototype.play = function() {};
					});
				}
			} catch (e) {
				if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
					console.log("Unable to hook to NotificationSound");
					console.dir(e);
				}
			}
		}, {});
	};

	var changeChatSound = function(code) {
		onPageReady(function() {
			contentEval(function(arg) {
				try {
					if (typeof window.requireLazy === 'function') {
						window.requireLazy(['ChatConfig'], function(ChatConfig) {
							ChatConfig.set('sound.notif_ogg_url', arg.THEMEURL + arg.code + '.ogg');
							ChatConfig.set('sound.notif_mp3_url', arg.THEMEURL + arg.code + '.mp3');
						});
					}
				} catch (e) {
					if (arg.CANLOG && typeof console != 'undefined' && console.log && console.dir) {
						console.log("Unable to hook to ChatConfig");
						console.dir(e);
					}
				}
			}, {'THEMEURL': THEMEURL, 'code': code});
		});
	};

	var ranExtraInjection = false;
	var extraInjection = function() {
		if (ranExtraInjection) {
			return false;
		}
		ranExtraInjection = true;
		
		INTERNALUPDATE = true;
		for (var x in HTMLCLASS_SETTINGS) {
			if (userSettings[HTMLCLASS_SETTINGS[x]]) {
				addClass(d.documentElement, 'ponyhoof_settings_'+HTMLCLASS_SETTINGS[x]);
			}
		}
		
		var globalcss = '';
		globalcss += '#fbIndex_swf {position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;}';
		globalcss += '.ponyhoof_tooltip_widthFix {width:auto !important;}';
		globalcss += '._51_z #ponyhoof_account_options:hover {background:#42599e;border-color:#30497a;color:#fff;}';

		injectManualStyle(globalcss, 'global');
		
		if (userSettings.customcss) {
			injectManualStyle(userSettings.customcss, 'customcss');
		}
		
		var timeShift = function() {
			var now = new Date();
			
			d.documentElement.setAttribute('data-ponyhoof-year', now.getFullYear());
			d.documentElement.setAttribute('data-ponyhoof-month', now.getMonth());
			d.documentElement.setAttribute('data-ponyhoof-date', now.getDate());
			d.documentElement.setAttribute('data-ponyhoof-hour', now.getHours());
			d.documentElement.setAttribute('data-ponyhoof-minute', now.getMinutes());
		};
		timeShift();
		w.setInterval(timeShift, 60 * 1000);
		
		if (userSettings.chatSound) {
			if (!SOUNDS_CHAT[userSettings.chatSoundFile] || !SOUNDS_CHAT[userSettings.chatSoundFile].name) {
				userSettings.chatSoundFile = '_sound/grin2';
			}
			if (canPlayAudio()) {
				changeChatSound(userSettings.chatSoundFile);
			}
		}
		
		if (userSettings.customBg && !ONPLUGINPAGE) {
			changeCustomBg(userSettings.customBg);
		}

		// Turn off Facebook's own notification sound
		if (userSettings.sounds) {
			turnOffFbNotificationSound();
		}

		changeThemeFuncQueue.push(domNodeHandlerMain.navHomeReset);

		if (userSettings.debug_performanceTiming) {
			if (w.performance && w.performance.getEntriesByType) {
				w.addEventListener('load', function() {
					var p = w.performance.getEntriesByType('resource');
					for (var i = 0, len = p.length; i < len; i += 1) {
						if (p[i].name.indexOf('?userscript_version=') !== -1) {
							console.dir(p[i]);
						}
					}
				}, false);
			}
		}

				INTERNALUPDATE = false;
	};

	var detectBrokenFbStyle = function() {
		var test = d.createElement('div');
		test.className = 'hidden_elem';
		d.documentElement.appendChild(test);

		var style = w.getComputedStyle(test, null);
		if (style && style.display != 'none') {
			d.documentElement.removeChild(test);

			
			return true;
		}
		d.documentElement.removeChild(test);
		return false;
	};
	
	// Wait for the current page to complete
	var scriptStarted = false;
	function startScript() {
		if (scriptStarted) {
			return;
		}
		scriptStarted = true;

		// Don't run on exclusions
		if (w.location.hostname.indexOf('.facebook.com') === w.location.hostname.length-'.facebook.com'.length) {
			var excludes = ['/l.php', '/ai.php', '/xti.php', '/sound_iframe.php', '/ajax/'];
			for (var i = 0, len = excludes.length; i < len; i += 1) {
				if (w.location.pathname.indexOf(excludes[i]) === 0) {
					return;
				}
			}
		}

		// Don't run on ajaxpipe
		if (w.location.search && w.location.search.indexOf('ajaxpipe=1') !== -1) {
			return;
		}
		
		// Don't run on Browser Ponies
		if (w.location.hostname === 'hoof.little.my') {
			var excludes = ['.gif', '.png'];
			for (var i = 0, len = excludes.length; i < len; i += 1) {
				if (w.location.pathname.indexOf(excludes[i]) != -1) {
					return;
				}
			}
		}

		// Don't run on Open Graph Debugger
		if (w.location.hostname.indexOf('developers.') != -1 && w.location.hostname.indexOf('.facebook.com') != -1 && w.location.pathname === '/tools/debug/og/echo') {
			return;
		}

		if (w.location.hostname === '0.facebook.com') {
			return;
		}
		
		if (!d.head) {
			d.head = d.getElementsByTagName('head')[0];
		}

		// Are we running in a special Ponyhoof page?
		if (d.documentElement.id === 'ponyhoof_page') {
			// Modify the <html> tag
			addClass(d.documentElement, 'ponyhoof_userscript');
			d.documentElement.setAttribute('data-ponyhoof-userscript-version', VERSION);
			
			var changeVersion = function() {
				var v = d.getElementsByClassName('ponyhoof_VERSION');
				for (var i = 0, len = v.length; i < len; i += 1) {
					v[i].textContent = VERSION;
				}
			};
			changeVersion();
			onPageReady(changeVersion);
			
			var newestVersion = d.documentElement.getAttribute('data-ponyhoof-update-current');
			if (newestVersion) {
				if (newestVersion > VERSION) {
					addClass(d.documentElement, 'ponyhoof_update_outdated');
				} else {
					addClass(d.documentElement, 'ponyhoof_update_newest');
				}
			}
		}
		
		// Determine what storage method to use
		STORAGEMETHOD = 'none';
		try {
			if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
				// Chrome lies about GM_getValue support
				GM_setValue("ponyhoof_test", "ponies");
				if (GM_getValue("ponyhoof_test") === "ponies") {
					STORAGEMETHOD = 'greasemonkey';
				}
			}
		} catch (e) {}
		
		if (STORAGEMETHOD === 'none') {
			try {
				if (typeof chrome != 'undefined' && chrome && chrome.extension && typeof GM_getValue == 'undefined') {
					STORAGEMETHOD = 'chrome';
				}
			} catch (e) {}
		}
		
		if (STORAGEMETHOD === 'none') {
			try {
				if (typeof opera != 'undefined' && opera && opera.extension) {
					STORAGEMETHOD = 'opera';
				}
			} catch (e) {}
		}
		
		if (STORAGEMETHOD === 'none') {
			try {
				if (typeof safari != 'undefined') {
					STORAGEMETHOD = 'safari';
				}
			} catch (e) {}
		}
		
		if (STORAGEMETHOD === 'none') {
			if (DISTRIBUTION === 'xpi') {
				STORAGEMETHOD = 'xpi';
			}
		}
		
		if (STORAGEMETHOD === 'none') {
			if (DISTRIBUTION === 'mxaddon') {
				STORAGEMETHOD = 'mxaddon';
			}
		}
		
		if (STORAGEMETHOD === 'none') {
			STORAGEMETHOD = 'localstorage';
		}
		
		if (d.documentElement.id === 'ponyhoof_page') {
			addClass(d.documentElement, 'ponyhoof_distribution_'+DISTRIBUTION);
			addClass(d.documentElement, 'ponyhoof_storagemethod_'+STORAGEMETHOD);
			return;
		}

		// Inject the system style so we can do any error trapping
		injectSystemStyle();

		// Grab the user
		USERID = cookie('c_user');
		if (!USERID) {
			USERID = 0;
		} else {
			SETTINGSPREFIX = USERID+'_';
		}

		loadSettings(function(s) {
			userSettings = s;

			loadSettings(function(s) {
				globalSettings = s;

				if (userSettings.debug_slow_load) {
					onPageReady(settingsLoaded);
					return;
				}
				settingsLoaded();
			}, {prefix:'global_', defaultSettings:GLOBALDEFAULTSETTINGS});
		});
	};

	// Check for legacy settings through message passing
	var migrateSettingsChromeDone = false;
	var migrateSettingsChrome = function(callback) {
		if (STORAGEMETHOD === 'chrome') {
			if (chrome.storage) {
				try {
					chrome_sendMessage({'command':'getValue', 'name':SETTINGSPREFIX+'settings'}, function(response) {
						if (response && typeof response.val != 'undefined') {
							var _settings = JSON.parse(response.val);
							if (_settings) {
								userSettings = _settings;
								saveSettings();
								
								chrome_sendMessage({'command':'clearStorage'}, function() {});
							}

							migrateSettingsChromeDone = true;
							callback();
						}
					});
				} catch (e) {
					error("Failed to read previous settings through message passing");
					dir(e);
					migrateSettingsChromeDone = true;
					callback();
				}
				return;
			}
		}
		migrateSettingsChromeDone = true;
		callback();
	};

	// Check for previous settings from unprefixed settings
	var migrateSettingsUnprefixedDone = false;
	var migrateSettingsUnprefixed = function(callback) {
		loadSettings(function(s) {
			if (s.lastVersion) { // only existed in previous versions
				userSettings = s;
				saveSettings();
				saveValue('settings', JSON.stringify(null));
			}

			migrateSettingsUnprefixedDone = true;
			callback();
		}, {prefix:''});
	};

	var globalSettingsTryLastUserDone = false;
	var globalSettingsTryLastUser = function(callback) {
		if (!globalSettings.lastUserId) {
			globalSettingsTryLastUserDone = true;
			callback();
			return;
		}

		SETTINGSPREFIX = globalSettings.lastUserId+'_';
		loadSettings(function(s) {
			if (s) {
				userSettings = s;
			}

			globalSettingsTryLastUserDone = true;
			callback();
		});
	};

	function settingsLoaded() {
		if (!userSettings.theme && !migrateSettingsChromeDone) {
			migrateSettingsChrome(settingsLoaded);
			return;
		}

		// Migrate for multi-user
		if (!userSettings.theme && !migrateSettingsUnprefixedDone) {
			migrateSettingsUnprefixed(settingsLoaded);
			return;
		}

		if (!globalSettings.globalSettingsMigrated) {
			if (!userSettings.lastVersion) {
				// New user
				statTrack('install');
			}

			for (var i in GLOBALDEFAULTSETTINGS) {
				if (userSettings.hasOwnProperty(i)) {
					globalSettings[i] = userSettings[i];
				}
			}
			globalSettings.globalSettingsMigrated = true;
			saveGlobalSettings();
		}

		if (!USERID && !globalSettingsTryLastUserDone) {
			// Try loading the last user
			globalSettingsTryLastUser(settingsLoaded);
			return;
		}

		// If we haven't set up Ponyhoof, don't log
		if (!userSettings.theme || userSettings.debug_disablelog) {
			CANLOG = false;
		}

		// Run ONLY on #facebook
		if (!(d.documentElement.id === 'facebook' && w.location.hostname.indexOf('.facebook.com') === w.location.hostname.length-'.facebook.com'.length) && d.documentElement.id != 'ponyhoof_page' && w.location.href !== 'https://www.facebook.com/common/redirectiframe.html#ponyhoof_likebox') {
			info("Ponyhoof does not run on " + w.location.href + " (html id is not #facebook)");
			return;
		}
		
		// Did we already run our script?
		if (hasClass(d.documentElement, 'ponyhoof_userscript')) {
			info("Already running at " + w.location.href);
			return;
		}
		
		// Don't run in frames
		var forceWhiteBackground = false;
		try {
			var href = w.location.href.toLowerCase();
			
			if ((href.indexOf('/plugins/like.php') != -1 || href.indexOf('/plugins/likebox.php') != -1 || href.indexOf('/plugins/subscribe.php') != -1 || href.indexOf('/plugins/facepile.php') != -1) && (href.indexOf('login/plugin_roadblock.php') == -1 && (href.indexOf('#ponyhoof_runme') != -1 || href.indexOf('&ponyhoof_runme') != -1))) {
				// Allow like boxes for the Ponyhoof page (yeah, a bit cheating)
			} else if (hasClass(d.body, 'chrmxt')) {
				// Allow for Facebook Notifications for Chrome
			} else {
				// Allow for some frames
				var allowedFrames = ['/ads/manage/powereditor/funding', '/ads/manage/powereditor/convtrack', '/mobile/iframe_emails.php', '//attachments/deprecated/attachments_upload.php'];
				var allowedFramesOk = false;
				for (var i = 0, len = allowedFrames.length; i < len; i += 1) {
					if (w.location.pathname.indexOf(allowedFrames[i]) === 0) {
						allowedFramesOk = true;
						forceWhiteBackground = true;
					}
				}

				// Allow for comment boxes owned by Ponyhoof
				// (in theory, we could still be run by http://example/?api_key=231958156911371 but this isn't a big deal)
				if (w.location.pathname === '/plugins/comments.php' || w.location.pathname === '/plugins/feedback.php') {
					if (w.location.search.indexOf('api_key=231958156911371') != -1 || w.location.search.indexOf('api_key=376261472405891') != -1) {
						allowedFramesOk = true;
					}
				}

				if (w.location.href === 'https://www.facebook.com/common/redirectiframe.html#ponyhoof_likebox') {
					allowedFramesOk = true;
					forceWhiteBackground = true;
				}

				if (!allowedFramesOk) {
					if (USW.self != USW.top) {
						throw 1;
					}
				}
			}
		} catch (e) {
			info("Ponyhoof does not run inside frames.");
						return;
		}
		
		// Special instructions for browsers that needs localStorage
		runMe = true;
		if (STORAGEMETHOD === 'localstorage') {
			// Don't run on non-www :(
			if (userSettings.force_run) {
				log("Force running on "+w.location.href);
			} else {
				if (w.location.hostname != 'www.facebook.com') {
					info("w.location.hostname = "+w.location.hostname);
					runMe = false;
				}
			}
		}
		
		if (!runMe) {
			info("Style not injected on " + w.location.href);
			//return;
		}
		
		CURRENTPONY = userSettings.theme;

		if (!USERID && !globalSettings.allowLoginScreen) {
			info("Ponyhoof will not run when logged out because the option 'Run Ponyhoof on the Facebook login screen' has been disabled.");
			return;
		}

		// Ban parasprites
		// Let me tell you the story of one troll that used 8 FB accounts that continued to harass me...
		if (USERID && ['5f25f632927302245b5b7d6b8375a9d8', '0f119908e71537e01c874149ff8f4a7d', '4baafb70707075dcb0c00c2d07a9e142', '21670b69a9fcb2c1254a1b34d0d0791d', 'd2cceff8855e8276d7a99d33d9bf4ebc', '4c35b15bd4794d496a5d0f5525765e05', '9fb37b7ee8dc05b8f02fd24c08d5e154', '352e622ba412aa74aaf7bdde19f656b7', '25e23badc0a8e1cea40bd54a684e8166', '28d6352f9d20b8b2db9d7286a5d08dc0', 'bb0aefe0bbc95f0daa7035dbefd12d1e', 'd8a5dc86d0f38b1fe9ee7ee69e2f435e', 'd3eb4ac7fc8205a153659d8458e60b21', '2b06eb6acf54b508284671e71c651823', '55127a0315c5050ee60dc8a4294e234a', '43334e630d25405e60600bddd11286f5', '19e99719c3fcba36c256ed0cf1025d33', '55b6b921c123050585bf1553ea8d824a', '385cf27d78fd5732bf7d76dfae40bb7f', '07853eb0400e8876d4d20acd83f2d111', 'f13b068218f3377e4749edd3f027c3c9', 'ece09414bb1dfa7541e7317ea1db6875', '1c0e6cc480dce91fff9a46b66fded685', '3c496aed75ef7cd06b14470e5a56a77a', '611300af3380193aab26ff486e2a036b', '187bdfd58531529fa47fc3490413f7b7', '36c5a8845c11e8993f2809fbbaaa3f4b', '0716b9e829869870267f6de565c21fef', 'b43cacbb1e5689d2045369baf5668a6e', '8a685766de1b0dbc12b9560597118030', 'e3686058630b7b992b7f10e5ce10aa14', '10e823f70f20d7ef90db87783d96d5a6', 'b002a2d15003dad6a1cf694bba258ea2', 'c2480aa0cd99186aac0430f6d24ff40c', '377533fc17cfd34fae337a4c9a5e4d49', 'a078ca1d2d6a98055fa448b8367a8190', 'b85f32cf81e4153975f1e1f55fecfe58', '40ab65332ad92345ab727aadcc623906', '0147135a7dc2d1b65ca0032c97f89c5b', '6c5b9bf8a304f1a3e0b085f974c53592', '4ab4094e54225dccadf42bee9ac212a9', '2887516d877df760641ed9247cc84b65', '06308ee7060101f04a18e41158408730', 'a95ef44112c18876a808b2d7781e63ba', '57b540dc72835f30d402f6abc566677c', '1f75490e12b25ee5839687e0ffe65502', '24363cd421635e8268983f6187def3c8', '3a420678fb395a9e71ad6b523e880a27', 'd7a9db4027cd407b281c84cc626a9f70', '23d69d7ecfeeb940deef6bc69c3aee00', 'ad3553f919b97dbbb19a69966666641e', '46077eeb2467c70ec9332b672d1d7bd1', 'bc8ef81105cfdc4c6b5ff349622dae8a', 'a21ad36f4c3fc35494626d1399cc4be1', '3a2135f78503521e570608c07c3e6386', '8dc11f39765f8fe83603502afcb630a9', 'ac966d33840736554984577a78d37d95', '11abc5dd16709ff201ec00781c39ac3c', '00e957ff53a5b34518087621165498f9', '025e1b15134402df1803de9421dc7819', '125c419ddbad08ee8c53b88801415887', 'ca94af2350690962e97e1ac1fb98fa06', '62e6c5f16e8ccc79c94aa452aa36f5d8', 'cf7e6ddb2fc7c7984d323a81dfca8dfb', 'df6495bacaeb347a931f7e676fc8ee0b', 'e5ffc53255c20275e2c7d8f0c2ca5201', '31161cecf1fd9804bb66fa4e373733c6', 'cb5f2107815d30a538b30d82df93a1ac', '3a420678fb395a9e71ad6b523e880a27', 'b002c047d235437b8b255173ce73744a'].indexOf(w.md5(USERID)) != -1) {
			if (globalSettings.allowLoginScreen) {
				globalSettings.allowLoginScreen = false;
				saveGlobalSettings(true);
			}
			if (globalSettings.runForNewUsers) {
				globalSettings.runForNewUsers = false;
				saveGlobalSettings(true);
			}
			return;
		}

		// If we don't have an old setting...
		if (userSettings.theme == null) {
			// ... and not logged in, DON'T show the welcome screen
			if (!USERID) {
				// Special exception at home page, we want that cool login background
				if (!hasClass(d.body, 'fbIndex')) {
					info("Ponyhoof does not run for logged out users.");
					return;
				}
			}

			// Don't run on dialogs
			if (w.location.pathname.indexOf('/dialog/') === 0) {
				info("Ponyhoof does not run when there is no theme selected and running on dialogs.");
				return;
			}
		}

		// v1.581: Detect broken Facebook styles and abort if derped
		if (userSettings.theme && w.location.href !== 'https://www.facebook.com/common/redirectiframe.html#ponyhoof_likebox' && detectBrokenFbStyle()) {
			error("Broken Facebook style: hidden_elem is not expected.");
			return;
		}
		
		// Modify the <html> tag
		addClass(d.documentElement, 'ponyhoof_userscript');
		addClass(d.documentElement, 'ponyhoof_storagemethod_'+STORAGEMETHOD);
		addClass(d.documentElement, 'ponyhoof_distribution_'+DISTRIBUTION);
		d.documentElement.setAttribute('data-ponyhoof-userscript-version', VERSION);

		// CANLOG previously could be disabled before
		if (!userSettings.debug_disablelog) {
			CANLOG = true;
		}

		// Load the language for the options link
		CURRENTLANG = LANG['en_US'];
		UILANG = getDefaultUiLang();
		if (!UILANG) {
			// Cannot detect current FB language
			UILANG = 'en_US';
		} else if (UILANG !== 'en_US') {
			if (!userSettings.forceEnglish) {
				for (var i in LANG[UILANG]) {
					CURRENTLANG[i] = LANG[UILANG][i];
				}
			}
		}

		// Inject Ponyhoof Options in the Account dropdown even when DOMNodeInserted is disabled
		onPageReady(function() {
			injectOptionsLink();
			domNodeHandlerMain.ponyhoofPageOptions({target: d.body});
			domNodeHandlerMain.ponyhoofComposer(d.body);
		});

		if (!runMe) {
			return;
		}

		var luckyGuess = -1;
		if (!CURRENTPONY && globalSettings.runForNewUsers) {
			// If we have a "special" name, load the peferred theme for that character if we're in one
			try {
				getBronyName();
				for (var i = 0, len = PONIES.length; i < len; i += 1) {
					if (PONIES[i].users) {
						var lowercase = BRONYNAME.toLowerCase();
						for (var j = 0, jLen = PONIES[i].users.length; j < jLen; j += 1) {
							if (lowercase.indexOf(PONIES[i].users[j]) != -1) {
								// We got a match!
								CURRENTPONY = PONIES[i].code;
								luckyGuess = i;
							}
						}
					}
				}
			} catch (e) {
				error("Failed to get brony name.");
			}
		}
		
		// If we still don't have one, then assume none
		if (!CURRENTPONY) {
			CURRENTPONY = 'NONE';
		}

		if ($('jewelFansTitle')) {
			ISUSINGPAGE = true;
			addClass(d.documentElement, 'ponyhoof_isusingpage');
		}

		if (d.querySelector('#pageLogo > a[href*="/business/dashboard/"]')) {
			ISUSINGBUSINESS = true;
			addClass(d.documentElement, 'ponyhoof_isusingbusiness');
		}

		// v1.401: Turn on new chat sound by default
		if (!userSettings.chatSound1401 && !userSettings.chatSound) {
			userSettings.chatSound = true;
			userSettings.chatSound1401 = true;
			saveSettings();
		}

		// v1.501: Migrate previous randomSetting
		if (userSettings.randomSetting && !userSettings.randomSettingMigrated) {
			if (userSettings.randomSetting === 'mane6') {
				userSettings.randomPonies = 'twilight|dash|pinkie|applej|flutter|rarity';
			}
			userSettings.randomSettingMigrated = true;
			saveSettings();
		}

		// v1.571
		userSettings.soundsVolume = Math.max(0, Math.min(parseFloat(userSettings.soundsVolume), 1));

		// v1.601
		if (globalSettings.lastVersion < 1.6) {
			if (userSettings.customcss || userSettings.debug_dominserted_console || userSettings.debug_slow_load || userSettings.debug_disablelog || userSettings.debug_noMutationObserver || userSettings.debug_mutationDebug) {
				userSettings.debug_exposed = true;
				saveSettings();
			}
		}

		// v1.731
		// See the comment on saveGlobalSettings() for why this is needed
		if (globalSettings.lastVersion < 1.725) {
			if (STORAGEMETHOD === 'chrome') {
				saveGlobalSettings(true);
			}
		}

		// v1.511: Track updates
		if (userSettings.theme && globalSettings.lastVersion < VERSION) {
			statTrack('updated');
			globalSettings.lastVersion = VERSION;
			saveGlobalSettings(true);
		}

		if (forceWhiteBackground || hasClass(d.body, 'plugin') || hasClass(d.body, 'transparent_widget') || hasClass(d.body, '_1_vn')) {
			ONPLUGINPAGE = true;
			addClass(d.documentElement, 'ponyhoof_fbplugin');
			changeThemeSmart(CURRENTPONY);
		} else {
			// Are we on homepage?
			if (hasClass(d.body, 'fbIndex') && globalSettings.allowLoginScreen) {
				// Activate screen saver
				screenSaverActivate();

				$$(d.body, '#blueBar .loggedout_menubar > .rfloat, ._50dz > .ptl[style*="#3B5998"] .rfloat > #login_form, ._50dz > div[style*="#3B5998"] td > div[style*="float"] #login_form', function() {
					addClass(d.documentElement, 'ponyhoof_fbIndex_topRightLogin');
				});
			}
			
			// No theme?
			if (userSettings.theme == null) {
				// No theme AND logged out
				if (!USERID) {
					changeTheme('login');
					log("Homepage is default to login.");
					extraInjection();
					if (!userSettings.disableDomNodeInserted) {
						runDOMNodeInserted();
					}
					return;
				}
				
				if (globalSettings.runForNewUsers) {
					if (luckyGuess == -1) {
						CURRENTPONY = getRandomMane6();
					}

					var welcome = new WelcomeUI({feature: luckyGuess});
					welcome.start();
				}
			} else {
				if (hasClass(d.body, 'fbIndex')) {
					if (CURRENTPONY === 'RANDOM' && !userSettings.randomPonies) {
						log("On login page and theme is RANDOM, choosing 'login'.");
						changeThemeSmart('login');
					} else {
						changeThemeSmart(CURRENTPONY);
					}

					if (canPlayFlash()) {
						var dat = convertCodeToData(REALPONY);
						if (dat.fbIndex_swf && !userSettings.disable_animation) {
							addClass(d.documentElement, 'ponyhoof_fbIndex_hasswf');

							var swf = d.createElement('div');
							swf.innerHTML = '<object type="application/x-shockwave-flash" id="fbIndex_swf" width="100%" height="100%" data="'+THEMEURL+dat.fbIndex_swf+'"><param name="movie" value="'+THEMEURL+dat.fbIndex_swf+'"><param name="wmode" value="opaque"><param name="menu" value="false"><param name="allowscriptaccess" value="never"></object>';
							d.body.appendChild(swf);
						}
					}
				} else {
					changeThemeSmart(CURRENTPONY);
				}
			}
		}
		
		if (CURRENTPONY != 'NONE' && !userSettings.disableDomNodeInserted) {
			runDOMNodeInserted();
		}
		
		if (CURRENTPONY != 'NONE') {
			extraInjection();
		}

		// Record the last user to figure out what theme to load at login screen
		// This is low priority, if all else fails, we would just load the default Equestria 'login' anyway
		if (CURRENTPONY != 'NONE' && userSettings.theme != null) { // Make sure we have a pony set
			if (USERID && globalSettings.lastUserId != USERID && globalSettings.allowLoginScreen) {
				globalSettings.lastUserId = USERID;
				saveGlobalSettings();
			}
		}
	}
	
	onPageReady(startScript);
	d.addEventListener('DOMContentLoaded', startScript, true);
	
	var _loop = function() {
		if (d.body) {
			startScript();
			return;
		} else {
			w.setTimeout(_loop, 100);
		}
	};
	_loop();
})();

/* ALL YOUR PONIES ARE BELONG TO US */
/*eof*/