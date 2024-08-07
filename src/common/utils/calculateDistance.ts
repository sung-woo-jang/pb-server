import proj4 from 'proj4';
import * as turf from '@turf/turf';

// UTMK (Naver Maps) to WGS84 conversion definition
proj4.defs(
  'UTMK',
  '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs'
);

interface UTMKCoordinate {
  mapx: number;
  mapy: number;
}

interface WGS84Coordinate {
  lat: number;
  lon: number;
}

function convertUTMKtoWGS84(x: number, y: number): WGS84Coordinate {
  const [lon, lat] = proj4('UTMK', 'WGS84', [x, y]);
  return { lat, lon };
}

function calculateDistance(utmk1: UTMKCoordinate, utmk2: UTMKCoordinate): number {
  // Convert UTMK coordinates to WGS84
  const point1 = convertUTMKtoWGS84(utmk1.mapx, utmk1.mapy);
  const point2 = convertUTMKtoWGS84(utmk2.mapx, utmk2.mapy);

  // Create Turf points
  const from = turf.point([point1.lon, point1.lat]);
  const to = turf.point([point2.lon, point2.lat]);

  // Calculate distance
  return turf.distance(from, to, 'kilometers');
}

// Example usage
const point1: UTMKCoordinate = { mapx: 1266540756, mapy: 374665222 };
const point2: UTMKCoordinate = { mapx: 1266540000, mapy: 374665000 }; // Example second point

const distance = calculateDistance(point1, point2);
console.log(`The distance between the two points is ${distance.toFixed(2)} km`);

export { calculateDistance, UTMKCoordinate };
