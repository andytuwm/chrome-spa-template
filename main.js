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
  {name: 'Menu 1', hash: 'menu1', url: '/samplemenu.html'},
  {name: 'Menu 2', hash: 'menu2', url: '/samplemenu.html'},
  {name: 'Menu 3', hash: 'menu3', url: '/samplemenu.html'}
];

template.addEventListener('template-bound', function(e) {
  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  currentMenuDisplayed = template.menu[0].hash;
  document.querySelector('#mainview').insertAdjacentHTML('afterbegin','<div id="mainviewChild">Menu 1</div>');
});

template.menuItemSelected = function(e) {
  var menuNode = e.target.attributes.hash.nodeValue;
  console.log(menuNode);
  template.route = DEFAULT_ROUTE;
  document.querySelector('#scaffold').closeDrawer();


  if (menuNode != currentMenuDisplayed) {

    if (menuNode == this.menu[0].hash) {

      createMenuFrag(mvChildId, menuNode);

    } else if (menuNode == this.menu[1].hash) {

      createMenuFrag(mvChildId, menuNode);

    } else if (menuNode == this.menu[2].hash) {

      createMenuFrag(mvChildId, menuNode);
    }
    currentMenuDisplayed = menuNode;
  }

};

})();

function createMenuFrag(id, node){

  var mainview = document.querySelector('#mainview');
  var mainviewChild = document.querySelector('#' + id);
  var menufrag = document.createDocumentFragment();
  var menu = document.createElement('p');
  menu.id = id;
  menu.textContent = node;
  menufrag.appendChild(menu);
  mainview.replaceChild(menufrag,mainviewChild);

}