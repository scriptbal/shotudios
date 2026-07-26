/* =====================================
   PAGE CIRCLE TRANSITION
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


    const transition = document.createElement("div");

    transition.className = "page-transition";

    document.body.appendChild(transition);



    /*
        PAGE ENTER
    */

    requestAnimationFrame(()=>{

        transition.classList.add("leave");

    });


    setTimeout(()=>{

        transition.classList.remove("leave");

    },900);




    /*
        LINK HANDLER
    */

    document.querySelectorAll("a[href]").forEach(link=>{


        const url = link.getAttribute("href");


        if(
            url.startsWith("#") ||
            url.startsWith("http") ||
            url.startsWith("mailto")
        ){
            return;
        }



        link.addEventListener(
            "click",
            e=>{


                e.preventDefault();


                const target = url;



                document.body.classList.add(
                    "page-exit"
                );


                transition.classList.add(
                    "active"
                );



                setTimeout(()=>{


                    window.location.href = target;


                },850);



            }
        );


    });


});