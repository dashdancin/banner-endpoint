function updateCharCount() {
  const input = document.getElementById("limitedInput");
  const currentLength = input.value.length;
  document.getElementById(
    "charCounter"
  ).textContent = `Se han escrito ${currentLength} de 18 caracteres`;
}
function sendData() {
  const input = document.getElementById("limitedInput").value;
  fetch("https://banner-endpoint.onrender.com/save-input", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputData: input }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
