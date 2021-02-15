import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {TagService} from '../../services/tags/tag.service';
import {Tag} from '../../models/tag.interface';

@Component({
  selector: 'app-tag-searchbar',
  templateUrl: './tag-searchbar.component.html',
  styleUrls: ['./tag-searchbar.component.css']
})
export class TagSearchbarComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  @Input() tags: Tag[] = [];
  allTags: Tag[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Output() tagChange = new EventEmitter<Tag[]>();

  constructor(public tagService: TagService) {
    this.tagService.getAllTags().subscribe((res) => {
      this.allTags = res;
    });
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log(this.tags);
    // Add our tag
    if ((value || '').trim()) {
      this.tagService.addTag(value.trim()).subscribe(res => {
        this.tags.push(res);
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
    this.tagChange.emit(this.tags);
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.tagChange.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.tagChange.emit(this.tags);
  }

  private _filter(value: string): Tag[] {
    if (typeof(value) === 'string'){
      const filterValue = value.toLowerCase();

      return this.allTags.filter(tag => tag.title.toLowerCase().indexOf(filterValue) === 0);
    }
    else{
      return this.allTags;
    }
  }
}
