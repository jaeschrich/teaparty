import { combineReducers, createStore } from 'redux';
import  reducer from './reducers/index';
import { ITeaPartyState } from '../types/types';


let store = createStore(reducer);

export default store;