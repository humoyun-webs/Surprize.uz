
const isStudent = (req, res, next) => {
  const user = req.user;

  console.log(user);
  if (user.role === "student") {
    return next();
  } else {
    return res.status(403).json({ message: "Permission denied for student role" });
  }
};


const isCompAdmin = (req, res, next) => {
  const user = req.user;

  if (user.role === "comp_admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Permission denied for company Admin role" });
  }
};


const isOperator = (req, res, next) => {
  const user = req.user;

  console.log(user);
  if (user.role === "operator") {
    return next();
  } else {
    return res.status(403).json({ message: "Permission denied for Operator role" });
  }
};

module.exports = {isStudent,isOperator,isCompAdmin};