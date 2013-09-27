// This is the JavaScript wrapper for
// the PingApp API (http://ping.ushahidi.com)
//
// I'll make an own module out of it, so that
// it can easily be used in other apps.

(function(global, undefined) {

  function PingApi(baseUrl) {
    baseUrl || (baseUrl = 'http://pingapp.apiary.io');
    var sessionId = localStorage.getItem('sessionId')
    var accountName = localStorage.getItem('name')
    var accountEmail = localStorage.getItem('email')

    var api = {
      account: {
        signIn: signIn,
        signOut: signOut,
        isSignedIn: isSignedIn,
        name: getAccountName,
        email: getAccountEmail,
      },
      contacts: {
        findAll: findAllContacts,
        add: addContact,
        find: findContact,
        update: updateContact,
        remove: removeContact
      },
      broadcasts: {
        findAll: findAllBroadcasts,
        add: addBroadcast,
        find: findBroadcast
      }
    }

    function request(type, path, data) {
      var options = {
        type: type,
        url: baseUrl + path,
        headers: {
          "X-Session-Id": sessionId
        }
      }
      return $.ajax(options)
    }

    function setSessionId( session ) {
      sessionId = session.id;
    }

    function unsetSessionId( session ) {
      sessionId = undefined;
      localStorage.removeItem('sessionId')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }

    // Accounts
    function signIn(email, password) {
      return request('POST', '/session', {
        email: email,
        password: password
      })
      .done( setSessionId )
      .then( function(response) {
        // fake it until you make it
        response.account.name = email;
        response.account.email = email;
        accountName = email
        accountEmail = email
        localStorage.setItem('sessionId', sessionId)
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)

        return response
      })
      .then( function(response) {
        return response.account
      })

    }
    function signOut() {
      return request('DELETE', '/session').then( unsetSessionId )
    }
    function isSignedIn() {
      return !!sessionId;
    }

    function getAccountName() {
      return accountName;
    }
    function getAccountEmail() {
      return accountEmail;
    }

    // Contacts
    function findAllContacts() {
      return request('GET', '/contacts')
    }
    function addContact(properties) {
      return request('POST', '/contacts', properties)
    }
    function findContact(id) {
      return request('GET', '/contacts/' + id)
    }
    function updateContact(newProperties) {
      return request('PUT', '/contacts/' + id, newProperties)
    }
    function removeContact() {
      return request('DELETE', '/contacts/' + id)
    }

    // Broadcasts
    function findAllBroadcasts() {
      return request('GET', '/broadcasts')
    }
    function addBroadcast(properties) {
      return request('POST', '/broadcasts', properties)
    }
    function findBroadcast(id) {
      return request('GET', '/broadcasts/' + id)
    }

    return api
  }

  global.PingApi = PingApi
})(window)