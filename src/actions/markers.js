export const actionTypes = {
  TOGGLE_VISIBILITY: 'TOGGLE_VISIBILITY',
};

// Action creators
export const toggleVisibility = markerType => ({
  type: actionTypes.TOGGLE_VISIBILITY, markerType,
});

export const actions = {
  toggleVisibility,
};
