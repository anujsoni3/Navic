import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { busLines } from "../data/busData";
import { fakeGeocode } from "../utils/fakeGeocode";
import { distance } from "../utils/distance";
import { Link } from "react-router-dom";
const CheckRentals = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [metroResult, setMetroResult] = useState(null);
  const [busResult, setBusResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    const payload = {
      startStation: start.trim(),
      endStation: end.trim(),
      requestedTime: timeInput,
    };

    // Metro API call
    try {
      const response = await fetch("http://localhost:3000/api/metro/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const metroData = await response.json();
      setMetroResult(response.ok ? metroData : null);
    } catch (err) {
      console.error("🚨 Metro Fetch Error:", err);
      setMetroResult(null);
    }

    // BUS: Logic using static JSON
    const fromCoords = await fakeGeocode(start);
    const toCoords = await fakeGeocode(end);

    if (!fromCoords || !toCoords) {
      setBusResult(null);
      setLoading(false);
      return;
    }

    let bestMatch = null;

    for (const line of busLines) {
      let nearestStart = null;
      let nearestEnd = null;
      let minStartDist = Infinity;
      let minEndDist = Infinity;

      for (const s of line.stations) {
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

      const startIdx = line.stations.indexOf(nearestStart);
      const endIdx = line.stations.indexOf(nearestEnd);

      if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
        const departAt = Object.keys(nearestStart.timings || {})[0] || "N/A";
        const arriveAt = Object.keys(nearestEnd.timings || {})[0] || "N/A";

        const fare =
          (line.fares?.[nearestStart.name]?.[nearestEnd.name]) ||
          (line.fares?.[nearestEnd.name]?.[nearestStart.name]) ||
          "N/A";

        bestMatch = {
          from: nearestStart.name,
          to: nearestEnd.name,
          departAt,
          arriveAt,
          fare,
          
        };
        break;
      }
    }

    setBusResult(bestMatch || null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-empressGreen text-white px-4 py-2 roundedrple-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Plan Your Journey
            </h1>
            <p className="text-lg text-gray-600">
              Find the best metro and bus routes for your destination
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* LEFT: Search Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Search Routes
              </h2>
              
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter starting destination"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ending destination"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSearch}
                    disabled={loading || !start.trim() || !end.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                        Searching...
                      </div>
                    ) : (
                      "Search Routes"
                    )}
                  </button>
                    <Link to="/rentals">
                  <div className="mt-4 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-xl px-6 py-3 font-semibold border border-purple-200">
                      🚗 Rentals Coming Soon
                    </div>
                  </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT: Results */}
            <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
              {/* Metro Result Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-2">🚇</span>
                    <h3 className="text-2xl font-bold text-white">Metro</h3>
                  </div>
                </div>

                <div className="p-6">
                  {!searched ? (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-500">Enter details and search to see metro options</p>
                    </div>
                  ) : loading ? (
                    <div className="text-center py-8">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                      </div>
                    </div>
                  ) : metroResult ? (
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="text-xl font-semibold text-gray-800 mb-2">
                          {metroResult.from} → {metroResult.to}
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                          <div className="flex justify-between items-center mb-1">
                            <span>Departure:</span>
                            <span className="font-medium">{metroResult.departAt}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Arrival:</span>
                            <span className="font-medium">{metroResult.arriveAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-red-100 to-rose-50 rounded-xl p-4 border border-green-200">
                        <div className="text-3xl font-bold text-rose-600">
                          ₹{metroResult.fare}
                        </div>
                        <div className="text-sm text-rose-700 mt-1">Best Price</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-red-400 mb-2">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-red-500 font-semibold">No metro route available</p>
                      <p className="text-gray-500 text-sm mt-1">Try different locations</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bus Result Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-2">🚌</span>
                    <h3 className="text-2xl font-bold text-white">Bus</h3>
                  </div>
                </div>

                <div className="p-6">
                  {!searched ? (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-500">Enter details and search to see bus options</p>
                    </div>
                  ) : loading ? (
                    <div className="text-center py-8">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                      </div>
                    </div>
                  ) : busResult ? (
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="text-xl font-semibold text-gray-800 mb-2">
                          {busResult.from} → {busResult.to}
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-2">
                          <div className="flex justify-between items-center mb-1">
                            <span>Departure:</span>
                            <span className="font-medium">{busResult.departAt}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Arrival:</span>
                            <span className="font-medium">{busResult.arriveAt}</span>
                          </div>
                        </div>
                        
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                        <div className="text-3xl font-bold text-blue-600">
                          ₹{busResult.fare}
                        </div>
                        <div className="text-sm text-blue-700 mt-1">Bus Fare</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-red-400 mb-2">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-red-500 font-semibold">No bus route available</p>
                      <p className="text-gray-500 text-sm mt-1">Try different locations</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckRentals;