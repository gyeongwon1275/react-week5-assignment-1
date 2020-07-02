import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import {
  loadRegions, setInitRegions, loadCategories, setInitCategories,
} from './action';

import { regions, categories, restaurants } from '../__fixture__/data';

import { fetchRestaurants } from './services/api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function onFetch(data) {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));

  beforeEach(() => {
    fetch.mockClear();
  });
}

function setRestaurants(initRestaurants) {
  return {
    type: 'setRestaurants',
    payload: {
      restaurants: initRestaurants,
    },
  };
}

function loadRestaurants(regionName, categoryId) {
  return async (dispatch) => {
    const initRestaurants = await fetchRestaurants(regionName, categoryId);
    dispatch(setRestaurants(initRestaurants));
  };
}

describe('acton', () => {
  describe('loadRegions', () => {
    it('load Regions', () => {
      const store = mockStore({});

      onFetch(regions);

      return store.dispatch(loadRegions()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(setInitRegions(regions));
      });
    });
  });

  describe('loadCategories', () => {
    it('load Categories', () => {
      const store = mockStore({});

      onFetch(categories);

      return store.dispatch(loadCategories()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(setInitCategories(categories));
      });
    });
  });

  describe('loadRestaurants', () => {
    it('load Categories', () => {
      const store = mockStore({});

      onFetch(restaurants);

      return store.dispatch(loadRestaurants()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(setRestaurants(restaurants));
      });
    });
  });


});
