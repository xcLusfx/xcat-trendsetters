/* global WebImporter */

/**
 * Parser for accordion-faq block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: accordion
 *
 * Block Structure:
 * - Row N: Question column | Answer column
 *
 * Source HTML Pattern:
 * <div class="accordion">
 *   <div class="w-dropdown-toggle">
 *     <div class="paragraph-lg">Question text</div>
 *   </div>
 *   <nav class="accordion-content">
 *     <p>Answer text</p>
 *   </nav>
 * </div>
 *
 * Generated: 2026-01-07
 */
export default function parse(element, { document }) {
  // Extract accordion items
  // VALIDATED: Found .accordion.transparent-accordion containing Q&A pairs
  const accordionItems = Array.from(element.querySelectorAll('.accordion.transparent-accordion, .w-dropdown:has(.accordion-content)'));

  // Build cells array - one row per Q&A pair
  const cells = [];

  accordionItems.forEach(item => {
    // Extract question
    // VALIDATED: Found .paragraph-lg in .w-dropdown-toggle
    const questionEl = item.querySelector('.paragraph-lg, .w-dropdown-toggle div');
    const question = questionEl ? questionEl.textContent.trim() : '';

    // Extract answer
    // VALIDATED: Found .accordion-content containing answer paragraph
    const answerEl = item.querySelector('.accordion-content p, .w-dropdown-list p');
    const answer = answerEl ? answerEl.textContent.trim() : '';

    if (question && answer) {
      cells.push([question, answer]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion-FAQ', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
