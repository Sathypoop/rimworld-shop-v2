type StoreItem = {
    abr: string,
    price: number;
    category: string;
    defname: string;
    description: string;
    hitPoints: string | '';
    stackLimit: string | "";
    damage: string | '';
    armor: string | '';
    range: string | '';
    nutrition: string | '';
    research: string;
    weaponDetails: string | '-';
    armorPen: string | '-';
};

export default StoreItem;