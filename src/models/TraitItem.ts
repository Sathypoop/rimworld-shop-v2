type TraitItem = {
    name: string;
    addPrice: number;
    removePrice: number;
    conflicts: string[];
    description: string;
    canAdd: boolean;
    canRemove: boolean;
    stats: string[];
};

export default TraitItem;