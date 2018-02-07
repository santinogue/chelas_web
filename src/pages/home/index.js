import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MapComponent from 'components/Map';
import Markers from 'components/Markers';
import HoverPopup from 'components/HoverPopup';
import Panel from 'components/Panel';
import InfoPanel from 'components/InfoPanel';

class Home extends React.Component {
  render () {
    const {markers, selectedMarker, showingInfoMarker} = this.props;

    return (
      <div>
        <Panel markers={markers} />
        <InfoPanel marker={showingInfoMarker} />
        <MapComponent
          selectedMarker={selectedMarker}
        >
          <Markers
            markersData={markers}
          />

          <HoverPopup />
        </MapComponent>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const selectedMarker = state.markers.markers.find(marker => (
    marker.selected === true
  ));

  const showingInfoMarker = state.markers.markers.find(marker => (
    marker.showingInfo === true
  ));

  return {
    showingInfoMarker,
    selectedMarker,
    markers: state.markers.markers,
  };
};

Home.propTypes = {
  markers: PropTypes.array,
  selectedMarker: PropTypes.object,
  showingInfoMarker: PropTypes.object,
};

export default connect(mapStateToProps, null)(Home);
