/*
 * Theme toggle script for gobrave documentation site
 * Handles dark/light mode switching with localStorage persistence
 */
(function () {
  "use strict";

  const THEME_KEY = "gobrave-theme";
  const DARK = "dark";
  const LIGHT = "light";

  /**
   * Get the user's preferred theme, checking localStorage first,
   * then system preference, defaulting to light.
   */
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === DARK || stored === LIGHT) {
      return stored;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return DARK;
    }
    return LIGHT;
  }

  /**
   * Apply the theme to the document.
   */
  function applyTheme(theme) {
    if (theme === DARK) {
      document.documentElement.setAttribute("data-theme", DARK);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  /**
   * Update toggle button icons.
   */
  function updateToggleButtons(theme) {
    const buttons = document.querySelectorAll(".theme-toggle-btn");
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-label", theme === DARK ? "Switch to light mode" : "Switch to dark mode");
      btn.innerHTML = theme === DARK ? "☀️" : "🌙";
      btn.title = theme === DARK ? "Switch to light mode" : "Switch to dark mode";
    });
  }

  /**
   * Set the theme and persist.
   */
  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    updateToggleButtons(theme);
  }

  /**
   * Toggle between dark and light themes.
   */
  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") === DARK ? DARK : LIGHT;
    var next = current === DARK ? LIGHT : DARK;
    setTheme(next);
  }

  /**
   * Initialize theme on page load (runs before DOMContentLoaded to avoid flash).
   */
  function init() {
    var preferred = getPreferredTheme();
    applyTheme(preferred);

    // After DOM is ready, set up toggle buttons and update icons
    document.addEventListener("DOMContentLoaded", function () {
      updateToggleButtons(preferred);

      // Attach click handlers to all toggle buttons
      document.addEventListener("click", function (e) {
        var toggleBtn = e.target.closest(".theme-toggle-btn");
        if (toggleBtn) {
          e.preventDefault();
          toggleTheme();
        }
      });
    });
  }

  // Run immediately to prevent flash of wrong theme
  init();

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? DARK : LIGHT);
      }
    });
  }
})();
