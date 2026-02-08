const mongoose=require("mongoose");
const schema=mongoose.Schema;
const listingSchema=new schema({
    title:{
    type:String,
    required:true,
      },
    description:String,
    image:String,
    price: {
      type: Number,
      required: true,
      default: 0
    },
    
    location:String,
    country:String,
    category: { 
      type: String,
      
  },
  reviews:[
     {
    type:schema.Types.ObjectId,
    ref:"Review",
  },
  ],
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

