'use strict';

// empty to store created project objects
var projects = [];

// constructor function to create projects
function Project(opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.repoUrl = opts.repoUrl;
  this.completedOn = opts.completedOn;
  this.description = opts.description;
}

Project.prototype.toHtml = function() {
  var $newProject = $('projects.template').clone();

  $newProject.find('.author').html(this.author);
  $newProject.find('h1').html(this.title);


  $newProject.removeClass('template');

  return $newProject;
};

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
