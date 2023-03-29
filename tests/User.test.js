const User = require('../backend/models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');

describe('User schema signUp function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user if the email does not exist and the input is valid', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const username = 'testuser';

    User.findOne = jest.fn().mockResolvedValueOnce(null);
    validator.isEmail = jest.fn().mockReturnValueOnce(true);
    validator.isStrongPassword = jest.fn().mockReturnValueOnce(true);
    bcrypt.genSalt = jest.fn().mockResolvedValueOnce('testsalt');
    bcrypt.hash = jest.fn().mockResolvedValueOnce('testhashedpassword');
    User.create = jest.fn().mockResolvedValueOnce({ email, password, username });

    const result = await User.signUp(username, email, password);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email });

    expect(validator.isEmail).toHaveBeenCalledTimes(1);
    expect(validator.isEmail).toHaveBeenCalledWith(email);

    expect(validator.isStrongPassword).toHaveBeenCalledTimes(1);
    expect(validator.isStrongPassword).toHaveBeenCalledWith(password);

    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 'testsalt');

    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({ username, email, password: 'testhashedpassword' });

    expect(result).toEqual({ email, password, username });
  });

  it('should throw an error if the email already exists', async () => {
    const email = 'test@example.com';
    const password = 'password123';
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
    const password = 'password123';
    const username = 'testuser';

    await expect(User.signUp(username, email, password)).rejects.toThrow('Please enter a valid email');

    expect(validator.isEmail).toHaveBeenCalledTimes(1);
    expect(validator.isEmail).toHaveBeenCalledWith(email);

    expect(User.findOne).not.toHaveBeenCalled();
    expect(bcrypt.genSalt).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
  });

  it('should throw an error if the password is weak', async () => {
    const email = 'test@example.com';
    const password = 'weakpassword';
    const username = 'testuser';

    await expect(User.signUp(username, email, password)).rejects.toThrow('Please enter a strong password');

    expect(validator.isStrongPassword).toHaveBeenCalledTimes(1);
    expect(validator.isStrongPassword).toHaveBeenCalledWith(password);

    expect(User.findOne).not.toHaveBeenCalled();
    expect(bcrypt.genSalt).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
  });

  it('should throw an error if any field is missing', async () =>{
  const email = 'test@example.com';
  const password = 'password123';
  const username = '';
  
  await expect(User.signUp(username, email, password)).rejects.toThrow('Please fill all fields');
  
  expect(User.findOne).not.toHaveBeenCalled();
  expect(validator.isEmail).not.toHaveBeenCalled();
  expect(validator.isStrongPassword).not.toHaveBeenCalled();
  expect(bcrypt.genSalt).not.toHaveBeenCalled();
  expect(bcrypt.hash).not.toHaveBeenCalled();
  expect(User.create).not.toHaveBeenCalled();
  });
});