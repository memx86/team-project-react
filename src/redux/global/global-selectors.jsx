const isModalOpen = state => state.global.isModalOpen;
const isModalAddTransactionOpen = state =>
  state.global.isModalAddTransactionOpen;
const globalSelectors = {
  
  isModalOpen,
  isModalAddTransactionOpen,

};
export default globalSelectors;