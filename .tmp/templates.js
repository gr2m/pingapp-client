this["JST"] = this["JST"] || {};

this["JST"]["dashboard"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n				<tr>\n					<td><time datetime=\"25-02-2013\">";
  if (stack1 = helpers.created_at) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.created_at; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</time></td>\n					<td>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n					<td>\n						<div class=\"recipients-list\">\n						 ";
  stack1 = helpers.each.call(depth0, depth0.contacts, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							<div class=\"recipient-details\">\n								<ul>\n								";
  stack1 = helpers.each.call(depth0, depth0.contacts, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								</ul>\n							</div>\n						</div>\n\n					</td>\n					<td><i class=\"icon-mail-reply\"></i>2 of 3 replies</td>\n				</tr>\n\n\n    	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							<span class=\"reply\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n							<i class=\"icon-chevron-down\"></i>\n						 ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n									<li><i class=\"reply icon-mail-reply\"> ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</i></li>\n								";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n    		<tr>\n        <td colspan=\"99\">loading ...</td>\n        </tr>\n    	";
  }

  buffer += "<div class=\"col-lg-8 col-lg-offset-2\">\n  <div class=\"module dashboard\">\n    <div class=\"title\">\n      <h3>Broadcasts</h3>\n    </div>\n    <div class=\"content\">\n		<table>\n			<tr>\n				<th class=\"date\">Date</th>\n				<th class=\"message\">Message</th>\n				<th class=\"recipients\">Recipients</th>\n				<th class=\"status\">Status</th>\n			</tr>\n    	";
  stack1 = helpers.each.call(depth0, depth0.broadcasts, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</table>\n      <ul class=\"user-listing\">\n      </ul><!-- /.user-listing -->\n    </div>\n  </div>\n</div>";
  return buffer;
  });

this["JST"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container\">\n  <div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n    <div class=\"logo\">\n      <a href=\"#\"><img src=\"images/logo.png\" alt=\"\"></a>\n    </div>\n  </div>\n  <div class=\"navbar-collapse collapse\">\n\n    <ul class=\"nav navbar-nav navbar-right\">\n      <li><a href=\"\"><i class=\"icon-home\"></i>Home</a></li>\n      <li><a href=\"\"><i class=\"icon-user\"></i>Contacts</a></li>\n      <li><a href=\"\"><i class=\"icon-envelope\"></i>Messages</a></li>\n      <li><a href=\"\"><i class=\"icon-cog\"></i>Settings</a></li>\n      <li class=\"dropdown\">\n        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">";
  if (stack1 = helpers.currentUserEmail) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.currentUserEmail; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " <b class=\"caret\"></b></a>\n        <ul class=\"dropdown-menu\">\n          <li><a href=\"#\">Edit Profile</a></li>\n          <li class=\"signOut\"><a href=\"/logout\">Sign Out</a></li>\n        </ul>\n      </li>\n\n    </ul>\n  </div><!--/.nav-collapse -->\n</div>\n<!-- End of Container -->\n<div class=\"header-title\">\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <h2>Dashboard</h2>\n      <nav class=\"pull-right\">\n        <ul>\n          <li class=\"btn sendMessage\"><a href=\"/newMessage\"><i class=\"icon-envelope\"></i>Send a message</a></li>\n          <li class=\"btn\"><a href=\"#\"><i class=\"icon-plus-sign\"></i>Add a contact</a></li>\n        </ul>\n      </nav>\n    </div>\n  </div>\n  <!-- End of container -->\n</div>";
  return buffer;
  });

this["JST"]["sendMessage"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form action=\"sendMessage\">\n  <h1>Send message!</h1>\n\n  <p>\n    <label>\n      Put in a comma-separated list of phone numbers,\n      emails, or names of existing contacts\n      <textarea name=\"contacts\"></textarea>\n    </label>\n  </p>\n\n  <p>\n    <label>\n      Message (140chars max)\n      <textarea name=\"text\"></textarea>\n    </label>\n  </p>\n\n  <p>\n    <button type=\"submit\" class=\"btn btn-primary\">\n      Send message\n    </button>\n  </p>\n</form>";
  });