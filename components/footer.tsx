import GithubBug from "@/assets/svgs/github";
import LinkedInBug from "@/assets/svgs/linkedin";
import { PATH_GITHUB, PATH_LINKEDIN, PATH_STORYBOOK } from "@/constants/paths";

const Footer = () => {
	return <footer>
		<p className="copy-right"><span className="material-symbols-outlined">copyright</span> 2024 The Departed Online.</p>
		<ul>
			<li>
				<a href={PATH_GITHUB} target="_blank">
					<GithubBug />
				</a>
			</li>
			<li>
				<a href={PATH_LINKEDIN} target="_blank">
					<LinkedInBug />
				</a>
			</li>
			<li>
				<a href={PATH_STORYBOOK} target="_blank">Storybook</a>
			</li>
		</ul>
	</footer>
}

export default Footer;