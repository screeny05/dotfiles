/**
 * Ponyhoof
 * 
 * @author ngyikp (ngyikp@gmail.com)
 */

"use strict";

/* jshint quotmark: false, laxcomma: true, sub: true */
/* global chrome: false, console: false */

var requestToJson = function(request) {
	return {
		responseText: request.responseText
		,status: request.status
	};
};

var onMessage = function(message, sender, callback) {
	if (message && typeof message === 'object' && message.command) {
		switch (message.command) {
			case 'getValue':
				var val = localStorage.getItem(message.name);
				callback({'val': val});
				return;
			
			case 'setValue':
				var val = localStorage.setItem(message.name, message.val);
				callback({'val': val});
				return;
			
			case 'clearStorage':
				localStorage.clear();
				return;
			
			case 'openExtensions':
				chrome.tabs.create({'url': 'about:extensions'});
				return;

			// Chrome 25+
			case 'checkForUpdates':
				try {
					chrome.runtime.requestUpdateCheck(function(status, details) {
						callback(status, details);
					});
				} catch (e) {
					callback('unavailable');
				}
				return true;

			case 'onUpdateAvailable':
				try {
					chrome.runtime.onUpdateAvailable.addListener(function(details) {
						callback('updated');
					});
				} catch (e) {
					callback('unavailable');
				}
				return true;

			case 'reloadNow':
				try {
					chrome.runtime.reload();
				} catch (e) {}
				return;
			
			case 'ajax':
				var details = message.details;
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (request.readyState === 4) {
						callback({
							'val': 'success'
							,'request': requestToJson(request)
						});
					}
				};
				request.onerror = function() {
					callback({
						'val': 'failure'
						,'request': requestToJson(request)
					});
				};

				try {
					request.open(details.method, details.url, true);
					if (details.headers) {
						for (var name in details.headers) {
							request.setRequestHeader(name, details.headers[name]);
						}
					}
					request.send(details.data);
				} catch (e) {
					callback({
						'val': 'failure'
						,'request': requestToJson(request)
					});
				}
				return true;

			case 'getExtFile':
				var whitelist = ['browserponies/BrowserPoniesBaseConfig.json', 'browserponies/browserponies.js'];
				if (whitelist.indexOf(message.file) === -1) {
					callback({'val': 'failure', 'error': 'File is not on whitelist'});
					return;
				}

				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (request.readyState === 4 && request.status === 200) {
						callback({'val': 'success', 'file': request.responseText});
					}
				};
				request.onerror = function() {
					callback({'val': 'failure', 'error': 'Unknown error'});
				};
				request.open('GET', chrome.extension.getURL(message.file), true);
				request.send();

				return true;
			
			default:
				console.log("[Ponyhoof] Unsupported command \""+message.command+"\"");
				return;
		}
	}
};

if (chrome.extension.onMessage) {
	chrome.extension.onMessage.addListener(onMessage);
} else {
	chrome.extension.onRequest.addListener(onMessage);
}

if (chrome.runtime && chrome.runtime.onMessageExternal) {
	chrome.runtime.onMessageExternal.addListener(function(message, sender, callback) {
		if (message && typeof message === 'object' && message.command) {
			if (sender.id === 'pakhjhphleppgakhlffhlfhbekfnobbk' || sender.id === 'mmianhdlinbjakdabnbnpljjjfippnhl') {
				switch (message.command) {
					case 'ping':
						callback('pong');
						break;

					default:
						console.log("[Ponyhoof] Unsupported command \""+message.command+"\" from "+sender.id);
						return;
				}
			} else {
				console.log("[Ponyhoof] Refused to reply to command \""+message.command+"\" from "+sender.id);
			}
		}
	});
}
