import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  reactiveForm: FormGroup;
  availableLocations: string[] = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Dallas'];  // Example locations
  selectedLocations: string[] = [];
  selectedLocation: string | null = null; // Track the currently selected location

  constructor(private formBuilder: FormBuilder) {
    this.reactiveForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      readAccess: [false],
      writeAccess: [false],
      otherAccess1: [false],
      otherAccess2: [false],
    });
  }

  getAvailableLocations(): string[] {
    return this.availableLocations;
  }

  getSelectedLocations(): string[] {
    return this.selectedLocations;
  }

  // Set selected location
  selectLocation(location: string): void {
    this.selectedLocation = location;  // Set the clicked location as selected
  }

  // Add selected location to the selected locations list
  addLocation(): void {
    if (this.selectedLocation && this.availableLocations.includes(this.selectedLocation)) {
      // Remove the selected location from available locations and add to selected locations
      this.availableLocations = this.availableLocations.filter(loc => loc !== this.selectedLocation);
      this.selectedLocations.push(this.selectedLocation);
      this.selectedLocation = null;  // Reset selected location
    }
  }

  // Remove selected location from selected locations list and add it back to available locations
  removeLocation(): void {
    if (this.selectedLocation && this.selectedLocations.includes(this.selectedLocation)) {
      // Remove the selected location from selected locations and add it back to available locations
      this.selectedLocations = this.selectedLocations.filter(loc => loc !== this.selectedLocation);
      this.availableLocations.push(this.selectedLocation);
      this.selectedLocation = null;  // Reset selected location
    }
  }

  onSubmit(): void {
    if (this.reactiveForm.valid) {
      console.log('Form Submitted!', this.reactiveForm.value);
      console.log('Selected Locations:', this.selectedLocations);
    }
  }
}
