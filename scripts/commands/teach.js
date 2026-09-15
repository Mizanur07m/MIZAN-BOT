const axios = require("axios");

module.exports.config = {
  name: "teach",
  version: "5.0.0",
  permission: 0,
  credits: "MIZAN",
  description: "Teach Simsimi QnA (Supports | and - formats)",
  prefix: true,
  category: "admin",
  usages: "teach question | answer  OR  teach question - answer",
  cooldowns: 2,
};

// 🔹 GitHub থেকে API URL লোড
async function getApiUrl() {
  const githubApiUrl = "https://raw.githubusercontent.com/Mizanur07m/Mizan-/main/api.json";
  try {
    const res = await axios.get(githubApiUrl, { headers: { "Cache-Control": "no-cache" } });
    return res.data?.api || null;
  } catch (err) {
    console.error("❌ GitHub Load Error:", err.message);
    return null;
  }
}

// 🔹 Teach পাঠানো (MongoDB API অনুযায়ী GET request)
async function sendTeach(apiUrl, ask, ans) {
  try {
    const response = await axios.get(`${apiUrl}/sim`, {
      params: { teach: `${ask}|${ans}` }, // API always uses pipe internally
    });
    return response.data;
  } catch (err) {
    console.error("❌ Teach Error:", err.response?.data || err.message);
    return null;
  }
}

// =========================
// MAIN COMMAND
// =========================
module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const apiUrl = await getApiUrl();

  if (!apiUrl) {
    return api.sendMessage("❌ GitHub থেকে API URL লোড করা যায়নি!", threadID, messageID);
  }

  // 🟢 CASE 1: Reply দিয়ে teach
  if (event.type === "message_reply") {
    if (!args[0]) {
      return api.sendMessage("❌ Usage: reply a message & type: teach [ASK]", threadID, messageID);
    }

    const ask = args.join(" ").trim().toLowerCase();
    const ans = event.messageReply.body?.trim();
    if (!ans) return api.sendMessage("❌ Reply করা মেসেজে কোনো লেখা পাওয়া যায়নি!", threadID, messageID);

    const result = await sendTeach(apiUrl, ask, ans);
    if (result?.success) {
      return api.sendMessage(`✅ Teach Added!\n💬 ASK: ${ask}\n💡 ANS: ${ans}`, threadID, messageID);
    } else {
      return api.sendMessage(`⚠️ Teach failed! ${result?.error || ""}`, threadID, messageID);
    }
  }

  // 🟡 CASE 2: Normal teach command
  const input = args.join(" ").trim();

  let ask, ans;
  if (input.includes("|")) {
    [ask, ans] = input.split("|").map(x => x.trim());
  } else if (input.includes("-")) {
    [ask, ans] = input.split("-").map(x => x.trim());
  }

  if (ask && ans) {
    const result = await sendTeach(apiUrl, ask.toLowerCase(), ans);
    if (result?.success) {
      return api.sendMessage(`✅ Teach Added!\n💬 ASK: ${ask}\n💡 ANS: ${ans}`, threadID, messageID);
    } else {
      return api.sendMessage(`⚠️ Teach failed! ${result?.error || ""}`, threadID, messageID);
    }
  }

  // 🔴 CASE 3: Invalid format
  return api.sendMessage(
    "❌ Invalid format!\n\n👉 Usage:\n1️⃣ Reply a message: teach [ASK]\n2️⃣ teach question | answer\n3️⃣ teach question - answer",
    threadID,
    messageID
  );
};
