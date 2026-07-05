import { Page } from "playwright";
import { logger } from "../utils/logger.js";

export async function selectGst(
  page: Page,
  gst: string
) {
  logger.info(`Selecting GST: ${gst}`);

  await page.locator("#supplier_gst_percent").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(gst);

  await page.getByRole("menuitem", {
    name: gst,
    exact: true,
  }).click();

  logger.success("GST selected.");
}

export async function selectHsn(
  page: Page,
  hsn: string
) {
  logger.info(`Selecting HSN: ${hsn}`);

  await page.locator("#hsn_code").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(hsn);

  await page.getByRole("menuitem", {
    name: hsn,
    exact: true,
  }).click();

  logger.success("HSN selected.");
}

export async function enterNetWeight(page: Page, weight: string) {
  logger.info(`Entering net weight: ${weight}g`);

  await page
    .getByPlaceholder("Enter Net Weight (gms)")
    .fill(weight);

  logger.success("Net weight entered.");
}

export async function enterStyleCode(page: Page, styleCode: string) {
  logger.info(`Entering style code: ${styleCode}`);

  await page
    .getByRole("textbox", {
      name: "Enter Style code/ Product ID",
    })
    .fill(styleCode);

  logger.success("Style code entered.");
}

export async function enterProductName(page: Page, productName: string) {
  logger.info("Entering product name...");

  await page
    .getByRole("textbox", {
      name: "Enter Product Name",
    })
    .fill(productName);

  logger.success("Product name entered.");
}
export async function selectSizes(
  page: Page,
  sizes: string[]
) {
  const sizeChartVisible =
  await page.locator("#meesho_price").first().isVisible().catch(() => false);

if (!sizeChartVisible) {
  logger.info("Opening size selector...");

  await page.locator('input[id^="mui-"][readonly]').click();

  for (const size of sizes) {
    const sizeOption = page
      .locator(".MuiBox-root.css-60om15")
      .getByText(size, { exact: true })
      .locator("..");

    await sizeOption.locator("svg").click();

    logger.info(`Selected size: ${size}`);
  }

  await page.getByRole("button", {
    name: "Apply",
  }).click();
} else {
  logger.info("Size chart already visible. Skipping size selection.");
}

logger.success("Sizes ready.");
}

export async function enterPrice(
  page: Page,
  price: string
) {
  logger.info(`Entering price: ₹${price}`);

  await page
    .locator("#meesho_price")
    .first()
    .fill(price);

  logger.success("Price entered.");
}

export async function enterMRP(
  page: Page,
  mrp: string
) {
  logger.info(`Entering MRP: ₹${mrp}`);

  await page
    .locator("#product_mrp")
    .first()
    .fill(mrp);

  logger.success("MRP entered.");
}

export async function enterInventory(
  page: Page,
  inventory: string
) {
  logger.info(`Entering inventory: ${inventory}`);

  const inventoryInputs = page.locator("#inventory");
  const count = await inventoryInputs.count();

  for (let i = 0; i < count; i++) {
    await inventoryInputs.nth(i).fill(inventory);
  }

  logger.success(`Inventory entered for ${count} variants.`);
}

export async function enterSKUs(
  page: Page,
  styleCode: string,
  sizes: string[]
) {
  logger.info("Generating and entering SKUs...");

  const skuInputs = page.locator("#supplier_sku_id");
  const count = await skuInputs.count();

  if (count !== sizes.length) {
    throw new Error(
      `SKU input count (${count}) does not match selected sizes (${sizes.length}).`
    );
  }

  for (let i = 0; i < count; i++) {
    const sku = `${styleCode}-${sizes[i]}`;

    await skuInputs.nth(i).fill(sku);

    logger.info(`SKU: ${sku}`);
  }

  logger.success("All SKUs entered.");
}

