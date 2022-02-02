import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    name: String,
    email: String,
    telefone: Number,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

export default Usuario;