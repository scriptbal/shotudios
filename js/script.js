/* ===========================================
   Navbar Scroll
=========================================== */

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.classList.add("scroll");

        } else {

            header.classList.remove("scroll");

        }

    });

}


/* ===========================================
   Mouse Parallax Video
=========================================== */

// const video = document.querySelector(".video-glass");

// if (video) {

//     window.addEventListener("mousemove", (e) => {

//         const x =
//             (window.innerWidth / 2 - e.clientX) / 60;

//         const y =
//             (window.innerHeight / 2 - e.clientY) / 60;

//         video.style.transform = `
//             rotateY(${-x}deg)
//             rotateX(${y}deg)
//             translateY(-6px)
//         `;

//     });

//     window.addEventListener("mouseleave", () => {

//         video.style.transform = "";

//     });

// }

/* ===========================================
   Reveal Animation
=========================================== */

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

})

},

{

threshold:.2

}

);

document.querySelectorAll(

".feature-card,.cta-card,.hero-left,.hero-right"

).forEach(el=>{

observer.observe(el);

});




// =======================================
// TESTIMONIAL SLIDER
// =======================================
const texts = document.querySelectorAll(".testimonial-text");
const dots = document.querySelectorAll(".testimonial-dots .dot");

if (texts.length && dots.length) {

    let index = 0;

    function showTestimonial(i) {

        texts.forEach(t => t.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        texts[i].classList.add("active");
        dots[i].classList.add("active");

    }

    dots.forEach((dot, i) => {

        dot.addEventListener("click", () => {

            index = i;

            showTestimonial(index);

        });

    });

    setInterval(() => {

        index = (index + 1) % texts.length;

        showTestimonial(index);

    }, 5000);

}





/* ===================================
   SMOOTH SCROLL
=================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;


        const header =
            document.querySelector("header");


        const offset =
            header
            ? header.offsetHeight + 40
            : 40;


        const startPosition =
            window.pageYOffset;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;


        const distance =
            targetPosition - startPosition;


        const duration = 800;


        let startTime = null;


        function easeInOutCubic(t){

            return t < 0.5
            ? 4 * t * t * t
            : 1 -
            Math.pow(-2 * t + 2,3) / 2;

        }



        function animation(currentTime){


            if(!startTime){

                startTime=currentTime;

            }


            const elapsed =
                currentTime-startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            window.scrollTo(

                0,

                startPosition +
                distance *
                easeInOutCubic(progress)

            );


            if(progress < 1){

                requestAnimationFrame(
                    animation
                );

            }

        }


        requestAnimationFrame(
            animation
        );


    });

});


/* ===================================
BACK TO TOP
=================================== */
const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", (e) => {

        e.preventDefault();

        const start = window.pageYOffset;

        const duration = 1400;

        let startTime = null;

        function ease(t) {

            return 1 - Math.pow(1 - t, 4);

        }

        function animation(currentTime) {

            if (!startTime) {

                startTime = currentTime;

            }

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(
                0,
                start * (1 - ease(progress))
            );

            if (progress < 1) {

                requestAnimationFrame(animation);

            }

        }

        requestAnimationFrame(animation);

    });

}