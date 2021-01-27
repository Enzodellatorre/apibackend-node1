const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;

router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM COR',
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
            'INSERT INTO COR(descCor) VALUES(?)',[req.body.descCor],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'cor inserida com sucesso',
                  id_Cor: resultado.insertId
                });
            }
        )
    });
});
//Retorna um periodo especifico
router.get('/:idCor',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM COR WHERE IDCOR=?;', [req.params.idCor],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });  
    
});
router.patch('/:idCor',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE COR
            SET DESCCOR = ?
            WHERE IDCOR = ?`
            [ req.body.descCor,req.body.idCor],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'cor alterada com sucesso'
                
                });
            }
        )
    });
});
//deletar periodo
router.delete('/:idCor',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM PERIODO WHERE IDCOR = ?`,[req.body.idCor],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'cor removida com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;