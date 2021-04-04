<template>
    <div class="container">
        <div class="row">
            <h1 class="text-center">Productos disponbles</h1>
        </div>
        <div class="row">
            <div class="card-group">
                <div v-for="product in products" :key="product.name" class="card">
                    <img :src="'/src/views/statics/imgs/'+ product.image" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-center">{{product.name}}</h5>
                        <p class="card-text">{{product.description}}</p>
                        <p class="card-text">Price: {{product.unitPrice}} $</p>
                        <p class="card-text">Quantity: <input @input="product.quantity = $event.target.value" size="1"></p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-sm btn-primary" @click="addToCart(product)">Agregar al carrito</button>
                    </div>
                </div>              
            </div>
        </div>    
    </div>
</template>
<script>
    export default {
        data() {
            return {
                products: [
                    {
                        name: 'Manzana',
                        description: 'Manzana roja',
                        image: 'apple.jpg',
                        unitPrice: 0.4
                    },
                    {
                        name: 'Cerveza',
                        description: 'Cerveza de lata',
                        image: 'beer.png',
                        unitPrice: 1.5
                    },
                    {
                        name:'Agua',
                        description: 'Botella de agua de un litro',
                        image: 'water.jpg',
                        unitPrice: 1
                    },
                    {
                        name: 'Queso',
                        description: 'Queso duro por kilo',
                        image: 'cheese.jpg',
                        unitPrice: 1.25
                    }
                ],
                currentDate: new Date()
            }
        },
        methods: {
            async addToCart(product){
                if(confirm('¿Desea agregar este producto al carrito?')){
                    product.totalPrice = product.quantity * product.unitPrice
                    product.dateOrder = this.currentDate.toLocaleDateString()
                    let add = await fetch('http://localhost:3200/add', {
                        method: 'POST',
                        headers:{'content-type': 'application/json'},
                        body: JSON.stringify(product)
                    })
                    if(add){
                        alert(await add.json())
                    }
                }                
            },
        },
        async mounted() {

            window.addEventListener('keypress', (e) => {
                let key = window.event ? e.which : e.keyCode
                if(key < 48 || key > 57){
                    e.preventDefault();                    
                }else{
                    this.productQuantity = key
                }
            })
        },
    }
</script>