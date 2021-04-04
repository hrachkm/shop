<template>
    <div class="container"> 
        <h3 class="text-center">Ventas realizadas</h3>
        <div v-for="sale in sales" :key="sale.id" class="card text-center mb-2 mt-1">
            <div class="card-header">
                Venta: {{sale.date}}
            </div>
            <div class="card-body">
                <h5 class="card-title">Productos</h5>
                <div class="table-responsive">
                    <table class="table">
                        <tbody>
                            <tr v-for="product in sale.products" :key="product.name">
                                <td><img height="50" width:="50" :src="'statics/imgs/'+product.image" :alt="product.name"></td>
                                <td>{{product.name}}</td>
                                <td>{{product.unitPrice}} $</td>
                                <td>{{product.quantity}}</td>
                                <td>{{product.total}} $</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer">
                <table class="table table-borderless">
                    <tr>
                        <td>Subtotal:</td>
                        <td>{{sale.totalSale}} $</td>
                    </tr>
                    <tr>
                        <td>Impuesto:</td>
                        <td>{{sale.tax}} $</td>
                    </tr>
                    <tr>
                        <td>Total compra:</td>
                        <td>{{sale.totalPurchase}} $</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sales: ''
            }
        },
        methods: {
            async getSales(){
                let info = await fetch('http://localhost:3200/sales')
                if(info){
                    this.sales = await info.json()
                }
                console.log(this.sales)
            }
        },
        mounted(){
            this.getSales()
        }
    }
</script>