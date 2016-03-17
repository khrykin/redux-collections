'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapReset = exports.mapIsLoading = exports.mapIsEditing = exports.mapEdit = exports.mapRemove = exports.mapAdd = exports.collectionIsComplete = exports.collectionError = exports.collectionReset = exports.collectionRemove = exports.collectionIsPrepending = exports.collectionIsAppending = exports.collectionPrepend = exports.collectionAppend = exports.dummy = undefined;

var _actions = require('./actions');

function makeActionCreator(type) {
  for (var _len = arguments.length, argNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argNames[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var action = { type: type };
    argNames.forEach(function (arg, index) {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

// Workaround for jsdoc2md not generting
// info for first export

/** @module redux-collections/actionCreators */

var dummy = exports.dummy = function dummy() {};

/**
 * Appends items to the collection
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionAppend = exports.collectionAppend = makeActionCreator(_actions.COLLECTION_APPEND, 'collection', 'items', 'map', 'parentId');

/**
 * Prepends items to the collection
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionPrepend = exports.collectionPrepend = makeActionCreator(_actions.COLLECTION_PREPEND, 'collection', 'items', 'map', 'parentId');

/**
 * Sets `isAppending` state on the collection
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionIsAppending = exports.collectionIsAppending = makeActionCreator(_actions.COLLECTION_IS_APPENDING, 'collection', 'map', 'parentId');

/**
 * Sets `isPrepending` state on the collection
 *
 * @param {string} collection
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionIsPrepending = exports.collectionIsPrepending = makeActionCreator(_actions.COLLECTION_IS_PREPENDING, 'collection', 'map', 'parentId');

/**
 * Removes item from collection
 *
 * @param {string} collection
 * @param {string} id - Element of array to remove
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionRemove = exports.collectionRemove = makeActionCreator(_actions.COLLECTION_REMOVE, 'collection', 'id', 'map', 'parentId');

/**
 * Completely resets collection state with new items
 *
 * @param {string} collection
 * @param {array} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionReset = exports.collectionReset = makeActionCreator(_actions.COLLECTION_RESET, 'collection', 'items', 'map', 'parentId');

/**
 * Sets error on collection
 *
 * @param {string} collection
 * @param {string | object} items
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionError = exports.collectionError = makeActionCreator(_actions.COLLECTION_ERROR, 'collection', 'error', 'map', 'parentId');

/**
 * Sets `isComplete` state on collection
 *
 * @param {string} collection
 * @param {string} [map=undefined] - Name of parent map where collection lives
 * @param {Number|String} [parentId=undefined] - Key of parent map where collection lives
 * @return {Object} action
 */

var collectionIsComplete = exports.collectionIsComplete = makeActionCreator(_actions.COLLECTION_IS_COMPLETE, 'collection', 'map', 'parentId');

/**
 * Merges given object with the map
 *
 * @param {string} map - Name of the map
 * @param {Object} items - Object to merge with the map
 * @return {Object} action
 */

var mapAdd = exports.mapAdd = makeActionCreator(_actions.MAP_ADD, 'map', 'items');

/**
 * Removes object from map at given key
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @return {Object} action
 */

var mapRemove = exports.mapRemove = makeActionCreator(_actions.MAP_REMOVE, 'map', 'id');

/**
 * Inject props with merging at given key in map
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @param {Object} props - Object with edited props
 * @return {Object} action
 */

var mapEdit = exports.mapEdit = makeActionCreator(_actions.MAP_EDIT, 'map', 'id', 'props');

/**
 * Sets `isEditing` state on object at given key in map
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @return {Object} action
 */

var mapIsEditing = exports.mapIsEditing = makeActionCreator(_actions.MAP_IS_EDITING, 'map', 'id');

/**
 * Sets `isLoading` state on object at given key in map
 *
 * @param {string} map - Name of the map
 * @param {Number} id - Key of object in map
 * @return {Object} action
 */

var mapIsLoading = exports.mapIsLoading = makeActionCreator(_actions.MAP_IS_LOADING, 'map', 'id');

/**
 * Completely resets map with given object
 *
 * @param {string} map - Name of the map
 * @param {Object} items - New map state
 * @return {Object} action
 */

var mapReset = exports.mapReset = makeActionCreator(_actions.MAP_RESET, 'map', 'items');