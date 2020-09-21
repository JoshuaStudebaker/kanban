import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listService } from "../services/ListService";

//PUBLIC
export class ListsController extends BaseController {
  constructor() {
    super("api/lists");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      // .get("", this.getAll)
      // .get("/:id", this.getById)
      .get("/:id/tasks", this.getTasksByListId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getTasksByListId(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await tasksService.find({ listId: req.params.id });
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await listService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await listService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await listService.delete(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }

  // // async getAll(req, res, next) {
  // //   try {
  // //     //only gets lists by user who is logged in
  // //     let data = await listService.getAll(req.userInfo.email);
  // //     return res.send(data);
  // //   } catch (err) {
  // //     next(err);
  // //   }
  // // }
  // async getById(req, res, next) {
  //   try {
  //     let data = await listService.getById(req.params.id, req.userInfo.email);
  //     return res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
