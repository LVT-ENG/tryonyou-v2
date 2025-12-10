#!/usr/bin/env node

/**
 * TryOnMe Repository Information Extractor
 * Consolidates important information from across the repository
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RepositoryInfoExtractor {
  constructor(rootPath = process.cwd()) {
    this.rootPath = rootPath;
    this.extractedInfo = {
      project: {},
      agents: {},
      configuration: {},
      documentation: {},
      deployment: {},
      products: {},
      metadata: {}
    };
  }

  // Extract project metadata from package.json and README
  extractProjectInfo() {
    try {
      // Package.json information
      const packagePath = path.join(this.rootPath, 'package.json');
      if (fs.existsSync(packagePath)) {
        const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        this.extractedInfo.project = {
          name: packageData.name,
          version: packageData.version,
          description: packageData.description,
          scripts: packageData.scripts,
          dependencies: Object.keys(packageData.dependencies || {}),
          devDependencies: Object.keys(packageData.devDependencies || {}),
          engines: packageData.engines
        };
      }

      // README information
      const readmePath = path.join(this.rootPath, 'README.md');
      if (fs.existsSync(readmePath)) {
        const readmeContent = fs.readFileSync(readmePath, 'utf8');
        this.extractedInfo.project.title = this.extractTitle(readmeContent);
        this.extractedInfo.project.features = this.extractFeatures(readmeContent);
        this.extractedInfo.project.endpoints = this.extractEndpoints(readmeContent);
      }
    } catch (error) {
      console.error('Error extracting project info:', error.message);
    }
  }

  // Extract agent information from AGENTS.md and agents directory
  extractAgentInfo() {
    try {
      // AGENTS.md documentation
      const agentsDocPath = path.join(this.rootPath, 'AGENTS.md');
      if (fs.existsSync(agentsDocPath)) {
        const agentsContent = fs.readFileSync(agentsDocPath, 'utf8');
        this.extractedInfo.agents.documented = this.parseAgentsFromDoc(agentsContent);
      }

      // Actual agents in agents/ directory
      const agentsPath = path.join(this.rootPath, 'agents');
      if (fs.existsSync(agentsPath)) {
        const agentFiles = fs.readdirSync(agentsPath).filter(file => file.endsWith('.js') && file !== 'index.js');
        this.extractedInfo.agents.implemented = agentFiles.map(file => file.replace('.js', ''));
        
        // Extract agent index exports
        const indexPath = path.join(agentsPath, 'index.js');
        if (fs.existsSync(indexPath)) {
          const indexContent = fs.readFileSync(indexPath, 'utf8');
          this.extractedInfo.agents.exported = this.extractExportedAgents(indexContent);
        }
      }

      // Check for discrepancies
      const inconsistenciesPath = path.join(this.rootPath, 'AGENT_INCONSISTENCIES.md');
      if (fs.existsSync(inconsistenciesPath)) {
        const inconsistencies = fs.readFileSync(inconsistenciesPath, 'utf8');
        this.extractedInfo.agents.inconsistencies = this.extractInconsistencies(inconsistencies);
      }
    } catch (error) {
      console.error('Error extracting agent info:', error.message);
    }
  }

  // Extract configuration information
  extractConfiguration() {
    try {
      // Environment variables from .env.example
      const envExamplePath = path.join(this.rootPath, '.env.example');
      if (fs.existsSync(envExamplePath)) {
        const envContent = fs.readFileSync(envExamplePath, 'utf8');
        this.extractedInfo.configuration.environment = this.parseEnvironmentVariables(envContent);
      }

      // Vercel configuration
      const vercelPath = path.join(this.rootPath, 'vercel.json');
      if (fs.existsSync(vercelPath)) {
        this.extractedInfo.configuration.vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
      }

      // Vite configuration
      const vitePath = path.join(this.rootPath, 'vite.config.js');
      if (fs.existsSync(vitePath)) {
        this.extractedInfo.configuration.vite = fs.readFileSync(vitePath, 'utf8');
      }

      // Backup configurations
      const backupConfigPaths = ['backup_config.json', 'backup_master_config.json', 'coordinator_config.json'];
      backupConfigPaths.forEach(configFile => {
        const configPath = path.join(this.rootPath, configFile);
        if (fs.existsSync(configPath)) {
          this.extractedInfo.configuration[configFile.replace('.json', '')] = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }
      });
    } catch (error) {
      console.error('Error extracting configuration info:', error.message);
    }
  }

  // Extract deployment and documentation information
  extractDeploymentInfo() {
    try {
      // Deployment scripts
      const deployScripts = ['deploy-auto.sh', 'deploy-manual.sh'];
      deployScripts.forEach(script => {
        const scriptPath = path.join(this.rootPath, script);
        if (fs.existsSync(scriptPath)) {
          this.extractedInfo.deployment[script] = fs.readFileSync(scriptPath, 'utf8');
        }
      });

      // Makefile
      const makefilePath = path.join(this.rootPath, 'Makefile');
      if (fs.existsSync(makefilePath)) {
        this.extractedInfo.deployment.makefile = fs.readFileSync(makefilePath, 'utf8');
      }

      // Documentation files
      const docsPath = path.join(this.rootPath, 'docs');
      if (fs.existsSync(docsPath)) {
        const docFiles = fs.readdirSync(docsPath).filter(file => file.endsWith('.md'));
        this.extractedInfo.documentation.files = docFiles;
        
        // Extract key documentation content
        const keyDocs = ['deployment_overview.md', 'repository_structure.md', 'agentes_basicos.md'];
        keyDocs.forEach(doc => {
          const docPath = path.join(docsPath, doc);
          if (fs.existsSync(docPath)) {
            this.extractedInfo.documentation[doc.replace('.md', '')] = fs.readFileSync(docPath, 'utf8');
          }
        });
      }
    } catch (error) {
      console.error('Error extracting deployment info:', error.message);
    }
  }

  // Extract product information
  extractProductInfo() {
    try {
      const productsPath = path.join(this.rootPath, 'products');
      if (fs.existsSync(productsPath)) {
        const productFiles = fs.readdirSync(productsPath);
        this.extractedInfo.products.files = productFiles;

        // Parse JSON product files
        productFiles.filter(file => file.endsWith('.json')).forEach(file => {
          try {
            const productData = JSON.parse(fs.readFileSync(path.join(productsPath, file), 'utf8'));
            this.extractedInfo.products[file.replace('.json', '')] = productData;
          } catch (error) {
            console.error(`Error parsing product file ${file}:`, error.message);
          }
        });
      }

      // Shopify products
      const shopifyProductsPath = path.join(this.rootPath, 'shopify_products_final.csv');
      if (fs.existsSync(shopifyProductsPath)) {
        this.extractedInfo.products.shopify_csv = fs.readFileSync(shopifyProductsPath, 'utf8');
      }
    } catch (error) {
      console.error('Error extracting product info:', error.message);
    }
  }

  // Extract metadata and additional information
  extractMetadata() {
    try {
      // Home page texts
      const textosHomePath = path.join(this.rootPath, 'textos_home.txt');
      if (fs.existsSync(textosHomePath)) {
        this.extractedInfo.metadata.home_texts = fs.readFileSync(textosHomePath, 'utf8');
      }

      // Manifest
      const manifestPath = path.join(this.rootPath, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        this.extractedInfo.metadata.manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      }

      // Scripts directory
      const scriptsPath = path.join(this.rootPath, 'scripts');
      if (fs.existsSync(scriptsPath)) {
        const scriptFiles = fs.readdirSync(scriptsPath).filter(file => file.endsWith('.js') || file.endsWith('.py'));
        this.extractedInfo.metadata.scripts = scriptFiles;
      }

      // Automa flows
      const automaPath = path.join(this.rootPath, 'automa_flows');
      if (fs.existsSync(automaPath)) {
        const automaFiles = fs.readdirSync(automaPath);
        this.extractedInfo.metadata.automa_flows = automaFiles;
      }

      // Repository statistics
      this.extractedInfo.metadata.statistics = this.gatherRepoStatistics();
    } catch (error) {
      console.error('Error extracting metadata:', error.message);
    }
  }

  // Helper methods
  extractTitle(readmeContent) {
    const match = readmeContent.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
  }

  extractFeatures(readmeContent) {
    const features = [];
    const lines = readmeContent.split('\n');
    let inFeaturesSection = false;
    
    for (const line of lines) {
      if (line.includes('## 🔍 Features') || line.includes('## Features')) {
        inFeaturesSection = true;
        continue;
      }
      if (inFeaturesSection && line.startsWith('##')) {
        break;
      }
      if (inFeaturesSection && line.startsWith('-')) {
        features.push(line.substring(1).trim());
      }
    }
    return features;
  }

  extractEndpoints(readmeContent) {
    const endpoints = [];
    const lines = readmeContent.split('\n');
    
    for (const line of lines) {
      if (line.includes('https://') && (line.includes('tryonyou.app') || line.includes('vercel'))) {
        const match = line.match(/(https:\/\/[^\s]+)/);
        if (match) {
          endpoints.push(match[1]);
        }
      }
    }
    return endpoints;
  }

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
  }

  extractExportedAgents(indexContent) {
    const exports = [];
    const lines = indexContent.split('\n');
    
    lines.forEach(line => {
      const match = line.match(/^\s*([a-zA-Z]+),?\s*$/);
      if (match && !line.includes('module.exports')) {
        exports.push(match[1]);
      }
    });
    
    return exports;
  }

  extractInconsistencies(content) {
    return {
      documented_but_not_implemented: content.includes('not implemented'),
      summary: content.split('\n').slice(0, 5).join('\n')
    };
  }

  parseEnvironmentVariables(content) {
    const vars = {};
    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (line.includes('=') && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        vars[key.trim()] = value ? value.trim() : '';
      }
    });
    
    return vars;
  }

  gatherRepoStatistics() {
    const stats = {};
    
    try {
      // Count different file types
      const countFiles = (dir, extension) => {
        if (!fs.existsSync(dir)) return 0;
        return fs.readdirSync(dir, { withFileTypes: true })
          .filter(dirent => dirent.isFile() && dirent.name.endsWith(extension))
          .length;
      };

      stats.javascript_files = countFiles(this.rootPath, '.js');
      stats.json_files = countFiles(this.rootPath, '.json');
      stats.markdown_files = countFiles(this.rootPath, '.md');
      stats.python_files = countFiles(this.rootPath, '.py');
      stats.html_files = countFiles(this.rootPath, '.html');
      stats.css_files = countFiles(this.rootPath, '.css');
      
    } catch (error) {
      console.error('Error gathering statistics:', error.message);
    }
    
    return stats;
  }

  // Main extraction method
  extractAll() {
    console.log('🔍 Extracting repository information...');
    
    this.extractProjectInfo();
    this.extractAgentInfo();
    this.extractConfiguration();
    this.extractDeploymentInfo();
    this.extractProductInfo();
    this.extractMetadata();
    
    console.log('✅ Information extraction complete!');
    return this.extractedInfo;
  }

  // Save extracted information to file
  saveToFile(outputPath = 'extracted_repo_info.json') {
    try {
      const fullPath = path.join(this.rootPath, outputPath);
      fs.writeFileSync(fullPath, JSON.stringify(this.extractedInfo, null, 2));
      console.log(`📄 Information saved to: ${fullPath}`);
      return fullPath;
    } catch (error) {
      console.error('Error saving to file:', error.message);
      throw error;
    }
  }

  // Generate summary report
  generateSummary() {
    const summary = {
      project_name: this.extractedInfo.project.name,
      project_title: this.extractedInfo.project.title,
      total_agents_documented: Object.values(this.extractedInfo.agents.documented || {}).flat().length,
      total_agents_implemented: (this.extractedInfo.agents.implemented || []).length,
      total_dependencies: (this.extractedInfo.project.dependencies || []).length,
      key_endpoints: this.extractedInfo.project.endpoints,
      main_features: this.extractedInfo.project.features,
      environment_vars_count: Object.keys(this.extractedInfo.configuration.environment || {}).length,
      documentation_files: (this.extractedInfo.documentation.files || []).length,
      product_files: (this.extractedInfo.products.files || []).length,
      automation_flows: (this.extractedInfo.metadata.automa_flows || []).length
    };
    
    return summary;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const extractor = new RepositoryInfoExtractor();
  
  try {
    const extractedInfo = extractor.extractAll();
    const outputFile = extractor.saveToFile();
    
    console.log('\n📊 EXTRACTION SUMMARY:');
    console.log('='.repeat(50));
    
    const summary = extractor.generateSummary();
    Object.entries(summary).forEach(([key, value]) => {
      console.log(`${key.replace(/_/g, ' ').toUpperCase()}: ${JSON.stringify(value)}`);
    });
    
    console.log('\n🎯 Important Information Available:');
    console.log('- Project metadata and configuration');
    console.log('- AI agents documentation and implementation status');
    console.log('- Deployment and build configurations');
    console.log('- Product catalogs and data');
    console.log('- Environment variables and secrets structure');
    console.log('- Documentation files and guides');
    console.log('- Automation flows and scripts');
    
    console.log(`\n💾 Full details saved to: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Extraction failed:', error.message);
    process.exit(1);
  }
}

export default RepositoryInfoExtractor;