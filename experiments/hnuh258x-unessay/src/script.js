const getFingerprint = () => {
    // Indicates Chrome but not Edge
    const hasIdleDetector = typeof window.IdleDetector === "function";

    // Indicates Firefox
    const hasMozFSE = !(typeof document.mozFullScreenElement === "undefined");

    // Indicates iOS Safari/mobile Firefox/Linux Chrome
    const noPointerLock = typeof document.body.requestPointerLock === "undefined";

    // Indicates Chromium
    const hasEyeDropper = typeof window.EyeDropper === "function";

    // Caputure default font
    const defaultFont = window.getComputedStyle(document.body)["font-family"];

    // Variable to hold info about user's browser
    let userBrowser = "an unknown browser";

    if (hasMozFSE) {
        userBrowser = "Firefox";
    }else if (!hasIdleDetector && hasEyeDropper) {
        userBrowser = "Microsoft Edge";
    }else if (hasEyeDropper) {
        userBrowser = "Google Chrome";
    }else if (defaultFont === "-webkit-standard") {
        userBrowser = "Safari"
    }

    // Variable to hold user's operating system
    let userOS = "an unknown operating system";

    if (userBrowser === "Safari" && noPointerLock) {
        userOS = "iOS";
    }else if (userBrowser === "Safari") {
        userOS = "macOS";
    }else if (window.screen.height - window.screen.availHeight === 25 || window.screen.height - window.screen.availHeight > 48 || navigator.userAgent.includes("Mac")) {
        userOS = "macOS"
    }else if (window.screen.height - window.screen.availHeight === 48 || navigator.userAgent.includes("Mac")) {
        userOS = "Windows"
    }

    let canvas = document.createElement("canvas");
    let gl = canvas.getContext("webgl");

    let userGPU = "a less well known brand of";
    console.log(gl.getParameter(gl.RENDERER));
    if (gl.getParameter(gl.RENDERER).toLowerCase().includes("apple")) {
        userGPU = "Apple";
        userOS = "macOS"
    }else if (gl.getParameter(gl.RENDERER).toLowerCase().includes("intel")) {
        userGPU = "Intel";
    }else if (gl.getParameter(gl.RENDERER).toLowerCase().includes("nvidia")) {
        userGPU = "Nvidia";
    }else if (gl.getParameter(gl.RENDERER).toLowerCase().includes("amd")) {
        userGPU = "AMD";
    }else if (gl.getParameter(gl.RENDERER).toLowerCase().includes("qualcomm")) {
        userGPU = "Qualcomm";
    }else if (gl.getParameter(gl.RENDERER).toLowerCase().includes("webkit")) {
        userGPU = "unknown (because you are using " + userBrowser + ")";
    }

    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;

    let windowStatus = "floating around";
    if (window.outerHeight === window.screen.height) {
        if (window.outerWidth === window.screen.width) {
            windowStatus = "fullscreened";
        }else{
            windowStatus = "splitscreened";
        }
    }else if (window.outerHeight === window.screen.availHeight) {
        if (window.outerWidth === window.screen.width) {
            windowStatus = "maximized";
        }else{
            windowStatus = "splitscreened";
        }
    }

    let bookmarksShowing = false;
    if (userBrowser === "Firefox" && (window.outerHeight - window.innerHeight === 483 || window.outerHeight - window.innerHeight === 511)) {
        bookmarksShowing = true;
    }else if (userBrowser === "Google Chrome" && window.outerHeight - window.innerHeight === 406) {
        bookmarksShowing = true;
    }else if (userBrowser === "Safari" && (window.outerHeight - window.innerHeight === 377 || window.outerHeight - window.innerHeight === 372 || window.outerHeight - window.innerHeight === 400)) {
        bookmarksShowing = true;
    }else if (userBrowser === "Microsoft Edge" && (window.outerHeight - window.innerHeight === 547 || window.outerHeight - window.innerHeight === 128)) {
        bookmarksShowing = true;
    }

    return {userBrowser, userOS, userGPU, screenWidth, screenHeight, windowStatus, bookmarksShowing}
}

document.getElementById("read-btn").addEventListener("click", () => {
    const fingerprint = getFingerprint();

    // The basics
    document.getElementById("browser").textContent = fingerprint.userBrowser;
    document.getElementById("os").textContent = fingerprint.userOS;

    // Screen size
    document.getElementById("width").textContent = fingerprint.screenWidth;
    document.getElementById("height").textContent = fingerprint.screenHeight;

    // Window status
    document.getElementById("window-status").textContent = fingerprint.windowStatus;
    switch (fingerprint.windowStatus) {
        case "floating around":
            document.getElementById("window-status-expl").textContent = "you are multitasking";
            break;

        case "fullscreened":
        case "maximized":
            document.getElementById("window-status-expl").textContent = "you are only looking at this site";
            break;

        case "splitscreened":
            document.getElementById("window-status-expl").textContent =
                "you are doing two things at once";
            break;
    }

    document.getElementById("bookmarks").textContent = fingerprint.bookmarksShowing ? "have" : "do not have";
    document.getElementById("gpu").textContent = fingerprint.userGPU;

    document.getElementById("read-data").classList.remove("hide");
})

document.getElementById("how-btn").addEventListener("click", () => {
    document.getElementById("how").classList.remove("hide");
})
