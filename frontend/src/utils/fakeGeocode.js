export const fakeGeocode = async (place) => {
  const places = {
    sitabuldi: { lat: 21.1498, lng: 79.0826 },
    ajni: { lat: 21.1225, lng: 79.0888 },
    dharampeth: { lat: 21.1447, lng: 79.0717 },
    ramdaspeth: { lat: 21.1393, lng: 79.0731 },
    kasturchand: { lat: 21.1545, lng: 79.0880 },
    panchsheel: { lat: 21.1276, lng: 79.0755 },

    // Expanded Locations
    sadar: { lat: 21.1617, lng: 79.0897 },
    civil_lines: { lat: 21.1520, lng: 79.0840 },
    mankapur: { lat: 21.1704, lng: 79.0905 },
    medical_square: { lat: 21.1360, lng: 79.0930 },
    university: { lat: 21.1295, lng: 79.0345 },
    pratap_nagar: { lat: 21.1103, lng: 79.0604 },
    ambazari: { lat: 21.1315, lng: 79.0485 },
    nehru_nagar: { lat: 21.1210, lng: 79.0785 },
    cotton_market: { lat: 21.1479, lng: 79.0920 },
    gandhibagh: { lat: 21.1486, lng: 79.0977 },
    dhantoli: { lat: 21.1382, lng: 79.0873 },
    itwari: { lat: 21.1596, lng: 79.1097 },
    jaripatka: { lat: 21.1898, lng: 79.1043 },
    lakadganj: { lat: 21.1565, lng: 79.1223 },
    kapil_nagar: { lat: 21.1889, lng: 79.0944 },
    hingna: { lat: 21.0660, lng: 78.9437 },
    butibori: { lat: 20.9412, lng: 78.9932 },
    khapri: { lat: 21.0592, lng: 79.0504 },
    sitabuldi_fort: { lat: 21.1475, lng: 79.0820 },
  };

  return places[place.toLowerCase().replace(/\s+/g, "_")] || null;
};
