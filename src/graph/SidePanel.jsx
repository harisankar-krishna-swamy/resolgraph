import React, { useState } from "react";

const SidePanel = ({ handleNewNode, handleClear }) => {
    const [nodeLabel, setNodeLabel] = useState("");

    const submitNewNode = (e) => {
        e.preventDefault();
        const newNode = {
            x: Math.random() * 10 + 50,
            y: Math.random() * 10 + 50,
            size: 15,
            label: nodeLabel,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        };
        handleNewNode(newNode);
        setNodeLabel("");
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
                                    value={nodeLabel}
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
