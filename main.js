(function() {
"use strict";

var DEFAULT_ROUTE = 'one';
var template = document.getElementById('t');
var mvChildId = "mainview";
var currentMenuDisplayed;
var menutemplates;

template.pages = [
  {name: 'MainView', hash: 'one'},
  {name: 'SecondaryView 1', hash: 'two'},
  {name: 'SecondaryView 2', hash: 'three'}
];

// Template for the menu. If update to UI is not needed, can clone the fragment
// into fcache for reuse.
template.menu = [
  {name: 'Menu 1', hash: 'menu1', fcache: null},
  {name: 'Menu 2', hash: 'menu2', fcache: null},
  {name: 'Menu 3', hash: 'menu3', fcache: null}
];

// Initializing function that runs once the template has been prepped for databinding
template.addEventListener('template-bound', function() {
  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  currentMenuDisplayed = this.menu[0].hash;
  var mt = document.getElementById('menutemplates');
  menutemplates = mt.import; // Initialize a variable to access menutemplates.html
  loadTemplate(currentMenuDisplayed); // Initialize main view
});

// Function that runs on menu item click in the scaffold drawer
template.menuItemSelected = function(e) {
  // Check what menu item was selected
  var menuNode = e.target.attributes.hash.nodeValue;
  console.log(menuNode);

  // If selected item is the same one, no need to change the DOM
  if (menuNode != currentMenuDisplayed) {
    // Load the template UI defined in menutemplates.html
    if (menuNode == this.menu[0].hash) {
      loadTemplate(menuNode);
    } else if (menuNode == this.menu[1].hash) {
      loadTemplate(menuNode);
    } else if (menuNode == this.menu[2].hash) {
      loadTemplate(menuNode);
    }
    currentMenuDisplayed = menuNode;
  }

  template.route = DEFAULT_ROUTE; // route the user back to main view
  document.querySelector('#scaffold').closeDrawer();
};

/* Functions */

// Handles fade in/out of the mainview menu views
function fadeReplace(frag, child, parent) {
  if(template.route == 'one') {
    child.classList.add('fade-out'); // fade out
    setTimeout( function() {
      parent.replaceChild(frag,child);
      child = document.getElementById(mvChildId);
      child.classList.add('fade-in'); // fade in
    },275); // wait 275 ms before replacing to allow fadeout animation (300ms) to run
  } else { // if not on main view, no need for fade out animation
    parent.replaceChild(frag,child);
    child = document.getElementById(mvChildId);
    child.classList.add('fade-in');
  }
}

// If no need to reload the view, can reuse fragments saved to a variable.
// When appending/saving, remember to use frag.cloneNode(true);
function loadFrag(frag) {
  var child = document.getElementById(mvChildId);
  fadeReplace(frag,child,child.parentNode);
}

// Load template view
function loadTemplate(templateId) {
  var t = menutemplates.getElementById(templateId);
  var child = document.getElementById(mvChildId);
  fadeReplace(document.importNode(t.content,true),child,child.parentNode);
}

})();