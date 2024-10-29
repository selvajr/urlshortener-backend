const Url = require("../models/urls");
const randomString = require("../utils/randomString");

const urlsController = {
  createUrl: async (request, response) => {
    try {
      const { url } = request.body;

      const existingUrl = await Url.findOne({ url });
      console.log(request.userId);
      if (existingUrl && existingUrl.user == request.userId) {
        return response.status(409).send({ message: "Url already shortened" });
      }

      const endpoint = randomString(6);

      const shortenedUrl = new Url({ url, endpoint, user: request.userId });

      await shortenedUrl.save();

      return response
        .status(201)
        .send({ message: "Url shortened successfully", shortenedUrl });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  viewUserUrls: async (request, response) => {
    try {
      const urls = await Url.find({ user: request.userId });

      return response.status(200).send({ urls });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  getUrlCount: async (request, response) => {
    const { month } = request.query;

    if (!month) {
      return response.status(400).json({ message: "Month is required" });
    }

    const startDate = new Date(month);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    try {
      const counts = await Url.find({ user: request.userId }).countDocuments({
        createdAt: { $gte: startDate, $lt: endDate },
      });
      response.status(200).json({ counts });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  getTodayCount: async (request, response) => {
    try {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();

      const count = await Url.find({ user: request.userId }).countDocuments({
        createdAt: {
          $gte: new Date(year, month, day),
          $lt: new Date(year, month, day + 1),
        },
      });

      response.status(200).json({ count });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
    }
  },
  getUrl: async (request, response) => {
    try {
      const endpoint = request.params.endpoint;

      const url = await Url.findOne({
        endpoint,
      });

      if (!url) {
        return response.status(404).send({ message: "Url not found" });
      }
      url.views = url.views + 1;

      await url.save();

      return response.status(200).json(url);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },
  deleteUrl: async (request, response) => {
    try {
      const endpoint = request.params.endpoint;

      const url = await Url.findOneAndDelete({
        endpoint,
      });

      if (!url) {
        return response.status(404).send({ message: "Url not found!" });
      }

      return response.status(200).json({ message: "Url Deleted!" });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },
};

module.exports = urlsController;
