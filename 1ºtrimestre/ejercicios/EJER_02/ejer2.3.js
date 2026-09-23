function retirarDinero(saldo, retirar, tieneTrjetaCredito) {
    if(saldo>=retirar){
        console.log("Retiro exitoso. Saldo restante: " + (saldo-retirar))
    }else if (saldo<retirar && tieneTrjetaCredito==true) {
        console.log("Saldo insuficiente, pagando con tarjeta de crédito.")
    } else{
           console.log("Saldo insuficiente")
        }
}

retirarDinero(20,500, true)