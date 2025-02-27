const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    }, 
    image: {
        filename: { type: String, required: true },
        url: { type: String, required: true },
},           
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },

    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
},
    // catagory:{
    //     type:String,
    //     enum:["mountains","arctics","farms","rooms","trending","iconic cities","castle","pools","camping"],
    //     required:true,
    // },

});

 
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;