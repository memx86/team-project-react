import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import modalActions from './global-action';

const {
    modalAddTransactionOpen,
    modalAddTransactionClose,
} = modalActions;


const isModalAddTransactionOpen = createReducer(false, {
    [modalAddTransactionOpen]: () => true,
    [modalAddTransactionClose]: () => false,
});


export default combineReducers({
    isModalAddTransactionOpen,
    
});