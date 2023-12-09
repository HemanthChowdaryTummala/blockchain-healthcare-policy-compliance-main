let query1 = 'select * from patients';
let query2 = 'select * from emergencyContact';
let query3 = 'select * from provider';
let query4 = 'select * from insuranceAgent';
let query5 = 'select * from pharmacist';

document.getElementById("login-button").addEventListener("click", function () {
    // Get patient ID and password from the form
    const ecid = document.getElementById("patient-id").value;
    const ecps = document.getElementById("password").value;
    if (document.getElementById("patient-id").value == "admin" && document.getElementById("password").value == 'admin') {
        document.getElementById('logout-button').style.display = "block";
        document.getElementById('dashboard').style.display = "block";
        document.getElementById('login-form').style.display = "none";
        document.getElementById('photo').style.display = "block";
        apiUrl5 = `http://localhost:3000/image/ICA1001`;
        fetchAndLoadImage(apiUrl5);
        fetchPatientDataAndPopulateTable();
        fetchEmergencyContactDataAndPopulateTable();
        fetchProviderDataAndPopulateTable();
        fetchInsuranceAgentDataAndPopulateTable();
        fetchPharmacistDataAndPopulateTable();

    } else {
        const loginAlert = document.getElementById("login-alert");
        loginAlert.style.display = "block";
    }
});
function executeQuery(queryPassed) {
    return new Promise((resolve, reject) => {
        const dataToSend = {
            query: queryPassed
        };
        const apiUrl = 'http://localhost:3000/query';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend),
        };

        fetch(apiUrl, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Response:', data);
                resolve(data); // Resolve the Promise with the fetched data
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error); // Reject the Promise if there's an error
            });
    });
}

async function fetchPatientDataAndPopulateTable() {
    try {
        console.log('Fetching patient data...');
        const patientData = await executeQuery(query1);
        console.log('Fetched data:', patientData);
        const tableBody = document.getElementById('patients-info-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // Iterate through the data and add rows to the table
        patientData.data.forEach(patient => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = patient.patient_id;
            row.insertCell(1).innerText = patient.first_name;
            row.insertCell(2).innerText = patient.date_of_birth;
            row.insertCell(3).innerText = patient.gender;
            row.insertCell(4).innerText = patient.phone;
            row.insertCell(5).innerText = patient.email;
        });
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}

async function fetchEmergencyContactDataAndPopulateTable() {
    try {
        console.log('Fetching patient data...');
        const patientData = await executeQuery(query2);
        console.log('Fetched data:', patientData);
        const tableBody = document.getElementById('emergency-contacts-info-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // Iterate through the data and add rows to the table
        patientData.data.forEach(patient => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = patient.contact_id;
            row.insertCell(1).innerText = patient.name;
            row.insertCell(2).innerText = patient.date_of_birth;
            row.insertCell(3).innerText = patient.phone;
            row.insertCell(4).innerText = patient.email;
            row.insertCell(5).innerText = patient.patient_id;
            row.insertCell(6).innerText = patient.relationship;
        });
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}

async function fetchProviderDataAndPopulateTable() {
    try {
        console.log('Fetching patient data...');
        const patientData = await executeQuery(query3);
        console.log('Fetched data:', patientData);
        const tableBody = document.getElementById("providers-info-table").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // Iterate through the data and add rows to the table
        patientData.data.forEach(patient => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = patient.provider_id;
            row.insertCell(1).innerText = patient.name;
            row.insertCell(2).innerText = patient.date_of_birth;
            row.insertCell(3).innerText = patient.title;
            row.insertCell(4).innerText = patient.phone;
            row.insertCell(5).innerText = patient.email;
        });
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}
async function fetchInsuranceAgentDataAndPopulateTable() {
    try {
        console.log('Fetching patient data...');
        const patientData = await executeQuery(query4);
        console.log('Fetched data:', patientData);
        const tableBody = document.getElementById("insurance-agent-info-table").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // Iterate through the data and add rows to the table
        patientData.data.forEach(patient => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = patient.ID;
            row.insertCell(1).innerText = patient.Name;
            row.insertCell(2).innerText = patient.DateOfBirth;
            row.insertCell(3).innerText = patient.Title;
            row.insertCell(4).innerText = patient.Company;
            row.insertCell(5).innerText = patient.Phone;
            row.insertCell(5).innerText = patient.Email;
        });
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}
async function fetchPharmacistDataAndPopulateTable() {
    try {
        console.log('Fetching patient data...');
        const patientData = await executeQuery(query5);
        console.log('Fetched data:', patientData);
        const tableBody = document.getElementById("pharmacist-info-table").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // Iterate through the data and add rows to the table
        patientData.data.forEach(patient => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = patient.ID;
            row.insertCell(1).innerText = patient.Name;
            row.insertCell(2).innerText = patient.DateOfBirth;
            row.insertCell(3).innerText = patient.Title;
            row.insertCell(4).innerText = patient.Company;
            row.insertCell(5).innerText = patient.Phone;
            row.insertCell(5).innerText = patient.Email;
        });
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}
function logout(){
    document.getElementById('logout-button').style.display = "none";
    window.location.href = 'index.html';
}
