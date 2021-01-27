const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;

router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM CARRO',
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });
});
//adiciona um pedido
router.post('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'INSERT INTO CARRO(nomeCarro,idMarca,idCor,idCliente) VALUES(?)',
            [
                req.body.nomeCarro,
                req.body.idMarca,
                req.body.idCor,
                req.body.idCliente
            ],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'carro inserida com sucesso',
                  id_Ordem: resultado.insertId
                });
            }
        )
    });
});
//Retorna um periodo especifico
router.get('/:idCarro',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM CARRO WHERE IDCARRO=?;', [req.params.idCarro],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });  
    
});
router.patch('/:idCarro',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE CARRO
            SET NOMECARRO = ?
            SET IDMARCA=    ?
            SET IDCOR=  ?
            SET IDCLIENTE= ?
            WHERE IDCARRO = ?`
            [
                req.body.nomeCarro,
                req.body.idMarca,
                req.body.idCor,
                req.body.idCliente,
                req.body.idCarro
            ],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'carro alterado com sucesso'
                
                });
            }
        )
    });
});
//deletar periodo
router.delete('/:idCarro',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM CARRO WHERE IDCARRO = ?`,[req.body.idCarro],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'carro removido com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;