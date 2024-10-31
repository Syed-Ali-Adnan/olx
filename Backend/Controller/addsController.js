const { response } = require("express");
const Adds = require("../models/addsModel");
const { uploadImage } = require("../storage");


const createAdds = (req,res) =>{
 const body = req.body;
 console.log("body=",body);


uploadImage(req.file)
.then((result)=>{
    const newAdd = new Adds({
        productName : body.productName,
        productPrice : body.productPrice,
        category : body.category,
        description : body.description,
        image : result.url,
        author : body.authorId,
     });
     newAdd
     .save()
     .then((response) => {
        if(response){
            res.send({
                message : "Add created successfully",
                add : response
            })
        }else{
            res.status(400).send({
                message : "Add not created, Something went wrong",
                add : null
            })
        }
     })
     .catch((err)=>{
        res.status(400).send({
            message : err?.message,
            error: err
        })
     });
})
.catch((err)=>{
    console.log("err =>", err);
    res.status(400).send({
      message: err?.message,
      error: err,
    });
})
};

const allAdds = (req,res)=>{
    Adds.find()
    .populate("author")
    .then((allAdds) => {
        res.send(allAdds);
    })
    .catch((err) => {
        res.status(400).send({
            message: err.message,
            error:err
        })
    })
}

const updateAdds =(req,res)=>{
    const body =req.body;

    if(req.file){
        uploadImage(req.file)
        .then((result)=>{
            console.log("🚀 ~ .then ~ result:", result);
            Adds.findByIdAndUpdate(body.id,{
                productName : body.productName,
                productPrice : body.productPrice,
                category : body.category,
                description : body.description,
                image : body.image,
            })
            .then((response) => {
                if(response){
                    res.send({
                        message : "Add updated successfully",
                        add : body
                    })
                }else{
                    res.status(400).send({
                        message : "Add not updated, Something went wrong",
                        add : null
                    })
                }
             })
             .catch((err)=>{
                res.status(400).send({
                    message : err?.message,
                    error: err
                })
             });
        })
        .catch((err)=>{
         console.log("err =>", err);
         res.status(400).send({
          message: err?.message,
          error: err,
        });
        })
    }else{
        Adds.findByIdAndUpdate(body.id,{
            productName : body.productName,
            productPrice : body.productPrice,
            category : body.category,
            description : body.description,
            image : body.image,
        })
        .then((response) => {
            if(response){
                res.send({
                    message : "Add updated successfully",
                    add : body
                })
            }else{
                res.status(400).send({
                    message : "Add not updated, Something went wrong",
                    add : null
                })
            }
         })
         .catch((err)=>{
            res.status(400).send({
                message : err?.message,
                error: err
            })
         });
    }
}


const deleteAdds = (req,res)=>{
    const addId = req.params.addId;
    Adds.findOneAndDelete(addId)
    .then((response)=>{
        if(response){
            res.send({
                message:"Add delete successfully"
            })
        }else{
            res.status(400).send({
                message : "Add not found, Something went wrong"
            })
        }
    })
    .catch((err)=>{
        res.status(400).send({
            message : err?.message,
            error: err,
        })
    })
}

const getAddsById = (req, res) => {
    const addId = req.params.addId;
  
    Adds.findById(addId)
      .then((add) => {
        if (add) {
          res.send({ add });
        } else {
          res.status(400).send({ message: "Add not found" });
        }
      })
      .catch((err) => {
        res.status(400).send({
          message: err?.message,
          error: err,
        });
      });
  };
 
  const getAddByAuthorId = (req, res) => {
    const authorId = req.params.authorId;
 console.log("author id:", authorId);

 
    Adds.find({ author: authorId })
      .populate("author")
      .then((add) => {
        console.log("add:",add)
        if (add) {
          res.send({ add });
        } else {
          res.status(400).send({ message: "Add not found" });
        }
      })
      .catch((err) => {
        res.status(400).send({
          message: err?.message,
          error: err,
        });
      });
  };

    const searchAdd=(req,res)=>{
            const { productName, category } = req.query; //req.body
          
            const filter = {};
          
            // Set search conditions if they exist
            if (productName) {
              filter.productName = new RegExp(productName, 'i'); // Case-insensitive search
            }
            if (category) {
              filter.category = category;
            }
          
            // Find ads that match the filter
            Adds.find(filter)
              .then((add) => {
                res.json(add);
              })
              .catch((error) => {
                res.status(500).json({ error: 'Failed to search ads' });
              });
          
    }
module.exports={createAdds,deleteAdds,updateAdds,allAdds,getAddsById,getAddByAuthorId,searchAdd};