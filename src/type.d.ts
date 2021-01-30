
interface IContact{
    id:number
    name:string
    phones:IPhone[]
    emails:IEmail[]
}

interface IPhone{
    id:number
    phone:string
}

interface IEmail{
    id:number
    email:string
}

type ContactState={
    contacts:IContact[]
}

type ContactAction={
    type:string
    contact:IContact
}

type DispatchType=(args:ContactAction)=>ContactAction

type FieldError={
    [key:string]:Array<string>
}
