import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, RotateCw } from 'lucide-react';
import '../styles/virtual-tryon.css';

interface Garment {
  id: string;
  name: string;
  category: string;
  image: string;
  detailZone: 'chest' | 'waist' | 'shoulders' | 'full';
}

const SAMPLE_GARMENTS: Garment[] = [
  {
    id: '1',
    name: 'Classic White Shirt',
    category: 'Shirts',
    image: '/assets/garments/shirt-white.jpg',
    detailZone: 'chest',
  },
  {
    id: '2',
    name: 'Elegant Black Dress',
    category: 'Dresses',
    image: '/assets/garments/dress-black.jpg',
    detailZone: 'waist',
  },
  {
    id: '3',
    name: 'Casual Blue Jeans',
    category: 'Pants',
    image: '/assets/garments/jeans-blue.jpg',
    detailZone: 'waist',
  },
  {
    id: '4',
    name: 'Luxury Blazer',
    category: 'Jackets',
    image: '/assets/garments/blazer-navy.jpg',
    detailZone: 'shoulders',
  },
];

/**
 * VirtualTryOn Component
 * 
 * Features:
 * - Elegant fade transition when changing garments (no futuristic rays)
 * - Realistic 3D avatar on illuminated platform
 * - Automatic 360° rotation
 * - Auto-zoom to garment detail zone
 */
export default function VirtualTryOn() {
  const [currentGarmentIndex, setCurrentGarmentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const currentGarment = SAMPLE_GARMENTS[currentGarmentIndex];

  // Auto-rotation effect
  useEffect(() => {
    if (!isRotating) return;

    const rotationInterval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 30); // Smooth 360° rotation

    // Stop after one full rotation
    const stopTimer = setTimeout(() => {
      setIsRotating(false);
      setRotation(0);
    }, 10800); // 360 * 30ms = 10.8s for full rotation

    return () => {
      clearInterval(rotationInterval);
      clearTimeout(stopTimer);
    };
  }, [isRotating]);

  // Auto-zoom to detail after rotation
  useEffect(() => {
    if (!isRotating && rotation === 0 && !isZoomed) {
      const zoomTimer = setTimeout(() => {
        setIsZoomed(true);
      }, 500);

      return () => clearTimeout(zoomTimer);
    }
  }, [isRotating, rotation, isZoomed]);

  const handleGarmentChange = (direction: 'next' | 'prev') => {
    setIsChanging(true);
    setIsZoomed(false);
    setRotation(0);

    // Elegant fade transition
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentGarmentIndex((prev) => (prev + 1) % SAMPLE_GARMENTS.length);
      } else {
        setCurrentGarmentIndex((prev) => 
          prev === 0 ? SAMPLE_GARMENTS.length - 1 : prev - 1
        );
      }

      setTimeout(() => {
        setIsChanging(false);
        // Start rotation sequence after garment change
        setTimeout(() => {
          setIsRotating(true);
        }, 300);
      }, 400); // Fade-in duration
    }, 400); // Fade-out duration
  };

  const getDetailZoomClass = () => {
    if (!isZoomed) return '';
    
    switch (currentGarment.detailZone) {
      case 'chest':
        return 'zoom-chest';
      case 'waist':
        return 'zoom-waist';
      case 'shoulders':
        return 'zoom-shoulders';
      default:
        return 'zoom-full';
    }
  };

  return (
    <div className="virtual-tryon">
      <div className="virtual-tryon__container">
        {/* Header */}
        <div className="virtual-tryon__header">
          <h2 className="virtual-tryon__title">Virtual Try-On Experience</h2>
          <p className="virtual-tryon__subtitle">
            See how garments look on a realistic 3D avatar
          </p>
        </div>

        {/* Main Try-On Area */}
        <div className="virtual-tryon__main">
          {/* Avatar Display with Platform */}
          <div className="virtual-tryon__stage">
            {/* Illuminated Platform */}
            <div className="virtual-tryon__platform">
              <div className="platform__base"></div>
              <div className="platform__light"></div>
              <div className="platform__glow"></div>
            </div>

            {/* Avatar Container */}
            <div 
              className={`
                virtual-tryon__avatar-container
                ${isChanging ? 'changing' : ''}
                ${isRotating ? 'rotating' : ''}
                ${getDetailZoomClass()}
              `}
              style={{
                transform: `rotateY(${rotation}deg)`,
              }}
            >
              {/* Avatar Silhouette (placeholder for 3D model) */}
              <div className="avatar__silhouette">
                <div className="avatar__head"></div>
                <div className="avatar__torso"></div>
                <div className="avatar__arms">
                  <div className="avatar__arm avatar__arm--left"></div>
                  <div className="avatar__arm avatar__arm--right"></div>
                </div>
                <div className="avatar__legs">
                  <div className="avatar__leg avatar__leg--left"></div>
                  <div className="avatar__leg avatar__leg--right"></div>
                </div>

                {/* Garment Overlay */}
                <div className="avatar__garment">
                  <div className={`garment__overlay garment__overlay--${currentGarment.category.toLowerCase()}`}>
                    <span className="garment__label">{currentGarment.name}</span>
                  </div>
                </div>
              </div>

              {/* Zoom Indicator */}
              {isZoomed && (
                <div className="zoom-indicator">
                  <ZoomIn className="zoom-indicator__icon" />
                  <span>Detail View</span>
                </div>
              )}

              {/* Rotation Indicator */}
              {isRotating && (
                <div className="rotation-indicator">
                  <RotateCw className="rotation-indicator__icon rotating" />
                  <span>360° View</span>
                </div>
              )}
            </div>
          </div>

          {/* Garment Info Panel */}
          <div className="virtual-tryon__info">
            <div className="info__card">
              <h3 className="info__garment-name">{currentGarment.name}</h3>
              <p className="info__category">{currentGarment.category}</p>
              
              <div className="info__actions">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRotating(true)}
                  disabled={isRotating || isChanging}
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  Rotate 360°
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsZoomed(!isZoomed)}
                  disabled={isRotating || isChanging}
                >
                  <ZoomIn className="w-4 h-4 mr-2" />
                  {isZoomed ? 'Full View' : 'Detail View'}
                </Button>
              </div>

              <div className="info__features">
                <div className="feature">
                  <div className="feature__icon">✨</div>
                  <div className="feature__text">
                    <strong>Elegant Transition</strong>
                    <p>Smooth fade effect when changing garments</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature__icon">🔄</div>
                  <div className="feature__text">
                    <strong>360° Rotation</strong>
                    <p>Automatic rotation on illuminated platform</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature__icon">🔍</div>
                  <div className="feature__text">
                    <strong>Auto Zoom</strong>
                    <p>Focuses on garment details automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Garment Navigation */}
        <div className="virtual-tryon__navigation">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleGarmentChange('prev')}
            disabled={isChanging || isRotating}
            className="nav-button"
          >
            <ChevronLeft className="w-6 h-6" />
            Previous
          </Button>

          <div className="navigation__indicator">
            {SAMPLE_GARMENTS.map((_, index) => (
              <div
                key={index}
                className={`indicator__dot ${index === currentGarmentIndex ? 'active' : ''}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => handleGarmentChange('next')}
            disabled={isChanging || isRotating}
            className="nav-button"
          >
            Next
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
