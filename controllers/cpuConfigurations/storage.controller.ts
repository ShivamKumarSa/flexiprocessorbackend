import { Request, Response } from 'express';
import Storage from '../../models/storage.model';

export const createStorage = async (req: Request, res: Response) => {
  const { company, storageType, capacity } = req.body;
  const newStorage = new Storage({ company, storageType, capacity });
  console.log(newStorage);
  try {
    await newStorage.save();
    res.status(201).json(newStorage);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const getStorage = async (req: Request, res: Response) => {
  // Get id from req.body
  const { id } = req.body;
  console.log(id);
  try {
    const StorageData = await Storage.findById({ id });
    res.status(200).json(StorageData);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getStorages = async (req: Request, res: Response) => {
  try {
    const Storages = await Storage.find();
    res.status(200).json(Storages);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
