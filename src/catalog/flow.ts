import { Page } from "playwright";
import { selectSavedCategory } from "./category.js";
import { fillProductDetails } from "./fillProductDetails.js";
import {
  openProductPage,
  saveAndGoBack,
} from "./products.js";
import {
  uploadImages,
  continueAfterImages,
} from "./images.js";


export async function runCatalogFlow(page: Page) {
  const catalog = {
  gst: "5",
  hsn: "6208",
  weight: "100",

  productName:
    "Women's Cotton Nighty, Premium Quality Nightgown, Attractive Nightwear, Maxi, Nighty, Nightdress, Daily wear-Gown, gown Maxi Nighty, women nighty, cloth for women, gown, sweet dream",

  sizes: ["M", "L", "XL", "XXL"],

  price: "299",
  mrp: "999",
  inventory: "50",

  bustSize: "46",
  waistSize: "48",
  hipSize: "48",
  lengthSize: "55",

  addOns: "No Add Ons",

  fabric: "Cotton",
  fitType: "Gown",
  genericName: "Nightdress",
  quantity: "1",
  countryOfOrigin: "India",

  manufacturerName: "VASUPRADHA",

  manufacturerAddress:
    "PLOT NO. 15, PREM NAGAR-B, MODEL TOWN, JAIPUR",

  manufacturerPincode: "302017",

  packerName: "VASUPRADHA",

  packerAddress:
    "PLOT NO. 15, PREM NAGAR-B, MODEL TOWN, JAIPUR",

  packerPincode: "302017",

  length: "Maxi",
  neck: "Round Neck",
  occasion: "Everyday",
  pattern: "Printed",
  pockets: "No Pocket",
  printOrPatternType: "Colorblocked",
  sleeveLength: "Short Sleeves",
  surfaceStyling: "Not Applicable",

  description:
    "Women's Cotton Nighty, Premium Quality Nightgown, Attractive Nightwear, Maxi, Nighty, Nightdress, Daily wear-Gown, gown Maxi Nighty, women nighty, cloth for women, gown, sweet dream",
};

const variants = [
  {
    color: "Beige",
    styleCode: "BUTTERFLY-REGULAR-BEIGE@013",
  },
  {
    color: "Rust",
    styleCode: "BUTTERFLY-REGULAR-RUST@013",
  },
  {
    color: "Blue",
    styleCode: "BUTTERFLY-REGULAR-BLUE@013",
  },
  {
    color: "Green",
    styleCode: "BUTTERFLY-REGULAR-GREEN@013",
  },
];

  await selectSavedCategory(page);

  await uploadImages(page, [
    "/home/divyansh/Pictures/1.jpeg",
    "/home/divyansh/Pictures/2.jpeg",
    "/home/divyansh/Pictures/3.jpeg",
    "/home/divyansh/Pictures/4.jpeg",
  ]);

  await continueAfterImages(page);

  for (let i = 0; i < variants.length; i++) {
  if (i > 0) {
    await openProductPage(page, i + 1);
  }

  const currentProduct = {
    ...catalog,
    ...variants[i],
  };

  await fillProductDetails(page, currentProduct);
}

await saveAndGoBack(page);
}