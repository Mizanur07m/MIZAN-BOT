const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "couple",
  version: "2.0.0",
  permission: 0,
  credits: "Mizan",
  description: "Couple (ship) photo edit with tagged person",
  prefix: true,
  category: "love",
  usages: "@mention",
  cooldowns: 5
};

module.exports.onLoad = async () => {
  const dirMaterial = path.join(__dirname, "cache/canvas");
  const imgPath = path.join(dirMaterial, "seophi.png");

  if (!fs.existsSync(dirMaterial)) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(imgPath)) {
    const { data } = await axios.get("https://drive.google.com/uc?id=1J-InUxGo7s2Y5aV2xfZ4-Hn-07ewpMBb", { responseType: "arraybuffer" });
    fs.writeFileSync(imgPath, Buffer.from(data, "utf-8"));
  }
};

async function circle(image) {
  const img = await jimp.read(image);
  img.circle();
  return await img.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
  const __root = path.join(__dirname, "cache/canvas");
  const batgiam_img = await jimp.read(path.join(__root, "seophi.png"));

  const avatarOnePath = path.join(__root, `avt_${one}.png`);
  const avatarTwoPath = path.join(__root, `avt_${two}.png`);
  const finalPath = path.join(__root, `couple_${one}_${two}.png`);

  // Download avatars
  const getAvatarOne = (await axios.get(
    `https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
    { responseType: "arraybuffer" }
  )).data;
  fs.writeFileSync(avatarOnePath, Buffer.from(getAvatarOne, "utf-8"));

  const getAvatarTwo = (await axios.get(
    `https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
    { responseType: "arraybuffer" }
  )).data;
  fs.writeFileSync(avatarTwoPath, Buffer.from(getAvatarTwo, "utf-8"));

  // Create circular avatars
  const circleOne = await jimp.read(await circle(avatarOnePath));
  const circleTwo = await jimp.read(await circle(avatarTwoPath));

  // Composite image
  batgiam_img
    .resize(1024, 712)
    .composite(circleOne.resize(200, 200), 527, 141)
    .composite(circleTwo.resize(200, 200), 389, 407);

  const raw = await batgiam_img.getBufferAsync("image/png");
  fs.writeFileSync(finalPath, raw);

  // Cleanup
  fs.unlinkSync(avatarOnePath);
  fs.unlinkSync(avatarTwoPath);

  return finalPath;
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID, mentions } = event;
  const mention = Object.keys(mentions)[0];

  if (!mention) {
    return api.sendMessage("╭╼|━━━━━━━━━━━━━━|╾╮\nদয়া করে একজনকে @mention করুন!\n╰╼|━━━━━━━━━━━━━━|╾╯", threadID, messageID);
  }

  const tag = mentions[mention].replace("@", "");
  const one = senderID;
  const two = mention;

  try {
    const imagePath = await makeImage({ one, two });
    api.sendMessage({
      body: `╭╼|━━━━━━━━━━━━━━|╾╮\n💖 Ship ${tag} 💖\n╰╼|━━━━━━━━━━━━━━|╾╯`,
      mentions: [{ tag: tag, id: mention }],
      attachment: fs.createReadStream(imagePath)
    }, threadID, () => fs.unlinkSync(imagePath), messageID);
  } catch (e) {
    console.error(e);
    api.sendMessage("একটি ত্রুটি ঘটেছে! অনুগ্রহ করে আবার চেষ্টা করুন।", threadID, messageID);
  }
};
