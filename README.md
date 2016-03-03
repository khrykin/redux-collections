[![npm version](https://badge.fury.io/js/redux-collections.svg)](https://badge.fury.io/js/redux-collections)
[![Build Status](https://travis-ci.org/khrykin/redux-collections.svg?branch=master)](https://travis-ci.org/khrykin/redux-collections)

# Redux Collections
#### One-liners for creating redux reducers for scrollable, editable lists. No dependencies.

This module provides methods for creating reducers for ordered or key-value state to be used in [redux](https://github.com/reactjs/redux) apps.

## Usage
Using tools like [normalizr](https://github.com/gaearon/normalizr) one can store backend responses in normalized form, such as:

```javasript
{
  posts: {
    'on-the-electrodynamics-of-moving-bodies': {
      title: "Hello",
      author: 15,
      comments: {
        items: [1, 4, 5]
      },
      likers: {
        error: "Network Timeout"
        items: [1, 5, 3, 7]
      }
    },
    'on-physical-lines-of-force': { /* ... */ },
    /* ... */
  },

  comments: {
    1: {
      author: 2,
      text: "Some text",
      isUpdating: true
     },
     2: { /* ... */ },
     /* ... */
  },

  users: {
    1: { name: "Kierkegaard" },
    2: { name: "Hegel" },
    /* ... */
  },

  recentPosts: {
    items: ['on-physical-lines-of-force', /*, ... */],
    isLoading: true,
  },
}

/* etc. */
```

Aim of this package is to maintain such a structures, including appending, prepending, and setting loading and error states.

### Creating Store

```javascript

import { combineReducers, createStore} from 'redux';

import {
  collection,
  map,

  collectionIsAppending,
  mapAdd,
  collectionAppend,
  collectionError
  /* , ...  
    See list of available action creators below
  */
  } from 'redux-collections';


const reducer = combineReducers({
    posts: map('posts', ['comments', 'likers']),
    users: map('users'),
    comments: map('comments'),
    recentPosts: collection('recentPosts')
  });

const store = createStore(reducer);

const { dispatch } = store;
```

### Dispatching Actions

```javascript

/* Somewhere before fetching response */

  dispatch(collectionIsAppending('recentPosts'))

/* Somewhere after fetching and normalizing response */

  dispatch(mapAdd('posts', {
      'elements': { /* ... */ },
      'philosophiae-naturalis': { /* ... */ }
      /*, ... */
  }));

  dispatch(mapAdd('users', {
      12: { /* ... */ },
      13: { /* ... */ }
      /*, ... */
  }));

  dispatch(mapAdd('comments',  {
      115: { /* ... */ },
      116: { /* ... */ }
      /*, ... */
  }));

  dispatch(collectionAppend('recentPosts', [
    'elements',
    'philosophiae-naturalis'
    /*, ... */
  ]);

  /* Somewhere after fetch error */

  dispatch(collectionError('recentPosts', 'Network Timeout'));

```
Fetching child collection:

```javascript

  dispatch(collectionIsAppending(
    'comments',
    'posts',
    'philosophiae-naturalis'
  ));

  dispatch(mapAdd('comments', /* ... */ );

  dispatch(collectionPrepend(
    'comments',
    [ 18, 19 /*, ... */],
    'posts',
    'philosophiae-naturalis'
  );

```
## Modules

<dl>
<dt><a href="#module_redux-collections/actionCreators">redux-collections/actionCreators</a></dt>
<dd></dd>
<dt><a href="#module_redux-collections/reducers">redux-collections/reducers</a></dt>
<dd></dd>
</dl>

<a name="module_redux-collections/actionCreators"></a>
## redux-collections/actionCreators

* [redux-collections/actionCreators](#module_redux-collections/actionCreators)
    * [~collectionAppend](#module_redux-collections/actionCreators..collectionAppend) ⇒ <code>Object</code>
    * [~collectionPrepend](#module_redux-collections/actionCreators..collectionPrepend) ⇒ <code>Object</code>
    * [~collectionIsAppending](#module_redux-collections/actionCreators..collectionIsAppending) ⇒ <code>Object</code>
    * [~collectionIsPrepending](#module_redux-collections/actionCreators..collectionIsPrepending) ⇒ <code>Object</code>
    * [~collectionRemove](#module_redux-collections/actionCreators..collectionRemove) ⇒ <code>Object</code>
    * [~collectionReset](#module_redux-collections/actionCreators..collectionReset) ⇒ <code>Object</code>
    * [~collectionError](#module_redux-collections/actionCreators..collectionError) ⇒ <code>Object</code>
    * [~collectionIsComplete](#module_redux-collections/actionCreators..collectionIsComplete) ⇒ <code>Object</code>
    * [~mapAdd](#module_redux-collections/actionCreators..mapAdd) ⇒ <code>Object</code>
    * [~mapRemove](#module_redux-collections/actionCreators..mapRemove) ⇒ <code>Object</code>
    * [~mapEdit](#module_redux-collections/actionCreators..mapEdit) ⇒ <code>Object</code>
    * [~mapIsEditing](#module_redux-collections/actionCreators..mapIsEditing) ⇒ <code>Object</code>
    * [~mapReset](#module_redux-collections/actionCreators..mapReset) ⇒ <code>Object</code>

<a name="module_redux-collections/actionCreators..collectionAppend"></a>
### redux-collections/actionCreators~collectionAppend ⇒ <code>Object</code>
Appends items to the collection

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| items | <code>array</code> |  |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..collectionPrepend"></a>
### redux-collections/actionCreators~collectionPrepend ⇒ <code>Object</code>
Prepends items to the collection

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| items | <code>array</code> |  |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..collectionIsAppending"></a>
### redux-collections/actionCreators~collectionIsAppending ⇒ <code>Object</code>
Sets `isAppending` state on the collection

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| items | <code>array</code> |  |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..collectionIsPrepending"></a>
### redux-collections/actionCreators~collectionIsPrepending ⇒ <code>Object</code>
Sets `isPrepending` state on the collection

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..collectionRemove"></a>
### redux-collections/actionCreators~collectionRemove ⇒ <code>Object</code>
Removes item from collection

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| id | <code>string</code> | Element of array to remove |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..collectionReset"></a>
### redux-collections/actionCreators~collectionReset ⇒ <code>Object</code>
Completely resets collection state with new items

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| items | <code>array</code> |  |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..collectionError"></a>
### redux-collections/actionCreators~collectionError ⇒ <code>Object</code>
Sets error on collection

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| items | <code>string</code> &#124; <code>object</code> |  |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..collectionIsComplete"></a>
### redux-collections/actionCreators~collectionIsComplete ⇒ <code>Object</code>
Sets `isComplete` state on collection

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> |  |
| [map] | <code>string</code> | Name of parent map where collection lives |
| [parentId] | <code>Number</code> &#124; <code>String</code> | Key of parent map where collection lives |

<a name="module_redux-collections/actionCreators..mapAdd"></a>
### redux-collections/actionCreators~mapAdd ⇒ <code>Object</code>
Merges given object with the map

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>string</code> | Name of the map |
| items | <code>Object</code> | Object to merge with the map |

<a name="module_redux-collections/actionCreators..mapRemove"></a>
### redux-collections/actionCreators~mapRemove ⇒ <code>Object</code>
Removes object from map at given key

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>string</code> | Name of the map |
| id | <code>Number</code> | Key of object in map |

<a name="module_redux-collections/actionCreators..mapEdit"></a>
### redux-collections/actionCreators~mapEdit ⇒ <code>Object</code>
Resets object at given key in map

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>string</code> | Name of the map |
| id | <code>Number</code> | Key of object in map |
| item | <code>Object</code> | Object to place at given key in map |

<a name="module_redux-collections/actionCreators..mapIsEditing"></a>
### redux-collections/actionCreators~mapIsEditing ⇒ <code>Object</code>
Sets `isEditing` state on object at given key in map

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>string</code> | Name of the map |
| id | <code>Number</code> | Key of object in map |

<a name="module_redux-collections/actionCreators..mapReset"></a>
### redux-collections/actionCreators~mapReset ⇒ <code>Object</code>
Completely resets map with given object

**Kind**: inner property of <code>[redux-collections/actionCreators](#module_redux-collections/actionCreators)</code>  
**Returns**: <code>Object</code> - action  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>string</code> | Name of the map |
| items | <code>Object</code> | New map state |

<a name="module_redux-collections/reducers"></a>
## redux-collections/reducers

* [redux-collections/reducers](#module_redux-collections/reducers)
    * [~collection(collection)](#module_redux-collections/reducers..collection) ⇒ <code>function</code>
    * [~map(map, [names])](#module_redux-collections/reducers..map) ⇒ <code>function</code>

<a name="module_redux-collections/reducers..collection"></a>
### redux-collections/reducers~collection(collection) ⇒ <code>function</code>
Creates a reducer for ordered collection

**Kind**: inner method of <code>[redux-collections/reducers](#module_redux-collections/reducers)</code>  
**Returns**: <code>function</code> - reducer  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | Name of collection |

<a name="module_redux-collections/reducers..map"></a>
### redux-collections/reducers~map(map, [names]) ⇒ <code>function</code>
Creates a reducer for key: value map

**Kind**: inner method of <code>[redux-collections/reducers](#module_redux-collections/reducers)</code>  
**Returns**: <code>function</code> - reducer  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>string</code> | Name of map |
| [names] | <code>array</code> | Array of names of child ordered collections (if present) |

## Contributing

`npm run build`, `npm test`, MIT, etc.
