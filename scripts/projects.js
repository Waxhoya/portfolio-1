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

  var source = $('#projects-template').html();
  var template = Handlebars.compile(source);

  var html = template(this);
  return html;
  // var $newProject = $('#projects .template').clone();
  //
  // $newProject.find('.author').html(this.author);
  // $newProject.find('h1').html(this.title);
  // $newProject.find('.project_body').html(this.description);
  // $newProject.find('time').html(this.completedOn);
  //
  //
  // $newProject.removeClass('template');
  //
  // return $newProject;
};

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
