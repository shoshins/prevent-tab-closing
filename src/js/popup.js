console.debug("preventing-tab-closing-activator - Popup activation ...")
function makeBtnDisabled(btn) {
    btn.disabled = false;
    btn.innerText = "Disabled";
    btn.className = "btn btn-secondary";
}
function makeBtnEnabled(btn) {
    btn.disabled = false;
    btn.innerText = "Enabled";
    btn.className = "btn btn-primary";
}
function unsupportedBtn(btn) {
    btn.disabled = true;
    btn.innerText = "Unsupported";
    btn.className = "btn btn-lg btn-primary";
}
function actualizeState(btn) {
    if(!!chrome && !!chrome.storage && !!chrome.storage.local){
        chrome.storage.local.get('preventingTabClosingState', function(storage) {
            if(!!storage && storage.preventingTabClosingState !== 'true') {
                makeBtnDisabled(btn);
            } else {
                makeBtnEnabled(btn);
            }
        });
    } else {
        console.warn("preventing-tab-closing-activator - Sorry, but your browser doesn't support dynamic deactivation.");
        unsupportedBtn(btn);
    }
}
function toggleState(btn) {
    if(!!chrome && !!chrome.storage && !!chrome.storage.local){
        chrome.storage.local.get('preventingTabClosingState', function(storage) {
            let newState;
            if(!!storage && storage.preventingTabClosingState !== 'true') {
                newState = 'true';
                makeBtnEnabled(btn);
            } else {
                newState = 'false';
                makeBtnDisabled(btn);
            }
            chrome.storage.local.set({ 'preventingTabClosingState': newState }, function() {
                console.debug("preventing-tab-closing-activator - TabClosingState - Succeed.");
            });
        });
    } else {
        console.warn("preventing-tab-closing-activator - Sorry, but your browser doesn't support dynamic deactivation.");
        unsupportedBtn(btn);
    }
}

function onActivatorToggleClick(event) {
    console.debug("preventing-tab-closing-activator - Trying to change Tab Close preventing state...");
    if(!!event){
        let btn = event.currentTarget;
        toggleState(btn);
    }
}

function enableActivatorOnClickListener(){
    let btn = document.getElementById("preventing-tab-closing-activator");
    if(!!btn){
        btn.addEventListener("click", onActivatorToggleClick)
        actualizeState(btn);
    } else {
        console.warn("preventing-tab-closing-activator - Sorry, but your browser doesn't support dynamic deactivation.");
    }
}

function makeSaveUrlBtnDisabled(btn, textInput) {
    btn.disabled = false;
    textInput.value = "";
    btn.className = "btn btn-secondary";
}
function makeSaveUrlBtnEnabled(saveBtn, textInput, url) {
    saveBtn.disabled = false;
    textInput.value = url;
    saveBtn.className = "btn btn-secondary";
}
function unsupportedSaveUrlBtn(saveBtn, textInput) {
    saveBtn.disabled = true;
    textInput.value = "";
    saveBtn.className = "btn btn-lg btn-secondary";
}

function actualizeSaveUrlBtn(btn, textInput) {
    if(!!chrome && !!chrome.storage && !!chrome.storage.local){
        chrome.storage.local.get('preventingTabClosingUrlPattern', function(storage) {
            if(!!storage && !!storage.preventingTabClosingUrlPattern) {
                makeSaveUrlBtnEnabled(btn, textInput, storage.preventingTabClosingUrlPattern)
            } else {
                makeSaveUrlBtnDisabled(btn, textInput);
            }
        });
    } else {
        console.warn("preventing-tab-closing-activator - Sorry, but your browser doesn't support Regex specification.");
        unsupportedSaveUrlBtn(btn, textInput);
    }
}

function saveUrl(btn, textInput) {
    if(!!chrome && !!chrome.storage && !!chrome.storage.local){
        chrome.storage.local.get('preventingTabClosingUrlPattern', function(storage) {
            let newState = undefined;
            if(!!storage && !!storage.preventingTabClosingUrlPattern) {
                if(storage.preventingTabClosingUrlPattern !== textInput.value){
                    newState = textInput.value;
                }
            } else {
                newState = textInput.value;
            }
            if(newState !== undefined) {
                chrome.storage.local.set({ 'preventingTabClosingUrlPattern': newState }, function() {
                    console.debug("preventing-tab-closing-activator - UrlPattern - Succeed.");
                });
            }
        });
    } else {
        console.warn("preventing-tab-closing-activator - Sorry, but your browser doesn't support Regex specification.");
        unsupportedSaveUrlBtn(btn, textInput);
    }
}

function onSaveUrlPatternClick(event) {
    console.debug("preventing-tab-closing-activator - Trying to save Specific URL Pattern...");
    if(!!event){
        let btn = event.currentTarget;
        let textInput = document.getElementById("preventing-tab-closing-url-pattern-text");
        if(!!btn && !!textInput){
            saveUrl(btn, textInput);
        }
    }
}

function enableSavePatternOnClickListener() {
    let btn = document.getElementById("preventing-tab-closing-url-pattern");
    let textInput = document.getElementById("preventing-tab-closing-url-pattern-text");
    if (!!btn && !!textInput) {
        btn.addEventListener("click", onSaveUrlPatternClick)
        actualizeSaveUrlBtn(btn, textInput);
    } else {
        console.warn("preventing-tab-closing-activator - Sorry, but your browser doesn't support Regex specification.");
    }
}

function initialization() {
    enableActivatorOnClickListener();
    enableSavePatternOnClickListener();
    console.debug("preventing-tab-closing-activator - Popup activated")
}

initialization();
