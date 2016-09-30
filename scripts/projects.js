'use strict';

(function(module) {

  // constructor function to create projects
  function Project(opts) {
    this.title = opts.title;
    this.author = opts.author;
    this.repoUrl = opts.repoUrl;
    this.published = opts.published;
    this.description = opts.description;
  }

  Project.allProjects = [];

  Project.prototype.toHtml = function() {

    var source = $('#projects-template').html();
    var template = Handlebars.compile(source);

    this.daysAgo = parseInt((new Date() - new Date(this.published)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.published ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

    return template(this);
  };

  Project.loadAll = function(passedData) {
    Project.allProjects = passedData.map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function(nextFunction) {
    if (localStorage.portfolioProjects || localStorage.eTag) {
      $.ajax({
        method: 'HEAD',
        url: '/data/portfolioProjects.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if(eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.getAll(nextFunction);
          } else {
            Project.loadAll(JSON.parse(localStorage.portfolioProjects));
            nextFunction();
          }
        }
      });
    } else {
      Project.getAll(nextFunction);
    }
  };

  Project.getAll = function(nextFunction) {
    $.getJSON('/data/portfolioProjects.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.portfolioProjects = JSON.stringify(responseData);
      nextFunction();
    });
  };

  module.Project = Project;
})(window);
