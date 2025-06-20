const Bus_model = require("../model/Bus_model");
const { geocodePlace } = require("../utils/geocode");

// Calculate distance between two lat/lng points (Haversine formula)
function distance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Resolve user input to station name by exact match or nearest station using geocoding
async function resolveStationName(name, stations) {
  console.log("🔍 Trying to resolve:", name);

  // Try exact case-insensitive match
  const exactMatch = stations.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
  if (exactMatch) {
    console.log(`✅ Exact match found for "${name}" → ${exactMatch.name}`);
    return exactMatch.name;
  }

  // Get coordinates from geocode
  const coords = await geocodePlace(name);
  if (!coords) {
    console.log(`❌ Geocoding failed for "${name}"`);
    return null;
  }

  // Find nearest station by distance
  let minDist = Infinity;
  let nearestStation = null;
  for (const s of stations) {
    const dist = distance(
      coords.lat,
      coords.lng,
      s.location.lat,
      s.location.lng
    );
    if (dist < minDist) {
      minDist = dist;
      nearestStation = s.name;
    }
  }

  console.log(`📍 Nearest station to "${name}" is "${nearestStation}" (${minDist.toFixed(2)} km)`);
  return nearestStation;
}



exports.searchBus = async (req, res) => {
  try {
    const {
      startStation: userStart,
      endStation: userEnd,
      requestedTime,
    } = req.body;

    console.log("📤 Received bus user input:", { userStart, userEnd, requestedTime });

    if (!userStart || !userEnd || !requestedTime) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const timeToMinutes = (timeStr) => {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    const requestedMinutes = timeToMinutes(requestedTime);

    const busLines = await Bus_model.find({});

    let fallbackResult = null;  // Store fallback candidate

    for (const line of busLines) {
      const stations = line.stations;

      const startStation = await resolveStationName(userStart, stations);
      const endStation = await resolveStationName(userEnd, stations);

      if (!startStation || !endStation) {
        console.log(`❌ Could not resolve stations: ${userStart} → ${userEnd}`);
        continue;
      }


      const startIndex = stations.findIndex((s) => s.name === startStation);
      const endIndex = stations.findIndex((s) => s.name === endStation);

      // First try strict direction & time check (startIndex < endIndex)
      if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        // Get departure times
        const startTimings = Object.entries(stations[startIndex].timings || {})
          .filter(([time, status]) => status === "Departing")
          .map(([time]) => time);

        // Find possible times after requested time
        const possibleTimes = startTimings
          .map((t) => ({ time: t, minutes: timeToMinutes(t) }))
          .filter(({ minutes }) => minutes >= requestedMinutes);

        if (possibleTimes.length > 0) {
          let nextTime = possibleTimes.reduce((a, b) =>
            a.minutes < b.minutes ? a : b
          ).time;

          const arrivalTime = Object.entries(stations[endIndex].timings || {})
            .filter(([time, status]) => status === "Arriving")
            .map(([time]) => time)
            .find((t) => timeToMinutes(t) >= timeToMinutes(nextTime));

          if (arrivalTime) {
            const fare = line.fares?.[startStation]?.[endStation] ?? "N/A";

            const result = {
              line: line.lineName,
              from: startStation,
              to: endStation,
              departAt: nextTime,
              arriveAt: arrivalTime,
              fare,
            };

            console.log("✅ Found exact bus:", result);
            return res.status(200).json(result);
          }
        }
      }

      // --- Fallback logic ---

      // If fallbackResult not set yet, try to pick the bus line and stations closest to user input ignoring strict time/direction

      if (!fallbackResult && startIndex !== -1 && endIndex !== -1) {
        // Get earliest departure time from start station
        const startTimings = Object.entries(stations[startIndex].timings || {})
          .filter(([time, status]) => status === "Departing")
          .map(([time]) => time);

        const earliestDepart = startTimings.length > 0 ? startTimings.reduce((a, b) =>
          timeToMinutes(a) < timeToMinutes(b) ? a : b
        ) : null;

        // Get earliest arrival time at end station
        const arrivalTimes = Object.entries(stations[endIndex].timings || {})
          .filter(([time, status]) => status === "Arriving")
          .map(([time]) => time);

        const earliestArrival = arrivalTimes.length > 0 ? arrivalTimes.reduce((a, b) =>
          timeToMinutes(a) < timeToMinutes(b) ? a : b
        ) : null;

        if (earliestDepart && earliestArrival) {
          fallbackResult = {
            line: line.lineName,
            from: startStation,
            to: endStation,
            departAt: earliestDepart,
            arriveAt: earliestArrival,
            fare: line.fares?.[startStation]?.[endStation] ?? "N/A",
            note: "Fallback result ignoring requested time or direction",
          };
        }
      }
    }

    if (fallbackResult) {
      console.log("⚠️ Returning fallback bus:", fallbackResult);
      return res.status(200).json(fallbackResult);
    }

    // No bus found at all
    return res
      .status(404)
      .json({ message: "No bus available at or after given time." });
  } catch (err) {
    console.error("❗ Error in searchBus:", err);
    return res.status(500).json({ error: "Server error" });
  }
};



