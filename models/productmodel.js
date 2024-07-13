const mongoose=require('mongoose')

const productSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "please enter a product name"]
        },
        email:{
            type:String,
            required:true
        },
        place:{
            type:String,
            required:true
        }
    }
)

const Product=mongoose.model('Product', productSchema);
module.exports=Product;