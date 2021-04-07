import * as types from '../types/index';
import {getInfo} from '../../libs/untils'
let userName='',addr='',userWord=''
if(getInfo()){
    addr=getInfo().addr
}
const initialState ={
    addr:getInfo().addr,
};
export default function user (state=initialState,action){
    switch(action.type){
        case types.SET_USER:
            return {
                ...state,
                addr:action.data.addr
            }
        default:
            return state;
    }
}