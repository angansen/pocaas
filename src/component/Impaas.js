import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { jsPlumb } from 'jsplumb';
import $ from 'jquery'

import Element from './Element';
import ImpaasTable from './ImpaasTable'
import '../Impaas.css';

export default class Impaas extends Component {
    constructor() {
        super();
        this.numberOfElements = 0;
        this.htmlBase = 'drawingArea';
        this.flowChartJson = null;
        this.addTask = this.addTask.bind(this);
        this.saveFlowchart = this.saveFlowchart.bind(this);
        this.loadFlowchart = this.loadFlowchart.bind(this);
        this.submitFlowchart = this.submitFlowchart.bind(this);
        this.componentSelector = this.componentSelector.bind(this);
        this.getNodeModalData = this.getNodeModalData.bind(this);
        this.removeElements = this.removeElements.bind(this);
        this.createProfile = this.createProfile.bind(this);  
        this.viewTable = this.viewTable.bind(this);  
        this.createPipeLine = this.createPipeLine.bind(this);  
        
        this.invokedBySubmitValidation = true;
        this.selectedTable = null;

        this.taskComponent = [];
        this.elementsArray = [];
        this.saveStatus = false;
        this.flowchartValidation = false;
        this.flowChartSubmitted = false;
        this.loadedJobId = null;
        this.createdJobId = null;

        this.state = {
            elements: [],
            node_data: [],
            selectedFiles: null,
            loading: false,
            alertMessage: null,
            tableData: null,
        }
    }

    componentDidMount() {
        axios.get(global.baseDomain + "/impaas/getnodes/")
            .then(res => {
                console.log("res.data : " + JSON.stringify(res.data))
                let getnodesInitial = res.data;

                getnodesInitial.map((currentValue, index) => {
                    return this.elementsArray.push(currentValue);
                });
                this.setState({ elements: this.elementsArray });
            }).catch(error => {
                if (error.response && error.response.status == 401) {
                    sessionStorage.clear();
                    window.location.href = '/login';
                }
            })

        jsPlumb.ready(function () {

            //.window class wherver added will make the node draggable...
            jsPlumb.draggable($(".window"));

            jsPlumb.importDefaults({
                Endpoint: ["Dot", { radius: 8 }],
                EndpointStyle: { fill: "green" },
                HoverPaintStyle: { strokeStyle: "#42a62c", lineWidth: 8 },
                Connector: ["Flowchart"],
                ConnectionOverlays: [
                    ["Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 10,
                        foldback: 0.4
                    }]
                ]
            });

            const workflowConnectorStartpoint = {
                isSource: true,
                isTarget: false,
                maxConnections: 1,
                anchor: "BottomCenter"
            };

            const workflowConnectorEndpoint = {
                isSource: false,
                isTarget: true,
                maxConnections: -1,
                anchor: "TopCenter",
            };

            jsPlumb.addEndpoint(
                $('.startpoint'),
                workflowConnectorStartpoint
            );

            jsPlumb.addEndpoint(
                $('.endpoint'),
                workflowConnectorEndpoint
            );

        });

