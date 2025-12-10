import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))
import gpt_filter


def test_gpt_response_negativo():
    assert "DNA Agent" in gpt_filter.gpt_response("odio esta chaqueta")


def test_gpt_response_entusiasmo():
    assert "Stylist AI" in gpt_filter.gpt_response("me gusta la camisa")


def test_gpt_response_precio():
    assert "Investor Translator" in gpt_filter.gpt_response("cuánto vale esto")


def test_gpt_response_default():
    assert "Client Whisperer" in gpt_filter.gpt_response("hola")
