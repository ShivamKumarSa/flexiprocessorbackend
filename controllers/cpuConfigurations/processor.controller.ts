import { Request, Response } from 'express';
import Processor from '../../models/processor.model';

export const createProcessor = async (req: Request, res: Response) => {
  const { company, name, RAMType, baseClockSpeed, coreCount } = req.body;
  const newProcessor = new Processor({ company, name, RAMType, baseClockSpeed, coreCount });
  console.log(newProcessor);
  try {
    await newProcessor.save();
    res.status(201).json(newProcessor);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const getProcessor = async (req: Request, res: Response) => {
  // Get id from req.body
  const { id } = req.body;
  console.log(id);
  try {
    const ProcessorData = await Processor.findById({ id });
    res.status(200).json(ProcessorData);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getProcessors = async (req: Request, res: Response) => {
  try {
    const Processors = await Processor.find();
    res.status(200).json(Processors);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
