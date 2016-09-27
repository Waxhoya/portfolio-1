'use strict';

var projectView = {};

projectView.handleMainNav = function() {
  $('nav').on('click', 'ul li:lt(2)', function() {
    $('#projects').hide();
    $('#about').hide();
    var $text = $(this).text().toLowerCase();
    console.log($text);
    $('#' + $text).show();
  });
  $('nav .tab:first').click(); // not working yet
};
projectView.handleMainNav();
