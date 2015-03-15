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
  {name: 'Menu 1', hash: 'menu1'},
  {name: 'Menu 2', hash: 'menu2'},
  {name: 'Menu 3', hash: 'menu3'}
];

template.addEventListener('template-bound', function(e) {
  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  currentMenuDisplayed = this.menu[0].hash;
  //document.querySelector('#mainview').insertAdjacentHTML('afterbegin','<div id="mainviewChild">Menu 1</div>');
  createMenuFrag(currentMenuDisplayed);
});

template.menuItemSelected = function(e) {
  var menuNode = e.target.attributes.hash.nodeValue;
  console.log(menuNode);

  if (menuNode != currentMenuDisplayed) {

    if (menuNode == this.menu[0].hash) {

      createMenuFrag(menuNode);

    } else if (menuNode == this.menu[1].hash) {

      createMenuFrag(menuNode);

    } else if (menuNode == this.menu[2].hash) {

      createMenuFrag(menuNode);
    }
    currentMenuDisplayed = menuNode;
  }

  template.route = DEFAULT_ROUTE;
  document.querySelector('#scaffold').closeDrawer();
};

// Functions
function createMenuFrag(node){
  var mainview = document.querySelector('#mainview');
  var mainviewChild = document.querySelector('#' + mvChildId);

  var menufrag = document.createDocumentFragment();
  var menu = document.createElement('p');
  menu.id = mvChildId;
  menu.textContent = node;
  menufrag.appendChild(menu);

  fadeReplace(menufrag,mainviewChild,mainview);
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

})();