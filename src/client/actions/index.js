import * as types from "./actionTypes";

let { GET_GALLARY_INFO, GET_GALLARY_INFO_FAIL, GET_GALLARY_INFO_SUCCESS } = types;

export const getGalleryInfo = (limit, offSet, endingUrl = null) => {
    let urlParam = `limit=${limit}&offSet=${offSet}`;
    if (endingUrl)
        urlParam += `&ending_id=${endingUrl}`;
    return function (dispatch) {
        dispatch({
            type: GET_GALLARY_INFO,
        });
        fetch(`/api/get-gallery-info?${urlParam}`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_GALLARY_INFO_SUCCESS,
                    data,
                    source: 'view-all'
                })

            })
            .catch(err => dispatch({
                type: GET_GALLARY_INFO_FAIL,
                err
            })
            );

    }
}

export const filterDimension = (dimension) => {
    let urlParam = `width=${dimension['width']}&height=${dimension['height']}`;
    return function (dispatch) {
        dispatch({
            type: GET_GALLARY_INFO,
        });
        fetch(`/api/filter-gallery?${urlParam}`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_GALLARY_INFO_SUCCESS,
                    data,
                    source: 'filter'
                })

            })
            .catch(err => dispatch({
                type: GET_GALLARY_INFO_FAIL,
                err
            })
            );

    }
}