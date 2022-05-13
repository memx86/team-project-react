import Select, { components } from 'react-select';
import IndicatorArrow from './../../../images/categoris.svg';
import ClearIcon from '../../../images/close.svg';
import PropTypes from 'prop-types';
export default function TransactionsCategoriesSelect({
  onChange,
  newCategory,
  type,
  categories,
}) {

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={IndicatorArrow} alt="" width="20px" height="20px" />
        <img alt="" width="20px" height="20px" />

      </components.DropdownIndicator>
    );
  };
  const ClearIndicator = props => {
    return (
      <components.ClearIndicator {...props}>
        <img alt="" width="20px" height="20px" />
        <img src={ClearIcon} alt="" width="20px" height="20px" />

      </components.ClearIndicator>
    );
  };
  const IndicatorSeparator = props => {
    return (
      <components.IndicatorSeparator {...props}>
        <span></span>
      </components.IndicatorSeparator>
    );
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(10px)',
    }),

    indicatorSeparator: () => ({
      marginTop: '4px',
      width: '1px',
      height: '18px',
      left: '-9px',
      position: 'absolute',
      backgroundColor: 'var(--faded-cl)',
    }),

    indicatorsContainer: () => ({
      width: '20px',
      height: '20px',
      position: 'absolute',
      right: '8px',
      marginTop: '-26px',
    }),

    clearIndicator: () => ({
      width: '12px',
      height: '12px',
      position: 'absolute',
      padding: '0px',
      left: ' -30px',
      top: '7px',
    }),
    dropdownIndicator: () => ({
      width: '20px',
      height: '20px',
      padding: 0,
      paddingTop: '8px',
    }),

    control: () => ({
      width: '100%',
      borderBottom: '1px solid var(--faded-cl)',
    }),
    
    placeholder: () => ({
      color: '#808080',
      position: 'absolute',
      paddingLeft: '10px',
      fontWeight: '400',
      fontSize: '18px',
    }),
    singleValue: () => ({
      position: 'absolute',
      paddingLeft: '10px',
      fontSize: '18px',
    }),

    input: () => ({
      textAlign: 'left',
    }),
    option: provided => ({
      ...provided,
      textAlign: 'left',
      fontSize: '18px',
      backgroundColor: 'transparent',
      color: 'inherit',
      padding: '20px',
      '&:hover': {
        color: '#ff6596',
        backgroundColor: '#fff',
      },
      '&:active': {
        color: '#ff6596',
        backgroundColor: '#fff',
      },
      '&:focus': {
        color: '#ff6596',
        backgroundColor: '#fff',
      },
    }),
  };

  return (
    <Select
      components={{ DropdownIndicator, ClearIndicator, IndicatorSeparator }}
      // options={options()}
      styles={customStyles}
      isDisabled={newCategory}
      isClearable={true}
      placeholder='Choose a category'
      onChange={e => {
        onChange(e);
      }}
    />
  );
}
TransactionsCategoriesSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
};