import { useNavigate } from "react-router-dom";
import {
  CREATE_NEW_DRIVER,
  DELETE_DRIVER,
  FILTER_BY_ORIGEN,
  FILTER_BY_TEAMS,
  GET_DRIVERS,
  GET_DRIVER_PRUEBA,
  GET_TEAMS,
  ORDER_ALFABETICAMENTE,
  ORDER_FECHA_NACIMIENTO,
  REINICIAR_DETAIL,
  SEARCH_BY_ID,
  SEARCH_BY_NAME,
} from "./action-type";
import axios from "axios";

const { VITE_URL } = import.meta.env

export const createNewDriver = (driver, navigate) => {
  const endpoint = `${VITE_URL}/drivers`;
  return async (dispatch) => {
    const { data } = await axios.post(endpoint, driver);
    if (data.status === "usuario_repetido") {
      return alert("Ya existe un usuario con estas caracteristicas");
    } else if (data.status === "faltan datos") {
      return alert("Faltan datos");
    }

    if (data.name) {
      navigate(`/home`);

      return dispatch({
        type: CREATE_NEW_DRIVER,
        payload: data,
      });
    }
  };
};

export const searchById = (id) => {
  const endpoint = `${VITE_URL}/drivers/${id}`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    if (data.name) {
      return dispatch({
        type: SEARCH_BY_ID,
        payload: data,
      });
    }
  };
};

export const searchByName = (name) => {
  const endpoint = `${VITE_URL}/drivers/name?name=${name}`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    if (data) {
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: data,
      });
    }
  };
};

export const getTeams = () => {
  const endpoint = `${VITE_URL}/teams`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    // console.log(data);
    return dispatch({
      type: GET_TEAMS,
      payload: data,
    });
  };
};

export const deleteDriver = (id) => {
  const endpoint = `${VITE_URL}/drivers/${id}`;
  return async (dispatch) => {
    const { data } = await axios.delete(endpoint);
    return dispatch({
      type: DELETE_DRIVER,
      payload: data,
    });
  };
};
export const orderAlfabeticamente = (orden) => {
  return { type: ORDER_ALFABETICAMENTE, payload: orden };
};

export const orderFechaNacimiento = (orden) => {
  return { type: ORDER_FECHA_NACIMIENTO, payload: orden };
};

export const filterByTeams = (team) => {
  return { type: FILTER_BY_TEAMS, payload: team };
};

export const filterByOrigen = (origen) => {
  return {
    type: FILTER_BY_ORIGEN,
    payload: origen,
  };
};

export const reiniciarDetail = () => {
  return {
    type: REINICIAR_DETAIL,
  };
};

export const getDrivers = () => {
  const endpoint = `${VITE_URL}/drivers`;
  return async (dispatch) => {
    const { data } = await axios.get(endpoint);
    return dispatch({
      type: GET_DRIVERS,
      payload: data,
    });
  };
};

export const getDriverPrueba = () => {
  return async(dispatch) => {
 const {data} = await axios.get("http://localhost:3001/drivers")
 return dispatch({
  type: GET_DRIVER_PRUEBA,
  payload: data
 })
  }
  
  
  return {
    type: GET_DRIVER_PRUEBA
  }
}