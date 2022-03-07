import { GET_USER, SAVE_GAME_LOG, SAVE_GAME_LOG_ERROR } from "../actions/type";

export const gamelogReducer=(state={},action)=>{
    switch (action.type) {
        case SAVE_GAME_LOG:
            return{...state,logs:action.payload}
        case SAVE_GAME_LOG_ERROR:
            return {...state,error:action.payload}
        default:
           return state;
    }
}

export const  userNameReducer=(state={},action)=>{
    switch(action.type){
        case GET_USER:
            return {...state,name:action.payload}
        default:
            return state
    }
}