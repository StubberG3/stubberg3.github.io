'use strict';

var $navLinks = {};
var $sections = {};
var sectionIdToNavLink = {};

$(document).ready(function() {
  // cache the navigation links
  $navLinks = $('.nav-link');
  // cache (in reversed order) the sections
  $sections = $($('.section-heading-desktop').get().reverse());

  // map each section id to their corresponding navigation link
  sectionIdToNavLink = {};
  $sections.each(function() {
      var id = $(this).attr('id');
      sectionIdToNavLink[id] = $('[data-nav-link="' + id + '"]');
  });

  $(window).scroll( highlightNavigation );
});

function highlightNavigation() {
  // nav is hidden on small screens
  if ($(window).width() < 993) {
    return;
  }

  // get the current vertical position of the scroll bar
  var scrollPosition = $(window).scrollTop();

  // iterate the sections
  $sections.each(function() {
      var currentSection = this;
      // get the position of the section
      var sectionTop = currentSection.getBoundingClientRect().top;

      // if the user has scrolled over the top of the section
      if (scrollPosition >= sectionTop) {
          // get the section id
          var id = currentSection.id;
          // get the corresponding navigation link
          var $navLink = sectionIdToNavLink[id];
          // if the link is not active
          if (!$navLink.hasClass('active')) {
              // remove .active class from all the links
              $navLinks.removeClass('active');
              // add .active class to the current link
              $navLink.addClass('active');
          }
          // we have found our section, so we return false to exit the each loop
          return false;
      }
  });
}