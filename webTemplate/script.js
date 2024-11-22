const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");
const imageLink = document.getElementById("imageLink");

const API_KEY = "8b174ad4f94ae3ceffdb8b6c352b0e97"; // Replace with your ImgBB API key

uploadBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];

  if (!file) {
    alert("Please select an image!");
    return;
  }

  status.classList.remove("hidden");
  status.textContent = "Uploading...";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      status.textContent = "Upload Successful!";
      imageLink.href = data.data.url;
      imageLink.textContent = data.data.url;
      imageLink.classList.remove("hidden");
    } else {
      status.textContent = "Upload Failed!";
    }
  } catch (error) {
    status.textContent = "Error uploading the image.";
    console.error(error);
  }
});
