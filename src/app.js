import express from 'express'
import userRouter from './routes/user.router.js'

const app = express()

app.listen(8080, ()=>console.log('running on 8080 port'))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('HOLA MUNDO')
})
app.use('/api/users', userRouter)