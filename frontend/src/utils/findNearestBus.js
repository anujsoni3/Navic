import { busLines } from './busData';
import { fakeGeocode } from './fakeGeocode';
import distance from './distance';

export const findNearestBus = async (fromInput, toInput, requestedTimeStr) => {
  const fromCoords = await fakeGeocode(fromInput);
  const toCoords = await fakeGeocode(toInput);
  if (!fromCoords || !toCoords) return { error: "Invalid location" };

  const timeToMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const requestedMinutes = timeToMinutes(requestedTimeStr);

  for (const line of busLines) {
    const stations = line.stations;

    let nearestStart = null;
    let nearestEnd = null;
    let minStartDist = Infinity;
    let minEndDist = Infinity;

    for (const s of stations) {
      const distStart = distance(fromCoords.lat, fromCoords.lng, s.location.lat, s.location.lng);
      const distEnd = distance(toCoords.lat, toCoords.lng, s.location.lat, s.location.lng);
      if (distStart < minStartDist) {
        minStartDist = distStart;
        nearestStart = s;
      }
      if (distEnd < minEndDist) {
        minEndDist = distEnd;
        nearestEnd = s;
      }
    }

    const startIndex = stations.findIndex((s) => s.name === nearestStart.name);
    const endIndex = stations.findIndex((s) => s.name === nearestEnd.name);

    if (startIndex < endIndex) {
      const possibleDepartures = Object.entries(nearestStart.timings || {})
        .filter(([time, status]) => status === "Departing")
        .map(([time]) => ({ time, minutes: timeToMinutes(time) }))
        .filter(({ minutes }) => minutes >= requestedMinutes);

      if (possibleDepartures.length > 0) {
        const nextDepart = possibleDepartures.sort((a, b) => a.minutes - b.minutes)[0].time;

        const arrival = Object.entries(nearestEnd.timings || {})
          .filter(([time, status]) => status === "Arriving")
          .map(([time]) => time)
          .find((t) => timeToMinutes(t) >= timeToMinutes(nextDepart));

        if (arrival) {
          let fare = "N/A";

          // Primary fare lookup
          if (line.fares?.[nearestStart.name]?.[nearestEnd.name]) {
            fare = line.fares[nearestStart.name][nearestEnd.name];
          } 
          // Reverse fare fallback
          else if (line.fares?.[nearestEnd.name]?.[nearestStart.name]) {
            fare = line.fares[nearestEnd.name][nearestStart.name];
          }

          return {
            line: line.lineName,
            from: nearestStart.name,
            to: nearestEnd.name,
            departAt: nextDepart,
            arriveAt: arrival,
            fare
          };
        }
      }
    }
  }

  return { message: "No bus found for the given time and locations." };
};
