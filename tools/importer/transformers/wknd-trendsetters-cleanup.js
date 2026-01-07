/* global WebImporter */

/**
 * Transformer for WKND Trendsetters website cleanup
 * Purpose: Remove non-content elements and fix HTML issues
 * Applies to: wknd-trendsetters.site (all pages)
 * Generated: 2026-01-07
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove navigation (handled separately)
    // EXTRACTED: Found .nav.secondary-nav in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.nav.secondary-nav',
      '.nav-container',
      '.w-nav-overlay'
    ]);

    // Remove footer (handled separately)
    // EXTRACTED: Found footer.footer.inverse-footer in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer.footer',
      '.footer.inverse-footer'
    ]);

    // Remove mobile menu elements
    // EXTRACTED: Found .nav-mobile-menu-button in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.nav-mobile-menu-button',
      '.w-nav-button'
    ]);

    // Remove dropdown menus
    // EXTRACTED: Found .w-dropdown-list in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.w-dropdown-list',
      '.nav-mega-menu-dropdown-list'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining unwanted elements
    // Standard HTML elements - safe to use
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link'
    ]);

    // Clean up Webflow-specific attributes
    // EXTRACTED: Found data-wf-* attributes in captured DOM
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      // Remove Webflow attributes
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('data-wf') || attr.name.startsWith('w-')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
}
