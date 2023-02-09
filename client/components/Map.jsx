/**
 * ************************************
 *
 * @module  MapPin.jsx
 * @author  Evan
 * @date
 * @description  renders a pin from another user on the map
 *
 * ************************************
 */

import React, { useEffect, useState } from 'react';
import Emoji from './Emoji';
// import { useState } from 'react-redux';
import GoogleMapReact from 'google-map-react';

{
  /* <script src="https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&key=AIzaSyCqyAyw3nBFN4VJSHKk1J5PF0TvJyprN6I" async defer></script> */
}

// // Variables for Google maps
// var map, mapElem, markerImg, infoWindow, marker;
// var markers = [], infoWindows = [];
// var mapOptions = {
//   mapTypeId: 'roadmap',
//   //zoom: 13,
//   //scrollwheel: false,
// };

// function initialize() {
//   markerImg = {
//     url:'https://uploads-ssl.webflow.com/5eccc99006c12394286a75d6/5ece91fe3f5cbbc050274eee_Pin_Principaute.svg',
//     size: new google.maps.Size(46, 57),
//     anchor: new google.maps.Point(23, 54),
//   }

//   // Display a map on the page
//   mapElem = document.getElementById('map_canvas');
//   map = new google.maps.Map(mapElem, mapOptions);
//   map.setTilt(45);

//   // Loop through our array of cars
//   for(i = 0; i < cars.length; i++) {
//     var car = cars[i];

//     // Generate an infowindow content for the marker
//   	var infoWindow = new google.maps.InfoWindow();
//     infoWindow.setContent(
//       '<a href="'+car.url+'"><div class="bg-pic-car" hidden style="background:url('+car.photo+') center/cover no-repeat"></div></a>' +
//       '<p style="color: #54274e;"><b>'+car.name+'</b></p><p>'+car.make+'</p><p>'+car.modal+'</p>'
//     );
//     infoWindows.push(infoWindow);

//     // Place a marker on the map
//     createMarker(car.lat, car.lng, i);
//   }

//   // Center the map fitting all markers on the screen
//   fitToMarkers();
// }

// function createMarker(x, y, i) {
//   marker = new google.maps.Marker({
//     map: map,
//     icon: markerImg,
//     position: new google.maps.LatLng(x,y),
//     title: cars[i].name
//   });
//   marker._index = i;
//   markers.push(marker);

//   // Click event on marker
//   google.maps.event.addListener(marker, 'click', (function(marker, i) {
//     return function() {
//       // Close last opened infowindow if any
//       if(infoWindow) infoWindow.close();
//       // Open clicked infowindow
//       infoWindow = infoWindows[i];
//       infoWindow.open(map, marker);
//     }
//   })(marker, i));

//   // Mouseover event on marker
//   google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
//     return function() {
//       // Close last opened infowindow if any
//       if(infoWindow) infoWindow.close();
//       // Open clicked infowindow
//       infoWindow = infoWindows[i];
//       infoWindow.open(map, marker);
//     }
//   })(marker, i));
// }

// function mapResize() {
//   google.maps.event.trigger(map, "resize");
//   fitToMarkers();
// }

// function fitToMarkers() {
//   map.setZoom(15);
//   var bounds = new google.maps.LatLngBounds();
//   for(var i = 0; i < markers.length; i++) {
//    bounds.extend(markers[i].getPosition());
//   }
//   map.fitBounds(bounds);
//   map.setZoom(14); // zoom out when done so markers on the top can be seen
// }

// // When Webflow has loaded,
// Webflow.push(function() {

// 	// Resize event
//   $(window).resize(function() {

//     // Do nothing if mobile
//     if($(window).width() < 768) return;

//     // Resize map if function is defined
//     if(typeof mapResize === 'function') mapResize();
//   });
// });
// </script>
const markersWorkAround = [];
const dummyData = [
  { name: 'Umacha', lat: 40.8161955, lng: -73.9824127 },
  { name: 'Möge', lat: 40.8163083, lng: -74.0502637 },
  { name: 'Sook Pastry', lat: 40.9791037, lng: -74.1252643 },
];
// for (let el of dummyData) {
//   markersWorkAround.push(<Marker
//     data-testid={'marker'}
//     lat={el.lat}
//     lng={el.lng}
//     text={el.title}
//     description={el.description}
//     key={el}
//   />);
// }

const Marker = (props) => {
  // var infoWindow = new google.maps.InfoWindow();
  // infoWindow.setContent(
  //   '<a href="' +
  //     car.url +
  //     '"><div hidden style="background:url(' +
  //     car.photo +
  //     ') center/cover no-repeat"></div></a>' +
  //     '<p style="color: #54274e;"><b>' +
  //     props.text +
  //     '</b></p><p>' +
  //     car.make +
  //     '</p><p>' +
  //     car.modal +
  //     '</p>'
  // );
  // infoWindows.push(infoWindow);

  return (
    <>
      <img src='https://uploads-ssl.webflow.com/5eccc99006c12394286a75d6/5ece91fe3f5cbbc050274eee_Pin_Principaute.svg'></img>
    </>
  );
};

export default function GMap(props) {
  const defaultProps = {
    //replace center lat and lng as user's current location
    center: {
      lat: 40.7128,
      lng: -74.006,
    },
    zoom: 12,
  };

  const markers = [];

  useEffect(() => {
    for (let el of dummyData) {
      markersWorkAround.push(
        <Marker
          data-testid={'marker'}
          lat={el.lat}
          lng={el.lng}
          text={el.title}
          description={el.description}
          key={el}
        />
      );
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/hangouts/`);
        const data = await response.json();
        for (const el of data) {
          console.log('eeeeeel ' + JSON.stringify(el));
          markers.push(
            <Marker
              data-testid={'marker'}
              lat={el.lat}
              lng={el.lng}
              text={el.title}
              description={el.description}
              key={el}
            />
          );
          console.log(Marker);
        }
        console.log(markers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const successCallback = (position) => {
    // console.log(position.coords);
    defaultProps.center.lat = position.coords.latitude;
    defaultProps.center.lng = position.coords.longitude;
  };
  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAX752zkRKtcHb_kiHAcCtuOMgOJx7lN1g' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markersWorkAround}
      </GoogleMapReact>
    </div>
  );
}
