'use strict';

// constructor function to create projects
function Project(opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.repoUrl = opts.repoUrl;
  this.published = opts.published;
  this.description = opts.description;
}

Project.all = [];

Project.prototype.toHtml = function() {

  var source = $('#projects-template').html();
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.published)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.published ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var html = template(this); // These lines can
  return html;               //can be consolidated
};

Project.loadAll = function(passedData) {
  passedData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  if(localStorage.portfolioProjects) {
    var storedData = JSON.parse(localStorage.getItem('portfolioProjects'));
    Project.loadAll(storedData);
    console.log('Stored data loaded', storedData);
  } else {
    $.ajax('/data/portfolioProjects.json', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
  }
};

function successHandler(data) {
  Project.loadAll(data);
  localStorage.setItem('portfolioProjects', JSON.stringify(data));
  console.log('Data retrieved:', data);
  projectView.renderIndexPage();
}

function errorHandler(error) {
  console.log('ERROR!', error);
}

Project.fetchAll();

// projectData.sort(function(curElem, nextElem) {
//   return (new Date(nextElem.published)) - (new Date(curElem.published));
// });
//
// projectData.forEach(function(ele) {
//   projects.push(new Project(ele));
// });
//
// projects.forEach(function(a) {
//   $('#projects').append(a.toHtml());
// });
