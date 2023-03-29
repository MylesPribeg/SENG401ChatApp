const User = require("../backend/models/User");
const mockingoose = require('mockingoose');
const { getAllUsers, fuckMeInTheAss } = require("../backend/controllers/user-controller");

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
  });
  
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

let users = 
{
    username: "Luke",
    password: 'asdfbfdasdf' 
}

describe("User-controller", () =>{
    jest.setTimeout(1000);

    beforeEach(()=>{
        User.find = async()=>{
            return users;
        }
        User.populate = async()=>{
            return users;
        }
    })
    it("should return all users", async() => {

        // mockingoose(User).toReturn([
        //     {
        //         username: "Luke",
        //         email: "luke@luke.com",
        //         password: "asdfbfdasdf",
        //         groups: []
        //     }
        // ], 'find')
        const req = mockRequest(
            {},
            {users}
        );
        const res = mockResponse();
        //let req,res
        await getAllUsers(req, res);
        expect(res.json).toHaveBeenCalledWith(users)
        expect(req.body).toEqual({users})
    });
})
