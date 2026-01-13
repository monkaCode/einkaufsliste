import { Request, Response, NextFunction } from 'express';
import { ItemModel } from '../models/item';

export async function createItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body;

        const newItem = new ItemModel();
        newItem.name = name;
        newItem.createdAt = new Date(Date.now());
        await newItem.save();

        return res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
}

export async function getItems(req: Request, res: Response, next: NextFunction) {
    try {
        const items = await ItemModel.find();
        return res.status(200).json(items);
    } catch (error) {
        next(error);
    }
}

export async function updateItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { bought } = req.body;

        const item = await ItemModel.findById(id);
        if (!item) {
            return res.status(404).json();
        }

        item.bought = bought;
        await item.save();

        return res.status(200).json(item);
    } catch (error) {
        next(error);
    }
}

export async function deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const item = await ItemModel.deleteOne({_id: id});
        if (!item) {
            return res.status(404).json();
        }

        return res.status(204).json();
    } catch (error) {
        next(error);
    }
}