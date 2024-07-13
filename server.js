const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Product=require('./models/productmodel.js')
const jQuery = require('jquery')

app.use(express.json())

//routes
app.get('/',(req, res)=>{
    res.send('Hello node API')
})

app.get('/blog', (req, res)=>{
    res.send('Hello blog my name is mohammed aariz')
})

app.post('/product', async(req, res)=>{
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

app.get('/products/:name', async(req,res)=>{
    try {
        const name=req.params;
        const products=await Product.find(name);
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

app.get('/products', async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//update the product
app.put('/products/:id', async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updateProduct= await Product.findById(id);
        res.status(200).json(updateProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
//delete a product
app.delete('/products/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find the product with id ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
mongoose.connect('mongodb://localhost:27017/Product')
.then(()=>{
    console.log("database connected")
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000')
    })
}).catch((error)=>{
    console.log(error)
})