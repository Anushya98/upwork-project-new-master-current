import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers'
import { calendarReducer } from './reducers/calendarReducers'
const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    calendar: calendarReducer,
})



const middlware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlware)))

export default store;