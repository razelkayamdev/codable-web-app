import { AxiosInstance, AxiosResponse } from "axios";
const axios = require('axios').default;

export type EncryptedMessageResponse = {
    message: string;
}

export type EncryptedMessageData = {
    text: string;
    password: string
}

export type DecryptedMessageData = {
    hash: string;
    password: string
}

export class NetworkingService {

    private axiosInstance: AxiosInstance;

    constructor() {

        this.axiosInstance = axios.create({
            baseURL: "http://localhost:8000",
            timeout: 1000,
            headers: {}
          });
    }

    public async postMessgae(message: EncryptedMessageData): Promise<EncryptedMessageResponse> {
        const request = this.axiosInstance.post<EncryptedMessageResponse, AxiosResponse<EncryptedMessageResponse>, EncryptedMessageData>("/codable", message)
        .then((res: AxiosResponse<EncryptedMessageResponse>) => {
            return res.data;
        }).catch((error) => {
            throw(error);
        });

        return request;
    }

    public async getMessage(message: DecryptedMessageData): Promise<EncryptedMessageResponse> {
        const request = this.axiosInstance.get<DecryptedMessageData, AxiosResponse<EncryptedMessageResponse>, EncryptedMessageResponse>("/codable", {
            params: message
        }).then((res: AxiosResponse<EncryptedMessageResponse>) => {
            return res.data;
        }).catch((error) => {
            throw error;
        });

        return request;
    }
}
