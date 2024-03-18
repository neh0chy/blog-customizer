import { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<h3>задайте параметры</h3>
					<Select selected={null} options={[]}></Select>
					<RadioGroup
						name={'Размер шрифта'}
						options={[]}
						selected={{
							title: 'ewr',
							value: 'wer',
							className: 'wer',
							optionClassName: undefined,
						}}
						title={''}></RadioGroup>
					<Select selected={null} options={[]}></Select>
					<Select selected={null} options={[]}></Select>
					<Separator></Separator>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
