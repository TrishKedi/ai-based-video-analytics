from fastapi import  WebSocket


active_connections = []

async def websocket_endpoint(websocket: WebSocket):
    
    await websocket.accept()
    active_connections.append(websocket)

    try:
        while True:
            await websocket.receive_text()
    except Exception as e:
        print(f"web socket error: {str(e)}")
    finally:
        active_connections.remove(websocket)

# function to send updates

async def send_progress_update(progress: int, message: str = 'Processing'):
    for connection in active_connections:
        await connection.send_json({'progress': progress, 'message': message})