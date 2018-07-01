import actionType from '../constants';
import { getSectionsDB, addSection } from '../firebase';

export const loadSections = userId => (dispatch) => {
  dispatch({
    type: actionType.LOAD_SECTIONS_REQUEST,
  });
  getSectionsDB(userId)
    .then((sections) => {
      dispatch({
        type: actionType.LOAD_SECTIONS_SUCCESS,
        payload: sections,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionType.LOAD_SECTIONS_FAILED,
        payload: error,
      });
    });
};
export const createSection = (userId, name) => (dispatch) => {
  dispatch({
    type: actionType.ADD_SECTION_REQUEST,
  });
  addSection(userId, name)
    .then((key) => {
      loadSections(userId)(dispatch); // refresh the data to keep up-to-date
      dispatch({
        type: actionType.ADD_SECTION_SUCCESS,
        payload: key,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionType.ADD_SECTION_FAILED,
        payload: error,
      });
    });
};
