import {IAuthForm, IAuthResponse} from "../types/auth.types";
import {axiosNoAuth} from "../api/interceptors";
import {removeFromStorage, saveTokenStorage} from "./auth-token.service";

export const authService = {
    async main(type: 'login' | 'register', data: IAuthForm) {
        const response = await axiosNoAuth.post<IAuthResponse>(
            `/auth/${type}`,
            data
        )

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response
    },

    //update token
    async getNewTokens() {
        const response = await axiosNoAuth.post<IAuthResponse>(
            '/auth/login/access-token'
        )

        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

        return response;
    },

    async logout() {
        const response = await axiosNoAuth.post<boolean>('/auth/logout')

        if (response.data) {
            removeFromStorage()
        }

        return response
    }
}


