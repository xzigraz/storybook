import { MainLayout } from "@/ui-component/Layout/mainLayout"
import { SectionLayout } from "@/ui-component/Layout/sectionLayout"
import { Loading, LoadingProps } from "@/ui-component/Loading/loading"
import "./loading.scss";

type LoadingExmapleProps = LoadingProps & {

}

const LoadingExample = ({
	loadingPlacement,
	repeat,
	style
}: LoadingExmapleProps) => {
	return <MainLayout className="loading-page">
		<>
			<SectionLayout>
				<>
					<h1>Example of showing Loadings in the page.</h1>
				</>
			</SectionLayout>
			<Loading repeat={repeat} loadingPlacement={loadingPlacement} style={style}/>
		</>
	</MainLayout>
}

export default LoadingExample;