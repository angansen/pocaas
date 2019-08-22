import React, { Component, Fragment } from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';

import '../ImpaasLanding.css'

class ImpaasLanding extends Component {
    constructor() {
        super();
        this.showAllPipelines = this.showAllPipelines.bind(this);
        this.state = {
            jobData : []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        window.onpopstate = () => {
            document.location.reload(true);
        }
    }

    showAllPipelines(){
        const modal = document.getElementById("import_pipeline_modal");
        modal.style.display = "block";
        const span = document.getElementById("import_pipeline_modal_close");
        span.onclick = function () {
            modal.style.display = "none";
        }
        //implement 401 here
        axios.get(global.baseDomain + "/impaas/getjobs/")
            .then(res => {
                let flowchart_data_array = res.data;
                let jobs_obj = {};
                let jobs_arr = [];
                flowchart_data_array.map(element =>{
                    jobs_obj.jobname = element.jobname;
                    jobs_obj.jobid = element.jobid;
                    jobs_arr.push(JSON.parse(JSON.stringify(jobs_obj)))
                })
                this.setState({ jobData : jobs_arr})
            })        
    }

    render() {
        return (
            <Fragment>
            <div className="container-landing">
                <div className="get-started">Get Started.</div>
                <div className="flex-container-landing">
                    <Link to="/impaas/0"><div>Create New Pipeline</div></Link>
                    <div onClick={this.showAllPipelines}>Import Pipeline</div>
                </div>
            </div>
            <div id="import_pipeline_modal" className="modal_impaas">
                <div className="modal-content-impaas">
                    <div className="modal-header">
                        <span id="import_pipeline_modal_close" className="close_impaas">&times;</span>
                        <h2 style={{ textAlign: "center" }}>Select a Pipeline</h2>
                    </div>
                    <div className="modal-body import-pipeline-body">
                        {
                                this.state.jobData.length > 0 ? this.state.jobData.map((item, index) =>
                                    <Link key={index} to={{
                                        pathname: "/impaas/" + item.jobid
                                    }}>
                                    <div>{item.jobname}</div></Link>) : <h4 style={{ textAlign: "center" }}></h4>
                        }
                        {/* <input className="submit_button import-pipeline-save" type="submit" value="Import" onClick={this.createPipeLine} /> */}
                    </div>
                </div>
            </div>            
        </Fragment>
        )
    }
}

export default ImpaasLanding