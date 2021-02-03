export const setLoader = () => async(dispatch) => {
    dispatch({
        type:'Set_Loader'
    });
};

export const removeLoader = () => async(dispatch) => {
    dispatch({
        type:'Remove_Loader'
    });
};