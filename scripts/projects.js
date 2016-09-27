'use strict';

// constructor function to create projects
function Project(opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.repoUrl = opts.repoUrl;
  this.published = opts.published;
  this.description = opts.description;
}

Projects.all = [];

Project.prototype.toHtml = function() {

  var source = $('#projects-template').html();
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.published)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.published ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var html = template(this); // These lines can
  return html;               //can be consolidated
};

Project.loadAll = function(passedData) {
  forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  if(localStorage.)
};

projectData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.published)) - (new Date(curElem.published));
});

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
