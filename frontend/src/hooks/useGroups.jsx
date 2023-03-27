import { useReducer, useState } from "react"


const groupReducer = (state, action) => {
    switch(action.type){
      case "SET_GROUPS":
        return action.grps
      case "ADDGROUP":
          return[...state, {id:4,name:action.name,messages:[]}]
      case "ADDMESSAGE":
        if(typeof action.grp !== 'undefined'){
          action.idx = state.findIndex((group)=> group._id === action.grp)
        }
        console.log("before: " + state[action.idx].messages);
        const newState = state.map((group, index) => {
          if (index === action.idx) {
            return { ...group, messages: [...group.messages, action.msg] };
          }
          return group;
        });
        console.log("after " + newState[action.idx].messages);
        return newState;
      case "DELETEGROUP":
          // return []
          return state.splice(action.idx,1)
      case "GROUPCLICKED":
          // state[0].active=false
          
          state[action.idx].active=true
          if(action.prevIdx>=0){
            state[action.prevIdx].active=false
          }
          return state

      default:
          return state
  }
}

export const useGroups = ()=>{
    

    const [groupsState, groupsStateDispatch] = useReducer(  groupReducer, [])
      return {groupsState,groupsStateDispatch}
}