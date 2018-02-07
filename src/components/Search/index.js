import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Fuse from 'fuse-js-latest';
import DropDown from '../DropDown';

// Actions.
import {selectMarker} from 'actions/markers';

import './Search.scss';

class Search extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {items: []};

    this.onInputChange = ::this.onInputChange;
  }

  onInputChange (e) {
    const {markers} = this.props;
    const {target: {value: text}} = e;
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'name',
      ],
    };

    const fuse = new Fuse(markers, options);
    const result = fuse.search(text);
    this.setState({items: result});
  }

  render () {
    return (
      <div className='panel-search'>
        <input
          type='search'
          placeholder='Buscar'
          onChange={this.onInputChange}
        />

        {this.renderItems()}
      </div>
    );
  }

  renderItems () {
    const {items} = this.state;
    const {selectMarker} = this.props;

    return (
      <DropDown
        isOpen={items && items.length > 0}
        width={590}
        delay={1}
        top={80}
        right={390}
        position='top'
        side='right'
      >
        <div className='search-items'>
          {items.map((item, index) => {
            const onClick = () => {
              selectMarker(item.chelasId);
              this.setState({items: []});
            };

            return (
              <Item
                key={index}
                onClick={onClick}
                name={item.name}
              />
            );
          })}
        </div>
      </DropDown>
    );
  }
}

const Item = ({name, onClick}) => (
  <div onClick={onClick} className='search-item'>
    {name}
  </div>
);

Search.propTypes = {
  markers: PropTypes.array,
  selectMarker: PropTypes.func,
};

const mapDispatchToProps = {
  selectMarker,
};

export default connect(null, mapDispatchToProps)(Search);
