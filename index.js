const express = require("express");
const mercadoPago = require("mercadopago");
const app = express();

//config mp

mercadoPago.configure({
  sandbox:true,
  access_token:"TEST-1618171902387131-122812-16070d22583fcc9a70e1ba0a797a8bb1-373169884"
});

app.get("/pagar",async (req,res) =>{

 const id = "" + Date.now();
 const email = "lauricio@gmail.com"

  let dados = {
    items:[
      item = {
        id: id,
        description:"pagamento teste",
        quantity:1,
        currency_id:'BRL',
        unit_price:parseFloat(180)
      }
    ],
    payer:{
      email:email
    },
    external_reference:id,
  }
  
  try{
    let pagamento = await mercadoPago.preferences.create(dados)
    console.log(pagamento);
  
  return res.redirect(pagamento.body.init_point);
  }catch(erro){
  console.log(erro);
  }



})



app.listen(3000,(erro) =>{
  if(erro){
console.log(erro)
  }else{
       console.log("servidor iniciado com sucesso!")
  }
})