const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');

const rotaCarros=require('./routes/carros');
const rotaClientes=require('./routes/clientes');
const rotaCores=require('./routes/cores');
const rotaMarcas=require('./routes/marcas');
const rotaMecanicos=require('./routes/mecanicos');
const rotaOrdensServicos=require('./routes/ordensServicos');
const rotaServicos=require('./routes/servicos');
app.use(morgan('dev'));
//aceita dados simples
app.use(bodyParser.urlencoded({extended:false}));
//json de entrada
app.use(bodyParser.json());
app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header(
       'Access-Control-Allow-Header',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
        );
        if(req.method==='OPTIONS'){
            res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
            return res.status(200).send({});
        }
        app.use(cors());
        next();
});




app.use('/carros',rotaCarros);
app.use('/clientes',rotaClientes);
app.use('/cores',rotaCores);
app.use('/marcas',rotaMarcas);
app.use('/mecanicos',rotaMecanicos);
app.use('/ordensServicos',rotaOrdensServicos);
app.use('/servicos',rotaServicos);

//quando nao encontra rota, cai aqui
app.use((req,res,next)=>{
    const erro=new Error('nao encontrado');
    erro.status=404;
    next(erro);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.send({
        erro:{
            mensagem:error.message
        }
    });
});





module.exports=app;