import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [RouterModule],
})
export class HeaderComponent {
  header: string | undefined;
  title = 'angular-project';

  constructor() {}
}