async function selectDropdownForAllVariants(
  page: Page,
  locatorId: string,
  value: string,
  sizes: string[],
  fieldName: string
) {
  logger.info(`Selecting ${fieldName}: ${value}`);

  const dropdowns = page.locator(locatorId);
  const count = await dropdowns.count();

  if (count !== sizes.length) {
    throw new Error(
      `${fieldName} dropdown count (${count}) does not match selected sizes (${sizes.length}).`
    );
  }

  for (let i = 0; i < count; i++) {
    await dropdowns.nth(i).click();

    await page
      .getByRole("textbox", { name: "Search" })
      .fill("");

    await page
      .getByRole("textbox", {
        name: "Search",
      })
      .fill(value);

    await page.getByRole("menuitem", {
      name: value,
      exact: true,
    }).click();

    logger.info(`${fieldName} selected for ${sizes[i]}`);
  }

  logger.success(`${fieldName} selected for all variants.`);
}

export async function selectBustSize(
  page: Page,
  bustSize: string,
  sizes: string[]
) {
  await selectDropdownForAllVariants(
    page,
    "#bust_size",
    bustSize,
    sizes,
    "Bust Size"
  );
}

export async function selectWaistSize(
  page: Page,
  waistSize: string,
  sizes: string[]
) {
  await selectDropdownForAllVariants(
    page,
    "#waist_size",
    waistSize,
    sizes,
    "Waist Size"
  );
}

export async function selectHipSize(
  page: Page,
  hipSize: string,
  sizes: string[]
) {
  await selectDropdownForAllVariants(
    page,
    "#hip_size",
    hipSize,
    sizes,
    "Hip Size"
  );
}

export async function selectLengthSize(
  page: Page,
  lengthSize: string,
  sizes: string[]
) {
  await selectDropdownForAllVariants(
    page,
    "#length_size",
    lengthSize,
    sizes,
    "Length Size"
  );
}

export async function selectAddOns(
  page: Page,
  addOns: string
) {
  logger.info(`Selecting Add Ons: ${addOns}`);

  await page.locator("#add_ons").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(addOns);

  await page.getByRole("menuitem", {
    name: addOns,
    exact: true,
  }).click();

  logger.success("Add Ons selected.");
}

export async function selectColor(
  page: Page,
  color: string
) {
  logger.info(`Selecting color: ${color}`);

  await page.locator("#color").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(color);

  await page.getByRole("menuitem", {
    name: color,
    exact: true,
  }).click();

  logger.success("Color selected.");
}

export async function selectFabric(
  page: Page,
  fabric: string
) {
  logger.info(`Selecting fabric: ${fabric}`);

  await page.locator("#fabric").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(fabric);

  await page.getByRole("menuitem", {
    name: fabric,
    exact: true,
  }).click();

  logger.success("Fabric selected.");
}

export async function selectFitType(
  page: Page,
  fitType: string
) {
  logger.info(`Selecting fit type: ${fitType}`);

  await page.locator("#fit_type").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(fitType);

  await page.getByRole("menuitem", {
    name: fitType,
    exact: true,
  }).click();

  logger.success("Fit type selected.");
}

export async function selectGenericName(
  page: Page,
  genericName: string
) {
  logger.info(`Selecting generic name: ${genericName}`);

  await page.locator("#generic_name").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(genericName);

  await page.getByRole("menuitem", {
    name: genericName,
    exact: true,
  }).click();

  logger.success("Generic name selected.");
}

export async function selectQuantity(
  page: Page,
  quantity: string
) {
  logger.info(`Selecting quantity: ${quantity}`);

  await page.locator("#multipack").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(quantity);

  await page.getByRole("menuitem", {
    name: quantity,
    exact: true,
  }).click();

  logger.success("Quantity selected.");
}

export async function selectCountryOfOrigin(
  page: Page,
  country: string
) {
  logger.info(`Selecting country of origin: ${country}`);

  await page.locator("#country_of_origin").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(country);

  await page.getByRole("menuitem", {
    name: country,
    exact: true,
  }).click();

  logger.success("Country of origin selected.");
}

export async function enterManufacturerName(
  page: Page,
  manufacturerName: string
) {
  logger.info(`Entering manufacturer name: ${manufacturerName}`);

  await page
    .getByRole("textbox", {
      name: "Enter Manufacturer Name",
    })
    .fill(manufacturerName);

  logger.success("Manufacturer name entered.");
}

export async function enterManufacturerAddress(
  page: Page,
  manufacturerAddress: string
) {
  logger.info("Entering manufacturer address...");

  await page
    .getByRole("textbox", {
      name: "Enter Manufacturer Address",
    })
    .fill(manufacturerAddress);

  logger.success("Manufacturer address entered.");
}

