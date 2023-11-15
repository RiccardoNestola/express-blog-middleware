const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const multer = require("multer");


// index
router.get("/", postsController.index);

// create
router.get("/create", postsController.create);

// show
router.get("/:slug", postsController.show);

//upload single image
router.post("/", multer({ dest: "public/imgs/posts" }).single("image"), postsController.store);

// download
router.get('/:slug/download', postsController.download);

/* 
router.post('/', postsController.store); */

// send data
/* router.post("/", multer({ dest: "public/imgs/posts" }).single("image"), postsController.store);
 */

// esegue il download dell'immagine di una pizza
/* router.get("/:id/download-img", postsController.downloadImage) */

// router.get("/:id/download-attachment/:fileFolder/:fileName", pizzeController.downloadAttachment)
/* router.get("/:id/download-attachment/:filePath", postsController.downloadAttachment2) */

module.exports = router;