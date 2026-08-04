import api from "../api/client";
    
export async function sendAssistantMessage(message: string) {
  const response = await api.post( `/assistant`, { message } );
  return response.data;
}