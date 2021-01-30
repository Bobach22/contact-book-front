import { UseCreateContext } from './create-context';

const initialState = {
  isOpen: false,
  modalComponent: null,
  data: null,
};

type State = {
    isOpen:boolean
    modalComponent:React.FunctionComponent<any>|null
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
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
        modalComponent: null,
        data: null,
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