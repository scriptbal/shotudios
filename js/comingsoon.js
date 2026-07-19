const testimonials =
document.querySelectorAll(".testimonial-text");

const dots =
document.querySelectorAll(".dot");


let current = 0;


function showTestimonial(index){

    testimonials.forEach(item=>{
        item.classList.remove("active");
    });


    dots.forEach(dot=>{
        dot.classList.remove("active");
    });



    testimonials[index]
    .classList.add("active");


    dots[index]
    .classList.add("active");

}



dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        current=index;

        showTestimonial(current);

    });

});



setInterval(()=>{

    current++;

    if(current >= testimonials.length){

        current=0;

    }


    showTestimonial(current);


},5000);