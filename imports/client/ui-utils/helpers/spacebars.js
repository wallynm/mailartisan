Template.registerHelper("isDevelopment", () => Meteor.isDevelopment);
Template.registerHelper("isProduction", () => Meteor.isProduction);

Template.registerHelper("nested", (property) => Hotmart.nestedProperty(Template.instance(), property));
Template.registerHelper("instance", () => Template.instance());
Template.registerHelper("equals", (a, b) => a === b);
Template.registerHelper("notEquals", (a, b) => a !== b);
Template.registerHelper("gt", (a, b) => a > b);
Template.registerHelper("gte", (a, b) => a >= b);
Template.registerHelper("lt", (a, b) => a < b);
Template.registerHelper("lte", (a, b) => a <= b);

Template.registerHelper("getObjData", (obj, prop) => {
  return obj[prop];
});

Template.registerHelper("log", (data) => console.debug(data));

Template.registerHelper("valueIf", (condition, valueWhenTrue, valueWhenFalse) => {
  return !!condition ? valueWhenTrue : valueWhenFalse;
});

Template.registerHelper("not", value => {
  return !value;
});

Template.registerHelper("notEach", function (valueA, valueB) {
  return !valueA && !valueB;
});

Template.registerHelper("notEmpty", (value) => {
  return value && !_.isEmpty(value);
});

Template.registerHelper("isEmpty", (value) => {
  return _.isEmpty(value);
});

Template.registerHelper("bool", value => {
  return !!value;
});

Template.registerHelper("obj", params => {
  let obj;
  _.each(params, item => {
    if (item instanceof Spacebars.kw) return;
    obj = item;
  });
  return obj;
});

Template.registerHelper("and", function () {
  let result = true;
  _.each(arguments, value => value || (result = false));
  return result;
});

Template.registerHelper("or", function () {
  let result = false;
  _.each(arguments, value => {
    if (value instanceof Spacebars.kw) return;
    value && (result = true);
  });
  return result;
});

Template.registerHelper("choose", function () {
  let result;
  _.each(arguments, value => {
    if (result || value instanceof Spacebars.kw) return;
    value && (result = value);
  });
  return result;
});

Template.registerHelper("sum", function () {
  let result = 0;
  _.each(arguments, value => {
    if (value instanceof Spacebars.kw) return;
    result += value;
  });
  return result;
});

Template.registerHelper("sub", function () {
  let result;
  _.each(arguments, value => {
    if (typeof result === "undefined") return (result = value);
    if (value instanceof Spacebars.kw) return;
    result -= value;
  });
  return result;
});

Template.registerHelper("indexStartingFromOne", (eachIndex) => {
  return eachIndex + 1;
});


Template.registerHelper("length", (arr) => {
  return arr.length;
});