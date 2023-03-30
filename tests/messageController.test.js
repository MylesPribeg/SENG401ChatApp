const Message = require("../backend/models/Message");
const Group = require("../backend/models/Group");
const mongoose = require("mongoose");

const {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require("../backend/controllers/messageController");

describe("messageController", () => {
  describe("getMessages", () => {
    it("should return 404 if an invalid group ID is provided", async () => {
      const req = { params: { id: "invalidID" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "no Messages invalid group id",
      });
    });

  });

  describe("getMessage", () => {
    it("should return 404 if an invalid message ID is provided", async () => {
      const req = { params: { id: "invalidID" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "no Message invalid id",
      });
    });

    it("should return the message for a valid message ID", async () => {
      const messageId = new mongoose.Types.ObjectId();
      const message = {
        _id: messageId,
        user: "user1",
        content: "message1",
        createdAt: new Date(),
      };

      jest.spyOn(Message, "findById").mockResolvedValueOnce(message);

      const req = { params: { id: messageId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(Message);
      expect(Message.findById).toHaveBeenCalledWith(messageId);
    });
  });

  describe("createMessage function", () => {
    const mockMessage = {
      _id: "6122aa2a7cb13c207b3621ad",
      user: "John",
      content: "Hello, world!",
    };
    const mockGroup = {
      _id: "6122aa2a7cb13c207b3621ae",
      name: "Group1",
      messages: [],
    };
  
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it("should throw an error if invalid id is provided", async () => {
      const req = {
        params: { id: "invalidid" },
        body: { user: "John", content: "Hello, world!" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await createMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "no Message invalid group id",
      });
    });
  })

  describe("deleteMessage", () => {
    it("should return a 404 error if an invalid ID is provided", async () => {
      const req = { params: { id: "invalid-id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await deleteMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "no Message invalid id" });
    });
  
    it("should return a 404 error if the message cannot be found", async () => {
      const req = { params: { id: "123456789012" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const findOneAndDelete = jest.spyOn(Message, "findOneAndDelete").mockReturnValue(null);
  
      await deleteMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "no Message" });
      expect(findOneAndDelete).toHaveBeenCalledWith({ _id: "123456789012" });
  
      findOneAndDelete.mockRestore();
    });
  
    it("should return the deleted message", async () => {
      const req = { params: { id: "123456789012" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const message = { _id: "123456789012", user: "John Doe", content: "Hello, world!" };
      const findOneAndDelete = jest.spyOn(Message, "findOneAndDelete").mockReturnValue(message);
  
      await deleteMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(message);
      expect(findOneAndDelete).toHaveBeenCalledWith({ _id: "123456789012" });
  
      findOneAndDelete.mockRestore();
    });
  });
  
  describe("updateMessage", () => {
    it("should return a 404 error if an invalid ID is provided", async () => {
      const req = { params: { id: "invalid-id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await updateMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "no Message invalid id" });
    });
  
    it("should return a 404 error if the message cannot be found", async () => {
      const req = { params: { id: "123456789012" }, body: { content: "Hello, world!" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const findOneAndUpdate = jest.spyOn(Message, "findOneAndUpdate").mockReturnValue(null);
  
      await updateMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "no Message" });
      expect(findOneAndUpdate).toHaveBeenCalledWith({ _id: "123456789012" }, { content: "Hello, world!" });
  
      findOneAndUpdate.mockRestore();
    });
  });
});

