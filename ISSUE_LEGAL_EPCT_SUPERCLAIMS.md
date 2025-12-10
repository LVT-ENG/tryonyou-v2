# ISSUE: Legal Compliance - EPCT Superclaims Review (2025-10-26)

## Executive Summary

This document identifies marketing superclaims across the TryOnMe platform that may violate European Consumer Protection Treaty (EPCT) regulations and general advertising law principles. These claims require immediate review and modification to ensure legal compliance across EU markets.

## Issue Priority: HIGH

**Status:** 🔴 Requires Immediate Action  
**Impact:** Legal compliance, consumer protection regulations  
**Markets Affected:** EU, UK, France, Spain  
**Date Identified:** 2025-10-26  

---

## Identified Superclaims

### 1. "Perfect Fit" / "Your Perfect Fit" / "Talla Perfecta"

**Locations:**
- `index.html` (line 5): "TryOnMe – Your Perfect Fit. Zero Returns."
- `index.html` (line 13): "Hello perfect fit."
- `public/index.html` (line 5): "TryOnMe – Your Perfect Fit. Zero Returns."
- `public/index.html` (line 14): "Hello perfect fit."
- `tryon_dashboard.html`: "Your perfect fit in seconds"
- `tryonme_landing.html` (title): "Tu talla perfecta, tu estilo real"
- `tryonme_landing.html` (keywords): "talla perfecta"
- `textos_home.txt` (line 2): "Encuentra la prenda perfecta con TryOnMe"
- `estructura.html`: "encontrar ropa perfecta"
- `estructura.html`: "algo perfecto para ti"
- `IMPORTANT_INFO_SUMMARY.md`: "prenda perfecta"
- `tryon/tryon-physio-adapt.js` (line: torsoFit): `'perfect'` (technical use)

**Legal Issue:**  
The term "perfect" is an absolute claim that cannot be substantiated for all users. Under EU Directive 2005/29/EC (Unfair Commercial Practices Directive), claims must be truthful, verifiable, and not misleading. Fashion fit is subjective and variable based on personal preference, body shape variations, and garment construction tolerances.

**Risk Level:** 🟡 MEDIUM  
**Recommended Action:** Replace with qualified language such as:
- "Your Best Fit"
- "Optimized Fit"
- "AI-Recommended Fit"
- "Personalized Fit Suggestions"

---

### 2. "Zero Returns" 

**Locations:**
- `index.html` (line 5, meta title): "TryOnMe – Your Perfect Fit. Zero Returns."
- `public/index.html` (line 5, meta title): "TryOnMe – Your Perfect Fit. Zero Returns."

**Legal Issue:**  
"Zero Returns" is an absolute guarantee that implies no customer will ever need to return a product. This violates:
- **EU Consumer Rights Directive (2011/83/EU):** Consumers have the legal right to return products within 14 days
- **False Advertising Laws:** The claim cannot be substantiated and is demonstrably false
- **EPCT Article 6:** Misleading actions regarding product characteristics

**Risk Level:** 🔴 HIGH - CRITICAL  
**Recommended Action:** IMMEDIATE REMOVAL or modification to:
- "Fewer Returns"
- "Reduce Your Returns"
- "Better Fit, Less Hassle"
- "Shop with Confidence"

**Legal Note:** Even with disclaimers, this claim may be considered deceptive because it contradicts mandatory consumer rights.

---

### 3. "100%" (Banned in brandGuardian)

**Status:** ✅ ALREADY CONTROLLED  
**Location:** `agents/brandGuardian.js` (line 2)

**Note:** The brandGuardian agent already bans "100%" claims. Good practice! Ensure this validation is applied consistently across all content generation.

---

### 4. "Goodbye returns" / "no returns, just confidence"

**Locations:**
- `index.html` (line 13, OG description): "Goodbye returns. Hello perfect fit."
- `public/index.html` (line 14, OG description): "Goodbye returns. Hello perfect fit."
- `index.html` (line 6, meta description): "no returns, just confidence"
- `public/index.html` (line 6, meta description): "no returns, just confidence"

**Legal Issue:**  
While less absolute than "Zero Returns," these phrases still imply that returns will not be necessary. This could mislead consumers about their statutory return rights under EU law.

