import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import className from 'classnames';
import DropDown from '../DropDown';
import {toggleVisibility} from 'actions/markers';

import './panel.scss';

const BAR_ICON = 'https://cdn4.iconfinder.com/data/icons/party-and-celebrations-6/128/111-128.png';
const STORE_ICON = 'https://cdn0.iconfinder.com/data/icons/science-5-2/97/217-128.png';
const SHOP_ICON = 'https://cdn0.iconfinder.com/data/icons/winter-lollipop/128/Cart.png';

class Panel extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {showFilter: false, top: 0, left: 0};

    this.toggleFilter = ::this.toggleFilter;
    this.onMouseLeaveDropDown = ::this.onMouseLeaveDropDown;
    this.onMouseEnterDropDown = ::this.onMouseEnterDropDown;
  }

  toggleFilter () {
    const filterButton = document.querySelector('.filter-button');
    const top = parseInt(filterButton.getBoundingClientRect().y + filterButton.clientHeight + 10);
    const right = parseInt(document.body.clientWidth - filterButton.getBoundingClientRect().x) - filterButton.clientWidth;

    this.setState(prevState => (
      {showFilter: !prevState.showFilter, top, right}
    ));
  }

  onMouseLeaveDropDown () {
    this.setState({showFilter: false});
  }

  onMouseEnterDropDown () {
    this.setState({showFilter: true});
  }

  render () {
    const {showFilter, top, right} = this.state;
    const {toggleVisibility, visibilities} = this.props;

    return (
      <div className='panel'>
        <input className='panel-search' type='search' placeholder='Buscar' />
        <div
          onClick={this.toggleFilter}
          className='filter-button'
        >
          <div className='filter-title'>
            <i className='fas fa-filter' />
            <div>Filtros</div>
          </div>

          <div className='filter-button__arrow'>
            <i className='fas fa-caret-down' />
          </div>
        </div>

        <DropDown
          isOpen={showFilter}
          onMouseLeave={this.onMouseLeaveDropDown}
          onMouseEnter={this.onMouseEnterDropDown}
          width={220}
          delay={1}
          top={top}
          right={right}
          position='top'
          side='right'
        >
          <Filters
            visibilities={visibilities}
            toggleVisibility={toggleVisibility}
          />
        </DropDown>
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

Panel.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
