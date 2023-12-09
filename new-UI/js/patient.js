
let patientId;
let contract;
let apiUrl1 ;
let apiUrl2 ;
let apiUrl3 = 'http://localhost:3000/health-records';
let apiUrl4 ;
let apiUrl5 ;
let apiUrl6;
let subject =[];
let object = ["HR1001","HR1002","HR1003","HR1004","HR1005","HR1006","HR1007","HR1008","HR1009","HR1010",];
let patients = ["PT1001","PT1002","PT1003","PT1004","PT1005","PT1006","PT1007","PT1008","PT1009","PT1010",]
let action = ["Read", "Write", "Update"];
let consents = []; 
let contractAddress;
const tableBody = document.querySelector('#api-data-table tbody');
function fetchAndDisplayPatientData() {
    fetch(apiUrl1)
        .then(response => response.json())
        .then(data => {
            const patientDetailsContainer = document.getElementById('patient-details-container');
            patientDetailsContainer.innerHTML = `
                    <table class="table table-striped table-bordered mt-3">
                    <tr>
                        <th class="bg-info text-white text-center">Information</th>
                        <th class="bg-info text-white text-center">Value</th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <td>${data.patient_id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>${data.first_name}</td>
                    </tr>
                    <tr>
                        <th>Date of Birth</th>
                        <td>${data.date_of_birth}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>${data.gender}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${data.email}</td>
                    </tr>
                </table>
            `;
        })
        .catch(error => {
            console.error('Error fetching patient data:', error);
        });
}
async function fetchAndDisplayTreatmentTeamData() {
    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            subject = Object.values(data);
            subject.shift();
            const PR1 = data.Doctor;
            const PR2 = data.Nurse;
            const PR3 = data.Support_Staff;
            const PR4 = data.Billing_Office;
            const PR5 = data.Radiology_Lab_Technician;
            const PR6 = data.Pathology_Lab_Technician;
            const I1 = data.Insurance_Agent;
            const E1 = data.Emergency_Contact;
            const P1 = data.Pharmacist;
            let names;
            let images = [];
            const apiUrl = `http://localhost:3000/provider-data/${PR1}/${PR2}/${PR3}/${PR4}/${PR5}/${PR6}/${I1}/${E1}/${P1}`;
            fetch(apiUrl)
            .then(response => response.json())
            .then(responseData => {
                names = responseData.providerNames;
                const patientDetailsContainer = document.getElementById('treatment-team-details-container');
                patientDetailsContainer.innerHTML = `
                    <table class="table table-striped table-bordered mt-3">
                    <tr>
                        <th class="bg-info text-white text-center">Title</th>
                        <th class="bg-info text-white text-center">ID</th>
                        <th class="bg-info text-white text-center">Name</th>
                    </tr>
                        <tr>
                            <th >Doctor</th>
                            <td >${data.Doctor}</td>
                            <td >${names[0]}</td>
                        </tr>
                        <tr>
                            <th >Nurse</th>
                            <td >${data.Nurse}</td>
                            <td >${names[1]}</td>
                        </tr>
                        <tr>
                            <th >Support Staff</th>
                            <td >${data.Support_Staff}</td>
                            <td >${names[2]}</td>
                        </tr>
                        <tr>
                            <th >Billing Officer</th>
                            <td >${data.Billing_Office}</td>
                            <td >${names[3]}</td>
                        </tr>
                        <tr>
                            <th >Radiology Lab Technician</th>
                            <td >${data.Radiology_Lab_Technician}</td>
                            <td >${names[4]}</td>
                        </tr>
                        <tr>
                            <th >Pathology Lab Technician</th>
                            <td >${data.Pathology_Lab_Technician}</td>
                            <td >${names[5]}</td>
                        </tr>
                        <tr>
                            <th >Emergency Contact</th>
                            <td >${data.Emergency_Contact}</td>
                            <td >${names[6]}</td>
                        </tr>
                        <tr>
                            <th >Pharmacist</th>
                            <td >${data.Pharmacist}</td>
                            <td >${names[7]}</td>
                        </tr>
                        <tr>
                            <th >Insurance Agent</th>
                            <td >${data.Insurance_Agent}</td>
                            <td >${names[8]}</td>
                        </tr>
                    </table>
                `;
                populateDropdowns();
            })
            .catch(error => {
                console.error('Error fetching treatment team data:', error);
            });
        })
        .catch(error => {
            console.error('Error fetching patient data:', error);
        });
}
function calld(){
    document.getElementById("accept-consent-button").style.display = "none";
    document.getElementById("api-data-table").innerHTML="";
    document.getElementById("consents-count").innerHTML="";
    const formattedConsents = consents.map(consent => ({
        subject: consent.Subject,
        action: consent.Action,
        object: consent.Object,
      }));
    addMultipleInformedConsentsWithMetaMask(formattedConsents);
}
async function fetchAndDisplayHealthRecords() {

    const tbody = document.querySelector("#health-records-table tbody");

    function fetchDataAndPopulateTable() {
        fetch(apiUrl3)
            .then(response => response.json())
            .then(data => {
                tbody.innerHTML = "";
                data.forEach(record => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${record.RecordID}</td>
                        <td>${record.RecordName}</td>
                        <td>${record.RecordDescription}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Error fetching data from the API:", error);
            });
    }

    // Call the function to fetch data and populate the table
    fetchDataAndPopulateTable();
}
async function onLoad(){
    showLoadingOverlay();
    patientId = getIdValue();
    apiUrl1 = `http://localhost:3000/patients/${patientId}`;
    apiUrl2 = `http://localhost:3000/treatment-team/${patientId}`;
    apiUrl4 = `http://localhost:3000/informed-consent/${patientId}`;
    apiUrl5 = `http://localhost:3000/image/${patientId}`;
    apiUrl6 = `http://localhost:3000/contracts/${patientId}`;
    contractAddress = getContractForPatient();
    await fetchAndLoadImage(apiUrl5);
    await fetchAndDisplayPatientData();
    await fetchAndDisplayTreatmentTeamData();
    await fetchAndDisplayHealthRecords();
    await fetchAndDisplayExistingConsent();
    document.getElementById("photo").style.display = "block";
    document.getElementById("main-body").style.display = "block";
    document.getElementById('logout-button').style.display = "block";
    hideLoadingOverlay();
}
function updateRowIndices() {
    const rows = tableBody.rows;
    for (let index = 0; index < rows.length; index++) {
        const deleteButton = rows[index].querySelector('.delete-button');
        deleteButton.dataset.index = index;
    }
}
function newRow(item,index){
    if(consents.length != 0){
        document.getElementById("api-data-table").style = 'block';
    }
    const newRow = tableBody.insertRow(index);

    const subjectCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    const objectCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    subjectCell.textContent = item.Subject;
    actionCell.textContent = item.Object;
    objectCell.textContent = item.Action;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger delete-button';
    deleteButton.addEventListener('click', function () {
        const rowIndex = parseInt(deleteButton.dataset.index, 10);
        tableBody.deleteRow(rowIndex);
        consents.splice(rowIndex, 1);
        updateRowIndices();
        setConsentCount();
    });

    deleteCell.appendChild(deleteButton);
}
async function fetchAndDisplayConsent() {

    fetch(apiUrl4)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item, index) => {
                let uniqueConsent = {
                    Subject: item.Subject,
                    Action: item.Action,
                    Object: item.Object
                }
                consents.push(uniqueConsent);
                newRow(item,index);
            });
            setConsentCount();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}
