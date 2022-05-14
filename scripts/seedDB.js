const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Recipes collection and inserts the recipes below

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://localhost/recipe-book'
);

const recipeSeed = [
  {
    name: "Pasta alla Gricia",
    source: "Serious Eats",
    description: "A simple pasta dish",
    img: {
      preview: "https://www.seriouseats.com/thmb/2JIfR84hQDdB2JTBJjmuzKlI1cA=/880x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__10__20181017-pasta-gricia-vicky-wasik-21-b1cfa4939bd347d1a59068b55c801d29.jpg",
      data: null
    },
    ingredients: [
      { name: "Guanciale", amount: 8, unit: "oz" },
      { name: "Extra-virgin olive oil", amount: 1, unit: "tbsp" },
      { name: "Rigatoni", amount: 12, unit: "oz" },
      { name: "Pecorino Romano cheese", amount: 2, unit: "oz" },
      { name: "Salt and Pepper", amount: null, unit: null },
    ],
    directions: [
      "Freeze guanciale for at least 15 minutes, and up to 45 minutes (partially freezing the guanciale makes it easier to slice). Using a sharp chef's knife, cut into 1/4-inch-thick planks, then cut planks into 1/4-inch-thick batons (lardons).",
      "In a large 12-inch stainless steel skillet, heat oil over medium-low heat until shimmering. Add guanciale and cook, stirring occasionally, until fat has rendered and guanciale is golden brown and crisp, about 15 minutes. Using slotted spoon, transfer guanciale to a plate; set aside. Reduce heat to low, and bloom about 1 teaspoon freshly ground black pepper in rendered guanciale fat until pepper foams and is aromatic, about 1 minute. Remove skillet from heat.",
      "Meanwhile, in a Dutch oven or medium pot, bring 3 quarts of water and 2 teaspoons kosher salt to a boil over high heat. Set a colander inside a large heatproof bowl in the sink. Add rigatoni to water and cook, stirring frequently during the first minute to prevent pasta from sticking.",
      "Once pasta has cooked for 4 minutes 30 seconds, transfer 2 cups (475ml) of starchy pasta water to skillet. Return skillet to high heat and bring to a boil, swirling to emulsify pasta water with guanciale fat.",
      "When pasta has cooked for a total of 5 minutes, drain in prepared colander, then transfer pasta to skillet (the pasta will be very undercooked at this point, but it will continue cooking in the skillet); reserve drained pasta water.",
      "Cook rigatoni, swirling skillet constantly and gently stirring with a spoon or rubber spatula, to ensure even cooking and that the sauce remains emulsified, until pasta is al dente and sauce is thickened and reduced, 6 to 8 minutes; if sauce reduces too much before pasta has finished cooking, add more reserved pasta water to skillet in 1/4-cup increments. Add guanciale to skillet and carefully toss to combine.",
      "Remove from heat, add half of the grated Pecorino Romano, and toss or stir rapidly to combine. Once cheese is fully emulsified in the sauce, add remaining Pecorino Romano, and toss or stir rapidly once more to combine. Adjust sauce consistency as needed with more pasta water. Season with salt and pepper, if needed. Serve right away, passing more cheese at the table.",
    ],
    tags: [],
    notes: "Don't forget the cheese",
  },
  {
    name: "The Classic Burger",
    source: "MyRecipes",
    description: "A classic hamburger",
    img: {
      preview: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2005%2F06%2F22%2Fclassic-burgers-u.jpg",
      data: null
    },
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "pound" },
      { name: "Egg", amount: 1, unit: "" },
      { name: "Minced Onion", amount: 0.5, unit: "cup" },
      { name: "Fine Dried Bread Crumbs", amount: 0.25, unit: "cup" },
      { name: "Worcestershire", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 1, unit: "clove" },
      { name: "Iceberg Lettuce", amount: 4, unit: "leaves" },
      { name: "Tomato", amount: 1, unit: "" },
      { name: "Red Onion", amount: 4, unit: "slice" },
      { name: "Hamburger Buns", amount: null, unit: "" },
    ],

    directions: [
      "In a bowl, mix ground beef, egg, onion, bread crumbs, Worcestershire, garlic, 1/2 teaspoon salt, and 1/4 teaspoon pepper until well blended. Divide mixture into four equal portions and shape each into a patty about 4 inches wide.", "In a large 12-inch stainless steel skillet, heat oil over medium-low heat until shimmering. Add guanciale and cook, stirring occasionally, until fat has rendered and guanciale is golden brown and crisp, about 15 minutes. Using slotted spoon, transfer guanciale to a plate; set aside. Reduce heat to low, and bloom about 1 teaspoon freshly ground black pepper in rendered guanciale fat until pepper foams and is aromatic, about 1 minute. Remove skillet from heat.",
      "Lay burgers on an oiled barbecue grill over a solid bed of hot coals or high heat on a gas grill (you can hold your hand at grill level only 2 to 3 seconds); close lid on gas grill. Cook burgers, turning once, until browned on both sides and no longer pink inside (cut to test), 7 to 8 minutes total. Remove from grill",
      "Lay buns, cut side down, on grill and cook until lightly toasted, 30 seconds to 1 minute.",
      "Spread mayonnaise and ketchup on bun bottoms. Add lettuce, tomato, burger, onion, and salt and pepper to taste. Set bun tops in place.",
    ],
    tags: [],
    notes: "Medium-Well",
  }

];
const tagSeed = [
  // Bright
  { name: "red-bright", tagColor: "FireBrick", textColor: "white" },
  { name: "orange-bright", tagColor: "DarkOrange", textColor: "white" },
  { name: "yellow-bright", tagColor: "Gold", textColor: "black" },
  { name: "green-bright", tagColor: "ForestGreen", textColor: "white" },
  { name: "lightblue-bright", tagColor: "DodgerBlue", textColor: "white" },
  { name: "darkblue-bright", tagColor: "MediumBlue", textColor: "white" },
  { name: "purple-bright", tagColor: "RebeccaPurple", textColor: "white" },
  { name: "pink-bright", tagColor: "Plum", textColor: "black" },
  // Tropical
  { name: "red-tropical", tagColor: "Crimson", textColor: "white" },
  { name: "orange-tropical", tagColor: "OrangeRed", textColor: "white" },
  { name: "yellow-tropical", tagColor: "Yellow", textColor: "black" },
  { name: "green-tropical", tagColor: "Chartreuse", textColor: "black" },
  { name: "lightblue-tropical", tagColor: "Aquamarine", textColor: "black" },
  { name: "darkblue-tropical", tagColor: "Teal", textColor: "white" },
  { name: "purple-tropical", tagColor: "MediumVioletRed", textColor: "white" },
  { name: "pink-tropical", tagColor: "LightCoral", textColor: "white" },
  // Pastel
  { name: "red-pastel", textColor: "FireBrick", tagColor: "MistyRose" },
  { name: "orange-pastel", textColor: "DarkOrange", tagColor: "AntiqueWhite" },
  { name: "yellow-pastel", textColor: "GoldenRod", tagColor: "LemonChiffon" },
  { name: "green-pastel", textColor: "ForestGreen", tagColor: "HoneyDew" },
  { name: "lightblue-pastel", textColor: "DodgerBlue", tagColor: "LightCyan" },
  { name: "darkblue-pastel", textColor: "MediumBlue", tagColor: "LightSteelBlue" },
  { name: "purple-pastel", textColor: "RebeccaPurple", tagColor: "Lavender" },
  { name: "pink-pastel", textColor: "Plum", tagColor: "LavenderBlush" },
  // Dark
  { name: "red-dark", tagColor: "DarkRed", textColor: "MistyRose" },
  { name: "orange-dark", tagColor: "Chocolate", textColor: "AntiqueWhite" },
  { name: "yellow-dark", tagColor: "DarkGoldenRod", textColor: "LemonChiffon" },
  { name: "green-dark", tagColor: "DarkGreen", textColor: "HoneyDew" },
  { name: "lightblue-dark", tagColor: "SteelBlue", textColor: "LightCyan" },
  { name: "darkblue-dark", tagColor: "MidnightBlue", textColor: "LightSteelBlue" },
  { name: "purple-dark", tagColor: "Indigo", textColor: "Lavender" },
  { name: "pink-dark", tagColor: "DarkMagenta", textColor: "LavenderBlush" },
];

db.Recipe
  .deleteMany({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.insertedCount + " recipe records inserted!");
  })
  .then(() => db.Recipe.collection.createIndex({ "name": "text", "source": "text", "description": "text", "notes": "text" }))

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Tag
  .deleteMany({})
  .then(() => db.Tag.collection.insertMany(tagSeed))
  .then(data => {
    console.log(data.insertedCount + " tag records inserted!");
  })
  .then(() => {
    db.Tag.collection.createIndex({ "name": "text" })
    process.exit(0);
  })

  .catch(err => {
    console.error(err);
    process.exit(1);
  });
