/* global WebImporter */

/**
 * Parser for cards-articles block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: cards
 *
 * Block Structure:
 * - Row N: Image column | Content column (tag, heading, description, link)
 *
 * Source HTML Pattern:
 * <a class="utility-link-content-block">
 *   <div class="w-layout-grid">
 *     <img src="..." alt="...">
 *     <div>
 *       <div class="tag">...</div>
 *       <div class="paragraph-sm">3 min read</div>
 *       <h3>...</h3>
 *       <p>...</p>
 *       <div>Read</div>
 *     </div>
 *   </div>
 * </a>
 *
 * Generated: 2026-01-07
 */
export default function parse(element, { document }) {
  // Extract all article cards
  // VALIDATED: Found a.utility-link-content-block containing article cards
  const articleLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // Build cells array - one row per article
  const cells = [];

  articleLinks.forEach(article => {
    // Extract image
    // VALIDATED: Found img.cover-image in each article
    const image = article.querySelector('img');

    // Extract tag
    // VALIDATED: Found .tag in each article
    const tag = article.querySelector('.tag');

    // Extract read time
    // VALIDATED: Found .paragraph-sm with read time
    const readTime = article.querySelector('.paragraph-sm');

    // Extract heading
    // VALIDATED: Found h3.h4-heading in each article
    const heading = article.querySelector('h3, .h4-heading');

    // Extract description
    // VALIDATED: Found p for description
    const description = article.querySelector('p:not(.paragraph-sm)');

    // Build content column
    const contentDiv = document.createElement('div');

    // Add tag and read time
    if (tag || readTime) {
      const meta = document.createElement('p');
      const parts = [];
      if (tag) parts.push(`**${tag.textContent.trim()}**`);
      if (readTime) parts.push(readTime.textContent.trim());
      meta.textContent = parts.join(' · ');
      contentDiv.appendChild(meta);
    }

    // Add heading
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      contentDiv.appendChild(h3);
    }

    // Add description
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentDiv.appendChild(p);
    }

    // Add read link
    const href = article.getAttribute('href') || '#';
    const link = document.createElement('a');
    link.href = href;
    link.textContent = 'Read';
    contentDiv.appendChild(link);

    // Add row with image and content columns
    if (image) {
      const imgEl = document.createElement('img');
      imgEl.src = image.getAttribute('src');
      imgEl.alt = image.getAttribute('alt') || '';
      cells.push([imgEl, contentDiv]);
    } else {
      cells.push([contentDiv]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Articles', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
