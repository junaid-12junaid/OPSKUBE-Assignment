let {BookModel}=require("../Models/model")

//Create Book

 
let createBook=async function (req,res){
    try {
        const book=await BookModel.create(req.body)
 
        if(book){
             res.status(200)
             res.json(book)
        }else{
            throw new Error("Book creating failed")
        }
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
}



let getBooks=async function (req,res){
    try {
        const books = await BookModel.find().populate('sellerId').sort('createdAt');
    //Compare password
    if (books) {
      res.status(201);
      res.send(books);
    } else {
      res.status(401);
      throw new Error('Server error');
    }
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
}


let getBookById=async function (req,res){
    try {
        const books = await BookModel.findOne({_id:req.params.id}).populate('sellerId')
    //Compare password
    if (books) {
      res.status(201); 
      res.send(books);
    } else {
      res.status(401);
      throw new Error('Server error');
    }
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
}


let updateBooks=async function (req,res){
    try {
        
        const book = await BookModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200);
        res.send(book);
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
}

let deleteBook=async function (req,res){
    try {
        
        const book = await BookModel.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send(book);
    } catch (error) {
        return res.status(500).send({ error: error.message })

    }
}

module.exports={createBook,getBooks,getBookById,updateBooks,deleteBook}
