import { Page } from "playwright";
import {
  selectGst,
  selectHsn,
  enterNetWeight,
  enterStyleCode,
  enterProductName,
  selectSizes,
  enterPrice,
  enterMRP,
  enterInventory,
  enterSKUs,
  selectBustSize,
  selectWaistSize,
  selectHipSize,
  selectLengthSize,
  selectAddOns,
  selectColor,
  selectFabric,
  selectFitType,
  selectGenericName,
  selectQuantity,
  selectCountryOfOrigin,
  enterManufacturerName,
  enterManufacturerAddress,
  enterManufacturerPincode,
  enterPackerName,
  enterPackerAddress,
  enterPackerPincode,
  selectLength,
  selectNeck,
  selectOccasion,
  selectPattern,
  selectPockets,
  selectPrintOrPatternType,
  selectSleeveLength,
  selectSurfaceStyling,
  enterDescription,
} from "./basicDetails.js";

export async function fillProductDetails(
  page: Page,
  catalog: any
) {
  await selectGst(page, catalog.gst);
  await selectHsn(page, catalog.hsn);
  await enterNetWeight(page, catalog.weight);
  await enterStyleCode(page, catalog.styleCode);
  await enterProductName(page, catalog.productName);
  await selectSizes(page, catalog.sizes);

  await enterPrice(page, catalog.price);
  await enterMRP(page, catalog.mrp);
  await enterInventory(page, catalog.inventory);

  await enterSKUs(
    page,
    catalog.styleCode,
    catalog.sizes
  );

  await selectBustSize(
    page,
    catalog.bustSize,
    catalog.sizes
  );

  await selectWaistSize(
    page,
    catalog.waistSize,
    catalog.sizes
  );

  await selectHipSize(
    page,
    catalog.hipSize,
    catalog.sizes
  );

  await selectLengthSize(
    page,
    catalog.lengthSize,
    catalog.sizes
  );

  await selectAddOns(page, catalog.addOns);
  await selectColor(page, catalog.color);
  await selectFabric(page, catalog.fabric);
  await selectFitType(page, catalog.fitType);
  await selectGenericName(page, catalog.genericName);
  await selectQuantity(page, catalog.quantity);

  await selectCountryOfOrigin(
    page,
    catalog.countryOfOrigin
  );

  await enterManufacturerName(
    page,
    catalog.manufacturerName
  );

  await enterManufacturerAddress(
    page,
    catalog.manufacturerAddress
  );

  await enterManufacturerPincode(
    page,
    catalog.manufacturerPincode
  );

  await enterPackerName(
    page,
    catalog.packerName
  );

  await enterPackerAddress(
    page,
    catalog.packerAddress
  );

  await enterPackerPincode(
    page,
    catalog.packerPincode
  );

  await selectLength(page, catalog.length);
  await selectNeck(page, catalog.neck);
  await selectOccasion(page, catalog.occasion);
  await selectPattern(page, catalog.pattern);
  await selectPockets(page, catalog.pockets);

  await selectPrintOrPatternType(
    page,
    catalog.printOrPatternType
  );

  await selectSleeveLength(
    page,
    catalog.sleeveLength
  );

  await selectSurfaceStyling(
    page,
    catalog.surfaceStyling
  );

  await enterDescription(
    page,
    catalog.description
  );
}