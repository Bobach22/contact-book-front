import { UseCreateContext } from './create-context';

const initialState = {
  isOpen: false,
  modalComponent: null,
  mutate:null,
  data: null,
};

type State = {
    isOpen:boolean
    modalComponent:React.FunctionComponent<any>|null,
    mutate:(()=>Promise<any>)|null
    data:IContact|null
};
type Action = any;
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        modalComponent: action.modalComponent,
        data: action.data,
        mutate:action.mutate
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
        modalComponent: null,
        data: null,
        mutate:action.mutate
      };
    default:
      return state;
  }
}

const [useModalState, useModalDispatch, ModalProvider] = UseCreateContext(
  initialState,
  reducer
);

export { useModalState, useModalDispatch, ModalProvider };