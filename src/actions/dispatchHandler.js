import request from 'superagent';

import lscache from 'lscache';
import { BASE_URL } from '../constants';

export const actionCreator = type => payload => ({ type, payload });

export const getData = (path, actionCreator, responseTransformer = null) =>
    call(
        () => request.get(`${BASE_URL}/${path}`),
        actionCreator,
        null,
        responseTransformer
    );

export const deleteData = (
    path,
    id,
    actionCreator,
    responseTransformer = null
) =>
    call(
        () => request.delete(`${BASE_URL}/${path}/${id}`),
        actionCreator,
        null,
        responseTransformer
    );

export const postData = (
    path,
    actionCreator,
    data,
    responseTransformer = null
) =>
    call(
        () => request.post(`${BASE_URL}/${path}`),
        actionCreator,
        data,
        responseTransformer
    );

export const putData = (
    path,
    id,
    actionCreator,
    data,
    responseTransformer = null
) =>
    call(
        () => request.put(`${BASE_URL}/${path}/${id}`),
        actionCreator,
        data,
        responseTransformer
    );

const call = (
    requestObject,
    actionCreator = null,
    data = null,
    responseTransformer = null
) => dispatch => {
    const lsData = lscache.get('travelin-data');
    let partialRequest = requestObject();
    if (lsData) {
        partialRequest = partialRequest.set(
            'Authorization',
            `Bearer ${lsData.jwt}`
        );
    }
    if (data) {
        partialRequest = partialRequest.send(data);
    }
    return partialRequest
        .then(response => {
            let actionData;
            if (responseTransformer) {
                actionData = responseTransformer(response);
            } else {
                actionData = response.body;
            }

            if (actionCreator) {
                dispatch(actionCreator(actionData));
            }
            console.log('callResult', actionData);
            return actionData;
        })
        .catch(console.error);
};
