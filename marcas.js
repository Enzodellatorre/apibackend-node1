const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;

router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM MARCA',
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
            'INSERT INTO MARCA(nomeMarca) VALUES(?)',[req.body.nomeMarca],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'marca inserida com sucesso',
                  id_Marca: resultado.insertId
                });
            }
        )
    });
});
//Retorna um periodo especifico
router.get('/:idMarca',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM PERIODO WHERE IDMARCA=?;',[req.params.idMarca],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });  
    
});
router.patch('/:idMarca',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE MARCA
            SET NOMEMARCA = ?
            WHERE IDMARCA = ?`
            [req.body.nomeMarca,req.body.idMarca],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'marca alterada com sucesso'
                
                });
            }
        )
    });
});
//deletar periodo
router.delete('/:idMarca',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM PERIODO WHERE IDMARCA = ?`,[req.body.idMarca],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'marca removida com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;