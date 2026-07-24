/* ==========================================
   CONTACT MODAL
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    try {

        // Load reusable modal
        const response = await fetch("/components/contact-modal.html");

        if (!response.ok) {
            throw new Error("Failed to load contact-modal.html");
        }

        const html = await response.text();

        // Masukkan modal ke body
        document.body.insertAdjacentHTML("beforeend", html);

        // Aktifkan modal
        initializeContactModal();

    } catch (error) {

        console.error("Contact Modal:", error);

    }

});


/* ==========================================
   INITIALIZE
========================================== */

function initializeContactModal() {

    const modal = document.getElementById("contactModal");

    if (!modal) return;

    const modalBox = modal.querySelector(".contact-box");
    const overlay = modal.querySelector(".contact-overlay");
    const closeButton = modal.querySelector("#closeContactModal");

    const openButtons = document.querySelectorAll("[data-contact-modal]");


    function openModal() {

        modal.classList.add("active");

        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

    }


    function closeModal() {

        modal.classList.remove("active");

        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

    }


    /* ==========================
       OPEN
    ========================== */

    openButtons.forEach(button => {

        button.addEventListener("click", function (e) {

            e.preventDefault();

            openModal();

        });

    });


    /* ==========================
       CLOSE
    ========================== */

    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", closeModal);


    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && modal.classList.contains("active")) {

            closeModal();

        }

    });


    /* ==========================
       SCROLL LOCK
    ========================== */

    modal.addEventListener("wheel", function (e) {

        if (!modal.classList.contains("active")) return;

        e.preventDefault();

        modalBox.scrollTop += e.deltaY;

    }, {
        passive: false
    });

}