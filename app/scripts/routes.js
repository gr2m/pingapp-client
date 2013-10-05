function setupRouting( options ) {

  //setup crossroads
  crossroads.addRoute('foo');
  crossroads.addRoute('lorem/ipsum');
  crossroads.routed.add(console.log, console); //log all routes

  hasher.initialized.add(options.onNavigate); //parse initial hash
  hasher.changed.add(options.onNavigate); //parse hash changes
  hasher.init(); //start listening for history change
}