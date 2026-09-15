const moment = require("moment-timezone");
const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "info",
  version: "1.0.0",
  permission: 0,
  credits: "Mizan",
  description: "Displays personal info of the bot owner",
  prefix: true,
  category: "info",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function ({ api, event }) {
  const currentTime = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【hh:mm:ss】");

  const imageUrl = "https://raw.githubusercontent.com/Mizanur07m/Mizan-/main/Mizan404.png";
  const imgPath = __dirname + "/cache/info_avatar.png";

  const infoText = `
╭╼|━━━━━━━━━━━━━━|╾╮
👤 𝗡𝗮𝗺𝗲 : 𝗠𝗜𝗭𝗔𝗡𝗨𝗥 𝗥𝗔𝗛𝗠𝗔𝗡
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : 𝗠𝗜 𝗭𝗔𝗡
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
🕋 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻 : 𝗜𝘀𝗹𝗮𝗺
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
🏠 𝗣𝗲𝗿𝗺𝗮𝗻𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : 𝗨𝗹𝗹𝗮𝗽𝗿𝗮,𝘀𝗶𝗿𝗮𝗷𝗴𝗵𝗼𝗻𝗷
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
📍 𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : 𝗞𝗼𝗻𝗮𝗯𝗮𝗿𝗶,𝗚𝗮𝘇𝗶𝗽𝘂𝗿
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
🚻 𝗚𝗲𝗻𝗱𝗲𝗿 : 𝗠𝗮𝗹𝗲
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
🎂 𝗔𝗴𝗲 : 19+
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽 : 𝗠𝗮𝗿𝗿𝗶𝗲𝗱
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
🎓 𝗪𝗼𝗿𝗸 : 𝗦𝘁𝘂𝗱𝗲𝗻𝘁
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
📧 𝗚𝗺𝗮𝗶𝗹 : bdidnew92@gmail.com
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 : wa.me/+8801794385912
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 : t.me/ownerxr
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
🔗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗟𝗶𝗻𝗸 : facebook.com/61590768786047
╰╼|━━━━━━━━━━━━━━|╾╯

╭╼|━━━━━━━━━━━━━━|╾╮
⏰ 𝗧𝗶𝗺𝗲 : ${currentTime}
╰╼|━━━━━━━━━━━━━━|╾╯`;

  const callback = () => {
    api.sendMessage({
      body: infoText,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, () => fs.unlinkSync(imgPath));
  };

  request(encodeURI(imageUrl))
    .pipe(fs.createWriteStream(imgPath))
    .on("close", callback);
};
