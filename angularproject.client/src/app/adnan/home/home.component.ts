
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.loadScript('assets/js/main.js'); // استبدل بالمسار الصحيح للملف
    this.loadScript('assets/js/plugins/swiper-bundle.min.js');
    this.loadScript('assets/js/plugins/jquery-ui.min.js');

  }

  loadScript(src: string) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
