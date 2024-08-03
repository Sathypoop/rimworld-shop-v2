import StoreItem from "../StoreItem";
import TraitItem from "../TraitItem";

const priceColumn = {
  id: 'Price',
  name: 'Price',
  selector: (row: StoreItem) => row.price,
  sortable: true,
  grow: 1,
};

const nameColumn = {
  name: 'Name',
  selector: (row: StoreItem) => row.abr,
  sortable: true,
  grow: 1,
  wrap: true,
};

const descriptionColumn = {
  name: 'Description',
  selector: (row: StoreItem) => row.description,
  grow: 1,
  wrap: true,
};

const stackLimitColumn = {
  name: 'Stack Limit',
  selector: (row: StoreItem) => row.stackLimit,
  grow: 1,
  wrap: true,
  sortable: true,
};

const damageColumn = {
  name: 'Damage',
  selector: (row: StoreItem) => row.damage,
  grow: 1,
  wrap: true,
  sortable: true
};

const apColumn = {
  name: 'AP %',
  selector: (row: StoreItem) => row.armorPen,
  grow: 1,
  wrap: true,
  sortable: true
};

const researchColumn = {
  name: 'Research',
  selector: (row: StoreItem) => row.research,
  conditionalCellStyles: [
    {
      when: (row: StoreItem) => row.research !== 'None',
      style: {
        color: '#FFD700',
      },
    }
  ],
  grow: 1,
  wrap: true,
  sortable: true,
}

const rangeColumn = {
  name: 'Range',
  selector: (row: StoreItem) => row.range,
  grow: 1,
  wrap: true,
  sortable: true
};

const armorColumn = {
  name: 'Armour',
  selector: (row: StoreItem) => row.armor,
  grow: 1,
  wrap: true,
  sortable: true
};

const nutritionColumn = {
  name: 'Nutrition Value',
  selector: (row: StoreItem) => row.nutrition,
  grow: 1,
  wrap: true,
  sortable: true
};

const categoryColumn = {
  name: 'Category',
  selector: (row: StoreItem) => row.category,
  sortable: true,
  grow: 1,
  wrap: true,
};

const hpColumn = {
  name: 'Hitpoints',
  selector: (row: StoreItem) => row.hitPoints,
  sortable: true,
  grow: 1,
  wrap: true,
};


const traitNameColumn = {
  name: 'Name',
  selector: (row: TraitItem) => row.name,
  sortable: true,
  grow: 1,
  wrap: true,
};

const traitStatsColumn = {
  name: 'Stats',
  selector: (row: TraitItem) => row.stats.join('\n'), // Join stats with newline characters
  sortable: true,
  grow: 2,
  wrap: true,
  cell: (row: TraitItem) => (
    <div style={{ whiteSpace: 'pre-wrap', textAlign: 'start', paddingBottom: '16px', paddingTop: '16px' }}>
      {row.stats.join('\n')}
    </div>
  ),
};

const traitAddPriceColumn = {
  name: 'Add Price',
  selector: (row: TraitItem) => row.addPrice,
  sortable: true,
  grow: 1,
  wrap: true,
}

const traitRemovePriceColumn = {
  name: 'Remove Price',
  selector: (row: TraitItem) => row.removePrice,
  sortable: true,
  grow: 1,
  wrap: true,
}

const traitConflictsColumn = {
  name: 'Conflicts',
  selector: (row: TraitItem) => row.conflicts.join(', '),
  conditionalCellStyles: [
    {
      when: (row: TraitItem) => row.conflicts.length != 0,
      style: {
        color: '#FFD700',
      },
    }
  ],
  cell: (row: TraitItem) => (
    <div style={{ whiteSpace: 'pre-wrap', textAlign: 'start', paddingBottom: '16px', paddingTop: '16px' }}>
      {row.conflicts.join('\n')}
    </div>
  ),
  sortable: true,
  grow: 1,
  wrap: true,
}

export { traitAddPriceColumn, traitStatsColumn, traitNameColumn, traitConflictsColumn, traitRemovePriceColumn, hpColumn, rangeColumn, priceColumn, apColumn, nameColumn, researchColumn, categoryColumn, damageColumn, armorColumn, descriptionColumn, nutritionColumn, stackLimitColumn };


