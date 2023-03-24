import { createContext, useReducer, useEffect } from "react"

export const GroupsContext = createContext();

export const groupsReducer = (state, action) => {
    switch(action.type) {
        case "SET_GROUPS":
            return {
                groups: action.payload
            }
        default:
            return state;
    }
}

export const GroupsContextProvider =({ children }) => {
    const [state, dispatch] = useReducer(groupsReducer, {
        groups: null    
    })

    useEffect(() => {
    
        const fetchGroups = async () => {
          const response = await fetch("http://localhost:8000/groups/")
          const json = await response.json();
    
          if (response.ok) {
            dispatch({type: "SET_GROUPS", payload: json})
          }
        }
    
        fetchGroups()
      }, [dispatch])

    return (
        <GroupsContext.Provider value={{...state, dispatch}}>
            { children }
        </GroupsContext.Provider>
    )
}