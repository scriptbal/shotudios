document.addEventListener("DOMContentLoaded", () => {
  const serviceGrid = document.getElementById("serviceGrid");

  const packageGrid = document.getElementById("packageGrid");

  const serviceText = document.querySelector(
    ".summary-item:nth-child(2) strong",
  );
  const packageText = document.querySelector(
    ".summary-item:nth-child(3) strong",
  );
  const deliveryText = document.querySelector(
    ".summary-item:nth-child(4) strong",
  );
  const priceText = document.querySelector(".summary-item.total strong");

  const continueBtn = document.querySelector(".primary-btn");

  const progress = document.querySelector(".upload-progress");

  const progressBar = document.querySelector(".upload-progress-bar");

  const progressText = document.querySelector(".upload-progress-text");

  const honeypot = document.getElementById("website");

let services = [

  {
    id: 1,
    name: "MV Commission",
    available: false
  },

  {
    id: 2,
    name: "VTuber Rigging",
    available: true
  },

  {
    id: 3,
    name: "Animation",
    available: false
  }

];


let packages = [

  {
    id: 1,
    service_id: 1,
    name: "Basic",
    price: 50,
    price_idr: 800000,
    delivery: "7 Days",
    status: "active"
  },

  {
    id: 2,
    service_id: 1,
    name: "Standard",
    price: 120,
    price_idr: 1900000,
    delivery: "14 Days",
    status: "active"
  },

  {
    id: 3,
    service_id: 1,
    name: "Premium",
    price: 250,
    price_idr: 4000000,
    delivery: "30 Days",
    status: "active"
  },


 {
    id: 4,
    service_id: 2,
    name: "Basic",
    price: 50,
    price_idr: 699000,
    delivery: "7 Days",
    description: "Bust-up",
    status: "active"
},

{
    id: 5,
    service_id: 2,
    name: "Standard",
    price: 70,
    price_idr: 999000,
    delivery: "10 Days",
    description: "Halfbody",
    status: "active"
},

{
    id: 6,
    service_id: 2,
    name: "Premium",
    price: 150,
    price_idr: 1499000,
    delivery: "14 Days",
    description: "Fullbody",
    status: "active"
},


  {
    id: 7,
    service_id: 3,
    name: "Basic",
    price: 50,
    price_idr: 800000,
    delivery: "7 Days",
    status: "active"
},

{
    id: 8,
    service_id: 3,
    name: "Standard",
    price: 120,
    price_idr: 1900000,
    delivery: "14 Days",
    status: "active"
},

{
    id: 9,
    service_id: 3,
    name: "Premium",
    price: 250,
    price_idr: 4000000,
    delivery: "30 Days",
    status: "active"
}

];

  let selectedService = null;
  let selectedPackage = null;

  continueBtn.disabled = true;

  function updateButton() {
    console.log(
      "selectedService =",
      selectedService,
      "selectedPackage =",
      selectedPackage,
    );

    continueBtn.disabled = !(selectedService && selectedPackage);

    console.log("Button disabled =", continueBtn.disabled);
  }

  updateButton();






  function loadServices() {


console.log("Loading hardcoded services");


serviceGrid.innerHTML = "";


services.forEach((service)=>{


console.log(
"Creating service:",
service
);


const card = document.createElement("div");


card.className = "service-card";


if(!service.available){

    card.classList.add("disabled");

}

card.innerHTML = `

<div class="service-icon">
🎨
</div>

<h3>
${service.name}
</h3>


${
    !service.available
    ?
    `
    <span class="service-status">
        Coming Soon
    </span>
    `
    :
    ""
}

`;



card.addEventListener("click",()=>{


if(!service.available){

    return;

}


document
.querySelectorAll(".service-card")
.forEach((c)=>
c.classList.remove("active")
);



card.classList.add("active");



selectedService = service;


selectedPackage = null;



serviceText.textContent =
service.name;



packageText.textContent =
"—";


deliveryText.textContent =
"—";


priceText.textContent =
"—";



renderPackages();



updateButton();



});



serviceGrid.appendChild(card);



});


}




loadServices();




  function renderPackages() {

        console.log("renderPackages()");

    console.log(selectedService);

    if (!selectedService) {
      packageGrid.innerHTML = `
            <p>Select a service first.</p>
        `;

      return;
    }





    console.log("packages =", packages);
console.log("isArray =", Array.isArray(packages));

const filtered = packages.filter((pkg) => {

    console.log(
        "pkg:",
        pkg.id,
        "service_id:",
        pkg.service_id,
        "selected:",
        selectedService.id,
        "status:",
        pkg.status
    );

    return (
        Number(pkg.service_id) === Number(selectedService.id) &&
        pkg.status === "active"
    );

});

console.log("filtered =", filtered);

console.log(filtered);

    packageGrid.innerHTML = "";

    if (filtered.length === 0) {
      packageGrid.innerHTML = `
                    <p class="empty-package">
                        No packages available.
                    </p>
                `;

      return;
    }

    filtered.forEach((pkg) => {
      const card = document.createElement("div");

      card.className = "package-card";

      card.innerHTML = `

            <h3>${pkg.name}</h3>

            <span>Starting from</span>

            <h4>$${pkg.price}</h4>

            <small>
                Rp ${Number(pkg.price_idr).toLocaleString("id-ID")}
            </small>

        `;

      card.addEventListener("click", () => {
        document
          .querySelectorAll(".package-card")
          .forEach((c) => c.classList.remove("active"));

        card.classList.add("active");

        selectedPackage = pkg;

        packageText.textContent = pkg.name;

        deliveryText.textContent = pkg.delivery;

        priceText.textContent = `$${pkg.price} / Rp ${Number(pkg.price_idr).toLocaleString("id-ID")}`;

        updateButton();
      });

      packageGrid.appendChild(card);
    });
  }

 

  continueBtn.addEventListener("click", () => {
    if (continueBtn.disabled) return;

    // Cek honeypot
    if (honeypot.value.trim() !== "") {
      console.warn("Bot detected.");
      return;
    }

    const name = document.getElementById("customerName").value.trim();

    const contact = document.getElementById("customerContact").value.trim();

    const description = document
      .getElementById("projectDescription")
      .value.trim();

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!contact) {
      alert("Please enter your contact.");

      return;
    }

    if (!description) {
      alert("Please enter your project description.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("contact", contact);

    if (!selectedService || !selectedPackage) {
      alert("Please select a service and package.");

      return;
    }

    formData.append("service_id", selectedService.id);

    formData.append("package_id", selectedPackage.id);

    formData.append("service", selectedService.name);

    formData.append("package", selectedPackage.name);

    formData.append("price", selectedPackage.price);

    formData.append("price_idr", selectedPackage.price_idr);

    formData.append("delivery", selectedPackage.delivery);

    formData.append("description", description);
    formData.append("website", honeypot.value);

    fileList.forEach((file) => {
      formData.append("references[]", file);
    });

    continueBtn.disabled = true;
    continueBtn.textContent = "Sending...";

    const xhr = new XMLHttpRequest();

xhr.open("POST", "/api/submit-commission", true);

    progressBar.style.width = "0%";
    progressText.textContent = "0% Uploaded";
    progress.style.display = "block";
    progressText.style.display = "block";

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);

        progressBar.style.width = percent + "%";
        progressText.textContent = percent + "% Uploaded";
      }
    };

    xhr.onload = function () {
      continueBtn.disabled = false;
      continueBtn.textContent = "Continue →";

      let result;

      try {
        result = JSON.parse(xhr.responseText);

        console.log(result);
      } catch (e) {
        console.error(xhr.responseText);

        alert("Server returned an invalid response.");

        return;
      }

      if (result.success) {
        progressBar.style.width = "100%";
        progressText.textContent = "Completed";

        setTimeout(() => {
          modalCommission.textContent = result.commission;

          modalService.textContent = selectedService.name;

          modalPackage.textContent = selectedPackage.name;

          modalPrice.textContent = `$${Number(selectedPackage.price).toLocaleString("en-US")} / Rp ${Number(selectedPackage.price_idr).toLocaleString("id-ID")}`;

          modalDelivery.textContent = selectedPackage.delivery;

          modalContact.textContent = contact;

          successModal.classList.add("show");
        }, 500);
      } else {
        alert(result.message);
      }
    };

    xhr.onerror = function () {
      continueBtn.disabled = false;
      continueBtn.textContent = "Continue →";

      alert("Network Error");
    };

    xhr.send(formData);
  });

  const successModal = document.getElementById("successModal");

  const modalCommission = document.getElementById("modalCommission");

  const modalService = document.getElementById("modalService");

  const modalPackage = document.getElementById("modalPackage");

  const modalPrice = document.getElementById("modalPrice");

  const modalDelivery = document.getElementById("modalDelivery");

  const modalContact = document.getElementById("modalContact");

  const uploadArea = document.getElementById("uploadArea");

  const uploadInput = document.getElementById("referenceUpload");

  const uploadedFiles = document.getElementById("uploadedFiles");

  let fileList = [];

  uploadArea.addEventListener("click", () => {
    uploadInput.click();
  });

  uploadInput.addEventListener("change", (e) => {
    addFiles(e.target.files);
  });

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();

    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();

    uploadArea.classList.remove("dragover");

    addFiles(e.dataTransfer.files);
  });

  const allowedExtensions = ["jpg", "jpeg", "png", "mp3", "wav"];

  function addFiles(files) {
    [...files].forEach((file) => {
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        alert(
          `"${file.name}"

File type is not supported.

Allowed files:

• JPG
• JPEG
• PNG
• MP3
• WAV`,
        );

        return;
      }

      fileList.push(file);
    });

    renderFiles();
  }

  function getFileIcon(file) {
    const ext = file.name.split(".").pop().toLowerCase();

    switch (ext) {
      case "mp3":
      case "wav":
        return "🎵";

      default:
        return "📄";
    }
  }

  function isImage(file) {
    return file.type.startsWith("image/");
  }

  function renderFiles() {
    uploadedFiles.innerHTML = "";

    fileList.forEach((file, index) => {
      const item = document.createElement("div");

      item.className = "upload-item";

      let preview = "";

      if (isImage(file)) {
        const url = URL.createObjectURL(file);

        preview = `
                <img
                    src="${url}"
                    class="upload-preview">
            `;
      } else {
        preview = `
                <div class="upload-icon-file">

                    ${getFileIcon(file)}

                </div>
            `;
      }

      item.innerHTML = `

            <div class="upload-left">

                ${preview}

                <div>

                    <div class="upload-name">

                        ${file.name}

                    </div>

                    <div class="upload-size">

                        ${(file.size / 1024 / 1024).toFixed(2)} MB

                    </div>

                </div>

            </div>

            <span
            class="remove-file"
            data-index="${index}">

            ✕

            </span>

            `;

      uploadedFiles.appendChild(item);
    });
  }

  uploadedFiles.addEventListener("click", (e) => {
    if (!e.target.classList.contains("remove-file")) return;

    const index = e.target.dataset.index;

    fileList.splice(index, 1);

    renderFiles();
  });
});

const closeSuccessModal =
document.getElementById("closeSuccessModal");


if(closeSuccessModal){

    closeSuccessModal.addEventListener("click",()=>{

        window.location.href="index.html";

    });

}
