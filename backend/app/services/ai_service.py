import json
import os

from openai import AsyncOpenAI
from sqlalchemy.ext.asyncio import AsyncSession

from app.routers.features import get_feature_flags_by_environment, create_feature_flag, delete_feature_flag
from app.ai.tools import get_feature_flags_by_environment_tool, create_feature_flag_tool, delete_feature_flag_tool
from app.schemas.feature_flag import FeatureFlagCreate

client = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


SYSTEM_PROMPT = """
You are an AI assistant for a feature flag management system.

Your responsibilities:
- Help users understand feature flags.
- Use tools whenever you need feature flag data.
- Never make up feature flag information.
- Available environments are dev, test, stage and prod.

When a user asks about feature flags:
- Identify the environment from the request.
- Use the get_feature_flags_by_environment tool.
- Summarize the results clearly.

When a user wants to create a feature flag:
- Extract the flag name.
- Extract the environment.
- Default enabled to false unless the user explicitly asks to enable it.
- Use the create_feature_flag tool.

When the user asks to delete a feature flag:

- Use the delete_feature_flag tool.
- If the feature flag doesn't exist, explain that it couldn't be found.
- If it is deleted successfully, confirm the deletion.
"""
async def ask_ai( message: str, db: AsyncSession ):
    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "role": "user",
            "content": message
        }
    ]

    response = await client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=messages,
        tools=[
            get_feature_flags_by_environment_tool,
            create_feature_flag_tool,
            delete_feature_flag_tool
        ]
    )

    assistant_message = response.choices[0].message

    if assistant_message.tool_calls:

        messages.append(assistant_message)

        for tool_call in assistant_message.tool_calls:

            if tool_call.function.name == "get_feature_flags_by_environment":

                arguments = json.loads(
                    tool_call.function.arguments
                )

                environment = arguments["environment"]

                flags = await get_feature_flags_by_environment( environment=environment, db=db )

                flag_data = [
                    {
                        "name": flag.name,
                        "description": flag.description,
                        "enabled": flag.enabled,
                        "environment": (
                            flag.environment.value
                            if hasattr(flag.environment, "value")
                            else flag.environment
                        )
                    }
                    for flag in flags
                ]

                messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(flag_data)
                    }
                )

            if tool_call.function.name == "create_feature_flag":

                arguments = json.loads(
                    tool_call.function.arguments
                )

                flag_request = FeatureFlagCreate( name=arguments["name"], description=arguments["description"], rollout_percentage=arguments["rollout_percentage"], project_id=arguments["project_id"], environment=arguments["environment"], enabled=arguments["enabled"] )

                flag = await create_feature_flag( flag_request, db=db )


                flag_data = { "id": flag.id, "name": flag.name, "description": flag.description, "rollout_percentage": flag.rollout_percentage, "project_id": flag.project_id, "environment": flag.environment, "enabled": flag.enabled }


                messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(flag_data)
                    }
                )

            if tool_call.function.name == "delete_feature_flag":

                arguments = json.loads(
                    tool_call.function.arguments
                )

                flag = await delete_feature_flag( name=arguments["name"], db=db )

                if flag is None:
                    tool_result = {
                        "success": False,
                        "message": "Feature flag not found."
                    }
                else:
                    tool_result = {
                        "success": True,
                        "name": flag.name,
                        "environment": flag.environment.value
                    }

                messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(tool_result)
                    }
                )


        final_response = await client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=messages
        )

        return final_response.choices[0].message.content


    return assistant_message.content