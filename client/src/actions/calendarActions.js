import axios from 'axios'
import {
    GET_EVENTS,
    GET_EVENTS_FAIL,
    GET_EVENTS_SUCCESS,
    ADD_NEW_EVENT,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_FAIL,
    UPDATE_EVENT,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL
} from '../constants/calendarConstants'


export const getEvents = (events) => async (dispatch) => {
    try {

        dispatch({ type: GET_EVENTS })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("Event_Data", events)
        const { data } = await axios.get('http://localhost:5000/events', events, config)

        dispatch({
            type: GET_EVENTS_SUCCESS,
            payload: data.events
        })

    } catch (error) {
        dispatch({
            type: GET_EVENTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addNewEvent = (eventsData) => async (dispatch) => {
    console.log("eventsData", eventsData)  
    try {

        dispatch({ type: ADD_NEW_EVENT })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
console.log("eventsData", eventsData)
        const { data } = await axios.post('http://localhost:5000/events', eventsData, config)
        
console.log("Event_Response", data)
        dispatch({
            type: ADD_EVENT_SUCCESS,
            payload: data.events
        })

    } catch (error) {
        dispatch({
            type: ADD_EVENT_FAIL,
            payload: error.response.data
        })
    }
}

export const updateEvents = (id, eventsData) => async (dispatch) => {
    try {
        
        dispatch({ type: UPDATE_EVENT })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`http://localhost:5000/events/${id}`, eventsData, config)

        dispatch({
            type: UPDATE_EVENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type:  UPDATE_EVENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete events - ADMIN
export const deleteEvents = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EVENT })

        const { data } = await axios.delete(`http://localhost:5000/events/${id}`)

        dispatch({
            type: DELETE_EVENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_EVENT_FAIL,
            payload: error.response.data.message
        })
    }
}


