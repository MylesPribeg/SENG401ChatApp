const User = require('../backend/models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');

describe('User schema signUp function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user if the email does not exist and the input is valid and strong', async () => {
    const email = 'test@example.com';
    const password = 'Password123!';
    const username = 'testuser';

    User.findOne = jest.fn().mockResolvedValueOnce(null);
    //validator.isEmail = jest.fn().mockReturnValueOnce(true);
    validator.isStrongPassword = jest.fn().mockReturnValueOnce(true);
    bcrypt.genSalt = jest.fn().mockResolvedValueOnce('testsalt');
    bcrypt.hash = jest.fn().mockResolvedValueOnce('testhashedpassword');
    User.create = jest.fn().mockResolvedValueOnce({ email, password, username });

    const result = await User.signUp(username, email, password);

    expect(result).toEqual({ email, password, username })
  });

  it('should throw an error if the email already exists', async () => {
    const email = 'test@example.com';
    const password = 'Password123!';
    const username = 'testuser';

    User.findOne = jest.fn().mockResolvedValueOnce({ email });
    const expectedError = new Error('Email already exists');
    expectedError.statusCode = 409;

    await expect(User.signUp(username, email, password)).rejects.toEqual(expectedError);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email });
  });

  it('should throw an error if the email is invalid', async () => {
    const email = 'invalidemail';
    const password = 'Password123!';
    const username = 'testuser';

    await expect(User.signUp(username, email, password)).rejects.toThrow('Please enter a valid email');

  });

  it('should throw an error if the password is weak', async () => {
    const email = 'test@example.com';
    const password = 'weakp';
    const username = 'testuser';

    await expect(User.signUp(username, email, password)).rejects.toThrow('Please enter a strong password');
  });

  it('should throw an error if any field is missing', async () =>{
  const email = 'test@example.com';
  const password = 'Password123!';
  const username = '';
  
  await expect(User.signUp(username, email, password)).rejects.toThrow('Please fill all fields');
  });
});

describe('login function', () => {
  const bcrypt = require('bcrypt');
  const userMock = {
    username: 'testuser',
    password: 'testpassword',
    passwordHash: '$2b$10$3fOwJZz0H0M5OZsgG/c5Ke5X9B5mc5B99QrVm5kElZU6GRZ2lj/oa', // hashed password for 'testpassword'
  };
  it('should throw an error if username is missing', async () => {
    const username = '';
    const password = userMock.password;

    await expect(User.login(username, password)).rejects.toThrow('Please fill all fields');
  });

  it('should throw an error if password is missing', async () => {
    const username = userMock.username;
    const password = '';

    await expect(User.login(username, password)).rejects.toThrow('Please fill all fields');
  });

  it('should throw an error if user is not found', async () => {
    const username = 'unknownuser';
    const password = userMock.password;

    User.findOne.mockReturnValue(null);

    await expect(User.login(username, password)).rejects.toThrow('User not found');
    expect(User.findOne).toHaveBeenCalledWith({ username });
  });

  it('should throw an error if password is incorrect', async () => {
    const username = userMock.username;
    const password = 'wrongpassword';

    User.findOne.mockReturnValue(userMock);

    await expect(User.login(username, password)).rejects.toThrow('Incorrect password');
    expect(User.findOne).toHaveBeenCalledWith({ username });
  });

});
