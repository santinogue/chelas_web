import React from 'React';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Popup} from 'mapbox-gl/dist/mapbox-gl';

class HoverPopup extends React.PureComponent {
  constructor (props) {
    super(props);

    this.rootPopupElement = document.createElement('div');
  }

  componentDidMount () {
    this.bindPopupEvents();
  }

  bindPopupEvents () {
    const {map} = this.props;

    map.on('mousemove', e => {
      const features = map.queryRenderedFeatures(e.point);
      const isMarker =
        features.length &&
        features[0].layer &&
        features[0].layer.id === 'markers';

      map.getCanvas().style.cursor = isMarker ? 'pointer' : '';

      if (this.popup) {
        this.popup.remove();
      }

      if (!isMarker) {
        return;
      }

      this.popup = new Popup({closeButton: false})
        .setLngLat(e.lngLat)
        .setDOMContent(this.renderPopupMarkup(features[0]))
        .addTo(map);
    });
  }

  renderPopupMarkup (marker) {
    const {
      properties: {
        address,
        city,
        department,
        email,
        name,
        venue_type: type,
      },
    } = marker;

    const hola = (
      <div>
        {name && <div>{name}</div>}
        {email && <div>{email}</div>}
        {type && <div>{type}</div>}
        {address && <div>{address}</div>}
        {city && <div>{city}</div>}
        {department && <div>{department}</div>}
      </div>
    );

    ReactDOM.render(hola, this.rootPopupElement);

    return this.rootPopupElement;
  }

  render () {
    return null;
  }
}

HoverPopup.propTypes = {
  map: PropTypes.object,
};

export default HoverPopup;
