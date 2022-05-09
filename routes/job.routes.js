import express from 'express';
import {
  createJob, deleteJob, getAllJobs, showStats, updateJob,
}              from '../controllers/jobs.controller.js';

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs);

router.get('/stats', showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;

