function localData() {
  location.href = 'html/localdata.html';
}

function personalData() {
  location.href = 'html/personaldata.html';
}

function safteyData() {
  location.href = 'html/safteydata.html';
}

var $logo = document.querySelector('#logo');

function addListeners() {
  if (window.addEventListener) {
    $logo.addEventListener('mouseover', backButton, false);
  } else {
    console.log('RIP');
  }
}

function backButton() {
  console.log('Test');
}

window.onload = addListeners;
