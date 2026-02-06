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

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, bio } = req.body;

    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: username,
          NOT: { id: userId },
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        bio,
      },
      select: {
        id: true,
        username: true,
        email: true,

        bio: true,
      },
    });

    res.json({ message: "Profile updated!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
