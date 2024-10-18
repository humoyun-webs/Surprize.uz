export const tashkentMetro = {
  Chilanzar: [
    "Olmazor",
    "Pushkin",
    "Novza",
    "Milliy Bog'",
    "Hamid Olimjon",
    "Mustaqillik Maydoni",
    "Amir Temur Khiyoboni",
    "Buyuk Ipak Yoli",
  ],
  Uzbekistan: [
    "Beruniy",
    "Tinchlik",
    "Chorsu",
    "Gafur Gulom",
    "Alisher Navoi",
    "Paxtakor",
    "Toshkent",
    "Ozbekiston",
    "Kosmonavtlar",
    "Bodomzor",
    "Shahriston",
  ],
  Unusabad: ["Ming Orik", "Yunus Rajabiy", "Turkiston", "Shahriston"],
  Qoyliq: [
    "Do'stlik",
    "Qo'yliq",
    "Turon",
    "Yangiobod",
    "Xonobod",
    "Matonat",
    "Tuzel",
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
