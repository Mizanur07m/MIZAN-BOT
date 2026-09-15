module.exports.config = {
  name: "ruls",
  version: "1.0.3",
  permission: 0,
  credits: "Mizan Ahmed",
  prefix: true,
  description: "rules",
  category: "rules",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, Threads }) {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];

  try {
    // গ্রুপের তথ্য আনা
    const threadInfo = await api.getThreadInfo(event.threadID);
    const groupName = threadInfo.threadName || "এই গ্রুপ";
    const groupImage = threadInfo.imageSrc; // গ্রুপের প্রোফাইল ছবি

    // গ্রুপ প্রোফাইল ছবি ডাউনলোড
    const imgPath = __dirname + "/cache/group.jpg";
    if (groupImage) {
      const imgRes = await axios.get(groupImage, { responseType: "arraybuffer" });
      fs.writeFileSync(imgPath, Buffer.from(imgRes.data, "binary"));
    }

    // Font Keyboard Style টেক্সট
    const msg = {
      body: `╭╼|━━━━━━━━━━━━━━|╾╮
𝘼𝙨𝙨𝙖𝙡𝙖𝙢𝙪 𝘼𝙡𝙖𝙞𝙠𝙪𝙢  
"༆◥⃧⃜ؖؖؖؖ⃝ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩ»̶̶͓͓͓̽̽̽𝄞⋆⃝🌺𝙋⋆⃝🌸࿐"  
${groupName} 𝙜𝙧𝙤𝙪𝙥-𝙚𝙧 𝙠𝙤𝙡𝙞𝙟𝙖𝙧 𝙗𝙝𝙖𝙞/𝙗𝙤𝙣 __😊🍒  

𝘼𝙢𝙖𝙙𝙚𝙧 𝙜𝙧𝙤𝙪𝙥-𝙚 𝙖𝙨𝙖𝙧 𝙟𝙤𝙣𝙣𝙤 𝙖𝙥𝙣𝙖𝙠𝙚 𝙖𝙣𝙚𝙠 𝙙𝙝𝙤𝙣𝙣𝙤𝙗𝙖𝙙 !!🍒😘  

𝙀𝙩𝙖 𝙖𝙙𝙙𝙖 𝙗𝙤𝙭, 𝙚𝙠𝙝𝙖𝙣𝙚 18+ 𝙠𝙤𝙣𝙤 𝙠𝙖𝙩𝙝𝙖 𝙗𝙤𝙡𝙖 𝙟𝙖𝙗𝙚 𝙣𝙖 💯  

𝙀𝙠𝙝𝙖𝙣𝙚 𝙨𝙤𝙗𝙖𝙞 𝙗𝙝𝙖𝙣𝙙𝙪𝙧 𝙢𝙤𝙩𝙤 𝙖𝙙𝙙𝙖 𝙙𝙞𝙗𝙚 💯  

3 𝙙𝙞𝙣𝙚𝙧 𝙗𝙚𝙨𝙝𝙞 𝙖𝙘𝙩𝙞𝙫𝙚 𝙣𝙖 𝙩𝙝𝙖𝙠𝙡𝙚 𝙖𝙙𝙢𝙞𝙣 𝙧𝙚𝙢𝙤𝙫𝙚 𝙠𝙤𝙧𝙗𝙚 💚🍒  

༆◥⃧⃜ؖؖؖؖ⃝ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩ»̶̶͓͓͓̽̽̽𝄞⋆⃝🌺𝄞⋆⃝🌸࿐  
${groupName} 𝙜𝙧𝙤𝙪𝙥-𝙚𝙧 𝙥𝙖𝙠𝙝𝙤 𝙩𝙝𝙚𝙠𝙚 𝙖𝙥𝙣𝙖𝙠𝙚 𝙟𝙖𝙣𝙖𝙮 𝙗𝙝𝙖𝙡𝙤𝙗𝙖𝙨𝙖 💯🌸  

          🌸💯______𝐂𝐄𝐎______💯🌸  
                
          𝘾𝙧𝙚𝙖𝙩𝙤𝙧: Mizan
╰╼|━━━━━━━━━━━━━━|╾╯`,
      attachment: groupImage ? fs.createReadStream(imgPath) : null
    };

    api.sendMessage(msg, event.threadID, () => {
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

  } catch (e) {
    console.log(e);
    api.sendMessage("কিছু সমস্যা হয়েছে!", event.threadID);
  }
};
