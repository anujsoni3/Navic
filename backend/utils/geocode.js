const fetch = require("node-fetch");

const geocodePlace = async (place) => {
  const encoded = encodeURIComponent(`${place}, Nagpur, India`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}`;

  const response = await fetch(url, {
    headers: { "User-Agent": "navic-metro-app/1.0" },
  });

  const data = await response.json();
  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

module.exports = { geocodePlace };
