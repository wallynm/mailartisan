import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import { _ } from "meteor/underscore";

class RouterClass {
  constructor() {
    this.ready = false;
    this.last = null;
    this.history = [];
    this.historySize = 10;
    this.routingBack = false;

    this.groups = {
      editor: "/editor",
    };

    this.routeChanged = () => {
      return !this.last || this.last.route.name !== FlowRouter.current().route.name;
    };

    this.back = () => {
      this.routingBack = true;
      const route = Router.history.pop();
      const path = route ? route.path : "purchase";
      const params = route ? route.params : {};
      FlowRouter.go(path, params);
    };



  this.triggers = {
    loginRequired: (context, redirect) => {
    },
    setLast: (context) => {
      this.ready = true;
      if (!this.routingBack) {
        this.last = context;
        this.history.push(context);
        this.history.length > this.historySize && this.history.shift();
      }
      this.routingBack = false;
    }
  };

    _.each(this.groups, (url, name) => {
      this.groups[name] = FlowRouter.group({
      prefix: url,
      triggersEnter: [this.triggers.loginRequired],
      triggersExit: [this.triggers.setLast]
    });
  });

    // External groups
    this.groups.affiliateRecruiting = FlowRouter.group({
      prefix: "/affiliate-recruiting",
      triggersExit: [this.triggers.setLast]
    });

    this.groups.resolutionCenter = FlowRouter.group({
      prefix: "/resolution-center"
    });

  }

  renderLayout(layoutStyle, templateToRender, parameters, options) {
    options.containerClass = options.containerClass || options.modal ? "" : "";

    return BlazeLayout.render("layoutBase", {
      style: layoutStyle,
      main: templateToRender,
      params: parameters,
      options: options
    });
  }

  renderModal(templateToRender, parameters, options) {
    const modalOptions = { routed: true, show: true, destroy: true, large: options.modalClass };
    const modal = Blaze.renderWithData(Template.modalsSimple, modalOptions, document.body);
    const $modal = Blaze.TemplateInstance(modal).$(".modal");
    const modalElement = $modal.find(".modal-wrapper")[0];
    const modalData = _.clone(parameters);
    if (window._hmTransferArea) {
      modalData.transferredData = window._hmTransferArea;
      window._hmTransferArea = null;
    }
    return Blaze.renderWithData(Template[templateToRender], modalData, modalElement);
  }

  renderSidebar(templateToRender, parameters, options) {
    const bodyEl = $('.right .sidebar-content');
    const modalOptions = { routed: true, show: true, destroy: true, large: options.modalClass };
    const modalData = _.clone(parameters);
    if (window._hmTransferArea) {
      modalData.transferredData = window._hmTransferArea;
      window._hmTransferArea = null;
    }
    Template.sidebarRight.data = modalData;
    Template.sidebarRight.openSidebar();
    bodyEl.html('');
    return Blaze.renderWithData(Template[templateToRender], modalData, bodyEl.get(0));
  }

  layoutBase(layoutStyle, templateToRender, parameters, options={}) {
    if (options.preRouteDefinitions && _.contains(_.values(parameters), "_")) {
      templateToRender = "paramsSelector";
      layoutStyle = "appLogged";
      options = _.extend(_.clone(options), { modal: true, sidebar: true });
      parameters = options.preRouteDefinitions;
    }
    if(options.sidebar && this.ready){
      return this.renderSidebar(templateToRender, parameters, options);
    }
    if (options.modal && this.ready) {
      return this.renderModal(templateToRender, parameters, options);
    }
    return this.renderLayout(layoutStyle, templateToRender, parameters, options);
  }

  register(routesDefinition, layoutStyle, routingGroup) {
    _.each(routesDefinition, (defs, routeName) => {
      const path = defs[0];
      const template = defs[1];
      const options = defs[2] || {};
      routingGroup.route(path, {
        name: routeName,
        action: (params) => {
        options.extendedParams && _.extend(params, options.extendedParams);
        if (options.preRoute) {
          options.preRouteDefinitions = options.preRoute(params);
          options.preRouteDefinitions.redirect = options.redirect || routeName;
        }
        this.layoutBase(layoutStyle, template, params, options);
      }
    });
  });
  }
}

const Router = new RouterClass();

FlowRouter.notFound = {
	name: "notFound",
	action(params) {
		Router.layoutBase("app", "notFound", params);
	}
};

FlowRouter.route("/", {
	triggersEnter: [Router.triggers.loginRequired],
	action() {
		return FlowRouter.go("dashboard");
	}
});

export { Router };