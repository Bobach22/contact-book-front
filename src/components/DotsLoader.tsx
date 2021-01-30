import {PulseLoader} from "react-spinners"
import {styled, useStyletron} from "baseui";

const DotsWrapper=styled("div",({
    width:"100%",
    height:"100%",
    inset:0,
    position:"fixed",
    zIndex:99999,
    backgroundColor:"white",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
}))

type DotsProps={
    color?:string
    size?:number
    loading:boolean
}

export const DotsLoader:React.FC<DotsProps>=({...props})=>{
    const [css,theme]=useStyletron()
    return(
        <DotsWrapper>
            <PulseLoader color={theme.colors.positive300} {...props}/>
        </DotsWrapper>
    )
}