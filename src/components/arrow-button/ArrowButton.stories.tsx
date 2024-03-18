import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;
const [isOpen, setIsOpen] = useState(false);
export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			</>
		);
	},
};
