const INCREMENT = 'INCREMENT';

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function reducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}
