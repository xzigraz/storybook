import { MainLayout } from "@/ui-component/Layout/mainLayout"
import { SectionLayout } from "@/ui-component/Layout/sectionLayout"
import "@/ui-component/scss/_button.scss";
import clsx from "clsx";

type ButtonExampleProps = {
	title: string
	buttonClasses?: string
	buttonType?: "button" | "link"
	buttonAction?: () => void
	href?: string
	linkTarget?: "_blank" | "_self"
}

const ButtonExample = ({
	title,
	buttonClasses = "primary",
	buttonType = "button",
	buttonAction = () => {alert("clicked")},
	href = "#",
	linkTarget = "_self"
}: ButtonExampleProps) => {
	return <MainLayout className="button-page">
		<>
			<SectionLayout>
				<>
					<h1>{title}</h1>
					{buttonType === "button" 
						? <button className={clsx("td-button", buttonClasses && buttonClasses)} onClick={buttonAction}>Button</button>
						: <a href={href} className={clsx("td-button", buttonClasses && buttonClasses)} target={linkTarget}>Button</a>
					}
					
				</>
			</SectionLayout>
		</>
	</MainLayout>
}

export default ButtonExample;