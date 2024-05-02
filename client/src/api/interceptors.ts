import axios, {CreateAxiosDefaults} from "axios";
import {getAccessToken, removeFromStorage} from "../services/auth-token.service";
import {errorCatch} from "./error";
import {authService} from "../services/auth.service";

const options:CreateAxiosDefaults = {
    //@TODO URL get from env
    baseURL: 'http://localhost:4200/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}


const axiosNoAuth = axios.create(options);
//no authorization
const axiosWithAuth = axios.create(options)


axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken();

    //add to headers bearer token if config exist
    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`

        return config
    }
})

//response
//work with error in this case
axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {

        //save request
        const originalRequest = error.config

        //401 something wrong with authorization
        if (error?.response?.status === 401 ||
            errorCatch(error) === 'jwt expired' ||
            errorCatch(error) === 'jwt must be provided' &&
            error.config &&
            //request is not repeated for prevent infinite loop
            !error.config._isRetry
        ) {
            //for prevent request next check
           originalRequest._isRetry = true

            try {
                await authService.getNewTokens()

                return await axiosWithAuth.request(originalRequest)
            } catch (error) {
               //if no token user logout
                if (errorCatch(error) === 'jwt expired') removeFromStorage()
            }
        }

        throw error
    }

    );

export {axiosNoAuth, axiosWithAuth}

