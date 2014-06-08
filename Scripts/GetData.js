function getallevents(){

var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  	var Url = "inpersoned.com/Activity/Xml.aspx";
  	xmlHttp.onreadystatechange = ProcessRequest;
	xmlhttp.open("GET",Url,true);
	xmlhttp.send(null);
	
}

function ProcessRequest () {
	// body...
}


var xmlHttp = null;

function GetCustomerInfo()
{
    window.location.href = "http://www.verkskraning.is";//"http://inpersoned.com/Activity/Xml.aspx";
    //var Url = "inpersoned.com/Activity/Xml.aspx";
    var Url = "http://www.verkskraning.is";
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
        	
            //var info = eval ( "(" + xmlHttp.responseText + ")" );
            var info = xmlHttp.responseText;
            // No parsing necessary with JSON!  
            console.log(info);      
            
        }                    
    }
}