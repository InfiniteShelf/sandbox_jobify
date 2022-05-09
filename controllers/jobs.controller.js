const createJob = async (req, res) => {
  return res.send('Create job');
};

const deleteJob = async (req, res) => {
  return res.send('Delete job');
};

const getAllJobs = async (req, res) => {
  return res.send('Get all jobs');
};

const updateJob = async (req, res) => {
  return res.send('Update job');
};

const showStats = async (req, res) => {
  return res.send('Show Stats');
};

export {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
};