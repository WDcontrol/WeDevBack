const checkRights = async (req, res, next) => {
  const user = req.user;
  const projectId = req.params.projectId;

  try {
    // project rights
    const project = user.projects.filter(project => {
      return project._id == projectId;
    });
    if (project.length == 0) throw new Error();

    // sprint rights
    if (req.params.sprintId) {
      const sprint = project[0].sprints.filter(sprint => {
        return sprint._id == req.params.sprintId;
      });
      if (sprint.length == 0) throw new Error();
    }

    next();
  } catch (error) {
    const errorString = req.params.sprintId
      ? "Not authorized to access this sprint"
      : "Not authorized to access this project";

    res.status(401).send({ error: errorString });
  }
};

module.exports = checkRights;
