const {Router} = require('express')
const router = Router()
const Cart = require('../models/cart')
const Purchase = require('../models/purchase')
/***********************GET************************/
router.get('/', (req, res) => {
    res.redirect('../../views/index.html')
})

router.get('/cart', async (req, res) => {

    try{
        let cartProducts = await Cart.find()
        res.json(cartProducts)
    }catch(err){
        console.log(err)
        res.end()
    }
    

})

router.get('/sales', async (req, res) => {
    let products = []
    let total = 0
    try{
        let sales = await Purchase.find()
        if(sales){
            sales.forEach(sale => {
                products.push({
                    id: sale._id,
                    date: sale.date.toLocaleDateString(),
                    products: sale.products.map(product => {
                        total += product.totalPrice
                        return {
                            name: product.name,
                            image: product.image,
                            unitPrice: product.unitPrice,
                            quantity: product.quantity,
                            total: product.totalPrice.toFixed(2)
                        }                        
                    }),
                    totalSale: total.toFixed(2),
                    tax: sale.tax.toFixed(2),
                    totalPurchase: sale.totalPurchase.toFixed(2)
                })
                total = 0
            })
            res.json(products)
        }else{
            res.status(404).json('No se encontaron ventas')
        }
    }catch(err){
        console.log(err)
        res.end()
    }
    
})

/***********************POST***********************/
router.post('/add', async (req, res) => {
    try{
        let checkCart = await Cart.find({name: req.body.name})
        if(checkCart[0]){
            console.log(checkCart[0])
            checkCart[0].quantity = checkCart[0].quantity + parseInt(req.body.quantity)
            checkCart[0].totalPrice = checkCart[0].quantity * req.body.unitPrice
            await checkCart[0].save()
        }else{
            let cart = new Cart()
            cart.name = req.body.name;
            cart.description = req.body.description
            cart.image = req.body.image,
            cart.unitPrice = req.body.unitPrice
            cart.quantity = req.body.quantity
            cart.totalPrice = req.body.totalPrice
            await cart.save()
        }
        res.status(201).json('Producto agregado al carrito')

    }catch(err){
        console.log(err)
        res.end()
    }
       
})

router.post('/purchase', async (req, res) => {
    req.body.date = new Date()
    console.log(req.body)

    let purchase = new Purchase(req.body)
    await purchase.save()
    await Cart.remove({})

    res.status(200).json('Compra completada exitosammente')
})

/*************************PUT**************************/

router.put('/cart', async (req, res) => {

    let product = await Cart.find({name: req.body.name})
    console.log(req.body)
    if(product[0]){
        console.log(product[0])
        let quantity = parseInt(req.body.quantity)
        product[0].quantity = quantity
        product[0].totalPrice = quantity * product[0].unitPrice
        console.log(product[0].totalPrice)
        await product[0].save()
        res.status(201).json('Datos del producto modificados')
    }else{
        res.status(404).json('No se encontro el producto')
    }

})

/***********************DELETE*************************/

router.delete('/cart/:name', async (req, res)=>{
    let product = await Cart.find({name: req.params.name})
    console.log(product)
    if(product[0]){
        await Cart.remove({name: req.params.name})
    }
    res.json({deleted: true})
})

module.exports = router