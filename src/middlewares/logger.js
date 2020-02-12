export const logger = store => next => action => {
  console.log('Action', action);
  //console.log('prevState', store.getState().chats.toJS());

  const result = next(action);

  //console.log('nextState', store.getState().chats.toJS());

  return result;
};