import { useState, useRef, FormEvent } from 'react';
import { Text } from '../text';
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
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (items: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [articleParamsState, setArticleParamsState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setArticleParamsState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleResetArticleState = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState({ ...defaultArticleState });
		setArticleParamsState({ ...defaultArticleState });
	};

	const handleApplyArticleState = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState({ ...articleParamsState });
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((prevState) => !prevState)}
			/>
			<aside
				ref={rootRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApplyArticleState}
					onReset={handleResetArticleState}>
					<Text size={31} uppercase={true} weight={800}>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						onChange={handleOnChange('fontFamilyOption')}
						selected={articleParamsState.fontFamilyOption}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						name={'размер шрифта'}
						title={'размер шрифта'}
						onChange={handleOnChange('fontSizeOption')}
						selected={articleParamsState.fontSizeOption}
						options={fontSizeOptions}
					/>
					<Select
						title={'цвет шрифта'}
						onChange={handleOnChange('fontColor')}
						selected={articleParamsState.fontColor}
						options={fontColors}></Select>
					<Separator />
					<Select
						title={'цвет фона'}
						onChange={handleOnChange('backgroundColor')}
						selected={articleParamsState.backgroundColor}
						options={backgroundColors}
					/>
					<Select
						title={'ширина контента'}
						onChange={handleOnChange('contentWidth')}
						selected={articleParamsState.contentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
