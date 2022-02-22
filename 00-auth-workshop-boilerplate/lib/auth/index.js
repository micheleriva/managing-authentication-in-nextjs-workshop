export const cookieSettings = {
  cookieName: "auth",
  password: process.env.JWT_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};