import {ApiErrors} from "../utils/ApiErrors.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { Property } from "../models/Property.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProperty =  asyncHandler( async (req, res) => {
    const {city, state, address, description, price, ownerAddress, contractAddress} = req.body;

    if(!(city && state && address && description && price)){
        throw new ApiErrors(400, "All fields are required")
    }

    const propertyExists = await Property.findOne({address})

    if(propertyExists){
        throw new ApiErrors(400, "Property already exists")
    }

    const propertyImageLocalPath = req.files?.PropertyImage[0]?.path;

    if(!propertyImageLocalPath){
        throw new ApiErrors(400, "Property image is required")
    }

    const PropertyImage = await uploadOnCloudinary(propertyImageLocalPath);

    console.log(PropertyImage, "PropertyImage");

    const property = await Property.create({
        city, 
        state, 
        address, 
        description, 
        price,
        ownerAddress,
        PropertyImage : PropertyImage.secure_url,
        contractAddress
    })

    if(!property){
        throw new ApiError(500, "Property not created")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            Property,
            "Property created successfully"
        )
    )

})

export const getAllProperties = asyncHandler( async (req, res) => {
    const properties = await Property.find({})

    if(!properties){
        throw new ApiErrors(404, "No properties found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            properties,
            "All properties"
        )
    )
})

export const getProppertyById = asyncHandler( async(req, res) => {
    const id = req.params.id;

    // console.log(id, "id");

    if(!id){
        throw new ApiErrors(404, "Property not found")
    }

    const property = await Property.findById(id);

    if(!property){
        throw new ApiErrors(404, "Property Not Found")
    }

    console.log(property, "property");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            property,
            "Property fetched SuccessFull"
        )
    )
})