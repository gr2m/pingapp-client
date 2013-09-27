// This is the JavaScript wrapper for
// the PingApp API (http://ping.ushahidi.com)
//
// I'll make an own module out of it, so that
// it can easily be used in other apps.

(function(global, undefined) {

  function PingApi(baseUrl) {
    baseUrl || (baseUrl = 'http://pingapp.apiary.io');
    sessionId = localStorage.getItem('sessionId')

    var api = {
      account: {
        signIn: signIn,
        signOut: signOut,
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
      if (data) {
        options.contentType = 'application/json';
        options.data = data;
      }
      return $.ajax(options)
    }

    function setSessionId( session ) {
      sessionId = session.id;
    }

    function unsetSessionId( session ) {
      sessionId = undefined;
    }

    // Accounts
    function signIn(email, password) {
      return request('POST', '/session', {
        email: email,
        password: password
      }).then( setSessionId )
    }
    function signOut() {
      return request('DELETE', '/session').then( unsetSessionId )
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