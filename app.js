const mongoose= require("mongoose");
const validator = require ("validator");

// connection creation 
mongoose.connect("mongodb://127.0.0.1/aditya")
.then(()=>console.log("connection successfully"))
.catch((err)=>console.log(err));

const schema=new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        minlength:1,
        maxlength:20,
        trim : true,
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true,
        unique: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    date : {
        type : Date,
        default : Date.now
    }
})

// Collection creation
const Model = new mongoose.model("Authentication",schema)

// create document or insert

const createDocument = async ()=>{
    try
{
    const user = new Model({
    userName : "Aditya Raj",
    password : "aditya",
    email : "aditya",
})

    const admin = new Model({
    userName : "Aditya",
    password : "adityaraj",
    email : "aditya",
})
const result = await Model.insertMany([user,admin]);
console.log(result);
}catch(err){
    console.log(err);
}
}
createDocument();

 const getDocument=async () => {
    const data = await Model
    .find()
    // .find({$and: [{userName: "Aditya"},{passowrd:"adityaraj"}]})
    // .find({userName:{$in: ["Aditya Raj","Aditya"]}})
    // .select({password:1})
    // .limit(1)
    // .countDocuments();
    .sort({userName:1})
    console.log(data);
 }

getDocument();

//update the document

const updateDocument = async(_id) =>{
    try{
        const data=await Model.updateOne({_id},{
            $set:{
                userName:"Adi"
            }
        });
        console.log(data)
    }catch(err){
        console.log(err);
    }
}

// updateDocument("646db12703b5afd2ba62fbf4")

// delete the document

const deleteDocument = async (_id)=>{

    try{
        const result = await Model.deleteOne({_id});
    }catch(err){
        console.log(err);
    }
}

// deleteDocument("646ce9232483efcda095c0be")

