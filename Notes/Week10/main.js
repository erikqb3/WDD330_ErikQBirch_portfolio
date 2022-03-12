import {getJSON, getLocation} from './utilities.js';


const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

async function testGetQuakesForLocation(baseUrl) {
    // call the getLocation function to get the lat/long
    let pos = await getLocation();
    let crd = pos.coords;
    console.log(pos)
    console.log(crd)
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    console.log(latitude);
    console.log(longitude);
    let geoUrl = baseUrl + '&latitude=' + latitude.toString() + '&longitude=' + longitude.toString() + '&maxradiuskm=100'; // add location information here
    console.log(geoUrl);
    // use the url to request the correct quakes 
  
    //log out the quakes for now.
    return geoUrl.toString();
  }


let geoUrl = await testGetQuakesForLocation(baseUrl).toString();
console.log(geoUrl);

await getJSON(geoUrl);

// console.log("HELLOW")
