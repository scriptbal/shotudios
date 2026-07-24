import dotenv from "dotenv";

if(process.env.NODE_ENV !== "production"){
    dotenv.config({
        path:".env.local"
    });
}

console.log(
    "ENV TEST:",
    process.env.DISCORD_WEBHOOK_URL
);

import { IncomingForm } from "formidable";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import path from "path";





export const config = {
    api: {
        bodyParser: false
    }
};

function parseForm(req){

const form = new IncomingForm({

    multiples:true,

    keepExtensions:true,

    uploadDir:"/tmp",

    keepFiles:true,

    maxFileSize:20 * 1024 * 1024

});


form.on("file",(name,file)=>{

    console.log(
        "FORM FILE EVENT:",
        name,
        file.originalFilename
    );

});


form.on("error",(err)=>{

    console.log(
        "FORM ERROR:",
        err.message
    );

});



return new Promise((resolve,reject)=>{

    form.parse(req,(err,fields,files)=>{

        if(err){

            reject(err);

        }else{

            console.log("FILES RESULT:", files);


            resolve({

                fields,

                files

            });

        }

    });

});

}


function generateCommissionNumber() {

    const random = Math.floor(
        Math.random() * 10000000000
    );

    return `CID#${String(random).padStart(10, "0")}`;

}



function validateCommission(fields){

    const getValue = (key)=>{

        const value = fields[key];

        if(Array.isArray(value)){

            return String(value[0]).trim();

        }

        return String(value || "").trim();

    };

    const data = {

        name: getValue("name"),

        contact: getValue("contact"),

        service: getValue("service"),

        package: getValue("package"),

        price: getValue("price"),

        price_idr: getValue("price_idr"),

        delivery: getValue("delivery"),

        description: getValue("description"),

        website: getValue("website")

    };

    if(data.website !== ""){

        throw new Error("Bot detected.");

    }

    if(!data.name){

        throw new Error("Please enter your name.");

    }

    if(!data.contact){

        throw new Error("Please enter your contact.");

    }

    if(!data.service){

        throw new Error("Please select a service.");

    }

    if(!data.package){

        throw new Error("Please select a package.");

    }

    if(!data.description){

        throw new Error("Please enter your project description.");

    }

    return data;

}


function validateFiles(files){

    let uploaded =
        files.references ||
        files["references[]"];


    if(!uploaded){

        return [];

    }


    if(!Array.isArray(uploaded)){

        uploaded = [uploaded];

    }


    return uploaded;

}


function buildDiscordEmbed(
    commissionNumber,
    data,
    uploadedFiles = []
){

    return {

        embeds:[

            {

                title:"📩 New Commission",

                color:5814783,

                description:
`
🆔 **Commission**
${commissionNumber}


👤 **Client**
${data.name}


📱 **Contact**
${data.contact}


🎨 **Service**
${data.service}


📦 **Package**
${data.package}


💰 **Price**
$${data.price} / Rp ${Number(data.price_idr).toLocaleString("id-ID")}


⏳ **Delivery**
${data.delivery}


📝 **Description**
${data.description}


📎 **References**
${
    uploadedFiles.length
    ?
    uploadedFiles.map(
        file=>`• ${file.originalFilename}`
    ).join("\n")
    :
    "• No files uploaded"
}
`,

                footer:{
                    text:"Shotudios Commission System"
                },

                timestamp:
                new Date().toISOString()

            }

        ]

    };

}

console.log(
    "WEBHOOK:",
    process.env.DISCORD_WEBHOOK_URL
);



async function sendDiscord(
    webhook,
    payload,
    files=[]
){

    const form = new FormData();


    form.append(
        "payload_json",
        JSON.stringify(payload)
    );


    for(
        let index = 0;
        index < files.length;
        index++
    ){

        const file = files[index];


        console.log(
            "ATTACHMENT:",
            file.filepath,
            file.originalFilename
        );


        const stream = fs.createReadStream(
            file.filepath
        );


        form.append(

            `files[${index}]`,

            stream,

            {
                filename:file.originalFilename,
                contentType:file.mimetype
            }

        );

    }


    console.log(
        "PAYLOAD:",
        JSON.stringify(payload)
    );


    try {

    await axios.post(
        webhook,
        form,
        {
            headers: form.getHeaders()
        }
    );


    console.log(
        "DISCORD SUCCESS"
    );


}
catch(error){

    console.log(
        "DISCORD ERROR:",
        error.response?.data || error.message
    );


    throw new Error(
        "Discord webhook failed."
    );

}



}


export default async function handler(req,res){

    if(req.method!=="POST"){

        return res.status(405).json({

            success:false,

            message:"Method not allowed"

        });

    }

    try{

        const {
            fields,
            files
        } = await parseForm(req);

        const data = validateCommission(fields);

        const uploadedFiles =
    validateFiles(files);
    
        const commissionNumber =
    generateCommissionNumber();


const discordPayload =
buildDiscordEmbed(

    commissionNumber,

    data,

    uploadedFiles

);


  const webhook =
process.env.DISCORD_WEBHOOK_URL;


if(!webhook){

    throw new Error(
        "Discord webhook is missing."
    );

}


console.log(
    "WEBHOOK:",
    process.env.DISCORD_WEBHOOK_URL
);



console.log(
    "UPLOADED FILES",
    uploadedFiles
);

console.log(
    "SENDING FILE COUNT:",
    uploadedFiles.length
);

await sendDiscord(

    webhook,

    discordPayload,

    uploadedFiles

);


uploadedFiles.forEach(file=>{

    fs.unlink(
        file.filepath,
        err=>{
            if(err){
                console.log(
                    "DELETE FILE ERROR:",
                    err.message
                );
            }
        }
    );

});

    
        console.log(data);


        console.log(files);

return res.status(200).json({

    success:true,

    commission:commissionNumber,

    uploaded:uploadedFiles.map(

        file=>file.originalFilename

    )

});

    }

catch(e){

    console.error(e);

    return res.status(400).json({

        success:false,

        message:e.message

    });

}

}
