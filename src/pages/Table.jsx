/* eslint-disable no-unused-vars */
import React from "react"
import { AppContext } from "../AppContext"
import { useEffect } from "react"
import '../assets/pop.css'
import $ from 'jquery'

export default function Table() {
    const { Page, setPage } = React.useContext(AppContext)
    const [TablePage, setTablePage] = React.useState(0)
    const [isPopupVisible, setPopupVisible] = React.useState(false);
    const [popContent, setPopContent] = React.useState(NaN)
    setPage("Table");
    async function getTableData() {
        const response = await fetch('http://localhost:3006/Tables')
        if (!response.ok) {
            alert('Error: ' + response.statusText);
        }
        const data = await response.json()
        setTableData(data)
        console.log(data)
    }
    const [TableData, setTableData] = React.useState([])
    useEffect(() => {
        getTableData()
    }, [])
    const PageBtn = []
    for (let i = 0; i < TableData.length / 4; i++) {
        //<li className="page-item text-danger"><a className="page-link text-white bg-danger" href="#">1</a></li>
        PageBtn.push(<li className="page-item " onClick={() => setTablePage(i)}><a className={TablePage === i ? "page-link text-white bg-danger" : "page-link text-dark"} href="#" >{i + 1}</a></li>)
    }
    const deleteRowConfirm = async (ID) => {
        const response = await fetch(`http://localhost:3006/delete/Tables?ID="${ID}"`)
        if (!response.ok) {
            alert('Error: ' + response.statusText);
        }
        getTableData()
        setTablePage(0)
        setPopupVisible(false)
    }
    const deleteRow = (i) => {
        setPopContent(
            <>
            <div className="text-center mb-2 d-flex justify-content-center align-items-center border-bottom">
                <h3 className="text-white">DELETE ENTRY</h3>
            </div>
            <div id="scrollForm" className="container bg-dark text-white p-2 px-4 rounded overflow-auto mb-2" style={{ height: '48vh' }}>
                <form onSubmit={handleUpdate} id="form">
                    {/* Row 1 */}
                    <div className="row mb-2">
                        <div className="col-3 mb-2">
                            <label>UoM:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="First name"
                                required
                                name="UoM"
                                defaultValue={TableData[TablePage * 4 + i]["UoM"]}
                                disabled="disabled"
                            />
                        </div>
                        <div className="col-6 mb-2">
                            <label>Feature:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="Feature"
                                defaultValue={TableData[TablePage * 4 + i]["Feature"]}
                                disabled="disabled"
                            />
                        </div>
                        <div className="col-3 mb-2">
                            <label>USL:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="USL"
                                defaultValue={TableData[TablePage * 4 + i]["USL"]}
                                disabled="disabled"
                            />
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="row mb-2">
                        <div className="col-6 mb-2">
                            <label>LSL:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="First name"
                                required
                                name="LSL"
                                defaultValue={TableData[TablePage * 4 + i]["LSL"]}
                                disabled="disabled"
                            />
                        </div>
                        <div className="col-3 mb-2">
                            <label>SVfCL:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="SVfCL"
                                defaultValue={TableData[TablePage * 4 + i]["SVfCL"]}
                                disabled="disabled"
                                
                            />
                        </div>
                        <div className="col-3 mb-2">
                            <label>Turret:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="Turret"
                                defaultValue={TableData[TablePage * 4 + i]["Turret"]}
                                disabled="disabled"
                            />
                        </div>
                    </div>
                    {/* Row 3 */}
                    <div className="row mb-2">
                        <div className="col-3 mb-2">
                            <label>XZ:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="First name"
                                required
                                name="XZ"
                                defaultValue={TableData[TablePage * 4 + i]["XZ"]}
                                disabled="disabled"
                            />

                        </div>
                        <div className="col-3 mb-2">
                            <label>Calhigh:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="Calhigh"
                                defaultValue={TableData[TablePage * 4 + i]["Calhigh"]}
                                disabled="disabled"
                            />

                        </div>
                        <div className="col-6 mb-2">
                            <label>Callow:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="Callow"
                                defaultValue={TableData[TablePage * 4 + i]["Callow"]}
                                disabled="disabled"
                            />

                        </div>
                    </div>
                    {/* Row 4 */}
                    <div className="row mb-2">
                        <div className="col-6 mb-2">
                            <label>Bias:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="First name"
                                required
                                name="Bias"
                                defaultValue={TableData[TablePage * 4 + i]["Bias"]}
                                disabled="disabled"
                            />

                        </div>

                        <div className="col-6 mb-2">
                            <label>Max:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="Max"
                                defaultValue={TableData[TablePage * 4 + i]["Max"]}
                                disabled="disabled"
                            />

                        </div>


                    </div>
                    {/* Row 5 */}
                    <div className="row form-group">
                        <div className="col-4 mb-2">
                            <label>DependsOn:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="DependsOn"
                                defaultValue={TableData[TablePage * 4 + i]["DependsOn"]}
                                disabled="disabled"
                            />

                        </div>
                        <div className="col-4 mb-2">
                            <label>WVfI:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="First name"
                                required
                                name="WVfI"
                                defaultValue={TableData[TablePage * 4 + i]["WVfI"]}
                                disabled="disabled"
                            />

                        </div>

                        <div className="col-4 mb-2">
                            <label>UIW:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="UIW"
                                defaultValue={TableData[TablePage * 4 + i]["UIW"]}
                                disabled="disabled"
                            />

                        </div>
                        <div className="col-4 mb-2 d-none">
                            <button type="submit" className="btn btn-danger d-none SubmitBtn" style={{ fontSize: "0.8rem" }} >Submit</button>
                            <label>ID:</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white p-1"
                                placeholder="Last name"
                                required
                                name="ID"
                                defaultValue={TableData[TablePage * 4 + i]["ID"]}
                                disabled="disabled"
                            />
                            {/* </div>   */}
                        </div>
                    </div>
                </form>
            </div>
            <div className="border-top mb-2" style={{ height: "10px" }}></div>
            <div className="d-flex justify-content-between " style={{ width: "70%", margin: "auto" }}>
                <button className="btn btn-danger py-1 px-3" style={{ fontSize: "0.8rem" }} onClick={() => {deleteRowConfirm(TableData[TablePage * 4 + i]["ID"])}}>✓ APPROVE </button>
                <button className="btn btn-danger py-1 px-4" style={{ fontSize: "0.8rem" }} onClick={() => setPopupVisible(false)}>✗ CANCEL</button>
            </div>
        </>
        )
        setPopupVisible(true)
    }
    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // print(formData)
        const response = await fetch('http://localhost:3006/insert/Tables', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        if (!response.ok) {
            alert('Error: ' + response.statusText);
        }
        getTableData()
        setTablePage(0)
        setPopupVisible(false)
    }
    const handleUpdate = async (r, i) => {
        r.preventDefault()

        const formData = new FormData(r.target);
        const response = await fetch('http://localhost:3006/update/Tables', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        if (!response.ok) {
            alert('Error: ' + response.statusText);
        }
        getTableData()
        setTablePage(0)
        setPopupVisible(false)
    }
    const UpdateRow = (i) => {
        setPopContent(
            <>
                <div className="text-center mb-2 d-flex justify-content-center align-items-center border-bottom">
                    <h3 className="text-white">UPDATE ENTRY</h3>
                </div>
                <div id="scrollForm" className="container bg-dark text-white p-2 px-4 rounded overflow-auto mb-2" style={{ height: '48vh' }}>
                    <form onSubmit={handleUpdate} id="form">
                        {/* Row 1 */}
                        <div className="row mb-2">
                            <div className="col-3 mb-2">
                                <label>UoM:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="First name"
                                    required
                                    name="UoM"
                                    defaultValue={TableData[TablePage * 4 + i]["UoM"]}
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Feature:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="Feature"
                                    defaultValue={TableData[TablePage * 4 + i]["Feature"]}
                                />
                            </div>
                            <div className="col-3 mb-2">
                                <label>USL:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="USL"
                                    defaultValue={TableData[TablePage * 4 + i]["USL"]}
                                />
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div className="row mb-2">
                            <div className="col-6 mb-2">
                                <label>LSL:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="First name"
                                    required
                                    name="LSL"
                                    defaultValue={TableData[TablePage * 4 + i]["LSL"]}
                                />
                            </div>
                            <div className="col-3 mb-2">
                                <label>SVfCL:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="SVfCL"
                                    defaultValue={TableData[TablePage * 4 + i]["SVfCL"]}
                                />
                            </div>
                            <div className="col-3 mb-2">
                                <label>Turret:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="Turret"
                                    defaultValue={TableData[TablePage * 4 + i]["Turret"]}
                                />
                            </div>
                        </div>
                        {/* Row 3 */}
                        <div className="row mb-2">
                            <div className="col-3 mb-2">
                                <label>XZ:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="First name"
                                    required
                                    name="XZ"
                                    defaultValue={TableData[TablePage * 4 + i]["XZ"]}
                                />

                            </div>
                            <div className="col-3 mb-2">
                                <label>Calhigh:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="Calhigh"
                                    defaultValue={TableData[TablePage * 4 + i]["Calhigh"]}
                                />

                            </div>
                            <div className="col-6 mb-2">
                                <label>Callow:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="Callow"
                                    defaultValue={TableData[TablePage * 4 + i]["Callow"]}
                                />

                            </div>
                        </div>
                        {/* Row 4 */}
                        <div className="row mb-2">
                            <div className="col-6 mb-2">
                                <label>Bias:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="First name"
                                    required
                                    name="Bias"
                                    defaultValue={TableData[TablePage * 4 + i]["Bias"]}
                                />

                            </div>

                            <div className="col-6 mb-2">
                                <label>Max:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="Max"
                                    defaultValue={TableData[TablePage * 4 + i]["Max"]}
                                />

                            </div>


                        </div>
                        {/* Row 5 */}
                        <div className="row form-group">
                            <div className="col-4 mb-2">
                                <label>DependsOn:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="DependsOn"
                                    defaultValue={TableData[TablePage * 4 + i]["DependsOn"]}
                                />

                            </div>
                            <div className="col-4 mb-2">
                                <label>WVfI:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="First name"
                                    required
                                    name="WVfI"
                                    defaultValue={TableData[TablePage * 4 + i]["WVfI"]}
                                />

                            </div>

                            <div className="col-4 mb-2">
                                <label>UIW:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="UIW"
                                    defaultValue={TableData[TablePage * 4 + i]["UIW"]}
                                />

                            </div>
                            <div className="col-4 mb-2 d-none">
                                <button type="submit" className="btn btn-danger d-none SubmitBtn" style={{ fontSize: "0.8rem" }} >Submit</button>
                                <label>ID:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="ID"
                                    defaultValue={TableData[TablePage * 4 + i]["ID"]}
                                />
                                {/* </div>   */}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="border-top mb-2" style={{ height: "10px" }}></div>
                <div className="d-flex justify-content-between " style={{ width: "70%", margin: "auto" }}>
                    <button className="btn btn-danger py-1 px-3" style={{ fontSize: "0.8rem" }} onClick={() => { $('.SubmitBtn').click() }}>✓ APPROVE </button>
                    <button className="btn btn-danger py-1 px-4" style={{ fontSize: "0.8rem" }} onClick={() => setPopupVisible(false)}>✗ CANCEL</button>
                </div>
            </>

        );

        setPopupVisible(true);
    }

    const addRow = () => {
        setPopContent(
            <>
                <div className="text-center mb-2 d-flex justify-content-center align-items-center border-bottom">
                    <h3 className="text-white">ADD NEW ENTRY</h3>
                </div>
                <div id="scrollForm" className="container bg-dark text-white p-2 px-4 rounded overflow-auto mb-2" style={{ height: '48vh' }}>
                    <form onSubmit={handleSave} id="form">
                        {/* Row 1 */}
                        <div className="row mb-2">
                            <div className="col-3 mb-2">
                                <label>UoM:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="First name"
                                    required
                                    name="UoM"
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Feature:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="Feature"
                                />
                            </div>
                            <div className="col-3 mb-2">
                                <label>USL:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    placeholder="Last name"
                                    required
                                    name="USL"
                                />
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div className="row mb-2">
                            <div className="col-6 mb-2">
                                <label>LSL:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="LSL"
                                />
                            </div>
                            <div className="col-3 mb-2">
                                <label>SVfCL:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="SVfCL"
                                />
                            </div>
                            <div className="col-3 mb-2">
                                <label>Turret:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="Turret"
                                />
                            </div>
                        </div>
                        {/* Row 3 */}
                        <div className="row mb-2">
                            <div className="col-3 mb-2">
                                <label>XZ:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="XZ"
                                />
                            </div>
                            <div className="col-3 mb-2">
                                <label>Calhigh:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="Calhigh"
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Callow:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="Callow"
                                />
                            </div>
                        </div>
                        {/* Row 4 */}
                        <div className="row mb-2">
                            <div className="col-6 mb-2">
                                <label>Bias:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="Bias"
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Max:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="Max"
                                />
                            </div>
                        </div>
                        {/* Row 5 */}
                        <div className="row">
                            <div className="col-4 mb-2">
                                <label>DependsOn:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="DependsOn"
                                />
                            </div>
                            <div className="col-4 mb-2">
                                <label>WVfI:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="WVfI"
                                />
                            </div>
                            <div className="col-4 mb-2">
                                <label>UIW:</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white p-1"
                                    required
                                    name="UIW"
                                />
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary d-none SubmitBtn">Submit</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div className="border-top mb-2" style={{ height: "10px" }}></div>
                <div className="d-flex justify-content-between " style={{ width: "70%", margin: "auto" }}>
                    <button className="btn btn-danger py-1 px-3" style={{ fontSize: "0.8rem" }} onClick={() => { $('.SubmitBtn').click() }}>✓ APPROVE </button>
                    <button className="btn btn-danger py-1 px-4" style={{ fontSize: "0.8rem" }} onClick={() => setPopupVisible(false)}>✗ CANCEL</button>
                </div>
            </>
        )
        setPopupVisible(true)
    };
    // UoM, Feature, USL, LSL, SVfCL, Turret, XZ, Calhigh, Callow, Bias, Max, DependsOn, WVfI, UIW
    return (
        <div className="p-3 pb-0 height-fluid position-relative">
            <div className="container text-center dimmed-background ">
                {isPopupVisible && (
                    <>
                        <div className="custom-popup bg-dark text-white">
                            {popContent}
                        </div>
                        <div className="backdrop"></div>
                    </>
                )}
            </div>
            <h2>Table</h2>
            <hr className='m-2 mb-3'></hr>
            <div className="mt-3 d-flex justify-content-end mx-2">
                <button type="button" style={{ fontSize: "0.8rem" }} className="btn btn-danger mb-2 p-1 mx-2" onClick={getTableData}> ⟳ REFRESH</button>
                <button type="button" style={{ fontSize: "0.8rem" }} className="btn btn-danger mb-2 p-1" onClick={addRow}> + ADD ENTRY</button>
            </div>
            <div className="card overflow-auto">
                <div className="card-body" style={{ width: "fit-content" }}>
                    <div className="bd-example">
                        <table className="table table-striped table-light table-bordered">
                            <thead >
                                <tr style={{ backgroundColor: "#DC" }}>
                                    <th scope="col">#</th>
                                    <th scope="col">UoM</th>
                                    <th scope="col">Feature</th>
                                    <th scope="col">USL</th>
                                    <th scope="col">LSL</th>
                                    <th scope="col">SVfCL</th>
                                    <th scope="col">Turret</th>
                                    <th scope="col">XZ</th>
                                    <th scope="col">Calhigh</th>
                                    <th scope="col">Callow</th>
                                    <th scope="col">Bias</th>
                                    <th scope="col">Max</th>
                                    <th scope="col">DependsOn</th>
                                    <th scope="col">WVfI</th>
                                    <th scope="col">UIW</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TablePage * 4 < TableData.length && <tr >
                                    <th scope="row">{TableData[TablePage * 4]["ID"]}</th>
                                    <td className="text-center">{TableData[TablePage * 4]["UoM"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["Feature"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["USL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["LSL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["SVfCL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["Turret"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["XZ"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["Calhigh"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["Callow"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["Bias"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["Max"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["DependsOn"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["WVfI"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4]["UIW"]}</td>
                                    <td className="d-flex">
                                        <div className="edit-content" onClick={() => UpdateRow(0)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                        </div>
                                        <div className="delete-content" onClick={() => deleteRow(0)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </div>
                                    </td>

                                </tr>}
                                {TablePage * 4 + 1 < TableData.length && <tr >
                                    <th scope="row">{TableData[TablePage * 4 + 1]["ID"]}</th>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["UoM"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["Feature"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["USL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["LSL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["SVfCL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["Turret"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["XZ"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["Calhigh"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["Callow"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["Bias"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["Max"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["DependsOn"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["WVfI"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 1]["UIW"]}</td>
                                    <td className="d-flex">
                                        <div className="edit-content" onClick={() => UpdateRow(1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                        </div>
                                        <div className="delete-content" onClick={() => deleteRow(1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </div>
                                    </td>
                                </tr>}
                                {TablePage * 4 + 2 < TableData.length && <tr>
                                    <th scope="row">{TableData[TablePage * 4 + 2]["ID"]}</th>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["UoM"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["Feature"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["USL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["LSL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["SVfCL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["Turret"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["XZ"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["Calhigh"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["Callow"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["Bias"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["Max"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["DependsOn"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["WVfI"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 2]["UIW"]}</td>
                                    <td className="d-flex">
                                        <div className="edit-content" onClick={() => UpdateRow(2)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                        </div>
                                        <div className="delete-content" onClick={() => deleteRow(2)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </div> </td>
                                </tr>}
                                {TablePage * 4 + 3 < TableData.length && <tr>
                                    <th scope="row">{TableData[TablePage * 4 + 3]["ID"]}</th>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["UoM"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["Feature"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["USL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["LSL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["SVfCL"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["Turret"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["XZ"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["Calhigh"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["Callow"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["Bias"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["Max"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["DependsOn"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["WVfI"]}</td>
                                    <td className="text-center">{TableData[TablePage * 4 + 3]["UIW"]}</td>
                                    <td className="d-flex">
                                        <div className="edit-content" onClick={() => UpdateRow(3)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                        </div>
                                        <div className="delete-content" onClick={() => deleteRow(3)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#DC3545"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </div>
                                    </td>
                                </tr>}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between text-danger align-items-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination text-danger mb-0">
                                    {PageBtn}
                                </ul>
                            </nav>
                            <p className="text-dark mb-0">Showing {4 * TablePage + 1} to {TablePage == Math.floor(TableData.length / 4) ? Math.min(4 * (TablePage + 1), TableData.length) : 4 * (TablePage + 1)} of {TableData.length} entries</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
