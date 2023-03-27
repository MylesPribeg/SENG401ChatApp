import { useReducer, useState } from "react";

const groupReducer = (state, action) => {
    switch(action.type){
      case "SET_GROUPS":
        console.log(action.grps);
        return action.grps
      case "ADDGROUP":
          return[...state, {id:4,name:action.name,messages:[]}]
      case "ADDMESSAGE":
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
          state[action.prevIdx].active=false
          return state

      default:
          return state
  }
}

export function useGroups(){
    const [groupsState, groupsStateDispatch] = useReducer(  groupReducer, [

        {
          id:0,
          active:true,
          name:"hello world",
          messages:[
            "dummy message 1",
            "dummy message 2"
          ]
        },{
          id:1,
          active:false,
          name:"test",
          messages:[
            "dummy message 1",
            "poggers"
          ]
        },{
          id:2,
          active:false,
          name:"not pog",
          messages:[
            "hasan is a monkey monkey"
          ]
        },
      ])
      
      

      return {groupsState,groupsStateDispatch}
    


    }