async function fetchAndDisplayExistingConsent() {
    try {
        const provider = window.ethereum;
        await provider.enable();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        let data = await contract.getConsentsLength();
        console.log(data)
        if(data.length == 0){
            await fetchAndDisplayConsent();
            document.getElementById("accept-consent-button").style.display = "inline";
        }else{
            document.getElementById("consent-alert").style.display = "none";
            const sortedData = [...data];
            sortedData.sort((a, b) => a[0].localeCompare(b[0]));
            data = sortedData;
            const table = document.createElement("table");
            table.className = "table table-striped table-bordered mt-3";
            const thead = table.createTHead();
            const headerRow = thead.insertRow();
            const headers = ["Subject", "Action", "Object"];
            headers.forEach(headerText => {
                const th = document.createElement("th");
                th.className = "bg-info text-white text-center";
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            const tbody = document.createElement("tbody");
            const uniqueSubjects = new Set();
            data.forEach((rowData, rowIndex) => {
                const row = tbody.insertRow();
                if (rowIndex === 0 || !uniqueSubjects.has(rowData.subject)) {
                    uniqueSubjects.add(rowData.subject);
                    const subjectCell = row.insertCell(0);
                    const boldSpan = document.createElement("span");
                    boldSpan.style.fontWeight = "bold"; // Set the font weight to bold
                    boldSpan.textContent = rowData.subject;
                    subjectCell.appendChild(boldSpan);
                    subjectCell.className = "text-center";
                } else {
                    const emptyCell = row.insertCell(0);
                    emptyCell.textContent = "";
                }
                const cells = ["action", "object"];
                cells.forEach((cell, index) => {
                    const cellElement = row.insertCell(index + 1);
                    cellElement.textContent = rowData[cell];
                });
            });
            table.appendChild(tbody);
            const existingConsentsDiv = document.getElementById("existing-consents");
            existingConsentsDiv.innerHTML = '';
            existingConsentsDiv.appendChild(table);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayAdd(){
    document.getElementById('add-id').style.display = "block";
}
function removeAdd(){
    document.getElementById('add-id').style.display = "none";   
}
function addDataToTable() {
    const subjectDropdown = document.getElementById('subject-dropdown');
    const actionDropdown = document.getElementById('action-dropdown');
    const objectDropdown = document.getElementById('object-dropdown');
    const tableBody = document.querySelector('#api-data-table tbody');
    const subjectValue = subjectDropdown.value;
    const actionValue = actionDropdown.value;
    const objectValue = objectDropdown.value;
    let newConsent = {
        Subject: subjectDropdown.value,
        Action: actionDropdown.value,
        Object: objectDropdown.value
    };
    consents.push(newConsent);
    newRow(newConsent,consents.length-1);
    subjectDropdown.selectedIndex = 0;
    actionDropdown.selectedIndex = 0;
    objectDropdown.selectedIndex = 0;
    console.log(consents);
    removeAdd();
    setConsentCount();
    document.getElementById("accept-consent-button").style = "block";
}
function populateDropdowns() {
    const subjectDropdown = document.getElementById('subject-dropdown');
    const actionDropdown = document.getElementById('action-dropdown');
    const objectDropdown = document.getElementById('object-dropdown');
    const subjectOptions = subject;
    const actionOptions = action;
    const objectOptions = object;
    subjectOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        subjectDropdown.appendChild(optionElement);
    });
    actionOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        actionDropdown.appendChild(optionElement);
    });
    objectOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        objectDropdown.appendChild(optionElement);
    });
}
function populateConsentModal() {
    const consentData = consents;
    const consentList = document.getElementById("consentList");
    consentList.innerHTML = "";
    consentData.forEach((consent) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        td1.textContent = consent['Subject'];
        td2.textContent = consent['Object'];
        td3.textContent = consent['Action'];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        consentList.appendChild(tr);
    });
}
function postConsentDataToAPI() {
    const dataToSend = {
        patient: patientId,
        consentsList: consents
      };
    const apiUrl = 'http://localhost:3000/confirm-consents';
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}


function getContractForPatient() {
    fetch(apiUrl6)
    .then((response) => response.json())
    .then((data) => {
        contractAddress = data.contract;
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

async function addMultipleInformedConsentsWithMetaMask(consents) {
    try {
        showLoadingOverlay();
        const provider = window.ethereum;
        await provider.enable();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const estimatedGas = await contract.estimateGas.addMultipleInformedConsents(consents);
        const gasPrice = await web3Provider.getGasPrice();
        const transaction = await contract.addMultipleInformedConsents(consents, {
            gasLimit: estimatedGas,
            gasPrice: gasPrice,
        });
        await transaction.wait();
        hideLoadingOverlay();
        alert("New Consents added")
        location.reload(true);
    } catch (error) {
        console.error('Error adding consents:', error);
        hideLoadingOverlay();
    }
}

function setConsentCount(){
    document.getElementById("consents-count").innerText = `Number of consents : ${consents.length}`;
}

document.getElementById("accept-consent-button").addEventListener("click", function () {
    populateConsentModal(); 
    $('#consentModal').modal('show'); 
});

async function log(){
    const provider = window.ethereum;
    await provider.enable();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const data = contract.getConsentsLength();
    console.log(data);
}
onLoad();
