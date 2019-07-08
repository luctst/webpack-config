import webpackLogo from "./assets/img/webpack-logo.png";
import "./main.css";
const app = document.getElementById("root");

class Header {
	constructor() {
		this.render();
	}

	render() {
		const header = document.createElement("header");

		header.innerHTML = `
			<img src=${webpackLogo} alt='Webpack logo'/>
			<h1>Webpack Config</h1>
		`;

		app.appendChild(header);
	}
}


class Content {
	constructor() {
		this.render();
	}

	render() {
		const section = document.createElement("section");

		section.innerHTML = `
			<h2>Welcome on your App !! 👋 but what to do now ? </h2>
			<p>You can start by editing the <code>src/view/app.js</code> file to change your app 👨‍💻 .</p>
			<p>If you want more information's of how to use this app check this link 👉 <a href="https://github.com/luctst/create-web-app">README.md</a> 👈 .</p>
		`;

		app.appendChild(section);
	}
}

new Header();
new Content();
