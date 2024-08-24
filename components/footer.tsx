import GithubBug from "@/assets/svgs/github";
import LinkedInBug from "@/assets/images/LI-In-Bug.webp";

const Footer = () => {
	return <footer>
		<p className="copy-right"><span className="material-symbols-outlined">copyright</span> 2024 The Departed Online.</p>
		<ul>
			<li>
				<a href="https://github.com/xzigraz" target="_blank">
					<GithubBug />
				</a>
			</li>
			<li>
				<a href="//storybook.thedepartedonline.com/">Storybook</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/danielzzhu/" target="_blank">
					<img src={LinkedInBug.src} alt="LinkedIn Bug" title="Logo bug for LinkedIn.com" />
				</a>
			</li>
		</ul>
	</footer>
}

export default Footer;