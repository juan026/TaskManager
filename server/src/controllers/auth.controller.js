const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");


const register = async (req, res) => {
    //logic for user registration
    const { email, password } = req.body;

    //validate not empty email and password
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
   
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (user) {
        return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    });
    return res.status(201).json({ message: "User registered successfully" });
}

const login = async (req, res) => {

    //logic for user login
    const { email, password } = req.body;

    //validate not empty email and password
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token =jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    return res.status(200).json({ message: "Login successful", token });

}

module.exports = {
    register,
    login
};
