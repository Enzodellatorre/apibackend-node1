const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;

router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM CLIENTE',
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
            'INSERT INTO CLIENTE(nomeCliente,telefone) VALUES(?)',
            [req.body.nomeCliente,req.body.telefone],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'cliente inserido com sucesso',
                  id_Cliente: resultado.insertId
                });
            }
        )
    });
});
//Retorna um periodo especifico
router.get('/:idCliente',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM CLIENTE WHERE IDCLIENTE=?;',[req.params.idCliente],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });  
    
});
router.patch('/:idCliente',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE CLIENTE
            SET NOMECLIENTE = ?
            SET TELEFONE = ?
            WHERE IDCLIENTE = ?`
            [req.body.nomeCliente,req.body.telefone, req.body.idCliente],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'cliente alterado com sucesso'
                
                });
            }
        )
    });
});
//deletar periodo
router.delete('/:idCliente',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM PERIODO WHERE IDCLIENTE = ?`,[req.body.idCliente],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'cliente removido com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;