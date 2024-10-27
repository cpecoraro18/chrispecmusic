// google tag manager insert into head and body nuxt 3

export default defineNuxtPlugin((nuxtApp) => {
    if (!document) return;
    const head = document.head;
    const body = document.body;
    
    // Create and insert the script tag for Google Tag Manager
    const scriptHead = document.createElement('script');
    scriptHead.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MFS3DSBM');`;
    head.appendChild(scriptHead);
    
    // Create and insert the noscript tag for Google Tag Manager
    const scriptBody = document.createElement('noscript');
    scriptBody.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFS3DSBM"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    body.appendChild(scriptBody);
});