import express, { Router } from 'express';
import {
  getPreDefinedConfiguration,
  getPreDefinedConfigurations,
} from '../../controllers/cpuConfigurations/popularConfiguration.controller';
import {
  getProcessor,
  getProcessors,
} from '../../controllers/cpuConfigurations/processor.controller';
import { getRAM, getRAMs } from '../../controllers/cpuConfigurations/ram.controller';
import { getStorage, getStorages } from '../../controllers/cpuConfigurations/storage.controller';

// Initiate The Admin Router
const CPUConfigRouter: Router = express.Router();

// ------- Processer Configuration Routes ---------- //

/**
 * To View the Information of all the RAMs
 * @description To get all the RAMs
 * @route GET/ api/processors/:processor_id
 */
CPUConfigRouter.get('/processors/:processor_id', getProcessor);

/**
 * To View the Information of all the RAMs
 * @description To get info for a specific ram
 * @route GET/ api/processors
 */
CPUConfigRouter.get('/processors', getProcessors);

// ------- RAM Configuration Routes ---------- //

/**
 * To View the Information of all the RAMs
 * @description To get all the RAMs
 * @route GET/ api/rams/:ram_id
 */
CPUConfigRouter.get('/rams/:ram_id', getRAM);

/**
 * To View the Information of all the RAMs
 * @description To get info for a specific ram
 * @route GET/ api/rams
 */
CPUConfigRouter.get('/rams', getRAMs);

// ------- Storage Configuration Routes ---------- //

/**
 * To View the Information of all the RAMs
 * @description To get all the RAMs
 * @route GET/ api/storages/:storage_id
 */
CPUConfigRouter.get('/storages/:storage_id', getStorage);

/**
 * To View the Information of all the RAMs
 * @description To get info for a specific ram
 * @route GET/ api/storages
 */
CPUConfigRouter.get('/storages', getStorages);

// ------- Popular Configuration Routes ---------- //

/**
 * To View the Information of all the RAMs
 * @description To get all the RAMs
 * @route GET/ api/storages/:storage_id
 */
CPUConfigRouter.get(
  '/preDefinedConfiguration/:preDefinedConfiguration_id',
  getPreDefinedConfiguration,
);

/**
 * To View the Information of all the RAMs
 * @description To get info for a specific ram
 * @route GET/ api/storages
 */
CPUConfigRouter.get('/PreDefinedConfigurations', getPreDefinedConfigurations);

// Export the Formed Router
export default CPUConfigRouter;
