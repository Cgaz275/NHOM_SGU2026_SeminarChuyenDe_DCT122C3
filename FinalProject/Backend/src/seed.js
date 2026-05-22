const fs = require("fs");
const path = require("path");

const { admin, db } = require("./config/firebase");

const knowledgeBasePath = path.resolve(
  __dirname,
  "../knowledge-base/knowledge_base.json"
);

async function runSeed() {
  try {
    const rawData = fs.readFileSync(knowledgeBasePath, "utf8");
    const { Global_AI_Rules, Demo_Cards } = JSON.parse(rawData);

    console.log("Dang seeding Global AI Rules...");
    await db
      .collection("ai_knowledge_base")
      .doc("global_rules")
      .set(Global_AI_Rules);
    console.log("Da ghi de Global AI Rules vao ai_knowledge_base/global_rules");

    for (const member of Demo_Cards) {
      const userRef = await db.collection("users").add({
        email: `${member.slug}@demo.com`,
        fullName: member.fullName,
        role: "user",
        isVerified: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const newUserId = userRef.id;

      await db.collection("cards").add({
        userId: newUserId,
        slug: member.slug,
        fullName: member.fullName,
        jobTitle: member.jobTitle,
        status: member.status,
        aiStatus: member.aiStatus,
        aiConfig: member.aiConfig,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Da tao User va Card thanh cong cho: ${member.fullName}`);
    }

    console.log("🎉 Seeding Database thành công!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Database thất bại:", error);
    process.exit(1);
  }
}

runSeed();
