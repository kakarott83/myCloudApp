import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  showFiller = false;
  events=[];
  opened: false;

  actionItems = [
    {label: 'Dashboard', icon: 'dashboard', link: 'dashboard'},
    {label: 'Neue Reise', icon: 'note_add', link: 'add-travel'},
    {label: 'Alle Reisen', icon: 'luggage', link: 'travels'},
    {label: 'Admin', icon: 'admin_panel_settings', link: 'admin'},
    {label: 'Test', icon: 'admin_panel_settings', link: 'myTravel'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
