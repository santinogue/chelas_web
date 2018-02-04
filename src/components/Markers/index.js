import React from 'react';
import PropTypes from 'prop-types';

class Markers extends React.PureComponent {
  componentDidMount () {
    this.addMArkersToMap();
  }

  componentDidUpdate (prevProps) {
    const {markersData} = this.props;
    const geoJSONElements = [];
    markersData.forEach(markerData => {
      geoJSONElements.push(this.buildGeoJSON(markerData));
    });

    this.updateMarkersSource(geoJSONElements);
  };

  addMArkersToMap () {
    const {markersData, map} = this.props;
    const geoJSONElements = [];
    markersData.forEach(markerData => {
      geoJSONElements.push(this.buildGeoJSON(markerData));
    });

    map.loadImage('https://cdn4.iconfinder.com/data/icons/party-and-celebrations-6/128/111-128.png', (error, image) => {
      if (error) throw error;
      map.addImage('bar', image);

      map.loadImage('https://cdn0.iconfinder.com/data/icons/science-5-2/97/217-128.png', (error, image) => {
        if (error) throw error;
        map.addImage('store', image);

        map.loadImage('https://cdn0.iconfinder.com/data/icons/winter-lollipop/128/Cart.png', (error, image) => {
          if (error) throw error;
          map.addImage('shop', image);

          this.addMarkersSource(geoJSONElements);
          this.addMarkersLayer(geoJSONElements);
        });
      });
    });
  }

  addMarkersSource (geoJSONElements) {
    const {map} = this.props;

    map.addSource(
      'markers-source', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': geoJSONElements,
        },
      }
    );
  }

  updateMarkersSource (geoJSONElements) {
    const {map} = this.props;
    const markersSource = map.getSource('markers-source');

    if (markersSource) {
      markersSource.setData({
        'type': 'FeatureCollection',
        'features': geoJSONElements,
      });
    }
  }

  addMarkersLayer (geoJSONElements) {
    const {map} = this.props;

    map.addLayer({
      'id': 'markers',
      'type': 'symbol',
      'source': 'markers-source',
      'layout': {
        'icon-image': '{iconName}',
        'icon-allow-overlap': false,
        'icon-padding': 0,
        'icon-size': {
          'stops': [
            [1, 0.05],
            [5, 0.1],
            [10, 0.2],
            [15, 0.4],
            [20, 0.8],
          ],
        },
      },
      filter: ['==', ['get', 'visibility'], true],
    });
  }

  buildGeoJSON (markerData) {
    const {venue_type: type} = markerData;
    let iconName;

    switch (type) {
      case 'Tienda':
        iconName = 'shop';
        break;
      case 'Bar':
      case 'Restaurant':
        iconName = 'bar';
        break;
      default:
        iconName = 'store';
    }

    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [markerData.lng, markerData.lat],
      },
      'properties': {
        iconName,
        ...markerData,
      },
    };
  }

  render () {
    return null;
  }
}

Markers.propTypes = {
  map: PropTypes.object,
  markersData: PropTypes.array,
};

export default Markers;
