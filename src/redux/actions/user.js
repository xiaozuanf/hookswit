import * as types from '../types/index';
export function setUser(data){
    return {
        type:types.SET_USER,
        data:data
    }
}