import React, { Component } from 'react'
import '../ImpaasTable.css'

class ImpaasTable extends Component {
    render() {
        return <div id="impaas_modal" className="modal_impaas">
            <div className="modal-content-impaas-table">
                <div className="modal-header">
                    <span id={"impaas_modal_close"} className="close_impaas">&times;</span>
                    <h2 style={{ textAlign: "center" }}>{this.props.table_name}</h2>
                </div>
                <div className="modal-body">
                    <div className="table-container">
                        <table className="impaas-table">
                            <thead>
                                <tr className=".tr">
                                    <th>CUST_CITY</th>
                                    <th>CUST_ID</th>
                                    <th>CUST_STATE</th>
                                    <th>CUST_ZIP_PREFIX</th>
                                    <th>CUST_UNIQUE_ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.table_data.map((element, key) => {
                                    return (
                                        <tr className=".tr" key={key} >
                                            <td>{element.CUSTOMER_CITY}</td>
                                            <td>{element.CUSTOMER_ID}</td>
                                            <td>{element.CUSTOMER_STATE}</td>
                                            <td>{element.CUSTOMER_ZIP_CODE_PREFIX}</td>
                                            <td>{element.CUSTOMER_UNIQUE_ID}</td>
                                        </tr>
                                    )
                                    })
                                }                                

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
        }
    }
export default ImpaasTable;