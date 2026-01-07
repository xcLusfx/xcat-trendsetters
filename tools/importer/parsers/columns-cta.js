/* global WebImporter */

/**
 * Parser for columns-cta block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Left column (heading, paragraph) | Right column (buttons)
 *
 * Source HTML Pattern:
 * <div class="w-layout-grid grid-layout y-center">
 *   <div>
 *     <h2>...</h2>
 *     <p class="subheading">...</p>
 *   </div>
 *   <div class="button-group">
 *     <a class="button">...</a>
 *     <a class="button secondary-button">...</a>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-07
 */
export default function parse(element, { document }) {
  // Extract left column content
  // VALIDATED: Found h2 and p.subheading in first child div
  const heading = element.querySelector('h2');
  const paragraph = element.querySelector('p.subheading, .subheading');

  // Extract right column content (buttons)
  // VALIDATED: Found .button-group with a.button elements
  const buttons = Array.from(element.querySelectorAll('.button-group a.button, a.w-button'));

  // Build left column content
  const leftColumn = document.createElement('div');
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

  // Build right column content (buttons)
  const rightColumn = document.createElement('div');
  buttons.forEach(btn => {
    const link = document.createElement('a');
    link.href = btn.getAttribute('href') || '#';
    link.textContent = btn.textContent.trim();
    // Make it a strong link for primary button styling
    const strong = document.createElement('strong');
    strong.appendChild(link);
    rightColumn.appendChild(strong);
    rightColumn.appendChild(document.createElement('br'));
  });

  // Build cells array
  const cells = [[leftColumn, rightColumn]];

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-CTA', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
