import './App.scss';
import DataTable from 'react-data-table-component';
import dataImport from './data/StoreItems.json';
import { useEffect, useState } from 'react';
import StoreItem from './models/StoreItem';
import { priceColumn, categoryColumn, nameColumn, nutritionColumn, researchColumn, damageColumn, descriptionColumn, armorColumn, hpColumn, rangeColumn, stackLimitColumn, apColumn, traitNameColumn, traitAddPriceColumn, traitRemovePriceColumn, traitConflictsColumn, traitStatsColumn } from './models/columns/columnTypes';
import UnFavIcon from './svgs/heart-minus';
import FavIcon from './svgs/heart-plus';
import TraitItem from './models/TraitItem';
import shopExt from './data/ShopExt.json';

function App() {

  const data: StoreItem[] = dataImport.items;
  const traitData: TraitItem[] = shopExt.traits;

  const coinInterval = 1;
  const coinAmount = 250;

  const [favourites, setFavourites] = useState<StoreItem[]>(JSON.parse(localStorage.getItem('favourites') || '[]'));
  const [favouriteTraits, setFavouritesTraits] = useState<TraitItem[]>(JSON.parse(localStorage.getItem('favouritesTraits') || '[]'));
  const [activeTab, setActiveTab] = useState<'items' | 'favourites' | 'summary' | 'traits'>('items');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAddFavourite = (item: StoreItem) => {
    if (!favourites.find(fav => fav.defname === item.defname)) {
      setFavourites([...favourites, item]);
    }
  }

  const handleTraitAddFav = (traitItem: TraitItem) => {
    if (!favouriteTraits.find(fav => fav.name === traitItem.name)) {
      setFavouritesTraits([...favouriteTraits, traitItem]);
    }
  }

  const handleRemoveTraitFav = (traitItem: TraitItem) => {
    setFavouritesTraits(favouriteTraits.filter(fav => fav.name !== traitItem.name));
  }

  const handleRemoveFavourite = (item: StoreItem) => {
    setFavourites(favourites.filter(fav => fav.defname !== item.defname));
  }
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const favColumn = {
    name: 'Actions',
    cell: (row: StoreItem) => (
      <div>
        {
          favourites.find(fav => fav.defname === row.defname) ?
            <button className="action-button" onClick={() => handleRemoveFavourite(row)}>
              <UnFavIcon />
            </button> :
            <button className='action-button' onClick={() => handleAddFavourite(row)}>
              <FavIcon />
            </button>
        }
        {/* <button className='action-button' onClick={() => handleAddFavourite(row)}>
          <DetailsIcon />
        </button> */}
      </div>
    ),
    grow: 1
  };

  const favTraitColumn = {
    name: 'Actions',
    cell: (row: TraitItem) => (
      <div>
        {
          favouriteTraits.find(fav => fav.name === row.name) ?
            <button className="action-button" onClick={() => handleRemoveTraitFav(row)}>
              <UnFavIcon />
            </button> :
            <button className='action-button' onClick={() => handleTraitAddFav(row)}>
              <FavIcon />
            </button>
        }
        {/* <button className='action-button' onClick={() => handleAddFavourite(row)}>
          <DetailsIcon />
        </button> */}
      </div>
    ),
    grow: 1
  };

  const traitColumns = [
    traitNameColumn,
    traitAddPriceColumn,
    traitRemovePriceColumn,
    traitStatsColumn,
    traitConflictsColumn,
  ];

  const customStyles = {
    table: {
      style: {
      },
    },
    headCells: {
      style: {
        color: '#DAA520',
        fontWeight: '700',
        fontSize: '20px',
        backgroundColor: '#2B2B2B',
        height: '56px'
      },
    },
    cells: {
      style: {
        fontSize: '16px',
      },
    },
  }

  const defaultColumns = [
    nameColumn,
    priceColumn,
    categoryColumn,
    researchColumn,
    favColumn
  ];

  const weaponColumns = [
    nameColumn,
    priceColumn,
    damageColumn,
    favColumn,
  ]

  const rangedWeaponColumns = [
    nameColumn,
    priceColumn,
    damageColumn,
    rangeColumn,
    researchColumn,
    apColumn,
    favColumn,
  ]

  const rawResourceColumn = [
    nameColumn,
    priceColumn,
    hpColumn,
    stackLimitColumn,
    favColumn
  ]

  const foodColumn = [
    nameColumn,
    priceColumn,
    nutritionColumn,
    stackLimitColumn,
    favColumn
  ]

  const furnitureColumn = [
    nameColumn,
    priceColumn,
    researchColumn,
    favColumn,
  ]

  const medicineColumn = [
    nameColumn,
    priceColumn,
    stackLimitColumn,
    favColumn
  ]

  const miscColumn = [
    nameColumn,
    priceColumn,
    stackLimitColumn,
    favColumn
  ]

  const clothingColumn = [
    nameColumn,
    priceColumn,
    armorColumn,
    researchColumn,
    favColumn
  ]

  const drugCategory = [
    nameColumn,
    priceColumn,
    researchColumn,
    favColumn
  ]

  const categories = ['All', 'Ranged Weapons', 'Clothing', 'Melee Weapons', 'Foods', 'Medicine', 'Drugs', 'Furniture', 'Raw Resources', 'Misc'];

  const getCategoryColumn = (category: string, inFav: boolean) => {

    switch (category) {
      case 'Misc':
        return miscColumn;
      case 'Medicine':
        return medicineColumn;
      case 'Furniture':
        return furnitureColumn;
      case 'Persona Weapons':
        return weaponColumns;
      case 'Melee Weapons':
        return weaponColumns;
      case 'Ranged Weapons':
        return rangedWeaponColumns;
      case 'Raw Resources':
        return rawResourceColumn;
      case 'Foods':
        return foodColumn;
      case 'Drugs':
        return drugCategory;
      case 'Clothing':
        return clothingColumn;
      default:
        return defaultColumns;
    }
  }

  const totalCost = favourites.reduce((sum, item) => sum + item.price, 0);

  const totalTimeCost = Math.ceil((totalCost / coinAmount) * coinInterval);

  const filterDataByGroup = () => {
    let filteredData = null;
    switch (activeCategory) {
      case 'Clothing':
        filteredData = data.filter(item =>
          (
            item.category.toLocaleLowerCase() === 'armor'
            || item.category.toLocaleLowerCase() === 'apparel'
            || item.category.toLocaleLowerCase() === 'headgear'
          ) && (item.abr.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        break;
      case 'Melee Weapons':
        filteredData = data.filter(item =>
          (
            item.category.toLocaleLowerCase() === 'melee weapons'
            || item.category.toLocaleLowerCase() === 'persona weapons'
          ) && (item.abr.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        break;
      case 'Foods':
        filteredData = data.filter(item =>
          (
            item.category.toLocaleLowerCase() === 'meat'
            || item.category.toLocaleLowerCase() === 'vegetarian'
            || item.category.toLocaleLowerCase() === 'meals'
            || item.category.toLocaleLowerCase() === 'eggs (fert.)'
            || item.category.toLocaleLowerCase() === 'eggs (unfert.)'
          ) && (item.abr.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        break;
      case 'Drugs':
        filteredData = data.filter(item =>
          (
            item.category.toLocaleLowerCase() === 'drugs'
          ) && (item.abr.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        break;
      default:
        filteredData = data.filter(item =>
          (activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase()) &&
          (item.defname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.damage && item.damage.toLowerCase().includes(searchTerm.toLowerCase())))
        );
    }
    return filteredData;
  }

  const filterFavDataByGroup = () => {
    let filteredData = null;
    switch (activeCategory) {
      case 'Clothing':
        filteredData = favourites.filter(item => (
          item.category.toLocaleLowerCase() === 'armor'
          || item.category.toLocaleLowerCase() === 'apparel'
          || item.category.toLocaleLowerCase() === 'headgear'
        ) && (item.abr.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        break;
      case 'Melee Weapons':
        filteredData = favourites.filter(item => (
          item.category.toLocaleLowerCase() === 'melee weapons'
          || item.category.toLocaleLowerCase() === 'persona weapons'
        ) && (item.abr.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        break;
      case 'Foods':
        filteredData = favourites.filter(item => (
          item.category.toLocaleLowerCase() === 'meat'
          || item.category.toLocaleLowerCase() === 'vegetarian'
          || item.category.toLocaleLowerCase() === 'meals'
          || item.category.toLocaleLowerCase() === 'eggs (fert.)'
          || item.category.toLocaleLowerCase() === 'eggs (unfert.)'
          || item.category.toLocaleLowerCase() === 'drugs'
        ) && (item.abr.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        break;
      default:
        filteredData = favourites.filter(item =>
          (activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase()) &&
          (item.defname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.damage && item.damage.toLowerCase().includes(searchTerm.toLowerCase())))
        );
    }
    return filteredData;
  }

  const filteredFavData = favourites.filter(item =>
    (activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase()) &&
    (item.defname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.damage && item.damage.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const filterTraits = traitData.filter(item =>
    (activeCategory === 'All' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sathy's Rimworld Shop</h1>
      </header>
      <div className='table-container'>
        <div className="tab-group">
          <button
            className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            Shop
          </button>
          <button
            className={`tab-button ${activeTab === 'favourites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favourites')}
          >
            Favorites
          </button>
          <button
            className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Statistics
          </button>
          <button
            className={`tab-button ${activeTab === 'traits' ? 'active' : ''}`}
            onClick={() => setActiveTab('traits')}
          >
            Traits
          </button>
        </div>
        {
          activeTab !== 'summary' && activeTab !== 'traits' && (
            <>
              <div className="category-group">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-button ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)} />
              </div></>
          )
        }
        {activeTab === 'items' && (
          <DataTable
            columns={getCategoryColumn(activeCategory, true)}
            data={filterDataByGroup()}
            pagination
            paginationPerPage={30}
            paginationRowsPerPageOptions={[10, 15, 20, 30, 50, 100, 500, 1000]}
            theme="dark"
            customStyles={customStyles}
            dense
          />
        )}
        {activeTab === 'favourites' && (
          <DataTable
            columns={getCategoryColumn(activeCategory, true)}
            data={filterFavDataByGroup()}
            pagination
            paginationPerPage={30}
            paginationRowsPerPageOptions={[10, 15, 20, 30, 50, 100, 500, 1000]}
            theme="dark"
            customStyles={customStyles}
          />
        )}
        {activeTab === 'traits' && (
          <DataTable
            columns={traitColumns}
            data={filterTraits}
            pagination
            paginationPerPage={30}
            paginationRowsPerPageOptions={[10, 15, 20, 30, 50, 100, 500, 1000]}
            theme="dark"
            customStyles={customStyles}
          />
        )}
        {
          activeTab === 'summary' && (
            <div className='summary'>
              <h2>General Itemshop Statistics</h2>
              <div className='summary-text-container'>
                <div>
                  <span>Total Cost of Fav Item(s): </span> <span className='summary-cost'>{totalCost} Points</span>
                </div>
                <div>
                  <span>Total Time Needed: </span> <span className='summary-cost'>{totalTimeCost} Minutes</span> <span> at </span> <span className='summary-cost'>{coinAmount} points </span> <span> per </span> <span className='summary-cost'>{coinInterval} minute(s)</span>
                </div>
              </div>
            </div>

          )}
      </div>
    </div>
  );
}

export default App;
