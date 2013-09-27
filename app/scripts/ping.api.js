(function(global, undefined) {

  function PingApi(baseUrl) {
    baseUrl || (baseUrl = 'http://pingapp.apiary.io');

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
        url: baseUrl + path
      }
      if (data) {
        options.contentType = 'application/json';
        options.data = data;
      }
      return $.ajax(options)
    }

    // Accounts
    function signIn(email, password) {
      return request('POST', '/session', {
        email: email,
        password: password
      })
    }
    function signOut() {
      return request('DELETE', '/session')
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