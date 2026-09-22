function retirarDinero(saldo, retirar) {
    if(saldo>=retirar){
        console.log("Retiro exitoso. Saldo restante: " + (saldo-retirar))
    }else{
        console.log("Saldo insuficiente")
    }
    
}