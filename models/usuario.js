const {Schema,model} = require('mongoose');

const UsuarioSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  }
});

//esto permite que no se retorne el password ni el campo __v generado automaticamente por mongoose (solo a nivel visual )
UsuarioSchema.method('toJSON',function(){
  const {password,__v, ...object} = this.toObject();
  return object;
})

module.exports = model('Usuario',UsuarioSchema)