import { createContext, useContext, useEffect, useReducer } from "react";

const API_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

const actionTypes = {
  LOADING: "ISLOADING",
  LOADCITIES: "Cities/Loaded",
  LOADCITY: "City/loaded",
  ADDCITY: "City/Add",
  DELETECITY: "City/Delete",
  ERROR: "ERROR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.LOADCITIES: {
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    }
    case actionTypes.LOADCITY: {
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    }
    case actionTypes.ADDCITY: {
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    }
    case actionTypes.Error: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      throw new Error("Out of actions");
    }
  }
};

const CitiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetcher = async () => {
      try {
        dispatch({ type: actionTypes.LOADING });
        const response = await fetch(`${API_URL}/cities`);
        if (!response.ok) {
          throw new Error("Cant fetch cities data");
        }
        const resData = await response.json();
        dispatch({ type: actionTypes.LOADCITIES, payload: resData });
        console.log(resData);
      } catch (error) {
        dispatch({ type: actionTypes.ERROR, payload: error });
      }
    };

    fetcher();
  }, []);

  const loadCity = async (id) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await fetch(`${API_URL}/cities/${id}`);
      if (!response.ok) {
        throw new Error("Cant fetch city data");
      }
      const resData = await response.json();
      dispatch({ type: actionTypes.LOADCITY, payload: resData });
    } catch (error) {
      dispatch({ type: actionTypes.ERROR, payload: error });
    }
  };

  const addCity = async (city) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await fetch(`${API_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Cant Add new city");
      }
      const resData = await response.json();
      dispatch({ type: actionTypes.ADDCITY, payload: resData });
    } catch (error) {
      dispatch({ type: actionTypes.ERROR, payload: error });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Cant delete new city");
      }
      const resData = await response.json();
      console.log(resData);
      const newCities = state.cities.filter((city) => city.id !== id);
      dispatch({ type: actionTypes.LOADCITIES, payload: newCities });
    } catch (error) {
      dispatch({ type: actionTypes.ERROR, payload: error });
    }
  };

  const contextValue = {
    cities: state.cities,
    currentCity: state.currentCity,
    isLoading: state.isLoading,
    error: state.error,
    loadCity,
    addCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("Cities Context error");
  }
  return context;
};

export { CitiesContextProvider, useCities };
