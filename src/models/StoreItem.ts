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
    research: string | '-';
    weaponDetails: string | '-';
    armorPen: string | '-';
    apparelLayer: string | '-';
    rangeCooldown: string | '-';
    shortRangeAccuracy: string | '-';
    midRangeAccuracy: string | '-';
    longRangeAccuracy: string | '-';
};

export default StoreItem;
