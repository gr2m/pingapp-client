var $header;
var $main;
var $app;
var $login;
var api;

function init() {
  api = new PingApi();

  $app = $('.app');
  $login = $('.login');
  $header = $app.find('> header');
  $main = $app.find('.main');

  $header.html( JST['header']({currentUserEmail: 'joe@example.com'}) );

  if ( ! api.account.isSignedIn() ) {
    showLogin()
  }

  subscribeToEvents()
  setupRouting({onNavigate: navigate})
}

function navigate(newHash, oldHash){
  crossroads.parse(newHash);

  $('html').attr('data-mode', 'app')
  switch(newHash) {
    case '': return goToDashboard();
    case 'dashboard': return showDashboard();
    case 'newMessage': return showNewMessage();
    case 'login': return showLogin();
    case 'logout': return signOut();
  }
}

function goToDashboard () {
  hasher.setHash('dashboard');
}

function subscribeToEvents () {
  var $body = $(document.body);

  $body.on('submit', handleSubmit)
  $body.on('click', 'a[href^="/"]', handleNavigationClick)
}

function handleSubmit (event) {
  event.preventDefault();
  var $form = $(event.target);
  var action = $form.attr('action')
  switch(action) {
    case 'login': return handleLoginSubmit($form);
    case 'sendMessage': return handleNewMessageSubmit($form);
  }
}
function handleNavigationClick (event) {
  event.preventDefault()
  var path = $(event.target).attr('href').substr(1);
  hasher.setHash(path);
}

function showLogin () {
  $('html').attr('data-mode', 'login')
}
function showDashboard () {
  $main.html( JST['dashboard']({
    currentUser: {
      name: api.account.name(),
      email: api.account.email()
    }
  }) );

  api.broadcasts.findAll().then( function(broadcasts) {
  	$main.html( JST['dashboard']({
		currentUser: {
		  name: api.account.name(),
		  email: api.account.email()
		},
		broadcasts: broadcasts
	  })
	  );
  } )
}

function handleNewMessageSubmit ($form) {
  var contacts = $form.find('[name=contacts]').val()
  var text = $form.find('[name=text]').val()

  // make array out of string
  contacts = contacts.split(/\s*[,;]\s*/)

  // check if all contacts are known
  api.broadcasts.add({
    contact_ids: [123, 456],
    text: 'you ok?'
  })
  .then( handleNewMessageSuccess )
  .fail( showError )
}
function handleNewMessageSuccess (event) {
  alert('message sent')
  hasher.setHash('dashboard');
}
function handleLoginSubmit ($form) {
  var email = $form.find('[name=email]').val();
  var password = $form.find('[name=password]').val();
  api.account.signIn(email, password)
  .then( handleSignIn )
  .fail( showError )
}

function handleSignIn ( account ) {
  alert('ohaj, ' + account.name)
  showDashboard()
}

function showError (error) {
  alert(error)
}

function signOut ( ) {
  api.account.signOut()
  .then( handleSignOut )
  .fail( showError )
}

function handleSignOut () {
  hasher.setHash('login');
}

function showNewMessage () {
  $main.html( JST['sendMessage']({

  }) );
}

// init on DOM loaded
$( init )