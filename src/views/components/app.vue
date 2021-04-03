<template>
    <div class="container">
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <router-link class="navbar-brand" to="/">Principal</router-link>                   
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/cart">Ver carrito</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/sales">Historial de ventas</router-link>   
                            </li>
                        </ul>                                         
                    </div>
                </div>                 
            </nav>
        </div>     
        <h1 class="text-center">Mi tienda online</h1>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
    }
</script>