function log(){
	const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/f1fa616da1fc4bac8383b9ae25380eb5');
	provider.getBlockNumber().then((blockNumber) => {
	console.log('Current block number:', blockNumber);
	}).catch((error) => {
	console.error('Error:', error);
	});
}
document.getElementById("login-button").addEventListener("click", function () {
    // Get patient ID and password from the form
    const pid = document.getElementById("patient-id").value;
    const pps = document.getElementById("password").value;
    if (document.getElementById("patient-id").value.startsWith('PR') && document.getElementById("patient-id").value == document.getElementById("password").value) {
        p_id = pid;
        document.getElementById("login-form").style.display = "none";
        fetchAndDisplayProviderData();
        fetchAndDisplayPatientData();
        fetchAndDisplayConsentData();
        apiUrl5 = `http://localhost:3000/image/${p_id}`;
        fetchAndLoadImage(apiUrl5);
        document.getElementById("contents").style.display = "block";
        // document.getElementById("emergencyContactTabsContent").style.display = "block";
        document.getElementById("login-form").style.display = "none";
        document.getElementById('title').style.display = "block";
        document.getElementById('logout-button').style.display = "block";
        document.getElementById('photo').style.display = "block";
    } else {
        const loginAlert = document.getElementById("login-alert");
        loginAlert.style.display = "block";
    }
});