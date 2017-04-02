/*
  Written by Duncan Grubbs
  Copyright Duncan Grubbs 2016
  https:/github.com/duncangrubbs
*/

'use strict';

class QuakeNav extends HTMLElement {
  constructor() {
    super();
  }

  createdCallback() {
    console.log('created');
  }

  attachedCallback () {

  }

  detachedCallback () {

  }

  attributeChangedCallback (name, oldValue, newValue) {

  }
}

document.registerElement('quake-nav', QuakeNav);