export async function enterManufacturerPincode(
  page: Page,
  manufacturerPincode: string
) {
  logger.info(`Entering manufacturer pincode: ${manufacturerPincode}`);

  await page
    .getByPlaceholder("Enter Manufacturer Pincode")
    .fill(manufacturerPincode);

  logger.success("Manufacturer pincode entered.");
}

export async function enterPackerName(
  page: Page,
  packerName: string
) {
  logger.info(`Entering packer name: ${packerName}`);

  await page
    .getByRole("textbox", {
      name: "Enter Packer Name",
    })
    .fill(packerName);

  logger.success("Packer name entered.");
}

export async function enterPackerAddress(
  page: Page,
  packerAddress: string
) {
  logger.info("Entering packer address...");

  await page
    .getByRole("textbox", {
      name: "Enter Packer Address",
    })
    .fill(packerAddress);

  logger.success("Packer address entered.");
}

export async function enterPackerPincode(
  page: Page,
  packerPincode: string
) {
  logger.info(`Entering packer pincode: ${packerPincode}`);

  await page
    .getByPlaceholder("Enter Packer Pincode")
    .fill(packerPincode);

  logger.success("Packer pincode entered.");
}

export async function selectLength(
  page: Page,
  length: string
) {
  logger.info(`Selecting length: ${length}`);

  await page.locator("#length").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(length);

  await page.getByRole("menuitem", {
    name: length,
    exact: true,
  }).click();

  logger.success("Length selected.");
}

export async function selectNeck(
  page: Page,
  neck: string
) {
  logger.info(`Selecting neck: ${neck}`);

  await page.locator("#neck").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(neck);

  await page.getByRole("menuitem", {
    name: neck,
    exact: true,
  }).click();

  logger.success("Neck selected.");
}

export async function selectOccasion(
  page: Page,
  occasion: string
) {
  logger.info(`Selecting occasion: ${occasion}`);

  await page.locator("#occassion").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(occasion);

  await page.getByRole("menuitem", {
    name: occasion,
    exact: true,
  }).click();

  logger.success("Occasion selected.");
}

export async function selectPattern(
  page: Page,
  pattern: string
) {
  logger.info(`Selecting pattern: ${pattern}`);

  await page.locator("#pattern").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(pattern);

  await page.getByRole("menuitem", {
    name: pattern,
    exact: true,
  }).click();

  logger.success("Pattern selected.");
}

export async function selectPockets(
  page: Page,
  pockets: string
) {
  logger.info(`Selecting pockets: ${pockets}`);

  await page.locator("#pockets").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(pockets);

  await page.getByRole("menuitem", {
    name: pockets,
    exact: true,
  }).click();

  logger.success("Pockets selected.");
}

export async function selectPrintOrPatternType(
  page: Page,
  printOrPatternType: string
) {
  logger.info(
    `Selecting print or pattern type: ${printOrPatternType}`
  );

  await page.locator("#print_or_pattern_type").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(printOrPatternType);

  await page.getByRole("menuitem", {
    name: printOrPatternType,
    exact: true,
  }).click();

  logger.success("Print or pattern type selected.");
}

export async function selectSleeveLength(
  page: Page,
  sleeveLength: string
) {
  logger.info(`Selecting sleeve length: ${sleeveLength}`);

  await page.locator("#sleeve_length").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(sleeveLength);

  await page.getByRole("menuitem", {
    name: sleeveLength,
    exact: true,
  }).click();

  logger.success("Sleeve length selected.");
}

export async function selectSurfaceStyling(
  page: Page,
  surfaceStyling: string
) {
  logger.info(`Selecting surface styling: ${surfaceStyling}`);

  await page.locator("#surface_styling").click();

  const searchBox = page.getByRole("textbox", {
    name: "Search",
  });

  await searchBox.fill("");
  await searchBox.fill(surfaceStyling);

  await page.getByRole("menuitem", {
    name: surfaceStyling,
    exact: true,
  }).click();

  logger.success("Surface styling selected.");
}

export async function enterDescription(
  page: Page,
  description: string
) {
  logger.info("Entering description...");

  await page
    .getByRole("textbox", {
      name: "Enter Description",
    })
    .fill(description);

  logger.success("Description entered.");
}