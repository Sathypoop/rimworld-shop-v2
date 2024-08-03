type RaceItem = {
    defName: string;
    price: number;
    data: {
        stats: string[];
    };
    description: string;
    enabled: boolean;
};

export default RaceItem;