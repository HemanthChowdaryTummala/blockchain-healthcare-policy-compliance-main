let ec_id;
let patientID;
let query2;
document.getElementById("login-button").addEventListener("click", function () {
    // Get patient ID and password from the form
    const ecid = document.getElementById("patient-id").value;
    const ecps = document.getElementById("password").value;
    if (document.getElementById("patient-id").value.startsWith('EC') && document.getElementById("patient-id").value == document.getElementById("password").value) {
        ec_id = ecid;
        document.getElementById("login-form").style.display = "none";
        fetchAndDisplayEmergencyContactData();
        fetchAndDisplayPatientData();
        fetchAndDisplayConsentData();
        apiUrl5 = `http://localhost:3000/image/${ec_id}`;
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
                resolve(data); // Resolve the Promise with the fetched data
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error); // Reject the Promise if there's an error
            });
    });
}
async function fetchAndDisplayEmergencyContactData() {
    try {
        query = `select * from emergencyContact where contact_id = '${ec_id}'`;
        patientData = await executeQuery(query);
        patientID = patientData.data[0].patient_id;
        const patientDetailsContainer = document.getElementById('emergency-contact-details-container');
        patientDetailsContainer.innerHTML = `
            <table class="table table-striped table-bordered mt-3">
                <tr>
                    <th class="bg-info text-white text-center">Information</th>
                    <th class="bg-info text-white text-center">Value</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <td>${patientData.data[0].contact_id}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${patientData.data[0].name}</td>
                </tr>
                <tr>
                    <th>Date of Birth</th>
                    <td>${patientData.data[0].date_of_birth}</td>
                </tr>
                <tr>
                    <th>Patient ID</th>
                    <td>${patientData.data[0].patient_id}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${patientData.data[0].phone}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${patientData.data[0].email}</td>
                </tr>
                <tr>
                <th>Relationship</th>
                <td>${patientData.data[0].relationship}</td>
            </tr>
            </table>
        `;
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}

async function fetchAndDisplayPatientData() {
    try {
        // Fetch all the unique patient_id values from the emergencyContact table
        const ecQuery = `select * from emergencyContact where contact_id = '${ec_id}'`;
        const ecData = await executeQuery(ecQuery);
        const patientDetailsContainer = document.getElementById('patient-details-container');
        patientDetailsContainer.innerHTML = '';

        // Create an array to hold rows
        const rows = [];

        for (const ecRow of ecData.data) {
            const patientID = ecRow.patient_id;
            const query2 = `select * from patients where patient_id = '${patientID}'`;
            const patientData = await executeQuery(query2);

            if (patientData.data.length > 0) {
                // Create a row for each patient
                const row = `
                    <tr>
                        <td>${patientData.data[0].patient_id}</td>
                        <td>${patientData.data[0].first_name}</td>
                        <td>${patientData.data[0].date_of_birth}</td>
                        <td>${patientData.data[0].gender}</td>
                        <td>${patientData.data[0].phone}</td>
                        <td>${patientData.data[0].email}</td>
                    </tr>
                `;
                rows.push(row);
            }
        }

        if (rows.length > 0) {
            // Add the table header and rows to the container
            patientDetailsContainer.innerHTML = `
                <table class="table table-striped table-bordered mt-3">
                    <tr>
                        <th class="bg-info text-white text-center">ID</th>
                        <th class="bg-info text-white text-center">Name</th>
                        <th class="bg-info text-white text-center">Date of Birth</th>
                        <th class="bg-info text-white text-center">Gender</th>
                        <th class="bg-info text-white text-center">Phone</th>
                        <th class="bg-info text-white text-center">Email</th>
                    </tr>
                    ${rows.join('')} <!-- Join rows into the table -->
                </table>
            `;
        }
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}

// async function fetchAndDisplayConsentData() {
//     try {
//         query = `select * from emergencyContact where contact_id = '${ec_id}'`;
//         ec = await executeQuery(query);
//         const consentDetailsContainer = document.getElementById('consent-details-container');

//         const rows = [];

//         for (const ecRow of ec.data) {
//             console.log(ecRow)
//             const patientID = ecRow.contact_id;
//             const query2 = `select * from final_consents where Subject = '${patientID}'`;
//             const patientData = await executeQuery(query2);

//             if (patientData.data.length > 0) {
//                 // Create a row for each patient
//                 const row = `
//                     <tr>
//                         <td>${patientData.data[0].Patient}</td>
//                         <td>${patientData.data[0].Subject}</td>
//                         <td>${patientData.data[0].Action}</td>
//                         <td>${patientData.data[0].Object}</td>
//                     </tr>
//                 `;
//                 rows.push(row);
//             }
//         }

//         if (rows.length > 0) {
//             // Add the table header and rows to the container
//             consentDetailsContainer.innerHTML = `
//                 <table class="table table-striped table-bordered mt-3">
//                     <tr>
//                         <th class="bg-info text-white text-center">Patient</th>
//                         <th class="bg-info text-white text-center">Subject</th>
//                         <th class="bg-info text-white text-center">Action</th>
//                         <th class="bg-info text-white text-center">Object</th>
//                     </tr>
//                     ${rows.join('')}
//                 </table>
//             `;
//         }
//     } catch (error) {
//         console.error('Error fetching patient data:', error);
//     }
// }
async function fetchAndDisplayConsentData() {
    try {
        const query = `select * from emergencyContact where contact_id = '${ec_id}'`;
        const ec = await executeQuery(query);
        const consentDetailsContainer = document.getElementById('consent-details-container');
        const rows = [];
        let previousPatientID = null;

        for (const ecRow of ec.data) {
            const patientID = ecRow.contact_id;
            const query2 = `select * from final_consents where Subject = '${patientID}'`;
            const patientData = await executeQuery(query2);

            for (const consent of patientData.data) {
                const patientCell = (patientID !== previousPatientID) ? `<td class="text-center"><b>${consent.Patient}</b></td>` : '<td></td>';
                const row = `
                    <tr>
                        ${patientCell}
                        <td>${consent.Subject}</td>
                        <td>${consent.Action}</td>
                        <td>${consent.Object}</td>
                    </tr>
                `;
                rows.push(row);
                previousPatientID = patientID;
            }
        }

        if (rows.length > 0) {
            // Add the table header and rows to the container
            consentDetailsContainer.innerHTML = `
                <table class="table table-striped table-bordered mt-3">
                    <tr>
                        <th class="bg-info text-white text-center">Patient</th>
                        <th class="bg-info text-white text-center">Subject</th>
                        <th class="bg-info text-white text-center">Action</th>
                        <th class="bg-info text-white text-center">Object</th>
                    </tr>
                    ${rows.join('')}
                </table>
            `;
        }
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}

function logout(){
    document.getElementById('logout-button').style.display = "none";
    window.location.href = 'index.html';
}