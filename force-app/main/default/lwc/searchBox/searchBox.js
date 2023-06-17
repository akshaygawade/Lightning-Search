import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { gql, graphql } from 'lightning/uiGraphQLApi';
const SEARCH_DELAY = 750;
var query;
var objectN;
var sConfing;

export default class SearchBox extends LightningElement {
    @api fieldsToDisplay;
    @api objectName;

    @track selectedId;
    @track selectedRecord;
    @api extraFieldsToQuery;
    @track results;
    @track error;
    @track searchKey ='';

    @wire(getObjectInfo, { objectApiName: "$objectName" })
    objectData;
   
    errors;
    constructor() {
        super();
        sConfing = window.searchConfig;
        console.log('window.searchConfig '+sConfing);
        objectN=sConfing?.objectname;
        let args=JSON.stringify(sConfing.fieldsToFilter, null, 2)
                .replace(/"([^"]+)":/g, "$$$1: ")
                .replace(/"/g, "")
                .replace(/,/g, ", ")
                .slice(1, -1) ;
        let or = Object.keys(sConfing.fieldsToFilter).map(key => { return `{ ${key}: { eq: $${key} } }`; }).join('\n');
        let where =sConfing?.whereClause ? ','+sConfing.whereClause:'';
        let fieldsToQuery = '';

        if(sConfing?.fieldstoquery){
            sConfing.fieldstoquery.split(",").forEach((field) => {
                fieldsToQuery += `${field} {\n\tvalue\n}\n`;
            }); 
        }   
        
        query = `query searchContacts (${args}) {
            uiapi {
                query {
                    ${objectN}(
                        first: 10
                        where: { 
                            and: [
                                {
                                    or: [\n${or}\n]
                                } 
                                ${where}
                            ]
                        }   
                    ){
                        edges {
                            node {
                                Id
                                ${fieldsToQuery}
                            }
                        }
                    }
                }
            }
        }`;
    }

    @wire(graphql, {
        query: gql`${query}`,
        variables: '$variables',
        operationName: 'searchContacts'
    })
    graphqlQueryResult({ data, errors }) {
        if(!this.searchKey) return;
        if (data) {
            let res = data.uiapi.query.Contact.edges.map(edge => edge.node);
            this.results= res.length?res:undefined;
            if(!this.results) this.handleError("ERROR! ", "Did not find any contact, Please try with unique value ", "error");
        }else{
            this.errors = errors;
            this.handleError("ERROR! ", "Error occured in search", "error");
        }
    }
    
    get variables() {
        let varToReturn={};
        if(sConfing){
            for (let key in sConfing?.fieldsToFilter ){
                varToReturn[key]=this.searchKey;
            } 
        } 
        return varToReturn; 
    }
    onkeyUpChange(event) {
        const isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            this.selectedId = undefined;
            this.timeoutId = setTimeout(this.callDoSearch.bind(this, event.target), SEARCH_DELAY);
        }
    }

    callDoSearch(target) {
        this.searchKey = target.value;
    }

    handleSelectionChangeEvent(event) {
        let record = JSON.parse(event.detail);
        this.selectedId = record.Id;
        this.dispatchEvent(
            new CustomEvent("recordselect", { detail: this.selectedId })
        );
        this.selectedRecord = record;
        this.dispatchEvent(new CustomEvent("selectedrecord", { detail: this.selectedRecord }));
        this.results = undefined;
    }

    handleError(title, msg, variant) {
        const showError = new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant
        });
        this.dispatchEvent(showError);
    }
}