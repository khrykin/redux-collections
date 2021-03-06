/** @module redux-collections/actionCreators */

import {
  COLLECTION_APPEND,
  COLLECTION_PREPEND,
  COLLECTION_REMOVE,
  COLLECTION_RESET,
  COLLECTION_IS_APPENDING,
  COLLECTION_IS_PREPENDING,
  COLLECTION_ERROR,
  COLLECTION_IS_COMPLETE,

  MAP_ADD,
  MAP_REMOVE,
  MAP_EDIT,
  MAP_IS_EDITING,
  MAP_IS_LOADING,
  MAP_ERROR,
  MAP_RESET,
} from './actions';


function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action;
  }
}

// Workaround for jsdoc2md not generting
// info for first export

export const dummy = () => {};

/**
 * Appends items to the collection
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionAppend =
  makeActionCreator(COLLECTION_APPEND,
    'collection',
    'items',
    'map',
    'parentId'
  );

/**
 * Prepends items to the collection
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionPrepend =
  makeActionCreator(COLLECTION_PREPEND,
    'collection',
    'items',
    'map',
    'parentId'
  );

/**
 * Sets `isAppending` state on the collection
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionIsAppending =
  makeActionCreator(COLLECTION_IS_APPENDING,
    'collection',
    'map',
    'parentId'
  );

/**
 * Sets `isPrepending` state on the collection
 *
 * @param {string} collection
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionIsPrepending =
  makeActionCreator(COLLECTION_IS_PREPENDING,
    'collection',
    'map',
    'parentId'
  );

/**
 * Removes item from collection
 *
 * @param {string} collection
 * @param {string} id - Element of array to remove
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionRemove =
  makeActionCreator(COLLECTION_REMOVE,
    'collection',
    'id',
    'map',
    'parentId'
  );


/**
 * Completely resets collection state with new items
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionReset =
  makeActionCreator(COLLECTION_RESET,
    'collection',
    'items',
    'map',
    'parentId'
  );

/**
 * Sets error on collection
 *
 * @param {string} collection
 * @param {string | object} error
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionError =
  makeActionCreator(COLLECTION_ERROR,
    'collection',
    'error',
    'map',
    'parentId'
  );

/**
 * Sets `isComplete` state on collection
 *
 * @param {string} collection
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

export const collectionIsComplete =
  makeActionCreator(COLLECTION_IS_COMPLETE,
    'collection',
    'map',
    'parentId'
  );

/**
 * Merges given object with the map
 *
 * @param {string} map - Name of the map
 * @param {Object} items - Object to merge with the map
 * @return {Object} action
 */

export const mapAdd =
  makeActionCreator(MAP_ADD,
    'map',
    'items'
  );

/**
 * Removes object from map at given key
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @return {Object} action
 */

export const mapRemove =
  makeActionCreator(MAP_REMOVE,
    'map',
    'id'
  );

/**
 * Inject props with merging at given key in map
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @param {Object} props - Object with edited props
 * @return {Object} action
 */

export const mapEdit =
  makeActionCreator(MAP_EDIT,
    'map',
    'id',
    'props'
  );


/**
 * Sets `isEditing` state on object at given key in map
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @return {Object} action
 */

export const mapIsEditing =
  makeActionCreator(MAP_IS_EDITING,
    'map',
    'id'
  );

/**
 * Sets `isLoading` state on object at given key in map
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @return {Object} action
 */

export const mapIsLoading =
  makeActionCreator(MAP_IS_LOADING,
    'map',
    'id'
  );


/**
 * Sets error on object at given key in map
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @param {string|object} error  - Key of object in map
 * @return {Object} action
 */

export const mapError =
  makeActionCreator(MAP_ERROR,
    'map',
    'id',
    'error'
  );

/**
 * Completely resets map with given object
 *
 * @param {string} map - Name of the map
 * @param {Object} items - New map state
 * @return {Object} action
 */

export const mapReset =
  makeActionCreator(MAP_RESET,
    'map',
    'items'
  );
