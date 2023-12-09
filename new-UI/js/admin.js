
let query1 = 'select * from patients';
let query2 = 'select * from emergencyContact';
let query3 = 'select * from provider';
let query4 = 'select * from insuranceAgent';
let query5 = 'select * from pharmacist';

async function onLoad(){
    showLoadingOverlay();
    document.getElementById('logout-button').style.display = "block";
    document.getElementById('dashboard').style.display = "block";
    document.getElementById('photo').style.display = "block";
    apiUrl5 = `http://localhost:3000/image/ICA1001`; //change this 
    await fetchAndLoadImage(apiUrl5);
    await fetchPatientDataAndPopulateTable();
    await fetchEmergencyContactDataAndPopulateTable();
    await fetchProviderDataAndPopulateTable();
    await fetchInsuranceAgentDataAndPopulateTable();
    await fetchPharmacistDataAndPopulateTable();
    hideLoadingOverlay();
}


async function fetchPatientDataAndPopulateTable() {
    try {
        const patientData = await executeQuery(query1);
        const tableBody = document.getElementById('patients-info-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

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
        console.error('Error fetching data:', error);
    }
}

async function fetchEmergencyContactDataAndPopulateTable() {
    try {
        const patientData = await executeQuery(query2);
        const tableBody = document.getElementById('emergency-contacts-info-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

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
        console.error('Error fetching data:', error);
    }
}

async function fetchProviderDataAndPopulateTable() {
    try {
        const patientData = await executeQuery(query3);
        const tableBody = document.getElementById("providers-info-table").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

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
        console.error('Error fetching data:', error);
    }
}
async function fetchInsuranceAgentDataAndPopulateTable() {
    try {
        const patientData = await executeQuery(query4);
        const tableBody = document.getElementById("insurance-agent-info-table").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

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
        console.error('Error fetching data:', error);
    }
}
async function fetchPharmacistDataAndPopulateTable() {
    try {
        const patientData = await executeQuery(query5);
        const tableBody = document.getElementById("pharmacist-info-table").getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

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
        console.error('Error fetching data:', error);
    }
}

function hello(){
    let val = document.getElementById("user-type").value;
    if(val == "reset"){
        resetForm();
    }else if(val == "patient"){
        resetForm();
        document.getElementById("id").style.display="block";
        document.getElementById("name").style.display="block";
        document.getElementById("dob").style.display="block";
        document.getElementById("gender").style.display="block";
        document.getElementById("phone").style.display="block";
        document.getElementById("email").style.display="block";

    }else if(val == "insurance-agent"){
        resetForm();
        document.getElementById("id").style.display="block";
        document.getElementById("name").style.display="block";
        document.getElementById("dob").style.display="block";
        document.getElementById("title").style.display="block";
        document.getElementById("company").style.display="block";
        document.getElementById("phone").style.display="block";
        document.getElementById("email").style.display="block";
    }else if(val == "pharmacist"){
        resetForm();
        document.getElementById("id").style.display="block";
        document.getElementById("name").style.display="block";
        document.getElementById("dob").style.display="block";
        document.getElementById("title").style.display="block";
        document.getElementById("company").style.display="block";
        document.getElementById("phone").style.display="block";
        document.getElementById("email").style.display="block";
    }else if(val == "provider"){
        resetForm();
        document.getElementById("id").style.display="block";
        document.getElementById("name").style.display="block";
        document.getElementById("dob").style.display="block";
        document.getElementById("title").style.display="block";
        document.getElementById("phone").style.display="block";
        document.getElementById("email").style.display="block";
    }
    else if(val == "emergency-contact"){
        resetForm();
        document.getElementById("id").style.display="block";
        document.getElementById("name").style.display="block";
        document.getElementById("dob").style.display="block";
        document.getElementById("phone").style.display="block";
        document.getElementById("email").style.display="block";
        document.getElementById("patient-id").style.display="block";
        document.getElementById("relationship").style.display="block";
    }
    document.getElementById("submit-button").disabled = false;
}
function resetForm(){
    document.getElementById("id").style.display="none";
    document.getElementById("name").style.display="none";
    document.getElementById("dob").style.display="none";
    document.getElementById("title").style.display="none";
    document.getElementById("company").style.display="none";
    document.getElementById("phone").style.display="none";
    document.getElementById("email").style.display="none";
    document.getElementById("gender").style.display="none";
    document.getElementById("patient-id").style.display="none";
    document.getElementById("relationship").style.display="none";
    document.getElementById("submit-button").disabled = true;
}
function validateForm(){
    let val = document.getElementById("user-type").value;
    let userData = {}; 
    if(val == "patient"){
        userData.id = document.getElementById("idv").value;
        userData.name = document.getElementById("namev").value;
        userData.dob = convertToFormattedDOB(document.getElementById("dobv").value);
        userData.gender = document.getElementById("genderv").value;
        userData.phone = document.getElementById("phonev").value;
        userData.email = document.getElementById("emailv").value;
        let query = `insert into patients values ('${userData.id}','${userData.name}','${userData.dob}','${userData.gender}','${userData.phone}','${userData.email}')`;
        executeQuery(query);
        alert("User Rgistered Successfully")
    }else if(val == "insurance-agent"){
        userData.id = document.getElementById("idv").value;
        userData.name = document.getElementById("namev").value;
        userData.dob = convertToFormattedDOB(document.getElementById("dobv").value);
        userData.title = document.getElementById("titlev").value;
        userData.company = document.getElementById("companyv").value;
        userData.phone = document.getElementById("phonev").value;
        userData.email = document.getElementById("emailv").value;
        let query = `insert into InsuranceAgent values ('${userData.id}','${userData.name}','${userData.dob}','${userData.title}','${userData.company}','${userData.phone}','${userData.email}')`;
        executeQuery(query);
        alert("User Rgistered Successfully")
    }else if(val == "pharmacist"){
        userData.id = document.getElementById("idv").value;
        userData.name = document.getElementById("namev").value;
        userData.dob = convertToFormattedDOB(document.getElementById("dobv").value);
        userData.title = document.getElementById("titlev").value;
        userData.company = document.getElementById("companyv").value;
        userData.phone = document.getElementById("phonev").value;
        userData.email = document.getElementById("emailv").value;
        let query = `insert into Pharmacist values ('${userData.id}','${userData.name}','${userData.dob}','${userData.title}','${userData.company}','${userData.phone}','${userData.email}')`;
        executeQuery(query);
        alert("User Rgistered Successfully")
    }else if(val == "provider"){
        resetForm();
        userData.id = document.getElementById("idv").value;
        userData.name = document.getElementById("namev").value;
        userData.dob = convertToFormattedDOB(document.getElementById("dobv").value);
        userData.title = document.getElementById("titlev").value;
        userData.phone = document.getElementById("phonev").value;
        userData.email = document.getElementById("emailv").value;
        let query = `insert into provider values ('${userData.id}','${userData.name}','${userData.dob}','${userData.title}','${userData.phone}','${userData.email}')`;
        executeQuery(query);
        alert("User Rgistered Successfully")
    }else if(val == "emergency-contact"){
        resetForm();
        userData.id = document.getElementById("idv").value;
        userData.name = document.getElementById("namev").value;
        userData.dob = convertToFormattedDOB(document.getElementById("dobv").value);
        userData.phone = document.getElementById("phonev").value;
        userData.email = document.getElementById("emailv").value;
        userData.patientID = document.getElementById("patient-idv").value;
        userData.relationship = document.getElementById("relationshipv").value;
        let query = `insert into emergencyContact values ('${userData.id}','${userData.name}','${userData.dob}','${userData.phone}','${userData.email}','${userData.patientID}','${userData.relationship}')`;
        console.log(query);
        console.log(executeQuery(query));
        alert("User Rgistered Successfully")
    }
}

function convertToFormattedDOB(inputDate) {
    const dateObject = new Date(inputDate);
    
    const day = ('0' + dateObject.getDate()).slice(-2);
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const year = dateObject.getFullYear();

    return `DOB${day}${month}${year}`;
}


onLoad()