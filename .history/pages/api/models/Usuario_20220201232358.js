import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    name: String,
    email: String,
    telefone: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema)
export default Usuario;