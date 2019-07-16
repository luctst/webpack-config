const app = document.getElementById("root");
const h1 = document.createElement("h1");
const p = document.createElement("p");

class Homepage {
	constructor() {
		this.render();
	}

	render() {
		const h1 = document.createElement("h1");
		const ul = document.createElement("ul");
		const todo = [
			"Read the README file"
		];

		h1.textContent = "Hello world ! read the list below";

		todo.forEach(el => {
			const li = document.createElement("li");

			li.textContent = el;
			ul.appendChild(li);
		});

		app.appendChild(h1);
		app.appendChild(ul);
	}
}

new Homepage();
