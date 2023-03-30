// import the necessary dependencies and modules
const { getGroups, getGroup, createGroup, deleteGroup, updateGroup, addToGroup, addToGroupWithUsername, createGroupWithName, getUsers, removeUserFromGroup } = require("../backend/controllers/groupController");
const Group = require("../backend/models/Group");
const User = require("../backend/models/User");


describe('getGroup', () => {
  // create a mock request and response object
  let mockReq;
  let mockRes;

  beforeEach(() => {
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    mockReq = {
      params: {
        id: '123abc456efg',
      },
    };
  })

  it('should return a 404 error if the provided id is not a valid ObjectId', async () => {
    // call the getGroup function with an invalid id
    mockReq.params.id = 'invalidId';

    await getGroup(mockReq, mockRes);

    // assert that the response status is 404 and the error message is correct
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "no group invalid id" });
  });

  it('should return a 404 error if no group is found with the provided id', async () => {
    // create a mock implementation for the Group.findById method
    Group.findById = jest.fn().mockReturnValue(null);

    await getGroup(mockReq, mockRes);

    // assert that the Group.findById method was called with the correct argument
    expect(Group.findById).toHaveBeenCalledWith('123abc456efg');

    // assert that the response status is 404 and the error message is correct
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "no group" });
  });

  it('should return the group with the provided id in the response body', async () => {
    // create a mock implementation for the Group.findById method
    Group.findById = jest.fn().mockReturnValue({ name: 'Group 1' });

    await getGroup(mockReq, mockRes);

    // assert that the Group.findById method was called with the correct argument
    expect(Group.findById).toHaveBeenCalledWith('123abc456efg');

    // assert that the response status is 200 and the group is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ name: 'Group 1' });
  });
});


describe('createGroup', () => {
    const mockReq = {
        body: {
            name: 'TestGroup',
            messages: [],
        },
    };
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

  it('should create a new group and return it in the response body', async () => {
    // create a mock implementation for the Group.create method
    Group.create = jest.fn().mockReturnValue({ name: 'TestGroup', messages: [] });

    // call the createGroup function with the mock request and response objects
    await createGroup(mockReq, mockRes);

    // assert that the Group.create method was called with the correct argument
    expect(Group.create).toHaveBeenCalledWith({ name: 'TestGroup', messages: [] });

    // assert that the response status is 200 and the new group is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ name: 'TestGroup', messages: [] });
  });

  it('should return a 400 error if the Group.create method throws an error', async () => {
    // create a mock implementation for the Group.create method that throws an error
    Group.create = jest.fn().mockRejectedValue(new Error('Something went wrong'));

    // call the createGroup function with the mock request and response objects
    await createGroup(mockReq, mockRes);

    // assert that the Group.create method was called with the correct argument
    expect(Group.create).toHaveBeenCalledWith({ name: 'TestGroup', messages: [] });

    // assert that the response status is 400 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
  });
});

