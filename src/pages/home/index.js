import React from 'react';
import {data} from 'static/data';
import MapComponent from 'components/Map';
import Markers from 'components/Markers';
import HoverPopup from 'components/HoverPopup';

export default class Home extends React.Component {
  render () {
    return (
      <MapComponent>
        <Markers
          markersData={data}
        />

        <HoverPopup />
      </MapComponent>
    );
  }
}
