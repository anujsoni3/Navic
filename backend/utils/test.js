const { geocodePlace } = require('./geocode'); // update the path as needed

(async () => {
  const coords = await geocodePlace("RBI Square");
  console.log(coords);
})();
