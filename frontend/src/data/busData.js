export const busLines = [
  {
    lineName: "Red Line",
    stations: [
      { name: "Sitabuldi", location: { lat: 21.1498, lng: 79.0826 }, timings: { "08:00": "Departing", "09:00": "Departing", "10:00": "Departing" } },
      { name: "Dharampeth", location: { lat: 21.1447, lng: 79.0717 }, timings: { "08:15": "Arriving", "09:15": "Arriving", "10:15": "Arriving" } },
      { name: "Ajni", location: { lat: 21.1225, lng: 79.0888 }, timings: { "08:30": "Arriving", "09:30": "Arriving", "10:30": "Arriving" } },
      { name: "Medical Square", location: { lat: 21.1240, lng: 79.0901 }, timings: { "08:40": "Arriving", "09:40": "Arriving", "10:40": "Arriving" } },
      { name: "Kasturchand Park", location: { lat: 21.1545, lng: 79.0880 }, timings: { "08:50": "Arriving", "09:50": "Arriving", "10:50": "Arriving" } },
      { name: "Ramdaspeth", location: { lat: 21.1393, lng: 79.0731 }, timings: { "09:00": "Arriving", "10:00": "Arriving", "11:00": "Arriving" } },
      { name: "Pratap Nagar", location: { lat: 21.1150, lng: 79.0790 }, timings: { "09:10": "Arriving", "10:10": "Arriving", "11:10": "Arriving" } },
      { name: "Laxmi Nagar", location: { lat: 21.1305, lng: 79.0782 }, timings: { "09:20": "Arriving", "10:20": "Arriving", "11:20": "Arriving" } },
      { name: "Ambazari", location: { lat: 21.1341, lng: 79.0523 }, timings: { "09:30": "Arriving", "10:30": "Arriving", "11:30": "Arriving" } },
      { name: "IT Park", location: { lat: 21.1457, lng: 79.0419 }, timings: { "09:40": "Arriving", "10:40": "Arriving", "11:40": "Arriving" } }
    ],
    fares: {}
  }
];

// Automatically fill fares as ₹5 per hop
const fillFares = () => {
  const line = busLines[0];
  const n = line.stations.length;

  for (let i = 0; i < n; i++) {
    const from = line.stations[i].name;
    line.fares[from] = {};
    for (let j = i + 1; j < n; j++) {
      const to = line.stations[j].name;
      line.fares[from][to] = (j - i) * 5;
    }
  }
};

fillFares();
