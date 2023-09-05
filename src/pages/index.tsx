import { Layout } from "@/components/layouts";
import styles from "@/styles/Home.module.css";
import { Product, ProductsAPIResponse } from "@/types";
import { NextPage } from "next";
import { products } from '../data/products';
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { TEXTS_BY_LANGUAGE, defaultLocale } from "@/locale/constants";

interface Props {
	data: ProductsAPIResponse;
}
const Home: NextPage<Props> = ({data}) => {
	const {locale} = useRouter();

	if (!data) return <h1>loading...</h1>;

	const {MAIN} =
		TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
		TEXTS_BY_LANGUAGE[defaultLocale];
	// Traduciones borradas para el ejercicio
	return (
		<Layout>
			<main className={styles.main}>
				<h1>Tienda - {MAIN.PRODUCTS}</h1>
				<div className={styles.grid}>
					{data && data.map((product: Product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</main>
		</Layout>
	);
};

// Traer los datos de la API con getServerSideProps o getStaticProps
export const getServerSideProps = async ({locale}: {locale:string}) => {
	const baseUrl= "http://localhost:3000/"
	const response = await fetch(`${baseUrl}api/products/${locale}`);

	const data = await response.json();

	return {
		props: {
			data,
		},
	};

}


export default Home;
