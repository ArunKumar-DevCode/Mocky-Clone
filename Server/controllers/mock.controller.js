import mongoose from "mongoose";
import MockResponse from "../models/mock.js";

// POST endpoint to create a mock
export const createMock = async (req, res) => {
  const { userId } = req.user;
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "No data provided" });
    }

    const host = `${req.protocol}://${req.get("host")}`;
    const endpointUrl = `${host}/api/mocks/response`;
    const deleteUrl = `${host}/api/mocks/delete`;

    const newMock = new MockResponse({
      identifier: data.identifier,
      contentType: data.contentType,
      charset: data.charset,
      httpHeaders: data.httpHeaders,
      httpBody: data.httpBody,
      endpointUrl,
      userId,
    });

    await newMock.save();

    return res.status(201).json({
      message: "Mock created successfully",
      endpoint: `${endpointUrl}/${newMock._id}`,
      id: newMock._id,
      deleteUrl: `${deleteUrl}/${newMock._id}`,
    });
  } catch (error) {
    console.error("Error creating mock:", error.message);
    return res
      .status(500)
      .json({ error: `Failed to create mock: ${error.message}` });
  }
};

// Get all mocks for a user
export const getAllMocks = async (req, res) => {
  const { userId } = req.user;
  try {
    const mocks = await MockResponse.find({ userId });
    if (!mocks.length) {
      return res.status(404).json({ message: "No mocks created yet!" });
    }
    res.status(200).json(mocks);
  } catch (error) {
    console.error("Error fetching mock responses:", error);
    res.status(500).json({
      error: "Failed to fetch mock responses",
      details: error.message,
    });
  }
};

// Get a mock response by ID (ensure it belongs to user)
export const getMockById = async (req, res) => {
  const { userId } = req.user;
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid mock ID" });
    }

    const mock = await MockResponse.findOne({ _id: id, userId });
    if (!mock) {
      return res.status(404).json({ error: "Mock not found or access denied" });
    }

    return res.status(200).json(mock.httpBody);
  } catch (error) {
    console.error(`Error fetching mock ${req.params.id}:`, error.message);
    return res.status(500).json({ error: "Failed to fetch mock" });
  }
};

// Delete a mock response by ID (ensure it belongs to user)
export const deleteMock = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid mock ID" });
    }

    const deletedMock = await MockResponse.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deletedMock) {
      return res
        .status(404)
        .json({ error: "Mock not found or already deleted" });
    }

    res.status(200).json({ message: "Mock response deleted successfully" });
  } catch (error) {
    console.error("Error deleting mock response:", error);
    res.status(500).json({
      error: "Failed to delete mock response",
      details: error.message,
    });
  }
};
