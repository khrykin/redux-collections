'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.collection = collection;
exports.map = map;

var _actions = require('./actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /** @module redux-collections/reducers */

function decorateStateWithMixin(state, action, mixin) {
  return mixin ? mixin(state, action) : state;
}

function isArray(a, debug) {
  var type = Object.prototype.toString.call(a);
  return debug ? type : type === '[object Array]';
}

function collectionReducer(collection) {
  var parentId = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var mixin = arguments[2];

  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? { items: [] } : arguments[0];
    var action = arguments[1];


    var passThrough = !action || !action.collection || action.collection !== collection || typeof action.parentId !== 'undefined' && action.parentId !== parentId;

    if (passThrough) return decorateStateWithMixin(state, action, mixin);

    switch (action.type) {
      case _actions.COLLECTION_APPEND:
        return {
          items: [].concat(_toConsumableArray(state.items), _toConsumableArray(action.items))
        };

      case _actions.COLLECTION_PREPEND:
        return {
          items: [].concat(_toConsumableArray(action.items), _toConsumableArray(state.items))
        };

      case _actions.COLLECTION_REMOVE:
        var index = state.items.indexOf(action.id);

        var newState = [].concat(_toConsumableArray(state.items));

        if (index > -1) {
          newState.splice(index, 1);
        }
        return {
          items: newState
        };

      case _actions.COLLECTION_RESET:
        return {
          items: action.items
        };

      case _actions.COLLECTION_IS_APPENDING:
        return _extends({}, state, {
          isAppending: true
        });

      case _actions.COLLECTION_IS_PREPENDING:
        return _extends({}, state, {
          isPrepending: true
        });

      case _actions.COLLECTION_ERROR:
        return {
          items: state.items,
          error: action.error
        };

      case _actions.COLLECTION_IS_COMPLETE:
        return {
          items: state.items,
          isComplete: true
        };

      default:
        return decorateStateWithMixin(state, action, mixin);
    }
  };
}

function reduceChild(id, collections, state, action) {
  var child = _extends({}, state[id]);
  collections.forEach(function (collectionName) {
    child[collectionName] = collectionWithParentId(collectionName, id)(child[collectionName], action);
  });
  return _extends({}, state, _defineProperty({}, id, child));
};

function mapReducer(map, collections, mixin) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];


    var passThrough = !action || action.map !== map || collections && action.collection && action.parentId && collections.indexOf(action.collection) < 0;

    var updateChild = collections && action.collection && action.parentId && collections.indexOf(action.collection) > -1 && action.map && action.map === map && typeof state[action.parentId] !== 'undefined';

    if (passThrough) return decorateStateWithMixin(state, action, mixin);

    if (updateChild) {
      return reduceChild(action.parentId, collections, state, action);
    }

    switch (action.type) {
      case _actions.MAP_ADD:
        return _extends({}, state, action.items);
      case _actions.MAP_REMOVE:
        var newState = _extends({}, state);
        delete newState[action.id];
        return newState;

      case _actions.MAP_EDIT:
        return _extends({}, state, _defineProperty({}, action.id, _extends({}, state[action.id], action.props)));

      case _actions.MAP_IS_EDITING:
        return _extends({}, state, _defineProperty({}, action.id, _extends({}, state[action.id], {
          isEditing: true
        })));

      case _actions.MAP_IS_LOADING:
        return _extends({}, state, _defineProperty({}, action.id, _extends({}, state[action.id], {
          isLoading: true
        })));

      case _actions.MAP_ERROR:
        return _extends({}, state, _defineProperty({}, action.id, _extends({}, state[action.id], {
          error: action.error,
          isLoading: false
        })));

      case _actions.MAP_RESET:
        return _extends({}, action.items);

      default:
        return decorateStateWithMixin(state, action, mixin);
    }
  };
}

function collectionWithParentId(collection, parentId, mixin) {
  if (typeof collection !== 'string') {
    throw new TypeError('collection bust be a string, but got ' + (typeof collection === 'undefined' ? 'undefined' : _typeof(collection)));
  } else if (mixin && typeof mixin !== 'function') {
    throw new TypeError('mixin bust be a function, but got ' + (typeof mixin === 'undefined' ? 'undefined' : _typeof(mixin)));
  } else {
    return collectionReducer(collection, parentId, mixin);
  }
}

// EXPORTS

/**
 * Creates a reducer for ordered collection
 *
 * @param {string} collection - Name of collection
 * @param {function} [mixin] - Mixin reducer
 * @return {function} reducer
 */

function collection(collection, mixin) {
  return collectionWithParentId(collection, null, mixin);
}

/**
 * Creates a reducer for key: value map
 *
 * @param {string} map - Name of map
 * @param {array} [names] - Array of names of child ordered collections (if present)
 * @param {function} [mixin] - Mixin reducer
 * @return {function} reducer
 */

function map(map, collections, mixin) {
  if (typeof map !== 'string') {
    throw new TypeError('map bust be a string, but got ' + (typeof map === 'undefined' ? 'undefined' : _typeof(map)));
  } else if (collections && !isArray(collections)) {
    throw new TypeError('collections bust be an array, but got ' + isArray(collections, true));
  } else if (mixin && typeof mixin !== 'function') {
    throw new TypeError('mixin bust be a function, but got ' + (typeof mixin === 'undefined' ? 'undefined' : _typeof(mixin)));
  } else {
    return mapReducer(map, collections, mixin);
  }
}