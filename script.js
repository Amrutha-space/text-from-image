document.getElementById("imageInput").addEventListener("change", function(event) {
    let image = event.target.files[0];
    
    if (image) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
            document.getElementById("preview").style.display = "block";
        };
        reader.readAsDataURL(image);
    }
});

document.getElementById("extractTextBtn").addEventListener("click", function() {
    let imageSrc = document.getElementById("preview").src;
    
    if (!imageSrc) {
        alert("Please upload an image first!");
        return;
    }

    document.getElementById("loading").style.display = "block";
    
    Tesseract.recognize(
        imageSrc,
        'eng', // Language
        {
            logger: m => console.log(m) // Logs progress
        }
    ).then(({ data: { text } }) => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("outputText").innerText = text;
    }).catch(error => {
        document.getElementById("loading").style.display = "none";
        console.error("OCR Error:", error);
    });
});
