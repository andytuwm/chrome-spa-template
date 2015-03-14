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
  document.querySelector('#mainview').insertAdjacentHTML('afterbegin','<div id="mainviewChild">Menu 1</div>');
});

template.menuItemSelected = function(e) {
  var menuNode = e.target.attributes.hash.nodeValue;
  console.log(menuNode);

  if (menuNode != currentMenuDisplayed) {

    if (menuNode == this.menu[0].hash) {

      createMenuFrag(mvChildId, this.route, menuNode);

    } else if (menuNode == this.menu[1].hash) {

      createMenuFrag(mvChildId, this.route, menuNode);

    } else if (menuNode == this.menu[2].hash) {

      createMenuFrag(mvChildId, this.route, menuNode);
    }
    currentMenuDisplayed = menuNode;
  }

  template.route = DEFAULT_ROUTE;
  document.querySelector('#scaffold').closeDrawer();
};

})();

function createMenuFrag(id, route, node){
  var mainview = document.querySelector('#mainview');
  var mainviewChild = document.querySelector('#' + id);

  var menufrag = document.createDocumentFragment();
  var menu = document.createElement('p');
  menu.id = id;
  menu.textContent = node;
  menufrag.appendChild(menu);

  if(route == 'one') {
    mainviewChild.classList.add('fade-out');
    setTimeout( function() {
      mainview.replaceChild(menufrag,mainviewChild);
      mainviewChild = document.querySelector('#' + id);
      mainviewChild.classList.add('fade-in');
    },275);
  } else {
    mainview.replaceChild(menufrag,mainviewChild);
    mainviewChild = document.querySelector('#' + id);
    mainviewChild.classList.add('fade-in');
  }
}