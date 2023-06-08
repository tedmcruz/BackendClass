// import winston, { format } from "winston";
import winston from "winston";

const codingEnvironment = "produccion" // Use "desarrollo" for a development environment and "produccion" for a production environment.

const customLevelsOptions ={
    levels : {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors : {
        fatal:"red",
        error:"magenta",
        warning:"yellow",
        info:"blue",
        http:"green",
        debug:"white",
    }
}

const loggerEnvironment = () =>{

    if (codingEnvironment==="desarrollo"){
        return winston.createLogger({
            levels:customLevelsOptions.levels,
            transports: [
                new winston.transports.Console({
                    level:"debug",
                    format: winston.format.combine(
                        winston.format.colorize({colors:customLevelsOptions.colors}),
                        winston.format.simple(),
                    )
                }),
            ]
        })
    }

    if (codingEnvironment==="produccion"){
        return winston.createLogger({
            levels:customLevelsOptions.levels,
            transports: [
                new winston.transports.File({
                    filename:"./errors.log",
                    level:"info",
                    format: winston.format.simple(),
                })
            ]
        })
    }

}

const logger = loggerEnvironment();

export const addLogger = (req,res,next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}