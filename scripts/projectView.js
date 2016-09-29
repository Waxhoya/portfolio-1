'use strict';

$('#about').hide();

(function(module) {

  var projectView = {};

  projectView.handleTitleFilter = function() {
    $('#title-filter').on('change', function() {
      if($(this).val()) {
        $('article').hide();
        $('article[data-title="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#author-filter').val('');
    });
  };

  projectView.handleMainNav = function() {
    $('nav').on('click', 'ul li:lt(2)', function() {
      $('#projects').hide();
      $('#about').hide();
      var $text = $(this).text().toLowerCase();
      console.log($text);
      $('#' + $text).show();
    });
  };

  projectView.renderIndexPage = function() {
    Project.allProjects.forEach(function(a){
      if($('#title-filter option:contains("' + a.title + '")').length === 0) {
        $('#category-filter').append(a.toHtml('#title-filter-template'));
      };
      if($('#author-filter option:contains("' + a.author + '")').length === 0) {
        $('#author-filter').append(a.toHtml('#author-filter-template'));
      };
      $('#projects').append(a.toHtml($('#project-template')));
    });
    projectView.handleMainNav();
    projectView.handleTitleFilter();
  };
  Project.fetchAll(projectView.renderIndexPage);
  module.projectView = projectView;
})(window);
