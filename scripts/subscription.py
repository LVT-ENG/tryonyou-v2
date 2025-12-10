PLANS = {
    "basic": {"modules": ["avatar_generator", "catalog_sync"]},
    "pro": {"modules": ["avatar_generator", "catalog_sync", "fit_ai", "factory_master"]},
    "ultra": {
        "modules": [
            "avatar_generator",
            "catalog_sync",
            "fit_ai",
            "factory_master",
            "emotional_assistant",
            "autodonate",
        ]
    },
}

import os


def current_plan() -> str:
    """Return the active subscription plan from the TRYON_PLAN env var."""
    return os.getenv("TRYON_PLAN", "basic")


def module_enabled(module: str, plan: str | None = None) -> bool:
    """Check if a module is enabled for the given plan."""
    plan = plan or current_plan()
    return module in PLANS.get(plan, {}).get("modules", [])


def require_module(module: str, plan: str | None = None) -> None:
    """Raise RuntimeError if module not enabled for plan."""
    if not module_enabled(module, plan):
        plan = plan or current_plan()
        raise RuntimeError(f"Module '{module}' not enabled for plan '{plan}'")
