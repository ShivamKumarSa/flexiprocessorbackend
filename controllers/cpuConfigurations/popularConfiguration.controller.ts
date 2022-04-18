import { Request, Response } from 'express';
import PreDefinedConfiguration from '../../models/preDefinedConfigurations.model';
import RAM from '../../models/ram.model';
import Processor from '../../models/processor.model';
import Storage from '../../models/storage.model';

export const createPreDefinedConfiguration = async (req: Request, res: Response) => {
  const { name, ram, processor, storage, description } = req.body;
  const newPreDefinedConfiguration = new PreDefinedConfiguration({
    name,
    ram,
    processor,
    storage,
    description,
  });
  console.log(newPreDefinedConfiguration);
  try {
    await newPreDefinedConfiguration.save();
    res.status(201).json(newPreDefinedConfiguration);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const getPreDefinedConfiguration = async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(id);
  try {
    const PreDefinedConfigurationData = await PreDefinedConfiguration.findById({ id });
    res.status(200).json(PreDefinedConfigurationData);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getPreDefinedConfigurations = async (req: Request, res: Response) => {
  try {
    const PreDefinedConfigurations = await PreDefinedConfiguration.find();
    const RAMData = await RAM.find();
    console.log(RAMData);
    const ProcessorData = await Processor.find();
    const StorageData = await Storage.find();

    const PreDefinedConfigurationsArray: object[] = [];

    PreDefinedConfigurations.forEach((element: any) => {
      const ramObj = RAMData.find((e: any) => e._id.equals(element.ram));
      const processorObj = ProcessorData.find((e: any) => e._id.equals(element.processor));
      const storageObj = StorageData.find((e: any) => e._id.equals(element.storage));
      const currDesc = element.description;
      const configurationName = element.name;
      const tempPreDefinedConfiguration = {
        ramObj,
        processorObj,
        storageObj,
        currDesc,
        configurationName,
      };
      PreDefinedConfigurationsArray.push(tempPreDefinedConfiguration);
    });

    res.status(200).json(PreDefinedConfigurationsArray);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
