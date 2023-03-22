import { useReducer, useState } from "react"


export const useGroups = ()=>{

    const [groupsState, setGroupsStateDispatch] = useReducer([

        {
          id:0,
          index:0,
          active:true,
          name:"hello world",
          messages:[
            "dummy message 1",
            "dummy message 2"
          ]
        },{
          id:1,
          index:1,
          active:false,
          name:"test",
          messages:[
            "dummy message 1",
            "dummy message 2"
          ]
        },{
          id:2,
          index:2,
          active:false,
          name:"not pog",
          messages:[
            "dummy message 1",
            "dummy message 2"
          ]
        },
      ])
    




}