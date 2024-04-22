const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const authEndpoints  = {
    LOGIN_API: BASE_URL + '/user/login',
    REGISTER_API: BASE_URL + '/user/signup',
    LOGOUT_API: BASE_URL + '/user/logout',
}

export const propertyEndpoints = {
    ADD_PROPERTY_API: BASE_URL + '/property/add-property',
    INIT_FOR_CONTRACT: "http://192.168.16.251:3000/init",
}