/*
  Written by Duncan Grubbs
  Copyright Duncan Grubbs 2016
  https:/github.com/duncangrubbs
*/

'use strict';

class FeatureCard extends HTMLElement {
  constructor() {
    super();

    console.log('yo');
  }

  createdCallback () {
    console.log('feature');
  }

  static get observedAttributes() {
    return ['crazy', 'img'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    console.log('changed');
    if (name == 'title') {
      console.log(newValue);
    } else if(name == 'img') {
      console.log(newValue);
    }
  }
}

document.registerElement('feature-card', FeatureCard);
