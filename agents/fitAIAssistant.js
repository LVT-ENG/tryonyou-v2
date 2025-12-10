const fitAIAssistant = {
  descripcion: `Recomienda la talla ideal segun medidas basicas`,
  recommend({ bust, waist, hips }) {
    const avg = (bust + waist + hips) / 3;
    if (avg > 100) return "L";
    if (avg > 90) return "M";
    return "S";
  },
  ejemplo: `fitAIAssistant.recommend({bust:95, waist:80, hips:90}) // -> 'M'`,
};

module.exports = fitAIAssistant;
