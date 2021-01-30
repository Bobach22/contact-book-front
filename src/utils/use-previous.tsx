import {useRef,useEffect} from "react"

export function usePrevious(value:number|string|{}) {
    const ref = useRef<string|number|{}>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }