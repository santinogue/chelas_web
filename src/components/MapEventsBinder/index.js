import React from 'React';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {selectMarker} from 'actions/markers';

class MapEventsBinder extends React.PureComponent {
  componentDidMount () {
    this.bindEvents();
  }

  bindEvents () {
    const {map, selectMarker} = this.props;

    map.on('click', e => {
      const features = map.queryRenderedFeatures(e.point);
      const isMarker =
        features.length &&
        features[0].layer &&
        features[0].layer.id === 'markers';

      if (!isMarker) {
        return;
      }

      selectMarker(features[0].properties.chelasId);
    });
  }

  render () {
    return null;
  }
}

MapEventsBinder.propTypes = {
  map: PropTypes.object,
  selectMarker: PropTypes.func,
};

const mapDispatchToProps = {
  selectMarker,
};

export default connect(null, mapDispatchToProps)(MapEventsBinder);