        const href_array = window.location.href.split("/");
        this.loadedJobId = href_array[href_array.length - 1];
        if (this.loadedJobId.length > 0 && parseInt(this.loadedJobId)>0) {
                this.loadFlowchart();
        }
    }

    addTask(id, img_url, left = "450", top = "200", invokedBy) {
        if (invokedBy !== "loadFlowChart") {
            /*GENERIC MODAL BEHAVIOR - OPEN AND CLOSE START*/
            var modal = document.getElementById(id + "_modal");
            modal.style.display = "block";
            var span = document.getElementById(id + "_modal_close");
            span.onclick = function () {
                modal.style.display = "none";
            }
        }
        //***********DON'T DELETE***************** */
        // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function (event) {
        //     if (event.target === modal) {
        //         modal.style.display = "none";
        //     }
        // }

        /*GENERIC MODAL BEHAVIOR - OPEN AND CLOSE END*/

        // if (typeof id == "undefined") {--as this didnt work and with no id it was sending event object..i had to do below
        this.numberOfElements = this.numberOfElements + 1;
        var element_html = this.renderElement(id, img_url);
        $('<div class="window task node" id="' + id + '" data-nodetype="task" style="left:' + left + 'px; top:' + top + 'px;">').appendTo('#' + this.htmlBase).html(element_html);

        var taskSourceConnectorEndpoint = {
            isSource: true,
            isTarget: false,
            maxConnections: 1,
            anchor: [0.5, 1, 0, 1, 0, 0, "task_end startpoint"],
        };

        var taskTargetConnectorEndpoint = {
            isSource: false,
            isTarget: true,
            maxConnections: 1,
            anchor: [0.5, 0, 0, -1, 0, 0, "task_end endpoint"],
        };
        jsPlumb.addEndpoint(
            $('#' + id),
            taskSourceConnectorEndpoint
        );

        jsPlumb.addEndpoint(
            $('#' + id),
            taskTargetConnectorEndpoint
        );
        $('#' + id + "_data").on("click", (e) => {
            var modal = document.getElementById(id + "_modal");
            modal.style.display = "block";
            var span = document.getElementById(id + "_modal_close");
            span.onclick = function () {
                modal.style.display = "none";
            }
        });

        $('#' + id + "_remove").on("click", (e) => {
            jsPlumb.remove(id);

            //When a component is removed from DOM, we are updating node_data state array below..
            const componentArray = this.state.node_data;
            componentArray.map((element, index) => {
                if (element.id === id) {
                    componentArray.splice(index, 1);
                }
            });
            this.setState({ node_data: componentArray });
            // jsPlumb.empty("spark");
        });

        /*BELOW CODE IS FOR EXCEL FIELD HANDING -CSS BEHAVIOR ONLY*/
        $('#chooseFile').bind('change', (e) => {
            var filename = $("#chooseFile").val();
            if (/^\s*$/.test(filename)) {
                $(".file-upload").removeClass('active');
                $("#noFile").text("No file chosen...");
            }
            else {
                var formData = new FormData();
                var imagefile = document.querySelector('#chooseFile');
                formData.append("myfile", imagefile.files[0]);
                this.setState({ selectedFiles: formData });
                $(".file-upload").addClass('active');
                $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
            }
        });

        jsPlumb.draggable($('#' + id));
        return id;
    }

    saveFlowchart(event) {                
        //check wheather its a hive workflow or adwc..
        const hive_element = document.getElementById("node_4");
        const adwc_element = document.getElementById("node_2");

        let nodes = []

        $(".node").each(function (idx, elem) {
            var $elem = $(elem);
            var endpoints = jsPlumb.getEndpoints($elem.attr('id'));
            nodes.push({
                blockId: $elem.attr('id'),
                nodetype: $elem.attr('data-nodetype'),
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10)
            });
        });

        let connections = [];
        $.each(jsPlumb.getConnections(), function (idx, connection) {
            connections.push({
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId
            });
        });

        let flowChart = {};
        flowChart.nodes = nodes;
        flowChart.connections = connections;
        flowChart.numberOfElements = this.numberOfElements;
        flowChart.componentsData = this.state.node_data;
        
        var alert_box = document.getElementById("popup1");
        var alert_close_button = document.getElementById("alert_close");
        
        alert_close_button.onclick = function () {
            alert_box.style.display = "none";
            event.preventDefault();
            return false;
        }

        //validation while saving the workflow
        let saveFlowchartFlag = true;

        if (this.numberOfElements < 2) {
            saveFlowchartFlag = false;
            this.setState({ alertMessage: "There should be atleast 2 nodes in a workflow." })
            document.getElementById("popup1").style.display = "block";
        }

        else if (connections.length < 1) {
            saveFlowchartFlag = false;
            this.setState({ alertMessage: "Please connect the nodes." })
            document.getElementById("popup1").style.display = "block";

        }

        else if (document.getElementById("chooseFile").value.length < 1) {
            saveFlowchartFlag = false;
            // this.alertMessage = "Please select a file to be uploaded.";
            this.setState({ alertMessage: "Please select a file to be uploaded." })
            document.getElementById("popup1").style.display = "block";
        }

        else if (hive_element) {
            if (document.getElementById("node_4_2").value.length < 1) {
                saveFlowchartFlag = false;
                this.setState({ alertMessage: "Please select table name in HIVE node." })
                document.getElementById("popup1").style.display = "block";
            }
        }

        else if (adwc_element) {
            if (document.getElementById("node_2_2").value.length < 1) {
                saveFlowchartFlag = false;
                this.setState({ alertMessage: "Please select table name in ADWC node." })
                document.getElementById("popup1").style.display = "block";
            }
        }
        if (saveFlowchartFlag){
            this.flowchartValidation = true;
        }

        this.flowChartJson = flowChart;

        if(saveFlowchartFlag && this.invokedBySubmitValidation) {
            var modal = document.getElementById("create_pipeline_modal");
            modal.style.display = "block";
            var span = document.getElementById("create_pipeline_modal_close");
            span.onclick = function () {
                modal.style.display = "none";
            }
        }        
    }

    createPipeLine(event) {
        event.preventDefault();
        const job_name_submitted = document.getElementById("create_pipeline_input").value;
        axios.get(global.baseDomain + "/impaas/getjobs/")
            .then(res => {
                let allJobsData = res.data;
                let jobsDuplicate = false;
                allJobsData.map(element => {
                    if (element.jobname === job_name_submitted) {
                        document.getElementById("overlay").style.display = "none";
                        document.getElementById("popup-header").innerHTML = "Duplicate Workflow Name !";
                        this.setState({ alertMessage: "A workflow with same name already exists.Please change." })
                        document.getElementById("popup1").style.display = "block";
                        jobsDuplicate = true;
                        event.preventDefault();
                    }
                })
                if(!jobsDuplicate) {
                    document.getElementById("create_pipeline_modal").style.display = "none"
                    document.getElementById("overlay").style.display = "block";

                    axios.post(global.baseDomain + '/impaas/savejob/', {
                        "jobname": job_name_submitted,
                        "metadata": this.flowChartJson,
                        "user_id": sessionStorage.getItem("user_name")
                    }).then(response => {
                        event.preventDefault();
                        this.createdJobId = response.data.jobid;
                        axios.post(global.baseDomain + "/impaas/upload/", this.state.selectedFiles, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(response => {
                            event.preventDefault();
                            this.saveStatus = true;
                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("popup-header").innerHTML = "Success !!";
                            document.getElementById("popup_data").style.background = "#2ecc71";
                            this.setState({ alertMessage: "File and Data Saved successfully." })
                            document.getElementById("popup1").style.display = "block";

                            event.preventDefault();

                        }).catch(error => {
                            if (error.response && error.response.status == 401) {
                                    sessionStorage.clear();
                                    window.location.href = '/login';
                            }
                            event.preventDefault();
                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("popup-header").innerHTML = "Something Went Wrong !";
                            this.setState({ alertMessage: "The workflow could not be saved." })
                            document.getElementById("popup1").style.display = "block";

                        })
                    })
                        .catch(error => {
                            if (error.response && error.response.status == 401) {
                                sessionStorage.clear();
                                window.location.href = '/login';
                            }                            
                            event.preventDefault();
                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("popup-header").innerHTML = "Something Went Wrong !";
                            this.setState({ alertMessage: "The workflow could not be saved." })
                            document.getElementById("popup1").style.display = "block";
                        });

                }
            }).catch(error => {
                if (error.response && error.response.status == 401) {
                    sessionStorage.clear();
                    window.location.href = '/login';
                } 
            }) 

    }

    submitFlowchart(e) {
        var alert_box = document.getElementById("popup1");
        var alert_close_button = document.getElementById("alert_close");

        alert_close_button.onclick = function () {
            alert_box.style.display = "none";
            return false;
        }

        if (!this.flowchartValidation) {
            this.invokedBySubmitValidation = false;
            this.saveFlowchart(e);
        }        

        if(this.saveStatus ===  false) {
            this.invokedBySubmitValidation = true;
            this.setState({ alertMessage: "Please save the flowchart before submitting." })
            document.getElementById("popup1").style.display = "block";
        }

        else if(this.saveStatus){
            // hive workflow or adwc workflow        
            const hive_element = document.getElementById("node_4");
            const adwc_element = document.getElementById("node_2");

            document.getElementById("overlay").style.display = "block";
            let excel_file_url = null;
            let adwc_databse = null;
            let adwc_table = null;

            let hive_databse = null;
            let hive_table = null;
            
            axios.get(global.baseDomain + "/impaas/getjobs/")
                .then(res => {          
                    let jobsComponents = null;        
                    let allJobsValues = res.data;
                    allJobsValues.map(elem => {
                        if(elem.jobid === this.createdJobId) {
                            jobsComponents = elem.metadata.componentsData;
                        }
                    })
                    for(var i=0; i< jobsComponents.length; i++) {
                        if (jobsComponents[i].component.toUpperCase() === "EXCEL") {
                            /*data[0] will fail if excel node has more than 1 field. 
                            use another for loop below in that case*/
                            excel_file_url = jobsComponents[i].data[0].url;
                        }
                        if (jobsComponents[i].component.toUpperCase() === "ADWC") {
                            /*data[0] will fail if excel node has more than 1 field. 
                            use another for loop below in that case*/
                        for(var j=0; j< jobsComponents[i].data.length; j++) {
                            if (jobsComponents[i].data[j].label.toUpperCase().includes("DATABASE")){
                                adwc_databse = jobsComponents[i].data[j].value;
                            }
                            if (jobsComponents[i].data[j].label.toUpperCase().includes("TABLE")) {
                                adwc_table = jobsComponents[i].data[j].value;
                            }
                        };
                        }
                        if (jobsComponents[i].component.toUpperCase() === "HIVE") {
                            /*data[0] will fail if excel node has more than 1 field. 
                            use another for loop below in that case*/
                            for (var j = 0; j < jobsComponents[i].data.length; j++) {
                                if (jobsComponents[i].data[j].label.toUpperCase().includes("DATABASE")) {
                                    hive_databse = jobsComponents[i].data[j].value;
                                }
                                if (jobsComponents[i].data[j].label.toUpperCase().includes("TABLE")) {
                                    hive_table = jobsComponents[i].data[j].value;
                                }
                            };
                        }                    
                    }
                    if (excel_file_url === null) {
                        alert("Please save the workflow before submitting");
                    }
                    this.selectedTable = adwc_element ? adwc_table : hive_table;

                    let livy_data = {
                        // "master_dns": "129.146.111.170", /dev
                        // "master_dns": "129.146.166.36", //prod
                        "master_dns": "129.146.103.208", //saurav new
                        // "obj_store_url": excel_file_url,
                        // "obj_store_url": "oci://RetailData@oraclebigdatapursuit/olist_customers_dataset.csv",
                        "obj_store_url": "oci://impaas@orasenatdpltinfomgmt01/olist_customers_dataset.csv",
                        "db_name" : adwc_element ? adwc_databse : hive_databse,
                        "table_name": this.selectedTable
                    }

                    let livy_url = global.baseDomain + "/spark/livy_call_spark_job/";
                    if(hive_element) {
                        livy_url = global.baseDomain + "/cloudera/exec_livy_hive_load/";
                    }
                    axios.post(livy_url, livy_data)
                    .then(response => {
                        console.log("response : " + response);
                        document.getElementById("overlay").style.display = "none";
                        document.getElementById("popup-header").innerHTML = "Success !!";
                        document.getElementById("popup_data").style.background = "#2ecc71";
                        adwc_element ? this.setState({ alertMessage: response.data.message + "..Response Time : " + response.data.execution_time }) : this.setState({ alertMessage: response.data.message })
                        document.getElementById("popup1").style.display = "block";
                        this.flowChartSubmitted = true;
                        
                        /*remove this once HIVE backend is ready. and data is being 
                        inserted to hive table*/
                        if(hive_element) {
                            this.flowChartSubmitted = false;
                        }
                        if(adwc_element) {
                            document.getElementById("view-table").style.backgroundColor = "#2ecc71";
                            document.getElementById("view-table").style.cursor = "pointer";              
                            document.getElementById("view-table").style.animation = "shadow-pulse 1s 15";
                        }

                    }).catch(error => {
                        if (error.response && error.response.status == 401) {
                            sessionStorage.clear();
                            window.location.href = '/login';
                        }                        
                        document.getElementById("overlay").style.display = "none";
                        document.getElementById("popup-header").innerHTML = "Something Went Wrong !";
                        this.setState({ alertMessage: "The workflow execution failed. Please verify if livy server is started" })
                        document.getElementById("popup1").style.display = "block";
                    });
                }).catch(error => {
                    if (error.response && error.response.status == 401) {
                        sessionStorage.clear();
                        window.location.href = '/login';
                    } 
                }) 
        }
    }

    showMessage(message, color) {
        $('.alert').css("background-color", color);
        $('.alert').show();
        $('.alert').text(message);
    }

    loadFlowchart() {        
        document.getElementById("overlay").style.display = "block";
        axios.get(global.baseDomain + "/impaas/getjobs/")
            .then(res => {
                let allJobsData = res.data;
                let apiMetaData = null;
                allJobsData.map(element => {
                    if (element.jobid === parseInt(this.loadedJobId)) {
                        apiMetaData = element.metadata;
                    }
                })
                let jobsComponents = apiMetaData.componentsData;
                // let jobsComponents = res.data[1].metadata.componentsData;
                let initialElementsData = this.state.elements;
                console.log("jobsComponents" + JSON.stringify(jobsComponents));
                console.log("initialElementsData" + JSON.stringify(initialElementsData));
                for (let i = 0; i < initialElementsData.length; i++) {
                    for (let j = 0; j < jobsComponents.length; j++) {
                        for (let k = 0; k < initialElementsData[i].list.length; k++) {
                            if (initialElementsData[i].list[k].id === jobsComponents[j].id) {
                                /*doing here deep cloning..but its still not able to populate option value..
                                delete this line once its fixed..*/
                                initialElementsData[i].list[k].data = JSON.parse(JSON.stringify(jobsComponents[j].data));
                            }
                        }
                    }
                }
                console.log("AFTER initialElementsData : " + JSON.stringify(initialElementsData));
                this.setState({ elements: initialElementsData });
                var flowChart1 = apiMetaData;
                var nodes = flowChart1.nodes;
                $.each(nodes, (index, elem) => {
                    let elementImage = null;
                    if (elem.nodetype === 'task') {
                        jobsComponents.map(jobElement => {
                            if (jobElement.id === elem.blockId) {
                                elementImage = jobElement.icon;
                            }
                        })
                        this.addTask(elem.blockId, elementImage, elem.positionX, elem.positionY, "loadFlowChart");
                    }
                });

                var connections = flowChart1.connections;
                $.each(connections, function (index, elem) {
                    jsPlumb.connect({
                        source: elem.pageSourceId,
                        target: elem.pageTargetId,
                        anchors: ["BottomCenter", [0.5, 0, 0, -1]]

                    });
                });

                this.numberOfElements = flowChart1.numberOfElements;
            }).catch(error => {
                if (error.response && error.response.status == 401) {
                    sessionStorage.clear();
                    window.location.href = '/login';
                }  
            })
        document.getElementById("overlay").style.display = "none";

    }

    renderElement(id, image) {
        let element_ui = '<div>' +
            '<div class="ctrl_container">' +
            '<div id=' + id + "_data" + ' class="control_button button_data">+</div>' +
            '<div id=' + id + "_remove" + ' class="control_button button_remove">x</div>' +
            '</div>' +
            '<div class="details_container">' +
            '<div class="detail_text"><img src=' + image + ' style="width:55px; height:40px"></img></div>' +
            '</div> </div>'
        return element_ui;
    }

    createProfile() {
        var alert_box = document.getElementById("popup1");
        var alert_close_button = document.getElementById("alert_close");

        alert_close_button.onclick = function () {
            alert_box.style.display = "none";
            return false;
        }

        document.getElementById("overlay").style.display = "block";
        let create_profile_data = {
            "dataflowname": "workflow_job_2"
        }
        axios.post(global.baseDomain + "/edq/create/", create_profile_data)
            .then(response => {
                console.log("create profile response : "+response.data);
                document.getElementById("overlay").style.display = "none";
                document.getElementById("popup-header").innerHTML = "Success !!";
                document.getElementById("popup_data").style.background = "#2ecc71";
                this.setState({ alertMessage: response.data.message })
                
                document.getElementById("view-dashboard").style.backgroundColor = "#2ecc71";
                document.getElementById("view-dashboard").style.cursor = "pointer";              
                document.getElementById("view-dashboard-link").setAttribute('href', response.data.url);
                document.getElementById("view-dashboard").style.animation = "shadow-pulse 1s 15";
                document.getElementById("popup1").style.display = "block";

            }).catch(error => {
                if (error.response && error.response.status == 401) {
                    sessionStorage.clear();
                    window.location.href = '/login';
                }
                document.getElementById("overlay").style.display = "none";
                document.getElementById("popup-header").innerHTML = "Something Went Wrong !";
                this.setState({ alertMessage: "EDQ profiling failed." })
                document.getElementById("popup1").style.display = "block";
            });
    }

    componentSelector(event) {
        const elementType = event.target.value;
        const originalArray = this.elementsArray;
        let filteredArray = this.elementsArray;
        if (elementType !== "all") {
            filteredArray = originalArray.filter((element) => {
                return element.type === elementType;
            })
        }
        this.setState({ elements: filteredArray });
    }

    viewTable() {
        if (this.flowChartSubmitted) {
            var alert_box = document.getElementById("popup1");
            var alert_close_button = document.getElementById("alert_close");

            alert_close_button.onclick = function () {
                alert_box.style.display = "none";
                return false;
            }

            document.getElementById("overlay").style.display = "block";

            axios.post(global.baseDomain + "/adwc/read_adw_table/", {})
                .then(response => {
                    this.setState({tableData: response.data})
                    console.log("create profile response : " + response.data);
                    document.getElementById("overlay").style.display = "none";

                    var modal = document.getElementById("impaas_modal");
                    modal.style.display = "block";
                    var span = document.getElementById("impaas_modal_close");
                    span.onclick = function () {
                        modal.style.display = "none";
                    }

                }).catch(error => {
                    if (error.response && error.response.status == 401) {
                        sessionStorage.clear();
                        window.location.href = '/login';
                    }
                    document.getElementById("overlay").style.display = "none";
                    document.getElementById("popup-header").innerHTML = "Something Went Wrong !";
                    this.setState({ alertMessage: "The workflow execution failed. Please verify if livy server is started" })
                    document.getElementById("popup1").style.display = "block";
                });
        }

    }

    removeElements() {
        this.setState({ node_data: [] });
        let nodes = []
        $(".node").each(function (idx, elem) {
            var $elem = $(elem);
            nodes.push({
                blockId: $elem.attr('id'),
                nodetype: $elem.attr('data-nodetype'),
            });
        });
        nodes.map(el => {
            if (el.blockId === "startpoint" || el.blockId === "endpoint") {
            }
            else {
                jsPlumb.remove(el.blockId);
            }
        });
    }

    getNodeModalData(id) {
        const openedModal = document.getElementById(id + "_modal");
        openedModal.style.display = "none";
        const result2 = this.elementsArray.filter(p => p.list.some(s => s.id === id));
        //below line generates filtered json
        const result3 = result2[0].list.filter(s => s.id === id);
        const result4 = result3[0].data;

        //using temp array, as in JS - arrays are pass by reference
        const temporary_array = [...result4];
        const result5 = temporary_array.map(innerElement => {
            let element_data = null
            if (innerElement.type === "text") {
                element_data = document.getElementById(id + "_" + innerElement.id).innerHTML;
            }
            else if (innerElement.type === "file") {
                var filesArray = [];
                var x = document.getElementById("chooseFile");
                if ('files' in x) {
                    if (x.files.length == 0) {
                        filesArray.push("nofile")
                    } else {
                        for (var i = 0; i < x.files.length; i++) {
                            var file = x.files[i];
                            if ('name' in file) {
                                filesArray.push(file.name);
                            }
                        }
                    }
                }            
                element_data = filesArray[0]
            }
            else {
                element_data = document.getElementById(id + "_" + innerElement.id).value;
            }
            innerElement.value = element_data
            return element_data
        })
        result3[0].data = temporary_array;
        this.setState({
            node_data: this.state.node_data.concat(result3)
        });
    }

    render() {
        
        return (
            
            <Fragment>
                <div id="overlay"></div>
                
                {/* make this a new component later */}
                <div id="popup1" className="overlay">
                    <div className="popup" id="popup_data">
                        <h2 id="popup-header">Validation Error</h2>
                        <a className="close" id="alert_close" href="#">&times;</a>
                        <div className="content">
                            {this.state.alertMessage}
		                </div>
                    </div>
                </div>

                <div id="create_pipeline_modal" className="modal_impaas">
                    <div className="modal-content-impaas">
                        <div className="modal-header">
                            <span id="create_pipeline_modal_close" className="close_impaas">&times;</span>
                            <h2 style={{ textAlign: "center" }}>Name of Pipeline</h2>
                        </div>
                        <div className="modal-body">
                            <input id="create_pipeline_input" type="text" style={{ backgroundImage: "none", display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "1%" }} />
                            <input className="submit_button" type="submit" value="Save" onClick={(e) => this.createPipeLine(e)}/>
                        </div>
                    </div>
                </div>

                <div className="flex-container1">
                    <button className="generic_button" style={{ backgroundColor: "#e67e22" }} onClick={this.removeElements}>Clear WorkFlow</button>
                    {/* DONT DELETE */}
                    {/* <button className="generic_button" style={{ backgroundColor: "#2c3e50" }} onClick={this.loadFlowchart}>Load WorkFlow</button> */}
                    <button className="generic_button" style={{ backgroundColor: "#2c3e50" }} onClick={(e) => this.saveFlowchart(e)}>Save WorkFlow</button>
                    <button id="view-table" className="generic_button" style={{ backgroundColor: "gray", cursor: "not-allowed" }} onClick={this.viewTable}>View Table - ADW/Hive</button>
                    <button id="create-profile" className="generic_button" style={{ backgroundColor: "#2ecc71" }} onClick={this.createProfile}>Create Profile</button>
                    <a id="view-dashboard-link" href="#"><button id="view-dashboard" className="generic_button" style={{ backgroundColor: "gray", cursor: "not-allowed" }}>View Dashboard</button></a>
                </div>
                <div className="flex-container panels-container">
                    <div className="left-panel pos">
                        <div className="select">
                            <select name="slct" className="actual_select" id="slct" onChange={this.componentSelector}>
                                <option value="all">All</option>
                                {
                                    this.elementsArray.map((element, key) => (
                                        <Fragment key={key}>
                                            <option value={element.type}>{element.type}</option>
                                        </Fragment>
                                    )
                                    )
                                }
                            </select>
                        </div>
                        <div className="wrapper">
                            {
                                this.state.elements.map(element => (
                                    element.list.map((el, key) => (
                                        //keeping x and y coordinte default while adding new task element through addTask()
                                        <div key={key} className={`${element.type}`} onClick={() => this.addTask(el.id, el.icon)}>
                                            <img src={el.icon} alt={el.component} />
                                            <button className="hover-add">+</button>
                                            <p>{el.component}</p>
                                        </div>
                                    ))
                                )
                                )}
                        </div>
                        <button className="submit-workflow" onClick={ (e) => this.submitFlowchart(e) }>Submit Workflow</button>
                    </div>

                    <div id="drawingArea" className="right-panel">
                        {this.state.tableData ? <ImpaasTable table_data={this.state.tableData} table_name={this.selectedTable}/> : null }
                        {/* <div className="startpoint window point node" style={{ left: "18vw", top: "15vw", position: "absolute" }} data-nodetype="startpoint" id="startpoint">Start</div> */}
                        {
                            this.state.elements.map(element => (
                                element.list.map((el, key) => (
                                    <Element key={key} id={el.id} fields={el.data} nodeModalData={this.getNodeModalData} />
                                ))
                            )
                            )}

                        {/* <div className="endpoint point node" style={{ right: "7vw", bottom: "1vw", position: "absolute" }} data-nodetype="endpoint" id="endpoint">End</div> */}

                    </div>
                </div>
            </Fragment>
        );
    }
}