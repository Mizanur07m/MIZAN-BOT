const path = require("path");
const fs = require("fs");

module.exports.config = {
  name: "whitelist",
  eventType: ["message"],
  version: "1.1.0",
  credits: "Mizan",
  description: "Block all bot responses for non-permitted users when whitelist is ON",
};

function getPermittedUIDs() {
  try {
    const config = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../Mizan.json"), "utf8")
    );
    return [...new Set([
      ...(config.OWNER || []),
      ...(config.ADMINBOT || []),
      ...(config.OPERATOR || [])
    ])];
  } catch {
    return [];
  }
}

if (!global.Mizan_wlThreads) global.Mizan_wlThreads = new Set();

module.exports.run = async function ({ api, event, Threads }) {
  const { threadID, senderID } = event;

  try {
    let isWhitelisted = global.Mizan_wlThreads.has(String(threadID));

    if (!isWhitelisted) {
      const threadData = (await Threads.getData(threadID)).data || {};
      isWhitelisted = !!threadData.whitelist;
      if (isWhitelisted) global.Mizan_wlThreads.add(String(threadID));
    }

    if (!isWhitelisted) return;

    const permittedUIDs = getPermittedUIDs();
    if (permittedUIDs.includes(String(senderID))) return;

    event.body = "";
    event.attachments = [];
    event.type = "wl_blocked";

    if (!global.Mizan_blocked) global.Mizan_blocked = new Set();
    global.Mizan_blocked.add(`${threadID}_${senderID}`);
    setTimeout(() => {
      if (global.Mizan_blocked) global.Mizan_blocked.delete(`${threadID}_${senderID}`);
    }, 10000);

  } catch {
    return;
  }
};
