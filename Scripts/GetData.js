// maybe use chrome local storage area
var storage = chrome.storage.local;
// Timeout for request
var requestTimeout = 2000; 



function GetAllEvents() {    
    var Url = "http://inpersoned.com/Activity/Xml.aspx";
    //var Url = "http://www.verkskraning.is";
    var xmlHttp = new XMLHttpRequest(); 

    // set timeout for request
    var abortReqTimer = window.setTimeout(function() {
        xmlHttp.abort();
    }, requestTimeout);

    try {
        xmlHttp.onreadystatechange = function() {
            if ( xmlHttp.readyState != 4 )
                return;
            
            if ( xmlHttp.responseText ) {
                var xmlDoc = $.parseXML(xmlHttp.responseText;);
                xmlParser(xmlDoc);
            }
        }
    } catch (e) {
        console.log("error");
        //handleError();
    }
    
    xmlHttp.open( "GET", Url, true );
    xmlHttp.send( null );
}

function xmlParser(xml) {

    var activityList = $(xml).find("ActivityList");
    var eventNameList = $(xml).find("EventName");
    activityList.each(function () {
    	
    	var eventcolstr = "";
    	eventcolstr += $(this).find("EventName").text();
    	eventcolstr += $(this).find("StartDate").text();
    	eventcolstr += $(this).find("Location").text();
    	eventcolstr += $(this).find("TargetGender").text();
    	eventcolstr += $(this).find("CreatorName").text();
    	console.log(eventcolstr);
        //$(".main").append('<div class="book"><div class="title">' + $(this).find("Title").text() +   '</div><div class="description">' + $(this).find("Description").text() + '</div><div   class="date">Published ' + $(this).find("Date").text() + '</div></div>');
        //$(".book").fadeIn(1000);
     });
}

document.addEventListener('DOMContentLoaded', function () {
  GetAllEvents();
});