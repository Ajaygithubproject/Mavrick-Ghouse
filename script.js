const scriptURL = "https://script.google.com/macros/s/AKfycbyRbRRYXHPGX4Kgi7bCxWBo74IIDuB9lygIgzWW0HS83WLFgjuwcH33kpmxDgrvMXafNA/exec"; // Replace this with your URL

const form = document.getElementById("candidateForm");

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function saveData() {
  const formData = new FormData(form);
  const photo = formData.get("photo");
  const doc = formData.get("document");

  const data = {
    date: formData.get("date"),
    staffName: formData.get("staffName"),
    reference: formData.get("reference"),
    candidateName: formData.get("candidateName"),
    passportNumber: formData.get("passportNumber"),
    resume: getCheckboxValues("resume"),
    boardingPayment: formData.get("boardingPayment"),
    boardingPaymentDate: formData.get("boardingPaymentDate"),
    boardingAgreementDate: formData.get("boardingAgreementDate"),
    offerLetterDate: formData.get("offerLetterDate"),
    offerLetterPayment: formData.get("offerLetterPayment"),
    originalDocumentDate: formData.get("originalDocumentDate"),
    documentVerification: getCheckboxValues("documentVerification"),
    medical: getCheckboxValues("medical"),
    ticket: getCheckboxValues("ticket"),
    workPermit: getCheckboxValues("workPermit"),
    photo: photo ? await toBase64(photo) : "",
    document: doc ? await toBase64(doc) : ""
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(() => {
    alert("Data saved successfully!");
    form.reset();
  })
  .catch(error => {
    console.error("Error!", error.message);
    alert("Failed to save data.");
  });
}

function getCheckboxValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)]
    .map(cb => cb.value)
    .join(", ");
}
