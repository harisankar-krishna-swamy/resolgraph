import React, { useState } from "react";

const SidePanel = ({
    handleNewNode,
    handleNewEdge,
    handleDropEdge,
    handleDeleteNode,
    handleClear,
}) => {
    const [newLabel, setNodeLabel] = useState("");
    const [sourceLabel, setSourceLabel] = useState("");
    const [targetLabel, setTargetLabel] = useState("");
    const [deleteLabel, setDeleteLabel] = useState("");

    const submitNewNode = (e) => {
        e.preventDefault();
        handleNewNode(newLabel);
        setNodeLabel("");
    };

    const submitDeleteNode = (e) => {
        e.preventDefault();
        handleDeleteNode(deleteLabel);
        setDeleteLabel("");
    };

    return (
        <div className="card">
            <div className="card-header">Graph options</div>
            <div className="card-body">
                <div className="row">
                    <form onSubmit={submitNewNode}>
                        <div className="row">
                            <div className="col-8">
                                <input
                                    type="text"
                                    placeholder="Label"
                                    className="form-control"
                                    value={newLabel}
                                    onChange={(e) =>
                                        setNodeLabel(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-4">
                                <button
                                    type="submit"
                                    className="btn btn-md btn-primary"
                                >
                                    Add Node
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row mt-4">
                    <form onSubmit={submitDeleteNode}>
                        <div className="row">
                            <div className="col-4">
                                <input
                                    type="text"
                                    placeholder="Label"
                                    className="form-control"
                                    value={deleteLabel}
                                    onChange={(e) =>
                                        setDeleteLabel(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-4">
                                <button
                                    type="submit"
                                    className="btn btn-md btn-warning"
                                >
                                    Delete Node
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row mt-4">
                    <div className="row">
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
