/**
 * GTM loader with Consent Mode v2 defaults.
 *
 * This is injected as a `beforeInteractive` script from the root layout, so it
 * runs before any first-party JS. The consent default is pushed BEFORE gtm.js
 * is requested — otherwise GA4 would already have written analytics cookies
 * by the time the visitor sees the banner.
 *
 * The visitor's persisted choice is read here as well as in CookieConsent so
 * returning visitors get the right default on the very first dataLayer push.
 */
export function gtmBootstrap(gtmId: string): string {
  return `
    var dl = window.dataLayer = window.dataLayer || [];
    var storedConsent = 'denied';
    try {
      storedConsent = window.localStorage.getItem('pa-cookie-consent') === 'granted'
        ? 'granted' : 'denied';
    } catch (e) {}
    var granted = storedConsent === 'granted';
    dl.push(['consent', 'default', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
      wait_for_update: 500
    }]);
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;
}
