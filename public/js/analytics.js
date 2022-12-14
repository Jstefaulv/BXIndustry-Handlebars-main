var gtag;
var ga;

// Adding to window as a fairly unique name so we can call this from DV widgets
window.bxi = {
  ...window.bxi,
  sendAnalytics: (action, parameters) => {
    parameters = parameters || {};
    parameters.source_project = window.location.host.includes('glitch.me') 
      ? window.location.host.split('.')[0] // Send the remix project name
      : 'bxgeneric'; // Indicates it's coming from our main bxgeneric instance (e.g. demo.bxgeneric.org)
    parameters.vertical = parameters.vertical || window.location.pathname.split('/')[1];

    if (window.location.host.includes('localhost')) {
      console.info('GA Event', action, parameters);
      return;
    }

    if (typeof ga === 'function') {
      // Temporary way to get appropriate data into UA for now, we need to be
      // moving to GA4 (EOL June 2023) which is how this function was designed.
      // There wasn't adequate time to get GA4 up and running with the 24 hour 
      // delay of events and hits showing up in reporting
      const label = parameters.vertical;
      ga('send', 'event', parameters.source_project, action, label);
    }
    
      
    // Push data to GA4 so we have data to play with while we get it set up
    // This is the future!
    if (typeof gtag === 'function') {
      gtag('event', action, parameters);
    }
  }
}