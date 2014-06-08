

(function() {
  if (! window.jQuery ) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'; // you can change this url by latest jQuery version
    (document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]).appendChild(s);
  }
}());

var xmlHttp = null;

function GetAllEvents()
{    
    var Url = "inpersoned.com/Activity/Xml.aspx";
    //var Url = "http://www.verkskraning.is";
    xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = ProcessRequest;
    xmlHttp.open( "GET", Url, true );
    xmlHttp.send( null );
}

function ProcessRequest() 
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) 
    {
        if ( xmlHttp.responseText == "Not found" ) 
        {
            alert('not found !!!');
        }
        else
        {
        	alert('woohoo found');
        	var elemContainer = document.getElementById("ActivityList");
        	//elemContainer.innerHTML=xmlhttp.responseText;
            //var info = eval ( "(" + xmlHttp.responseText + ")" );
            var info = elemContainer.innerHTML;
            xmlParser(info);
            alert(info);
        }                    
    }
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
	alert(eventcolstr);
    //$(".main").append('<div class="book"><div class="title">' + $(this).find("Title").text() +   '</div><div class="description">' + $(this).find("Description").text() + '</div><div   class="date">Published ' + $(this).find("Date").text() + '</div></div>');
    //$(".book").fadeIn(1000);
 });

}