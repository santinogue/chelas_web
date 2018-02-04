import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MapComponent from 'components/Map';
import Markers from 'components/Markers';
import HoverPopup from 'components/HoverPopup';
import Sidebar from 'components/Sidebar';

class Home extends React.Component {
  render () {
    const {markers} = this.props;

    return (
      <div>
        <Sidebar />
        <MapComponent>
          <Markers
            markersData={markers}
          />

          <HoverPopup />
        </MapComponent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  markers: state.markers.markers,
});

Home.propTypes = {
  markers: PropTypes.array,
};

export default connect(mapStateToProps, null)(Home);
