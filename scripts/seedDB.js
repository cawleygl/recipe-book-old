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
    img: "https://www.seriouseats.com/thmb/2JIfR84hQDdB2JTBJjmuzKlI1cA=/880x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__10__20181017-pasta-gricia-vicky-wasik-21-b1cfa4939bd347d1a59068b55c801d29.jpg",
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
    tags: [
      'vegan', 'gluten-free', 'dairy-free'
    ],
    notes: "",
  },
  {
    name: "Pasta alla Gricia2",
    img: "https://www.seriouseats.com/thmb/2JIfR84hQDdB2JTBJjmuzKlI1cA=/880x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__10__20181017-pasta-gricia-vicky-wasik-21-b1cfa4939bd347d1a59068b55c801d29.jpg",
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
    tags: [
      'vegan', 'gluten-free', 'dairy-free'
    ],
    notes: "",
  }
];
const tagSeed = [
  { name: "vegan" }
];

db.Recipe
  .deleteMany({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.insertedCount + " recipe records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Tag
  .deleteMany({})
  .then(() => db.Tag.collection.insertMany(tagSeed))
  .then(data => {
    console.log(data.insertedCount + " tag records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
