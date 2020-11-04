console.debug("preventing-tab-closing-activator - Initialization...")

function preventingTabClosingActivatorCoreLoad(){
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('page.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

function preventingTabClosingActivatorCheckClosingState(){
    chrome.storage.local.get('preventingTabClosingState', function(storage) {
        let newState = 'true';
        if(!!storage && storage.preventingTabClosingState !== undefined){
            newState = storage.preventingTabClosingState
        }
        if(!!localStorage) {
            let currentState = localStorage.getItem('preventingTabClosingState')
            if(currentState !== newState){
                localStorage.setItem('preventingTabClosingState', newState)
            }
        }
        console.debug("preventing-tab-closing-activator - Current preventing state is " + newState)
    });
}

function preventingTabClosingActivatorCheckURLPatternState(){
    chrome.storage.local.get('preventingTabClosingUrlPattern', function(storage) {
        let newState = undefined;
        if(!!storage && storage.preventingTabClosingUrlPattern !== undefined){
            newState = storage.preventingTabClosingUrlPattern
        }
        if(!!localStorage) {
            let currentState = localStorage.getItem('preventingTabClosingUrlPattern')
            if(currentState !== newState){
                localStorage.setItem('preventingTabClosingUrlPattern', newState)
            }
        }
        console.debug("preventing-tab-closing-activator - Current URL Pattern is " + newState)
    });
}

function preventingTabClosingActivatorInitialization() {
    console.debug("preventing-tab-closing-activator - Core Loading ...50%...")
    preventingTabClosingActivatorCoreLoad();

    if(!!chrome && !!chrome.storage && !!chrome.storage.local) {
        preventingTabClosingActivatorCheckClosingState();
        preventingTabClosingActivatorCheckURLPatternState();
    }
    console.debug("preventing-tab-closing-activator - Core Loading ...75%...")
}

preventingTabClosingActivatorInitialization();
