import {Router} from 'express'

const router = Router()
let data = []
//get all users
router.get('/', (req,res)=>{
    try {
        const users = data
        res.send({status:'success',payload:users})
    } catch (error) {
        return res.status(500).send({status:'server error',error:error})
    }
})

//get user by id
router.get('/:id', validateId, (req,res)=>{
    try {
        const user = data.filter((e)=>e.id===req.params.id)
        res.send({status:'success',payload:user})
    } catch (error) {
        return res.status(500).send({status:'server error',error:error})
    }
})

//get add user
router.post('/', (req,res)=>{
    try {
        if(!req.body.name|| !req.body.email){
            return res.status(400).send({status:'bad request',message:'fields name and email at least required'})
        }
        if(data.length===0){
            req.body.id = 1
        }else{
            req.body.id = data[data.length - 1].id + 1
        }
        data.push(req.body)
        res.send({status:'success',messagge:'user added success', payload:req.body})
    } catch (error) {
        return res.status(500).send({status:'server error',error:error})
    }
})

// update user
router.put('/:id', validateId,(req,res)=>{
    try {
        let user = data.find((e)=>e.id===req.params.id)
        if(!req.body){
            return res.status(400).send({status:'bad request',error:'update fields required'})
        }else{
            if(req.body.id) delete req.body.id
            
            for (const key in req.body) {
                user[key] = req.body[key]
            }

            const newdata =[]
            for (const item of data) {
                if(item.id == user.id){
                    newdata.push(user)
                }else{
                    newdata.push(item)
                }
            }
            data = newdata
        
            res.send({status:'success',messagge:'user update success',payload:user})
        }
    } catch (error) {
        return res.status(500).send({status:'server error',error:error})
    }
})

//delete user
router.delete('/:id', validateId, (req,res)=>{
    try {
        const newData = data.filter(element=>element.id != req.params.id)
        data = newData
        res.send({status:'success',messagge:'user deleted success'})
    } catch (error) {
        return res.status(500).send({status:'server error',error:error})
    }
})

function validateId(req,res,next){
    try {
        if(!req.params.id){
            return res.status(400).send({status:'bad request',error:'id by params required'})
        }else{
            req.params.id = parseInt(req.params.id)
            const user = data.find((e)=>e.id==req.params.id)
            if(!user){
                return res.status(404).send({status:'not found',error:'user not found'})
            }
        }
    } catch (error) {
        return res.status(500).send({status:'server error',error:error})
    }
    next()
}


export default router