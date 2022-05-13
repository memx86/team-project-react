const { createAction } = require('@reduxjs/toolkit');


const modalAddTransactionOpen = createAction('modal/modalAddTransactionOpen');
const modalAddTransactionClose = createAction('modal/modalAddTransactionClose');

const modalActions = {
  modalAddTransactionOpen,
  modalAddTransactionClose,
};
export default modalActions;