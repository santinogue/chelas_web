import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ImagePlaceholder from 'static/images/image_placeholder.png';

// Actions
import {deselectShowingMarker} from 'actions/markers';

import './InfoPanel.scss';

class InfoPanel extends React.PureComponent {
  render () {
    const {marker, deselectShowingMarker} = this.props;
    let className = 'info-panel';

    if (marker) {
      className = `${className} info-panel--visible`;
    }

    return (
      <div className={className}>
        {marker &&
          <div>
            <div className='info-panel-header'>
              <i
                onClick={deselectShowingMarker}
                className='fas fa-times'
              />
            </div>

            <div className='info-panel-photo'>
              {marker.photo_prefix &&
                <img src={`${marker.photo_prefix}height512${marker.photo_suffix}`} />}

              {!marker.photo_prefix &&
                <div
                  style={{backgroundImage: `url(${ImagePlaceholder})`}}
                  className='info-panel-photo__placeholder'
                />}
            </div>

            <div className='info-panel-data-name'>
              {marker.name}
            </div>

            <div className='info-panel-data'>
              {
                marker.email &&
                <div className='info-panel-data-item'>
                  <div className='info-panel-data-item__label'>Email</div>
                  {marker.email}
                </div>
              }

              {
                marker.venue_type &&
                <div className='info-panel-data-item'>
                  <div className='info-panel-data-item__label'>Rubro</div>
                  {marker.venue_type}
                </div>
              }

              {
                marker.address &&
                <div className='info-panel-data-item'>
                  <div className='info-panel-data-item__label'>Dirección</div>
                  {marker.address}
                </div>
              }

              {
                marker.city &&
                <div className='info-panel-data-item'>
                  <div className='info-panel-data-item__label'>Ciudad</div>
                  {marker.city}
                </div>
              }

              {
                marker.department &&
                <div className='info-panel-data-item'>
                  <div className='info-panel-data-item__label'>Departamento</div>
                  {marker.department}
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  };
}

InfoPanel.propTypes = {
  marker: PropTypes.object,
  deselectShowingMarker: PropTypes.func,
};

const mapDispatchToProps = {
  deselectShowingMarker,
};

export default connect(null, mapDispatchToProps)(InfoPanel);
