/* global WebImporter */

/**
 * Parser for columns-header block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Left column (eyebrow, heading, paragraph) | Right column (button)
 *
 * Source HTML Pattern:
 * <div class="w-layout-grid grid-layout y-bottom">
 *   <div>
 *     <div class="eyebrow">...</div>
 *     <h2>...</h2>
 *     <p>...</p>
 *   </div>
 *   <a class="button">...</a>
 * </div>
 *
 * Generated: 2026-01-07
 */
export default function parse(element, { document }) {
  // Extract left column content
  // VALIDATED: Found .eyebrow, h2.h2-heading, p in first child div
  const eyebrow = element.querySelector('.eyebrow');
  const heading = element.querySelector('h2, .h2-heading');
  const paragraph = element.querySelector('p');

  // Extract right column content (button)
  // VALIDATED: Found a.button as sibling
  const button = element.querySelector('a.button, a.w-node');

  // Build left column content
  const leftColumn = document.createElement('div');
  if (eyebrow) {
    const eyebrowText = document.createElement('p');
    eyebrowText.textContent = eyebrow.textContent.trim();
    leftColumn.appendChild(eyebrowText);
  }
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    leftColumn.appendChild(h2);
  }
  if (paragraph) {
    const p = document.createElement('p');
    p.textContent = paragraph.textContent.trim();
    leftColumn.appendChild(p);
  }

  // Build cells array
  const cells = [];

  if (button) {
    const link = document.createElement('a');
    link.href = button.getAttribute('href') || '#';
    link.textContent = button.textContent.trim();
    cells.push([leftColumn, link]);
  } else {
    cells.push([leftColumn]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Header', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
