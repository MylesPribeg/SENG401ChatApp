import { useReducer, useState } from "react"


const groupReducer = (state, action) => {
    switch(action.type){
      case "SET_GROUPS":
        return action.grps
      case "REMOVE_USER":
        const grpidx = state.findIndex((group)=>group._id===action.grp);
        const useridx = state[grpidx].users.findIndex((user)=>user.username === action.user);
        if(grpidx>-1 && useridx>-1){state[grpidx].users.splice(useridx, 1)}
        console.log("after remove: ",state)
        return state;
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
          console.log(action.grp)

          return state.filter(group => group._id!==action.grp)
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