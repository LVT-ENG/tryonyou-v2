import { useState, useEffect } from 'react';
import '../styles/tryon-premium.css';

interface Garment {
  id: string;
  name: string;
  category: string;
  color: string;
  image: string;
  price: string;
  material: string;
}

interface Model {
  id: string;
  name: string;
  image: string;
}

const GARMENTS: Garment[] = [
  { id: '1', name: 'Vestido Rojo de Noche', category: 'Vestidos', color: 'Rojo', image: '/assets/premium/dress-red-evening-gown.jpg', price: '€450', material: 'Seda' },
  { id: '2', name: 'Vestido Negro Cóctel', category: 'Vestidos', color: 'Negro', image: '/assets/premium/dress-black-cocktail.jpg', price: '€380', material: 'Satén' },
  { id: '3', name: 'Vestido Azul Maxi', category: 'Vestidos', color: 'Azul', image: '/assets/premium/dress-blue-maxi.jpg', price: '€320', material: 'Gasa' },
  { id: '4', name: 'Traje Navy Hombre', category: 'Trajes', color: 'Navy', image: '/assets/premium/suit-navy-mens.jpg', price: '€650', material: 'Lana' },
  { id: '5', name: 'Traje Gris Mujer', category: 'Trajes', color: 'Gris', image: '/assets/premium/suit-gray-womens.jpg', price: '€580', material: 'Lana' },
  { id: '6', name: 'Blusa Blanca Seda', category: 'Casual', color: 'Blanco', image: '/assets/premium/casual-white-blouse.jpg', price: '€180', material: 'Seda' },
  { id: '7', name: 'Chaqueta Denim', category: 'Casual', color: 'Azul', image: '/assets/premium/casual-denim-jacket.jpg', price: '€220', material: 'Denim' },
  { id: '8', name: 'Trench Beige', category: 'Casual', color: 'Beige', image: '/assets/premium/casual-beige-trench.jpg', price: '€480', material: 'Gabardina' },
  { id: '9', name: 'Activewear Negro', category: 'Deportivo', color: 'Negro', image: '/assets/premium/sport-black-activewear.jpg', price: '€150', material: 'Técnico' },
  { id: '10', name: 'Outfit Yoga', category: 'Deportivo', color: 'Púrpura', image: '/assets/premium/sport-yoga-outfit.jpg', price: '€120', material: 'Lycra' },
  { id: '11', name: 'Bolso Cuero', category: 'Accesorios', color: 'Marrón', image: '/assets/premium/accessory-leather-handbag.jpg', price: '€380', material: 'Cuero' },
  { id: '12', name: 'Pañuelo Seda', category: 'Accesorios', color: 'Multicolor', image: '/assets/premium/accessory-silk-scarf.jpg', price: '€95', material: 'Seda' },
  { id: '13', name: 'Gafas de Sol', category: 'Accesorios', color: 'Negro', image: '/assets/premium/accessory-sunglasses.jpg', price: '€250', material: 'Acetato' },
  { id: '14', name: 'Reloj Oro', category: 'Accesorios', color: 'Dorado', image: '/assets/premium/accessory-gold-watch.jpg', price: '€1200', material: 'Oro' },
  { id: '15', name: 'Cinturón Cuero', category: 'Accesorios', color: 'Negro', image: '/assets/premium/accessory-leather-belt.jpg', price: '€120', material: 'Cuero' },
  { id: '16', name: 'Vestido Verde Esmeralda', category: 'Vestidos', color: 'Verde', image: '/assets/premium/dress-green-emerald.jpg', price: '€420', material: 'Satén' },
  { id: '17', name: 'Camisa Rosa Seda', category: 'Casual', color: 'Rosa', image: '/assets/premium/shirt-pink-silk.jpg', price: '€195', material: 'Seda' },
  { id: '18', name: 'Pantalón Lino Blanco', category: 'Casual', color: 'Blanco', image: '/assets/premium/pants-white-linen.jpg', price: '€160', material: 'Lino' },
  { id: '19', name: 'Blazer Terciopelo Burgundy', category: 'Trajes', color: 'Burgundy', image: '/assets/premium/jacket-burgundy-velvet.jpg', price: '€520', material: 'Terciopelo' },
  { id: '20', name: 'Falda Dorada Metálica', category: 'Vestidos', color: 'Dorado', image: '/assets/premium/skirt-gold-metallic.jpg', price: '€280', material: 'Metálico' },
];

const MODELS: Model[] = [
  { id: 'redhead-natural', name: 'Pelirroja Divina', image: '/assets/premium/model-redhead-natural.png' },
  { id: 'blonde-male', name: 'Rubio Le Male', image: '/assets/premium/model-blonde-male-fashion.png' },
  { id: 'arabic-male', name: 'Árabe Elegante', image: '/assets/premium/model-arabic-male-fashion.png' },
  { id: 'indian-female', name: 'India Bollywood', image: '/assets/premium/model-indian-female-fashion.png' },
  { id: 'rugged-male', name: 'Rudo Fashion', image: '/assets/premium/model-rugged-male-fashion.png' },
  { id: 'female-elegant', name: 'Elegante Clásica', image: '/assets/premium/model-female-elegant.png' },
  { id: 'female-casual', name: 'Casual Chic', image: '/assets/premium/model-female-casual.png' },
];

