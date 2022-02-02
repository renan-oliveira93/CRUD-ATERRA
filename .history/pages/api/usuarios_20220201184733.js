import dbConnect from "../services/db"
import Usuario from "../api/models/Usuario"

dbConnect()

export default async function handler(req, res) {
    const { method } = req

    switch(method) {
        case 'GET':
          try{
            const usuarios = await Usuario.find({})
            res.status(200).json(usuarios)
          }  catch(err){
              console.log(err)
          }
         break;  
    }
}