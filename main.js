(function() {
"use strict";

var DEFAULT_ROUTE = 'one';
var template = document.querySelector('#t');

template.pages = [
  {name: 'MainView', hash: 'one'},
  {name: 'SecondaryView 1', hash: 'two'},
  {name: 'SecondaryView 2', hash: 'three'}
];

template.menu = [
  {name: 'Menu 1', hash: 'menu1', url: '/samplemenu.html'},
  {name: 'Menu 2', hash: 'menu2', url: '/samplemenu.html'},
  {name: 'Menu 3', hash: 'menu3', url: '/samplemenu.html'}
];

template.addEventListener('template-bound', function(e) {
  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
});

template.menuItemSelected = function(e) {
  console.log(e.target.attributes.hash.nodeValue);
  template.route = 'one';
  document.querySelector('#scaffold').closeDrawer();
  var mainview = document.querySelector('#mainview');
  mainview.insertAdjacentHTML('afterbegin','<p>hello</p>');
};

})();