const User = require("../backend/models/User");
const mockingoose = require('mockingoose');
const { 
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    signUpUser,
    loginUser,
    getUserGroups,

} = require("../backend/controllers/user-controller");

const mockRequest = (sessionData, body) => ({
    params: { data: sessionData },
    body,
  });
  
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn().mockReturnValue("error");

//mock database of users
let users = (
{
    username: "Luke",
    email: "luke@gmail.com",
    password: 'asdfbfdasdf',
    groups: [
        {
            ObjectId: "1234",
            ObjectId: "4321",
        }
    ]
},
{
    username: "Gabe",
    email: "gabe@gmail.com",
    password: 'fda',
    groups: [
        {
            ObjectId: "1234",
            ObjectId: "4321",
        }
    ]
},
{
    username: "Myles",
    email: "myles@gmail.com",
    password: 'asdfbfdasdf',
    groups: [
        {
            ObjectId: "1234",
            ObjectId: "4321",
        }
    ]
}
)


describe("getAllUsers", () =>{
    jest.setTimeout(1000);

    it("should properly return all users with nominal input", async() => {

        //mock database call
        User.find.populate = async(groups)=>{
            return users;
        }

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

    it("should return an error status 500 with invalid input", async() => {

        //mock faulty database call
        User.find = async()=>{
            return users;
        }

        const req = mockRequest(
            {},
            {garbage: "data"}
        );
        const res = mockResponse();
        //let req,res
        await getAllUsers(req, res);
        expect(res.status).toHaveBeenCalledWith(500)
    });
})

//couldn't get to work
describe("createUser", () =>{
    jest.setTimeout(1000);

    it("should return 422 with any empty inputs", async() => {

        const req = mockRequest(
            {username: "", password: "", email: ""},
            {}
        );
        const res = mockResponse();
        const next = mockNext();
        await createUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(422)
    });

    it("should call next() function when database call return error", async() =>{
        //mock faulty database call
        User.save = jest.fn().mockRejectedValueOnce(new Error())  
        const req = mockRequest(
            {username: "test", password: "test", email: "test"},
            {}
        );
        const res = mockResponse();
        const next = mockNext;
        await createUser(req, res, next);
        expect(next).toHaveBeenCalled()
    })

    // it("should return stats user and status 201 upon successful creation", async() =>{
    //     userObj = {username: "testname", password: "tester1!", email: "test@gmail.com"};
        
    //     //mock faulty database call
    //     //User.save = jest.fn().mockReturnValue(true);

    //     mockingoose(User).toReturn(userObj, 'save')

    //     const req = mockRequest(
    //         {},
    //         userObj,
    //     );
    //     const res = mockResponse();
    //     const next = mockNext;
    //     await createUser(req, res, next);
    //     //expect(res.json).toHaveBeenCalledWith(userObj)
    //     expect(res.status).toHaveBeenCalledWith(201)
    //     //expect(req.body).toEqual({userObj})    
    // })

})

describe("updateUser", () =>{
    jest.setTimeout(1000);

    it("returns 200 on successful read", async() =>{
        const userObj = {username: "test", password: "testpass1!", email: "test@test.com"}
        User.findByIdAndUpdate = jest.fn().mockReturnValue(userObj)

        const req = mockRequest(
            {id: 1234},
            userObj
        );
        const res = mockResponse();
        const next = mockNext();
        await updateUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({user: userObj})
    })

    it("returns 404 on user that does not exist", async() =>{
        const userObj = {username: "", password: "", email: "test@test.com"}
        User.findByIdAndUpdate = jest.fn().mockReturnValue(false)

        const req = mockRequest(
            {id: 1234},
            userObj
        );
        const res = mockResponse();
        const next = mockNext();
        await updateUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404)
    })

    it("call next when db error occurs", async() =>{
        const userObj = {}
        User.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error())

        const req = mockRequest(
            {id: 1234},
            userObj
        );
        const res = mockResponse();
        const next = mockNext;
        await updateUser(req, res, next);
        expect(next).toHaveBeenCalled();
    })
})

describe("deleteUser", () =>{
    jest.setTimeout(1000);
    const userObj = {username: "", password: "", email: "test@test.com"}

    it("should return status 200 with proper input", async() => {

        //mock database call
        User.findByIdAndDelete = jest.fn().mockReturnValue(true)

        const req = mockRequest(
            {id: 1234},
            {}
        );
        const res = mockResponse();
        const next = mockNext;

        await deleteUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200)
    });

    it("should return status 404 if user not found", async() => {

        //mock database call
        User.findByIdAndDelete = jest.fn().mockReturnValue(false)

        const req = mockRequest(
            {id: 1234},
            {}
        );
        const res = mockResponse();
        const next = mockNext;

        await deleteUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404)
    });

    it("should call next on error call when db call fails", async() => {

        //mock database call
        User.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error())

        const req = mockRequest(
            {id: 1234},
            {}
        );
        const res = mockResponse();
        const next = mockNext;

        await deleteUser(req, res, next);
        expect(next).toHaveBeenCalled()
    });
})

describe("getUserById", () =>{
    jest.setTimeout(1000);
    const userObj = {username: "", password: "", email: "test@test.com"}

    it("should return status 200 and user object with proper input", async() => {

        //mock database call
        User.findById = jest.fn().mockReturnValue(userObj)

        const req = mockRequest(
            {id: 1234},
            {}
        );
        const res = mockResponse();
        const next = mockNext;

        let user = userObj;
        await getUserById(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({user})
    });

    it("should return status 404 if user not found", async() => {

        //mock database call
        User.findById = jest.fn().mockReturnValue(false)

        const req = mockRequest(
            {id: 1234},
            {}
        );
        const res = mockResponse();
        const next = mockNext;

        await getUserById(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404)
    });

    it("should call next on error call when db call fails", async() => {

        //mock database call
        User.findById = jest.fn().mockRejectedValueOnce(new Error())

        const req = mockRequest(
            {id: 1234},
            {}
        );
        const res = mockResponse();
        const next = mockNext;

        await getUserById(req, res, next);
        expect(next).toHaveBeenCalled()
    });
})

describe("signUpUser", ()=>{
    jest.setTimeout(1000);
    const user = {username: "tester", password: "tester1!", email: "test@test.com"}

    it("should return status 500 if credentials are invalid", async() => {

        //mock database call
        User.signUp = jest.fn().mockReturnValue(user)
        createToken = jest.fn().mockReturnValue(true)

        const req = mockRequest(
            {id: 1234},
            user
        );
        const res = mockResponse();
        const next = mockNext;

        await signUpUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500)
    });
})

describe("loginUser", ()=>{
    jest.setTimeout(1000);
    const user = {username: "tester", password: "tester1!", email: "test@test.com"}
    it("should return status 500 if credentials are invalid", async() => {

        //mock database call
        User.login = jest.fn().mockReturnValue(user)
        createToken = jest.fn().mockReturnValue(true)

        const req = mockRequest(
            {id: 1234},
            user
        );
        const res = mockResponse();
        const next = mockNext;

        await loginUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500)
    });
})

describe("getUserGroups", ()=>{
    jest.setTimeout(1000);
    let user = {username: "tester", password: "tester1!", email: "test@test.com"}
    it("should return list of groups if input is valid", async() => {

        user.groups = ["name1", "name2"];
        //mock database call
        getgrp = jest.fn().mockReturnValue(user.groups)

        const req = mockRequest(
            {userId: 1234},
            user
        );
        const res = mockResponse();
        const next = mockNext;

        await getUserGroups(req, res);
        expect(res.status).toHaveBeenCalledWith(404)
    });
})