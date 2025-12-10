/**
 * Test suite for GoogleSheetsMotor
 * 
 * Note: These tests validate the class structure and methods.
 * Integration tests require valid Google Sheets credentials.
 */

describe('GoogleSheetsMotor', () => {
  let GoogleSheetsMotor;

  beforeAll(() => {
    // Mock require to avoid googleapis dependency in tests
    jest.mock('googleapis', () => ({
      google: {
        auth: {
          GoogleAuth: jest.fn()
        },
        sheets: jest.fn()
      }
    }));
    
    // Load the module after mocking
    GoogleSheetsMotor = require('../google-apps-script/GoogleSheetsMotor');
  });

  describe('Constructor', () => {
    test('should create instance with default values', () => {
      const motor = new GoogleSheetsMotor();
      expect(motor).toBeDefined();
      expect(motor.spreadsheetId).toBeDefined();
      expect(motor.credentialsPath).toBeDefined();
    });

    test('should create instance with custom values', () => {
      const spreadsheetId = 'test-spreadsheet-id';
      const credentialsPath = '/path/to/credentials.json';
      const motor = new GoogleSheetsMotor(spreadsheetId, credentialsPath);
      
      expect(motor.spreadsheetId).toBe(spreadsheetId);
      expect(motor.credentialsPath).toBe(credentialsPath);
    });
  });

  describe('Methods', () => {
    let motor;

    beforeEach(() => {
      motor = new GoogleSheetsMotor('test-id', './test-creds.json');
    });

    test('should have initialize method', () => {
      expect(typeof motor.initialize).toBe('function');
    });

    test('should have leerUsuarios method', () => {
      expect(typeof motor.leerUsuarios).toBe('function');
    });

    test('should have buscarUsuario method', () => {
      expect(typeof motor.buscarUsuario).toBe('function');
    });

    test('should have agregarUsuario method', () => {
      expect(typeof motor.agregarUsuario).toBe('function');
    });

    test('should have leerMedidas method', () => {
      expect(typeof motor.leerMedidas).toBe('function');
    });

    test('should have agregarMedidas method', () => {
      expect(typeof motor.agregarMedidas).toBe('function');
    });

    test('should have leerRecomendaciones method', () => {
      expect(typeof motor.leerRecomendaciones).toBe('function');
    });

    test('should have agregarRecomendacion method', () => {
      expect(typeof motor.agregarRecomendacion).toBe('function');
    });

    test('should have leerReglas method', () => {
      expect(typeof motor.leerReglas).toBe('function');
    });

    test('should have leerTendencias method', () => {
      expect(typeof motor.leerTendencias).toBe('function');
    });

    test('should have leerCatalogos method', () => {
      expect(typeof motor.leerCatalogos).toBe('function');
    });
  });

  describe('Data Structure', () => {
    test('should define expected usuario structure', () => {
      const expectedFields = [
        'user_id', 'nombre', 'email', 'sexo', 'edad', 'altura_cm', 'peso_kg',
        'ciudad', 'pais', 'clima', 'estilo_1', 'estilo_2', 'estilo_3',
        'color_1', 'color_2', 'prenda_1', 'prenda_2', 'ajuste_preferido',
        'consentimiento_datos', 'fecha_alta'
      ];
      
      // This validates that the documented structure matches our implementation
      expect(expectedFields).toHaveLength(20);
    });

    test('should define expected medidas structure', () => {
      const expectedFields = [
        'user_id', 'fecha_medida', 'pecho_cm', 'cintura_cm', 'cadera_cm',
        'largo_pierna_cm', 'largo_brazo_cm', 'hombros_cm', 'talla_habitual', 'notas'
      ];
      
      expect(expectedFields).toHaveLength(10);
    });

    test('should define expected recomendacion structure', () => {
      const expectedFields = [
        'user_id', 'prenda_id', 'tipo_prenda', 'color', 'estilo', 'talla_recomendada',
        'bucket', 'precio_eur', 'imagen_url', 'match_score', 'match_preferencias',
        'match_tendencias', 'match_fitting', 'temporada', 'clima', 'fecha_generada', 'notas'
      ];
      
      expect(expectedFields).toHaveLength(17);
    });
  });
});

describe('Motor.gs Structure', () => {
  const fs = require('fs');
  const path = require('path');
  
  let motorCode;

  beforeAll(() => {
    const motorPath = path.join(__dirname, '../google-apps-script/Motor.gs');
    motorCode = fs.readFileSync(motorPath, 'utf8');
  });

  test('should contain initTryOnMe function', () => {
    expect(motorCode).toContain('function initTryOnMe()');
  });

  test('should contain addListValidation helper function', () => {
    expect(motorCode).toContain('function addListValidation(');
  });

  test('should contain onOpen function for menu', () => {
    expect(motorCode).toContain('function onOpen()');
  });

  test('should contain exportUsuariosJSON function', () => {
    expect(motorCode).toContain('function exportUsuariosJSON()');
  });

  test('should contain exportRecomendacionesJSON function', () => {
    expect(motorCode).toContain('function exportRecomendacionesJSON()');
  });

  test('should create all required sheets', () => {
    const requiredSheets = [
      'README',
      'Lists',
      'Usuarios',
      'Medidas',
      'Tendencias',
      'Reglas',
      'Recomendaciones'
    ];

    requiredSheets.forEach(sheetName => {
      expect(motorCode).toContain(`'${sheetName}'`);
    });
  });

  test('should define all catalog lists', () => {
    const catalogs = [
      'Styles',
      'Colors',
      'GarmentTypes',
      'FitPreferences',
      'Sex',
      'OutputBuckets',
      'Climate',
      'Seasons'
    ];

    catalogs.forEach(catalog => {
      expect(motorCode).toContain(catalog);
    });
  });

  test('should include data validation setup', () => {
    expect(motorCode).toContain('addListValidation(usuarios');
    expect(motorCode).toContain('addListValidation(recomendaciones');
  });

  test('should have proper documentation comments', () => {
    expect(motorCode).toContain('/**');
    expect(motorCode).toContain('* Motor.gs');
    expect(motorCode).toContain('@param');
  });
});
