<template>
    <div class="container">
        <h3 class="text-center">Mi carrito</h3>
        <div class="table-responsive">
            <div v-if="isProducts">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Descripción</th>
                            <th class="text-center">Cantidad</th>
                            <th class="text-center">Precio unitario</th>
                            <th class="text-center">Total</th>
                            <th colspan="2" class="text-center">Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.name">
                            <td class="text-center">{{product.name}}</td>
                            <td class="text-center">{{product.description}}</td>
                            <td class="text-center">
                                <label v-if="!product.modify">{{product.quantity}}</label>
                                <input v-else type="number" size="1" v-model="product.quantity">
                            </td>                        
                            <td class="text-center">{{product.unitPrice}} $</td>
                            <td class="text-center">{{(product.unitPrice * product.quantity).toFixed(2)}} $</td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm" v-if="!product.modify" @click="product.modify=true">Modificar</button>
                                <button class="btn btn-success btn-sm" v-else @click="modify(product)">Aceptar</button>
                            </td>
                            <td class="text-center"><button class="btn btn-danger btn-sm"  @click="deleteFromCart(product.name)">Eliminar</button></td>                        
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5">Subtotal</td>
                            <td colspan="2">{{totalSale.toFixed(2)}} $</td>
                        </tr>
                        <tr>
                            <td colspan="5">Impuesto</td>
                            <td colspan="2">{{tax.toFixed(2)}} $</td>
                        </tr>
                        <tr>
                            <td colspan="5">Total a pagar</td>
                            <td colspan="2">{{total.toFixed(2)}} $</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div v-else>
                <table class="table">
                    <tr><td class="text-center">No hay productos en el carrito</td></tr>
                </table>
            </div>
            
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button" @click="purchase()">Pagar</button>            
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                products: [],
                totalSale: 0,
                tax: 0,
                total: 0,
                change: false
            }
        },
        computed: {
            isProducts(){
                return this.products.length
            }
        },
        methods: {
            async getProducts(){
                let products = await fetch('http://localhost:3200/cart')
                this.products = await products.json()
                if(this.totalSale > 0){
                    this.totalSale = 0
                }
                for(let item in this.products){                                        
                    this.totalSale += parseFloat(this.products[item].totalPrice)
                }
                console.log(this.totalSale)
                this.tax = (this.totalSale * 0.12)
                this.total = (this.totalSale + this.tax)
            },
            async deleteFromCart(name){
                console.log(name)
                let quit = await fetch(`http://localhost:3200/cart/${name}`,{
                    method: 'DELETE',
                })
                if((await quit.json()).deleted){
                    alert('Producto eliminado')                    
                    this.getProducts()
                }
            },
            async modify(product){
                product.modify = false
                let update = await fetch('http://localhost:3200/cart',{
                    method: 'PUT',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        name: product.name,
                        quantity: product.quantity,
                    })
                })
                alert(await update.json())
                await this.getProducts()
                
            },
            async purchase(){

                let purchase = await fetch('http://localhost:3200/purchase', {
                    method: 'POST',
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify({
                        products: this.products,
                        sub: this.totalSale,
                        tax: this.tax,
                        totalPurchase: this.total
                    })
                })
                await this.getProducts()
            }
        },
        beforeMount(){
            this.getProducts()
        }
    }
</script>