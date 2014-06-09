// maybe use chrome local storage area
var storage = chrome.storage.local;


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
                if (xhr.readyState != 4){
                    return;              
                }
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
        var template = Templates.events;
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


