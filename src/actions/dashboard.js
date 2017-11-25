import api from 'api/index';

export const actionTypes = {
  LOAD_DASHBOARD_SUCCESS: 'LOAD_DASHBOARD_SUCCESS',
  LOAD_DASHBOARD_FAILURE: 'LOAD_DASHBOARD_FAILURE',
  LOAD_FOLDERS_SUCCESS: 'LOAD_FOLDERS_SUCCESS',
  LOAD_FOLDERS_FAILURE: 'LOAD_FOLDERS_FAILURE',
  DELETE_MAP_SUCCESS: 'DELETE_MAP_SUCCESS',
  DELETE_MAP_FAILURE: 'DELETE_MAP_FAILURE',
  CREATE_FOLDER_SUCCESS: 'CREATE_FOLDER_SUCCESS',
  CREATE_FOLDER_FAILURE: 'CREATE_FOLDER_FAILURE',
  DELETE_FOLDER_SUCCESS: 'DELETE_FOLDER_SUCCESS',
  DELETE_FOLDER_FAILURE: 'DELETE_FOLDER_FAILURE',
  EMPTY_FOLDER_SUCCESS: 'EMPTY_FOLDER_SUCCESS',
  EMPTY_FOLDER_FAILURE: 'EMPTY_FOLDER_FAILURE',
  MOVE_MAP_TO_FOLDER_SUCCESS: 'MOVE_MAP_TO_FOLDER_SUCCESS',
  MOVE_MAPS_TO_FOLDER_SUCCESS: 'MOVE_MAPS_TO_FOLDER_SUCCESS',
  MOVE_MAPS_TO_FOLDER_FAILURE: 'MOVE_MAPS_TO_FOLDER_FAILURE',
  MOVE_FOLDER_TO_MAP_FAILURE: 'MOVE_FOLDER_TO_MAP_FAILURE'
};

// Action creators
export const loadDashboard = () => {
  return (dispatch, getState) => {
    api.loadDashboard()
    .then(data => dispatch({ type: actionTypes.LOAD_DASHBOARD_SUCCESS, data }))
    .catch(error => dispatch({ type: actionTypes.LOAD_DASHBOARD_FAILURE, error }));
  };
};

export const loadFolders = () => {
  return (dispatch, getState) => {
    api.loadFolders()
    .then(data => dispatch({ type: actionTypes.LOAD_FOLDERS_SUCCESS, data }))
    .catch(error => dispatch({ type: actionTypes.LOAD_FOLDERS_FAILURE, error }));
  };
};

export const createFolder = (name, parentFolder) => {
  return (dispatch, getState) => {
    api.createFolder(name, parentFolder)
    .then(data => dispatch({ type: actionTypes.CREATE_FOLDER_SUCCESS, data }))
    .catch(error => dispatch({ type: actionTypes.CREATE_FOLDER_FAILURE, error }));
  };
};

export const deleteFolder = (folder) => {
  return (dispatch, getState) => {
    api.deleteFolder(folder)
    .then(data => dispatch({ type: actionTypes.DELETE_FOLDER_SUCCESS, data }))
    .catch(error => dispatch({ type: actionTypes.DELETE_FOLDER_FAILURE, error }));
  };
};

export const emptyFolder = (folder) => {
  return (dispatch, getState) => {
    api.emptyFolder(folder.id, folder.maps.map(folder => folder.id))
    .then(data => dispatch({ type: actionTypes.EMPTY_FOLDER_SUCCESS, data, map: folder.maps }))
    .catch(error => dispatch({ type: actionTypes.EMPTY_FOLDER_FAILURE, error }));
  };
};

export const moveMapToFolder = (folderId, map) => {
  return (dispatch, getState) => {
    api.moveMapToFolder(folderId, map.id)
    .then(data => dispatch({ type: actionTypes.MOVE_MAP_TO_FOLDER_SUCCESS, data, map }))
    .catch(error => dispatch({ type: actionTypes.MOVE_FOLDER_TO_MAP_FAILURE, error }));
  };
};

export const moveMapsToFolder = (folderId, maps) => {
  const mapIds = maps.map((map) => (
    map.id
  ));

  return (dispatch, getState) => {
    api.moveMapToFolder(folderId, mapIds)
    .then(data => dispatch({ type: actionTypes.MOVE_MAPS_TO_FOLDER_SUCCESS, data, maps }))
    .catch(error => dispatch({ type: actionTypes.MOVE_MAPS_TO_FOLDER_FAILURE, error }));
  };
};

export const removeMapFromFolder = (map) => {
  return (dispatch, getState) => {
    api.emptyFolder(map.folder_id, map.id)
    .then(data => dispatch({ type: actionTypes.EMPTY_FOLDER_SUCCESS, data, map }))
    .catch(error => dispatch({ type: actionTypes.EMPTY_FOLDER_FAILURE, error }));
  };
};

export const deleteMap = (map) => {
  return (dispatch, getState) => {
    api.deleteMap(map)
    .then(data => dispatch({ type: actionTypes.DELETE_MAP_SUCCESS, data }))
    .catch(error => dispatch({ type: actionTypes.DELETE_MAP_FAILURE, error }));
  };
};

export const actions = {
  loadDashboard,
  moveMapsToFolder,
  moveMapToFolder,
  loadFolders,
  deleteMap,
  createFolder,
  removeMapFromFolder,
  deleteFolder
};
