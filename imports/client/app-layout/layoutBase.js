import { Template } from "meteor/templating";
import { Router } from "../app-router";

Template.layoutBase.onRendered(() => {
  const instance = Template.instance();

  instance.autorun(() => {
    FlowRouter.watchPathChange();
    instance.$(".start-container").addClass("active");
  });
});