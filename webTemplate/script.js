const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const downloadButton = document.getElementById("downloadButton");

let uploadedImageUrl = null;

// Handle Image Upload
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImageUrl = e.target.result;
      imagePreview.innerHTML = `<img src="${uploadedImageUrl}" alt="Uploaded Image" class="max-w-full max-h-[200px]"/>`;
      downloadButton.disabled = false;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = `<p class="text-gray-500">No image uploaded</p>`;
    downloadButton.disabled = true;
  }
});

// Handle HTML Download
downloadButton.addEventListener("click", () => {
  if (!uploadedImageUrl) return;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated HTML</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background-color: #f3f4f6;
    }
    img {
      max-width: 98%;
      height: auto;
    }
  </style>
</head>
<body>
  <img src="${uploadedImageUrl}" alt="Uploaded Image">
</body>
</html>
`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "image.html";
  link.click();
});
