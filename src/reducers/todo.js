import actionType from '../constants';

const initialState = {
  sections: {},
};
export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case actionType.LOAD_SECTIONS_SUCCESS:
      newState.sections = action.payload;
      return newState;
    default:
      return state;
  }
};
