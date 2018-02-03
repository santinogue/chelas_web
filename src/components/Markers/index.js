import React from 'react';

class Marker extends React.PureComponent {
  componentDidMount () {
    this.addMArkersToMap();
  }

  addMArkersToMap () {
    const {markersData, map} = this.props;
    const geoJSONElements = [];
    markersData.forEach(markerData => {
      geoJSONElements.push(this.buildGeoJSON(markerData));
    });

    map.loadImage('https://cdn4.iconfinder.com/data/icons/party-and-celebrations-6/128/111-128.png', (error, image) => {
      if (error) throw error;
      map.addImage('beer', image);

      this.addMarkersSource(geoJSONElements);
      this.addMarkersLayer();
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

  addMarkersLayer () {
    const {map} = this.props;

    map.addLayer({
      'id': 'markers',
      'type': 'symbol',
      'source': 'markers-source',
      'layout': {
        'icon-image': 'beer',
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
    });
  }

  buildGeoJSON (markerData) {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [markerData.lng, markerData.lat],
      },
      'properties': markerData,
    };
  }

  render () {
    return null;
  }
}

export default Marker;
