import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Dispatch, SetStateAction, useRef } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsProps = {
	openForm: boolean;
	toggleOpenForm: () => void;
	formState: ArticleStateType;
	setFormState: Dispatch<SetStateAction<ArticleStateType>>;
	setArticle: () => void;
	resetForm: () => void;
	setOpenForm: Dispatch<SetStateAction<boolean>>;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const changeStyle = (elem: OptionType, property: string) => {
		props.setFormState((prev) => ({
			...prev,
			[property]: elem,
		}));
	};

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submitForm');
		console.log(props.formState);
		props.setArticle();
	};

	const ref = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: props.openForm,
		rootRef: ref,
		onChange: props.setOpenForm,
	});

	return (
		<>
			<ArrowButton
				openForm={props.openForm}
				toggleOpenForm={props.toggleOpenForm}
			/>
			<aside
				ref={ref}
				className={clsx(styles.container, {
					[styles.container_open]: props.openForm,
				})}>
				{/* <aside className={styles.container}>	 */}
				<form className={styles.form} onSubmit={submitForm}>
					<Text
						as={'h2'}
						size={31}
						weight={800}
						fontStyle={'normal'}
						uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={props.formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(elem) => changeStyle(elem, 'fontFamilyOption')}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={props.formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(elem) =>
							changeStyle(elem, 'fontSizeOption')
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={props.formState.fontColor}
						options={fontColors}
						onChange={(elem) => changeStyle(elem, 'fontColor')}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						selected={props.formState.backgroundColor}
						options={backgroundColors}
						onChange={(elem) => changeStyle(elem, 'backgroundColor')}></Select>
					<Select
						title='Ширина контента'
						selected={props.formState.contentWidth}
						options={contentWidthArr}
						onChange={(elem) => changeStyle(elem, 'contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button onClick={props.resetForm} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
