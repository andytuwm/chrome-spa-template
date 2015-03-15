(function() {
"use strict";

var DEFAULT_ROUTE = 'one';
var template = document.querySelector('#t');
var mvChildId = "mainviewChild";
var currentMenuDisplayed;

template.pages = [
  {name: 'MainView', hash: 'one'},
  {name: 'SecondaryView 1', hash: 'two'},
  {name: 'SecondaryView 2', hash: 'three'}
];

template.menu = [
  {name: 'Menu 1', hash: 'menu1', fcache: null},
  {name: 'Menu 2', hash: 'menu2', fcache: null},
  {name: 'Menu 3', hash: 'menu3', fcache: null}
];

// Initializing function that runs once the template has been prepped for databinding
template.addEventListener('template-bound', function(e) {
  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  currentMenuDisplayed = this.menu[0].hash;
  createMenuFrag(currentMenuDisplayed); // Initialize Main View
});

// Function that runs on menu item click in the scaffold drawer
template.menuItemSelected = function(e) {
  // Check what menu item was selected
  var menuNode = e.target.attributes.hash.nodeValue;
  console.log(menuNode);

  // If selected item is the same one, no need to change the DOM
  if (menuNode != currentMenuDisplayed) {
    // If selected menu item does not have a fragment, create and append.
    // Customize each view accordingly
    if (menuNode == this.menu[0].hash && this.menu[0].fcache === null) {
      this.menu[0].fcache = createMenuFrag(menuNode);
    } else if (menuNode == this.menu[1].hash && this.menu[1].fcache === null) {
      this.menu[1].fcache = createMenuFrag(menuNode);
    } else if (menuNode == this.menu[2].hash && this.menu[2].fcache === null) {
      this.menu[2].fcache = createMenuFrag(menuNode);
    }
    // If the selected menu item already has a fragment, load the fragment instead.
    // Once again, customize each view aaccordingly.
    else if (menuNode == this.menu[0].hash) {
      loadFrag(this.menu[0].fcache.cloneNode(true));
    } else if (menuNode == this.menu[1].hash) {
      loadFrag(this.menu[1].fcache.cloneNode(true));
    } else if (menuNode == this.menu[2].hash) {
      loadFrag(this.menu[2].fcache.cloneNode(true));
    }
    currentMenuDisplayed = menuNode;
  }

  template.route = DEFAULT_ROUTE; // route the user back to main view
  document.querySelector('#scaffold').closeDrawer();
};

/* Functions */

// Duplicate this function for each menu UI
function createMenuFrag(menuNode){
  var mainview = document.querySelector('#mainview');
  var mainviewChild = document.querySelector('#' + mvChildId);

  // create DOM fragment to manipulate and then append
  var menufrag = document.createDocumentFragment();
  var menu = document.createElement('p');
  menu.id = mvChildId;
  menu.textContent = menuNode;
  menufrag.appendChild(menu);
  fadeReplace(menufrag,mainviewChild,mainview);

  return menufrag.cloneNode(true); // clone the node for reuse
}

// Handles fade in/out of the mainview menu views
function fadeReplace(frag, child, parent) {
  if(template.route == 'one') {
    child.classList.add('fade-out'); // fade out
    setTimeout( function() {
      parent.replaceChild(frag,child);
      child = document.querySelector('#' + mvChildId);
      child.classList.add('fade-in'); // fade in
    },275); // wait 275 ms before replacing to allow fadeout animation (300ms) to run
  } else { // if not on main view, no need for fade out animation
    parent.replaceChild(frag,child);
    child = document.querySelector('#' + mvChildId);
    child.classList.add('fade-in');
  }
}

// Duplicate this function for each menu UI as well if certain views require
// populating data (eg. with xhr)
function loadFrag(frag) {
  var mainview = document.querySelector('#mainview');
  var mainviewChild = document.querySelector('#' + mvChildId);
  fadeReplace(frag,mainviewChild,mainview);
}

})();