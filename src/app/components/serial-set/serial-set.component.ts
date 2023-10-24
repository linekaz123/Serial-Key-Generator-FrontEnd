import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerialSet } from 'src/app/models/SerialSet/serial-set';
import { SerialSetService } from 'src/app/services/serial-set.service';

@Component({
  selector: 'app-serial-set',
  templateUrl: './serial-set.component.html',
  styleUrls: ['./serial-set.component.css'],
})
export class SerialSetComponent implements OnInit {
  serialSets: SerialSet[] = [];
  serialSetForm!: FormGroup;
  selectedSerialSet: SerialSet =new SerialSet();

  constructor(private serialSetService: SerialSetService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllSerialSets();
  }

  getAllSerialSets(): void {
    this.serialSetService.getAllSerialSets().subscribe(
      (data) => {
        this.serialSets = data;
      },
      (error) => {
        console.error('Error fetching serial sets:', error);
      }
    );
  }

  initForm(): void {
    this.serialSetForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      configuration: [false],
      serialLength: [0],
      numbers: [false],
      upperCase: [false],
      lowerCase: [false],
      exclusions: [''],
    });
  }

  createSerialSet(): void {
    if (this.serialSetForm.valid) {
      const newSerialSet: SerialSet = {
        ...this.serialSetForm.value,
      };

      this.serialSetService.createSerialSet(newSerialSet).subscribe(
        (createdSerialSet) => {
          console.log('Serial Set created successfully:', createdSerialSet);
          this.getAllSerialSets();
          this.serialSetForm.reset();
          alert('Serial Set created successfully!');
        },
        (error) => {
          console.error('Error creating serial set:', error);
          alert('Error creating serial set. Please try again.');
        }
      );
    }
  }

  getSerialSetById(id: number): void {
    this.serialSetService.getSerialSetById(id).subscribe(
      (serialSet) => {
        this.selectedSerialSet = serialSet;
        console.log('Serial Set by ID:', serialSet);
      },
      (error) => {
        console.error('Error fetching serial set by ID:', error);
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
      }
    );
  }

  toggleButtons(serialSet: SerialSet): void {
    this.selectedSerialSet = serialSet;
  }

  cancel(): void {
    this.serialSetForm.reset();
    this.selectedSerialSet = new SerialSet();
  }
}
