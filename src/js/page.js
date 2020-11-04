console.debug("preventing-tab-closing-activator - Core Loaded.")
function preventingTabClosingActivatorTurnOnTabClosingPreventor(){
    console.debug("preventing-tab-closing-activator - Tab preventing extension. Activated.");
    window.addEventListener('beforeunload', function(event) {
        event.returnValue = "Do you want to leave this site?"
    });
}

function preventingTabClosingActivatorCheckState(){
    let preventingState = localStorage.getItem('preventingTabClosingState')
    if(preventingState === 'false') {
        console.debug("preventing-tab-closing-activator - Tab preventing extension. NOT activated.");
    } else {
        preventingTabClosingActivatorTurnOnTabClosingPreventor();
    }
}

function preventingTabClosingActivatorCheckUrl(){
    let regexUrl = localStorage.getItem('preventingTabClosingUrlPattern')
    if(!!regexUrl && !!window && !!window.location && !!window.location.href) {
        console.debug("preventing-tab-closing-activator - Checking URL Pattern...");
        var regex = new RegExp(regexUrl);
        if(regex.test(window.location.href)){
            console.debug("preventing-tab-closing-activator - URL is affected.");
            preventingTabClosingActivatorCheckState();
        } else {
            console.debug("preventing-tab-closing-activator - URL is not affected.");
            // nothing to do.
        }
    } else {
        console.debug("preventing-tab-closing-activator - All URLs will be affected.");
        preventingTabClosingActivatorCheckState();
    }
}

function preventingTabClosingActivatorInitialization() {
    if(!!localStorage){
        preventingTabClosingActivatorCheckUrl();
    } else {
        console.warn("preventing-tab-closing-activator - Sorry, but your browser doesn't support dynamic deactivation.");
        preventingTabClosingActivatorTurnOnTabClosingPreventor();
    }
}
preventingTabClosingActivatorInitialization();