const prisma = require("../config/prisma.js");

exports.searchUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const currentUserId = req.user.id;

    if (!search)
      return res.status(400).json({ message: "Search term required" });

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: search,
          mode: "insensitive",
        },
        id: {
          not: currentUserId,
        },
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        about: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
