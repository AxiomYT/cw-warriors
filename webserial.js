
localStorage.setItem("serialBool", false);

// This subset of functions has to be processed *after* runtime / pageload
// As it modifies DOM elements directly, which will render a lot slower.
window.addEventListener('load', function () {

    // This checks if the browser window.navigator contains a property
    // called 'serial', which is the entry point object to the Web Serial API.
    if ("serial" in navigator) {
        document.getElementById('serialCompatText').innerHTML = "✓";
        document.getElementById('serialCompatText').innerHTML = "Browser is <br id=\"isCompatibleWrap\"> Compatible";

        document.getElementById('serialCheckCapsule').style = "background-color:rgb(222, 255, 185);";
        document.getElementById('serialCompatCheck').style = "color:green;";
        document.getElementById('serialCompatText').style = "color:green;";

        requestPorts();
    }

})

// Async because serial communication could occur at any time.
async function requestPorts() {
    port = await this.navigator.serial.requestPort();
    await port.open({baudrate: 9600})

    while (port.readable) {
        document.getElementById('validCompatText').innerHTML = "✓";
        document.getElementById('validCompatText').innerHTML = `Valid Device - ${port.getInfo()}`;

        document.getElementById('validCheckCapsule').style = "background-color:rgb(222, 255, 185);";
        document.getElementById('validCompatCheck').style = "color:green;";
        document.getElementById('validCompatText').style = "color:green;";
    }
}

// Listens for the webSerial API trigger on the 'connect' event.
port.addEventListener("connect", (event) => {
    document.getElementById('portCompatText').innerHTML = "✓";
    document.getElementById('portCompatText').innerHTML = `Port Selected - ${event.target}`;

    document.getElementById('portCheckCapsule').style = "background-color:rgb(222, 255, 185);";
    document.getElementById('portCompatCheck').style = "color:green;";
    document.getElementById('portCompatText').style = "color:green;";

    localStorage.setItem("serialPort", event.target);
    localStorage.setItem("serialBool", true);
    }

);
