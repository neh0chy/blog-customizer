import { useState, useRef, useEffect, FC } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
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
	setArticleState,
}: ArticleParamsFormProps) => {
	const [state, setState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);
	const arrowRef = useRef<HTMLDivElement>();

	useEffect(() => {
		const isClickedOutside = (evt: any) => {
			if (asideRef.current && !asideRef.current.contains(evt.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', isClickedOutside);
		return () => {
			document.removeEventListener('mousedown', isClickedOutside);
		};
	}, []);

	const handleOnChangeFontFamily = (selected: OptionType) => {
		setState({
			...state,
			fontFamilyOption: selected,
		});
	};

	const handleOnChangeFontSize = (selected: OptionType) => {
		setState({
			...state,
			fontSizeOption: selected,
		});
	};

	const handleOnChangeFontColor = (selected: OptionType) => {
		setState({
			...state,
			fontColor: selected,
		});
	};

	const handleOnChangeBackgroundColor = (selected: OptionType) => {
		setState({
			...state,
			backgroundColor: selected,
		});
	};

	const handleOnChangeContentWidth = (selected: OptionType) => {
		setState({
			...state,
			contentWidth: selected,
		});
	};

	const handleResetArticleState = (evt: React.FormEvent<HTMLFormElement>) => {
		// console.log(evt);
		evt.preventDefault();
		setArticleState({ ...defaultArticleState });
		setState({ ...defaultArticleState });
	};

	const handleApplyArticleState = (evt: React.FormEvent<HTMLFormElement>) => {
		// console.log(evt);
		evt.preventDefault();
		setArticleState({ ...state });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={asideRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApplyArticleState}
					onReset={handleResetArticleState}>
					<h3 className={styles.formTitle}>задайте параметры</h3>
					<Select
						title={'шрифт'}
						onChange={handleOnChangeFontFamily}
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}></Select>
					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						onChange={handleOnChangeFontSize}
						selected={state.fontSizeOption}
						title={'размер шрифта'}></RadioGroup>
					<Select
						title={'цвет шрифта'}
						onChange={handleOnChangeFontColor}
						selected={state.fontColor}
						options={fontColors}></Select>
					<Separator></Separator>
					<Select
						title={'цвет фона'}
						onChange={handleOnChangeBackgroundColor}
						selected={state.backgroundColor}
						options={backgroundColors}></Select>
					<Select
						title={'ширина контента'}
						onChange={handleOnChangeContentWidth}
						selected={state.contentWidth}
						options={contentWidthArr}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
