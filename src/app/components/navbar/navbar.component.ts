import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { LibraryService } from '../../services/library.service';
import { Member } from '../../models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentMember?: Member;
  activeLoansCount = 0;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraryService.getCurrentMember().subscribe(member => {
      this.currentMember = member;
      if (member) {
        this.activeLoansCount = member.activeLoans;
      }
    });

    this.libraryService.transactions$.subscribe(() => {
      this.libraryService.getCurrentMember().subscribe(member => {
        if (member) {
          this.activeLoansCount = member.activeLoans;
        }
      });
    });
  }
}
