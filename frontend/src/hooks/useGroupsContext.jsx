import { GroupsContext } from "../contexts/GroupsContext"
import { useContext } from "react"

export const useGroupsContext = () => {
    const context = useContext(GroupsContext);

    if(!context) {
        throw Error("useGroupscontext must be used in groupcontextprovider")
    }

    return context;
}