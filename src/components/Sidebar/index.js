import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import className from 'classnames';
import {toggleVisibility} from 'actions/markers';

import './sidebar.scss';

const BAR_ICON = 'https://cdn4.iconfinder.com/data/icons/party-and-celebrations-6/128/111-128.png';
const STORE_ICON = 'https://cdn0.iconfinder.com/data/icons/science-5-2/97/217-128.png';
const SHOP_ICON = 'https://cdn0.iconfinder.com/data/icons/winter-lollipop/128/Cart.png';

class Sidebar extends React.PureComponent {
  render () {
    const {toggleVisibility, visibilities} = this.props;

    console.log(visibilities);

    return (
      <div className='sidebar'>
        <div className='filter-title'>
          Filtros
        </div>

        <Filters
          visibilities={visibilities}
          toggleVisibility={toggleVisibility} />
      </div>
    );
  }
}

const Filters = ({visibilities, toggleVisibility}) => {
  return (
    <div>
      <FilterItem
        type='bar'
        visibility={visibilities.bar}
        name='Bar/Restaurant'
        icon={BAR_ICON}
        onClick={toggleVisibility}
      />

      <FilterItem
        type='shop'
        visibility={visibilities.shop}
        name='Tienda'
        icon={SHOP_ICON}
        onClick={toggleVisibility}
      />

      <FilterItem
        type='store'
        visibility={visibilities.store}
        name='Productor'
        icon={STORE_ICON}
        onClick={toggleVisibility}
      />
    </div>
  );
};

const FilterItem = ({type, visibility, icon, name, onClick}) => {
  const onVisibilityChange = () => {
    onClick(type);
  };

  return (
    <div
      onClick={onVisibilityChange}
      className={className('filter-item', {'filter-item--selected': visibility})}
    >
      <img src={icon} />
      <div>{name}</div>

      {visibility && <i className='fas fa-eye' />}
      {!visibility && <i className='fas fa-eye-slash' />}
    </div>
  );
};

Sidebar.propTypes = {

};

const mapStateToProps = state => {
  const {markers: {markers}} = state;

  const visibilities = markers.reduce(
    (accum, current) => {
      accum[current.type] = current.visibility;
      return accum;
    },
    {}
  );

  return {
    visibilities,
  };
};

const mapDispatchToProps = {
  toggleVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