**Risk Level:** 🟡 MEDIUM  
**Recommended Action:** Soften the language:
- "Fewer Returns with AI Precision"
- "Shop Smarter, Return Less"
- "Confidence in Every Fit"

---

### 5. "100% realistas" (Mockup Claims)

**Location:**
- `docs/agent_guidance.md`: "Genera mockups 100% realistas"

**Legal Issue:**  
"100% realistic" is an absolute technical claim about mockup/rendering quality. Difficult to substantiate objectively.

**Risk Level:** 🟢 LOW (internal documentation)  
**Recommended Action:** Modify to "highly realistic" or "photorealistic-quality mockups"

---

## EPCT Compliance Requirements

### Article 6: Misleading Actions
Marketing claims must not:
- Contain false information
- Deceive consumers about product characteristics
- Create confusion about consumer rights

### Article 7: Misleading Omissions
Marketing must not:
- Omit material information consumers need to make informed decisions
- Hide or obscure consumer rights (e.g., return policies)

### Consumer Rights Directive (2011/83/EU)
- **14-day return period:** Mandatory for distance sales (e-commerce)
- **No-questions-asked returns:** Consumers don't need to provide a reason
- **Clear information:** Return policies must be clearly communicated

---

## Recommendations

### Immediate Actions (0-7 days)

1. **Remove "Zero Returns" claim from all pages**
   - Files: `index.html`, `public/index.html`
   - Replace meta title and OG tags

2. **Add legal disclaimers to all fit-related claims**
   - Add footer disclaimer: "Fit recommendations are based on AI analysis and may vary based on personal preference and garment construction."

3. **Update brandGuardian.js to include additional banned terms**
   - Add: 'zero returns', 'perfect', '100%', 'guarantee', 'never', 'always' (in absolute contexts)

### Short-term Actions (7-30 days)

4. **Review and update all marketing copy**
   - `textos_home.txt`
   - `estructura.html`
   - `tryonme_landing.html`
   - `tryon_dashboard.html`

5. **Create legal pages** (as mentioned in `docs/implementation_plan.md`)
   - Terms & Conditions (including return policy)
   - Privacy Policy (GDPR compliant)
   - Shipping & Returns Policy (highlight 14-day EU right)

6. **Implement content review workflow**
   - All public-facing content must pass brandGuardian validation
   - Manual legal review for new marketing campaigns

### Long-term Actions (30-90 days)

7. **Legal counsel review**
   - Have qualified legal counsel review all marketing materials
   - Obtain legal opinion on AI-generated fit recommendations and liability

8. **Market-specific compliance**
   - France: Additional consumer protection (Code de la consommation)
   - Germany: Strict unfair competition law (UWG)
   - Spain: Ley General de Defensa de los Consumidores

9. **Insurance and liability**
   - Consider professional liability insurance for AI recommendations
   - Update T&Cs with limitation of liability clauses (where legally permissible)

---

## Sync Instructions

This document should be synced to:
- **Legal Team:** For review and approval of recommended changes
- **Marketing Team:** For implementation of new copy
- **Development Team:** For technical implementation of disclaimers and brandGuardian updates
- **Deployment Inbox:** `~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX`

---

## Approval Required

- [ ] Legal Counsel Review
- [ ] CEO Approval
- [ ] Marketing Director Sign-off
- [ ] Implementation Timeline Confirmed
- [ ] All Changes Deployed
- [ ] Post-deployment Legal Audit

---

## Contact

For questions regarding this legal compliance issue, contact:
- **Legal Team:** legal@tryonme.com
- **Compliance Officer:** compliance@tryonme.com
- **Issue Owner:** @LVT-ENG

---

## Version History

- **v1.0** (2025-10-26): Initial superclaims audit and EPCT compliance review
- **Status:** Awaiting legal review and implementation

---

## References

- EU Directive 2005/29/EC - Unfair Commercial Practices Directive
- EU Directive 2011/83/EU - Consumer Rights Directive
- European Commission: Guidance on the Implementation/Application of Directive 2005/29/EC
- Code de la consommation (France)
- UWG - Gesetz gegen den unlauteren Wettbewerb (Germany)

---

**⚠️ DISCLAIMER:** This document is for internal compliance purposes only and does not constitute legal advice. Consult qualified legal counsel for specific legal questions.
