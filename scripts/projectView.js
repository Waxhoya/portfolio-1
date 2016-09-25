'use strict';

var projectView = {};

projectView.handleMainNav = function() {
  $('.main-nav .tab:last').on('click', function() {
    console.log('click');
    $('#projects').fadeOut();
    $('#about').fadeIn();
  });
  $('.main-nav .tab:first').on('click', function() {
    $('#about').fadeOut();
    $('#projects').fadeIn();
  });
  $('.main-nav .tab:first').click();
};
