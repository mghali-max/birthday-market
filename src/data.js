// src/data.js

// CATEGORY DEFINITIONS
// colorClass values match CSS classes in App.css
export const CATEGORIES = [
  { id: "browse-all",     name: "Browse all",     colorClass: "purple"   },
  { id: "toys",           name: "Toys",           colorClass: "pink"     },
  { id: "books",          name: "Books",          colorClass: "blue"     },
  { id: "sports",         name: "Sports",         colorClass: "green"    },
  { id: "games",          name: "Games",          colorClass: "yellow"   },
  { id: "gift-cards",     name: "Gift Cards",     colorClass: "peach"    },
  { id: "electronics",    name: "Electronics",    colorClass: "cyan"     },
  { id: "jewelry",        name: "Jewelry",        colorClass: "lavender" },
  { id: "arts-and-crafts",name: "Arts & Crafts",  colorClass: "coral"    },
  { id: "misc",           name: "Misc.",          colorClass: "mint"     },
];

// PRODUCT DEFINITIONS
// Each key must match a category id (except "browse-all", which is special)
export const PRODUCTS = {
  toys: [
    { id: 1, name: "Lego City Set", cost: 40, description: "Small Lego kit" },
    { id: 2, name: "Stuffed Bear", cost: 25, description: "Soft plush toy" },
  ],

  books: [
    { id: 3, name: "Adventure Story", cost: 20, description: "Chapter book" },
    { id: 4, name: "Picture Book", cost: 15, description: "Illustrated book" },
  ],

  sports: [
    { id: 5, name: "Basketball", cost: 35, description: "Outdoor ball" },
  ],

  games: [
    { id: 6, name: "Board Game", cost: 30, description: "Family board game" },
  ],

  "gift-cards": [
    { id: 7, name: "Bookstore Gift Card", cost: 25, description: "$10 value" },
  ],

  electronics: [
    { id: 8, name: "Headphones", cost: 45, description: "Kids headphones" },
  ],

  jewelry: [
    { id: 9, name: "Charm Bracelet", cost: 30, description: "Adjustable bracelet" },
  ],

  "arts-and-crafts": [
    { id: 10, name: "Craft Kit", cost: 25, description: "Stickers, markers & glue" },
    { id: 11, name: "Coloring Set", cost: 20, description: "Crayons & sketch pad" },
  ],

  misc: [
    { id: 12, name: "Surprise Gift", cost: 15, description: "Fun mystery item" },
  ],
};
