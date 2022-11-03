 const {Schema,model} = require('mongoose');

 const HeroesSchema = Schema({
    
superhero :{
    type:String,
    required:true,
    unique:true
},

publisher:{
 type:String,
 required:true,
},

alter_ego:{
  type:String,
 required:true,
},

first_appearance:{
 type:String,
 required:true,
},

characters : {
 type:String,
 required:true,    
},

imageId:{
type:String
}

 },{collection :'Heroe'});


 HeroesSchema.method('toJSON', function(){
    const {_v,...object} = this.toObject();

    return object;
 })

 module.exports = model('Heroe',HeroesSchema)
