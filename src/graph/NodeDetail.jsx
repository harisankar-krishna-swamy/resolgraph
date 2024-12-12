import React from "react";

const NodeDetail = ({ nodeDetail }) => {
    return (
        <div className="card">
            <div className="card-header">Node detail</div>
            <div className="card-body">
                <table className="table table-hover table-responsive">
                    <tbody>
                        <tr>
                            <th scope="col">Label</th>
                            <td>{nodeDetail?.label}</td>
                        </tr>
                        <tr>
                            <th scope="col">Cluster</th>
                            <td>{nodeDetail?.cluster}</td>
                        </tr>
                        <tr>
                            <th scope="col">Connections</th>
                            <td>{nodeDetail?.connections}</td>
                        </tr>
                        <tr>
                            <th scope="col">Part Id</th>
                            <td>{nodeDetail?.domain?.partId}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NodeDetail;
