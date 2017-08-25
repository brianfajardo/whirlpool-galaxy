import axios from 'axios'

import { FETCH_USER } from '../constants/actionTypes'

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/auth/current_user')
  const userData = res.data
  dispatch({ type: FETCH_USER, payload: userData })
}

export const handleStripeToken = token => async (dispatch) => {
  const res = await axios.post('/payments/stripe', token)
  const userData = res.data
  dispatch({ type: FETCH_USER, payload: userData })
}

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/surveys/new', values)
  const userData = res.data
  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: userData })
}