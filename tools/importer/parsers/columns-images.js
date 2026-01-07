/* global WebImporter */

/**
 * Parser for columns-images block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Two side-by-side images
 *
 * Source HTML Pattern:
 * <div class="w-layout-grid grid-layout">
 *   <div class="utility-aspect-1x1"><img src="..." alt="..."></div>
 *   <div class="utility-aspect-1x1"><img src="..." alt="..."></div>
 * </div>
 *
 * Generated: 2026-01-07
 */
export default function parse(element, { document }) {
  // Extract images from the grid
  // VALIDATED: Found img.cover-image inside .utility-aspect-1x1 divs
  const images = Array.from(element.querySelectorAll('.utility-aspect-1x1 img, img.cover-image'));

  // Build cells array - single row with images in columns
  const cells = [];

  if (images.length >= 2) {
    cells.push([images[0], images[1]]);
  } else if (images.length === 1) {
    cells.push([images[0]]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Images', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
