import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { saveAs } from 'file-saver';

interface PeriodicElement {
  COLUMN_1: string;
  COLUMN_2: string;
  COLUMN_3: string;
  COLUMN_4: string;
  COLUMN_5: string;
}

var splitted_line;

// As with JSON, use the Fetch API & ES6.
@Component({
  selector: 'app-filter-sort-select-example',
  templateUrl: './filter-sort-select-example.component.html',
  styleUrls: ['./filter-sort-select-example.component.css']
})
export class FilterSortSelectExampleComponent implements OnInit {


  ELEMENT_DATA: PeriodicElement[] = [];
  selected_count=0;
  show: boolean = false;  
  reset_btn_show=false;
  displayedColumns: string[] = ['select', 'COLUMN_1', 'COLUMN_2', 'COLUMN_3', 'COLUMN_4', 'COLUMN_5'];
  dataSource = new TableVirtualScrollDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  select_count=0;
  data_list = [{'COLUMN_1' : ''}];
  myObjArray = [{COLUMN_1: "", COLUMN_2: "", COLUMN_3: "", COLUMN_4: "", COLUMN_5: ""}];
  save_text="";
  displayValue=[{input_value:""}];
  tdStyle:string;
  public show1:boolean = false;
  public buttonName:any = 'Show';
  playerName: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.readFile();
  }

  readFile() {
    fetch('assets/input.txt')
    .then(response => response.text())
    .then(data => {
      splitted_line = data.split("\n"); 
      for (let i = 0; i < splitted_line.length; i++) {
          var one_line=splitted_line[i];
          var splitted_data=one_line.split(",");
          this.ELEMENT_DATA.push(
            { COLUMN_1: splitted_data[0], COLUMN_2: splitted_data[1], COLUMN_3: splitted_data[2], COLUMN_4: splitted_data[3], COLUMN_5: splitted_data[4] }
          );       
      }
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.sort = this.sort;

    });
  }

  returnColumn(str : any){
    switch (str)
    {
        case "0":
          return {color : 'red'}
        case "1":
          return {color : 'green', background:'red'}
        case "2":
          return {color : 'blue'}
        default:
          return;
          break;
    }
  }

  toggle() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** When users click download button, this part is performed */
  download()
  {
    console.log(this.save_text);
    const blob = 
    new Blob([
              this.save_text], 
             {type: "text/plain;charset=utf-8"});
    saveAs(blob, "SAMPLE_OUTPUT.txt");
  }

  /** When users click Button121 button, this part is performed */
  Button121()
  {
    this.reset_btn_show=true;
    this.displayValue = [
      {input_value:"Btn 121 clicked"}
  ];
  }

  /** When users click Process button, this part is performed */
  process(second_value:any, third_value:any, fourth_value:any)
  {
        this.displayValue = [
          {input_value:"Label2 : "+second_value},
          {input_value:"Label3 : "+third_value},
          {input_value:"Label4 : "+fourth_value}
        ];
        this.reset_btn_show=true;
  }

  /** When users click Reset button, this part is performed */
  Reset()
  {
    this.displayValue=[];
    this.reset_btn_show=false;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(e:any, row?: PeriodicElement): string {

    if (e.checked)
    {
        this.show=true;
        this.myObjArray.unshift({COLUMN_1: row?row.COLUMN_1:"", COLUMN_2: row?row.COLUMN_2:"", COLUMN_3: row?row.COLUMN_3:"", COLUMN_4: row?row.COLUMN_4:"", COLUMN_5: row?row.COLUMN_5:""});
        this.save_text+=row?.COLUMN_1+","+row?.COLUMN_2+","+row?.COLUMN_3+","+row?.COLUMN_4+","+row?.COLUMN_5+"\n";
        this.select_count++;
    } 
    else{
      this.select_count--;
      let oldString = "stackoverflow";   
      let position=row?.COLUMN_1+","+row?.COLUMN_2+","+row?.COLUMN_3+","+row?.COLUMN_4+","+row?.COLUMN_5+"\n";
      this.save_text= this.save_text.replace(position,"");
      if (this.select_count==0)
      {
        this.show=false;
      }
    }
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${4 + 1}`; 
  }

}
