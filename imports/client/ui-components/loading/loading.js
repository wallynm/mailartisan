import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

Template.appLoading.onRendered(() => {
  const instance = Template.instance();
  if (!instance.data.hideMessages) {
    instance.setMessage = (msgText) => instance.$(".loading-text").text(msgText);
    instance.messages = [
      'tete 1',
      'tete 2',
      'tete 3',
    ];
    instance.intervalId = Meteor.setInterval(() => {
      const msgText = instance.messages.shift();
      msgText ? instance.setMessage(msgText) : Meteor.clearInterval(instance.intervalId);
    }, 10000);
  }
});

Template.appLoading.onDestroyed(() => {
  const instance = Template.instance();
  if (instance.intervalId) {
    Meteor.clearInterval(instance.intervalId);
  }
});
