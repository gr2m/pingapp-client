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

  $header.html( ich.header() );

  if ( api.account.isSignedIn() ) {
    showDashboard()
  } else {
    showLogin()
  }

  subscribeToEvents()
}

function subscribeToEvents () {
  var $body = $(document.body);

  $body.on('submit', '.login form', handleLoginSubmit)
  $body.on('click', '.signOut', handleSignOutClick)
}

function showLogin () {
  $('html').attr('data-mode', 'login')
}
function showDashboard () {
  $main.html( ich.dashboard({
    currentUser: {
      name: api.account.name(),
      email: api.account.email()
    }
  }) );
  var $userListing = $main.find('.user-listing');

  var listings = [];
  listings.push({
    type: 'user',
    name: 'Udeze Kene',
    status: {
      type: 'twitter',
      text: 'Packing my bags for the Nairobi trip...'
    },
    timeAgo: '1hr'
  })
  listings.push({
    type: 'group',
    datetime: '25-02-2013',
    timeAgo: '1hr'
  })
  listings.push({
    type: 'group',
    datetime: '25-02-2013',
    timeAgo: '1hr'
  })
  listings.push({
    type: 'user',
    name: 'Udeze Kene',
    status: {
      type: 'twitter',
      text: 'Packing my bags for the Nairobi trip...'
    },
    timeAgo: '1hr'
  })

  var listingHtml = listings.map(function(listing) {
    if (listing.type == 'user') {
      return ich.dashboardListingUser(listing)
    }

    return ich.dashboardListingGroup(listing)
  })
  $userListing.html(listingHtml )
  $('html').attr('data-mode', 'app')
}

function handleLoginSubmit (event) {
  event.preventDefault();
  $form = $(event.target);
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

function handleSignOutClick ( event ) {
  event.preventDefault();
  api.account.signOut()
  .then( handleSignOut )
  .fail( showError )
}

function handleSignOut () {
  showLogin()
}

// init on DOM loaded
$( init )