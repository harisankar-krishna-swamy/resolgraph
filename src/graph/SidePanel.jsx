import React, { useState } from "react";

const SidePanel = ({
    handleNewNode,
    handleNewEdge,
    handleDropEdge,
    handleDeleteNode,
    handleClear,
}) => {
    const [nodeLabel, setNodeLabel] = useState("");
    const [sourceLabel, setSourceLabel] = useState("");
    const [targetLabel, setTargetLabel] = useState("");

    return (
        <div className="card">
            <div className="card-header">Graph options</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="Label"
                            className="form-control"
                            value={nodeLabel}
                            onChange={(e) => setNodeLabel(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-3">
                        <button
                            onClick={() => handleNewNode(nodeLabel)}
                            className="btn btn-md btn-primary"
                        >
                            Add Node
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                            onClick={() => handleDeleteNode(nodeLabel)}
                            className="btn btn-md btn-warning"
                        >
                            Delete Node
                        </button>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-3">
                        <input
                            type="text"
                            placeholder="Source"
                            className="form-control"
                            value={sourceLabel}
                            onChange={(e) => setSourceLabel(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-3">
                        <input
                            type="text"
                            placeholder="Target"
                            className="form-control"
                            value={targetLabel}
                            onChange={(e) => setTargetLabel(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-3">
                        <button
                            type="submit"
                            className="btn btn-md btn-primary"
                            onClick={() =>
                                handleNewEdge(sourceLabel, targetLabel)
                            }
                        >
                            Add Edge
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                            type="submit"
                            className="btn btn-md btn-warning"
                            onClick={() =>
                                handleDropEdge(sourceLabel, targetLabel)
                            }
                        >
                            Drop Edge
                        </button>
                    </div>
                </div>
                <div className="row mt-4">
                    <button
                        className="btn btn-md btn-danger"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
