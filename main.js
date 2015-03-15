(function() {
"use strict";

var DEFAULT_ROUTE = 'one';
var template = document.querySelector('#t');
var mvChildId = "mainviewChild";
var currentMenuDisplayed;
var fragmentcache_1, fragmentcache_2, fragmentcache_3;

template.pages = [
  {name: 'MainView', hash: 'one'},
  {name: 'SecondaryView 1', hash: 'two'},
  {name: 'SecondaryView 2', hash: 'three'}
];

template.menu = [
  {name: 'Menu 1', hash: 'menu1'},
  {name: 'Menu 2', hash: 'menu2'},
  {name: 'Menu 3', hash: 'menu3'}
];

template.addEventListener('template-bound', function(e) {
  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  currentMenuDisplayed = this.menu[0].hash;
  createMenuFrag(currentMenuDisplayed); // Initialize Main View
});

template.menuItemSelected = function(e) {
  var menuNode = e.target.attributes.hash.nodeValue;
  console.log(menuNode);

  if (menuNode != currentMenuDisplayed) {

    if (menuNode == this.menu[0].hash && typeof fragmentcache_1 === 'undefined') {

      fragmentcache_1 = createMenuFrag(menuNode);

    } else if (menuNode == this.menu[1].hash && typeof fragmentcache_2 === 'undefined') {

      fragmentcache_2 = createMenuFrag(menuNode);

    } else if (menuNode == this.menu[2].hash && typeof fragmentcache_3 === 'undefined') {

      fragmentcache_3 = createMenuFrag(menuNode);

    } else if (menuNode == this.menu[0].hash) {

      loadFrag(fragmentcache_1.cloneNode(true));

    } else if (menuNode == this.menu[1].hash) {

      loadFrag(fragmentcache_2.cloneNode(true));

    } else if (menuNode == this.menu[2].hash) {

      loadFrag(fragmentcache_3.cloneNode(true));

    }
    currentMenuDisplayed = menuNode;
  }

  template.route = DEFAULT_ROUTE;
  document.querySelector('#scaffold').closeDrawer();
};

// Functions
function createMenuFrag(menuNode){
  var mainview = document.querySelector('#mainview');
  var mainviewChild = document.querySelector('#' + mvChildId);

  var menufrag = document.createDocumentFragment();
  var menu = document.createElement('p');
  menu.id = mvChildId;
  menu.textContent = menuNode;
  menufrag.appendChild(menu);
  fadeReplace(menufrag,mainviewChild,mainview);

  return menufrag.cloneNode(true);
}

function fadeReplace(frag, child, parent) {
  if(template.route == 'one') {
    child.classList.add('fade-out');
    setTimeout( function() {
      parent.replaceChild(frag,child);
      child = document.querySelector('#' + mvChildId);
      child.classList.add('fade-in');
    },275);
  } else {
    parent.replaceChild(frag,child);
    child = document.querySelector('#' + mvChildId);
    child.classList.add('fade-in');
  }
}

function loadFrag(frag) {
  var mainview = document.querySelector('#mainview');
  var mainviewChild = document.querySelector('#' + mvChildId);
  fadeReplace(frag,mainviewChild,mainview);
}

})();