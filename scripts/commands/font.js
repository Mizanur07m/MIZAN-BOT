module.exports.config = {
  name: "font",
  version: "4.0.0",
  permission: 0,
  credits: "Mizan Ahmed",
  description: "Convert text to 50+ Unicode, Emoji, Symbol fonts",
  prefix: true,
  category: "tools",
  usages: "[text]",
  cooldowns: 3,
};

const fonts = [
  t => t.toUpperCase(),
  t => t.toLowerCase(),
  t => t.split("").reverse().join(""),
  t => t.split("").join(" "),
  t => t.replace(/[A-Za-z]/g, c => `꧁${c}꧂`),
  t => t.replace(/[A-Za-z]/g, c => `『${c}』`),
  t => t.replace(/[A-Za-z]/g, c => `【${c}】`),
  t => t.replace(/[A-Za-z]/g, c => `✿${c}✿`),
  t => t.replace(/[A-Za-z]/g, c => `★${c}★`),
  t => t.replace(/[A-Za-z]/g, c => `卐${c}卍`),
  t => t.replace(/[A-Za-z]/g, c => `𓂀${c}𓂀`),
  t => t.replace(/[A-Za-z]/g, c => `๖ۣۜ${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🅐${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🄰${c}`),
  t => t.replace(/[A-Za-z]/g, c => `Ⓐ${c}`),
  t => t.replace(/[A-Za-z]/g, c => `Ⓞ${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🅰️${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🎀${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💥${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🎯${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💗${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🔥${c}`),
  t => t.replace(/[A-Za-z]/g, c => `👑${c}`),
  t => t.replace(/[A-Za-z]/g, c => `✨${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💎${c}`),
  t => t.replace(/[A-Za-z]/g, c => `⛓️${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🔮${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💫${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🌸${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🌟${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💀${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💘${c}`),
  t => t.replace(/[A-Za-z]/g, c => `❤️‍🔥${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🖤${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🎵${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💌${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🫧${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🥀${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🦋${c}`),
  t => t.replace(/[A-Za-z]/g, c => `😈${c}`),
  t => t.replace(/[A-Za-z]/g, c => `😻${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💣${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🎉${c}`),
  t => t.replace(/[A-Za-z]/g, c => `📀${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🛡️${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🎆${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🎗️${c}`),
  t => t.replace(/[A-Za-z]/g, c => `🩷${c}`),
  t => t.replace(/[A-Za-z]/g, c => `💠${c}`),
  t => t.replace(/[A-Za-z]/g, c => `♨️${c}`),
];

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  if (!input) return api.sendMessage("⚠️ দয়া করে কিছু টেক্সট দিন!", event.threadID, event.messageID);

  const result = fonts.map((fn, i) => `𝗙𝗼𝗻𝘁 ${i + 1}: ${fn(input)}`);
  const message = `╭╼|━━━━━━━━━━━━━━|╾╮\n${result.join("\n")}\n╰╼|━━━━━━━━━━━━━━|╾╯`;

  api.sendMessage(message, event.threadID, event.messageID);
};
