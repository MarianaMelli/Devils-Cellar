const Product = require("../models/Product");
const Category = require("../models/Category");

module.exports = async () => {
  const productList = [];
  const categoryList = [];

  const redCategory = new Category({
    name: "Red",
    img: "red-category-img.jpg",
  });
  categoryList.push(redCategory);

  const whiteCategory = new Category({
    name: "White",
    img: "white-category-img.jpg",
  });
  categoryList.push(whiteCategory);

  const roseCategory = new Category({
    name: "Rose",
    img: "rose-category-img.jpg",
  });
  categoryList.push(roseCategory);

  const sparklingCategory = new Category({
    name: "Sparkling",
    img: "sparkling-category-img.jpg",
  });
  categoryList.push(sparklingCategory);

  await Category.insertMany(categoryList);

  const intenseRed = new Product({
    name: "Intense red",
    description:
      "Intense black fruit aromas dominate the nose, accompanied by a hint of bitter chocolate. The palate reveals pronounced tannins with notes of black cherry, culminating in a bold and lingering finish. Best served between 18 and 20°C",
    img: "red-blend-intense-red.webp",
    featuredImg: "featured-intense-red2.webp",
    unitPrice: 575,
    stock: 1,
    featured: true,
    category: redCategory._id,
    slogan: "Captivating Depths: Unleash Bold Elegance",
  });
  productList.push(intenseRed);

  const reservaMerlot = new Product({
    name: "Reserva Especial Merlot ",
    description:
      "Hailing from the Maule Valley, this Merlot presents itself as smooth and refined, offering intense aromas of both red and black fruits, notably cherry and plum. On the palate, it stands out for its medium body, velvety tannins, and subtle toasted hints derived from barrel aging. Ideal serving temperature ranges between 18 and 20°C.",
    img: "reserva-merlot.webp",
    featuredImg: "featured-reserva-merlot.webp",
    unitPrice: 699,
    stock: 40,
    featured: true,
    category: redCategory._id,
    slogan: "Embrace Pure Indulgence: Taste the Elegance",
  });
  productList.push(reservaMerlot);

  const reservaPedroJimenez = new Product({
    name: "Reserva Pedro Jiménez",
    description:
      "A wine that stands out on the nose for its freshness and minerality. In the mouth, it has a medium body, accompanied by gentle citrus and floral notes, which complement perfectly with mineral touches. Pedro Jimenez is ideal to accompany appetizers, fish, seafood, and salads. Serving temperature: 8-10ºC.",
    img: "reserva-pedro-jimenez.webp",
    featuredImg: "featured-pedro-jimenez.webp",
    unitPrice: 700,
    stock: 50,
    featured: true,
    category: whiteCategory._id,
    slogan: "Embrace the Essence: Freshness in Every Sip",
  });
  productList.push(reservaPedroJimenez);

  const devilRose = new Product({
    name: "Devil's Rose",
    description:
      "This rosé captivates with its pronounced freshness and delights with its lightness right from the start. It boasts a perfect balance between acidity, minerality, and delicacy. Best served between 6-8°C, it's a wine that charms with its vibrant acidity, subtle mineral notes, and exquisite finesse.",
    img: "devil-collection-devil-rose.webp",
    featuredImg: "featured-rose.webp",
    unitPrice: 450,
    stock: 20,
    featured: true,
    category: roseCategory._id,
    slogan: "Discover Bliss: Taste the Magic",
  });
  productList.push(devilRose);

  const devilBrut = new Product({
    name: "Devil's Brut",
    description:
      "With a touch of distinction and glamour, this sparkling wine embodies a groundbreaking style, delivering an unparalleled experience of freshness and elegance. Best served at a temperature between 6 and 8°C.",
    img: "devils-brut.webp",
    featuredImg: "featured-spark.webp",
    unitPrice: 800,
    stock: 60,
    featured: true,
    category: sparklingCategory._id,
    slogan: "Distinctly Glamorous: Unparalleled Freshness",
  });
  productList.push(devilBrut);

  const cabernetSauvignon = new Product({
    name: "Cabernet Sauvignon",
    description:
      "A wine that delivers aromas of cherry and blackcurrant, along with a subtle touch of vanilla. On the palate, it has a medium body with pronounced tannins, leading to a long finish. This Cabernet Sauvignon is ideal for pairing with roasted red meats and mature cheeses. Recommended serving temperature: 18-20°C.",
    img: "cabernet-sauvignon.webp",
    unitPrice: 900,
    stock: 80,
    featured: false,
    category: redCategory._id,
    slogan: "Savor the Symphony: Rich, Bold, Unforgettable",
  });
  productList.push(cabernetSauvignon);

  const merlot = new Product({
    name: "Merlot",
    description:
      "A wine that stands out with cherry and sour cherry aromas, complemented by subtle hints of toffee and vanilla. On the palate, it's silky-smooth, low in astringency, leading to an elegant and balanced finish. This Merlot pairs perfectly with mild cheeses, pastas, risottos, and lightly seasoned meats. Recommended serving temperature: 18-20°C",
    img: "merlot.webp",
    unitPrice: 1000,
    stock: 10,
    featured: false,
    category: redCategory._id,
    slogan: "Embrace Elegance in Every Sip: Merlot Refined.",
  });
  productList.push(merlot);

  const carmenere = new Product({
    name: "Carmenere",
    description:
      "Expressive on the nose, with delicate hints of forest fruits and plum, accompanied by touches of coffee and spices. On the palate, it has a medium body with rounded tannins, leading to a lingering finish. This Carmenere pairs perfectly with game meats, roasted vegetables, and various types of cheeses. Recommended serving temperature: 16-18ºC.",
    img: "carmenere.webp",
    unitPrice: 1200,
    stock: 50,
    featured: false,
    category: redCategory._id,
    slogan: "Unleash Flavorful Harmony: Carmenere's Essence.",
  });
  productList.push(carmenere);

  const shiraz = new Product({
    name: "Shiraz",
    description:
      "This wine stands out with aromas of black fruit complemented by hints of pepper and cedar. On the palate, it's intense with firm tannins, featuring notes of red currant and cherry. This Shiraz is a perfect companion for meat stews and boldly seasoned dishes, such as Indian cuisine. Recommended serving temperature: 18-20ºC.",
    img: "shiraz.webp",
    unitPrice: 1000,
    stock: 25,
    featured: false,
    category: redCategory._id,
    slogan: "Bold Flavor Unleashed: Shiraz's Spice Symphony",
  });
  productList.push(shiraz);

  const pinotNoir = new Product({
    name: "Pinot Noir",
    description:
      "A fresh wine characterized by notes of strawberry, raspberry, and delicate hints of cedar. On the palate, it presents lively acidity with forest fruit notes. This Pinot Noir is a perfect companion for all kinds of oily fish, Italian cuisine, and various types of cheeses. Recommended serving temperature: 14-16ºC.",
    img: "pinot-noir.webp",
    unitPrice: 800,
    stock: 40,
    featured: false,
    category: redCategory._id,
    slogan: "Vividly Fresh: Pinot Noir's Delicate Dance",
  });
  productList.push(pinotNoir);

  const malbec = new Product({
    name: "Malbec",
    description:
      "A wine that stands out on the nose with delicate notes of plum and cherry, followed by subtle hints of pepper and dark chocolate. On the palate, it has a medium body and firm tannins. This Malbec pairs perfectly with roasted red meats and a wide variety of cheeses. Recommended serving temperature: 18-20ºC.",
    img: "malbec.webp",
    unitPrice: 1300,
    stock: 30,
    featured: false,
    category: redCategory._id,
    slogan: "Bold Elegance Unveiled: Malbec's Perfect Harmony",
  });
  productList.push(malbec);

  const redBlend = new Product({
    name: "Red Blend",
    description:
      "Matured, with pronounced aromas of black cherry and plum. On the palate, it reveals spicy notes and gentle hints of dark chocolate, offering balance and a captivating embrace. Recommended serving temperature: 18-20ºC.",
    img: "red-blend.webp",
    unitPrice: 700,
    stock: 65,
    featured: false,
    category: redCategory._id,
    slogan: "Velvety Richness, Captivating Depth: Embrace the Experience",
  });
  productList.push(redBlend);

  const devilsRed = new Product({
    name: "Devil's Red",
    description:
      "With an imposing and vibrant style, this creation magnificently blends elegance, maturity, and class into a unique and impactful wine. Recommended serving temperature: 18-20ºC.",
    img: "devils-red.webp",
    unitPrice: 900,
    stock: 28,
    featured: false,
    category: redCategory._id,
    slogan: "Imposing Elegance, Unmatched Impact: Taste the Difference",
  });
  productList.push(devilsRed);

  const reservaEspecialCabernetSauvignon = new Product({
    name: "Reserva Especial Cabernet Sauvignon",
    description:
      "Hailing from the Maule Valley, this Cabernet Sauvignon expresses red fruit notes, accompanied by subtle toasty hints from barrel aging. On the palate, it's well-structured, with a pronounced character and firm tannins. Recommended serving temperature: 18-20ºC.",
    img: "reserva-especial-cabernet-sauvignon.webp",
    unitPrice: 1500,
    stock: 47,
    featured: false,
    category: redCategory._id,
    slogan: "Maule Valley's Mastery Unveiled: Cabernet Sauvignon's Bold Symphony",
  });
  productList.push(reservaEspecialCabernetSauvignon);

  const reservaEspecialCarmenere = new Product({
    name: "Reserva Especial Carmenere",
    description:
      "From Maule Valley, this Carmenere unveils aromas of black plums and spices. Delicately presented on the palate, it carries a subtle toasty hint from the barrel, accompanied by elegant and silky tannins.",
    img: "reserva-especial-carmenere.webp",
    unitPrice: 800,
    stock: 56,
    featured: false,
    category: redCategory._id,
    slogan: "Maule's Spice and Elegance: Carmenere Refined.",
  });
  productList.push(reservaEspecialCarmenere);

  

  const reservaPrivadaCabernetSauvignon = new Product({
    name: "Reserva Privada Cabernet Sauvignon",
    description:
      "Crafted from carefully selected grapes of Maipo Valley, this wine showcases delicate aromas of red fruits and black currants. On the palate, it boasts firm and enveloping tannins, balancing red fruit notes harmoniously with toasty barrel contributions, leading to a long and persistent finish.Recommended serving temperature: 18-20ºC.",
    img: "reserva-privada-cabernet-sauvignon.webp",
    unitPrice: 1600,
    stock: 28,
    featured: false,
    category: redCategory._id,
    slogan: "Maipo Valley's Finest: Red Fruit Symphony Unveiled",
  });
  productList.push(reservaPrivadaCabernetSauvignon);

  const reservaPrivadaCarmenere = new Product({
    name: "Reserva Privada Carmenere",
    description:
      "Crafted from carefully selected grapes of Rapel Valley, this Carmenere boasts delicate aromas of plum and blackcurrant, with subtle hints of cedar. It presents a good structure and density on the palate, accompanied by velvety tannins that lead to a long and elegant finish.Recommended serving temperature: 16-18ºC.",
    img: "reserva-privada-carmenere.webp",
    unitPrice: 1700,
    stock: 74,
    featured: false,
    category: redCategory._id,
    slogan: "Rapel Valley's Elegance Unveiled: Carmenere's Velvet Journey",
  });
  productList.push(reservaPrivadaCarmenere);

  const legendaryCollection = new Product({
    name: "Legendary Collection",
    description:
      "Crafted from our Legendary Collection, this exquisite wine embodies the essence of elegance and refinement. With carefully selected grapes, it boasts delicate aromas, a robust structure, and an enduring finish that defines its legendary status.Recommended serving temperature: 18-20ºC.",
    img: "legendary-collection.webp",
    unitPrice: 2000,
    stock: 65,
    featured: false,
    category: redCategory._id,
    slogan: "Legendary Collection: Where Elegance Becomes Timeless.",
  });
  productList.push(legendaryCollection);

  const routeCabernetSauvignonMaipoValley = new Product({
    name: "Route of Cabernet Sauvignon - Maipo Valley",
    description:
      "This Cabernet Sauvignon originates in the Maipo Valley, influenced by the imposing Andes mountain range and a Mediterranean climate, featuring significant daily temperature fluctuations. The result is a wine with notes of cherry, plum, and cassis, perfectly complemented by hints of vanilla from 16 months of barrel aging, predominantly in French oak.Recommended serving temperature: 18-20ºC.",
    img: "cabernet-sauvignon-maipo-valley.webp",
    unitPrice: 1900,
    stock: 84,
    featured: false,
    category: redCategory._id,
    slogan: "Maipo Valley's Elevation: Cabernet's Andean Symphony.",
  });
  productList.push(routeCabernetSauvignonMaipoValley);

  const routeCabernetSauvignonRapelValley = new Product({
    name: "Route of Cabernet Sauvignon - Rapel Valley",
    description:
      "This Cabernet Sauvignon originates in the Rapel Valley, a region characterized by plains and gentle slopes, embraced by a Mediterranean climate with moderate temperatures year-round. The result is a wine with notes of cherry and blackberry, accompanied by delicate hints of cedar from 12 months of barrel aging, predominantly in French oak.Recommended serving temperature: 18-20ºC.",
    img: "cabernet-sauvignon-rapel-valley.webp",
    unitPrice: 1800,
    stock: 50,
    featured: false,
    category: redCategory._id,
    slogan: "Rapel Valley's Essence: Cabernet's Mediterranean Journey.",
  });
  productList.push(routeCabernetSauvignonRapelValley);

  const routeCabernetSauvignonMauleValley = new Product({
    name: "Route of Cabernet Sauvignon - Maule Valley",
    description:
      "This Cabernet Sauvignon hails from the Maule Valley, known for its clay-rich soils that play a crucial role in water retention and nutrient supply. These conditions, coupled with a Mediterranean climate, yield a wine with structure and elegance. It boasts aromas of black fruit, complemented by pleasant toasty notes from 10 months of aging in French and American oak barrels.Recommended serving temperature: 18-20ºC.",
    img: "cabernet-sauvignon-maule-valley.webp",
    unitPrice: 1700,
    stock: 96,
    featured: false,
    category: redCategory._id,
    slogan: "Maule Valley's Mastery: Crafting Elegance in Every Pour.",
  });
  productList.push(routeCabernetSauvignonMauleValley);

  const chardonnay = new Product({
    name: "Chardonnay",
    description:
      "This wine stands out with aromas of pineapple, peach, and citrus, complemented by subtle hints of hazelnut. It's vibrant and well-structured on the palate, featuring grapefruit notes accompanied by subtle touches of vanilla. This Chardonnay pairs perfectly with grilled fish, seafood, and pasta dishes with creamy sauces. Recommended serving temperature: 10-12ºC.",
    img: "chardonnay.webp",
    unitPrice: 1000,
    stock: 50,
    featured: false,
    category: whiteCategory._id,
    slogan: "Vibrant Sophistication: Chardonnay's Elegant Symphony",
  });
  productList.push(chardonnay);

  const belightSauvignonBlanc = new Product({
    name: "Belight Sauvignon Blanc",
    description:
      "Belight is Casillero del Diablo's new, light offering. Each glass of this wine contains just 65 calories and 8.5% alcohol, retaining the color, aromas, and flavors characteristic of our classic, fresh Sauvignon Blanc. Recommended serving temperature: 8-10ºC.",
    img: "belight-sauvignon-blanc.webp",
    unitPrice: 1200,
    stock: 20,
    featured: false,
    category: whiteCategory._id,
    slogan: "Belight: Savour the Light, Embrace the Flavor",
  });
  productList.push(belightSauvignonBlanc);

  const sauvignonBlanc = new Product({
    name: "Sauvignon Blanc",
    description:
      "Fresh from the start. It stands out with notes of lime, peach, and herbal hints. On the palate, it maintains freshness with a medium and balanced acidity. This Sauvignon Blanc is perfect for pairing with ceviche, fresh seafood, and various salads. Recommended serving temperature: 8-10ºC.",
    img: "sauvignon blanc.webp",
    unitPrice: 1300,
    stock: 50,
    featured: false,
    category: whiteCategory._id,
    slogan: "Freshness Redefined: Sauvignon Blanc's Vibrant Essence",
  });
  productList.push(sauvignonBlanc);

  const viognier = new Product({
    name: "Viognier",
    description:
      "This wine captivates with aromas of peach and cherimoya, complemented by a subtle hint of vanilla. It has a medium body, balanced acidity, and a long, pleasant finish. This Viognier is perfect for pairing with Asian cuisine as well as various types of cheeses. Recommended serving temperature: 10-12ºC.",
    img: "viognier.webp",
    unitPrice: 1400,
    stock: 50,
    featured: false,
    category: whiteCategory._id,
    slogan: "Viognier Unveiled: A Symphony of Flavors",
  });
  productList.push(viognier);

  const pinotGrigio = new Product({
    name: "Pinot Grigio",
    description:
      "This wine features aromas of fresh pear and grapefruit. On the palate, it's smooth and rounded, with a medium acidity complemented by gentle hints of lime and peach. This Pinot Grigio is ideal for pairing with salads, fish, and seafood. Recommended serving temperature: 10-12ºC.",
    img: "pinot-grigio.webp",
    unitPrice: 1500,
    stock: 10,
    featured: false,
    category: whiteCategory._id,
    slogan: "Embrace Freshness: Pinot Grigio's Delightful Pairings",
  });
  productList.push(pinotGrigio);

  const devilsWhite = new Product({
    name: "Devil's White",
    description:
      "A young, seductive, and fresh wine from start to finish, boasting a light and embracing personality that offers unparalleled expressiveness. Recommended serving temperature: 10-12ºC.",
    img: "devils-white.webp",
    unitPrice: 1600,
    stock: 50,
    featured: false,
    category: whiteCategory._id,
    slogan: "Unveiling Fresh Allure: Wine's Youthful Charm",
  });
  productList.push(devilsWhite);

  const reservaEspecialChardnonnay = new Product({
    name: "Reserva Especial Chardonnay",
    description:
      "Hailing from Limarí Valley, this Chardonnay presents notes of pineapple and peach, followed by subtle hints of hazelnut. On the palate, it has a medium body with fresh peach notes that perfectly complement a subtle minerality.Recommended serving temperature: 10-12ºC.",
    img: "reserva-especial-chardonnay.webp",
    unitPrice: 1400,
    stock: 87,
    featured: false,
    category: whiteCategory._id,
    slogan: "Limarí's Essence: Chardonnay's Pure Expression",
  });
  productList.push(reservaEspecialChardnonnay);

  const reservaEspecialSauvignonBlanc = new Product({
    name: "Reserva Especial Sauvignon Blanc",
    description:
      "Hailing from the Colchagua Valley, this Sauvignon Blanc stands out for its pronounced freshness and citrus notes on the nose. On the palate, it has a medium body, showcasing hints of grapefruit and green apple, beautifully complemented by pleasant minerality.Recommended serving temperature: 8-10ºC.",
    img: "reserva-especial-sauvignon-blanc.webp",
    unitPrice: 1600,
    stock: 50,
    featured: false,
    category: whiteCategory._id,
    slogan: "Vibrant Citrus Harmony: Colchagua's Sauvignon Blanc Tale",
  });
  productList.push(reservaEspecialSauvignonBlanc);

  const rose = new Product({
    name: "Reserva Rose",
    description:
      "A wine that captivates with its pronounced freshness and enchants with its lightness from the start. It strikes a perfect balance between acidity, minerality, and delicacy. This Rosé is perfect for accompanying appetizers featuring cheeses and nuts. Recommended serving temperature: 8-10ºC.",
    img: "rose.webp",
    unitPrice: 1700,
    stock: 41,
    featured: false,
    category: roseCategory._id,
    slogan: "Unwind your senses, sip the elegance",
  });
  productList.push(rose);

  const belightRose = new Product({
    name: "Belight Rose",
    description:
      "Belight is Casillero del Diablo's new, light offering. Each glass of this wine contains just 65 calories and 8.5% alcohol, preserving the color, aromas, and flavors characteristic of our classic, fresh Rosé. Recommended serving temperature: 8-10ºC.",
    img: "belight-rose.webp",
    unitPrice: 1900,
    stock: 50,
    featured: false,
    category: roseCategory._id,
    slogan: "Unwind Your Senses, Taste Pure Elegance",
  });
  productList.push(belightRose);

  await Product.insertMany(productList);

  console.log("[Database] Se corrió el seeder de Product.");
};
