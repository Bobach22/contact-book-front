import { mutateInterface, revalidateType } from "swr/dist/types"
import { API_URL } from "../settings/constants"
import useRequest from "./useRequest"
import axios from 'axios'


type Meta={
  current_page:number
  from:number
  last_page:number
  links:null
  path:null
  per_page:number
  to:number
  total:number
}

type TResponse={
    data:IContact[]
    meta:Meta
    error:string|undefined|unknown
    isLoading:boolean
    mutate:mutateInterface,
    isValidating:boolean,
    revalidate:revalidateType
}



export const useContact=(searchText="",activePage=1)=>{

    const {data,error,mutate,isValidating,revalidate}=useRequest<TResponse>({
      url:`${API_URL}/contacts?q=${searchText}&page=${activePage}`,
      method:'get',
    });

    return {
      contacts:data?.data||[],
      meta:data?.meta,
      error:error,
      isLoading:!data&&!error,
      mutate,
      isValidating,
      revalidate
    }
  }
type TDeleteContact=(contacts:Array<number>)=>Promise<any>
type TUpdateContact=(contact:IContact,id:number)=>Promise<any>
type TDelete=(id:number)=>Promise<any>
type TAddContact=(contact:IContact)=>Promise<any>

export const addContact:TAddContact=async (contact)=>{
  return axios.post(`${API_URL}/contacts`,contact);
}

export const deleteContact:TDeleteContact=async (contacts=[])=>{
    return axios.post(`${API_URL}/deleted-contacts`,{contact_ids:contacts});
}

export const updateContact:TUpdateContact=async (contact,id)=>{
       return axios.put(`${API_URL}/contacts/${id}`,contact)
}

export const deleteEmail:TDelete=async (id:number)=>{
       return axios.delete(`/categories/${id}`);
}

export const deletePhone:TDelete=async (id:number)=>{
       return axios.put(`/categories/${id}`);
}