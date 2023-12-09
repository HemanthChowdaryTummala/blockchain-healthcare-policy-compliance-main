
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
function fetchAndDisplayTreatmentTeamData() {
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
            console.log(apiUrl);
            fetch(apiUrl)
            .then(response => response.json())
            .then(responseData => {
                names = responseData.providerNames;
                console.log(responseData);
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
    const formattedConsents = consents.map(consent => ({
        subject: consent.Subject,
        action: consent.Action,
        object: consent.Object,
      }));
    console.log(formattedConsents)
    addMultipleInformedConsentsWithMetaMask(formattedConsents);
}
function fetchAndDisplayHealthRecords() {

    const tbody = document.querySelector("#health-records-table tbody");

    // Function to fetch data and populate the table
    function fetchDataAndPopulateTable() {
        fetch(apiUrl3)
            .then(response => response.json())
            .then(data => {
                // Clear any existing rows in the table
                tbody.innerHTML = "";

                // Loop through the data and create table rows
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
function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
}
document.getElementById("login-button").addEventListener("click", function () {
    // Get patient ID and password from the form
    const enteredPatientId = document.getElementById("patient-id").value;
    const enteredPassword = document.getElementById("password").value;
    
    if ( patients.includes(enteredPatientId) && enteredPatientId == enteredPassword) {
        // Authentication successful
        patientId = enteredPatientId;
        // Hide the login form
        document.getElementById("login-form").style.display = "none";
        patientId = enteredPatientId;
        apiUrl1 = `http://localhost:3000/patients/${patientId}`;
        apiUrl2 = `http://localhost:3000/treatment-team/${patientId}`;
        apiUrl4 = `http://localhost:3000/informed-consent/${patientId}`;
        apiUrl5 = `http://localhost:3000/image/${patientId}`;
        apiUrl6 = `http://localhost:3000/contracts/${patientId}`;
        loadContent();
        document.getElementById("photo").style.display = "block";
        document.getElementById("main-body").style.display = "block";
        document.getElementById("login-form").style.display = "none";
        document.getElementById('logout-button').style.display = "block";
    } else {
        const loginAlert = document.getElementById("login-alert");
        loginAlert.style.display = "block";
    }
});
function updateRowIndices() {
    const rows = tableBody.rows;
    for (let index = 0; index < rows.length; index++) {
        const deleteButton = rows[index].querySelector('.delete-button');
        deleteButton.dataset.index = index;
    }
}
function newRow(item,index){
    const newRow = tableBody.insertRow(index);

    // Add cells for Subject, Action, Object, and Delete button
    const subjectCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    const objectCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    // Populate the cells with data
    subjectCell.textContent = item.Subject;
    actionCell.textContent = item.Object;
    objectCell.textContent = item.Action;

    // Create a Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger delete-button';
    deleteButton.addEventListener('click', function () {
        const rowIndex = parseInt(deleteButton.dataset.index, 10);
        // Remove the row when the Delete button is clicked
        tableBody.deleteRow(rowIndex);
        consents.splice(rowIndex, 1);
        // Update row indices
        updateRowIndices();
        setConsentCount();
        console.log(consents)
        // You can also make an API call to delete the item from your server
    });

    deleteCell.appendChild(deleteButton);
}
function fetchAndDisplayConsent() {

    fetch(apiUrl4)
        .then((response) => response.json())
        .then((data) => {
            // Get a reference to the table body

            // Loop through the data and create rows
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

    // Get selected values from the dropdowns
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
}
function populateDropdowns() {
    const subjectDropdown = document.getElementById('subject-dropdown');
    const actionDropdown = document.getElementById('action-dropdown');
    const objectDropdown = document.getElementById('object-dropdown');

    // Replace these arrays with your actual data
    const subjectOptions = subject;
    const actionOptions = action;
    const objectOptions = object;

    // Populate Subject dropdown
    subjectOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        subjectDropdown.appendChild(optionElement);
    });

    // Populate Action dropdown
    actionOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        actionDropdown.appendChild(optionElement);
    });

    // Populate Object dropdown
    objectOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        objectDropdown.appendChild(optionElement);
    });
}
function populateConsentModal() {
    // TODO: Replace this with your code to fetch consent data from your data source
    const consentData = consents;

    const consentList = document.getElementById("consentList");

    // Clear any existing consent rows
    consentList.innerHTML = "";

    // Populate the modal with consent data
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

  function executeQuery() {
    const dataToSend = {
        query : 'select * from pharmacist'
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  let contractAddress;

  const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					}
				],
				"internalType": "struct InformedConsentContract.InformedConsent[]",
				"name": "_consents",
				"type": "tuple[]"
			}
		],
		"name": "addMultipleInformedConsents",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllInformedConsents",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					}
				],
				"internalType": "struct InformedConsentContract.InformedConsent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_object",
				"type": "string"
			}
		],
		"name": "getConsentsByObject",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					}
				],
				"internalType": "struct InformedConsentContract.InformedConsent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			}
		],
		"name": "getConsentsBySubject",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					}
				],
				"internalType": "struct InformedConsentContract.InformedConsent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getConsentsForRead",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					}
				],
				"internalType": "struct InformedConsentContract.InformedConsent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getConsentsForUpdate",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					}
				],
				"internalType": "struct InformedConsentContract.InformedConsent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getConsentsForWrite",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					}
				],
				"internalType": "struct InformedConsentContract.InformedConsent[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPatientId",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newPatientId",
				"type": "string"
			}
		],
		"name": "setPatientId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
  
];

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

  // Function to add multiple informed consents with MetaMask in a single transaction
  async function addMultipleInformedConsentsWithMetaMask(consents) {
    try {
      console.log(contractAddress)  
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
  
      console.log('All consents added in a single transaction!');
    } catch (error) {
      console.error('Error adding consents:', error);
    }
  }  
     
executeQuery()
function setConsentCount(){
    document.getElementById("consents-count").innerText = `Number of consents : ${consents.length}`;
}
document.getElementById("accept-consent-button").addEventListener("click", function () {
    populateConsentModal(); // Populate the modal with consent data
    $('#consentModal').modal('show'); // Show the modal
});
function logout(){
    document.getElementById('logout-button').style.display = "none";
    window.location.href = 'index.html';
}
function loadContent() {
    fetchAndLoadImage(apiUrl5);
    fetchAndDisplayPatientData();
    fetchAndDisplayTreatmentTeamData();
    fetchAndDisplayHealthRecords();
    fetchAndDisplayConsent();
    getContractForPatient();
}

