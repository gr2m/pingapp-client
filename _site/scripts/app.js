// pingapp-client 0.1.0
// 2013-10-05
//
function setupRouting(t){crossroads.addRoute("foo"),crossroads.addRoute("lorem/ipsum"),crossroads.routed.add(console.log,console),hasher.initialized.add(t.onNavigate),hasher.changed.add(t.onNavigate),hasher.init()}function init(){api=new PingApi,$app=$(".app"),$login=$(".login"),$header=$app.find("> header"),$main=$app.find(".main"),$header.html(JST.header({currentUserEmail:"joe@example.com"})),api.account.isSignedIn()||showLogin(),subscribeToEvents(),setupRouting({onNavigate:navigate})}function navigate(t){switch(crossroads.parse(t),$("html").attr("data-mode","app"),t){case"":return goToDashboard();case"dashboard":return showDashboard();case"newMessage":return showNewMessage();case"login":return showLogin();case"logout":return signOut()}}function goToDashboard(){hasher.setHash("dashboard")}function subscribeToEvents(){var t=$(document.body);t.on("submit",handleSubmit),t.on("click",'a[href^="/"]',handleNavigationClick)}function handleSubmit(t){t.preventDefault();var e=$(t.target);switch(t.target.action){case"login":return handleLoginSubmit(e);case"sendMessage":return handleNewMessageSubmit(e)}}function handleNavigationClick(t){t.preventDefault();var e=$(t.target).attr("href").substr(1);hasher.setHash(e)}function showLogin(){$("html").attr("data-mode","login")}function showDashboard(){$main.html(JST.dashboard({currentUser:{name:api.account.name(),email:api.account.email()}})),api.broadcasts.findAll().then(function(t){$main.html(JST.dashboard({currentUser:{name:api.account.name(),email:api.account.email()},broadcasts:t}))})}function handleNewMessageSubmit(t){var e=t.find("[name=contacts]").val();t.find("[name=text]").val(),e=e.split(/\s*[,;]\s*/),api.broadcasts.add({contact_ids:[123,456],text:"you ok?"}).then(handleNewMessageSuccess).fail(showError)}function handleLoginSubmit(t){var e=t.find("[name=email]").val(),n=t.find("[name=password]").val();api.account.signIn(e,n).then(handleSignIn).fail(showError)}function handleSignIn(t){alert("ohaj, "+t.name),showDashboard()}function showError(t){alert(t)}function signOut(){api.account.signOut().then(handleSignOut).fail(showError)}function handleSignOut(){hasher.setHash("login")}function showNewMessage(){$main.html(JST.sendMessage({}))}var $header,$main,$app,$login,api;$(init);