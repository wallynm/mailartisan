// import { Meteor } from "meteor/meteor";
// import { Template } from "meteor/templating";
// import { Tracker } from "meteor/tracker";
// import { _ } from "meteor/underscore";

// const CONNECTION_TIMEOUT = 10000;
// const RECONNECT_INTERVAL = 5000;
// let intervalId = null;

// BaseApp.showConnectionIssue = new ReactiveVar(false);

// Meteor.startup(() => {
// 	BaseApp = {};
//   setTimeout(() => {
// 	  BaseApp.showConnectionIssue.set(true);
//   }, CONNECTION_TIMEOUT);
// });

// function reconnectToServer(timeout, verbose) {
//   if (verbose) console.debug("[Connection] Initializing reconnection...");
//   Tracker.autorun(() => {
//     if (!intervalId) {
//       if (Meteor.status().connected === false) {
//         intervalId = Meteor.setInterval(() => {
//           if (verbose) console.debug("[Connection] Reconnecting... Status: " + Meteor.status().status);
//           Meteor.reconnect();
//           if (verbose) console.debug("[Connection] Reconnecting... Status: " + Meteor.status().status);
//         }, timeout);
//       }
//     } else {
//       if (Meteor.status().status === "connected") {
//         if (verbose) console.debug("[Connection] Status: " + Meteor.status().status);
//         Meteor.clearInterval(intervalId);
//         intervalId = null;
//       }
//     }
//   });
// }

// Template.connectionIssue.onCreated(() => {
//   reconnectToServer(RECONNECT_INTERVAL, true);
// });

// Template.connectionIssue.helpers({
//   hlpConnectionStatus() {
//     return BaseApp.showConnectionIssue.get() === true && Meteor.status().connected === false;
//   }
// });
