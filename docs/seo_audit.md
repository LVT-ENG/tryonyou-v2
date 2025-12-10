# SEO Audit Guide

This short document explains how to verify basic SEO tags across all HTML files.
Use the helper script `scripts/seo_audit.py` provided in this repository.

## Usage
Run the script from the project root:

```bash
python scripts/seo_audit.py public
```

Replace `public` with any directory containing your generated pages. The script
checks each HTML file for a `<title>` tag, a `meta name="description"` tag, a
`meta name="viewport"` tag and a canonical link tag. Any missing tags will be
listed in the output.

## Continuous monitoring
The Automa flow `site_health_email.automa.json` runs this script every 15 minutes
and emails the results. Import the flow from `automa_flows/` if you want to
receive automated SEO reports.
