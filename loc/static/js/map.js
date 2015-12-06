/*
var markerSet = [];
var myMarker = {pos: myPos, charity: "example", donationType: "Donation Box", amount: "Unkown"}
markerSet.push(myMarker);
myPos = {lat: 53.462, lng: -2.228}
var myMarker = {pos: myPos, charity: "Just giving 4 u", donationType: "QR Code", amount: "2.00"}
markerSet.push(myMarker);
*/

var myPos = {lat: 53.482, lng: -2.228}
var markerSet = new Array();
var map;


function addMarker(markerOb, index, array) {
    var marker = new google.maps.Marker({
	position: markerOb.pos,
	map: map,
	title: markerOb.charity,
    });

    var contentString = "Charity name: " + markerOb.charity + "<br> Donation Type: " + markerOb.type;

    if (markerOb.amount) {
	contentString = contentString + "<br> Amount Donated: " + markerOb.amount;
    }

    var infowindow = new google.maps.InfoWindow({
	content: contentString
    });


    marker.addListener('click', function() {
	infowindow.open(map, marker);
    });
}


function getMarkerSet() {
    $.get(
	{
	    url: "/donation",
	    success: function(response) {
		map = new google.maps.Map(document.getElementById('map'), {
		    center: myPos,
		    zoom: 15
		});
		markerSet = $.makeArray(response);
		markerSet.forEach(addMarker);
	    }
	}
    );
}




function initMap() {
    getMarkerSet();
}


function createInfoWindow(marker, markerOb) {
    var contentString = "Charity name: "+ markerOb.charity+"\n Donation Type: "+markerOb.type+"\n Amount Donated: "+markerOb.amount;
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map, marker);
}

var mapload = false;
document.onreadystatechange = function(){
    if(document.readyState === 'complete' && !mapload) {
        initMap();
        mapload = true;
    };
};

