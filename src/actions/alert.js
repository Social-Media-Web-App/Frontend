import {v4 as uuid} from 'uuid';

export const setAlert = ({msg,alertType}) => async(dispatch) => {
    const id = uuid();
      dispatch({
          type:'Set_Alert',
          payload:{msg,alertType,id}
      });

      setTimeout(() => dispatch({type:'Remove_Alert',payload:id}),5000);
}