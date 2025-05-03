// server/services/prismService.js

const Pricing = require('../models/Pricing');
// const Subscription = require('../models/Subscription');
const {
  GoogleCloudStorage,
  CanvasAPI,
  PrintfulAPI,
  // Add any other utilities you use
} = require('../utils/externalApis');

// Example: Helper stubs (replace these with your real implementations)
async function IngestAudio(audioFile, creatorId, platform, eventId) {
  // Process and return a content record
  return { id: 'dummy-content', creatorId, platform, eventId };
}
async function CreateBehavioralEmbedding(contentRecord) {
  // Return behavioral tags/embedding for the content
  return [];
}
async function ParseQuery(queryInput, /*fromOwl*/ useOwl = false, userLanguage) {
  // Parse and return { queryData, queryEmbedding }
  return { queryData: {}, queryEmbedding: {} };
}
async function MatchAndRank(queryEmbedding, queryData, candidates = null) {
  // Rank candidates or search DB for matches
  return candidates || [];
}
async function DeliverResults(matches, userId, role, userLanguage, cards) {
  // Return final set of results/cards to the user
  return { matches, cards };
}
async function GenerateChallenge() {
  // Return a challenge or prompt if needed
  return {};
}
async function SelectImage(match, eventId) {
  // Choose an image URL for a creator/event
  return 'https://dummyimage.com/800x1000';
}
async function GenerateBookingLink(eventId, hotelId, price) {
  // Generate a unique booking link
  return `https://audiantix.com/book/${eventId}?hotel=${hotelId}&price=${price}`;
}

// --- Main PrismMatch function ---
async function PrismMatch({
  audioFile,
  queryInput,
  userId,
  role,
  userLanguage,
  eventId,
  creatorId,
  platform
}) {
  let contentRecord, behavioralTags, queryData, queryEmbedding, candidates;

  // Handle preprocessed query (e.g., from OWL or frontend)
  if (queryInput.queryData && queryInput.queryEmbedding && queryInput.candidates) {
    ({ queryData, queryEmbedding, candidates } = queryInput);
  } else {
    // If audio provided, run audio ingestion and embedding
    if (audioFile) {
      contentRecord = await IngestAudio(audioFile, creatorId, platform, eventId);
      behavioralTags = await CreateBehavioralEmbedding(contentRecord);
    }
    ({ queryData, queryEmbedding } = await ParseQuery(queryInput, false, userLanguage));
  }

  // Find or rank matches
  const refinedResults = await MatchAndRank(queryEmbedding, queryData, candidates);

  const cards = [];
  for (const match of refinedResults) {
    // Get or create pricing (simulate if needed)
    let baseRate = 100; // You can adjust this as needed, or fetch from somewhere
    try {
      baseRate = match.baseRate || baseRate;
    } catch (err) {}
    const pricing = await Pricing.createPricing(match.hotelId || 'hotel-1', eventId || 'event-1', baseRate);

    const card = await GeneratePolaroidCard(match, userLanguage, pricing, role);
    card.metadata.payment = {
      bookingCommission: 0.10,
      collabCommission: 0.15,
      cardSaleCommission: 0.20,
      prismSellPrice: pricing.prismSellPrice,
      influencerSellPrice: pricing.influencerSellPrice
    };
    cards.push(card);
  }

  const results = await DeliverResults(refinedResults, userId, role, userLanguage, cards);
  return results;
}

// --- Generate Polaroid Card ---
async function GeneratePolaroidCard(match, userLanguage, pricing, role) {
  // Use transcript or fallback
  const quote =
    (match.transcript && (match.transcript.translations?.[userLanguage] || match.transcript.original?.text)) ||
    match.quote ||
    '“Sample quote goes here.”';

  const image = await SelectImage(match, match.eventId);

  const metadata = {
    creator: match.creatorId,
    platform: match.platform,
    eventId: match.eventId,
    bookingLink: role === 'fan'
      ? await GenerateBookingLink(match.eventId, match.hotelId, pricing.influencerSellPrice)
      : null,
    collabLink: role === 'brand'
      ? `/collaborate?creatorId=${match.creatorId}&eventId=${match.eventId}`
      : null,
    payment: {
      bookingCommission: 0.10,
      collabCommission: 0.15,
      cardSaleCommission: 0.20,
      prismSellPrice: pricing.prismSellPrice,
      influencerSellPrice: pricing.influencerSellPrice
    }
  };

  // Create card image with CanvasAPI (stub)
  const cardImageBuffer = await CanvasAPI.CreateImage({
    width: 800,
    height: 1000,
    template: {
      border: { color: 'white', bottomThickness: 100 },
      image: { url: image, position: 'center', fit: 'cover' },
      text: { content: quote, font: 'Helvetica', size: 24, position: 'bottom' },
      bookingButton: role === 'fan'
        ? { text: 'Book Hotel', url: metadata.bookingLink, position: 'bottom-right' }
        : null,
      collabButton: role === 'brand'
        ? { text: 'Collaborate', url: metadata.collabLink, position: 'bottom-right' }
        : null
    }
  });

  // Upload card image to storage and get URL
  const cardUrl = await GoogleCloudStorage.Upload(cardImageBuffer, `polaroid/${match.id || match.eventId || Date.now()}.png`);

  // Save a card record if you want (skipped DB for now)
  const cardRecord = { matchId: match.id, imageUrl: cardUrl, quote, metadata, createdAt: new Date() };

  // Optionally send to Printful if physical
  if (match.requestPhysical) {
    await PrintfulAPI.Print(cardUrl, { format: 'polaroid' });
  }

  return cardRecord;
}

module.exports = {
  PrismMatch,
  // Optionally export helpers for tests/mocking
  GeneratePolaroidCard,
  IngestAudio,
  CreateBehavioralEmbedding,
  ParseQuery,
  MatchAndRank,
  DeliverResults,
  GenerateChallenge
};

