import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { TaskBoxProps } from "../../types/general";
import { ITask } from "../../types/task";
import TaskBox from ".";

interface IEditTask {
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<number | null>>;
	task: ITask | null;
	taskBoxProps: Pick<TaskBoxProps, "firstFieldRef" | "setIsLoading" | "fetchAllTasks">;
}

const EditTask: React.FC<IEditTask> = ({ isOpen, onClose, task, taskBoxProps }) => {
	if (!task) return;
	return (
		<Modal isCentered isOpen={isOpen} onClose={() => onClose(null)}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody pt={6}>
					<TaskBox type="edit" onCancel={() => onClose(null)} defaultName={task?.title} task={task} {...taskBoxProps} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default EditTask;
