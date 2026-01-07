/* global WebImporter */

/**
 * Parser for tabs-showcase block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: tabs
 *
 * Block Structure:
 * - Row N: Tab label column | Tab content column (heading + image)
 *
 * Source HTML Pattern:
 * <div class="w-tabs">
 *   <div class="w-tab-menu">
 *     <a class="w-tab-link">Tab Label</a>
 *   </div>
 *   <div class="w-tab-content">
 *     <div class="w-tab-pane">
 *       <h3>...</h3>
 *       <img src="...">
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-07
 */
export default function parse(element, { document }) {
  // Extract tab labels
  // VALIDATED: Found a.w-tab-link in .w-tab-menu
  const tabLinks = Array.from(element.querySelectorAll('.w-tab-link, .tab-menu-link-transparent'));

  // Extract tab panes
  // VALIDATED: Found .w-tab-pane in .w-tab-content
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));

  // Build cells array - one row per tab
  const cells = [];

  tabLinks.forEach((tabLink, index) => {
    const tabLabel = tabLink.textContent.trim();
    const tabPane = tabPanes[index];

    // Build content column
    const contentDiv = document.createElement('div');

    if (tabPane) {
      // Extract heading from tab pane
      // VALIDATED: Found h3.h2-heading in each tab pane
      const heading = tabPane.querySelector('h3, .h2-heading');
      if (heading) {
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        contentDiv.appendChild(h2);
      }

      // Extract image from tab pane
      // VALIDATED: Found img.cover-image in each tab pane
      const image = tabPane.querySelector('img');
      if (image) {
        const img = document.createElement('img');
        img.src = image.getAttribute('src');
        img.alt = image.getAttribute('alt') || '';
        contentDiv.appendChild(img);
      }
    }

    cells.push([tabLabel, contentDiv]);
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Tabs-Showcase', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
