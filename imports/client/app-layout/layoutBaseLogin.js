import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

Template.layoutBaseLogin.onRendered(() => {
  const templateInstance = Template.instance();

  const splashScreen = templateInstance.$(".splash-screen");
  const splashTimeout = 250;

  Meteor.setTimeout(() => {
    splashScreen.addClass("toggle-down");
    templateInstance.$(".red-bar").addClass("active");
  }, 100);

  Meteor.setTimeout(() => {
    templateInstance.$(".splash-logo").addClass("active");
  }, splashTimeout);

  Meteor.setTimeout(() => {
    splashScreen.css("position", "absolute");
  }, splashTimeout * 4);
});