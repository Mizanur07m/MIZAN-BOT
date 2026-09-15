module.exports.config = {
  name: "time",
  version: "1.1.0",
  permission: 0,              
  prefix: true,
  credits: "Mizan",
  description: "Exact time & date",
  category: "Time and Date",
  usages: ".time",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function ({ api, event, Users }) {
  const moment = require("moment-timezone");

  // Asia/Dhaka — একই টার্গেট TZ-এ সবই রাখলাম
  const nowTime = moment.tz("Asia/Dhaka").format("HH:mm:ss");
  const nowDate = moment.tz("Asia/Dhaka").format("D/MM/YYYY");
  const dayName = moment.tz("Asia/Dhaka").format("dddd");

  const name = await Users.getNameUser(event.senderID);

  const msg =
`╭╼| 🕒 𝗧𝗜𝗠𝗘 𝗣𝗔𝗡𝗘𝗟 |╾╮
┃
┃ 👋 𝗛𝗲𝗹𝗹𝗼 : ${name}
┃ 🕑 𝗧𝗶𝗺𝗲   : ${nowTime}
┃ 📅 𝗗𝗮𝘁𝗲   : ${nowDate}
┃ 📆 𝗗𝗮𝘆    : ${dayName}
┃
╰╼|━━━━━━━━━━━━━━━━|╾╯`;

  return api.sendMessage(msg, event.threadID, event.messageID);
};
