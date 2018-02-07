export const actionTypes = {
  TOGGLE_VISIBILITY: 'TOGGLE_VISIBILITY',
  SELECT_MARKER: 'SELECT_MARKER',
  DESELECT_MARKER: 'DESELECT_MARKER',
  DESELECT_SHOWING_MARKER: 'DESELECT_SHOWING_MARKER',
};

// Action creators
export const toggleVisibility = markerType => ({
  type: actionTypes.TOGGLE_VISIBILITY, markerType,
});

export const selectMarker = markerId => ({
  type: actionTypes.SELECT_MARKER, markerId,
});

export const deselectMarker = () => ({
  type: actionTypes.DESELECT_MARKER,
});

export const deselectShowingMarker = () => ({
  type: actionTypes.DESELECT_SHOWING_MARKER,
});

export const actions = {
  toggleVisibility,
  selectMarker,
  deselectMarker,
  deselectShowingMarker,
};
