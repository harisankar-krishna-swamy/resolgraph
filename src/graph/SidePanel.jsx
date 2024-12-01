import React, { useState } from "react";

const SidePanel = ({ handleNewNode }) => {
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
            <div className="card-header">Graph</div>
            <div className="card-body">
                <form onSubmit={submitNewNode}>
                    <div className="form-floating mt-2">
                        <input
                            id="node-label"
                            type="text"
                            className="form-control"
                            value={nodeLabel}
                            onChange={(e) => setNodeLabel(e.target.value)}
                            required
                        />
                        <label htmlFor="node-label">Node Label</label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary mt-2"
                    >
                        Add Node
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SidePanel;
