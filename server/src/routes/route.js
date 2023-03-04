let express=require("express")
let router=express.Router()

let { createUser, loginUser}=require("../Controllers/sellerContoller")
let {createBook,getBooks,getBookById,updateBooks,deleteBook}=require("../Controllers/bookController")

let {authentication}=require("../MiddleWare/auth")

//Seller API
router.post("/seller/signup", createUser)
router.post("/seller/signin", loginUser)

//books API

router.post("/books/create", createBook)
router.get("/books/getAll", getBooks)
router.get("/books/:id", getBookById)

router.put("/books/update/:id", updateBooks)
router.delete("/books/delete/:id",deleteBook)







router.all('/*/', async function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" })
})

module.exports=router