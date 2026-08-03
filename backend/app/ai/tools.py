get_feature_flags_by_environment_tool = {
    "type": "function",
    "function": {
        "name": "get_feature_flags_by_environment",
        "description": "Get feature flags for a specific environment",
        "parameters": {
            "type": "object",
            "properties": {
                "environment": {
                    "type": "string",
                    "description": "Environment name like dev, test, stage, or prod"
                }
            },
            "required": ["environment"]
        }
    }
}

delete_feature_flag_tool = {
    "type": "function",
    "function": {
        "name": "delete_feature_flag",
        "description": "Delete a feature flag by name",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Feature flag name"
                }
            },
            "required": ["name"]
        }
    }
}

create_feature_flag_tool = {
    "type": "function",
    "function": {
        "name": "create_feature_flag",
        "description": "Create a new feature flag",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the feature flag"
                },
                "description": {
                    "type": "string",   
                    "description": "Description of the feature flag"
                },
                "environment": {
                    "type": "string",
                    "enum": [
                        "dev",
                        "test",
                        "stage",
                        "prod"
                    ],
                    "description": "Environment for the feature flag"
                },
                "project_id": {
                    "type": "integer",  
                    "description": "ID of the project to which the feature flag belongs"
                },
                "enabled": {
                    "type": "boolean",
                    "description": "Whether the flag is enabled"
                },
                "rollout_percentage": {
                    "type": "integer",
                    "description": "Rollout percentage for the feature flag"
                }
            },
            "required": [
                "name",
                "environment",
                "enabled",
                "rollout_percentage"
            ]
        }
    }
}