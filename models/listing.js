const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Review=require("./review.js");
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
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

