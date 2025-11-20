export const trackVisit = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    
    await fetch('/api/analytics/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: window.location.pathname,
        utmSource: urlParams.get('utm_source'),
        utmMedium: urlParams.get('utm_medium'),
        utmCampaign: urlParams.get('utm_campaign'),
        utmContent: urlParams.get('utm_content'),
        utmTerm: urlParams.get('utm_term'),
        fbclid: urlParams.get('fbclid'),
        campaignId: urlParams.get('campaign_id'),
        adId: urlParams.get('ad_id'),
        adsetId: urlParams.get('adset_id'),
        referrer: document.referrer
      })
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: window.location.pathname
      });
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
};
