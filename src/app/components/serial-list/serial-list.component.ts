import { Component, OnInit } from '@angular/core';
import { SerialSetResponse } from 'src/app/models/serial-set-response';
import { SerialSetService } from 'src/app/services/serial-set.service';

@Component({
  selector: 'app-serial-list',
  templateUrl: './serial-list.component.html',
  styleUrls: ['./serial-list.component.css']
})
export class SerialListComponent implements OnInit {

  serialSetsResponse: SerialSetResponse[] = [];
  selectedSerialSet: SerialSetResponse = new SerialSetResponse();

  constructor(private serialSetService: SerialSetService) {}

  ngOnInit(): void {
    this.getAllSerialSets();
  }

  getAllSerialSets(): void {
    this.serialSetService.getAllSerialSets().subscribe(
      (data) => {
        this.serialSetsResponse = data;
      },
      (error) => {
        console.error('Error fetching serial sets:', error);
        alert(`Error fetching serial sets: ${JSON.stringify(error)}`);
      }
    );
  }

  

  

  deleteSerialSetByName(name:string): void {
    this.serialSetService.deleteSerialSetByName(name).subscribe(
      (success) => {
        console.log('Delete success');
        this.getAllSerialSets();
        this.selectedSerialSet = new SerialSetResponse();
        alert(`Serial Set named ${name} deleted successfully!`);
      },
      (error) => {
        console.error('Error deleting serial set:', error);
  
        let errorMessage = 'Unknown error';
  
        if (error && error.error && error.error.message) {
          // Use the error message from the backend response
          errorMessage = error.error.message;
        }
  
        alert(`Error deleting serial set: ${errorMessage}`);
      }
    );
  }
  
  exportSerialNumbersToCSV(serialSetName: string): void {
    this.serialSetService.exportSerialNumbersToCSV(serialSetName).subscribe(
      (success) => {
        console.log('Export success');
        alert(`Serial Numbers exported to CSV successfully for Serial Set ${serialSetName}!`);
      },
      (error) => {
        console.error('Error exporting serial numbers:', error);
  
        let errorMessage = 'Unknown error';
  
        if (error && error.error && error.error.message) {
          // Use the error message from the backend response
          errorMessage = error.error.message;
        }
  
        alert(`Error exporting serial numbers: ${errorMessage}`);
      }
    );
  }
  
  

  toggleButtons(serialSet: SerialSetResponse): void {
    this.selectedSerialSet = serialSet;
  }

}
