import dbConnect from "../services/db"
import Usuario from "../api/models/Usuario"

dbConnect()

export default async function handler(req, res) {
    const { method } = req

    switch(method) {
        case 'GET':
            try{
                const usuarios = await Usuario.find({})
                res.status(200).json({success: true, data: usuarios})
          }  catch(err){
                console.log(err)
                res.status(500).json({success: false, err})
          }
         break;
        
        case 'POST':
            try{
                const {name, email, telefone} = req.body

                if (!name && !email && !telefone) throw 'invalid data'
                const usuario = await Usuario.create({name, email, telefone}) 
                
                res.status(201).json({success: true, data: usuario})
            } catch(err) {
                console.log(err)
                res.status(500).json({success: false, err})
            }
        break;
    }
}