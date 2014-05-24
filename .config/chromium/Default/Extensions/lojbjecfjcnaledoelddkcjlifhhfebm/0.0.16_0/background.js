
chrome.webRequest.onAuthRequired.addListener(handleAuthRequest,
  {urls: ["<all_urls>"]}, ["asyncBlocking"]);


function handleAuthRequest(details, callback) {
	console.log("authrequest reciebed");
	console.log(details);
  if (details.isProxy === true && localStorage["mode"] != 'direct' && localStorage["mode"] != 'inactive'){
	  console.log("it is proxy. dumping local storage");
	  console.log(localStorage);
	  console.log("responding with authorization creedentials from local storage");
	  
	callback({authCredentials: {username: localStorage['login'],
                              password: localStorage['pass']}});
   }
     callback();

}
