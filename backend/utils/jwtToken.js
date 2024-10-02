export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookieName, token, {
        expire: new Date(Date.now() +process.env.COKIE_EXPIRE * 24 * 60 * 60 * 1000),

    }).json({
        success: true,
        message,
        user,
        token,
    });
}