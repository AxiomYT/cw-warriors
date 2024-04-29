
// Function is called by the plus and minus operators next to
// the "Character Speed" and "Code Speed" input boxes.

// Doing this through JS allows for some fun quirks to do with
// listening for value changes, so we just push to localStorage
// when any button is pressed.
function modifySpeedBox(option, modifier) {
    customButton();
    if (option === "charInput") {
        var newNumber = Number(charInput.value) + Number(modifier);
        document.getElementById('charInput').value = newNumber;
        localStorage.setItem("charSpeed", charInput.value);
    }

    else if (option === "codeSpeed") {
        var newNumber = Number(codeInput.value) + Number(modifier);
        document.getElementById('codeInput').value = newNumber;
        localStorage.setItem("codeSpeed", codeInput.value);
    }

    else {
        console.log("Something has went spectacularly wrong.");
    }
};

// This function directly overwrites the #ffa500 (orange) selector
// for all of the buttons, this is a bit hacky, but it means it
// can be written once and called multiple times - D.R.Y.
function wipeAllButtons() {
    difficultyButton1.style.backgroundColor = "transparent";
    difficultyButton2.style.backgroundColor = "transparent";
    difficultyButton3.style.backgroundColor = "transparent";
    difficultyButton4.style.backgroundColor = "transparent"; 
}

// Custom Button should be highlighted when any settings are modified.
function customButton() {
    wipeAllButtons();
    localStorage.setItem("preset", 4);
    difficultyButton4.style = "background-color: #ffa500;";
}

// When the user selects a difficulty preset, the individual
// buttons fire this function, with the value as a parameter
// between 1 and 4, where 4 is dropped silently - as it has no
// business setting input data programatically.
function difficultySet(presetOption) {

    // We're declaring the ID's of the individual buttons in order to
    // handle the background-colour change selector.
    // Assembling them in code incase I need more.
    for (var i = 1; i < 5; i++) {
        window['difficultyButton'+i] = document.getElementById("difficultyButton" + i);
    }

    if (presetOption === 1) {
        // Aforementioned wiping of the colour of the selection.
        wipeAllButtons();
        // It then sets the background colour of the selected option.
        // I don't like it either but pure CSS has no concept of state
        // in that way, only ::active and ::focus exist, but they have
        // undesirable behaviours along with it.
        difficultyButton1.style = "background-color: #ffa500;"

        document.getElementById('charInput').value = 10;
        document.getElementById('codeInput').value = 5;
        document.getElementById('selectNoise').value = 'OFF';
        document.getElementById('selectSignal').value = 'S9';
        document.getElementById('QSBSel').checked = false;
        document.getElementById('chirpSel').checked= false;
        document.getElementById('keyerSel').checked = false;

        localStorage.setItem("preset", 1);
    }
    else if (presetOption === 2) {
        wipeAllButtons();
        difficultyButton2.style = "background-color: #ffa500;"

        document.getElementById('charInput').value = 20;
        document.getElementById('codeInput').value = 7;
        document.getElementById('selectNoise').value = 'S3';
        document.getElementById('selectSignal').value = 'S7';
        document.getElementById('QSBSel').checked = true;
        document.getElementById('chirpSel').checked= false;
        document.getElementById('keyerSel').checked = false;

        localStorage.setItem("preset", 2);
    }
    else if (presetOption === 3) {
        wipeAllButtons();
        difficultyButton3.style = "background-color: #ffa500;"

        document.getElementById('charInput').value = 25;
        document.getElementById('codeInput').value = 10;
        document.getElementById('selectNoise').value = 'S5';
        document.getElementById('selectSignal').value = 'S5';
        document.getElementById('QSBSel').checked = true;
        document.getElementById('chirpSel').checked= true;
        document.getElementById('keyerSel').checked = false;

        localStorage.setItem("preset", 3);
    }
    else if (presetOption === 4) {
        customButton();
        console.log("Custom Difficulty Selected");
    }
    else {
        console.log("Something has went Spectaculary wrong.");
    }

}

