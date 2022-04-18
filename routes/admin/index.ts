import express, { Router } from 'express';
import { createPreDefinedConfiguration } from '../../controllers/cpuConfigurations/popularConfiguration.controller';
import { createProcessor } from '../../controllers/cpuConfigurations/processor.controller';
import { createRAM } from '../../controllers/cpuConfigurations/ram.controller';
import { createStorage } from '../../controllers/cpuConfigurations/storage.controller';

// Initiate The Admin Router
const adminRouter: Router = express.Router();

// ------- Configuration Routes ---------- //

/**
 * To Create a new Processor Type
 * @description Create a New Processor
 * @route POST/ api/admin/processor
 */
adminRouter.post('/processor', createProcessor);

/**
 * To Create a new RAM
 * @description Create a New RAM Type
 * @route POST/ api/admin/ram
 */
adminRouter.post('/ram', createRAM);

/**
 * To Create a new Storage
 * @description Create a New Storage Type
 * @route POST/ api/admin/storage
 */
adminRouter.post('/storage', createStorage);

/**
 * To Create a new Popular Configuration
 * @description Create a New Popular Configuration Type
 * @route POST/ api/admin/popularConfiguration
 */
adminRouter.post('/preDefinedConfiguration', createPreDefinedConfiguration);

// Export the Formed Router
export default adminRouter;
