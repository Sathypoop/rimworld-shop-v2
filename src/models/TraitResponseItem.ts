import RaceItem from "./RaceItem";
import TraitItem from "./TraitItem";

type TrainResponseItem = {
    traitItems: TraitItem[];
    raceItems: RaceItem[];
};

export default TrainResponseItem;