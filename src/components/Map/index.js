import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl, {Map} from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.scss';

class MapComponent extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {map: null, loaded: false};
  }

  componentWillMount () {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic25vZ3VlcmEiLCJhIjoiY2oxc2h2dW1oMDBkZDJ3cWtrNmoxbzB1ZiJ9.X7VWIX_VImAV_t-eV8E3XQ';
  }

  componentDidMount () {
    const map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-56.1598280900416, -34.9071404591763],
      zoom: 9,
    });

    map.on('load', () => { this.setState({loaded: true}); });

    this.setState({map});
  }

  render () {
    const {map, loaded} = this.state;
    const children = React.Children.map(
      this.props.children,
      child => (child ? React.cloneElement(child, {map}) : null)
    );

    return (
      <div id='map'>
        {loaded && children ? children : null}
      </div>
    );
  }
}

MapComponent.propTypes = {
  children: PropTypes.node,
};

export default MapComponent;
