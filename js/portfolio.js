const grid = document.getElementById("portfolioGrid");

let portfolioItems = [];

fetch("../assets/portfolio/portfolio.json")
    .then(response => {

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return response.json();

    })

    .then(data => {

        portfolioItems = data;

        renderPortfolio(portfolioItems);

    })

    .catch(error => {

        console.error("Portfolio Error:", error);

    });





function renderPortfolio(items){

    grid.innerHTML = "";

    items.forEach(item=>{

        grid.insertAdjacentHTML(

            "beforeend",

            createCard(item)

        );

    });

}





function createCard(item){

    const classes = [

        "portfolio-card",

        item.size

    ].join(" ");




    const playButton =

        item.type === "video"

        ?

        `<button class="play-button ${item.size==="featured" ? "" : "small"}">

            ▶

        </button>`

        :

        "";




    const badge =

        item.size==="featured"

        ?

        `<span class="portfolio-badge">

            FEATURED

        </span>`

        :

        "";




    const mediaIcon =

        item.type==="video"

        ?

        `<div class="card-type">

            ▶

        </div>`

        :

        `<div class="card-type">

            🖼

        </div>`;



    return `

<a 
    href="${item.url}" 
    target="_blank"
    rel="noopener noreferrer"
    class="${classes}">

    <img

    src="${item.thumbnail}"

    alt="${item.title}">


    <div class="portfolio-overlay">

        ${mediaIcon}

        ${badge}

        ${playButton}


        <div class="portfolio-info">

            <h3>

                ${item.title}

            </h3>


            <p>

                ${item.category}

            </p>

        </div>

    </div>


</a>

`;

}