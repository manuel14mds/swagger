import express from 'express'

const app = express()

app.listen(8080, ()=>console.log('running on 8080 port'))

app.get('/',(req,res)=>{
    res.send('HOLA MUNDO')
})