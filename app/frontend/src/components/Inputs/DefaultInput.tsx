import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";

interface DefaultInputProps<T> {
	type: React.HTMLInputTypeAttribute;
	placeholder: string;
	icon: React.ReactElement;
	value: T;
	setter: Dispatch<SetStateAction<T>>;
	required?: boolean;
}

const DefaultInput = <T,>({ type, placeholder, icon, setter, required }: DefaultInputProps<T>) => {
	return (
		<InputGroup>
			<InputLeftElement color="gray.300" fontSize="0.6em" maxH="0.6em" maxW="0.6em" p={4}>
				{icon as unknown as React.ReactNode}
			</InputLeftElement>
			<Input
				onChange={(e) => setter(e.target.value as T)}
				isRequired
				type={type}
				size="sm"
				required={required}
				borderColor="gray.400"
				borderRadius={4}
				placeholder={placeholder}
				pl={8}
				_placeholder={{ opacity: 0.2, color: "inherit" }}
			/>
		</InputGroup>
	);
};

export default DefaultInput;
