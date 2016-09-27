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

projectView.renderIndexPage = function() {
  Project.all.forEach(function(a){
    $('#projects').append(a.toHtml('#project-template'));
    if($('#category-filter option:contains("' + a.category + '")').length === 0) {
      $('#category-filter').append(a.toHtml('#category-filter-template'));
    };
    if($('#author-filter option:contains("' + a.author + '")').length === 0) {
      $('#author-filter').append(a.toHtml('#author-filter-template'));
    };
  });
  projectView.handleMainNav();
};

projectView.renderIndexPage();
