const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;

router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM ORDEMSERVICO',
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
            'INSERT INTO ORDEMSERVICO(idServico,idCarro,idCliente,idMecanico,valorOrdem) VALUES(?)',
            [
                req.body.idServico,
                req.body.idCarro,
                req.body.idCliente,
                req.body.idMecanico,
                req.body.valorOrdem
            ],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'ordem de servico inserida com sucesso',
                  id_Ordem: resultado.insertId
                });
            }
        )
    });
});
//Retorna um periodo especifico
router.get('/:idOrdem',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM ORDEMSERVICO WHERE IDORDEM=?;', [req.params.idOrdem],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });  
    
});
router.patch('/:idOrdem',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE ORDEMSERVICO
            SET IDSERVICO = ?
            SET IDCARRO=    ?
            SET IDCLIENTE=  ?
            SET IDMECANICO= ?
            SET VALORORDEM= ?
            WHERE IDORDEM = ?`
            [ req.body.idServico,
                req.body.idCarro,
                req.body.idCliente,
                req.body.idMecanico,
                req.body.valorOrdem,
                req.body.idOrdem
            ],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'ordem de servico alterada com sucesso'
                
                });
            }
        )
    });
});
//deletar periodo
router.delete('/:idOrdem',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM ORDEMSERVICO WHERE IDORDEM = ?`,[req.body.idOrdem],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'ordem de servico removida com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;