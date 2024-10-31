const express = require('express');
const { allAdds, createAdds, deleteAdds, updateAdds,getAddsById,getAddByAuthorId,searchAdd} =require('../Controller/addsController');
const upload = require("../multer-config.js");

const router = express.Router();

router.post("/create-adds", upload.single("image"),createAdds);
router.get("/all-adds",allAdds);
router.delete("/delete-adds/:blogId",deleteAdds);
router.put("/update-adds", upload.single("image"),updateAdds) 
router.get("/get-add/:addId", getAddsById);
router.get("/get-my-add/:authorId", getAddByAuthorId);
router.get("/search-add",searchAdd)

module.exports = router;
