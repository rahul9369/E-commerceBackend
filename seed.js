const mongoose = require("mongoose");
const Product = require("./models/product");
const products = [
  {
    name: "Iphone",
    img: "https://images.unsplash.com/photo-1695578130391-929bdfff85d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 2000,
    desc: "The iPhone 13 and iPhone 13 Mini (stylized as iPhone 13 mini) are smartphones designed, developed, marketed, and sold by Apple Inc. They are the fifteenth generation of iPhones (succeeding the iPhone 12 and iPhone 12 Mini respectively). They were unveiled at an Apple Event in Apple Park in Cupertino, California, on September 14, 2021, alongside the higher-priced iPhone 13 Pro and iPhone 13 Pro Max flagships. Pre-orders for the iPhone 13 and iPhone 13 Mini began on September 17, 2021.",
  },
  {
    name: "Macbook",
    img: "https://plus.unsplash.com/premium_photo-1676998931123-75789162f170?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
    price: 85000,
    desc: "MacBook is a brand of Mac notebook computers designed and marketed by Apple that use Apple's macOS operating system since 2006. The MacBook brand replaced the PowerBook and iBook brands during the Mac transition to Intel processors, announced in 2005. The current lineup consists of the MacBook Air (2008–present) and the MacBook Pro (2006–present). Two different lines simply named MacBook existed from 2006 to 2012 and 2015 to 2019. The MacBook brand was the world's top-selling line of premium laptops as of 2015.",
  },
  {
    name: "EarBouds",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZXRvb3RoJTIwZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    price: 12000,
    desc: "Air Buddies is a 2006 American sports comedy film directed by Robert Vince. It is the sixth film in the Air Bud series and the first in the direct-to-video spin-off series Air Buddies, which follows the life of a lonely teenager and his dog who has the uncanny ability to play every sport.",
  },
  {
    name: "Nike",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    price: 2000,
    desc: "The company was founded on January 25, 1964, as Blue Ribbon Sports, by Bill Bowerman and Phil Knight, and officially became Nike, Inc. on May 30, 1971. The company takes its name from Nike, the Greek goddess of victory.[8] Nike markets its products under its own brand, as well as Nike Golf, Nike Pro, Nike+, Nike Blazers, Air Force 1, Nike Dunk, Air Max, Foamposite, Nike Skateboarding, Nike CR7,[9] and subsidiaries including Air Jordan and Converse (brand). Nike also owned Bauer Hockey from 1995 to 2008, and previously owned Cole Haan, Umbro, and Hurley International.",
  },
  {
    name: "Dron",
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RHJvbmV8ZW58MHx8MHx8fDA%3D",
    price: 120000,
    desc: "DJI products have drawn concerns over privacy and security. They have been used by combatants from all sides during the Russian invasion of Ukraine.[8][9] The company has been sanctioned by the United States government but its drones can still be purchased and operated in the country.",
  },
  {
    name: "Dslr",
    img: "https://images.unsplash.com/photo-1625545013865-80da35181abf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RHNscnxlbnwwfHwwfHx8MA%3D%3D",
    price: 70000,
    desc: "A digital single-lens reflex camera (digital SLR or DSLR) is a digital camera that combines the optics and mechanisms of a single-lens reflex camera with a solid-state image sensor and digitally records the images from the sensor.",
  },
  {
    name: "t-shirt",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
    price: 200,
    desc: "A T-shirt (also spelled tee shirt, or tee for short) is a style of fabric shirt named after the T shape of its body and sleeves. Traditionally, it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of stretchy, light, and inexpensive fabric and are easy to clean. The T-shirt evolved from undergarments used in the 19th century and, in the mid-20th century, transitioned from undergarments to general-use casual clothing.",
  },
  {
    name: "Smart Watch",
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    price: 3500,
    desc: "A smartwatch is a portable and wearable computer device in a form of a watch; modern smartwatches provide a local touchscreen interface for daily use, while an associated smartphone app provides management and telemetry, such as long-term biomonitoring. While early models could perform basic tasks such as calculations, digital time telling, translations, and game-playing, smartwatches released since 2015 have more general functionality closer to smartphones, including mobile apps, a mobile operating system, and WiFi/Bluetooth connectivity.",
  },
  {
    name: "Study Table",
    img: "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3R1ZHklMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 10000,
    desc: "A writing table (French bureau plat) has a series of drawers directly under the surface of the table, to contain writing implements, so that it may serve as a desk. Antique versions have the usual divisions for the inkwell, the blotter and the sand or powder tray in one of the drawers, and a surface covered with leather or some other material less hostile to the quill or the fountain pen than simple hard wood.",
  },
  {
    name: "Bag",
    img: "https://images.unsplash.com/photo-1610413356812-0a1c23dde381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    price: 500,
    desc: "A bag (also known regionally as a sack) is a common tool in the form of a non-rigid container, typically made of cloth, leather, paper or plastic. The use of bags predates recorded history, with the earliest bags being lengths of animal skin, cotton, or woven plant fibers, folded up at the edges and secured in that shape with strings of the same material.[1] Bags can be used to carry items such as personal belongings, groceries, and other objects. They comes in various shapes and sizes, often equipped with handles or straps for easier carrying.",
  },
];

const seedDB = async () => {
  await Product.insertMany(products);
  console.log("DB Seeded");
};
module.exports = seedDB;
