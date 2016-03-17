import expect from 'expect';

import {
  collection,
  map,

  collectionAppend,
  collectionPrepend,
  collectionRemove,
  collectionReset,
  collectionIsAppending,
  collectionIsPrepending,
  collectionComplete,
  collectionError,
  collectionIsComplete,

  mapAdd,
  mapRemove,
  mapEdit,
  mapIsEditing,
  mapIsLoading,
  mapError,
  mapReset,
} from '../lib';

const json = JSON.stringify;

const mixin = (state, action) => {
  switch (action.type) {
    case "TEST":
      return { test: true }
    default:
      return state;
  }
};

describe('redux-collections', () => {

  describe('collection', () => {

    it(`should be defined`, () =>  {
      expect(collection).toExist();
    });

    it(`should return function when name is present`, () =>  {
      expect(typeof collection('name')).toEqual('function');
    });

    it(`should throw when name isn't present`, () => {
      expect(() => collection()).toThrow(TypeError);
    });

    it(`should throw if mixin is not a function`, () => {
      expect(() => collection('name', 'mixin')).toThrow(TypeError);
    });

    describe('collectionReducer', function () {
      beforeEach(function () {
        this.reducer = collection('posts', mixin);
      });

      // it('should return same state for foreign parentId', function () {
      //   const state = collection('posts');
      //
      //   expect(json(this.reducer(state,
      //     collectionAppend('posts', [1], 'posts', 2)
      //   )))
      //   .toEqual(json(state));
      // });

      beforeEach(function () {
        this.state = { items: [1, 2, 3] };
      });

      it('should append items', function () {
        expect(json(this.reducer(this.state,
          collectionAppend('posts', [4, 5, 6])
        )))
        .toEqual(json({ items: [1, 2, 3, 4, 5, 6] }))
      });

      it('should prepend items', function () {
        this.state = { items: [4,5,6] };
        expect(json(this.reducer(this.state,
          collectionPrepend('posts', [1, 2, 3])
        )))
        .toEqual(json({ items: [1, 2, 3, ...this.state.items] }))
      });

      it('should set isAppending', function () {
        expect(json(this.reducer(this.state,
          collectionIsAppending('posts')
        )))
        .toEqual(json({ ...this.state, isAppending: true }));
      });

      it('should set isPrepending', function () {
        expect(json(this.reducer(this.state,
          collectionIsPrepending('posts')
        )))
        .toEqual(json({ ...this.state, isPrepending: true }));
      });

      it('should remove items', function () {
        expect(json(this.reducer(this.state,
          collectionRemove('posts', 2)
        )))
        .toEqual(json({ items: [1, 3] }));
      });

      it('should reset state', function () {
        expect(json(this.reducer(this.state,
          collectionReset('posts', [4, 5, 6])
        )))
        .toEqual(json({ items: [4, 5, 6] }));
      });

      it('should set error', function () {
        expect(json(this.reducer(this.state,
          collectionError('posts', 'Error')
        )))
        .toEqual(json({...this.state, error: 'Error' }));
      });

      it('should set isComplete state', function () {
        expect(json(this.reducer(this.state,
          collectionIsComplete('posts')
        )))
        .toEqual(json({ ...this.state, isComplete: true }));
      });

      it('should appy mixin reducer', function () {
        expect(json(this.reducer(this.state, { type: 'TEST' })))
        .toEqual(json({ test: true }));
      });

    });

  });


  describe('map', () => {

    it(`should be defined`, () =>  {
      expect(map).toExist();
    });

    it(`should return function when name is present`, () =>  {
      expect(typeof map('name')).toEqual('function');
    });

    it(`should throw when name is not present`, () =>  {
      expect(() => map()).toThrow(TypeError);
    });

    it(`should throw if mixin is not a function`, () =>  {
      expect(() => map('name', null, 'mixin')).toThrow(TypeError);
    });

    it(`should throw when collections is present and not an array`, () =>  {
      expect(() => map('name', 3)).toThrow(TypeError);
    });

    describe('mapReducer', function () {
      beforeEach(function () {
        this.reducer = map('posts', ['comments', 'events'], mixin);
      });

      it('should return same state for another map', function () {
        const state = { 1: {}, 2: {}, 3: {} };

        expect(json(this.reducer(state,
          mapAdd('users', { 4: {} })
        )))
        .toEqual(json(state));
      })

      beforeEach(function () {
        this.state = {
          1: {
            comments: {
              items: [1, 2, 3]
            },
            events: {
              items: [1, 2, 3]
            }
          },
          2: {
            comments: {
              items: [4, 5, 6]
            },
            events: {
              items: [4, 5, 6]
            }
          }
        };
      });

      it('should return same state for another map', function () {
        expect(json(this.reducer(this.state,
          collectionAppend('collection', [7, 8, 9], 'posts', 1)
        )))
        .toEqual(json(this.state));
      });

      it('should return same state for foreign map and same child collection', function () {
        expect(json(this.reducer(this.state,
          collectionAppend('cats', [7, 8, 9], 'events', 1)
        )))
        .toEqual(json(this.state));
      });

      it('should return same state if parentId is not present in parent collection', function () {
        expect(json(this.reducer(this.state,
          collectionAppend('comments', [7, 8, 9], 'posts', 3)
        )))
        .toEqual(json(this.state));
      });

      it('should add map', function () {
        expect(json(this.reducer(this.state,
          mapAdd('posts', { 3: { title: 'hello' } })
        )))
        .toEqual(json({ ...this.state, 3: { title: 'hello' }} ));
      });

      it('should remove map', function () {
        expect(json(this.reducer(this.state,
          mapRemove('posts', 2)
        )))
        .toEqual(json({ 1: this.state[1] }));
      });

      it('should edit map', function () {
        expect(json(this.reducer(this.state,
          mapEdit('posts', 2, { title: 'Edited' })
        )))
        .toEqual(json({ ...this.state, 2: {
          ...this.state[2],
          title: 'Edited'
        } }));
      });

      it('should set isEditing', function () {
        expect(json(this.reducer(this.state,
          mapIsEditing('posts', 1)
        )[1]))
        .toEqual(json({ ...this.state[1], isEditing: true }));
      });

      it('should set isLoading', function () {
        expect(json(this.reducer(this.state,
          mapIsLoading('posts', 1)
        )[1]))
        .toEqual(json({ ...this.state[1], isLoading: true }));
      });

      it('should set error', function () {
        expect(json(this.reducer(this.state,
          mapError('posts', 1, "Error")
        )[1]))
        .toEqual(json({ ...this.state[1], error: "Error", isLoading: false }));
      });

      it('should reset map', function () {
        expect(json(this.reducer(this.state,
          mapReset('posts', { 1: { title: 'Reseted' } })
        )))
        .toEqual(json({ 1: {  title: 'Reseted' } }));
      });

      it('should append child collection', function () {
        expect(json(this.reducer(this.state,
          collectionAppend('comments', [4, 5, 6], 'posts', 1)
        )[1].comments.items))
        .toEqual(json([1, 2, 3, 4, 5, 6]));

        expect(json(this.reducer(this.state,
          collectionAppend('events', [4, 5, 6], 'posts', 1)
        )[1].events.items))
        .toEqual(json([1, 2, 3, 4, 5, 6]));
      });

      it('should prepend child collection', function () {
        expect(json(this.reducer(this.state,
          collectionPrepend('comments', [4, 5, 6], 'posts', 1)
        )[1].comments.items))
        .toEqual(json([4, 5, 6, 1, 2, 3]));
      });

      it('should set isAppending to child collection', function () {
        expect(this.reducer(this.state,
          collectionIsAppending('comments', 'posts', 1)
        )[1].comments.isAppending)
        .toEqual(true);
      });

      it('should set isPrepending to child collection', function () {
        expect(this.reducer(this.state,
          collectionIsPrepending('comments', 'posts', 1)
        )[1].comments.isPrepending)
        .toEqual(true);
      });

      it('should remove items from child collection', function () {
        expect(json(this.reducer(this.state,
          collectionRemove('comments', 1, 'posts', 1)
        )[1].comments.items))
        .toEqual(json([2, 3]));
      });

      it('should reset child collection state', function () {
        expect(json(this.reducer(this.state,
          collectionReset('comments', [ 1 ], 'posts', 1)
        )[1].comments))
        .toEqual(json({ items: [ 1 ] }));
      });

      it('should set child collection error', function () {
        expect(json(this.reducer(this.state,
          collectionError('comments', 'Error', 'posts', 1)
        )[1].comments))
        .toEqual(json({ items: [ 1, 2, 3 ], error: 'Error' }));
      });

      it('should set `isComplete` state on child collection', function () {
        expect(json(this.reducer(this.state,
          collectionIsComplete('comments', 'posts', 1)
        )[1].comments))
        .toEqual(json({ items: [ 1, 2, 3 ], isComplete: true }));
      });

      it('should appy mixin reducer', function () {
        expect(json(this.reducer(this.state, { type: 'TEST' })))
        .toEqual(json({ test: true }));
      });

    });

  });
});
