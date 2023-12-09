document.getElementById("login-button").addEventListener("click", function () {
    var loginId = document.getElementById("patient-id").value;

    if (loginId.includes("PR")) {
        window.location.href = "provider.html?id=" + loginId;
    } else if (loginId.includes("PT")) {
        window.location.href = "patient.html?id=" + loginId;
    } else if (loginId.includes("admin")) {
        window.location.href = "admin.html?id=" + loginId;
    } else if (loginId.includes("ICA")) {
        window.location.href = "insurance-agent.html?id=" + loginId;
    } else if (loginId.includes("PHR")) {
        window.location.href = "pharmacist.html?id=" + loginId;
    } else if (loginId.includes("EC")) {
        window.location.href = "emergency-contact.html?id=" + loginId;
    } else {
        // Handle invalid login ID
        document.getElementById("login-alert").style.display = "block";
    }
});