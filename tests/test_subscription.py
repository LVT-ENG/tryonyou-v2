import os
from pathlib import Path
import sys
import pytest

sys.path.append(str(Path(__file__).resolve().parents[1] / "scripts"))
from subscription import module_enabled, require_module


def test_module_enabled_basic():
    assert not module_enabled("fit_ai", "basic")
    assert module_enabled("avatar_generator", "basic")


def test_require_module(monkeypatch):
    monkeypatch.setenv("TRYON_PLAN", "basic")
    with pytest.raises(RuntimeError):
        require_module("fit_ai")
