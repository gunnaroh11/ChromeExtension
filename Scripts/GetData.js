// maybe use chrome local storage area
var storage = chrome.storage.local;

// Handlebars.js template
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['events'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"event\" data-eventid=\"";
  if (helper = helpers.eventid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.eventid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n  <h4 class=\"eventname\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n    <div class=\"location\">";
  if (helper = helpers.location) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.location); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n   <div class=\"eventdate\">";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n   <div class=\"eventinterrest\">";
  if (helper = helpers.interest) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.interest); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n</div>\r\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
})();

// Main application
var App = App || {};
App.inPersoned = {
    Config: {
        EventsDiv: ".eventscontainer",
        Url: "http://inpersoned.com/Activity/Xml.aspx",
        RequestTimeout: 2000,
        ListId: "ActivityList",
        Template: "events"

    },
    // Possibility of calling init with extra config
    Init: function(config){
        var that = this;
        $.extend(that.Config, config);
        that.GetEvents();
    },
    // Get events
    GetEvents: function(){
        var that = this;
        var xhr = new XMLHttpRequest();
        var abortReqTimer = window.setTimeout(function() {
            xhr.abort();
        }, that.Config.RequestTimeout);

        try {
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4)
                    return;              
                if (xhr.responseText) {
                    var xmlDoc = $.parseXML(xhr.responseText);
                    that.DisplayEvents(xmlDoc);
                }
            };
        } catch (e) {
            console.log("error");
        }
        
        xhr.open("GET", that.Config.Url, true);
        xhr.send(null);
    },
    // Display the events
    DisplayEvents: function(xml){
        var that = this;
        var xmlData = $(xml);
        var list = xmlData.find(that.Config.ListId);
        var items = [];
        
        list.each(function(){
            var el = $(this);
            items.push({"name": el.find("EventName").text(), "location": el.find("Location").text(), "date": el.find("StartDate").text(), "eventid": el.find("EventID").text(), "interest": el.find("Interests").text()});
        });

        // Call handlebars template
        var template = Handlebars.templates[that.Config.Template];
        var html = template(items);

        $(that.Config.EventsDiv).hide().html(html).fadeIn('fast','linear');
        that.BindEventClick();
    },
    // Bind click event
    BindEventClick: function(){
        var that = this;
        $(that.Config.EventsDiv+" .event").on("click", function(){
            var eId = this.getAttribute("data-eventid");
            window.open("http://inpersoned.com/Activity/Activity.aspx?id="+eId);

        });
    }
};

// Start application when DOMContentLoaded event is fired
document.addEventListener('DOMContentLoaded', function () {
  App.inPersoned.GetEvents();
});


