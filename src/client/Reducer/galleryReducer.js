import * as types from "../actions/actionTypes";

export default function (state = null, action) {
  switch (action.type) {
    case types.GET_GALLARY_INFO: {
      return Object.assign({}, state, {
        status: 'inprogress'
      })
    }
    case types.GET_GALLARY_INFO_SUCCESS: {
      return Object.assign({}, state, {
        data: action.data,
        status: 'completed',
        source: action.source
      })
    }
    case types.GET_GALLARY_INFO_FAIL: {
      return Object.assign({}, state, {
        err: action.err,
        status: 'completed'
      })
    }
    default:
      return state;
  }
}