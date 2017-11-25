import update from 'react-addons-update';

// Helpers
const mapIndex = (maps, id) => (
  maps.findIndex(element => element.id === id)
);

const foldIndex = (folders, id) => (
  folders.findIndex(element => element.id === id)
);

// Action Handlers
//
// For some reason importing actionTypes from 'actions/dashboard' does not work.
// Using plain strings for the moment.
const ACTION_HANDLERS = {
  'LOAD_DASHBOARD_SUCCESS': (state, action) => (
    { ...state, maps: action.data, mapsLoaded: true }
  ),
  'LOAD_DASHBOARD_FAILURE': (state, action) => (
    { ...state, maps: [], mapsLoaded: true }
  ),
  'LOAD_FOLDERS_SUCCESS': (state, action) => (
    { ...state, folders: action.data, dashboardLoaded: true }
  ),
  'LOAD_FOLDERS_FAILURE': (state, action) => (
    { ...state, folders: [], dashboardLoaded: true }
  ),
  'DELETE_MAP_SUCCESS': (state, action) => {
    const index = mapIndex(state.maps, action.data.id);

    return {
      ...state,
      maps: state.maps.slice(0, index).concat(state.maps.slice(index + 1))
    };
  },
  'DELETE_MAP_FAILURE': (state, action) => {
    return state;
  },
  'CREATE_FOLDER_SUCCESS': (state, action) => {
    // Check if the new folder is a subfolder.
    const newFolder = action.data;
    let { folders } = state;

    if (newFolder.folder_id) {
      const index = foldIndex(folders, newFolder.folder_id);

      folders = update(folders, {
        [index]: {$apply: (folder) => {
          if (!folder) { return null; }
          folder.folders.push(newFolder);
          return folder;
        }}
      });
    }

    return { ...state, folders: folders.concat(action.data) };
  },
  'DELETE_FOLDER_SUCCESS': (state, action) => {
    // Check if the deleted folder is a subfolder.
    const deletedFolder = action.data;
    let { folders } = state;

    if (deletedFolder.folder_id) {
      const index = foldIndex(folders, deletedFolder.folder_id);

      folders = update(folders, {
        [index]: {$apply: (folder) => {
          if (!folder) { return null; }
          const subfolderIndex = foldIndex(folder.folders, deletedFolder.id);
          folder.folders = folder.folders.slice(0, subfolderIndex).concat(folder.folders.slice(subfolderIndex + 1));
          return folder;
        }}
      });
    }

    const index = foldIndex(folders, action.data.id);

    return {
      ...state,
      folders: folders.slice(0, index).concat(folders.slice(index + 1))
    };
  },
  'EMPTY_FOLDER_SUCCESS': (state, action) => {
    const folder = action.data;
    const index = mapIndex(state.folders, folder.id);

    // If the target folder is a subfolder we need to update
    // the parent folder too.
    const parentFolderIndex = foldIndex(state.folders, folder.folder_id);

    let folders;

    if (parentFolderIndex > -1) {
      folders = update(state.folders, {
        [parentFolderIndex]: {$apply: (folder) => {
          if (!folder) { return null; }

          const folderIndex = foldIndex(folder.folders, action.data.id);
          folder.folders[folderIndex] = action.data;
          return folder;
        }}
      });
    }

    folders = update(state.folders, {
      [index]: { $set: folder }
    });

    return {
      ...state,
      maps: state.maps.concat(action.map),
      folders: folders
    };
  },
  'MOVE_MAP_TO_FOLDER_SUCCESS': (state, action) => {
    const folder = action.data;
    const index = mapIndex(state.folders, folder.id);

    // The map might be already in a different folder
    const folderIndex = mapIndex(state.folders, action.map.folder_id);

    // If the target folder is a subfolder we need to update
    // the parent folder too.
    const parentFolderIndex = foldIndex(state.folders, folder.folder_id);

    let folders;
    if (folderIndex > -1) {
      folders = update(state.folders, {
        [folderIndex]: {$apply: (folder) => {
          if (!folder) { return null; }

          folder.maps = folder.maps
            ? folder.maps.filter((map) => (map.id !== action.map.id))
            : folder.maps;
          return folder;
        }}
      });
    }

    if (parentFolderIndex > -1) {
      folders = update(state.folders, {
        [parentFolderIndex]: {$apply: (folder) => {
          if (!folder) { return null; }

          const folderIndex = foldIndex(folder.folders, action.data.id);
          folder.folders[folderIndex] = action.data;
          return folder;
        }}
      });
    }

    folders = update(state.folders, {
      [index]: { $set: folder }
    });

    return {
      ...state,
      maps: state.maps.filter(map => map.id !== action.map.id),
      folders: folders
    };
  },
  'MOVE_MAPS_TO_FOLDER_SUCCESS': (state, action) => {
    const folder = action.data;
    const nextMaps = action.maps;
    const nextMapsIds = nextMaps.map((m) => (m.id));
    const index = mapIndex(state.folders, folder.id);
    let folders = state.folders;

    nextMaps.forEach((nextMap) => {
      // The map might be already in a different folder
      const folderIndex = mapIndex(state.folders, nextMap.folder_id);

      if (folderIndex > -1) {
        folders = update(folders, {
          [folderIndex]: {$apply: (folder) => {
            if (!folder) { return null; }

            folder.maps = folder.maps
              ? folder.maps.filter((map) => (map.id !== nextMap.id))
              : folder.maps;
            return folder;
          }}
        });
      }
    });

    // If the target folder is a subfolder we need to update
    // the parent folder too.
    const parentFolderIndex = foldIndex(state.folders, folder.folder_id);

    if (parentFolderIndex > -1) {
      folders = update(folders, {
        [parentFolderIndex]: {$apply: (folder) => {
          if (!folder) { return null; }

          const folderIndex = foldIndex(folder.folders, action.data.id);
          folder.folders[folderIndex] = action.data;
          return folder;
        }}
      });
    }

    folders = update(folders, {
      [index]: { $set: folder }
    });

    return {
      ...state,
      maps: state.maps.filter(map => !nextMapsIds.includes(map.id)),
      folders: folders
    };
  }
};

// Reducer
const initialState = {
  dashboardLoaded: false,
  mapsLoaded: false,
  maps: [],
  folders: []
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
