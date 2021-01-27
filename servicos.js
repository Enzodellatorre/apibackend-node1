const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;

router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM SERVICO',
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
            'INSERT INTO SERVICO(descServico) VALUES(?)',[req.body.descServico],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'servico inserido com sucesso',
                  id_Servico: resultado.insertId
                });
            }
        )
    });
});
//Retorna um periodo especifico
router.get('/:idServico',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM SERVICO WHERE IDSERVICO=?;',[req.params.idServico],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });  
    
});
router.patch('/:idServico',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE SERVICO
            SET DESCSERVICO = ?
            WHERE IDSERVICO = ?`
            [req.body.descServico,req.body.idServico],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'servico alterado com sucesso'
                
                });
            }
        )
    });
});
//deletar periodo
router.delete('/:idServico',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM PERIODO WHERE IDSERVICO = ?`,[req.body.idServico],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'servico removido com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;