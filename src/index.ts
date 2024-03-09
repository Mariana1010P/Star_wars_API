import express from 'express'
import "dotenv/config"
import dbConnect from './config/config'
import { routerCharacter } from './frontController/FrontController'
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

const app = express()
app.use(express())

const path = require('path')


const swaaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Star Wars API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./frontController/FrontController.ts")}`]
}

app.use(express.json())
app.use("/api", routerCharacter)
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaaggerSpec)))

const PORT = process.env.PORT || 3000


app.listen(PORT, () =>{
    console.log('[Server running on PORT]:', PORT)
})

dbConnect().then(() => {
    console.log("[MONGODB is running]");    
}, (err: any) => {
    console.log("Error conectando la BD:",err);
    
})

