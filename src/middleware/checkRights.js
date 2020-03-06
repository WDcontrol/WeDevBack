const checkRights = async (req, res, next) => {
  const user = req.user;
  const projectId = req.params.projectId;

  try {
    const project = user.projects.filter(project => {
      return project._id == projectId;
    });
    if (project.length == 0) throw new Error();

    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this project" });
  }
};

module.exports = checkRights;
