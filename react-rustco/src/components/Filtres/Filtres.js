import React, { useState, useEffect} from 'react';
import './Filtres.css';

function Filtres(props) {
  //filtres par marque pour modeles
  const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
  const [modeles, setModeles] = useState([]);

  // annee
  const anneeCourrante = new Date().getFullYear();
  const annees = Array.from({ length: (anneeCourrante - 1920) + 1 }, (_, index) => anneeCourrante - index);

  //modeles
  const modelesParMarque = {
    audi: ["A3", "A4", "A6", "Q5", "Q7"],
    bmw: ["320i", "X3", "X5", "M3", "M5"],
    chevrolet: ["Camaro", "Corvette", "Silverado", "Equinox", "Malibu"],
    fiat: ["500", "Panda", "Punto", "Tipo", "Uno"],
    ford: ["Fiesta", "Focus", "Mustang", "Explorer", "F-150"],
    honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
    hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
    kia: ["Rio", "Soul", "Sportage", "Sorento", "Optima"],
    mazda: ["Mazda3", "Mazda6", "CX-5", "CX-9", "MX-5 Miata"],
    "mercedes-benz": ["CLA", "C-Class", "E-Class", "S-Class", "GLE"],
    mitsubishi: ["Mirage", "Lancer", "Outlander", "Eclipse Cross", "Pajero"],
    nissan: ["Micra", "Altima", "Leaf", "Juke", "Qashqai"],
    peugeot: ["208", "308", "508", "2008", "3008"],
    subaru: ["Impreza", "Legacy", "Forester", "Outback", "WRX"],
    tesla: ["Model S", "Model 3", "Model X", "Model Y", "Roadster"],
    toyota: ["Corolla", "Camry", "Prius", "RAV4", "Highlander"],
    volkswagen: ["Golf", "Passat", "Tiguan", "Jetta", "Polo"],
    volvo: ["XC40", "XC60", "XC90", "S60", "V60"]
  };

  useEffect(() => {
    if (marqueSelectionnee && marqueSelectionnee !== "tous") {
      setModeles(modelesParMarque[marqueSelectionnee]);
    } else {
      setModeles([]);
    }
  }, [marqueSelectionnee]);

  const handleMarqueChange = (event) => {
    setMarqueSelectionnee(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    // Call the handleFiltres function passed via props with the selected value
    props.handleFiltres(event.target.elements.filtreConstructeur.value);
  };
   
  return (  
    
      <form method='get' className='flex text-sm form-filtres'>
        <div className='select-wrapper'>
          <select id="filtre-constructeur" defaultValue="" onChange={handleMarqueChange}>
            <option disabled value="">-- Marque --</option>
            <option value="tous">TOUS</option>
            <option value="audi">Audi</option>
            <option value="bmw">BMW</option>
            <option value="chevrolet">Chevrolet</option>
            <option value="fiat">Fiat</option>
            <option value="ford">Ford</option>
            <option value="honda">Honda</option>
            <option value="hyundai">Hyundai</option>
            <option value="kia">Kia</option>
            <option value="mazda">Mazda</option>
            <option value="mercedes-benz">Mercedes-Benz</option>
            <option value="mitsubishi">Mitsubishi</option>
            <option value="nissan">Nissan</option>
            <option value="peugeot">Peugeot</option>
            <option value="subaru">Subaru</option>
            <option value="tesla">Tesla</option>
            <option value="toyota">Toyota</option>
            <option value="volkswagen">Volkswagen</option>
            <option value="volvo">Volvo</option>
          </select>
        </div>
        <div className='select-wrapper'>
          <select id='filtre-annee' defaultValue="">
            <option disabled value="">-- Année --</option>
            <option value="tous">TOUS</option>
            {annees.map(annee => (
              <option key={annee} value={annee}>{annee}</option>
            ))}
          </select>
        </div>
        <div className='select-wrapper'>
          <select id='filtre-modele' defaultValue="">
            <option disabled value="">-- Modèle --</option>
            <option value="tous">TOUS</option>
            {modeles.map(modele => (
              <option key={modele} value={modele}>{modele}</option>
            ))}
          </select>
        </div>
      </form>
    
  );
}

export default Filtres;
