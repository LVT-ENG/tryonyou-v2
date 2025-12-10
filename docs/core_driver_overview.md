# Core Driver Architecture Overview

This project gradually adopts a simplified **Core / Driver** layout. The `core/` directory contains framework‑agnostic business logic while the rest of the code acts as the drivers that invoke it (APIs, CLIs, etc.).

Current modules moved to `core/`:

- `core/analytics.py` – common functions for dataset processing.

Driver examples:

- `api/process.py` exposes a Flask endpoint that calls into `core.analytics`.
- `scripts/process_dataset.py` is a CLI helper built on top of `core.analytics`.

Future work can migrate additional logic from other folders into `core/`.
