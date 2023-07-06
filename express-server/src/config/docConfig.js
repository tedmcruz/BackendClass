import { __dirname } from "../utils.js";
import swaggerJsdoc from "swagger-jsdoc";
const PORT = 8080;

//creation of definition for swagger documnetation

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentation for app of CodeHouse",
            description:"Api rest for eccommerce",
            version:"1.0.0",
        },
        servers:[{url:`http://localhost:${PORT}`}],//servers to be documented
    },
    apis:[`${__dirname}/docs/**/*.yaml`], //archives that contain documentation. ( ** = folder ) ( * = file )
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);