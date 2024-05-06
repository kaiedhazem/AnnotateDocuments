import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonGenerateService } from './json-generate.service'; 
import {CommonModule} from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  @ViewChild('textContainer') textContainer: ElementRef | undefined;
  
  colors: any = ["red", "blue", "purple", "black", "brown", "olive", "orange", "aqua", "fuchsia", "gold"]
  Labels: any = []; 
  loading: boolean = false; 
  file!: any;  
  fileOutput: any;
  label = new FormControl("");
  selectedLabel = {"labelName": "",
                   "labelColor": "",
                   "start": "",
                   "end": "",
                   "text": ""
                  };
  selectedLabels: any = [];                

  constructor(private jsonGenerateService: JsonGenerateService) { } 

  ngOnInit(): void { 
  } 

  onChange(event : any) { 
      this.file = event.target.files[0]; 
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileOutput = e.target.result;
      };

    reader.readAsText(this.file);
  } 

  // OnClick of button Upload 
  onDisplay() { 
      this.loading = !this.loading; 
  } 

  onAdd(event: any){
    //console.log(this.label.value);
    this.Labels.push(this.label.value);
    this.label.setValue("");
    //console.log(this.Labels);
    
  }

  labelClicked(currentColor: any, currentLabel: any){
    this.selectedLabel.labelColor = currentColor;
    this.selectedLabel.labelName = currentLabel;
    this.selectedLabel.text= "";
    this.selectedLabel.start = "";
    this.selectedLabel.end = "";
    //console.log("SelectedLabel: ", this.selectedLabel);
  }

  highlightSelectedText(container: HTMLDivElement) {
    if (this.selectedLabel.labelColor!= "" && this.selectedLabel.labelName != "") {
      var selection = window.getSelection();
      if (selection) {
        //console.log(selection);
        
        var range = selection.getRangeAt(0);
        var selectedText = range.toString();
        const startNode = range.startContainer;
        const startIndex = range.startOffset;
        const endNode = range.endContainer;
        const endIndex = range.endOffset;
        var span = document.createElement('span');

        //console.log(range);
        
        span.textContent = selectedText;
        span.style.backgroundColor= this.selectedLabel.labelColor;
        
        range.deleteContents();
        range.insertNode(span);
        selection.removeAllRanges();

        this.selectedLabel.text= selectedText;
        this.selectedLabel.start = startIndex.toString();
        this.selectedLabel.end = endIndex.toString();

        //console.log("after filling:" ,this.selectedLabel);
        let temp = this.selectedLabel;
        this.selectedLabels.push({...temp});
        //console.log(this.selectedLabels);
        
      }
    }
    else {
      alert("YOU HAVE TO SELECT A LABEL FIRST, PLEASE!" )
    }
  }

  sendData(){
    let labelsToSend= [];
    let temp = {"start" : "", "end": "", "label": "", "text": ""};
    for (let index = 0; index < this.selectedLabels.length; index++) {
      temp.start = this.selectedLabels[index].start;
      temp.end = this.selectedLabels[index].end;
      temp.label = this.selectedLabels[index].labelName;
      temp.text = this.selectedLabels[index].text;
      labelsToSend.push({...temp});
    }

    let dataToSend = {
      "text": this.fileOutput,
      "annotation": labelsToSend
    }
    this.jsonGenerateService.generateJson(dataToSend)
      .subscribe(
        response => {
          console.log('Successful response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
  }

