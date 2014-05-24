var api_url = "https://api.premiumize.me/pm-api/v1.php";

function show_error(err) {
	console.log("showing error: " + err);
	// alert(err);
	$('#msg').css("color", "red");
	$('#msg').html(err);
	$('#msg').fadeIn('slow', function() {
		// Animation complete
	});

}
function show_msg(msg) {
	$('#msg').css("color", "green");
	$('#msg').html(msg);
	$('#msg').fadeIn('slow', function() {
		// Animation complete
	});
}
function hide_msg() {
	$('#msg').hide();
}
function show_area(area) {
	$('#loggedin-area').hide();
	$('#loggedout-area').hide();
	$('#' + area + '-area').show();
}
function login(login, pass) {

	$('#free-area').hide();
	$('#premium-area').hide();
	console.log("loggign in with " + login + " and " + pass);
	var url = api_url + "?method=accountstatus&params[login]="
			+ encodeURI(login) + "&params[pass]=" + encodeURI(pass);

	$.getJSON(url, function(data) {
		$('#loading-area').hide();
		if (data.status != 200) {
			logout();
			console.log("login failed...");
			show_error('error ' + data.status + ": " + data.statusmessage);

		} else {
			console.log("login successful");
			// save correct data
			localStorage["login"] = login;
			localStorage["pass"] = pass;
			localStorage["extuid"] = data.result.extuid;

			show_area("loggedin");

			// display loginname
			$('#login-name').html(login);

			if (data.result.type == "free") {
				console.log("accoutn type is free");
				$('#free-area').show();
				disable_proxy_silently();
			} else if (data.result.fairuse_left == 0) {
				console.log("accoutn is exhausted");
				$('#exhausted-area').show();
				disable_proxy_silently();
			} else {
				console.log("accoutn type must be prem or prepaid");
				$('#premium-area').show();
				// update fairuse indicator
				$('#fairuse_text').html(
						Math.round(data.result.fairuse_left * 100) + "%");
				$('#fairuse_bar').attr("value", data.result.fairuse_left);
				$('#account-status').html(data.result.type);
				if (data.result.type == "premium") {
					console.log("accoutn type is prem");

					var expires = new Date(data.result.expires * 1000);
					var now = new Date();
					var diff = expires - now;
					$('#account-valid-until').html(expires.toLocaleString());
					$('#days-remaining').html(
							Math.round(diff / 1000 / 86400 * 10) / 10);
				}

			}

		}
	});
}

function logout() {
	disable_proxy_silently();
	console.log("logging out");
	localStorage["login"] = "";
	localStorage["pass"] = "";
	localStorage["extuid"] = "";
	$('#login').val("");
	$('#pass').val("");

	show_area('loggedout');
	show_msg("logged out");
}
function set_mode(mode) {
	if (mode == "") {
		console.log("empty mode selected");
		return;
	}
	console.log("setting mode..");
	if (mode == "direct") {
		disable_proxy();
	} else if (mode == "auto") {
		enable_proxy();
	} else { // must be country
		enable_country_proxy(mode);
	}

}
function enable_proxy() {
	try {
		var nocache = new Date().getTime();
		var proxy_config = {
			mode : "pac_script",
			pacScript : {
				url : "https://secure.premiumize.me/" + localStorage["extuid"]
						+ "/proxy.pac?nocache=" + nocache
			}
		};
		chrome.proxy.settings.set({
			value : proxy_config,
			scope : 'regular'
		}, function() {
			localStorage["mode"] = "auto";
			show_proxy_status();
			show_msg("proxy settings updated");
		});
	} catch (err) {
		show_error(JSON.stringify(err));
	}
}
function disable_proxy() {

	try {
		chrome.proxy.settings.set({
			value : {
				"mode" : "direct"
			},
			scope : 'regular'
		}, function() {
			localStorage["mode"] = "direct";
			show_proxy_status();
			show_msg("proxy settings updated");
		});
	} catch (err) {
		show_error(JSON.stringify(err));
	}
}
function disable_proxy_silently() {

	try {
		chrome.proxy.settings.set({
			value : {
				"mode" : "direct"
			},
			scope : 'regular'
		}, function() {
			localStorage["mode"] = "direct";
			show_proxy_status();
		});
	} catch (err) {
		show_error(JSON.stringify(err));
	}
}
function enable_country_proxy(country) {
	try {

		var proxy_config = {
			mode : "pac_script",
			pacScript : {
				url : "https://secure.premiumize.me/pac/" + country + ".pac"
			}
		};
		chrome.proxy.settings.set({
			value : proxy_config,
			scope : 'regular'
		}, function() {
			localStorage["mode"] = country;
			show_proxy_status();
			show_msg("proxy settings updated");
		});
	} catch (err) {
		show_error(JSON.stringify(err));
	}

}
/*
 * @todo inf uture automatically find out and show the proxy status we currently
 * have so it doesnt get mixed up
 */
function show_proxy_status() {
	console.log("getting current mode ...");
	chrome.proxy.settings.get({
		'incognito' : false
	}, function(config) {
		var display = "";
		if (config.value.mode == "system" || config.value.mode == "direct") {
			display = "inactive";
		} else if (config.value.mode == "pac_script") {

			display = localStorage["mode"];
		} else {
			display = config.value.mode;

		}
		$('#current-mode').html(display);
	});
}

$(document)
		.ready(
				function() {

					show_proxy_status();

					if (typeof localStorage["login"] == "string"
							&& localStorage["login"] != "") {

						console
								.log("local login isset, showing area and initiatintg refresh");
						$('#loading-area').show();
						// initiate refresh
						login(localStorage["login"], localStorage["pass"]);
					} else {
						console
								.log("no local login set, showing loggedout area");
						show_area('loggedout');
					}

					// add listeners
					$("#login-button").click(function() {
						hide_msg();
						$('#loggedin-area').hide();
						$('#loggedout-area').hide();
						$('#loading-area').show();

						login($('#login').val(), $('#pass').val());
					});

					$('#login-form').submit(function() {
						// event.preventDefault();
						hide_msg();
						$('#loggedin-area').hide();
						$('#loggedout-area').hide();
						$('#loading-area').show();

						login($('#login').val(), $('#pass').val());
						return false;
					});

					$("#mode-selector").change(function() {
						hide_msg();

						console.log("mode selector clicked with value: ");
						console.log($("#mode-selector").val());
						set_mode($("#mode-selector").val());
					});
					$("#logout-button").click(function() {
						hide_msg();
						logout();
					});
					$("#cancel-loading").click(function() {
						disable_proxy_silently();
						location.reload();
					});

					// start feed
					initfeed();
					// end feed

				});

function initfeed() {
	jQuery(function() {

		jQuery.getFeed({
			url : 'https://secure.premiumize.me/news.rss',
			success : function(feed) {

				jQuery('#result').append(
						'<h2>' + '<a target="_blank" href="' + feed.link + '">' + feed.title
								+ '</a>' + '</h2>');

				var html = '';

				for ( var i = 0; i < feed.items.length && i < 5; i++) {

					var item = feed.items[i];

					html += '<p>' + '<a target="_blank" href="' + item.link + '">'
							+ item.title + '</a>' ;

					html += ' <span class="updated">' + item.updated + '</span></p>';

					//html += '<div>' + item.description + '</div>';
				}

				jQuery('#result').append(html);
			}
		});
	});

}
