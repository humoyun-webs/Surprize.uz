export const tashkentMetro = {
  Chilonzor: [
    "Chinor",
    "Yangihayot",
    "Sergeli",
    "O'zgarish",
    "Chochtepa",
    "Olmazor",
    "Chilonzor",
    "Mirzo Ulug'bek",
    "Novza",
    "Milliy Bog'",
    "Xalqlar do'stligi",
    "Paxtakor",
    "Mustaqillik Maydoni",
    "Amir Temur Xiyoboni",
    "Hamid Olimjon",
    "Pushkin",
    "Buyuk Ipak Yoli",
  ],
  Ozbekiston: [
    "Beruniy",
    "Tinchlik",
    "Chorsu",
    "Ga'fur Gulom",
    "Alisher Navoiy",
    "O'zbekiston",
    "Kosmonavtlar",
    "Oybek",
    "Toshkent",
    "Mashinasozlar",
    "Do'stlik",
  ],
  Yunusobod: [
    "Ming O'rik",
    "Yunus Rajabiy",
    "Abdulla Qodiriy",
    "Minor",
    "Bodomzor",
    "Shahriston",
    "Yunusobod",
    "Turkiston",
  ],
  Qoyliq: [
    "Texnopark",
    "Yashnobod",
    "Tuzel",
    "Olmos",
    "Rohat",
    "Yangiobod",
    "Qo'ylig",
    "Matonat",
    "Qiyot",
    "Tolariq",
    "Xonobod",
    "Quruvchilar",
    "Turon",
    "Qipchoq",
  ],
};

export function getLineByStation(station) {
  for (const [line, stations] of Object.entries(tashkentMetro)) {
    if (stations.includes(station)) {
      return line;
    }
  }
  return "Station not found";
}
