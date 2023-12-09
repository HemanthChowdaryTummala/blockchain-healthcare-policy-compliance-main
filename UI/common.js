function fetchAndLoadImage(passURL){
    const img = document.getElementById('image'); // Make sure you have an HTML element with the id "image"
    fetch(passURL)
    .then((response) => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.blob(); // Get the response body as a Blob
    })
    .then((imageBlob) => {
        // Create an object URL from the Blob
        const imageUrl = URL.createObjectURL(imageBlob);

        // Set the src attribute of the img tag to display the image
        img.src = imageUrl;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}