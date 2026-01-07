/* global WebImporter */

/**
 * Parser for cards-features block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: cards
 *
 * Block Structure:
 * - Row N: One column per feature item (text only, no images)
 *
 * Source HTML Pattern:
 * <div class="flex-horizontal flex-gap-xxs">
 *   <div class="icon">...</div>
 *   <p>Feature text...</p>
 * </div>
 *
 * Generated: 2026-01-07
 */
export default function parse(element, { document }) {
  // Extract feature items
  // VALIDATED: Found .flex-horizontal.flex-gap-xxs containing icon and paragraph
  const featureItems = Array.from(element.querySelectorAll('.flex-horizontal.flex-gap-xxs'));

  // Build cells array - one row per feature
  const cells = [];

  featureItems.forEach(item => {
    // Extract the paragraph text (skip the icon)
    // VALIDATED: Found p.utility-margin-bottom-0 in each feature item
    const paragraph = item.querySelector('p');
    if (paragraph) {
      cells.push([paragraph.textContent.trim()]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Features', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
