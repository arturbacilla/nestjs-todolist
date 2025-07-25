import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import DefaultResponse from "../utils/default";
import ResponseError from "../utils/error";
import { TaskService } from "./task.service";
import { NewTaskDto, ToggleStatusDto, UpdateTaskDto } from "./types";

@Controller()
export class TaskController {
	constructor(private taskService: TaskService) {}

	@Get("tasks/:id")
	async getTasks(@Param("id") userId: string) {
		const allTasks = await this.taskService.getTasks(Number(userId));
		if (!allTasks || allTasks instanceof Prisma.PrismaClientKnownRequestError) {
			throw new ResponseError<Prisma.PrismaClientKnownRequestError>(
				allTasks as Prisma.PrismaClientKnownRequestError,
				"INTERNAL_SERVER_ERROR",
			);
		}
		return new DefaultResponse<Prisma.TaskCreateArgs["data"]>(allTasks as any, "OK");
	}

	@Post("task")
	async addTask(@Body() body: NewTaskDto) {
		const { title, description, authorId } = body || {};
		const added = await this.taskService.addTask({
			title,
			description: description || undefined,
			authorId,
		});
		if (!added || added instanceof Prisma.PrismaClientKnownRequestError) {
			throw new ResponseError<Prisma.PrismaClientKnownRequestError>(
				added as Prisma.PrismaClientKnownRequestError,
				"INTERNAL_SERVER_ERROR",
			);
		}
		return new DefaultResponse<Prisma.TaskCreateArgs["data"]>(added, "OK");
	}

	@Get("task/:id")
	async getTask(@Param("id") id: string) {
		const task = await this.taskService.getTask({ id });
		if (!task) throw new ResponseError<Error>(Error("Task not found"), "NOT_FOUND");
		if (task instanceof Prisma.PrismaClientKnownRequestError) {
			throw new ResponseError<Prisma.PrismaClientKnownRequestError>(
				task as Prisma.PrismaClientKnownRequestError,
				"INTERNAL_SERVER_ERROR",
			);
		}
		return new DefaultResponse<Prisma.TaskCreateArgs["data"]>(task as Prisma.TaskCreateArgs["data"], "OK");
	}

	@Post("task/:id")
	async toggleTask(@Param("id") id: number, @Body() { status }: ToggleStatusDto) {
		const task = await this.taskService.getTask({ id });
		if (!task) throw new ResponseError<Error>(Error("Task not found"), "NOT_FOUND");

		const toggle = await this.taskService.toggleTask(id, status);
		if (!toggle) {
			throw new ResponseError<Error>(Error("Unable to toggle task"), "INTERNAL_SERVER_ERROR");
		}
		if (toggle instanceof Prisma.PrismaClientKnownRequestError) {
			throw new ResponseError<Prisma.PrismaClientKnownRequestError>(toggle, "INTERNAL_SERVER_ERROR");
		}
		return new DefaultResponse<Prisma.TaskUpdateArgs["data"] | boolean>(toggle, "OK");
	}

	@Put("task/:id")
	async updateTask(@Param("id") id: number, @Body() payload: UpdateTaskDto) {
		const updated = await this.taskService.updateTask(id, payload);
		if (!updated) {
			throw new ResponseError<Error>(Error("Task not found"), "NOT_FOUND");
		}
		if (updated instanceof Prisma.PrismaClientKnownRequestError) {
			throw new ResponseError<Prisma.PrismaClientKnownRequestError>(updated, "INTERNAL_SERVER_ERROR");
		}
		return new DefaultResponse<Prisma.TaskUpdateArgs["data"]>(updated, "OK");
	}

	@Delete("task/:id")
	async deleteTask(@Param("id") id: number) {
		const deleted = await this.taskService.deleteTask({
			id,
		});
		if (!deleted) {
			throw new ResponseError<Error>(Error("Task not found"), "NOT_FOUND");
		}
		if (deleted instanceof Prisma.PrismaClientKnownRequestError) {
			throw new ResponseError<Prisma.PrismaClientKnownRequestError>(deleted, "INTERNAL_SERVER_ERROR");
		}

		return new DefaultResponse<Prisma.TaskCreateArgs["data"]>(`Deleted task ${deleted.id}`, "OK");
	}
}
