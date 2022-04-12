/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Label, Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  ComponentName: string;

  teamId: string;
  teamDataReady: boolean = false;
  componentName:string ="ORGANIZATION-DETAILS";
  team: Team

  constructor(private startService: StartServiceService, private userService: UserServiceService, private backendService: BackendService, private route: ActivatedRoute, private navbarHandler: NavbarHandlerService, private functions: AngularFireFunctions,  public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];

    this.ComponentName = this.teamId;
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.ComponentName);

    if(this.startService.showTeams) {
      this.getTeamData();
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.getTeamData();
        }
      });
    }
    
  }

  getTeamData() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("teams/getTeamData");
    callable({OrganizationDomain: orgDomain, TeamId: this.teamId}).pipe(
      map(actions => {
        const data = actions.resultData as Team
        return data;
      })).subscribe({
        next: (data) => {
          this.team = data;
          data.TeamMembers.forEach((element: any) => {
            this.userService.checkAndAddToUsersUsingEmail(element);
          });
          this.userService.fetchUserData().subscribe(()=>{
            this.teamDataReady = true;
          });
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info("Completed getting Team Data...")
      });
  }

  createDefaultLabels() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/createDefaultLabels');
    const type: string[] = ["Bug", "Story", "Sub Task"];
    const statusLabels: string[] = ["Ice Box", "Ready to start", "Under Progress", "Blocked", "Completed"];
    const priorityLabels: string[] = ["High", "Medium", "Low"];
    const difficultyLabels: string[] = ["High", "Medium", "Low"];
    callable({OrganizationDomain: orgDomain, TeamName: this.team.TeamName, Type: type, StatusLabels: statusLabels, PriorityLabels: priorityLabels, DifficultyLabels: difficultyLabels}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Error", error);
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      },
      complete: () => console.info('Successful ')
  });
  }
}
