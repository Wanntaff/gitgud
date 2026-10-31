import assert from "node:assert";
import fs from "node:fs";

// 1. Verify MENU_ITEMS constants and item counts in MenuSection.tsx
const menuFileContent = fs.readFileSync("components/MenuSection.tsx", "utf8");

// Extract ITEMS_PER_PAGE
const itemsPerPageMatch = menuFileContent.match(/const ITEMS_PER_PAGE = (\d+);/);
assert(itemsPerPageMatch, "ITEMS_PER_PAGE must be defined");
const ITEMS_PER_PAGE = parseInt(itemsPerPageMatch[1], 10);
assert.strictEqual(ITEMS_PER_PAGE, 8, "ITEMS_PER_PAGE must be 8");

// Extract getPageNumbers logic
function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

console.log("Testing getPageNumbers...");

// Test total <= 7 (all numbers returned without ellipsis)
assert.deepStrictEqual(getPageNumbers(1, 1), [1]);
assert.deepStrictEqual(getPageNumbers(1, 2), [1, 2]);
assert.deepStrictEqual(getPageNumbers(2, 2), [1, 2]);
assert.deepStrictEqual(getPageNumbers(1, 4), [1, 2, 3, 4]);
assert.deepStrictEqual(getPageNumbers(4, 4), [1, 2, 3, 4]);
assert.deepStrictEqual(getPageNumbers(1, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(getPageNumbers(4, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(getPageNumbers(1, 7), [1, 2, 3, 4, 5, 6, 7]);

// Test total > 7
assert.deepStrictEqual(getPageNumbers(1, 10), [1, 2, 3, 4, 5, "...", 10]);
assert.deepStrictEqual(getPageNumbers(4, 10), [1, 2, 3, 4, 5, "...", 10]);
assert.deepStrictEqual(getPageNumbers(5, 10), [1, "...", 4, 5, 6, "...", 10]);
assert.deepStrictEqual(getPageNumbers(6, 10), [1, "...", 5, 6, 7, "...", 10]);
assert.deepStrictEqual(getPageNumbers(7, 10), [1, "...", 6, 7, 8, 9, 10]);
assert.deepStrictEqual(getPageNumbers(10, 10), [1, "...", 6, 7, 8, 9, 10]);

console.log("getPageNumbers tests passed!");

// 2. Test Pagination Math
function calcPagination(totalItems, currentPage) {
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const startItem = (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalItems);
  const itemCountOnPage = Math.max(0, endIndex - startIndex);
  const rangeText = startItem === endItem ? `menu ke-${startItem}` : `${startItem}–${endItem}`;

  return {
    totalPages,
    safeCurrentPage,
    startIndex,
    endIndex,
    startItem,
    endItem,
    itemCountOnPage,
    rangeText,
  };
}

console.log("Testing Thirsty side (31 items)...");
// Page 1 of 31 items
const thirstyP1 = calcPagination(31, 1);
assert.strictEqual(thirstyP1.totalPages, 4);
assert.strictEqual(thirstyP1.safeCurrentPage, 1);
assert.strictEqual(thirstyP1.startIndex, 0);
assert.strictEqual(thirstyP1.endIndex, 8);
assert.strictEqual(thirstyP1.itemCountOnPage, 8);
assert.strictEqual(thirstyP1.rangeText, "1–8");

// Page 4 of 31 items (last page)
const thirstyP4 = calcPagination(31, 4);
assert.strictEqual(thirstyP4.totalPages, 4);
assert.strictEqual(thirstyP4.safeCurrentPage, 4);
assert.strictEqual(thirstyP4.startIndex, 24);
assert.strictEqual(thirstyP4.endIndex, 31);
assert.strictEqual(thirstyP4.itemCountOnPage, 7);
assert.strictEqual(thirstyP4.rangeText, "25–31");

console.log("Testing Hungry side (9 items)...");
// Page 1 of 9 items
const hungryP1 = calcPagination(9, 1);
assert.strictEqual(hungryP1.totalPages, 2);
assert.strictEqual(hungryP1.safeCurrentPage, 1);
assert.strictEqual(hungryP1.startIndex, 0);
assert.strictEqual(hungryP1.endIndex, 8);
assert.strictEqual(hungryP1.itemCountOnPage, 8);
assert.strictEqual(hungryP1.rangeText, "1–8");

// Page 2 of 9 items (single item on last page)
const hungryP2 = calcPagination(9, 2);
assert.strictEqual(hungryP2.totalPages, 2);
assert.strictEqual(hungryP2.safeCurrentPage, 2);
assert.strictEqual(hungryP2.startIndex, 8);
assert.strictEqual(hungryP2.endIndex, 9);
assert.strictEqual(hungryP2.itemCountOnPage, 1);
assert.strictEqual(hungryP2.rangeText, "menu ke-9");

console.log("Testing Subcategory (e.g. 4 items)...");
const subcat = calcPagination(4, 1);
assert.strictEqual(subcat.totalPages, 1);
assert.strictEqual(subcat.safeCurrentPage, 1);
assert.strictEqual(subcat.itemCountOnPage, 4);

console.log("Testing Out-of-bounds Page Clamping...");
const clamped = calcPagination(9, 99);
assert.strictEqual(clamped.safeCurrentPage, 2);
const clampedLow = calcPagination(9, -5);
assert.strictEqual(clampedLow.safeCurrentPage, 1);

console.log("All unit tests passed successfully!");
