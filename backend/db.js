const mongoose= require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotebook?directConnection=true";

const connectmongo=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully!")
    })
}
module.exports=connectmongo;