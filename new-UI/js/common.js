function getIdValue() {
    var url = window.location.href;
    var startIndex = url.indexOf("id=");
    if (startIndex !== -1) {
        var idValue = url.substring(startIndex + 3);
        return idValue;
    } else {
        return null;
    }
}
function fetchAndLoadImage(passURL){
    const img = document.getElementById('image');
    fetch(passURL)
    .then((response) => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.blob(); 
    })
    .then((imageBlob) => {
        const imageUrl = URL.createObjectURL(imageBlob);
        img.src = imageUrl;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
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
                resolve(data); 
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

function showLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function logout(){
    document.getElementById('logout-button').style.display = "none";
    window.location.href = 'index.html';
}