describe('createGroupWithName', () => {
  const mockReq = {
      body: {
          groupName: 'TestGroup',
          username: 'UserT',
      },
  };
  const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

it('should create a new named group for the user', async () => {
  // create a mock implementation for the Group.create and User.findOne methods
  Group.create = jest.fn().mockReturnValue({ _id: 'abcdefghijkl', name: 'TestGroup', messages: [] });
  User.findOne = jest.fn().mockReturnValue({_id: '123456789012'});
  User.updateOne = jest.fn().mockReturnValue({ nModified: 1 });


  // call the createGroupWithName function with the mock request and response objects
  await createGroupWithName(mockReq, mockRes);

  // assert that the Group.create method was called with the correct argument
  expect(User.findOne).toHaveBeenCalledWith({ username: 'UserT'})
  expect(Group.create).toHaveBeenCalledWith({ name: 'TestGroup', users: ['123456789012'] });
  expect(User.updateOne).toHaveBeenCalledWith({ _id: '123456789012' }, { $addToSet: { groups: 'abcdefghijkl' } });

  // assert that the response status is 200
  expect(mockRes.status).toHaveBeenCalledWith(200);
});

it('should return a 404 error if the user is not found', async () => {
  // create a mock implementation for the Group.create and User.findOne methods
  User.findOne = jest.fn().mockReturnValue(null);

  // call the createGroupWithName function with the mock request and response objects
  await createGroupWithName(mockReq, mockRes);

  // assert that the Group.create method was called with the correct argument
  expect(User.findOne).toHaveBeenCalledWith({ username: 'UserT'})

  // assert that the response status is 200 and the new group is returned in the response body
  expect(mockRes.status).toHaveBeenCalledWith(404);
  expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
});

it('should return a 400 error if the Group.create method throws an error', async () => {
  // create a mock implementation for the Group.create method that throws an error
  Group.create = jest.fn().mockRejectedValue(new Error('Something went wrong'));
  User.findOne = jest.fn().mockReturnValue({_id: '123456789012'});

  // call the createGroupWithName function with the mock request and response objects
  await createGroupWithName(mockReq, mockRes);

  // assert that the Group.create method was called with the correct argument
  expect(User.findOne).toHaveBeenCalledWith({ username: 'UserT'})
  expect(Group.create).toHaveBeenCalledWith({ name: 'TestGroup', users: ['123456789012'] });

  // assert that the response status is 400 and the error message is returned in the response body
  expect(mockRes.status).toHaveBeenCalledWith(400);
  expect(mockRes.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
});
});


describe('deleteGroup', () => {
  // create a mock request and response object
  const mockReq = {
    params: {
      id: 'abcdefghijkl',
    },
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  it('should delete a group and return it in the response body', async () => {
    // create a mock implementation for the Group.findOneAndDelete method
    Group.findOneAndDelete = jest.fn().mockReturnValue({ _id: 'abcdefghijkl', name: 'testGroup', messages: [] });

    // call the deleteGroup function with the mock request and response objects
    await deleteGroup(mockReq, mockRes);

    // assert that the Group.findOneAndDelete method was called with the correct argument
    expect(Group.findOneAndDelete).toHaveBeenCalledWith({ _id: 'abcdefghijkl' });

    // assert that the response status is 200 and the deleted group is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ _id: 'abcdefghijkl', name: 'testGroup', messages: [] });
  });

  it('should return a 404 error if the Group.findOneAndDelete method does not find a group to delete', async () => {
    // create a mock implementation for the Group.findOneAndDelete method that returns null
    Group.findOneAndDelete = jest.fn().mockReturnValue(null);

    // call the deleteGroup function with the mock request and response objects
    await deleteGroup(mockReq, mockRes);

    // assert that the Group.findOneAndDelete method was called with the correct argument
    expect(Group.findOneAndDelete).toHaveBeenCalledWith({ _id: 'abcdefghijkl' });

    // assert that the response status is 404 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'no group' });
  });

  it('should return a 404 error if the id parameter is invalid', async () => {
    // update the mock request object to contain an invalid id parameter
    mockReq.params.id = 'invalid-id';

    // call the deleteGroup function with the mock request and response objects
    await deleteGroup(mockReq, mockRes);

    // assert that the response status is 404 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'no group invalid id' });
  });
});

describe('addToGroup', () => {
  // create a mock request and response object
  let mockReq;
  let mockRes;

  beforeEach(() =>{
    mockReq = {
      params: {
        gid: 'abcdefghijkl',
        uid: '123456789012',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should add a user to a group and return the update results in the response body', async () => {
    // create a mock implementation for the Group.updateOne and User.updateOne methods
    Group.updateOne = jest.fn().mockReturnValue({ nModified: 1 });
    User.updateOne = jest.fn().mockReturnValue({ nModified: 1 });

    // call the addToGroup function with the mock request and response objects
    await addToGroup(mockReq, mockRes);

    // assert that the Group.updateOne and User.updateOne methods were called with the correct arguments
    expect(Group.updateOne).toHaveBeenCalledWith({ _id: 'abcdefghijkl' }, { $addToSet: { users: '123456789012' } });
    expect(User.updateOne).toHaveBeenCalledWith({ _id: '123456789012' }, { $addToSet: { groups: 'abcdefghijkl' } });

    // assert that the response status is 200 and the update results are returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ groupUpdate: { nModified: 1 }, userUpdate: { nModified: 1 } });
  });

  it('should return a 404 error if the group id parameter is invalid', async () => {
    // update the mock request object to contain an invalid group id parameter
    mockReq.params.gid = 'invalid-id';

    // call the addToGroup function with the mock request and response objects
    await addToGroup(mockReq, mockRes);

    // assert that the response status is 404 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid gid' });
  });

  it('should return a 404 error if the user id parameter is invalid', async () => {
    // update the mock request object to contain an invalid user id parameter
    mockReq.params.uid = 'invalid-id';

    // call the addToGroup function with the mock request and response objects
    await addToGroup(mockReq, mockRes);

    // assert that the response status is 404 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid uid' });
  });

  it('should return a 400 error if there is an error adding the user to the group', async () => {
    // create a mock implementation for the Group.updateOne and User.updateOne methods that throws an error
    Group.updateOne = jest.fn().mockRejectedValue(new Error('Database error'));
    User.updateOne = jest.fn().mockReturnValue({ nModified: 1 });

    // call the addToGroup function with the mock request and response objects
    await addToGroup(mockReq, mockRes);


    // assert that the Group.updateOne and User.updateOne methods were called with the correct arguments
    expect(Group.updateOne).toHaveBeenCalledWith({ _id: 'abcdefghijkl' }, { $addToSet: { users: '123456789012' } });
  
    // assert that the response status is 400 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
  })

  it('should return a 400 error if there is an error adding the group to user', async () => {
    // create a mock implementation for the Group.updateOne and User.updateOne methods that throws an error
    Group.updateOne = jest.fn().mockReturnValue({ nModified: 1 });
    User.updateOne = jest.fn().mockRejectedValue(new Error('Database error'));

    // call the addToGroup function with the mock request and response objects
    await addToGroup(mockReq, mockRes);

    // assert that the Group.updateOne and User.updateOne methods were called with the correct arguments
    expect(User.updateOne).toHaveBeenCalledWith({ _id: '123456789012' }, { $addToSet: { groups: 'abcdefghijkl' } });
  
    // assert that the response status is 400 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
  })
})

describe('addToGroupWithUsername', () => {
  // create a mock request and response object
  let mockReq;
  let mockRes;

  beforeEach(() =>{
    mockReq = {
      params: {
        gid: 'abcdefghijkl',
      },
      query: {
        username: 'UsernameT'
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should add a user to a group and return the update results in the response body', async () => {
    // create a mock implementation for the Group.updateOne and User.updateOne methods
    User.findOne = jest.fn().mockReturnValue({_id: '123456789012'});
    Group.updateOne = jest.fn().mockReturnValue({ nModified: 1 });
    User.updateOne = jest.fn().mockReturnValue({ nModified: 1 });

    // call the addToGroupWithUsername function with the mock request and response objects
    await addToGroupWithUsername(mockReq, mockRes);

    // assert that the User.finOne, Group.updateOne, and User.updateOne methods were called with the correct arguments
    expect(User.findOne).toHaveBeenCalledWith({ username: 'UsernameT'});
    expect(Group.updateOne).toHaveBeenCalledWith({ _id: 'abcdefghijkl' }, { $addToSet: { users: '123456789012' } });
    expect(User.updateOne).toHaveBeenCalledWith({ _id: '123456789012' }, { $addToSet: { groups: 'abcdefghijkl' } });

    // assert that the response status is 200 and the update results are returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ groupUpdate: { nModified: 1 }, userUpdate: { nModified: 1 } });
  });

  it('should return a 404 error if the group id parameter is invalid', async () => {
    // update the mock request object to contain an invalid group id parameter
    mockReq.params.gid = 'invalid-id';

    // call the addToGroupWithUsername function with the mock request and response objects
    await addToGroupWithUsername(mockReq, mockRes);

    // assert that the response status is 404 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid gid' });
  });

  it('should return a 404 error if the username cannot be found', async () => {
    // create a mock implementation for the User.findOne method
    User.findOne = jest.fn().mockReturnValue(null);
   
    // call the addToGroupWithUsername function with the mock request and response objects
    await addToGroupWithUsername(mockReq, mockRes);

    // assert that User.findOne has been called with the correct arguments
    expect(User.findOne).toHaveBeenCalledWith({ username: 'UsernameT'});

    // assert that the response status is 404 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should return a 400 error if there is an error adding the user to the group', async () => {
    // create a mock implementation for the Group.updateOne method that throws an error
    User.findOne = jest.fn().mockReturnValue({_id: '123456789012'});
    Group.updateOne = jest.fn().mockRejectedValue(new Error('Database error'));
    User.updateOne = jest.fn().mockReturnValue({ nModified: 1 });

    // call the addToGroupWithUsername function with the mock request and response objects
    await addToGroupWithUsername(mockReq, mockRes);


    // assert that the Group.updateOne and User.updateOne methods were called with the correct arguments
    expect(Group.updateOne).toHaveBeenCalledWith({ _id: 'abcdefghijkl' }, { $addToSet: { users: '123456789012' } });
  
    // assert that the response status is 400 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
  })

  it('should return a 400 error if there is an error adding the group to user', async () => {
    // create a mock implementation for the User.updateOne method that throws an error
    User.findOne = jest.fn().mockReturnValue({_id: '123456789012'});
    Group.updateOne = jest.fn().mockReturnValue({ nModified: 1 });
    User.updateOne = jest.fn().mockRejectedValue(new Error('Database error'));

    // call the addToGroupWithUsername function with the mock request and response objects
    await addToGroupWithUsername(mockReq, mockRes);

    // assert that the Group.updateOne and User.updateOne methods were called with the correct arguments
    expect(User.updateOne).toHaveBeenCalledWith({ _id: '123456789012' }, { $addToSet: { groups: 'abcdefghijkl' } });
  
    // assert that the response status is 400 and the error message is returned in the response body
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
  })
})
