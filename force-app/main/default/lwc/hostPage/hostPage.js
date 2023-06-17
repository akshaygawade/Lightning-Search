import { LightningElement, track } from 'lwc';
export default class HostPage extends LightningElement {
    @track hasAccess = false;
    @track selectedId = undefined;
    @track pinWhereClause = 'Activo__c = true';
    @track selectedRecord = undefined;;

    onRecordSelection(event){
        this.selectedId = event.detail.Id;
        this.selectedRecord = event?.detail;
    }

    connectedCallback() {
        window.searchConfig = {
            objectname: "Contact",
            fieldsToFilter: {
                                "Name":"String", 
                                "OtherPhone":"PhoneNumber", 
                                "Phone":"PhoneNumber", 
                                "Email":"Email"
                            },
            datatype: ["String","PhoneNumber","Email"],
            whereClause : `{ Active__c: { eq: true } }`,
            fieldstoquery :"Name,Phone,Email,CleanStatus,Title,CreatedDate"
        };
    } 
}