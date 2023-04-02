import { frequencyToNoteAndCents } from "lib/audioTools";
import { RootFrequencyContext } from "components/ContextProviders/rootNoteProvider";
import React, { useContext } from "react";

const RootNoteDisplay: React.FC = () => {
    const rootNote = useContext(RootFrequencyContext);
    const noteInfo = rootNote ? frequencyToNoteAndCents(rootNote) : null;

    return (
        <div>
            <h2>Root Note</h2>
            <p>
                {noteInfo
                    ? `${noteInfo.note} (${noteInfo.cents >= 0 ? "+" : ""}${noteInfo.cents} cents)`
                    : "N/A"}
            </p>
        </div>
    );
};

export default RootNoteDisplay;