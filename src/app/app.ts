import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, signal } from '@angular/core';
@Component({
	selector: 'app-root',
	imports: [],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {

	links = signal<any>([]);

	constructor(private http:HttpClient){}

	ngOnInit() {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'X-Site-Identity': 'portfolio-admin-v1'
		});

		this.http.get('https://dashing-llama-639318.netlify.app/.netlify/functions/getMovies', { headers }).subscribe({
			next: (data: any) => {
				this.links.set(data)
			},
			error: err => {
				this.links.set([]);
			}
		});
	}

	openLink(link: string) {
		window.open(link)
	}
}
