
import {data} from '../static/data';

// Helper.

const addIdToMarkers = markers => (
  markers.map(marker => {
    marker.chelasId = Math.random() * Math.random() * 1000;
    return marker;
  })
);

// Action Handlers
//
// For some reason importing actionTypes from 'actions/dashboard' does not work.
// Using plain strings for the moment.
const ACTION_HANDLERS = {
  'TOGGLE_VISIBILITY': (state, action) => {
    const {markerType} = action;

    const newMarkers = [...state.markers];

    const markersSet = newMarkers.map(marker => {
      if (marker.type === markerType) {
        marker.visibility = !marker.visibility;
      }

      return marker;
    });

    return {markers: markersSet};
  },
  'SELECT_MARKER': (state, action) => {
    const {markerId} = action;

    const markers = state.markers.map(marker => {
      if (marker.chelasId === markerId) {
        marker.selected = true;
        marker.showingInfo = true;
      } else {
        marker.selected = false;
        marker.showingInfo = false;
      }

      return marker;
    });

    return {...state, markers};
  },
  'DESELECT_MARKER': (state, action) => {
    const markers = state.markers.map(marker => {
      marker.selected = false;
      return marker;
    });

    return {...state, markers};
  },
  'DESELECT_SHOWING_MARKER': (state, action) => {
    const markers = state.markers.map(marker => {
      marker.showingInfo = false;
      return marker;
    });

    return {...state, markers};
  },
};

// Reducer
const initialState = {
  markers: addIdToMarkers(data),
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
