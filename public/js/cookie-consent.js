/**
 * BroodhillsGlobal - GDPR Cookie Consent Banner
 * Compliant with GDPR, ePrivacy Directive, CCPA
 * Version: 1.0.0
 */

(function () {
  'use strict';

  const CONSENT_KEY = 'bh_cookie_consent';
  const CONSENT_VERSION = '1.0';

  const defaultPreferences = {
    version: CONSENT_VERSION,
    timestamp: null,
    necessary: true,       // Always true - cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  };

  function getConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Invalidate if version mismatch
      if (parsed.version !== CONSENT_VERSION) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function saveConsent(prefs) {
    const consent = { ...prefs, timestamp: new Date().toISOString(), version: CONSENT_VERSION };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    dispatchConsentEvent(consent);
    return consent;
  }

  function dispatchConsentEvent(consent) {
    window.dispatchEvent(new CustomEvent('bh:consentUpdated', { detail: consent }));

    // Google Consent Mode v2 integration
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
        functionality_storage: consent.preferences ? 'granted' : 'denied',
        personalization_storage: consent.preferences ? 'granted' : 'denied',
      });
    }
  }

  function initGoogleConsentModeDefaults() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      wait_for_update: 500,
    });
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'bh-cookie-styles';
    style.textContent = `
      :root {
        --bh-bg: #0f1117;
        --bh-surface: #1a1d27;
        --bh-border: rgba(255,255,255,0.08);
        --bh-text: #e8eaf0;
        --bh-muted: #8b8fa8;
        --bh-accent: #C8DC0A;
        --bh-accent-hover: #6B8C14;
        --bh-success: #22c55e;
        --bh-radius: 14px;
        --bh-font: 'Segoe UI', system-ui, -apple-system, sans-serif;
      }

      #bh-cookie-banner * { box-sizing: border-box; margin: 0; padding: 0; }

      #bh-cookie-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(3px);
        z-index: 99998;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      #bh-cookie-overlay.bh-visible { opacity: 1; }

      #bh-cookie-banner {
        position: fixed;
        bottom: 24px; left: 50%;
        transform: translateX(-50%) translateY(30px);
        width: min(680px, calc(100vw - 32px));
        background: var(--bh-surface);
        border: 1px solid var(--bh-border);
        border-radius: var(--bh-radius);
        box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset;
        font-family: var(--bh-font);
        color: var(--bh-text);
        z-index: 99999;
        opacity: 0;
        transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        overflow: hidden;
      }
      #bh-cookie-banner.bh-visible {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      .bh-banner-main {
        padding: 24px 24px 0;
      }

      .bh-banner-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .bh-cookie-icon {
        font-size: 20px;
        line-height: 1;
      }
      .bh-banner-title {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--bh-text);
      }

      .bh-banner-body {
        font-size: 13.5px;
        line-height: 1.6;
        color: var(--bh-muted);
        margin-bottom: 18px;
      }
      .bh-banner-body a {
        color: var(--bh-accent);
        text-decoration: none;
      }
      .bh-banner-body a:hover { text-decoration: underline; }

      /* Toggles */
      .bh-toggles {
        display: none;
        flex-direction: column;
        gap: 10px;
        padding: 16px 0;
        border-top: 1px solid var(--bh-border);
        margin-top: 4px;
      }
      .bh-toggles.bh-open { display: flex; }

      .bh-toggle-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
      }
      .bh-toggle-info { flex: 1; }
      .bh-toggle-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--bh-text);
        display: block;
        margin-bottom: 2px;
      }
      .bh-toggle-desc {
        font-size: 12px;
        color: var(--bh-muted);
        line-height: 1.5;
      }

      /* Toggle Switch */
      .bh-switch {
        position: relative;
        width: 42px;
        height: 24px;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .bh-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
      .bh-switch-track {
        position: absolute; inset: 0;
        background: rgba(255,255,255,0.1);
        border-radius: 100px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .bh-switch-track::after {
        content: '';
        position: absolute;
        top: 3px; left: 3px;
        width: 18px; height: 18px;
        background: #fff;
        border-radius: 50%;
        transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      }
      .bh-switch input:checked + .bh-switch-track { background: var(--bh-accent); }
      .bh-switch input:checked + .bh-switch-track::after { transform: translateX(18px); }
      .bh-switch input:disabled + .bh-switch-track { opacity: 0.5; cursor: not-allowed; }

      /* Buttons */
      .bh-actions {
        display: flex;
        gap: 8px;
        padding: 16px 24px;
        border-top: 1px solid var(--bh-border);
        flex-wrap: wrap;
        align-items: center;
      }
      .bh-btn {
        border: none;
        border-radius: 8px;
        padding: 9px 18px;
        font-family: var(--bh-font);
        font-size: 13.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
        white-space: nowrap;
      }
      .bh-btn-primary {
        background: var(--bh-accent);
        color: #000;
        flex: 1;
        min-width: 120px;
      }
      .bh-btn-primary:hover { background: var(--bh-accent-hover); color: #fff; transform: translateY(-1px); }
      .bh-btn-secondary {
        background: rgba(255,255,255,0.06);
        color: var(--bh-text);
        border: 1px solid var(--bh-border);
      }
      .bh-btn-secondary:hover { background: rgba(255,255,255,0.1); }
      .bh-btn-ghost {
        background: transparent;
        color: var(--bh-muted);
        padding: 9px 8px;
        font-size: 12.5px;
        font-weight: 500;
      }
      .bh-btn-ghost:hover { color: var(--bh-text); }
      .bh-btn-save {
        background: var(--bh-success);
        color: #fff;
      }
      .bh-btn-save:hover { filter: brightness(1.1); }

      .bh-spacer { flex: 1; }

      /* Floating re-open button */
      #bh-cookie-reopen {
        position: fixed;
        bottom: 16px;
        left: 16px;
        width: 40px; height: 40px;
        border-radius: 50%;
        background: var(--bh-surface);
        border: 1px solid var(--bh-border);
        box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 9999;
        transition: transform 0.2s ease;
      }
      #bh-cookie-reopen:hover { transform: scale(1.1); }
      #bh-cookie-reopen.bh-shown { display: flex; }

      @media (max-width: 480px) {
        #bh-cookie-banner { bottom: 0; border-radius: var(--bh-radius) var(--bh-radius) 0 0; width: 100%; }
        .bh-actions { flex-direction: column; }
        .bh-btn-primary, .bh-btn-secondary { width: 100%; text-align: center; }
      }
    `;
    document.head.appendChild(style);
  }

  function createBanner() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'bh-cookie-overlay';
    document.body.appendChild(overlay);

    // Banner
    const banner = document.createElement('div');
    banner.id = 'bh-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Cookie preferences');
    banner.innerHTML = `
      <div class="bh-banner-main">
        <div class="bh-banner-header">
          <span class="bh-cookie-icon" aria-hidden="true">🍪</span>
          <span class="bh-banner-title">We value your privacy</span>
        </div>
        <p class="bh-banner-body">
          BroodhillsGlobal uses cookies to enhance your experience, analyse traffic, and personalise content.
          By clicking <strong>Accept All</strong> you consent to our use of cookies.
          You can customise your preferences or withdraw consent at any time.
          Read our <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
          and <a href="/cookie-policy" target="_blank" rel="noopener">Cookie Policy</a>.
        </p>

        <div class="bh-toggles" id="bh-toggles" aria-label="Cookie category preferences">
          <div class="bh-toggle-row">
            <div class="bh-toggle-info">
              <span class="bh-toggle-label">Strictly Necessary</span>
              <span class="bh-toggle-desc">Required for the site to function. Cannot be disabled.</span>
            </div>
            <label class="bh-switch" aria-label="Strictly necessary cookies">
              <input type="checkbox" id="bh-pref-necessary" checked disabled>
              <span class="bh-switch-track"></span>
            </label>
          </div>
          <div class="bh-toggle-row">
            <div class="bh-toggle-info">
              <span class="bh-toggle-label">Analytics</span>
              <span class="bh-toggle-desc">Help us understand how visitors interact with our site (e.g. Google Analytics).</span>
            </div>
            <label class="bh-switch" aria-label="Analytics cookies">
              <input type="checkbox" id="bh-pref-analytics">
              <span class="bh-switch-track"></span>
            </label>
          </div>
          <div class="bh-toggle-row">
            <div class="bh-toggle-info">
              <span class="bh-toggle-label">Marketing</span>
              <span class="bh-toggle-desc">Used to track visitors across websites for targeted advertising.</span>
            </div>
            <label class="bh-switch" aria-label="Marketing cookies">
              <input type="checkbox" id="bh-pref-marketing">
              <span class="bh-switch-track"></span>
            </label>
          </div>
          <div class="bh-toggle-row">
            <div class="bh-toggle-info">
              <span class="bh-toggle-label">Preferences</span>
              <span class="bh-toggle-desc">Remembers your settings and personalisation choices.</span>
            </div>
            <label class="bh-switch" aria-label="Preference cookies">
              <input type="checkbox" id="bh-pref-preferences">
              <span class="bh-switch-track"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="bh-actions">
        <button class="bh-btn bh-btn-ghost" id="bh-btn-customize">Customize</button>
        <span class="bh-spacer"></span>
        <button class="bh-btn bh-btn-secondary" id="bh-btn-reject">Reject Non-Essential</button>
        <button class="bh-btn bh-btn-primary" id="bh-btn-accept">Accept All</button>
        <button class="bh-btn bh-btn-save" id="bh-btn-save" style="display:none">Save Preferences</button>
      </div>
    `;
    document.body.appendChild(banner);

    // Reopen button
    const reopen = document.createElement('button');
    reopen.id = 'bh-cookie-reopen';
    reopen.title = 'Cookie preferences';
    reopen.setAttribute('aria-label', 'Open cookie preferences');
    reopen.innerHTML = '🍪';
    document.body.appendChild(reopen);

    return { banner, overlay, reopen };
  }

  function showBanner(banner, overlay) {
    requestAnimationFrame(() => {
      overlay.classList.add('bh-visible');
      banner.classList.add('bh-visible');
      banner.querySelector('#bh-btn-accept').focus();
    });
  }

  function hideBanner(banner, overlay, reopen) {
    banner.classList.remove('bh-visible');
    overlay.classList.remove('bh-visible');
    setTimeout(() => {
      banner.style.display = 'none';
      overlay.style.display = 'none';
      reopen.classList.add('bh-shown');
    }, 350);
  }

  function bindEvents(banner, overlay, reopen) {
    let customizeOpen = false;

    const btnAccept = banner.querySelector('#bh-btn-accept');
    const btnReject = banner.querySelector('#bh-btn-reject');
    const btnCustomize = banner.querySelector('#bh-btn-customize');
    const btnSave = banner.querySelector('#bh-btn-save');
    const togglesEl = banner.querySelector('#bh-toggles');

    btnAccept.addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: true, marketing: true, preferences: true });
      hideBanner(banner, overlay, reopen);
    });

    btnReject.addEventListener('click', () => {
      saveConsent({ ...defaultPreferences });
      hideBanner(banner, overlay, reopen);
    });

    btnCustomize.addEventListener('click', () => {
      customizeOpen = !customizeOpen;
      togglesEl.classList.toggle('bh-open', customizeOpen);
      btnCustomize.textContent = customizeOpen ? 'Hide Options' : 'Customize';
      btnSave.style.display = customizeOpen ? 'inline-flex' : 'none';
      btnAccept.style.display = customizeOpen ? 'none' : 'inline-flex';
      btnReject.style.display = customizeOpen ? 'none' : 'inline-flex';
    });

    btnSave.addEventListener('click', () => {
      saveConsent({
        necessary: true,
        analytics: banner.querySelector('#bh-pref-analytics').checked,
        marketing: banner.querySelector('#bh-pref-marketing').checked,
        preferences: banner.querySelector('#bh-pref-preferences').checked,
      });
      hideBanner(banner, overlay, reopen);
    });

    reopen.addEventListener('click', () => {
      banner.style.display = '';
      overlay.style.display = '';
      requestAnimationFrame(() => showBanner(banner, overlay));
      reopen.classList.remove('bh-shown');
    });

    // Keyboard accessibility
    banner.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') btnReject.click();
    });
  }

  function init() {
    initGoogleConsentModeDefaults();

    const existing = getConsent();
    if (existing) {
      // Already consented - just fire the event to re-activate scripts
      dispatchConsentEvent(existing);

      // Show reopen button
      const reopen = document.createElement('button');
      reopen.id = 'bh-cookie-reopen';
      reopen.title = 'Cookie preferences';
      reopen.setAttribute('aria-label', 'Open cookie preferences');
      reopen.innerHTML = '🍪';
      reopen.classList.add('bh-shown');
      document.body.appendChild(reopen);
      injectStyles();

      reopen.addEventListener('click', () => {
        // Remove reopen, re-create banner
        reopen.remove();
        const { banner, overlay, reopenNew } = (() => {
          const els = createBanner();
          return { banner: els.banner, overlay: els.overlay, reopenNew: els.reopen };
        })();
        // Pre-fill toggles from saved state
        banner.querySelector('#bh-pref-analytics').checked = existing.analytics;
        banner.querySelector('#bh-pref-marketing').checked = existing.marketing;
        banner.querySelector('#bh-pref-preferences').checked = existing.preferences;
        bindEvents(banner, overlay, reopenNew);
        showBanner(banner, overlay);
      });
      return;
    }

    injectStyles();
    const { banner, overlay, reopen } = createBanner();
    bindEvents(banner, overlay, reopen);

    // Show after short delay for better UX
    setTimeout(() => showBanner(banner, overlay), 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.BHCookieConsent = {
    getConsent,
    hasConsented: (category) => {
      const c = getConsent();
      return c ? !!c[category] : false;
    },
    reset: () => {
      localStorage.removeItem(CONSENT_KEY);
      location.reload();
    }
  };
})();
