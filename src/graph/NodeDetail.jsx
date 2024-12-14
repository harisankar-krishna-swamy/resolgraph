import React from "react";

const fixedDetails = [
    { label: "Label", field: "label" },
    { label: "Connections", field: "connections" },
    { label: "Cluster", field: "cluster" },
    { label: "Ingress", field: "ingress" },
    { label: "Outgress", field: "outgress" },
];

const NodeDetail = ({ nodeDetail }) => {
    return (
        <div className="card">
            <div className="card-header">Selected data</div>
            <div className="card-body">
                <table className="table table-hover table-responsive">
                    <tbody>
                        {nodeDetail &&
                            fixedDetails.map((fd) => (
                                <tr key={`fd-${fd.label}-${[fd.field]}`}>
                                    <th scope="col">{fd.label}</th>
                                    <td>{nodeDetail[[fd.field]]}</td>
                                </tr>
                            ))}
                        {nodeDetail &&
                            nodeDetail.domain &&
                            Object.keys(nodeDetail.domain).map((key, index) => (
                                <tr>
                                    <th scope="col">{key}</th>
                                    <td>{nodeDetail?.domain[[key]]}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NodeDetail;
