const { admin, db } = require("../config/firebase");

function slugify(value) {
  if (!value) {
    return "";
  }

  return value
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function randomSlug() {
  return `card-${Math.random().toString(36).slice(2, 10)}`;
}

async function isSlugAvailable(slug) {
  const snapshot = await db.collection("cards").where("slug", "==", slug).limit(1).get();
  return snapshot.empty;
}

async function generateUniqueSlug(fullName) {
  const base = slugify(fullName);
  let slug = base || randomSlug();
  let suffix = 1;

  while (!(await isSlugAvailable(slug))) {
    suffix += 1;
    slug = base ? `${base}-${suffix}` : randomSlug();
  }

  return slug;
}

function buildDefaultAiConfig() {
  return {
    systemPrompt: "",
    knowledgeData: {},
    isAiPaused: false,
    toneOfVoice: "trung-lap",
  };
}

async function createCard(userId, data = {}) {
  const slug = await generateUniqueSlug(data.fullName || "");

  const payload = {
    userId,
    slug,
    fullName: data.fullName || null,
    jobTitle: data.jobTitle || null,
    slogan: data.slogan || null,
    bio: data.bio || null,
    status: "active",
    aiStatus: "Draft",
    aiConfig: buildDefaultAiConfig(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const cardRef = await db.collection("cards").add(payload);
  const snapshot = await cardRef.get();

  return { id: snapshot.id, ...snapshot.data() };
}

async function getCardBySlug(slug) {
  const snapshot = await db.collection("cards").where("slug", "==", slug).limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

async function getMyCards(userId) {
  const snapshot = await db.collection("cards").where("userId", "==", userId).get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function updateCard(cardId, userId, updateData = {}) {
  const cardRef = db.collection("cards").doc(cardId);
  const snapshot = await cardRef.get();

  if (!snapshot.exists) {
    return { error: "not-found" };
  }

  const card = snapshot.data();

  if (card.userId !== userId) {
    return { error: "forbidden" };
  }

  const allowedFields = [
    "fullName",
    "jobTitle",
    "slogan",
    "bio",
    "status",
    "aiStatus",
    "isPhonePublic",
    "isEmailPublic",
    "nfcEnabled",
    "autoReplyEnabled",
    "autoReplyMessage",
    "avatarUrl",
    "coverUrl",
    "theme",
    "socialLinks",
    "aiConfig",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      updates[field] = updateData[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return { id: snapshot.id, ...card };
  }

  await cardRef.update(updates);
  const updatedSnapshot = await cardRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

async function updateAiConfig(cardId, userId, aiConfigData = {}) {
  const cardRef = db.collection("cards").doc(cardId);
  const snapshot = await cardRef.get();

  if (!snapshot.exists) {
    return { error: "not-found" };
  }

  const card = snapshot.data();

  if (card.userId !== userId) {
    return { error: "forbidden" };
  }

  const updates = {};

  if (aiConfigData.aiConfig !== undefined) {
    updates.aiConfig = aiConfigData.aiConfig;
  }

  if (aiConfigData.aiStatus !== undefined) {
    updates.aiStatus = aiConfigData.aiStatus;
  }

  if (Object.keys(updates).length === 0) {
    return { id: snapshot.id, ...card };
  }

  await cardRef.update(updates);
  const updatedSnapshot = await cardRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

async function toggleTakeover(cardId, userId, isAiPaused) {
  const cardRef = db.collection("cards").doc(cardId);
  const snapshot = await cardRef.get();

  if (!snapshot.exists) {
    return { error: "not-found" };
  }

  const card = snapshot.data();

  if (card.userId !== userId) {
    return { error: "forbidden" };
  }

  const updatedAiConfig = {
    ...(card.aiConfig || {}),
    isAiPaused: Boolean(isAiPaused),
  };

  await cardRef.update({ aiConfig: updatedAiConfig });
  const updatedSnapshot = await cardRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

module.exports = {
  createCard,
  getCardBySlug,
  getMyCards,
  updateCard,
  updateAiConfig,
  toggleTakeover,
};
