const axios = require("axios");

module.exports.config = {
  name: "enbn",
  version: "1.0.1",
  permission: 0,
  credits: "Mizan Ahmed",
  description: "en বা bn দিয়ে নির্দিষ্ট ভাষায় অনুবাদ (reply সহ)",
  prefix: "true",
  category: "tools",
  usages: "enbn en [text] বা enbn bn [text] অথবা reply সহ ব্যবহার",
  cooldowns: 3,
};

module.exports.run = async function({ api, event, args }) {
  let lang = args[0] ? args[0].toLowerCase() : null;
  let text = args.slice(1).join(" ");

  // যদি args না থাকে বা কম হয়, reply থেকে নেয়ার চেষ্টা
  if ((!lang || !["en", "bn"].includes(lang)) && event.messageReply) {
    // reply থেকে text নিবো, lang হবে undefined (নিচে চেক)
    text = event.messageReply.body;
    lang = null; // পরে detect করবো
  }

  // reply থেকে নিলে lang না থাকলে default detect করবো
  if (!text) {
    return api.sendMessage("❗ অনুবাদের জন্য text লিখুন অথবা reply দিয়ে ব্যবহার করুন।\n\nউদাহরণ:\nenbn en আমি তোমাকে ভালোবাসি\nবা reply দিয়ে enbn bn", event.threadID, event.messageID);
  }

  // যদি lang না দেওয়া হয়, তাহলে auto detect করবো
  if (!lang) {
    // Google translate দিয়ে detect
    try {
      const detectRes = await axios.post("https://translate.googleapis.com/translate_a/single", null, {
        params: {
          client: "gtx",
          sl: "auto",
          tl: "en",
          dt: "t",
          q: text
        }
      });
      lang = detectRes.data[2]; // detected language code: en / bn / others
    } catch {
      lang = "en"; // fallback
    }
  }

  // Lang কে normalize করবো (en বা bn না হলে default en)
  lang = lang === "bn" ? "bn" : "en";

  // Target language opposite হবে
  const targetLang = lang === "en" ? "bn" : "en";

  try {
    const translateRes = await axios.post("https://translate.googleapis.com/translate_a/single", null, {
      params: {
        client: "gtx",
        sl: lang,
        tl: targetLang,
        dt: "t",
        q: text
      }
    });

    const translated = translateRes.data[0].map(x => x[0]).join("");

    const msg =
`╭╼|━━━━━━━━━━━━━━|╾╮
🈯 ভাষা: ${lang === "en" ? "ইংরেজি" : "বাংলা"}
🔁 অনুবাদ (${targetLang === "bn" ? "বাংলা" : "ইংরেজি"}):
${translated}
╰╼|━━━━━━━━━━━━━━|╾╯`;

    return api.sendMessage(msg, event.threadID, event.messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ অনুবাদ করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
