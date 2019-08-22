import React, {Component, Fragment } from 'react';
import axios from 'axios';

import '../Impaas.css'

class Element extends Component {
    constructor() {
        super();
        this.state = {
            inputFieldValue: null,
        }
        this.renderSwitch = this.renderSwitch.bind(this);
        this.inputValueChanged = this.inputValueChanged.bind(this);
        
    }

    render() {
        return <div id={this.props.id + "_modal"} className="modal_impaas">
            <div className="modal-content-impaas">
                    <div className="modal-header">
                        <span id={this.props.id + "_modal_close"} className="close_impaas">&times;</span>
                        <h2 style={{ textAlign: "center" }}></h2>
                </div>
                    <div className="modal-body">
                    {this.props.fields.map((element, key) => {
                        return this.renderSwitch(element, this.props.id, key);
                    }
                    )}
                    <input id={this.props.id + "_save"} className="submit_button" type="submit" value="Save" onClick={() => this.props.nodeModalData(this.props.id)}/>
                </div>
            </div>
        </div>
    }

    inputValueChanged(event) {
        this.setState({ inputFieldValue: event.target.value });   
    }

    tableSelector(node_id, data_id, event) {
        const elementType = event.target.value;
        const select_id = node_id+"_"+(parseInt(data_id)+1);
        console.log("node_id : " + node_id)
        console.log("data_id : " + data_id)
        /* below code is hardcoded now..and based on id..2 lines above this-parseInt and 
        addition of 1 - check response of /getnodes for this */
        if(data_id === "1") {
            const get_tables_url = global.baseDomain+"/impaas/gettables/?tablespace=" + elementType
            axios.get(get_tables_url)
                .then(res => {
                    let select_table = document.getElementById(select_id);
                    var length_select_table = select_table.options.length;
                    if (length_select_table >1 ){
                        for (i = 0; i < length_select_table; i++) {
                            select_table.options[i] = null;
                        }
                    }
                    for (var i = 0; i <= res.data.length; i++) {
                        if (res.data[i] != undefined) {
                            var opt = document.createElement('option');
                            opt.value = res.data[i];
                            opt.innerHTML = res.data[i];
                            select_table.appendChild(opt);
                        }
                    }
                })
        }
    }
    renderSwitch(field, node_id, key) {
    switch (field.type) {
        case "input":
            return (
                <Fragment key={key}>
                    <label className="bold_class">{field.label}</label>
                    <input type="text" className="element_select" id={node_id + "_" + field.id} name="pocasinstance" value={this.state.inputFieldValue ? this.state.inputFieldValue : field.value} onChange={this.inputValueChanged} placeholder="Enter Pocaas Name" />
                </Fragment>
            )
        case "text":
            return (
                <Fragment key={key}>
                    <div className="flex-container">
                        <p className="bold_class">{field.label+" :"}</p>
                        <p id={node_id + "_" + field.id}>{field.value}</p>
                    </div>
                </Fragment>
            )
        case "select":
            return (
                <Fragment key={key}>                    
                    <label className="bold_class">{field.label}</label>
                    <select id={node_id + "_" + field.id} name="spark_master_shape" className="element_select" onChange={(e) => this.tableSelector(node_id, field.id, e)}>
                        {field.values.map((element, keyValue) => (
                            <option key={keyValue} value={element}>{element}</option>
                        ))}                    
                    </select>
                </Fragment>
            )

        case "file":
            return (
                <Fragment key={key}><div class="file-upload">
                    <div class="file-select">
                        <div class="file-select-button" id="fileName">Choose File</div>
                        <div class="file-select-name" id="noFile">No file chosen...</div>
                        <input type="file" name="chooseFile" id="chooseFile"/>
                    </div>
                </div> 
                </Fragment>
            )
        default:
            return null;
    }
}
};
export default Element;