var $header;
var $main;
var $app;

function init() {
  $app = $('.app');
  $header = $app.find('> header');
  $main = $app.find('.main');

  $header.html( ich.header() );

  showDashboard()
}

function showDashboard () {
  $main.html( ich.dashboard() );
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
  $app.show()
}

// init on DOM loaded
$( init )