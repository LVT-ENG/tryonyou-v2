/**
 * InfoExtractor Agent
 * Extracts and consolidates important repository information
 */

import fs from 'fs';
import path from 'path';

const infoExtractor = {
  name: "InfoExtractor",
  description: "Extracts and consolidates important information from the repository",
  
  async extractKeyInfo(options = {}) {
    const { format = 'json', includeDetails = true } = options;
    
    try {
      console.log('🔍 Extracting repository information...');
      
      const info = {
        timestamp: new Date().toISOString(),
        project: await this.getProjectInfo(),
        agents: await this.getAgentStatus(),
        technical: await this.getTechnicalInfo(),
        deployment: await this.getDeploymentInfo(),
        products: await this.getProductInfo()
      };

      if (format === 'summary') {
        return this.generateSummary(info);
      }

      return info;
    } catch (error) {
      throw new Error(`Failed to extract information: ${error.message}`);
    }
  },

  async getProjectInfo() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const readme = fs.readFileSync('README.md', 'utf8');
    
    return {
      name: packageJson.name,
      version: packageJson.version,
      title: this.extractTitle(readme),
      description: this.extractDescription(readme),
      features: this.extractFeatures(readme),
      endpoints: this.extractEndpoints(readme),
      dependencies: Object.keys(packageJson.dependencies || {}),
      scripts: packageJson.scripts
    };
  },

  async getAgentStatus() {
    const agentsDoc = fs.readFileSync('AGENTS.md', 'utf8');
    const agentsDir = fs.readdirSync('agents').filter(f => f.endsWith('.js') && f !== 'index.js');
    
    const documented = this.parseAgentsFromDoc(agentsDoc);
    const implemented = agentsDir.map(f => f.replace('.js', ''));
    
    const totalDocumented = Object.values(documented).flat().length;
    const discrepancy = totalDocumented - implemented.length;
    
    return {
      documented: documented,
      implemented: implemented,
      total_documented: totalDocumented,
      total_implemented: implemented.length,
      implementation_gap: discrepancy,
      coverage_percentage: Math.round((implemented.length / totalDocumented) * 100)
    };
  },

  async getTechnicalInfo() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    const envExample = fs.readFileSync('.env.example', 'utf8');
    
    return {
      node_version: packageJson.engines?.node,
      build_command: vercelConfig.buildCommand,
      output_directory: vercelConfig.outputDirectory,
      framework: vercelConfig.framework,
      environment_vars: this.parseEnvVars(envExample),
      dependencies: {
        production: Object.keys(packageJson.dependencies || {}),
        development: Object.keys(packageJson.devDependencies || {})
      }
    };
  },

  async getDeploymentInfo() {
    const deployScripts = [];
    const scriptFiles = ['deploy-auto.sh', 'deploy-manual.sh'];
    
    scriptFiles.forEach(script => {
      if (fs.existsSync(script)) {
        deployScripts.push(script);
      }
    });

    return {
      platform: "Vercel",
      scripts: deployScripts,
      auto_deploy: fs.existsSync('vercel.json'),
      endpoints: [
        'https://tryonyou.app',
        'https://app.tryonyou.app', 
        'https://api.tryonyou.app',
        'https://gpt.tryonyou.app'
      ]
    };
  },

  async getProductInfo() {
    const productsDir = fs.readdirSync('products');
    const products = {};
    
    productsDir.forEach(file => {
      if (file.endsWith('.json')) {
        try {
          const productData = JSON.parse(fs.readFileSync(`products/${file}`, 'utf8'));
          products[file.replace('.json', '')] = Array.isArray(productData) ? productData.length : Object.keys(productData).length;
        } catch (error) {
          console.warn(`Could not parse product file: ${file}`);
        }
      }
    });

    return {
      catalogs: Object.keys(products),
      product_counts: products,
      total_catalogs: Object.keys(products).length,
      shopify_integration: fs.existsSync('shopify_products_final.csv')
    };
  },

  generateSummary(info) {
    return {
      project_name: info.project.name,
      project_title: info.project.title,
      version: info.project.version,
      agents_implemented: info.agents.total_implemented,
      agents_documented: info.agents.total_documented,
      implementation_coverage: `${info.agents.coverage_percentage}%`,
      key_features: info.project.features.slice(0, 3),
      live_endpoints: info.deployment.endpoints,
      product_catalogs: info.products.total_catalogs,
      last_updated: info.timestamp
    };
  },

  // Helper methods
  extractTitle(readme) {
    const match = readme.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : 'TRY-ON';
  },

  extractDescription(readme) {
    const lines = readme.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('**') && lines[i].includes('TRY-ON')) {
        return lines[i].replace(/\*\*/g, '').trim();
      }
    }
    return 'Virtual fitting room powered by emotional AI';
  },

  extractFeatures(readme) {
    const features = [];
    const lines = readme.split('\n');
    let inFeatures = false;
    
    for (const line of lines) {
      if (line.includes('Features')) {
        inFeatures = true;
        continue;
      }
      if (inFeatures && line.startsWith('##')) break;
      if (inFeatures && line.startsWith('- ')) {
        features.push(line.substring(2).trim());
      }
    }
    return features;
  },

  extractEndpoints(readme) {
    const endpoints = [];
    const lines = readme.split('\n');
    
    lines.forEach(line => {
      if (line.includes('https://') && line.includes('tryonyou.app')) {
        const match = line.match(/(https:\/\/[^\s`]+)/);
        if (match) {
          endpoints.push(match[1]);
        }
      }
    });
    return endpoints;
  },

  parseAgentsFromDoc(content) {
    const agents = {};
    const sections = content.split('##').slice(1);
    
    sections.forEach(section => {
      const lines = section.trim().split('\n');
      const sectionName = lines[0].trim();
      const agentList = [];
      
      lines.slice(1).forEach(line => {
        if (line.trim().startsWith('-')) {
          const match = line.match(/\*\*([^*]+)\*\*:?\s*(.+)/);
          if (match) {
            agentList.push({
              name: match[1],
              description: match[2]
            });
          }
        }
      });
      
      if (agentList.length > 0) {
        agents[sectionName] = agentList;
      }
    });
    
    return agents;
  },

  parseEnvVars(content) {
    const vars = {};
    content.split('\n').forEach(line => {
      if (line.includes('=') && !line.startsWith('#')) {
        const [key] = line.split('=');
        vars[key.trim()] = 'configured';
      }
    });
    return vars;
  },

  // Save results to file
  async saveResults(data, filename = 'repo_info_extract.json') {
    try {
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      console.log(`✅ Information saved to: ${filename}`);
      return filename;
    } catch (error) {
      throw new Error(`Failed to save results: ${error.message}`);
    }
  }
};

export default infoExtractor;