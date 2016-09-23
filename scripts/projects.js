'use strict';

// empty to store created project objects
var projects = [];

// constructor function to create projects
function Project(opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.repoUrl = opts.repoUrl;
  this.published = opts.published;
  this.description = opts.description;
}

Project.prototype.toHtml = function() {

  var source = $('#projects-template').html();
  var template = Handlebars.compile(source);

  // var $newProject = $('#projects .template').clone();
  //
  // $newProject.find('.author').html(this.author);
  // $newProject.find('h1').html(this.title);
  // $newProject.find('.project_body').html(this.description);
  // $newProject.find('time').html(this.published);
  //
  //
  // $newProject.removeClass('template');
  //
  // return $newProject;
  this.daysAgo = parseInt((new Date() - new Date(this.published)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.published ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var html = template(this);
  return html;
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