// This handles the description flavour text changing programatically.
// Also handles localStorage Logic.
// Waits for the page to load, had some race condition problems.
window.addEventListener('load', function () {

    // Returns 0 if this is the user's first visit.
    if (!localStorage.length === 0) {
        document.getElementById('charInput').value = this.localStorage.getItem("charSpeed");
        document.getElementById('codeInput').value = this.localStorage.getItem("codeSpeed");
        document.getElementById('selectNoise').value = this.localStorage.getItem("noiseLevel");
        document.getElementById('selectSignal').value = this.localStorage.getItem("signalLevel");
        document.getElementById('QSBSel').checked = this.localStorage.getItem("QSB");
        document.getElementById('chirpSel').checked = this.localStorage.getItem("chirp");
        document.getElementById('keyerSel').checked = this.localStorage.getItem("straightKeyBool");
        document.getElementById('keyerInput').checked = this.localStorage.getItem("straightKeyer");
    }
    // If it is, we default to "Cadet Difficulty" / 1.
    else {
        difficultySet(1);
    }

    // Description Lines on the right, assigning variables to each line.
    // This is a bit of a nightmare but I've backed myself into a css corner here. :/ .
    for (var i = 1; i < 6; i++) {
        window['descLine'+i] = document.getElementById("descLine" + i);
    }

    // Woe betide ye who cross this line --

    // This flushes the current description on 'mouseout' events.
    // Can be called multiple times to not repeat more than neccesary.
    function resetDescription() {
        descLine1.textContent = "Hover over an option to";
        descLine2.textContent = "see how it changes your game!";
        descLine3.textContent = "";
        descLine4.textContent = "";
        descLine5.textContent = "";
    }

    // OnHover for the Difficulty Preset Options
    var difficulty = document.getElementById("difficultyRow");
    difficulty.addEventListener("mouseover", function() {
        descLine1.textContent = "Changes how hard the game is";
        descLine2.textContent = "It’s recommended to leave this";
        descLine3.textContent = "At Cadet early on! Selecting ";
        descLine4.textContent = "a Preset will remove your";
        descLine5.textContent = "Custom settings.";
        }
    )
    difficulty.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the Character Speed Selection.
    var charSpeed = document.getElementById("charSpeed");
    charSpeed.addEventListener("mouseover", function() {
        descLine1.textContent = "Inter-Character Spacing -";
        descLine2.textContent = "Increases the speed of the ";
        descLine3.textContent = "individual ‘dit’s’ and ‘dah’s’.";
        descLine4.textContent = "Don’t set this too low as to not";
        descLine5.textContent = "recognise the characters at all.";
        }
    )
    // This listener handles the automatic selection of the //CUSTOM//
    // selector when any of the presets are changed.
    charSpeed.addEventListener("input", function() {
        customButton();
        localStorage.setItem("charSpeed", charInput.value);
        }
    )
    charSpeed.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the Effective Code Speed Selection.
    var codeSpeed = document.getElementById("codeSpeed");
    codeSpeed.addEventListener("mouseover", function() {
        descLine1.textContent = "Inter-Word spacing -";
        descLine2.textContent = "Gives you more time to Process";
        descLine3.textContent = "the word as a whole. Provides ";
        descLine4.textContent = "extra time to recognise";
        descLine5.textContent = "and decode.";
        }
    )
    codeSpeed.addEventListener("input", function() {
        customButton();
        localStorage.setItem("codeSpeed", codeInput.value);
        }
    )
    codeSpeed.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the Noise Level.
    var noiseLevel = document.getElementById("noiseLevel");
    var selNoise = document.getElementById("selectNoise");
    noiseLevel.addEventListener("mouseover", function() {
        descLine1.textContent = "Adds artificial noise to make";
        descLine2.textContent = "The decode more true to life,";
        descLine3.textContent = "Adds some interesting challenge.";
        descLine4.textContent = "S3 (Quiet) > S9 (Loud).";
        descLine5.textContent = "";
        }
    )
    selNoise.addEventListener("change", function() {
        customButton();
        localStorage.setItem("noiseLevel", selNoise.value);
        }
    )
    noiseLevel.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the Signal Level.
    var signalLevel = document.getElementById("signalLevel");
    var selSignal = document.getElementById("selectSignal");
    signalLevel.addEventListener("mouseover", function() {
        descLine1.textContent = "How strong the perceived ";
        descLine2.textContent = "Signal level is, strike a balance";
        descLine3.textContent = "With the noise level for most effect.";
        descLine4.textContent = "Inverse of the Noise Level, e.g)";
        descLine5.textContent = "S9 (Loud Signal) > S1 (Quiet Signal)";
        }
    )
    selSignal.addEventListener("change", function() {
        customButton();
        localStorage.setItem("signalLevel", selSignal.value);
        }
    )
    signalLevel.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the QSB Boolean.
    var QSBBool = document.getElementById("QSBBool");
    var QSBSel = document.getElementById("QSBSel");
    QSBBool.addEventListener("mouseover", function() {
        descLine1.textContent = "Artificial Ionosphere instability";
        descLine2.textContent = "Creates a sort of ‘fading’ effect";
        descLine3.textContent = "On the resulting signal, Can be ";
        descLine4.textContent = "confusing but rewarding.";
        descLine5.textContent = "";
        }
    )
    QSBSel.addEventListener("change", function() {
        customButton();
        localStorage.setItem("QSB", QSBSel.checked);
        }
    )
    QSBBool.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the Chirp Boolean.
    var ChirpBool = document.getElementById("ChirpBool");
    var chirpSel = document.getElementById("chirpSel");
    ChirpBool.addEventListener("mouseover", function() {
        descLine1.textContent = "Simulates Inaccurate Tracking of";
        descLine2.textContent = "Receiver, the frequency itself will ";
        descLine3.textContent = "Appear to ’Warble’  up and down.";
        descLine4.textContent = "This will sound very confusing,";
        descLine5.textContent = "Not recommended for beginners.";
        }
    )
    chirpSel.addEventListener("change", function() {
        customButton();
        localStorage.setItem("chirp", chirpSel.checked);
        }
    )
    ChirpBool.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for both the checkbox and the custom input for straight keys.
    var keyerLeft = document.getElementById("keyerLeft");
    var keyerSel = document.getElementById("keyerSel");
    keyerLeft.addEventListener("mouseover", function() {
        descLine1.textContent = "Set a custom button for the ";
        descLine2.textContent = "straight key to use, only";
        descLine3.textContent = "takes effect if the above";
        descLine4.textContent = "'Straight Key' checkbox is";
        descLine5.textContent = "ticked.";
        }
    )
    keyerSel.addEventListener("change", function() {
        customButton();
        localStorage.setItem("straightKeyBool", keyerSel.checked);
        }
    )
    keyerLeft.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the keyer checkbox.
    var keyerBool = document.getElementById("keyerBool");
    var keyerInput = document.getElementById("keyerInput");
    keyerBool.addEventListener("mouseover", function() {
        descLine1.textContent = "Custom Keyer for straight keys";
        descLine2.textContent = "This mode allows you to use";
        descLine3.textContent = "a single key for both 'dits' and";
        descLine4.textContent = "'dahs' with computer interpretation";
        descLine5.textContent = "for your input, can be innacurate.";
        }
    )
    keyerInput.addEventListener("change", function() {
        customButton(); 
        localStorage.setItem("straightKeyer", keyerInput.value);
        }
    )
    keyerBool.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the Back Button.
    var loopbackButton = document.getElementById("loopbackButton");
    loopbackButton.addEventListener("mouseover", function() {
        descLine1.textContent = "Returns to the main menu,";
        descLine2.textContent = "Dont worry! your settings";
        descLine3.textContent = "are saved to the browser.";
        descLine4.textContent = "";
        descLine5.textContent = "";
        }
    )
    loopbackButton.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

    // OnHover for the WebSerial Button.
    var keyerRight = document.getElementById("keyerRight");
    keyerRight.addEventListener("mouseover", function() {
        descLine1.textContent = "Use custom peripheral keyers";
        descLine2.textContent = "with the Web Serial API,";
        descLine3.textContent = "Not supported in Firefox";
        descLine4.textContent = "without an addon";
        descLine5.textContent = "currently :(";
        }
    )
    keyerRight.addEventListener("mouseout", function() {
        resetDescription();
        }
    )

})