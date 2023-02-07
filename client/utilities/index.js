/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description Common utilities DRY
 *
 * ************************************
 */

// UseCases:
// setHangoutMap, `/api/hangouts`
// updateUserInfo, `/api/user/${user_id}`
export default function getFromServer(dispatch, type, url, init = null) {
  console.log(dispatch);
  const args = init ? [url, init] : [url];
  fetch(...args)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data); //DEBUG is useful right now
      dispatch({ type: type.toString(), payload: data }); // call reducer action
    })
    .catch((err) => {
      console.log(
        `Error in getFromServer(${dispatch}, ${type}, ${url}, ${init}) :\n${err}`
      );
    });
}
