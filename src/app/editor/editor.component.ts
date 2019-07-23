import { Component, OnInit, Input, Compiler, HostBinding, OnChanges, SimpleChanges  } from '@angular/core';
import { CompilerService, EncodedACI } from '../compiler.service'
import { Contract } from '../contracts/hamster';
import { ContractControlService } from '../contract-control.service';
import { ContractBase } from '../question/contract-base';
import { Subscription } from 'rxjs';
import { getNumberOfCurrencyDigits } from '@angular/common';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']/* ,
  providers: [ CompilerService ] */
})
export class EditorComponent implements OnInit {

  // set the editor's style:
  //@HostBinding('attr.class') css = 'ui segment container';

  // listen to compiler events asking to send code
  subscription: Subscription;

  // note if this editor is currently in active tab
  isActiveTab : boolean = true;

  // import default contract, after that set this with editor's content
  contract: Contract<string> = new Contract();
  constructor(private compiler: CompilerService, private controlService: ContractControlService) { }

  editorOptions = {theme: 'vs-dark', language: 'sophia'};

  ngOnInit() {
    this.subscription = this.compiler._fetchActiveCode
      .subscribe(item => {console.log("Im editor angekommen !"); 
    return this.compile();}); 
  }

  change(){
    console.log("Shit done changed!");
  }

  // for now, just set the ACI
  compile() : void {
    //console.log("compile gerunnt");
    return this.compiler.compile(this.contract.code);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
