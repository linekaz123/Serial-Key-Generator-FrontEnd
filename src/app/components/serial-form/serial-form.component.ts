import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SerialSet } from 'src/app/models/SerialSet/serial-set';
import { SerialSetService } from 'src/app/services/serial-set.service';

@Component({
  selector: 'app-serial-form',
  templateUrl: './serial-form.component.html',
  styleUrls: ['./serial-form.component.css']
})
export class SerialFormComponent implements OnInit {

  serialSets: SerialSet[] = [];
  serialSetForm!: FormGroup;
  selectedSerialSet: SerialSet = new SerialSet();

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
        alert(`Error fetching serial sets: ${JSON.stringify(error)}`);
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
          alert(`Serial Set created successfully: ${JSON.stringify(createdSerialSet)}`);
        },
        (error) => {
          console.error('Error creating serial set:', error);

          let errorMessage = 'Unknown error';

          if (error && error.error && error.error.message) {
            // Use the error message from the backend response
            errorMessage = error.error.message;
          }

          alert(`Error creating serial set: ${errorMessage}`);
        }
      );
    }
  }


  cancel(): void {
    this.serialSetForm.reset();
    this.selectedSerialSet = new SerialSet();
  }
}