export default function TryOnPremium() {
  const [selectedGarment, setSelectedGarment] = useState<Garment>(GARMENTS[0]);
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);

  // Detectar preferencia de movimiento reducido
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationsEnabled(false);
    }
    
    // Detectar rendimiento bajo
    const connection = (navigator as any).connection;
    if (connection && (connection.effectiveType === '2g' || connection.saveData)) {
      setLowPerformanceMode(true);
    }
  }, []);

  const handleGarmentChange = (garment: Garment) => {
    setIsTransitioning(true);
    setShowZoom(false);
    
    setTimeout(() => {
      setSelectedGarment(garment);
      setIsTransitioning(false);
      if (animationsEnabled) {
        setIsRotating(true);
      }
      
      setTimeout(() => {
        setIsRotating(false);
        setShowZoom(true);
      }, 12000); // 12s rotation
    }, 600); // 600ms transition
  };

  return (
    <div className="tryon-premium-container">
      {/* Controles de animación */}
      <div className="animation-controls">
        <button 
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          aria-label={animationsEnabled ? 'Pausar animaciones' : 'Reanudar animaciones'}
          title={animationsEnabled ? 'Pausar animaciones' : 'Reanudar animaciones'}
        >
          {animationsEnabled ? '⏸️ Pausar' : '▶️ Reanudar'}
        </button>
        {lowPerformanceMode && <span className="low-perf-badge">Modo Ligero</span>}
      </div>

      {/* Logo TRYONYOU arriba derecha */}
      <div className="tryonyou-logo">
        <img src="/assets/tryonyou-logo.png" alt="TRYONYOU" />
      </div>

      {/* PAU Asistente abajo izquierda */}
      <div className="pau-assistant">
        <img src="/assets/pau-assistant.png" alt="PAU" />
        <div className="pau-bubble">Hi! I'm PAU, your styling assistant</div>
      </div>

      {/* Panel izquierdo - Catálogo de prendas */}
      <div className="garments-panel" role="region" aria-label="Catálogo de prendas">
        <h2>Premium Collection</h2>
        <div className="garments-grid">
          {GARMENTS.map(garment => (
            <div
              key={garment.id}
              className={`garment-card ${selectedGarment.id === garment.id ? 'active' : ''}`}
              onClick={() => handleGarmentChange(garment)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleGarmentChange(garment)}
              aria-label={`Seleccionar ${garment.name}, ${garment.price}`}
            >
              <img src={garment.image} alt={garment.name} loading="lazy" />
              <div className="garment-info">
                <h4>{garment.name}</h4>
                <p>{garment.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centro - Avatar en plataforma giratoria */}
      <div className="avatar-stage" role="main" aria-label="Visor de prueba virtual">
        <div className={`avatar-container ${isTransitioning ? 'transitioning' : ''} ${isRotating ? 'rotating' : ''}`}>
          <div className="platform-base">
            <div className="platform-lights"></div>
          </div>
          
          <div className="avatar-wrapper">
            <img src={selectedModel.image} alt={selectedModel.name} className="avatar-model" loading="eager" />
            <img src={selectedGarment.image} alt={selectedGarment.name} className="avatar-garment" loading="eager" />
          </div>

          {isRotating && (
            <div className="rotation-indicator">
              <div className="spinner"></div>
              <p>Rotating 360°...</p>
            </div>
          )}
        </div>

        {/* Efectos holográficos */}
        <div className="holographic-effects">
          <div className="holo-ring"></div>
          <div className="holo-particles"></div>
        </div>

        {/* Zoom a detalles */}
        {showZoom && (
          <div className="detail-zoom">
            <div className="zoom-magnifier">
              <img src="/assets/premium/textures/silk-texture-detail.jpg" alt="Fabric Detail" />
            </div>
            <div className="zoom-label">
              <span className="material-tag">{selectedGarment.material}</span>
              <span className="quality-tag">Premium Quality</span>
            </div>
          </div>
        )}
      </div>

      {/* Panel derecho - Selector de modelos */}
      <div className="models-panel" role="region" aria-label="Selector de modelos">
        <h2>Select Model</h2>
        <div className="models-grid">
          {MODELS.map(model => (
            <div
              key={model.id}
              className={`model-card ${selectedModel.id === model.id ? 'active' : ''}`}
              onClick={() => setSelectedModel(model)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && setSelectedModel(model)}
              aria-label={`Seleccionar modelo ${model.name}`}
            >
              <img src={model.image} alt={model.name} loading="lazy" />
              <p>{model.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mensajes de valor */}
      <div className="value-messages">
        <div className="value-item">
          <span className="value-icon">⏱️</span>
          <span>Ahorra tiempo: prueba 20 prendas en 2 minutos</span>
        </div>
        <div className="value-item">
          <span className="value-icon">✅</span>
          <span>Reduce devoluciones en 30%</span>
        </div>
        <div className="value-item">
          <span className="value-icon">👗</span>
          <span>Encuentra tu talla perfecta</span>
        </div>
      </div>

      {/* Información de prenda seleccionada */}
      <div className="garment-details">
        <h3>{selectedGarment.name}</h3>
        <div className="details-row">
          <span>Material: {selectedGarment.material}</span>
          <span>Color: {selectedGarment.color}</span>
          <span>{selectedGarment.price}</span>
        </div>
      </div>
    </div>
  );
}
