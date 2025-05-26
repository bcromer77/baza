const hotelInventory = require("../integrations/apolloHotelApi.js");

const creators = [
  {
    id: "kat",
    name: "Kat Earth",
    audienceGeo: ["UK", "Lisbon", "Berlin"],
    transcript: "I want to host a retreat somewhere warm and soulful this winter.",
    quote: "host a retreat somewhere warm and soulful this winter",
    thumbnail: "/kat.jpg"
  },
  {
    id: "lucas",
    name: "Lucas Yin",
    audienceGeo: ["SF", "Portugal"],
    transcript: "If I could gather 10 people and do breathwork by the sea, I'd be so happy.",
    quote: "gather 10 people and do breathwork by the sea",
    thumbnail: "/lucas.jpg"
  }
];

function matchCreatorsToRetreat({ location, month, intent }) {
  const matches = [];

  creators.forEach((creator) => {
    const text = creator.transcript.toLowerCase();
    const intentMatch = text.includes("host") || text.includes("retreat") || text.includes("plan");
    const geoMatch = creator.audienceGeo.some((g) =>
      location.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(location.toLowerCase())
    );

    if (intentMatch) {
      matches.push({
        creatorId: creator.id,
        name: creator.name,
        matchScore: intentMatch && geoMatch ? 0.95 : 0.82,
        quote: creator.quote,
        projectedRoomSales: geoMatch ? 14 : 7,
        thumbnail: creator.thumbnail
      });
    }
  });

  return matches.slice(0, 5);
}

module.exports = { matchCreatorsToRetreat };

