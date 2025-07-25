import { AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	CircularProgress,
	Icon,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { MdAccountCircle, MdPermIdentity } from "react-icons/md";
import { requestPostPut } from "../../services/api";
import DefaultInput from "../Inputs/DefaultInput";

interface DefaultModal {
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
}

const NewUser: React.FC<DefaultModal> = ({ isOpen, onClose }) => {
	const toast = useToast();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [user, setUser] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleClick = () => setShowPassword(!showPassword);

	const handleSubmit = () => {
		setIsLoading(true);
		const endpoint = "/users/new";
		requestPostPut(
			endpoint,
			{
				name,
				user,
				email,
				password,
			},
			"",
			"post",
		)
			.then(() => {
				onClose(false);
				return toast({
					id: "success-new-user",
					title: `User created successfully.`,
					status: "success",
					isClosable: true,
				});
			})
			.catch(() => {
				return toast({
					id: "error-creating-user",
					title: `Error creating user. Check your data and try again.`,
					status: "error",
					isClosable: true,
				});
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isCentered isOpen={isOpen} onClose={() => onClose(false)}>
			<ModalOverlay />
			<ModalContent>
				<ModalBody pt={6}>
					{isLoading ? (
						<CircularProgress
							isIndeterminate
							color="orange.500"
							display="flex"
							alignItems="center"
							justifyContent="center"
							h="100%"
						/>
					) : (
						<>
							<form
								id="new-user"
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "12px",
								}}
							>
								<DefaultInput<string>
									type="email"
									icon={<AtSignIcon />}
									placeholder="Email"
									setter={setEmail}
									value={email}
									required
								/>
								<DefaultInput<string>
									type="text"
									icon={<Icon as={MdAccountCircle} />}
									placeholder="Username"
									setter={setUser}
									value={user}
									required
								/>
								<DefaultInput<string>
									type={showPassword ? "text" : "password"}
									required
									icon={
										<Button size="xs" onClick={handleClick} variant="unstyled" p={0}>
											{showPassword ? <ViewOffIcon /> : <ViewIcon />}
										</Button>
									}
									placeholder="Password"
									setter={setPassword}
									value={password}
								/>
								<DefaultInput<string>
									type="text"
									icon={<Icon as={MdPermIdentity} />}
									placeholder="Your name"
									setter={setName}
									value={name}
									required
								/>
							</form>
							<ButtonGroup display="flex" justifyContent="flex-end" pt={2}>
								<Button variant="outline" size="xs" onClick={() => onClose(false)}>
									Cancel
								</Button>
								<Button size="xs" colorScheme="green" onClick={handleSubmit}>
									Register
								</Button>
							</ButtonGroup>
						</>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default NewUser;
