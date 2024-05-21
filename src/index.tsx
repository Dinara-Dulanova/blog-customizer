import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [openForm, setOpenForm] = useState(false);

	const toggleOpenForm = () => {
		setOpenForm((openForm) => !openForm);
		console.log('opF');
	};

	const [formState, setFormState] = useState(defaultArticleState); //параметры формы
	const [articleState, setArticleState] = useState({}); //параметры текста

	const setArticle = () => {
		console.log('setForm');
		setArticleState({
			'--font-family': formState.fontFamilyOption.value,
			'--font-size': formState.fontSizeOption.value,
			'--font-color': formState.fontColor.value,
			'--container-width': formState.contentWidth.value,
			'--bg-color': formState.backgroundColor.value,
		} as CSSProperties);
	};

	const resetForm = () => {
		console.log('resetForm');
		setFormState(defaultArticleState);
		setArticleState({});
	};

	return (
		<div className={clsx(styles.main)} style={articleState}>
			<ArticleParamsForm
				openForm={openForm}
				setOpenForm={setOpenForm}
				toggleOpenForm={toggleOpenForm}
				formState={formState}
				setFormState={setFormState}
				setArticle={setArticle}
				resetForm={resetForm}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
