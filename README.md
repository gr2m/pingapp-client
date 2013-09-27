PingApp Client
================

HTML5 client for http://ping.ushahidi.com/

Setup
-----

The PingApp Cient is using [Grunt](http://gruntjs.com/getting-started),
which depends on [Node.js](http://nodejs.org/).

To install all dependencies, run

```
npm install
```

Start the app
--------------

```
grunt server
````

Working with the Ping API
-------------------------

I've created a JavaScript SDK to interact with the
Ping API. It looks as follows

```js
// initialize the API
api = new PingApi()

// you can optionally pass a custom endpoint for the api
api = new PingApi('http://localhost:8880/api')

// sing in / out
api.account.signIn('joe@example.com', 'secret')
api.account.signOut()

// contacts
api.contacts.findAll()
api.contacts.add({ name: "joe", phone: "+254 716 123 456"})
api.contacts.find(123) // pass ID of existing contact
api.contacts.update({name: 'funky joe'})
api.contacts.remove(123)

// broadcasts
api.broadcasts.findAll()
api.broadcasts.add({ contact_ids: [123, 456], message: 'you okay? '})
api.broadcasts.find(123)
```

Every method returns a [jQuery promise] as it's returned from jQuery's
[ajax method](http://api.jquery.com/jQuery.ajax/). For example

```js
api.account.signIn('joe@example.com', 'secret')
.then( showWelcomeAlert )
.fail( showError )
```