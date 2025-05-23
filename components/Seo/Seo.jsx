import Head from 'next/head'

const Seo = ({ children, title, description, keywords }) => {
	return (
		<Head>
			<meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<title>{title}</title>

			{children}
		</Head>
	)
}

Seo.defaultProps = {
	title: 'New title',
	description:
		'New Description',
	keywords:
		'New Keywords',
}

export default Seo
