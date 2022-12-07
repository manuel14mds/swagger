import express from 'express'
import userRouter from './routes/user.router.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

import __dirname from './utils.js'

const app = express()
const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:"Api swagger",
            description:"Desafio swagger"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions)

app.listen(8080, ()=>console.log('running on 8080 port'))
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Route to see swaggerUi: /api/docs')
})
app.use('/api/docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
app.use('/api/users', userRouter)