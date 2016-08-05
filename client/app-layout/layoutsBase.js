import { Template } from "meteor/templating";
import { Router } from "/imports/client/app-router";

Template.layoutsBase.onRendered(() => {
  const instance = Template.instance();

  instance.autorun(() => {
    FlowRouter.watchPathChange();
    instance.$(".start-container").addClass("active");
  });
});