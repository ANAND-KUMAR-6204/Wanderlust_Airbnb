const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const Review=require("./models/review.js");
const{listingSchema,reviewSchema}=require("./schema.js");
const listings=require("./routes/listing.js")
const MONGO_URL = "mongodb+srv://anandkumar6204aa_db_user:anand123@cluster0.7p5mw6i.mongodb.net/wonderlust";
const ExpressError=require("./utils/ExpressError.js");
const reviews=require("./routes/review.js");
app.use(express.json());
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
    res.send("Hi,i am root");
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)





 

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something is wrong!"}=err;
    res.status(statusCode).send(message);
});




app.listen(8080,()=>{
    console.log("server is listening to port");

}
);