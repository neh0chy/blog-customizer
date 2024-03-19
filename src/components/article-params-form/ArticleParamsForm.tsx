import { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyClasses,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (items: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const onChangeFontFamily = (selected: OptionType) => {
		setArticleState({
			...articleState,
			fontFamilyOption: selected,
		});
	};

	const onChangeFontSize = (selected: OptionType) => {
		setArticleState({
			...articleState,
			fontSizeOption: selected,
		});
	};

	const onChangeFontColor = (selected: OptionType) => {
		setArticleState({
			...articleState,
			fontColor: selected,
		});
	};

	const onChangeBackgroundColor = (selected: OptionType) => {
		setArticleState({
			...articleState,
			backgroundColor: selected,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<h3 className={styles.formTitle}>задайте параметры</h3>
					<Select
						title={'шрифт'}
						onChange={onChangeFontFamily}
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}></Select>
					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						onChange={onChangeFontSize}
						selected={articleState.fontSizeOption}
						title={'размер шрифта'}></RadioGroup>
					<Select
						title={'цвет шрифта'}
						onChange={onChangeFontColor}
						selected={articleState.fontColor}
						options={fontColors}></Select>
					<Separator></Separator>
					<Select
						title={'цвет фона'}
						onChange={onChangeBackgroundColor}
						selected={articleState.backgroundColor}
						options={backgroundColors}></Select>
					<Select
						title={'ширина контента'}
						selected={null}
						options={[]}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
