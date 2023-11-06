import { Component, OnInit } from '@angular/core';
import { SerialSet } from 'src/app/models/SerialSet/serial-set';
import { SerialSetService } from 'src/app/services/serial-set.service';

@Component({
  selector: 'app-serial-list',
  templateUrl: './serial-list.component.html',
  styleUrls: ['./serial-list.component.css']
})
export class SerialListComponent implements OnInit {

  serialSets: SerialSet[] = [];
  selectedSerialSet: SerialSet = new SerialSet();

  constructor(private serialSetService: SerialSetService) {}

  ngOnInit(): void {
    this.getAllSerialSets();
  }

  getAllSerialSets(): void {
    this.serialSetService.getAllSerialSets().subscribe(
      (data) => {
        this.serialSets = data;
      },
      (error) => {
        console.error('Error fetching serial sets:', error);
        alert(`Error fetching serial sets: ${JSON.stringify(error)}`);
      }
    );
  }

  

  

  deleteSerialSetById(id: number): void {
    this.serialSetService.deleteSerialSetById(id).subscribe(
      (success) => {
        console.log('Delete success');
        this.getAllSerialSets();
        this.selectedSerialSet = new SerialSet();
        alert(`Serial Set with ID ${id} deleted successfully!`);
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
  
  

  toggleButtons(serialSet: SerialSet): void {
    this.selectedSerialSet = serialSet;
  }

}
