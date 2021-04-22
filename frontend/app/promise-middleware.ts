import { Middleware } from 'redux';

export const promiseMiddlware: Middleware = storeAPI => next => action => {
    Promise.resolve(action)
        .then(action => next(action))
        .catch(action => next(action));
};