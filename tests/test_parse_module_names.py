import json
import subprocess
from pathlib import Path

CONFIG_JSON = {
    "name": "PAW_Legacy_Complete",
    "version": "11.0",
    "modules": [
        {
            "id": "archive_manifesto",
            "type": "text_memory_log",
            "input": [
                "narrative_quotes",
                "philosophical_endings",
                "emotional_closures",
            ],
            "output": ["consolidated_legacy_script"],
            "description": "Guarda todo el concepto emocional, filos\u00f3fico y narrativo de PAW para futuras piezas de contenido.",
        },
        {
            "id": "content_generator_suite",
            "type": "media_creation_toolkit",
            "input": ["consolidated_legacy_script"],
            "output": [
                "video_script",
                "reel_snippets",
                "voiceover_prompts",
                "product_texts",
            ],
            "description": "Convierte el material emocional y narrativo de PAW en v\u00eddeos, campa\u00f1as, promos y merchandising.",
        },
        {
            "id": "brand_foundation_backup",
            "type": "permanent_identity_record",
            "input": ["PAW_manifesto", "emotional_guidelines", "tone"],
            "description": "Guarda la esencia de la marca para referencia continua en dise\u00f1o, comunicaci\u00f3n y acciones futuras.",
        },
        {
            "id": "emotional_trigger_quotes",
            "type": "memeable_quotes_output",
            "input": ["emotional_phrases"],
            "output": ["social_captions", "postcard_texts", "shirt_slogans"],
            "description": "Prepara las frases clave de PAW para aplicar en merch, redes y marketing editorial.",
        },
        {
            "id": "ready_for_production",
            "type": "deployment_trigger",
            "condition": "user_flag == 'confirmed_all'",
            "output": "activated_material_bank",
            "description": "Activa todo el sistema cuando el usuario confirme el lanzamiento final.",
        },
        {
            "id": "end_storage_block",
            "type": "end",
            "description": "Finaliza el registro emocional y narrativo de PAW para aplicaci\u00f3n en marca, contenido y futuro desarrollo.",
        },
    ]
}

EXPECTED = [
    "archive_manifesto",
    "content_generator_suite",
    "brand_foundation_backup",
    "emotional_trigger_quotes",
    "ready_for_production",
    "end_storage_block",
]


def test_parse_module_names(tmp_path: Path) -> None:
    cfg = tmp_path / "config.json"
    cfg.write_text(json.dumps(CONFIG_JSON), encoding="utf-8")

    output = subprocess.check_output(
        ["python", "scripts/parse_module_names.py", str(cfg)], text=True
    ).splitlines()
    assert output == EXPECTED
