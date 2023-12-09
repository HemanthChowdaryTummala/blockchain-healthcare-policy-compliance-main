let phr_id;
let patientID;
let query2;
let patients = [];
let contracts = [];
async function onLoad() {
    showLoadingOverlay();
    phr_id = getIdValue();
    await fetchAndDisplayInsuranceAgentDetailsData();
    await fetchAndDisplayPatientData();
    apiUrl5 = `http://localhost:3000/image/${phr_id}`;
    await fetchAndLoadImage(apiUrl5);
    contractUrl = `select distinct(ObjectId) from InformedConsent where Subject = "${phr_id}"`;
    patients = (await executeQuery(contractUrl)).data;
    const contractPromises = patients.map(async (element) => {
        const contractQuery = `select contract from contracts where patient = "${element.ObjectId}"`;
        const contractResult = await executeQuery(contractQuery);
        return contractResult.data;
    });
    contracts = await Promise.all(contractPromises);
    await fetchAndDisplayConsentData();
    document.getElementById("contents").style.display = "block";
    document.getElementById('title').style.display = "block";
    document.getElementById('logout-button').style.display = "block";
    document.getElementById('photo').style.display = "block";
    hideLoadingOverlay();
}

async function fetchAndDisplayInsuranceAgentDetailsData() {
    try {
        query = `select * from Pharmacist where ID = '${phr_id}'`;
        patientData = await executeQuery(query);
        patientID = patientData.data[0].patient_id;
        const patientDetailsContainer = document.getElementById('pharmacist-details-container');
        patientDetailsContainer.innerHTML = `
            <table class="table table-striped table-bordered mt-3">
                <tr>
                    <th class="bg-info text-white text-center">Information</th>
                    <th class="bg-info text-white text-center">Value</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <td>${patientData.data[0].ID}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${patientData.data[0].Name}</td>
                </tr>
                <tr>
                    <th>Date of Birth</th>
                    <td>${patientData.data[0].DateOfBirth}</td>
                </tr>
                <tr>
                    <th>Title</th>
                    <td>${patientData.data[0].Title}</td>
                </tr>
                <tr>
                    <th>Company</th>
                    <td>${patientData.data[0].Company}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${patientData.data[0].Phone}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${patientData.data[0].Email}</td>
                </tr>
            </table>
        `;
    } catch (error) {
        console.error('Error fetching patient data:', error);
    }
}

async function fetchAndDisplayPatientData() {
    try {
        const ecQuery = `select distinct Patient from final_consents where Subject = '${phr_id}'`;
        const ecData = await executeQuery(ecQuery);
        const patientDetailsContainer = document.getElementById('patient-details-container');
        patientDetailsContainer.innerHTML = '';

        const rows = [];

        for (const ecRow of ecData.data) {
            const patientID = ecRow.Patient;
            const query2 = `select * from patients where patient_id = '${patientID}'`;
            const patientData = await executeQuery(query2);

            if (patientData.data.length > 0) {
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

async function fetchAndDisplayConsentData(patientId) {
    const provider = window.ethereum;
    await provider.enable();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();

    const consentDetailsContainer = document.getElementById('consent-details-container');
    let i = 0;

    for (const element of contracts) {
        try {
            const contractAddress = element[0].contract;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const consents = await contract.getConsentsBySubject(phr_id);
            console.log(consents);

            const rows = [];
            let previousPatient = null;

            for (const consent of consents) {
                const patientCell = (consent.patient !== previousPatient)
                    ? `<td class="text-center"><b>${patients[i].ObjectId}</b></td>`
                    : '<td></td>';
                const row = `
                    <tr>
                        ${patientCell}
                        <td>${consent.action}</td>
                        <td>${consent.object}</td>
                    </tr>
                `;
                rows.push(row);
                previousPatient = consent.patient;
            }

            if (rows.length > 0) {
                const table = consentDetailsContainer.querySelector('table');
                if (!table) {
                    consentDetailsContainer.innerHTML = `
                        <table class="table table-striped table-bordered mt-3">
                            <tr>
                                <th class="bg-info text-white text-center">Patient</th>
                                <th class="bg-info text-white text-center">Action</th>
                                <th class="bg-info text-white text-center">Object</th>
                            </tr>
                            ${rows.join('')}
                        </table>
                    `;
                } else {
                    const tbody = table.querySelector('tbody');
                    tbody.innerHTML += rows.join('');
                }
            }

        } catch (error) {
            console.error('Error fetching patient data:', error.message || error);
        }
        i++;
    }
}

onLoad();