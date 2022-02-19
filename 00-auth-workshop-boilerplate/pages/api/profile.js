import users from "../../data/json/users.json";

export default function handler(req, res) {
  const { id } = req.query;

  const user = users.filter((user) => user.id === id).shift() ?? [];

  res.json({
    user,
  });
}
