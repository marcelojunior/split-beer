import axios, { AxiosResponse } from "axios";

export class BaseRespoitory {
  BASE_URL = "";
  constructor(){
    this.BASE_URL = process.env.VUE_APP_BACK_URL
  }

  post(path:string, model: any) : Promise<AxiosResponse<any,any>>{
    return axios.post(`${this.BASE_URL}${path}`, model)
  }

  get(path:string) : Promise<AxiosResponse<any,any>>{
    return axios.get(`${this.BASE_URL}${path}`)
  }
}