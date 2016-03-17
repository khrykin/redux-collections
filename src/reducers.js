/** @module redux-collections/reducers */

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
  MAP_RESET,
} from './actions';


function decorateStateWithMixin(state, action, mixin) {
  return mixin ? mixin(state, action) : state;
}

function isArray(a, debug) {
  const type = Object.prototype.toString.call( a );
  return debug ? type : type === '[object Array]';
}

function collectionReducer(collection, parentId=null, mixin) {
  return (state = { items: [] }, action) => {

    const passThrough = (
      !action ||
      !action.collection ||
      action.collection !== collection ||
      (typeof action.parentId !== 'undefined' && action.parentId !== parentId)
    );

    if (passThrough) return decorateStateWithMixin(state, action, mixin);

    switch (action.type) {
      case COLLECTION_APPEND:
        return {
          items: [
            ...state.items,
            ...action.items
          ]
        };

      case COLLECTION_PREPEND:
        return {
          items: [
            ...action.items,
            ...state.items
          ]
        };

      case COLLECTION_REMOVE:
        const index
          = state.items.indexOf(action.id);

        let newState = [...state.items];

        if (index > -1) {
          newState.splice(index, 1);
        }
        return {
          items: newState
        };

      case COLLECTION_RESET:
        return {
          items: action.items
        };

      case COLLECTION_IS_APPENDING:
        return {
          ...state,
          isAppending: true,
        };

      case COLLECTION_IS_PREPENDING:
        return {
          ...state,
          isPrepending: true,
        };

      case COLLECTION_ERROR:
        return {
          items: state.items,
          error: action.error
        };

      case COLLECTION_IS_COMPLETE:
        return {
          items: state.items,
          isComplete: true
        };

      default:
        return decorateStateWithMixin(state, action, mixin);
    }
  }
}

function reduceChild(id, collections, state, action) {
  let child = { ...state[id] };
  collections.forEach(collectionName => {
    child[collectionName] = collectionWithParentId(collectionName, id)(child[collectionName] , action);
  });
  return {
    ...state,
    [id]: child
  };
};



function mapReducer(map, collections, mixin) {
  return (state = {}, action) => {

    const passThrough = (
      !action || action.map !== map ||
      (
        collections &&
        action.collection &&
        action.parentId &&
        collections.indexOf(action.collection) < 0
      )
    );

    const updateChild = (
      collections &&
      action.collection &&
      action.parentId &&
      collections.indexOf(action.collection) > -1 &&
      action.map &&
      action.map === map &&
      typeof state[action.parentId] !== 'undefined'
    );

    if (passThrough) return decorateStateWithMixin(state, action, mixin);

    if (updateChild) {
      return reduceChild(action.parentId, collections, state, action);
    }

    switch (action.type) {
      case MAP_ADD:
        return {
          ...state,
          ...action.items
        }
      case MAP_REMOVE:
        let newState = {...state};
        delete newState[action.id];
        return newState;

      case MAP_EDIT:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            ...action.props
          }
        }

      case MAP_IS_EDITING:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            isEditing: true
          }
        }

      case MAP_IS_LOADING:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            isLoading: true
          }
        }

      case MAP_RESET:
        return { ...action.items };

      default:
        return decorateStateWithMixin(state, action, mixin);
    }
  }
}



function collectionWithParentId(collection, parentId, mixin) {
  if (typeof collection !== 'string') {
    throw new TypeError(`collection bust be a string, but got ${typeof collection}`)
  } else if (
      mixin &&
      typeof mixin !== 'function'
    ) {
      throw new TypeError(`mixin bust be a function, but got ${typeof mixin}`)
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

export function collection(collection, mixin) {
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

export function map(map, collections, mixin) {
  if (typeof map !== 'string') {
    throw new TypeError(`map bust be a string, but got ${typeof map}`)
  } else if (
      collections &&
      !isArray(collections)
    ){
      throw new TypeError(`collections bust be an array, but got ${isArray(collections, true)}`);
  } else if (
      mixin &&
      typeof mixin !== 'function'
    ) {
      throw new TypeError(`mixin bust be a function, but got ${typeof mixin}`)
  } else {
    return mapReducer(map, collections, mixin);
  }
}
