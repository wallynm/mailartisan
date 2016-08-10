import { FlowRouter } from "meteor/kadira:flow-router";
import { Vulcano } from "/imports/client/app-context";

// Ovewriting original FlowRouter.path to use _ character for non given parameters
FlowRouter.path = function (pathDef, fields, queryParams) {
  if (this._routesMap[pathDef]) {
    pathDef = this._routesMap[pathDef].pathDef;
  }

  var path = "";

  // Prefix the path with the router global prefix
  if (this._basePath) {
    path += "/" + this._basePath + "/";
  }

  fields = fields || {};
  var regExp = /(:[\w\(\)\\\+\*\.\?]+)+/g;
  path += pathDef.replace(regExp, function(key) {
    var firstRegexpChar = key.indexOf("(");
    // get the content behind : and (\\d+/)
    key = key.substring(1, (firstRegexpChar > 0)? firstRegexpChar: undefined);
    // remove +?*
    key = key.replace(/[\+\*\?]+/g, "");

    // this is to allow page js to keep the custom characters as it is
    // we need to encode 2 times otherwise "/" char does not work properly
    // So, in that case, when I includes "/" it will think it's a part of the
    // route. encoding 2times fixes it
    return encodeURIComponent(encodeURIComponent(fields[key] || "_"));
  });

  // Replace multiple slashes with single slash
  path = path.replace(/\/\/+/g, "/");

  // remove trailing slash
  // but keep the root slash if it's the only one
  path = path.match(/^\/{1}$/) ? path: path.replace(/\/$/, "");

  // explictly asked to add a trailing slash
  if(this.env.trailingSlash.get() && _.last(path) !== "/") {
    path += "/";
  }

  var strQueryParams = this._qs.stringify(queryParams || {});
  if(strQueryParams) {
    path += "?" + strQueryParams;
  }

  return path;
};

Vulcano.resetQueryParams =  (paramToIgnore = "tab") => {
  const queryParams = FlowRouter.current().queryParams || {};
  const paramsReset = _.map(queryParams, (param, objKey) => {
    const newParam = {};
    newParam[objKey] = objKey === paramToIgnore ? param : null;
    FlowRouter.setQueryParams(newParam);
  });
};

Vulcano.resolveUrl = (route, params, queryParams) => {
  if (!route) return;
  return FlowRouter.path(route, params, queryParams);
};

Vulcano.redirect = (route) => {
  return FlowRouter.go(route);
};

Vulcano.redirectWithState = (route) => {
  FlowRouter.withReplaceState(() => {
    return Vulcano.redirect(route);
  });
};

Vulcano.redirectIfVarIsEmpty = (variable, route) => {
  if (!variable || _.isEmpty(variable)) {
    return Vulcano.redirectWithState(route);
  }
};

Vulcano.transferData = (instance, data) => {
  instance._transferArea || (instance._transferArea = []);
  instance._transferArea.push(data);
  return {
    "data-transfer": instance._transferArea.length - 1,
    "data-template": instance.view.name
  };
};

Template.registerHelper("currentParams", () => FlowRouter.current().params);

Template.registerHelper("currentRoute", () => FlowRouter.current());

Template.registerHelper("routeName", () => FlowRouter.current().route.name);

Template.registerHelper("getQueryParam", (param) => FlowRouter.getQueryParam(param));

Template.registerHelper("getPathFor", (name, params, queryParams) => {
  return Vulcano.resolveUrl(name, params, queryParams);
});

Template.registerHelper("redirect", path => {
  return { "data-redirect": path };
});

Template.registerHelper("transfer", data => {
  return Vulcano.transferData(Template.instance(), data);
});