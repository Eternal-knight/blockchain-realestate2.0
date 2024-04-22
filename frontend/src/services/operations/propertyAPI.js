import {toast} from 'react-hot-toast'

import { apiConnector } from '../apiConnector'

import { propertyEndpoints } from '../apis'

const {
    ADD_PROPERTY_API,
} = propertyEndpoints

export const addProperty = (city, state, address, price, description, PropertyImage, publicAddress, contractAddress) => {
    return async (dispatch) => {
        const toastId = toast.loading('Adding Property...');

        console.log(contractAddress);

        try{
            const response = await apiConnector(
                "POST",
                ADD_PROPERTY_API,
                {
                    city,
                    state,
                    address,
                    price,
                    description,
                    PropertyImage,
                    ownerAddress: publicAddress,
                    contractAddress
                },
                {
                    'Content-type': 'multipart/form-data'
                } 
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
    
            toast.success("Property Added Successfully");
            //window.location.reload();
        } catch(error){
            toast.dismiss(toastId);
            console.log("ADD_PROPERTY_API ERROR", error);
        }
    }
}


// export const getAllProperties = () => {
// //     return async (dispatch) => 
// // }
// // 



// export const initForContract = (publicAddress) => {
//     return async (dispatch) => {

//         // console.log(publicAddress);
//         console.log(`${INIT_FOR_CONTRACT}/${publicAddress}`);

//         try{
//             const response = await apiConnector(
//                 "GET",
//                 `${INIT_FOR_CONTRACT}/${publicAddress}`
//             )

//             console.log(response);
//         } catch(error){
//             console.log("INIT_FOR_CONTRACT ERROR", error);
//         }
//     }
// }

