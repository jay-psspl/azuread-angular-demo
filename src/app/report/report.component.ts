import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureAdDemoService } from '../azure-ad-demo.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  pdfUrl?: SafeResourceUrl
 // reportStatus?: string

  constructor(private azureAdDemoService:AzureAdDemoService,
    private domSanitizer:DomSanitizer,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  getReport()
  {
    this.azureAdDemoService.getreport().subscribe(response=>{
      var urlCreator =  window.URL || window.webkitURL;
      this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(response));
    },
    (error:HttpErrorResponse) =>
    {
      if(error.status==401
        ||error.status==403)
        {
          this.snackBar.open('You are unauthorize')
        }
    })
  }

  // getReportStatus()
  // {
  //   this.azureAdDemoService.getReportStatus().subscribe
  //   (response=>
  //     {
  //       this.reportStatus=response.Status
  //     })
  // }

}
