import { LightningElement, api, track } from 'lwc';

export default class SearchResult extends LightningElement {
    @api record;
    @api fieldstodisplay;
    @track row = [];
    fireOnSelectionEvent(event) {
        this.dispatchEvent(new CustomEvent('select', { detail: JSON.stringify(this.record) }));
    }
    connectedCallback() {
        let fieldsToDisplayList = this.fieldstodisplay.split(',');
        let resultDisplayData = '';
        for(let f in fieldsToDisplayList){
            if(this.record[fieldsToDisplayList[f]] != undefined)
                resultDisplayData += fieldsToDisplayList[f] +' : ' +this.record[fieldsToDisplayList[f]].value+' | ';
        }
        resultDisplayData = resultDisplayData.substring(0, resultDisplayData.lastIndexOf("|"))
        this.row.push({label: resultDisplayData});
        
    }
}