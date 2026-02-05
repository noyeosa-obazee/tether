const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma.js");

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token: "Bearer " + token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
